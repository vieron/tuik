# Tuik





##$.tuik

###$.tuik.component

tuik.component is used to create new Components. Among other things is responsible for creating the jQuery compatible plugin ($.fn.componentName) from a configuration object like this:

$.tuik.component('tabs', {
 defaults : {
   option1 : true,
   option2 : function(){}
 },
 methods : {
   _create : function(){},
   destroy : function(){}
 },
 subscriptions : {
  'create' : function(){},
  'otherComponentName.create' : function(){}
 },
 parent : $.tuik.otherComponent

}
)








## Technical Specs Draft

### Tuik Class wrapper
`$.tuik`  


Some methods:

* $.tuik.publish('eventName' [, argument1, argument2, … ]);
* $.tuik.subscribe('eventName', function([, argument1, argument2, ... ]){});
* $.tuik.subscribe('eventName', fn);
* $.tuik.component(); //returns all active components

			{
				'componentName1' : [instance1, instance2, insntance3],
				'componentName2' : [instance1, instance2]
			}

* $.tuik.component(’componentName’, componentMethods)





### Component Class

Instance methods:

* $().componentName._create
* $().componentName.destroy
* $().componentName.bindEvent
* $().componentName.unbindEvent





### Pub/Sub System

A Pub/Sub system provides easy comunication between components and allows a better separation of code.

With namespaced events its easy to target all instances of a Component without knowing the reference of these instances. For example, `$.tuik.publish('componentName:eventName')` will trigger the `eventName` event in all instances of `componentName` Component (subscribed to `componentName:eventName` event).

Would be nice when developing a component wouldn't be necessary to code manually the publishing events. For this purpose events should be placed by convention as a Component property like Backbone does it  

```
this.$ = {
  element : $(element),
  tabs_links : this.$.element.find('> li a')
}
this.events = {
  'element mouseover' : fn,
  'tabs_links click' : fn
}
```

Study the need to dispatch an event each time a public method of the Component is called. Would be captured like so (`.subscribe(componentName.publicMethod)`).


**IMPORTANT!**

SUBSCRIPTIONS created after component initialization dont will be triggered by publication events emmited from inside the component.



### Component Invokation
`$(”#pepe”).componentName();`  
`$.componentName();`  

### Class method to create components and extend them
`$.tuik.component(’componentName’, componentMethods) (like $.widget in jQuery UI);`

### Component options with setters and getters
Component options can be modified at instantiation but also can be modified at runtime as follows:

#### Get 

`$().componentName.option('optionName');`

#### Set

`$().componentName.option('optionName', optionValue);`

#### At instantiation

```
$().componentName({
	'optionName': optionValue
});
```






### Component public API

Tuik Components public API is reachable in two ways:

##### 1. From the DOM element/s where Component was instantiated.
Acces is via [jQuery.data](http://api.jquery.com/jQuery.data/) method: `.data('componentName');`

For example, we can retrieve Tabs Component API like so:  

```
$('#tabs').tabs(); // return $('#tabs')
$('#tabs').data('tabs'); // return {
								publicMethod1 : fn,
								publicMethod2 : fn,
								//...
								}
```

It would be nicer calling it like `.data('api')` but a single DOM element can have several associated components and we just want to get the API of one.


##### 2. From the reference to the instance of the Component.
```
var $anyTab = $('#tabs').tabs(); // instantiation
$anyTab.tabs.api(); // return {
								publicMethod1 : fn,
								publicMethod2 : fn,
								//...
								}
```




### 




  
### Themes and patterns for component development
  
**COMPONENT DEVELOPMENT**  

```
var componentMethods = {  _create : fn,  destroy: fn,  publicMethod : fn,  _privateMethod : fn}
$.tuik.component(’componentName’, componentMethods) (like $.widget in jQuery UI);
```

**COMPONENT DESIGN**  

Download a editable Fireworks PNG as starting point.


