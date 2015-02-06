var $ = require('jquery')

var init_marquee = function(selector, timeout){
	var $marquee = $(selector)

	setInterval(function(){
		$marquee.each(function(i, el){
			var $el = $(el)
			var first = $el.text().substr(0, 1)
			var rest = $el.text().substr(1)
			$el.text(rest + first)
		})
	}, timeout)
}

init_marquee('[data-marquee]', 123)
