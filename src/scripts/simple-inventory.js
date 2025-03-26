// Simple Inventory, for SugarCube 2, by Chapel
// v3.0.1, 2024-07-22, 8c9749dbafa5f12948d743a8dedd4e1c74bb9e26
// changes: changed 'pickup' to 'gain'
// added default quantity of 1 for 'gain'
// removed typeof legacy function
("use strict");

function _classCallCheck(t, e) {
  if (!(t instanceof e))
    throw new TypeError("cannot call a class as a function");
}

function _defineProperties(t, e) {
  for (var n = 0; n < e.length; n++) {
    var i = e[n];
    (i.enumerable = i.enumerable || !1),
      (i.configurable = !0),
      "value" in i && (i.writable = !0),
      Object.defineProperty(t, _toPropertyKey(i.key), i);
  }
}

function _createClass(t, e, n) {
  return (
    e && _defineProperties(t.prototype, e),
    n && _defineProperties(t, n),
    Object.defineProperty(t, "prototype", { writable: !1 }),
    t
  );
}

function _toPropertyKey(t) {
  var e = _toPrimitive(t, "string");
  return "symbol" == typeof e ? e : String(e);
}

function _toPrimitive(t, e) {
  if ("object" != typeof t || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (void 0 !== n) {
    var i = n.call(t, e || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === e ? String : Number)(t);
}

!(function () {
  var t = {
      description: "",
      handler: null,
      displayName: "",
      consumable: !0,
      unique: !1,
      permanent: !1,
    },
    e = new Map(),
    n = (function () {
      function n() {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
          i =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : clone(t),
          r =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
        if ((_classCallCheck(this, n), !e || "string" != typeof e))
          throw new Error("invalid item ID");
        if ("object" !== typeof i) throw new Error("invalid item definition");
        Object.assign(this, Object.assign({}, t, i)),
          (this.id = e),
          (this._tags =
            r instanceof Array ? r : "string" == typeof r ? [r] : []);
      }
      return (
        _createClass(
          n,
          [
            {
              key: "tags",
              get: function () {
                return this._tags;
              },
            },
            {
              key: "hasTag",
              value: function (t) {
                return this._tags.includes(t);
              },
            },
            {
              key: "hasAllTags",
              value: function () {
                return this._tags.includesAll(
                  [].slice.call(arguments).flat(1 / 0)
                );
              },
            },
            {
              key: "hasAnyTags",
              value: function () {
                return this._tags.includesAny(
                  [].slice.call(arguments).flat(1 / 0)
                );
              },
            },
            {
              key: "name",
              get: function () {
                return this.displayName || this.id;
              },
              set: function (t) {
                this.displayName = t;
              },
            },
            {
              key: "use",
              value: function () {
                return (
                  "string" == typeof this.handler
                    ? $.wiki(this.handler)
                    : "function" == typeof this.handler && this.handler(this),
                  this
                );
              },
            },
            {
              key: "inspect",
              value: function () {
                return (
                  Dialog.setup(this.name, "simple-inventory item-description"),
                  Dialog.wiki(this.description),
                  Dialog.open(),
                  this
                );
              },
            },
          ],
          [
            {
              key: "is",
              value: function (t) {
                return t instanceof n;
              },
            },
            {
              key: "add",
              value: function (t, i, r) {
                var a = new n(t, i, r);
                return e.set(t, a), a;
              },
            },
            {
              key: "get",
              value: function (t) {
                return e.get(t);
              },
            },
            {
              key: "has",
              value: function (t) {
                return e.has(t);
              },
            },
            {
              key: "list",
              get: function () {
                return e;
              },
            },
          ]
        ),
        n
      );
    })();
  (setup.Item = n), (window.Item = window.Item || n);
})(),
  (function () {
    var t = setup.Item,
      e = !1,
      n = "&hellip;",
      i = {
        inspect: "Inspect",
        use: "use",
        drop: "drop",
        stack: "stack",
        take: "take",
        give: "give",
        stackPre: "&nbsp;&times;&nbsp;",
        stackPost: "&nbsp;",
      },
      r = {};
    function a(e) {
      return t.has(e) && t.get(e).unique;
    }
    var s = (function () {
      function s() {
        var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          e =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        _classCallCheck(this, s),
          (this.data = clone(t)),
          (this._tags =
            e instanceof Array ? e : "string" == typeof e ? [e] : []);
      }
      return (
        _createClass(
          s,
          [
            {
              key: "emit",
              value: function (t) {
                var e =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
                return s.emit(t, this, e), this;
              },
            },
            {
              key: "array",
              get: function () {
                var t = this,
                  e = [];
                return (
                  Object.keys(this.data).forEach(function (n) {
                    if ((e.push(n), t.data[n] > 1))
                      for (var i = 1; i < t.data[n]; i++) e.push(n);
                  }),
                  e
                );
              },
            },
            {
              key: "list",
              get: function () {
                return Object.keys(this.data);
              },
            },
            {
              key: "length",
              get: function () {
                return this.array.length;
              },
            },
            {
              key: "uniqueLength",
              get: function () {
                return this.list.length;
              },
            },
            {
              key: "table",
              get: function () {
                return this.data;
              },
            },
            {
              key: "tags",
              get: function () {
                return this._tags;
              },
            },
            {
              key: "hasTag",
              value: function (t) {
                return this._tags.includes(t);
              },
            },
            {
              key: "hasAllTags",
              value: function () {
                return this._tags.includesAll(
                  [].slice.call(arguments).flat(1 / 0)
                );
              },
            },
            {
              key: "hasAnyTags",
              value: function () {
                return this._tags.includesAny(
                  [].slice.call(arguments).flat(1 / 0)
                );
              },
            },
            {
              key: "count",
              value: function (t) {
                return t ? this.data[t] || 0 : this.length;
              },
            },
            {
              key: "has",
              value: function (t) {
                var e =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : 1;
                return this.data[t] >= e;
              },
            },
            {
              key: "hasAll",
              value: function () {
                var t = this;
                return [].slice
                  .call(arguments)
                  .flat(1 / 0)
                  .every(function (e) {
                    return t.has(e);
                  });
              },
            },
            {
              key: "hasAny",
              value: function () {
                var t = this;
                return [].slice
                  .call(arguments)
                  .flat(1 / 0)
                  .some(function (e) {
                    return t.has(e);
                  });
              },
            },
            {
              key: "compare",
              value: function (t) {
                var e = this,
                  n = s.itemset(t);
                return Object.keys(n).every(function (t) {
                  return e.has(t, n[t]);
                });
              },
            },
            {
              key: "merge",
              value: function (t) {
                var e = this,
                  n = s.itemset(t);
                return (
                  Object.keys(n).forEach(function (t) {
                    s.change(e, t, n[t]);
                  }),
                  n
                );
              },
            },
            {
              key: "unmerge",
              value: function (t) {
                var e = this,
                  n = {},
                  i = s.itemset(t);
                return (
                  Object.keys(i).forEach(function (t) {
                    e.has(t, i[t])
                      ? (n[t] = i[t])
                      : e.has(t) && (n[t] = e.count(t)),
                      s.change(e, t, i[t], !0);
                  }),
                  n
                );
              },
            },
            {
              key: "gain",
              value: function () {
                var t = this.merge(s.parseArgList.apply(null, arguments));
                return this.emit("update", { delta: t }), this;
              },
            },
            {
              key: "drop",
              value: function () {
                var t = this.unmerge(s.parseArgList.apply(null, arguments));
                return this.emit("update", { delta: t }), this;
              },
            },
            {
              key: "empty",
              value: function () {
                var t = clone(this.data);
                return (
                  (this.data = {}), this.emit("update", { delta: t }), this
                );
              },
            },
            {
              key: "transfer",
              value: function (t) {
                var e = s.parseArgList.apply(
                  null,
                  [].slice.call(arguments).slice(1)
                );
                if (!s.is(t))
                  throw new TypeError(
                    "target inventory is not an inventory instance"
                  );
                var n = this.unmerge(e);
                return (
                  t.merge(n), this.emit("update", { target: t, delta: n }), this
                );
              },
            },
            {
              key: "isEmpty",
              value: function () {
                return 0 === this.length;
              },
            },
            {
              key: "iterate",
              value: function (t) {
                var e = this;
                return (
                  "function" != typeof t ||
                    this.list.forEach(function (n) {
                      t(n, e.data[n]);
                    }),
                  this
                );
              },
            },
            {
              key: "use",
              value: function (e) {
                if (t.has(e)) {
                  var n = t.get(e);
                  if ((n.use(), n.consumable)) {
                    s.change(this, e, 1, !0);
                    var i = {};
                    (i[e] = 1), this.emit("update", { delta: i });
                  }
                  return this.emit("use", { item: n }), this;
                }
              },
            },
            {
              key: "clone",
              value: function () {
                return new s(this.data || {}, this._tags || []);
              },
            },
            {
              key: "toJSON",
              value: function () {
                return JSON.reviveWrapper(
                  "new setup.Inventory(" +
                    JSON.stringify(this.data) +
                    ", " +
                    JSON.stringify(this._tags) +
                    ")"
                );
              },
            },
          ],
          [
            {
              key: "confirm",
              get: function () {
                return e;
              },
              set: function (t) {
                e =
                  "string" == typeof t && "all" === t.trim().toLowerCase()
                    ? "all"
                    : "string" == typeof t && "stack" === t.trim().toLowerCase()
                    ? "stack"
                    : !!t;
              },
            },
            {
              key: "emptyMessage",
              get: function () {
                return n;
              },
              set: function (t) {
                "string" == typeof t && (n = t);
              },
            },
            {
              key: "strings",
              get: function () {
                return Object.assign(clone(i), r);
              },
              set: function (t) {
                "object" === typeof t && (r = Object.assign(r, clone(t)));
              },
            },
            {
              key: "change",
              value: function (e, n) {
                var i =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : 1,
                  r =
                    arguments.length > 3 &&
                    void 0 !== arguments[3] &&
                    arguments[3];
                if (0 !== i) {
                  if (
                    (e instanceof s && (e = e.data), "object" !== typeof e)
                  ) {
                    if (e) throw new TypeError("cannot access inventory data");
                    e = {};
                  }
                  if (!(o = n) || "string" != typeof o || !o.trim())
                    throw new TypeError("invalid item name/id");
                  var o;
                  if (
                    (("number" == typeof i &&
                      !Number.isNaN(i) &&
                      Number.isInteger(i)) ||
                      (i = 1),
                    r && (i *= -1),
                    i > 0)
                  ) {
                    if (Object.keys(e).includes(n) && a(n)) return;
                    i > 1 && a(n) && (i = 1),
                      Object.keys(e).includes(n) || (e[n] = 0),
                      (e[n] += i);
                  } else {
                    if (
                      (function (e) {
                        return t.has(e) && t.get(e).permanent;
                      })(n)
                    )
                      return;
                    Object.keys(e).includes(n) &&
                      "number" == typeof e[n] &&
                      (e[n] += i),
                      e[n] <= 0 && delete e[n];
                  }
                  return e;
                }
              },
            },
            {
              key: "itemset",
              value: function () {
                var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
                if (s.is(t) && (t = t.data), "object" !== typeof t)
                  return {};
                var e = {};
                return (
                  Object.keys(t).forEach(function (n) {
                    "number" == typeof t[n] &&
                      Number.isInteger(t[n]) &&
                      0 !== t[n] &&
                      (e[n] = t[n]);
                  }),
                  e
                );
              },
            },
            {
              key: "parseArgList",
              value: function () {
                var t = [].slice.call(arguments).flat(1 / 0); // flatten arguments into a single level array
                if (t.length % 2 != 0) // ensure there are an even number of arguments
                  throw new Error(
                    "item sets should be pairs of item IDs and numbers"
                  );
                var e = {}; // convert each pair into an object
                return (
                  t.forEach(function (n, i) {
                    i % 2 == 0 && (e[n] = t[i + 1]);
                  }),
                  e
                );
              },
            },
            {
              key: "is",
              value: function (t) {
                return t instanceof s;
              },
            },
            {
              key: "emit",
              value: function (t, e) {
                var n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : {};
                $(document).trigger(
                  Object.assign(
                    {
                      type: ":inventory-" + t + ".simple-inventory",
                      inventory: e,
                      target: null,
                      delta: {},
                      item: null,
                    },
                    n
                  )
                );
              },
            },
            {
              key: "create",
              value: function (t, e) {
                return new s(t, e);
              },
            },
          ]
        ),
        s
      );
    })();
    (setup.Inventory = s), (window.Inventory = window.Inventory || s);
  })(),
  (function () {
    var t = setup.Item,
      e = setup.Inventory;
    function n(t) {
      var n =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
        i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        r =
          arguments.length > 3 && void 0 !== arguments[3]
            ? arguments[3]
            : "Alert",
        a =
          arguments.length > 4 && void 0 !== arguments[4]
            ? arguments[4]
            : "Are you sure?";
      if (!t || "function" != typeof t)
        throw new Error("Invalid confirmation callback!");
      if (e.confirm)
        if ("all" !== e.confirm || "all" === i)
          if ("stack" !== e.confirm || i) {
            var s = { display: "inline-block", float: "right" },
              o = $(document.createElement("div")),
              u = $(document.createElement("p")).append(a),
              l = $(document.createElement("div")).addClass(
                "confirmation-buttons"
              ),
              c = $(document.createElement("button"))
                .append("Okay")
                .addClass("confirm-yes")
                .css(Object.assign(s, { "margin-right": "0.5rem" })),
              d = $(document.createElement("button"))
                .append("Cancel")
                .addClass("confirm-no")
                .css(s);
            t && "function" == typeof t && c.ariaClick(t),
              n && "function" == typeof n && d.ariaClick(n),
              l.append(d, c),
              o.append(u, l),
              Dialog.setup(r, "simple-inventory confirmation"),
              Dialog.append(o),
              Dialog.open();
          } else t();
        else t();
      else t();
    }
    function i(t) {
      var span = $(document.createElement("span")).addClass("spacer");
      return t && span.wiki("" + t), span;
    }
    function r(t, i) {
      var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        a =
          arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
      return (
        "give" === String(i).toLowerCase().trim()
          ? (i = e.strings.give)
          : "take" === String(i).toLowerCase().trim()
          ? (i = e.strings.take)
          : (i && "drop" !== String(i).toLowerCase().trim()) ||
            (i = e.strings.drop),
        $(document.createElement(r ? "button" : "a"))
          .addClass("all-link drop-link")
          .wiki(i + " all")
          .ariaClick(function () {
            t.isEmpty() ||
              n(
                function () {
                  a && e.is(a) ? (a.merge(t), t.empty()) : t.empty(),
                    Dialog.close();
                },
                function () {
                  Dialog.close();
                },
                !0
              );
          })
      );
    }

    function a(a) {
      var s,
        o =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : {
                description: !0,
                use: !0,
                transfer: null,
                drop: !0,
                all: !0,
                stack: !0,
                dropActionText: "",
                classes: "",
              },
        u = $(document.createElement("ul")).addClass("simple-inventory-list");
      if (a.length) {
        if (
          ((s = a.list.map(function (r) {
            var s = [],
              u = r;
            t.has(r) && (u = t.get(r).name),
              o.description && t.has(r) && t.get(r).description
                ? s.push(
                    (function (n, i, r) {
                      var a =
                        arguments.length > 3 &&
                        void 0 !== arguments[3] &&
                        arguments[3];
                      return (
                        (r = r || e.strings.inspect),
                        $(document.createElement(a ? "button" : "a"))
                          .addClass("inspect-link")
                          .wiki("" + r)
                          .ariaClick(function () {
                            t.get(i).inspect();
                          })
                      );
                    })(a, r, u)
                  )
                : s.push(
                    $(document.createElement("span"))
                      .append(t.has(r) ? t.get(r).name : r)
                      .addClass("item-name")
                  ),
              s.push(
                (function (t, n, i, r) {
                  var a = $(document.createElement("span")),
                    s = t.count(n);
                  return (
                    (i = i || e.strings.stackPre),
                    (r = r || e.strings.stackPost),
                    1 == s
                      ? a.addClass("item-count single")
                      : a.addClass("item-count multi"),
                    a.append("" + i + (s || 0) + r)
                  );
                })(a, r)
              ),
              o.use && t.has(r) && t.get(r).handler
                ? s.push(
                    (function (t, n, i) {
                      var r =
                        arguments.length > 3 &&
                        void 0 !== arguments[3] &&
                        arguments[3];
                      return (
                        (i = i || e.strings.use),
                        $(document.createElement(r ? "button" : "a"))
                          .addClass("use-link")
                          .wiki("" + i)
                          .ariaClick(function () {
                            t.use(n);
                          })
                      );
                    })(a, r)
                  )
                : s.push(i()),
              ((o.transfer && e.is(o.transfer)) || o.drop) &&
              !(function (e) {
                return t.has(e) && t.get(e).permanent;
              })(r)
                ? (s.push(
                    (function (t, i, r) {
                      var a =
                          arguments.length > 3 &&
                          void 0 !== arguments[3] &&
                          arguments[3],
                        s =
                          arguments.length > 4 && void 0 !== arguments[4]
                            ? arguments[4]
                            : null;
                      return (
                        "give" === String(r).toLowerCase().trim()
                          ? (r = e.strings.give)
                          : "take" === String(r).toLowerCase().trim()
                          ? (r = e.strings.take)
                          : (r && "drop" !== String(r).toLowerCase().trim()) ||
                            (r = e.strings.drop),
                        $(document.createElement(a ? "button" : "a"))
                          .addClass("drop-link")
                          .wiki("" + r)
                          .ariaClick(function () {
                            n(
                              function () {
                                s && e.is(s)
                                  ? t.transfer(s, i, 1)
                                  : t.drop(i, 1),
                                  Dialog.close();
                              },
                              function () {
                                Dialog.close();
                              }
                            );
                          })
                      );
                    })(a, r, o.dropActionText, !1, o.transfer || null)
                  ),
                  a.count(r) > 1 && o.stack
                    ? s.push(
                        (function (t, i, r) {
                          var a =
                              arguments.length > 3 &&
                              void 0 !== arguments[3] &&
                              arguments[3],
                            s =
                              arguments.length > 4 && void 0 !== arguments[4]
                                ? arguments[4]
                                : null;
                          return (
                            "give" === String(r).toLowerCase().trim()
                              ? (r = e.strings.give)
                              : "take" === String(r).toLowerCase().trim()
                              ? (r = e.strings.take)
                              : (r &&
                                  "drop" !== String(r).toLowerCase().trim()) ||
                                (r = e.strings.drop),
                            (r = r + "&nbsp;" + e.strings.stack),
                            $(document.createElement(a ? "button" : "a"))
                              .addClass("stack-link drop-link")
                              .wiki("" + r)
                              .ariaClick(function () {
                                n(
                                  function () {
                                    s && e.is(s)
                                      ? t.transfer(s, i, t.count(i))
                                      : t.drop(i, t.count(i)),
                                      Dialog.close();
                                  },
                                  function () {
                                    Dialog.close();
                                  }
                                );
                              })
                          );
                        })(a, r, o.dropActionText, !1, o.transfer || null)
                      )
                    : s.push(i()))
                : s.push(i());
            var l = r.normalize().toLowerCase().replace(/\s+/g, "-");
            return $(document.createElement("li"))
              .append(s)
              .addClass("simple-inventory-listing")
              .attr({ "data-item-id": l, "data-keyword": u });
          })),
          o.all)
        ) {
          var l = $(document.createElement("li"))
            .addClass("all-listing simple-inventory-listing")
            .append([
              i("&mdash;"),
              i(),
              i(),
              r(a, o.dropActionText, !1, o.transfer || null),
            ]);
          s.push(l);
        }
      } else
        s = $(document.createElement("li"))
          .addClass("simple-inventory-listing")
          .append($(document.createElement("span")).wiki(e.emptyMessage));
      return u.append(s), u;
    }

    e.prototype.interface = function () {
      var t,
        e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        n =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
        i = this,
        r = $(document.createElement("div")).addClass(
          "simple-inventory-wrapper"
        );
      return (
        e.filter &&
          r.append(
            (function () {
              var t = $(document.createElement("div")).addClass(
                  "simple-inventory-filter"
                ),
                e = $(document.createElement("input"))
                  .attr({ type: "text", placeholder: "Filter..." })
                  .on("input", function () {
                    var n = e.val().trim().toLowerCase(),
                      i = t
                        .parent()
                        .find(
                          "ul.simple-inventory-list li.simple-inventory-listing:not(.all-listing)"
                        );
                    n
                      ? i.each(function (t, e) {
                          var i = $(e);
                          i &&
                            i.length &&
                            (i
                              .attr("data-keyword")
                              .substring(0, n.length)
                              .trim()
                              .toLowerCase() !== n
                              ? i.hide()
                              : i.show());
                        })
                      : i.show();
                  });
              return t.append(e), t;
            })()
          ),
        r.append(a(this, e)),
        $(document).on(
          ":inventory-update.simple-inventory.gui-built-in",
          function () {
            r.length
              ? r.empty().append(a(i, e))
              : $(document).off(
                  ":inventory-update.simple-inventory.gui-built-in"
                );
          }
        ),
        n && n instanceof $ ? (t = n) : n && (t = $(n)),
        t && r.appendTo(t),
        r
      );
    };
  })(),
  (function () {
    setup.Inventory, setup.Item;
    var t = ".simple-inventory-userland",
      e = ":inventory-update.simple-inventory" + t,
      n = ":inventory-use.simple-inventory" + t;
    function i(t) {
      return t && "function" == typeof t;
    }
    Object.assign(setup.Inventory, {
      events: {
        update: {
          on: function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : null,
              n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "";
            i(t) && $(document).on(e + n, t);
          },
          one: function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : null,
              n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "";
            i(t) && $(document).one(e + n, t);
          },
          off: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : "";
            $(document).off(e + t);
          },
        },
        use: {
          on: function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : null,
              e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "";
            i(t) && $(document).on(n + e, t);
          },
          one: function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : null,
              e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "";
            i(t) && $(document).one(n + e, t);
          },
          off: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : "";
            $(document).off(n + t);
          },
        },
      },
    });
  })(),
  (function () {
    var t = ":";
    function e(e) {
      var n = (function (t) {
          return t
            .replace(/\r+/g, "\n")
            .replace(/\n+/, "\n")
            .replace(/ +/g, " ")
            .trim()
            .split(/\n/g);
        })(e),
        i = {};
      return (
        n.forEach(function (e) {
          if (e && e.trim() && e.includes(t)) {
            var n = e.trim().split(t);
            i[n[0].trim()] = n[1].trim();
          }
        }),
        i
      );
    }
    var n = (function (t) {
      try {
        return Story.has(t) ? e(Story.get(t).text) : {};
      } catch (t) {
        return console.error(t.message, t), {};
      }
    })("inventory.strings");
    n.empty &&
      "string" == typeof n.empty &&
      n.empty.trim() &&
      ((setup.Inventory.emptyMessage = n.empty), delete n.empty),
      (setup.Inventory.strings = n || {});
  })(),
  (function () {
    var t = setup.Item,
      e = setup.Inventory;
    function n(t) {
      return (
        t &&
        "string" == typeof t &&
        t.length >= 2 &&
        ("$" === t[0] || "_" === t[0])
      );
    }
    function i(t) {
      if ((n(t) && (t = State.getVar(t)), e.is(t))) return t;
    }
    Macro.add(["item", "consumable"], {
      tags: ["description", "tags", "unique", "permanent"],
      handler: function () {
        var e,
          n,
          i,
          r,
          a = null,
          s = !1,
          o = !1,
          u = !1;
        if (State.length > 0)
          return this.error(
            "items must be defined in `StoryInit` or story JavaScript!"
          );
        if (
          !this.args[0] ||
          "string" != typeof this.args[0] ||
          !this.args[0].trim()
        )
          return this.error("invalid item ID");
        if (
          ((e = this.args[0].trim()),
          "consumable" === this.name &&
            ((a = this.payload[0].contents || null), (s = !0)),
          this.args[1] && (n = this.args[1]),
          this.payload.length > 1)
        ) {
          var l = this.payload.find(function (t) {
              return "description" === t.name;
            }),
            c = this.payload.find(function (t) {
              return "tags" === t.name;
            }),
            d = this.payload.find(function (t) {
              return "unique" === t.name;
            }),
            f = this.payload.find(function (t) {
              return "permanent" === t.name;
            });
          l && (i = l.contents.trim()),
            c && (r = c.args.flat(1 / 0)),
            d && (o = !0),
            f && (u = !0);
        }
        t.add(
          e,
          {
            displayName: n || "",
            description: i || "",
            handler: a,
            consumable: s,
            unique: o,
            permanent: u,
          },
          r
        );
      },
    }),
      Macro.add("newinv", {
        handler: function () {
          var variableName = this.args.raw
            .trim()
            .split(" ")
            .first()
            .replace(/["']/g, "")
            .trim();
          if (!n(variableName))
            return this.error(
              "argument must be a story or temporary variable!"
            );
          State.setVar(variableName, new e({}, this.args.flat(1 / 0).slice(1)));
        },
      }),
      Macro.add(["gain", "drop"], {
        handler: function () {
          const inventory = i(this.args[0]); // validate the inventory object
          
          if (!inventory) {
            return this.error("first argument must be a valid inventory!");
          }
      
          // check if at least the ITEM is provided (minimum 2 arguments: inventory + item)
          if (this.args.length < 2) {
            return this.error("no item specified!");
          }
      
          // extract item and quantity (or default to 1)
          const [item, quantity = 1] = this.args.slice(1);
          
          // call the inventory method (gain/drop) with item and resolved quantity
          return void inventory[this.name](item, quantity);
        },
      });
      Macro.add("dropall", {
        handler: function () {
          var t = i(this.args[0]);
          if (!t)
            return this.error("first argument must be a valid inventory!");
          t.empty();
        },
      }),
      Macro.add(["transfer", "merge", "unmerge"], {
        handler: function () {
          var t = i(this.args[0]);
          if (!t)
            return this.error("first argument must be a valid inventory!");
          var e = i(this.args[1]);
          if (!e)
            return this.error("second argument must be a valid inventory!");
          if ("transfer" === this.name) {
            if (this.args.length < 4)
              return this.error("no items to transfer were provided");
            t.transfer(e, this.args.slice(2));
          } else t[this.name](e);
        },
      }),
      Macro.add(["inv", "take", "give"], {
        handler: function () {
          var t = null,
            n = i(this.args[0]);
          if (!n)
            return this.error("first argument must be a valid inventory!");
          this.args[1] && i(this.args[1]) && (t = i(this.args[1]));
          var r = {
            description: this.args.includesAny("inspect", "description"),
            use: this.args.includes("use"),
            transfer: t,
            drop: this.args.includes("drop"),
            all: this.args.includes("all"),
            stack: this.args.includes("stack"),
            filter: this.args.includes("filter"),
            dropActionText:
              "inv" === this.name
                ? "Drop"
                : e.strings[this.name.trim().toLowerCase()],
            classes: "macro-".concat(this.name),
          };
          n.interface(r, $(this.output));
        },
      });
  })(),
  (function () {
    var t = setup.Item,
      e = setup.Inventory;
    function n(t, e, n) {
      if ("object" !== typeof e)
        throw new TypeError(
          "the extension should be a plain generic object holding the properties and methods you want to add"
        );
      Object.keys(e).forEach(function (i) {
        if (t[i] && !n)
          throw new Error('cannot override existing property "' + i + '"!');
        t[i] = e[i];
      });
    }
    
    Object.assign(e, {
      extend: function (t) {
        n(
          e,
          t,
          arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
        );
      },
      extendPrototype: function (t) {
        var i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        n(e.prototype, t, i);
      },
    }),
      Object.assign(t, {
        extend: function (e) {
          n(
            t,
            e,
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
          );
        },
        extendPrototype: function (e) {
          var i =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          n(t.prototype, e, i);
        },
      });
  })();
// end simple inventory
