(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{206:function(t,e,a){"use strict";a.r(e),a.d(e,"pageQuery",function(){return s});var n=a(0),r=a.n(n),i=a(213),o=a(211);var c=function(t){var e,a;function n(){return t.apply(this,arguments)||this}return a=t,(e=n).prototype=Object.create(a.prototype),e.prototype.constructor=e,e.__proto__=a,n.prototype.render=function(){var t=this.props.data.site.siteMetadata.title;return r.a.createElement(i.a,{location:this.props.location,title:t},r.a.createElement(o.a,{title:"404: Not Found"}),r.a.createElement("h1",null,"this is tsx ,about"),r.a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))},n}(r.a.Component);e.default=c;var s="1097489062"},208:function(t,e,a){"use strict";a.d(e,"a",function(){return s}),a.d(e,"b",function(){return l});var n=a(216),r=a.n(n),i=a(217),o=a.n(i);o.a.overrideThemeStyles=function(){return{"a.gatsby-resp-image-link":{boxShadow:"none"},a:{boxShadow:"none"}}},delete o.a.googleFonts;var c=new r.a(o.a);var s=c.rhythm,l=c.scale},210:function(t){t.exports={data:{avatar:{childImageSharp:{fixed:{base64:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAAA3ElEQVQ4y+2UOQqEQBBF2y0R9CJmhqKJeA5v4BlcEDyMaKgHMBC8iiAYiQZ+mQI7mREUGiaYKSi6+cV/dPXGGGMQnD8P1HUddV2j73vEccx1WZZptCwLbdtiGAaEYUiaoijXQNM0sa4rXtE0DWmSJHGT53k4oygK0lRVvQYahoFxHMlQVRVfgaZpNHddF8uyUD1JknvAaZrIUJbl2x7Zto1t26iepukzYNd11KLv+wiCAI7jIIoiDsyy7B5wnmcy7PuOT3EC8zz/ElB4y8IPRei1EX6xhT+9/3/4OA9D6W75E1a8cwAAAABJRU5ErkJggg==",width:45,height:45,src:"/static/46a6f73175f28c29f7528214e1f611b9/bbdf9/logo.png",srcSet:"/static/46a6f73175f28c29f7528214e1f611b9/bbdf9/logo.png 1x,\n/static/46a6f73175f28c29f7528214e1f611b9/95951/logo.png 1.5x,\n/static/46a6f73175f28c29f7528214e1f611b9/5cf0a/logo.png 2x"}}}}}},211:function(t,e,a){"use strict";var n=a(212),r=a(0),i=a.n(r),o=a(218),c=a.n(o);function s(t){var e=t.description,a=t.lang,r=t.meta,o=t.title,s=n.data.site,l=e||s.siteMetadata.description;return i.a.createElement(c.a,{htmlAttributes:{lang:a},title:o,titleTemplate:"%s | "+s.siteMetadata.title,meta:[{name:"description",content:l},{property:"og:title",content:o},{property:"og:description",content:l},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:s.siteMetadata.author},{name:"twitter:title",content:o},{name:"twitter:description",content:l}].concat(r)})}s.defaultProps={lang:"en",meta:[],description:""},e.a=s},212:function(t){t.exports={data:{site:{siteMetadata:{title:"Silence",description:"coding is so funny",author:"默尝"}}}}},213:function(t,e,a){"use strict";var n=a(0),r=a.n(n),i=a(208),o=(a(209),a(210)),c=a(202),s=a.n(c),l=a(214),m=a.n(l),p=a(23),u=function(t){var e=o.data;return r.a.createElement("div",{className:s.a.container},r.a.createElement("div",{className:s.a.header},r.a.createElement("div",{className:s.a.logo},r.a.createElement(p.Link,{className:s.a.home,to:"/"},r.a.createElement(m.a,{fixed:e.avatar.childImageSharp.fixed,alt:"icon"}))),r.a.createElement("div",{className:s.a.navbar},r.a.createElement(p.Link,{to:"/",className:s.a.item},r.a.createElement("i",{className:"iconfont"},""),r.a.createElement("span",{className:s.a.title},"首页")),r.a.createElement(p.Link,{to:"/tags",className:s.a.item},r.a.createElement("i",{className:"iconfont"},""),r.a.createElement("span",{className:s.a.title},"标签")),r.a.createElement(p.Link,{to:"/handbook",className:s.a.item},r.a.createElement("i",{className:"iconfont"},""),r.a.createElement("span",{className:s.a.title},"手册")),r.a.createElement("a",{className:s.a.item,href:"https://github.com/MLuminary",target:"_blank",rel:"noopener noreferrer"},r.a.createElement("i",{className:"iconfont"},""),r.a.createElement("span",{className:s.a.title},"GitHub")),r.a.createElement(p.Link,{to:"/about",className:s.a.item},r.a.createElement("i",{className:"iconfont"},""),r.a.createElement("span",{className:s.a.title},"关于")))))};var d=function(t){var e,a;function n(){return t.apply(this,arguments)||this}return a=t,(e=n).prototype=Object.create(a.prototype),e.prototype.constructor=e,e.__proto__=a,n.prototype.render=function(){var t=this.props,e=t.children;t.title;return r.a.createElement(r.a.Fragment,null,r.a.createElement(u,null),r.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(i.a)(24),padding:Object(i.a)(1.5)+" "+Object(i.a)(.75)}},r.a.createElement("main",null,e),r.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built with"," ",r.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby"))))},n}(r.a.Component);e.a=d}}]);
//# sourceMappingURL=component---src-pages-about-tsx-c5242662beae20bf5688.js.map