(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ct-utility"));
	else if(typeof define === 'function' && define.amd)
		define(["ct-utility"], factory);
	else if(typeof exports === 'object')
		exports["ct-adc-img-uploader"] = factory(require("ct-utility"));
	else
		root["ct-adc-img-uploader"] = factory(root["ct-utility"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_12__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ct_utility__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ct_utility___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ct_utility__);




var ERRORS = {
    Q_EXCEED_NUM_LIMIT: '文件数量超出限制!',
    Q_EXCEED_SIZE_LIMIT: '文件总大小超出限制!',
    Q_TYPE_DENIED: '文件类型不正确!',
    F_EXCEED_SIZE: '文件大小超出限制!',
    F_DUPLICATE: '文件重复!'
};

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'img-uploader',
    props: {
        thumbnailWidth: {
            type: Number,
            default: 110
        },
        thumbnailHeight: {
            type: Number,
            default: 110
        },
        imgs: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        server: {
            type: String,
            default: ''
        },
        resultFilter: {
            type: Function,
            default: function _default() {
                return new Function();
            }
        },
        method: {
            type: String,
            default: 'post'
        },
        duplicate: {
            type: Boolean,
            default: false
        },
        accept: {
            type: Object,
            default: function _default() {
                return {
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
                };
            }
        },
        fileSingleSizeLimit: {
            type: Number,
            default: 2 * 1024 * 1024
        },
        fileNumLimit: {
            type: Number,
            default: 5
        },
        formData: {
            type: Object,
            default: function _default() {
                return {};
            }
        }
    },
    data: function data() {
        return {
            thumbs: []
        };
    },

    computed: {
        uploadedImgs: function uploadedImgs() {
            var _this = this;

            var imgs = [];

            this.thumbs.map(function (item) {
                if (_this.isCompleteImg(item.status)) {
                    imgs.push({
                        errorText: item.errorText,
                        previewSrc: item.previewSrc,
                        previewStatus: item.previewStatus,
                        status: item.status,
                        url: item.url
                    });
                }
            });
            return imgs;
        },
        errorImgs: function errorImgs() {
            var _this2 = this;

            var imgs = [];

            this.thumbs.map(function (item) {
                if (_this2.isErrorImg(item.status)) {
                    imgs.push({
                        errorText: item.errorText,
                        previewSrc: item.previewSrc,
                        previewStatus: item.previewStatus,
                        status: item.status,
                        url: item.url
                    });
                }
            });
            return imgs;
        },
        pendingImgs: function pendingImgs() {
            var _this3 = this;

            var imgs = [];

            this.thumbs.map(function (item) {
                if (_this3.isPendingImg(item.status)) {
                    imgs.push({
                        errorText: item.errorText,
                        previewSrc: item.previewSrc,
                        previewStatus: item.previewStatus,
                        status: item.status,
                        url: item.url
                    });
                }
            });
            return imgs;
        }
    },
    created: function created() {
        this.initThumbs();
    },
    mounted: function mounted() {
        var _this4 = this;

        this.initUploader();
        setTimeout(function () {
            var element = _this4.$refs.root.querySelector('.webuploader-element-invisible');
            if (element !== null) {
                element.style.width = _this4.thumbnailWidth + 'px';
                element.style.height = _this4.thumbnailHeight + 'px';
            }
        });
    },

    methods: {
        isCompleteImg: function isCompleteImg(status) {
            return status === 'complete';
        },
        isPendingImg: function isPendingImg(status) {
            var statuses = ['inited', 'progress', 'queued', 'progress'];

            return statuses.indexOf(status) > -1;
        },
        isErrorImg: function isErrorImg(status) {
            var statuses = ['error', 'cancelled', 'interrupt', 'invalid'];

            return statuses.indexOf(status) > -1;
        },
        isCanBeStoppedImg: function isCanBeStoppedImg(status) {
            var statuses = ['inited', 'queued', 'progress', 'interrupt', 'cancelled'];

            return statuses.indexOf(status) > -1;
        },
        initThumbs: function initThumbs() {
            var _this5 = this;

            var defaults = {
                file: null,
                status: '',
                errorText: '',
                previewStatus: true,
                previewSrc: '',
                url: '' };
            this.thumbs = [];
            this.imgs.map(function (url) {
                var thumb = __WEBPACK_IMPORTED_MODULE_1_ct_utility___default.a.base.extend(defaults, {
                    url: url,
                    previewSrc: url,
                    status: 'complete'
                });

                _this5.thumbs.push(JSON.parse(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(thumb)));
            });
        },
        removeFile: function removeFile(index) {
            if (index === this.thumbs.length - 1) {
                this.$emit('runtime-error', {
                    code: 'RESET',
                    msg: ''
                });
                this.$emit('change-status');
            }
            this.$emit('delete', {
                index: index,
                url: this.thumbs[index].url,
                status: this.thumbs[index].status
            });
            if (this.thumbs[index].file !== null) {
                this.uploader.removeFile(this.thumbs[index].file);
            }
            this.thumbs = this.thumbs.filter(function (item, i) {
                return i !== index;
            });
        },
        upload: function upload() {
            this.uploader.upload();
        },
        initUploader: function initUploader() {
            var that = this;

            var uploader = WebUploader.create({
                pick: {
                    id: this.$refs.addThumb
                },
                server: that.server,
                method: that.method,
                duplicate: that.duplicate,
                auto: true,
                chunked: true,
                accept: that.accept,
                fileSingleSizeLimit: that.fileSingleSizeLimit,
                fileNumLimit: that.fileNumLimit
            });

            function addFile(file) {
                var fileData = {
                    file: file,
                    status: '',
                    errorText: '',
                    previewStatus: false,
                    previewSrc: '',
                    url: '' };
                uploader.makeThumb(file, function (error, src) {
                    if (error) {
                        fileData.previewStatus = false;
                        return;
                    }
                    fileData.previewStatus = true;
                    fileData.previewSrc = src;
                }, that.thumbnailWidth, that.thumbnailHeight);

                file.on('statuschange', function (cur) {
                    fileData.status = cur;
                });
                that.thumbs.push(fileData);
            }

            function hashString(str) {
                var hash = 0,
                    i = 0,
                    len = str.length,
                    _char;

                for (; i < len; i++) {
                    _char = str.charCodeAt(i);
                    hash = _char + (hash << 6) + (hash << 16) - hash;
                }

                return hash;
            }
            uploader.on('uploadBeforeSend', function (object, data, headers) {
                __WEBPACK_IMPORTED_MODULE_1_ct_utility___default.a.base.extend(data, that.formData);
            });
            uploader.on('beforeFileQueued', function (file) {
                if (!that.duplicate) {
                    var hash = file.__hash || (file.__hash = hashString(file.name + file.size + file.lastModifiedDate));

                    var hasHash = that.thumbs.filter(function (thumb) {
                        return thumb.file !== null && thumb.file['__hash'] === hash;
                    }).length > 0;
                    if (hasHash) {
                        that.$emit('runtime-error', {
                            code: 'F_DUPLICATE',
                            msg: ERRORS['F_DUPLICATE']
                        });
                        return false;
                    }
                }
                return that.thumbs.length < that.fileNumLimit;
            });
            uploader.onFileQueued = function (file) {
                addFile(file);
            };
            uploader.onUploadSuccess = function (file, res) {
                var result = that.resultFilter(res);
                that.thumbs = that.thumbs.map(function (item) {
                    if (item.file !== null && item.file.id === file.id) {
                        if (result.status) {
                            item.url = result.path;
                            that.$emit('runtime-success');
                            that.$emit('runtime-error', {
                                code: 'RESET',
                                msg: ''
                            });
                            that.$emit('change-status');
                            return item;
                        } else {
                            item.url = '';
                            item.status = 'error';
                            item.errorText = result.msg;
                            that.$emit('runtime-error', {
                                code: 'RESPONSE_ERROR',
                                msg: result.msg
                            });
                            that.$emit('change-status');
                            return item;
                        }
                    } else {
                        return item;
                    }
                });
            };
            uploader.onUploadError = function (file, reason) {
                that.thumbs = that.thumbs.map(function (item) {
                    that.$emit('runtime-error', {
                        code: 'HTTP_ERROR',
                        msg: reason
                    });
                    that.$emit('change-status');
                    if (item.file !== null && item.file.id === file.id) {
                        item.url = '';
                        item.errorText = reason;
                        return item;
                    } else {
                        return item;
                    }
                });
            };
            uploader.onError = function (code) {
                that.$emit('runtime-error', {
                    code: code,
                    msg: ERRORS[code] || '请检查文件是否符合要求!'
                });
                that.$emit('change-status');
            };
            that.uploader = uploader;
        },
        isPending: function isPending() {
            return this.pendingImgs.length > 0;
        },
        getUploadedImgs: function getUploadedImgs() {
            return this.uploadedImgs;
        },
        getErrorImgs: function getErrorImgs() {
            return this.errorImgs;
        },
        getPendingImgs: function getPendingImgs() {
            return this.pendingImgs;
        },
        getUrls: function getUrls() {
            return this.uploadedImgs.map(function (item) {
                return item.url;
            });
        },
        refreshUploader: function refreshUploader() {
            this.uploader.refresh();
        },
        resetUploader: function resetUploader() {
            this.uploader.reset();
        },
        cancelUpload: function cancelUpload() {
            var _this6 = this;

            this.uploader.stop(true);
            this.thumbs = this.thumbs.filter(function (item) {
                if (_this6.isCanBeStoppedImg(item.status)) {
                    if (item.file !== null) {
                        _this6.uploader.removeFile(item.file, true);
                    }
                }
                return !_this6.isCanBeStoppedImg(item.status);
            });
        }
    },
    watch: {
        imgs: function imgs() {
            this.initThumbs();
        },
        thumbs: function thumbs(newVal, oldVal) {
            var _this7 = this;

            if (newVal.length < oldVal.length && oldVal.length === this.fileNumLimit) {
                this.$nextTick(function () {
                    _this7.uploader.addButton({
                        id: _this7.$refs.addThumb
                    });
                });
            }
        },

        server: function server(_server) {
            this.uploader.option('server', _server);
        },
        method: function method(newVal) {
            this.uploader.option('method', newVal);
        },
        duplicate: function duplicate() {
            if (typeof this.uploader !== 'undefined') {
                this.uploader.destroy();
                this.initUploader();
            }
        },
        accept: function accept() {
            if (typeof this.uploader !== 'undefined') {
                this.uploader.destroy();
                this.initUploader();
            }
        },
        fileSingleSizeLimit: function fileSingleSizeLimit() {
            if (typeof this.uploader !== 'undefined') {
                this.uploader.destroy();
                this.initUploader();
            }
        }
    }
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', {
    ref: "root",
    staticClass: "filelist ct-adc-img-uploader"
  }, [_vm._l((_vm.thumbs), function(thumb, index) {
    return _c('li', {
      style: ({
        width: _vm.thumbnailWidth + 'px',
        height: _vm.thumbnailHeight + 'px'
      })
    }, [_c('img', {
      attrs: {
        "src": thumb.previewSrc
      }
    }), _vm._v(" "), (_vm.isPendingImg(thumb.status)) ? _c('div', {
      staticClass: "thumbInfo text-center pending"
    }, [_c('span', {
      staticClass: "glyphicon glyphicon-refresh"
    })]) : _vm._e(), _vm._v(" "), (_vm.isCompleteImg(thumb.status)) ? _c('div', {
      staticClass: "thumbInfo text-center success"
    }, [_c('span', {
      staticClass: "glyphicon glyphicon-ok"
    })]) : _vm._e(), _vm._v(" "), (_vm.isErrorImg(thumb.status)) ? _c('div', {
      staticClass: "thumbInfo text-center error"
    }, [_c('span', {
      staticClass: "glyphicon glyphicon-remove"
    })]) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "file-panel",
      on: {
        "click": function($event) {
          _vm.removeFile(index)
        }
      }
    }, [_c('span', {
      staticClass: "glyphicon glyphicon-trash"
    })])])
  }), _vm._v(" "), (_vm.thumbs.length < _vm.fileNumLimit) ? _c('li', {
    ref: "addThumb",
    staticClass: "addThumb",
    style: ({
      width: _vm.thumbnailWidth + 'px',
      height: _vm.thumbnailHeight + 'px'
    })
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-plus"
  })]) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-69f4afae", module.exports)
  }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(10)("6fe8a685", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-69f4afae\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./img-uploader.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-69f4afae\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./img-uploader.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(6);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "\n.ct-adc-img-uploader .webuploader-pick {\n    overflow: hidden;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n}\n.ct-adc-img-uploader .webuploader-element-invisible {\n    /*width: 110px;*/\n    /*height: 110px;*/\n    outline: none;\n    opacity: 0;\n    cursor: pointer;\n}\n.ct-adc-img-uploader.filelist {\n    list-style: none;\n    margin: -8px;\n    padding: 0;\n}\n.ct-adc-img-uploader.filelist:after {\n    content: '';\n    display: block;\n    width: 0;\n    height: 0;\n    overflow: hidden;\n    clear: both;\n}\n.ct-adc-img-uploader.filelist li {\n    border: 1px solid #d4d4d4;\n    border-radius: 6px;\n    text-align: center;\n    margin: 8px;\n    position: relative;\n    display: inline;\n    float: left;\n    overflow: hidden;\n    font-size: 12px;\n}\n.ct-adc-img-uploader.filelist li img {\n    width: 100%;\n    height: 100%;\n}\n.ct-adc-img-uploader.filelist li .thumbInfo {\n    position: absolute;\n    bottom: -2px;\n    right: -14px;\n    width: 46px;\n    height: 20px;\n    line-height: 20px;\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg);\n}\n.ct-adc-img-uploader.filelist li .success {\n    background-color: #13ce66;\n    box-shadow: 0 0 5px #116235;\n}\n.ct-adc-img-uploader.filelist li .pending {\n    background-color: #ff5722;\n    box-shadow: 0 0 5px #c13509;\n}\n.ct-adc-img-uploader.filelist li .error {\n    background-color: #ec1515;\n    box-shadow: 0 0 5px #bf0303;\n}\n.filelist li .thumbInfo span {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg);\n    color: #fff;\n}\n.filelist li.addThumb {\n    position: relative;\n    border: 1px dashed #d4d4d4;\n    cursor: pointer;\n}\n.filelist li.addThumb span {\n    font-size: 30px;\n    color: #e3e3e3;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n}\n.filelist li.addThumb:hover span {\n    color: #aaaaaa;\n}\n.filelist li img {\n    width: 100%;\n}\n.filelist li:hover .file-panel {\n    display: block;\n}\n.filelist div.file-panel {\n    display: none;\n    position: absolute;\n    cursor: pointer;\n    background: rgba(0, 0, 0, 0.2);\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    overflow: hidden;\n    z-index: 300;\n}\n.filelist div.file-panel span {\n    font-size: 20px;\n    color: #fff;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n}\n.glyphicon-refresh {\n    -webkit-animation: refreshing .8s infinite linear;\n            animation: refreshing .8s infinite linear;\n}\n@-webkit-keyframes refreshing {\n0% {\n        -webkit-transform: rotate(0deg);\n                transform: rotate(0deg);\n}\n100% {\n        -webkit-transform: rotate(360deg);\n                transform: rotate(360deg);\n}\n}\n@keyframes refreshing {\n0% {\n        -webkit-transform: rotate(0deg);\n                transform: rotate(0deg);\n}\n100% {\n        -webkit-transform: rotate(360deg);\n                transform: rotate(360deg);\n}\n}\n\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(3)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(0),
  /* template */
  __webpack_require__(2),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/rubyisapm/teamshare/adc-packages/img-uploader/src/component/img-uploader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] img-uploader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-69f4afae", Component.options)
  } else {
    hotAPI.reload("data-v-69f4afae", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(11)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ })
/******/ ]);
});