var $ = jQuery

/**
 * Abstract component class
 *
 * - use for creating own components with standartized API
 * - dependes on jQuery.on() for attaching listeners (can be replaced with Zepto, Gator, etc.)
 *
 * @abstract
 *
 * @author Matěj Šimek <email@matejsimek.com> (http://www.matejsimek.com)
 */
class Component {

	/**
	 * @param {HTMLElement} element
	 * @param {Object} data
	 */
	constructor(element, data = {}) {
		this.el = element
		this.$el = $(element)
		this.data = data

		this.attachListeners()
	}

	/**
	 * Assign event handlers from this.listeners property
	 *
	 * Format:
	 * 	- "type": "handlerName"
	 * 	- "type<space>.selector": "handlerName"
	 */
	attachListeners() {
		let self = this
		let eventSplitter = /^(\S+)\s*(.*)$/
		let listeners = this.listeners

		for(let event in listeners) {
			let type = event.trim()
			let selector = false
			let callback = this[listeners[event]]

			let split = event.match(eventSplitter)
			if(split) {
				type = split[1]
				selector = split[2]
			}

			let listener = function(e) {
				callback.call(this, e, self)
			}

			if(selector){
				this.$el.on(type, selector, listener)
			} else {
				this.$el.on(type, listener)
			}
		}
	}

	/**
	 * Returns a child
	 * @param  {string} CSS selector
	 * @return {jQuery|null}
	 */
	child(selector) {
		var result = this.$el.find(selector)
		if(!result.length) return null
		else return result.eq(0)
	}

}

module.exports = Component
