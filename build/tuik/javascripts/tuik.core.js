(function(a,b,c,d){var e=a({}),f={subscribe:function(){return!0},unsubscribe:function(){return!0},publish:function(){return console.log("scope",this),this.isComponent?!1:!0}},g={subscribe:"on",unsubscribe:"off",publish:"trigger"};a.tuik={},a.tuik.components={},a.tuik.pubSubize=function(b,c){var d=e;a.each(g,function(a,c){b[a]=function(){console.log(b,this,b===this,b==this),this.isComponent&&b===this&&this.$element[c].apply(this.$element,arguments),arguments[0]=this.componentName+"."+arguments[0],e[c].apply(e,arguments)}})},a.each(g,function(b,c){a.tuik[b]=function(){console.log(arguments[0],this);var d=arguments[0],f=d.split("."),g=a.tuik.components[f[0]];if(f[1]){arguments[0]=f[1];for(var h=g.length-1;h>=0;h--)g[h][b].apply(g[h].element,arguments)}else e[c].apply(e,arguments)}}),a.tuik.component=function(b,c){var d,e;a.tuik.components[b]=[],a.tuik[b]=d,d=function(d,e){var f=this;return this.isComponent=!0,this.pubSubObj=a({}),this.componentName=b,this.$element=a(d),this.options=a.extend(c.defaults||{},e),a.each(g,function(a,b){f[a]=function(){f.pubSubObj[b].apply(f.pubSubObj,arguments)}}),a.tuik.components[b].push(this),this._init(),this},e=d.prototype,e._init=function(){if(!this._create)throw new Error("Uups! The component named '"+this.componentName+"' has no method '_create'!");this._registerSubscriptions(),this._create()},e._registerSubscriptions=function(a){var b=a||c.subscriptions||this.options.subscriptions;if(b)for(name in b)this.subscribe(name,b[name])},e.option=function(a,b){return typeof b=="undefined"?this.options[a]:(this.options[a]=b,this)},c.parent&&a.extend(d.prototype,c.parent.prototype),a.extend(d.prototype,c.methods),a.fn[b]=function(c){return this.each(function(){var e=a(this);e.data(b)||e.data(b,new d(this,c))})}}})(jQuery,window,document);