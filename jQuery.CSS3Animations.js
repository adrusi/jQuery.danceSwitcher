(function($) {
  $.fn.extend({
    oldAnimate: $.fn.animate, // store the built in animate method for fallback use
    animate: function(props, speed, easing, callback) {
      var camelToHyphen = function(camel) {
        return camel.replace(/([A-Z])/g, "-$1").toLowerCase(); // prepend capital letters with "-" and make them lowercase
      }, prefixes = [
        "Moz", "Webkit",
        "O", "Ms", "Khtml"
      ], transitionProp = false,
      $this = $(this); // cache the jQuery object
      
      // @begin decipher what order the parameters are in and set undefined ones to the default
        callback = (typeof easing === "function") ? easing : (callback) ? callback : function() {}; // which parameter was the callback (since easing is optional)
        easing = (easing && typeof easing === "string") ? easing : "ease-in-out"; // default easing
      // @end
      
      if ("transition" in $this.get(0).style) { // for future compatability, look for the official `transition` property
        transitionProp = "transition";
      }
      else { // if the official spec isn't supported, look for possible prefixed versions
        for (var i = 0; i < prefixes.length; i++) { // loop through CSS vendor prefixes
          if (prefixes[i] + "Transition" in $this.get(0).style) { // if the transition property with a prefix was found
            transitionProp = "-" + prefixes[i].toLowerCase() + "-transition"; // store the property name
            break; // stop looping through prefixes, we already found it
          }
        }
      }
      return $this.each(function() {
        var $$this = $(this);
        if (transitionProp) { // if a css3 transitions have been detected
          var oldTransition = $$this.css(transitionProp); // store the value of the transition property as it was before we change it
              transitionString = (oldTransition) ? oldTransition + ", " : ""; // start the new transition rules we'll add
          for (prop in props) {
            transitionString += camelToHyphen(prop) + " " + speed + "ms " + easing + ", "; // append a transition rule for each property to animate with a trailing comma
          }
          transitionString = transitionString.replace(/\, $/, ""); // remove the last comma
          $$this.css(transitionProp, transitionString).css(props); // add the transition rule to the element and then change the CSS instantly, it will animate
          setTimeout(function() { // set the transition property back to what it was before we started animating, when the animation finishes
            $$this.css(transitionProp, oldTransition);
            callback(); // and call the callback function
          }, speed);
        }
        else {
          $$this.oldAnimate(props, speed, callback); // use the built in animate method if there weren't CSS3 transitions
        }
      });
    }
  });
})(jQuery);