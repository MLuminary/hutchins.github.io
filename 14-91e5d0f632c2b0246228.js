(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{275:function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.d(e,"a",function(){return r})},276:function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function o(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}n.d(e,"a",function(){return o})},333:function(t,e,n){n(30),n(31),n(68),n(96),n(41),n(15),n(135),n(52),n(39),n(95),n(49),n(38);var r=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",c=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function a(t,e,n,r){var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),c=new T(r||[]);return i._invoke=function(t,e,n){var r=h;return function(o,i){if(r===l)throw new Error("Generator is already running");if(r===p){if("throw"===o)throw i;return P()}for(n.method=o,n.arg=i;;){var c=n.delegate;if(c){var u=E(c,n);if(u){if(u===y)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===h)throw r=p,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=l;var a=s(t,e,n);if("normal"===a.type){if(r=n.done?p:f,a.arg===y)continue;return{value:a.arg,done:n.done}}"throw"===a.type&&(r=p,n.method="throw",n.arg=a.arg)}}}(t,n,c),i}function s(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(r){return{type:"throw",arg:r}}}t.wrap=a;var h="suspendedStart",f="suspendedYield",l="executing",p="completed",y={};function v(){}function d(){}function g(){}var m={};m[i]=function(){return this};var w=Object.getPrototypeOf,b=w&&w(w(_([])));b&&b!==n&&r.call(b,i)&&(m=b);var k=g.prototype=v.prototype=Object.create(m);function j(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function x(t){var e;this._invoke=function(n,o){function i(){return new Promise(function(e,i){!function e(n,o,i,c){var u=s(t[n],t,o);if("throw"!==u.type){var a=u.arg,h=a.value;return h&&"object"==typeof h&&r.call(h,"__await")?Promise.resolve(h.__await).then(function(t){e("next",t,i,c)},function(t){e("throw",t,i,c)}):Promise.resolve(h).then(function(t){a.value=t,i(a)},function(t){return e("throw",t,i,c)})}c(u.arg)}(n,o,e,i)})}return e=e?e.then(i,i):i()}}function E(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=e,E(t,n),"throw"===n.method))return y;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var o=s(r,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,y;var i=o.arg;return i?i.done?(n[t.resultName]=i.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,y):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,y)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function _(t){if(t){var n=t[i];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,c=function n(){for(;++o<t.length;)if(r.call(t,o))return n.value=t[o],n.done=!1,n;return n.value=e,n.done=!0,n};return c.next=c}}return{next:P}}function P(){return{value:e,done:!0}}return d.prototype=k.constructor=g,g.constructor=d,g[u]=d.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,u in t||(t[u]="GeneratorFunction")),t.prototype=Object.create(k),t},t.awrap=function(t){return{__await:t}},j(x.prototype),x.prototype[c]=function(){return this},t.AsyncIterator=x,t.async=function(e,n,r,o){var i=new x(a(e,n,r,o));return t.isGeneratorFunction(n)?i:i.next().then(function(t){return t.done?t.value:i.next()})},j(k),k[u]="Generator",k[i]=function(){return this},k.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=_,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(O),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function o(r,o){return u.type="throw",u.arg=t,n.next=r,o&&(n.method="next",n.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var c=this.tryEntries[i],u=c.completion;if("root"===c.tryLoc)return o("end");if(c.tryLoc<=this.prev){var a=r.call(c,"catchLoc"),s=r.call(c,"finallyLoc");if(a&&s){if(this.prev<c.catchLoc)return o(c.catchLoc,!0);if(this.prev<c.finallyLoc)return o(c.finallyLoc)}else if(a){if(this.prev<c.catchLoc)return o(c.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<c.finallyLoc)return o(c.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var c=i?i.completion:{};return c.type=t,c.arg=e,i?(this.method="next",this.next=i.finallyLoc,y):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),O(n),y}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;O(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:_(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),y}},t}(t.exports);try{regeneratorRuntime=r}catch(o){Function("r","regeneratorRuntime = r")(r)}},507:function(t,e,n){"use strict";n(271)("link",function(t){return function(e){return t(this,"a","href",e)}})},508:function(t,e,n){"use strict";n(39),n(30),n(31),n(50);var r=n(509),o=n.n(r),i=(n(333),n(72),n(275)),c=n(276),u=(n(41),n(15),function(t,e,n,r){return new(n||(n=Promise))(function(o,i){function c(t){try{a(r.next(t))}catch(e){i(e)}}function u(t){try{a(r.throw(t))}catch(e){i(e)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n(function(t){t(e)})).then(c,u)}a((r=r.apply(t,e||[])).next())})}),a=function(){function t(e,n,r,o){Object(i.a)(this,t),h(e),f(e),this.obj=e,this.input="string"==typeof n?[n]:n,this.fn="function"==typeof r?r:function(){},this.hooks="function"==typeof o?o:function(){},this.timer=0,this.typeAction={rollback:this.typedBack.bind(this),normal:this.play.bind(this),custom:this.fn},this.init()}return Object(c.a)(t,[{key:"init",value:function(){this.play()}},{key:"play",value:function(){var t=this;if(!this.input.length)return this.fn(this);var e=0,n=!1,r=this.input.shift()||"";this.timer=setInterval(function(){return e===r.length&&(e=0,n=!0,t.closeTimer()),t.obj.isEnd?t.closeTimer():n?t.nextTick():(t.obj.output=r.slice(0,e+1),t.hooks(r.slice(0,e+1),t),void e++)},this.obj.speed)}},{key:"typedBack",value:function(){var t=this;if(!this.input.length&&this.obj.sentencePause)return this.fn(this);var e=this.obj.output,n=e.length,r=!1;this.timer=setInterval(function(){return-1===n&&(t.obj.output="",t.hooks("",t),n=0,r=!0,t.closeTimer()),t.obj.isEnd?(t.closeTimer(),t.obj.singleBack=!1):r?(t.obj.singleBack=!1,t.input.length?t.play():t.fn(t)):(t.obj.output=e.slice(0,n+1),t.hooks(e.slice(0,n+1),t),void n--)},this.obj.backSpeed)}},{key:"nextTick",value:function(){return u(this,void 0,void 0,o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.sleep(this.obj.sleep);case 2:return t.abrupt("return",this.obj.singleBack?this.typedBack():this.getOutputType());case 3:case"end":return t.stop()}},t,this)}))}},{key:"getOutputType",value:function(){return this.typeAction[this.obj.type](this)}},{key:"closeTimer",value:function(){clearInterval(this.timer)}},{key:"sleep",value:function(t){return new Promise(function(e){return setTimeout(e,t)})}},{key:"close",value:function(){return this.obj.isEnd=!0}}]),t}(),s=function(t){throw new Error(t)},h=function(t){var e=Object.keys({output:"",type:"",isEnd:!1,speed:80,backSpeed:40,sleep:3e3,singleBack:!1,sentencePause:!1}),n=Object.keys(t);e.length!==n.length&&s("配置对象错误: 字段数量不正确！"),e.forEach(function(e){void 0!==t[e]&&null!==t[e]||s("配置对象错误：字段值为null或undefined！")})},f=function(t){Object.keys(t).forEach(function(e){var n=l[e](t);n.check()&&n.showTip(e)})},l={output:function(t){return new p("string",t.output)},type:function(t){return new p("string",t.type)},isEnd:function(t){return new p("boolean",t.isEnd)},speed:function(t){return new p("number",t.speed)},backSpeed:function(t){return new p("number",t.backSpeed)},sleep:function(t){return new p("number",t.sleep)},singleBack:function(t){return new p("boolean",t.singleBack)},sentencePause:function(t){return new p("boolean",t.sentencePause)}},p=function(){function t(e,n){Object(i.a)(this,t),this.type=e,this.field=n}return Object(c.a)(t,[{key:"check",value:function(){return typeof this.field!=="".concat(this.type)}},{key:"showTip",value:function(t){s("配置对象错误：属性 ".concat(t," 必须为 ").concat(this.type," 类型！"))}}]),t}();e.a=a},509:function(t,e,n){t.exports=n(333)}}]);
//# sourceMappingURL=14-91e5d0f632c2b0246228.js.map