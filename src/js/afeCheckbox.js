Afe.form.checkbox = function (options) {
	var post = function (url, data) {
			return $.post(url, data, Afe.isFunction($default.onSuccess) ? $default.onSuccess : Afe.noop())
				.done(Afe.isFunction($default.onDone) ? $default.onDone : Afe.noop())
				.fail(Afe.isFunction($default.onFail) ? $default.onFail : Afe.noop())
				.always(Afe.isFunction($default.onAlways) ? $default.onAlways : Afe.noop());
		},
		$default = {
			onChecked: function (el, e) {
				var url = el.data('url');
				if (!Afe.isDefinded(url))
					return;
				return post(url, {name: el.attr('name'), value: e.type});
			},
			onUnchecked: function (el, e) {
				var url = el.data('url');
				if (!Afe.isDefinded(url))
					return;
				return post(url, {name: el.attr('name'), value: e.type});
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
				$l = $('<label for="' + $this.attr('id') + '" class="chkbox"></label>'),
				y = '<span class="yes">checked</span>',
				n = '<span class="no">unchecked</span>',
				t = '<span class="toggle"></span>',
				_default = $.extend(true, {}, $default);

			$l.append(y, n, t).insertBefore($this);

			if (Afe.isDefinded(type) && Afe.isObject(options[type])) {

				Object.keys(options[type]).forEach(function (property) {
					if (Afe.isDefinded($default[property]) && Afe.isFunction(options[type][property])) {
						_default[property] = options[type][property];
					}
				});
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