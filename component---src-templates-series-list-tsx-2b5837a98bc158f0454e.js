(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{C9i1:function(e,t,a){e.exports={header:"series-list-module--header--27gnv",main:"series-list-module--main--2JRbA",content:"series-list-module--content--udTyG",title:"series-list-module--title--19eG_",line:"series-list-module--line--3Ae1y",description:"series-list-module--description--3vEuy",other:"series-list-module--other--4PJ-G",num:"series-list-module--num--3Qoji"}},e5Jz:function(e,t,a){"use strict";a.r(t),a.d(t,"SeriesQuery",(function(){return d}));var n=a("q1tI"),s=a.n(n),l=a("wEEd"),i=a("B7F5"),r=a("8Fcl"),o=a("C9i1");t.default=function(e){console.info(e.data.allMarkdownRemark.edges);var t=e.data.allMarkdownRemark.edges.slice(1),a=e.data.allMarkdownRemark.edges[0].node.frontmatter,n=Object(l.b)({opacity:1,transform:"translate3d(0,0,0)",from:{opacity:0,transform:"translate3d(0, -50px, 0)",width:"100%"}});return s.a.createElement(i.a,{headerCls:o.header},s.a.createElement(l.a.div,{style:n},s.a.createElement("div",{className:o.main},s.a.createElement("div",{className:o.content},s.a.createElement("p",{className:o.title}," ",null==a?void 0:a.title," "),s.a.createElement("div",{className:o.line}),s.a.createElement("p",{className:o.description}," ",null==a?void 0:a.description," "),s.a.createElement("p",{className:o.other},s.a.createElement("span",{className:o.num}," ",t.length," ")," 篇内容")),s.a.createElement("div",{className:o.list},t.map((function(e){var t;return s.a.createElement(r.a,{path:"post-"+new Date(null===(t=e.node.frontmatter)||void 0===t?void 0:t.date).getTime(),key:e.node.id,node:e.node})}))))))};var d="2053912593"}}]);
//# sourceMappingURL=component---src-templates-series-list-tsx-2b5837a98bc158f0454e.js.map