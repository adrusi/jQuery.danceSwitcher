(function($) {
  $.fn.extend({
    oldAnimate: $.fn.animate,
    animate: function(props, speed, easing, callback) {
      var camelToHyphen = function(camel) {
        return camel.replace(/([A-Z])/g, "-$1").toLowerCase();
      }, prefixes = [
        "Moz", "Webkit",
        "O", "Ms", "Khtml"
      ], transitionProp = false,
      $this = $(this);
      callback = (typeof easing === "function") ? easing : (callback) ? callback : function() {};
      easing = (easing && typeof easing === "string") ? easing : "ease-in-out";
      for (var i = 0; i < prefixes.length; i++) {
        if (prefixes[i] + "Transition" in $this.get(0).style) {
          transitionProp = "-" + prefixes[i].toLowerCase() + "-transition";
          break;
        }
      }
      return $this.each(function() {
        var $$this = $(this);
        if (transitionProp) {
          var oldTransition = $$this.css(transitionProp);
              transitionString = (oldTransition) ? oldTransition + ", " : "";
          for (prop in props) {
            transitionString += camelToHyphen(prop) + " " + speed + "ms " + easing + ", ";
          }
          transitionString = transitionString.replace(/\, $/, "");
          $$this.css(transitionProp, transitionString).css(props);
          setTimeout(function() {
            $$this.css(transitionProp, oldTransition);
            callback();
          }, speed);
        }
        else {
          $$this.oldAnimate(props, speed, callback);
        }
      });
    }
  });
})(jQuery);