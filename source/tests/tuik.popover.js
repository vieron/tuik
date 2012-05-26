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

  module('jQuery#popover', {
    setup: function() {
      this.element = $('#qunit-fixture').children();
    }
  });

  test('is chainable', 1, function() {
    // Not a bad test to run on collection methods.
    strictEqual(this.element.popover(), this.element, 'should be chaninable');
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
