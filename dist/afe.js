var Afe = Afe || {};

Afe.apply = function(a, b, c) {
    if (c) {
        Afe.apply(a, c);
    }
    if (a && b && typeof b === "object") {
        for (var d in b) {
            a[d] = b[d];
        }
    }
    return a;
};

var Afe = Afe || {}, core = {
    noop: function() {},
    isFunction: function(a) {
        return a && {}.toString.call(a) === "[object Function]";
    },
    isObject: function(a) {
        if (a === null) {
            return false;
        }
        return typeof a === "function" || typeof a === "object";
    },
    isDefinded: function(a) {
        return typeof a !== "undefined";
    },
    isEmpty: function(a, b) {
        return a == null || (!b ? a === "" : false) || this.isArray(a) && a.length === 0;
    },
    isArray: "isArray" in Array ? Array.isArray : function(a) {
        return toString.call(a) === "[object Array]";
    },
    clone: function(a) {
        if (a === null || a === undefined) {
            return a;
        }
        if (a.nodeType && a.cloneNode) {
            return a.cloneNode(true);
        }
        var b = toString.call(a), c, d, e, f, g;
        if (b === "[object Date]") {
            return new Date(a.getTime());
        }
        if (b === "[object Array]") {
            c = a.length;
            f = [];
            while (c--) {
                f[c] = this.clone(a[c]);
            }
        } else if (b === "[object Object]" && a.constructor === Object) {
            f = {};
            for (g in a) {
                f[g] = this.clone(a[g]);
            }
        }
        return f || a;
    }
};

Afe.apply(Afe, core);

var Afe = Afe || {}, form = {};

Afe.form = {};

Afe.apply(Afe.form, form);

Afe.form.checkbox = function(a) {
    var b = function(a, b) {
        return $.post(a, b, Afe.isFunction(c.onSuccess) ? c.onSuccess : Afe.noop()).done(Afe.isFunction(c.onDone) ? c.onDone : Afe.noop()).fail(Afe.isFunction(c.onFail) ? c.onFail : Afe.noop()).always(Afe.isFunction(c.onAlways) ? c.onAlways : Afe.noop());
    }, c = {
        onChecked: function(a, c) {
            if (!Afe.isDefinded(this.url)) return;
            return b(this.url, {
                name: a.attr("name"),
                value: c.type
            });
        },
        onUnchecked: function(a, c) {
            if (!Afe.isDefinded(this.url)) return;
            return b(this.url, {
                name: a.attr("name"),
                value: c.type
            });
        },
        onSuccess: function(a) {},
        onFail: function(a) {},
        onDone: function(a) {},
        onAlways: function(a) {}
    };
    return $(this).each(function(b, d) {
        var e = $(d);
        if (e.is(":checkbox") && !e.data("checkbox-replaced")) {
            e.data("checkbox-replaced", true);
            var f = e.data("type"), g = e.closest("fieldset"), h = Afe.isDefinded(g) ? g.data("url") : false, i = e.data("url"), j = e.data("label"), k = $('<label for="' + e.attr("id") + '" class="chkbox">' + '<span class="yes">checked</span>' + '<span class="no">unchecked</span>' + '<span class="toggle"></span>' + "</label>"), l = $('<div class="wrap"></div>'), m = $.extend(true, {}, c);
            l.append(k);
            if (Afe.isDefinded(j)) {
                l.append('<span class="label">' + j + "</span>");
            }
            l.insertBefore(e);
            if (Afe.isDefinded(h)) {
                m.url = h;
            }
            if (Afe.isDefinded(f) && Afe.isObject(a[f])) {
                Object.keys(a[f]).forEach(function(b) {
                    if (Afe.isDefinded(c[b]) && Afe.isFunction(a[f][b])) {
                        m[b] = a[f][b];
                        m.url = a[f].url;
                    }
                });
            }
            if (Afe.isDefinded(i)) {
                m.url = i;
            }
            e.addClass("replaced").on("change", function() {
                if (e.is(":checked")) {
                    k.addClass("on");
                    e.trigger("checked");
                } else {
                    k.removeClass("on");
                    e.trigger("unchecked");
                }
                e.trigger("focus");
            }).on("focus", function() {
                k.addClass("focus");
            }).on("blur", function() {
                k.removeClass("focus");
            }).on("checked", function(a) {
                m.onChecked(e, a);
            }).on("unchecked", function(a) {
                m.onUnchecked(e, a);
            });
            if (e.is(":checked")) {
                k.addClass("on");
            } else {
                k.removeClass("on");
            }
        }
    });
};

Afe.form.radiobox = function(a) {
    var b = function(a, b) {
        return $.post(a, b, Afe.isFunction(c.onSuccess) ? c.onSuccess : Afe.noop()).done(Afe.isFunction(c.onDone) ? c.onDone : Afe.noop()).fail(Afe.isFunction(c.onFail) ? c.onFail : Afe.noop()).always(Afe.isFunction(c.onAlways) ? c.onAlways : Afe.noop());
    }, c = {
        onSelect: function(a) {},
        onSelectBasic: function(a) {
            if (!Afe.isDefinded(this.url)) return;
            return b(this.url, {
                name: a.attr("name"),
                value: a.val()
            });
        },
        onSuccess: function(a) {},
        onFail: function(a) {},
        onDone: function(a) {},
        onAlways: function(a) {}
    };
    return $(this).each(function(b, d) {
        var e = $(d);
        if (e.is(":radio") && !e.data("radio-replaced")) {
            e.data("radio-replaced", true);
            var f = e.data("type"), g = e.closest("fieldset"), h = Afe.isDefinded(g) ? g.data("url") : false, i = e.data("url"), j = e.data("label"), k = e.is(":checked"), l = $('<label for="' + e.attr("id") + '" class="radio"></label>'), m = '<span class="back"></span>', n = '<span class="pip"></span>', o = $.extend(true, {}, c);
            j = Afe.isDefinded(j) ? '<span class="label">' + j + "</span>" : "";
            l.append(m).append(j).append(n).insertBefore(e);
            if (Afe.isDefinded(h)) {
                o.url = h;
            }
            if (Afe.isDefinded(f) && Afe.isObject(a[f])) {
                if (Afe.isDefinded(a[f].url)) {
                    o.url = a[f].url;
                }
                Object.keys(a[f]).forEach(function(b) {
                    if (Afe.isDefinded(c[b]) && Afe.isFunction(a[f][b])) {
                        o[b] = a[f][b];
                    }
                });
            }
            if (Afe.isDefinded(i)) {
                o.url = i;
            }
            e.addClass("replaced").on("change", function() {
                $("label.radio").each(function(a, b) {
                    var c = $(b);
                    if ($("#" + c.attr("for")).is(":checked")) {
                        c.addClass("on");
                    } else {
                        c.removeClass("on");
                    }
                });
                e.trigger("select");
            }).on("blur", function() {
                l.removeClass("focus");
            }).on("select", function(a) {
                l.addClass("focus");
                o.onSelectBasic(e, a);
                o.onSelect(e, a);
            });
            $("label.radio").each(function(a, b) {
                var c = $(b);
                if ($("#" + c.attr("for")).is(":checked")) {
                    c.addClass("on");
                } else {
                    c.removeClass("on");
                }
            });
        }
    });
};

$.fn.afeCheckbox = Afe.form.checkbox;

$.fn.afeRadiobox = Afe.form.radiobox;