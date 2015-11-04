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

$.fn.afeCheckbox = function(a) {
    var b = function(a, b) {
        return $.post(a, b, Afe.isFunction(c.onSuccess) ? c.onSuccess : Afe.noop()).done(Afe.isFunction(c.onDone) ? c.onDone : Afe.noop()).fail(Afe.isFunction(c.onFail) ? c.onFail : Afe.noop()).always(Afe.isFunction(c.onAlways) ? c.onAlways : Afe.noop());
    }, c = {
        onChecked: function(a, c) {
            var d = a.data("url");
            if (!Afe.isDefinded(d)) return;
            return b(d, {
                name: a.attr("name"),
                value: c.type
            });
        },
        onUnchecked: function(a, c) {
            var d = a.data("url");
            if (!Afe.isDefinded(d)) return;
            return b(d, {
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
            var f = e.data("type"), g = $('<label for="' + e.attr("id") + '" class="chkbox"></label>'), h = '<span class="yes">checked</span>', i = '<span class="no">unchecked</span>', j = '<span class="toggle"></span>', k = $.extend(true, {}, c);
            g.append(h, i, j).insertBefore(e);
            if (Afe.isDefinded(f) && Afe.isObject(a[f])) {
                Object.keys(a[f]).forEach(function(b) {
                    if (Afe.isDefinded(c[b]) && Afe.isFunction(a[f][b])) {
                        k[b] = a[f][b];
                    }
                });
            }
            e.addClass("replaced").on("change", function() {
                if (e.is(":checked")) {
                    g.addClass("on");
                    e.trigger("checked");
                } else {
                    g.removeClass("on");
                    e.trigger("unchecked");
                }
                e.trigger("focus");
            }).on("focus", function() {
                g.addClass("focus");
            }).on("blur", function() {
                g.removeClass("focus");
            }).on("checked", function(a) {
                k.onChecked(e, a);
            }).on("unchecked", function(a) {
                k.onUnchecked(e, a);
            });
            if (e.is(":checked")) {
                g.addClass("on");
            } else {
                g.removeClass("on");
            }
        }
    });
};

$.fn.afeRadiobox = function(a) {
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
            var f = e.data("type"), g = e.data("url"), h = $('<label for="' + e.attr("id") + '" class="radio"></label>'), i = '<span class="pip"></span>', j = $.extend(true, {}, c);
            h.append(i).insertBefore(e);
            if (Afe.isDefinded(f) && Afe.isObject(a[f])) {
                if (Afe.isDefinded(a[f].url)) {
                    j.url = a[f].url;
                }
                Object.keys(a[f]).forEach(function(b) {
                    if (Afe.isDefinded(c[b]) && Afe.isFunction(a[f][b])) {
                        j[b] = a[f][b];
                    }
                });
            }
            if (Afe.isDefinded(g)) {
                j.url = g;
            }
            e.addClass("replaced").on("change", function() {
                $("label.radio").each(function(a, b) {
                    var c = $(b);
                    if ($("#" + c.attr("for")).is(":checked")) {
                        c.addClass("on");
                        e.trigger("select");
                    } else {
                        c.removeClass("on");
                    }
                });
                e.trigger("focus");
            }).on("focus", function() {
                h.addClass("focus");
            }).on("blur", function() {
                h.removeClass("focus");
            }).on("select", function() {
                j.onSelectBasic(e);
                j.onSelect(e);
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