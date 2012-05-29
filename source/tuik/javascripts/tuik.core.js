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