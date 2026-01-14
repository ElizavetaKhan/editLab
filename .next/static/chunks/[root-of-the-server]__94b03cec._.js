(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect(param) {
    let { addMessageListener, sendMessage, onUpdateError = console.error } = param;
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: (param)=>{
            let [chunkPath, callback] = param;
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        var _updateA_modules;
        const deletedModules = new Set((_updateA_modules = updateA.modules) !== null && _updateA_modules !== void 0 ? _updateA_modules : []);
        var _updateB_modules;
        const addedModules = new Set((_updateB_modules = updateB.modules) !== null && _updateB_modules !== void 0 ? _updateB_modules : []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        var _updateA_added, _updateB_added;
        const added = new Set([
            ...(_updateA_added = updateA.added) !== null && _updateA_added !== void 0 ? _updateA_added : [],
            ...(_updateB_added = updateB.added) !== null && _updateB_added !== void 0 ? _updateB_added : []
        ]);
        var _updateA_deleted, _updateB_deleted;
        const deleted = new Set([
            ...(_updateA_deleted = updateA.deleted) !== null && _updateA_deleted !== void 0 ? _updateA_deleted : [],
            ...(_updateB_deleted = updateB.deleted) !== null && _updateB_deleted !== void 0 ? _updateB_deleted : []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        var _updateA_modules1, _updateB_added1;
        const modules = new Set([
            ...(_updateA_modules1 = updateA.modules) !== null && _updateA_modules1 !== void 0 ? _updateA_modules1 : [],
            ...(_updateB_added1 = updateB.added) !== null && _updateB_added1 !== void 0 ? _updateB_added1 : []
        ]);
        var _updateB_deleted1;
        for (const moduleId of (_updateB_deleted1 = updateB.deleted) !== null && _updateB_deleted1 !== void 0 ? _updateB_deleted1 : []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        var _updateB_modules1;
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set((_updateB_modules1 = updateB.modules) !== null && _updateB_modules1 !== void 0 ? _updateB_modules1 : []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error("Invariant: ".concat(message));
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/Documents/JSprojects/editLab/components/ButtonReg.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ButtonReg",
    ()=>ButtonReg
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/@swc/helpers/esm/_tagged_template_literal.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/styled-components/dist/styled-components.browser.esm.js [client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  0%, 100% {\n    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);\n  }\n  50% {\n    box-shadow: 0 0 0 20px rgba(99, 102, 241, 0);\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  cursor: pointer;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: #fff;\n  border: none;\n  border-radius: 16px;\n  padding: 18px 48px;\n  font-size: 18px;\n  font-weight: 700;\n  font-family: inherit;\n  align-self: center;\n  margin-top: 50px;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n  position: relative;\n  overflow: hidden;\n  \n  &::before {\n    content: '';\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 0;\n    height: 0;\n    border-radius: 50%;\n    background: rgba(255, 255, 255, 0.3);\n    transform: translate(-50%, -50%);\n    transition: width 0.6s, height 0.6s;\n  }\n  \n  &:hover {\n    transform: translateY(-3px);\n    box-shadow: 0 12px 32px rgba(99, 102, 241, 0.4);\n    \n    &::before {\n      width: 300px;\n      height: 300px;\n    }\n  }\n  \n  &:active {\n    transform: translateY(-1px);\n  }\n  \n  span {\n    position: relative;\n    z-index: 1;\n  }\n"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
;
;
;
const pulse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["keyframes"])(_templateObject());
const ButtonContainer = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].button.withConfig({
    displayName: "ButtonReg__ButtonContainer",
    componentId: "sc-ef88970a-0"
})(_templateObject1());
_c = ButtonContainer;
const ButtonReg = (param)=>{
    let { clickNumber, setClickNumber } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ButtonContainer, {
        onClick: ()=>setClickNumber(clickNumber + 1),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "Записаться бесплатно"
        }, void 0, false, {
            fileName: "[project]/Documents/JSprojects/editLab/components/ButtonReg.jsx",
            lineNumber: 65,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Documents/JSprojects/editLab/components/ButtonReg.jsx",
        lineNumber: 64,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = ButtonReg;
var _c, _c1;
__turbopack_context__.k.register(_c, "ButtonContainer");
__turbopack_context__.k.register(_c1, "ButtonReg");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/JSprojects/editLab/components/FeaturesBlock.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeaturesBlock",
    ()=>FeaturesBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/@swc/helpers/esm/_tagged_template_literal.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/styled-components/dist/styled-components.browser.esm.js [client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  padding: 80px 20px;\n  margin: 40px 0;\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: clamp(32px, 4vw, 48px);\n  font-weight: 700;\n  text-align: center;\n  margin-bottom: 60px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 30px;\n  max-width: 1200px;\n  margin: 0 auto;\n"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);\n  border-radius: 24px;\n  padding: 40px 30px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  text-align: center;\n  position: relative;\n  overflow: hidden;\n  \n  &::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 4px;\n    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);\n  }\n  \n  &:hover {\n    transform: translateY(-8px);\n    box-shadow: 0 16px 48px rgba(99, 102, 241, 0.2);\n  }\n"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  width: 80px;\n  height: 80px;\n  border-radius: 20px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 24px;\n  font-size: 36px;\n  color: white;\n  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);\n"
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: 22px;\n  font-weight: 700;\n  margin-bottom: 16px;\n  color: #2d3748;\n"
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
function _templateObject6() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: 16px;\n  color: #4a5568;\n  line-height: 1.6;\n"
    ]);
    _templateObject6 = function() {
        return data;
    };
    return data;
}
function _templateObject7() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  font-weight: 700;\n"
    ]);
    _templateObject7 = function() {
        return data;
    };
    return data;
}
;
;
;
const FeaturesContainer = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].section.withConfig({
    displayName: "FeaturesBlock__FeaturesContainer",
    componentId: "sc-a6d39310-0"
})(_templateObject());
_c = FeaturesContainer;
const SectionTitle = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].h2.withConfig({
    displayName: "FeaturesBlock__SectionTitle",
    componentId: "sc-a6d39310-1"
})(_templateObject1());
_c1 = SectionTitle;
const FeaturesGrid = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "FeaturesBlock__FeaturesGrid",
    componentId: "sc-a6d39310-2"
})(_templateObject2());
_c2 = FeaturesGrid;
const FeatureCard = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "FeaturesBlock__FeatureCard",
    componentId: "sc-a6d39310-3"
})(_templateObject3());
_c3 = FeatureCard;
const FeatureIcon = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "FeaturesBlock__FeatureIcon",
    componentId: "sc-a6d39310-4"
})(_templateObject4());
_c4 = FeatureIcon;
const FeatureTitle = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].h3.withConfig({
    displayName: "FeaturesBlock__FeatureTitle",
    componentId: "sc-a6d39310-5"
})(_templateObject5());
_c5 = FeatureTitle;
const FeatureDescription = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].p.withConfig({
    displayName: "FeaturesBlock__FeatureDescription",
    componentId: "sc-a6d39310-6"
})(_templateObject6());
_c6 = FeatureDescription;
const HighlightText = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].span.withConfig({
    displayName: "FeaturesBlock__HighlightText",
    componentId: "sc-a6d39310-7"
})(_templateObject7());
const features = [
    {
        icon: '🎬',
        title: 'Профессиональные видеомейкеры',
        description: 'Уроки от практикующих специалистов с опытом работы с крупными брендами'
    },
    {
        icon: '💼',
        title: 'Практика в каждом модуле',
        description: 'Каждый урок включает практические задания для закрепления навыков'
    },
    {
        icon: '📁',
        title: 'Готовое портфолио',
        description: 'После окончания курса у тебя будет портфолио из 10+ работ'
    },
    {
        icon: '👥',
        title: 'Активное сообщество',
        description: 'Присоединяйся к сообществу единомышленников и развивайся вместе'
    },
    {
        icon: '🎓',
        title: 'Сертификат',
        description: 'Получи сертификат, подтверждающий твои навыки видеомонтажа'
    },
    {
        icon: '⚡',
        title: 'Быстрый старт',
        description: 'Начни создавать первые проекты уже через неделю после старта'
    }
];
const FeaturesBlock = (param)=>{
    let { clickNumber } = param;
    const updatedFeatures = features.map((feature, index)=>{
        if (index === 3) {
            return {
                ...feature,
                description: "Нас выбрали уже ".concat(clickNumber, " человек! Присоединяйся к сообществу единомышленников и развивайся вместе")
            };
        }
        return feature;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeaturesContainer, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                children: "Почему EditLab?"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/FeaturesBlock.jsx",
                lineNumber: 135,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeaturesGrid, {
                children: updatedFeatures.map((feature, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureCard, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureIcon, {
                                children: feature.icon
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/FeaturesBlock.jsx",
                                lineNumber: 139,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureTitle, {
                                children: feature.title
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/FeaturesBlock.jsx",
                                lineNumber: 140,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureDescription, {
                                children: feature.description
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/FeaturesBlock.jsx",
                                lineNumber: 141,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, index, true, {
                        fileName: "[project]/Documents/JSprojects/editLab/components/FeaturesBlock.jsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/FeaturesBlock.jsx",
                lineNumber: 136,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/JSprojects/editLab/components/FeaturesBlock.jsx",
        lineNumber: 134,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c7 = FeaturesBlock;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "FeaturesContainer");
__turbopack_context__.k.register(_c1, "SectionTitle");
__turbopack_context__.k.register(_c2, "FeaturesGrid");
__turbopack_context__.k.register(_c3, "FeatureCard");
__turbopack_context__.k.register(_c4, "FeatureIcon");
__turbopack_context__.k.register(_c5, "FeatureTitle");
__turbopack_context__.k.register(_c6, "FeatureDescription");
__turbopack_context__.k.register(_c7, "FeaturesBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/JSprojects/editLab/components/SignUpForm.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SignUpForm",
    ()=>SignUpForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/@swc/helpers/esm/_tagged_template_literal.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/styled-components/dist/styled-components.browser.esm.js [client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  padding: 80px 20px;\n  margin: 40px 0;\n  background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%);\n  border-radius: 30px;\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n  text-align: center;\n"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: clamp(24px, 3vw, 32px);\n  font-weight: 700;\n  margin-bottom: 16px;\n  color: #2d3748;\n"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: 16px;\n  color: #718096;\n  margin-bottom: 40px;\n  line-height: 1.6;\n"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  animation: ",
        " 0.5s ease-out;\n  \n  @media (min-width: 640px) {\n    flex-direction: row;\n  }\n"
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  flex: 1;\n  padding: 16px 20px;\n  font-size: 16px;\n  border-radius: 12px;\n  border: 2px solid rgba(0, 0, 0, 0.1);\n  font-family: inherit;\n  transition: border-color 0.3s ease, box-shadow 0.3s ease;\n  background: white;\n  \n  &:focus {\n    outline: none;\n    border-color: #667eea;\n    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n  }\n  \n  &::placeholder {\n    color: #a0aec0;\n  }\n"
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
function _templateObject6() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n  border-radius: 12px;\n  padding: 16px 32px;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: 16px;\n  font-weight: 600;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n  white-space: nowrap;\n  \n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);\n  }\n  \n  &:active {\n    transform: translateY(0);\n  }\n  \n  @media (min-width: 640px) {\n    flex-shrink: 0;\n  }\n"
    ]);
    _templateObject6 = function() {
        return data;
    };
    return data;
}
function _templateObject7() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  padding: 24px;\n  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);\n  color: white;\n  border-radius: 16px;\n  font-size: 18px;\n  font-weight: 600;\n  animation: ",
        " 0.5s ease-out;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n"
    ]);
    _templateObject7 = function() {
        return data;
    };
    return data;
}
function _templateObject8() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: 24px;\n"
    ]);
    _templateObject8 = function() {
        return data;
    };
    return data;
}
;
var _s = __turbopack_context__.k.signature();
;
;
const fadeIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["keyframes"])(_templateObject());
const FormContainer = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].section.withConfig({
    displayName: "SignUpForm__FormContainer",
    componentId: "sc-3fde6398-0"
})(_templateObject1());
_c = FormContainer;
const FormTitle = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].h3.withConfig({
    displayName: "SignUpForm__FormTitle",
    componentId: "sc-3fde6398-1"
})(_templateObject2());
_c1 = FormTitle;
const FormSubtitle = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].p.withConfig({
    displayName: "SignUpForm__FormSubtitle",
    componentId: "sc-3fde6398-2"
})(_templateObject3());
_c2 = FormSubtitle;
const FormSection = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].form.withConfig({
    displayName: "SignUpForm__FormSection",
    componentId: "sc-3fde6398-3"
})(_templateObject4(), fadeIn);
_c3 = FormSection;
const InputBlock = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].input.withConfig({
    displayName: "SignUpForm__InputBlock",
    componentId: "sc-3fde6398-4"
})(_templateObject5());
_c4 = InputBlock;
const ButtonSend = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].button.withConfig({
    displayName: "SignUpForm__ButtonSend",
    componentId: "sc-3fde6398-5"
})(_templateObject6());
_c5 = ButtonSend;
const SuccessMessage = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "SignUpForm__SuccessMessage",
    componentId: "sc-3fde6398-6"
})(_templateObject7(), fadeIn);
_c6 = SuccessMessage;
const SuccessIcon = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].span.withConfig({
    displayName: "SignUpForm__SuccessIcon",
    componentId: "sc-3fde6398-7"
})(_templateObject8());
_c7 = SuccessIcon;
const SignUpForm = (param)=>{
    let { submitted, handleSubmit, setEmail, email } = param;
    _s();
    const [localEmail, setLocalEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(email || '');
    const handleFormSubmit = (e)=>{
        e.preventDefault();
        setEmail(localEmail);
        handleSubmit(e);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormContainer, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormTitle, {
                children: "Узнай о старте курса первым"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/SignUpForm.jsx",
                lineNumber: 128,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormSubtitle, {
                children: "Оставь email и получи уведомление о запуске нового потока. Первым 100 участникам — скидка 20%!"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/SignUpForm.jsx",
                lineNumber: 129,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            submitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SuccessMessage, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SuccessIcon, {
                        children: "✅"
                    }, void 0, false, {
                        fileName: "[project]/Documents/JSprojects/editLab/components/SignUpForm.jsx",
                        lineNumber: 135,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    "Спасибо! Мы свяжемся с вами в ближайшее время"
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/JSprojects/editLab/components/SignUpForm.jsx",
                lineNumber: 134,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormSection, {
                onSubmit: handleFormSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputBlock, {
                        type: "email",
                        placeholder: "Введите ваш email",
                        value: localEmail,
                        onChange: (e)=>setLocalEmail(e.target.value),
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/Documents/JSprojects/editLab/components/SignUpForm.jsx",
                        lineNumber: 140,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ButtonSend, {
                        type: "submit",
                        children: "Отправить"
                    }, void 0, false, {
                        fileName: "[project]/Documents/JSprojects/editLab/components/SignUpForm.jsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/JSprojects/editLab/components/SignUpForm.jsx",
                lineNumber: 139,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/JSprojects/editLab/components/SignUpForm.jsx",
        lineNumber: 127,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SignUpForm, "itxUg9/Htd+mtm9eWkNteRRw9IM=");
_c8 = SignUpForm;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "FormContainer");
__turbopack_context__.k.register(_c1, "FormTitle");
__turbopack_context__.k.register(_c2, "FormSubtitle");
__turbopack_context__.k.register(_c3, "FormSection");
__turbopack_context__.k.register(_c4, "InputBlock");
__turbopack_context__.k.register(_c5, "ButtonSend");
__turbopack_context__.k.register(_c6, "SuccessMessage");
__turbopack_context__.k.register(_c7, "SuccessIcon");
__turbopack_context__.k.register(_c8, "SignUpForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/JSprojects/editLab/components/HeroSection.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroSection",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/@swc/helpers/esm/_tagged_template_literal.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/styled-components/dist/styled-components.browser.esm.js [client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  padding: 80px 20px;\n  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);\n  border-radius: 30px;\n  margin: 40px 0;\n  position: relative;\n  overflow: hidden;\n  \n  &::before {\n    content: '';\n    position: absolute;\n    top: -50%;\n    right: -50%;\n    width: 200%;\n    height: 200%;\n    background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);\n    animation: ",
        " 3s ease-in-out infinite alternate;\n  }\n"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: clamp(36px, 6vw, 72px);\n  font-weight: 800;\n  margin-bottom: 24px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  animation: ",
        " 0.8s ease-out;\n  position: relative;\n  z-index: 1;\n  line-height: 1.2;\n"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: clamp(18px, 2.5vw, 24px);\n  color: #4a5568;\n  margin-bottom: 40px;\n  max-width: 700px;\n  line-height: 1.6;\n  animation: ",
        " 1s ease-out;\n  position: relative;\n  z-index: 1;\n"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  display: flex;\n  gap: 40px;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin-top: 60px;\n  animation: ",
        " 1.2s ease-out;\n  position: relative;\n  z-index: 1;\n  \n  @media (max-width: 768px) {\n    gap: 24px;\n  }\n"
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 20px;\n  background: rgba(255, 255, 255, 0.8);\n  border-radius: 20px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  min-width: 150px;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  \n  &:hover {\n    transform: translateY(-5px);\n    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.2);\n  }\n"
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
function _templateObject6() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: 36px;\n  font-weight: 700;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n"
    ]);
    _templateObject6 = function() {
        return data;
    };
    return data;
}
function _templateObject7() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: 14px;\n  color: #718096;\n  margin-top: 8px;\n  text-align: center;\n"
    ]);
    _templateObject7 = function() {
        return data;
    };
    return data;
}
;
;
;
const fadeInUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["keyframes"])(_templateObject());
const HeroContainer = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].section.withConfig({
    displayName: "HeroSection__HeroContainer",
    componentId: "sc-c283fcd9-0"
})(_templateObject1(), fadeInUp);
_c = HeroContainer;
const HeroTitle = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].h1.withConfig({
    displayName: "HeroSection__HeroTitle",
    componentId: "sc-c283fcd9-1"
})(_templateObject2(), fadeInUp);
_c1 = HeroTitle;
const HeroSubtitle = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].p.withConfig({
    displayName: "HeroSection__HeroSubtitle",
    componentId: "sc-c283fcd9-2"
})(_templateObject3(), fadeInUp);
_c2 = HeroSubtitle;
const StatsContainer = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "HeroSection__StatsContainer",
    componentId: "sc-c283fcd9-3"
})(_templateObject4(), fadeInUp);
_c3 = StatsContainer;
const StatItem = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "HeroSection__StatItem",
    componentId: "sc-c283fcd9-4"
})(_templateObject5());
_c4 = StatItem;
const StatNumber = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "HeroSection__StatNumber",
    componentId: "sc-c283fcd9-5"
})(_templateObject6());
_c5 = StatNumber;
const StatLabel = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "HeroSection__StatLabel",
    componentId: "sc-c283fcd9-6"
})(_templateObject7());
_c6 = StatLabel;
const HeroSection = (param)=>{
    let { clickNumber } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeroContainer, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeroTitle, {
                children: "EditLab — курс по видеомонтажу"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/HeroSection.jsx",
                lineNumber: 116,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeroSubtitle, {
                children: "Научись монтировать видео профессионально — от клипов до YouTube-шоу. Стань востребованным видеомейкером и создавай контент, который покоряет миллионы"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/HeroSection.jsx",
                lineNumber: 117,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatsContainer, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatItem, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatNumber, {
                                children: "1000+"
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/HeroSection.jsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatLabel, {
                                children: "Участников"
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/HeroSection.jsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/JSprojects/editLab/components/HeroSection.jsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatItem, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatNumber, {
                                children: "50+"
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/HeroSection.jsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatLabel, {
                                children: "Уроков"
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/HeroSection.jsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/JSprojects/editLab/components/HeroSection.jsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatItem, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatNumber, {
                                children: clickNumber
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/HeroSection.jsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatLabel, {
                                children: "Записались сегодня"
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/HeroSection.jsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/JSprojects/editLab/components/HeroSection.jsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/JSprojects/editLab/components/HeroSection.jsx",
                lineNumber: 121,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/JSprojects/editLab/components/HeroSection.jsx",
        lineNumber: 115,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c7 = HeroSection;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "HeroContainer");
__turbopack_context__.k.register(_c1, "HeroTitle");
__turbopack_context__.k.register(_c2, "HeroSubtitle");
__turbopack_context__.k.register(_c3, "StatsContainer");
__turbopack_context__.k.register(_c4, "StatItem");
__turbopack_context__.k.register(_c5, "StatNumber");
__turbopack_context__.k.register(_c6, "StatLabel");
__turbopack_context__.k.register(_c7, "HeroSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/JSprojects/editLab/components/ProgramBlock.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProgramBlock",
    ()=>ProgramBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/@swc/helpers/esm/_tagged_template_literal.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/styled-components/dist/styled-components.browser.esm.js [client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  padding: 80px 20px;\n  margin: 40px 0;\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: clamp(32px, 4vw, 48px);\n  font-weight: 700;\n  text-align: center;\n  margin-bottom: 60px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 30px;\n  max-width: 1200px;\n  margin: 0 auto;\n"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);\n  border-radius: 24px;\n  padding: 40px 30px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  position: relative;\n  overflow: hidden;\n  \n  &::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 4px;\n    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);\n  }\n  \n  &:hover {\n    transform: translateY(-10px);\n    box-shadow: 0 16px 48px rgba(99, 102, 241, 0.2);\n  }\n  \n  &:nth-child(1)::before {\n    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);\n  }\n  &:nth-child(2)::before {\n    background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);\n  }\n  &:nth-child(3)::before {\n    background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);\n  }\n  &:nth-child(4)::before {\n    background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);\n  }\n"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: 48px;\n  font-weight: 800;\n  opacity: 0.1;\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  line-height: 1;\n"
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: 24px;\n  font-weight: 700;\n  margin-bottom: 16px;\n  color: #2d3748;\n"
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
function _templateObject6() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: 16px;\n  color: #4a5568;\n  line-height: 1.6;\n  margin-bottom: 20px;\n"
    ]);
    _templateObject6 = function() {
        return data;
    };
    return data;
}
function _templateObject7() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  list-style: none;\n  padding: 0;\n  margin: 0;\n"
    ]);
    _templateObject7 = function() {
        return data;
    };
    return data;
}
function _templateObject8() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: 14px;\n  color: #718096;\n  padding: 8px 0;\n  padding-left: 24px;\n  position: relative;\n  \n  &::before {\n    content: '✓';\n    position: absolute;\n    left: 0;\n    color: #48bb78;\n    font-weight: bold;\n  }\n"
    ]);
    _templateObject8 = function() {
        return data;
    };
    return data;
}
;
;
;
const ProgramContainer = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].section.withConfig({
    displayName: "ProgramBlock__ProgramContainer",
    componentId: "sc-2cbd0b04-0"
})(_templateObject());
_c = ProgramContainer;
const SectionTitle = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].h2.withConfig({
    displayName: "ProgramBlock__SectionTitle",
    componentId: "sc-2cbd0b04-1"
})(_templateObject1());
_c1 = SectionTitle;
const ModulesGrid = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "ProgramBlock__ModulesGrid",
    componentId: "sc-2cbd0b04-2"
})(_templateObject2());
_c2 = ModulesGrid;
const ModuleCard = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "ProgramBlock__ModuleCard",
    componentId: "sc-2cbd0b04-3"
})(_templateObject3());
_c3 = ModuleCard;
const ModuleNumber = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "ProgramBlock__ModuleNumber",
    componentId: "sc-2cbd0b04-4"
})(_templateObject4());
_c4 = ModuleNumber;
const ModuleTitle = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].h3.withConfig({
    displayName: "ProgramBlock__ModuleTitle",
    componentId: "sc-2cbd0b04-5"
})(_templateObject5());
_c5 = ModuleTitle;
const ModuleDescription = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].p.withConfig({
    displayName: "ProgramBlock__ModuleDescription",
    componentId: "sc-2cbd0b04-6"
})(_templateObject6());
_c6 = ModuleDescription;
const ModuleFeatures = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].ul.withConfig({
    displayName: "ProgramBlock__ModuleFeatures",
    componentId: "sc-2cbd0b04-7"
})(_templateObject7());
_c7 = ModuleFeatures;
const ModuleFeature = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].li.withConfig({
    displayName: "ProgramBlock__ModuleFeature",
    componentId: "sc-2cbd0b04-8"
})(_templateObject8());
_c8 = ModuleFeature;
const modules = [
    {
        number: '01',
        title: 'Основы видеомонтажа',
        description: 'Изучи интерфейс программ, работу с таймлайном и базовые инструменты',
        features: [
            'Знакомство с Premiere Pro',
            'Работа с клипами',
            'Базовые эффекты',
            'Цветокоррекция'
        ]
    },
    {
        number: '02',
        title: 'Продвинутые техники',
        description: 'Освой продвинутые эффекты, переходы и работу со звуком',
        features: [
            'Сложные переходы',
            'Motion Graphics',
            'Звуковой дизайн',
            'Стабилизация'
        ]
    },
    {
        number: '03',
        title: 'Стилизация и брендинг',
        description: 'Научись создавать уникальный стиль и работать с брендбуком',
        features: [
            'Цветовые схемы',
            'Типографика',
            'Логотипы и графика',
            'Фирменный стиль'
        ]
    },
    {
        number: '04',
        title: 'Портфолио и карьера',
        description: 'Собери портфолио и узнай, как начать карьеру видеомейкера',
        features: [
            'Сборка портфолио',
            'Поиск клиентов',
            'Ценообразование',
            'Продвижение'
        ]
    }
];
const ProgramBlock = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProgramContainer, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                children: "Программа курса"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/ProgramBlock.jsx",
                lineNumber: 142,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModulesGrid, {
                children: modules.map((module, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModuleCard, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModuleNumber, {
                                children: module.number
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/ProgramBlock.jsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModuleTitle, {
                                children: module.title
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/ProgramBlock.jsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModuleDescription, {
                                children: module.description
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/ProgramBlock.jsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModuleFeatures, {
                                children: module.features.map((feature, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModuleFeature, {
                                        children: feature
                                    }, idx, false, {
                                        fileName: "[project]/Documents/JSprojects/editLab/components/ProgramBlock.jsx",
                                        lineNumber: 151,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/ProgramBlock.jsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, index, true, {
                        fileName: "[project]/Documents/JSprojects/editLab/components/ProgramBlock.jsx",
                        lineNumber: 145,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/ProgramBlock.jsx",
                lineNumber: 143,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/JSprojects/editLab/components/ProgramBlock.jsx",
        lineNumber: 141,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c9 = ProgramBlock;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "ProgramContainer");
__turbopack_context__.k.register(_c1, "SectionTitle");
__turbopack_context__.k.register(_c2, "ModulesGrid");
__turbopack_context__.k.register(_c3, "ModuleCard");
__turbopack_context__.k.register(_c4, "ModuleNumber");
__turbopack_context__.k.register(_c5, "ModuleTitle");
__turbopack_context__.k.register(_c6, "ModuleDescription");
__turbopack_context__.k.register(_c7, "ModuleFeatures");
__turbopack_context__.k.register(_c8, "ModuleFeature");
__turbopack_context__.k.register(_c9, "ProgramBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/JSprojects/editLab/components/TestimonialsBlock.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TestimonialsBlock",
    ()=>TestimonialsBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/@swc/helpers/esm/_tagged_template_literal.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/styled-components/dist/styled-components.browser.esm.js [client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  padding: 80px 20px;\n  margin: 40px 0;\n  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%);\n  border-radius: 30px;\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: clamp(32px, 4vw, 48px);\n  font-weight: 700;\n  text-align: center;\n  margin-bottom: 60px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: 30px;\n  max-width: 1200px;\n  margin: 0 auto;\n"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  background: white;\n  border-radius: 24px;\n  padding: 40px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  position: relative;\n  \n  &:hover {\n    transform: translateY(-8px);\n    box-shadow: 0 16px 48px rgba(99, 102, 241, 0.15);\n  }\n  \n  &::before {\n    content: '\"';\n    position: absolute;\n    top: 20px;\n    left: 30px;\n    font-size: 80px;\n    color: rgba(99, 102, 241, 0.1);\n    font-family: Georgia, serif;\n    line-height: 1;\n  }\n"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: 16px;\n  color: #2d3748;\n  line-height: 1.7;\n  margin-bottom: 24px;\n  font-style: italic;\n  position: relative;\n  z-index: 1;\n"
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding-top: 24px;\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n"
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
function _templateObject6() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: 700;\n  font-size: 20px;\n"
    ]);
    _templateObject6 = function() {
        return data;
    };
    return data;
}
function _templateObject7() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  display: flex;\n  flex-direction: column;\n"
    ]);
    _templateObject7 = function() {
        return data;
    };
    return data;
}
function _templateObject8() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-weight: 600;\n  color: #2d3748;\n  font-size: 16px;\n"
    ]);
    _templateObject8 = function() {
        return data;
    };
    return data;
}
function _templateObject9() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: 14px;\n  color: #718096;\n"
    ]);
    _templateObject9 = function() {
        return data;
    };
    return data;
}
;
;
;
const TestimonialsContainer = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].section.withConfig({
    displayName: "TestimonialsBlock__TestimonialsContainer",
    componentId: "sc-41ee7d7d-0"
})(_templateObject());
_c = TestimonialsContainer;
const SectionTitle = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].h2.withConfig({
    displayName: "TestimonialsBlock__SectionTitle",
    componentId: "sc-41ee7d7d-1"
})(_templateObject1());
_c1 = SectionTitle;
const TestimonialsGrid = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "TestimonialsBlock__TestimonialsGrid",
    componentId: "sc-41ee7d7d-2"
})(_templateObject2());
_c2 = TestimonialsGrid;
const TestimonialCard = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "TestimonialsBlock__TestimonialCard",
    componentId: "sc-41ee7d7d-3"
})(_templateObject3());
_c3 = TestimonialCard;
const TestimonialText = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].p.withConfig({
    displayName: "TestimonialsBlock__TestimonialText",
    componentId: "sc-41ee7d7d-4"
})(_templateObject4());
_c4 = TestimonialText;
const TestimonialAuthor = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "TestimonialsBlock__TestimonialAuthor",
    componentId: "sc-41ee7d7d-5"
})(_templateObject5());
_c5 = TestimonialAuthor;
const AuthorAvatar = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "TestimonialsBlock__AuthorAvatar",
    componentId: "sc-41ee7d7d-6"
})(_templateObject6());
_c6 = AuthorAvatar;
const AuthorInfo = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "TestimonialsBlock__AuthorInfo",
    componentId: "sc-41ee7d7d-7"
})(_templateObject7());
_c7 = AuthorInfo;
const AuthorName = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "TestimonialsBlock__AuthorName",
    componentId: "sc-41ee7d7d-8"
})(_templateObject8());
_c8 = AuthorName;
const AuthorRole = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "TestimonialsBlock__AuthorRole",
    componentId: "sc-41ee7d7d-9"
})(_templateObject9());
_c9 = AuthorRole;
const testimonials = [
    {
        text: 'Курс изменил мою карьеру! Теперь я работаю с крупными брендами и создаю контент, которым горжусь. Преподаватели объясняют очень доступно.',
        name: 'Анна Петрова',
        role: 'Видеомейкер, YouTube'
    },
    {
        text: 'Отличная программа! Особенно понравились практические задания. После курса сразу получил первые заказы и собрал портфолио.',
        name: 'Максим Иванов',
        role: 'Freelance видеомейкер'
    },
    {
        text: 'Лучший курс по монтажу! Все структурировано, понятно, и есть поддержка сообщества. Рекомендую всем, кто хочет развиваться в этой сфере.',
        name: 'Елена Соколова',
        role: 'Контент-мейкер'
    }
];
const TestimonialsBlock = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TestimonialsContainer, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                children: "Отзывы выпускников"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/TestimonialsBlock.jsx",
                lineNumber: 123,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TestimonialsGrid, {
                children: testimonials.map((testimonial, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TestimonialCard, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TestimonialText, {
                                children: testimonial.text
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/TestimonialsBlock.jsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TestimonialAuthor, {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthorAvatar, {
                                        children: testimonial.name.charAt(0)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/JSprojects/editLab/components/TestimonialsBlock.jsx",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthorInfo, {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthorName, {
                                                children: testimonial.name
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/JSprojects/editLab/components/TestimonialsBlock.jsx",
                                                lineNumber: 131,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthorRole, {
                                                children: testimonial.role
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/JSprojects/editLab/components/TestimonialsBlock.jsx",
                                                lineNumber: 132,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/JSprojects/editLab/components/TestimonialsBlock.jsx",
                                        lineNumber: 130,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/TestimonialsBlock.jsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, index, true, {
                        fileName: "[project]/Documents/JSprojects/editLab/components/TestimonialsBlock.jsx",
                        lineNumber: 126,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/TestimonialsBlock.jsx",
                lineNumber: 124,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/JSprojects/editLab/components/TestimonialsBlock.jsx",
        lineNumber: 122,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c10 = TestimonialsBlock;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "TestimonialsContainer");
__turbopack_context__.k.register(_c1, "SectionTitle");
__turbopack_context__.k.register(_c2, "TestimonialsGrid");
__turbopack_context__.k.register(_c3, "TestimonialCard");
__turbopack_context__.k.register(_c4, "TestimonialText");
__turbopack_context__.k.register(_c5, "TestimonialAuthor");
__turbopack_context__.k.register(_c6, "AuthorAvatar");
__turbopack_context__.k.register(_c7, "AuthorInfo");
__turbopack_context__.k.register(_c8, "AuthorName");
__turbopack_context__.k.register(_c9, "AuthorRole");
__turbopack_context__.k.register(_c10, "TestimonialsBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PricingBlock",
    ()=>PricingBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/@swc/helpers/esm/_tagged_template_literal.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/styled-components/dist/styled-components.browser.esm.js [client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  padding: 80px 20px;\n  margin: 40px 0;\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: clamp(32px, 4vw, 48px);\n  font-weight: 700;\n  text-align: center;\n  margin-bottom: 20px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  text-align: center;\n  font-size: 18px;\n  color: #718096;\n  margin-bottom: 60px;\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 30px;\n  max-width: 1200px;\n  margin: 0 auto;\n"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  background: ",
        ";\n  border-radius: 24px;\n  padding: 40px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  position: relative;\n  color: ",
        ";\n  \n  ",
        "\n  \n  &:hover {\n    transform: ",
        ";\n    box-shadow: 0 16px 48px rgba(99, 102, 241, 0.2);\n  }\n"
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
function _templateObject5() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: 24px;\n  font-weight: 700;\n  margin-bottom: 12px;\n"
    ]);
    _templateObject5 = function() {
        return data;
    };
    return data;
}
function _templateObject6() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: 48px;\n  font-weight: 800;\n  margin-bottom: 8px;\n  \n  span {\n    font-size: 20px;\n    font-weight: 400;\n    opacity: 0.8;\n  }\n"
    ]);
    _templateObject6 = function() {
        return data;
    };
    return data;
}
function _templateObject7() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: 16px;\n  opacity: ",
        ";\n  margin-bottom: 32px;\n  line-height: 1.6;\n"
    ]);
    _templateObject7 = function() {
        return data;
    };
    return data;
}
function _templateObject8() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  list-style: none;\n  padding: 0;\n  margin: 0 0 32px 0;\n"
    ]);
    _templateObject8 = function() {
        return data;
    };
    return data;
}
function _templateObject9() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: 16px;\n  padding: 12px 0;\n  padding-left: 32px;\n  position: relative;\n  opacity: ",
        ";\n  \n  &::before {\n    content: '✓';\n    position: absolute;\n    left: 0;\n    font-weight: bold;\n    color: ",
        ";\n  }\n"
    ]);
    _templateObject9 = function() {
        return data;
    };
    return data;
}
function _templateObject10() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  width: 100%;\n  padding: 16px;\n  border-radius: 12px;\n  border: none;\n  font-size: 16px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n  \n  background: ",
        ";\n  color: ",
        ";\n  \n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);\n  }\n  \n  &:active {\n    transform: translateY(0);\n  }\n"
    ]);
    _templateObject10 = function() {
        return data;
    };
    return data;
}
;
;
;
const PricingContainer = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].section.withConfig({
    displayName: "PricingBlock__PricingContainer",
    componentId: "sc-3c11d464-0"
})(_templateObject());
_c = PricingContainer;
const SectionTitle = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].h2.withConfig({
    displayName: "PricingBlock__SectionTitle",
    componentId: "sc-3c11d464-1"
})(_templateObject1());
_c1 = SectionTitle;
const SectionSubtitle = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].p.withConfig({
    displayName: "PricingBlock__SectionSubtitle",
    componentId: "sc-3c11d464-2"
})(_templateObject2());
_c2 = SectionSubtitle;
const PricingGrid = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "PricingBlock__PricingGrid",
    componentId: "sc-3c11d464-3"
})(_templateObject3());
_c3 = PricingGrid;
const PricingCard = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "PricingBlock__PricingCard",
    componentId: "sc-3c11d464-4"
})(_templateObject4(), (props)=>props.featured ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white', (props)=>props.featured ? 'white' : '#2d3748', (props)=>props.featured && "\n    transform: scale(1.05);\n    z-index: 1;\n    \n    &::before {\n      content: 'ПОПУЛЯРНО';\n      position: absolute;\n      top: -12px;\n      left: 50%;\n      transform: translateX(-50%);\n      background: #fbbf24;\n      color: #1f2937;\n      padding: 6px 20px;\n      border-radius: 20px;\n      font-size: 12px;\n      font-weight: 700;\n    }\n  ", (props)=>props.featured ? 'scale(1.08)' : 'translateY(-8px)');
_c4 = PricingCard;
const PlanName = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].h3.withConfig({
    displayName: "PricingBlock__PlanName",
    componentId: "sc-3c11d464-5"
})(_templateObject5());
_c5 = PlanName;
const PlanPrice = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "PricingBlock__PlanPrice",
    componentId: "sc-3c11d464-6"
})(_templateObject6());
_c6 = PlanPrice;
const PlanDescription = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].p.withConfig({
    displayName: "PricingBlock__PlanDescription",
    componentId: "sc-3c11d464-7"
})(_templateObject7(), (props)=>props.featured ? '0.9' : '0.7');
_c7 = PlanDescription;
const FeaturesList = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].ul.withConfig({
    displayName: "PricingBlock__FeaturesList",
    componentId: "sc-3c11d464-8"
})(_templateObject8());
_c8 = FeaturesList;
const FeatureItem = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].li.withConfig({
    displayName: "PricingBlock__FeatureItem",
    componentId: "sc-3c11d464-9"
})(_templateObject9(), (props)=>props.featured ? '0.95' : '1', (props)=>props.featured ? '#fff' : '#48bb78');
_c9 = FeatureItem;
const CTAButton = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].button.withConfig({
    displayName: "PricingBlock__CTAButton",
    componentId: "sc-3c11d464-10"
})(_templateObject10(), (props)=>props.featured ? 'white' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', (props)=>props.featured ? '#667eea' : 'white');
_c10 = CTAButton;
const plans = [
    {
        name: 'Базовый',
        price: '9900',
        description: 'Идеально для начала пути в видеомонтаже',
        features: [
            'Доступ к урокам',
            'Практические задания',
            'Поддержка в чате',
            'Сертификат по окончании'
        ],
        featured: false
    },
    {
        name: 'Профессиональный',
        price: '14900',
        description: 'Самый популярный выбор для серьезного обучения',
        features: [
            'Все из базового',
            'Персональные разборы',
            'Прямые эфиры с преподавателями',
            'Доступ к закрытому сообществу',
            'Помощь в создании портфолио'
        ],
        featured: true
    },
    {
        name: 'VIP',
        price: '24900',
        description: 'Максимальная поддержка и индивидуальный подход',
        features: [
            'Все из профессионального',
            'Индивидуальные консультации',
            'Ментор на весь курс',
            'Гарантия трудоустройства',
            'Помощь в поиске первых клиентов'
        ],
        featured: false
    }
];
const PricingBlock = (param)=>{
    let { onSelectPlan } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PricingContainer, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                children: "Выбери свой тариф"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx",
                lineNumber: 189,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionSubtitle, {
                children: "Начни обучение уже сегодня и получи первые результаты уже через неделю"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx",
                lineNumber: 190,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PricingGrid, {
                children: plans.map((plan, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PricingCard, {
                        featured: plan.featured,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanName, {
                                children: plan.name
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx",
                                lineNumber: 194,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanPrice, {
                                children: [
                                    plan.price,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: " ₽"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx",
                                        lineNumber: 196,
                                        columnNumber: 27
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx",
                                lineNumber: 195,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanDescription, {
                                featured: plan.featured,
                                children: plan.description
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx",
                                lineNumber: 198,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeaturesList, {
                                children: plan.features.map((feature, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureItem, {
                                        featured: plan.featured,
                                        children: feature
                                    }, idx, false, {
                                        fileName: "[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx",
                                        lineNumber: 201,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx",
                                lineNumber: 199,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CTAButton, {
                                featured: plan.featured,
                                onClick: ()=>onSelectPlan && onSelectPlan(plan.name),
                                children: "Выбрать тариф"
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx",
                                lineNumber: 204,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, index, true, {
                        fileName: "[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx",
                        lineNumber: 193,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx",
                lineNumber: 191,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx",
        lineNumber: 188,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c11 = PricingBlock;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "PricingContainer");
__turbopack_context__.k.register(_c1, "SectionTitle");
__turbopack_context__.k.register(_c2, "SectionSubtitle");
__turbopack_context__.k.register(_c3, "PricingGrid");
__turbopack_context__.k.register(_c4, "PricingCard");
__turbopack_context__.k.register(_c5, "PlanName");
__turbopack_context__.k.register(_c6, "PlanPrice");
__turbopack_context__.k.register(_c7, "PlanDescription");
__turbopack_context__.k.register(_c8, "FeaturesList");
__turbopack_context__.k.register(_c9, "FeatureItem");
__turbopack_context__.k.register(_c10, "CTAButton");
__turbopack_context__.k.register(_c11, "PricingBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/JSprojects/editLab/components/CTABlock.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CTABlock",
    ()=>CTABlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/@swc/helpers/esm/_tagged_template_literal.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/styled-components/dist/styled-components.browser.esm.js [client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  0%, 100% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.05);\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  padding: 80px 20px;\n  margin: 60px 0;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  border-radius: 30px;\n  text-align: center;\n  position: relative;\n  overflow: hidden;\n  \n  &::before {\n    content: '';\n    position: absolute;\n    top: -50%;\n    right: -50%;\n    width: 200%;\n    height: 200%;\n    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);\n    animation: ",
        " 4s ease-in-out infinite;\n  }\n"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: clamp(32px, 4vw, 48px);\n  font-weight: 800;\n  color: white;\n  margin-bottom: 24px;\n  position: relative;\n  z-index: 1;\n"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
function _templateObject3() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  font-size: 20px;\n  color: rgba(255, 255, 255, 0.95);\n  margin-bottom: 40px;\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n  position: relative;\n  z-index: 1;\n  line-height: 1.6;\n"
    ]);
    _templateObject3 = function() {
        return data;
    };
    return data;
}
function _templateObject4() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  background: white;\n  color: #667eea;\n  border: none;\n  border-radius: 16px;\n  padding: 18px 48px;\n  font-size: 18px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n  position: relative;\n  z-index: 1;\n  \n  &:hover {\n    transform: translateY(-3px);\n    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);\n  }\n  \n  &:active {\n    transform: translateY(-1px);\n  }\n"
    ]);
    _templateObject4 = function() {
        return data;
    };
    return data;
}
;
;
;
const pulse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["keyframes"])(_templateObject());
const CTAContainer = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].section.withConfig({
    displayName: "CTABlock__CTAContainer",
    componentId: "sc-6d86dbb1-0"
})(_templateObject1(), pulse);
_c = CTAContainer;
const CTATitle = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].h2.withConfig({
    displayName: "CTABlock__CTATitle",
    componentId: "sc-6d86dbb1-1"
})(_templateObject2());
_c1 = CTATitle;
const CTAText = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].p.withConfig({
    displayName: "CTABlock__CTAText",
    componentId: "sc-6d86dbb1-2"
})(_templateObject3());
_c2 = CTAText;
const CTAButton = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].button.withConfig({
    displayName: "CTABlock__CTAButton",
    componentId: "sc-6d86dbb1-3"
})(_templateObject4());
_c3 = CTAButton;
const CTABlock = (param)=>{
    let { onClick } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CTAContainer, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CTATitle, {
                children: "Готов начать свой путь видеомейкера?"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/CTABlock.jsx",
                lineNumber: 81,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CTAText, {
                children: "Присоединяйся к тысячам студентов, которые уже создают потрясающий контент. Первый урок — бесплатно!"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/CTABlock.jsx",
                lineNumber: 82,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CTAButton, {
                onClick: onClick,
                children: "Начать обучение бесплатно"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/CTABlock.jsx",
                lineNumber: 86,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/JSprojects/editLab/components/CTABlock.jsx",
        lineNumber: 80,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c4 = CTABlock;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "CTAContainer");
__turbopack_context__.k.register(_c1, "CTATitle");
__turbopack_context__.k.register(_c2, "CTAText");
__turbopack_context__.k.register(_c3, "CTAButton");
__turbopack_context__.k.register(_c4, "CTABlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/JSprojects/editLab/pages/MainPage.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MainPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/@swc/helpers/esm/_tagged_template_literal.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/styled-components/dist/styled-components.browser.esm.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$ButtonReg$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/ButtonReg.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$FeaturesBlock$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/FeaturesBlock.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$SignUpForm$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/SignUpForm.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$HeroSection$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/HeroSection.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$ProgramBlock$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/ProgramBlock.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$TestimonialsBlock$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/TestimonialsBlock.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$PricingBlock$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$CTABlock$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/CTABlock.jsx [client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n    display: flex;\n    flex-direction: column;\n    max-width: 1400px;\n    margin: 0 auto;\n    padding: 0 20px;\n    min-height: 100vh;\n    font-family: 'Montserrat', sans-serif;\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n    margin-top: 100px;\n    padding: 40px 20px;\n    color: #718096;\n    font-size: 14px;\n    text-align: center;\n    border-top: 1px solid rgba(0, 0, 0, 0.05);\n"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}
function _templateObject2() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n    position: fixed;\n    bottom: 30px;\n    right: 30px;\n    width: 50px;\n    height: 50px;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    border-radius: 50%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: white;\n    font-size: 24px;\n    cursor: pointer;\n    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);\n    transition: transform 0.2s ease, box-shadow 0.2s ease;\n    z-index: 100;\n    \n    &:hover {\n        transform: translateY(-5px);\n        box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);\n    }\n"
    ]);
    _templateObject2 = function() {
        return data;
    };
    return data;
}
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
;
const MainPageContainer = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "MainPage__MainPageContainer",
    componentId: "sc-3ac2c708-0"
})(_templateObject());
_c = MainPageContainer;
const FooterSection = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].footer.withConfig({
    displayName: "MainPage__FooterSection",
    componentId: "sc-3ac2c708-1"
})(_templateObject1());
_c1 = FooterSection;
const ScrollIndicator = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "MainPage__ScrollIndicator",
    componentId: "sc-3ac2c708-2"
})(_templateObject2());
_c2 = ScrollIndicator;
function MainPage() {
    _s();
    const [clickNumber, setClickNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = (e)=>{
        var _e_preventDefault;
        e === null || e === void 0 ? void 0 : (_e_preventDefault = e.preventDefault) === null || _e_preventDefault === void 0 ? void 0 : _e_preventDefault.call(e);
        setSubmitted(true);
    };
    const handleSelectPlan = (planName)=>{
        console.log('Selected plan:', planName);
    // Здесь можно добавить логику выбора тарифа
    };
    const scrollToTop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const handleCTAClick = ()=>{
        var _document_querySelector;
        window.scrollTo({
            top: ((_document_querySelector = document.querySelector('section')) === null || _document_querySelector === void 0 ? void 0 : _document_querySelector.offsetTop) || 0,
            behavior: 'smooth'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MainPageContainer, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$HeroSection$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["HeroSection"], {
                clickNumber: clickNumber
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 83,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$ButtonReg$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["ButtonReg"], {
                clickNumber: clickNumber,
                setClickNumber: setClickNumber
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 85,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$FeaturesBlock$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["FeaturesBlock"], {
                clickNumber: clickNumber
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 90,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$ProgramBlock$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["ProgramBlock"], {}, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 92,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$TestimonialsBlock$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["TestimonialsBlock"], {}, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 94,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$PricingBlock$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["PricingBlock"], {
                onSelectPlan: handleSelectPlan
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 96,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$CTABlock$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["CTABlock"], {
                onClick: handleCTAClick
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 98,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$SignUpForm$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SignUpForm"], {
                handleSubmit: handleSubmit,
                submitted: submitted,
                email: email,
                setEmail: setEmail
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 100,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterSection, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "© 2025 EditLab — курс по видеомонтажу"
                    }, void 0, false, {
                        fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                        lineNumber: 108,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            marginTop: '8px',
                            fontSize: '12px',
                            opacity: 0.7
                        },
                        children: "Все права защищены"
                    }, void 0, false, {
                        fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                        lineNumber: 109,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 107,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollIndicator, {
                onClick: scrollToTop,
                title: "Наверх",
                children: "↑"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 114,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
        lineNumber: 82,
        columnNumber: 9
    }, this);
}
_s(MainPage, "hvVEbhsNWwPwWed7T9Hi/5K62z0=");
_c3 = MainPage;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "MainPageContainer");
__turbopack_context__.k.register(_c1, "FooterSection");
__turbopack_context__.k.register(_c2, "ScrollIndicator");
__turbopack_context__.k.register(_c3, "MainPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/JSprojects/editLab/app/App.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "App",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/@swc/helpers/esm/_tagged_template_literal.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$pages$2f$MainPage$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/pages/MainPage.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/styled-components/dist/styled-components.browser.esm.js [client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  * {\n    box-sizing: border-box;\n  }\n\n  body {\n    margin: 0;\n    padding: 0;\n    min-height: 100vh;\n    background: linear-gradient(135deg, #f8f9ff 0%, #dde6ff 50%, #f5f0ff 100%);\n    background-attachment: fixed;\n    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    color: #2d3748;\n  }\n\n  code {\n    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;\n  }\n\n  html {\n    scroll-behavior: smooth;\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
;
;
;
const GlobalStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createGlobalStyle"])(_templateObject());
_c = GlobalStyle;
const App = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GlobalStyle, {}, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/app/App.js",
                lineNumber: 41,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$pages$2f$MainPage$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/app/App.js",
                lineNumber: 42,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_c1 = App;
var _c, _c1;
__turbopack_context__.k.register(_c, "GlobalStyle");
__turbopack_context__.k.register(_c1, "App");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/JSprojects/editLab/pages/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$app$2f$App$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/app/App.js [client] (ecmascript)");
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$app$2f$App$2e$js__$5b$client$5d$__$28$ecmascript$29$__["App"], {}, void 0, false, {
        fileName: "[project]/Documents/JSprojects/editLab/pages/index.js",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/Documents/JSprojects/editLab/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/Documents/JSprojects/editLab/pages/index.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/Documents/JSprojects/editLab/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/Documents/JSprojects/editLab/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__94b03cec._.js.map