Afe.form.checkbox = function (options) {
	var post = function (url, data) {
			return $.post(url, data, Afe.isFunction($default.onSuccess) ? $default.onSuccess : Afe.noop())
				.done(Afe.isFunction($default.onDone) ? $default.onDone : Afe.noop())
				.fail(Afe.isFunction($default.onFail) ? $default.onFail : Afe.noop())
				.always(Afe.isFunction($default.onAlways) ? $default.onAlways : Afe.noop());
		},
		$default = {
			onChecked: function (el, e) {
				if (!Afe.isDefinded(this.url))
					return;
				return post(this.url, {name: el.attr('name'), value: e.type});
			},
			onUnchecked: function (el, e) {
				if (!Afe.isDefinded(this.url))
					return;
				return post(this.url, {name: el.attr('name'), value: e.type});
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
		if ($this.is(':checkbox') && !$this.data('checkbox-replaced')) {
			$this.data('checkbox-replaced', true);

			var type = $this.data('type'),
				fieldset = $this.closest('fieldset'),
				commonUrl = Afe.isDefinded(fieldset) ? fieldset.data('url') : false,
				url = $this.data('url'),
				label = $this.data('label'),
				$l = $('<label for="' + $this.attr('id') + '" class="chkbox">' +
					'<span class="yes">checked</span>' +
					'<span class="no">unchecked</span>' +
					'<span class="toggle"></span>' +
					'</label>'),
				$w = $('<div class="wrap"></div>'),
				_default = $.extend(true, {}, $default);

			$w.append($l);

			if (Afe.isDefinded(label)) {
				$w.append('<span class="label">' + label + '</span>');
			}
			$w.insertBefore($this);

			if (Afe.isDefinded(commonUrl)) {
				_default.url = commonUrl;
			}

			if (Afe.isDefinded(type) && Afe.isObject(options[type])) {

				Object.keys(options[type]).forEach(function (property) {
					if (Afe.isDefinded($default[property]) && Afe.isFunction(options[type][property])) {
						_default[property] = options[type][property];
						_default.url = options[type].url;
					}
				});
			}

			if (Afe.isDefinded(url)) {
				_default.url = url;
			}

			$this
				.addClass('replaced')
				.on('change', function () {
					if ($this.is(':checked')) {
						$l.addClass('on');
						$this.trigger('checked');

					} else {
						$l.removeClass('on');
						$this.trigger('unchecked');
					}
					$this.trigger('focus');
				})
				.on('focus', function () {
					$l.addClass('focus')
				})
				.on('blur', function () {
					$l.removeClass('focus')
				})
				.on('checked', function (e) {
					_default.onChecked($this, e);
				})
				.on('unchecked', function (e) {
					_default.onUnchecked($this, e);
				});

			// check if the checkbox is checked on init.
			if ($this.is(':checked')) {
				$l.addClass('on');
			}
			else {
				$l.removeClass('on');
			}

		}

	});
};