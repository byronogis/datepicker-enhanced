import { defineComponent as G, toRef as Ne, ref as R, openBlock as A, createElementBlock as B, normalizeClass as Q, unref as s, createElementVNode as V, Fragment as re, renderSlot as K, computed as T, watchEffect as ae, watch as O, reactive as xe, createVNode as U, withCtx as H, toDisplayString as ge, renderList as ke, createCommentVNode as ne, inject as oe, normalizeStyle as Pe, createBlock as j, provide as $e, mergeProps as Le } from "vue";
import { ElIcon as De, ElPopover as we, ElDatePicker as Be } from "element-plus";
import { DArrowLeft as Ue, DArrowRight as qe, Calendar as He } from "@element-plus/icons-vue";
import X from "dayjs";
const ze = { class: "el-picker-panel__body-wrapper" }, Qe = { class: "el-picker-panel__body" }, Ie = /* @__PURE__ */ G({
  __name: "DatePickerPanelWrapper",
  props: {
    isRange: { type: Boolean }
  },
  setup(r, { expose: n }) {
    const t = Ne(r, "isRange"), a = R(!1), u = (f) => a.value = f;
    return n({
      focus: a
    }), (f, i) => (A(), B("div", {
      tabindex: "0",
      class: Q(["el-picker-panel", s(t) ? "el-date-range-picker" : "el-date-picker"]),
      onFocus: i[0] || (i[0] = (c) => u(!0)),
      onBlur: i[1] || (i[1] = (c) => u(!1))
    }, [
      V("div", ze, [
        V("div", Qe, [
          s(t) ? (A(), B(re, { key: 0 }, [
            K(f.$slots, "range-left"),
            K(f.$slots, "range-right")
          ], 64)) : K(f.$slots, "default", { key: 1 })
        ])
      ])
    ], 34));
  }
});
var je = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Se = { exports: {} };
(function(r, n) {
  (function(e, t) {
    r.exports = t();
  })(je, function() {
    var e = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, a = /\d\d/, u = /\d\d?/, f = /\d*[^-_:/,()\s\d]+/, i = {}, c = function(p) {
      return (p = +p) + (p > 68 ? 1900 : 2e3);
    }, l = function(p) {
      return function(y) {
        this[p] = +y;
      };
    }, d = [/[+-]\d\d:?(\d\d)?|Z/, function(p) {
      (this.zone || (this.zone = {})).offset = function(y) {
        if (!y || y === "Z")
          return 0;
        var g = y.match(/([+-]|\d\d)/g), h = 60 * g[1] + (+g[2] || 0);
        return h === 0 ? 0 : g[0] === "+" ? -h : h;
      }(p);
    }], m = function(p) {
      var y = i[p];
      return y && (y.indexOf ? y : y.s.concat(y.f));
    }, _ = function(p, y) {
      var g, h = i.meridiem;
      if (h) {
        for (var w = 1; w <= 24; w += 1)
          if (p.indexOf(h(w, 0, y)) > -1) {
            g = w > 12;
            break;
          }
      } else
        g = p === (y ? "pm" : "PM");
      return g;
    }, o = { A: [f, function(p) {
      this.afternoon = _(p, !1);
    }], a: [f, function(p) {
      this.afternoon = _(p, !0);
    }], S: [/\d/, function(p) {
      this.milliseconds = 100 * +p;
    }], SS: [a, function(p) {
      this.milliseconds = 10 * +p;
    }], SSS: [/\d{3}/, function(p) {
      this.milliseconds = +p;
    }], s: [u, l("seconds")], ss: [u, l("seconds")], m: [u, l("minutes")], mm: [u, l("minutes")], H: [u, l("hours")], h: [u, l("hours")], HH: [u, l("hours")], hh: [u, l("hours")], D: [u, l("day")], DD: [a, l("day")], Do: [f, function(p) {
      var y = i.ordinal, g = p.match(/\d+/);
      if (this.day = g[0], y)
        for (var h = 1; h <= 31; h += 1)
          y(h).replace(/\[|\]/g, "") === p && (this.day = h);
    }], M: [u, l("month")], MM: [a, l("month")], MMM: [f, function(p) {
      var y = m("months"), g = (m("monthsShort") || y.map(function(h) {
        return h.slice(0, 3);
      })).indexOf(p) + 1;
      if (g < 1)
        throw new Error();
      this.month = g % 12 || g;
    }], MMMM: [f, function(p) {
      var y = m("months").indexOf(p) + 1;
      if (y < 1)
        throw new Error();
      this.month = y % 12 || y;
    }], Y: [/[+-]?\d+/, l("year")], YY: [a, function(p) {
      this.year = c(p);
    }], YYYY: [/\d{4}/, l("year")], Z: d, ZZ: d };
    function v(p) {
      var y, g;
      y = p, g = i && i.formats;
      for (var h = (p = y.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(b, $, P) {
        var S = P && P.toUpperCase();
        return $ || g[P] || e[P] || g[S].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(M, N, L) {
          return N || L.slice(1);
        });
      })).match(t), w = h.length, x = 0; x < w; x += 1) {
        var k = h[x], E = o[k], I = E && E[0], F = E && E[1];
        h[x] = F ? { regex: I, parser: F } : k.replace(/^\[|\]$/g, "");
      }
      return function(b) {
        for (var $ = {}, P = 0, S = 0; P < w; P += 1) {
          var M = h[P];
          if (typeof M == "string")
            S += M.length;
          else {
            var N = M.regex, L = M.parser, W = b.slice(S), C = N.exec(W)[0];
            L.call($, C), b = b.replace(C, "");
          }
        }
        return function(D) {
          var Y = D.afternoon;
          if (Y !== void 0) {
            var q = D.hours;
            Y ? q < 12 && (D.hours += 12) : q === 12 && (D.hours = 0), delete D.afternoon;
          }
        }($), $;
      };
    }
    return function(p, y, g) {
      g.p.customParseFormat = !0, p && p.parseTwoDigitYear && (c = p.parseTwoDigitYear);
      var h = y.prototype, w = h.parse;
      h.parse = function(x) {
        var k = x.date, E = x.utc, I = x.args;
        this.$u = E;
        var F = I[1];
        if (typeof F == "string") {
          var b = I[2] === !0, $ = I[3] === !0, P = b || $, S = I[2];
          $ && (S = I[2]), i = this.$locale(), !b && S && (i = g.Ls[S]), this.$d = function(W, C, D) {
            try {
              if (["x", "X"].indexOf(C) > -1)
                return new Date((C === "X" ? 1e3 : 1) * W);
              var Y = v(C)(W), q = Y.year, Z = Y.month, Ae = Y.day, Ee = Y.hours, Te = Y.minutes, Re = Y.seconds, Fe = Y.milliseconds, be = Y.zone, se = new Date(), ue = Ae || (q || Z ? 1 : se.getDate()), ie = q || se.getFullYear(), le = 0;
              q && !Z || (le = Z > 0 ? Z - 1 : se.getMonth());
              var ce = Ee || 0, de = Te || 0, pe = Re || 0, fe = Fe || 0;
              return be ? new Date(Date.UTC(ie, le, ue, ce, de, pe, fe + 60 * be.offset * 1e3)) : D ? new Date(Date.UTC(ie, le, ue, ce, de, pe, fe)) : new Date(ie, le, ue, ce, de, pe, fe);
            } catch {
              return new Date("");
            }
          }(k, F, E), this.init(), S && S !== !0 && (this.$L = this.locale(S).$L), P && k != this.format(F) && (this.$d = new Date("")), i = {};
        } else if (F instanceof Array)
          for (var M = F.length, N = 1; N <= M; N += 1) {
            I[1] = F[N - 1];
            var L = g.apply(this, I);
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
})(Se);
const We = Se.exports;
X.extend(We);
const ee = "YYYY-MM-DD", Ze = [
  ["halfyear", "H"],
  ["quarteryear", "Q"]
];
function Oe(r, n) {
  const t = X(r).format(ee).split("-").map(Number), a = t[0], u = t[1], f = {
    halfyear: Math.ceil(u / 6),
    quarteryear: Math.ceil(u / 3)
  };
  let i;
  if (n === "halfyear" || n === "quarteryear") {
    const c = Ze.find((l) => l[0] === n)[1];
    i = `${a}-${c}${f[n]}`;
  } else
    i = `${a}`;
  return i;
}
function J(r, n) {
  const e = (t) => X(t, ee, !0).isValid() ? Oe(t, n) : "";
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
const Ge = ["\u4E00", "\u4E8C", "\u4E09", "\u56DB"], Xe = ["\u4E0A", "\u4E0B"], Me = {
  quarteryear: "Q",
  halfyear: "H",
  year: "Y"
};
function Je(r) {
  return xe({
    trigger: "click",
    placement: "bottom",
    hideAfter: 0,
    transition: "el-zoom-in-top",
    visible: !1,
    popperClass: r.popperClass
  });
}
function Ve(r, n, e, t) {
  const a = r.type.replace("range", ""), u = R([]), f = T(() => u.value[e].every((b) => b === 0));
  ae(() => {
    var $, P;
    const b = r.modelValue.map((S) => {
      const { test: M, exec: N } = ve(a, J(S, a)), L = a !== "year" ? 3 : 2;
      return M && N && N.slice(1, L).map(Number) || [0, 0];
    });
    (($ = b[e]) == null ? void 0 : $.join("")) !== ((P = u.value[e]) == null ? void 0 : P.join("")) && (u.value = b);
  });
  const i = t || Je(r), c = T(() => f.value ? "" : J(r.modelValue[e], a)), l = T(() => r.startPlaceholder), d = T(() => r.endPlaceholder), m = (b) => {
    const $ = r.modelValue.map((M) => z(J(M, a), a));
    if (b === "") {
      $[e] = "", n("update:modelValue", $);
      return;
    }
    const { test: P, exec: S } = ve(a, b);
    if (P && S) {
      const M = z(te(a, S.slice(1, 3).map(Number)), a);
      if (e === 0 && new Date(M).getTime() >= new Date($[1]).getTime()) {
        n("update:modelValue", $);
        return;
      } else if (e === 1 && new Date(M).getTime() <= new Date($[0]).getTime()) {
        n("update:modelValue", $);
        return;
      }
      $[e] = M, n("update:modelValue", $);
    }
  }, o = R((() => {
    if (f.value) {
      const b = e === 1 ? u.value[0] : u.value[1];
      return b.every((P) => P === 0) ? [new Date().getFullYear(), 1] : [...b];
    } else
      return [...u.value[e]];
  })()), v = R(a), p = R([]), y = T(() => o.value[0]), g = T(() => v.value === "year"), h = T(() => Math.floor(y.value / 10) * 10), w = T(() => {
    let b;
    switch (v.value) {
      case "year":
        b = `${h.value} - ${h.value + 9}`;
        break;
      default:
        b = `${y.value}`;
        break;
    }
    return b;
  }), x = () => {
    g.value ? o.value[0] -= 10 : o.value[0] -= 1, F();
  }, k = () => {
    g.value ? o.value[0] += 10 : o.value[0] += 1, F();
  }, E = (b) => {
    if (!b.isDisabled)
      if (g.value && a !== "year")
        o.value[0] = b.year, v.value = a;
      else {
        const $ = [];
        $[0] = b.year, a !== "year" && ($[1] = b[a]);
        const P = te(a, $);
        ve(a, P).test && (o.value = $);
      }
  }, I = () => {
    g.value || (v.value = "year");
  };
  O(() => v.value, () => {
    F();
  }), O(() => o.value, (b, $) => {
    const P = z(te(a, o.value), a), S = r.modelValue.map((M) => z(J(M, a), a));
    S[e] = P, n("update:modelValue", S), F();
  }), O(() => u.value, () => {
    f.value || (o.value[0] = u.value[e][0], a !== "year" && (o.value[1] = u.value[e][1]), F());
  });
  function F() {
    p.value = Ke(
      v.value,
      y.value,
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
    inputValueUpdate: m,
    panelTitle: w,
    panelItems: p,
    panelPrevClick: x,
    panelNextClick: k,
    panelItemClick: E,
    panelTitleClick: I,
    panelType: v
  };
}
function te(r, n) {
  return r === "year" ? `${n[0]}` : `${n[0]}-${Me[r]}${n[1]}`;
}
function ve(r, n) {
  const e = r !== "year" ? new RegExp(`^(\\d{4})-${Me[r]}(\\d)$`) : new RegExp("^(\\d{4})$");
  let t = e.test(n);
  const a = e.exec(n);
  return t && a && (r === "halfyear" && ![1, 2].includes(Number(a[2])) || r === "quarteryear" && ![1, 2, 3, 4].includes(Number(a[2]))) && (t = !1), {
    test: t,
    exec: a
  };
}
function Ke(r, n, e, t, a) {
  let u;
  const f = new Date(), i = f.getFullYear(), c = f.getMonth() + 1, l = Math.ceil(c / 3), d = Math.ceil(c / 6);
  return r === "quarteryear" ? u = Ge.map((m, _) => {
    const o = n, v = _ + 1;
    return {
      label: `\u7B2C${m}\u5B63\u5EA6`,
      year: o,
      quarteryear: v,
      isToday: o === i && v === l,
      isCurrent: o === t[0] && v === t[1],
      isDisabled: a(new Date(`${o}-${(v - 1) * 3 + 1}`))
    };
  }) : r === "halfyear" ? u = Xe.map((m, _) => {
    const o = n, v = _ + 1;
    return {
      label: `${m}\u534A\u5E74`,
      year: o,
      halfyear: v,
      isToday: o === i && v === d,
      isCurrent: o === t[0] && v === t[1],
      isDisabled: a(new Date(`${o}-${(v - 1) * 6 + 1}`))
    };
  }) : r === "year" ? u = Array(10).fill(1).map((m, _) => {
    const o = e + _;
    return {
      label: `${o}`,
      year: o,
      isToday: o === i,
      isCurrent: o === t[0],
      isDisabled: a(new Date(`${o}`))
    };
  }) : u = [], u;
}
const et = { class: "el-picker-panel__content" }, tt = { class: "el-date-picker__header el-date-picker__header--bordered" }, at = {
  class: "el-month-table",
  style: {}
}, lt = ["onClick"], _e = /* @__PURE__ */ G({
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
      return !(d === "" || new Date(l) < new Date(d));
    }, u = (i) => {
      const c = te(e.typeSecond, [i.year, i[e.typeSecond] || NaN]), l = z(c, e.typeSecond), d = z(e.leftValue, e.typeSecond);
      return !(d === "" || new Date(l) > new Date(d));
    }, f = (i) => i.isDisabled ? !0 : e.range === 1 ? a(i) : e.range === 2 ? u(i) : !1;
    return (i, c) => (A(), B("div", et, [
      V("div", tt, [
        V("span", {
          class: Q(["el-date-picker__prev-btn", [e.leftPanelArrowDisabled && "is-disabled cursor-not-allowed"]])
        }, [
          V("span", {
            "aria-label": "\u4E0A\u4E00\u5E74",
            class: Q(["el-picker-panel__icon-btn el-icon-d-arrow-left", [e.leftPanelArrowDisabled && "is-disabled pointer-events-none"]]),
            onClick: c[0] || (c[0] = (l) => n("clickPrev"))
          }, [
            U(s(De), {
              class: Q([e.leftPanelArrowDisabled && "is-disabled cursor-not-allowed"])
            }, {
              default: H(() => [
                U(s(Ue))
              ]),
              _: 1
            }, 8, ["class"])
          ], 2)
        ], 2),
        V("span", {
          role: "button",
          class: "el-date-picker__header-label",
          onClick: c[1] || (c[1] = (l) => n("clickTitle"))
        }, ge(e.title), 1),
        V("span", {
          class: Q(["el-date-picker__next-btn", [e.rightPanelArrowDisabled && "is-disabled cursor-not-allowed"]])
        }, [
          V("span", {
            "aria-label": "\u4E0B\u4E00\u5E74",
            class: Q(["el-picker-panel__icon-btn el-icon-d-arrow-right", [e.rightPanelArrowDisabled && "is-disabled pointer-events-none"]]),
            onClick: c[2] || (c[2] = (l) => n("clickNext"))
          }, [
            U(s(De), {
              class: Q([e.rightPanelArrowDisabled && "is-disabled cursor-not-allowed"])
            }, {
              default: H(() => [
                U(s(qe))
              ]),
              _: 1
            }, 8, ["class"])
          ], 2)
        ], 2)
      ]),
      V("table", at, [
        V("tbody", null, [
          (A(!0), B(re, null, ke(s(t), (l) => (A(), B("tr", { key: l }, [
            (A(!0), B(re, null, ke(e.items.slice((l - 1) * 4, (l - 1) * 4 + 4), (d) => (A(), B(re, {
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
                    onClick: (m) => n("clickItem", d)
                  }, ge(d.label), 9, lt)
                ], 2)
              ], 2)) : ne("", !0)
            ], 64))), 128))
          ]))), 128))
        ])
      ])
    ]));
  }
}), rt = { class: "el-input__wrapper" }, nt = {
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
    const t = r, a = t.prefixIcon, u = R(!1), f = (c) => u.value = c;
    n({
      focus: u
    });
    const i = oe("style");
    return (c, l) => (A(), B("div", {
      class: "el-input el-input--prefix el-input--suffix el-date-editor el-date-editor--month el-tooltip__trigger el-tooltip__trigger",
      style: Pe(s(i))
    }, [
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
          onChange: l[0] || (l[0] = (d) => {
            var m, _;
            return e("update:value", (_ = (m = d.target) == null ? void 0 : m.value) != null ? _ : "");
          }),
          onClick: l[1] || (l[1] = (d) => f(!0)),
          onBlur: l[2] || (l[2] = (d) => f(!1))
        }, null, 40, ut),
        it
      ])
    ], 4));
  }
}), pt = ["\u4E00", "\u4E8C", "\u4E09", "\u56DB"], ft = ["\u4E0A", "\u4E0B"], Ye = {
  quarteryear: "Q",
  halfyear: "H",
  year: "Y"
};
function vt(r) {
  return xe({
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
    const { test: k, exec: E } = ye(e, J(r.modelValue, e));
    return k && E && E.slice(1, 3).map(Number) || [0, 0];
  }), a = T(() => t.value.every((k) => k === 0)), u = vt(r), f = T(() => a.value ? "" : me(e, t.value)), i = T(() => r.placeholder), c = (k) => {
    if (k === "") {
      n("update:modelValue", "");
      return;
    }
    const { test: E, exec: I } = ye(e, k);
    E && I && n("update:modelValue", z(k, e));
  }, l = R(a.value ? [new Date().getFullYear(), 1] : [...t.value]), d = R(e), m = R([]), _ = T(() => l.value[0]), o = T(() => d.value === "year"), v = T(() => Math.floor(_.value / 10) * 10), p = T(() => {
    let k;
    switch (d.value) {
      case "year":
        k = `${v.value} - ${v.value + 9}`;
        break;
      default:
        k = `${_.value}`;
        break;
    }
    return k;
  }), y = () => {
    o.value ? l.value[0] -= 10 : l.value[0] -= 1, x();
  }, g = () => {
    o.value ? l.value[0] += 10 : l.value[0] += 1, x();
  }, h = (k) => {
    if (!k.isDisabled)
      if (o.value && e !== "year")
        l.value[0] = k.year, d.value = e;
      else {
        const E = [k.year, k[e]], I = me(e, E);
        ye(e, I).test && (l.value = E);
      }
  }, w = () => {
    o.value || (d.value = "year");
  };
  O(() => d.value, () => {
    x();
  }), O(() => l.value, (k, E) => {
    const I = z(me(e, l.value), e);
    n("update:modelValue", I), u.visible = !1, x();
  }), O(() => t.value, () => {
    a.value || (l.value[0] = t.value[0], l.value[1] = t.value[1], x());
  });
  function x() {
    m.value = yt(
      d.value,
      _.value,
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
    panelItems: m,
    panelPrevClick: y,
    panelNextClick: g,
    panelItemClick: h,
    panelTitleClick: w
  };
}
function me(r, n) {
  return `${n[0]}-${Ye[r]}${n[1]}`;
}
function ye(r, n) {
  const e = new RegExp(`^(\\d{4})-${Ye[r]}(\\d)$`);
  let t = e.test(n);
  const a = e.exec(n);
  return t && a && (r === "halfyear" && ![1, 2].includes(Number(a[2])) || r === "quarteryear" && ![1, 2, 3, 4].includes(Number(a[2]))) && (t = !1), {
    test: t,
    exec: a
  };
}
function yt(r, n, e, t, a) {
  let u;
  const f = new Date(), i = f.getFullYear(), c = f.getMonth() + 1, l = Math.ceil(c / 3), d = Math.ceil(c / 6);
  return r === "quarteryear" ? u = pt.map((m, _) => {
    const o = n, v = _ + 1;
    return {
      label: `\u7B2C${m}\u5B63\u5EA6`,
      year: o,
      quarteryear: v,
      isToday: o === i && v === l,
      isCurrent: o === t[0] && v === t[1],
      isDisabled: a(new Date(`${o}-${(v - 1) * 3 + 1}`))
    };
  }) : r === "halfyear" ? u = ft.map((m, _) => {
    const o = n, v = _ + 1;
    return {
      label: `${m}\u534A\u5E74`,
      year: o,
      halfyear: v,
      isToday: o === i && v === d,
      isCurrent: o === t[0] && v === t[1],
      isDisabled: a(new Date(`${o}-${(v - 1) * 6 + 1}`))
    };
  }) : r === "year" ? u = Array(10).fill(1).map((m, _) => {
    const o = e + _;
    return {
      label: `${o}`,
      year: o,
      isToday: o === i,
      isCurrent: o === t[0],
      isDisabled: a(new Date(`${o}`))
    };
  }) : u = [], u;
}
const ht = {
  inheritAttrs: !1
}, Ce = /* @__PURE__ */ G({
  ...ht,
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
      panelItemClick: m,
      panelTitleClick: _
    } = mt(e, n), o = oe("scopedId"), v = R(null);
    ae(() => {
      var w, x, k;
      const h = (x = (w = v.value) == null ? void 0 : w.popperRef) == null ? void 0 : x.contentRef;
      (k = h == null ? void 0 : h.setAttribute) == null || k.call(h, `${String(o.value)}`, "");
    });
    const p = R(null), y = R(null);
    let g = !1;
    return ae(() => {
      var h, w;
      ((h = p.value) == null ? void 0 : h.focus) || ((w = y.value) == null ? void 0 : w.focus) ? (g = !1, t.visible = !0) : (g = !0, setTimeout(() => {
        g && (t.visible = !1) && (g = !1);
      }, 100));
    }), (h, w) => (A(), j(s(we), {
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
        U(Ie, {
          ref_key: "panelWrapperRef",
          ref: y
        }, {
          default: H(() => [
            U(_e, {
              title: s(i),
              items: s(c),
              onClickPrev: s(l),
              onClickNext: s(d),
              onClickItem: s(m),
              onClickTitle: s(_)
            }, null, 8, ["title", "items", "onClickPrev", "onClickNext", "onClickItem", "onClickTitle"])
          ]),
          _: 1
        }, 512)
      ]),
      _: 1
    }, 8, ["visible", "trigger", "placement", "hide-after", "transition", "popper-class"]));
  }
}), gt = {
  key: 0,
  class: "el-icon el-input__icon el-range__icon"
}, _t = ["value", "placeholder"], bt = { class: "el-range-separator" }, kt = ["value", "placeholder"], $t = /* @__PURE__ */ V("i", { class: "el-icon el-input__icon el-range__close-icon el-range__close-icon--hidden" }, [
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
], -1), Dt = /* @__PURE__ */ G({
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
    const t = r, a = t.prefixIcon, u = R(!1), f = R(!1), i = (d) => u.value = d, c = (d) => f.value = d;
    n({
      startFocus: u,
      endFocus: f
    });
    const l = oe("style");
    return (d, m) => (A(), B("div", {
      class: "el-date-editor el-date-editor--monthrange el-input__wrapper el-range-editor el-tooltip__trigger el-tooltip__trigger",
      style: Pe(s(l))
    }, [
      t.prefixIcon ? (A(), B("i", gt, [
        U(s(a))
      ])) : ne("", !0),
      V("input", {
        autocomplete: "off",
        name: "",
        class: "el-range-input",
        value: t.startValue,
        placeholder: t.startPlaceholder,
        onChange: m[0] || (m[0] = (_) => {
          var o, v;
          return e("update:startValue", (v = (o = _.target) == null ? void 0 : o.value) != null ? v : "");
        }),
        onClick: m[1] || (m[1] = (_) => i(!0)),
        onBlur: m[2] || (m[2] = (_) => i(!1))
      }, null, 40, _t),
      V("span", bt, ge(t.rangeSeparator), 1),
      V("input", {
        autocomplete: "off",
        name: "",
        class: "el-range-input",
        value: t.endValue,
        placeholder: t.endPlaceholder,
        onChange: m[3] || (m[3] = (_) => {
          var o, v;
          return e("update:endValue", (v = (o = _.target) == null ? void 0 : o.value) != null ? v : "");
        }),
        onClick: m[4] || (m[4] = (_) => c(!0)),
        onBlur: m[5] || (m[5] = (_) => c(!1))
      }, null, 40, kt),
      $t
    ], 4));
  }
}), Vt = {
  inheritAttrs: !1
}, he = /* @__PURE__ */ G({
  ...Vt,
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
      panelItemClick: m,
      panelTitleClick: _,
      panelType: o
    } = Ve(e, n, 0), {
      inputValue: v,
      inputEndPlaceholder: p,
      inputValueUpdate: y,
      panelTitle: g,
      panelItems: h,
      panelPrevClick: w,
      panelNextClick: x,
      panelItemClick: k,
      panelTitleClick: E,
      panelType: I
    } = Ve(e, n, 1, t), F = e.type.replace("range", ""), b = R([!1, !1]), $ = (C, D) => {
      F in C && (b.value[D - 1] = !0), D === 1 ? m(C) : k(C);
    };
    O(b, () => {
      b.value.every(Boolean) && (b.value = [!1, !1]) && (t.visible = !1);
    }, { deep: !0 });
    const P = oe("scopedId"), S = R(null);
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
      const C = i.value.slice(-4), D = g.value.slice(0, 4);
      return o.value === "year" && I.value === "year" || o.value === "year" && I.value !== "year" || o.value !== "year" && I.value === "year", C >= D;
    });
    return (C, D) => (A(), j(s(we), {
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
        U(Dt, {
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
          "onUpdate:endValue": s(y)
        }, null, 8, ["start-value", "end-value", "start-placeholder", "end-placeholder", "range-separator", "prefix-icon", "onUpdate:startValue", "onUpdate:endValue"])
      ]),
      default: H(() => [
        U(Ie, {
          ref_key: "panelWrapperRef",
          ref: N,
          "is-range": ""
        }, {
          "range-left": H(() => [
            U(_e, {
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
              onClickItem: D[0] || (D[0] = (Y) => $(Y, 1)),
              onClickTitle: s(_)
            }, null, 8, ["title", "items", "right-panel-arrow-disabled", "type", "left-value", "right-value", "onClickPrev", "onClickNext", "onClickTitle"])
          ]),
          "range-right": H(() => [
            U(_e, {
              class: "el-date-range-picker__content is-right p-0",
              title: s(g),
              items: s(h),
              "left-panel-arrow-disabled": s(W),
              type: s(o),
              "type-second": s(I),
              range: 2,
              "left-value": s(a),
              "right-value": s(v),
              onClickPrev: s(w),
              onClickNext: s(x),
              onClickItem: D[1] || (D[1] = (Y) => $(Y, 2)),
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
const Ct = {
  inheritAttrs: !1
}, xt = /* @__PURE__ */ G({
  ...Ct,
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
    prefixIcon: { default: He },
    style: { default: "" }
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
    return $e("scopedId", f), $e("style", e.style), (i, c) => (A(), B("div", {
      ref_key: "datePickerEnhancedRef",
      ref: u,
      class: "component-datepicker-enhanced",
      style: { display: "inline-block" }
    }, [
      t.includes(e.type) ? (A(), j(s(Be), Le({ key: 0 }, i.$attrs, {
        type: e.type,
        "model-value": e.modelValue,
        "disabled-date": e.disabledDate,
        "popper-class": e.popperClass,
        placeholder: e.placeholder,
        "start-placeholder": e.startPlaceholder,
        "end-placeholder": e.endPlaceholder,
        "range-separator": e.rangeSeparator,
        "prefix-icon": e.prefixIcon,
        style: e.style,
        "onUpdate:modelValue": c[0] || (c[0] = (l) => n("update:modelValue", l))
      }), {
        default: H(() => [
          K(i.$slots, "default", {}, void 0, !0),
          K(i.$slots, "range-separator", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["type", "model-value", "disabled-date", "popper-class", "placeholder", "start-placeholder", "end-placeholder", "range-separator", "prefix-icon", "style"])) : e.type === "halfyear" ? (A(), j(Ce, {
        key: 1,
        type: "halfyear",
        "model-value": Array.isArray(e.modelValue) ? e.modelValue[0] : e.modelValue,
        "disabled-date": e.disabledDate,
        "popper-class": s(a),
        placeholder: e.placeholder,
        "prefix-icon": e.prefixIcon,
        "onUpdate:modelValue": c[1] || (c[1] = (l) => n("update:modelValue", l))
      }, null, 8, ["model-value", "disabled-date", "popper-class", "placeholder", "prefix-icon"])) : e.type === "quarteryear" ? (A(), j(Ce, {
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
const Pt = (r, n) => {
  const e = r.__vccOpts || r;
  for (const [t, a] of n)
    e[t] = a;
  return e;
}, At = /* @__PURE__ */ Pt(xt, [["__scopeId", "data-v-d8175827"]]);
export {
  At as default
};
