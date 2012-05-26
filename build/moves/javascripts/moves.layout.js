// MARKUP:
//
//<div class="layout-content-section">   <---- this class required
//  <div data-role="header">
//  </div>
//  <div data-role="header">
//  </div>
//  <div data-role="content">   <--- data-role="content" is resized
//      <ul>
//        <li></li>
//        <li></li>
//    </div><!-- .content -->
//  </div>
//</div>
(function(a,b,c,d){var e={dependencies:[{test:typeof iScroll,yep:"/moves/moves/javascripts/libs/iscroll.js",callback:function(){console.log("loaded iScroll")}}]};M.Layout=new Class(e),M.Layout.defaults={onresize:function(){console.log("REFRESHHHH!!! SCROLLSSS",a(".scroll"));var b=this;a(".scroll").each(function(a){b.isCroll_instances[a].refresh()})}},M.Layout.include({before_init:function(c,d){this.options=a.extend({},M.Layout.defaults,d),this.element=c||a('[data-role="page"]'),this.isCroll_instances=[],a(b).on("resize",a.proxy(this.resize,this)),console.log("init",this.element),this.adjust()},init:function(b,c){var d=this;a(".scroll").each(function(b){d.isCroll_instances.push(new iScroll(a(this)[0],{scrollbarClass:"scroll"}))})},adjust:function(){var c=this.element.find('[data-role="header"]').first()||0,d=this.element.find('[data-role="footer"]').last()||0;this.viewport_calculated_height=parseInt(a(b).height()-c.height()-d.height());var e=this,f=[],g=this.element.find('[data-role="section"]'),h=g.length>0?g:this.element.find('[data-role="content"]').first();return h.each(function(b){var c=0,d=a(this).children().not(".scroll"),g=a(this).find(".scroll");d.each(function(){c+=a(this).height()}),f[b]=parseInt(e.viewport_calculated_height-c),g.css("max-height",f[b]/g.length)}),this.page_sections_content_heights=f,this},resize:function(){this.adjust(),this.options.onresize.call(this),console.log("resize")}})})($,window,document);