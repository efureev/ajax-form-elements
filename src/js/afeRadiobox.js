$.fn.afeRadiobox = function (options) {

	var post = function (url, data) {
			return $.post(url, data, Afe.isFunction($default.onSuccess) ? $default.onSuccess : Afe.noop())
				.done(Afe.isFunction($default.onDone) ? $default.onDone : Afe.noop())
				.fail(Afe.isFunction($default.onFail) ? $default.onFail : Afe.noop())
				.always(Afe.isFunction($default.onAlways) ? $default.onAlways : Afe.noop());
		},
		$default = {
			onSelect: function (el) {
			},
			onSelectBasic: function (el) {
				if (!Afe.isDefinded(this.url))
					return;
				return post(this.url, {name: el.attr('name'), value: el.val()});
			},
			onSuccess: function (data) {
			},
			onFail: function (data) {
			},
			onDone: function (data) {
			},
			onAlways: function (data) {
			}
		};

	return $(this).each(function (k, v) {

		var $this = $(v);
		if ($this.is(':radio') && !$this.data('radio-replaced')) {

			$this.data('radio-replaced', true);

			var type = $this.data('type'),
				url = $this.data('url'),
				$l = $('<label for="' + $this.attr('id') + '" class="radio"></label>'),
				p = '<span class="pip"></span>',
				_default = $.extend(true, {}, $default);

			$l.append(p).insertBefore($this);

			if (Afe.isDefinded(type) && Afe.isObject(options[type])) {

				if (Afe.isDefinded(options[type].url)) {
					_default.url = options[type].url;
				}

				Object.keys(options[type]).forEach(function (property) {
					if (Afe.isDefinded($default[property]) && Afe.isFunction(options[type][property])) {
						_default[property] = options[type][property];
					}
				});
			}

			if (Afe.isDefinded(url)) {
				_default.url = url;
			}

			$this
				.addClass('replaced')
				.on('change', function () {

					$('label.radio').each(function (k, value) {
						var $value = $(value);
						if ($('#' + $value.attr('for')).is(':checked')) {
							$value.addClass('on');
							$this.trigger('select');
						} else {
							$value.removeClass('on');
						}

					});

					$this.trigger('focus');

				})
				.on('focus', function () {
					$l.addClass('focus')
				})
				.on('blur', function () {
					$l.removeClass('focus')
				})
				.on('select', function () {
					_default.onSelectBasic($this);
					_default.onSelect($this);
				});


			// check if the radio is checked on init.
			$('label.radio').each(function (k, value) {
				var $value = $(value);
				if ($('#' + $value.attr('for')).is(':checked')) {
					$value.addClass('on');
				} else {
					$value.removeClass('on');
				}

			});

		}

	});

};