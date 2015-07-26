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

		for(let event in this.listeners) {
			let type = event.trim()
			let selector = false
			let callback = this[this.listeners[event]]

			let split = event.match(eventSplitter)
			if(split) {
				type = split[1]
				selector = split[2]
			}

			let listener = (e) => {
				callback(e, self)
			}

			if(selector){
				$(this.el).on(type, selector, listener)
			} else {
				$(this.el).on(type, listener)
			}
		}
	}

}

module.exports = Component
