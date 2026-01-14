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
"[project]/Documents/JSprojects/editLab/pages/MainPage.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MainPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/@swc/helpers/esm/_tagged_template_literal.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$ButtonReg$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/ButtonReg.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/node_modules/styled-components/dist/styled-components.browser.esm.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$FeaturesBlock$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/FeaturesBlock.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$SignUpForm$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/SignUpForm.jsx [client] (ecmascript)");
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n    display: flex;\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: 0 20px;\n    flex-direction: column;\n    min-height: 100vh;\n    font-family: 'Montserrat', sans-serif;\n    justify-content: space-between;\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])([
        "\n    margin-top: 80px;\n    color: #888;\n    font-size: 14px;\n    align-self: center;\n"
    ]);
    _templateObject1 = function() {
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
function MainPage() {
    _s();
    const [clickNumber, setClickNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = (e)=>{
        setSubmitted(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MainPageContainer, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontSize: "50px",
                            marginBottom: "10px"
                        },
                        children: "EditLab — курс по видеомонтажу"
                    }, void 0, false, {
                        fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                        lineNumber: 37,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: "18px",
                            marginBottom: "20px",
                            textAlign: "center"
                        },
                        children: "Научись монтировать видео профессионально — от клипов до YouTube-шоу."
                    }, void 0, false, {
                        fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                        lineNumber: 38,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$ButtonReg$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["ButtonReg"], {
                        clickNumber: clickNumber,
                        setClickNumber: setClickNumber
                    }, void 0, false, {
                        fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                        lineNumber: 42,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 36,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$FeaturesBlock$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["FeaturesBlock"], {
                clickNumber: clickNumber
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 49,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$SignUpForm$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["SignUpForm"], {
                handleSubmit: handleSubmit,
                submitted: submitted,
                email: email,
                setEmail: setEmail
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 51,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterSection, {
                children: "© 2025 EditLab — курс по видеомонтажу"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 58,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
        lineNumber: 35,
        columnNumber: 9
    }, this);
}
_s(MainPage, "pegGK+yQSoZxgKAZv3f8Z7IOE+c=");
_c2 = MainPage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "MainPageContainer");
__turbopack_context__.k.register(_c1, "FooterSection");
__turbopack_context__.k.register(_c2, "MainPage");
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
        "\n  body {\n    margin: 0;\n    padding: 3% 0;\n    min-height: 100vh;\n    background: linear-gradient(135deg, #f8f9ff 0%, #dde6ff 100%);\n    font-family: 'Montserrat', sans-serif;\n  }\n"
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
                lineNumber: 24,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$pages$2f$MainPage$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/app/App.js",
                lineNumber: 25,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__d8b24968._.js.map