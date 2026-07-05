var salespeakLaunchersScript;(()=>{"use strict";var it={7955(u,h,r){r.d(h,{A:()=>s});var b=r(7657);class g{constructor(){const o=[document.currentScript,document.getElementById("salespeak-widget-loader"),document.querySelector('script[data-org-id][src*="salespeak"]')].find(ae=>ae?.getAttribute("data-org-id"));if(!o){console.error("[Salespeak] Could not locate widget loader script \u2014 widget will not mount.");return}const S=o.getAttribute("data-autofocus")||"off",y=o.getAttribute("data-autoplay")||!1,w=o.getAttribute("data-brain-url")||"https://brain.salespeak.ai",I=o.getAttribute("data-campaign-id"),Y=o.getAttribute("data-floating-input-action")||b.uA,C=o.getAttribute("data-focus-container-selector"),R=o.getAttribute("data-header-selector"),V=o.getAttribute("data-header-offset")?parseFloat(o.getAttribute("data-header-offset")):null,j=o.getAttribute("data-mobile-header-selector"),he=o.getAttribute("data-enable-mobile-header-detection")!=="false",P=o.getAttribute("data-hide-mascot")||!1,A=o.getAttribute("data-admin")==="true",_=o.getAttribute("data-preview-viewport-mobile")==="true",x=o.getAttribute("data-is-website-preview")||!1,d=o.getAttribute("data-launcher")||b.uA,p=o.getAttribute("data-model")||"",N=o.getAttribute("data-org-id"),$=o.getAttribute("data-selector"),k=o.getAttribute("data-settings-url")||"https://hpklbne62y3wpitjb6lc6zyxza0wobdv.lambda-url.us-west-2.on.aws",q=o.getAttribute("data-cloud-front-chat-url")||"https://d17d545dtg43nl.cloudfront.net/prod/app-be-prod-chat",l=o.getAttribute("data-tracking-url")||"https://22i9zfydr3.execute-api.us-west-2.amazonaws.com/prod/event_stream",m=o.getAttribute("data-show-walkthrough")||!1,T=o.getAttribute("data-side-container-selector"),B=o.getAttribute("data-mascot-container-selector"),E=o.getAttribute("data-sticky-container-selector"),O=o.getAttribute("data-drawer-container-selector"),J=o.getAttribute("data-chooser-container-selector"),D=o.getAttribute("data-chat-only-container-selector"),me=o.getAttribute("data-persona-switch-container-selector"),X=o.getAttribute("data-dynamic-campaign-cookie-name")||"salespeak_dynamic_campaign_id",te=o.getAttribute("data-auto-init")!=="false",fe=o.getAttribute("data-reset-on-page-change")!=="false",ne=o.getAttribute("data-consent-mode"),Ce={"www.repspark.com":"hubspot","repspark.com":"hubspot"};let be=null;ne==="off"?be=null:ne?be=ne:be=Ce[window.location.hostname]||null;const re={city:"",company:"",country:"",email:"",name:"",phone:"",role:"",metadata:{}};try{const ae=JSON.parse(o.getAttribute("data-user-info"));re.city=ae?.city||"",re.company=ae?.company||"",re.country=ae?.country||"",re.email=ae?.email||"",re.name=ae?.name||"",re.phone=ae?.phone||"",re.role=ae?.role||"",re.metadata=ae?.metadata||{}}catch(ae){console.error("Error parsing user info:",ae)}const Ae=o.getAttribute("data-fixed-height")||"90vh",He=/^[0-9]*$/.test(Ae)?`${Ae}px`:Ae,ge=new URLSearchParams(window.location.search),Fe=ge.get("sessionId"),Ue=Fe||o.getAttribute("data-session-id"),We=ge.get("salespeakInitWithDrawer"),Ee=o.getAttribute("data-theme-preview")||null,Me=ge.get("salespeakInitUserEmail"),Ke=ge.get("salespeakInitUserMessage")||ge.get("salespeakinitUserMessage"),nt=ge.get("isFromSalespeakWidgetShareBoard"),Oe=ge.get("utm_source")==="chatgpt.com",De=window.top!==window.self;Object.assign(this,{autofocus:S,autoInit:te,autoplay:y,brainURL:w,campaignId:I,chatOnlyContainerSelector:D,chooserContainerSelector:J,cloudFrontChatURL:q,consentMode:be,drawerContainerSelector:O,dynamicCampaignCookieName:X,enableMobileHeaderDetection:he,floatingInputAction:Y,focusContainerSelector:C,headerOffset:V,headerSelector:R,height:He,hideMascot:P,insideIframe:De,isAdmin:A,isFromChatGPT:Oe,isFromSalespeakWidgetShareBoard:nt,isWebsitePreview:x,launcher:d,mascotContainerSelector:B,mobileHeaderSelector:j,model:p,orgId:N,personaSwitchContainerSelector:me,previewViewportMobile:_,resetOnPageChange:fe,salespeakInitUserEmail:Me,salespeakInitUserMessage:Ke,salespeakInitWithDrawer:We,script:o,selector:$,sessionId:Ue,settingsURL:k,themePreview:Ee,showWalkthrough:m,sideContainerSelector:T,stickyContainerSelector:E,trackingURL:l,urlSession:Fe,userInfo:re})}get(o){return this[o]}set(o,S){this[o]=S,window.dispatchEvent(new Event(`${b.Vl}${b.DN}`)),window.dispatchEvent(new Event(`${b.Vl}${o}_changed`))}}const s=new g},7657(u,h,r){r.d(h,{V1:()=>S,IA:()=>y,RL:()=>I,uA:()=>w,as:()=>Ae,xd:()=>Y,DN:()=>B,L5:()=>C,tc:()=>R,n2:()=>V,TI:()=>O,ou:()=>X,eu:()=>fe,DY:()=>te,Ue:()=>k,gy:()=>$,gC:()=>l,vT:()=>m,e9:()=>T,ks:()=>q,RV:()=>He,uZ:()=>j,XV:()=>he,Ym:()=>g,Nn:()=>s,Ai:()=>n,D3:()=>o,iw:()=>b,e0:()=>N,mv:()=>me,FI:()=>p,ET:()=>be,t4:()=>Ce,DU:()=>re,aq:()=>P,ew:()=>A,WJ:()=>_,H2:()=>x,wv:()=>Fe,Nm:()=>d,o6:()=>J,Vl:()=>E,Z6:()=>D});const b="salespeak-widget-user-id",g="salespeak-widget-chooser-form-values",s="salespeak-widget-chooser-minimized",n="input-minimize",o="salespeak-widget-persona-switch-minimized",S="box-launcher",y="floating-mascot",w="inline",I="chat-only",Y="chooser",C="drawer",R="dynamic-bar",V="dynamic-launcher",j="inline-button",he="inline-cards",P="floating-input",A="sidebar",_="sticky-input",x="summarize-button",d="tracking",p="persona-switch",N={ALTPRO:"129a9a68-c45e-454b-ac65-528cbbcb5f67",BIGPANDA:"4d87e294-9e96-4e1d-bad5-a605170547f1",SALESPEAK:"87996776-2ccf-4198-bd8a-3aa7c5a6986c",ALTTEXT:"66c35b67-99be-4069-ad9b-258ee3c163a2",DEVZERO:"e4298f19-0895-4fe2-a4e5-8793b4026a4f",LUMIGO:"f2ee588b-93b5-41e7-bcb7-2a0ee6c9f37d",TOKEN:"27b3e1c5-4aa4-4303-90d3-9b270410de29",BLEND:"313aae73-0202-42ef-8905-13e529846eb1",IONIX:"d28cc0db-217e-4e8a-ba13-784dd6686398",SEDAI:"eaa8976f-f987-4bcf-85de-54cfb1c0270e",QUALI:"877b0d5d-70c1-487c-b8a4-60995a0f67b5",DEALHUB:"fef8bd55-adf9-4c00-9d0f-1764f4fe70be",FAROS:"ca0e651a-d4b4-416a-9b3e-33bbfcf9356c",CYNOMI:"e8713650-16a1-49a7-bc51-9f31586c33eb"},$="pending",k="initialized",q="reset",l="ready",m="removed",T="rendered",B="configChanged",E="salespeakLaunchersScript_",O="endFirstRender",J="widgetReady",D=8e3,me="pageReadyStateChange",X="iframeStatusChange",te="loading",fe="loaded",ne="loading",Ce="interactive",be="complete",re={[ne]:0,[Ce]:1,[be]:2},Ae={attachToIQ:!1,attachToIQText:"I would like personalized guidance specific to my use case",chooserBackgroundColor:"#FFFFFF",chooserBorderColor:"#E0E0E0",chooserBorderRadius:12,chooserBorderWidth:1,chooserButtonBackgroundColor:"#7747FF",chooserButtonEnableIcon:!0,chooserButtonText:"Let\u2019s get started",chooserButtonTextColor:"#FFFFFF",chooserFields:[{id:"87712025-af48-4866-ad3c-4caca9c84dc0",isRequired:!0,isMandatory:!0,label:"Where do you work?",name:"Company",options:[""],placeholder:"Your company website URL",type:"text"},{id:"885ca564-1689-42a1-a70d-9fb82335342a",isRequired:!0,label:"What\u2019s important for me is",name:"Pain points",options:["Problem A","Problem B"],placeholder:"",type:"pill"},{id:"5d209ee8-c7bd-4eb8-8bc5-6b9e612c39d9",isRequired:!0,label:"My key services",name:"Integration",options:["A","B","C"],placeholder:"",type:"pill"}],chooserIsInline:!0,chooserIsSingleLine:!1,chooserFormMode:"multi_line",chooserSections:[{id:"87712025-af48-4866-ad3c-4caca9c84dc0",type:"personalized_header",prompt:"",backgroundImage:"https://salespeak-public-serving.s3.amazonaws.com/training/129a9a68-c45e-454b-ac65-528cbbcb5f67/widget-settings-Chooser-default.jpg"},{id:"15bae413-7f5c-4d29-8813-49cef643c12c",type:"challenges",prompt:""},{id:"63ebcf41-651a-42fe-93b8-13a983dacfcb",type:"solution",prompt:""},{id:"b217250c-694a-4401-9a55-9ea36ed941f5",type:"concerns",prompt:""},{id:"cc6e270b-a502-436f-b85a-f54de9fda79b",type:"unique_features",prompt:""},{id:"96029eba-3c24-45a4-98e6-ed8007c69cb0",type:"next_steps",prompt:""},{id:"71cbf612-8429-4eed-831d-78be3568849d",type:"case_study",prompt:""},{id:"b5c032e8-0a47-4ec5-a73f-51dc9a525d9f",type:"relevant_resources",prompt:""}],chooserLabelColor:"#7747FF",chooserTextColor:"#45494D",chooserTitle:"Personalized Expert-Level Guidance, Instantly!",chooserSubtitle:"Share with us some quick basic details below and get your guidance now",chooserTitleIcon:"https://salespeak-public-serving.s3.amazonaws.com/training/129a9a68-c45e-454b-ac65-528cbbcb5f67/widget-settings-Screenshot_2025-06-17_at_11.50.28\u202FAM.png",chooserTitleFontSize:24,chooserSubtitleFontSize:16,chooserButtonFontSize:16,chooserFieldLabelFontSize:14,chooserTitleTextColor:"#1F1F1F",chooserMoreInformationPlaceholder:"Want to add anything in your own words or talk to us?",chooserWidth:1024},He={inlineButtonBackgroundColor:"#FFFFFF",inlineButtonBackgroundHover:"#717171",inlineButtonBorderRadius:12,inlineButtonBorderWidth:1,inlineButtonFontFamily:"",inlineButtonFontSize:16,inlineButtonFontWeight:400,inlineButtonIcon:"",inlineButtonPaddingBlock:16,inlineButtonPaddingInline:16,inlineButtonShadowColor:"transparent",inlineButtonShadowHover:"rgba(0, 0, 0, 0.1)",inlineButtonText:"Start a conversation",inlineButtonTextColor:"#717171",inlineButtonTextHover:"#FFFFFF"},Fe={cli:{backgroundColor:"#0D1117",brandPrimaryColor:"#00E5CC",brandSecondaryColor:"#162032",callToActionBackgroundColor:"#1B2B3A",callToActionTextColor:"#4FC3F7",dateTimeColor:"#3D5166",fontFamily:"Roboto Mono",inspirationQuestionsBackgroundColor:"#0D1117",inspirationQuestionsHover:"#162032",inspirationQuestionsHoverTextColor:"#A8D8D8",possibleAnswersBorderColor:"#1E4060",summarizeBackgroundColor:"#162032",summarizeBorderColor:"#00E5CC",summarizeButtonBackgroundColor:"#00BFA5",summarizeButtonColor:"#0D1117",summarizeColor:"#A8D8D8",textAIPrimaryColor:"#A8D8D8",textUserPrimaryColor:"#4CAF50",textUserSecondaryColor:"#1B2B3A",titleTextColor:"#4FC3F7",widgetBackgroundColor:"transparent"}}},753(u,h,r){r.a(u,async(b,g)=>{try{let y=function(x,d){try{const p=window.amplitude;if(!p)return;if(typeof p.track=="function"){p.track(x,d);return}if(typeof p.getInstance=="function"){const N=p.getInstance();N&&typeof N.logEvent=="function"&&N.logEvent(x,d)}}catch{}},w=function(x,d){try{const p=window.analytics;if(!p||typeof p.track!="function"||typeof p.identify!="function"||typeof p.page!="function"||typeof p.load!="function"&&typeof p.ready!="function")return;p.track(x,d)}catch{}};r.r(h),r.d(h,{config:()=>s.A,default:()=>I,destroy:()=>A,init:()=>j,remove:()=>he,reset:()=>P});var s=r(7955),n=r(7657),o=r(5979),S=r(2438);window.URLPattern||await r.e(704).then(r.bind(r,1704)),(0,o.hj)(),window.salespeakLaunchersScriptInstances=window.salespeakLaunchersScriptInstances||[];class I{constructor(d,p,N,$,k,q){this.currentPageRef=(0,o.pO)(),this.campaignSettings=d,this.organizationInfo=p,this.widgetSettings=N,this.launcher=$,this.campaignId=k,this.sessionCount=q,this.windowSkeletonEnabled=s.A.get("script")?.getAttribute("data-window-skeleton")!=="false",this.windowSkeletonHandle=null,this.widget=document.createElement("div"),this.focus=document.createElement("div"),this.sticky=document.createElement("div"),this.side=document.createElement("div"),this.mascot=document.createElement("div"),this.drawer=document.createElement("div"),this.chooser=document.createElement("div"),this.chatOnly=document.createElement("div"),this.personaSwitch=document.createElement("div"),this.iframe=document.createElement("iframe"),this.InitStatus=n.gy,this.iframeStatus=n.DY,this.pageReadyState=document.readyState,this.isWidgetOpen=!1,this.windowEventListeners=[],this.openWidget=null,this.exitIntentCleanup=null,this.buildGeneration=0,(0,o.Fd)(this.widgetSettings?.fontFamily||"Poppins",[400,500,600,700]),(0,o.Wg)(this.widgetSettings),(0,o.Ue)();const l=m=>{this.pageReadyState=m.target.readyState,document.dispatchEvent(new Event(n.mv))};document.addEventListener("readystatechange",l),window.dispatchEvent(new Event(`${n.Vl}${n.gy}`)),s.A.get("resetOnPageChange")&&s.A.get("salespeakInitWithDrawer")!=="true"&&this.pageLocationChangeObserver(),this.userInfoChangeObserver(),this.buildLauncher()}pageLocationChangeObserver(){const d=new MutationObserver(async()=>{this.currentPageRef!=(0,o.pO)()&&(this.currentPageRef=(0,o.pO)(),d.disconnect(),s.A.get("isAdmin")&&await this.reset())});d.observe(document.querySelector("body"),{attributes:!0,childList:!0,subtree:!0})}userInfoChangeObserver(){this.registerWindowEventListener(`${n.Vl}userInfo_changed`,()=>{this.sendMessageToIframe({userInfoShared:{...s.A.get("userInfo")}})})}async remove(){(0,o.mH)(),(0,o.M1)(),this.exitIntentCleanup?.(),this.exitIntentCleanup=null,this.buildGeneration++,this.windowSkeletonHandle&&(this.windowSkeletonHandle.detach(),this.windowSkeletonHandle=null),(0,o.Q9)(),this.windowEventListeners.forEach(p=>{window.removeEventListener(p.name,p.callback)});const d=p=>{p&&(p._salespeakScrollObserver&&(p._salespeakScrollObserver.disconnect(),p._salespeakScrollObserver=null),p._salespeakScrollSentinel?.parentNode&&p._salespeakScrollSentinel.parentNode.removeChild(p._salespeakScrollSentinel),p._salespeakScrollSentinel=null)};d(this.sticky),d(document.querySelector("#salespeak-sticky-input")),d(document.querySelector("#salespeak-dynamic-bar")),this.widget?.remove(),this.focus?.remove(),this.sticky?.remove(),this.side?.remove(),this.mascot?.remove(),this.drawer?.remove(),this.chooser?.remove(),this.chatOnly?.remove(),this.personaSwitch?.remove(),this.iframe?.remove(),document.querySelector("#salespeak-widget")?.remove(),document.querySelector("#salespeak-scroll-to")?.remove(),document.querySelector("#salespeak-sticky-input")?.remove(),document.querySelector("#salespeak-dynamic-bar")?.remove(),document.querySelector("#salespeak-side-bar")?.remove(),document.querySelector("#salespeak-floating-mascot")?.remove(),document.querySelector("#salespeak-drawer")?.remove(),document.querySelector("#salespeak-chooser")?.remove(),document.querySelector("#salespeak-chat-only")?.remove(),document.querySelector("#salespeak-persona-switch")?.remove(),document.querySelector("#salespeak-iframe")?.remove(),window.dispatchEvent(new Event(`${n.Vl}${n.vT}`))}async reset(){const{campaignSettings:d,organizationInfo:p,widgetSettings:N,launcher:$,campaignId:k,sessionCount:q}=await V();this.remove(),d&&N&&$&&(this.currentPageRef=(0,o.pO)(),this.campaignSettings=d,this.organizationInfo=p,this.widgetSettings=N,this.launcher=$,this.campaignId=k,this.sessionCount=q,this.widget=document.createElement("div"),this.focus=document.createElement("div"),this.sticky=document.createElement("div"),this.side=document.createElement("div"),this.mascot=document.createElement("div"),this.drawer=document.createElement("div"),this.chooser=document.createElement("div"),this.chatOnly=document.createElement("div"),this.personaSwitch=document.createElement("div"),this.iframe=document.createElement("iframe"),this.InitStatus=n.ks,this.iframeStatus=n.DY,this.pageReadyState=document.readyState,this.windowEventListeners=[],s.A.get("resetOnPageChange")&&s.A.get("salespeakInitWithDrawer")!=="true"&&this.pageLocationChangeObserver(),this.userInfoChangeObserver(),this.buildLauncher()),window.dispatchEvent(new Event(`${n.Vl}${n.ks}`))}onPageReadyStateIs(d,p){if(n.DU[this.pageReadyState]>=n.DU[d]){p();return}const N=()=>{n.DU[this.pageReadyState]>=n.DU[d]&&(p(),document.removeEventListener(n.mv,N))};document.addEventListener(n.mv,N)}sendMessageToIframe(d){const p=()=>{s.A.get("insideIframe")&&window.parent?.postMessage({pageOpened:!0},"*"),window.faitracker&&(window.faitracker?.call("track","Click Event - salespeak-chat",{}),console.log("Click Event - salespeak-chat",window.faitracker))};return new Promise(N=>{const $=()=>this.iframe?.contentWindow?.postMessage(d,"*");if(this.iframeStatus===n.eu){$(),("inputPrompt"in d||"chooserAnswer"in d)&&p(),N();return}const k=()=>{this.iframeStatus===n.eu&&($(),document.removeEventListener(n.ou,k),N())};document.addEventListener(n.ou,k)})}trackEvent(d,p={}){window.dataLayer&&Array.isArray(window.dataLayer)&&window.dataLayer.push({event:d,...p}),y(d,p),w(d,p)}postTrackingEvent({type:d,data:p={},url:N,campaignId:$,sessionId:k}={}){try{if(s.A.get("isAdmin")||s.A.get("isWebsitePreview"))return;const q=s.A.get("trackingURL"),l=s.A.get("orgId"),m=localStorage.getItem(`${l}_${n.iw}`),T=$||this.campaignId||s.A.get("campaignId");if(!q||!d||!m||!l||!T)return;const B={campaign_id:T,data:p,event_type:d,organization_id:l,url:N||window.location.href,user_id:m},E=k||s.A.get("sessionId");E&&(B.session_id=E),fetch(q,{method:"POST",keepalive:!0,headers:{"Content-Type":"application/json"},body:JSON.stringify(B)}).catch(()=>{})}catch{}}registerWindowEventListener(d,p){this.windowEventListeners.push({name:d,callback:p}),window.addEventListener(d,p)}buildIframe(){const d=new URL(`${s.A.get("brainURL")}/${this.launcher===n.Nm?"watcher":"widget"}/${s.A.get("orgId")}/${this.campaignId}${s.A.get("isAdmin")?"/true":""}`);return d.searchParams.set("parentUrl",(0,o.pO)()),d.searchParams.set("launcher",this.launcher),s.A.get("abVariant")&&(d.searchParams.set("ab_variant",s.A.get("abVariant")),d.searchParams.set("ab_test_id",s.A.get("abTestId"))),s.A.get("sessionId")&&d.searchParams.set("sessionId",s.A.get("sessionId")),s.A.get("urlSession")&&d.searchParams.set("history","true"),s.A.get("autofocus")==="on"&&d.searchParams.set("autofocus","on"),s.A.get("hideMascot")&&d.searchParams.set("hideMascot","true"),s.A.get("autoplay")&&d.searchParams.set("autoplay","true"),s.A.get("model")&&d.searchParams.set("model",s.A.get("model")),s.A.get("themePreview")&&d.searchParams.set("themePreview",s.A.get("themePreview")),this.personaName&&d.searchParams.set("personaName",this.personaName),this.iframe.id="salespeak-iframe",this.iframe.classList.add("iframe"),this.iframe.allow="microphone",this.iframe.title="salespeak-brain-widget",this.iframe.src=d.toString(),this.iframe}loadChooserLauncher(d){(0,o.Ht)(()=>r.e(606).then(r.bind(r,745)),"chooserLauncher").then(p=>{d===this.buildGeneration&&p.buildChooserLauncher.call(this)})}buildLauncher(){if(this.InitStatus===n.Ue)return;this.InitStatus=n.Ue;const d=++this.buildGeneration;window.dispatchEvent(new Event(`${n.Vl}${n.Ue}`));const p=document.createElement("style");if(p.textContent=`
            :root {
                --salespeak-font-family: '${this.widgetSettings?.fontFamily||"Poppins"}', sans-serif;
            }
        `,document.head.appendChild(p),this.buildIframe(),window.innerWidth<=768&&this.launcher===n.Nm&&s.A.get("launcher")!==n.Nm&&this.widgetSettings?.areLaunchersDisabledForMobile&&s.A.get("launcher")===n.xd&&this.loadChooserLauncher(d),this.launcher===n.uA){this.widget.id="salespeak-widget",this.widget.classList.add("chat-widget"),this.onPageReadyStateIs(n.t4,()=>{this.windowSkeletonEnabled&&(this.windowSkeletonHandle=(0,o.VT)(this.widget,this.iframe)),this.widget.appendChild(this.iframe)});const l=this.widget.style;l.height=s.A.get("height"),this.iframe.classList.add("iframe--show");const m=this.iframe.style;m.height=s.A.get("height"),this.isWidgetOpen=!0,(0,o.Gj)().appendChild(this.widget)}else if(this.launcher===n.Nm){this.widget.id="salespeak-widget",this.widget.classList.add("tracking");const l=this.widget.style;l.display="none",this.onPageReadyStateIs(n.ET,()=>this.widget.appendChild(this.iframe)),(0,o.Gj)().appendChild(this.widget)}else this.launcher===n.aq?(0,o.Ht)(()=>r.e(718).then(r.bind(r,3441)),"searchBoxLauncher").then(l=>{d===this.buildGeneration&&l.buildSearchBoxLauncher.call(this)}):this.launcher===n.WJ?(0,o.Ht)(()=>r.e(901).then(r.bind(r,5292)),"stickySearchBoxLauncher").then(l=>{d===this.buildGeneration&&l.buildStickySearchBoxLauncher.call(this)}):this.launcher===n.H2?this.widgetSettings?.summarizeLauncherType==="inline"?(0,o.Ht)(()=>r.e(254).then(r.bind(r,1761)),"newSummarizeLauncher").then(l=>{d===this.buildGeneration&&l.buildNewSummarizeLauncher.call(this)}):(0,o.Ht)(()=>r.e(442).then(r.bind(r,34)),"summarizeLauncher").then(l=>{d===this.buildGeneration&&l.buildSummarizeLauncher.call(this)}):this.launcher===n.IA?(0,o.Ht)(()=>r.e(282).then(r.bind(r,1057)),"chatIconLauncher").then(l=>{d===this.buildGeneration&&l.buildChatIconLauncher.call(this)}):this.launcher===n.V1?(0,o.Ht)(()=>r.e(138).then(r.bind(r,664)),"boxLauncher").then(l=>{d===this.buildGeneration&&l.buildBoxLauncher.call(this)}):this.launcher===n.ew?(0,o.Ht)(()=>r.e(509).then(r.bind(r,9833)),"sidebarLauncher").then(l=>{d===this.buildGeneration&&l.buildSidebarLauncher.call(this)}):this.launcher===n.XV?(0,o.Ht)(()=>r.e(873).then(r.bind(r,5117)),"inlineCardsLauncher").then(l=>{d===this.buildGeneration&&l.buildInlineCardsLauncher.call(this)}):this.launcher===n.uZ?(0,o.Ht)(()=>r.e(655).then(r.bind(r,1178)),"inlineButtonsLauncher").then(l=>{d===this.buildGeneration&&l.buildInlineButtonLauncher.call(this)}):this.launcher===n.L5?(0,o.Ht)(()=>r.e(968).then(r.bind(r,5088)),"drawerLauncher").then(l=>{d===this.buildGeneration&&l.buildDrawerLauncher.call(this)}):this.launcher===n.xd?this.loadChooserLauncher(d):this.launcher===n.RL?(0,o.Ht)(()=>r.e(563).then(r.bind(r,6334)),"chatOnlyLauncher").then(l=>{d===this.buildGeneration&&l.buildChatOnlyLauncher.call(this)}):this.launcher===n.FI?(0,o.Ht)(()=>r.e(289).then(r.bind(r,1325)),"personaSwitchLauncher").then(l=>{d===this.buildGeneration&&l.buildPersonaSwitchLauncher.call(this)}):this.launcher===n.tc&&(0,o.Ht)(()=>r.e(629).then(r.bind(r,1595)),"dynamicBarLauncher").then(l=>{d===this.buildGeneration&&l.buildDynamicBarLauncher.call(this)});if(this.launcher===n.uA&&s.A.get("salespeakInitUserMessage")&&this.sendMessageToIframe({inputPrompt:s.A.get("salespeakInitUserMessage")}),s.A.get("isFromSalespeakWidgetShareBoard")==="true"&&this.widgetSettings?.hideHeaderShareBoard){const l=(0,o.km)();if(l){const m=l.style;m.display="none"}}const N=async()=>{const l=await(0,o.ty)(),m=(0,o.Q_)();let T={};this.organizationInfo?.name==="Traceloop"&&(T=await(0,o.wz)());let B={};s.A.get("salespeakInitUserEmail")&&(B={email:s.A.get("salespeakInitUserEmail")}),s.A.set("userInfo",{...s.A.get("userInfo"),...l,...m,...T,...B})},$=l=>{if(l.source===this.iframe?.contentWindow){if(n.TI in l?.data){const m=new Event(n.TI);document?.dispatchEvent(m),N(),this.sendMessageToIframe({pageView:{referrer:document.referrer}})}if(l?.data&&typeof l.data=="object"&&"mediaOnverlay"in l.data){const{mediaOnverlay:m}=l.data;switch(m.type){case"image":o.mY.call(this,m);break;case"video":o.yv.call(this,m);break;default:console.log("message:",l)}}if(l?.data&&typeof l.data=="object"&&"userSentMessage"in l.data){const{userSentMessage:m}=l.data;window.dataLayer&&Array.isArray(window.dataLayer)&&window.dataLayer.push({event:"salespeak_userSentMessage",message:m}),y("salespeak_userSentMessage",{message:m}),w("salespeak_userSentMessage",{message:m})}if(l?.data&&typeof l.data=="object"&&"userClickedLink"in l.data){const{userClickedLink:m}=l.data;window.dataLayer&&Array.isArray(window.dataLayer)&&window.dataLayer.push({event:"salespeak_userClickedLink",link_url:m}),y("salespeak_userClickedLink",{link_url:m}),w("salespeak_userClickedLink",{link_url:m})}if(l?.data&&typeof l.data=="object"&&"syncLocalStorageUserId"in l.data){const{syncLocalStorageUserId:m}=l.data;localStorage.setItem(`${s.A.get("orgId")}_${n.iw}`,m)}if(l?.data&&typeof l.data=="object"&&"identifiedLead"in l.data){const{identifiedLead:m}=l.data;window.dataLayer&&Array.isArray(window.dataLayer)&&window.dataLayer.push({event:"salespeak_identifiedLead",message:m}),y("salespeak_identifiedLead",{message:m}),w("salespeak_identifiedLead",{message:m})}if(l?.data&&typeof l.data=="object"&&"callToActionClick"in l.data){const{callToActionClick:m}=l.data;window.dataLayer&&Array.isArray(window.dataLayer)&&window.dataLayer.push({event:"salespeak_callToActionClick",button_text:m}),y("salespeak_callToActionClick",{button_text:m}),w("salespeak_callToActionClick",{button_text:m})}if(this.launcher===n.uA&&l?.data&&typeof l.data=="object"&&"closeIframe"in l.data){const{closeIframe:m}=l.data;m&&this.reset()}if(l?.data&&typeof l.data=="object"&&"isLoading"in l.data){const{isLoading:m}=l.data;m||(this.iframeStatus=n.eu,document.dispatchEvent(new Event(n.ou)))}if(l?.data&&typeof l.data=="object"&&"CTAFormSubmitted"in l.data){const{CTAFormSubmitted:m}=l.data;m.orgId===n.e0.DEALHUB&&(window.uetq&&window.uetq.push("event","Salespeak_demo_request",{event_category:"Demo Request",event_label:"Lead Form"}),window.lintrk&&window.lintrk("track",{conversion_id:763234}),window.dataLayer&&Array.isArray(window.dataLayer)&&function(){dataLayer.push(arguments)}("event","conversion",{send_to:"AW-816845173/k-WTCPWfmn8Q9aLAhQM",event_callback:()=>{const E=new URL(window.location.href);E.searchParams.set("conv_source","salespeak"),window.history.pushState({},"",E.toString())}}),window.faitracker&&faitracker.call("track","$form_submitted",{$email:m.Email||"",$first_name:m["First Name"]||"",$last_name:m["Last Name"]||"",$phone:m["Phone Number"]||""}))}}l?.data?.type==="hsFormCallback"&&l.data.eventName==="onFormSubmitted"&&this.sendMessageToIframe({hbsptFormOnSubmit:l?.data})};this.registerWindowEventListener("message",$),window?.MktoForms2&&window.MktoForms2.whenReady(l=>{l?.onSubmit(m=>{const T=m?.getId(),B=m?.getValues();this.sendMessageToIframe({mktoFormOnSubmit:{formId:T,data:B}})})});const k=document.getElementsByTagName("form");k.length&&Array.from(k).forEach(l=>{if(!(l.classList.contains("hs-form")||l.hasAttribute("data-hubspot-form"))&&!(l.classList.contains("mktoForm")||l.hasAttribute("data-marketo-form"))){if(l.classList.contains("start-free-trial-modal__form")){l.querySelector("button.start-free-trial-modal__form-button").addEventListener("click",()=>{const T=l.querySelector("input#email").value;(0,o.xf)(T)&&s.A.set("userInfo",{...s.A.get("userInfo"),email:T})});return}l.addEventListener("submit",()=>{const m=new FormData(l),T=m.get("email"),B=`${m.get("first_name")||""} ${m.get("last_name")||""}`.trim();if(T){const E={email:T,name:B||void 0};s.A.set("userInfo",{...s.A.get("userInfo"),...E})}})}}),document.querySelectorAll('a, button, input[type="submit"], input[type="button"]').forEach(l=>{(l.textContent.trim().toLowerCase()||l.value?.trim().toLowerCase())?.includes("demo")&&l.addEventListener("click",()=>{this.sendMessageToIframe({externalDemo:!0})})});const q=(l,m=0)=>{if(window.FactorsDataLayer&&(window.FactorsDataLayer?.segments?.length||window.FactorsDataLayer?.ip_derived_info)){const B=window.FactorsDataLayer?.segments?.map(O=>O.name)?.join(", ")||"",E=Object.keys(window.FactorsDataLayer?.ip_derived_info||{}).reduce((O,J)=>(O+=`${J}: ${window.FactorsDataLayer?.ip_derived_info?.[J]}, `,O),"")||"";l(B,E)}else m<10&&setTimeout(()=>{q(l,m+1)},3e4)};q((l,m)=>{s.A.set("userInfo",{...s.A.get("userInfo"),metadata:{...s.A.get("userInfo").metadata,...l&&{factorsSegments:l},...m&&{factorsIpDerivedInfo:m}}})}),(0,o.v7)(this),window.dispatchEvent(new Event(`${n.Vl}${n.e9}`)),(0,o.Ht)(()=>r.e(937).then(r.bind(r,9337)),"exitIntent").then(({initExitIntent:l})=>{if(d!==this.buildGeneration)return;const m=l(this,this.widgetSettings);m&&(this.exitIntentCleanup=m)})}}const Y=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,C=()=>{try{if(typeof crypto<"u"&&typeof crypto.randomUUID=="function")return crypto.randomUUID()}catch{}return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,x=>{const d=Math.random()*16|0;return(x==="x"?d:d&3|8).toString(16)})},R=x=>{let d=2166136261;for(let p=0;p<x.length;p++)d^=x.charCodeAt(p),d=Math.imul(d,16777619);return(d>>>0)%100},V=async()=>{const x=`${s.A.get("orgId")}_${n.iw}`;let d=localStorage.getItem(x);d&&!Y.test(d)&&(d=C(),localStorage.setItem(x,d));let p,N,$,k;try{if(p=await fetch(s.A.get("cloudFrontChatURL"),{priority:"high",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({org_id:s.A.get("orgId"),query_type:"widget_settings",url:(0,o.pO)(),user_id:d||void 0})}),!p?.ok)throw new Error("Failed to get widget settings from cloudFront")}catch(O){console.error("There was an error getting data for salespeak widget cloudFront",O);try{if(p=await fetch(s.A.get("settingsURL"),{priority:"high",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({org_id:s.A.get("orgId"),query_type:"widget_settings",url:(0,o.pO)(),user_id:d||void 0})}),!p?.ok)throw new Error("Failed to get widget settings from app-be")}catch(J){return console.error("There was an error getting data for salespeak widget app-be",J),{}}}const q=await p.json(),l=q?.widget_settings,m=s.A.get("themePreview");m&&n.wv[m]&&l&&Object.assign(l,n.wv[m]);const T=q?.organization_info||{},B=q?.session_count||0,E=q?.country||"";if(!l)return{};if(!s.A.get("isAdmin")&&s.A.get("launcher")!==n.uA&&l?.areLaunchersDisabled&&(k=n.Nm),!s.A.get("isAdmin")&&![n.uA].includes(s.A.get("launcher"))&&l?.areLaunchersDisabledForMobile&&window.innerWidth<=768&&(k=n.Nm),(l?.availableRegions?.length||l?.restrictedRegions?.length)&&!s.A.get("isWebsitePreview")&&!s.A.get("isAdmin")){if(!E)return{};l?.restrictedRegions?.length&&l?.restrictedRegions?.includes(E)&&(k=n.Nm),l?.availableRegions?.length&&!l?.availableRegions?.includes(E)&&(k=n.Nm)}if(k!==n.Nm){if(!s.A.get("headerSelector")&&l?.headerSelector&&s.A.set("headerSelector",l?.headerSelector),s.A.get("headerOffset")===null&&l?.headerOffset>0&&s.A.set("headerOffset",l.headerOffset),[n.aq,n.uA].includes(s.A.get("launcher"))&&!l?.displayConditionsEnabled&&!s.A.get("selector")&&l?.floatingInputContainerSelector&&s.A.set("selector",l?.floatingInputContainerSelector),s.A.get("launcher")===n.xd&&!s.A.get("chooserContainerSelector")&&l?.chooserContainerSelector&&s.A.set("chooserContainerSelector",l.chooserContainerSelector),!s.A.get("isAdmin")&&!s.A.get("isWebsitePreview")&&s.A.get("launcher")!==n.n2&&[n.e0.DEVZERO,n.e0.FAROS,n.e0.IONIX].includes(s.A.get("orgId"))&&s.A.set("launcher",n.n2),s.A.get("isAdmin")&&s.A.get("launcher")===n.n2&&(k=l.launcher||n.WJ,$=s.A.get("campaignId")||l.campaignId||""),!s.A.get("isAdmin")&&!s.A.get("isWebsitePreview")&&l.displayConditionsEnabled&&s.A.get("launcher")===n.n2&&l.displayConditions?.length){let J="",D="",me=d;me||(me=C(),localStorage.setItem(x,me));for(const X of[...l.displayConditions].reverse()){if(X.excludedURLs.filter(te=>!!te).some(te=>new URLPattern(te,{ignoreCase:!0}).test((0,o.pO)()))){k=n.Nm,$=X.associatedCampaignId,J=X.floatingInputContainerSelector,D=X.chooserContainerSelector;break}if(X.includedURLs.some(te=>new URLPattern(te,{ignoreCase:!0}).test((0,o.pO)()))){if(k=X.associatedLauncher,$=X.associatedCampaignId,J=X.floatingInputContainerSelector,D=X.chooserContainerSelector,X.abTestEnabled&&X.abTest?.status==="active"&&X.abTest?.variantA?.launcher&&X.abTest?.variantB?.launcher){const te=X.abTest.id||"",fe=d?R(d+te):Math.floor(Math.random()*100),ne=X.abTest.variantA.weight??50;fe<ne?(k=X.abTest.variantA.launcher,s.A.set("abVariant","A")):(k=X.abTest.variantB.launcher,s.A.set("abVariant","B")),s.A.set("abTestId",X.abTest.id)}break}}if(k||(k=n.Nm),!s.A.get("selector")&&J&&s.A.set("selector",J),k===n.xd&&!s.A.get("chooserContainerSelector")&&D&&s.A.set("chooserContainerSelector",D),k===n.xd&&$){const X=l?.chooserCampaignMap?.[$];s.A.set("chooserKeepInsidePage",!!X?.chooserKeepInsidePage)}}if(!s.A.get("isAdmin")&&!s.A.get("isWebsitePreview")&&!l.displayConditionsEnabled&&s.A.get("launcher")===n.n2&&(k=l.launcher||n.WJ,$=l.campaignId||""),s.A.get("launcher")!==n.n2&&(k=s.A.get("launcher"),$=s.A.get("campaignId")||l.campaignId||""),s.A.get("dynamicCampaignCookieName")){const J=document.cookie.split("; ").find(D=>D.startsWith(`${s.A.get("dynamicCampaignCookieName")}=`));J&&($=J.split("=")[1])}if(s.A.get("isFromSalespeakWidgetShareBoard")==="true"&&(k=n.Nm,document.querySelector("body")?.classList?.add("from-salespeak-widget-share-board")),s.A.get("salespeakInitWithDrawer")==="true"&&l?.openLinksWithDrawer===!0&&(k=n.L5),!s.A.get("isAdmin")&&k===n.L5&&window.innerWidth<=768&&(k=n.WJ),!s.A.get("isAdmin")&&k===n.FI&&window.innerWidth<=768){const J=l?.personaSwitchMobileLauncher||"stickyBar",D=l?.personaSwitchMobileLauncherPosition||"right";J==="chatIcon"?k=n.IA:(k=n.WJ,l.stickyInputMobileMinimizedPosition=D==="left"?"left-bottom":"right-bottom")}}if(!s.A.get("abTestId")&&k&&k!==n.Nm&&!s.A.get("isAdmin")&&l?.abTestEnabled&&l?.abTest?.status==="active"&&l?.abTest?.variantA?.launcher&&l?.abTest?.variantB?.launcher){const O=l.abTest.id||"",J=d?R(d+O):Math.floor(Math.random()*100),D=l.abTest.variantA.weight??50;J<D?(k=l.abTest.variantA.launcher,s.A.set("abVariant","A")):(k=l.abTest.variantB.launcher,s.A.set("abVariant","B")),s.A.set("abTestId",l.abTest.id)}if(k){try{if(N=await fetch(s.A.get("settingsURL"),{priority:"high",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({campaign_id:$||null,org_id:s.A.get("orgId"),query_type:"campaign_settings",url:(0,o.pO)(),user_id:d||void 0})}),!N?.ok)return{}}catch(D){return console.error("There was an error getting data for salespeak widget",D),{}}const J=(await N.json())?.settings;return!$&&J?.length&&($=J[0]?.campaign_id),{campaignSettings:J,organizationInfo:T,widgetSettings:l,launcher:k,campaignId:$,sessionCount:B}}},j=async()=>{window.onerror=function(q){return console.error("salespeak detects rendering errors",q),s.A.get("insideIframe")&&window.parent?.postMessage({errorRenderingPage:q},"*"),!1};const{campaignSettings:x,organizationInfo:d,widgetSettings:p,launcher:N,campaignId:$,sessionCount:k}=await V();x&&p&&N&&window.salespeakLaunchersScriptInstances.push(new I(x,d,p,N,$,k))},he=()=>{window.salespeakLaunchersScriptInstances.forEach(x=>x.remove())},P=()=>{window.salespeakLaunchersScriptInstances.forEach(x=>x.reset())},A=()=>{window.salespeakLaunchersScriptInstances.forEach(d=>d.remove()),window.salespeakLaunchersScriptInstances=[],window.salespeakLaunchersScript=void 0;const x=s.A.get("script");x.parentElement.removeChild(x)};window.salespeakSetUserInfo=x=>{s.A.set("userInfo",{...s.A.get("userInfo"),...x})};const _=()=>{window._hsp=window._hsp||[];let x=!1;window._hsp.push(["addPrivacyConsentListener",d=>{const p=!!(d&&d.allowed);p&&!x?(x=!0,j()):!p&&x&&(x=!1,he(),window.salespeakLaunchersScriptInstances=[])}])};document.currentScript.addEventListener("load",async()=>{if(window.dispatchEvent(new Event(`${n.Vl}${n.gC}`)),!s.A.get("autoInit"))return;const x=s.A.get("consentMode");if(x==="hubspot"){_();return}x&&console.warn(`[Salespeak] Unknown data-consent-mode "${x}" \u2014 initializing without consent gating.`),await j()}),g()}catch(y){g(y)}},1)},5979(u,h,r){r.d(h,{Ct:()=>dt,Ly:()=>ct,Rx:()=>le,VT:()=>la,TZ:()=>Me,jO:()=>Lt,Yh:()=>Ue,$X:()=>Nt,H_:()=>Ct,Eq:()=>Ee,LW:()=>Ft,EB:()=>At,tH:()=>ra,bh:()=>Ke,KA:()=>Oe,Ug:()=>ge,m2:()=>De,zF:()=>re,QF:()=>Ae,FA:()=>We,HJ:()=>It,ci:()=>He,RQ:()=>zt,bO:()=>ae,fF:()=>xt,sZ:()=>Qt,fE:()=>te,eE:()=>lt,_v:()=>l,d8:()=>q,s7:()=>D,ND:()=>k,E1:()=>d,km:()=>T,BG:()=>B,TH:()=>$,fv:()=>qt,pO:()=>Mt,Ib:()=>m,tY:()=>N,r7:()=>p,Gj:()=>x,wz:()=>Xt,ty:()=>Gt,Q_:()=>Yt,l_:()=>jt,mY:()=>Ht,Su:()=>Jt,yv:()=>$t,Ht:()=>ca,Wg:()=>_t,Ue:()=>ta,hj:()=>na,xf:()=>de,OS:()=>ot,gU:()=>Rt,Fd:()=>X,$_:()=>Vt,jT:()=>fe,v7:()=>Wt,NP:()=>Kt,If:()=>be,oU:()=>Ce,mH:()=>et,w9:()=>Ot,M1:()=>at,Q9:()=>Et});var b=r(2591),g=r.n(b),s=r(1740),n=r.n(s),o=r(8128),S=r.n(o),y=r(855),w=r.n(y),I=r(3051),Y=r.n(I),C=r(3656),R=r.n(C),V=r(6210),j={};j.styleTagTransform=R(),j.setAttributes=w(),j.insert=S().bind(null,"head"),j.domAPI=n(),j.insertStyleElement=Y();var he=g()(V.A,j);const P=V.A&&V.A.locals?V.A.locals:void 0;var A=r(7955);const _=document.currentScript,x=()=>A.A.get("selector")?document.querySelector(A.A.get("selector")):_.parentElement&&_.parentElement.nodeName!=="BODY"&&_.parentElement.nodeName!=="HEAD"?_.parentElement:document.querySelector("body"),d=()=>A.A.get("focusContainerSelector")?document.querySelector(A.A.get("focusContainerSelector")):document.querySelector("body"),p=()=>A.A.get("stickyContainerSelector")?document.querySelector(A.A.get("stickyContainerSelector")):document.querySelector("body"),N=()=>A.A.get("sideContainerSelector")?document.querySelector(A.A.get("sideContainerSelector")):document.querySelector("body"),$=()=>A.A.get("mascotContainerSelector")?document.querySelector(A.A.get("mascotContainerSelector")):document.querySelector("body"),k=()=>A.A.get("drawerContainerSelector")?document.querySelector(A.A.get("drawerContainerSelector")):document.querySelector("body"),q=(t=!1)=>A.A.get("chooserContainerSelector")?document.querySelector(A.A.get("chooserContainerSelector")):t&&_.parentElement&&_.parentElement.nodeName!=="BODY"&&_.parentElement.nodeName!=="HEAD"?_.parentElement:document.querySelector("body"),l=()=>A.A.get("chatOnlyContainerSelector")?document.querySelector(A.A.get("chatOnlyContainerSelector")):document.querySelector("body"),m=()=>A.A.get("personaSwitchContainerSelector")?document.querySelector(A.A.get("personaSwitchContainerSelector")):document.querySelector("body"),T=()=>{if(A.A.get("headerSelector")){const t=document.querySelector(A.A.get("headerSelector"));if(!t)return null;const a=window.getComputedStyle(t).position;if(["sticky","fixed"].includes(a))return t;let e=t.parentElement;for(;e&&e!==document.body;){const i=window.getComputedStyle(e).position;if(["sticky","fixed"].includes(i))return e;e=e.parentElement}return t}return document.querySelector("header")},B=t=>{const a=Number(A.A.get("headerOffset"));if(a>0)return a;if(!t)return 0;const e=window.getComputedStyle(t).position,i=["sticky","fixed"].includes(e);return A.A.get("headerSelector")?(i||console.warn(`[Salespeak] headerSelector matched "${A.A.get("headerSelector")}" but no fixed/sticky ancestor was found. Applying offset anyway. If the offset is wrong, set a manual "Header offset" value in widget settings.`),t.offsetHeight):i?t.offsetHeight:0},E=t=>{try{return document.querySelector(t)}catch{return null}},O=t=>{if(!t||!t.getBoundingClientRect)return!1;try{const a=window.getComputedStyle(t);if(a.display==="none"||a.visibility==="hidden"||a.opacity==="0")return!1;const e=t.getBoundingClientRect();return e.height>0&&e.width>0&&e.height<=300}catch{return!1}},J=()=>{const t=A.A.get("mobileHeaderSelector");if(t){const i=E(t);if(i&&O(i))return i}const a=['header[data-mobile="true"]',"header.mobile-header","header.header-mobile",'.mobile-header[role="banner"]','.header-mobile[role="banner"]','nav[data-mobile="true"]','.navbar-mobile[role="navigation"]','.nav-mobile[role="navigation"]'];for(const i of a){const c=E(i);if(c&&O(c))return c}const e=T();return e&&O(e)?e:null},D=()=>{try{if(!(A.A.get("enableMobileHeaderDetection")!==!1))return T();if(window.innerWidth<=768){const e=J();if(e)return e}return T()}catch(t){return console.warn("Salespeak Widget: Error in mobile header detection, falling back to default:",t),T()}},me=new Set,X=(t,a=[400,700])=>{if(!t)return;const e=a.join(";"),i=`${t}:${e}`;if(me.has(i))return;me.add(i);const c=document.createElement("link");c.href=`https://fonts.googleapis.com/css2?family=${t}:wght@${e}&display=swap`,c.rel="stylesheet",document.head.appendChild(c)},te=({height:t,imgHeight:a,imgWidth:e,position:i,resourceSrc:c,rotation:f,scale:v,type:F,width:H,rounded:Z})=>{if(!c)return null;const G=200,K=200,M=H||40,ue=t||40,ke=e||1,xe=a||1,W=i||{x:.5,y:.5},U=f||0,ie=v||1,ee=M/G,Re=ue/K,Ne=G/ke*ee*ie,Ge=K/xe*Re*ie,oe=U*Math.PI/180,Se=W.x-.5,we=W.y-.5,pe=Se*Math.cos(oe)-we*Math.sin(oe),Ie=Se*Math.sin(oe)+we*Math.cos(oe),Le=pe+.5,qe=Ie+.5,Be=-Le*Ne+M/2,Ye=-qe*Ge+ue/2,se=document.createElement("div");se.style.position="relative",se.style.width="100%",se.style.height="100%",se.style.display="flex",se.style.alignItems="flex-start",se.style.justifyContent="flex-start",se.style.overflow="hidden",se.style.borderRadius=Z?"50%":"0";let Q;const ze=F||"image";return ze==="image"||ze==="gif"||ze==="svg"?(Q=document.createElement("img"),Q.alt="avatar",Q.src=c):ze==="video"&&(Q=document.createElement("video"),Q.src=c,Q.autoplay=!0,Q.loop=!0,Q.muted=!0,Q.playsInline=!0),Q&&(!(ke===1&&xe===1)?(Q.style.width=`${Ne}px`,Q.style.height=`${Ge}px`,Q.style.minWidth=`${Ne}px`,Q.style.minHeight=`${Ge}px`,Q.style.transform=`translate(${Be}px, ${Ye}px) rotate(${U}deg)`):(Q.style.width="100%",Q.style.height="100%",Q.style.objectFit=ze==="svg"?"contain":"cover",Q.style.objectPosition=`${W.x*100}% ${W.y*100}%`,ie!==1&&(Q.style.transform=`scale(${ie})`)),se.appendChild(Q)),se},fe=t=>!t||t.tagName==="BODY"?null:window.getComputedStyle(t).transform!=="none"?t:fe(t.parentElement),ne={floatingInputPlaceholder:null},Ce=()=>{ne.floatingInputPlaceholder&&(cancelAnimationFrame(ne.floatingInputPlaceholder),ne.floatingInputPlaceholder=null)},be=(t,a,e)=>{if(!ne.floatingInputPlaceholder){let i=0,c=0,f,v=Date.now(),F,H=3500;const Z=()=>{if(ne.floatingInputPlaceholder=requestAnimationFrame(Z),f=Date.now(),F=f-v,F>H){if(v=f-F%H,i===a.length){i=0,c=0,H=3500,t.textContent=e;return}const G=a[i];if(c>G.length){i=i+1,c=0,H=2e3;return}c=c+1,H=100,t.textContent=G.slice(0,c)}};Z()}},re=(t="#969A9E",a="15")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 15 15"),e.setAttribute("fill","none"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("role","img"),e.setAttribute("aria-label","Spark");const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d","M8.313 11.404L7.5 14.25L6.687 11.404C6.47687 10.6689 6.0829 9.99938 5.54226 9.45874C5.00162 8.9181 4.33214 8.52413 3.597 8.314L0.75 7.5L3.596 6.687C4.33114 6.47687 5.00062 6.0829 5.54126 5.54226C6.0819 5.00162 6.47587 4.33214 6.686 3.597L7.5 0.75L8.313 3.596C8.52313 4.33114 8.9171 5.00062 9.45774 5.54126C9.99838 6.0819 10.6679 6.47587 11.403 6.686L14.25 7.5L11.404 8.313C10.6689 8.52313 9.99938 8.9171 9.45874 9.45774C8.9181 9.99838 8.52413 10.6679 8.314 11.403L8.313 11.404Z"),i.setAttribute("stroke",t),i.setAttribute("stroke-width","1.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),e.appendChild(i),e},Ae=(t="#353333",a="32")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("id","salespeak-sparks-icon"),e.setAttribute("viewBox","0 0 42 43"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("role","img"),e.setAttribute("aria-label","AI assistant"),e.style.fill="none";const i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d","M31.8 24.2364C31.5091 24.2545 31.2 24.2616 30.8762 24.2558C20.5204 24.6976 17.8663 32.5767 17.7928 37.295C17.8052 37.5904 17.8114 37.892 17.8114 38.2C17.7946 37.9147 17.7879 37.612 17.7928 37.295C17.36 26.9111 9.46506 24.263 4.41758 24.1872C3.95981 24.2196 3.48743 24.2364 3 24.2364C3.43723 24.1977 3.91319 24.1796 4.41758 24.1872C15.0878 23.431 17.8114 14.142 17.8114 9.39999C17.8114 21.1832 26.0098 24.1689 30.8762 24.2558C31.1776 24.2429 31.4855 24.2364 31.8 24.2364Z"),i.setAttribute("id","first-star"),i.style.fill=t,i.style.stroke="none",e.appendChild(i);const c=document.createElementNS("http://www.w3.org/2000/svg","path");return c.setAttribute("id","second-star"),c.setAttribute("d","M39 11.4182C38.8636 11.4273 38.7187 11.4308 38.567 11.4279C33.7127 11.6488 32.4686 15.5883 32.4341 17.9475C32.4399 18.0952 32.4429 18.246 32.4429 18.4C32.435 18.2574 32.4318 18.106 32.4341 17.9475C32.2312 12.7556 28.5305 11.4315 26.1645 11.3936C25.9499 11.4098 25.7285 11.4182 25.5 11.4182C25.705 11.3989 25.9281 11.3898 26.1645 11.3936C31.1662 11.0155 32.4429 6.37101 32.4429 4C32.4429 9.89159 36.2858 11.3844 38.567 11.4279C38.7082 11.4215 38.8526 11.4182 39 11.4182Z"),c.style.fill=t,c.style.stroke="none",e.appendChild(c),e},He=(t="currentColor")=>{const a=document.createElementNS("http://www.w3.org/2000/svg","svg");a.setAttribute("id","salespeak-arrow-top-icon"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("width","20"),a.setAttribute("height","20"),a.setAttribute("role","img"),a.setAttribute("aria-label","Send");const e=document.createElementNS("http://www.w3.org/2000/svg","path");return e.setAttribute("d","M12 4L12 20M12 4L6 10M12 4L18 10"),e.setAttribute("stroke",t),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),a.appendChild(e),a},ge=(t="#191a1b")=>{const a=document.createElementNS("http://www.w3.org/2000/svg","svg");a.setAttribute("id","salespeak-save-time-icon"),a.setAttribute("viewBox","0 0 21 21"),a.setAttribute("width","21"),a.setAttribute("height","21"),a.setAttribute("role","img"),a.setAttribute("aria-label","Save time"),a.style.fill="none",a.style.overflow="visible";const e=document.createElementNS("http://www.w3.org/2000/svg","path");e.setAttribute("d","M14.8889 9.88889C11.8222 9.88889 9.33334 12.3778 9.33334 15.4444C9.33334 18.5111 11.8222 21 14.8889 21C17.9556 21 20.4445 18.5111 20.4445 15.4444C20.4445 12.3778 17.9556 9.88889 14.8889 9.88889ZM16.7222 18.0556L14.3333 15.6667V12.1111H15.4445V15.2111L17.5 17.2667L16.7222 18.0556Z"),e.style.fill=t,e.style.stroke="none",a.appendChild(e);const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d","M13.2222 7.31944V4.40278L10.3429 1H1V15.4444H7.46368"),i.setAttribute("stroke-width","2"),i.setAttribute("stroke-linecap","round"),i.style.stroke=t,i.style.fill="none",a.appendChild(i),a},Fe=(t="#191a1b",a="12")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("id","salespeak-save-time-icon"),e.setAttribute("viewBox","0 0 12 12"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("fill","none"),e.setAttribute("role","img"),e.setAttribute("aria-label","Time");const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d","M5.55556 0C2.48889 0 0 2.48889 0 5.55556C0 8.62222 2.48889 11.1111 5.55556 11.1111C8.62222 11.1111 11.1111 8.62222 11.1111 5.55556C11.1111 2.48889 8.62222 0 5.55556 0ZM7.38889 8.16667L5 5.77778V2.22222H6.11111V5.32222L8.16667 7.37778L7.38889 8.16667Z"),i.setAttribute("fill",t),e.appendChild(i),e},Ue=(t="#353333",a="12")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("id","salespeak-close-icon"),e.setAttribute("viewBox","0 0 20 18"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("fill","none"),e.setAttribute("role","img"),e.setAttribute("aria-label","Close");const i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d","M2.00024 1L18.0001 17"),i.setAttribute("stroke",t),i.setAttribute("stroke-width","2"),i.setAttribute("stroke-linecap","round"),e.appendChild(i);const c=document.createElementNS("http://www.w3.org/2000/svg","path");return c.setAttribute("stroke",t),c.setAttribute("d","M18 1L2.00015 17"),c.setAttribute("stroke-width","2"),c.setAttribute("stroke-linecap","round"),e.appendChild(c),e},We=(t="#353333",a="20")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("id","salespeak-close-icon"),e.setAttribute("viewBox","0 0 30 30"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("fill","none"),e.setAttribute("role","img"),e.setAttribute("aria-label","Microphone");const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d","M15 18.125C17.075 18.125 18.7375 16.45 18.7375 14.375L18.75 6.875C18.75 4.8 17.075 3.125 15 3.125C12.925 3.125 11.25 4.8 11.25 6.875V14.375C11.25 16.45 12.925 18.125 15 18.125ZM13.5 6.75C13.5 5.925 14.175 5.25 15 5.25C15.825 5.25 16.5 5.925 16.5 6.75L16.4875 14.5C16.4875 15.325 15.825 16 15 16C14.175 16 13.5 15.325 13.5 14.5V6.75ZM21.625 14.375C21.625 18.125 18.45 20.75 15 20.75C11.55 20.75 8.375 18.125 8.375 14.375H6.25C6.25 18.6375 9.65 22.1625 13.75 22.775V26.875H16.25V22.775C20.35 22.175 23.75 18.65 23.75 14.375H21.625Z"),i.setAttribute("fill",t),e.appendChild(i),e},Ee=(t="#191a1b",a="18")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("id","salespeak-expand-icon"),e.setAttribute("viewBox","0 0 18 18"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("fill","none"),e.setAttribute("role","img"),e.setAttribute("aria-label","Expand");const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d","M7.875 4.5H14.0625C14.5101 4.5 14.9393 4.67779 15.2557 4.99426C15.5722 5.31073 15.75 5.73995 15.75 6.1875V14.0625C15.75 14.5101 15.5722 14.9393 15.2557 15.2557C14.9393 15.5722 14.5101 15.75 14.0625 15.75H6.1875C5.73995 15.75 5.31073 15.5722 4.99426 15.2557C4.67779 14.9393 4.5 14.5101 4.5 14.0625V7.875M12.375 12.375L2.25 2.25M2.25 2.25H6.1875M2.25 2.25V6.1875"),i.setAttribute("stroke",t),i.setAttribute("stroke-width","1.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),e.appendChild(i),e},Me=(t="#191a1b",a="24")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("id","salespeak-arrow-down-icon"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("fill","none"),e.setAttribute("role","img"),e.setAttribute("aria-label","Arrow down");const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d","M7.41 8.29492L12 12.8749L16.59 8.29492L18 9.70492L12 15.7049L6 9.70492L7.41 8.29492Z"),i.setAttribute("fill",t),e.appendChild(i),e},Ke=(t="#0041F5",a="24")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("id","salespeak-people-icon"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("fill","none"),e.setAttribute("role","img"),e.setAttribute("aria-label","People");const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d","M9 13.75C6.66 13.75 2 14.92 2 17.25V19H16V17.25C16 14.92 11.34 13.75 9 13.75ZM4.34 17C5.18 16.42 7.21 15.75 9 15.75C10.79 15.75 12.82 16.42 13.66 17H4.34ZM9 12C10.93 12 12.5 10.43 12.5 8.5C12.5 6.57 10.93 5 9 5C7.07 5 5.5 6.57 5.5 8.5C5.5 10.43 7.07 12 9 12ZM9 7C9.83 7 10.5 7.67 10.5 8.5C10.5 9.33 9.83 10 9 10C8.17 10 7.5 9.33 7.5 8.5C7.5 7.67 8.17 7 9 7ZM16.04 13.81C17.2 14.65 18 15.77 18 17.25V19H22V17.25C22 15.23 18.5 14.08 16.04 13.81ZM15 12C16.93 12 18.5 10.43 18.5 8.5C18.5 6.57 16.93 5 15 5C14.46 5 13.96 5.13 13.5 5.35C14.13 6.24 14.5 7.33 14.5 8.5C14.5 9.67 14.13 10.76 13.5 11.65C13.96 11.87 14.46 12 15 12Z"),i.setAttribute("fill",t),e.appendChild(i),e},nt=(t="#0041F5",a="62")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("id","salespeak-play-icon"),e.setAttribute("viewBox","0 0 62 62"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("fill","none"),e.setAttribute("role","img"),e.setAttribute("aria-label","Play");const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d","M10.3334 30.9999C10.3334 19.6074 19.6076 10.3333 31.0001 10.3333C42.3926 10.3333 51.6668 19.6074 51.6668 30.9999C51.6668 42.3924 42.3926 51.6666 31.0001 51.6666C19.6076 51.6666 10.3334 42.3924 10.3334 30.9999ZM5.16675 30.9999C5.16675 45.2599 16.7401 56.8333 31.0001 56.8333C45.2601 56.8333 56.8334 45.2599 56.8334 30.9999C56.8334 16.7399 45.2601 5.16659 31.0001 5.16659C16.7401 5.16659 5.16675 16.7399 5.16675 30.9999ZM38.7501 30.9999L28.4167 41.3333L28.4167 20.6666L38.7501 30.9999Z"),i.setAttribute("fill",t),e.appendChild(i),e},Oe=(t="#0041F5",a="16")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("id","salespeak-reply-icon"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("fill","none"),e.setAttribute("role","img"),e.setAttribute("aria-label","Reply");const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d","M10 8.5V4.5L3 11.5L10 18.5V14.4C15 14.4 18.5 16 21 19.5C20 14.5 17 9.5 10 8.5Z"),i.setAttribute("fill",t),e.appendChild(i),e},De=(t="#0041F5",a="24")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("id","salespeak-send-icon"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("fill","none"),e.setAttribute("role","img"),e.setAttribute("aria-label","Send");const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d","M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"),i.setAttribute("fill",t),e.appendChild(i),e},ae=(t="#00a676",a="24")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("id","salespeak-success-icon"),e.setAttribute("viewBox","0 0 20 20"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("fill","none"),e.setAttribute("role","img"),e.setAttribute("aria-label","Success");const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d","M4 10L8 14L16 6"),i.setAttribute("stroke",t),i.setAttribute("stroke-width","2"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),e.appendChild(i),e},At=(t="#2b2b2b")=>{const a=document.createElementNS("http://www.w3.org/2000/svg","svg");a.setAttribute("width","24"),a.setAttribute("height","24"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("role","img"),a.setAttribute("aria-label","Loading"),a.style.animation="rotate 1s linear infinite";const e=document.createElementNS("http://www.w3.org/2000/svg","circle");return e.setAttribute("cx","12"),e.setAttribute("cy","12"),e.setAttribute("r","10"),e.setAttribute("stroke",t),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-dasharray","32"),e.setAttribute("stroke-dashoffset","10"),a.appendChild(e),a},xt=(t="#0041F5",a="20")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("fill","none"),e.setAttribute("role","img"),e.setAttribute("aria-label","Globe");const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d","M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2m6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56M12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96M4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56m2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8M12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96M14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2m.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56M16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2z"),i.setAttribute("fill",t),e.appendChild(i),e},Ct=(t="#0041F5",a="20")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("fill","none"),e.setAttribute("role","img"),e.setAttribute("aria-label","Message");const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d","M4 4h16v12H5.17L4 17.17zm0-2c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm2 10h8v2H6zm0-3h12v2H6zm0-3h12v2H6z"),i.setAttribute("fill",t),e.appendChild(i),e},Ft=(t="#353333",a="16")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 14 20"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("fill","none"),e.setAttribute("role","img"),e.setAttribute("aria-label","Idea");const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d","M6.99999 15V10.625M6.99999 10.625C7.42163 10.6253 7.84162 10.5724 8.24999 10.4675M6.99999 10.625C6.57836 10.6253 6.15837 10.5724 5.74999 10.4675M8.87499 16.6992C7.63606 16.9344 6.36392 16.9344 5.12499 16.6992M8.24999 18.685C7.41893 18.772 6.58105 18.772 5.74999 18.685M8.87499 15V14.84C8.87499 14.0208 9.42332 13.3208 10.1317 12.91C11.3217 12.2209 12.2512 11.1585 12.7762 9.88754C13.3012 8.61656 13.3923 7.20792 13.0356 5.87987C12.6788 4.55182 11.894 3.37851 10.8027 2.54173C9.71147 1.70496 8.37471 1.25144 6.99957 1.25144C5.62444 1.25144 4.28768 1.70496 3.19644 2.54173C2.10519 3.37851 1.32038 4.55182 0.963599 5.87987C0.606817 7.20792 0.697987 8.61656 1.22298 9.88754C1.74798 11.1585 2.67749 12.2209 3.86749 12.91C4.57582 13.3208 5.12499 14.0208 5.12499 14.84V15"),i.setAttribute("stroke",t),i.setAttribute("stroke-width","1.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),e.appendChild(i),e},Nt=(t="#353333",a="18")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 18 17"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("fill","none"),e.setAttribute("role","img"),e.setAttribute("aria-label","Demo");const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d","M6.5 13.375V14.2142C6.50004 14.5426 6.43537 14.8678 6.30968 15.1712C6.184 15.4746 5.99976 15.7503 5.7675 15.9825L5.25 16.5H12.75L12.2325 15.9825C12.0002 15.7503 11.816 15.4746 11.6903 15.1712C11.5646 14.8678 11.5 14.5426 11.5 14.2142V13.375M16.5 3.375V11.5C16.5 11.9973 16.3025 12.4742 15.9508 12.8258C15.5992 13.1775 15.1223 13.375 14.625 13.375H3.375C2.87772 13.375 2.40081 13.1775 2.04917 12.8258C1.69754 12.4742 1.5 11.9973 1.5 11.5V3.375M16.5 3.375C16.5 2.87772 16.3025 2.40081 15.9508 2.04917C15.5992 1.69754 15.1223 1.5 14.625 1.5H3.375C2.87772 1.5 2.40081 1.69754 2.04917 2.04917C1.69754 2.40081 1.5 2.87772 1.5 3.375M16.5 3.375V9C16.5 9.49728 16.3025 9.97419 15.9508 10.3258C15.5992 10.6775 15.1223 10.875 14.625 10.875H3.375C2.87772 10.875 2.40081 10.6775 2.04917 10.3258C1.69754 9.97419 1.5 9.49728 1.5 9V3.375"),i.setAttribute("stroke",t),i.setAttribute("stroke-width","1.2"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),e.appendChild(i),e},da=(t="#353333",a="24")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("fill","none"),e.setAttribute("stroke",t),e.setAttribute("stroke-width","1"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.setAttribute("role","img"),e.setAttribute("aria-label","Maximize");const i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d","M0 0h24v24H0z"),i.setAttribute("fill","none"),i.setAttribute("stroke","none"),e.appendChild(i);const c=document.createElementNS("http://www.w3.org/2000/svg","path");c.setAttribute("d","M16 4l4 0l0 4"),e.appendChild(c);const f=document.createElementNS("http://www.w3.org/2000/svg","path");f.setAttribute("d","M14 10l6 -6"),e.appendChild(f);const v=document.createElementNS("http://www.w3.org/2000/svg","path");v.setAttribute("d","M8 20l-4 0l0 -4"),e.appendChild(v);const F=document.createElementNS("http://www.w3.org/2000/svg","path");return F.setAttribute("d","M4 20l6 -6"),e.appendChild(F),e},It=(t="#45494D",a="14")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 14 14"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("fill","none"),e.setAttribute("role","img"),e.setAttribute("aria-label","Close");const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d","M2 2L12 12M12 2L2 12"),i.setAttribute("stroke",t),i.setAttribute("stroke-width","1.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),e.appendChild(i),e},Lt=(t="#45494D",a="20")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 20 20"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("fill","none"),e.setAttribute("role","img"),e.setAttribute("aria-label","Collapse");const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d","M5 8L10 13L15 8"),i.setAttribute("fill","none"),i.setAttribute("stroke",t),i.setAttribute("stroke-width","1.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),e.appendChild(i),e},zt=(t="#45494D",a="18")=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 18 18"),e.setAttribute("width",a),e.setAttribute("height",a),e.setAttribute("fill","none"),e.setAttribute("role","img"),e.setAttribute("aria-label","Expand");const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d","M0.75 16.5625V12.25M0.75 16.5625H5.0625M0.75 16.5625L5.78125 11.5312M16.5625 0.75H12.25M16.5625 0.75V5.0625M16.5625 0.75L11.5312 5.78125"),i.setAttribute("stroke",t),i.setAttribute("stroke-width","1.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),e.appendChild(i),e};function rt(){const t=document.createElement("div");t.id="salespeak-overlay";const a=document.createElement("div");a.classList.add("header-container"),t.appendChild(a);const e=document.createElement("img");e.classList.add("close-button-icon"),e.src="https://app.salespeak.ai/widget-overlay-icon-close.svg",a.appendChild(e);const i=document.createElement("div");i.classList.add("media-container"),t.appendChild(i),document.querySelector("body").appendChild(t);const c=()=>{window.removeEventListener("keydown",f),e.removeEventListener("click",c),document.querySelector("body").removeChild(t)},f=v=>{v.key==="Escape"&&c()};return e.addEventListener("click",c),this.registerWindowEventListener("keydown",f),window.focus(),{closeButtonIcon:e,headerContainer:a,mediaContainer:i,overlay:t}}function Ht(t){const{headerContainer:a,mediaContainer:e}=rt.call(this),i=document.createElement("img");if(i.classList.add("image-media"),i.src=t.src,e.appendChild(i),t.title){const c=document.createElement("div");c.classList.add("title"),c.append(t.title),a.prepend(c)}}function $t(t){if(document.getElementById("salespeak-overlay"))return;const{headerContainer:e,mediaContainer:i}=rt.call(this),c=document.createElement("div");c.classList.add("video-container");const f=document.createElement("iframe");f.allowFullScreen=!0,f.classList.add("iframe-media"),f.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",f.sandbox="allow-scripts allow-same-origin allow-forms allow-presentation";let v="";if(t.mediaType==="youtube"?v=`https://www.youtube.com/embed/${t.videoId}`:t.mediaType==="vimeo"?v=`https://player.vimeo.com/video/${t.videoId}`:t.mediaType==="loom"?v=`https://www.loom.com/embed/${t.videoId}`:t.mediaType==="guidde"?v=`https://embed.app.guidde.com/playbooks/${t.videoId}`:t.mediaType==="video"&&(v=t.videoId),f.src=`${v}?autoplay=1`,f.title="Embedded Video",f.autoplay=!0,c.appendChild(f),i.appendChild(c),i.appendChild(c),t.title){const F=document.createElement("div");F.classList.add("title"),F.append(t.title),e.prepend(F)}}const jt=(t,a,e,i)=>new Promise(async c=>{if(t)if(A.A.get("insideIframe")&&window.parent?.postMessage({closeIframe:!0},"*"),A.A.get("floatingInputAction")==="focus"){const f=T();if(f){const v=i.style,F=B(f);v.marginTop=`${F}px`}i.classList.add("focus--show"),e.classList.add("iframe--show"),window.scrollTo({top:i.getBoundingClientRect().top+window.scrollY,behavior:"instant"}),c()}else{const f=!!a.style.height,v=T(),F=B(v),H=a.style;H.height=`calc(${A.A.get("height")} - ${F}px)`,setTimeout(async()=>{if(F?window.scrollTo({top:a.getBoundingClientRect().top+window.scrollY-F-30,behavior:"instant"}):window.scrollTo({top:a.getBoundingClientRect().top+window.scrollY,behavior:"instant"}),!f){a.classList.add("iframe-visible"),e.classList.add("iframe--show");const Z=e.style;Z.height="100%"}c()},100)}else{a.classList.remove("iframe-visible"),e.classList.remove("iframe--show");const f=e.style;f.height="",setTimeout(()=>{A.A.get("insideIframe")&&window.parent?.postMessage({openIframe:!0},"*");const v=a.style;v.height="",v.padding=0,v.paddingTop="";const F=i.style;F.padding="",i.classList.remove("focus--show");const H=T(),Z=H?H.offsetHeight+100:100;window.scrollTo({top:x().getBoundingClientRect().top+window.scrollY-Z,behavior:"smooth"}),c()},700)}}),ot=t=>/^linear-gradient\(\d+deg,\s*.+\)$/.test(t),lt=(t,a)=>{const e="http://www.w3.org/2000/svg",i=document.createElementNS(e,"defs"),c=/linear-gradient\((\d+deg),\s*((?:rgb\(\d+,\s*\d+,\s*\d+\)\s*\d+(\.\d+)?%\s*,?\s*)+)\)/,f=t.match(c),v=parseFloat(f[1]),F=f[2].split(/,\s*(?=rgb)/).map(ue=>ue.trim()),H=document.createElementNS(e,"linearGradient");H.setAttribute("id",a);let Z,G,K,M;return v===90?(Z="0%",G="0%",K="100%",M="0%"):(Z="0%",G="100%",K="0%",M="0%"),H.setAttribute("x1",Z),H.setAttribute("y1",G),H.setAttribute("x2",K),H.setAttribute("y2",M),F.forEach(ue=>{const ke=ue.match(/rgb\(\d+,\s*\d+,\s*\d+\)/)[0],xe=ue.match(/\d+(\.\d+)?%/)[0],W=document.createElementNS(e,"stop");W.setAttribute("offset",xe),W.setAttribute("style",`stop-color:${ke};stop-opacity:1`),H.appendChild(W)}),i.appendChild(H),i},Vt=(t,a=300)=>{let e=0;const i=[],c=[],f="...",v=document.createElement("div");v.innerHTML=t;const F=["br","img","input","hr","meta","link"],H=Z=>{if(!(e>=a)){if(Z.nodeType===Node.TEXT_NODE){let G=Z.textContent.trim();if(G.length>0){let K=G;e+G.length>a?(K=G.slice(0,a-e-f.length),c.push(K+f),e=a):(c.push(K),e+=K.length)}}else if(Z.nodeType===Node.ELEMENT_NODE){const G=Z.tagName.toLowerCase(),K=`<${Z.tagName.toLowerCase()}>`;e<a&&(c.push(K),F.includes(G)||i.push(`</${G}>`),Z.childNodes.forEach(H),!F.includes(G)&&e<a&&c.push(i.pop()))}}};for(H(v);i.length>0;)c.push(i.pop());return c.join("")},Tt=async t=>{try{const a=await fetch("https://management.hygraph.com/graphql",{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({query:"query { viewer { ... on UserViewer { user { id profile { email id } } } } }"})});if(!a?.ok)return null;const e=await a?.json();if(e?.data?.viewer?.user?.profile?.email)return e?.data?.viewer?.user?.profile?.email}catch(a){return console.error("There was an error getting data from hygraph",a),null}},de=t=>/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(t),Gt=async()=>{const t={},a=document.cookie.split("; ").reduce((e,i)=>{const[c,...f]=i.split("=");return e[c]=f.join("="),e},{});if(["hs_login_email","userEmail","email","name","firstname","hubspotutk"].forEach(e=>{a[e]&&(t[e]=a[e])}),a.__sec_id&&!t.email)try{const e=JSON.parse(a.__sec_id);e?.type==="email"&&e?.username&&de(e.username)&&(t.email=e.username)}catch(e){console.error("Error parsing __sec_id:",e)}if(a.ajs_user_id&&!t.email){const e=a.ajs_user_id?.includes("/")?a.ajs_user_id?.split("/")?.[1]:a.ajs_user_id;e&&de(e)&&(t.email=e)}if(a.managementApiToken&&!t.email){const e=await Tt(a.managementApiToken);e&&de(e)&&(t.email=e)}if(a.JWT&&a.JWT.split(".")?.length===3&&!t.email){const e=a.JWT.split(".");if(e.length){const c=e[1]?.replace(/-/g,"+")?.replace(/_/g,"/");let f={};try{f=JSON.parse(atob(c))}catch(v){console.log(v)}f?.email&&de(f.email)&&(t.email=f.email)}}if(a.salespeak_verify&&!t.email){const e=a.salespeak_verify;try{const i=atob(decodeURIComponent(e));i&&de(i)&&(t.email=i)}catch(i){console.error("Invalid JSON:",i)}}if(a.salespeak_user_additional_information){const e=a.salespeak_user_additional_information;try{const i=JSON.parse(e);i?.email&&de(i?.email)&&(t.email=i?.email),i?.name&&(t.name=i?.name),i?.company&&(t.company=i?.company),i?.country&&(t.country=i?.country),i?.state&&(t.state=i?.state),i?.city&&(t.city=i?.city),i?.role&&(t.role=i?.role),i?.metadata&&(t.metadata=i?.metadata)}catch(i){console.error("Invalid JSON Data for salespeak_user_additional_information cookie:",i)}}return t.email||Object.keys(a).forEach(e=>{if(e.startsWith("AMP_")&&!e.startsWith("AMP_MKTG_")){const i=a[e];try{const c=decodeURIComponent(atob(i)),f=JSON.parse(c),v=f?.userId;v&&de(v)&&(t.email=f.userId)}catch(c){console.error("Invalid JSON:",c)}}}),t},Yt=()=>{const t={};if(Object.values(window.localStorage).forEach(e=>{if(e)try{const i=JSON.parse(e);i?.distinct_id&&de(i?.distinct_id)&&(t.email=i?.distinct_id)}catch{}}),localStorage.getItem("ajs_user_traits"))try{const e=JSON.parse(localStorage.getItem("ajs_user_traits"));e?.email&&de(e?.email)&&(t.email=e?.email)}catch{}return t},Xt=async()=>{let t={};try{const a=await fetch("https://auth.traceloop.com/api/v1/refresh_token",{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"});if(a?.ok){const e=await a?.json();e?.user?.email&&(t.email=e?.user?.email)}}catch(a){console.error("There was an error getting data from Traceloop",a)}return t},ua=/\.(gif|jpg|jpeg|tiff|png|bmp|svg|tiff|webp)(\?.*)?$/i,pa=/\.(mp4|avi|mkv|mov|wmv|flv|webm|ogg|mpeg|mpg)(\?.*)?$/i,ct=/(?:youtu\.be\/|youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?\/|\S*?[?&]v=)))([^#&?/]+)/,Zt=/https:\/\/www\.loom\.com\/share\/([^?]+)/,dt=/(?:https?:\/\/)?(?:www\.)?(?:player\.)?vimeo\.com(?:\/(?:[a-z]+\/)?)?(?:video\/|(\d+))/,le={YOUTUBE:"youtube",VIMEO:"vimeo",VIDEO:"video",IMAGE:"image",LOOM:"loom"},Jt=async(t,a)=>{if(!t||!a)return"";const i={[le.YOUTUBE]:ct,[le.VIMEO]:dt,[le.LOOM]:Zt}[a]?.exec(t)||[],c=a===le.GUIDDE?i[2]:i[1];if(!c&&a!==le.IMAGE&&a!==le.VIDEO)return"";const f={[le.YOUTUBE]:`https://img.youtube.com/vi/${c}/sddefault.jpg`,[le.VIMEO]:`https://vumbnail.com/${c}_medium.jpg`,[le.LOOM]:`https://cdn.loom.com/sessions/thumbnails/${c}-with-play.gif`,[le.IMAGE]:t};return a===le.VIDEO?await generateVideoThumbnail(t):f[a]||""},Qt=t=>{const a=/(https?:\/\/[^\s]+)|(www\.[^\s]+)/g;return t.replace(a,e=>`<a href="${e.startsWith("www.")?`https://${e}`:e}" target="_blank" class="message-for-user-link">${e}</a>`)},Rt=t=>{if(!t||typeof t!="string"||!/^((https?|ftp):?\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t))return!1;try{const e=t.startsWith("http://")||t.startsWith("https://")?t:`https://${t}`;return new URL(e),!0}catch{return!1}},qt=t=>{if(!t||t.toLowerCase()==="unknown")return"NN";const a=new RegExp(/(\p{L}{1})\p{L}+/,"gu"),e=[...t.matchAll(a)];if(e.length===0){const i=t.substring(0,1).toUpperCase();return`${i}${i}`}return`${e[0][1].toUpperCase()}${e.length>1?e[1][1].toUpperCase():e[0][1].toUpperCase()}`},Bt=6e4;let Ut=0;function Wt(t){if(navigator.modelContext)try{try{navigator.modelContext.unregisterTool("ask_question")}catch{}const{widgetSettings:a}=t,i=`Ask the ${a?.agentName||"AI"} assistant a question and get the answer. Returns the full AI-generated response.`,c=A.A.get("brainURL")||"https://brain.salespeak.ai",f=new URL(c).origin;navigator.modelContext.registerTool({name:"ask_question",description:i,inputSchema:{type:"object",properties:{question:{type:"string",description:"The question or message to send to the AI assistant."}},required:["question"]},execute:({question:v})=>{if(!v||typeof v!="string")return{content:[{type:"text",text:"Error: A valid question string is required."}]};const F=`webmcp_${++Ut}_${Date.now()}`;return new Promise(H=>{let Z;const G=()=>{clearTimeout(Z),window.removeEventListener("message",K)},K=M=>{M.origin===f&&M.data&&typeof M.data=="object"&&"salespeakBotResponse"in M.data&&M.data._webmcpCallId===F&&(G(),H({content:[{type:"text",text:M.data.salespeakBotResponse}]}))};window.addEventListener("message",K),Z=setTimeout(()=>{window.removeEventListener("message",K),H({content:[{type:"text",text:`Question sent to the assistant: "${v}". The response timed out \u2014 check the chat widget.`}]})},Bt);try{const M=()=>{t.sendMessageToIframe({inputPrompt:v,_webmcpCallId:F})};!t.isWidgetOpen&&typeof t.openWidget=="function"?t.openWidget(M):M()}catch(M){G(),H({content:[{type:"text",text:`Error sending question to widget: ${M.message}`}]})}})}})}catch(a){console.error("Failed to register WebMCP tools",a)}}function Et(){if(navigator.modelContext)try{navigator.modelContext.unregisterTool("ask_question")}catch{}}function Mt(){const t=document.location.href;if(!t.startsWith("about:"))return t;try{return window.parent.location.href}catch{}return document.referrer||t}const ut="top 0.3s ease, height 0.3s ease",pt=(t,a)=>{const e=B(a);t.style.height=`calc(100dvh - ${e}px)`,t.style.top=`${e}px`},Kt=(t,a,e)=>{if(e.headerOriginalTransition=t.style.transition,pt(t,a),!a||!window.ResizeObserver)return;e.headerResizeRafId=requestAnimationFrame(()=>{e.headerResizeRafId=null;const c=t.style.transition;t.style.transition=c?`${c}, ${ut}`:ut});const i=new ResizeObserver(()=>pt(t,a));i.observe(a),e.headerResizeObserver=i},Ot=(t,a)=>{t&&(a.headerResizeRafId&&(cancelAnimationFrame(a.headerResizeRafId),a.headerResizeRafId=null),a.headerResizeObserver&&(a.headerResizeObserver.disconnect(),a.headerResizeObserver=null),"headerOriginalTransition"in a&&(t.style.transition=a.headerOriginalTransition||"",delete a.headerOriginalTransition))},ht="--salespeak-bottom-offset",Dt={childList:!0,subtree:!0};let ve=null,$e=null,je=null,Xe=!1,Ve=null,Ze="",Pe=0;const _e=t=>{document.documentElement.style.setProperty(ht,`${t}px`)},mt=t=>{const a=t?t.getBoundingClientRect().height:0;a>0?_e(a+Pe):_e(0)},Pt=t=>{if(ve&&(ve.disconnect(),ve=null),!t){je=null,_e(0);return}je=t,ve=new ResizeObserver(()=>mt(je)),ve.observe(t),mt(t)},ft=()=>{let t=null;try{t=document.querySelector(Ze)}catch(a){console.warn("[Salespeak] bottomElementSelector is not a valid CSS selector:",Ze,a);return}t!==je&&Pt(t)},_t=t=>{et();const a=t?.bottomElementSelector?.trim?.()||"";if(!a)return;const e=t?.bottomElementGap,i=Number(e),c=Number.isFinite(i)?Math.max(0,Math.floor(i)):16;if(Ze=a,Pe=c,!(typeof MutationObserver>"u"||typeof ResizeObserver>"u"))try{if(!document.body){console.warn("[Salespeak] bottomElementWatcher: document.body not yet available; selector will not be watched.");return}ft(),$e=new MutationObserver(()=>{Xe||(Xe=!0,Ve=requestAnimationFrame(()=>{Xe=!1,Ve=null,ft()}))}),$e.observe(document.body,Dt)}catch(f){console.warn("[Salespeak] initBottomElementWatcher failed:",f),et()}},et=()=>{Ve!==null&&(cancelAnimationFrame(Ve),Ve=null),ve&&(ve.disconnect(),ve=null),$e&&($e.disconnect(),$e=null),je=null,Xe=!1,Ze="",Pe=0,document.documentElement.style.removeProperty(ht)},gt="--salespeak-viewport-bottom-inset",ea=150;let ce=null,Je=!1,Te=null,tt=!1;const bt=t=>{document.documentElement.style.setProperty(gt,`${t}px`)},wt=()=>{if(!ce)return;if(ce.scale>1){bt(0);return}const a=document.documentElement.clientHeight-ce.height-ce.offsetTop,e=Math.max(0,Math.min(Math.round(a),ea));bt(e)},Qe=()=>{Je||(Je=!0,Te=requestAnimationFrame(()=>{Je=!1,Te=null,wt()}))},ta=()=>{if(at(),ce=window.visualViewport||null,!!ce)try{ce.addEventListener("resize",Qe),ce.addEventListener("scroll",Qe),tt=!0,wt()}catch(t){console.warn("[Salespeak] initViewportInsetWatcher failed:",t),at()}},at=()=>{Te!==null&&(cancelAnimationFrame(Te),Te=null),ce&&tt&&(ce.removeEventListener("resize",Qe),ce.removeEventListener("scroll",Qe)),tt=!1,Je=!1,ce=null,document.documentElement.style.removeProperty(gt)};let yt=!1;const aa=["/api/vector/id","/api/identify"],ia=t=>{if(!t||typeof t!="string")return!1;try{const a=new URL(t);return a.hostname.endsWith(".userled.io")?aa.some(e=>a.pathname.startsWith(e)):!1}catch{return!1}},sa=t=>{if(!(!t||typeof t!="object"))try{const a={};t.email&&de(t.email)&&(a.email=t.email),(t.name||t.full_name||t.fullName)&&(a.name=t.name||t.full_name||t.fullName),(t.company||t.company_name||t.companyName)&&(a.company=t.company||t.company_name||t.companyName),(t.title||t.job_title||t.jobTitle||t.role)&&(a.role=t.title||t.job_title||t.jobTitle||t.role),t.country&&(a.country=t.country),t.city&&(a.city=t.city),t.phone&&(a.phone=t.phone);const e={};if(t.account&&(t.account.name&&(e.accountName=t.account.name),t.account.domain&&(e.accountDomain=t.account.domain),t.account.industry&&(e.accountIndustry=t.account.industry),(t.account.employee_count||t.account.employeeCount)&&(e.accountEmployeeCount=t.account.employee_count||t.account.employeeCount)),(t.company_domain||t.companyDomain)&&(e.companyDomain=t.company_domain||t.companyDomain),t.industry&&(e.industry=t.industry),(t.employee_count||t.employeeCount)&&(e.employeeCount=t.employee_count||t.employeeCount),Array.isArray(t.segments)&&(e.userledSegments=t.segments.map(i=>typeof i=="string"?i:i.name||i.id).join(", ")),Array.isArray(t.audiences)&&(e.userledAudiences=t.audiences.map(i=>typeof i=="string"?i:i.name||i.id).join(", ")),(t.visitor_id||t.visitorId||t.id)&&(e.userledVisitorId=t.visitor_id||t.visitorId||t.id),Object.keys(a).length||Object.keys(e).length){const i=A.A.get("userInfo")||{};A.A.set("userInfo",{...i,...Object.fromEntries(Object.entries(a).filter(([c,f])=>f&&!i[c])),metadata:{...i.metadata,...e}})}}catch(a){console.error("[Salespeak] Error processing UserLed data:",a)}},na=()=>{if(yt||typeof window.fetch!="function")return;yt=!0;const t=window.fetch;window.fetch=async function(...a){const e=typeof a[0]=="string"?a[0]:a[0]?.url,i=await t.apply(this,a);if(ia(e))try{i.clone().json().then(f=>{sa(f)}).catch(()=>{})}catch{}return i}},ha=()=>{const t={},a=document.cookie.split("; ").reduce((e,i)=>{const[c,...f]=i.split("=");return e[c]=f.join("="),e},{});return a.userled_user_id&&(t.userledUserId=a.userled_user_id),a.userled_session_id&&(t.userledSessionId=a.userled_session_id),t},ra=({avatar:t,avatarLetter:a,message:e,badgeContent:i,position:c="right-bottom",bottomOffsetPx:f=30,sideOffsetPx:v=30,dismissKey:F,showNotification:H=!0,onExpand:Z,brandSecondaryColor:G})=>{const K=L=>{try{const ye=window?.localStorage?.getItem(L);if(ye!=null)return ye}catch{}try{return window?.sessionStorage?.getItem(L)}catch{return null}},M=(L,ye)=>{try{window?.localStorage?.setItem(L,ye)}catch{}try{window?.sessionStorage?.setItem(L,ye)}catch{}},ue=A.A.get("isAdmin"),ke=!ue&&F?K(F)==="true":!1,xe=ue||H,W=document.createElement("div");W.id="salespeak-mci-root",W.classList.add(`salespeak-mci-root--${c}`),W.style.bottom=`${f}px`,c==="right-bottom"?W.style.right=`${v}px`:c==="left-bottom"?W.style.left=`${v}px`:W.style.left="50%";let U=null,ie=null;if(e&&!ke&&xe){U=document.createElement("div"),U.classList.add("salespeak-mci-bubble"),U.setAttribute("role","button"),U.setAttribute("tabindex","0"),U.setAttribute("aria-label","Open launcher"),U.append(e),ie=document.createElement("button"),ie.type="button",ie.classList.add("salespeak-mci-bubble-close"),ie.setAttribute("aria-label","Dismiss message");const L=document.createElementNS("http://www.w3.org/2000/svg","svg");L.setAttribute("width","8"),L.setAttribute("height","8"),L.setAttribute("viewBox","0 0 14 14"),L.setAttribute("fill","none");const ye=document.createElementNS("http://www.w3.org/2000/svg","path");ye.setAttribute("d","M11.0834 3.73917L10.2609 2.91667L7.00002 6.1775L3.73919 2.91667L2.91669 3.73917L6.17752 7L2.91669 10.2608L3.73919 11.0833L7.00002 7.8225L10.2609 11.0833L11.0834 10.2608L7.82252 7L11.0834 3.73917Z"),ye.setAttribute("fill","currentColor"),L.appendChild(ye),ie.appendChild(L),U.appendChild(ie),W.appendChild(U)}const ee=document.createElement("div");ee.classList.add("salespeak-mci-avatar-wrap"),ee.setAttribute("role","button"),ee.setAttribute("tabindex","0"),ee.setAttribute("aria-label","Open launcher");const Re=ot(G),Ne=`salespeak-mci-grad-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,Ge=Re?`url(#${Ne})`:G||"#23DB93",oe=document.createElementNS("http://www.w3.org/2000/svg","svg");oe.setAttribute("width","60"),oe.setAttribute("height","60"),oe.setAttribute("viewBox","0 0 60 60"),oe.setAttribute("fill","none"),oe.classList.add("salespeak-mci-avatar-svg"),Re&&oe.appendChild(lt(G,Ne));const Se=document.createElementNS("http://www.w3.org/2000/svg","circle");Se.setAttribute("cx","30"),Se.setAttribute("cy","30"),Se.setAttribute("r","28"),Se.setAttribute("fill",Ge),oe.appendChild(Se),ee.appendChild(oe);const we=document.createElement("div");if(we.classList.add("salespeak-mci-avatar-inner"),t&&typeof t=="object"&&"resource"in t){const L=te({height:50,width:50,imgHeight:t.height,imgWidth:t.width,position:t.position,resourceSrc:t.resource,rotation:t.rotate,type:t.type,rounded:t.rounded,scale:t.scale});we.appendChild(L)}else if(t instanceof HTMLElement)we.appendChild(t);else if(typeof t=="string"&&t.length>0){const L=document.createElement("div");L.classList.add("salespeak-mci-avatar-image"),L.style.backgroundImage=`url(${encodeURI(t)})`,we.appendChild(L)}else{X("Pacifico",[400]);const L=document.createElement("span");L.classList.add("salespeak-mci-avatar-letter"),L.append((a||"V").charAt(0).toUpperCase()),we.appendChild(L)}ee.appendChild(we);let pe=null;i!=null&&!ke&&xe&&(pe=document.createElement("div"),pe.classList.add("salespeak-mci-badge"),pe.append(String(i)),ee.appendChild(pe)),W.appendChild(ee);let Ie=null;(U||pe)&&!ke&&(Ie=window.setTimeout(()=>{U?.classList.add("salespeak-mci--show"),pe?.classList.add("salespeak-mci--show")},2e3));const Le=()=>{typeof Z=="function"&&Z()},qe=()=>Le(),Be=L=>{L.target===ee&&(L.key==="Enter"||L.key===" ")&&(L.preventDefault(),Le())};ee.addEventListener("click",qe),ee.addEventListener("keydown",Be);let Ye=null,se=null,Q=null;return U&&(Ye=L=>{L.target.closest(".salespeak-mci-bubble-close")||Le()},se=L=>{L.target===U&&(L.key==="Enter"||L.key===" ")&&(L.preventDefault(),Le())},U.addEventListener("click",Ye),U.addEventListener("keydown",se),Q=L=>{L.stopPropagation(),F&&!ue&&M(F,"true"),U?.classList.remove("salespeak-mci--show"),pe?.classList.remove("salespeak-mci--show"),window.setTimeout(()=>{U?.parentNode?.removeChild(U),pe?.parentNode?.removeChild(pe)},700)},ie.addEventListener("click",Q)),{element:W,destroy:()=>{Ie&&(window.clearTimeout(Ie),Ie=null),ee.removeEventListener("click",qe),ee.removeEventListener("keydown",Be),U&&(U.removeEventListener("click",Ye),U.removeEventListener("keydown",se)),ie&&ie.removeEventListener("click",Q),W.parentNode&&W.parentNode.removeChild(W)}}};var vt=r(7657);function kt(t,a){const e=document.createElement("div");e.className="salespeak-window-skeleton__message";const i=document.createElement("div");i.className="salespeak-window-skeleton__message-row";const c=document.createElement("div");c.className="salespeak-window-skeleton__message-avatar";const f=document.createElement("div");f.className="salespeak-window-skeleton__message-lines",t.forEach(F=>{const H=document.createElement("div");H.className=`salespeak-window-skeleton__line salespeak-window-skeleton__line--${F}`,f.appendChild(H)}),i.appendChild(c),i.appendChild(f);const v=document.createElement("div");return v.className=`salespeak-window-skeleton__line salespeak-window-skeleton__line--${a}`,e.appendChild(i),e.appendChild(v),e}function oa(){const t=document.createElement("div");t.className="salespeak-window-skeleton",t.setAttribute("aria-hidden","true");const a=document.createElement("div");a.className="salespeak-window-skeleton__frame";const e=document.createElement("div");e.className="salespeak-window-skeleton__header";const i=document.createElement("div");i.className="salespeak-window-skeleton__header-avatar";const c=document.createElement("div");c.className="salespeak-window-skeleton__header-title",e.appendChild(i),e.appendChild(c);const f=document.createElement("div");f.className="salespeak-window-skeleton__body",f.appendChild(kt(["short","wide"],"xs")),f.appendChild(kt(["medium"],"sm"));const v=document.createElement("div");v.className="salespeak-window-skeleton__footer";const F=document.createElement("div");return F.className="salespeak-window-skeleton__input",v.appendChild(F),a.appendChild(e),a.appendChild(f),a.appendChild(v),t.appendChild(a),t}function la(t,a,e={}){if(!t||!a)return{detach:()=>{}};const i=typeof e.fallbackMs=="number"?e.fallbackMs:vt.Z6;t.classList.add("salespeak-window-skeleton-host");const c=oa();a.parentNode===t?t.insertBefore(c,a):t.appendChild(c);let f=!1;const v=()=>{f||(f=!0,window.removeEventListener("message",H),clearTimeout(Z))},F=()=>{f||(c.classList.add("salespeak-window-skeleton--fade"),setTimeout(()=>{c.parentNode&&c.parentNode.removeChild(c),t.classList.remove("salespeak-window-skeleton-host")},260),v())},H=G=>{G.source===a.contentWindow&&(!G.data||typeof G.data!="object"||G.data[vt.o6]===!0&&F())};window.addEventListener("message",H);const Z=setTimeout(F,i);return{detach:()=>{v(),c.parentNode&&c.parentNode.removeChild(c),t.classList.remove("salespeak-window-skeleton-host")}}}const ca=(t,a="chunk")=>t().catch(i=>{if(i?.name!=="ChunkLoadError")throw i;return console.warn(`[Salespeak] Failed to load ${a}, retrying once...`,i),new Promise((c,f)=>{setTimeout(()=>{t().then(c,v=>{console.error(`[Salespeak] Failed to load ${a} after retry. This usually means the page is running a stale widget.js against a newer deploy.`,v),f(v)})},500)})})},2768(u,h,r){r.d(h,{A:()=>S});var b=r(6758),g=r.n(b),s=r(935),n=r.n(s),o=n()(g());o.push([u.id,`/*
 * Fonts are loaded dynamically \u2014 never via @import here.
 * The customer-selected font is loaded in index.js (loadGoogleFont call).
 * Pacifico (decorative letter-avatar fallback) is loaded on demand inside
 * the letter-render branches of buildMinimizedChatIconView.js and chatIcon.js,
 * so we never request it on hosts that don't render a letter avatar.
 */

/*  RESET/STANDARIZE ALL OF OUR OWN COMPONENTS INIT */

#salespeak-floating-mascot *,
#salespeak-overlay *,
#salespeak-scroll-to *,
#salespeak-sticky-input *,
#salespeak-dynamic-bar *,
#salespeak-floating-mascot *,
#salespeak-drawer *,
#salespeak-side-bar *,
#salespeak-box-launcher *,
#salespeak-chooser *,
#salespeak-chat-only *,
#salespeak-persona-switch *,
#salespeak-widget * {
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    font-family: var(--salespeak-font-family);
    font-weight: normal;
    margin: 0;
    padding: 0;
}

#salespeak-floating-mascot svg,
#salespeak-overlay svg,
#salespeak-scroll-to svg,
#salespeak-sticky-input svg,
#salespeak-dynamic-bar svg,
#salespeak-floating-mascot svg,
#salespeak-drawer svg,
#salespeak-side-bar svg,
#salespeak-box-launcher svg,
#salespeak-chooser svg,
#salespeak-chat-only svg,
#salespeak-persona-switch svg,
#salespeak-widget svg {
    width: inherit;
    height: inherit;
    fill: initial;
    stroke: initial;
}

/*  RESET/STANDARIZE ALL OF OUR OWN COMPONENTS END */

#salespeak-widget {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: auto;
    position: relative;
    width: 100%;
    max-width: 100%;
}

#salespeak-scroll-to {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    height: 0;
    justify-content: center;
    max-width: 100%;
    width: 100vw;
}

#salespeak-scroll-to.salespeak-scroll-to--search-box-small-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999999999;
}

#salespeak-scroll-to.focus--show {
    height: 100vh;
    height: 100dvh;
    backdrop-filter: blur(25px);
}

#salespeak-widget .iframe,
#salespeak-scroll-to .iframe {
    border: 0;
    box-sizing: border-box;
    height: 0;
    margin: 0;
    opacity: 0;
    overflow: hidden;
    padding: 0;
    transition:
        height 1s cubic-bezier(0.42, 0, 0.58, 1),
        opacity 1s cubic-bezier(0.42, 0, 0.58, 1);
    width: 100%;
    z-index: 99;
}

#salespeak-scroll-to .iframe {
    transform: translateY(20vh);
    transition:
        transform 600ms ease-out,
        visibility 600ms ease-out,
        height 1s cubic-bezier(0.42, 0, 0.58, 1),
        opacity 1s cubic-bezier(0.42, 0, 0.58, 1);
    will-change: opacity, transform, visibility, height;
}

#salespeak-widget .iframe.iframe--show {
    opacity: 1;
}

#salespeak-scroll-to .iframe.iframe--show {
    height: 100%;
    opacity: 1;
    transform: none;
}

#salespeak-widget .launcher-container {
    align-items: center;
    color: #000;
    display: flex;
    flex-direction: column;
    height: auto;
    justify-content: flex-start;
    opacity: 1;
    transition:
        visibility 0.3s linear,
        opacity 0.3s linear;
    width: 100%;
    z-index: 99;
}

#salespeak-overlay {
    background: rgba(0, 0, 0, 0.85);
    bottom: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: 100dvh;
    left: 0;
    max-width: 100%;
    position: fixed;
    right: 0;
    top: 0;
    width: 100vw;
    z-index: 999999999;
}

#salespeak-overlay .header-container {
    color: #f3f3f3;
    display: flex;
    justify-content: flex-end;
    padding: 32px;
}

#salespeak-overlay .close-button-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    object-fit: contain;
}

#salespeak-overlay .media-container {
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: center;
    margin: 32px;
    overflow: hidden;
}

#salespeak-overlay .image-media {
    border: 1px solid #bababa;
    height: auto;
    max-height: 100%;
    max-width: 100%;
    width: auto;
}

#salespeak-overlay .title,
.video-overlay-container .title {
    flex: 1;
    text-align: center;
}

#salespeak-widget .video-overlay-container--show {
    opacity: 1;
}

#salespeak-overlay .video-container {
    height: 100%;
    max-width: 1000px;
    aspect-ratio: 16 / 9;
    position: relative;
    overflow: hidden;
}

#salespeak-overlay .iframe-media {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

#salespeak-magic-icon:hover #first-star-static {
    transform: translate(-7.281914px, -9.080589px) scale(1.5, 1.5);
}

#salespeak-magic-icon:hover #second-star-static {
    transform: translate(-3.281914px, -6.080589px) scale(1.5, 1.5);
}

#salespeak-magic-icon:hover #third-star-static {
    transform: translate(-7.281914px, -5.080589px) scale(1.5, 1.5);
}

#salespeak-magic-icon #first-star-group {
    animation: first-star-group__ts 20000ms linear;
}

@keyframes first-star-group__ts {
    0% {
        transform: translate(18.149999px, 20.400001px) scale(1, 1);
    }

    21.92% {
        transform: translate(18.149999px, 20.400001px) scale(1, 1);
        animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
    }

    23.6% {
        transform: translate(18.149999px, 20.400001px) scale(0.9, 0.9);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    27.68% {
        transform: translate(18.149999px, 20.400001px) scale(2.5, 2.5);
    }

    100% {
        transform: translate(18.149999px, 20.400001px) scale(1, 1);
    }
}

#salespeak-magic-icon #first-star {
    animation: first-star_c_o 20000ms linear infinite normal forwards;
}

@keyframes first-star_c_o {
    0% {
        opacity: 1;
    }

    21.92% {
        opacity: 1;
        animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
    }

    23.6% {
        opacity: 0.82257;
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    27.68% {
        opacity: 0;
    }

    100% {
        opacity: 0;
    }
}

#salespeak-magic-icon #second-star-group {
    animation: second-star-group__ts 20000ms linear infinite normal forwards;
}

@keyframes second-star-group__ts {
    0% {
        transform: translate(6.45px, 14.949999px) scale(1, 1);
    }

    23.84% {
        transform: translate(6.45px, 14.949999px) scale(1, 1);
        animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
    }

    25.52% {
        transform: translate(6.45px, 14.949999px) scale(0.9, 0.9);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    29.48% {
        transform: translate(6.45px, 14.949999px) scale(2.5, 2.5);
    }

    100% {
        transform: translate(6.45px, 14.949999px) scale(1, 1);
    }
}

#salespeak-magic-icon #second-star {
    animation: second-star_c_o 20000ms linear infinite normal forwards;
}

@keyframes second-star_c_o {
    0% {
        opacity: 1;
    }

    23.84% {
        opacity: 1;
        animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
    }

    25.52% {
        opacity: 0.82257;
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    29.48% {
        opacity: 0;
    }

    100% {
        opacity: 0;
    }
}

#salespeak-magic-icon #third-star-group {
    animation: third-star-group__ts 20000ms linear infinite normal forwards;
}

@keyframes third-star-group__ts {
    0% {
        transform: translate(17.300001px, 9px) scale(1, 1);
    }

    25.76% {
        transform: translate(17.300001px, 9px) scale(1, 1);
        animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
    }

    27.32% {
        transform: translate(17.300001px, 9px) scale(0.9, 0.9);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    31.4% {
        transform: translate(17.300001px, 9px) scale(2.5, 2.5);
    }

    100% {
        transform: translate(17.300001px, 9px) scale(1, 1);
    }
}

#salespeak-magic-icon #third-star {
    animation: third-star_c_o 20000ms linear infinite normal forwards;
}

@keyframes third-star_c_o {
    0% {
        opacity: 1;
    }

    25.76% {
        opacity: 1;
        animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
    }

    27.32% {
        opacity: 0.82257;
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    31.4% {
        opacity: 0;
    }

    100% {
        opacity: 0;
    }
}

@keyframes jump {
    0% {
        transform: scaleX(1.25) scaleY(0.75) translate(0px, 0px);
    }

    30% {
        transform: scaleX(0.75) scaleY(1.25) translate(0px, -10px);
    }

    50% {
        transform: scaleX(0.9) scaleY(1.1) translate(0px, -20px);
    }

    70% {
        transform: translate(0px, -30px);
    }
}

#salespeak-sparks-icon #first-star,
#salespeak-sparks-icon #second-star {
    transform-origin: center;
}

#salespeak-sparks-icon #first-star {
    animation: move-star-1 10s infinite;
}

#salespeak-sparks-icon #second-star {
    animation: move-star-2 10s infinite;
    transform-box: fill-box;
}

@keyframes move-star-1 {
    0%,
    100% {
        transform: translate(0, 0) scale(1) rotate(0deg);
    }
    7% {
        transform: translate(30%, -30%);
    }
    14% {
        transform: translate(-20%, -20%) scale(0.6) rotate(180deg);
    }
    21% {
        transform: translate(-5%, 5%) scale(0.8) rotate(90deg);
    }
    28% {
        transform: translate(0, 0) scale(1) rotate(0deg);
    }
}

@keyframes move-star-2 {
    0% {
        transform: translate(0, 0) rotate(0deg);
    }
    7% {
        transform: translate(-100%, 90%);
    }
    14% {
        transform: translate(0%, 90%) rotate(90deg);
    }
    21% {
        transform: translate(0, 0) rotate(180deg);
    }
    28% {
        transform: translate(0%, 0%) rotate(360deg);
    }
    100% {
        transform: translate(0%, 0%) rotate(360deg);
    }
}

@keyframes loading {
    100% {
        left: 100%;
    }
}

@keyframes bounce {
    0% {
        transform: translateY(calc(-1 * var(--salespeak-bottom-offset, 0px))) scale(1);
    }
    50% {
        transform: translateY(calc(-1 * var(--salespeak-bottom-offset, 0px))) scale(1.1);
    }
    100% {
        transform: translateY(calc(-1 * var(--salespeak-bottom-offset, 0px))) scale(1);
    }
}

@keyframes cursorBlink {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

/* Most of these styles mush have the !important so will go over the user config inline styling only for mobile */
@media (max-width: 768px) {
    #salespeak-widget .floating-input {
        font-size: 16px;
    }

    #salespeak-widget .floating-input-placeholder .floating-input-placeholder-text {
        font-size: 16px;
    }

    #salespeak-scroll-to.focus--show {
        margin-top: 0 !important;
    }

    /* Mobile header offset handling for all launchers */
    #salespeak-widget.iframe-visible,
    #salespeak-box-launcher.iframe-visible,
    #salespeak-sticky-input.iframe-visible,
    #salespeak-drawer.iframe-visible,
    #salespeak-chat-only.iframe-visible,
    #salespeak-side-bar.iframe-visible {
        /* Ensure proper z-index and positioning for mobile */
        z-index: 999999 !important;
    }

    /* Mobile-specific iframe positioning for all launchers */
    #salespeak-widget.iframe-visible .iframe--show,
    #salespeak-box-launcher.iframe-visible .iframe--show,
    #salespeak-sticky-input.iframe-visible .iframe--show,
    #salespeak-drawer.iframe-visible .iframe--show,
    #salespeak-chat-only.iframe-visible .iframe--show,
    #salespeak-side-bar.iframe-visible .iframe--show {
        /* Ensure iframe respects mobile header offset */
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        height: 100dvh !important;
        z-index: 999999 !important;
    }
}

.skeleton-box {
    display: inline-block;
    height: 1em;
    position: relative;
    overflow: hidden;
    background-color: #dddbdd;
    border-radius: 90px;

    &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(90deg, rgba(#fff, 0) 0, rgba(#fff, 0.2) 20%, rgba(#fff, 0.5) 60%, rgba(#fff, 0));
        animation: shimmer 5s infinite;
        content: '';
    }

    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }
}

@media print {
    #salespeak-floating-mascot *,
    #salespeak-overlay *,
    #salespeak-scroll-to *,
    #salespeak-sticky-input *,
    #salespeak-floating-mascot *,
    #salespeak-drawer *,
    #salespeak-side-bar *,
    #salespeak-box-launcher *,
    #salespeak-chooser *,
    #salespeak-chat-only *,
    #salespeak-widget * {
        display: none !important;
    }
}

/* WEBFLOW APP */
.salespeak-widget-webflow-instance.salespeak-widget-webflow-instance--hide,
.salespeak-widget-webflow-launcher-reference.salespeak-widget-webflow-launcher-reference--hide {
    display: none;
}

/* FROM SALESPEAK WIDGET SHARE BOARD (to hide some pop-ups like cookieyes consent) */
body.from-salespeak-widget-share-board .cky-consent-container.active {
    display: none !important;
}

/* SALESPEAK WIDGET STYLING OVERRIDES */
.salespeak-no-transform {
    transform: none !important;
    opacity: 1 !important;
    will-change: initial !important;
    perspective: initial !important;
    transform-origin: initial !important;
    transform-style: initial !important;
}

/* ============================================================
   Exit Intent Overlay
   Colors and border-radius are controlled by CSS variables
   injected by exitIntent.js:
     --sp-ei-bg, --sp-ei-text, --sp-ei-accent, --sp-ei-radius
   ============================================================ */

#sp-exit-intent-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2147483647;
    padding: 16px;
    box-sizing: border-box;
}

/* User-agent button reset for the body-mounted overlay \u2014 neutralizes host-page
   \`button { ... }\` styling that would otherwise paint the close X and CTAs solid
   (same class of issue as the chat-icon launcher's #salespeak-floating-mascot
   button reset). All class rules below carry the #sp-exit-intent-backdrop
   prefix to stay more specific than this reset. */
#sp-exit-intent-backdrop button {
    appearance: none;
    background: transparent;
    border: 0;
    color: inherit;
    cursor: pointer;
    font: inherit;
    margin: 0;
    padding: 0;
}

#sp-exit-intent-backdrop .sp-exit-intent-card {
    position: relative;
    background: var(--sp-ei-bg, #fff);
    color: var(--sp-ei-text, #282828);
    border-radius: var(--sp-ei-radius, 12px);
    padding: 32px;
    max-width: 480px;
    width: 100%;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18);
}

#sp-exit-intent-backdrop .sp-exit-intent-close {
    position: absolute;
    top: 12px;
    right: 16px;
    background: none;
    border: none;
    font-size: 22px;
    line-height: 1;
    cursor: pointer;
    color: var(--sp-ei-text, #282828);
    opacity: 0.5;
    padding: 4px 8px;
}

#sp-exit-intent-backdrop .sp-exit-intent-close:hover {
    opacity: 1;
}

#sp-exit-intent-backdrop .sp-exit-intent-headline {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 8px;
    color: var(--sp-ei-text, #282828);
    font-family: var(--salespeak-font-family, 'Poppins', sans-serif);
}

#sp-exit-intent-backdrop .sp-exit-intent-subtext {
    font-size: 14px;
    margin: 0 0 24px;
    color: var(--sp-ei-text, #282828);
    opacity: 0.75;
    line-height: 1.5;
    font-family: var(--salespeak-font-family, 'Poppins', sans-serif);
}

#sp-exit-intent-backdrop .sp-exit-intent-cta-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

#sp-exit-intent-backdrop .sp-exit-intent-cta {
    flex: 1;
    min-width: 140px;
    padding: 12px 20px;
    border-radius: var(--sp-ei-radius, 12px);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    font-family: var(--salespeak-font-family, 'Poppins', sans-serif);
    transition: opacity 0.15s;
}

#sp-exit-intent-backdrop .sp-exit-intent-cta:hover {
    opacity: 0.85;
}

#sp-exit-intent-backdrop .sp-exit-intent-cta--primary {
    background: var(--sp-ei-accent, #7747FF);
    color: #fff;
    border: none;
}

#sp-exit-intent-backdrop .sp-exit-intent-cta--secondary {
    background: transparent;
    color: var(--sp-ei-accent, #7747FF);
    border: 2px solid var(--sp-ei-accent, #7747FF);
}

/* =========================
   Window Skeleton (Phase 1)
   Painted into the launcher's iframe container so customers see a
   neutral chat-shaped placeholder during iframe boot. Removed when
   the widget posts \`widgetReady\` (or after a fallback timeout).
   ========================= */

@keyframes salespeak-window-skeleton-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

/* All skeleton selectors are scoped under #salespeak-widget so they beat the
   \`#salespeak-widget * { padding: 0; margin: 0 }\` reset at line 23 \u2014 without
   this prefix every padding/margin we set is silently zeroed out. */

#salespeak-widget .salespeak-window-skeleton {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 8px;
    pointer-events: none;
    opacity: 1;
    transition: opacity 220ms ease-out;
    /* Must sit above the iframe \u2014 \`.iframe\` has z-index: 99 (line 102) and
       fades opacity 0 \u2192 1 over 1s on \`iframe--show\`, which would otherwise
       paint the iframe content (and its own React skeleton) through ours. */
    z-index: 100;
}

#salespeak-widget .salespeak-window-skeleton--fade {
    opacity: 0;
}

#salespeak-widget .salespeak-window-skeleton__frame {
    width: 100%;
    height: 100%;
    max-width: 1440px;
    background: #ffffff;
    border: 1px solid #DCDCDC;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;
}

#salespeak-widget .salespeak-window-skeleton__header {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 24px;
    height: 84px;
    flex-shrink: 0;
    box-sizing: border-box;
    border-bottom: 1px solid #DCDCDC;
}

#salespeak-widget .salespeak-window-skeleton__header-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #E5E5E5;
    flex-shrink: 0;
    animation: salespeak-window-skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

#salespeak-widget .salespeak-window-skeleton__header-title {
    width: 280px;
    height: 18px;
    border-radius: 4px;
    background: #E5E5E5;
    animation: salespeak-window-skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

#salespeak-widget .salespeak-window-skeleton__body {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    padding: 24px 16px;
    gap: 32px;
    overflow: hidden;
}

@media (min-width: 768px) {
    #salespeak-widget .salespeak-window-skeleton__body {
        padding: 24px 56px;
    }
}

#salespeak-widget .salespeak-window-skeleton__message {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

#salespeak-widget .salespeak-window-skeleton__message-row {
    display: flex;
    gap: 16px;
    align-items: flex-start;
}

#salespeak-widget .salespeak-window-skeleton__message-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #E5E5E5;
    flex-shrink: 0;
    animation: salespeak-window-skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

#salespeak-widget .salespeak-window-skeleton__message-lines {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 8px;
}

#salespeak-widget .salespeak-window-skeleton__line {
    height: 14px;
    border-radius: 4px;
    background: #E5E5E5;
    animation: salespeak-window-skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

#salespeak-widget .salespeak-window-skeleton__line--short { width: 38%; height: 16px; }
#salespeak-widget .salespeak-window-skeleton__line--wide { width: 88%; height: 56px; border-radius: 8px; }
#salespeak-widget .salespeak-window-skeleton__line--medium { width: 70%; height: 56px; border-radius: 8px; }
#salespeak-widget .salespeak-window-skeleton__line--sm { width: 22%; }
#salespeak-widget .salespeak-window-skeleton__line--xs { width: 14%; }

#salespeak-widget .salespeak-window-skeleton__footer {
    display: flex;
    justify-content: center;
    padding: 8px 16px 4rem;
}

@media (min-width: 768px) {
    #salespeak-widget .salespeak-window-skeleton__footer {
        padding: 8px 7rem 4rem;
    }
}

#salespeak-widget .salespeak-window-skeleton__input {
    width: 800px;
    max-width: 100%;
    height: 110px;
    border-radius: 12px;
    background: #E5E5E5;
    animation: salespeak-window-skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Skeleton sits inside whatever container the launcher uses for the
   iframe. That container must be position-relative so absolute children
   pin correctly. We add this class to the iframe's parent on attach. */
.salespeak-window-skeleton-host {
    position: relative;
}
`,""]);const S=o},6210(u,h,r){r.d(h,{A:()=>S});var b=r(6758),g=r.n(b),s=r(935),n=r.n(s),o=n()(g());o.push([u.id,`/* ============================================================================
 * MINIMIZED CHAT-ICON STYLE \u2014 shared CSS
 * ============================================================================
 * Used by buildMinimizedChatIconView for the Sticky / Dynamic Bar (circle) /
 * Persona Switch launchers' minimized states. The Chat Icon launcher itself
 * uses its own .floating-mascot-* styles (chatIcon.styles.css) and is NOT
 * affected by this stylesheet.
 *
 * Class prefix: .salespeak-mci-* ("mci" = minimized chat icon).
 * ============================================================================ */

#salespeak-mci-root {
    position: fixed;
    /* one less than chat-icon's drawer (999999999) so we never overlap a fully-open chat */
    z-index: 999999998;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    /* Mounted on document.body \u2014 without this we inherit the host page's body font,
       which on serif-defaulted sites (e.g. MEMCYCO) renders the bubble text in Times
       New Roman. Pin a system sans stack so the bubble matches every launcher. */
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    /* children re-enable \u2014 keeps gaps from intercepting clicks on the host page */
    pointer-events: none;
    /* Lift the view above a host-page bottom element (e.g. cookie consent bar) \u2014
       same mechanism the four launcher roots use, see PR #1902. The variable defaults
       to 0 when unset so accounts that don't use the feature behave identically. */
    transform: translateY(calc(-1 * var(--salespeak-bottom-offset, 0px)));
    transition: transform 200ms ease-out;
}

/* Center-bottom variant composes both translates: horizontal centering AND the bottom-offset lift. */
#salespeak-mci-root.salespeak-mci-root--center-bottom {
    transform: translateX(-50%) translateY(calc(-1 * var(--salespeak-bottom-offset, 0px)));
}

#salespeak-mci-root > * {
    pointer-events: auto;
}

/* User-agent button reset \u2014 mirrors the chatIcon launcher pattern (see
   chatIcon.styles.css). Mounted on document.body, this view is fully exposed
   to host-page \`button { ... }\` styling. Without this reset, hosts that paint
   buttons solid (Zuora's design system, etc.) bleed into the X-close: the
   button background renders dark and the SVG \`fill="currentColor"\` X glyph
   inherits the same dark color, producing an invisible X on a black blob.
   Class-based rules below stay more specific so they continue to win. */
#salespeak-mci-root button {
    appearance: none;
    background: transparent;
    border: 0;
    color: inherit;
    cursor: pointer;
    font: inherit;
    margin: 0;
    padding: 0;
}

/* ------------------------------ Bubble ------------------------------ */

.salespeak-mci-bubble {
    max-width: 240px;
    width: max-content;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 16px;
    box-shadow:
        0 4px 24px rgba(0, 0, 0, 0.08),
        0 1px 3px rgba(0, 0, 0, 0.04),
        inset 0 1px 0 rgba(255, 255, 255, 0.9);
    color: #1f2937;
    font-size: 13.5px;
    line-height: 1.5;
    font-weight: 400;
    padding: 16px 18px;
    cursor: pointer;
    position: relative;
    /* Hidden until the 2s reveal timer adds .salespeak-mci--show */
    opacity: 0;
    visibility: hidden;
    transform: translateY(8px);
    transition:
        visibility 0.7s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.salespeak-mci-bubble.salespeak-mci--show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.salespeak-mci-bubble:hover {
    transform: translateY(-1px);
    box-shadow:
        0 6px 24px rgba(0, 0, 0, 0.1),
        0 2px 6px rgba(0, 0, 0, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.95);
}

/* X close button \u2014 placed top-right of the bubble, above the bubble's z-index.
   #salespeak-mci-root prefix lifts specificity above the wrapper-scoped button
   reset so the white pill + gray X glyph survive. */
#salespeak-mci-root .salespeak-mci-bubble-close {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.95);
    color: #6b7280;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    /* Match Chat Icon's enlarged hit area for easier dismissal */
    min-width: 32px;
    min-height: 32px;
    padding: 0;
    z-index: 2;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

#salespeak-mci-root .salespeak-mci-bubble-close > svg {
    width: 8px;
    height: 8px;
}

#salespeak-mci-root .salespeak-mci-bubble-close:hover {
    color: #1f2937;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

/* ------------------------------ Avatar ------------------------------ */

.salespeak-mci-avatar-wrap {
    position: relative;
    width: 60px;
    height: 60px;
    cursor: pointer;
    -webkit-filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.3));
    filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.3));
    transition: transform 200ms ease-out;
}

.salespeak-mci-avatar-wrap:hover {
    transition: transform 100ms ease-in-out;
    transform: scale(1.08);
}

.salespeak-mci-avatar-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
}

.salespeak-mci-avatar-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    z-index: 1;
}

.salespeak-mci-avatar-image {
    width: 50px;
    height: 50px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
}

.salespeak-mci-avatar-letter {
    font-family: 'Pacifico', cursive;
    font-size: 28px;
    color: #fff;
    text-transform: uppercase;
    line-height: 1;
}

/* ------------------------------ Badge ------------------------------ */

.salespeak-mci-badge {
    width: 18px;
    height: 18px;
    padding: 5px;
    border-radius: 50%;
    color: white;
    background: #d14228;
    position: absolute;
    /* Sit ~60% outside the avatar's top-right so the badge pokes out cleanly
       instead of overlapping the symbol (was top/right: -2px, which sat on top
       of the avatar icon \u2014 see customer's MEMCYCO bubble screenshot). */
    top: -6px;
    right: -6px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 11px;
    line-height: 1;
    z-index: 2;
    /* Hidden until the 2s reveal timer adds .salespeak-mci--show */
    opacity: 0;
    visibility: hidden;
    transition:
        visibility 0.3s linear,
        opacity 0.3s linear;
}

.salespeak-mci-badge.salespeak-mci--show {
    opacity: 1;
    visibility: visible;
}

/* ------------------------------ Focus ------------------------------ */
/* WCAG 2.4.7 \u2014 visible keyboard focus indicator. Mirrors chat-icon's outline. */

#salespeak-mci-root .salespeak-mci-avatar-wrap:focus-visible,
#salespeak-mci-root .salespeak-mci-bubble:focus-visible,
#salespeak-mci-root .salespeak-mci-bubble-close:focus-visible {
    outline: 2px solid #2684ff;
    outline-offset: 2px;
}

/* Center-bottom: avatar is mid-viewport, so a 240px bubble to its left can overflow off-screen
   on narrower viewports (mobile, embedded panels). Hide the bubble + badge in that variant \u2014
   the avatar stays as the click target. Left/right-bottom variants are unaffected. */
#salespeak-mci-root.salespeak-mci-root--center-bottom .salespeak-mci-bubble,
#salespeak-mci-root.salespeak-mci-root--center-bottom .salespeak-mci-badge {
    display: none;
}

/* ------------------------------ Mobile ------------------------------ */

@media (max-width: 768px) {
    .salespeak-mci-bubble {
        max-width: 200px;
    }
}

/* WCAG 2.3.3 (AAA) \u2014 respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
    #salespeak-mci-root *,
    #salespeak-mci-root *::before,
    #salespeak-mci-root *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
`,""]);const S=o},935(u){u.exports=function(h){var r=[];return r.toString=function(){return this.map(function(g){var s="",n=typeof g[5]<"u";return g[4]&&(s+="@supports (".concat(g[4],") {")),g[2]&&(s+="@media ".concat(g[2]," {")),n&&(s+="@layer".concat(g[5].length>0?" ".concat(g[5]):""," {")),s+=h(g),n&&(s+="}"),g[2]&&(s+="}"),g[4]&&(s+="}"),s}).join("")},r.i=function(g,s,n,o,S){typeof g=="string"&&(g=[[null,g,void 0]]);var y={};if(n)for(var w=0;w<this.length;w++){var I=this[w][0];I!=null&&(y[I]=!0)}for(var Y=0;Y<g.length;Y++){var C=[].concat(g[Y]);n&&y[C[0]]||(typeof S<"u"&&(typeof C[5]>"u"||(C[1]="@layer".concat(C[5].length>0?" ".concat(C[5]):""," {").concat(C[1],"}")),C[5]=S),s&&(C[2]&&(C[1]="@media ".concat(C[2]," {").concat(C[1],"}")),C[2]=s),o&&(C[4]?(C[1]="@supports (".concat(C[4],") {").concat(C[1],"}"),C[4]=o):C[4]="".concat(o)),r.push(C))}},r}},6758(u){u.exports=function(h){return h[1]}},2438(u,h,r){var b=r(2591),g=r.n(b),s=r(1740),n=r.n(s),o=r(8128),S=r.n(o),y=r(855),w=r.n(y),I=r(3051),Y=r.n(I),C=r(3656),R=r.n(C),V=r(2768),j={};j.styleTagTransform=R(),j.setAttributes=w(),j.insert=S().bind(null,"head"),j.domAPI=n(),j.insertStyleElement=Y();var he=g()(V.A,j),P=V.A&&V.A.locals?V.A.locals:void 0},2591(u){var h=[];function r(s){for(var n=-1,o=0;o<h.length;o++)if(h[o].identifier===s){n=o;break}return n}function b(s,n){for(var o={},S=[],y=0;y<s.length;y++){var w=s[y],I=n.base?w[0]+n.base:w[0],Y=o[I]||0,C="".concat(I," ").concat(Y);o[I]=Y+1;var R=r(C),V={css:w[1],media:w[2],sourceMap:w[3],supports:w[4],layer:w[5]};if(R!==-1)h[R].references++,h[R].updater(V);else{var j=g(V,n);n.byIndex=y,h.splice(y,0,{identifier:C,updater:j,references:1})}S.push(C)}return S}function g(s,n){var o=n.domAPI(n);o.update(s);var S=function(w){if(w){if(w.css===s.css&&w.media===s.media&&w.sourceMap===s.sourceMap&&w.supports===s.supports&&w.layer===s.layer)return;o.update(s=w)}else o.remove()};return S}u.exports=function(s,n){n=n||{},s=s||[];var o=b(s,n);return function(y){y=y||[];for(var w=0;w<o.length;w++){var I=o[w],Y=r(I);h[Y].references--}for(var C=b(y,n),R=0;R<o.length;R++){var V=o[R],j=r(V);h[j].references===0&&(h[j].updater(),h.splice(j,1))}o=C}}},8128(u){var h={};function r(g){if(typeof h[g]>"u"){var s=document.querySelector(g);if(window.HTMLIFrameElement&&s instanceof window.HTMLIFrameElement)try{s=s.contentDocument.head}catch{s=null}h[g]=s}return h[g]}function b(g,s){var n=r(g);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(s)}u.exports=b},3051(u){function h(r){var b=document.createElement("style");return r.setAttributes(b,r.attributes),r.insert(b,r.options),b}u.exports=h},855(u,h,r){function b(g){var s=r.nc;s&&g.setAttribute("nonce",s)}u.exports=b},1740(u){function h(g,s,n){var o="";n.supports&&(o+="@supports (".concat(n.supports,") {")),n.media&&(o+="@media ".concat(n.media," {"));var S=typeof n.layer<"u";S&&(o+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),o+=n.css,S&&(o+="}"),n.media&&(o+="}"),n.supports&&(o+="}");var y=n.sourceMap;y&&typeof btoa<"u"&&(o+=`
/*# sourceMappingURL=data:application/json;base64,`.concat(btoa(unescape(encodeURIComponent(JSON.stringify(y))))," */")),s.styleTagTransform(o,g,s.options)}function r(g){if(g.parentNode===null)return!1;g.parentNode.removeChild(g)}function b(g){if(typeof document>"u")return{update:function(){},remove:function(){}};var s=g.insertStyleElement(g);return{update:function(o){h(s,g,o)},remove:function(){r(s)}}}u.exports=b},3656(u){function h(r,b){if(b.styleSheet)b.styleSheet.cssText=r;else{for(;b.firstChild;)b.removeChild(b.firstChild);b.appendChild(document.createTextNode(r))}}u.exports=h}},st={};function z(u){var h=st[u];if(h!==void 0)return h.exports;var r=st[u]={id:u,exports:{}};return it[u](r,r.exports,z),r.exports}z.m=it,(()=>{var u=typeof Symbol=="function",h=u?Symbol("webpack queues"):"__webpack_queues__",r=u?Symbol("webpack exports"):"__webpack_exports__",b=u?Symbol("webpack error"):"__webpack_error__",g=n=>{n&&n.d<1&&(n.d=1,n.forEach(o=>o.r--),n.forEach(o=>o.r--?o.r++:o()))},s=n=>n.map(o=>{if(o!==null&&typeof o=="object"){if(o[h])return o;if(o.then){var S=[];S.d=0,o.then(I=>{y[r]=I,g(S)},I=>{y[b]=I,g(S)});var y={};return y[h]=I=>I(S),y}}var w={};return w[h]=I=>{},w[r]=o,w});z.a=(n,o,S)=>{var y;S&&((y=[]).d=-1);var w=new Set,I=n.exports,Y,C,R,V=new Promise((P,A)=>{R=A,C=P});V[r]=I,V[h]=P=>(y&&P(y),w.forEach(P),V.catch(A=>{})),n.exports=V;var j=P=>{Y=s(P);var A,_=()=>Y.map(d=>{if(d[b])throw d[b];return d[r]}),x=new Promise(d=>{A=()=>d(_),A.r=0;var p=N=>N!==y&&!w.has(N)&&(w.add(N),N&&!N.d&&(A.r++,N.push(A)));Y.map(N=>N[h](p))});return A.r?x:_()},he=P=>(P?R(V[b]=P):C(I),g(y));o(j,he),y&&y.d<0&&(y.d=0)}})(),z.n=u=>{var h=u&&u.__esModule?()=>u.default:()=>u;return z.d(h,{a:h}),h},z.d=(u,h)=>{for(var r in h)z.o(h,r)&&!z.o(u,r)&&Object.defineProperty(u,r,{enumerable:!0,get:h[r]})},z.f={},z.e=u=>Promise.all(Object.keys(z.f).reduce((h,r)=>(z.f[r](u,h),h),[])),z.u=u=>"static/js/"+({111:"stickySearchBoxPersonaSwitch",138:"boxLauncher",254:"newSummarizeLauncher",282:"chatIconLauncher",289:"personaSwitchLauncher",391:"stickySearchBoxFAQ",442:"summarizeLauncher",471:"stickySearchBoxIncident",509:"sidebarLauncher",563:"chatOnlyLauncher",606:"chooserLauncher",629:"dynamicBarLauncher",655:"inlineButtonsLauncher",718:"searchBoxLauncher",838:"boxPersonaSwitch",873:"inlineCardsLauncher",901:"stickySearchBoxLauncher",937:"exitIntent",968:"drawerLauncher"}[u]||u)+"."+{111:"28e8d1b9",138:"540eb5b4",254:"5a5edc05",282:"d087c342",289:"2c207ce8",391:"f11a1b15",442:"df01916f",471:"f6735999",509:"38fc76d2",563:"c4d9d835",606:"4ce07364",629:"d6c92ee7",655:"1f0ba078",704:"43c66047",718:"7b6e014e",838:"36b50eee",873:"99017918",901:"3c635632",937:"46a73e98",968:"8b36fe21"}[u]+".chunk.js",z.g=(function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch{if(typeof window=="object")return window}})(),z.o=(u,h)=>Object.prototype.hasOwnProperty.call(u,h),(()=>{var u={},h="salespeakLaunchersScript:";z.l=(r,b,g,s)=>{if(u[r]){u[r].push(b);return}var n,o;if(g!==void 0)for(var S=document.getElementsByTagName("script"),y=0;y<S.length;y++){var w=S[y];if(w.getAttribute("src")==r||w.getAttribute("data-webpack")==h+g){n=w;break}}n||(o=!0,n=document.createElement("script"),n.charset="utf-8",z.nc&&n.setAttribute("nonce",z.nc),n.setAttribute("data-webpack",h+g),n.src=r),u[r]=[b];var I=(C,R)=>{n.onerror=n.onload=null,clearTimeout(Y);var V=u[r];if(delete u[r],n.parentNode&&n.parentNode.removeChild(n),V&&V.forEach(j=>j(R)),C)return C(R)},Y=setTimeout(I.bind(null,void 0,{type:"timeout",target:n}),12e4);n.onerror=I.bind(null,n.onerror),n.onload=I.bind(null,n.onload),o&&document.head.appendChild(n)}})(),z.r=u=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(u,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(u,"__esModule",{value:!0})},(()=>{var u;z.g.importScripts&&(u=z.g.location+"");var h=z.g.document;if(!u&&h&&(h.currentScript&&h.currentScript.tagName.toUpperCase()==="SCRIPT"&&(u=h.currentScript.src),!u)){var r=h.getElementsByTagName("script");if(r.length)for(var b=r.length-1;b>-1&&(!u||!/^http(s?):/.test(u));)u=r[b--].src}if(!u)throw new Error("Automatic publicPath is not supported in this browser");u=u.replace(/^blob:/,"").replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),z.p=u})(),(()=>{z.b=typeof document<"u"&&document.baseURI||self.location.href;var u={792:0};z.f.j=(b,g)=>{var s=z.o(u,b)?u[b]:void 0;if(s!==0)if(s)g.push(s[2]);else{var n=new Promise((w,I)=>s=u[b]=[w,I]);g.push(s[2]=n);var o=z.p+z.u(b),S=new Error,y=w=>{if(z.o(u,b)&&(s=u[b],s!==0&&(u[b]=void 0),s)){var I=w&&(w.type==="load"?"missing":w.type),Y=w&&w.target&&w.target.src;S.message="Loading chunk "+b+` failed.
(`+I+": "+Y+")",S.name="ChunkLoadError",S.type=I,S.request=Y,s[1](S)}};z.l(o,y,"chunk-"+b,b)}};var h=(b,g)=>{var[s,n,o]=g,S,y,w=0;if(s.some(Y=>u[Y]!==0)){for(S in n)z.o(n,S)&&(z.m[S]=n[S]);if(o)var I=o(z)}for(b&&b(g);w<s.length;w++)y=s[w],z.o(u,y)&&u[y]&&u[y][0](),u[y]=0},r=self.webpackChunksalespeakLaunchersScript=self.webpackChunksalespeakLaunchersScript||[];r.forEach(h.bind(null,0)),r.push=h.bind(null,r.push.bind(r))})(),z.nc=void 0;var St=z(753);salespeakLaunchersScript=St})();
