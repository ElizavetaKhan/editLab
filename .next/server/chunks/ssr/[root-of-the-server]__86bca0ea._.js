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
"[project]/Documents/JSprojects/editLab/pages/MainPage.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MainPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$ButtonReg$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/ButtonReg.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-components [external] (styled-components, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$FeaturesBlock$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/FeaturesBlock.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$SignUpForm$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/JSprojects/editLab/components/SignUpForm.jsx [ssr] (ecmascript)");
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
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    flex-direction: column;
    min-height: 100vh;
    font-family: 'Montserrat', sans-serif;
    justify-content: space-between;
`;
const FooterSection = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["default"].footer.withConfig({
    displayName: "MainPage__FooterSection",
    componentId: "sc-3ac2c708-1"
})`
    margin-top: 80px;
    color: #888;
    font-size: 14px;
    align-self: center;
`;
function MainPage() {
    const [clickNumber, setClickNumber] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const handleSubmit = (e)=>{
        setSubmitted(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(MainPageContainer, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$ButtonReg$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["ButtonReg"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$FeaturesBlock$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["FeaturesBlock"], {
                clickNumber: clickNumber
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 49,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$components$2f$SignUpForm$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SignUpForm"], {
                handleSubmit: handleSubmit,
                submitted: submitted,
                email: email,
                setEmail: setEmail
            }, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/pages/MainPage.jsx",
                lineNumber: 51,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FooterSection, {
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
;
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
  body {
    margin: 0;
    padding: 3% 0;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8f9ff 0%, #dde6ff 100%);
    font-family: 'Montserrat', sans-serif;
  }
`;
const App = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(GlobalStyle, {}, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/app/App.js",
                lineNumber: 24,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$JSprojects$2f$editLab$2f$pages$2f$MainPage$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Documents/JSprojects/editLab/app/App.js",
                lineNumber: 25,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__86bca0ea._.js.map