jQuery danceSwitcher Plugin
===========================
The danceSwitcher plugin creates a content switcher with a unique and dazzling effect. A screenshot won't do it justice, so you'll have to [try it out for yourself](https://output.jsbin.com/visevod). The plugin is still in its early stages and there are definitely more features to implement, but the current version is fully functional and reasonably flexible.

The documentation for how to create your css file is found in the file `jQuery.danceSwitcher.css`. All lines that have comments are essential to the plugin's behavior. Lines marked as Important should not be tampered with.

The HTML structure for the switcher is as follows:

    <div>
      <div>
        <h3><!-- title of the box here --></h3>
        <div class="content">
          <p><!-- content of the box here --></p>
        </div>
      </div>
      <div>
        <h3><!-- title of the box here --></h3>
        <div class="content">
          <p><!-- content of the box here --></p>
        </div>
      </div>
      <!-- create as many boxes as you want -->
    </div>

The javascript to initialize the switcher is:

    $('.switcher').danceSwitcher({
      speed: 1, // the speed multiplier, use trial and error to get the best speed :D (hint: bigger is faster)
      collapsedWidth: 230, // the width of boxes when collapsed (not including margin, padding and border)
      collapsedHeight: 80, // the height of boxes when collapsed (not including margin, padding and border)
      collapsedMPB: [10, 10, 10, 10], // the sum of margin, padding and border for each side (top, right, bottom, left)
      collapsedLineHeight: 80, // the line-height of the box headings when collapsed
      activeLineHeight: 48, // the line-height of the box headings when active
      animationSequence 'prev/next' // one of a few preset animation sequences. Currently only prev/next and first/last.
    });

The values above are the defaults.

Animation Sequences
-------------------
The default prev/next animation sequence moves the previously active box to the box immediately above or below the just clicked box.

The first/last animation sequence moves the previously active box to the box on the top or bottom of the sidebar.

License
-------
[GPL](http://www.opensource.org/licenses/gpl-3.0.html)
