/**
 * The Sexy Curls JQuery Plugin
 * By Elliott Kember - http://twitter.com/elliottkember
 * Released under the MIT license (MIT-LICENSE.txt)
 * 
 * My only request is: please don't over-use this plugin.
 * If this ends up being used all over the internets, and becomes "that annoying effect", I'll be upset.    
 *
 * I dragged a curl, and I liked it - I hope @jeresig don't mind it.
 */

(function($){
  $.fn.fold = function(options) {
    var ie55 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 5.5") != -1);
    var ie6 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 6.0") != -1);
    
    // We just won't show it for IE5.5 and IE6. Go away. I'm really tempted to write "document.location= 'http://www.getfirefox.com';" here.
    if (ie55 || ie6) {this.css('display', 'none');return true;}
  
    // New - you don't have to specify options!
    options = options || {}
    
    // Default awesomeness
    var defaults = {
      directory: 'turn',      // The directory we're in
      side: 'left',           // change me to "right" if you want rightness
      turnImage: 'fold.png',  // The triangle-shaped fold image
      maxHeight: 400,         // The maximum height. Duh.
      starting_width: 80,     // The height and width 
      starting_height: 80,    // with which to start (these should probably be camelCase, d'oh.)
      autoCurl: false         // If this is set to true, the fold will curl/uncurl on mouseover/mouseout.
    };

    // Change turnImage if we're running the default image, and they've specified 'right'
    if (options.side == 'right' && !options.turnImage) {
      defaults.turnImage = 'fold-sw.png';
    }
  
    // Merge options with the defaults
    var options = $.extend(defaults, options);
  
    // It's nicer-looking this way. Sorry if it breaks your stuff.
    var el = function(type){
      return $(document.createElement(type));
    }
  
    // Set up the wrapper objects
    h     = el('div').attr({id: 'turn_hideme'  });
    c     = el('div').attr({id: 'turn_wrapper' });
    turn  = el('div').attr({id: 'turn_object'  });
    img   = el('img').attr({id: 'turn_fold', src: (options.directory+'/'+options.turnImage)});

    // Set starting width and height of our turn-o-ma-bob
    turn.css({
      width:  options.starting_width, 
      height: options.starting_height
    });
  
    // There are different CSS considerations for a top-right fold.
    if (options.side == 'right'){
      c.addClass('right');
    }
  
    // Rappin', I'm rappin' - I'm rap-rap-rappin'.
    this.wrap(c).wrap(turn).after(img).wrap(h);
    
    // If you want autoCurl, you don't get scrolling. Why? Because it looks silly.
    if(options.autoCurl == false) {
      // Hit 'em with the drag-stick because it ain't gonna curl itself!
      $('#turn_object').resizable({ 
        maxHeight: options.maxHeight, 
        aspectRatio: true,
        ratio: true,
        border: false,
        dragHandle: false,
        knobHandles: true,
        handles:  options.side == 'left' ? 'se' : 'sw'
      });
    } else {
      // Thanks to @zzzrByte for this bit!
      function mMouseOver(e) {
        $('#turn_object').stop().animate({width: options.maxHeight, height: options.maxHeight});
      }
      function mMouseOut(e) {
        $('#turn_object').stop().animate({width: options.starting_height, height: options.starting_height});
      }
      $('#turn_wrapper').bind('mouseover', mMouseOver );
      $('#turn_wrapper').bind('mouseout', mMouseOut );
    }
  };
})(jQuery);