"use strict";(self.webpackChunkhackathon_team2=self.webpackChunkhackathon_team2||[]).push([[850],{28683:function(e,t,r){r.d(t,{Z:function(){return o}});var n=r(49142);function i(e,t,r){return(t=(0,n.Z)(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}},89850:function(e,t,r){r.r(t),r.d(t,{AudioVisualizer:function(){return p},LiveAudioVisualizer:function(){return d}});var n,i=r(28683),a=r(74165),o=r(15861),u=r(29439),c=r(72791),f={exports:{}},l={};f.exports=function(){if(n)return l;n=1;var e=c,t=Symbol.for("react.element"),r=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,a=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function u(e,r,n){var u,c={},f=null,l=null;for(u in void 0!==n&&(f=""+n),void 0!==r.key&&(f=""+r.key),void 0!==r.ref&&(l=r.ref),r)i.call(r,u)&&!o.hasOwnProperty(u)&&(c[u]=r[u]);if(e&&e.defaultProps)for(u in r=e.defaultProps)void 0===c[u]&&(c[u]=r[u]);return{$$typeof:t,type:e,key:f,ref:l,props:c,_owner:a.current}}return l.Fragment=r,l.jsx=u,l.jsxs=u,l}();var s=f.exports,d=function(e){var t=e.mediaRecorder,r=e.width,n=void 0===r?"100%":r,i=e.height,a=void 0===i?"100%":i,o=e.barWidth,f=void 0===o?2:o,l=e.gap,d=void 0===l?1:l,h=e.backgroundColor,v=void 0===h?"transparent":h,p=e.barColor,b=void 0===p?"rgb(160, 198, 255)":p,g=e.fftSize,m=void 0===g?1024:g,y=e.maxDecibels,w=void 0===y?-10:y,O=e.minDecibels,x=void 0===O?-90:O,R=e.smoothingTimeConstant,S=void 0===R?.4:R,C=(0,c.useState)((function(){return new AudioContext})),_=(0,u.Z)(C,1)[0],j=(0,c.useState)(),k=(0,u.Z)(j,2),P=k[0],E=k[1],D=(0,c.useRef)(null);(0,c.useEffect)((function(){if(t.stream){var e=_.createAnalyser();E(e),e.fftSize=m,e.minDecibels=x,e.maxDecibels=w,e.smoothingTimeConstant=S,_.createMediaStreamSource(t.stream).connect(e)}}),[t.stream]),(0,c.useEffect)((function(){P&&"recording"===t.state&&A()}),[P,t.state]);var A=(0,c.useCallback)((function(){if(P){var e=new Uint8Array(null==P?void 0:P.frequencyBinCount);"recording"===t.state?(null==P||P.getByteFrequencyData(e),Z(e),requestAnimationFrame(A)):"paused"===t.state?Z(e):"inactive"===t.state&&"closed"!==_.state&&_.close()}}),[P,_.state]),Z=function(e){if(D.current){var t=function(e,t,r,n){var i=t/(r+n),a=Math.floor(e.length/i);i>e.length&&(i=e.length,a=1);for(var o=[],u=0;u<i;u++){for(var c=0,f=0;f<a&&u*a+f<e.length;f++)c+=e[u*a+f];o.push(c/a)}return o}(e,D.current.width,f,d);!function(e,t,r,n,i,a){var o=t.height/2,u=t.getContext("2d");u&&(u.clearRect(0,0,t.width,t.height),"transparent"!==i&&(u.fillStyle=i,u.fillRect(0,0,t.width,t.height)),e.forEach((function(e,t){u.fillStyle=a;var i=t*(r+n),c=o-e/2,f=r,l=e||1;u.beginPath(),u.roundRect?(u.roundRect(i,c,f,l,50),u.fill()):u.fillRect(i,c,f,l)})))}(t,D.current,f,d,v,b)}};return s.jsx("canvas",{ref:D,width:n,height:a,style:{aspectRatio:"unset"}})},h=function(e,t,r,n,i){for(var a=e.getChannelData(0),o=r/(n+i),u=Math.floor(a.length/o),c=t/2,f=[],l=0,s=0;s<o;s++){for(var d=[],h=0,v=[],p=0,b=0;b<u&&s*u+b<e.length;b++){var g=a[s*u+b];g<=0&&(d.push(g),h++),g>0&&(v.push(g),p++)}var m=d.reduce((function(e,t){return e+t}),0)/h,y={max:v.reduce((function(e,t){return e+t}),0)/p,min:m};y.max>l&&(l=y.max),Math.abs(y.min)>l&&(l=Math.abs(y.min)),f.push(y)}if(.8*c>l*c){var w=.8*c/l;f=f.map((function(e){return{max:e.max*w,min:e.min*w}}))}return f},v=function(e,t,r,n,i,a,o){var u=arguments.length>7&&void 0!==arguments[7]?arguments[7]:0,c=arguments.length>8&&void 0!==arguments[8]?arguments[8]:1,f=t.height/2,l=t.getContext("2d");if(l){l.clearRect(0,0,t.width,t.height),"transparent"!==i&&(l.fillStyle=i,l.fillRect(0,0,t.width,t.height));var s=(u||0)/c;e.forEach((function(t,i){var u=i/e.length,c=s>u;l.fillStyle=c&&o?o:a;var d=i*(r+n),h=f+t.min,v=r,p=f+t.max-h;l.beginPath(),l.roundRect?(l.roundRect(d,h,v,p,50),l.fill()):l.fillRect(d,h,v,p)}))}},p=(0,c.forwardRef)((function(e,t){var r=e.blob,n=e.width,f=e.height,l=e.barWidth,d=void 0===l?2:l,p=e.gap,b=void 0===p?1:p,g=e.currentTime,m=e.style,y=e.backgroundColor,w=void 0===y?"transparent":y,O=e.barColor,x=void 0===O?"rgb(184, 184, 184)":O,R=e.barPlayedColor,S=void 0===R?"rgb(160, 198, 255)":R,C=(0,c.useRef)(null),_=(0,c.useState)([]),j=(0,u.Z)(_,2),k=j[0],P=j[1],E=(0,c.useState)(0),D=(0,u.Z)(E,2),A=D[0],Z=D[1];return(0,c.useImperativeHandle)(t,(function(){return C.current}),[]),(0,c.useEffect)((function(){(0,o.Z)((0,a.Z)().mark((function e(){var t,i;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(C.current){e.next=2;break}return e.abrupt("return");case 2:if(r){e.next=6;break}return t=Array.from({length:100},(function(){return{max:0,min:0}})),v(t,C.current,d,b,w,x,S),e.abrupt("return");case 6:return e.next=8,r.arrayBuffer();case 8:return i=e.sent,e.next=11,(new AudioContext).decodeAudioData(i,(function(e){if(C.current){Z(e.duration);var t=h(e,f,n,d,b);P(t),v(t,C.current,d,b,w,x,S)}}));case 11:case"end":return e.stop()}}),e)})))()}),[r,C.current]),(0,c.useEffect)((function(){C.current&&v(k,C.current,d,b,w,x,S,g,A)}),[g,A]),s.jsx("canvas",{ref:C,width:n,height:f,style:(0,i.Z)({},m)})}));p.displayName="AudioVisualizer"}}]);
//# sourceMappingURL=850.6b5a5a33.chunk.js.map