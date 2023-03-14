import { defineComponent as U, openBlock as x, createElementBlock as P, normalizeClass as J, createElementVNode as D, Fragment as K, renderSlot as pe, computed as A, withModifiers as _e, createVNode as S, unref as d, withCtx as R, toDisplayString as ye, renderList as ke, createCommentVNode as re, inject as Ae, normalizeStyle as Ye, ref as W, watch as X, reactive as je, createBlock as te, mergeProps as Ie, provide as Be } from "vue";
import { DArrowLeft as Ue, DArrowRight as He, Calendar as ze } from "@element-plus/icons-vue";
import { ElIcon as De, ElPopover as Pe } from "element-plus";
import B from "dayjs";
const Ze = { class: "el-picker-panel__body-wrapper" }, Qe = { class: "el-picker-panel__body" }, Se = /* @__PURE__ */ U({
  __name: "DatePickerPanelWrapper",
  props: {
    isRange: { type: Boolean }
  },
  setup(t) {
    const r = t;
    return (e, a) => (x(), P("div", {
      tabindex: "0",
      class: J(["el-picker-panel", r.isRange ? "el-date-range-picker" : "el-date-picker"])
    }, [
      D("div", Ze, [
        D("div", Qe, [
          r.isRange ? (x(), P(K, { key: 0 }, [
            pe(e.$slots, "range-left"),
            pe(e.$slots, "range-right")
          ], 64)) : pe(e.$slots, "default", { key: 1 })
        ])
      ])
    ], 2));
  }
}), Ge = { class: "el-picker-panel__content" }, We = { class: "el-date-picker__header el-date-picker__header--bordered" }, Xe = { class: "el-date-picker__prev-btn" }, Je = ["disabled"], Ke = { class: "el-date-picker__next-btn" }, et = ["disabled"], tt = {
  class: "el-month-table",
  style: {}
}, at = ["onClick"], he = /* @__PURE__ */ U({
  __name: "DatePickerPanel",
  props: {
    title: null,
    items: null,
    isArrowDisabledForRange: { type: [Boolean, String] }
  },
  emits: [
    "clickPrev",
    "clickNext",
    "clickItem",
    "clickTitle"
  ],
  setup(t, { emit: r }) {
    const e = t, a = A(() => Math.ceil(e.items.length / 4));
    return (l, s) => (x(), P("div", Ge, [
      D("div", We, [
        D("span", Xe, [
          D("button", {
            "aria-label": "\u4E0A\u4E00\u5E74",
            class: J(["el-picker-panel__icon-btn el-icon-d-arrow-left", {
              "is-disabled": e.isArrowDisabledForRange === "left"
            }]),
            disabled: e.isArrowDisabledForRange === "left",
            onClick: s[0] || (s[0] = _e((u) => r("clickPrev"), ["prevent"]))
          }, [
            S(d(De), null, {
              default: R(() => [
                S(d(Ue))
              ]),
              _: 1
            })
          ], 10, Je)
        ]),
        D("span", {
          role: "button",
          class: "el-date-picker__header-label",
          onClick: s[1] || (s[1] = (u) => r("clickTitle"))
        }, ye(e.title), 1),
        D("span", Ke, [
          D("button", {
            "aria-label": "\u4E0B\u4E00\u5E74",
            class: J(["el-picker-panel__icon-btn el-icon-d-arrow-right", {
              "is-disabled": e.isArrowDisabledForRange === "right"
            }]),
            disabled: e.isArrowDisabledForRange === "right",
            onClick: s[2] || (s[2] = _e((u) => r("clickNext"), ["prevent"]))
          }, [
            S(d(De), null, {
              default: R(() => [
                S(d(He))
              ]),
              _: 1
            })
          ], 10, et)
        ])
      ]),
      D("table", tt, [
        D("tbody", null, [
          (x(!0), P(K, null, ke(d(a), (u) => (x(), P("tr", { key: u }, [
            (x(!0), P(K, null, ke(e.items.slice((u - 1) * 4, (u - 1) * 4 + 4), (c) => (x(), P(K, {
              key: c.label
            }, [
              c ? (x(), P("td", {
                key: 0,
                class: J({
                  disabled: c.isDisabled,
                  "start-date": c.isStartDate,
                  "end-date": c.isEndDate,
                  "in-range": c.isInRange
                })
              }, [
                D("div", null, [
                  D("span", {
                    class: "cell",
                    onClick: (h) => r("clickItem", c)
                  }, ye(c.label), 9, at)
                ])
              ], 2)) : re("", !0)
            ], 64))), 128))
          ]))), 128))
        ])
      ])
    ]));
  }
}), rt = { class: "el-input__wrapper" }, nt = {
  key: 0,
  class: "el-input__prefix"
}, lt = { class: "el-input__prefix-inner" }, ot = { class: "el-icon el-input__icon el-range__icon" }, st = ["value", "placeholder"], it = /* @__PURE__ */ D("span", { class: "el-input__suffix" }, [
  /* @__PURE__ */ D("span", { class: "el-input__suffix-inner" })
], -1), ut = {
  inheritAttrs: !1
}, ct = /* @__PURE__ */ U({
  ...ut,
  __name: "DatePickerInput",
  props: {
    modelValue: null,
    placeholder: null,
    prefixIcon: null
  },
  emits: ["update:modelValue"],
  setup(t, { emit: r }) {
    const e = t, a = e.prefixIcon, l = Ae("style"), s = A(() => e.modelValue), u = (c, h) => {
      var f, m;
      r("update:modelValue", h, (m = (f = c == null ? void 0 : c.target) == null ? void 0 : f.value) != null ? m : "");
    };
    return (c, h) => (x(), P("div", {
      class: "el-input el-input--prefix el-input--suffix el-date-editor el-date-editor--month el-tooltip__trigger el-tooltip__trigger",
      style: Ye(d(l))
    }, [
      D("div", rt, [
        e.prefixIcon ? (x(), P("span", nt, [
          D("span", lt, [
            D("i", ot, [
              S(d(a))
            ])
          ])
        ])) : re("", !0),
        D("input", {
          value: d(s),
          placeholder: e.placeholder,
          class: "el-input__inner",
          autocomplete: "off",
          tabindex: "0",
          type: "text",
          onChange: h[0] || (h[0] = (f) => u(f, 0))
        }, null, 40, st),
        it
      ])
    ], 4));
  }
}), L = {
  year: "Y",
  halfyear: "H",
  quarteryear: "Q"
}, ee = "YYYY-MM-DD";
var dt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ee = { exports: {} };
(function(t, r) {
  (function(e, a) {
    t.exports = a();
  })(dt, function() {
    var e = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, a = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, l = /\d\d/, s = /\d\d?/, u = /\d*[^-_:/,()\s\d]+/, c = {}, h = function(n) {
      return (n = +n) + (n > 68 ? 1900 : 2e3);
    }, f = function(n) {
      return function(y) {
        this[n] = +y;
      };
    }, m = [/[+-]\d\d:?(\d\d)?|Z/, function(n) {
      (this.zone || (this.zone = {})).offset = function(y) {
        if (!y || y === "Z")
          return 0;
        var g = y.match(/([+-]|\d\d)/g), _ = 60 * g[1] + (+g[2] || 0);
        return _ === 0 ? 0 : g[0] === "+" ? -_ : _;
      }(n);
    }], $ = function(n) {
      var y = c[n];
      return y && (y.indexOf ? y : y.s.concat(y.f));
    }, k = function(n, y) {
      var g, _ = c.meridiem;
      if (_) {
        for (var E = 1; E <= 24; E += 1)
          if (n.indexOf(_(E, 0, y)) > -1) {
            g = E > 12;
            break;
          }
      } else
        g = n === (y ? "pm" : "PM");
      return g;
    }, i = { A: [u, function(n) {
      this.afternoon = k(n, !1);
    }], a: [u, function(n) {
      this.afternoon = k(n, !0);
    }], S: [/\d/, function(n) {
      this.milliseconds = 100 * +n;
    }], SS: [l, function(n) {
      this.milliseconds = 10 * +n;
    }], SSS: [/\d{3}/, function(n) {
      this.milliseconds = +n;
    }], s: [s, f("seconds")], ss: [s, f("seconds")], m: [s, f("minutes")], mm: [s, f("minutes")], H: [s, f("hours")], h: [s, f("hours")], HH: [s, f("hours")], hh: [s, f("hours")], D: [s, f("day")], DD: [l, f("day")], Do: [u, function(n) {
      var y = c.ordinal, g = n.match(/\d+/);
      if (this.day = g[0], y)
        for (var _ = 1; _ <= 31; _ += 1)
          y(_).replace(/\[|\]/g, "") === n && (this.day = _);
    }], M: [s, f("month")], MM: [l, f("month")], MMM: [u, function(n) {
      var y = $("months"), g = ($("monthsShort") || y.map(function(_) {
        return _.slice(0, 3);
      })).indexOf(n) + 1;
      if (g < 1)
        throw new Error();
      this.month = g % 12 || g;
    }], MMMM: [u, function(n) {
      var y = $("months").indexOf(n) + 1;
      if (y < 1)
        throw new Error();
      this.month = y % 12 || y;
    }], Y: [/[+-]?\d+/, f("year")], YY: [l, function(n) {
      this.year = h(n);
    }], YYYY: [/\d{4}/, f("year")], Z: m, ZZ: m };
    function o(n) {
      var y, g;
      y = n, g = c && c.formats;
      for (var _ = (n = y.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(C, M, Y) {
        var w = Y && Y.toUpperCase();
        return M || g[Y] || e[Y] || g[w].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(I, N, O) {
          return N || O.slice(1);
        });
      })).match(a), E = _.length, T = 0; T < E; T += 1) {
        var F = _[T], p = i[F], v = p && p[0], b = p && p[1];
        _[T] = b ? { regex: v, parser: b } : F.replace(/^\[|\]$/g, "");
      }
      return function(C) {
        for (var M = {}, Y = 0, w = 0; Y < E; Y += 1) {
          var I = _[Y];
          if (typeof I == "string")
            w += I.length;
          else {
            var N = I.regex, O = I.parser, Z = C.slice(w), H = N.exec(Z)[0];
            O.call(M, H), C = C.replace(H, "");
          }
        }
        return function(j) {
          var V = j.afternoon;
          if (V !== void 0) {
            var z = j.hours;
            V ? z < 12 && (j.hours += 12) : z === 12 && (j.hours = 0), delete j.afternoon;
          }
        }(M), M;
      };
    }
    return function(n, y, g) {
      g.p.customParseFormat = !0, n && n.parseTwoDigitYear && (h = n.parseTwoDigitYear);
      var _ = y.prototype, E = _.parse;
      _.parse = function(T) {
        var F = T.date, p = T.utc, v = T.args;
        this.$u = p;
        var b = v[1];
        if (typeof b == "string") {
          var C = v[2] === !0, M = v[3] === !0, Y = C || M, w = v[2];
          M && (w = v[2]), c = this.$locale(), !C && w && (c = g.Ls[w]), this.$d = function(Z, H, j) {
            try {
              if (["x", "X"].indexOf(H) > -1)
                return new Date((H === "X" ? 1e3 : 1) * Z);
              var V = o(H)(Z), z = V.year, Q = V.month, Ne = V.day, Re = V.hours, qe = V.minutes, Le = V.seconds, Oe = V.milliseconds, ge = V.zone, le = new Date(), oe = Ne || (z || Q ? 1 : le.getDate()), se = z || le.getFullYear(), G = 0;
              z && !Q || (G = Q > 0 ? Q - 1 : le.getMonth());
              var ie = Re || 0, ue = qe || 0, ce = Le || 0, de = Oe || 0;
              return ge ? new Date(Date.UTC(se, G, oe, ie, ue, ce, de + 60 * ge.offset * 1e3)) : j ? new Date(Date.UTC(se, G, oe, ie, ue, ce, de)) : new Date(se, G, oe, ie, ue, ce, de);
            } catch {
              return new Date("");
            }
          }(F, b, p), this.init(), w && w !== !0 && (this.$L = this.locale(w).$L), Y && F != this.format(b) && (this.$d = new Date("")), c = {};
        } else if (b instanceof Array)
          for (var I = b.length, N = 1; N <= I; N += 1) {
            v[1] = b[N - 1];
            var O = g.apply(this, v);
            if (O.isValid()) {
              this.$d = O.$d, this.$L = O.$L, this.init();
              break;
            }
            N === I && (this.$d = new Date(""));
          }
        else
          E.call(this, T);
      };
    };
  });
})(Ee);
const pt = Ee.exports;
B.extend(pt);
const $e = /^(\d{4})$/, we = new RegExp(`^(\\d{4})-${L.halfyear}([1-2])$`), xe = new RegExp(`^(\\d{4})-${L.quarteryear}([1-4])$`);
function ve(t, r) {
  let e = !1, a = null;
  switch (t) {
    case "year":
      e = $e.test(r), e && (a = $e.exec(r));
      break;
    case "halfyear":
      e = we.test(r), e && (a = we.exec(r));
      break;
    case "quarteryear":
      e = xe.test(r), e && (a = xe.exec(r));
      break;
    default:
      e = !1, a = null;
      break;
  }
  return {
    test: e,
    exec: a
  };
}
function ft(t, r, e = "origin") {
  return e === "array" && Array.isArray(r) ? Fe(t, r) : Me(t, new Date(r));
}
function ne(t, r, e = "origin") {
  return e === "abbr" && typeof r == "string" ? Te(t, r) : mt(t, new Date(r));
}
function fe(t, r, e = "origin", a = !1, l = ee) {
  if (e === "array" && Array.isArray(r)) {
    const s = ae(t, r, a);
    return B(s).format(l);
  } else if (e === "abbr" && typeof r == "string") {
    const s = be(t, r, a);
    return B(s).format(l);
  } else {
    const s = ae(t, ne(t, r), a);
    return B(s).format(l);
  }
}
function q(t, r, e = "origin", a = !1) {
  return e === "array" && Array.isArray(r) ? ae(t, r, a) : e === "abbr" && typeof r == "string" ? be(t, r, a) : ae(t, ne(t, r), a);
}
function Te(t, r) {
  const { test: e, exec: a } = ve(t, r);
  if (!e || !a)
    return [0, 0];
  const l = Number(a[1]), s = Number(a[2]), u = Number(a[2]);
  let c = [l, 0];
  switch (t) {
    case "year":
      c = [l, 0];
      break;
    case "halfyear":
      c = [l, s];
      break;
    case "quarteryear":
      c = [l, u];
      break;
  }
  return c;
}
function Fe(t, r) {
  const [e, a] = r;
  let l = "";
  switch (t) {
    case "year":
      l = `${e}`;
      break;
    case "halfyear":
      l = `${e}-${L.halfyear}${a}`;
      break;
    case "quarteryear":
      l = `${e}-${L.quarteryear}${a}`;
      break;
  }
  return l;
}
function be(t, r, e = !1) {
  const { test: a, exec: l } = ve(t, r);
  if (!a || !l)
    return new Date(0);
  const s = Number(l[1]), u = Number(l[2]), c = Number(l[2]);
  let h = new Date(0);
  switch (t) {
    case "year":
      h = new Date(
        B(`${s}`)[e ? "endOf" : "startOf"]("year").format(ee)
      );
      break;
    case "halfyear":
      h = new Date(
        B(`${s}-${(u - 1) * 6 + (e ? 6 : 1)}`)[e ? "endOf" : "startOf"]("month").format(ee)
      );
      break;
    case "quarteryear":
      h = new Date(
        B(`${s}-${(c - 1) * 3 + (e ? 3 : 1)}`)[e ? "endOf" : "startOf"]("month").format(ee)
      );
      break;
  }
  return h;
}
function Me(t, r) {
  const e = r.getFullYear(), a = r.getMonth() + 1, l = Math.ceil(a / 6), s = Math.ceil(a / 3);
  let u = "";
  switch (t) {
    case "year":
      u = `${e}`;
      break;
    case "halfyear":
      u = `${e}-${L.halfyear}${l}`;
      break;
    case "quarteryear":
      u = `${e}-${L.quarteryear}${s}`;
      break;
  }
  return u;
}
function ae(t, r, e = !1) {
  const a = Fe(t, r);
  return be(t, a, e);
}
function mt(t, r) {
  const e = Me(t, r);
  return Te(t, e);
}
function yt(t, r, e, a, l, s = !1) {
  const u = a.length === 2, c = a.every(($) => $.every((k) => k !== 0));
  let h = [];
  const f = new Date(), m = {
    year: f.getFullYear(),
    month: f.getMonth() + 1,
    quarteryear: Math.ceil(f.getMonth() / 3),
    halfyear: Math.ceil(f.getMonth() / 6)
  };
  return t === "year" ? h = Array(10).fill(0).map(($, k) => {
    const i = e + k, o = q("year", [i, 0], "array", s);
    return {
      type: "year",
      label: `${i}`,
      year: i,
      isToday: i === m.year,
      isCurrent: a.some((n) => n[0] === i),
      isDisabled: l(o),
      isStartDate: i === a[0][0],
      isEndDate: u && i === a[1][0],
      isInRange: u && a.every((n) => n[0] !== 0) && i >= a[0][0] && i <= a[1][0]
    };
  }) : t === "halfyear" ? h = Array(2).fill(0).map(($, k) => {
    const i = r[0], o = k + 1, n = q("halfyear", [i, o], "array", s);
    return {
      type: "halfyear",
      label: `${L.halfyear}${o}`,
      year: i,
      halfyear: o,
      isToday: i === m.year && o === m.halfyear,
      isCurrent: a.some((y) => y[0] === i && y[1] === o),
      isDisabled: l(n),
      isStartDate: i === a[0][0] && o === a[0][1],
      isEndDate: u && i === a[1][0] && o === a[1][1],
      isInRange: u && c && Number([i, o].join("")) >= Number([a[0][0], a[0][1]].join("")) && Number([i, o].join("")) <= Number([a[1][0], a[1][1]].join(""))
    };
  }) : t === "quarteryear" && (h = Array(4).fill(0).map(($, k) => {
    const i = r[0], o = k + 1, n = q("quarteryear", [i, o], "array", s);
    return {
      type: "quarteryear",
      label: `${L.quarteryear}${o}`,
      year: i,
      quarteryear: o,
      isToday: i === m.year && o === m.quarteryear,
      isCurrent: a.some((y) => y[0] === i && y[1] === o),
      isDisabled: l(n),
      isStartDate: i === a[0][0] && o === a[0][1],
      isEndDate: u && i === a[1][0] && o === a[1][1],
      isInRange: u && c && Number([i, o].join("")) >= Number([a[0][0], a[0][1]].join("")) && Number([i, o].join("")) <= Number([a[1][0], a[1][1]].join(""))
    };
  })), h;
}
function ht(t) {
  return je({
    trigger: "click",
    placement: "bottom",
    hideAfter: 0,
    transition: "el-zoom-in-top",
    visible: !1,
    popperClass: t.popperClass,
    teleported: !1
  });
}
function Ce(t, r) {
  t("update:modelValue", r);
}
function me(t, r) {
  const e = r.map((a) => a.every((l) => l === 0) ? ne(t, new Date()) : [...a]).sort((a, l) => Number(q(t, a, "array")) - Number(q(t, l, "array")));
  if (e.length === 2) {
    const a = e[0][0], l = e[1][0], s = t === "year" ? a + 10 : a + 1;
    l < s && (e[1][0] = s);
  }
  return e;
}
function Ve(t, r) {
  let e = 0, a = -1, l = [[0, 0], [0, 0]];
  const s = W(!1), u = A(() => t.modelValue.sort((p, v) => +new Date(p) - +new Date(v)).map((p) => ne(t.type, p))), c = A(() => u.value.map((p) => p.every((v) => v === 0))), h = ht(t), f = A({
    get() {
      return c.value.map((p, v) => p ? "" : ft(t.type, t.modelValue[v]));
    },
    set(p) {
      const v = p.map((b, C) => b === "" ? "" : ve(t.type, b).test ? t.valueFormat ? fe(t.type, b, "abbr", t.wantEnd, t.valueFormat) : q(t.type, b, "abbr", t.wantEnd) : t.valueFormat ? fe(t.type, u.value[C], "array", t.wantEnd, t.valueFormat) : q(t.type, u.value[C], "array", t.wantEnd)).sort((b, C) => +new Date(b) - +new Date(C));
      Ce(r, v);
    }
  }), m = W(me(t.type, u.value)), $ = W([]), k = W([t.type, t.type]), i = A(() => k.value.map((p) => p === "year")), o = A(() => m.value.map((p) => p[0] - p[0] % 10)), n = A(() => o.value.map((p) => p + 9)), y = A(() => m.value.map((p, v) => i.value[v] ? `${o.value[v]} - ${n.value[v]}` : `${p[0]}`)), g = (p) => {
    i.value[p] ? m.value[p][0] -= 10 : m.value[p][0] -= 1;
  }, _ = (p) => {
    i.value[p] ? m.value[p][0] += 10 : m.value[p][0] += 1;
  }, E = (p, v) => {
    if (!v.isDisabled)
      if (v.type === t.type && (e += 1), v.type === "year" && t.type !== "year")
        m.value[p][0] = v.year, k.value[p] = t.type;
      else {
        const b = a === -1 ? p : a === 1 ? 0 : 1;
        a = p, m.value[b] = [v.year, v[t.type] || 0], l[b] = [v.year, v[t.type] || 0];
      }
  }, T = (p) => {
    i.value[p] || t.modelValue.length === 2 || t.type.includes("range") || (k.value[p] = "year");
  };
  X([k, y], () => {
    F();
  }, { deep: !0 }), X(m, (p) => {
    var b, C, M, Y;
    if (m.value.length === 2) {
      const w = Number((C = (b = y.value[0].match(/\d{4}/g)) == null ? void 0 : b[0]) != null ? C : m.value[0][0]), I = Number((Y = (M = y.value[1].match(/\d{4}/g)) == null ? void 0 : M[0]) != null ? Y : m.value[1][0]), N = k.value[0] === "year" ? 10 : 1;
      s.value = I - w <= N;
    }
    if (e < t.modelValue.length) {
      if (e === 0)
        return;
      F([l[a]]);
      return;
    }
    const v = l.slice(0, e).map((w, I) => t.valueFormat ? fe(t.type, w, "array", t.wantEnd, t.valueFormat) : q(t.type, w, "array", t.wantEnd)).sort((w, I) => +new Date(w) - +new Date(I));
    Ce(r, v), h.visible = !1;
  }, { deep: !0 }), X(u, () => {
    c.value.every(Boolean) || (m.value = me(t.type, u.value), F());
  }), X(() => h.visible, (p) => {
    p ? (m.value = me(t.type, u.value), F()) : (e = 0, a = -1, l = [[0, 0], [0, 0]]);
  });
  function F(p = u.value) {
    $.value = t.modelValue.map((v, b) => yt(
      k.value[b],
      m.value[b],
      o.value[b],
      p,
      t.disabledDate,
      t.wantEnd
    ));
  }
  return F(), {
    popover: h,
    inputValue: f,
    panelItems: $,
    panelTitle: y,
    panelPrevClick: g,
    panelNextClick: _,
    panelItemClick: E,
    panelTitleClick: T,
    isArrowDisabledForRange: s
  };
}
const vt = {
  inheritAttrs: !1
}, bt = /* @__PURE__ */ U({
  ...vt,
  __name: "DatePickerQuarterHalfYear",
  props: {
    type: null,
    modelValue: null,
    placeholder: null,
    popperClass: null,
    valueFormat: null,
    prefixIcon: null,
    disabledDate: null,
    wantEnd: { type: Boolean }
  },
  emits: [
    "update:modelValue"
  ],
  setup(t, { emit: r }) {
    const e = t, {
      popover: a,
      inputValue: l,
      panelItems: s,
      panelTitle: u,
      panelPrevClick: c,
      panelNextClick: h,
      panelItemClick: f,
      panelTitleClick: m
    } = Ve(e, r), $ = (k, i) => {
      const o = [...l.value];
      o[k] = i, l.value = o;
    };
    return (k, i) => (x(), te(d(Pe), Ie({ width: "auto" }, d(a), {
      "onUpdate:visible": i[4] || (i[4] = (o) => d(a).visible = o)
    }), {
      reference: R(() => [
        S(ct, {
          "model-value": d(l)[0],
          placeholder: e.placeholder[0],
          "prefix-icon": e.prefixIcon,
          "onUpdate:modelValue": $
        }, null, 8, ["model-value", "placeholder", "prefix-icon"])
      ]),
      default: R(() => [
        S(Se, null, {
          default: R(() => [
            S(he, {
              title: d(u)[0],
              items: d(s)[0],
              onClickPrev: i[0] || (i[0] = (o) => d(c)(0)),
              onClickNext: i[1] || (i[1] = (o) => d(h)(0)),
              onClickItem: i[2] || (i[2] = (o) => d(f)(0, o)),
              onClickTitle: i[3] || (i[3] = (o) => d(m)(0))
            }, null, 8, ["title", "items"])
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16));
  }
}), gt = {
  key: 0,
  class: "el-icon el-input__icon el-range__icon"
}, _t = ["value", "placeholder"], kt = { class: "el-range-separator" }, Dt = ["value", "placeholder"], $t = /* @__PURE__ */ U({
  __name: "DatePickerInputRange",
  props: {
    modelValue: null,
    placeholder: null,
    prefixIcon: null,
    rangeSeparator: null
  },
  emits: ["update:modelValue"],
  setup(t, { emit: r }) {
    const e = t, a = e.prefixIcon, l = Ae("style"), s = A(() => e.modelValue[0]), u = A(() => e.modelValue[1]), c = (h, f) => {
      var m, $;
      r("update:modelValue", f, ($ = (m = h == null ? void 0 : h.target) == null ? void 0 : m.value) != null ? $ : "");
    };
    return (h, f) => (x(), P("div", {
      class: "el-date-editor el-date-editor--monthrange el-input__wrapper el-range-editor el-tooltip__trigger el-tooltip__trigger",
      style: Ye(d(l))
    }, [
      e.prefixIcon ? (x(), P("i", gt, [
        S(d(a))
      ])) : re("", !0),
      D("input", {
        value: d(s),
        placeholder: e.placeholder[0],
        class: "el-range-input",
        autocomplete: "off",
        tabindex: "0",
        type: "text",
        onChange: f[0] || (f[0] = (m) => c(m, 0))
      }, null, 40, _t),
      D("span", kt, ye(e.rangeSeparator), 1),
      D("input", {
        value: d(u),
        placeholder: e.placeholder[1],
        class: "el-range-input",
        autocomplete: "off",
        tabindex: "0",
        type: "text",
        onChange: f[1] || (f[1] = (m) => c(m, 1))
      }, null, 40, Dt)
    ], 4));
  }
}), wt = {
  inheritAttrs: !1
}, xt = /* @__PURE__ */ U({
  ...wt,
  __name: "DatePickerQuarterHalfYearRange",
  props: {
    type: null,
    modelValue: null,
    placeholder: null,
    popperClass: null,
    rangeSeparator: null,
    valueFormat: null,
    prefixIcon: null,
    disabledDate: null,
    wantEnd: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: r }) {
    const e = t, {
      popover: a,
      inputValue: l,
      panelTitle: s,
      panelItems: u,
      panelPrevClick: c,
      panelNextClick: h,
      panelItemClick: f,
      panelTitleClick: m,
      isArrowDisabledForRange: $
    } = Ve(e, r), k = (i, o) => {
      const n = [...l.value];
      n[i] = o, l.value = n;
    };
    return (i, o) => (x(), te(d(Pe), Ie({ width: "auto" }, d(a), {
      "onUpdate:visible": o[8] || (o[8] = (n) => d(a).visible = n)
    }), {
      reference: R(() => [
        S($t, {
          "model-value": d(l),
          placeholder: e.placeholder,
          "prefix-icon": e.prefixIcon,
          "range-separator": e.rangeSeparator,
          "onUpdate:modelValue": k
        }, null, 8, ["model-value", "placeholder", "prefix-icon", "range-separator"])
      ]),
      default: R(() => [
        S(Se, { "is-range": "" }, {
          "range-left": R(() => [
            S(he, {
              class: "el-date-range-picker__content is-left",
              title: d(s)[0],
              items: d(u)[0],
              "is-arrow-disabled-for-range": d($) ? "right" : !1,
              onClickPrev: o[0] || (o[0] = (n) => d(c)(0)),
              onClickNext: o[1] || (o[1] = (n) => d(h)(0)),
              onClickItem: o[2] || (o[2] = (n) => d(f)(0, n)),
              onClickTitle: o[3] || (o[3] = (n) => d(m)(0))
            }, null, 8, ["title", "items", "is-arrow-disabled-for-range"])
          ]),
          "range-right": R(() => [
            S(he, {
              class: "el-date-range-picker__content is-right",
              title: d(s)[1],
              items: d(u)[1],
              "is-arrow-disabled-for-range": d($) ? "left" : !1,
              onClickPrev: o[4] || (o[4] = (n) => d(c)(1)),
              onClickNext: o[5] || (o[5] = (n) => d(h)(1)),
              onClickItem: o[6] || (o[6] = (n) => d(f)(1, n)),
              onClickTitle: o[7] || (o[7] = (n) => d(m)(1))
            }, null, 8, ["title", "items", "is-arrow-disabled-for-range"])
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16));
  }
});
const Ct = {
  class: "component-datepicker-enhanced",
  style: { display: "inline-block" }
}, At = {
  inheritAttrs: !1
}, Yt = /* @__PURE__ */ U({
  ...At,
  __name: "DatePickerEnhanced",
  props: {
    type: null,
    modelValue: null,
    placeholder: { default: "\u9009\u62E9\u65E5\u671F" },
    startPlaceholder: { default: "\u5F00\u59CB\u65E5\u671F" },
    endPlaceholder: { default: "\u7ED3\u675F\u65E5\u671F" },
    popperClass: { default: "" },
    rangeSeparator: { default: "\u81F3" },
    valueFormat: { default: "" },
    prefixIcon: { default: ze },
    clearIcon: null,
    disabledDate: { type: Function, default: () => !1 },
    cellClassName: null,
    style: { default: "" },
    wantEnd: { type: Boolean, default: !1 }
  },
  emits: [
    "update:modelValue"
  ],
  setup(t, { emit: r }) {
    const e = t, a = A(() => e.type.replace("range", "")), l = A(() => {
      let c;
      return Array.isArray(e.modelValue) ? c = e.modelValue : c = [e.modelValue], c;
    }), s = A(() => `${e.popperClass} el-picker__popper p-0`), u = A(() => e.type.includes("range") ? [e.startPlaceholder, e.endPlaceholder] : [e.placeholder]);
    return Be("style", e.style), (c, h) => (x(), P("div", Ct, [
      ["quarteryear", "halfyear"].includes(e.type) ? (x(), te(bt, {
        key: 0,
        type: d(a),
        "model-value": [d(l)[0]],
        placeholder: d(u),
        "popper-class": d(s),
        "value-format": e.valueFormat,
        "prefix-icon": e.prefixIcon,
        "disabled-date": e.disabledDate,
        "want-end": e.wantEnd,
        "onUpdate:modelValue": h[0] || (h[0] = (f) => r("update:modelValue", f == null ? void 0 : f[0]))
      }, null, 8, ["type", "model-value", "placeholder", "popper-class", "value-format", "prefix-icon", "disabled-date", "want-end"])) : ["quarteryearrange", "halfyearrange", "yearrange"].includes(e.type) ? (x(), te(xt, {
        key: 1,
        type: d(a),
        "model-value": d(l),
        placeholder: d(u),
        "popper-class": d(s),
        "range-separator": e.rangeSeparator,
        "value-format": e.valueFormat,
        "prefix-icon": e.prefixIcon,
        "disabled-date": e.disabledDate,
        "want-end": e.wantEnd,
        "onUpdate:modelValue": h[1] || (h[1] = (f) => r("update:modelValue", f))
      }, null, 8, ["type", "model-value", "placeholder", "popper-class", "range-separator", "value-format", "prefix-icon", "disabled-date", "want-end"])) : re("", !0)
    ]));
  }
});
const It = (t, r) => {
  const e = t.__vccOpts || t;
  for (const [a, l] of r)
    e[a] = l;
  return e;
}, Mt = /* @__PURE__ */ It(Yt, [["__scopeId", "data-v-9af3a72d"]]);
export {
  Mt as default
};
