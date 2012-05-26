;(function($, document, window, undefined){

      var pluginName = 'popover',
          defaults = {
              close : '.close',
              closeHtml : '<a class="ico close">✖</a>',
              closeWhenClickOutside : true,
              onlyOneOpened : true,
              position : "auto", // auto or top/right/bottom/left
              startOpen : true
          };
          
      var $body = $(document.body),
          $window = $(window),
          positions = ['top', 'right', 'bottom', 'left'],
          popovers = [];
          
          
      var forEachPosition = function(callback){
        for (var i = positions.length - 1; i >= 0; i--){
          callback.call(this, positions[i]);
        };
      };
      
      // $window.on( 'onorientationchange resize.imagezoom' , resize);
      // $window.on( 'onorientationchange resize.imagezoom scroll' , resize);
      
      function Plugin( element, options ) {
          this.element = $(element);
          this.options = $.extend( {}, defaults, options) ;
          this._defaults = defaults;
          this._name = pluginName;          
          
          this.$header = this.element.find('header').first();
          this.$close = this.element.find(this.options.close);
          this.$close = this.$close.length ? this.$close : $(this.options.closeHtml).appendTo( this.$header[0] || this.element );
          this.width = this.element.width();
          this.height = this.element.height();
          
          this.open = false;
          this.is_inside_btn = this.element.closest('.btn-group, .btn').length;
          this.element_target = this.element.parent();
          
          if (this.is_inside_btn) this.init();
          
      }
      
      Plugin.closeAll = function(){
        for (var i = popovers.length - 1; i >= 0; i--){
          if (popovers[i].open) Plugin.prototype.hide.call(popovers[i]);
        };
      }

      Plugin.prototype = {
        init : function(){
          popovers.push(this);
          
          
          forEachPosition.call(this, function(position){
            if (this.options.position === "auto"){
             if (this.element.hasClass(position)) this.position = position; //identify the position by class
            }else{                                                        
              this.position = this.options.position;      //identify position by option and changing class
              this.element.removeClass(position);
              this.element.addClass(this.position);
            } 
          });
      
          this.initEvents();
          
          if (this.options.startOpen) this.show();
          
        },
        
        initEvents : function(){
          this.element.on('click', function(e){
            e.stopImmediatePropagation();
          });
          this.$close.on('click', $.proxy(this.hide, this));
          this.element_target.on('click', $.proxy(this.toggle, this));
        },
        
        toggle : function(e){
          if (e && e.preventDefault) {
            e.preventDefault();
            e.stopImmediatePropagation();
          };
          if (this.open) this.hide()
          else this.show();
        },
        
        show : function(){
          if (this.options.onlyOneOpened) Plugin.closeAll();
          this.open = true;
          this.updatePosition();
          this.element_target.addClass('active');
          if (this.options.closeWhenClickOutside) $body.on('click', Plugin.closeAll);
        },
        
        hide : function(){
          this.open = false;
          this.element_target.removeClass('active');
          if (this.options.closeWhenClickOutside) $body.off('click', Plugin.closeAll);
        },
        
        updatePosition : function(){
          
          if(this.position === 'top' || this.position === 'bottom'){
            this.element.css('margin-left', -(this.width/2)+"px");
          }else if(this.position === 'left' || this.position === 'right'){
            this.element.css('margin-top', -(this.height/2)+"px");
          }
          
        }
        
      }
      

      $.fn[pluginName] = function ( options ) {
          return this.each(function () {
              if (!$.data(this, 'plugin_' + pluginName)) {
                  $.data(this, 'plugin_' + pluginName,
                  new Plugin( this, options ));
              }
          });
      }

})(jQuery, document, window);


$(function(){
  $('.popover').popover();
})