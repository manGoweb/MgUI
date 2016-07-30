// This file was generated by modules-webmake (modules for web) project.
// See: https://github.com/medikoo/modules-webmake

(function (modules) {
	'use strict';

	var resolve, getRequire, wmRequire, notFoundError, findFile
	  , extensions = {".js":[".coffee",".jsx",".es6",".es"],".json":[],".css":[],".html":[]}
	  , envRequire = typeof require === 'function' ? require : null;

	notFoundError = function (path) {
		var error = new Error("Could not find module '" + path + "'");
		error.code = 'MODULE_NOT_FOUND';
		return error;
	};
	findFile = function (scope, name, extName) {
		var i, ext;
		if (typeof scope[name + extName] === 'function') return name + extName;
		for (i = 0; (ext = extensions[extName][i]); ++i) {
			if (typeof scope[name + ext] === 'function') return name + ext;
		}
		return null;
	};
	resolve = function (scope, tree, path, fullPath, state, id) {
		var name, dir, exports, module, fn, found, ext;
		path = path.split(/[\\/]/);
		name = path.pop();
		if ((name === '.') || (name === '..')) {
			path.push(name);
			name = '';
		}
		while ((dir = path.shift()) != null) {
			if (!dir || (dir === '.')) continue;
			if (dir === '..') {
				scope = tree.pop();
				id = id.slice(0, id.lastIndexOf('/'));
			} else {
				tree.push(scope);
				scope = scope[dir];
				id += '/' + dir;
			}
			if (!scope) throw notFoundError(fullPath);
		}
		if (name && (typeof scope[name] !== 'function')) {
			found = findFile(scope, name, '.js');
			if (!found) found = findFile(scope, name, '.json');
			if (!found) found = findFile(scope, name, '.css');
			if (!found) found = findFile(scope, name, '.html');
			if (found) {
				name = found;
			} else if ((state !== 2) && (typeof scope[name] === 'object')) {
				tree.push(scope);
				scope = scope[name];
				id += '/' + name;
				name = '';
			}
		}
		if (!name) {
			if ((state !== 1) && scope[':mainpath:']) {
				return resolve(scope, tree, scope[':mainpath:'], fullPath, 1, id);
			}
			return resolve(scope, tree, 'index', fullPath, 2, id);
		}
		fn = scope[name];
		if (!fn) throw notFoundError(fullPath);
		if (fn.hasOwnProperty('module')) return fn.module.exports;
		exports = {};
		fn.module = module = { exports: exports, id: id + '/' + name };
		fn.call(exports, exports, module, getRequire(scope, tree, id));
		return module.exports;
	};
	wmRequire = function (scope, tree, fullPath, id) {
		var name, path = fullPath, t = fullPath.charAt(0), state = 0;
		if (t === '/') {
			path = path.slice(1);
			scope = modules['/'];
			if (!scope) {
				if (envRequire) return envRequire(fullPath);
				throw notFoundError(fullPath);
			}
			id = '/';
			tree = [];
		} else if (t !== '.') {
			name = path.split('/', 1)[0];
			scope = modules[name];
			if (!scope) {
				if (envRequire) return envRequire(fullPath);
				throw notFoundError(fullPath);
			}
			id = name;
			tree = [];
			path = path.slice(name.length + 1);
			if (!path) {
				path = scope[':mainpath:'];
				if (path) {
					state = 1;
				} else {
					path = 'index';
					state = 2;
				}
			}
		}
		return resolve(scope, tree, path, fullPath, state, id);
	};
	getRequire = function (scope, tree, id) {
		return function (path) {
			return wmRequire(scope, [].concat(tree), path, id);
		};
	};
	return getRequire(modules, [], '');
})({
	"messenger-ui": {
		"src": {
			"scripts": {
				"components": {
					"component.es6": function (exports, module, require) {
						eval("\"use strict\";\n\nvar _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar $ = window.jQuery;\nvar eventSplitter = /^(\\S+)\\s*(.*)$/;\n\n/**\r\n * Abstract component class\r\n *\r\n * - use for creating own components with standartized API\r\n * - dependes on jQuery.on() for attaching listeners (can be replaced with Zepto, Gator, etc.)\r\n *\r\n * @abstract\r\n * @class\r\n * @module component\r\n *\r\n * @author Matěj Šimek <email@matejsimek.com> (http://www.matejsimek.com)\r\n */\n\nvar Component = (function () {\n\n\t/**\r\n  * @constructor\r\n  * @param {HTMLElement} element\r\n  * @param {object} data\r\n  */\n\n\tfunction Component(element) {\n\t\tvar data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];\n\n\t\t_classCallCheck(this, Component);\n\n\t\t/** @type {HTMLElement} */\n\t\tthis.el = element;\n\t\t/** @type {jQuery} */\n\t\tthis.$el = $(element);\n\t\t/** @type {object|null} */\n\t\tthis.data = data;\n\n\t\tthis.attachListeners();\n\t}\n\n\t/**\r\n  * Component listeners\r\n  *\r\n  * Format:\r\n  * \t- \"type\": \"handlerName\"\r\n  * \t- \"type<space>.selector\": \"handlerName\"\r\n  *\r\n  * @param {Component~eventHandler} event handler which is a component method\r\n  */\n\n\t_createClass(Component, [{\n\t\tkey: \"attachListeners\",\n\n\t\t// 'click .example-child': 'handleClick'\n\n\t\t/**\r\n   * Assign event handlers from this.listeners property\r\n   */\n\t\tvalue: function attachListeners() {\n\t\t\tvar _this = this;\n\n\t\t\tvar self = this;\n\t\t\tvar listeners = this.listeners;\n\n\t\t\tvar _loop = function (_event) {\n\t\t\t\tvar type = _event.trim();\n\t\t\t\tvar selector = false;\n\t\t\t\tvar callback = _this[listeners[_event]];\n\n\t\t\t\tvar split = _event.match(eventSplitter);\n\t\t\t\tif (split) {\n\t\t\t\t\ttype = split[1];\n\t\t\t\t\tselector = split[2];\n\t\t\t\t}\n\n\t\t\t\t/**\r\n     * Handler called when an event occured\r\n     *\r\n     * @callback Component~eventHandler\r\n     * @param {object} event - an event object\r\n     * @param {Component} self - current instance\r\n     * @param {Object} data - optional data passed with event\r\n     * @this {Element} - an element that caught the event\r\n     */\n\t\t\t\tvar listener = function listener(e, data) {\n\t\t\t\t\tcallback.call(this, e, self, data);\n\t\t\t\t};\n\n\t\t\t\tif (selector) {\n\t\t\t\t\t_this.$el.on(type, selector, listener);\n\t\t\t\t} else {\n\t\t\t\t\t_this.$el.on(type, listener);\n\t\t\t\t}\n\t\t\t};\n\n\t\t\tfor (var _event in listeners) {\n\t\t\t\t_loop(_event);\n\t\t\t}\n\t\t}\n\n\t\t/**\r\n   * Remove event listeners\r\n   */\n\t}, {\n\t\tkey: \"detachListeners\",\n\t\tvalue: function detachListeners() {\n\t\t\tthis.$el.off();\n\t\t}\n\n\t\t/**\r\n   * Gracefully destroy current instance properties\r\n   */\n\t}, {\n\t\tkey: \"destroy\",\n\t\tvalue: function destroy() {\n\t\t\tthis.detachListeners();\n\n\t\t\tfor (var prop in this) {\n\t\t\t\tthis[prop] = null;\n\t\t\t}\n\t\t}\n\n\t\t/**\r\n   * Returns a child\r\n   * @param  {string} CSS selector\r\n   * @return {jQuery|null}\r\n   */\n\t}, {\n\t\tkey: \"child\",\n\t\tvalue: function child(selector) {\n\t\t\tvar result = this.$el.find(selector);\n\t\t\tif (!result.length) return null;else return result.eq(0);\n\t\t}\n\t}, {\n\t\tkey: \"listeners\",\n\t\tget: function get() {\n\t\t\treturn {};\n\t\t}\n\t}]);\n\n\treturn Component;\n})();\n\nmodule.exports = Component;//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3Nlbmdlci11aS9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2NvbXBvbmVudC5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQTtBQUNyQixJQUFJLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7O0lBYzlCLFNBQVM7Ozs7Ozs7O0FBT0gsVUFQTixTQUFTLENBT0YsT0FBTyxFQUFhO01BQVgsSUFBSSx5REFBRyxFQUFFOzt3QkFQekIsU0FBUzs7O0FBU2IsTUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUE7O0FBRWpCLE1BQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBOztBQUVyQixNQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTs7QUFFaEIsTUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO0VBQ3RCOzs7Ozs7Ozs7Ozs7Y0FoQkksU0FBUzs7Ozs7Ozs7U0FvQ0MsMkJBQUc7OztBQUNqQixPQUFJLElBQUksR0FBRyxJQUFJLENBQUE7QUFDZixPQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFBOzt5QkFFdEIsTUFBSztBQUNaLFFBQUksSUFBSSxHQUFHLE1BQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQTtBQUN2QixRQUFJLFFBQVEsR0FBRyxLQUFLLENBQUE7QUFDcEIsUUFBSSxRQUFRLEdBQUcsTUFBSyxTQUFTLENBQUMsTUFBSyxDQUFDLENBQUMsQ0FBQTs7QUFFckMsUUFBSSxLQUFLLEdBQUcsTUFBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUN0QyxRQUFHLEtBQUssRUFBRTtBQUNULFNBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDZixhQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ25COzs7Ozs7Ozs7OztBQVdELFFBQUksUUFBUSxHQUFHLFNBQVgsUUFBUSxDQUFZLENBQUMsRUFBRSxJQUFJLEVBQUU7QUFDaEMsYUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtLQUNsQyxDQUFBOztBQUVELFFBQUcsUUFBUSxFQUFDO0FBQ1gsV0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7S0FDckMsTUFBTTtBQUNOLFdBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7S0FDM0I7OztBQTVCRixRQUFJLElBQUksTUFBSyxJQUFJLFNBQVMsRUFBRTtVQUFwQixNQUFLO0lBNkJaO0dBQ0Q7Ozs7Ozs7U0FLYywyQkFBRztBQUNqQixPQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFBO0dBQ2Q7Ozs7Ozs7U0FLTSxtQkFBRztBQUNULE9BQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTs7QUFFdEIsUUFBSyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFDdEIsUUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQTtJQUNqQjtHQUNEOzs7Ozs7Ozs7U0FPSSxlQUFDLFFBQVEsRUFBRTtBQUNmLE9BQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ3BDLE9BQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sSUFBSSxDQUFBLEtBQ3pCLE9BQU8sTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtHQUN4Qjs7O09BeEVZLGVBQUc7QUFDZixVQUFPLEVBRU4sQ0FBQTtHQUNEOzs7UUEvQkksU0FBUzs7O0FBdUdmLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFBIiwiZmlsZSI6Im1lc3Nlbmdlci11aS9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2NvbXBvbmVudC5lczYiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgJCA9IHdpbmRvdy5qUXVlcnlcclxudmFyIGV2ZW50U3BsaXR0ZXIgPSAvXihcXFMrKVxccyooLiopJC9cclxuXHJcbi8qKlxyXG4gKiBBYnN0cmFjdCBjb21wb25lbnQgY2xhc3NcclxuICpcclxuICogLSB1c2UgZm9yIGNyZWF0aW5nIG93biBjb21wb25lbnRzIHdpdGggc3RhbmRhcnRpemVkIEFQSVxyXG4gKiAtIGRlcGVuZGVzIG9uIGpRdWVyeS5vbigpIGZvciBhdHRhY2hpbmcgbGlzdGVuZXJzIChjYW4gYmUgcmVwbGFjZWQgd2l0aCBaZXB0bywgR2F0b3IsIGV0Yy4pXHJcbiAqXHJcbiAqIEBhYnN0cmFjdFxyXG4gKiBAY2xhc3NcclxuICogQG1vZHVsZSBjb21wb25lbnRcclxuICpcclxuICogQGF1dGhvciBNYXTEm2ogxaBpbWVrIDxlbWFpbEBtYXRlanNpbWVrLmNvbT4gKGh0dHA6Ly93d3cubWF0ZWpzaW1lay5jb20pXHJcbiAqL1xyXG5jbGFzcyBDb21wb25lbnQge1xyXG5cclxuXHQvKipcclxuXHQgKiBAY29uc3RydWN0b3JcclxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcblx0ICogQHBhcmFtIHtvYmplY3R9IGRhdGFcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihlbGVtZW50LCBkYXRhID0ge30pIHtcclxuXHRcdC8qKiBAdHlwZSB7SFRNTEVsZW1lbnR9ICovXHJcblx0XHR0aGlzLmVsID0gZWxlbWVudFxyXG5cdFx0LyoqIEB0eXBlIHtqUXVlcnl9ICovXHJcblx0XHR0aGlzLiRlbCA9ICQoZWxlbWVudClcclxuXHRcdC8qKiBAdHlwZSB7b2JqZWN0fG51bGx9ICovXHJcblx0XHR0aGlzLmRhdGEgPSBkYXRhXHJcblxyXG5cdFx0dGhpcy5hdHRhY2hMaXN0ZW5lcnMoKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29tcG9uZW50IGxpc3RlbmVyc1xyXG5cdCAqXHJcblx0ICogRm9ybWF0OlxyXG5cdCAqIFx0LSBcInR5cGVcIjogXCJoYW5kbGVyTmFtZVwiXHJcblx0ICogXHQtIFwidHlwZTxzcGFjZT4uc2VsZWN0b3JcIjogXCJoYW5kbGVyTmFtZVwiXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge0NvbXBvbmVudH5ldmVudEhhbmRsZXJ9IGV2ZW50IGhhbmRsZXIgd2hpY2ggaXMgYSBjb21wb25lbnQgbWV0aG9kXHJcblx0ICovXHJcblx0Z2V0IGxpc3RlbmVycygpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdC8vICdjbGljayAuZXhhbXBsZS1jaGlsZCc6ICdoYW5kbGVDbGljaydcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFzc2lnbiBldmVudCBoYW5kbGVycyBmcm9tIHRoaXMubGlzdGVuZXJzIHByb3BlcnR5XHJcblx0ICovXHJcblx0YXR0YWNoTGlzdGVuZXJzKCkge1xyXG5cdFx0bGV0IHNlbGYgPSB0aGlzXHJcblx0XHRsZXQgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNcclxuXHJcblx0XHRmb3IobGV0IGV2ZW50IGluIGxpc3RlbmVycykge1xyXG5cdFx0XHRsZXQgdHlwZSA9IGV2ZW50LnRyaW0oKVxyXG5cdFx0XHRsZXQgc2VsZWN0b3IgPSBmYWxzZVxyXG5cdFx0XHRsZXQgY2FsbGJhY2sgPSB0aGlzW2xpc3RlbmVyc1tldmVudF1dXHJcblxyXG5cdFx0XHRsZXQgc3BsaXQgPSBldmVudC5tYXRjaChldmVudFNwbGl0dGVyKVxyXG5cdFx0XHRpZihzcGxpdCkge1xyXG5cdFx0XHRcdHR5cGUgPSBzcGxpdFsxXVxyXG5cdFx0XHRcdHNlbGVjdG9yID0gc3BsaXRbMl1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LyoqXHJcblx0XHRcdCAqIEhhbmRsZXIgY2FsbGVkIHdoZW4gYW4gZXZlbnQgb2NjdXJlZFxyXG5cdFx0XHQgKlxyXG5cdFx0XHQgKiBAY2FsbGJhY2sgQ29tcG9uZW50fmV2ZW50SGFuZGxlclxyXG5cdFx0XHQgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBhbiBldmVudCBvYmplY3RcclxuXHRcdFx0ICogQHBhcmFtIHtDb21wb25lbnR9IHNlbGYgLSBjdXJyZW50IGluc3RhbmNlXHJcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gb3B0aW9uYWwgZGF0YSBwYXNzZWQgd2l0aCBldmVudFxyXG5cdFx0XHQgKiBAdGhpcyB7RWxlbWVudH0gLSBhbiBlbGVtZW50IHRoYXQgY2F1Z2h0IHRoZSBldmVudFxyXG5cdFx0XHQgKi9cclxuXHRcdFx0bGV0IGxpc3RlbmVyID0gZnVuY3Rpb24oZSwgZGF0YSkge1xyXG5cdFx0XHRcdGNhbGxiYWNrLmNhbGwodGhpcywgZSwgc2VsZiwgZGF0YSlcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYoc2VsZWN0b3Ipe1xyXG5cdFx0XHRcdHRoaXMuJGVsLm9uKHR5cGUsIHNlbGVjdG9yLCBsaXN0ZW5lcilcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLiRlbC5vbih0eXBlLCBsaXN0ZW5lcilcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlIGV2ZW50IGxpc3RlbmVyc1xyXG5cdCAqL1xyXG5cdGRldGFjaExpc3RlbmVycygpIHtcclxuXHRcdHRoaXMuJGVsLm9mZigpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHcmFjZWZ1bGx5IGRlc3Ryb3kgY3VycmVudCBpbnN0YW5jZSBwcm9wZXJ0aWVzXHJcblx0ICovXHJcblx0ZGVzdHJveSgpIHtcclxuXHRcdHRoaXMuZGV0YWNoTGlzdGVuZXJzKClcclxuXHJcblx0XHRmb3IgKGxldCBwcm9wIGluIHRoaXMpIHtcclxuXHRcdFx0dGhpc1twcm9wXSA9IG51bGxcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSBjaGlsZFxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gQ1NTIHNlbGVjdG9yXHJcblx0ICogQHJldHVybiB7alF1ZXJ5fG51bGx9XHJcblx0ICovXHJcblx0Y2hpbGQoc2VsZWN0b3IpIHtcclxuXHRcdHZhciByZXN1bHQgPSB0aGlzLiRlbC5maW5kKHNlbGVjdG9yKVxyXG5cdFx0aWYoIXJlc3VsdC5sZW5ndGgpIHJldHVybiBudWxsXHJcblx0XHRlbHNlIHJldHVybiByZXN1bHQuZXEoMClcclxuXHR9XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudFxyXG4iXX0=\n//# sourceURL=messenger-ui/src/scripts/components/component.js");
					},
					"example.es6": function (exports, module, require) {
						eval("'use strict';\n\nvar _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();\n\nvar _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Component = require('./component');\n\n/**\r\n * Example component class\r\n *\r\n * - all DOM operations must be executed after creating an instance (in constructor)\r\n * - when defining own constructor, don't forget to call super(element, data)\r\n * - DOM event listeners are in Backbone style\r\n *\r\n */\n\nvar Example = (function (_Component) {\n\t_inherits(Example, _Component);\n\n\tfunction Example() {\n\t\t_classCallCheck(this, Example);\n\n\t\t_get(Object.getPrototypeOf(Example.prototype), 'constructor', this).apply(this, arguments);\n\t}\n\n\t_createClass(Example, [{\n\t\tkey: 'handleClick',\n\t\tvalue: function handleClick(e, self) {\n\t\t\te.preventDefault();\n\t\t\talert(self.data);\n\t\t}\n\t}, {\n\t\tkey: 'listeners',\n\t\tget: function get() {\n\t\t\treturn {\n\t\t\t\t'click .example-child': 'handleClick'\n\t\t\t};\n\t\t}\n\t}]);\n\n\treturn Example;\n})(Component);\n\nmodule.exports = Example;//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3Nlbmdlci11aS9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2V4YW1wbGUuZXM2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUE7Ozs7Ozs7Ozs7O0lBVWhDLE9BQU87V0FBUCxPQUFPOztVQUFQLE9BQU87d0JBQVAsT0FBTzs7NkJBQVAsT0FBTzs7O2NBQVAsT0FBTzs7U0FRRCxxQkFBQyxDQUFDLEVBQUUsSUFBSSxFQUFFO0FBQ3BCLElBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQTtBQUNsQixRQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0dBQ2hCOzs7T0FUWSxlQUFHO0FBQ2YsVUFBTztBQUNOLDBCQUFzQixFQUFFLGFBQWE7SUFDckMsQ0FBQTtHQUNEOzs7UUFOSSxPQUFPO0dBQVMsU0FBUzs7QUFlL0IsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUEiLCJmaWxlIjoibWVzc2VuZ2VyLXVpL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvZXhhbXBsZS5lczYiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9jb21wb25lbnQnKVxyXG5cclxuLyoqXHJcbiAqIEV4YW1wbGUgY29tcG9uZW50IGNsYXNzXHJcbiAqXHJcbiAqIC0gYWxsIERPTSBvcGVyYXRpb25zIG11c3QgYmUgZXhlY3V0ZWQgYWZ0ZXIgY3JlYXRpbmcgYW4gaW5zdGFuY2UgKGluIGNvbnN0cnVjdG9yKVxyXG4gKiAtIHdoZW4gZGVmaW5pbmcgb3duIGNvbnN0cnVjdG9yLCBkb24ndCBmb3JnZXQgdG8gY2FsbCBzdXBlcihlbGVtZW50LCBkYXRhKVxyXG4gKiAtIERPTSBldmVudCBsaXN0ZW5lcnMgYXJlIGluIEJhY2tib25lIHN0eWxlXHJcbiAqXHJcbiAqL1xyXG5jbGFzcyBFeGFtcGxlIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcblx0Z2V0IGxpc3RlbmVycygpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdCdjbGljayAuZXhhbXBsZS1jaGlsZCc6ICdoYW5kbGVDbGljaydcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGhhbmRsZUNsaWNrKGUsIHNlbGYpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKVxyXG5cdFx0YWxlcnQoc2VsZi5kYXRhKVxyXG5cdH1cclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRXhhbXBsZSJdfQ==\n//# sourceURL=messenger-ui/src/scripts/components/example.js");
					},
					"shapes.es6": function (exports, module, require) {
						eval("\"use strict\";\n\nvar _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();\n\nvar _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Component = require('./component');\nvar $ = window.jQuery;\n\n/**\r\n * Shapes component class\r\n *\r\n * - injects SVG sprite into body\r\n */\n\nvar Shapes = (function (_Component) {\n\t_inherits(Shapes, _Component);\n\n\t/**\r\n  * @param {HTMLElement} element\r\n  * @param {Object} data\r\n  */\n\n\tfunction Shapes(element, data) {\n\t\t_classCallCheck(this, Shapes);\n\n\t\t_get(Object.getPrototypeOf(Shapes.prototype), \"constructor\", this).call(this, element, data);\n\n\t\tthis.supportsSVG = document.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\");\n\t\tif (this.supportsSVG) this.injectSprite();\n\t}\n\n\t_createClass(Shapes, [{\n\t\tkey: \"injectSprite\",\n\t\tvalue: function injectSprite() {\n\t\t\tvar _this = this;\n\n\t\t\t$.get(this.data.url, function (response, status) {\n\t\t\t\tif (status == 'success') {\n\t\t\t\t\t$(document.body).prepend(response);\n\t\t\t\t} else {\n\t\t\t\t\t_this.injectSprite();\n\t\t\t\t}\n\t\t\t}, 'text');\n\t\t}\n\t}]);\n\n\treturn Shapes;\n})(Component);\n\nmodule.exports = Shapes;//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3Nlbmdlci11aS9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3NoYXBlcy5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUN0QyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBOzs7Ozs7OztJQU9mLE1BQU07V0FBTixNQUFNOzs7Ozs7O0FBTUEsVUFOTixNQUFNLENBTUMsT0FBTyxFQUFFLElBQUksRUFBRTt3QkFOdEIsTUFBTTs7QUFPViw2QkFQSSxNQUFNLDZDQU9KLE9BQU8sRUFBRSxJQUFJLEVBQUM7O0FBRXBCLE1BQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsbURBQW1ELEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDakgsTUFBRyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtFQUN4Qzs7Y0FYSSxNQUFNOztTQWFDLHdCQUFHOzs7QUFDZCxJQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBSztBQUMxQyxRQUFHLE1BQU0sSUFBSSxTQUFTLEVBQUU7QUFDdkIsTUFBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDbEMsTUFBTTtBQUNOLFdBQUssWUFBWSxFQUFFLENBQUE7S0FDbkI7SUFDRCxFQUFFLE1BQU0sQ0FBQyxDQUFBO0dBQ1Y7OztRQXJCSSxNQUFNO0dBQVMsU0FBUzs7QUEwQjlCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFBIiwiZmlsZSI6Im1lc3Nlbmdlci11aS9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3NoYXBlcy5lczYiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9jb21wb25lbnQnKVxyXG52YXIgJCA9IHdpbmRvdy5qUXVlcnlcclxuXHJcbi8qKlxyXG4gKiBTaGFwZXMgY29tcG9uZW50IGNsYXNzXHJcbiAqXHJcbiAqIC0gaW5qZWN0cyBTVkcgc3ByaXRlIGludG8gYm9keVxyXG4gKi9cclxuY2xhc3MgU2hhcGVzIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoZWxlbWVudCwgZGF0YSkge1xyXG5cdFx0c3VwZXIoZWxlbWVudCwgZGF0YSlcclxuXHJcblx0XHR0aGlzLnN1cHBvcnRzU1ZHID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uaGFzRmVhdHVyZShcImh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjQmFzaWNTdHJ1Y3R1cmVcIiwgXCIxLjFcIilcclxuXHRcdGlmKHRoaXMuc3VwcG9ydHNTVkcpIHRoaXMuaW5qZWN0U3ByaXRlKClcclxuXHR9XHJcblxyXG5cdGluamVjdFNwcml0ZSgpIHtcclxuXHRcdCQuZ2V0KHRoaXMuZGF0YS51cmwsIChyZXNwb25zZSwgc3RhdHVzKSA9PiB7XHJcblx0XHRcdGlmKHN0YXR1cyA9PSAnc3VjY2VzcycpIHtcclxuXHRcdFx0XHQkKGRvY3VtZW50LmJvZHkpLnByZXBlbmQocmVzcG9uc2UpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5pbmplY3RTcHJpdGUoKVxyXG5cdFx0XHR9XHJcblx0XHR9LCAndGV4dCcpXHJcblx0fVxyXG5cclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2hhcGVzXHJcbiJdfQ==\n//# sourceURL=messenger-ui/src/scripts/components/shapes.js");
					}
				},
				"index.es6": function (exports, module, require) {
					eval("//\n// Main project bundle\n//\n\n// Dependencies\n//\n'use strict';\n\nrequire('./plugins');\n\nif (true) console.log('Initializing components...');\nif (true) console.time('Components initialization');\n\n//\n// Lazy components initialization from initComponents queue\n//\n// Components declarations\nvar components = {\n\t'example': require('./components/example'),\n\t'shapes': require('./components/shapes')\n};\nvar instances = [];\n\n// Init function\nvar init = function init(component) {\n\tif (component.name in components) {\n\t\tif (true) console.time('\\tcomponent: ' + component.name);\n\n\t\tvar Component = components[component.name]; // class\n\t\tvar placement = typeof component.place == 'string' ? document.querySelector(component.place) : component.place; // DOM element\n\t\tvar instance = new Component(placement, component.data || {}); // new instance\n\n\t\tinstances.push(instance);\n\n\t\tif (true) console.timeEnd('\\tcomponent: ' + component.name);\n\t} else {\n\t\tif (true) console.warn('Component with name ' + component.name + ' was not found!');\n\t}\n};\n// Instance only required components\ninitComponents.map(init);\n\n// Allow lazy init of components after page load\ninitComponents = {\n\tpush: init\n};\n\nif (true) console.timeEnd('Components initialization');\nif (true) console.log('Instances', instances);\n\n//\n// Print timing data on page load\n//\nif (true) {\n\t(function () {\n\t\tvar printPerfStats = function printPerfStats() {\n\t\t\tvar timing = window.performance.timing;\n\t\t\tconsole.log('Performance:\\n' + '\\tdns: \\t\\t' + (timing.domainLookupEnd - timing.domainLookupStart) + 'ms\\n' + '\\tconnect: \\t' + (timing.connectEnd - timing.connectStart) + 'ms\\n' + '\\tttfb: \\t\\t' + (timing.responseStart - timing.connectEnd) + 'ms\\n' + '\\tbasePage: \\t' + (timing.responseEnd - timing.responseStart) + 'ms\\n' + '\\tfrontEnd: \\t' + (timing.loadEventStart - timing.responseEnd) + 'ms\\n');\n\t\t};\n\n\t\twindow.addEventListener('load', function () {\n\t\t\treturn setTimeout(printPerfStats, 1000);\n\t\t});\n\t})();\n}//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3Nlbmdlci11aS9zcmMvc2NyaXB0cy9pbmRleC5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFNQSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7O0FBR3BCLElBQUcsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtBQUNuRCxJQUFHLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUE7Ozs7OztBQU1uRCxJQUFJLFVBQVUsR0FBRztBQUNoQixVQUFTLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixDQUFDO0FBQzFDLFNBQVEsRUFBRSxPQUFPLENBQUMscUJBQXFCLENBQUM7Q0FDeEMsQ0FBQTtBQUNELElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQTs7O0FBR2xCLElBQUksSUFBSSxHQUFHLFNBQVAsSUFBSSxDQUFJLFNBQVMsRUFBSztBQUN6QixLQUFHLFNBQVMsQ0FBQyxJQUFJLElBQUksVUFBVSxFQUFDO0FBQy9CLE1BQUcsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTs7QUFFeEQsTUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUMxQyxNQUFJLFNBQVMsR0FBRyxBQUFDLE9BQU8sU0FBUyxDQUFDLEtBQUssSUFBSSxRQUFRLEdBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQTtBQUNoSCxNQUFJLFFBQVEsR0FBRyxJQUFJLFNBQVMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQTs7QUFFN0QsV0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTs7QUFFeEIsTUFBRyxLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0VBQzNELE1BQU07QUFDTixNQUFHLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFNBQVMsQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsQ0FBQTtFQUNuRjtDQUNELENBQUE7O0FBRUQsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTs7O0FBR3hCLGNBQWMsR0FBRztBQUNoQixLQUFJLEVBQUUsSUFBSTtDQUNWLENBQUE7O0FBRUQsSUFBRyxLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO0FBQ3RELElBQUcsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFBOzs7OztBQUs3QyxJQUFHLEtBQUssRUFBRTs7TUFDQSxjQUFjLEdBQXZCLFNBQVMsY0FBYyxHQUFHO0FBQ3pCLE9BQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFBO0FBQ3RDLFVBQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQzNCLGFBQWEsSUFBSSxNQUFNLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQSxBQUFDLEdBQUcsTUFBTSxHQUM1RSxlQUFlLElBQUksTUFBTSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFBLEFBQUMsR0FBRyxNQUFNLEdBQ3BFLGNBQWMsSUFBSSxNQUFNLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUEsQUFBQyxHQUFHLE1BQU0sR0FDcEUsZ0JBQWdCLElBQUksTUFBTSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFBLEFBQUMsR0FBRyxNQUFNLEdBQ3ZFLGdCQUFnQixJQUFJLE1BQU0sQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQSxBQUFDLEdBQUcsTUFBTSxDQUN4RSxDQUFBO0dBQ0Q7O0FBQ0QsUUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtVQUFNLFVBQVUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDO0dBQUEsQ0FBQyxDQUFBOztDQUN2RSIsImZpbGUiOiJtZXNzZW5nZXItdWkvc3JjL3NjcmlwdHMvaW5kZXguZXM2Iiwic291cmNlc0NvbnRlbnQiOlsiLy9cclxuLy8gTWFpbiBwcm9qZWN0IGJ1bmRsZVxyXG4vL1xyXG5cclxuLy8gRGVwZW5kZW5jaWVzXHJcbi8vXHJcbnJlcXVpcmUoJy4vcGx1Z2lucycpXHJcblxyXG5cclxuaWYoREVCVUcpIGNvbnNvbGUubG9nKCdJbml0aWFsaXppbmcgY29tcG9uZW50cy4uLicpXHJcbmlmKERFQlVHKSBjb25zb2xlLnRpbWUoJ0NvbXBvbmVudHMgaW5pdGlhbGl6YXRpb24nKVxyXG5cclxuLy9cclxuLy8gTGF6eSBjb21wb25lbnRzIGluaXRpYWxpemF0aW9uIGZyb20gaW5pdENvbXBvbmVudHMgcXVldWVcclxuLy9cclxuLy8gQ29tcG9uZW50cyBkZWNsYXJhdGlvbnNcclxudmFyIGNvbXBvbmVudHMgPSB7XHJcblx0J2V4YW1wbGUnOiByZXF1aXJlKCcuL2NvbXBvbmVudHMvZXhhbXBsZScpLFxyXG5cdCdzaGFwZXMnOiByZXF1aXJlKCcuL2NvbXBvbmVudHMvc2hhcGVzJylcclxufVxyXG52YXIgaW5zdGFuY2VzID0gW11cclxuXHJcbi8vIEluaXQgZnVuY3Rpb25cclxudmFyIGluaXQgPSAoY29tcG9uZW50KSA9PiB7XHJcblx0aWYoY29tcG9uZW50Lm5hbWUgaW4gY29tcG9uZW50cyl7XHJcblx0XHRpZihERUJVRykgY29uc29sZS50aW1lKCdcXHRjb21wb25lbnQ6ICcgKyBjb21wb25lbnQubmFtZSlcclxuXHJcblx0XHR2YXIgQ29tcG9uZW50ID0gY29tcG9uZW50c1tjb21wb25lbnQubmFtZV0gLy8gY2xhc3NcclxuXHRcdHZhciBwbGFjZW1lbnQgPSAodHlwZW9mIGNvbXBvbmVudC5wbGFjZSA9PSAnc3RyaW5nJykgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbXBvbmVudC5wbGFjZSkgOiBjb21wb25lbnQucGxhY2UgLy8gRE9NIGVsZW1lbnRcclxuXHRcdHZhciBpbnN0YW5jZSA9IG5ldyBDb21wb25lbnQocGxhY2VtZW50LCBjb21wb25lbnQuZGF0YSB8fCB7fSkgLy8gbmV3IGluc3RhbmNlXHJcblxyXG5cdFx0aW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpXHJcblxyXG5cdFx0aWYoREVCVUcpIGNvbnNvbGUudGltZUVuZCgnXFx0Y29tcG9uZW50OiAnICsgY29tcG9uZW50Lm5hbWUpXHJcblx0fSBlbHNlIHtcclxuXHRcdGlmKERFQlVHKSBjb25zb2xlLndhcm4oJ0NvbXBvbmVudCB3aXRoIG5hbWUgJyArIGNvbXBvbmVudC5uYW1lICsgJyB3YXMgbm90IGZvdW5kIScpXHJcblx0fVxyXG59XHJcbi8vIEluc3RhbmNlIG9ubHkgcmVxdWlyZWQgY29tcG9uZW50c1xyXG5pbml0Q29tcG9uZW50cy5tYXAoaW5pdClcclxuXHJcbi8vIEFsbG93IGxhenkgaW5pdCBvZiBjb21wb25lbnRzIGFmdGVyIHBhZ2UgbG9hZFxyXG5pbml0Q29tcG9uZW50cyA9IHtcclxuXHRwdXNoOiBpbml0XHJcbn1cclxuXHJcbmlmKERFQlVHKSBjb25zb2xlLnRpbWVFbmQoJ0NvbXBvbmVudHMgaW5pdGlhbGl6YXRpb24nKVxyXG5pZihERUJVRykgY29uc29sZS5sb2coJ0luc3RhbmNlcycsIGluc3RhbmNlcylcclxuXHJcbi8vXHJcbi8vIFByaW50IHRpbWluZyBkYXRhIG9uIHBhZ2UgbG9hZFxyXG4vL1xyXG5pZihERUJVRykge1xyXG5cdGZ1bmN0aW9uIHByaW50UGVyZlN0YXRzKCkge1xyXG5cdFx0dmFyIHRpbWluZyA9IHdpbmRvdy5wZXJmb3JtYW5jZS50aW1pbmdcclxuXHRcdGNvbnNvbGUubG9nKCdQZXJmb3JtYW5jZTpcXG4nICtcclxuXHRcdFx0J1xcdGRuczogXFx0XFx0JyArICh0aW1pbmcuZG9tYWluTG9va3VwRW5kIC0gdGltaW5nLmRvbWFpbkxvb2t1cFN0YXJ0KSArICdtc1xcbicgK1xyXG5cdFx0XHQnXFx0Y29ubmVjdDogXFx0JyArICh0aW1pbmcuY29ubmVjdEVuZCAtIHRpbWluZy5jb25uZWN0U3RhcnQpICsgJ21zXFxuJyArXHJcblx0XHRcdCdcXHR0dGZiOiBcXHRcXHQnICsgKHRpbWluZy5yZXNwb25zZVN0YXJ0IC0gdGltaW5nLmNvbm5lY3RFbmQpICsgJ21zXFxuJyArXHJcblx0XHRcdCdcXHRiYXNlUGFnZTogXFx0JyArICh0aW1pbmcucmVzcG9uc2VFbmQgLSB0aW1pbmcucmVzcG9uc2VTdGFydCkgKyAnbXNcXG4nICtcclxuXHRcdFx0J1xcdGZyb250RW5kOiBcXHQnICsgKHRpbWluZy5sb2FkRXZlbnRTdGFydCAtIHRpbWluZy5yZXNwb25zZUVuZCkgKyAnbXNcXG4nXHJcblx0XHQpXHJcblx0fVxyXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4gc2V0VGltZW91dChwcmludFBlcmZTdGF0cywgMTAwMCkpXHJcbn1cclxuIl19\n//# sourceURL=messenger-ui/src/scripts/index.js");
				},
				"plugins.js": function (exports, module, require) {
					eval("// \r\n// Tiny project dependencies like polyfills and environment setup\r\n//\r\n\r\n\r\n// Avoid `console` errors in browsers that lack a console.\r\n//\r\n;(function() {\r\n\tvar method\r\n\tvar noop = function () {}\r\n\tvar methods = [\r\n\t\t'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',\r\n\t\t'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',\r\n\t\t'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',\r\n\t\t'timeStamp', 'trace', 'warn'\r\n\t]\r\n\tvar length = methods.length\r\n\tvar console = (window.console = window.console || {})\r\n\r\n\twhile (length--) {\r\n\t\tmethod = methods[length]\r\n\t\t// Only stub undefined methods.\r\n\t\tif (!console[method]) {\r\n\t\t\tconsole[method] = noop\r\n\t\t}\r\n\t}\r\n})();\n//# sourceURL=messenger-ui/src/scripts/plugins.js");
				}
			}
		}
	}
})("messenger-ui/src/scripts/index");

//# sourceMappingURL=index.js.map
