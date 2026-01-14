module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[externals]/styled-components [external] (styled-components, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("styled-components", () => require("styled-components"));

module.exports = mod;
}),
"[project]/Documents/JSprojects/editLab/components/ButtonReg.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ButtonReg",
    ()=>ButtonReg
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-components [external] (styled-components, cjs)");
;
;
;
const pulse = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["keyframes"]`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
  }
  50% {
    box-shadow: 0 0 0 20px rgba(99, 102, 241, 0);
  }
`;
const ButtonContainer = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].button.withConfig({
    displayName: "ButtonReg__ButtonContainer",
    componentId: "sc-ef88970a-0"
})`
  cursor: pointer;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 18px 48px;
  font-size: 18px;
  font-weight: 700;
  font-family: inherit;
  align-self: center;
  margin-top: 50px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(99, 102, 241, 0.4);
    
    &::before {
      width: 300px;
      height: 300px;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  span {
    position: relative;
    z-index: 1;
  }
`;
const ButtonReg = ({ clickNumber, setClickNumber })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ButtonContainer, {
        onClick: ()=>setClickNumber(clickNumber + 1),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
}),
"[project]/Documents/JSprojects/editLab/components/FeaturesBlock.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeaturesBlock",
    ()=>FeaturesBlock
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-components [external] (styled-components, cjs)");
;
;
;
const FeaturesContainer = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].section.withConfig({
    displayName: "FeaturesBlock__FeaturesContainer",
    componentId: "sc-a6d39310-0"
})`
  padding: 80px 20px;
  margin: 40px 0;
`;
const SectionTitle = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].h2.withConfig({
    displayName: "FeaturesBlock__SectionTitle",
    componentId: "sc-a6d39310-1"
})`
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
const FeaturesGrid = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "FeaturesBlock__FeaturesGrid",
    componentId: "sc-a6d39310-2"
})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;
const FeatureCard = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "FeaturesBlock__FeatureCard",
    componentId: "sc-a6d39310-3"
})`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
  border-radius: 24px;
  padding: 40px 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(99, 102, 241, 0.2);
  }
`;
const FeatureIcon = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "FeaturesBlock__FeatureIcon",
    componentId: "sc-a6d39310-4"
})`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 36px;
  color: white;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
`;
const FeatureTitle = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].h3.withConfig({
    displayName: "FeaturesBlock__FeatureTitle",
    componentId: "sc-a6d39310-5"
})`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #2d3748;
`;
const FeatureDescription = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].p.withConfig({
    displayName: "FeaturesBlock__FeatureDescription",
    componentId: "sc-a6d39310-6"
})`
  font-size: 16px;
  color: #4a5568;
  line-height: 1.6;
`;
const HighlightText = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].span.withConfig({
    displayName: "FeaturesBlock__HighlightText",
    componentId: "sc-a6d39310-7"
})`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
`;
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
const FeaturesBlock = ({ clickNumber })=>{
    const updatedFeatures = features.map((feature, index)=>{
        if (index === 3) {
            return {
                ...feature,
                description: `Нас выбрали уже ${clickNumber} человек! Присоединяйся к сообществу единомышленников и развивайся вместе`
            };
        }
        return feature;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FeaturesContainer, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(SectionTitle, {
                children: "Почему EditLab?"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/FeaturesBlock.jsx",
                lineNumber: 135,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FeaturesGrid, {
                children: updatedFeatures.map((feature, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FeatureCard, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FeatureIcon, {
                                children: feature.icon
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/FeaturesBlock.jsx",
                                lineNumber: 139,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FeatureTitle, {
                                children: feature.title
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/FeaturesBlock.jsx",
                                lineNumber: 140,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FeatureDescription, {
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
}),
"[project]/Documents/JSprojects/editLab/components/SignUpForm.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SignUpForm",
    ()=>SignUpForm
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-components [external] (styled-components, cjs)");
;
;
;
const fadeIn = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["keyframes"]`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const FormContainer = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].section.withConfig({
    displayName: "SignUpForm__FormContainer",
    componentId: "sc-3fde6398-0"
})`
  padding: 80px 20px;
  margin: 40px 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%);
  border-radius: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;
const FormTitle = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].h3.withConfig({
    displayName: "SignUpForm__FormTitle",
    componentId: "sc-3fde6398-1"
})`
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 700;
  margin-bottom: 16px;
  color: #2d3748;
`;
const FormSubtitle = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].p.withConfig({
    displayName: "SignUpForm__FormSubtitle",
    componentId: "sc-3fde6398-2"
})`
  font-size: 16px;
  color: #718096;
  margin-bottom: 40px;
  line-height: 1.6;
`;
const FormSection = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].form.withConfig({
    displayName: "SignUpForm__FormSection",
    componentId: "sc-3fde6398-3"
})`
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${fadeIn} 0.5s ease-out;
  
  @media (min-width: 640px) {
    flex-direction: row;
  }
`;
const InputBlock = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].input.withConfig({
    displayName: "SignUpForm__InputBlock",
    componentId: "sc-3fde6398-4"
})`
  flex: 1;
  padding: 16px 20px;
  font-size: 16px;
  border-radius: 12px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  font-family: inherit;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  
  &::placeholder {
    color: #a0aec0;
  }
`;
const ButtonSend = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].button.withConfig({
    displayName: "SignUpForm__ButtonSend",
    componentId: "sc-3fde6398-5"
})`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  cursor: pointer;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (min-width: 640px) {
    flex-shrink: 0;
  }
`;
const SuccessMessage = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "SignUpForm__SuccessMessage",
    componentId: "sc-3fde6398-6"
})`
  padding: 24px;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 600;
  animation: ${fadeIn} 0.5s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;
const SuccessIcon = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].span.withConfig({
    displayName: "SignUpForm__SuccessIcon",
    componentId: "sc-3fde6398-7"
})`
  font-size: 24px;
`;
const SignUpForm = ({ submitted, handleSubmit, setEmail, email })=>{
    const [localEmail, setLocalEmail] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(email || '');
    const handleFormSubmit = (e)=>{
        e.preventDefault();
        setEmail(localEmail);
        handleSubmit(e);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FormContainer, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FormTitle, {
                children: "Узнай о старте курса первым"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/SignUpForm.jsx",
                lineNumber: 128,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FormSubtitle, {
                children: "Оставь email и получи уведомление о запуске нового потока. Первым 100 участникам — скидка 20%!"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/SignUpForm.jsx",
                lineNumber: 129,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            submitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(SuccessMessage, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(SuccessIcon, {
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
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FormSection, {
                onSubmit: handleFormSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(InputBlock, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ButtonSend, {
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
}),
"[project]/Documents/JSprojects/editLab/components/HeroSection.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroSection",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-components [external] (styled-components, cjs)");
;
;
;
const fadeInUp = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["keyframes"]`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const HeroContainer = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].section.withConfig({
    displayName: "HeroSection__HeroContainer",
    componentId: "sc-c283fcd9-0"
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
  border-radius: 30px;
  margin: 40px 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
    animation: ${fadeInUp} 3s ease-in-out infinite alternate;
  }
`;
const HeroTitle = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].h1.withConfig({
    displayName: "HeroSection__HeroTitle",
    componentId: "sc-c283fcd9-1"
})`
  font-size: clamp(36px, 6vw, 72px);
  font-weight: 800;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${fadeInUp} 0.8s ease-out;
  position: relative;
  z-index: 1;
  line-height: 1.2;
`;
const HeroSubtitle = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].p.withConfig({
    displayName: "HeroSection__HeroSubtitle",
    componentId: "sc-c283fcd9-2"
})`
  font-size: clamp(18px, 2.5vw, 24px);
  color: #4a5568;
  margin-bottom: 40px;
  max-width: 700px;
  line-height: 1.6;
  animation: ${fadeInUp} 1s ease-out;
  position: relative;
  z-index: 1;
`;
const StatsContainer = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "HeroSection__StatsContainer",
    componentId: "sc-c283fcd9-3"
})`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 60px;
  animation: ${fadeInUp} 1.2s ease-out;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    gap: 24px;
  }
`;
const StatItem = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "HeroSection__StatItem",
    componentId: "sc-c283fcd9-4"
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  min-width: 150px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.2);
  }
`;
const StatNumber = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "HeroSection__StatNumber",
    componentId: "sc-c283fcd9-5"
})`
  font-size: 36px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
const StatLabel = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "HeroSection__StatLabel",
    componentId: "sc-c283fcd9-6"
})`
  font-size: 14px;
  color: #718096;
  margin-top: 8px;
  text-align: center;
`;
const HeroSection = ({ clickNumber })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(HeroContainer, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(HeroTitle, {
                children: "EditLab — курс по видеомонтажу"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/HeroSection.jsx",
                lineNumber: 116,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(HeroSubtitle, {
                children: "Научись монтировать видео профессионально — от клипов до YouTube-шоу. Стань востребованным видеомейкером и создавай контент, который покоряет миллионы"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/HeroSection.jsx",
                lineNumber: 117,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(StatsContainer, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(StatItem, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(StatNumber, {
                                children: "1000+"
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/HeroSection.jsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(StatLabel, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(StatItem, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(StatNumber, {
                                children: "50+"
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/HeroSection.jsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(StatLabel, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(StatItem, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(StatNumber, {
                                children: clickNumber
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/HeroSection.jsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(StatLabel, {
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
}),
"[project]/Documents/JSprojects/editLab/components/ProgramBlock.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProgramBlock",
    ()=>ProgramBlock
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-components [external] (styled-components, cjs)");
;
;
;
const ProgramContainer = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].section.withConfig({
    displayName: "ProgramBlock__ProgramContainer",
    componentId: "sc-2cbd0b04-0"
})`
  padding: 80px 20px;
  margin: 40px 0;
`;
const SectionTitle = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].h2.withConfig({
    displayName: "ProgramBlock__SectionTitle",
    componentId: "sc-2cbd0b04-1"
})`
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
const ModulesGrid = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "ProgramBlock__ModulesGrid",
    componentId: "sc-2cbd0b04-2"
})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;
const ModuleCard = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "ProgramBlock__ModuleCard",
    componentId: "sc-2cbd0b04-3"
})`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
  border-radius: 24px;
  padding: 40px 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 48px rgba(99, 102, 241, 0.2);
  }
  
  &:nth-child(1)::before {
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  }
  &:nth-child(2)::before {
    background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
  }
  &:nth-child(3)::before {
    background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  }
  &:nth-child(4)::before {
    background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
  }
`;
const ModuleNumber = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "ProgramBlock__ModuleNumber",
    componentId: "sc-2cbd0b04-4"
})`
  font-size: 48px;
  font-weight: 800;
  opacity: 0.1;
  position: absolute;
  top: 20px;
  right: 20px;
  line-height: 1;
`;
const ModuleTitle = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].h3.withConfig({
    displayName: "ProgramBlock__ModuleTitle",
    componentId: "sc-2cbd0b04-5"
})`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #2d3748;
`;
const ModuleDescription = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].p.withConfig({
    displayName: "ProgramBlock__ModuleDescription",
    componentId: "sc-2cbd0b04-6"
})`
  font-size: 16px;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 20px;
`;
const ModuleFeatures = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].ul.withConfig({
    displayName: "ProgramBlock__ModuleFeatures",
    componentId: "sc-2cbd0b04-7"
})`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const ModuleFeature = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].li.withConfig({
    displayName: "ProgramBlock__ModuleFeature",
    componentId: "sc-2cbd0b04-8"
})`
  font-size: 14px;
  color: #718096;
  padding: 8px 0;
  padding-left: 24px;
  position: relative;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #48bb78;
    font-weight: bold;
  }
`;
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ProgramContainer, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(SectionTitle, {
                children: "Программа курса"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/ProgramBlock.jsx",
                lineNumber: 142,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ModulesGrid, {
                children: modules.map((module, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ModuleCard, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ModuleNumber, {
                                children: module.number
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/ProgramBlock.jsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ModuleTitle, {
                                children: module.title
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/ProgramBlock.jsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ModuleDescription, {
                                children: module.description
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/ProgramBlock.jsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ModuleFeatures, {
                                children: module.features.map((feature, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ModuleFeature, {
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
}),
"[project]/Documents/JSprojects/editLab/components/TestimonialsBlock.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TestimonialsBlock",
    ()=>TestimonialsBlock
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-components [external] (styled-components, cjs)");
;
;
;
const TestimonialsContainer = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].section.withConfig({
    displayName: "TestimonialsBlock__TestimonialsContainer",
    componentId: "sc-41ee7d7d-0"
})`
  padding: 80px 20px;
  margin: 40px 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%);
  border-radius: 30px;
`;
const SectionTitle = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].h2.withConfig({
    displayName: "TestimonialsBlock__SectionTitle",
    componentId: "sc-41ee7d7d-1"
})`
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
const TestimonialsGrid = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "TestimonialsBlock__TestimonialsGrid",
    componentId: "sc-41ee7d7d-2"
})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;
const TestimonialCard = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "TestimonialsBlock__TestimonialCard",
    componentId: "sc-41ee7d7d-3"
})`
  background: white;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(99, 102, 241, 0.15);
  }
  
  &::before {
    content: '"';
    position: absolute;
    top: 20px;
    left: 30px;
    font-size: 80px;
    color: rgba(99, 102, 241, 0.1);
    font-family: Georgia, serif;
    line-height: 1;
  }
`;
const TestimonialText = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].p.withConfig({
    displayName: "TestimonialsBlock__TestimonialText",
    componentId: "sc-41ee7d7d-4"
})`
  font-size: 16px;
  color: #2d3748;
  line-height: 1.7;
  margin-bottom: 24px;
  font-style: italic;
  position: relative;
  z-index: 1;
`;
const TestimonialAuthor = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "TestimonialsBlock__TestimonialAuthor",
    componentId: "sc-41ee7d7d-5"
})`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;
const AuthorAvatar = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "TestimonialsBlock__AuthorAvatar",
    componentId: "sc-41ee7d7d-6"
})`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 20px;
`;
const AuthorInfo = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "TestimonialsBlock__AuthorInfo",
    componentId: "sc-41ee7d7d-7"
})`
  display: flex;
  flex-direction: column;
`;
const AuthorName = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "TestimonialsBlock__AuthorName",
    componentId: "sc-41ee7d7d-8"
})`
  font-weight: 600;
  color: #2d3748;
  font-size: 16px;
`;
const AuthorRole = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "TestimonialsBlock__AuthorRole",
    componentId: "sc-41ee7d7d-9"
})`
  font-size: 14px;
  color: #718096;
`;
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(TestimonialsContainer, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(SectionTitle, {
                children: "Отзывы выпускников"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/TestimonialsBlock.jsx",
                lineNumber: 123,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(TestimonialsGrid, {
                children: testimonials.map((testimonial, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(TestimonialCard, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(TestimonialText, {
                                children: testimonial.text
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/TestimonialsBlock.jsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(TestimonialAuthor, {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(AuthorAvatar, {
                                        children: testimonial.name.charAt(0)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/JSprojects/editLab/components/TestimonialsBlock.jsx",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(AuthorInfo, {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(AuthorName, {
                                                children: testimonial.name
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/JSprojects/editLab/components/TestimonialsBlock.jsx",
                                                lineNumber: 131,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(AuthorRole, {
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
}),
"[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PricingBlock",
    ()=>PricingBlock
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-components [external] (styled-components, cjs)");
;
;
;
const PricingContainer = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].section.withConfig({
    displayName: "PricingBlock__PricingContainer",
    componentId: "sc-3c11d464-0"
})`
  padding: 80px 20px;
  margin: 40px 0;
`;
const SectionTitle = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].h2.withConfig({
    displayName: "PricingBlock__SectionTitle",
    componentId: "sc-3c11d464-1"
})`
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
const SectionSubtitle = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].p.withConfig({
    displayName: "PricingBlock__SectionSubtitle",
    componentId: "sc-3c11d464-2"
})`
  text-align: center;
  font-size: 18px;
  color: #718096;
  margin-bottom: 60px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;
const PricingGrid = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "PricingBlock__PricingGrid",
    componentId: "sc-3c11d464-3"
})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;
const PricingCard = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "PricingBlock__PricingCard",
    componentId: "sc-3c11d464-4"
})`
  background: ${(props)=>props.featured ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  color: ${(props)=>props.featured ? 'white' : '#2d3748'};
  
  ${(props)=>props.featured && `
    transform: scale(1.05);
    z-index: 1;
    
    &::before {
      content: 'ПОПУЛЯРНО';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: #fbbf24;
      color: #1f2937;
      padding: 6px 20px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
    }
  `}
  
  &:hover {
    transform: ${(props)=>props.featured ? 'scale(1.08)' : 'translateY(-8px)'};
    box-shadow: 0 16px 48px rgba(99, 102, 241, 0.2);
  }
`;
const PlanName = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].h3.withConfig({
    displayName: "PricingBlock__PlanName",
    componentId: "sc-3c11d464-5"
})`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
`;
const PlanPrice = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "PricingBlock__PlanPrice",
    componentId: "sc-3c11d464-6"
})`
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 8px;
  
  span {
    font-size: 20px;
    font-weight: 400;
    opacity: 0.8;
  }
`;
const PlanDescription = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].p.withConfig({
    displayName: "PricingBlock__PlanDescription",
    componentId: "sc-3c11d464-7"
})`
  font-size: 16px;
  opacity: ${(props)=>props.featured ? '0.9' : '0.7'};
  margin-bottom: 32px;
  line-height: 1.6;
`;
const FeaturesList = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].ul.withConfig({
    displayName: "PricingBlock__FeaturesList",
    componentId: "sc-3c11d464-8"
})`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
`;
const FeatureItem = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].li.withConfig({
    displayName: "PricingBlock__FeatureItem",
    componentId: "sc-3c11d464-9"
})`
  font-size: 16px;
  padding: 12px 0;
  padding-left: 32px;
  position: relative;
  opacity: ${(props)=>props.featured ? '0.95' : '1'};
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    font-weight: bold;
    color: ${(props)=>props.featured ? '#fff' : '#48bb78'};
  }
`;
const CTAButton = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].button.withConfig({
    displayName: "PricingBlock__CTAButton",
    componentId: "sc-3c11d464-10"
})`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  background: ${(props)=>props.featured ? 'white' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: ${(props)=>props.featured ? '#667eea' : 'white'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
`;
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
const PricingBlock = ({ onSelectPlan })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PricingContainer, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(SectionTitle, {
                children: "Выбери свой тариф"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx",
                lineNumber: 189,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(SectionSubtitle, {
                children: "Начни обучение уже сегодня и получи первые результаты уже через неделю"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx",
                lineNumber: 190,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PricingGrid, {
                children: plans.map((plan, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PricingCard, {
                        featured: plan.featured,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PlanName, {
                                children: plan.name
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx",
                                lineNumber: 194,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PlanPrice, {
                                children: [
                                    plan.price,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PlanDescription, {
                                featured: plan.featured,
                                children: plan.description
                            }, void 0, false, {
                                fileName: "[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx",
                                lineNumber: 198,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FeaturesList, {
                                children: plan.features.map((feature, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FeatureItem, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CTAButton, {
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
}),
"[project]/Documents/JSprojects/editLab/components/CTABlock.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CTABlock",
    ()=>CTABlock
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-components [external] (styled-components, cjs)");
;
;
;
const pulse = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["keyframes"]`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;
const CTAContainer = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].section.withConfig({
    displayName: "CTABlock__CTAContainer",
    componentId: "sc-6d86dbb1-0"
})`
  padding: 80px 20px;
  margin: 60px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 30px;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: ${pulse} 4s ease-in-out infinite;
  }
`;
const CTATitle = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].h2.withConfig({
    displayName: "CTABlock__CTATitle",
    componentId: "sc-6d86dbb1-1"
})`
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 800;
  color: white;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
`;
const CTAText = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].p.withConfig({
    displayName: "CTABlock__CTAText",
    componentId: "sc-6d86dbb1-2"
})`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
  line-height: 1.6;
`;
const CTAButton = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].button.withConfig({
    displayName: "CTABlock__CTAButton",
    componentId: "sc-6d86dbb1-3"
})`
  background: white;
  color: #667eea;
  border: none;
  border-radius: 16px;
  padding: 18px 48px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  z-index: 1;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;
const CTABlock = ({ onClick })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CTAContainer, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CTATitle, {
                children: "Готов начать свой путь видеомейкера?"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/CTABlock.jsx",
                lineNumber: 81,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CTAText, {
                children: "Присоединяйся к тысячам студентов, которые уже создают потрясающий контент. Первый урок — бесплатно!"
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/components/CTABlock.jsx",
                lineNumber: 82,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CTAButton, {
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
}),
"[project]/Documents/JSprojects/editLab/pages/MainPage.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MainPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-components [external] (styled-components, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$ButtonReg$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/ButtonReg.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$FeaturesBlock$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/FeaturesBlock.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$SignUpForm$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/SignUpForm.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$HeroSection$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/HeroSection.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$ProgramBlock$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/ProgramBlock.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$TestimonialsBlock$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/TestimonialsBlock.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$PricingBlock$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/PricingBlock.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$CTABlock$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/CTABlock.jsx [ssr] (ecmascript)");
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
;
const MainPageContainer = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "MainPage__MainPageContainer",
    componentId: "sc-3ac2c708-0"
})`
    display: flex;
    flex-direction: column;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
    min-height: 100vh;
    font-family: 'Montserrat', sans-serif;
`;
const FooterSection = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].footer.withConfig({
    displayName: "MainPage__FooterSection",
    componentId: "sc-3ac2c708-1"
})`
    margin-top: 100px;
    padding: 40px 20px;
    color: #718096;
    font-size: 14px;
    text-align: center;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
`;
const ScrollIndicator = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].div.withConfig({
    displayName: "MainPage__ScrollIndicator",
    componentId: "sc-3ac2c708-2"
})`
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    z-index: 100;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
    }
`;
function MainPage() {
    const [clickNumber, setClickNumber] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const handleSubmit = (e)=>{
        e?.preventDefault?.();
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
        window.scrollTo({
            top: document.querySelector('section')?.offsetTop || 0,
            behavior: 'smooth'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(MainPageContainer, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$HeroSection$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["HeroSection"], {
                clickNumber: clickNumber
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 83,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$ButtonReg$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["ButtonReg"], {
                clickNumber: clickNumber,
                setClickNumber: setClickNumber
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 85,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$FeaturesBlock$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["FeaturesBlock"], {
                clickNumber: clickNumber
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 90,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$ProgramBlock$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["ProgramBlock"], {}, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 92,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$TestimonialsBlock$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TestimonialsBlock"], {}, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 94,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$PricingBlock$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["PricingBlock"], {
                onSelectPlan: handleSelectPlan
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 96,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$CTABlock$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["CTABlock"], {
                onClick: handleCTAClick
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 98,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$SignUpForm$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SignUpForm"], {
                handleSubmit: handleSubmit,
                submitted: submitted,
                email: email,
                setEmail: setEmail
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 100,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FooterSection, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        children: "© 2025 EditLab — курс по видеомонтажу"
                    }, void 0, false, {
                        fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                        lineNumber: 108,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ScrollIndicator, {
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
}),
"[project]/Documents/JSprojects/editLab/app/App.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "App",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$pages$2f$MainPage$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/pages/MainPage.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-components [external] (styled-components, cjs)");
;
;
;
;
const GlobalStyle = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["createGlobalStyle"]`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8f9ff 0%, #dde6ff 50%, #f5f0ff 100%);
    background-attachment: fixed;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2d3748;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  html {
    scroll-behavior: smooth;
  }
`;
const App = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(GlobalStyle, {}, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/app/App.js",
                lineNumber: 41,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$pages$2f$MainPage$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/app/App.js",
                lineNumber: 42,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
}),
"[project]/Documents/JSprojects/editLab/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$app$2f$App$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/app/App.js [ssr] (ecmascript)");
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$app$2f$App$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["App"], {}, void 0, false, {
        fileName: "[project]/Documents/JSprojects/editLab/pages/index.js",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__75d2c8fc._.js.map