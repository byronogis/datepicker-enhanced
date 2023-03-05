import { defineComponent as G, toRef as Re, ref as R, openBlock as A, createElementBlock as B, normalizeClass as Q, unref as s, createElementVNode as V, Fragment as re, renderSlot as K, computed as T, watchEffect as ae, watch as O, reactive as Ve, createVNode as U, withCtx as H, toDisplayString as ye, renderList as be, createCommentVNode as ne, inject as Ce, createBlock as j, provide as Fe, mergeProps as Ne } from "vue";
import { ElIcon as ke, ElPopover as xe, ElDatePicker as Le } from "element-plus";
import { DArrowLeft as Be, DArrowRight as Ue, Calendar as qe } from "@element-plus/icons-vue";
import X from "dayjs";
const He = { class: "el-picker-panel__body-wrapper" }, ze = { class: "el-picker-panel__body" }, Pe = /* @__PURE__ */ G({
  __name: "DatePickerPanelWrapper",
  props: {
    isRange: { type: Boolean }
  },
  setup(r, { expose: n }) {
    const t = Re(r, "isRange"), a = R(!1), u = (f) => a.value = f;
    return n({
      focus: a
    }), (f, i) => (A(), B("div", {
      tabindex: "0",
      class: Q(["el-picker-panel", s(t) ? "el-date-range-picker" : "el-date-picker"]),
      onFocus: i[0] || (i[0] = (c) => u(!0)),
      onBlur: i[1] || (i[1] = (c) => u(!1))
    }, [
      V("div", He, [
        V("div", ze, [
          s(t) ? (A(), B(re, { key: 0 }, [
            K(f.$slots, "range-left"),
            K(f.$slots, "range-right")
          ], 64)) : K(f.$slots, "default", { key: 1 })
        ])
      ])
    ], 34));
  }
});
var Qe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, we = { exports: {} };
(function(r, n) {
  (function(e, t) {
    r.exports = t();
  })(Qe, function() {
    var e = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, a = /\d\d/, u = /\d\d?/, f = /\d*[^-_:/,()\s\d]+/, i = {}, c = function(p) {
      return (p = +p) + (p > 68 ? 1900 : 2e3);
    }, l = function(p) {
      return function(m) {
        this[p] = +m;
      };
    }, d = [/[+-]\d\d:?(\d\d)?|Z/, function(p) {
      (this.zone || (this.zone = {})).offset = function(m) {
        if (!m || m === "Z")
          return 0;
        var y = m.match(/([+-]|\d\d)/g), h = 60 * y[1] + (+y[2] || 0);
        return h === 0 ? 0 : y[0] === "+" ? -h : h;
      }(p);
    }], g = function(p) {
      var m = i[p];
      return m && (m.indexOf ? m : m.s.concat(m.f));
    }, $ = function(p, m) {
      var y, h = i.meridiem;
      if (h) {
        for (var w = 1; w <= 24; w += 1)
          if (p.indexOf(h(w, 0, m)) > -1) {
            y = w > 12;
            break;
          }
      } else
        y = p === (m ? "pm" : "PM");
      return y;
    }, o = { A: [f, function(p) {
      this.afternoon = $(p, !1);
    }], a: [f, function(p) {
      this.afternoon = $(p, !0);
    }], S: [/\d/, function(p) {
      this.milliseconds = 100 * +p;
    }], SS: [a, function(p) {
      this.milliseconds = 10 * +p;
    }], SSS: [/\d{3}/, function(p) {
      this.milliseconds = +p;
    }], s: [u, l("seconds")], ss: [u, l("seconds")], m: [u, l("minutes")], mm: [u, l("minutes")], H: [u, l("hours")], h: [u, l("hours")], HH: [u, l("hours")], hh: [u, l("hours")], D: [u, l("day")], DD: [a, l("day")], Do: [f, function(p) {
      var m = i.ordinal, y = p.match(/\d+/);
      if (this.day = y[0], m)
        for (var h = 1; h <= 31; h += 1)
          m(h).replace(/\[|\]/g, "") === p && (this.day = h);
    }], M: [u, l("month")], MM: [a, l("month")], MMM: [f, function(p) {
      var m = g("months"), y = (g("monthsShort") || m.map(function(h) {
        return h.slice(0, 3);
      })).indexOf(p) + 1;
      if (y < 1)
        throw new Error();
      this.month = y % 12 || y;
    }], MMMM: [f, function(p) {
      var m = g("months").indexOf(p) + 1;
      if (m < 1)
        throw new Error();
      this.month = m % 12 || m;
    }], Y: [/[+-]?\d+/, l("year")], YY: [a, function(p) {
      this.year = c(p);
    }], YYYY: [/\d{4}/, l("year")], Z: d, ZZ: d };
    function v(p) {
      var m, y;
      m = p, y = i && i.formats;
      for (var h = (p = m.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(_, k, P) {
        var S = P && P.toUpperCase();
        return k || y[P] || e[P] || y[S].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(M, N, L) {
          return N || L.slice(1);
        });
      })).match(t), w = h.length, x = 0; x < w; x += 1) {
        var b = h[x], E = o[b], I = E && E[0], F = E && E[1];
        h[x] = F ? { regex: I, parser: F } : b.replace(/^\[|\]$/g, "");
      }
      return function(_) {
        for (var k = {}, P = 0, S = 0; P < w; P += 1) {
          var M = h[P];
          if (typeof M == "string")
            S += M.length;
          else {
            var N = M.regex, L = M.parser, W = _.slice(S), C = N.exec(W)[0];
            L.call(k, C), _ = _.replace(C, "");
          }
        }
        return function(D) {
          var Y = D.afternoon;
          if (Y !== void 0) {
            var q = D.hours;
            Y ? q < 12 && (D.hours += 12) : q === 12 && (D.hours = 0), delete D.afternoon;
          }
        }(k), k;
      };
    }
    return function(p, m, y) {
      y.p.customParseFormat = !0, p && p.parseTwoDigitYear && (c = p.parseTwoDigitYear);
      var h = m.prototype, w = h.parse;
      h.parse = function(x) {
        var b = x.date, E = x.utc, I = x.args;
        this.$u = E;
        var F = I[1];
        if (typeof F == "string") {
          var _ = I[2] === !0, k = I[3] === !0, P = _ || k, S = I[2];
          k && (S = I[2]), i = this.$locale(), !_ && S && (i = y.Ls[S]), this.$d = function(W, C, D) {
            try {
              if (["x", "X"].indexOf(C) > -1)
                return new Date((C === "X" ? 1e3 : 1) * W);
              var Y = v(C)(W), q = Y.year, Z = Y.month, Me = Y.day, Ye = Y.hours, Ae = Y.minutes, Ee = Y.seconds, Te = Y.milliseconds, _e = Y.zone, oe = new Date(), se = Me || (q || Z ? 1 : oe.getDate()), ue = q || oe.getFullYear(), le = 0;
              q && !Z || (le = Z > 0 ? Z - 1 : oe.getMonth());
              var ie = Ye || 0, ce = Ae || 0, de = Ee || 0, pe = Te || 0;
              return _e ? new Date(Date.UTC(ue, le, se, ie, ce, de, pe + 60 * _e.offset * 1e3)) : D ? new Date(Date.UTC(ue, le, se, ie, ce, de, pe)) : new Date(ue, le, se, ie, ce, de, pe);
            } catch {
              return new Date("");
            }
          }(b, F, E), this.init(), S && S !== !0 && (this.$L = this.locale(S).$L), P && b != this.format(F) && (this.$d = new Date("")), i = {};
        } else if (F instanceof Array)
          for (var M = F.length, N = 1; N <= M; N += 1) {
            I[1] = F[N - 1];
            var L = y.apply(this, I);
            if (L.isValid()) {
              this.$d = L.$d, this.$L = L.$L, this.init();
              break;
            }
            N === M && (this.$d = new Date(""));
          }
        else
          w.call(this, x);
      };
    };
  });
})(we);
const je = we.exports;
X.extend(je);
const ee = "YYYY-MM-DD", We = [
  ["halfyear", "H"],
  ["quarteryear", "Q"]
];
function Ze(r, n) {
  const t = X(r).format(ee).split("-").map(Number), a = t[0], u = t[1], f = {
    halfyear: Math.ceil(u / 6),
    quarteryear: Math.ceil(u / 3)
  };
  let i;
  if (n === "halfyear" || n === "quarteryear") {
    const c = We.find((l) => l[0] === n)[1];
    i = `${a}-${c}${f[n]}`;
  } else
    i = `${a}`;
  return i;
}
function J(r, n) {
  const e = (t) => X(t, ee, !0).isValid() ? Ze(t, n) : "";
  return Array.isArray(r) ? r.map((t) => e(t)) : e(r);
}
function z(r, n) {
  const e = (t) => {
    const a = t.split("-"), u = a[0];
    if (n === "halfyear") {
      const f = [u, (Number(a[1][1]) - 1) * 6 + 1].join("-");
      return X(f).format(ee);
    } else if (n === "quarteryear") {
      const f = [u, (Number(a[1][1]) - 1) * 3 + 1].join("-");
      return X(f).format(ee);
    } else
      return X(u).format(ee);
  };
  return Array.isArray(r) ? r.map((t) => t !== "" ? e(t) : "") : r !== "" ? e(r) : "";
}
const Oe = ["\u4E00", "\u4E8C", "\u4E09", "\u56DB"], Ge = ["\u4E0A", "\u4E0B"], Ie = {
  quarteryear: "Q",
  halfyear: "H",
  year: "Y"
};
function Xe(r) {
  return Ve({
    trigger: "click",
    placement: "bottom",
    hideAfter: 0,
    transition: "el-zoom-in-top",
    visible: !1,
    popperClass: r.popperClass
  });
}
function $e(r, n, e, t) {
  const a = r.type.replace("range", ""), u = R([]), f = T(() => u.value[e].every((_) => _ === 0));
  ae(() => {
    var k, P;
    const _ = r.modelValue.map((S) => {
      const { test: M, exec: N } = fe(a, J(S, a)), L = a !== "year" ? 3 : 2;
      return M && N && N.slice(1, L).map(Number) || [0, 0];
    });
    ((k = _[e]) == null ? void 0 : k.join("")) !== ((P = u.value[e]) == null ? void 0 : P.join("")) && (u.value = _);
  });
  const i = t || Xe(r), c = T(() => f.value ? "" : J(r.modelValue[e], a)), l = T(() => r.startPlaceholder), d = T(() => r.endPlaceholder), g = (_) => {
    const k = r.modelValue.map((M) => z(J(M, a), a));
    if (_ === "") {
      k[e] = "", n("update:modelValue", k);
      return;
    }
    const { test: P, exec: S } = fe(a, _);
    if (P && S) {
      const M = z(te(a, S.slice(1, 3).map(Number)), a);
      if (e === 0 && new Date(M).getTime() > new Date(k[1]).getTime()) {
        n("update:modelValue", k);
        return;
      } else if (e === 1 && new Date(M).getTime() < new Date(k[0]).getTime()) {
        n("update:modelValue", k);
        return;
      }
      k[e] = M, n("update:modelValue", k);
    }
  }, o = R((() => {
    if (f.value) {
      const _ = e === 1 ? u.value[0] : u.value[1];
      return _.every((P) => P === 0) ? [new Date().getFullYear(), 1] : [..._];
    } else
      return [...u.value[e]];
  })()), v = R(a), p = R([]), m = T(() => o.value[0]), y = T(() => v.value === "year"), h = T(() => Math.floor(m.value / 10) * 10), w = T(() => {
    let _;
    switch (v.value) {
      case "year":
        _ = `${h.value} - ${h.value + 9}`;
        break;
      default:
        _ = `${m.value}`;
        break;
    }
    return _;
  }), x = () => {
    y.value ? o.value[0] -= 10 : o.value[0] -= 1, F();
  }, b = () => {
    y.value ? o.value[0] += 10 : o.value[0] += 1, F();
  }, E = (_) => {
    if (!_.isDisabled)
      if (y.value && a !== "year")
        o.value[0] = _.year, v.value = a;
      else {
        const k = [];
        k[0] = _.year, a !== "year" && (k[1] = _[a]);
        const P = te(a, k);
        fe(a, P).test && (o.value = k);
      }
  }, I = () => {
    y.value || (v.value = "year");
  };
  O(() => v.value, () => {
    F();
  }), O(() => o.value, (_, k) => {
    const P = z(te(a, o.value), a), S = r.modelValue.map((M) => z(J(M, a), a));
    S[e] = P, n("update:modelValue", S), F();
  }), O(() => u.value, () => {
    f.value || (o.value[0] = u.value[e][0], a !== "year" && (o.value[1] = u.value[e][1]), F());
  });
  function F() {
    p.value = Je(
      v.value,
      m.value,
      h.value,
      f.value ? o.value : u.value[e],
      r.disabledDate
    );
  }
  return F(), {
    popover: i,
    inputValue: c,
    inputStartPlaceholder: l,
    inputEndPlaceholder: d,
    inputValueUpdate: g,
    panelTitle: w,
    panelItems: p,
    panelPrevClick: x,
    panelNextClick: b,
    panelItemClick: E,
    panelTitleClick: I,
    panelType: v
  };
}
function te(r, n) {
  return r === "year" ? `${n[0]}` : `${n[0]}-${Ie[r]}${n[1]}`;
}
function fe(r, n) {
  const e = r !== "year" ? new RegExp(`^(\\d{4})-${Ie[r]}(\\d)$`) : new RegExp("^(\\d{4})$");
  let t = e.test(n);
  const a = e.exec(n);
  return t && a && (r === "halfyear" && ![1, 2].includes(Number(a[2])) || r === "quarteryear" && ![1, 2, 3, 4].includes(Number(a[2]))) && (t = !1), {
    test: t,
    exec: a
  };
}
function Je(r, n, e, t, a) {
  let u;
  const f = new Date(), i = f.getFullYear(), c = f.getMonth() + 1, l = Math.ceil(c / 3), d = Math.ceil(c / 6);
  return r === "quarteryear" ? u = Oe.map((g, $) => {
    const o = n, v = $ + 1;
    return {
      label: `\u7B2C${g}\u5B63\u5EA6`,
      year: o,
      quarteryear: v,
      isToday: o === i && v === l,
      isCurrent: o === t[0] && v === t[1],
      isDisabled: a(new Date(`${o}-${(v - 1) * 3 + 1}`))
    };
  }) : r === "halfyear" ? u = Ge.map((g, $) => {
    const o = n, v = $ + 1;
    return {
      label: `${g}\u534A\u5E74`,
      year: o,
      halfyear: v,
      isToday: o === i && v === d,
      isCurrent: o === t[0] && v === t[1],
      isDisabled: a(new Date(`${o}-${(v - 1) * 6 + 1}`))
    };
  }) : r === "year" ? u = Array(10).fill(1).map((g, $) => {
    const o = e + $;
    return {
      label: `${o}`,
      year: o,
      isToday: o === i,
      isCurrent: o === t[0],
      isDisabled: a(new Date(`${o}`))
    };
  }) : u = [], u;
}
const Ke = { class: "el-picker-panel__content" }, et = { class: "el-date-picker__header el-date-picker__header--bordered" }, tt = {
  class: "el-month-table",
  style: {}
}, at = ["onClick"], ge = /* @__PURE__ */ G({
  __name: "DatePickerPanel",
  props: {
    title: null,
    items: null,
    leftPanelArrowDisabled: { type: Boolean },
    rightPanelArrowDisabled: { type: Boolean },
    type: { default: "year" },
    typeSecond: { default: "year" },
    range: null,
    leftValue: { default: "" },
    rightValue: { default: "" }
  },
  emits: [
    "clickPrev",
    "clickNext",
    "clickTitle",
    "clickItem"
  ],
  setup(r, { emit: n }) {
    const e = r, t = T(() => Math.ceil(e.items.length / 4)), a = (i) => {
      const c = te(e.type, [i.year, i[e.type] || NaN]), l = z(c, e.type), d = z(e.rightValue, e.type);
      return !(d === "" || new Date(l) <= new Date(d));
    }, u = (i) => {
      const c = te(e.typeSecond, [i.year, i[e.typeSecond] || NaN]), l = z(c, e.typeSecond), d = z(e.leftValue, e.typeSecond);
      return !(d === "" || new Date(l) >= new Date(d));
    }, f = (i) => i.isDisabled ? !0 : e.range === 1 ? a(i) : e.range === 2 ? u(i) : !1;
    return (i, c) => (A(), B("div", Ke, [
      V("div", et, [
        V("span", {
          class: Q(["el-date-picker__prev-btn", [e.leftPanelArrowDisabled && "is-disabled cursor-not-allowed"]])
        }, [
          V("span", {
            "aria-label": "\u4E0A\u4E00\u5E74",
            class: Q(["el-picker-panel__icon-btn el-icon-d-arrow-left", [e.leftPanelArrowDisabled && "is-disabled pointer-events-none"]]),
            onClick: c[0] || (c[0] = (l) => n("clickPrev"))
          }, [
            U(s(ke), {
              class: Q([e.leftPanelArrowDisabled && "is-disabled cursor-not-allowed"])
            }, {
              default: H(() => [
                U(s(Be))
              ]),
              _: 1
            }, 8, ["class"])
          ], 2)
        ], 2),
        V("span", {
          role: "button",
          class: "el-date-picker__header-label",
          onClick: c[1] || (c[1] = (l) => n("clickTitle"))
        }, ye(e.title), 1),
        V("span", {
          class: Q(["el-date-picker__next-btn", [e.rightPanelArrowDisabled && "is-disabled cursor-not-allowed"]])
        }, [
          V("span", {
            "aria-label": "\u4E0B\u4E00\u5E74",
            class: Q(["el-picker-panel__icon-btn el-icon-d-arrow-right", [e.rightPanelArrowDisabled && "is-disabled pointer-events-none"]]),
            onClick: c[2] || (c[2] = (l) => n("clickNext"))
          }, [
            U(s(ke), {
              class: Q([e.rightPanelArrowDisabled && "is-disabled cursor-not-allowed"])
            }, {
              default: H(() => [
                U(s(Ue))
              ]),
              _: 1
            }, 8, ["class"])
          ], 2)
        ], 2)
      ]),
      V("table", tt, [
        V("tbody", null, [
          (A(!0), B(re, null, be(s(t), (l) => (A(), B("tr", { key: l }, [
            (A(!0), B(re, null, be(e.items.slice((l - 1) * 4, (l - 1) * 4 + 4), (d) => (A(), B(re, {
              key: d.label
            }, [
              d ? (A(), B("td", {
                key: 0,
                class: Q({
                  today: d.isToday,
                  current: d.isCurrent,
                  disabled: f(d),
                  "pointer-events-none": f(d)
                })
              }, [
                V("div", {
                  class: Q({ "cursor-not-allowed": f(d) })
                }, [
                  V("span", {
                    class: "cell",
                    onClick: (g) => n("clickItem", d)
                  }, ye(d.label), 9, at)
                ], 2)
              ], 2)) : ne("", !0)
            ], 64))), 128))
          ]))), 128))
        ])
      ])
    ]));
  }
}), lt = { class: "el-input el-input--prefix el-input--suffix el-date-editor el-date-editor--month el-tooltip__trigger el-tooltip__trigger" }, rt = { class: "el-input__wrapper" }, nt = {
  key: 0,
  class: "el-input__prefix"
}, ot = { class: "el-input__prefix-inner" }, st = { class: "el-icon el-input__icon el-range__icon" }, ut = ["value", "placeholder"], it = /* @__PURE__ */ V("span", { class: "el-input__suffix" }, [
  /* @__PURE__ */ V("span", { class: "el-input__suffix-inner" })
], -1), ct = {
  inheritAttrs: !1
}, dt = /* @__PURE__ */ G({
  ...ct,
  __name: "DatePickerInput",
  props: {
    value: null,
    placeholder: null,
    prefixIcon: null
  },
  emits: ["update:value"],
  setup(r, { expose: n, emit: e }) {
    const t = r, a = t.prefixIcon, u = R(!1), f = (i) => u.value = i;
    return n({
      focus: u
    }), (i, c) => (A(), B("div", lt, [
      V("div", rt, [
        t.prefixIcon ? (A(), B("span", nt, [
          V("span", ot, [
            V("i", st, [
              U(s(a))
            ])
          ])
        ])) : ne("", !0),
        V("input", {
          autocomplete: "off",
          name: "",
          tabindex: "0",
          class: "el-input__inner",
          type: "text",
          value: t.value,
          placeholder: t.placeholder,
          onChange: c[0] || (c[0] = (l) => {
            var d, g;
            return e("update:value", (g = (d = l.target) == null ? void 0 : d.value) != null ? g : "");
          }),
          onClick: c[1] || (c[1] = (l) => f(!0)),
          onBlur: c[2] || (c[2] = (l) => f(!1))
        }, null, 40, ut),
        it
      ])
    ]));
  }
}), pt = ["\u4E00", "\u4E8C", "\u4E09", "\u56DB"], ft = ["\u4E0A", "\u4E0B"], Se = {
  quarteryear: "Q",
  halfyear: "H",
  year: "Y"
};
function vt(r) {
  return Ve({
    trigger: "click",
    placement: "bottom",
    hideAfter: 0,
    transition: "el-zoom-in-top",
    visible: !1,
    popperClass: r.popperClass
  });
}
function mt(r, n) {
  const e = r.type.replace("range", ""), t = T(() => {
    const { test: b, exec: E } = me(e, J(r.modelValue, e));
    return b && E && E.slice(1, 3).map(Number) || [0, 0];
  }), a = T(() => t.value.every((b) => b === 0)), u = vt(r), f = T(() => a.value ? "" : ve(e, t.value)), i = T(() => r.placeholder), c = (b) => {
    if (b === "") {
      n("update:modelValue", "");
      return;
    }
    const { test: E, exec: I } = me(e, b);
    E && I && n("update:modelValue", z(b, e));
  }, l = R(a.value ? [new Date().getFullYear(), 1] : [...t.value]), d = R(e), g = R([]), $ = T(() => l.value[0]), o = T(() => d.value === "year"), v = T(() => Math.floor($.value / 10) * 10), p = T(() => {
    let b;
    switch (d.value) {
      case "year":
        b = `${v.value} - ${v.value + 9}`;
        break;
      default:
        b = `${$.value}`;
        break;
    }
    return b;
  }), m = () => {
    o.value ? l.value[0] -= 10 : l.value[0] -= 1, x();
  }, y = () => {
    o.value ? l.value[0] += 10 : l.value[0] += 1, x();
  }, h = (b) => {
    if (!b.isDisabled)
      if (o.value && e !== "year")
        l.value[0] = b.year, d.value = e;
      else {
        const E = [b.year, b[e]], I = ve(e, E);
        me(e, I).test && (l.value = E);
      }
  }, w = () => {
    o.value || (d.value = "year");
  };
  O(() => d.value, () => {
    x();
  }), O(() => l.value, (b, E) => {
    const I = z(ve(e, l.value), e);
    n("update:modelValue", I), u.visible = !1, x();
  }), O(() => t.value, () => {
    a.value || (l.value[0] = t.value[0], l.value[1] = t.value[1], x());
  });
  function x() {
    g.value = ht(
      d.value,
      $.value,
      v.value,
      a.value ? l.value : t.value,
      r.disabledDate
    );
  }
  return x(), {
    popover: u,
    inputValue: f,
    inputPlaceholder: i,
    inputValueUpdate: c,
    panelTitle: p,
    panelItems: g,
    panelPrevClick: m,
    panelNextClick: y,
    panelItemClick: h,
    panelTitleClick: w
  };
}
function ve(r, n) {
  return `${n[0]}-${Se[r]}${n[1]}`;
}
function me(r, n) {
  const e = new RegExp(`^(\\d{4})-${Se[r]}(\\d)$`);
  let t = e.test(n);
  const a = e.exec(n);
  return t && a && (r === "halfyear" && ![1, 2].includes(Number(a[2])) || r === "quarteryear" && ![1, 2, 3, 4].includes(Number(a[2]))) && (t = !1), {
    test: t,
    exec: a
  };
}
function ht(r, n, e, t, a) {
  let u;
  const f = new Date(), i = f.getFullYear(), c = f.getMonth() + 1, l = Math.ceil(c / 3), d = Math.ceil(c / 6);
  return r === "quarteryear" ? u = pt.map((g, $) => {
    const o = n, v = $ + 1;
    return {
      label: `\u7B2C${g}\u5B63\u5EA6`,
      year: o,
      quarteryear: v,
      isToday: o === i && v === l,
      isCurrent: o === t[0] && v === t[1],
      isDisabled: a(new Date(`${o}-${(v - 1) * 3 + 1}`))
    };
  }) : r === "halfyear" ? u = ft.map((g, $) => {
    const o = n, v = $ + 1;
    return {
      label: `${g}\u534A\u5E74`,
      year: o,
      halfyear: v,
      isToday: o === i && v === d,
      isCurrent: o === t[0] && v === t[1],
      isDisabled: a(new Date(`${o}-${(v - 1) * 6 + 1}`))
    };
  }) : r === "year" ? u = Array(10).fill(1).map((g, $) => {
    const o = e + $;
    return {
      label: `${o}`,
      year: o,
      isToday: o === i,
      isCurrent: o === t[0],
      isDisabled: a(new Date(`${o}`))
    };
  }) : u = [], u;
}
const yt = {
  inheritAttrs: !1
}, De = /* @__PURE__ */ G({
  ...yt,
  __name: "DatePickerQuarterHalfYear",
  props: {
    modelValue: null,
    disabledDate: null,
    popperClass: null,
    prefixIcon: null,
    placeholder: null,
    type: null
  },
  emits: ["update:modelValue"],
  setup(r, { emit: n }) {
    const e = r, {
      popover: t,
      inputValue: a,
      inputPlaceholder: u,
      inputValueUpdate: f,
      panelTitle: i,
      panelItems: c,
      panelPrevClick: l,
      panelNextClick: d,
      panelItemClick: g,
      panelTitleClick: $
    } = mt(e, n), o = Ce("scopedId"), v = R(null);
    ae(() => {
      var w, x, b;
      const h = (x = (w = v.value) == null ? void 0 : w.popperRef) == null ? void 0 : x.contentRef;
      (b = h == null ? void 0 : h.setAttribute) == null || b.call(h, `${String(o.value)}`, "");
    });
    const p = R(null), m = R(null);
    let y = !1;
    return ae(() => {
      var h, w;
      ((h = p.value) == null ? void 0 : h.focus) || ((w = m.value) == null ? void 0 : w.focus) ? (y = !1, t.visible = !0) : (y = !0, setTimeout(() => {
        y && (t.visible = !1) && (y = !1);
      }, 100));
    }), (h, w) => (A(), j(s(xe), {
      ref_key: "datepickerHalfQuarterYearRef",
      ref: v,
      visible: s(t).visible,
      trigger: s(t).trigger,
      placement: s(t).placement,
      "hide-after": s(t).hideAfter,
      transition: s(t).transition,
      "popper-class": s(t).popperClass,
      width: "auto"
    }, {
      reference: H(() => [
        U(dt, {
          ref_key: "InputRef",
          ref: p,
          value: s(a),
          placeholder: s(u),
          "prefix-icon": e.prefixIcon,
          "onUpdate:value": s(f)
        }, null, 8, ["value", "placeholder", "prefix-icon", "onUpdate:value"])
      ]),
      default: H(() => [
        U(Pe, {
          ref_key: "panelWrapperRef",
          ref: m
        }, {
          default: H(() => [
            U(ge, {
              title: s(i),
              items: s(c),
              onClickPrev: s(l),
              onClickNext: s(d),
              onClickItem: s(g),
              onClickTitle: s($)
            }, null, 8, ["title", "items", "onClickPrev", "onClickNext", "onClickItem", "onClickTitle"])
          ]),
          _: 1
        }, 512)
      ]),
      _: 1
    }, 8, ["visible", "trigger", "placement", "hide-after", "transition", "popper-class"]));
  }
}), gt = { class: "el-date-editor el-date-editor--monthrange el-input__wrapper el-range-editor el-tooltip__trigger el-tooltip__trigger" }, _t = {
  key: 0,
  class: "el-icon el-input__icon el-range__icon"
}, bt = ["value", "placeholder"], kt = { class: "el-range-separator" }, $t = ["value", "placeholder"], Dt = /* @__PURE__ */ V("i", { class: "el-icon el-input__icon el-range__close-icon el-range__close-icon--hidden" }, [
  /* @__PURE__ */ V("svg", {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ V("path", {
      fill: "currentColor",
      d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
    }),
    /* @__PURE__ */ V("path", {
      fill: "currentColor",
      d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
    })
  ])
], -1), Vt = /* @__PURE__ */ G({
  __name: "DatePickerInputRange",
  props: {
    value: null,
    prefixIcon: null,
    startValue: null,
    startPlaceholder: null,
    endValue: null,
    endPlaceholder: null,
    rangeSeparator: null
  },
  emits: [
    "update:startValue",
    "update:endValue"
  ],
  setup(r, { expose: n, emit: e }) {
    const t = r, a = t.prefixIcon, u = R(!1), f = R(!1), i = (l) => u.value = l, c = (l) => f.value = l;
    return n({
      startFocus: u,
      endFocus: f
    }), (l, d) => (A(), B("div", gt, [
      t.prefixIcon ? (A(), B("i", _t, [
        U(s(a))
      ])) : ne("", !0),
      V("input", {
        autocomplete: "off",
        name: "",
        class: "el-range-input",
        value: t.startValue,
        placeholder: t.startPlaceholder,
        onChange: d[0] || (d[0] = (g) => {
          var $, o;
          return e("update:startValue", (o = ($ = g.target) == null ? void 0 : $.value) != null ? o : "");
        }),
        onClick: d[1] || (d[1] = (g) => i(!0)),
        onBlur: d[2] || (d[2] = (g) => i(!1))
      }, null, 40, bt),
      V("span", kt, ye(t.rangeSeparator), 1),
      V("input", {
        autocomplete: "off",
        name: "",
        class: "el-range-input",
        value: t.endValue,
        placeholder: t.endPlaceholder,
        onChange: d[3] || (d[3] = (g) => {
          var $, o;
          return e("update:endValue", (o = ($ = g.target) == null ? void 0 : $.value) != null ? o : "");
        }),
        onClick: d[4] || (d[4] = (g) => c(!0)),
        onBlur: d[5] || (d[5] = (g) => c(!1))
      }, null, 40, $t),
      Dt
    ]));
  }
}), Ct = {
  inheritAttrs: !1
}, he = /* @__PURE__ */ G({
  ...Ct,
  __name: "DatePickerQuarterHalfYearRange",
  props: {
    modelValue: null,
    disabledDate: null,
    popperClass: null,
    prefixIcon: null,
    startPlaceholder: null,
    endPlaceholder: null,
    rangeSeparator: null,
    type: null
  },
  emits: ["update:modelValue"],
  setup(r, { emit: n }) {
    const e = r, {
      popover: t,
      inputValue: a,
      inputStartPlaceholder: u,
      inputValueUpdate: f,
      panelTitle: i,
      panelItems: c,
      panelPrevClick: l,
      panelNextClick: d,
      panelItemClick: g,
      panelTitleClick: $,
      panelType: o
    } = $e(e, n, 0), {
      inputValue: v,
      inputEndPlaceholder: p,
      inputValueUpdate: m,
      panelTitle: y,
      panelItems: h,
      panelPrevClick: w,
      panelNextClick: x,
      panelItemClick: b,
      panelTitleClick: E,
      panelType: I
    } = $e(e, n, 1, t), F = e.type.replace("range", ""), _ = R([!1, !1]), k = (C, D) => {
      F in C && (_.value[D - 1] = !0), D === 1 ? g(C) : b(C);
    };
    O(_, () => {
      _.value.every(Boolean) && (_.value = [!1, !1]) && (t.visible = !1);
    }, { deep: !0 });
    const P = Ce("scopedId"), S = R(null);
    ae(() => {
      var D, Y, q;
      const C = (Y = (D = S.value) == null ? void 0 : D.popperRef) == null ? void 0 : Y.contentRef;
      (q = C == null ? void 0 : C.setAttribute) == null || q.call(C, `${String(P.value)}`, "");
    });
    const M = R(null), N = R(null);
    let L = !1;
    ae(() => {
      var Y, q, Z;
      const C = !!((Y = M.value) != null && Y.startFocus), D = !!((q = M.value) != null && q.endFocus);
      C || D || ((Z = N.value) == null ? void 0 : Z.focus) ? (L = !1, t.visible = !0) : (L = !0, setTimeout(() => {
        L && (t.visible = !1) && (L = !1);
      }, 100));
    });
    const W = T(() => {
      const C = i.value.slice(-4), D = y.value.slice(0, 4);
      return o.value === "year" && I.value === "year" || o.value === "year" && I.value !== "year" || o.value !== "year" && I.value === "year", C >= D;
    });
    return (C, D) => (A(), j(s(xe), {
      ref_key: "datepickerHalfQuarterYearRangeRef",
      ref: S,
      visible: s(t).visible,
      trigger: s(t).trigger,
      placement: s(t).placement,
      "hide-after": s(t).hideAfter,
      transition: s(t).transition,
      "popper-class": s(t).popperClass,
      width: "auto"
    }, {
      reference: H(() => [
        U(Vt, {
          ref_key: "InputRef",
          ref: M,
          value: "",
          placeholder: "",
          "start-value": s(a),
          "end-value": s(v),
          "start-placeholder": s(u),
          "end-placeholder": s(p),
          "range-separator": e.rangeSeparator,
          "prefix-icon": e.prefixIcon,
          "onUpdate:startValue": s(f),
          "onUpdate:endValue": s(m)
        }, null, 8, ["start-value", "end-value", "start-placeholder", "end-placeholder", "range-separator", "prefix-icon", "onUpdate:startValue", "onUpdate:endValue"])
      ]),
      default: H(() => [
        U(Pe, {
          ref_key: "panelWrapperRef",
          ref: N,
          "is-range": ""
        }, {
          "range-left": H(() => [
            U(ge, {
              class: "el-date-range-picker__content is-left p-0",
              title: s(i),
              items: s(c),
              "right-panel-arrow-disabled": s(W),
              type: s(o),
              range: 1,
              "left-value": s(a),
              "right-value": s(v),
              onClickPrev: s(l),
              onClickNext: s(d),
              onClickItem: D[0] || (D[0] = (Y) => k(Y, 1)),
              onClickTitle: s($)
            }, null, 8, ["title", "items", "right-panel-arrow-disabled", "type", "left-value", "right-value", "onClickPrev", "onClickNext", "onClickTitle"])
          ]),
          "range-right": H(() => [
            U(ge, {
              class: "el-date-range-picker__content is-right p-0",
              title: s(y),
              items: s(h),
              "left-panel-arrow-disabled": s(W),
              type: s(o),
              "type-second": s(I),
              range: 2,
              "left-value": s(a),
              "right-value": s(v),
              onClickPrev: s(w),
              onClickNext: s(x),
              onClickItem: D[1] || (D[1] = (Y) => k(Y, 2)),
              onClickTitle: s(E)
            }, null, 8, ["title", "items", "left-panel-arrow-disabled", "type", "type-second", "left-value", "right-value", "onClickPrev", "onClickNext", "onClickTitle"])
          ]),
          _: 1
        }, 512)
      ]),
      _: 1
    }, 8, ["visible", "trigger", "placement", "hide-after", "transition", "popper-class"]));
  }
});
const xt = {
  inheritAttrs: !1
}, Pt = /* @__PURE__ */ G({
  ...xt,
  __name: "DatePickerEnhanced",
  props: {
    type: null,
    modelValue: null,
    disabledDate: { type: Function, default: () => !1 },
    popperClass: { default: "" },
    placeholder: { default: "\u9009\u62E9\u65E5\u671F" },
    startPlaceholder: { default: "\u5F00\u59CB\u65E5\u671F" },
    endPlaceholder: { default: "\u7ED3\u675F\u65E5\u671F" },
    rangeSeparator: { default: "\u81F3" },
    prefixIcon: { default: qe }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: n }) {
    const e = r, t = [
      "year",
      "month",
      "date",
      "dates",
      "datetime",
      "week",
      "datetimerange",
      "daterange",
      "monthrange"
    ], a = T(() => `${e.popperClass} el-picker__popper p-0`), u = R(null), f = T(() => {
      var c, l;
      const i = (c = u.value) == null ? void 0 : c.attributes;
      if (!!i)
        return (l = Object.values(i).find((d) => /^data-v-[a-zA-Z0-9]{8}$/.test(String(d == null ? void 0 : d.name)))) == null ? void 0 : l.name;
    });
    return Fe("scopedId", f), (i, c) => (A(), B("div", {
      ref_key: "datePickerEnhancedRef",
      ref: u,
      class: "component-datepicker-enhanced"
    }, [
      t.includes(e.type) ? (A(), j(s(Le), Ne({ key: 0 }, i.$attrs, {
        type: e.type,
        "model-value": e.modelValue,
        "disabled-date": e.disabledDate,
        "popper-class": e.popperClass,
        placeholder: e.placeholder,
        "start-placeholder": e.startPlaceholder,
        "end-placeholder": e.endPlaceholder,
        "range-separator": e.rangeSeparator,
        "prefix-icon": e.prefixIcon,
        "onUpdate:modelValue": c[0] || (c[0] = (l) => n("update:modelValue", l))
      }), {
        default: H(() => [
          K(i.$slots, "default", {}, void 0, !0),
          K(i.$slots, "range-separator", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["type", "model-value", "disabled-date", "popper-class", "placeholder", "start-placeholder", "end-placeholder", "range-separator", "prefix-icon"])) : e.type === "halfyear" ? (A(), j(De, {
        key: 1,
        type: "halfyear",
        "model-value": Array.isArray(e.modelValue) ? e.modelValue[0] : e.modelValue,
        "disabled-date": e.disabledDate,
        "popper-class": s(a),
        placeholder: e.placeholder,
        "prefix-icon": e.prefixIcon,
        "onUpdate:modelValue": c[1] || (c[1] = (l) => n("update:modelValue", l))
      }, null, 8, ["model-value", "disabled-date", "popper-class", "placeholder", "prefix-icon"])) : e.type === "quarteryear" ? (A(), j(De, {
        key: 2,
        type: "quarteryear",
        "model-value": Array.isArray(e.modelValue) ? e.modelValue[0] : e.modelValue,
        "disabled-date": e.disabledDate,
        "popper-class": s(a),
        placeholder: e.placeholder,
        "prefix-icon": e.prefixIcon,
        "onUpdate:modelValue": c[2] || (c[2] = (l) => n("update:modelValue", l))
      }, null, 8, ["model-value", "disabled-date", "popper-class", "placeholder", "prefix-icon"])) : e.type === "halfyearrange" ? (A(), j(he, {
        key: 3,
        type: "halfyearrange",
        "model-value": Array.isArray(e.modelValue) ? e.modelValue : [e.modelValue, e.modelValue],
        "disabled-date": e.disabledDate,
        "popper-class": s(a),
        "start-placeholder": e.startPlaceholder,
        "end-placeholder": e.endPlaceholder,
        "range-separator": e.rangeSeparator,
        "prefix-icon": e.prefixIcon,
        "onUpdate:modelValue": c[3] || (c[3] = (l) => n("update:modelValue", l))
      }, null, 8, ["model-value", "disabled-date", "popper-class", "start-placeholder", "end-placeholder", "range-separator", "prefix-icon"])) : e.type === "quarteryearrange" ? (A(), j(he, {
        key: 4,
        type: "quarteryearrange",
        "model-value": Array.isArray(e.modelValue) ? e.modelValue : [e.modelValue, e.modelValue],
        "disabled-date": e.disabledDate,
        "popper-class": s(a),
        "start-placeholder": e.startPlaceholder,
        "end-placeholder": e.endPlaceholder,
        "range-separator": e.rangeSeparator,
        "prefix-icon": e.prefixIcon,
        "onUpdate:modelValue": c[4] || (c[4] = (l) => n("update:modelValue", l))
      }, null, 8, ["model-value", "disabled-date", "popper-class", "start-placeholder", "end-placeholder", "range-separator", "prefix-icon"])) : e.type === "yearrange" ? (A(), j(he, {
        key: 5,
        type: "yearrange",
        "model-value": Array.isArray(e.modelValue) ? e.modelValue : [e.modelValue, e.modelValue],
        "disabled-date": e.disabledDate,
        "popper-class": s(a),
        "start-placeholder": e.startPlaceholder,
        "end-placeholder": e.endPlaceholder,
        "range-separator": e.rangeSeparator,
        "prefix-icon": e.prefixIcon,
        "onUpdate:modelValue": c[5] || (c[5] = (l) => n("update:modelValue", l))
      }, null, 8, ["model-value", "disabled-date", "popper-class", "start-placeholder", "end-placeholder", "range-separator", "prefix-icon"])) : ne("", !0)
    ], 512));
  }
});
const wt = (r, n) => {
  const e = r.__vccOpts || r;
  for (const [t, a] of n)
    e[t] = a;
  return e;
}, Et = /* @__PURE__ */ wt(Pt, [["__scopeId", "data-v-0dc259a8"]]);
export {
  Et as default
};
