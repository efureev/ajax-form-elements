# ajaxFormElements

## Dependencies

- [jQuery v2.1.4](http://jquery.com/)


## Getting Started

### Install

You can install using bower (recommended):

```javascript
$ bower install ajax-form-elements
```

or [download](https://github.com/efureev/ajax-form-elements) manually.


### Usage

Add the following resources for the ajax-form-elements to function correctly.

```html
<!-- Required Stylesheets -->
<link href="afe.css" rel="stylesheet">

<!-- Required Javascript -->
<script src="jquery.js"></script>
<script src="afe.min.js"></script>
```

The component will bind to any existing DOM element.

#### Checkbox 

```html
<input type="checkbox" id="chk" name="chk" data-url="http://localhost:63342">
<input type="checkbox" id="chk2" name="chk2" data-type="blick" checked>
<input type="checkbox" id="chk2" name="chk3" data-type="type2" checked>
<input type="checkbox" id="chk2" name="chk4">
```
```javascript
$(':checkbox').chkbox({
	blick: {
		onChecked: function (el) {
			console.log('onChecked_over');
		},
		onUnchecked: function (el) {
			console.log('onUnchecked_over');
		}
	},
	type2 : {
	...
	}
});
```


#### Radiobox 

```html
<input type="radio" id="rdbox" name="rdbox" data-url="http://localhost:63342" value="1">
<input type="radio" id="rdbox2" name="rdbox" data-type="notAjax" value="2">
<input type="radio" id="rdbox3" name="rdbox" checked value="3">
```

```javascript
$(':radio').rdo({
	notAjax: {
		url : 'http://localhost:63342',
		onSelect: function (el) {
			console.log('onSelect_over');
		}
	}
});
```
