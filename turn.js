/**
 * The Sexy Page Turn JQuery Plugin
 * By Elliott Kember - http://twitter.com/elliottkember
 * Released under the MIT license (MIT-LICENSE.txt)
 */

(function($){
 $.fn.fold = function(options) {
	
		// Default awesomeness
	  var defaults = {
			directory: 'turn',			// The directory we're in
		  side: 'left',           // change me to "right" if you want rightness
			turnImage: 'fold3.png', // The triangle-shaped fold image
	    maxHeight: 400,					// The maximum height. Duh.
			starting_width: 80,			// The height and width 
			starting_height: 80			// with which	to start
	  };

		// Change turnImage if we're running the default image, and they've specified 'right'
		if (options.side == 'right' && !options.turnImage) {
			defaults.turnImage = 'fold-sw.png';
		}
  
		// Merge options with the defaults
	  var options = $.extend(defaults, options);
	
		// It's nicer-looking this way. Sorry if it breaks your stuff.
		var el = function(type){
			return $(document.createElement(type))
		}
	
		// Set up the wrapper objects
		h		 = el('div').attr({id: 'turn_hideme'});
		c  	 = el('div').attr({id: 'turn_wrapper'});
		turn = el('div').attr({id: 'turn_object'});
		img  = el('img').attr({id: 'turn_fold', src: (options.directory+'/'+options.turnImage)});
		
		// Set starting width and height
		turn.css({
			width: options.starting_width, 
			height: options.starting_height
		});
	
		// There are different CSS considerations for a top-right fold.
		if (options.side == 'right'){
			c.addClass('right');
		}
	
		// Rappin', I'm rappin' - I'm rap-rap-rappin'.
		this.wrap(c).wrap(turn).after(img).wrap(h);

		// Hit 'em with the drag-stick.
		$('#turn_object').resizable({ 
	       maxHeight: options.maxHeight, 
	       aspectRatio: true,
	       ratio: true,
	       border: false,
	       dragHandle: false,
	       knobHandles: true,
	       handles:  options.side == 'left' ? 'se' : 'sw'
		});
	};
})(jQuery);