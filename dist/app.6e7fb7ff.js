parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"A2T1":[function(require,module,exports) {
var e=document.querySelector("#formulario"),c=document.querySelector("#resultado");function n(e){var c=document.querySelector("#ciudad").value,n=document.querySelector("#pais").value;e.preventDefault(),console.log("buscando clima"),""!==c&&""!==n?t(c,n):d("Campo vacio, intenta de nuevo")}function t(c,n){var t="https://api.openweathermap.org/data/2.5/weather?q=".concat(c,",").concat(n,"&appid=").concat("f1eaf1dac80df2c9ce8456fa6c624c60");console.log(t),l(),fetch(t).then(function(e){return e.json()}).then(function(e){console.log(e),"404"===e.cod?d("Ciudad no corresponde al país"):i(e)}),e.reset()}function i(e){s();var n=e.name,t=e.main,i=t.temp,d=t.temp_max,r=t.temp_min,l=a(i),o=a(d),v=a(r),u=document.createElement("P");u.classList.add("font-bold","text-6xl"),u.innerHTML="".concat(n);var m=document.createElement("P");m.classList.add("text-6xl"),m.innerHTML="Actual: ".concat(l," &#8451");var p=document.createElement("P");p.classList.add("text-xl"),p.innerHTML="Maxima:".concat(o," &#8451");var k=document.createElement("P");k.classList.add("text-xl"),k.innerHTML="Minima: ".concat(v," &#8451");var f=document.createElement("DIV");f.classList.add("text-white","text-center"),f.appendChild(u),f.appendChild(m),f.appendChild(p),f.appendChild(k),c.appendChild(f)}window.addEventListener("load",function(){e.addEventListener("submit",n)});var a=function(e){return parseInt(e-273.5)};function d(c){s(),r();var n=document.createElement("P");n.textContent=c,n.classList.add("bg-red-600","border-red-400","text-white","px-4","py-3","text-center","mt-6"),e.appendChild(n),setTimeout(function(){n.remove()},2e3)}function r(){var e=document.querySelector(".bg-red-600");e&&e.remove()}function s(){c.innerHTML=""}function l(){var e=document.createElement("DIV");e.classList.add("sk-fading-circle"),e.innerHTML='\n  <div class="sk-circle1 sk-circle"></div>\n  <div class="sk-circle2 sk-circle"></div>\n  <div class="sk-circle3 sk-circle"></div>\n  <div class="sk-circle4 sk-circle"></div>\n  <div class="sk-circle5 sk-circle"></div>\n  <div class="sk-circle6 sk-circle"></div>\n  <div class="sk-circle7 sk-circle"></div>\n  <div class="sk-circle8 sk-circle"></div>\n  <div class="sk-circle9 sk-circle"></div>\n  <div class="sk-circle10 sk-circle"></div>\n  <div class="sk-circle11 sk-circle"></div>\n  <div class="sk-circle12 sk-circle"></div>'}
},{}]},{},["A2T1"], null)
//# sourceMappingURL=/app.6e7fb7ff.js.map