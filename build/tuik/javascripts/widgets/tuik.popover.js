(function(a,b,c,d){function l(b,c){this.element=a(b),this.options=a.extend({},f,c),this._defaults=f,this._name=e,this.$header=this.element.find("header").first(),this.$close=this.element.find(this.options.close),this.$close=this.$close.length?this.$close:a(this.options.closeHtml).appendTo(this.$header[0]||this.element),this.width=this.element.width(),this.height=this.element.height(),this.open=!1,this.is_inside_btn=this.element.closest(".btn-group, .btn").length,this.element_target=this.element.parent(),this.is_inside_btn&&this.init()}var e="popover",f={close:".close",closeHtml:'<a class="ico close">✖</a>',closeWhenClickOutside:!0,onlyOneOpened:!0,position:"auto",startOpen:!0},g=a(b.body),h=a(c),i=["top","right","bottom","left"],j=[],k=function(a){for(var b=i.length-1;b>=0;b--)a.call(this,i[b])};l.closeAll=function(){for(var a=j.length-1;a>=0;a--)j[a].open&&l.prototype.hide.call(j[a])},l.prototype={init:function(){j.push(this),k.call(this,function(a){this.options.position==="auto"?this.element.hasClass(a)&&(this.position=a):(this.position=this.options.position,this.element.removeClass(a),this.element.addClass(this.position))}),this.initEvents(),this.options.startOpen&&this.show()},initEvents:function(){this.element.on("click",function(a){a.stopImmediatePropagation()}),this.$close.on("click",a.proxy(this.hide,this)),this.element_target.on("click",a.proxy(this.toggle,this))},toggle:function(a){a&&a.preventDefault&&(a.preventDefault(),a.stopImmediatePropagation()),this.open?this.hide():this.show()},show:function(){this.options.onlyOneOpened&&l.closeAll(),this.open=!0,this.updatePosition(),this.element_target.addClass("active"),this.options.closeWhenClickOutside&&g.on("click",l.closeAll)},hide:function(){this.open=!1,this.element_target.removeClass("active"),this.options.closeWhenClickOutside&&g.off("click",l.closeAll)},updatePosition:function(){this.position==="top"||this.position==="bottom"?this.element.css("margin-left",-(this.width/2)+"px"):(this.position==="left"||this.position==="right")&&this.element.css("margin-top",-(this.height/2)+"px")}},a.fn[e]=function(b){return this.each(function(){a.data(this,"plugin_"+e)||a.data(this,"plugin_"+e,new l(this,b))})}})(jQuery,document,window),$(function(){$(".popover").popover()});