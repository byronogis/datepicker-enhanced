import { defineComponent as G, toRef as Re, ref as T, openBlock as M, createElementBlock as N, normalizeClass as Q, unref as s, createElementVNode as C, Fragment as re, renderSlot as K, watchEffect as ae, computed as R, watch as O, reactive as Ce, createVNode as L, withCtx as H, toDisplayString as he, renderList as _e, createCommentVNode as ne, inject as xe, createBlock as j, provide as Fe, mergeProps as Ne } from "vue";
import { ElIcon as be, ElPopover as Ve, ElDatePicker as Le } from "element-plus";
import { DArrowLeft as Ue, DArrowRight as Be, Calendar as qe } from "@element-plus/icons-vue";
import J from "dayjs";
const He = { class: "el-picker-panel__body-wrapper" }, ze = { class: "el-picker-panel__body" }, we = /* @__PURE__ */ G({
  __name: "DatePickerPanelWrapper",
  props: {
    isRange: { type: Boolean }
  },
  setup(l, { expose: o }) {
    const t = Re(l, "isRange"), a = T(!1), u = (v) => a.value = v;
    return o({
      focus: a
    }), (v, i) => (M(), N("div", {
      tabindex: "0",
      class: Q(["el-picker-panel", s(t) ? "el-date-range-picker" : "el-date-picker"]),
      onFocus: i[0] || (i[0] = (n) => u(!0)),
      onBlur: i[1] || (i[1] = (n) => u(!1))
    }, [
      C("div", He, [
        C("div", ze, [
          s(t) ? (M(), N(re, { key: 0 }, [
            K(v.$slots, "range-left"),
            K(v.$slots, "range-right")
          ], 64)) : K(v.$slots, "default", { key: 1 })
        ])
      ])
    ], 34));
  }
});
var Qe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Pe = { exports: {} };
(function(l, o) {
  (function(e, t) {
    l.exports = t();
  })(Qe, function() {
    var e = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, a = /\d\d/, u = /\d\d?/, v = /\d*[^-_:/,()\s\d]+/, i = {}, n = function(d) {
      return (d = +d) + (d > 68 ? 1900 : 2e3);
    }, r = function(d) {
      return function(m) {
        this[d] = +m;
      };
    }, p = [/[+-]\d\d:?(\d\d)?|Z/, function(d) {
      (this.zone || (this.zone = {})).offset = function(m) {
        if (!m || m === "Z")
          return 0;
        var _ = m.match(/([+-]|\d\d)/g), y = 60 * _[1] + (+_[2] || 0);
        return y === 0 ? 0 : _[0] === "+" ? -y : y;
      }(d);
    }], f = function(d) {
      var m = i[d];
      return m && (m.indexOf ? m : m.s.concat(m.f));
    }, h = function(d, m) {
      var _, y = i.meridiem;
      if (y) {
        for (var $ = 1; $ <= 24; $ += 1)
          if (d.indexOf(y($, 0, m)) > -1) {
            _ = $ > 12;
            break;
          }
      } else
        _ = d === (m ? "pm" : "PM");
      return _;
    }, c = { A: [v, function(d) {
      this.afternoon = h(d, !1);
    }], a: [v, function(d) {
      this.afternoon = h(d, !0);
    }], S: [/\d/, function(d) {
      this.milliseconds = 100 * +d;
    }], SS: [a, function(d) {
      this.milliseconds = 10 * +d;
    }], SSS: [/\d{3}/, function(d) {
      this.milliseconds = +d;
    }], s: [u, r("seconds")], ss: [u, r("seconds")], m: [u, r("minutes")], mm: [u, r("minutes")], H: [u, r("hours")], h: [u, r("hours")], HH: [u, r("hours")], hh: [u, r("hours")], D: [u, r("day")], DD: [a, r("day")], Do: [v, function(d) {
      var m = i.ordinal, _ = d.match(/\d+/);
      if (this.day = _[0], m)
        for (var y = 1; y <= 31; y += 1)
          m(y).replace(/\[|\]/g, "") === d && (this.day = y);
    }], M: [u, r("month")], MM: [a, r("month")], MMM: [v, function(d) {
      var m = f("months"), _ = (f("monthsShort") || m.map(function(y) {
        return y.slice(0, 3);
      })).indexOf(d) + 1;
      if (_ < 1)
        throw new Error();
      this.month = _ % 12 || _;
    }], MMMM: [v, function(d) {
      var m = f("months").indexOf(d) + 1;
      if (m < 1)
        throw new Error();
      this.month = m % 12 || m;
    }], Y: [/[+-]?\d+/, r("year")], YY: [a, function(d) {
      this.year = n(d);
    }], YYYY: [/\d{4}/, r("year")], Z: p, ZZ: p };
    function g(d) {
      var m, _;
      m = d, _ = i && i.formats;
      for (var y = (d = m.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(I, A, V) {
        var E = V && V.toUpperCase();
        return A || _[V] || e[V] || _[E].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(F, q, U) {
          return q || U.slice(1);
        });
      })).match(t), $ = y.length, b = 0; b < $; b += 1) {
        var S = y[b], w = c[S], k = w && w[0], P = w && w[1];
        y[b] = P ? { regex: k, parser: P } : S.replace(/^\[|\]$/g, "");
      }
      return function(I) {
        for (var A = {}, V = 0, E = 0; V < $; V += 1) {
          var F = y[V];
          if (typeof F == "string")
            E += F.length;
          else {
            var q = F.regex, U = F.parser, W = I.slice(E), x = q.exec(W)[0];
            U.call(A, x), I = I.replace(x, "");
          }
        }
        return function(D) {
          var Y = D.afternoon;
          if (Y !== void 0) {
            var B = D.hours;
            Y ? B < 12 && (D.hours += 12) : B === 12 && (D.hours = 0), delete D.afternoon;
          }
        }(A), A;
      };
    }
    return function(d, m, _) {
      _.p.customParseFormat = !0, d && d.parseTwoDigitYear && (n = d.parseTwoDigitYear);
      var y = m.prototype, $ = y.parse;
      y.parse = function(b) {
        var S = b.date, w = b.utc, k = b.args;
        this.$u = w;
        var P = k[1];
        if (typeof P == "string") {
          var I = k[2] === !0, A = k[3] === !0, V = I || A, E = k[2];
          A && (E = k[2]), i = this.$locale(), !I && E && (i = _.Ls[E]), this.$d = function(W, x, D) {
            try {
              if (["x", "X"].indexOf(x) > -1)
                return new Date((x === "X" ? 1e3 : 1) * W);
              var Y = g(x)(W), B = Y.year, Z = Y.month, Ye = Y.day, Me = Y.hours, Ae = Y.minutes, Ee = Y.seconds, Te = Y.milliseconds, ge = Y.zone, oe = new Date(), se = Ye || (B || Z ? 1 : oe.getDate()), ie = B || oe.getFullYear(), le = 0;
              B && !Z || (le = Z > 0 ? Z - 1 : oe.getMonth());
              var ue = Me || 0, ce = Ae || 0, de = Ee || 0, pe = Te || 0;
              return ge ? new Date(Date.UTC(ie, le, se, ue, ce, de, pe + 60 * ge.offset * 1e3)) : D ? new Date(Date.UTC(ie, le, se, ue, ce, de, pe)) : new Date(ie, le, se, ue, ce, de, pe);
            } catch {
              return new Date("");
            }
          }(S, P, w), this.init(), E && E !== !0 && (this.$L = this.locale(E).$L), V && S != this.format(P) && (this.$d = new Date("")), i = {};
        } else if (P instanceof Array)
          for (var F = P.length, q = 1; q <= F; q += 1) {
            k[1] = P[q - 1];
            var U = _.apply(this, k);
            if (U.isValid()) {
              this.$d = U.$d, this.$L = U.$L, this.init();
              break;
            }
            q === F && (this.$d = new Date(""));
          }
        else
          $.call(this, b);
      };
    };
  });
})(Pe);
const je = Pe.exports;
J.extend(je);
const ee = "YYYY-MM-DD", We = [
  ["halfyear", "H"],
  ["quarteryear", "Q"]
];
function Ze(l, o) {
  const t = J(l).format(ee).split("-").map(Number), a = t[0], u = t[1] + 1, v = {
    halfyear: Math.ceil(u / 6),
    quarteryear: Math.ceil(u / 3)
  };
  let i;
  if (o === "halfyear" || o === "quarteryear") {
    const n = We.find((r) => r[0] === o)[1];
    i = `${a}-${n}${v[o]}`;
  } else
    i = `${a}`;
  return i;
}
function X(l, o) {
  const e = (t) => {
    const a = J(t, ee, !0).isValid();
    return Ze(a ? t : new Date(), o);
  };
  return Array.isArray(l) ? l.map((t) => e(t)) : e(l);
}
function z(l, o) {
  const e = (t) => {
    const a = t.split("-"), u = a[0];
    if (o === "halfyear") {
      const v = [u, (Number(a[1][1]) - 1) * 6 + 1].join("-");
      return J(v).format(ee);
    } else if (o === "quarteryear") {
      const v = [u, (Number(a[1][1]) - 1) * 3 + 1].join("-");
      return J(v).format(ee);
    } else
      return J(u).format(ee);
  };
  return Array.isArray(l) ? l.map((t) => e(t)) : e(l);
}
const Oe = ["\u4E00", "\u4E8C", "\u4E09", "\u56DB"], Ge = ["\u4E0A", "\u4E0B"], Ie = {
  quarteryear: "Q",
  halfyear: "H",
  year: "Y"
};
function Xe(l) {
  return Ce({
    trigger: "click",
    placement: "bottom",
    hideAfter: 0,
    transition: "el-zoom-in-top",
    visible: !1,
    popperClass: l.popperClass
  });
}
function ke(l, o, e, t) {
  const a = l.type.replace("range", ""), u = T([]);
  ae(() => {
    var P, I;
    const k = l.modelValue.map((A) => {
      const { test: V, exec: E } = fe(a, X(A, a)), F = a !== "year" ? 3 : 2;
      return V && E && E.slice(1, F).map(Number) || [new Date().getFullYear(), 1];
    });
    ((P = k[e]) == null ? void 0 : P.join("")) !== ((I = u.value[e]) == null ? void 0 : I.join("")) && (u.value = k);
  });
  const v = t || Xe(l), i = R(() => X(l.modelValue[e], a)), n = R(() => l.startPlaceholder), r = R(() => l.endPlaceholder), p = (k) => {
    const { test: P, exec: I } = fe(a, k);
    if (P && I) {
      const A = z(te(a, I.slice(1, 3).map(Number)), a), V = l.modelValue.map((E) => z(X(E, a), a));
      if (e === 0 && new Date(A).getTime() > new Date(V[1]).getTime()) {
        o("update:modelValue", V);
        return;
      } else if (e === 1 && new Date(A).getTime() < new Date(V[0]).getTime()) {
        o("update:modelValue", V);
        return;
      }
      V[e] = A, o("update:modelValue", V);
    }
  }, f = T([...u.value[e]]), h = T(a), c = T([]), g = R(() => f.value[0]), d = R(() => h.value === "year"), m = R(() => Math.floor(g.value / 10) * 10), _ = R(() => {
    let k;
    switch (h.value) {
      case "year":
        k = `${m.value} - ${m.value + 9}`;
        break;
      default:
        k = `${g.value}`;
        break;
    }
    return k;
  }), y = () => {
    d.value ? f.value[0] -= 10 : f.value[0] -= 1, w();
  }, $ = () => {
    d.value ? f.value[0] += 10 : f.value[0] += 1, w();
  }, b = (k) => {
    if (!k.isDisabled)
      if (d.value && a !== "year")
        f.value[0] = k.year, h.value = a;
      else {
        const P = [];
        P[0] = k.year, a !== "year" && (P[1] = k[a]);
        const I = te(a, P);
        fe(a, I).test && (f.value = P);
      }
  }, S = () => {
    d.value || (h.value = "year");
  };
  O(() => h.value, () => {
    w();
  }), O(() => f.value, (k, P) => {
    const I = z(te(a, f.value), a), A = l.modelValue.map((V) => z(X(V, a), a));
    A[e] = I, o("update:modelValue", A), w();
  }), O(() => u.value, () => {
    f.value[0] = u.value[e][0], a !== "year" && (f.value[1] = u.value[e][1]), w();
  });
  function w() {
    c.value = Je(
      h.value,
      g.value,
      m.value,
      u.value[e],
      l.disabledDate
    );
  }
  return w(), {
    popover: v,
    inputValue: i,
    inputStartPlaceholder: n,
    inputEndPlaceholder: r,
    inputValueUpdate: p,
    panelTitle: _,
    panelItems: c,
    panelPrevClick: y,
    panelNextClick: $,
    panelItemClick: b,
    panelTitleClick: S,
    panelType: h
  };
}
function te(l, o) {
  return l === "year" ? `${o[0]}` : `${o[0]}-${Ie[l]}${o[1]}`;
}
function fe(l, o) {
  const e = l !== "year" ? new RegExp(`^(\\d{4})-${Ie[l]}(\\d)$`) : new RegExp("^(\\d{4})$");
  let t = e.test(o);
  const a = e.exec(o);
  return t && a && (l === "halfyear" && ![1, 2].includes(Number(a[2])) || l === "quarteryear" && ![1, 2, 3, 4].includes(Number(a[2]))) && (t = !1), {
    test: t,
    exec: a
  };
}
function Je(l, o, e, t, a) {
  let u;
  const v = new Date(), i = v.getFullYear(), n = v.getMonth() + 1, r = Math.ceil(n / 3), p = Math.ceil(n / 6);
  return l === "quarteryear" ? u = Oe.map((f, h) => {
    const c = o, g = h + 1;
    return {
      label: `\u7B2C${f}\u5B63\u5EA6`,
      year: c,
      quarteryear: g,
      isToday: c === i && g === r,
      isCurrent: c === t[0] && g === t[1],
      isDisabled: a(new Date(`${c}-${(g - 1) * 3 + 1}`))
    };
  }) : l === "halfyear" ? u = Ge.map((f, h) => {
    const c = o, g = h + 1;
    return {
      label: `${f}\u534A\u5E74`,
      year: c,
      halfyear: g,
      isToday: c === i && g === p,
      isCurrent: c === t[0] && g === t[1],
      isDisabled: a(new Date(`${c}-${(g - 1) * 6 + 1}`))
    };
  }) : l === "year" ? u = Array(10).fill(1).map((f, h) => {
    const c = e + h;
    return {
      label: `${c}`,
      year: c,
      isToday: c === i,
      isCurrent: c === t[0],
      isDisabled: a(new Date(`${c}`))
    };
  }) : u = [], u;
}
const Ke = { class: "el-picker-panel__content" }, et = { class: "el-date-picker__header el-date-picker__header--bordered" }, tt = {
  class: "el-month-table",
  style: {}
}, at = ["onClick"], ye = /* @__PURE__ */ G({
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
  setup(l, { emit: o }) {
    const e = l, t = R(() => Math.ceil(e.items.length / 4)), a = (i) => {
      const n = te(e.type, [i.year, i[e.type] || NaN]), r = z(n, e.type), p = z(e.rightValue, e.type);
      return !(new Date(r) <= new Date(p));
    }, u = (i) => {
      const n = te(e.typeSecond, [i.year, i[e.typeSecond] || NaN]), r = z(n, e.typeSecond), p = z(e.leftValue, e.typeSecond);
      return !(new Date(r) >= new Date(p));
    }, v = (i) => i.isDisabled ? !0 : e.range === 1 ? a(i) : e.range === 2 ? u(i) : !1;
    return (i, n) => (M(), N("div", Ke, [
      C("div", et, [
        C("span", {
          class: Q(["el-date-picker__prev-btn", [e.leftPanelArrowDisabled && "is-disabled cursor-not-allowed"]])
        }, [
          C("span", {
            "aria-label": "\u4E0A\u4E00\u5E74",
            class: Q(["el-picker-panel__icon-btn el-icon-d-arrow-left", [e.leftPanelArrowDisabled && "is-disabled pointer-events-none"]]),
            onClick: n[0] || (n[0] = (r) => o("clickPrev"))
          }, [
            L(s(be), {
              class: Q([e.leftPanelArrowDisabled && "is-disabled cursor-not-allowed"])
            }, {
              default: H(() => [
                L(s(Ue))
              ]),
              _: 1
            }, 8, ["class"])
          ], 2)
        ], 2),
        C("span", {
          role: "button",
          class: "el-date-picker__header-label",
          onClick: n[1] || (n[1] = (r) => o("clickTitle"))
        }, he(e.title), 1),
        C("span", {
          class: Q(["el-date-picker__next-btn", [e.rightPanelArrowDisabled && "is-disabled cursor-not-allowed"]])
        }, [
          C("span", {
            "aria-label": "\u4E0B\u4E00\u5E74",
            class: Q(["el-picker-panel__icon-btn el-icon-d-arrow-right", [e.rightPanelArrowDisabled && "is-disabled pointer-events-none"]]),
            onClick: n[2] || (n[2] = (r) => o("clickNext"))
          }, [
            L(s(be), {
              class: Q([e.rightPanelArrowDisabled && "is-disabled cursor-not-allowed"])
            }, {
              default: H(() => [
                L(s(Be))
              ]),
              _: 1
            }, 8, ["class"])
          ], 2)
        ], 2)
      ]),
      C("table", tt, [
        C("tbody", null, [
          (M(!0), N(re, null, _e(s(t), (r) => (M(), N("tr", { key: r }, [
            (M(!0), N(re, null, _e(e.items.slice((r - 1) * 4, (r - 1) * 4 + 4), (p) => (M(), N(re, {
              key: p.label
            }, [
              p ? (M(), N("td", {
                key: 0,
                class: Q({
                  today: p.isToday,
                  current: p.isCurrent,
                  disabled: v(p),
                  "pointer-events-none": v(p)
                })
              }, [
                C("div", {
                  class: Q({ "cursor-not-allowed": v(p) })
                }, [
                  C("span", {
                    class: "cell",
                    onClick: (f) => o("clickItem", p)
                  }, he(p.label), 9, at)
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
}, ot = { class: "el-input__prefix-inner" }, st = { class: "el-icon el-input__icon el-range__icon" }, it = ["value", "placeholder"], ut = /* @__PURE__ */ C("span", { class: "el-input__suffix" }, [
  /* @__PURE__ */ C("span", { class: "el-input__suffix-inner" })
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
  setup(l, { expose: o, emit: e }) {
    const t = l, a = t.prefixIcon, u = T(!1), v = (i) => u.value = i;
    return o({
      focus: u
    }), (i, n) => (M(), N("div", lt, [
      C("div", rt, [
        t.prefixIcon ? (M(), N("span", nt, [
          C("span", ot, [
            C("i", st, [
              L(s(a))
            ])
          ])
        ])) : ne("", !0),
        C("input", {
          autocomplete: "off",
          name: "",
          tabindex: "0",
          class: "el-input__inner",
          type: "text",
          value: t.value,
          placeholder: t.placeholder,
          onChange: n[0] || (n[0] = (r) => {
            var p, f;
            return e("update:value", (f = (p = r.target) == null ? void 0 : p.value) != null ? f : "");
          }),
          onClick: n[1] || (n[1] = (r) => v(!0)),
          onBlur: n[2] || (n[2] = (r) => v(!1))
        }, null, 40, it),
        ut
      ])
    ]));
  }
}), pt = ["\u4E00", "\u4E8C", "\u4E09", "\u56DB"], ft = ["\u4E0A", "\u4E0B"], Se = {
  quarteryear: "Q",
  halfyear: "H",
  year: "Y"
};
function vt(l) {
  return Ce({
    trigger: "click",
    placement: "bottom",
    hideAfter: 0,
    transition: "el-zoom-in-top",
    visible: !1,
    popperClass: l.popperClass
  });
}
function mt(l, o) {
  const e = l.type.replace("range", ""), t = R(() => {
    const { test: b, exec: S } = ve(e, X(l.modelValue, e));
    return b && S && S.slice(1, 3).map(Number) || [new Date().getFullYear(), 1];
  }), a = vt(l), u = R(() => X(l.modelValue, e)), v = R(() => l.placeholder), i = (b) => {
    const { test: S, exec: w } = ve(e, b);
    S && w && o("update:modelValue", z(b, e));
  }, n = T([...t.value]), r = T(e), p = T([]), f = R(() => n.value[0]), h = R(() => r.value === "year"), c = R(() => Math.floor(f.value / 10) * 10), g = R(() => {
    let b;
    switch (r.value) {
      case "year":
        b = `${c.value} - ${c.value + 9}`;
        break;
      default:
        b = `${f.value}`;
        break;
    }
    return b;
  }), d = () => {
    h.value ? n.value[0] -= 10 : n.value[0] -= 1, $();
  }, m = () => {
    h.value ? n.value[0] += 10 : n.value[0] += 1, $();
  }, _ = (b) => {
    if (!b.isDisabled)
      if (h.value && e !== "year")
        n.value[0] = b.year, r.value = e;
      else {
        const S = [b.year, b[e]], w = $e(e, S);
        ve(e, w).test && (n.value = S);
      }
  }, y = () => {
    h.value || (r.value = "year");
  };
  O(() => r.value, () => {
    $();
  }), O(() => n.value, (b, S) => {
    const w = z($e(e, n.value), e);
    o("update:modelValue", w), a.visible = !1, $();
  }), O(() => t.value, () => {
    n.value[0] = t.value[0], n.value[1] = t.value[1], $();
  });
  function $() {
    p.value = ht(
      r.value,
      f.value,
      c.value,
      t.value,
      l.disabledDate
    );
  }
  return $(), {
    popover: a,
    inputValue: u,
    inputPlaceholder: v,
    inputValueUpdate: i,
    panelTitle: g,
    panelItems: p,
    panelPrevClick: d,
    panelNextClick: m,
    panelItemClick: _,
    panelTitleClick: y
  };
}
function $e(l, o) {
  return `${o[0]}-${Se[l]}${o[1]}`;
}
function ve(l, o) {
  const e = new RegExp(`^(\\d{4})-${Se[l]}(\\d)$`);
  let t = e.test(o);
  const a = e.exec(o);
  return t && a && (l === "halfyear" && ![1, 2].includes(Number(a[2])) || l === "quarteryear" && ![1, 2, 3, 4].includes(Number(a[2]))) && (t = !1), {
    test: t,
    exec: a
  };
}
function ht(l, o, e, t, a) {
  let u;
  const v = new Date(), i = v.getFullYear(), n = v.getMonth() + 1, r = Math.ceil(n / 3), p = Math.ceil(n / 6);
  return l === "quarteryear" ? u = pt.map((f, h) => {
    const c = o, g = h + 1;
    return {
      label: `\u7B2C${f}\u5B63\u5EA6`,
      year: c,
      quarteryear: g,
      isToday: c === i && g === r,
      isCurrent: c === t[0] && g === t[1],
      isDisabled: a(new Date(`${c}-${(g - 1) * 3 + 1}`))
    };
  }) : l === "halfyear" ? u = ft.map((f, h) => {
    const c = o, g = h + 1;
    return {
      label: `${f}\u534A\u5E74`,
      year: c,
      halfyear: g,
      isToday: c === i && g === p,
      isCurrent: c === t[0] && g === t[1],
      isDisabled: a(new Date(`${c}-${(g - 1) * 6 + 1}`))
    };
  }) : l === "year" ? u = Array(10).fill(1).map((f, h) => {
    const c = e + h;
    return {
      label: `${c}`,
      year: c,
      isToday: c === i,
      isCurrent: c === t[0],
      isDisabled: a(new Date(`${c}`))
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
  setup(l, { emit: o }) {
    const e = l, {
      popover: t,
      inputValue: a,
      inputPlaceholder: u,
      inputValueUpdate: v,
      panelTitle: i,
      panelItems: n,
      panelPrevClick: r,
      panelNextClick: p,
      panelItemClick: f,
      panelTitleClick: h
    } = mt(e, o), c = xe("scopedId"), g = T(null);
    ae(() => {
      var $, b, S;
      const y = (b = ($ = g.value) == null ? void 0 : $.popperRef) == null ? void 0 : b.contentRef;
      (S = y == null ? void 0 : y.setAttribute) == null || S.call(y, `${String(c.value)}`, "");
    });
    const d = T(null), m = T(null);
    let _ = !1;
    return ae(() => {
      var y, $;
      ((y = d.value) == null ? void 0 : y.focus) || (($ = m.value) == null ? void 0 : $.focus) ? (_ = !1, t.visible = !0) : (_ = !0, setTimeout(() => {
        _ && (t.visible = !1) && (_ = !1);
      }, 100));
    }), (y, $) => (M(), j(s(Ve), {
      ref_key: "datepickerHalfQuarterYearRef",
      ref: g,
      visible: s(t).visible,
      trigger: s(t).trigger,
      placement: s(t).placement,
      "hide-after": s(t).hideAfter,
      transition: s(t).transition,
      "popper-class": s(t).popperClass,
      width: "auto"
    }, {
      reference: H(() => [
        L(dt, {
          ref_key: "InputRef",
          ref: d,
          value: s(a),
          placeholder: s(u),
          "prefix-icon": e.prefixIcon,
          "onUpdate:value": s(v)
        }, null, 8, ["value", "placeholder", "prefix-icon", "onUpdate:value"])
      ]),
      default: H(() => [
        L(we, {
          ref_key: "panelWrapperRef",
          ref: m
        }, {
          default: H(() => [
            L(ye, {
              title: s(i),
              items: s(n),
              onClickPrev: s(r),
              onClickNext: s(p),
              onClickItem: s(f),
              onClickTitle: s(h)
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
}, bt = ["value", "placeholder"], kt = { class: "el-range-separator" }, $t = ["value", "placeholder"], Dt = /* @__PURE__ */ C("i", { class: "el-icon el-input__icon el-range__close-icon el-range__close-icon--hidden" }, [
  /* @__PURE__ */ C("svg", {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ C("path", {
      fill: "currentColor",
      d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
    }),
    /* @__PURE__ */ C("path", {
      fill: "currentColor",
      d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
    })
  ])
], -1), Ct = /* @__PURE__ */ G({
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
  setup(l, { expose: o, emit: e }) {
    const t = l, a = t.prefixIcon, u = T(!1), v = T(!1), i = (r) => u.value = r, n = (r) => v.value = r;
    return o({
      startFocus: u,
      endFocus: v
    }), (r, p) => (M(), N("div", gt, [
      t.prefixIcon ? (M(), N("i", _t, [
        L(s(a))
      ])) : ne("", !0),
      C("input", {
        autocomplete: "off",
        name: "",
        class: "el-range-input",
        value: t.startValue,
        placeholder: t.startPlaceholder,
        onChange: p[0] || (p[0] = (f) => {
          var h, c;
          return e("update:startValue", (c = (h = f.target) == null ? void 0 : h.value) != null ? c : "");
        }),
        onClick: p[1] || (p[1] = (f) => i(!0)),
        onBlur: p[2] || (p[2] = (f) => i(!1))
      }, null, 40, bt),
      C("span", kt, he(t.rangeSeparator), 1),
      C("input", {
        autocomplete: "off",
        name: "",
        class: "el-range-input",
        value: t.endValue,
        placeholder: t.endPlaceholder,
        onChange: p[3] || (p[3] = (f) => {
          var h, c;
          return e("update:endValue", (c = (h = f.target) == null ? void 0 : h.value) != null ? c : "");
        }),
        onClick: p[4] || (p[4] = (f) => n(!0)),
        onBlur: p[5] || (p[5] = (f) => n(!1))
      }, null, 40, $t),
      Dt
    ]));
  }
}), xt = {
  inheritAttrs: !1
}, me = /* @__PURE__ */ G({
  ...xt,
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
  setup(l, { emit: o }) {
    const e = l, {
      popover: t,
      inputValue: a,
      inputStartPlaceholder: u,
      inputValueUpdate: v,
      panelTitle: i,
      panelItems: n,
      panelPrevClick: r,
      panelNextClick: p,
      panelItemClick: f,
      panelTitleClick: h,
      panelType: c
    } = ke(e, o, 0), {
      inputValue: g,
      inputEndPlaceholder: d,
      inputValueUpdate: m,
      panelTitle: _,
      panelItems: y,
      panelPrevClick: $,
      panelNextClick: b,
      panelItemClick: S,
      panelTitleClick: w,
      panelType: k
    } = ke(e, o, 1, t), P = e.type.replace("range", ""), I = T([!1, !1]), A = (x, D) => {
      P in x && (I.value[D - 1] = !0), D === 1 ? f(x) : S(x);
    };
    O(I, () => {
      I.value.every(Boolean) && (I.value = [!1, !1]) && (t.visible = !1);
    }, { deep: !0 });
    const V = xe("scopedId"), E = T(null);
    ae(() => {
      var D, Y, B;
      const x = (Y = (D = E.value) == null ? void 0 : D.popperRef) == null ? void 0 : Y.contentRef;
      (B = x == null ? void 0 : x.setAttribute) == null || B.call(x, `${String(V.value)}`, "");
    });
    const F = T(null), q = T(null);
    let U = !1;
    ae(() => {
      var Y, B, Z;
      const x = !!((Y = F.value) != null && Y.startFocus), D = !!((B = F.value) != null && B.endFocus);
      x || D || ((Z = q.value) == null ? void 0 : Z.focus) ? (U = !1, t.visible = !0) : (U = !0, setTimeout(() => {
        U && (t.visible = !1) && (U = !1);
      }, 100));
    });
    const W = R(() => {
      const x = i.value.slice(-4), D = _.value.slice(0, 4);
      return c.value === "year" && k.value === "year" || c.value === "year" && k.value !== "year" || c.value !== "year" && k.value === "year", x >= D;
    });
    return (x, D) => (M(), j(s(Ve), {
      ref_key: "datepickerHalfQuarterYearRangeRef",
      ref: E,
      visible: s(t).visible,
      trigger: s(t).trigger,
      placement: s(t).placement,
      "hide-after": s(t).hideAfter,
      transition: s(t).transition,
      "popper-class": s(t).popperClass,
      width: "auto"
    }, {
      reference: H(() => [
        L(Ct, {
          ref_key: "InputRef",
          ref: F,
          value: "",
          placeholder: "",
          "start-value": s(a),
          "end-value": s(g),
          "start-placeholder": s(u),
          "end-placeholder": s(d),
          "range-separator": e.rangeSeparator,
          "prefix-icon": e.prefixIcon,
          "onUpdate:startValue": s(v),
          "onUpdate:endValue": s(m)
        }, null, 8, ["start-value", "end-value", "start-placeholder", "end-placeholder", "range-separator", "prefix-icon", "onUpdate:startValue", "onUpdate:endValue"])
      ]),
      default: H(() => [
        L(we, {
          ref_key: "panelWrapperRef",
          ref: q,
          "is-range": ""
        }, {
          "range-left": H(() => [
            L(ye, {
              class: "el-date-range-picker__content is-left p-0",
              title: s(i),
              items: s(n),
              "right-panel-arrow-disabled": s(W),
              type: s(c),
              range: 1,
              "left-value": s(a),
              "right-value": s(g),
              onClickPrev: s(r),
              onClickNext: s(p),
              onClickItem: D[0] || (D[0] = (Y) => A(Y, 1)),
              onClickTitle: s(h)
            }, null, 8, ["title", "items", "right-panel-arrow-disabled", "type", "left-value", "right-value", "onClickPrev", "onClickNext", "onClickTitle"])
          ]),
          "range-right": H(() => [
            L(ye, {
              class: "el-date-range-picker__content is-right p-0",
              title: s(_),
              items: s(y),
              "left-panel-arrow-disabled": s(W),
              type: s(c),
              "type-second": s(k),
              range: 2,
              "left-value": s(a),
              "right-value": s(g),
              onClickPrev: s($),
              onClickNext: s(b),
              onClickItem: D[1] || (D[1] = (Y) => A(Y, 2)),
              onClickTitle: s(w)
            }, null, 8, ["title", "items", "left-panel-arrow-disabled", "type", "type-second", "left-value", "right-value", "onClickPrev", "onClickNext", "onClickTitle"])
          ]),
          _: 1
        }, 512)
      ]),
      _: 1
    }, 8, ["visible", "trigger", "placement", "hide-after", "transition", "popper-class"]));
  }
});
const Vt = {
  inheritAttrs: !1
}, wt = /* @__PURE__ */ G({
  ...Vt,
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
  setup(l, { emit: o }) {
    const e = l, t = [
      "year",
      "month",
      "date",
      "dates",
      "datetime",
      "week",
      "datetimerange",
      "daterange",
      "monthrange"
    ], a = R(() => `${e.popperClass} el-picker__popper p-0`), u = T(null), v = R(() => {
      var n, r;
      const i = (n = u.value) == null ? void 0 : n.attributes;
      if (!!i)
        return (r = Object.values(i).find((p) => /^data-v-[a-zA-Z0-9]{8}$/.test(String(p == null ? void 0 : p.name)))) == null ? void 0 : r.name;
    });
    return Fe("scopedId", v), (i, n) => (M(), N("div", {
      ref_key: "datePickerEnhancedRef",
      ref: u,
      class: "component-datepicker-enhanced"
    }, [
      t.includes(e.type) ? (M(), j(s(Le), Ne({ key: 0 }, i.$attrs, {
        type: e.type,
        "model-value": e.modelValue,
        "disabled-date": e.disabledDate,
        "popper-class": e.popperClass,
        placeholder: e.placeholder,
        "start-placeholder": e.startPlaceholder,
        "end-placeholder": e.endPlaceholder,
        "range-separator": e.rangeSeparator,
        "prefix-icon": e.prefixIcon,
        "onUpdate:modelValue": n[0] || (n[0] = (r) => o("update:modelValue", r))
      }), {
        default: H(() => [
          K(i.$slots, "default", {}, void 0, !0),
          K(i.$slots, "range-separator", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["type", "model-value", "disabled-date", "popper-class", "placeholder", "start-placeholder", "end-placeholder", "range-separator", "prefix-icon"])) : e.type === "halfyear" ? (M(), j(De, {
        key: 1,
        type: "halfyear",
        "model-value": Array.isArray(e.modelValue) ? e.modelValue[0] : e.modelValue,
        "disabled-date": e.disabledDate,
        "popper-class": s(a),
        placeholder: e.placeholder,
        "prefix-icon": e.prefixIcon,
        "onUpdate:modelValue": n[1] || (n[1] = (r) => o("update:modelValue", r))
      }, null, 8, ["model-value", "disabled-date", "popper-class", "placeholder", "prefix-icon"])) : e.type === "quarteryear" ? (M(), j(De, {
        key: 2,
        type: "quarteryear",
        "model-value": Array.isArray(e.modelValue) ? e.modelValue[0] : e.modelValue,
        "disabled-date": e.disabledDate,
        "popper-class": s(a),
        placeholder: e.placeholder,
        "prefix-icon": e.prefixIcon,
        "onUpdate:modelValue": n[2] || (n[2] = (r) => o("update:modelValue", r))
      }, null, 8, ["model-value", "disabled-date", "popper-class", "placeholder", "prefix-icon"])) : e.type === "halfyearrange" ? (M(), j(me, {
        key: 3,
        type: "halfyearrange",
        "model-value": Array.isArray(e.modelValue) ? e.modelValue : [e.modelValue, e.modelValue],
        "disabled-date": e.disabledDate,
        "popper-class": s(a),
        "start-placeholder": e.startPlaceholder,
        "end-placeholder": e.endPlaceholder,
        "range-separator": e.rangeSeparator,
        "prefix-icon": e.prefixIcon,
        "onUpdate:modelValue": n[3] || (n[3] = (r) => o("update:modelValue", r))
      }, null, 8, ["model-value", "disabled-date", "popper-class", "start-placeholder", "end-placeholder", "range-separator", "prefix-icon"])) : e.type === "quarteryearrange" ? (M(), j(me, {
        key: 4,
        type: "quarteryearrange",
        "model-value": Array.isArray(e.modelValue) ? e.modelValue : [e.modelValue, e.modelValue],
        "disabled-date": e.disabledDate,
        "popper-class": s(a),
        "start-placeholder": e.startPlaceholder,
        "end-placeholder": e.endPlaceholder,
        "range-separator": e.rangeSeparator,
        "prefix-icon": e.prefixIcon,
        "onUpdate:modelValue": n[4] || (n[4] = (r) => o("update:modelValue", r))
      }, null, 8, ["model-value", "disabled-date", "popper-class", "start-placeholder", "end-placeholder", "range-separator", "prefix-icon"])) : e.type === "yearrange" ? (M(), j(me, {
        key: 5,
        type: "yearrange",
        "model-value": Array.isArray(e.modelValue) ? e.modelValue : [e.modelValue, e.modelValue],
        "disabled-date": e.disabledDate,
        "popper-class": s(a),
        "start-placeholder": e.startPlaceholder,
        "end-placeholder": e.endPlaceholder,
        "range-separator": e.rangeSeparator,
        "prefix-icon": e.prefixIcon,
        "onUpdate:modelValue": n[5] || (n[5] = (r) => o("update:modelValue", r))
      }, null, 8, ["model-value", "disabled-date", "popper-class", "start-placeholder", "end-placeholder", "range-separator", "prefix-icon"])) : ne("", !0)
    ], 512));
  }
});
const Pt = (l, o) => {
  const e = l.__vccOpts || l;
  for (const [t, a] of o)
    e[t] = a;
  return e;
}, Et = /* @__PURE__ */ Pt(wt, [["__scopeId", "data-v-0dc259a8"]]);
export {
  Et as default
};
