var Afe = Afe || {},
	core = {
		noop: function() {},
		isFunction: function (obj) {
			return obj && {}.toString.call(obj) === '[object Function]';
		},
		isObject: function (val) {
			if (val === null) {
				return false;
			}
			return ( (typeof val === 'function') || (typeof val === 'object') );
		},
		isDefinded: function (v) {
			return typeof v !== 'undefined';
		},
		isEmpty: function (value, allowEmptyString) {
			return (value == null) || (!allowEmptyString ? value === '' : false) || (this.isArray(value) && value.length === 0);
		},
		isArray: ('isArray' in Array) ? Array.isArray : function (value) {
			return toString.call(value) === '[object Array]';
		},
		clone: function (item) {
			if (item === null || item === undefined) {
				return item;
			}

			// DOM nodes
			if (item.nodeType && item.cloneNode) {
				return item.cloneNode(true);
			}

			var type = toString.call(item),
				i, j, k, clone, key;

			// Date
			if (type === '[object Date]') {
				return new Date(item.getTime());
			}

			// Array
			if (type === '[object Array]') {
				i = item.length;

				clone = [];

				while (i--) {
					clone[i] = this.clone(item[i]);
				}
			}
			// Object
			else if (type === '[object Object]' && item.constructor === Object) {
				clone = {};

				for (key in item) {
					clone[key] = this.clone(item[key]);
				}
			}

			return clone || item;
		}
	};

Afe.apply(Afe, core);