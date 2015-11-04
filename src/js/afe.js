var Afe = Afe || {};

Afe.apply = function (object, config, defaults) {
	if (defaults) {
		Afe.apply(object, defaults);
	}

	if (object && config && typeof config === 'object') {
		for (var i in config) {
			object[i] = config[i];
		}
	}

	return object;
};