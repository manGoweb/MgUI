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
	"mgui": {
		"src": {
			"scripts": {
				"components": {
					"component.es6": function (exports, module, require) {
						eval("\"use strict\";\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar $ = window.jQuery;\nvar eventSplitter = /^(\\S+)\\s*(.*)$/;\n\n/**\r\n * Abstract component class\r\n *\r\n * - use for creating own components with standartized API\r\n * - dependes on jQuery.on() for attaching listeners (can be replaced with Zepto, Gator, etc.)\r\n *\r\n * @abstract\r\n * @class\r\n * @module component\r\n *\r\n * @author Matěj Šimek <email@matejsimek.com> (http://www.matejsimek.com)\r\n */\n\nvar Component = function () {\n\n\t/**\r\n  * @constructor\r\n  * @param {HTMLElement} element\r\n  * @param {object} data\r\n  */\n\tfunction Component(element) {\n\t\tvar data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n\t\t_classCallCheck(this, Component);\n\n\t\t/** @type {HTMLElement} */\n\t\tthis.el = element;\n\t\t/** @type {jQuery} */\n\t\tthis.$el = $(element);\n\t\t/** @type {object|null} */\n\t\tthis.data = data;\n\n\t\tthis.attachListeners();\n\t}\n\n\t/**\r\n  * Component listeners\r\n  *\r\n  * Format:\r\n  * \t- \"type\": \"handlerName\"\r\n  * \t- \"type<space>.selector\": \"handlerName\"\r\n  *\r\n  * @param {Component~eventHandler} event handler which is a component method\r\n  */\n\n\n\t_createClass(Component, [{\n\t\tkey: \"attachListeners\",\n\n\n\t\t/**\r\n   * Assign event handlers from this.listeners property\r\n   */\n\t\tvalue: function attachListeners() {\n\t\t\tvar _this = this;\n\n\t\t\tvar self = this;\n\t\t\tvar listeners = this.listeners;\n\n\t\t\tvar _loop = function _loop(event) {\n\t\t\t\tvar type = event.trim();\n\t\t\t\tvar selector = false;\n\t\t\t\tvar callback = _this[listeners[event]];\n\n\t\t\t\tvar split = event.match(eventSplitter);\n\t\t\t\tif (split) {\n\t\t\t\t\ttype = split[1];\n\t\t\t\t\tselector = split[2];\n\t\t\t\t}\n\n\t\t\t\t/**\r\n     * Handler called when an event occured\r\n     *\r\n     * @callback Component~eventHandler\r\n     * @param {object} event - an event object\r\n     * @param {Component} self - current instance\r\n     * @param {Object} data - optional data passed with event\r\n     * @this {Element} - an element that caught the event\r\n     */\n\t\t\t\tvar listener = function listener(e, data) {\n\t\t\t\t\tcallback.call(this, e, self, data);\n\t\t\t\t};\n\n\t\t\t\tif (selector) {\n\t\t\t\t\t_this.$el.on(type, selector, listener);\n\t\t\t\t} else {\n\t\t\t\t\t_this.$el.on(type, listener);\n\t\t\t\t}\n\t\t\t};\n\n\t\t\tfor (var event in listeners) {\n\t\t\t\t_loop(event);\n\t\t\t}\n\t\t}\n\n\t\t/**\r\n   * Remove event listeners\r\n   */\n\n\t}, {\n\t\tkey: \"detachListeners\",\n\t\tvalue: function detachListeners() {\n\t\t\tthis.$el.off();\n\t\t}\n\n\t\t/**\r\n   * Gracefully destroy current instance properties\r\n   */\n\n\t}, {\n\t\tkey: \"destroy\",\n\t\tvalue: function destroy() {\n\t\t\tthis.detachListeners();\n\n\t\t\tfor (var prop in this) {\n\t\t\t\tthis[prop] = null;\n\t\t\t}\n\t\t}\n\n\t\t/**\r\n   * Returns a child\r\n   * @param  {string} CSS selector\r\n   * @return {jQuery|null}\r\n   */\n\n\t}, {\n\t\tkey: \"child\",\n\t\tvalue: function child(selector) {\n\t\t\tvar result = this.$el.find(selector);\n\t\t\tif (!result.length) return null;else return result.eq(0);\n\t\t}\n\t}, {\n\t\tkey: \"listeners\",\n\t\tget: function get() {\n\t\t\treturn {\n\t\t\t\t// 'click .example-child': 'handleClick'\n\t\t\t};\n\t\t}\n\t}]);\n\n\treturn Component;\n}();\n\nmodule.exports = Component;//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudC5lczYiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsImpRdWVyeSIsImV2ZW50U3BsaXR0ZXIiLCJDb21wb25lbnQiLCJlbGVtZW50IiwiZGF0YSIsImVsIiwiJGVsIiwiYXR0YWNoTGlzdGVuZXJzIiwic2VsZiIsImxpc3RlbmVycyIsImV2ZW50IiwidHlwZSIsInRyaW0iLCJzZWxlY3RvciIsImNhbGxiYWNrIiwic3BsaXQiLCJtYXRjaCIsImxpc3RlbmVyIiwiZSIsImNhbGwiLCJvbiIsIm9mZiIsImRldGFjaExpc3RlbmVycyIsInByb3AiLCJyZXN1bHQiLCJmaW5kIiwibGVuZ3RoIiwiZXEiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFJQSxJQUFJQyxPQUFPQyxNQUFmO0FBQ0EsSUFBSUMsZ0JBQWdCLGdCQUFwQjs7QUFFQTs7Ozs7Ozs7Ozs7OztJQVlNQyxTOztBQUVMOzs7OztBQUtBLG9CQUFZQyxPQUFaLEVBQWdDO0FBQUEsTUFBWEMsSUFBVyx1RUFBSixFQUFJOztBQUFBOztBQUMvQjtBQUNBLE9BQUtDLEVBQUwsR0FBVUYsT0FBVjtBQUNBO0FBQ0EsT0FBS0csR0FBTCxHQUFXUixFQUFFSyxPQUFGLENBQVg7QUFDQTtBQUNBLE9BQUtDLElBQUwsR0FBWUEsSUFBWjs7QUFFQSxPQUFLRyxlQUFMO0FBQ0E7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7OztBQWVBOzs7b0NBR2tCO0FBQUE7O0FBQ2pCLE9BQUlDLE9BQU8sSUFBWDtBQUNBLE9BQUlDLFlBQVksS0FBS0EsU0FBckI7O0FBRmlCLDhCQUlUQyxLQUpTO0FBS2hCLFFBQUlDLE9BQU9ELE1BQU1FLElBQU4sRUFBWDtBQUNBLFFBQUlDLFdBQVcsS0FBZjtBQUNBLFFBQUlDLFdBQVcsTUFBS0wsVUFBVUMsS0FBVixDQUFMLENBQWY7O0FBRUEsUUFBSUssUUFBUUwsTUFBTU0sS0FBTixDQUFZZixhQUFaLENBQVo7QUFDQSxRQUFHYyxLQUFILEVBQVU7QUFDVEosWUFBT0ksTUFBTSxDQUFOLENBQVA7QUFDQUYsZ0JBQVdFLE1BQU0sQ0FBTixDQUFYO0FBQ0E7O0FBRUQ7Ozs7Ozs7OztBQVNBLFFBQUlFLFdBQVcsU0FBWEEsUUFBVyxDQUFTQyxDQUFULEVBQVlkLElBQVosRUFBa0I7QUFDaENVLGNBQVNLLElBQVQsQ0FBYyxJQUFkLEVBQW9CRCxDQUFwQixFQUF1QlYsSUFBdkIsRUFBNkJKLElBQTdCO0FBQ0EsS0FGRDs7QUFJQSxRQUFHUyxRQUFILEVBQVk7QUFDWCxXQUFLUCxHQUFMLENBQVNjLEVBQVQsQ0FBWVQsSUFBWixFQUFrQkUsUUFBbEIsRUFBNEJJLFFBQTVCO0FBQ0EsS0FGRCxNQUVPO0FBQ04sV0FBS1gsR0FBTCxDQUFTYyxFQUFULENBQVlULElBQVosRUFBa0JNLFFBQWxCO0FBQ0E7QUFoQ2U7O0FBSWpCLFFBQUksSUFBSVAsS0FBUixJQUFpQkQsU0FBakIsRUFBNEI7QUFBQSxVQUFwQkMsS0FBb0I7QUE2QjNCO0FBQ0Q7O0FBRUQ7Ozs7OztvQ0FHa0I7QUFDakIsUUFBS0osR0FBTCxDQUFTZSxHQUFUO0FBQ0E7O0FBRUQ7Ozs7Ozs0QkFHVTtBQUNULFFBQUtDLGVBQUw7O0FBRUEsUUFBSyxJQUFJQyxJQUFULElBQWlCLElBQWpCLEVBQXVCO0FBQ3RCLFNBQUtBLElBQUwsSUFBYSxJQUFiO0FBQ0E7QUFDRDs7QUFFRDs7Ozs7Ozs7d0JBS01WLFEsRUFBVTtBQUNmLE9BQUlXLFNBQVMsS0FBS2xCLEdBQUwsQ0FBU21CLElBQVQsQ0FBY1osUUFBZCxDQUFiO0FBQ0EsT0FBRyxDQUFDVyxPQUFPRSxNQUFYLEVBQW1CLE9BQU8sSUFBUCxDQUFuQixLQUNLLE9BQU9GLE9BQU9HLEVBQVAsQ0FBVSxDQUFWLENBQVA7QUFDTDs7O3NCQXhFZTtBQUNmLFVBQU87QUFDTjtBQURNLElBQVA7QUFHQTs7Ozs7O0FBd0VGQyxPQUFPQyxPQUFQLEdBQWlCM0IsU0FBakIiLCJmaWxlIjoiY29tcG9uZW50LmVzNiIsInNvdXJjZXNDb250ZW50IjpbInZhciAkID0gd2luZG93LmpRdWVyeVxyXG52YXIgZXZlbnRTcGxpdHRlciA9IC9eKFxcUyspXFxzKiguKikkL1xyXG5cclxuLyoqXHJcbiAqIEFic3RyYWN0IGNvbXBvbmVudCBjbGFzc1xyXG4gKlxyXG4gKiAtIHVzZSBmb3IgY3JlYXRpbmcgb3duIGNvbXBvbmVudHMgd2l0aCBzdGFuZGFydGl6ZWQgQVBJXHJcbiAqIC0gZGVwZW5kZXMgb24galF1ZXJ5Lm9uKCkgZm9yIGF0dGFjaGluZyBsaXN0ZW5lcnMgKGNhbiBiZSByZXBsYWNlZCB3aXRoIFplcHRvLCBHYXRvciwgZXRjLilcclxuICpcclxuICogQGFic3RyYWN0XHJcbiAqIEBjbGFzc1xyXG4gKiBAbW9kdWxlIGNvbXBvbmVudFxyXG4gKlxyXG4gKiBAYXV0aG9yIE1hdMSbaiDFoGltZWsgPGVtYWlsQG1hdGVqc2ltZWsuY29tPiAoaHR0cDovL3d3dy5tYXRlanNpbWVrLmNvbSlcclxuICovXHJcbmNsYXNzIENvbXBvbmVudCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBjb25zdHJ1Y3RvclxyXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0ge29iamVjdH0gZGF0YVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQsIGRhdGEgPSB7fSkge1xyXG5cdFx0LyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi9cclxuXHRcdHRoaXMuZWwgPSBlbGVtZW50XHJcblx0XHQvKiogQHR5cGUge2pRdWVyeX0gKi9cclxuXHRcdHRoaXMuJGVsID0gJChlbGVtZW50KVxyXG5cdFx0LyoqIEB0eXBlIHtvYmplY3R8bnVsbH0gKi9cclxuXHRcdHRoaXMuZGF0YSA9IGRhdGFcclxuXHJcblx0XHR0aGlzLmF0dGFjaExpc3RlbmVycygpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb21wb25lbnQgbGlzdGVuZXJzXHJcblx0ICpcclxuXHQgKiBGb3JtYXQ6XHJcblx0ICogXHQtIFwidHlwZVwiOiBcImhhbmRsZXJOYW1lXCJcclxuXHQgKiBcdC0gXCJ0eXBlPHNwYWNlPi5zZWxlY3RvclwiOiBcImhhbmRsZXJOYW1lXCJcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Q29tcG9uZW50fmV2ZW50SGFuZGxlcn0gZXZlbnQgaGFuZGxlciB3aGljaCBpcyBhIGNvbXBvbmVudCBtZXRob2RcclxuXHQgKi9cclxuXHRnZXQgbGlzdGVuZXJzKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Ly8gJ2NsaWNrIC5leGFtcGxlLWNoaWxkJzogJ2hhbmRsZUNsaWNrJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQXNzaWduIGV2ZW50IGhhbmRsZXJzIGZyb20gdGhpcy5saXN0ZW5lcnMgcHJvcGVydHlcclxuXHQgKi9cclxuXHRhdHRhY2hMaXN0ZW5lcnMoKSB7XHJcblx0XHRsZXQgc2VsZiA9IHRoaXNcclxuXHRcdGxldCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1xyXG5cclxuXHRcdGZvcihsZXQgZXZlbnQgaW4gbGlzdGVuZXJzKSB7XHJcblx0XHRcdGxldCB0eXBlID0gZXZlbnQudHJpbSgpXHJcblx0XHRcdGxldCBzZWxlY3RvciA9IGZhbHNlXHJcblx0XHRcdGxldCBjYWxsYmFjayA9IHRoaXNbbGlzdGVuZXJzW2V2ZW50XV1cclxuXHJcblx0XHRcdGxldCBzcGxpdCA9IGV2ZW50Lm1hdGNoKGV2ZW50U3BsaXR0ZXIpXHJcblx0XHRcdGlmKHNwbGl0KSB7XHJcblx0XHRcdFx0dHlwZSA9IHNwbGl0WzFdXHJcblx0XHRcdFx0c2VsZWN0b3IgPSBzcGxpdFsyXVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvKipcclxuXHRcdFx0ICogSGFuZGxlciBjYWxsZWQgd2hlbiBhbiBldmVudCBvY2N1cmVkXHJcblx0XHRcdCAqXHJcblx0XHRcdCAqIEBjYWxsYmFjayBDb21wb25lbnR+ZXZlbnRIYW5kbGVyXHJcblx0XHRcdCAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIGFuIGV2ZW50IG9iamVjdFxyXG5cdFx0XHQgKiBAcGFyYW0ge0NvbXBvbmVudH0gc2VsZiAtIGN1cnJlbnQgaW5zdGFuY2VcclxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBvcHRpb25hbCBkYXRhIHBhc3NlZCB3aXRoIGV2ZW50XHJcblx0XHRcdCAqIEB0aGlzIHtFbGVtZW50fSAtIGFuIGVsZW1lbnQgdGhhdCBjYXVnaHQgdGhlIGV2ZW50XHJcblx0XHRcdCAqL1xyXG5cdFx0XHRsZXQgbGlzdGVuZXIgPSBmdW5jdGlvbihlLCBkYXRhKSB7XHJcblx0XHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzLCBlLCBzZWxmLCBkYXRhKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihzZWxlY3Rvcil7XHJcblx0XHRcdFx0dGhpcy4kZWwub24odHlwZSwgc2VsZWN0b3IsIGxpc3RlbmVyKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuJGVsLm9uKHR5cGUsIGxpc3RlbmVyKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzXHJcblx0ICovXHJcblx0ZGV0YWNoTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy4kZWwub2ZmKClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdyYWNlZnVsbHkgZGVzdHJveSBjdXJyZW50IGluc3RhbmNlIHByb3BlcnRpZXNcclxuXHQgKi9cclxuXHRkZXN0cm95KCkge1xyXG5cdFx0dGhpcy5kZXRhY2hMaXN0ZW5lcnMoKVxyXG5cclxuXHRcdGZvciAobGV0IHByb3AgaW4gdGhpcykge1xyXG5cdFx0XHR0aGlzW3Byb3BdID0gbnVsbFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhIGNoaWxkXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSBDU1Mgc2VsZWN0b3JcclxuXHQgKiBAcmV0dXJuIHtqUXVlcnl8bnVsbH1cclxuXHQgKi9cclxuXHRjaGlsZChzZWxlY3Rvcikge1xyXG5cdFx0dmFyIHJlc3VsdCA9IHRoaXMuJGVsLmZpbmQoc2VsZWN0b3IpXHJcblx0XHRpZighcmVzdWx0Lmxlbmd0aCkgcmV0dXJuIG51bGxcclxuXHRcdGVsc2UgcmV0dXJuIHJlc3VsdC5lcSgwKVxyXG5cdH1cclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50XHJcbiJdfQ==\n//# sourceURL=mgui/src/scripts/components/component.js");
					},
					"example.es6": function (exports, module, require) {
						eval("'use strict';\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Component = require('./component');\n\n/**\r\n * Example component class\r\n *\r\n * - all DOM operations must be executed after creating an instance (in constructor)\r\n * - when defining own constructor, don't forget to call super(element, data)\r\n * - DOM event listeners are in Backbone style\r\n *\r\n */\n\nvar Example = function (_Component) {\n\t_inherits(Example, _Component);\n\n\tfunction Example() {\n\t\t_classCallCheck(this, Example);\n\n\t\treturn _possibleConstructorReturn(this, (Example.__proto__ || Object.getPrototypeOf(Example)).apply(this, arguments));\n\t}\n\n\t_createClass(Example, [{\n\t\tkey: 'handleClick',\n\t\tvalue: function handleClick(e, self) {\n\t\t\te.preventDefault();\n\t\t\talert(self.data);\n\t\t}\n\t}, {\n\t\tkey: 'listeners',\n\t\tget: function get() {\n\t\t\treturn {\n\t\t\t\t'click .example-child': 'handleClick'\n\t\t\t};\n\t\t}\n\t}]);\n\n\treturn Example;\n}(Component);\n\nmodule.exports = Example;//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4YW1wbGUuZXM2Il0sIm5hbWVzIjpbIkNvbXBvbmVudCIsInJlcXVpcmUiLCJFeGFtcGxlIiwiZSIsInNlbGYiLCJwcmV2ZW50RGVmYXVsdCIsImFsZXJ0IiwiZGF0YSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxZQUFZQyxRQUFRLGFBQVIsQ0FBaEI7O0FBRUE7Ozs7Ozs7OztJQVFNQyxPOzs7Ozs7Ozs7Ozs4QkFRT0MsQyxFQUFHQyxJLEVBQU07QUFDcEJELEtBQUVFLGNBQUY7QUFDQUMsU0FBTUYsS0FBS0csSUFBWDtBQUNBOzs7c0JBVGU7QUFDZixVQUFPO0FBQ04sNEJBQXdCO0FBRGxCLElBQVA7QUFHQTs7OztFQU5vQlAsUzs7QUFldEJRLE9BQU9DLE9BQVAsR0FBaUJQLE9BQWpCIiwiZmlsZSI6ImV4YW1wbGUuZXM2Iiwic291cmNlc0NvbnRlbnQiOlsidmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4vY29tcG9uZW50JylcclxuXHJcbi8qKlxyXG4gKiBFeGFtcGxlIGNvbXBvbmVudCBjbGFzc1xyXG4gKlxyXG4gKiAtIGFsbCBET00gb3BlcmF0aW9ucyBtdXN0IGJlIGV4ZWN1dGVkIGFmdGVyIGNyZWF0aW5nIGFuIGluc3RhbmNlIChpbiBjb25zdHJ1Y3RvcilcclxuICogLSB3aGVuIGRlZmluaW5nIG93biBjb25zdHJ1Y3RvciwgZG9uJ3QgZm9yZ2V0IHRvIGNhbGwgc3VwZXIoZWxlbWVudCwgZGF0YSlcclxuICogLSBET00gZXZlbnQgbGlzdGVuZXJzIGFyZSBpbiBCYWNrYm9uZSBzdHlsZVxyXG4gKlxyXG4gKi9cclxuY2xhc3MgRXhhbXBsZSBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG5cdGdldCBsaXN0ZW5lcnMoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHQnY2xpY2sgLmV4YW1wbGUtY2hpbGQnOiAnaGFuZGxlQ2xpY2snXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRoYW5kbGVDbGljayhlLCBzZWxmKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KClcclxuXHRcdGFsZXJ0KHNlbGYuZGF0YSlcclxuXHR9XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEV4YW1wbGUiXX0=\n//# sourceURL=mgui/src/scripts/components/example.js");
					},
					"shapes.es6": function (exports, module, require) {
						eval("\"use strict\";\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Component = require('./component');\nvar $ = window.jQuery;\n\n/**\r\n * Shapes component class\r\n *\r\n * - injects SVG sprite into body\r\n */\n\nvar Shapes = function (_Component) {\n\t_inherits(Shapes, _Component);\n\n\t/**\r\n  * @param {HTMLElement} element\r\n  * @param {Object} data\r\n  */\n\tfunction Shapes(element, data) {\n\t\t_classCallCheck(this, Shapes);\n\n\t\tvar _this = _possibleConstructorReturn(this, (Shapes.__proto__ || Object.getPrototypeOf(Shapes)).call(this, element, data));\n\n\t\t_this.supportsSVG = document.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\");\n\t\tif (_this.supportsSVG) _this.injectSprite();\n\t\treturn _this;\n\t}\n\n\t_createClass(Shapes, [{\n\t\tkey: \"injectSprite\",\n\t\tvalue: function injectSprite() {\n\t\t\tvar _this2 = this;\n\n\t\t\t$.get(this.data.url, function (response, status) {\n\t\t\t\tif (status == 'success') {\n\t\t\t\t\t$(document.body).prepend(response);\n\t\t\t\t} else {\n\t\t\t\t\t_this2.injectSprite();\n\t\t\t\t}\n\t\t\t}, 'text');\n\t\t}\n\t}]);\n\n\treturn Shapes;\n}(Component);\n\nmodule.exports = Shapes;//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXBlcy5lczYiXSwibmFtZXMiOlsiQ29tcG9uZW50IiwicmVxdWlyZSIsIiQiLCJ3aW5kb3ciLCJqUXVlcnkiLCJTaGFwZXMiLCJlbGVtZW50IiwiZGF0YSIsInN1cHBvcnRzU1ZHIiwiZG9jdW1lbnQiLCJpbXBsZW1lbnRhdGlvbiIsImhhc0ZlYXR1cmUiLCJpbmplY3RTcHJpdGUiLCJnZXQiLCJ1cmwiLCJyZXNwb25zZSIsInN0YXR1cyIsImJvZHkiLCJwcmVwZW5kIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUlBLFlBQVlDLFFBQVEsYUFBUixDQUFoQjtBQUNBLElBQUlDLElBQUlDLE9BQU9DLE1BQWY7O0FBRUE7Ozs7OztJQUtNQyxNOzs7QUFFTDs7OztBQUlBLGlCQUFZQyxPQUFaLEVBQXFCQyxJQUFyQixFQUEyQjtBQUFBOztBQUFBLDhHQUNwQkQsT0FEb0IsRUFDWEMsSUFEVzs7QUFHMUIsUUFBS0MsV0FBTCxHQUFtQkMsU0FBU0MsY0FBVCxDQUF3QkMsVUFBeEIsQ0FBbUMsbURBQW5DLEVBQXdGLEtBQXhGLENBQW5CO0FBQ0EsTUFBRyxNQUFLSCxXQUFSLEVBQXFCLE1BQUtJLFlBQUw7QUFKSztBQUsxQjs7OztpQ0FFYztBQUFBOztBQUNkVixLQUFFVyxHQUFGLENBQU0sS0FBS04sSUFBTCxDQUFVTyxHQUFoQixFQUFxQixVQUFDQyxRQUFELEVBQVdDLE1BQVgsRUFBc0I7QUFDMUMsUUFBR0EsVUFBVSxTQUFiLEVBQXdCO0FBQ3ZCZCxPQUFFTyxTQUFTUSxJQUFYLEVBQWlCQyxPQUFqQixDQUF5QkgsUUFBekI7QUFDQSxLQUZELE1BRU87QUFDTixZQUFLSCxZQUFMO0FBQ0E7QUFDRCxJQU5ELEVBTUcsTUFOSDtBQU9BOzs7O0VBckJtQlosUzs7QUEwQnJCbUIsT0FBT0MsT0FBUCxHQUFpQmYsTUFBakIiLCJmaWxlIjoic2hhcGVzLmVzNiIsInNvdXJjZXNDb250ZW50IjpbInZhciBDb21wb25lbnQgPSByZXF1aXJlKCcuL2NvbXBvbmVudCcpXHJcbnZhciAkID0gd2luZG93LmpRdWVyeVxyXG5cclxuLyoqXHJcbiAqIFNoYXBlcyBjb21wb25lbnQgY2xhc3NcclxuICpcclxuICogLSBpbmplY3RzIFNWRyBzcHJpdGUgaW50byBib2R5XHJcbiAqL1xyXG5jbGFzcyBTaGFwZXMgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGFcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihlbGVtZW50LCBkYXRhKSB7XHJcblx0XHRzdXBlcihlbGVtZW50LCBkYXRhKVxyXG5cclxuXHRcdHRoaXMuc3VwcG9ydHNTVkcgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5oYXNGZWF0dXJlKFwiaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNCYXNpY1N0cnVjdHVyZVwiLCBcIjEuMVwiKVxyXG5cdFx0aWYodGhpcy5zdXBwb3J0c1NWRykgdGhpcy5pbmplY3RTcHJpdGUoKVxyXG5cdH1cclxuXHJcblx0aW5qZWN0U3ByaXRlKCkge1xyXG5cdFx0JC5nZXQodGhpcy5kYXRhLnVybCwgKHJlc3BvbnNlLCBzdGF0dXMpID0+IHtcclxuXHRcdFx0aWYoc3RhdHVzID09ICdzdWNjZXNzJykge1xyXG5cdFx0XHRcdCQoZG9jdW1lbnQuYm9keSkucHJlcGVuZChyZXNwb25zZSlcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmluamVjdFNwcml0ZSgpXHJcblx0XHRcdH1cclxuXHRcdH0sICd0ZXh0JylcclxuXHR9XHJcblxyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTaGFwZXNcclxuIl19\n//# sourceURL=mgui/src/scripts/components/shapes.js");
					}
				},
				"index.es6": function (exports, module, require) {
					eval("'use strict';\n\n//\n// Main project bundle\n//\n\n// Dependencies\n//\nrequire('./plugins');\n\nif (true) console.log('Initializing components...');\nif (true) console.time('Components initialization');\n\n//\n// Lazy components initialization from initComponents queue\n//\n// Components declarations\nvar components = {\n\t'example': require('./components/example'),\n\t'shapes': require('./components/shapes')\n};\nvar instances = [];\n\n// Init function\nvar init = function init(component) {\n\tif (component.name in components) {\n\t\tif (true) console.time('\\tcomponent: ' + component.name);\n\n\t\tvar Component = components[component.name]; // class\n\t\tvar placement = typeof component.place == 'string' ? document.querySelector(component.place) : component.place; // DOM element\n\t\tvar instance = new Component(placement, component.data || {}); // new instance\n\n\t\tinstances.push(instance);\n\n\t\tif (true) console.timeEnd('\\tcomponent: ' + component.name);\n\t} else {\n\t\tif (true) console.warn('Component with name ' + component.name + ' was not found!');\n\t}\n};\n// Instance only required components\ninitComponents.map(init);\n\n// Allow lazy init of components after page load\ninitComponents = {\n\tpush: init\n};\n\nif (true) console.timeEnd('Components initialization');\nif (true) console.log('Instances', instances);\n\n//\n// Print timing data on page load\n//\nif (true) {\n\t(function () {\n\t\tvar printPerfStats = function printPerfStats() {\n\t\t\tvar timing = window.performance.timing;\n\t\t\tconsole.log('Performance:\\n' + '\\tdns: \\t\\t' + (timing.domainLookupEnd - timing.domainLookupStart) + 'ms\\n' + '\\tconnect: \\t' + (timing.connectEnd - timing.connectStart) + 'ms\\n' + '\\tttfb: \\t\\t' + (timing.responseStart - timing.connectEnd) + 'ms\\n' + '\\tbasePage: \\t' + (timing.responseEnd - timing.responseStart) + 'ms\\n' + '\\tfrontEnd: \\t' + (timing.loadEventStart - timing.responseEnd) + 'ms\\n');\n\t\t};\n\n\t\twindow.addEventListener('load', function () {\n\t\t\treturn setTimeout(printPerfStats, 1000);\n\t\t});\n\t})();\n}//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmVzNiJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiREVCVUciLCJjb25zb2xlIiwibG9nIiwidGltZSIsImNvbXBvbmVudHMiLCJpbnN0YW5jZXMiLCJpbml0IiwiY29tcG9uZW50IiwibmFtZSIsIkNvbXBvbmVudCIsInBsYWNlbWVudCIsInBsYWNlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaW5zdGFuY2UiLCJkYXRhIiwicHVzaCIsInRpbWVFbmQiLCJ3YXJuIiwiaW5pdENvbXBvbmVudHMiLCJtYXAiLCJwcmludFBlcmZTdGF0cyIsInRpbWluZyIsIndpbmRvdyIsInBlcmZvcm1hbmNlIiwiZG9tYWluTG9va3VwRW5kIiwiZG9tYWluTG9va3VwU3RhcnQiLCJjb25uZWN0RW5kIiwiY29ubmVjdFN0YXJ0IiwicmVzcG9uc2VTdGFydCIsInJlc3BvbnNlRW5kIiwibG9hZEV2ZW50U3RhcnQiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0VGltZW91dCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBQSxRQUFRLFdBQVI7O0FBR0EsSUFBR0MsS0FBSCxFQUFVQyxRQUFRQyxHQUFSLENBQVksNEJBQVo7QUFDVixJQUFHRixLQUFILEVBQVVDLFFBQVFFLElBQVIsQ0FBYSwyQkFBYjs7QUFFVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUlDLGFBQWE7QUFDaEIsWUFBV0wsUUFBUSxzQkFBUixDQURLO0FBRWhCLFdBQVVBLFFBQVEscUJBQVI7QUFGTSxDQUFqQjtBQUlBLElBQUlNLFlBQVksRUFBaEI7O0FBRUE7QUFDQSxJQUFJQyxPQUFPLFNBQVBBLElBQU8sQ0FBQ0MsU0FBRCxFQUFlO0FBQ3pCLEtBQUdBLFVBQVVDLElBQVYsSUFBa0JKLFVBQXJCLEVBQWdDO0FBQy9CLE1BQUdKLEtBQUgsRUFBVUMsUUFBUUUsSUFBUixDQUFhLGtCQUFrQkksVUFBVUMsSUFBekM7O0FBRVYsTUFBSUMsWUFBWUwsV0FBV0csVUFBVUMsSUFBckIsQ0FBaEIsQ0FIK0IsQ0FHWTtBQUMzQyxNQUFJRSxZQUFhLE9BQU9ILFVBQVVJLEtBQWpCLElBQTBCLFFBQTNCLEdBQXVDQyxTQUFTQyxhQUFULENBQXVCTixVQUFVSSxLQUFqQyxDQUF2QyxHQUFpRkosVUFBVUksS0FBM0csQ0FKK0IsQ0FJa0Y7QUFDakgsTUFBSUcsV0FBVyxJQUFJTCxTQUFKLENBQWNDLFNBQWQsRUFBeUJILFVBQVVRLElBQVYsSUFBa0IsRUFBM0MsQ0FBZixDQUwrQixDQUsrQjs7QUFFOURWLFlBQVVXLElBQVYsQ0FBZUYsUUFBZjs7QUFFQSxNQUFHZCxLQUFILEVBQVVDLFFBQVFnQixPQUFSLENBQWdCLGtCQUFrQlYsVUFBVUMsSUFBNUM7QUFDVixFQVZELE1BVU87QUFDTixNQUFHUixLQUFILEVBQVVDLFFBQVFpQixJQUFSLENBQWEseUJBQXlCWCxVQUFVQyxJQUFuQyxHQUEwQyxpQkFBdkQ7QUFDVjtBQUNELENBZEQ7QUFlQTtBQUNBVyxlQUFlQyxHQUFmLENBQW1CZCxJQUFuQjs7QUFFQTtBQUNBYSxpQkFBaUI7QUFDaEJILE9BQU1WO0FBRFUsQ0FBakI7O0FBSUEsSUFBR04sS0FBSCxFQUFVQyxRQUFRZ0IsT0FBUixDQUFnQiwyQkFBaEI7QUFDVixJQUFHakIsS0FBSCxFQUFVQyxRQUFRQyxHQUFSLENBQVksV0FBWixFQUF5QkcsU0FBekI7O0FBRVY7QUFDQTtBQUNBO0FBQ0EsSUFBR0wsS0FBSCxFQUFVO0FBQUE7QUFBQSxNQUNBcUIsY0FEQSxHQUNULFNBQVNBLGNBQVQsR0FBMEI7QUFDekIsT0FBSUMsU0FBU0MsT0FBT0MsV0FBUCxDQUFtQkYsTUFBaEM7QUFDQXJCLFdBQVFDLEdBQVIsQ0FBWSxtQkFDWCxhQURXLElBQ01vQixPQUFPRyxlQUFQLEdBQXlCSCxPQUFPSSxpQkFEdEMsSUFDMkQsTUFEM0QsR0FFWCxlQUZXLElBRVFKLE9BQU9LLFVBQVAsR0FBb0JMLE9BQU9NLFlBRm5DLElBRW1ELE1BRm5ELEdBR1gsY0FIVyxJQUdPTixPQUFPTyxhQUFQLEdBQXVCUCxPQUFPSyxVQUhyQyxJQUdtRCxNQUhuRCxHQUlYLGdCQUpXLElBSVNMLE9BQU9RLFdBQVAsR0FBcUJSLE9BQU9PLGFBSnJDLElBSXNELE1BSnRELEdBS1gsZ0JBTFcsSUFLU1AsT0FBT1MsY0FBUCxHQUF3QlQsT0FBT1EsV0FMeEMsSUFLdUQsTUFMbkU7QUFPQSxHQVZROztBQVdUUCxTQUFPUyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQztBQUFBLFVBQU1DLFdBQVdaLGNBQVgsRUFBMkIsSUFBM0IsQ0FBTjtBQUFBLEdBQWhDO0FBWFM7QUFZVCIsImZpbGUiOiJpbmRleC5lczYiLCJzb3VyY2VzQ29udGVudCI6WyIvL1xyXG4vLyBNYWluIHByb2plY3QgYnVuZGxlXHJcbi8vXHJcblxyXG4vLyBEZXBlbmRlbmNpZXNcclxuLy9cclxucmVxdWlyZSgnLi9wbHVnaW5zJylcclxuXHJcblxyXG5pZihERUJVRykgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBjb21wb25lbnRzLi4uJylcclxuaWYoREVCVUcpIGNvbnNvbGUudGltZSgnQ29tcG9uZW50cyBpbml0aWFsaXphdGlvbicpXHJcblxyXG4vL1xyXG4vLyBMYXp5IGNvbXBvbmVudHMgaW5pdGlhbGl6YXRpb24gZnJvbSBpbml0Q29tcG9uZW50cyBxdWV1ZVxyXG4vL1xyXG4vLyBDb21wb25lbnRzIGRlY2xhcmF0aW9uc1xyXG52YXIgY29tcG9uZW50cyA9IHtcclxuXHQnZXhhbXBsZSc6IHJlcXVpcmUoJy4vY29tcG9uZW50cy9leGFtcGxlJyksXHJcblx0J3NoYXBlcyc6IHJlcXVpcmUoJy4vY29tcG9uZW50cy9zaGFwZXMnKVxyXG59XHJcbnZhciBpbnN0YW5jZXMgPSBbXVxyXG5cclxuLy8gSW5pdCBmdW5jdGlvblxyXG52YXIgaW5pdCA9IChjb21wb25lbnQpID0+IHtcclxuXHRpZihjb21wb25lbnQubmFtZSBpbiBjb21wb25lbnRzKXtcclxuXHRcdGlmKERFQlVHKSBjb25zb2xlLnRpbWUoJ1xcdGNvbXBvbmVudDogJyArIGNvbXBvbmVudC5uYW1lKVxyXG5cclxuXHRcdHZhciBDb21wb25lbnQgPSBjb21wb25lbnRzW2NvbXBvbmVudC5uYW1lXSAvLyBjbGFzc1xyXG5cdFx0dmFyIHBsYWNlbWVudCA9ICh0eXBlb2YgY29tcG9uZW50LnBsYWNlID09ICdzdHJpbmcnKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29tcG9uZW50LnBsYWNlKSA6IGNvbXBvbmVudC5wbGFjZSAvLyBET00gZWxlbWVudFxyXG5cdFx0dmFyIGluc3RhbmNlID0gbmV3IENvbXBvbmVudChwbGFjZW1lbnQsIGNvbXBvbmVudC5kYXRhIHx8IHt9KSAvLyBuZXcgaW5zdGFuY2VcclxuXHJcblx0XHRpbnN0YW5jZXMucHVzaChpbnN0YW5jZSlcclxuXHJcblx0XHRpZihERUJVRykgY29uc29sZS50aW1lRW5kKCdcXHRjb21wb25lbnQ6ICcgKyBjb21wb25lbnQubmFtZSlcclxuXHR9IGVsc2Uge1xyXG5cdFx0aWYoREVCVUcpIGNvbnNvbGUud2FybignQ29tcG9uZW50IHdpdGggbmFtZSAnICsgY29tcG9uZW50Lm5hbWUgKyAnIHdhcyBub3QgZm91bmQhJylcclxuXHR9XHJcbn1cclxuLy8gSW5zdGFuY2Ugb25seSByZXF1aXJlZCBjb21wb25lbnRzXHJcbmluaXRDb21wb25lbnRzLm1hcChpbml0KVxyXG5cclxuLy8gQWxsb3cgbGF6eSBpbml0IG9mIGNvbXBvbmVudHMgYWZ0ZXIgcGFnZSBsb2FkXHJcbmluaXRDb21wb25lbnRzID0ge1xyXG5cdHB1c2g6IGluaXRcclxufVxyXG5cclxuaWYoREVCVUcpIGNvbnNvbGUudGltZUVuZCgnQ29tcG9uZW50cyBpbml0aWFsaXphdGlvbicpXHJcbmlmKERFQlVHKSBjb25zb2xlLmxvZygnSW5zdGFuY2VzJywgaW5zdGFuY2VzKVxyXG5cclxuLy9cclxuLy8gUHJpbnQgdGltaW5nIGRhdGEgb24gcGFnZSBsb2FkXHJcbi8vXHJcbmlmKERFQlVHKSB7XHJcblx0ZnVuY3Rpb24gcHJpbnRQZXJmU3RhdHMoKSB7XHJcblx0XHR2YXIgdGltaW5nID0gd2luZG93LnBlcmZvcm1hbmNlLnRpbWluZ1xyXG5cdFx0Y29uc29sZS5sb2coJ1BlcmZvcm1hbmNlOlxcbicgK1xyXG5cdFx0XHQnXFx0ZG5zOiBcXHRcXHQnICsgKHRpbWluZy5kb21haW5Mb29rdXBFbmQgLSB0aW1pbmcuZG9tYWluTG9va3VwU3RhcnQpICsgJ21zXFxuJyArXHJcblx0XHRcdCdcXHRjb25uZWN0OiBcXHQnICsgKHRpbWluZy5jb25uZWN0RW5kIC0gdGltaW5nLmNvbm5lY3RTdGFydCkgKyAnbXNcXG4nICtcclxuXHRcdFx0J1xcdHR0ZmI6IFxcdFxcdCcgKyAodGltaW5nLnJlc3BvbnNlU3RhcnQgLSB0aW1pbmcuY29ubmVjdEVuZCkgKyAnbXNcXG4nICtcclxuXHRcdFx0J1xcdGJhc2VQYWdlOiBcXHQnICsgKHRpbWluZy5yZXNwb25zZUVuZCAtIHRpbWluZy5yZXNwb25zZVN0YXJ0KSArICdtc1xcbicgK1xyXG5cdFx0XHQnXFx0ZnJvbnRFbmQ6IFxcdCcgKyAodGltaW5nLmxvYWRFdmVudFN0YXJ0IC0gdGltaW5nLnJlc3BvbnNlRW5kKSArICdtc1xcbidcclxuXHRcdClcclxuXHR9XHJcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiBzZXRUaW1lb3V0KHByaW50UGVyZlN0YXRzLCAxMDAwKSlcclxufVxyXG4iXX0=\n//# sourceURL=mgui/src/scripts/index.js");
				},
				"plugins.js": function (exports, module, require) {
					eval("// \r\n// Tiny project dependencies like polyfills and environment setup\r\n//\r\n\r\n\r\n// Avoid `console` errors in browsers that lack a console.\r\n//\r\n;(function() {\r\n\tvar method\r\n\tvar noop = function () {}\r\n\tvar methods = [\r\n\t\t'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',\r\n\t\t'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',\r\n\t\t'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',\r\n\t\t'timeStamp', 'trace', 'warn'\r\n\t]\r\n\tvar length = methods.length\r\n\tvar console = (window.console = window.console || {})\r\n\r\n\twhile (length--) {\r\n\t\tmethod = methods[length]\r\n\t\t// Only stub undefined methods.\r\n\t\tif (!console[method]) {\r\n\t\t\tconsole[method] = noop\r\n\t\t}\r\n\t}\r\n})();\n//# sourceURL=mgui/src/scripts/plugins.js");
				}
			}
		}
	}
})("mgui/src/scripts/index");

//# sourceMappingURL=index.js.map
