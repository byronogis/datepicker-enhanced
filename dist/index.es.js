import { defineComponent as W, toRef as Fe, ref as S, openBlock as A, createElementBlock as H, normalizeClass as q, unref as i, createElementVNode as C, Fragment as te, renderSlot as K, computed as M, createVNode as L, withCtx as U, toDisplayString as me, renderList as ge, createCommentVNode as $e, createStaticVNode as Re, watch as O, reactive as Ve, inject as Pe, watchEffect as le, createBlock as Q, provide as Ne, mergeProps as ze } from "vue";
import { ElIcon as _e, ElPopover as we, ElDatePicker as Be } from "element-plus";
import { DArrowLeft as He, DArrowRight as Le } from "@element-plus/icons-vue";
import J from "dayjs";
const Ue = { class: "el-picker-panel__body-wrapper" }, qe = { class: "el-picker-panel__body" }, De = /* @__PURE__ */ W({
  __name: "DatePickerPanelWrapper",
  props: {
    isRange: { type: Boolean }
  },
  setup(l, { expose: n }) {
    const a = Fe(l, "isRange"), t = S(!1), s = (d) => t.value = d;
    return n({
      focus: t
    }), (d, o) => (A(), H("div", {
      tabindex: "0",
      class: q(["el-picker-panel", i(a) ? "el-date-range-picker" : "el-date-picker"]),
      onFocus: o[0] || (o[0] = (u) => s(!0)),
      onBlur: o[1] || (o[1] = (u) => s(!1))
    }, [
      C("div", Ue, [
        C("div", qe, [
          i(a) ? (A(), H(te, { key: 0 }, [
            K(d.$slots, "range-left"),
            K(d.$slots, "range-right")
          ], 64)) : K(d.$slots, "default", { key: 1 })
        ])
      ])
    ], 34));
  }
}), Qe = { class: "el-picker-panel__content" }, Ze = { class: "el-date-picker__header el-date-picker__header--bordered" }, je = {
  class: "el-month-table",
  style: {}
}, Oe = ["onClick"], he = /* @__PURE__ */ W({
  __name: "DatePickerPanel",
  props: {
    title: null,
    items: null,
    leftPanelArrowDisabled: { type: Boolean },
    rightPanelArrowDisabled: { type: Boolean }
  },
  emits: [
    "clickPrev",
    "clickNext",
    "clickTitle",
    "clickItem"
  ],
  setup(l, { emit: n }) {
    const e = l, a = M(() => Math.ceil(e.items.length / 4));
    return (t, s) => (A(), H("div", Qe, [
      C("div", Ze, [
        C("span", {
          class: q(["el-date-picker__prev-btn", [e.leftPanelArrowDisabled && "is-disabled cursor-not-allowed"]])
        }, [
          C("span", {
            "aria-label": "\u4E0A\u4E00\u5E74",
            class: q(["el-picker-panel__icon-btn el-icon-d-arrow-left", [e.leftPanelArrowDisabled && "is-disabled pointer-events-none"]]),
            onClick: s[0] || (s[0] = (d) => n("clickPrev"))
          }, [
            L(i(_e), {
              class: q([e.leftPanelArrowDisabled && "is-disabled cursor-not-allowed"])
            }, {
              default: U(() => [
                L(i(He))
              ]),
              _: 1
            }, 8, ["class"])
          ], 2)
        ], 2),
        C("span", {
          role: "button",
          class: "el-date-picker__header-label",
          onClick: s[1] || (s[1] = (d) => n("clickTitle"))
        }, me(e.title), 1),
        C("span", {
          class: q(["el-date-picker__next-btn", [e.rightPanelArrowDisabled && "is-disabled cursor-not-allowed"]])
        }, [
          C("span", {
            "aria-label": "\u4E0B\u4E00\u5E74",
            class: q(["el-picker-panel__icon-btn el-icon-d-arrow-right", [e.rightPanelArrowDisabled && "is-disabled pointer-events-none"]]),
            onClick: s[2] || (s[2] = (d) => n("clickNext"))
          }, [
            L(i(_e), {
              class: q([e.rightPanelArrowDisabled && "is-disabled cursor-not-allowed"])
            }, {
              default: U(() => [
                L(i(Le))
              ]),
              _: 1
            }, 8, ["class"])
          ], 2)
        ], 2)
      ]),
      C("table", je, [
        C("tbody", null, [
          (A(!0), H(te, null, ge(i(a), (d) => (A(), H("tr", { key: d }, [
            (A(!0), H(te, null, ge(e.items.slice((d - 1) * 4, (d - 1) * 4 + 4), (o) => (A(), H(te, {
              key: o.label
            }, [
              o ? (A(), H("td", {
                key: 0,
                class: q({
                  today: o.isToday,
                  current: o.isCurrent,
                  disabled: o.isDisabled
                })
              }, [
                C("div", null, [
                  C("span", {
                    class: "cell",
                    onClick: (u) => n("clickItem", o)
                  }, me(o.label), 9, Oe)
                ])
              ], 2)) : $e("", !0)
            ], 64))), 128))
          ]))), 128))
        ])
      ])
    ]));
  }
}), We = { class: "el-input el-input--prefix el-input--suffix el-date-editor el-date-editor--month el-tooltip__trigger el-tooltip__trigger" }, Ge = { class: "el-input__wrapper" }, Xe = /* @__PURE__ */ Re('<span class="el-input__prefix"><span class="el-input__prefix-inner"><i class="el-icon el-input__icon"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0v32zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64z"></path></svg></i></span></span>', 1), Je = ["value", "placeholder"], Ke = /* @__PURE__ */ C("span", { class: "el-input__suffix" }, [
  /* @__PURE__ */ C("span", { class: "el-input__suffix-inner" })
], -1), ea = {
  inheritAttrs: !1
}, aa = /* @__PURE__ */ W({
  ...ea,
  __name: "DatePickerInput",
  props: {
    value: null,
    placeholder: null
  },
  emits: ["update:value"],
  setup(l, { expose: n, emit: e }) {
    const a = l, t = S(!1), s = (d) => t.value = d;
    return n({
      focus: t
    }), (d, o) => (A(), H("div", We, [
      C("div", Ge, [
        Xe,
        C("input", {
          autocomplete: "off",
          name: "",
          tabindex: "0",
          class: "el-input__inner",
          type: "text",
          value: a.value,
          placeholder: a.placeholder,
          onChange: o[0] || (o[0] = (u) => {
            var r, h;
            return e("update:value", (h = (r = u.target) == null ? void 0 : r.value) != null ? h : "");
          }),
          onClick: o[1] || (o[1] = (u) => s(!0)),
          onBlur: o[2] || (o[2] = (u) => s(!1))
        }, null, 40, Je),
        Ke
      ])
    ]));
  }
});
var ta = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, xe = { exports: {} };
(function(l, n) {
  (function(e, a) {
    l.exports = a();
  })(ta, function() {
    var e = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, a = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, t = /\d\d/, s = /\d\d?/, d = /\d*[^-_:/,()\s\d]+/, o = {}, u = function(p) {
      return (p = +p) + (p > 68 ? 1900 : 2e3);
    }, r = function(p) {
      return function(v) {
        this[p] = +v;
      };
    }, h = [/[+-]\d\d:?(\d\d)?|Z/, function(p) {
      (this.zone || (this.zone = {})).offset = function(v) {
        if (!v || v === "Z")
          return 0;
        var y = v.match(/([+-]|\d\d)/g), m = 60 * y[1] + (+y[2] || 0);
        return m === 0 ? 0 : y[0] === "+" ? -m : m;
      }(p);
    }], f = function(p) {
      var v = o[p];
      return v && (v.indexOf ? v : v.s.concat(v.f));
    }, c = function(p, v) {
      var y, m = o.meridiem;
      if (m) {
        for (var k = 1; k <= 24; k += 1)
          if (p.indexOf(m(k, 0, v)) > -1) {
            y = k > 12;
            break;
          }
      } else
        y = p === (v ? "pm" : "PM");
      return y;
    }, _ = { A: [d, function(p) {
      this.afternoon = c(p, !1);
    }], a: [d, function(p) {
      this.afternoon = c(p, !0);
    }], S: [/\d/, function(p) {
      this.milliseconds = 100 * +p;
    }], SS: [t, function(p) {
      this.milliseconds = 10 * +p;
    }], SSS: [/\d{3}/, function(p) {
      this.milliseconds = +p;
    }], s: [s, r("seconds")], ss: [s, r("seconds")], m: [s, r("minutes")], mm: [s, r("minutes")], H: [s, r("hours")], h: [s, r("hours")], HH: [s, r("hours")], hh: [s, r("hours")], D: [s, r("day")], DD: [t, r("day")], Do: [d, function(p) {
      var v = o.ordinal, y = p.match(/\d+/);
      if (this.day = y[0], v)
        for (var m = 1; m <= 31; m += 1)
          v(m).replace(/\[|\]/g, "") === p && (this.day = m);
    }], M: [s, r("month")], MM: [t, r("month")], MMM: [d, function(p) {
      var v = f("months"), y = (f("monthsShort") || v.map(function(m) {
        return m.slice(0, 3);
      })).indexOf(p) + 1;
      if (y < 1)
        throw new Error();
      this.month = y % 12 || y;
    }], MMMM: [d, function(p) {
      var v = f("months").indexOf(p) + 1;
      if (v < 1)
        throw new Error();
      this.month = v % 12 || v;
    }], Y: [/[+-]?\d+/, r("year")], YY: [t, function(p) {
      this.year = u(p);
    }], YYYY: [/\d{4}/, r("year")], Z: h, ZZ: h };
    function F(p) {
      var v, y;
      v = p, y = o && o.formats;
      for (var m = (p = v.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(w, E, I) {
        var T = I && I.toUpperCase();
        return E || y[I] || e[I] || y[T].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(R, B, N) {
          return B || N.slice(1);
        });
      })).match(a), k = m.length, g = 0; g < k; g += 1) {
        var D = m[g], P = _[D], b = P && P[0], x = P && P[1];
        m[g] = x ? { regex: b, parser: x } : D.replace(/^\[|\]$/g, "");
      }
      return function(w) {
        for (var E = {}, I = 0, T = 0; I < k; I += 1) {
          var R = m[I];
          if (typeof R == "string")
            T += R.length;
          else {
            var B = R.regex, N = R.parser, Z = w.slice(T), V = B.exec(Z)[0];
            N.call(E, V), w = w.replace(V, "");
          }
        }
        return function($) {
          var Y = $.afternoon;
          if (Y !== void 0) {
            var z = $.hours;
            Y ? z < 12 && ($.hours += 12) : z === 12 && ($.hours = 0), delete $.afternoon;
          }
        }(E), E;
      };
    }
    return function(p, v, y) {
      y.p.customParseFormat = !0, p && p.parseTwoDigitYear && (u = p.parseTwoDigitYear);
      var m = v.prototype, k = m.parse;
      m.parse = function(g) {
        var D = g.date, P = g.utc, b = g.args;
        this.$u = P;
        var x = b[1];
        if (typeof x == "string") {
          var w = b[2] === !0, E = b[3] === !0, I = w || E, T = b[2];
          E && (T = b[2]), o = this.$locale(), !w && T && (o = y.Ls[T]), this.$d = function(Z, V, $) {
            try {
              if (["x", "X"].indexOf(V) > -1)
                return new Date((V === "X" ? 1e3 : 1) * Z);
              var Y = F(V)(Z), z = Y.year, j = Y.month, Ae = Y.day, Ee = Y.hours, Se = Y.minutes, Ie = Y.seconds, Te = Y.milliseconds, ye = Y.zone, re = new Date(), ne = Ae || (z || j ? 1 : re.getDate()), oe = z || re.getFullYear(), ae = 0;
              z && !j || (ae = j > 0 ? j - 1 : re.getMonth());
              var se = Ee || 0, ue = Se || 0, ie = Ie || 0, ce = Te || 0;
              return ye ? new Date(Date.UTC(oe, ae, ne, se, ue, ie, ce + 60 * ye.offset * 1e3)) : $ ? new Date(Date.UTC(oe, ae, ne, se, ue, ie, ce)) : new Date(oe, ae, ne, se, ue, ie, ce);
            } catch {
              return new Date("");
            }
          }(D, x, P), this.init(), T && T !== !0 && (this.$L = this.locale(T).$L), I && D != this.format(x) && (this.$d = new Date("")), o = {};
        } else if (x instanceof Array)
          for (var R = x.length, B = 1; B <= R; B += 1) {
            b[1] = x[B - 1];
            var N = y.apply(this, b);
            if (N.isValid()) {
              this.$d = N.$d, this.$L = N.$L, this.init();
              break;
            }
            B === R && (this.$d = new Date(""));
          }
        else
          k.call(this, g);
      };
    };
  });
})(xe);
const la = xe.exports;
J.extend(la);
const ee = "YYYY-MM-DD", ra = [
  ["halfyear", "H"],
  ["quarteryear", "Q"]
];
function na(l, n) {
  const a = J(l).format(ee).split("-").map(Number), t = a[0], s = a[1] + 1, d = {
    halfyear: Math.ceil(s / 6),
    quarteryear: Math.ceil(s / 3)
  };
  let o;
  if (n === "halfyear" || n === "quarteryear") {
    const u = ra.find((r) => r[0] === n)[1];
    o = `${t}-${u}${d[n]}`;
  } else
    o = `${t}`;
  return o;
}
function G(l, n) {
  const e = (a) => {
    const t = J(a, ee, !0).isValid();
    return na(t ? a : new Date(), n);
  };
  return Array.isArray(l) ? l.map((a) => e(a)) : e(l);
}
function X(l, n) {
  const e = (a) => {
    const t = a.split("-"), s = t[0];
    if (n === "halfyear") {
      const d = [s, (Number(t[1][1]) - 1) * 6 + 1].join("-");
      return J(d).format(ee);
    } else if (n === "quarteryear") {
      const d = [s, (Number(t[1][1]) - 1) * 3 + 1].join("-");
      return J(d).format(ee);
    } else
      return J(s).format(ee);
  };
  return Array.isArray(l) ? l.map((a) => e(a)) : e(l);
}
const oa = ["\u4E00", "\u4E8C", "\u4E09", "\u56DB"], sa = ["\u4E0A", "\u4E0B"], Ye = {
  quarteryear: "Q",
  halfyear: "H",
  year: "Y"
};
function ua(l) {
  return Ve({
    trigger: "click",
    placement: "bottom",
    hideAfter: 0,
    transition: "el-zoom-in-top",
    visible: !1,
    popperClass: l.popperClass
  });
}
function ia(l, n) {
  const e = l.type.replace("range", ""), a = M(() => {
    const { test: g, exec: D } = pe(e, G(l.modelValue, e));
    return g && D && D.slice(1, 3).map(Number) || [new Date().getFullYear(), 1];
  }), t = ua(l), s = M(() => G(l.modelValue, e)), d = M(() => l.placeholder), o = (g) => {
    const { test: D, exec: P } = pe(e, g);
    D && P && n("update:modelValue", X(g, e));
  }, u = S([...a.value]), r = S(e), h = S([]), f = M(() => u.value[0]), c = M(() => r.value === "year"), _ = M(() => Math.floor(f.value / 10) * 10), F = M(() => {
    let g;
    switch (r.value) {
      case "year":
        g = `${_.value} - ${_.value + 9}`;
        break;
      default:
        g = `${f.value}`;
        break;
    }
    return g;
  }), p = () => {
    c.value ? u.value[0] -= 10 : u.value[0] -= 1, k();
  }, v = () => {
    c.value ? u.value[0] += 10 : u.value[0] += 1, k();
  }, y = (g) => {
    if (!g.isDisabled)
      if (c.value && e !== "year")
        u.value[0] = g.year, r.value = e;
      else {
        const D = [g.year, g[e]], P = ke(e, D);
        pe(e, P).test && (u.value = D);
      }
  }, m = () => {
    c.value || (r.value = "year");
  };
  O(() => r.value, () => {
    k();
  }), O(() => u.value, (g, D) => {
    const P = X(ke(e, u.value), e);
    n("update:modelValue", P), t.visible = !1, k();
  }), O(() => a.value, () => {
    u.value[0] = a.value[0], u.value[1] = a.value[1], k();
  });
  function k() {
    h.value = ca(
      r.value,
      f.value,
      _.value,
      a.value
    );
  }
  return k(), {
    popover: t,
    inputValue: s,
    inputPlaceholder: d,
    inputValueUpdate: o,
    panelTitle: F,
    panelItems: h,
    panelPrevClick: p,
    panelNextClick: v,
    panelItemClick: y,
    panelTitleClick: m
  };
}
function ke(l, n) {
  return `${n[0]}-${Ye[l]}${n[1]}`;
}
function pe(l, n) {
  const e = new RegExp(`^(\\d{4})-${Ye[l]}(\\d)$`);
  let a = e.test(n);
  const t = e.exec(n);
  return a && t && (l === "halfyear" && ![1, 2].includes(Number(t[2])) || l === "quarteryear" && ![1, 2, 3, 4].includes(Number(t[2]))) && (a = !1), {
    test: a,
    exec: t
  };
}
function ca(l, n, e, a) {
  let t;
  const s = new Date(), d = s.getFullYear(), o = s.getMonth() + 1, u = Math.ceil(o / 3), r = Math.ceil(o / 6);
  return l === "quarteryear" ? t = oa.map((h, f) => {
    const c = n, _ = f + 1;
    return {
      label: `\u7B2C${h}\u5B63\u5EA6`,
      year: c,
      quarteryear: _,
      isToday: c === d && _ === u,
      isCurrent: c === a[0] && _ === a[1]
    };
  }) : l === "halfyear" ? t = sa.map((h, f) => {
    const c = n, _ = f + 1;
    return {
      label: `${h}\u534A\u5E74`,
      year: c,
      halfyear: _,
      isToday: c === d && _ === r,
      isCurrent: c === a[0] && _ === a[1]
    };
  }) : l === "year" ? t = Array(10).fill(1).map((h, f) => {
    const c = e + f;
    return {
      label: `${c}`,
      year: c,
      isToday: c === d,
      isCurrent: c === a[0]
    };
  }) : t = [], t;
}
const pa = {
  inheritAttrs: !1
}, be = /* @__PURE__ */ W({
  ...pa,
  __name: "DatePickerQuarterHalfYear",
  props: {
    modelValue: null,
    popperClass: null,
    placeholder: null,
    type: null
  },
  emits: ["update:modelValue"],
  setup(l, { emit: n }) {
    const e = l, {
      popover: a,
      inputValue: t,
      inputPlaceholder: s,
      inputValueUpdate: d,
      panelTitle: o,
      panelItems: u,
      panelPrevClick: r,
      panelNextClick: h,
      panelItemClick: f,
      panelTitleClick: c
    } = ia(e, n), _ = Pe("scopedId"), F = S(null);
    le(() => {
      var k, g, D;
      const m = (g = (k = F.value) == null ? void 0 : k.popperRef) == null ? void 0 : g.contentRef;
      (D = m == null ? void 0 : m.setAttribute) == null || D.call(m, `${String(_.value)}`, "");
    });
    const p = S(null), v = S(null);
    let y = !1;
    return le(() => {
      var m, k;
      ((m = p.value) == null ? void 0 : m.focus) || ((k = v.value) == null ? void 0 : k.focus) ? (y = !1, a.visible = !0) : (y = !0, setTimeout(() => {
        y && (a.visible = !1) && (y = !1);
      }, 100));
    }), (m, k) => (A(), Q(i(we), {
      ref_key: "datepickerHalfQuarterYearRef",
      ref: F,
      visible: i(a).visible,
      trigger: i(a).trigger,
      placement: i(a).placement,
      "hide-after": i(a).hideAfter,
      transition: i(a).transition,
      "popper-class": i(a).popperClass,
      width: "auto"
    }, {
      reference: U(() => [
        L(aa, {
          ref_key: "InputRef",
          ref: p,
          value: i(t),
          placeholder: i(s),
          "onUpdate:value": i(d)
        }, null, 8, ["value", "placeholder", "onUpdate:value"])
      ]),
      default: U(() => [
        L(De, {
          ref_key: "panelWrapperRef",
          ref: v
        }, {
          default: U(() => [
            L(he, {
              title: i(o),
              items: i(u),
              onClickPrev: i(r),
              onClickNext: i(h),
              onClickItem: i(f),
              onClickTitle: i(c)
            }, null, 8, ["title", "items", "onClickPrev", "onClickNext", "onClickItem", "onClickTitle"])
          ]),
          _: 1
        }, 512)
      ]),
      _: 1
    }, 8, ["visible", "trigger", "placement", "hide-after", "transition", "popper-class"]));
  }
}), da = { class: "el-date-editor el-date-editor--monthrange el-input__wrapper el-range-editor el-tooltip__trigger el-tooltip__trigger" }, fa = /* @__PURE__ */ C("i", { class: "el-icon el-input__icon el-range__icon" }, [
  /* @__PURE__ */ C("svg", {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ C("path", {
      fill: "currentColor",
      d: "M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0v32zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64z"
    })
  ])
], -1), va = ["value", "placeholder"], ma = { class: "el-range-separator" }, ha = ["value", "placeholder"], ya = /* @__PURE__ */ C("i", { class: "el-icon el-input__icon el-range__close-icon el-range__close-icon--hidden" }, [
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
], -1), ga = /* @__PURE__ */ W({
  __name: "DatePickerInputRange",
  props: {
    value: null,
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
  setup(l, { expose: n, emit: e }) {
    const a = l, t = S(!1), s = S(!1), d = (u) => t.value = u, o = (u) => s.value = u;
    return n({
      startFocus: t,
      endFocus: s
    }), (u, r) => (A(), H("div", da, [
      fa,
      C("input", {
        autocomplete: "off",
        name: "",
        class: "el-range-input",
        value: a.startValue,
        placeholder: a.startPlaceholder,
        onChange: r[0] || (r[0] = (h) => {
          var f, c;
          return e("update:startValue", (c = (f = h.target) == null ? void 0 : f.value) != null ? c : "");
        }),
        onClick: r[1] || (r[1] = (h) => d(!0)),
        onBlur: r[2] || (r[2] = (h) => d(!1))
      }, null, 40, va),
      C("span", ma, me(a.rangeSeparator), 1),
      C("input", {
        autocomplete: "off",
        name: "",
        class: "el-range-input",
        value: a.endValue,
        placeholder: a.endPlaceholder,
        onChange: r[3] || (r[3] = (h) => {
          var f, c;
          return e("update:endValue", (c = (f = h.target) == null ? void 0 : f.value) != null ? c : "");
        }),
        onClick: r[4] || (r[4] = (h) => o(!0)),
        onBlur: r[5] || (r[5] = (h) => o(!1))
      }, null, 40, ha),
      ya
    ]));
  }
}), _a = ["\u4E00", "\u4E8C", "\u4E09", "\u56DB"], ka = ["\u4E0A", "\u4E0B"], Me = {
  quarteryear: "Q",
  halfyear: "H",
  year: "Y"
};
function ba(l) {
  return Ve({
    trigger: "click",
    placement: "bottom",
    hideAfter: 0,
    transition: "el-zoom-in-top",
    visible: !1,
    popperClass: l.popperClass
  });
}
function Ce(l, n, e, a) {
  const t = l.type.replace("range", ""), s = M(() => l.modelValue.map((b) => {
    const { test: x, exec: w } = fe(t, G(b, t)), E = t !== "year" ? 3 : 2;
    return x && w && w.slice(1, E).map(Number) || [new Date().getFullYear(), 1];
  })), d = a || ba(l), o = M(() => G(l.modelValue[e], t)), u = M(() => l.startPlaceholder), r = M(() => l.endPlaceholder), h = (b) => {
    const { test: x, exec: w } = fe(t, b);
    if (x && w) {
      const E = X(de(t, w.slice(1, 3).map(Number)), t), I = l.modelValue.map((T) => X(G(T, t), t));
      I[e] = E, n("update:modelValue", I);
    }
  }, f = S([...s.value[e]]), c = S(t), _ = S([]), F = M(() => f.value[0]), p = M(() => c.value === "year"), v = M(() => Math.floor(F.value / 10) * 10), y = M(() => {
    let b;
    switch (c.value) {
      case "year":
        b = `${v.value} - ${v.value + 9}`;
        break;
      default:
        b = `${F.value}`;
        break;
    }
    return b;
  }), m = () => {
    p.value ? f.value[0] -= 10 : f.value[0] -= 1, P();
  }, k = () => {
    p.value ? f.value[0] += 10 : f.value[0] += 1, P();
  }, g = (b) => {
    if (!b.isDisabled)
      if (p.value && t !== "year")
        f.value[0] = b.year, c.value = t;
      else {
        const x = [];
        x[0] = b.year, t !== "year" && (x[1] = b[t]);
        const w = de(t, x);
        fe(t, w).test && (f.value = x);
      }
  }, D = () => {
    p.value || (c.value = "year");
  };
  O(() => c.value, () => {
    P();
  }), O(() => f.value, (b, x) => {
    const w = X(de(t, f.value), t), E = l.modelValue.map((I) => X(G(I, t), t));
    E[e] = w, n("update:modelValue", E), P();
  }), O(() => s.value, () => {
    f.value[0] = s.value[e][0], t !== "year" && (f.value[1] = s.value[e][1]), P();
  });
  function P() {
    _.value = Ca(
      c.value,
      F.value,
      v.value,
      s.value[e]
    );
  }
  return P(), {
    popover: d,
    inputValue: o,
    inputStartPlaceholder: u,
    inputEndPlaceholder: r,
    inputValueUpdate: h,
    panelTitle: y,
    panelItems: _,
    panelPrevClick: m,
    panelNextClick: k,
    panelItemClick: g,
    panelTitleClick: D,
    panelType: c
  };
}
function de(l, n) {
  return l === "year" ? `${n[0]}` : `${n[0]}-${Me[l]}${n[1]}`;
}
function fe(l, n) {
  const e = l !== "year" ? new RegExp(`^(\\d{4})-${Me[l]}(\\d)$`) : new RegExp("^(\\d{4})$");
  let a = e.test(n);
  const t = e.exec(n);
  return a && t && (l === "halfyear" && ![1, 2].includes(Number(t[2])) || l === "quarteryear" && ![1, 2, 3, 4].includes(Number(t[2]))) && (a = !1), {
    test: a,
    exec: t
  };
}
function Ca(l, n, e, a) {
  let t;
  const s = new Date(), d = s.getFullYear(), o = s.getMonth() + 1, u = Math.ceil(o / 3), r = Math.ceil(o / 6);
  return l === "quarteryear" ? t = _a.map((h, f) => {
    const c = n, _ = f + 1;
    return {
      label: `\u7B2C${h}\u5B63\u5EA6`,
      year: c,
      quarteryear: _,
      isToday: c === d && _ === u,
      isCurrent: c === a[0] && _ === a[1]
    };
  }) : l === "halfyear" ? t = ka.map((h, f) => {
    const c = n, _ = f + 1;
    return {
      label: `${h}\u534A\u5E74`,
      year: c,
      halfyear: _,
      isToday: c === d && _ === r,
      isCurrent: c === a[0] && _ === a[1]
    };
  }) : l === "year" ? t = Array(10).fill(1).map((h, f) => {
    const c = e + f;
    return {
      label: `${c}`,
      year: c,
      isToday: c === d,
      isCurrent: c === a[0]
    };
  }) : t = [], t;
}
const $a = {
  inheritAttrs: !1
}, ve = /* @__PURE__ */ W({
  ...$a,
  __name: "DatePickerQuarterHalfYearRange",
  props: {
    modelValue: null,
    popperClass: null,
    startPlaceholder: null,
    endPlaceholder: null,
    rangeSeparator: null,
    type: null
  },
  emits: ["update:modelValue"],
  setup(l, { emit: n }) {
    const e = l, {
      popover: a,
      inputValue: t,
      inputStartPlaceholder: s,
      inputValueUpdate: d,
      panelTitle: o,
      panelItems: u,
      panelPrevClick: r,
      panelNextClick: h,
      panelItemClick: f,
      panelTitleClick: c,
      panelType: _
    } = Ce(e, n, 0), {
      inputValue: F,
      inputEndPlaceholder: p,
      inputValueUpdate: v,
      panelTitle: y,
      panelItems: m,
      panelPrevClick: k,
      panelNextClick: g,
      panelItemClick: D,
      panelTitleClick: P,
      panelType: b
    } = Ce(e, n, 1, a), x = e.type.replace("range", ""), w = S([!1, !1]), E = (V, $) => {
      x in V && (w.value[$ - 1] = !0), $ === 1 ? f(V) : D(V);
    };
    O(w, () => {
      w.value.every(Boolean) && (a.visible = !1) && (w.value = [!1, !1]);
    }, { deep: !0 });
    const I = Pe("scopedId"), T = S(null);
    le(() => {
      var $, Y, z;
      const V = (Y = ($ = T.value) == null ? void 0 : $.popperRef) == null ? void 0 : Y.contentRef;
      (z = V == null ? void 0 : V.setAttribute) == null || z.call(V, `${String(I.value)}`, "");
    });
    const R = S(null), B = S(null);
    let N = !1;
    le(() => {
      var Y, z, j;
      const V = !!((Y = R.value) != null && Y.startFocus), $ = !!((z = R.value) != null && z.endFocus);
      V || $ || ((j = B.value) == null ? void 0 : j.focus) ? (N = !1, a.visible = !0) : (N = !0, setTimeout(() => {
        N && (a.visible = !1) && (N = !1);
      }, 100));
    });
    const Z = M(() => {
      const V = o.value.slice(-4), $ = y.value.slice(0, 4);
      return _.value === "year" && b.value === "year" || _.value === "year" && b.value !== "year" || _.value !== "year" && b.value === "year" ? V >= $ : !1;
    });
    return (V, $) => (A(), Q(i(we), {
      ref_key: "datepickerHalfQuarterYearRangeRef",
      ref: T,
      visible: i(a).visible,
      trigger: i(a).trigger,
      placement: i(a).placement,
      "hide-after": i(a).hideAfter,
      transition: i(a).transition,
      "popper-class": i(a).popperClass,
      width: "auto"
    }, {
      reference: U(() => [
        L(ga, {
          ref_key: "InputRef",
          ref: R,
          value: "",
          placeholder: "",
          "start-value": i(t),
          "end-value": i(F),
          "start-placeholder": i(s),
          "end-placeholder": i(p),
          "range-separator": e.rangeSeparator,
          "onUpdate:startValue": i(d),
          "onUpdate:endValue": i(v)
        }, null, 8, ["start-value", "end-value", "start-placeholder", "end-placeholder", "range-separator", "onUpdate:startValue", "onUpdate:endValue"])
      ]),
      default: U(() => [
        L(De, {
          ref_key: "panelWrapperRef",
          ref: B,
          "is-range": ""
        }, {
          "range-left": U(() => [
            L(he, {
              class: "el-date-range-picker__content is-left p-0",
              title: i(o),
              items: i(u),
              "right-panel-arrow-disabled": i(Z),
              onClickPrev: i(r),
              onClickNext: i(h),
              onClickItem: $[0] || ($[0] = (Y) => E(Y, 1)),
              onClickTitle: i(c)
            }, null, 8, ["title", "items", "right-panel-arrow-disabled", "onClickPrev", "onClickNext", "onClickTitle"])
          ]),
          "range-right": U(() => [
            L(he, {
              class: "el-date-range-picker__content is-right p-0",
              title: i(y),
              items: i(m),
              "left-panel-arrow-disabled": i(Z),
              onClickPrev: i(k),
              onClickNext: i(g),
              onClickItem: $[1] || ($[1] = (Y) => E(Y, 2)),
              onClickTitle: i(P)
            }, null, 8, ["title", "items", "left-panel-arrow-disabled", "onClickPrev", "onClickNext", "onClickTitle"])
          ]),
          _: 1
        }, 512)
      ]),
      _: 1
    }, 8, ["visible", "trigger", "placement", "hide-after", "transition", "popper-class"]));
  }
});
const Va = {
  inheritAttrs: !1
}, Pa = /* @__PURE__ */ W({
  ...Va,
  __name: "DatePickerEnhanced",
  props: {
    type: null,
    modelValue: null,
    popperClass: { default: "" },
    placeholder: { default: "\u9009\u62E9\u65E5\u671F" },
    startPlaceholder: { default: "\u5F00\u59CB\u65E5\u671F" },
    endPlaceholder: { default: "\u7ED3\u675F\u65E5\u671F" },
    rangeSeparator: { default: "\u81F3" }
  },
  emits: ["update:modelValue"],
  setup(l, { emit: n }) {
    const e = l, a = [
      "year",
      "month",
      "date",
      "dates",
      "datetime",
      "week",
      "datetimerange",
      "daterange",
      "monthrange"
    ], t = M(() => `${e.popperClass} el-picker__popper p-0`), s = S(null), d = M(() => {
      var u, r;
      const o = (u = s.value) == null ? void 0 : u.attributes;
      if (!!o)
        return (r = Object.values(o).find((h) => /^data-v-[a-zA-Z0-9]{8}$/.test(String(h == null ? void 0 : h.name)))) == null ? void 0 : r.name;
    });
    return Ne("scopedId", d), (o, u) => (A(), H("div", {
      ref_key: "datePickerEnhancedRef",
      ref: s,
      class: "component-datepicker-enhanced"
    }, [
      a.includes(e.type) ? (A(), Q(i(Be), ze({ key: 0 }, o.$attrs, {
        type: e.type,
        "model-value": e.modelValue,
        "popper-class": e.popperClass,
        placeholder: e.placeholder,
        "start-placeholder": e.startPlaceholder,
        "end-placeholder": e.endPlaceholder,
        "range-separator": e.rangeSeparator,
        "onUpdate:modelValue": u[0] || (u[0] = (r) => n("update:modelValue", r))
      }), {
        default: U(() => [
          K(o.$slots, "default", {}, void 0, !0),
          K(o.$slots, "range-separator", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["type", "model-value", "popper-class", "placeholder", "start-placeholder", "end-placeholder", "range-separator"])) : e.type === "halfyear" ? (A(), Q(be, {
        key: 1,
        type: "halfyear",
        "model-value": Array.isArray(e.modelValue) ? e.modelValue[0] : e.modelValue,
        "popper-class": i(t),
        placeholder: e.placeholder,
        "onUpdate:modelValue": u[1] || (u[1] = (r) => n("update:modelValue", r))
      }, null, 8, ["model-value", "popper-class", "placeholder"])) : e.type === "quarteryear" ? (A(), Q(be, {
        key: 2,
        type: "quarteryear",
        "model-value": Array.isArray(e.modelValue) ? e.modelValue[0] : e.modelValue,
        "popper-class": i(t),
        placeholder: e.placeholder,
        "onUpdate:modelValue": u[2] || (u[2] = (r) => n("update:modelValue", r))
      }, null, 8, ["model-value", "popper-class", "placeholder"])) : e.type === "halfyearrange" ? (A(), Q(ve, {
        key: 3,
        type: "halfyearrange",
        "model-value": Array.isArray(e.modelValue) ? e.modelValue : [e.modelValue, e.modelValue],
        "popper-class": i(t),
        "start-placeholder": e.startPlaceholder,
        "end-placeholder": e.endPlaceholder,
        "range-separator": e.rangeSeparator,
        "onUpdate:modelValue": u[3] || (u[3] = (r) => n("update:modelValue", r))
      }, null, 8, ["model-value", "popper-class", "start-placeholder", "end-placeholder", "range-separator"])) : e.type === "quarteryearrange" ? (A(), Q(ve, {
        key: 4,
        type: "quarteryearrange",
        "model-value": Array.isArray(e.modelValue) ? e.modelValue : [e.modelValue, e.modelValue],
        "popper-class": i(t),
        "start-placeholder": e.startPlaceholder,
        "end-placeholder": e.endPlaceholder,
        "range-separator": e.rangeSeparator,
        "onUpdate:modelValue": u[4] || (u[4] = (r) => n("update:modelValue", r))
      }, null, 8, ["model-value", "popper-class", "start-placeholder", "end-placeholder", "range-separator"])) : e.type === "yearrange" ? (A(), Q(ve, {
        key: 5,
        type: "yearrange",
        "model-value": Array.isArray(e.modelValue) ? e.modelValue : [e.modelValue, e.modelValue],
        "popper-class": i(t),
        "start-placeholder": e.startPlaceholder,
        "end-placeholder": e.endPlaceholder,
        "range-separator": e.rangeSeparator,
        "onUpdate:modelValue": u[5] || (u[5] = (r) => n("update:modelValue", r))
      }, null, 8, ["model-value", "popper-class", "start-placeholder", "end-placeholder", "range-separator"])) : $e("", !0)
    ], 512));
  }
});
const wa = (l, n) => {
  const e = l.__vccOpts || l;
  for (const [a, t] of n)
    e[a] = t;
  return e;
}, Ea = /* @__PURE__ */ wa(Pa, [["__scopeId", "data-v-93654fab"]]);
export {
  Ea as default
};
