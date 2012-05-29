/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('tuik.core', {
    setup: function() {
      
       $.tuik.component('tabs', {
          defaults : {
            pordefecto : 1
          },
          methods : {
            _create : function(){
              this.$element.css('background', 'red');
            },
            andar : function(){
              alert('andar');
            },
            ladrar : function(){
              alert('andar');
            }
          },
          subscriptions : { //subcriptions are not updated or retrieved with .option() method. You need to manage it manually
            'create' : function(){
              console.log('tabs create subscription callback', 'this:', this);
            }
          }
        });
      
      this.element = $('#qunit-fixture').children();
    }
  });

  test('is chainable', 1, function() {
    // Not a bad test to run on collection methods.
    
    strictEqual(this.element.tabs(), this.element, 'should be chaninable');
  });
  
  test('returns api', 1, function() {
    // Not a bad test to run on collection methods.
    
    strictEqual(typeof this.element.tabs().data('tabs'), "object" , 'should be chaninable');
  });
  // 
  // test('has public api', 1, function() {
  //   strictEqual(typeof this.carousel.tiovivo().data('tiovivo').goTo, "function", '.data("tiovivo") should return the public api');
  // });
  // 
  // test('invoke .next() when we are at last item should go to the first item', 1, function() {
  // 
  //   var api = this.carousel.tiovivo().data('tiovivo');
  //   api.goTo('9');
  //   api.next();
  // 
  //   strictEqual(api.index, 1, 'should be 1');
  // });


}(jQuery));
