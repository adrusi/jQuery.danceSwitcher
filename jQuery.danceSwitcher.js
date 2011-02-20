(function($) {
  $.fn.extend({
    danceSwitcher: function(options) {
      var defaults = {
        speed: 1,
        collapsedWidth: 230,
        collapsedHeight: 80,
        collapsedMPB: [10, 10, 10, 10],
        collapsedLineHeight: 80,
        activeLineHeight: 48
      },
      options = $.extend(defaults, options);
      return $(this).each(function() {
        var $this = $(this),
            speed = options.speed,
            first = $(this).children('div').eq(0),
            i = 1;  
        $this.css('height', ($this.children('div').length - 1) * (options.collapsedHeight + options.collapsedMPB[0] + options.collapsedMPB[2]) + 'px');
        first.addClass('active');
        for (i; i < $this.children('div').length; i++) {
          $this.children('div').eq(i).css('top', (i - 1) * (options.collapsedHeight + options.collapsedMPB[0] + options.collapsedMPB[2]) + 'px');
        }
        $(this).children('div').click(function() {
          if (!$(this).hasClass('active') && !$this.hasClass('inprogress')) {
            $this.addClass('inprogress');
            var next, prev, $$this = $(this);
            $this.children('.active').children('.content').animate({
              opacity: 0
            }, 750 / speed);
            $this.children('.active').children('h3').animate({
              lineHeight: options.collapsedLineHeight
            }, 750 / speed);
            if ($$this.next(':not(.active)').get(0)) {
              next = $(this).next();
              prev = false;
            }
            else {
              next = $$this.prev();
              prev = true;
            }
            $$this.css({
              bottom: $this.height() - $$this.position().top - (options.collapsedHeight + options.collapsedMPB[0] + options.collapsedMPB[2]),
              height: 'auto'
            });
            $this.children('.active').animate({
              top: next.css('top'),
              height: options.collapsedHeight
            }, 750 / speed, function() {
              $$this.animate({
                left: 0,
                right: (options.collapsedWidth + options.collapsedMPB[1] + options.collapsedMPB[3])
              }, 500 / speed, function() {
                next.animate({
                  top: $$this.css('top')
                }, 750 / speed, function() {
                  $this.children('.active').animate({
                    left: next.position().left,
                    right: 0
                  }, 750 / speed, function() {
                    $$this.children('h3').animate({
                      lineHeight: options.activeLineHeight
                    }, 750 / speed);
                    $$this.children('.content').animate({
                      opacity: 1
                    }, 750 / speed);
                    $$this.animate({
                      top: 0,
                      bottom: 0
                    }, 750 / speed, function() {
                      if (!prev) {
                        $this.children('.active').insertAfter(next);
                      }
                      else if (prev) {
                        $this.children('.active').insertBefore(next);
                      }
                      $this.children('.active').removeClass('active');
                      $$this.addClass('active');
                      $$this.prependTo($$this.parent());
                      $this.removeClass('inprogress');
                    });
                  });
                });
              });
            });
          }
        });
      });
    }
  });
})(jQuery);