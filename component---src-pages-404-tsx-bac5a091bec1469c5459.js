(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{207:function(e,t,a){"use strict";a.r(t),a.d(t,"pageQuery",function(){return l});var r=a(0),i=a.n(r),n=a(224),s=a(213);var o=function(e){var t,a;function r(){return e.apply(this,arguments)||this}return a=e,(t=r).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a,r.prototype.render=function(){var e=this.props.data.site.siteMetadata.title;return i.a.createElement(n.a,{location:this.props.location,title:e},i.a.createElement(s.a,{title:"404: Not Found"}),i.a.createElement("h1",null,"Not Found"),i.a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))},r}(i.a.Component);t.default=o;var l="1097489062"},213:function(e,t,a){"use strict";var r=a(217),i=a(0),n=a.n(i),s=a(225),o=a.n(s);function l(e){var t=e.description,a=e.lang,i=e.meta,s=e.title,l=r.data.site,d=t||l.siteMetadata.description;return n.a.createElement(o.a,{htmlAttributes:{lang:a},title:s,titleTemplate:"%s | "+l.siteMetadata.title,meta:[{name:"description",content:d},{property:"og:title",content:s},{property:"og:description",content:d},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:l.siteMetadata.author},{name:"twitter:title",content:s},{name:"twitter:description",content:d}].concat(i)})}l.defaultProps={lang:"zh",meta:[],description:""},t.a=l},216:function(e,t,a){"use strict";a(221)("fixed",function(e){return function(){return e(this,"tt","","")}})},217:function(e){e.exports={data:{site:{siteMetadata:{title:"Silence",description:"coding is so funny",author:"默尝"}}}}},221:function(e,t,a){var r=a(1),i=a(7),n=a(32),s=/"/g,o=function(e,t,a,r){var i=String(n(e)),o="<"+t;return""!==a&&(o+=" "+a+'="'+String(r).replace(s,"&quot;")+'"'),o+">"+i+"</"+t+">"};e.exports=function(e,t){var a={};a[e]=t(o),r(r.P+r.F*i(function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3}),"String",a)}},222:function(e){e.exports={data:{avatar:{childImageSharp:{fixed:{base64:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAAA3ElEQVQ4y+2UOQqEQBBF2y0R9CJmhqKJeA5v4BlcEDyMaKgHMBC8iiAYiQZ+mQI7mREUGiaYKSi6+cV/dPXGGGMQnD8P1HUddV2j73vEccx1WZZptCwLbdtiGAaEYUiaoijXQNM0sa4rXtE0DWmSJHGT53k4oygK0lRVvQYahoFxHMlQVRVfgaZpNHddF8uyUD1JknvAaZrIUJbl2x7Zto1t26iepukzYNd11KLv+wiCAI7jIIoiDsyy7B5wnmcy7PuOT3EC8zz/ElB4y8IPRei1EX6xhT+9/3/4OA9D6W75E1a8cwAAAABJRU5ErkJggg==",width:45,height:45,src:"/static/46a6f73175f28c29f7528214e1f611b9/bbdf9/logo.png",srcSet:"/static/46a6f73175f28c29f7528214e1f611b9/bbdf9/logo.png 1x,\n/static/46a6f73175f28c29f7528214e1f611b9/95951/logo.png 1.5x,\n/static/46a6f73175f28c29f7528214e1f611b9/5cf0a/logo.png 2x"}}}}}},223:function(e,t,a){"use strict";a(31),a(30),a(14),a(96),a(144),a(216);var r=a(13);t.__esModule=!0,t.default=void 0;var i,n=r(a(75)),s=r(a(76)),o=r(a(145)),l=r(a(99)),d=r(a(0)),c=r(a(51)),u=function(e){var t=(0,l.default)({},e),a=t.resolutions,r=t.sizes,i=t.critical;return a&&(t.fixed=a,delete t.resolutions),r&&(t.fluid=r,delete t.sizes),i&&(t.loading="eager"),t.fluid&&(t.fluid=E([].concat(t.fluid))),t.fixed&&(t.fixed=E([].concat(t.fixed))),t},f=function(e){var t=e.fluid,a=e.fixed;return(t&&t[0]||a&&a[0]).src},p=Object.create({}),g=function(e){var t=u(e),a=f(t);return p[a]||!1},m="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,h="undefined"!=typeof window,b=h&&window.IntersectionObserver,y=new WeakMap;function v(e){return e.map(function(e){var t=e.src,a=e.srcSet,r=e.srcSetWebp,i=e.media,n=e.sizes;return d.default.createElement(d.default.Fragment,{key:t},r&&d.default.createElement("source",{type:"image/webp",media:i,srcSet:r,sizes:n}),d.default.createElement("source",{media:i,srcSet:a,sizes:n}))})}function E(e){var t=[],a=[];return e.forEach(function(e){return(e.media?t:a).push(e)}),t.concat(a)}function S(e){return e.map(function(e){var t=e.src,a=e.media,r=e.tracedSVG;return d.default.createElement("source",{key:t,media:a,srcSet:r})})}function w(e){return e.map(function(e){var t=e.src,a=e.media,r=e.base64;return d.default.createElement("source",{key:t,media:a,srcSet:r})})}function L(e,t){var a=e.srcSet,r=e.srcSetWebp,i=e.media,n=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(i?'media="'+i+'" ':"")+'srcset="'+(t?r:a)+'" '+(n?'sizes="'+n+'" ':"")+"/>"}var A=function(e,t){var a=(void 0===i&&"undefined"!=typeof window&&window.IntersectionObserver&&(i=new window.IntersectionObserver(function(e){e.forEach(function(e){if(y.has(e.target)){var t=y.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(i.unobserve(e.target),y.delete(e.target),t())}})},{rootMargin:"200px"})),i);return a&&(a.observe(e),y.set(e,t)),function(){a.unobserve(e),y.delete(e)}},I=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",r=e.srcSet?'srcset="'+e.srcSet+'" ':"",i=e.title?'title="'+e.title+'" ':"",n=e.alt?'alt="'+e.alt+'" ':'alt="" ',s=e.width?'width="'+e.width+'" ':"",o=e.height?'height="'+e.height+'" ':"",l=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",d=e.loading?'loading="'+e.loading+'" ':"",c=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map(function(e){return(e.srcSetWebp?L(e,!0):"")+L(e)}).join("")+"<img "+d+s+o+a+r+t+n+i+l+c+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},N=function(e){var t=e.src,a=e.imageVariants,r=e.generateSources,i=e.spreadProps,n=d.default.createElement(R,(0,l.default)({src:t},i));return a.length>1?d.default.createElement("picture",null,r(a),n):n},R=d.default.forwardRef(function(e,t){var a=e.sizes,r=e.srcSet,i=e.src,n=e.style,s=e.onLoad,c=e.onError,u=e.loading,f=e.draggable,p=(0,o.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable"]);return d.default.createElement("img",(0,l.default)({sizes:a,srcSet:r,src:i},p,{onLoad:s,onError:c,ref:t,loading:u,draggable:f,style:(0,l.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},n)}))});R.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var O=function(e){function t(t){var a;(a=e.call(this,t)||this).seenBefore=h&&g(t),a.addNoScript=!(t.critical&&!t.fadeIn),a.useIOSupport=!m&&b&&!t.critical&&!a.seenBefore;var r=t.critical||h&&(m||!a.useIOSupport);return a.state={isVisible:r,imgLoaded:!1,imgCached:!1,fadeIn:!a.seenBefore&&t.fadeIn},a.imageRef=d.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,s.default)((0,s.default)(a))),a.handleRef=a.handleRef.bind((0,s.default)((0,s.default)(a))),a}(0,n.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:g(this.props)}),this.props.critical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},a.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=A(e,function(){var e=g(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},function(){return t.setState({imgLoaded:e,imgCached:!!t.imageRef.current.currentSrc})})}))},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=u(e),a=f(t),p[a]=!0,this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=u(this.props),t=e.title,a=e.alt,r=e.className,i=e.style,n=void 0===i?{}:i,s=e.imgStyle,o=void 0===s?{}:s,c=e.placeholderStyle,f=void 0===c?{}:c,p=e.placeholderClassName,g=e.fluid,m=e.fixed,h=e.backgroundColor,b=e.durationFadeIn,y=e.Tag,E=e.itemProp,L=e.loading,A=e.draggable,O=!1===this.state.fadeIn||this.state.imgLoaded,V=!0===this.state.fadeIn&&!this.state.imgCached,z=(0,l.default)({opacity:O?1:0,transition:V?"opacity "+b+"ms":"none"},o),x="boolean"==typeof h?"lightgray":h,C={transitionDelay:b+"ms"},k=(0,l.default)({opacity:this.state.imgLoaded?0:1},V&&C,o,f),M={title:t,alt:this.state.isVisible?"":a,style:k,className:p};if(g){var T=g,j=T[0];return d.default.createElement(y,{className:(r||"")+" gatsby-image-wrapper",style:(0,l.default)({position:"relative",overflow:"hidden"},n),ref:this.handleRef,key:"fluid-"+JSON.stringify(j.srcSet)},d.default.createElement(y,{style:{width:"100%",paddingBottom:100/j.aspectRatio+"%"}}),x&&d.default.createElement(y,{title:t,style:(0,l.default)({backgroundColor:x,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},V&&C)}),j.base64&&d.default.createElement(N,{src:j.base64,spreadProps:M,imageVariants:T,generateSources:w}),j.tracedSVG&&d.default.createElement(N,{src:j.tracedSVG,spreadProps:M,imageVariants:T,generateSources:S}),this.state.isVisible&&d.default.createElement("picture",null,v(T),d.default.createElement(R,{alt:a,title:t,sizes:j.sizes,src:j.src,crossOrigin:this.props.crossOrigin,srcSet:j.srcSet,style:z,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:E,loading:L,draggable:A})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:I((0,l.default)({alt:a,title:t,loading:L},j,{imageVariants:T}))}}))}if(m){var P=m,G=P[0],_=(0,l.default)({position:"relative",overflow:"hidden",display:"inline-block",width:G.width,height:G.height},n);return"inherit"===n.display&&delete _.display,d.default.createElement(y,{className:(r||"")+" gatsby-image-wrapper",style:_,ref:this.handleRef,key:"fixed-"+JSON.stringify(G.srcSet)},x&&d.default.createElement(y,{title:t,style:(0,l.default)({backgroundColor:x,width:G.width,opacity:this.state.imgLoaded?0:1,height:G.height},V&&C)}),G.base64&&d.default.createElement(N,{src:G.base64,spreadProps:M,imageVariants:P,generateSources:w}),G.tracedSVG&&d.default.createElement(N,{src:G.tracedSVG,spreadProps:M,imageVariants:P,generateSources:S}),this.state.isVisible&&d.default.createElement("picture",null,v(P),d.default.createElement(R,{alt:a,title:t,width:G.width,height:G.height,sizes:G.sizes,src:G.src,crossOrigin:this.props.crossOrigin,srcSet:G.srcSet,style:z,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:E,loading:L,draggable:A})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:I((0,l.default)({alt:a,title:t,loading:L},G,{imageVariants:P}))}}))}return null},t}(d.default.Component);O.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var V=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string}),z=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string});O.propTypes={resolutions:V,sizes:z,fixed:c.default.oneOfType([V,c.default.arrayOf(V)]),fluid:c.default.oneOfType([z,c.default.arrayOf(z)]),fadeIn:c.default.bool,durationFadeIn:c.default.number,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,crossOrigin:c.default.oneOfType([c.default.string,c.default.bool]),style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,onStartLoad:c.default.func,Tag:c.default.string,itemProp:c.default.string,loading:c.default.oneOf(["auto","lazy","eager"]),draggable:c.default.bool};var x=O;t.default=x},224:function(e,t,a){"use strict";var r=a(0),i=a.n(r),n=(a(216),a(222)),s=a(201),o=a.n(s),l=a(223),d=a.n(l),c=a(23),u=function(e){var t=n.data;return i.a.createElement("div",{className:o.a.container},i.a.createElement("div",{className:o.a.header},i.a.createElement("div",{className:o.a.logo},i.a.createElement(c.Link,{className:o.a.home,to:"/"},i.a.createElement(d.a,{fixed:t.avatar.childImageSharp.fixed,alt:"icon"}))),i.a.createElement("div",{className:o.a.navbar},i.a.createElement(c.Link,{to:"/",className:o.a.item},i.a.createElement("i",{className:"iconfont"},""),i.a.createElement("span",{className:o.a.title},"首页")),i.a.createElement("a",{className:o.a.item,href:"https://github.com/MLuminary",target:"_blank",rel:"noopener noreferrer"},i.a.createElement("i",{className:"iconfont"},""),i.a.createElement("span",{className:o.a.title},"GitHub")),i.a.createElement(c.Link,{to:"/about",className:o.a.item},i.a.createElement("i",{className:"iconfont"},""),i.a.createElement("span",{className:o.a.title},"关于")))))},f=a(213),p=a(202),g=a.n(p);var m=function(e){var t,a;function r(){return e.apply(this,arguments)||this}return a=e,(t=r).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a,r.prototype.render=function(){var e=this.props,t=e.children,a=e.title,r=e.post,n=r&&r.frontmatter?r.frontmatter.description:"";return i.a.createElement("div",{className:g.a.container},i.a.createElement(u,null),i.a.createElement(f.a,{title:a,description:n}),i.a.createElement("div",{className:g.a.content},t))},r}(i.a.Component);t.a=m}}]);
//# sourceMappingURL=component---src-pages-404-tsx-bac5a091bec1469c5459.js.map