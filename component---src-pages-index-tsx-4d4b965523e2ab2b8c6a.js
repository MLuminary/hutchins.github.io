(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{217:function(e,t,n){"use strict";n.r(t);n(507);var a=n(0),r=n.n(a),c=n(224),o=n(508),s=n(228),i=n(218),u=[{sentence:"痛苦是财富，这话是扯淡。痛苦就是痛苦，对痛苦的思考才是财富。",from:"柴静"},{sentence:"负面的情绪就像黑暗一样，你是驱散不走它们的。你唯一做的，就是带进光来",from:"遇见未知的自己"},{sentence:"当你觉得自己不行的时候你就走到斑马线上，这时候你就是个行人了",from:"遇见未知的自己"}];t.default=function(){var e=Object(a.useState)(""),t=e[0],n=e[1],l=Object(a.useRef)(),m=Object(a.useMemo)(function(){var e=Math.ceil(Math.random()*u.length);return u[e]||u[0]},[]);return Object(a.useEffect)(function(){return l.current=new o.a({output:"",isEnd:!1,speed:150,singleBack:!1,sleep:1e3,type:"normal",backSpeed:40,sentencePause:!1},m.sentence,function(){},function(e){n(e)}),function(){return l.current.close()}},[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,{title:"it's me"}),r.a.createElement("div",{className:i.content},r.a.createElement("div",{className:i.word},r.a.createElement("div",{className:i.sentence},t,r.a.createElement("span",{className:i.cursor},"|")),r.a.createElement("div",{className:i.from}," --《",m.from,"》")),r.a.createElement(c.a,{className:i.link,to:"/posts"},"Enter")))}},224:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(67),o=n.n(c);n.d(t,"a",function(){return o.a}),n.d(t,"b",function(){return c.navigate});n(225),n(10).default.enqueue,r.a.createContext({})},225:function(e,t,n){var a;e.exports=(a=n(227))&&a.default||a},227:function(e,t,n){"use strict";n.r(t);n(18);var a=n(0),r=n.n(a),c=n(98);t.default=function(e){var t=e.location,n=e.pageResources;return n?r.a.createElement(c.a,Object.assign({location:t,pageResources:n},n.json)):null}},228:function(e,t,n){"use strict";var a=n(231),r=n(0),c=n.n(r),o=n(247),s=n.n(o);function i(e){var t=e.description,n=e.lang,r=e.meta,o=e.title,i=a.data.site,u=t||i.siteMetadata.description;return c.a.createElement(s.a,{htmlAttributes:{lang:n},title:o,titleTemplate:"%s | "+i.siteMetadata.title,meta:[{name:"description",content:u},{property:"og:title",content:o},{property:"og:description",content:u},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:i.siteMetadata.author},{name:"twitter:title",content:o},{name:"twitter:description",content:u}].concat(r)})}i.defaultProps={lang:"zh",meta:[],description:""},t.a=i},231:function(e){e.exports={data:{site:{siteMetadata:{title:"Silence",description:"coding is so funny",author:"默尝"}}}}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-4d4b965523e2ab2b8c6a.js.map