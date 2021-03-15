!function(t,e){"object"===typeof exports&&"object"===typeof module?module.exports=e():"function"===typeof define&&define.amd?define([],e):"object"===typeof exports?exports.VMoneySpinner=e():t.VMoneySpinner=e()}(window,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=4)}([function(t,e,n){"use strict";function r(t,e,n,r,i,o,u,a){var s,c="function"===typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),r&&(c.functional=!0),o&&(c._scopeId="data-v-"+o),u?(s=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(u)},c._ssrRegister=s):i&&(s=a?function(){i.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:i),s)if(c.functional){c._injectStyles=s;var f=c.render;c.render=function(t,e){return s.call(e),f(t,e)}}else{var l=c.beforeCreate;c.beforeCreate=l?[].concat(l,s):[s]}return{exports:t,options:c}}n.d(e,"a",(function(){return r}))},function(t,e,n){"use strict";var r=n(2),i=!0,o=!0,u=1,a="v-money-spinner",s="",c="center",f="",l="",p="",m="",d="",h="",v="",y="",g="",b={name:"money-spinner",components:{Money:r.Money},inheritAttrs:!1,props:{value:{required:!1,type:[Number,String]},id:{type:String,default:function(){return a}},spinner:{type:Boolean,default:function(){return o}},step:{type:Number,default:function(){return u}},bootstrap:{type:Boolean,default:function(){return i}},align:{type:String,default:function(){return c}},label:{type:[Boolean,String],default:function(){return s}},labelClass:{type:String,default:function(){return f}},invalidMessage:{type:String,default:function(){return l}},wrapperClass:{type:String,default:function(){return p}},wrapperGroupClass:{type:String,default:function(){return m}},wrapperPrependClass:{type:String,default:function(){return d}},wrapperAppendClass:{type:String,default:function(){return h}},prependClass:{type:String,default:function(){return v}},appendClass:{type:String,default:function(){return y}},inputClass:{type:String,default:function(){return g}}},data:function(){return{amount:0,invalid:!1,is_negative:!1}},created:function(){this.value&&(this.amount=this.value),parseFloat(this.amount)>0?this.is_negative=!1:this.is_negative=!0},mounted:function(){var t=this;this.updateEventBus(this.$refs.money.masked?this.$refs.money.innerValue:this.amount),this.$watch("$refs.money.innerValue",(function(e,n){t.determineSignEvent(e,n),t.updateEventBus(t.amount)})),this.$watch("$refs.money.masked",(function(e){t.$emit("input",t.$refs.money[e?"format":"unformat"](t.amount))})),this.$watch("$refs.money.pattern",(function(e){".*"==e?t.invalid=!1:t.invalidMessage&&(t.invalid=!0)}))},methods:{setAmount:function(t){var e=this.amount;return("string"===typeof this.amount||this.amount instanceof String)&&(e=this.unformat(this.amount)),e>this.$refs.money.max?e=this.$refs.money.max.toFixed(this.$refs.money.precision):e<this.$refs.money.min?e=this.$refs.money.min.toFixed(this.$refs.money.precision):t&&e<this.$refs.money.max?e=Math.min(e+this.step,this.$refs.money.max).toFixed(this.$refs.money.precision):!t&&e>this.$refs.money.min&&(e=Math.max(e-this.step,this.$refs.money.min).toFixed(this.$refs.money.precision)),this.amount=this.format(e)},sendEventAmount:function(t,e){this.$emit(t,this.setAmount(e),this.format(this.amount))},setAmountPlus:function(t){this.sendEventAmount("plus",!0)},setAmountMinus:function(t){this.sendEventAmount("minus",!1)},updateEventBus:function(t){this.$eventBus&&this.$eventBus.$emit(this.id,this.unformat(t))},determineSignEvent:function(t,e){var n=this.format(t),r=this.unformat(t);this.$emit("change",r,n,e),r>0&&this.is_negative?(this.is_negative=!1,this.$emit("positive",r,r)):r<0&&!this.is_negative&&(this.is_negative=!0,this.$emit("negative",r,r))},unformat:function(t){return this.$refs.money.unformat(t)},format:function(t){return this.$refs.money.format(t)}},watch:{amount:function(t,e){t!==e&&this.$emit("input",t)},value:function(t){this.amount=t},invalid:function(t,e){t!==e&&t&&this.$emit("exceeded",this.unformat(this.amount),this.format(this.amount),this.$refs.money.min,this.$refs.money.max)}}},x=n(0),_=Object(x.a)(b,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:[{"form-group":t.bootstrap,"was-validated":t.bootstrap&&t.invalid},t.wrapperClass]},[t.label?n("label",{class:t.labelClass,attrs:{for:t.id}},[t._v(t._s(t.label))]):t._e(),t._v(" "),n("div",{class:[{"input-group":t.bootstrap},t.wrapperGroupClass]},[t.spinner?n("div",{class:[{"input-group-prepend":t.bootstrap},t.wrapperPrependClass]},[n("button",{class:[{"btn btn-outline-secondary font-weight-bold":t.bootstrap},t.prependClass],attrs:{type:"button"},on:{click:t.setAmountMinus}},[t._v("-")])]):t._e(),t._v(" "),n("money",t._b({ref:"money",class:[{"form-control":t.bootstrap},t.bootstrap?"text-"+t.align:"",t.inputClass],attrs:{id:t.id,minMaxMessage:t.invalidMessage},model:{value:t.amount,callback:function(e){t.amount=e},expression:"amount"}},"money",t.$attrs,!1)),t._v(" "),t.spinner?n("div",{class:[{"input-group-append":t.bootstrap},t.wrapperAppendClass]},[n("button",{class:[{"btn btn-outline-success rounded-right font-weight-bold":t.bootstrap},t.appendClass],attrs:{type:"button"},on:{click:t.setAmountPlus}},[t._v("+")])]):t._e(),t._v(" "),t.bootstrap?n("div",{staticClass:"invalid-feedback"},[t._v("\n\t\t\t"+t._s(t.invalidMessage)+"\n\t\t")]):t._e()],1)])}),[],!1,null,null,null);e.a=_.exports},function(t,e,n){window,t.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=4)}([function(t,e,n){"use strict";e.a={prefix:"",suffix:"",thousands:",",decimal:".",precision:2,allowBlank:!1,min:Number.MIN_SAFE_INTEGER,max:Number.MAX_SAFE_INTEGER,masked:!1,amend:!1}},function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"d",(function(){return o})),n.d(e,"c",(function(){return y})),n.d(e,"a",(function(){return g}));var r=n(0),i=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r.a;if(e.allowBlank&&""==t)return"";if("number"===typeof t)var n=t.toFixed(f(e.precision));else n=u(t,e);var i=n.indexOf("-")>=0?"-":"",o=c(n),a=p(o,e.precision),s=d(a),l=s[0],v=s[1];return l=m(l,e.thousands),e.prefix+i+h(l,v,e.decimal)+e.suffix},o=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:r.a;if("string"!==typeof t)return t;var i=u(t,n),o=i.indexOf("-")>=0?-1:1,a=c(i),s=p(a,e);return parseFloat(s)*o},u=function(t,e){return s(a(t,e.prefix),e.suffix)},a=function(t,e){return t.startsWith(e)?t.replace(e,""):t},s=function(t,e){return t.endsWith(e)?t.substring(0,t.length-e.length):t},c=function(t){return v(t).replace(/\D+/g,"")||"0"},f=function(t){return l(0,t,20)},l=function(t,e,n){return Math.max(t,Math.min(e,n))},p=function(t,e){var n=Math.pow(10,e);return(parseFloat(t)/n).toFixed(f(e))},m=function(t,e){return t.replace(/(\d)(?=(?:\d{3})+\b)/gm,"$1".concat(e))},d=function(t){return v(t).split(".")},h=function(t,e,n){return e?t+n+e:t},v=function(t){return t?t.toString():""},y=function(t,e){var n=function(){t.setSelectionRange(e,e)};t===document.activeElement&&(n(),setTimeout(n,1))},g=function(t){return new Event(t)}},function(t,e,n){"use strict";var r=n(1),i=n(0);e.a=function(t,e){if(e.value){var n=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(t).concat(Object.keys(e)).reduce((function(n,r){return n[r]=void 0===e[r]?t[r]:e[r],n}),{})}(i.a,e.value);if("INPUT"!==t.tagName.toLocaleUpperCase()){var o=t.getElementsByTagName("input");1!==o.length||(t=o[0])}t.onkeydown=function(e){var i=8==e.which||46==e.which,o=t.value.length-t.selectionEnd===0;n.allowBlank&&i&&o&&0===Object(r.d)(t.value,0,n)&&(t.__vue__.innerValue="",t.dispatchEvent(Object(r.a)("change")))},t.oninput=function(){var e=t.value.length-t.selectionEnd;t.value=Object(r.b)(t.value,n),e=Math.max(e,n.suffix.length),e=t.value.length-e,e=Math.max(e,n.prefix.length+1),Object(r.c)(t,e),t.dispatchEvent(Object(r.a)("change"))},t.onfocus=function(){t.selectionEnd<n.prefix.length?Object(r.c)(t,n.prefix.length):t.selectionEnd>t.value.length-n.suffix.length?Object(r.c)(t,t.value.length-n.suffix.length):Object(r.c)(t,t.selectionEnd)},t.oninput()}}},function(t,e,n){"use strict";var r=n(2),i=n(0),o=n(1),u=function(t,e,n,r,i,o,u,a){var s,c="function"===typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=[],c._compiled=!0),s)if(c.functional){c._injectStyles=s;var f=c.render;c.render=function(t,e){return s.call(e),f(t,e)}}else{var l=c.beforeCreate;c.beforeCreate=l?[].concat(l,s):[s]}return{exports:t,options:c}}({name:"Money",props:{value:{required:!1,type:[Number,String]},minMaxMessage:{type:String},masked:{type:Boolean,default:function(){return i.a.masked}},precision:{type:Number,default:function(){return i.a.precision}},decimal:{type:String,default:function(){return i.a.decimal}},thousands:{type:String,default:function(){return i.a.thousands}},prefix:{type:String,default:function(){return i.a.prefix}},suffix:{type:String,default:function(){return i.a.suffix}},allowBlank:{type:Boolean,default:function(){return i.a.allowBlank}},max:{type:Number,default:function(){return i.a.max}},min:{type:Number,default:function(){return i.a.min}},amend:{type:Boolean,default:function(){return i.a.amend}}},directives:{money:r.a},data:function(){return{pattern:".*",innerValue:0}},watch:{innerValue:function(t,e){if(t!==e){var n=this.unformat(t);this.$emit("input",this.masked?t:n),n>this.$props.max?this.pattern=this.$props.max:n<this.$props.min?this.pattern=this.$props.min:this.pattern=".*"}},value:function(t){this.innerValue=this.format(t)}},created:function(){this.value&&(this.innerValue=this.format(this.value))},methods:{blur:function(){"number"===typeof this.pattern&&this.$props.amend&&(this.$emit("input",this.pattern),this.pattern=".*")},format:function(t){return Object(o.b)(t,this.$props)},unformat:function(t){return Object(o.d)(t,this.precision,this.$props)}}},(function(){var t=this,e=t.$createElement;return(t._self._c||e)("input",{directives:[{name:"model",rawName:"v-model",value:t.innerValue,expression:"innerValue"},{name:"money",rawName:"v-money",value:{precision:t.precision,decimal:t.decimal,thousands:t.thousands,prefix:t.prefix,suffix:t.suffix,allowBlank:t.allowBlank,min:t.min,max:t.max},expression:"{precision, decimal, thousands, prefix, suffix, allowBlank, min, max}"}],staticClass:"v-money",attrs:{type:"tel",pattern:t.pattern,title:t.minMaxMessage},domProps:{value:t.innerValue},on:{blur:t.blur,input:function(e){e.target.composing||(t.innerValue=e.target.value)}}})}));e.a=u.exports},function(t,e,n){t.exports=n(5)},function(t,e,n){"use strict";n.r(e),function(t){n.d(e,"VERSION",(function(){return u}));var r=n(3);n.d(e,"Money",(function(){return r.a}));var i=n(2);n.d(e,"VMoney",(function(){return i.a}));var o=n(0);n.d(e,"options",(function(){return o.a}));var u=t.env.VERSION;e.default={install:function(t,e){e&&Object.keys(e).map((function(t){o.a[t]=e[t]})),t.directive("money",i.a),t.component("money",r.a)}}}.call(this,n(6))},function(t,e){var n,r,i=t.exports={};function o(){throw new Error("setTimeout has not been defined")}function u(){throw new Error("clearTimeout has not been defined")}function a(t){if(n===setTimeout)return setTimeout(t,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"===typeof setTimeout?setTimeout:o}catch(t){n=o}try{r="function"===typeof clearTimeout?clearTimeout:u}catch(t){r=u}}();var s,c=[],f=!1,l=-1;function p(){f&&s&&(f=!1,s.length?c=s.concat(c):l=-1,c.length&&m())}function m(){if(!f){var t=a(p);f=!0;for(var e=c.length;e;){for(s=c,c=[];++l<e;)s&&s[l].run();l=-1,e=c.length}s=null,f=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===u||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(t)}}function d(t,e){this.fun=t,this.array=e}function h(){}i.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];c.push(new d(t,e)),1!==c.length||f||a(m)},d.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=h,i.addListener=h,i.once=h,i.off=h,i.removeListener=h,i.removeAllListeners=h,i.emit=h,i.prependListener=h,i.prependOnceListener=h,i.listeners=function(t){return[]},i.binding=function(t){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(t){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}}])},function(t,e,n){"use strict";var r={name:"money-spinner-amount",props:{money_id:{type:String,default:"v-money-spinner"},format:{type:String,default:"en-US"},prefix:{type:String,default:""},suffix:{type:String,default:""},precision:{type:Number,default:2}},data:function(){return{amount:null}},created:function(){var t=this;this.$eventBus.$on(this.money_id,(function(e){t.amount=t.prefix+new Intl.NumberFormat(t.format,{minimumFractionDigits:t.precision}).format(e)+t.suffix}))}},i=n(0),o=Object(i.a)(r,(function(){var t=this.$createElement;return(this._self._c||t)("span",[this._v(this._s(this.amount))])}),[],!1,null,null,null);e.a=o.exports},function(t,e,n){t.exports=n(5)},function(t,e,n){"use strict";n.r(e),function(t){n.d(e,"version",(function(){return o}));var r=n(1);n.d(e,"VMoneySpinner",(function(){return r.a}));var i=n(3),o=t.env.VERSION;e.default={install:function(t,e){t.prototype.$eventBus=new t,t.component("VMoneySpinner",r.a),t.component("VMoneySpinnerAmount",i.a)}}}.call(this,n(6))},function(t,e){var n,r,i=t.exports={};function o(){throw new Error("setTimeout has not been defined")}function u(){throw new Error("clearTimeout has not been defined")}function a(t){if(n===setTimeout)return setTimeout(t,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"===typeof setTimeout?setTimeout:o}catch(t){n=o}try{r="function"===typeof clearTimeout?clearTimeout:u}catch(t){r=u}}();var s,c=[],f=!1,l=-1;function p(){f&&s&&(f=!1,s.length?c=s.concat(c):l=-1,c.length&&m())}function m(){if(!f){var t=a(p);f=!0;for(var e=c.length;e;){for(s=c,c=[];++l<e;)s&&s[l].run();l=-1,e=c.length}s=null,f=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===u||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(t)}}function d(t,e){this.fun=t,this.array=e}function h(){}i.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];c.push(new d(t,e)),1!==c.length||f||a(m)},d.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=h,i.addListener=h,i.once=h,i.off=h,i.removeListener=h,i.removeAllListeners=h,i.emit=h,i.prependListener=h,i.prependOnceListener=h,i.listeners=function(t){return[]},i.binding=function(t){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(t){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}}])}));