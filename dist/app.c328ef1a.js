// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"app.js":[function(require,module,exports) {
var formulario = document.querySelector("#formulario");
var resultado = document.querySelector("#resultado");
window.addEventListener("load", function () {
  formulario.addEventListener("submit", obtainData);
  //ciudadInput.addEventListener("input", validarInputs);
});
function obtainData(e) {
  var ciudadInput = document.querySelector("#ciudad").value;
  var paisInput = document.querySelector("#pais").value;
  e.preventDefault();
  console.log("buscando clima");
  //Validar formulario
  if (ciudadInput === "" || paisInput === "") {
    mostrarAlerta("Campo vacio, intenta de nuevo");
    return;
  }
  consultarAPI(ciudadInput, paisInput);

  //Consultar API
  //   let url = "";
  //   fetch();
}
function consultarAPI(ciudad, pais) {
  //Agregar ID
  var APIkey = "f1eaf1dac80df2c9ce8456fa6c624c60";
  //Usar template string para la url y pasar los parametros
  var url = "https://api.openweathermap.org/data/2.5/weather?q=".concat(ciudad, ",").concat(pais, "&appid=").concat(APIkey);
  console.log(url);
  spinner();
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
    data;
    if (data.cod === "404") {
      mostrarAlerta("Ciudad no corresponde al país");
    } else {
      showData(data);
    }
  });
  formulario.reset();
}
function showData(datos) {
  limpiarHTML();
  var name = datos.name,
    _datos$main = datos.main,
    temp = _datos$main.temp,
    temp_max = _datos$main.temp_max,
    temp_min = _datos$main.temp_min;
  //Guardar en variable el cambio de temperaturas
  //Usando la funcion kelvinACentigrados
  var temperatura = kelvinACentigrados(temp);
  var temperaturaMax = kelvinACentigrados(temp_max);
  var temperaturaMin = kelvinACentigrados(temp_min);

  //Imprimir las temperaturas y el nombre
  var nombre = document.createElement("P");
  nombre.classList.add("font-bold", "text-6xl");
  nombre.innerHTML = "".concat(name);
  var tempActual = document.createElement("P");
  tempActual.classList.add("text-6xl");
  tempActual.innerHTML = "Actual: ".concat(temperatura, " &#8451"); //EL &#8451 le da el formato de ºC

  var tempMax = document.createElement("P");
  tempMax.classList.add("text-xl");
  tempMax.innerHTML = "Maxima:".concat(temperaturaMax, " &#8451"); //EL &#8451 le da el formato de ºC

  var tempMin = document.createElement("P");
  tempMin.classList.add("text-xl");
  tempMin.innerHTML = "Minima: ".concat(temperaturaMin, " &#8451");
  var resultadoDiv = document.createElement("DIV");
  resultadoDiv.classList.add("text-white", "text-center");
  resultadoDiv.appendChild(nombre);
  resultadoDiv.appendChild(tempActual);
  resultadoDiv.appendChild(tempMax);
  resultadoDiv.appendChild(tempMin);
  resultado.appendChild(resultadoDiv);
}
//Funcion para cambiar los grados kelvin a centrigrados.
//ParseInt para devolver la cantidad entera sin tanto decimal
var kelvinACentigrados = function kelvinACentigrados(grados) {
  return parseInt(grados - 273.5);
};
function mostrarAlerta(mensaje) {
  limpiarHTML();
  eliminarAlerta();
  var error = document.createElement("P");
  error.textContent = mensaje;
  error.classList.add("bg-red-600", "border-red-400", "text-white", "px-4", "py-3", "text-center", "mt-6");
  formulario.appendChild(error);
  setTimeout(function () {
    error.remove();
  }, 2000);
}
function eliminarAlerta() {
  var alerta = document.querySelector(".bg-red-600");
  if (alerta) {
    alerta.remove();
  }
}
function limpiarHTML() {
  resultado.innerHTML = "";
}
function spinner() {
  var spinnerDiv = document.createElement("DIV");
  spinnerDiv.classList.add("sk-fading-circle");
  spinnerDiv.innerHTML = "\n  <div class=\"sk-circle1 sk-circle\"></div>\n  <div class=\"sk-circle2 sk-circle\"></div>\n  <div class=\"sk-circle3 sk-circle\"></div>\n  <div class=\"sk-circle4 sk-circle\"></div>\n  <div class=\"sk-circle5 sk-circle\"></div>\n  <div class=\"sk-circle6 sk-circle\"></div>\n  <div class=\"sk-circle7 sk-circle\"></div>\n  <div class=\"sk-circle8 sk-circle\"></div>\n  <div class=\"sk-circle9 sk-circle\"></div>\n  <div class=\"sk-circle10 sk-circle\"></div>\n  <div class=\"sk-circle11 sk-circle\"></div>\n  <div class=\"sk-circle12 sk-circle\"></div>";
}
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56914" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map