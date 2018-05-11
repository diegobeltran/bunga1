(function($) {
    $.Gridster.debug = false;

    $.Gridster.generate_stylesheet = function(opts) {
        var styles = '';
        var max_size_x = this.options.max_size_x || this.cols;
        var max_rows = 0;
        var max_cols = 0;
        var i;
        var rules;

        opts || (opts = {});
        opts.cols || (opts.cols = this.cols);
        opts.rows || (opts.rows = this.rows);
        opts.namespace || (opts.namespace = this.options.namespace);
        opts.widget_base_dimensions ||
            (opts.widget_base_dimensions = this.options.widget_base_dimensions);
        opts.widget_margins ||
            (opts.widget_margins = this.options.widget_margins);
        opts.min_widget_width = (opts.widget_margins[0] * 2) +
            opts.widget_base_dimensions[0];
        opts.min_widget_height = (opts.widget_margins[1] * 2) +
            opts.widget_base_dimensions[1];

        // only use multi column if window wide enough
        styles += '@media (min-width: 768px) {';

        for (var x = 1; x <= max_size_x; x++) {
            styles += (opts.namespace + ' [data-sizex="' + x + '"] { width:' +
                (x * opts.widget_base_dimensions[0] +
                (x - 1) * (opts.widget_margins[0] * 2)) + 'px; }\n');
        }

        styles += '}';

        styles += '@media (max-width: 768px) {';

        for (var x = 1; x <= max_size_x; x++) {
            styles += (opts.namespace + ' [data-sizex="' + x + '"] { width: 100' + '%; }\n');
        }

        styles += '}';

        /* generate CSS styles for cols */
        for (i = opts.cols; i >= 0; i--) {
            styles += (opts.namespace + ' [data-col="'+ (i + 1) + '"] { left:' +
                ((i * opts.widget_base_dimensions[0]) +
                (i * opts.widget_margins[0]) +
                ((i + 1) * opts.widget_margins[0])) + 'px; }\n');
        }

        // styles that apply regardless of screen size
        for (var y = 1; y <= opts.rows; y++) {
            styles += (opts.namespace + ' [data-sizey="' + y + '"] { height:' +
                (y * opts.widget_base_dimensions[1] +
                (y - 1) * (opts.widget_margins[1] * 2)) + 'px; }\n');
        }

        /* generate CSS styles for rows */
        for (i = opts.rows; i >= 0; i--) {
            styles += (opts.namespace + ' [data-row="' + (i + 1) + '"] { top:' +
                ((i * opts.widget_base_dimensions[1]) +
                (i * opts.widget_margins[1]) +
                ((i + 1) * opts.widget_margins[1]) ) + 'px; }\n');
        }

        return this.add_style_tag(styles);
    };

    $.Gridster.add_style_tag = function(css) {
        var d = document;
        var tag = d.createElement('style');

        tag.setAttribute('generated-from', 'gridster');

        d.getElementsByTagName('head')[0].appendChild(tag);
        tag.setAttribute('type', 'text/css');

        if (tag.styleSheet) {
            tag.styleSheet.cssText = css;
        } else {
            tag.appendChild(document.createTextNode(css));
        }
        return this;
    };

    $.Gridster.register_widget = function($el) {
        var wgd = {
            'col': parseInt($el.attr('data-col'), 10),
            'row': parseInt($el.attr('data-row'), 10),
            'size_x': parseInt($el.attr('data-sizex'), 10),
            'size_y': parseInt($el.attr('data-sizey'), 10),
            'max_size_x': parseInt($el.attr('data-max-sizex'), 10) || false,
            'max_size_y': parseInt($el.attr('data-max-sizey'), 10) || false,
            'el': $el
        };

        if (this.options.avoid_overlapped_widgets &&
            !this.can_move_to(
             {size_x: wgd.size_x, size_y: wgd.size_y}, wgd.col, wgd.row)
        ) {
            $.extend(wgd, this.next_position(wgd.size_x, wgd.size_y));
            $el.attr({
                'data-col': wgd.col,
                'data-row': wgd.row,
                'data-sizex': wgd.size_x,
                'data-sizey': wgd.size_y
            });
        }

        // attach Coord object to player data-coord attribute
        $el.data('coords', $el.coords());
        // Extend Coord object with grid position info
        $el.data('coords').grid = wgd;

        this.add_to_gridmap(wgd, $el);

        this.options.resize.enabled && !this.has_resize_handle($el) && this.add_resize_handle($el);

        return this;
    };

    $.Gridster.has_resize_handle = function($w) {
        var append_to = this.options.resize.handle_append_to;
        return (((append_to ? $(append_to, $w) : $w).find('.gs-resize-handle').length) > 0);
    };

    $.Gridster.resize_widget_dimensions = function(options) {
        var shrinking = false;
        this.previous_window_width || (this.previous_window_width = $(window).width());

        if ($(window).width() < this.previous_window_width) {
            shrinking = true;
        }
        this.previous_window_width = $(window).width();

        if (options.widget_margins) {
            this.log(options.widget_margins[0]);
            this.options.widget_margins = options.widget_margins;
        }

        if (options.widget_base_dimensions) {
             this.options.widget_base_dimensions = options.widget_base_dimensions;
        }

        this.min_widget_width  = (this.options.widget_margins[0] * 2) + this.options.widget_base_dimensions[0];
        this.min_widget_height = (this.options.widget_margins[1] * 2) + this.options.widget_base_dimensions[1];

        this.$widgets.each($.proxy(function(i, widget) {
            var $widget = $(widget);
            var wgd = $widget.coords();     // cache because this function is SLOW
        
            if (shrinking) {
                // if widget goes off the grid, then move it and reorganize
                if (wgd.grid.col + wgd.grid.size_x > options.widget_margins[0]) {
                    this.fit_widget($widget, options.widget_margins[0]);
                }
            } else {
                // try to move this module into the new space, or into space opened by another module moving
                // into the new space. This should not repack all modules completely, or move this module
                // into a space not nearby as it would significantly impact order. And during a resize, we
                // want to try to preserve order best we can, while still making best use of space. 
                this.fit_widget($widget, options.widget_margins[0]);
            }

        }, this));

        this.generate_grid_and_stylesheet();
        this.get_widgets_from_DOM();
        this.set_dom_grid_height();

        return false;
    };

    $.Gridster.log = function() {
        if (this.debug) {
            console.log($.makeArray(arguments).join(', '))
        }
    };

    $.Gridster.fit_widget = function($widget, target_cols) {
        var wgd = $widget.coords();     // cache because this function is SLOW
        var old_col = wgd.grid.col;
        var old_row = wgd.grid.row;
        var old_width = wgd.grid.size_x;
        var max_r = old_row;
        var max_c = (target_cols ? target_cols : this.cols);

        $widget.attr('data-orig-sizex', ($widget.attr('data-orig-sizex') ? $widget.attr('data-orig-sizex') : old_width));
            
        if ($widget.attr('data-orig-sizex') && max_c > 1 &&
            wgd.grid.size_x != Math.min(parseInt($widget.attr('data-orig-sizex')), max_c)) {
            // when coming out of 1 column layout (ie. mobile devices), restore 
            // the original size of the widget
            wgd.grid.size_x = Math.min(parseInt($widget.attr('data-orig-sizex')), max_c);
            this.log("Making module bigger (before resize takes place)", old_width, "->", wgd.grid.size_x);
            this.resize_widget($widget);
            this.generate_grid_and_stylesheet();
            this.get_widgets_from_DOM();
            this.set_dom_grid_height();
            this.log("Making module bigger (after resize)", old_width, "->", wgd.grid.size_x);
            this.fit_widget($widget, target_cols);
            return;
        } else {
            this.log("Not making module bigger", parseInt($widget.attr('data-orig-sizex')), max_c, wgd.grid.size_x);
        }

        if (wgd.grid.size_x > max_c) {
            this.log("Module width is bigger than whole grid");
            // if the widget is wider then 100% of the space, then shrink the widget
            wgd.grid.size_x = max_c;
            wgd.grid.col = 1;
            max_r = this.rows;
        }

        if (wgd.grid.col + wgd.grid.size_x - 1 > max_c) {
            this.log("Module goes off the edge, bringing it back")
            // widget overflowed, ok to look down
            wgd.grid.col = max_c - wgd.grid.size_x;
            max_r = this.rows;
        }

        // move module to first available position in row above, if none available, 
        // move to earliest position in current row. if widget is moving down, then 
        // it's okay to look at rows beneath current row
        this.log("Looking to see if module can be moved to a better position");
        var found_new_pos = false;
        for (var r = 1; (r <= max_r && !found_new_pos); r++) {
            for (var c = 1; (c <= max_c && !found_new_pos); c++) {
                if (this.can_move_to(wgd, c, r, max_r)) {
                    wgd.grid.col = c;
                    wgd.grid.row = r;
                    found_new_pos = true;
                }
            }
        }

        if (old_col != wgd.grid.col || old_row != wgd.grid.row || old_width != wgd.grid.size_x) {
            this.log("Calling resize");
            // if moving or resizing widget, preserve the intended, original size of the widget so 
            // that if it shrinks to fit on mobile device, then we can restore it when it goes back 
            // to a multi-column layout
            this.resize_widget($widget);
        }
    };
})(jQuery);
