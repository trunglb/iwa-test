(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{J4x7:function(e,t,n){"use strict";n.r(t),n.d(t,"IonRippleEffect",function(){return o});var i=n("k5vO"),o=function(){function e(){}return e.prototype.addRipple=function(e,t){var n=this;this.config.getBoolean("animated",!0)&&Object(i.a)(function(){return n.prepareRipple(e,t)})},e.prototype.prepareRipple=function(e,t){var n,i,o,p=this;this.queue.read(function(){var r=p.el.getBoundingClientRect(),a=r.width,u=r.height;o=Math.min(2*Math.sqrt(a*a+u*u),c),n=e-r.left-.5*o,i=t-r.top-.5*o}),this.queue.write(function(){var e=p.win.document.createElement("div");e.classList.add("ripple-effect");var t=e.style,c=Math.max(r*Math.sqrt(o),a);t.top=i+"px",t.left=n+"px",t.width=t.height=o+"px",t.animationDuration=c+"ms",(p.el.shadowRoot||p.el).appendChild(e),setTimeout(function(){return e.remove()},c+50)})},Object.defineProperty(e,"is",{get:function(){return"ion-ripple-effect"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{addRipple:{method:!0},config:{context:"config"},el:{elementRef:!0},queue:{context:"queue"},win:{context:"window"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return":host{left:0;right:0;top:0;bottom:0}.ripple-effect,:host{position:absolute;contain:strict}.ripple-effect{border-radius:50%;background-color:currentColor;color:inherit;opacity:0;-webkit-animation-name:rippleAnimation;animation-name:rippleAnimation;-webkit-animation-duration:.2s;animation-duration:.2s;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;will-change:transform,opacity;pointer-events:none}@-webkit-keyframes rippleAnimation{0%{-webkit-transform:scale(.1);transform:scale(.1);opacity:.2}to{-webkit-transform:scale(1);transform:scale(1);opacity:0}}@keyframes rippleAnimation{0%{-webkit-transform:scale(.1);transform:scale(.1);opacity:.2}to{-webkit-transform:scale(1);transform:scale(1);opacity:0}}"},enumerable:!0,configurable:!0}),e}(),r=35,a=260,c=550}}]);