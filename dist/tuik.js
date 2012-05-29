/*! tuik - v0.1.0 - 2012-05-29
* https://github.com/vieron/tuik
* Copyright (c) 2012 vieron; Licensed MIT, GPL */

;(function($, window, document, undefined){
  
  var pubSubObj = $({}),
      pubSubHandler = {
        "subscribe" : function(){
          return true;
        }, 
        "unsubscribe" : function(){
          return true;
        }, 
        "publish" : function(){
          console.log('scope', this);
          return this.isComponent ? false : true;
        }
      },
      pubSubMethods = { 
        "subscribe" : "on", 
        "unsubscribe" : "off", 
        "publish" : "trigger" 
      };
  
 
  // tuik namespace
  $.tuik = {};
  $.tuik.components = {}
  
  //tuik pubSub implementation
  $.tuik.pubSubize = function(ctx, originalCtx){
    var o = pubSubObj;
    $.each(pubSubMethods , function (map, method ) {
      ctx[ map ] = function() {
        // if (this.isComponent) arguments[0] = this.componentName+'.'+arguments[0]; // if is a component is automatically namespaced (componentName.eventName)
        
        console.log(ctx, this, ctx === this, ctx == this)
        
        if (this.isComponent && ctx === this) {
          this.$element[ method ].apply( this.$element, arguments );
        }
        
        if( true ){//
          arguments[0] = this.componentName+'.'+arguments[0];
          ( pubSubObj)[ method ].apply( pubSubObj, arguments );
        }

        // var execute = pubSubHandler[ map ].apply( this, arguments );
        // if (execute) pubSubObj[ method ].apply( pubSubObj, arguments );
      };
    });
  }
  
  // $.tuik.pubSubize($.tuik);
  
  
   $.each( pubSubMethods, function ( fn, api ) {
     $.tuik[ fn ] = function() {
       console.log(arguments[0], this)
       var eventName = arguments[0],
           segments = eventName.split('.'),
           comp = $.tuik.components[segments[0]];
       if(segments[1]){ //if event is namespaced
         arguments[0] = segments[1];
         for (var i = comp.length - 1; i >= 0; i--){
          comp[i][fn].apply(comp[i].element, arguments);
         };
       }else{
          pubSubObj[ api ].apply( pubSubObj, arguments );
       }
       
      
     };
   });
  
  
  $.tuik.component = function(componentName, componentBackbone){
    var Component, fn;
    
    $.tuik.components[componentName] = [];
    $.tuik[componentName] = Component;
    
    Component = function(element, options){
      var self = this;
      this.isComponent = true;
      this.pubSubObj = $({});
      this.componentName = componentName;
      this.$element = $(element);
      this.options = $.extend(componentBackbone.defaults || {}, options);
      
      $.each( pubSubMethods, function ( fn, api ) {
        self[ fn ] = function() {
          self.pubSubObj[ api ].apply( self.pubSubObj, arguments );
        };
      });
      
      $.tuik.components[componentName].push(this);
      
      this._init();
      
      return this;
    }
    //crate array to cache al component instances
    
    
    //shortcut to prototype
    fn = Component.prototype;
    
    // $.tuik.pubSubize(fn);
    
    //initialize method
    fn._init = function(){
     if (this._create) {
       this._registerSubscriptions();
       this._create();
       
     }else throw new Error("Uups! The component named '"+this.componentName+"' has no method '_create'!");
    }
    
    fn._registerSubscriptions = function(subscriptions){
      //register component subscriptions
      var sc = subscriptions || componentBackbone.subscriptions || this.options.subscriptions
      if (sc) for(name in sc) this.subscribe( name, sc[name]);
    }
    
    
    fn.option = function(optionKey, optionValue){
      //getter
      if (typeof optionValue === 'undefined') return this.options[optionKey];
      //setter
      this.options[optionKey] = optionValue;
      return this;
    };
    
    
    
    //extend from a parent class
    // parent should be $.tuik[componentName]
    if(componentBackbone.parent) $.extend(Component.prototype, componentBackbone.parent.prototype);
    
    //build component prototype
    $.extend(Component.prototype, componentBackbone.methods);
    
    //doing a Jquery plugin
    $.fn[componentName] = function(options){  
     return this.each(function() {
       var $this = $(this);
       if (!$this.data(componentName)) // prevent multiple instantiation
         $this.data(componentName, new Component( this, options )); //instantiation and API asociation
     });
    };
    
    
  } 
 
  
})(jQuery, window, document);
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
          this.element_target = this.element.parent().addClass('popover-wrapper');
          
          
          if (!this.is_inside_btn) return false;
          
          this.init();
          
          console.log(this.element_target);
          
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
          this.element_target.addClass('active').removeClass('closed');;
          if (this.options.closeWhenClickOutside) $body.on('click', Plugin.closeAll);
        },
        
        hide : function(){
          this.open = false;
          this.element_target.removeClass('active').addClass('closed');
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
(function(window, $, undefined){
  
  $.fn.tuikTabs = function(){
    return this.each(function(){
      console.log(this);
    });
  };
  
})(window, jQuery);