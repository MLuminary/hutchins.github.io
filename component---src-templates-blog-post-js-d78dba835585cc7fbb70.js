(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{204:function(e,t,a){"use strict";a.r(t),a.d(t,"pageQuery",function(){return m});a(18);var A=a(0),n=a.n(A),r=a(219),i=a(221),o=a(213),c=a(211),l=a(208);var s=function(e){var t,a;function A(){return e.apply(this,arguments)||this}return a=e,(t=A).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a,A.prototype.render=function(){var e=this.props.data.markdownRemark,t=this.props.data.site.siteMetadata.title,a=this.props.pageContext,A=a.previous,s=a.next;return n.a.createElement(o.a,{location:this.props.location,title:t},n.a.createElement(c.a,{title:e.frontmatter.title,description:e.frontmatter.description||e.excerpt}),n.a.createElement("article",null,n.a.createElement("header",null,n.a.createElement("h1",{style:{marginTop:Object(l.a)(1),marginBottom:0}},e.frontmatter.title),n.a.createElement("p",{style:Object.assign({},Object(l.b)(-.2),{display:"block",marginBottom:Object(l.a)(1)})},e.frontmatter.date)),n.a.createElement("section",{dangerouslySetInnerHTML:{__html:e.html}}),n.a.createElement("hr",{style:{marginBottom:Object(l.a)(1)}}),n.a.createElement("footer",null,n.a.createElement(i.a,null))),n.a.createElement("nav",null,n.a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},n.a.createElement("li",null,A&&n.a.createElement(r.a,{to:A.fields.slug,rel:"prev"},"← ",A.frontmatter.title)),n.a.createElement("li",null,s&&n.a.createElement(r.a,{to:s.fields.slug,rel:"next"},s.frontmatter.title," →")))))},A}(n.a.Component);t.default=s;var m="3654438753"},208:function(e,t,a){"use strict";a.d(t,"a",function(){return c}),a.d(t,"b",function(){return l});var A=a(216),n=a.n(A),r=a(217),i=a.n(r);i.a.overrideThemeStyles=function(){return{"a.gatsby-resp-image-link":{boxShadow:"none"},a:{boxShadow:"none"}}},delete i.a.googleFonts;var o=new n.a(i.a);var c=o.rhythm,l=o.scale},210:function(e){e.exports={data:{avatar:{childImageSharp:{fixed:{base64:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAAA3ElEQVQ4y+2UOQqEQBBF2y0R9CJmhqKJeA5v4BlcEDyMaKgHMBC8iiAYiQZ+mQI7mREUGiaYKSi6+cV/dPXGGGMQnD8P1HUddV2j73vEccx1WZZptCwLbdtiGAaEYUiaoijXQNM0sa4rXtE0DWmSJHGT53k4oygK0lRVvQYahoFxHMlQVRVfgaZpNHddF8uyUD1JknvAaZrIUJbl2x7Zto1t26iepukzYNd11KLv+wiCAI7jIIoiDsyy7B5wnmcy7PuOT3EC8zz/ElB4y8IPRei1EX6xhT+9/3/4OA9D6W75E1a8cwAAAABJRU5ErkJggg==",width:45,height:45,src:"/static/46a6f73175f28c29f7528214e1f611b9/bbdf9/logo.png",srcSet:"/static/46a6f73175f28c29f7528214e1f611b9/bbdf9/logo.png 1x,\n/static/46a6f73175f28c29f7528214e1f611b9/95951/logo.png 1.5x,\n/static/46a6f73175f28c29f7528214e1f611b9/5cf0a/logo.png 2x"}}}}}},211:function(e,t,a){"use strict";var A=a(212),n=a(0),r=a.n(n),i=a(218),o=a.n(i);function c(e){var t=e.description,a=e.lang,n=e.meta,i=e.title,c=A.data.site,l=t||c.siteMetadata.description;return r.a.createElement(o.a,{htmlAttributes:{lang:a},title:i,titleTemplate:"%s | "+c.siteMetadata.title,meta:[{name:"description",content:l},{property:"og:title",content:i},{property:"og:description",content:l},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:c.siteMetadata.author},{name:"twitter:title",content:i},{name:"twitter:description",content:l}].concat(n)})}c.defaultProps={lang:"en",meta:[],description:""},t.a=c},212:function(e){e.exports={data:{site:{siteMetadata:{title:"Silence",description:"coding is so funny",author:"默尝"}}}}},213:function(e,t,a){"use strict";var A=a(0),n=a.n(A),r=a(208),i=(a(209),a(210)),o=a(202),c=a.n(o),l=a(214),s=a.n(l),m=a(23),E=function(e){var t=i.data;return n.a.createElement("div",{className:c.a.container},n.a.createElement("div",{className:c.a.header},n.a.createElement("div",{className:c.a.logo},n.a.createElement(m.Link,{className:c.a.home,to:"/"},n.a.createElement(s.a,{fixed:t.avatar.childImageSharp.fixed,alt:"icon"}))),n.a.createElement("div",{className:c.a.navbar},n.a.createElement(m.Link,{to:"/",className:c.a.item},n.a.createElement("i",{className:"iconfont"},""),n.a.createElement("span",{className:c.a.title},"首页")),n.a.createElement(m.Link,{to:"/tags",className:c.a.item},n.a.createElement("i",{className:"iconfont"},""),n.a.createElement("span",{className:c.a.title},"标签")),n.a.createElement(m.Link,{to:"/handbook",className:c.a.item},n.a.createElement("i",{className:"iconfont"},""),n.a.createElement("span",{className:c.a.title},"手册")),n.a.createElement("a",{className:c.a.item,href:"https://github.com/MLuminary",target:"_blank",rel:"noopener noreferrer"},n.a.createElement("i",{className:"iconfont"},""),n.a.createElement("span",{className:c.a.title},"GitHub")),n.a.createElement(m.Link,{to:"/about",className:c.a.item},n.a.createElement("i",{className:"iconfont"},""),n.a.createElement("span",{className:c.a.title},"关于")))))};var u=function(e){var t,a;function A(){return e.apply(this,arguments)||this}return a=e,(t=A).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a,A.prototype.render=function(){var e=this.props,t=e.children;e.title;return n.a.createElement(n.a.Fragment,null,n.a.createElement(E,null),n.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(r.a)(24),padding:Object(r.a)(1.5)+" "+Object(r.a)(.75)}},n.a.createElement("main",null,t),n.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built with"," ",n.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby"))))},A}(n.a.Component);t.a=u},215:function(e,t,a){var A;e.exports=(A=a(220))&&A.default||A},219:function(e,t,a){"use strict";var A=a(0),n=a.n(A),r=a(67),i=a.n(r);a.d(t,"a",function(){return i.a});a(215),a(10).default.enqueue,n.a.createContext({})},220:function(e,t,a){"use strict";a.r(t);a(18);var A=a(0),n=a.n(A),r=a(100);t.default=function(e){var t=e.location,a=e.pageResources;return a?n.a.createElement(r.a,Object.assign({location:t,pageResources:a},a.json)):null}},221:function(e,t,a){"use strict";a(209);var A=a(222),n=a(0),r=a.n(n),i=a(214),o=a.n(i),c=a(208);t.a=function(){var e=A.data,t=e.site.siteMetadata,a=t.author,n=t.social;return r.a.createElement("div",{style:{display:"flex",marginBottom:Object(c.a)(2.5)}},r.a.createElement(o.a,{fixed:e.avatar.childImageSharp.fixed,alt:a,style:{marginRight:Object(c.a)(.5),marginBottom:0,minWidth:50,borderRadius:"100%"},imgStyle:{borderRadius:"50%"}}),r.a.createElement("p",null,"Written by ",r.a.createElement("strong",null,a)," who lives and works in ShangHai building useful things."," ",r.a.createElement("a",{href:"https://twitter.com/"+n.twitter},"You should follow him on Twitter")))}},222:function(e){e.exports={data:{avatar:{childImageSharp:{fixed:{base64:"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAQF/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhADEAAAAdyOuCTSBLCGwD//xAAcEAABBAMBAAAAAAAAAAAAAAADAAECBBESITL/2gAIAQEAAQUClnUDFaSn5cupVZ5Xh0y//8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAwEBPwEf/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAgEBPwEf/8QAHBAAAgICAwAAAAAAAAAAAAAAAQIAEBETITFB/9oACAEBAAY/AjjuHYeKMVR6aaLX/8QAGxAAAgIDAQAAAAAAAAAAAAAAAREAECFRccH/2gAIAQEAAT8h4FjszSJt5okYRxz5UZJBRXsN07Vf/9oADAMBAAIAAwAAABDfN8P/xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAEDAQE/EB//xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAECAQE/EB//xAAdEAEAAgIDAQEAAAAAAAAAAAABESEAEDFBcYGR/9oACAEBAAE/EOgs9+KVnAJomY7H5pnEMViNJKVuzdP3zTigFnjEhKsz3BLr/9k=",width:50,height:50,src:"/static/1807fe9f6830500857fa5f2878dbaa7b/9b664/me.jpg",srcSet:"/static/1807fe9f6830500857fa5f2878dbaa7b/9b664/me.jpg 1x,\n/static/1807fe9f6830500857fa5f2878dbaa7b/06a10/me.jpg 1.5x,\n/static/1807fe9f6830500857fa5f2878dbaa7b/f1b5a/me.jpg 2x"}}},site:{siteMetadata:{author:"默尝",social:{twitter:"kylemathews"}}}}}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-d78dba835585cc7fbb70.js.map