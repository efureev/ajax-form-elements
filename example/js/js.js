
$(':checkbox').afeCheckbox({
	blick: {
		onChecked: function (el) {
			console.log('onChecked_over');
		},
		onUnchecked: function (el) {
			console.log('onUnchecked_over');
		}
	}
});


$(':radio').afeRadiobox({
	notAjax: {
		url : 'http://localhost:63342',
		onSelect: function (el) {
			console.log('onSelect_over');
		}
	},
	alarm: {
		onSelect: function (el) {
			alert(el.attr('id'));
		}
	}
});
