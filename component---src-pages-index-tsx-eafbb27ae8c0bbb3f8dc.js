(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{211:function(e,t,n){"use strict";n.r(t);n(49);var a=n(0),r=n.n(a),c=n(219),i=n(213),o=(n(358),n(237)),u=n.n(o),s=n(208),l=function(e){var t,n,c=Object(a.useRef)(null),i=Object(a.useState)(new Uint8Array(75)),o=i[0],l=i[1],m=Object(a.useState)(!1),f=m[0],d=m[1],p=Object(a.useState)(!0),v=p[0],E=p[1],b=Object(a.useState)(0),w=b[0],y=b[1],j=Object(a.useState)(0),g=j[0],O=j[1],h=Object(a.useRef)(),N=Object(a.useRef)(),A=Object(a.useRef)(null),R=Object(a.useRef)(),S=Object(a.useRef)(new Uint8Array(75)),k=Object(a.useRef)();if(Object(a.useEffect)(function(){A.current&&O(A.current.duration)},[A.current]),Object(a.useEffect)(function(){h.current&&N.current&&g&&(h.current.style.transform="translateX("+w/g*N.current.offsetWidth+"px) translateY(-50%)")},[h.current,w,N.current]),Object(a.useEffect)(function(){if(f){var e=x.createMediaElementSource(A.current);return k.current=x.createAnalyser(),e.connect(k.current),k.current.connect(x.destination),function(){e.disconnect(),k.current.disconnect(),cancelAnimationFrame(R.current)}}},[f]),Object(a.useEffect)(function(){if(f)return R.current=requestAnimationFrame(C),function(){return cancelAnimationFrame(R.current)}},[f]),Object(a.useEffect)(function(){if(o){var e=c.current.getContext("2d"),t=c.current;e.clearRect(0,0,t.width,t.height);for(var n=0;n<75;n++)e.beginPath(),e.lineWidth=2,e.moveTo(4*n,75),e.lineTo(4*n,75-o[n]/256*(o[n]/256)*30),e.stroke(),e.beginPath(),e.lineWidth=2,e.moveTo(4*n,75),e.lineTo(4*n,75+o[n]/256*(o[n]/256)*30),e.stroke()}},[o,c.current]),void 0!==typeof window){var x=new(window.AudioContext||window.webkitAudioContext),C=function e(){R.current=requestAnimationFrame(e),k.current.getByteFrequencyData(S.current),l(S.current.slice(0))};return r.a.createElement("div",{className:s.container},r.a.createElement("audio",{onTimeUpdate:function(){return y(A.current.currentTime)},loop:!0,className:s.audio,ref:A,controls:!0},e.sources.map(function(e){return r.a.createElement("source",{key:"source",src:e})})),r.a.createElement("div",{ref:N,className:s.audioPlayer},r.a.createElement("div",{ref:h,className:s.operator},v?r.a.createElement("i",{onClick:function(){x.resume(),d(!0),A.current.play(),E(!1)},className:u()(s.playIcon,s.icon,"iconfont")},""):r.a.createElement("i",{onClick:function(){A.current.pause(),E(!0)},className:u()(s.pauseIcon,s.icon,"iconfont")},"")),r.a.createElement("div",{className:u()(s.info,(t={},t[s.hidden]=!v,t))},"Love - S.E.N.S"),r.a.createElement("canvas",{className:u()(s.canvas,(n={},n[s.hidden]=v,n)),ref:c})))}},m=n(235);n.d(t,"pageQuery",function(){return d});var f=n(209),d=(t.default=function(e){e.data;var t=Object(m.b)({opacity:1,transform:"translate3d(0,0,0)",from:{opacity:0,transform:"translate3d(0,-30%,0)"}});return r.a.createElement("div",null,r.a.createElement(i.a,{title:"it's me"}),r.a.createElement(m.a.div,{style:t,className:f.content},r.a.createElement("div",{className:f.avatar}),r.a.createElement("div",{className:f.name},"Haoqin Zhang"),r.a.createElement("div",{className:f.line}),r.a.createElement("div",{className:f.info},"Coding Lover"),r.a.createElement("div",{className:f.loveWord},"痛苦是财富，这话是扯淡。痛苦就是痛苦，对痛苦的思考才是财富"),r.a.createElement("div",{className:f.music},r.a.createElement(l,{sources:["../music/me.mp3"]})),r.a.createElement(c.a,{className:f.enter,to:"/posts"},"Enter")))},"1097489062")},213:function(e,t,n){"use strict";var a=n(217),r=n(0),c=n.n(r),i=n(225),o=n.n(i);function u(e){var t=e.description,n=e.lang,r=e.meta,i=e.title,u=a.data.site,s=t||u.siteMetadata.description;return c.a.createElement(o.a,{htmlAttributes:{lang:n},title:i,titleTemplate:"%s | "+u.siteMetadata.title,meta:[{name:"description",content:s},{property:"og:title",content:i},{property:"og:description",content:s},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:u.siteMetadata.author},{name:"twitter:title",content:i},{name:"twitter:description",content:s}].concat(r)})}u.defaultProps={lang:"zh",meta:[],description:""},t.a=u},215:function(e,t,n){var a;e.exports=(a=n(220))&&a.default||a},217:function(e){e.exports={data:{site:{siteMetadata:{title:"Silence",description:"coding is so funny",author:"默尝"}}}}},219:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(67),i=n.n(c);n.d(t,"a",function(){return i.a}),n.d(t,"b",function(){return c.navigate});n(215),n(10).default.enqueue,r.a.createContext({})},220:function(e,t,n){"use strict";n.r(t);n(18);var a=n(0),r=n.n(a),c=n(103);t.default=function(e){var t=e.location,n=e.pageResources;return n?r.a.createElement(c.a,Object.assign({location:t,pageResources:n},n.json)):null}},358:function(e,t,n){n(240)("Uint8",1,function(e){return function(t,n,a){return e(this,t,n,a)}})}}]);
//# sourceMappingURL=component---src-pages-index-tsx-eafbb27ae8c0bbb3f8dc.js.map