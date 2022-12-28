"use strict";
(self.webpackChunkportfolio = self.webpackChunkportfolio || []).push([
   [179],
   {
      883: () => {
         function pe(n) {
            return "function" == typeof n;
         }
         function ho(n) {
            const t = n((r) => {
               Error.call(r), (r.stack = new Error().stack);
            });
            return (t.prototype = Object.create(Error.prototype)), (t.prototype.constructor = t), t;
         }
         const na = ho(
            (n) =>
               function (t) {
                  n(this),
                     (this.message = t
                        ? `${t.length} errors occurred during unsubscription:\n${t.map((r, i) => `${i + 1}) ${r.toString()}`).join("\n  ")}`
                        : ""),
                     (this.name = "UnsubscriptionError"),
                     (this.errors = t);
               }
         );
         function ti(n, e) {
            if (n) {
               const t = n.indexOf(e);
               0 <= t && n.splice(t, 1);
            }
         }
         class bt {
            constructor(e) {
               (this.initialTeardown = e), (this.closed = !1), (this._parentage = null), (this._finalizers = null);
            }
            unsubscribe() {
               let e;
               if (!this.closed) {
                  this.closed = !0;
                  const { _parentage: t } = this;
                  if (t)
                     if (((this._parentage = null), Array.isArray(t))) for (const o of t) o.remove(this);
                     else t.remove(this);
                  const { initialTeardown: r } = this;
                  if (pe(r))
                     try {
                        r();
                     } catch (o) {
                        e = o instanceof na ? o.errors : [o];
                     }
                  const { _finalizers: i } = this;
                  if (i) {
                     this._finalizers = null;
                     for (const o of i)
                        try {
                           Mp(o);
                        } catch (s) {
                           (e = e ?? []), s instanceof na ? (e = [...e, ...s.errors]) : e.push(s);
                        }
                  }
                  if (e) throw new na(e);
               }
            }
            add(e) {
               var t;
               if (e && e !== this)
                  if (this.closed) Mp(e);
                  else {
                     if (e instanceof bt) {
                        if (e.closed || e._hasParent(this)) return;
                        e._addParent(this);
                     }
                     (this._finalizers = null !== (t = this._finalizers) && void 0 !== t ? t : []).push(e);
                  }
            }
            _hasParent(e) {
               const { _parentage: t } = this;
               return t === e || (Array.isArray(t) && t.includes(e));
            }
            _addParent(e) {
               const { _parentage: t } = this;
               this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e;
            }
            _removeParent(e) {
               const { _parentage: t } = this;
               t === e ? (this._parentage = null) : Array.isArray(t) && ti(t, e);
            }
            remove(e) {
               const { _finalizers: t } = this;
               t && ti(t, e), e instanceof bt && e._removeParent(this);
            }
         }
         bt.EMPTY = (() => {
            const n = new bt();
            return (n.closed = !0), n;
         })();
         const Cp = bt.EMPTY;
         function Ep(n) {
            return n instanceof bt || (n && "closed" in n && pe(n.remove) && pe(n.add) && pe(n.unsubscribe));
         }
         function Mp(n) {
            pe(n) ? n() : n.unsubscribe();
         }
         const yr = {
               onUnhandledError: null,
               onStoppedNotification: null,
               Promise: void 0,
               useDeprecatedSynchronousErrorHandling: !1,
               useDeprecatedNextContext: !1,
            },
            ra = {
               setTimeout(n, e, ...t) {
                  const { delegate: r } = ra;
                  return r?.setTimeout ? r.setTimeout(n, e, ...t) : setTimeout(n, e, ...t);
               },
               clearTimeout(n) {
                  const { delegate: e } = ra;
                  return (e?.clearTimeout || clearTimeout)(n);
               },
               delegate: void 0,
            };
         function xp(n) {
            ra.setTimeout(() => {
               const { onUnhandledError: e } = yr;
               if (!e) throw n;
               e(n);
            });
         }
         function Vc() {}
         const ME = Bc("C", void 0, void 0);
         function Bc(n, e, t) {
            return { kind: n, value: e, error: t };
         }
         let _r = null;
         function ia(n) {
            if (yr.useDeprecatedSynchronousErrorHandling) {
               const e = !_r;
               if ((e && (_r = { errorThrown: !1, error: null }), n(), e)) {
                  const { errorThrown: t, error: r } = _r;
                  if (((_r = null), t)) throw r;
               }
            } else n();
         }
         class jc extends bt {
            constructor(e) {
               super(), (this.isStopped = !1), e ? ((this.destination = e), Ep(e) && e.add(this)) : (this.destination = FE);
            }
            static create(e, t, r) {
               return new po(e, t, r);
            }
            next(e) {
               this.isStopped
                  ? Hc(
                       (function SE(n) {
                          return Bc("N", n, void 0);
                       })(e),
                       this
                    )
                  : this._next(e);
            }
            error(e) {
               this.isStopped
                  ? Hc(
                       (function xE(n) {
                          return Bc("E", void 0, n);
                       })(e),
                       this
                    )
                  : ((this.isStopped = !0), this._error(e));
            }
            complete() {
               this.isStopped ? Hc(ME, this) : ((this.isStopped = !0), this._complete());
            }
            unsubscribe() {
               this.closed || ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
            }
            _next(e) {
               this.destination.next(e);
            }
            _error(e) {
               try {
                  this.destination.error(e);
               } finally {
                  this.unsubscribe();
               }
            }
            _complete() {
               try {
                  this.destination.complete();
               } finally {
                  this.unsubscribe();
               }
            }
         }
         const AE = Function.prototype.bind;
         function Uc(n, e) {
            return AE.call(n, e);
         }
         class TE {
            constructor(e) {
               this.partialObserver = e;
            }
            next(e) {
               const { partialObserver: t } = this;
               if (t.next)
                  try {
                     t.next(e);
                  } catch (r) {
                     oa(r);
                  }
            }
            error(e) {
               const { partialObserver: t } = this;
               if (t.error)
                  try {
                     t.error(e);
                  } catch (r) {
                     oa(r);
                  }
               else oa(e);
            }
            complete() {
               const { partialObserver: e } = this;
               if (e.complete)
                  try {
                     e.complete();
                  } catch (t) {
                     oa(t);
                  }
            }
         }
         class po extends jc {
            constructor(e, t, r) {
               let i;
               if ((super(), pe(e) || !e)) i = { next: e ?? void 0, error: t ?? void 0, complete: r ?? void 0 };
               else {
                  let o;
                  this && yr.useDeprecatedNextContext
                     ? ((o = Object.create(e)),
                       (o.unsubscribe = () => this.unsubscribe()),
                       (i = { next: e.next && Uc(e.next, o), error: e.error && Uc(e.error, o), complete: e.complete && Uc(e.complete, o) }))
                     : (i = e);
               }
               this.destination = new TE(i);
            }
         }
         function oa(n) {
            yr.useDeprecatedSynchronousErrorHandling
               ? (function IE(n) {
                    yr.useDeprecatedSynchronousErrorHandling && _r && ((_r.errorThrown = !0), (_r.error = n));
                 })(n)
               : xp(n);
         }
         function Hc(n, e) {
            const { onStoppedNotification: t } = yr;
            t && ra.setTimeout(() => t(n, e));
         }
         const FE = {
               closed: !0,
               next: Vc,
               error: function RE(n) {
                  throw n;
               },
               complete: Vc,
            },
            $c = ("function" == typeof Symbol && Symbol.observable) || "@@observable";
         function vr(n) {
            return n;
         }
         function Sp(n) {
            return 0 === n.length
               ? vr
               : 1 === n.length
               ? n[0]
               : function (t) {
                    return n.reduce((r, i) => i(r), t);
                 };
         }
         let Te = (() => {
            class n {
               constructor(t) {
                  t && (this._subscribe = t);
               }
               lift(t) {
                  const r = new n();
                  return (r.source = this), (r.operator = t), r;
               }
               subscribe(t, r, i) {
                  const o = (function kE(n) {
                     return (
                        (n && n instanceof jc) ||
                        ((function OE(n) {
                           return n && pe(n.next) && pe(n.error) && pe(n.complete);
                        })(n) &&
                           Ep(n))
                     );
                  })(t)
                     ? t
                     : new po(t, r, i);
                  return (
                     ia(() => {
                        const { operator: s, source: a } = this;
                        o.add(s ? s.call(o, a) : a ? this._subscribe(o) : this._trySubscribe(o));
                     }),
                     o
                  );
               }
               _trySubscribe(t) {
                  try {
                     return this._subscribe(t);
                  } catch (r) {
                     t.error(r);
                  }
               }
               forEach(t, r) {
                  return new (r = Ip(r))((i, o) => {
                     const s = new po({
                        next: (a) => {
                           try {
                              t(a);
                           } catch (l) {
                              o(l), s.unsubscribe();
                           }
                        },
                        error: o,
                        complete: i,
                     });
                     this.subscribe(s);
                  });
               }
               _subscribe(t) {
                  var r;
                  return null === (r = this.source) || void 0 === r ? void 0 : r.subscribe(t);
               }
               [$c]() {
                  return this;
               }
               pipe(...t) {
                  return Sp(t)(this);
               }
               toPromise(t) {
                  return new (t = Ip(t))((r, i) => {
                     let o;
                     this.subscribe(
                        (s) => (o = s),
                        (s) => i(s),
                        () => r(o)
                     );
                  });
               }
            }
            return (n.create = (e) => new n(e)), n;
         })();
         function Ip(n) {
            var e;
            return null !== (e = n ?? yr.Promise) && void 0 !== e ? e : Promise;
         }
         const PE = ho(
            (n) =>
               function () {
                  n(this), (this.name = "ObjectUnsubscribedError"), (this.message = "object unsubscribed");
               }
         );
         let ln = (() => {
            class n extends Te {
               constructor() {
                  super(),
                     (this.closed = !1),
                     (this.currentObservers = null),
                     (this.observers = []),
                     (this.isStopped = !1),
                     (this.hasError = !1),
                     (this.thrownError = null);
               }
               lift(t) {
                  const r = new Ap(this, this);
                  return (r.operator = t), r;
               }
               _throwIfClosed() {
                  if (this.closed) throw new PE();
               }
               next(t) {
                  ia(() => {
                     if ((this._throwIfClosed(), !this.isStopped)) {
                        this.currentObservers || (this.currentObservers = Array.from(this.observers));
                        for (const r of this.currentObservers) r.next(t);
                     }
                  });
               }
               error(t) {
                  ia(() => {
                     if ((this._throwIfClosed(), !this.isStopped)) {
                        (this.hasError = this.isStopped = !0), (this.thrownError = t);
                        const { observers: r } = this;
                        for (; r.length; ) r.shift().error(t);
                     }
                  });
               }
               complete() {
                  ia(() => {
                     if ((this._throwIfClosed(), !this.isStopped)) {
                        this.isStopped = !0;
                        const { observers: t } = this;
                        for (; t.length; ) t.shift().complete();
                     }
                  });
               }
               unsubscribe() {
                  (this.isStopped = this.closed = !0), (this.observers = this.currentObservers = null);
               }
               get observed() {
                  var t;
                  return (null === (t = this.observers) || void 0 === t ? void 0 : t.length) > 0;
               }
               _trySubscribe(t) {
                  return this._throwIfClosed(), super._trySubscribe(t);
               }
               _subscribe(t) {
                  return this._throwIfClosed(), this._checkFinalizedStatuses(t), this._innerSubscribe(t);
               }
               _innerSubscribe(t) {
                  const { hasError: r, isStopped: i, observers: o } = this;
                  return r || i
                     ? Cp
                     : ((this.currentObservers = null),
                       o.push(t),
                       new bt(() => {
                          (this.currentObservers = null), ti(o, t);
                       }));
               }
               _checkFinalizedStatuses(t) {
                  const { hasError: r, thrownError: i, isStopped: o } = this;
                  r ? t.error(i) : o && t.complete();
               }
               asObservable() {
                  const t = new Te();
                  return (t.source = this), t;
               }
            }
            return (n.create = (e, t) => new Ap(e, t)), n;
         })();
         class Ap extends ln {
            constructor(e, t) {
               super(), (this.destination = e), (this.source = t);
            }
            next(e) {
               var t, r;
               null === (r = null === (t = this.destination) || void 0 === t ? void 0 : t.next) || void 0 === r || r.call(t, e);
            }
            error(e) {
               var t, r;
               null === (r = null === (t = this.destination) || void 0 === t ? void 0 : t.error) || void 0 === r || r.call(t, e);
            }
            complete() {
               var e, t;
               null === (t = null === (e = this.destination) || void 0 === e ? void 0 : e.complete) || void 0 === t || t.call(e);
            }
            _subscribe(e) {
               var t, r;
               return null !== (r = null === (t = this.source) || void 0 === t ? void 0 : t.subscribe(e)) && void 0 !== r ? r : Cp;
            }
         }
         function Tp(n) {
            return pe(n?.lift);
         }
         function Oe(n) {
            return (e) => {
               if (Tp(e))
                  return e.lift(function (t) {
                     try {
                        return n(t, this);
                     } catch (r) {
                        this.error(r);
                     }
                  });
               throw new TypeError("Unable to lift unknown Observable type");
            };
         }
         function Re(n, e, t, r, i) {
            return new LE(n, e, t, r, i);
         }
         class LE extends jc {
            constructor(e, t, r, i, o, s) {
               super(e),
                  (this.onFinalize = o),
                  (this.shouldUnsubscribe = s),
                  (this._next = t
                     ? function (a) {
                          try {
                             t(a);
                          } catch (l) {
                             e.error(l);
                          }
                       }
                     : super._next),
                  (this._error = i
                     ? function (a) {
                          try {
                             i(a);
                          } catch (l) {
                             e.error(l);
                          } finally {
                             this.unsubscribe();
                          }
                       }
                     : super._error),
                  (this._complete = r
                     ? function () {
                          try {
                             r();
                          } catch (a) {
                             e.error(a);
                          } finally {
                             this.unsubscribe();
                          }
                       }
                     : super._complete);
            }
            unsubscribe() {
               var e;
               if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                  const { closed: t } = this;
                  super.unsubscribe(), !t && (null === (e = this.onFinalize) || void 0 === e || e.call(this));
               }
            }
         }
         function H(n, e) {
            return Oe((t, r) => {
               let i = 0;
               t.subscribe(
                  Re(r, (o) => {
                     r.next(n.call(e, o, i++));
                  })
               );
            });
         }
         function br(n) {
            return this instanceof br ? ((this.v = n), this) : new br(n);
         }
         function jE(n, e, t) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var i,
               r = t.apply(n, e || []),
               o = [];
            return (
               (i = {}),
               s("next"),
               s("throw"),
               s("return"),
               (i[Symbol.asyncIterator] = function () {
                  return this;
               }),
               i
            );
            function s(f) {
               r[f] &&
                  (i[f] = function (h) {
                     return new Promise(function (p, m) {
                        o.push([f, h, p, m]) > 1 || a(f, h);
                     });
                  });
            }
            function a(f, h) {
               try {
                  !(function l(f) {
                     f.value instanceof br ? Promise.resolve(f.value.v).then(c, u) : d(o[0][2], f);
                  })(r[f](h));
               } catch (p) {
                  d(o[0][3], p);
               }
            }
            function c(f) {
               a("next", f);
            }
            function u(f) {
               a("throw", f);
            }
            function d(f, h) {
               f(h), o.shift(), o.length && a(o[0][0], o[0][1]);
            }
         }
         function UE(n) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var t,
               e = n[Symbol.asyncIterator];
            return e
               ? e.call(n)
               : ((n = (function Np(n) {
                    var e = "function" == typeof Symbol && Symbol.iterator,
                       t = e && n[e],
                       r = 0;
                    if (t) return t.call(n);
                    if (n && "number" == typeof n.length)
                       return {
                          next: function () {
                             return n && r >= n.length && (n = void 0), { value: n && n[r++], done: !n };
                          },
                       };
                    throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
                 })(n)),
                 (t = {}),
                 r("next"),
                 r("throw"),
                 r("return"),
                 (t[Symbol.asyncIterator] = function () {
                    return this;
                 }),
                 t);
            function r(o) {
               t[o] =
                  n[o] &&
                  function (s) {
                     return new Promise(function (a, l) {
                        !(function i(o, s, a, l) {
                           Promise.resolve(l).then(function (c) {
                              o({ value: c, done: a });
                           }, s);
                        })(a, l, (s = n[o](s)).done, s.value);
                     });
                  };
            }
         }
         const Op = (n) => n && "number" == typeof n.length && "function" != typeof n;
         function kp(n) {
            return pe(n?.then);
         }
         function Pp(n) {
            return pe(n[$c]);
         }
         function Lp(n) {
            return Symbol.asyncIterator && pe(n?.[Symbol.asyncIterator]);
         }
         function Vp(n) {
            return new TypeError(
               `You provided ${
                  null !== n && "object" == typeof n ? "an invalid object" : `'${n}'`
               } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
            );
         }
         const Bp = (function $E() {
            return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";
         })();
         function jp(n) {
            return pe(n?.[Bp]);
         }
         function Up(n) {
            return jE(this, arguments, function* () {
               const t = n.getReader();
               try {
                  for (;;) {
                     const { value: r, done: i } = yield br(t.read());
                     if (i) return yield br(void 0);
                     yield yield br(r);
                  }
               } finally {
                  t.releaseLock();
               }
            });
         }
         function Hp(n) {
            return pe(n?.getReader);
         }
         function Nt(n) {
            if (n instanceof Te) return n;
            if (null != n) {
               if (Pp(n))
                  return (function zE(n) {
                     return new Te((e) => {
                        const t = n[$c]();
                        if (pe(t.subscribe)) return t.subscribe(e);
                        throw new TypeError("Provided object does not correctly implement Symbol.observable");
                     });
                  })(n);
               if (Op(n))
                  return (function GE(n) {
                     return new Te((e) => {
                        for (let t = 0; t < n.length && !e.closed; t++) e.next(n[t]);
                        e.complete();
                     });
                  })(n);
               if (kp(n))
                  return (function qE(n) {
                     return new Te((e) => {
                        n.then(
                           (t) => {
                              e.closed || (e.next(t), e.complete());
                           },
                           (t) => e.error(t)
                        ).then(null, xp);
                     });
                  })(n);
               if (Lp(n)) return $p(n);
               if (jp(n))
                  return (function WE(n) {
                     return new Te((e) => {
                        for (const t of n) if ((e.next(t), e.closed)) return;
                        e.complete();
                     });
                  })(n);
               if (Hp(n))
                  return (function KE(n) {
                     return $p(Up(n));
                  })(n);
            }
            throw Vp(n);
         }
         function $p(n) {
            return new Te((e) => {
               (function ZE(n, e) {
                  var t, r, i, o;
                  return (function VE(n, e, t, r) {
                     return new (t || (t = Promise))(function (o, s) {
                        function a(u) {
                           try {
                              c(r.next(u));
                           } catch (d) {
                              s(d);
                           }
                        }
                        function l(u) {
                           try {
                              c(r.throw(u));
                           } catch (d) {
                              s(d);
                           }
                        }
                        function c(u) {
                           u.done
                              ? o(u.value)
                              : (function i(o) {
                                   return o instanceof t
                                      ? o
                                      : new t(function (s) {
                                           s(o);
                                        });
                                })(u.value).then(a, l);
                        }
                        c((r = r.apply(n, e || [])).next());
                     });
                  })(this, void 0, void 0, function* () {
                     try {
                        for (t = UE(n); !(r = yield t.next()).done; ) if ((e.next(r.value), e.closed)) return;
                     } catch (s) {
                        i = { error: s };
                     } finally {
                        try {
                           r && !r.done && (o = t.return) && (yield o.call(t));
                        } finally {
                           if (i) throw i.error;
                        }
                     }
                     e.complete();
                  });
               })(n, e).catch((t) => e.error(t));
            });
         }
         function Sn(n, e, t, r = 0, i = !1) {
            const o = e.schedule(function () {
               t(), i ? n.add(this.schedule(null, r)) : this.unsubscribe();
            }, r);
            if ((n.add(o), !i)) return o;
         }
         function qe(n, e, t = 1 / 0) {
            return pe(e)
               ? qe((r, i) => H((o, s) => e(r, o, i, s))(Nt(n(r, i))), t)
               : ("number" == typeof e && (t = e),
                 Oe((r, i) =>
                    (function QE(n, e, t, r, i, o, s, a) {
                       const l = [];
                       let c = 0,
                          u = 0,
                          d = !1;
                       const f = () => {
                             d && !l.length && !c && e.complete();
                          },
                          h = (m) => (c < r ? p(m) : l.push(m)),
                          p = (m) => {
                             o && e.next(m), c++;
                             let g = !1;
                             Nt(t(m, u++)).subscribe(
                                Re(
                                   e,
                                   (v) => {
                                      i?.(v), o ? h(v) : e.next(v);
                                   },
                                   () => {
                                      g = !0;
                                   },
                                   void 0,
                                   () => {
                                      if (g)
                                         try {
                                            for (c--; l.length && c < r; ) {
                                               const v = l.shift();
                                               s ? Sn(e, s, () => p(v)) : p(v);
                                            }
                                            f();
                                         } catch (v) {
                                            e.error(v);
                                         }
                                   }
                                )
                             );
                          };
                       return (
                          n.subscribe(
                             Re(e, h, () => {
                                (d = !0), f();
                             })
                          ),
                          () => {
                             a?.();
                          }
                       );
                    })(r, i, n, t)
                 ));
         }
         function ni(n = 1 / 0) {
            return qe(vr, n);
         }
         const In = new Te((n) => n.complete());
         function Gc(n) {
            return n[n.length - 1];
         }
         function zp(n) {
            return pe(Gc(n)) ? n.pop() : void 0;
         }
         function mo(n) {
            return (function XE(n) {
               return n && pe(n.schedule);
            })(Gc(n))
               ? n.pop()
               : void 0;
         }
         function Gp(n, e = 0) {
            return Oe((t, r) => {
               t.subscribe(
                  Re(
                     r,
                     (i) => Sn(r, n, () => r.next(i), e),
                     () => Sn(r, n, () => r.complete(), e),
                     (i) => Sn(r, n, () => r.error(i), e)
                  )
               );
            });
         }
         function qp(n, e = 0) {
            return Oe((t, r) => {
               r.add(n.schedule(() => t.subscribe(r), e));
            });
         }
         function Wp(n, e) {
            if (!n) throw new Error("Iterable cannot be null");
            return new Te((t) => {
               Sn(t, e, () => {
                  const r = n[Symbol.asyncIterator]();
                  Sn(
                     t,
                     e,
                     () => {
                        r.next().then((i) => {
                           i.done ? t.complete() : t.next(i.value);
                        });
                     },
                     0,
                     !0
                  );
               });
            });
         }
         function ke(n, e) {
            return e
               ? (function oM(n, e) {
                    if (null != n) {
                       if (Pp(n))
                          return (function eM(n, e) {
                             return Nt(n).pipe(qp(e), Gp(e));
                          })(n, e);
                       if (Op(n))
                          return (function nM(n, e) {
                             return new Te((t) => {
                                let r = 0;
                                return e.schedule(function () {
                                   r === n.length ? t.complete() : (t.next(n[r++]), t.closed || this.schedule());
                                });
                             });
                          })(n, e);
                       if (kp(n))
                          return (function tM(n, e) {
                             return Nt(n).pipe(qp(e), Gp(e));
                          })(n, e);
                       if (Lp(n)) return Wp(n, e);
                       if (jp(n))
                          return (function rM(n, e) {
                             return new Te((t) => {
                                let r;
                                return (
                                   Sn(t, e, () => {
                                      (r = n[Bp]()),
                                         Sn(
                                            t,
                                            e,
                                            () => {
                                               let i, o;
                                               try {
                                                  ({ value: i, done: o } = r.next());
                                               } catch (s) {
                                                  return void t.error(s);
                                               }
                                               o ? t.complete() : t.next(i);
                                            },
                                            0,
                                            !0
                                         );
                                   }),
                                   () => pe(r?.return) && r.return()
                                );
                             });
                          })(n, e);
                       if (Hp(n))
                          return (function iM(n, e) {
                             return Wp(Up(n), e);
                          })(n, e);
                    }
                    throw Vp(n);
                 })(n, e)
               : Nt(n);
         }
         function qc(n, e, ...t) {
            if (!0 === e) return void n();
            if (!1 === e) return;
            const r = new po({
               next: () => {
                  r.unsubscribe(), n();
               },
            });
            return e(...t).subscribe(r);
         }
         function fe(n) {
            for (let e in n) if (n[e] === fe) return e;
            throw Error("Could not find renamed property on target object.");
         }
         function Wc(n, e) {
            for (const t in e) e.hasOwnProperty(t) && !n.hasOwnProperty(t) && (n[t] = e[t]);
         }
         function he(n) {
            if ("string" == typeof n) return n;
            if (Array.isArray(n)) return "[" + n.map(he).join(", ") + "]";
            if (null == n) return "" + n;
            if (n.overriddenName) return `${n.overriddenName}`;
            if (n.name) return `${n.name}`;
            const e = n.toString();
            if (null == e) return "" + e;
            const t = e.indexOf("\n");
            return -1 === t ? e : e.substring(0, t);
         }
         function Kc(n, e) {
            return null == n || "" === n ? (null === e ? "" : e) : null == e || "" === e ? n : n + " " + e;
         }
         const aM = fe({ __forward_ref__: fe });
         function me(n) {
            return (
               (n.__forward_ref__ = me),
               (n.toString = function () {
                  return he(this());
               }),
               n
            );
         }
         function L(n) {
            return Zc(n) ? n() : n;
         }
         function Zc(n) {
            return "function" == typeof n && n.hasOwnProperty(aM) && n.__forward_ref__ === me;
         }
         function Qc(n) {
            return n && !!n.ɵproviders;
         }
         const sa = "https://g.co/ng/security#xss";
         class _ extends Error {
            constructor(e, t) {
               super(
                  (function aa(n, e) {
                     return `NG0${Math.abs(n)}${e ? ": " + e.trim() : ""}`;
                  })(e, t)
               ),
                  (this.code = e);
            }
         }
         function z(n) {
            return "string" == typeof n ? n : null == n ? "" : String(n);
         }
         function la(n, e) {
            throw new _(-201, !1);
         }
         function Ot(n, e) {
            null == n &&
               (function ce(n, e, t, r) {
                  throw new Error(`ASSERTION ERROR: ${n}` + (null == r ? "" : ` [Expected=> ${t} ${r} ${e} <=Actual]`));
               })(e, n, null, "!=");
         }
         function N(n) {
            return { token: n.token, providedIn: n.providedIn || null, factory: n.factory, value: void 0 };
         }
         function ze(n) {
            return { providers: n.providers || [], imports: n.imports || [] };
         }
         function ca(n) {
            return Zp(n, ua) || Zp(n, Yp);
         }
         function Zp(n, e) {
            return n.hasOwnProperty(e) ? n[e] : null;
         }
         function Qp(n) {
            return n && (n.hasOwnProperty(Yc) || n.hasOwnProperty(gM)) ? n[Yc] : null;
         }
         const ua = fe({ ɵprov: fe }),
            Yc = fe({ ɵinj: fe }),
            Yp = fe({ ngInjectableDef: fe }),
            gM = fe({ ngInjectorDef: fe });
         var V = (() => (
            ((V = V || {})[(V.Default = 0)] = "Default"),
            (V[(V.Host = 1)] = "Host"),
            (V[(V.Self = 2)] = "Self"),
            (V[(V.SkipSelf = 4)] = "SkipSelf"),
            (V[(V.Optional = 8)] = "Optional"),
            V
         ))();
         let Xc;
         function kt(n) {
            const e = Xc;
            return (Xc = n), e;
         }
         function Xp(n, e, t) {
            const r = ca(n);
            return r && "root" == r.providedIn
               ? void 0 === r.value
                  ? (r.value = r.factory())
                  : r.value
               : t & V.Optional
               ? null
               : void 0 !== e
               ? e
               : void la(he(n));
         }
         const ge = (() =>
               (typeof globalThis < "u" && globalThis) ||
               (typeof global < "u" && global) ||
               (typeof window < "u" && window) ||
               (typeof self < "u" && typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && self))(),
            go = {},
            Jc = "__NG_DI_FLAG__",
            da = "ngTempTokenPath",
            vM = /\n/gm,
            Jp = "__source";
         let yo;
         function ri(n) {
            const e = yo;
            return (yo = n), e;
         }
         function DM(n, e = V.Default) {
            if (void 0 === yo) throw new _(-203, !1);
            return null === yo ? Xp(n, void 0, e) : yo.get(n, e & V.Optional ? null : void 0, e);
         }
         function M(n, e = V.Default) {
            return (
               (function yM() {
                  return Xc;
               })() || DM
            )(L(n), e);
         }
         function X(n, e = V.Default) {
            return M(n, fa(e));
         }
         function fa(n) {
            return typeof n > "u" || "number" == typeof n ? n : 0 | (n.optional && 8) | (n.host && 1) | (n.self && 2) | (n.skipSelf && 4);
         }
         function eu(n) {
            const e = [];
            for (let t = 0; t < n.length; t++) {
               const r = L(n[t]);
               if (Array.isArray(r)) {
                  if (0 === r.length) throw new _(900, !1);
                  let i,
                     o = V.Default;
                  for (let s = 0; s < r.length; s++) {
                     const a = r[s],
                        l = wM(a);
                     "number" == typeof l ? (-1 === l ? (i = a.token) : (o |= l)) : (i = a);
                  }
                  e.push(M(i, o));
               } else e.push(M(r));
            }
            return e;
         }
         function _o(n, e) {
            return (n[Jc] = e), (n.prototype[Jc] = e), n;
         }
         function wM(n) {
            return n[Jc];
         }
         function Jn(n) {
            return { toString: n }.toString();
         }
         var Wt = (() => (((Wt = Wt || {})[(Wt.OnPush = 0)] = "OnPush"), (Wt[(Wt.Default = 1)] = "Default"), Wt))(),
            Kt = (() => {
               return ((n = Kt || (Kt = {}))[(n.Emulated = 0)] = "Emulated"), (n[(n.None = 2)] = "None"), (n[(n.ShadowDom = 3)] = "ShadowDom"), Kt;
               var n;
            })();
         const An = {},
            se = [],
            ha = fe({ ɵcmp: fe }),
            tu = fe({ ɵdir: fe }),
            nu = fe({ ɵpipe: fe }),
            tm = fe({ ɵmod: fe }),
            Tn = fe({ ɵfac: fe }),
            vo = fe({ __NG_ELEMENT_ID__: fe });
         let MM = 0;
         function Ve(n) {
            return Jn(() => {
               const t = !0 === n.standalone,
                  r = {},
                  i = {
                     type: n.type,
                     providersResolver: null,
                     decls: n.decls,
                     vars: n.vars,
                     factory: null,
                     template: n.template || null,
                     consts: n.consts || null,
                     ngContentSelectors: n.ngContentSelectors,
                     hostBindings: n.hostBindings || null,
                     hostVars: n.hostVars || 0,
                     hostAttrs: n.hostAttrs || null,
                     contentQueries: n.contentQueries || null,
                     declaredInputs: r,
                     inputs: null,
                     outputs: null,
                     exportAs: n.exportAs || null,
                     onPush: n.changeDetection === Wt.OnPush,
                     directiveDefs: null,
                     pipeDefs: null,
                     standalone: t,
                     dependencies: (t && n.dependencies) || null,
                     getStandaloneInjector: null,
                     selectors: n.selectors || se,
                     viewQuery: n.viewQuery || null,
                     features: n.features || null,
                     data: n.data || {},
                     encapsulation: n.encapsulation || Kt.Emulated,
                     id: "c" + MM++,
                     styles: n.styles || se,
                     _: null,
                     setInput: null,
                     schemas: n.schemas || null,
                     tView: null,
                     findHostDirectiveDefs: null,
                     hostDirectives: null,
                  },
                  o = n.dependencies,
                  s = n.features;
               return (
                  (i.inputs = im(n.inputs, r)),
                  (i.outputs = im(n.outputs)),
                  s && s.forEach((a) => a(i)),
                  (i.directiveDefs = o ? () => ("function" == typeof o ? o() : o).map(nm).filter(rm) : null),
                  (i.pipeDefs = o ? () => ("function" == typeof o ? o() : o).map(at).filter(rm) : null),
                  i
               );
            });
         }
         function nm(n) {
            return ue(n) || Je(n);
         }
         function rm(n) {
            return null !== n;
         }
         function We(n) {
            return Jn(() => ({
               type: n.type,
               bootstrap: n.bootstrap || se,
               declarations: n.declarations || se,
               imports: n.imports || se,
               exports: n.exports || se,
               transitiveCompileScopes: null,
               schemas: n.schemas || null,
               id: n.id || null,
            }));
         }
         function im(n, e) {
            if (null == n) return An;
            const t = {};
            for (const r in n)
               if (n.hasOwnProperty(r)) {
                  let i = n[r],
                     o = i;
                  Array.isArray(i) && ((o = i[1]), (i = i[0])), (t[i] = r), e && (e[i] = o);
               }
            return t;
         }
         const $ = Ve;
         function ue(n) {
            return n[ha] || null;
         }
         function Je(n) {
            return n[tu] || null;
         }
         function at(n) {
            return n[nu] || null;
         }
         function wt(n, e) {
            const t = n[tm] || null;
            if (!t && !0 === e) throw new Error(`Type ${he(n)} does not have '\u0275mod' property.`);
            return t;
         }
         const Q = 11;
         function Ct(n) {
            return Array.isArray(n) && "object" == typeof n[1];
         }
         function Qt(n) {
            return Array.isArray(n) && !0 === n[1];
         }
         function ou(n) {
            return 0 != (4 & n.flags);
         }
         function Co(n) {
            return n.componentOffset > -1;
         }
         function _a(n) {
            return 1 == (1 & n.flags);
         }
         function Yt(n) {
            return null !== n.template;
         }
         function IM(n) {
            return 0 != (256 & n[2]);
         }
         function wr(n, e) {
            return n.hasOwnProperty(Tn) ? n[Tn] : null;
         }
         class RM {
            constructor(e, t, r) {
               (this.previousValue = e), (this.currentValue = t), (this.firstChange = r);
            }
            isFirstChange() {
               return this.firstChange;
            }
         }
         function Pt() {
            return um;
         }
         function um(n) {
            return n.type.prototype.ngOnChanges && (n.setInput = NM), FM;
         }
         function FM() {
            const n = fm(this),
               e = n?.current;
            if (e) {
               const t = n.previous;
               if (t === An) n.previous = e;
               else for (let r in e) t[r] = e[r];
               (n.current = null), this.ngOnChanges(e);
            }
         }
         function NM(n, e, t, r) {
            const i = this.declaredInputs[t],
               o =
                  fm(n) ||
                  (function OM(n, e) {
                     return (n[dm] = e);
                  })(n, { previous: An, current: null }),
               s = o.current || (o.current = {}),
               a = o.previous,
               l = a[i];
            (s[i] = new RM(l && l.currentValue, e, a === An)), (n[r] = e);
         }
         Pt.ngInherit = !0;
         const dm = "__ngSimpleChanges__";
         function fm(n) {
            return n[dm] || null;
         }
         function Ke(n) {
            for (; Array.isArray(n); ) n = n[0];
            return n;
         }
         function va(n, e) {
            return Ke(e[n]);
         }
         function Et(n, e) {
            return Ke(e[n.index]);
         }
         function mm(n, e) {
            return n.data[e];
         }
         function Mt(n, e) {
            const t = e[n];
            return Ct(t) ? t : t[0];
         }
         function ba(n) {
            return 64 == (64 & n[2]);
         }
         function er(n, e) {
            return null == e ? null : n[e];
         }
         function gm(n) {
            n[18] = 0;
         }
         function au(n, e) {
            n[5] += e;
            let t = n,
               r = n[3];
            for (; null !== r && ((1 === e && 1 === t[5]) || (-1 === e && 0 === t[5])); ) (r[5] += e), (t = r), (r = r[3]);
         }
         const G = { lFrame: xm(null), bindingsEnabled: !0 };
         function _m() {
            return G.bindingsEnabled;
         }
         function D() {
            return G.lFrame.lView;
         }
         function te() {
            return G.lFrame.tView;
         }
         function Ze() {
            let n = vm();
            for (; null !== n && 64 === n.type; ) n = n.parent;
            return n;
         }
         function vm() {
            return G.lFrame.currentTNode;
         }
         function un(n, e) {
            const t = G.lFrame;
            (t.currentTNode = n), (t.isParent = e);
         }
         function lu() {
            return G.lFrame.isParent;
         }
         function ct() {
            const n = G.lFrame;
            let e = n.bindingRootIndex;
            return -1 === e && (e = n.bindingRootIndex = n.tView.bindingStartIndex), e;
         }
         function ui() {
            return G.lFrame.bindingIndex++;
         }
         function ZM(n, e) {
            const t = G.lFrame;
            (t.bindingIndex = t.bindingRootIndex = n), uu(e);
         }
         function uu(n) {
            G.lFrame.currentDirectiveIndex = n;
         }
         function Cm() {
            return G.lFrame.currentQueryIndex;
         }
         function fu(n) {
            G.lFrame.currentQueryIndex = n;
         }
         function YM(n) {
            const e = n[1];
            return 2 === e.type ? e.declTNode : 1 === e.type ? n[6] : null;
         }
         function Em(n, e, t) {
            if (t & V.SkipSelf) {
               let i = e,
                  o = n;
               for (; !((i = i.parent), null !== i || t & V.Host || ((i = YM(o)), null === i || ((o = o[15]), 10 & i.type))); );
               if (null === i) return !1;
               (e = i), (n = o);
            }
            const r = (G.lFrame = Mm());
            return (r.currentTNode = e), (r.lView = n), !0;
         }
         function hu(n) {
            const e = Mm(),
               t = n[1];
            (G.lFrame = e),
               (e.currentTNode = t.firstChild),
               (e.lView = n),
               (e.tView = t),
               (e.contextLView = n),
               (e.bindingIndex = t.bindingStartIndex),
               (e.inI18n = !1);
         }
         function Mm() {
            const n = G.lFrame,
               e = null === n ? null : n.child;
            return null === e ? xm(n) : e;
         }
         function xm(n) {
            const e = {
               currentTNode: null,
               isParent: !0,
               lView: null,
               tView: null,
               selectedIndex: -1,
               contextLView: null,
               elementDepthCount: 0,
               currentNamespace: null,
               currentDirectiveIndex: -1,
               bindingRootIndex: -1,
               bindingIndex: -1,
               currentQueryIndex: 0,
               parent: n,
               child: null,
               inI18n: !1,
            };
            return null !== n && (n.child = e), e;
         }
         function Sm() {
            const n = G.lFrame;
            return (G.lFrame = n.parent), (n.currentTNode = null), (n.lView = null), n;
         }
         const Im = Sm;
         function pu() {
            const n = Sm();
            (n.isParent = !0),
               (n.tView = null),
               (n.selectedIndex = -1),
               (n.contextLView = null),
               (n.elementDepthCount = 0),
               (n.currentDirectiveIndex = -1),
               (n.currentNamespace = null),
               (n.bindingRootIndex = -1),
               (n.bindingIndex = -1),
               (n.currentQueryIndex = 0);
         }
         function ut() {
            return G.lFrame.selectedIndex;
         }
         function Cr(n) {
            G.lFrame.selectedIndex = n;
         }
         function we() {
            const n = G.lFrame;
            return mm(n.tView, n.selectedIndex);
         }
         function Xt() {
            G.lFrame.currentNamespace = "svg";
         }
         function dn() {
            !(function tx() {
               G.lFrame.currentNamespace = null;
            })();
         }
         function Da(n, e) {
            for (let t = e.directiveStart, r = e.directiveEnd; t < r; t++) {
               const o = n.data[t].type.prototype,
                  { ngAfterContentInit: s, ngAfterContentChecked: a, ngAfterViewInit: l, ngAfterViewChecked: c, ngOnDestroy: u } = o;
               s && (n.contentHooks || (n.contentHooks = [])).push(-t, s),
                  a && ((n.contentHooks || (n.contentHooks = [])).push(t, a), (n.contentCheckHooks || (n.contentCheckHooks = [])).push(t, a)),
                  l && (n.viewHooks || (n.viewHooks = [])).push(-t, l),
                  c && ((n.viewHooks || (n.viewHooks = [])).push(t, c), (n.viewCheckHooks || (n.viewCheckHooks = [])).push(t, c)),
                  null != u && (n.destroyHooks || (n.destroyHooks = [])).push(t, u);
            }
         }
         function wa(n, e, t) {
            Am(n, e, 3, t);
         }
         function Ca(n, e, t, r) {
            (3 & n[2]) === t && Am(n, e, t, r);
         }
         function mu(n, e) {
            let t = n[2];
            (3 & t) === e && ((t &= 2047), (t += 1), (n[2] = t));
         }
         function Am(n, e, t, r) {
            const o = r ?? -1,
               s = e.length - 1;
            let a = 0;
            for (let l = void 0 !== r ? 65535 & n[18] : 0; l < s; l++)
               if ("number" == typeof e[l + 1]) {
                  if (((a = e[l]), null != r && a >= r)) break;
               } else e[l] < 0 && (n[18] += 65536), (a < o || -1 == o) && (ix(n, t, e, l), (n[18] = (4294901760 & n[18]) + l + 2)), l++;
         }
         function ix(n, e, t, r) {
            const i = t[r] < 0,
               o = t[r + 1],
               a = n[i ? -t[r] : t[r]];
            if (i) {
               if (n[2] >> 11 < n[18] >> 16 && (3 & n[2]) === e) {
                  n[2] += 2048;
                  try {
                     o.call(a);
                  } finally {
                  }
               }
            } else
               try {
                  o.call(a);
               } finally {
               }
         }
         class Mo {
            constructor(e, t, r) {
               (this.factory = e), (this.resolving = !1), (this.canSeeViewProviders = t), (this.injectImpl = r);
            }
         }
         function yu(n, e, t) {
            let r = 0;
            for (; r < t.length; ) {
               const i = t[r];
               if ("number" == typeof i) {
                  if (0 !== i) break;
                  r++;
                  const o = t[r++],
                     s = t[r++],
                     a = t[r++];
                  n.setAttribute(e, s, a, o);
               } else {
                  const o = i,
                     s = t[++r];
                  Rm(o) ? n.setProperty(e, o, s) : n.setAttribute(e, o, s), r++;
               }
            }
            return r;
         }
         function Tm(n) {
            return 3 === n || 4 === n || 6 === n;
         }
         function Rm(n) {
            return 64 === n.charCodeAt(0);
         }
         function xo(n, e) {
            if (null !== e && 0 !== e.length)
               if (null === n || 0 === n.length) n = e.slice();
               else {
                  let t = -1;
                  for (let r = 0; r < e.length; r++) {
                     const i = e[r];
                     "number" == typeof i ? (t = i) : 0 === t || Fm(n, t, i, null, -1 === t || 2 === t ? e[++r] : null);
                  }
               }
            return n;
         }
         function Fm(n, e, t, r, i) {
            let o = 0,
               s = n.length;
            if (-1 === e) s = -1;
            else
               for (; o < n.length; ) {
                  const a = n[o++];
                  if ("number" == typeof a) {
                     if (a === e) {
                        s = -1;
                        break;
                     }
                     if (a > e) {
                        s = o - 1;
                        break;
                     }
                  }
               }
            for (; o < n.length; ) {
               const a = n[o];
               if ("number" == typeof a) break;
               if (a === t) {
                  if (null === r) return void (null !== i && (n[o + 1] = i));
                  if (r === n[o + 1]) return void (n[o + 2] = i);
               }
               o++, null !== r && o++, null !== i && o++;
            }
            -1 !== s && (n.splice(s, 0, e), (o = s + 1)), n.splice(o++, 0, t), null !== r && n.splice(o++, 0, r), null !== i && n.splice(o++, 0, i);
         }
         function Nm(n) {
            return -1 !== n;
         }
         function Ea(n) {
            return 32767 & n;
         }
         function Ma(n, e) {
            let t = (function lx(n) {
                  return n >> 16;
               })(n),
               r = e;
            for (; t > 0; ) (r = r[15]), t--;
            return r;
         }
         let _u = !0;
         function xa(n) {
            const e = _u;
            return (_u = n), e;
         }
         let cx = 0;
         const fn = {};
         function Sa(n, e) {
            const t = Pm(n, e);
            if (-1 !== t) return t;
            const r = e[1];
            r.firstCreatePass && ((n.injectorIndex = e.length), vu(r.data, n), vu(e, null), vu(r.blueprint, null));
            const i = bu(n, e),
               o = n.injectorIndex;
            if (Nm(i)) {
               const s = Ea(i),
                  a = Ma(i, e),
                  l = a[1].data;
               for (let c = 0; c < 8; c++) e[o + c] = a[s + c] | l[s + c];
            }
            return (e[o + 8] = i), o;
         }
         function vu(n, e) {
            n.push(0, 0, 0, 0, 0, 0, 0, 0, e);
         }
         function Pm(n, e) {
            return -1 === n.injectorIndex || (n.parent && n.parent.injectorIndex === n.injectorIndex) || null === e[n.injectorIndex + 8] ? -1 : n.injectorIndex;
         }
         function bu(n, e) {
            if (n.parent && -1 !== n.parent.injectorIndex) return n.parent.injectorIndex;
            let t = 0,
               r = null,
               i = e;
            for (; null !== i; ) {
               if (((r = $m(i)), null === r)) return -1;
               if ((t++, (i = i[15]), -1 !== r.injectorIndex)) return r.injectorIndex | (t << 16);
            }
            return -1;
         }
         function Du(n, e, t) {
            !(function ux(n, e, t) {
               let r;
               "string" == typeof t ? (r = t.charCodeAt(0) || 0) : t.hasOwnProperty(vo) && (r = t[vo]), null == r && (r = t[vo] = cx++);
               const i = 255 & r;
               e.data[n + (i >> 5)] |= 1 << i;
            })(n, e, t);
         }
         function Lm(n, e, t) {
            if (t & V.Optional || void 0 !== n) return n;
            la();
         }
         function Vm(n, e, t, r) {
            if ((t & V.Optional && void 0 === r && (r = null), 0 == (t & (V.Self | V.Host)))) {
               const i = n[9],
                  o = kt(void 0);
               try {
                  return i ? i.get(e, r, t & V.Optional) : Xp(e, r, t & V.Optional);
               } finally {
                  kt(o);
               }
            }
            return Lm(r, 0, t);
         }
         function Bm(n, e, t, r = V.Default, i) {
            if (null !== n) {
               if (1024 & e[2]) {
                  const s = (function mx(n, e, t, r, i) {
                     let o = n,
                        s = e;
                     for (; null !== o && null !== s && 1024 & s[2] && !(256 & s[2]); ) {
                        const a = jm(o, s, t, r | V.Self, fn);
                        if (a !== fn) return a;
                        let l = o.parent;
                        if (!l) {
                           const c = s[21];
                           if (c) {
                              const u = c.get(t, fn, r);
                              if (u !== fn) return u;
                           }
                           (l = $m(s)), (s = s[15]);
                        }
                        o = l;
                     }
                     return i;
                  })(n, e, t, r, fn);
                  if (s !== fn) return s;
               }
               const o = jm(n, e, t, r, fn);
               if (o !== fn) return o;
            }
            return Vm(e, t, r, i);
         }
         function jm(n, e, t, r, i) {
            const o = (function hx(n) {
               if ("string" == typeof n) return n.charCodeAt(0) || 0;
               const e = n.hasOwnProperty(vo) ? n[vo] : void 0;
               return "number" == typeof e ? (e >= 0 ? 255 & e : px) : e;
            })(t);
            if ("function" == typeof o) {
               if (!Em(e, n, r)) return r & V.Host ? Lm(i, 0, r) : Vm(e, t, r, i);
               try {
                  const s = o(r);
                  if (null != s || r & V.Optional) return s;
                  la();
               } finally {
                  Im();
               }
            } else if ("number" == typeof o) {
               let s = null,
                  a = Pm(n, e),
                  l = -1,
                  c = r & V.Host ? e[16][6] : null;
               for (
                  (-1 === a || r & V.SkipSelf) &&
                  ((l = -1 === a ? bu(n, e) : e[a + 8]), -1 !== l && Hm(r, !1) ? ((s = e[1]), (a = Ea(l)), (e = Ma(l, e))) : (a = -1));
                  -1 !== a;

               ) {
                  const u = e[1];
                  if (Um(o, a, u.data)) {
                     const d = fx(a, e, t, s, r, c);
                     if (d !== fn) return d;
                  }
                  (l = e[a + 8]), -1 !== l && Hm(r, e[1].data[a + 8] === c) && Um(o, a, e) ? ((s = u), (a = Ea(l)), (e = Ma(l, e))) : (a = -1);
               }
            }
            return i;
         }
         function fx(n, e, t, r, i, o) {
            const s = e[1],
               a = s.data[n + 8],
               u = Ia(a, s, t, null == r ? Co(a) && _u : r != s && 0 != (3 & a.type), i & V.Host && o === a);
            return null !== u ? Er(e, s, u, a) : fn;
         }
         function Ia(n, e, t, r, i) {
            const o = n.providerIndexes,
               s = e.data,
               a = 1048575 & o,
               l = n.directiveStart,
               u = o >> 20,
               f = i ? a + u : n.directiveEnd;
            for (let h = r ? a : a + u; h < f; h++) {
               const p = s[h];
               if ((h < l && t === p) || (h >= l && p.type === t)) return h;
            }
            if (i) {
               const h = s[l];
               if (h && Yt(h) && h.type === t) return l;
            }
            return null;
         }
         function Er(n, e, t, r) {
            let i = n[t];
            const o = e.data;
            if (
               (function ox(n) {
                  return n instanceof Mo;
               })(i)
            ) {
               const s = i;
               s.resolving &&
                  (function lM(n, e) {
                     const t = e ? `. Dependency path: ${e.join(" > ")} > ${n}` : "";
                     throw new _(-200, `Circular dependency in DI detected for ${n}${t}`);
                  })(
                     (function le(n) {
                        return "function" == typeof n
                           ? n.name || n.toString()
                           : "object" == typeof n && null != n && "function" == typeof n.type
                           ? n.type.name || n.type.toString()
                           : z(n);
                     })(o[t])
                  );
               const a = xa(s.canSeeViewProviders);
               s.resolving = !0;
               const l = s.injectImpl ? kt(s.injectImpl) : null;
               Em(n, r, V.Default);
               try {
                  (i = n[t] = s.factory(void 0, o, n, r)),
                     e.firstCreatePass &&
                        t >= r.directiveStart &&
                        (function rx(n, e, t) {
                           const { ngOnChanges: r, ngOnInit: i, ngDoCheck: o } = e.type.prototype;
                           if (r) {
                              const s = um(e);
                              (t.preOrderHooks || (t.preOrderHooks = [])).push(n, s), (t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(n, s);
                           }
                           i && (t.preOrderHooks || (t.preOrderHooks = [])).push(0 - n, i),
                              o && ((t.preOrderHooks || (t.preOrderHooks = [])).push(n, o), (t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(n, o));
                        })(t, o[t], e);
               } finally {
                  null !== l && kt(l), xa(a), (s.resolving = !1), Im();
               }
            }
            return i;
         }
         function Um(n, e, t) {
            return !!(t[e + (n >> 5)] & (1 << n));
         }
         function Hm(n, e) {
            return !(n & V.Self || (n & V.Host && e));
         }
         class fi {
            constructor(e, t) {
               (this._tNode = e), (this._lView = t);
            }
            get(e, t, r) {
               return Bm(this._tNode, this._lView, e, fa(r), t);
            }
         }
         function px() {
            return new fi(Ze(), D());
         }
         function wu(n) {
            return Zc(n)
               ? () => {
                    const e = wu(L(n));
                    return e && e();
                 }
               : wr(n);
         }
         function $m(n) {
            const e = n[1],
               t = e.type;
            return 2 === t ? e.declTNode : 1 === t ? n[6] : null;
         }
         const pi = "__parameters__";
         function gi(n, e, t) {
            return Jn(() => {
               const r = (function Cu(n) {
                  return function (...t) {
                     if (n) {
                        const r = n(...t);
                        for (const i in r) this[i] = r[i];
                     }
                  };
               })(e);
               function i(...o) {
                  if (this instanceof i) return r.apply(this, o), this;
                  const s = new i(...o);
                  return (a.annotation = s), a;
                  function a(l, c, u) {
                     const d = l.hasOwnProperty(pi) ? l[pi] : Object.defineProperty(l, pi, { value: [] })[pi];
                     for (; d.length <= u; ) d.push(null);
                     return (d[u] = d[u] || []).push(s), l;
                  }
               }
               return t && (i.prototype = Object.create(t.prototype)), (i.prototype.ngMetadataName = n), (i.annotationCls = i), i;
            });
         }
         class x {
            constructor(e, t) {
               (this._desc = e),
                  (this.ngMetadataName = "InjectionToken"),
                  (this.ɵprov = void 0),
                  "number" == typeof t
                     ? (this.__NG_ELEMENT_ID__ = t)
                     : void 0 !== t && (this.ɵprov = N({ token: this, providedIn: t.providedIn || "root", factory: t.factory }));
            }
            get multi() {
               return this;
            }
            toString() {
               return `InjectionToken ${this._desc}`;
            }
         }
         function Mr(n, e) {
            n.forEach((t) => (Array.isArray(t) ? Mr(t, e) : e(t)));
         }
         function Gm(n, e, t) {
            e >= n.length ? n.push(t) : n.splice(e, 0, t);
         }
         function Ta(n, e) {
            return e >= n.length - 1 ? n.pop() : n.splice(e, 1)[0];
         }
         function xt(n, e, t) {
            let r = yi(n, e);
            return (
               r >= 0
                  ? (n[1 | r] = t)
                  : ((r = ~r),
                    (function vx(n, e, t, r) {
                       let i = n.length;
                       if (i == e) n.push(t, r);
                       else if (1 === i) n.push(r, n[0]), (n[0] = t);
                       else {
                          for (i--, n.push(n[i - 1], n[i]); i > e; ) (n[i] = n[i - 2]), i--;
                          (n[e] = t), (n[e + 1] = r);
                       }
                    })(n, r, e, t)),
               r
            );
         }
         function Mu(n, e) {
            const t = yi(n, e);
            if (t >= 0) return n[1 | t];
         }
         function yi(n, e) {
            return (function qm(n, e, t) {
               let r = 0,
                  i = n.length >> t;
               for (; i !== r; ) {
                  const o = r + ((i - r) >> 1),
                     s = n[o << t];
                  if (e === s) return o << t;
                  s > e ? (i = o) : (r = o + 1);
               }
               return ~(i << t);
            })(n, e, 1);
         }
         const tr = _o(gi("Optional"), 8),
            _i = _o(gi("SkipSelf"), 4);
         var mt = (() => (((mt = mt || {})[(mt.Important = 1)] = "Important"), (mt[(mt.DashCase = 2)] = "DashCase"), mt))();
         const Ru = new Map();
         let Ux = 0;
         const Nu = "__ngContext__";
         function nt(n, e) {
            Ct(e)
               ? ((n[Nu] = e[20]),
                 (function $x(n) {
                    Ru.set(n[20], n);
                 })(e))
               : (n[Nu] = e);
         }
         function ku(n, e) {
            return undefined(n, e);
         }
         function No(n) {
            const e = n[3];
            return Qt(e) ? e[3] : e;
         }
         function Pu(n) {
            return fg(n[13]);
         }
         function Lu(n) {
            return fg(n[4]);
         }
         function fg(n) {
            for (; null !== n && !Qt(n); ) n = n[4];
            return n;
         }
         function bi(n, e, t, r, i) {
            if (null != r) {
               let o,
                  s = !1;
               Qt(r) ? (o = r) : Ct(r) && ((s = !0), (r = r[0]));
               const a = Ke(r);
               0 === n && null !== t
                  ? null == i
                     ? _g(e, t, a)
                     : xr(e, t, a, i || null, !0)
                  : 1 === n && null !== t
                  ? xr(e, t, a, i || null, !0)
                  : 2 === n
                  ? (function zu(n, e, t) {
                       const r = Oa(n, e);
                       r &&
                          (function cS(n, e, t, r) {
                             n.removeChild(e, t, r);
                          })(n, r, e, t);
                    })(e, a, s)
                  : 3 === n && e.destroyNode(a),
                  null != o &&
                     (function fS(n, e, t, r, i) {
                        const o = t[7];
                        o !== Ke(t) && bi(e, n, r, o, i);
                        for (let a = 10; a < t.length; a++) {
                           const l = t[a];
                           Oo(l[1], l, n, e, r, o);
                        }
                     })(e, n, o, t, i);
            }
         }
         function Bu(n, e, t) {
            return n.createElement(e, t);
         }
         function pg(n, e) {
            const t = n[9],
               r = t.indexOf(e),
               i = e[3];
            512 & e[2] && ((e[2] &= -513), au(i, -1)), t.splice(r, 1);
         }
         function ju(n, e) {
            if (n.length <= 10) return;
            const t = 10 + e,
               r = n[t];
            if (r) {
               const i = r[17];
               null !== i && i !== n && pg(i, r), e > 0 && (n[t - 1][4] = r[4]);
               const o = Ta(n, 10 + e);
               !(function tS(n, e) {
                  Oo(n, e, e[Q], 2, null, null), (e[0] = null), (e[6] = null);
               })(r[1], r);
               const s = o[19];
               null !== s && s.detachView(o[1]), (r[3] = null), (r[4] = null), (r[2] &= -65);
            }
            return r;
         }
         function mg(n, e) {
            if (!(128 & e[2])) {
               const t = e[Q];
               t.destroyNode && Oo(n, e, t, 3, null, null),
                  (function iS(n) {
                     let e = n[13];
                     if (!e) return Uu(n[1], n);
                     for (; e; ) {
                        let t = null;
                        if (Ct(e)) t = e[13];
                        else {
                           const r = e[10];
                           r && (t = r);
                        }
                        if (!t) {
                           for (; e && !e[4] && e !== n; ) Ct(e) && Uu(e[1], e), (e = e[3]);
                           null === e && (e = n), Ct(e) && Uu(e[1], e), (t = e && e[4]);
                        }
                        e = t;
                     }
                  })(e);
            }
         }
         function Uu(n, e) {
            if (!(128 & e[2])) {
               (e[2] &= -65),
                  (e[2] |= 128),
                  (function lS(n, e) {
                     let t;
                     if (null != n && null != (t = n.destroyHooks))
                        for (let r = 0; r < t.length; r += 2) {
                           const i = e[t[r]];
                           if (!(i instanceof Mo)) {
                              const o = t[r + 1];
                              if (Array.isArray(o))
                                 for (let s = 0; s < o.length; s += 2) {
                                    const a = i[o[s]],
                                       l = o[s + 1];
                                    try {
                                       l.call(a);
                                    } finally {
                                    }
                                 }
                              else
                                 try {
                                    o.call(i);
                                 } finally {
                                 }
                           }
                        }
                  })(n, e),
                  (function aS(n, e) {
                     const t = n.cleanup,
                        r = e[7];
                     let i = -1;
                     if (null !== t)
                        for (let o = 0; o < t.length - 1; o += 2)
                           if ("string" == typeof t[o]) {
                              const s = t[o + 3];
                              s >= 0 ? r[(i = s)]() : r[(i = -s)].unsubscribe(), (o += 2);
                           } else {
                              const s = r[(i = t[o + 1])];
                              t[o].call(s);
                           }
                     if (null !== r) {
                        for (let o = i + 1; o < r.length; o++) (0, r[o])();
                        e[7] = null;
                     }
                  })(n, e),
                  1 === e[1].type && e[Q].destroy();
               const t = e[17];
               if (null !== t && Qt(e[3])) {
                  t !== e[3] && pg(t, e);
                  const r = e[19];
                  null !== r && r.detachView(n);
               }
               !(function zx(n) {
                  Ru.delete(n[20]);
               })(e);
            }
         }
         function gg(n, e, t) {
            return (function yg(n, e, t) {
               let r = e;
               for (; null !== r && 40 & r.type; ) r = (e = r).parent;
               if (null === r) return t[0];
               {
                  const { componentOffset: i } = r;
                  if (i > -1) {
                     const { encapsulation: o } = n.data[r.directiveStart + i];
                     if (o === Kt.None || o === Kt.Emulated) return null;
                  }
                  return Et(r, t);
               }
            })(n, e.parent, t);
         }
         function xr(n, e, t, r, i) {
            n.insertBefore(e, t, r, i);
         }
         function _g(n, e, t) {
            n.appendChild(e, t);
         }
         function vg(n, e, t, r, i) {
            null !== r ? xr(n, e, t, r, i) : _g(n, e, t);
         }
         function Oa(n, e) {
            return n.parentNode(e);
         }
         let Wu,
            wg = function Dg(n, e, t) {
               return 40 & n.type ? Et(n, t) : null;
            };
         function ka(n, e, t, r) {
            const i = gg(n, r, e),
               o = e[Q],
               a = (function bg(n, e, t) {
                  return wg(n, e, t);
               })(r.parent || e[6], r, e);
            if (null != i)
               if (Array.isArray(t)) for (let l = 0; l < t.length; l++) vg(o, i, t[l], a, !1);
               else vg(o, i, t, a, !1);
         }
         function Pa(n, e) {
            if (null !== e) {
               const t = e.type;
               if (3 & t) return Et(e, n);
               if (4 & t) return $u(-1, n[e.index]);
               if (8 & t) {
                  const r = e.child;
                  if (null !== r) return Pa(n, r);
                  {
                     const i = n[e.index];
                     return Qt(i) ? $u(-1, i) : Ke(i);
                  }
               }
               if (32 & t) return ku(e, n)() || Ke(n[e.index]);
               {
                  const r = Eg(n, e);
                  return null !== r ? (Array.isArray(r) ? r[0] : Pa(No(n[16]), r)) : Pa(n, e.next);
               }
            }
            return null;
         }
         function Eg(n, e) {
            return null !== e ? n[16][6].projection[e.projection] : null;
         }
         function $u(n, e) {
            const t = 10 + n + 1;
            if (t < e.length) {
               const r = e[t],
                  i = r[1].firstChild;
               if (null !== i) return Pa(r, i);
            }
            return e[7];
         }
         function Gu(n, e, t, r, i, o, s) {
            for (; null != t; ) {
               const a = r[t.index],
                  l = t.type;
               if ((s && 0 === e && (a && nt(Ke(a), r), (t.flags |= 2)), 32 != (32 & t.flags)))
                  if (8 & l) Gu(n, e, t.child, r, i, o, !1), bi(e, n, i, a, o);
                  else if (32 & l) {
                     const c = ku(t, r);
                     let u;
                     for (; (u = c()); ) bi(e, n, i, u, o);
                     bi(e, n, i, a, o);
                  } else 16 & l ? Mg(n, e, r, t, i, o) : bi(e, n, i, a, o);
               t = s ? t.projectionNext : t.next;
            }
         }
         function Oo(n, e, t, r, i, o) {
            Gu(t, r, n.firstChild, e, i, o, !1);
         }
         function Mg(n, e, t, r, i, o) {
            const s = t[16],
               l = s[6].projection[r.projection];
            if (Array.isArray(l)) for (let c = 0; c < l.length; c++) bi(e, n, i, l[c], o);
            else Gu(n, e, l, s[3], i, o, !0);
         }
         function xg(n, e, t) {
            "" === t ? n.removeAttribute(e, "class") : n.setAttribute(e, "class", t);
         }
         function Sg(n, e, t) {
            const { mergedAttrs: r, classes: i, styles: o } = t;
            null !== r && yu(n, e, r),
               null !== i && xg(n, e, i),
               null !== o &&
                  (function pS(n, e, t) {
                     n.setAttribute(e, "style", t);
                  })(n, e, o);
         }
         class Ir {
            constructor(e) {
               this.changingThisBreaksApplicationSecurity = e;
            }
            toString() {
               return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${sa})`;
            }
         }
         function St(n) {
            return n instanceof Ir ? n.changingThisBreaksApplicationSecurity : n;
         }
         const NS = /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
         var ae = (() => (
            ((ae = ae || {})[(ae.NONE = 0)] = "NONE"),
            (ae[(ae.HTML = 1)] = "HTML"),
            (ae[(ae.STYLE = 2)] = "STYLE"),
            (ae[(ae.SCRIPT = 3)] = "SCRIPT"),
            (ae[(ae.URL = 4)] = "URL"),
            (ae[(ae.RESOURCE_URL = 5)] = "RESOURCE_URL"),
            ae
         ))();
         function Di(n) {
            const e = (function Po() {
               const n = D();
               return n && n[12];
            })();
            return e
               ? e.sanitize(ae.URL, n) || ""
               : (function hn(n, e) {
                    const t = (function ES(n) {
                       return (n instanceof Ir && n.getTypeName()) || null;
                    })(n);
                    if (null != t && t !== e) {
                       if ("ResourceURL" === t && "URL" === e) return !0;
                       throw new Error(`Required a safe ${e}, got a ${t} (see ${sa})`);
                    }
                    return t === e;
                 })(n, "URL")
               ? St(n)
               : (function Ba(n) {
                    return (n = String(n)).match(NS) ? n : "unsafe:" + n;
                 })(z(n));
         }
         const Ua = new x("ENVIRONMENT_INITIALIZER"),
            Ug = new x("INJECTOR", -1),
            Hg = new x("INJECTOR_DEF_TYPES");
         class $g {
            get(e, t = go) {
               if (t === go) {
                  const r = new Error(`NullInjectorError: No provider for ${he(e)}!`);
                  throw ((r.name = "NullInjectorError"), r);
               }
               return t;
            }
         }
         function GS(...n) {
            return { ɵproviders: zg(0, n), ɵfromNgModule: !0 };
         }
         function zg(n, ...e) {
            const t = [],
               r = new Set();
            let i;
            return (
               Mr(e, (o) => {
                  const s = o;
                  Xu(s, t, [], r) && (i || (i = []), i.push(s));
               }),
               void 0 !== i && Gg(i, t),
               t
            );
         }
         function Gg(n, e) {
            for (let t = 0; t < n.length; t++) {
               const { providers: i } = n[t];
               Ju(i, (o) => {
                  e.push(o);
               });
            }
         }
         function Xu(n, e, t, r) {
            if (!(n = L(n))) return !1;
            let i = null,
               o = Qp(n);
            const s = !o && ue(n);
            if (o || s) {
               if (s && !s.standalone) return !1;
               i = n;
            } else {
               const l = n.ngModule;
               if (((o = Qp(l)), !o)) return !1;
               i = l;
            }
            const a = r.has(i);
            if (s) {
               if (a) return !1;
               if ((r.add(i), s.dependencies)) {
                  const l = "function" == typeof s.dependencies ? s.dependencies() : s.dependencies;
                  for (const c of l) Xu(c, e, t, r);
               }
            } else {
               if (!o) return !1;
               {
                  if (null != o.imports && !a) {
                     let c;
                     r.add(i);
                     try {
                        Mr(o.imports, (u) => {
                           Xu(u, e, t, r) && (c || (c = []), c.push(u));
                        });
                     } finally {
                     }
                     void 0 !== c && Gg(c, e);
                  }
                  if (!a) {
                     const c = wr(i) || (() => new i());
                     e.push({ provide: i, useFactory: c, deps: se }, { provide: Hg, useValue: i, multi: !0 }, { provide: Ua, useValue: () => M(i), multi: !0 });
                  }
                  const l = o.providers;
                  null == l ||
                     a ||
                     Ju(l, (u) => {
                        e.push(u);
                     });
               }
            }
            return i !== n && void 0 !== n.providers;
         }
         function Ju(n, e) {
            for (let t of n) Qc(t) && (t = t.ɵproviders), Array.isArray(t) ? Ju(t, e) : e(t);
         }
         const qS = fe({ provide: String, useValue: fe });
         function ed(n) {
            return null !== n && "object" == typeof n && qS in n;
         }
         function Ar(n) {
            return "function" == typeof n;
         }
         const td = new x("Set Injector scope."),
            Ha = {},
            KS = {};
         let nd;
         function $a() {
            return void 0 === nd && (nd = new $g()), nd;
         }
         class kn {}
         class Kg extends kn {
            constructor(e, t, r, i) {
               super(),
                  (this.parent = t),
                  (this.source = r),
                  (this.scopes = i),
                  (this.records = new Map()),
                  (this._ngOnDestroyHooks = new Set()),
                  (this._onDestroyHooks = []),
                  (this._destroyed = !1),
                  id(e, (s) => this.processProvider(s)),
                  this.records.set(Ug, wi(void 0, this)),
                  i.has("environment") && this.records.set(kn, wi(void 0, this));
               const o = this.records.get(td);
               null != o && "string" == typeof o.value && this.scopes.add(o.value), (this.injectorDefTypes = new Set(this.get(Hg.multi, se, V.Self)));
            }
            get destroyed() {
               return this._destroyed;
            }
            destroy() {
               this.assertNotDestroyed(), (this._destroyed = !0);
               try {
                  for (const e of this._ngOnDestroyHooks) e.ngOnDestroy();
                  for (const e of this._onDestroyHooks) e();
               } finally {
                  this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), (this._onDestroyHooks.length = 0);
               }
            }
            onDestroy(e) {
               this._onDestroyHooks.push(e);
            }
            runInContext(e) {
               this.assertNotDestroyed();
               const t = ri(this),
                  r = kt(void 0);
               try {
                  return e();
               } finally {
                  ri(t), kt(r);
               }
            }
            get(e, t = go, r = V.Default) {
               this.assertNotDestroyed(), (r = fa(r));
               const i = ri(this),
                  o = kt(void 0);
               try {
                  if (!(r & V.SkipSelf)) {
                     let a = this.records.get(e);
                     if (void 0 === a) {
                        const l =
                           (function JS(n) {
                              return "function" == typeof n || ("object" == typeof n && n instanceof x);
                           })(e) && ca(e);
                        (a = l && this.injectableDefInScope(l) ? wi(rd(e), Ha) : null), this.records.set(e, a);
                     }
                     if (null != a) return this.hydrate(e, a);
                  }
                  return (r & V.Self ? $a() : this.parent).get(e, (t = r & V.Optional && t === go ? null : t));
               } catch (s) {
                  if ("NullInjectorError" === s.name) {
                     if (((s[da] = s[da] || []).unshift(he(e)), i)) throw s;
                     return (function CM(n, e, t, r) {
                        const i = n[da];
                        throw (
                           (e[Jp] && i.unshift(e[Jp]),
                           (n.message = (function EM(n, e, t, r = null) {
                              n = n && "\n" === n.charAt(0) && "\u0275" == n.charAt(1) ? n.slice(2) : n;
                              let i = he(e);
                              if (Array.isArray(e)) i = e.map(he).join(" -> ");
                              else if ("object" == typeof e) {
                                 let o = [];
                                 for (let s in e)
                                    if (e.hasOwnProperty(s)) {
                                       let a = e[s];
                                       o.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : he(a)));
                                    }
                                 i = `{${o.join(", ")}}`;
                              }
                              return `${t}${r ? "(" + r + ")" : ""}[${i}]: ${n.replace(vM, "\n  ")}`;
                           })("\n" + n.message, i, t, r)),
                           (n.ngTokenPath = i),
                           (n[da] = null),
                           n)
                        );
                     })(s, e, "R3InjectorError", this.source);
                  }
                  throw s;
               } finally {
                  kt(o), ri(i);
               }
            }
            resolveInjectorInitializers() {
               const e = ri(this),
                  t = kt(void 0);
               try {
                  const r = this.get(Ua.multi, se, V.Self);
                  for (const i of r) i();
               } finally {
                  ri(e), kt(t);
               }
            }
            toString() {
               const e = [],
                  t = this.records;
               for (const r of t.keys()) e.push(he(r));
               return `R3Injector[${e.join(", ")}]`;
            }
            assertNotDestroyed() {
               if (this._destroyed) throw new _(205, !1);
            }
            processProvider(e) {
               let t = Ar((e = L(e))) ? e : L(e && e.provide);
               const r = (function QS(n) {
                  return ed(n) ? wi(void 0, n.useValue) : wi(Zg(n), Ha);
               })(e);
               if (Ar(e) || !0 !== e.multi) this.records.get(t);
               else {
                  let i = this.records.get(t);
                  i || ((i = wi(void 0, Ha, !0)), (i.factory = () => eu(i.multi)), this.records.set(t, i)), (t = e), i.multi.push(e);
               }
               this.records.set(t, r);
            }
            hydrate(e, t) {
               return (
                  t.value === Ha && ((t.value = KS), (t.value = t.factory())),
                  "object" == typeof t.value &&
                     t.value &&
                     (function XS(n) {
                        return null !== n && "object" == typeof n && "function" == typeof n.ngOnDestroy;
                     })(t.value) &&
                     this._ngOnDestroyHooks.add(t.value),
                  t.value
               );
            }
            injectableDefInScope(e) {
               if (!e.providedIn) return !1;
               const t = L(e.providedIn);
               return "string" == typeof t ? "any" === t || this.scopes.has(t) : this.injectorDefTypes.has(t);
            }
         }
         function rd(n) {
            const e = ca(n),
               t = null !== e ? e.factory : wr(n);
            if (null !== t) return t;
            if (n instanceof x) throw new _(204, !1);
            if (n instanceof Function)
               return (function ZS(n) {
                  const e = n.length;
                  if (e > 0)
                     throw (
                        ((function Ao(n, e) {
                           const t = [];
                           for (let r = 0; r < n; r++) t.push(e);
                           return t;
                        })(e, "?"),
                        new _(204, !1))
                     );
                  const t = (function pM(n) {
                     const e = n && (n[ua] || n[Yp]);
                     if (e) {
                        const t = (function mM(n) {
                           if (n.hasOwnProperty("name")) return n.name;
                           const e = ("" + n).match(/^function\s*([^\s(]+)/);
                           return null === e ? "" : e[1];
                        })(n);
                        return (
                           console.warn(
                              `DEPRECATED: DI is instantiating a token "${t}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${t}" class.`
                           ),
                           e
                        );
                     }
                     return null;
                  })(n);
                  return null !== t ? () => t.factory(n) : () => new n();
               })(n);
            throw new _(204, !1);
         }
         function Zg(n, e, t) {
            let r;
            if (Ar(n)) {
               const i = L(n);
               return wr(i) || rd(i);
            }
            if (ed(n)) r = () => L(n.useValue);
            else if (
               (function Wg(n) {
                  return !(!n || !n.useFactory);
               })(n)
            )
               r = () => n.useFactory(...eu(n.deps || []));
            else if (
               (function qg(n) {
                  return !(!n || !n.useExisting);
               })(n)
            )
               r = () => M(L(n.useExisting));
            else {
               const i = L(n && (n.useClass || n.provide));
               if (
                  !(function YS(n) {
                     return !!n.deps;
                  })(n)
               )
                  return wr(i) || rd(i);
               r = () => new i(...eu(n.deps));
            }
            return r;
         }
         function wi(n, e, t = !1) {
            return { factory: n, value: e, multi: t ? [] : void 0 };
         }
         function id(n, e) {
            for (const t of n) Array.isArray(t) ? id(t, e) : t && Qc(t) ? id(t.ɵproviders, e) : e(t);
         }
         class eI {}
         class Qg {}
         class nI {
            resolveComponentFactory(e) {
               throw (function tI(n) {
                  const e = Error(`No component factory found for ${he(n)}. Did you add it to @NgModule.entryComponents?`);
                  return (e.ngComponent = n), e;
               })(e);
            }
         }
         let Lo = (() => {
            class n {}
            return (n.NULL = new nI()), n;
         })();
         function rI() {
            return Ci(Ze(), D());
         }
         function Ci(n, e) {
            return new yt(Et(n, e));
         }
         let yt = (() => {
            class n {
               constructor(t) {
                  this.nativeElement = t;
               }
            }
            return (n.__NG_ELEMENT_ID__ = rI), n;
         })();
         function iI(n) {
            return n instanceof yt ? n.nativeElement : n;
         }
         class Vo {}
         let Pn = (() => {
               class n {}
               return (
                  (n.__NG_ELEMENT_ID__ = () =>
                     (function oI() {
                        const n = D(),
                           t = Mt(Ze().index, n);
                        return (Ct(t) ? t : n)[Q];
                     })()),
                  n
               );
            })(),
            sI = (() => {
               class n {}
               return (n.ɵprov = N({ token: n, providedIn: "root", factory: () => null })), n;
            })();
         class Tr {
            constructor(e) {
               (this.full = e), (this.major = e.split(".")[0]), (this.minor = e.split(".")[1]), (this.patch = e.split(".").slice(2).join("."));
            }
         }
         const aI = new Tr("15.0.4"),
            od = {};
         function ad(n) {
            return n.ngOriginalError;
         }
         class nr {
            constructor() {
               this._console = console;
            }
            handleError(e) {
               const t = this._findOriginalError(e);
               this._console.error("ERROR", e), t && this._console.error("ORIGINAL ERROR", t);
            }
            _findOriginalError(e) {
               let t = e && ad(e);
               for (; t && ad(t); ) t = ad(t);
               return t || null;
            }
         }
         function Ln(n) {
            return n instanceof Function ? n() : n;
         }
         function Jg(n, e, t) {
            let r = n.length;
            for (;;) {
               const i = n.indexOf(e, t);
               if (-1 === i) return i;
               if (0 === i || n.charCodeAt(i - 1) <= 32) {
                  const o = e.length;
                  if (i + o === r || n.charCodeAt(i + o) <= 32) return i;
               }
               t = i + 1;
            }
         }
         const ey = "ng-template";
         function _I(n, e, t) {
            let r = 0;
            for (; r < n.length; ) {
               let i = n[r++];
               if (t && "class" === i) {
                  if (((i = n[r]), -1 !== Jg(i.toLowerCase(), e, 0))) return !0;
               } else if (1 === i) {
                  for (; r < n.length && "string" == typeof (i = n[r++]); ) if (i.toLowerCase() === e) return !0;
                  return !1;
               }
            }
            return !1;
         }
         function ty(n) {
            return 4 === n.type && n.value !== ey;
         }
         function vI(n, e, t) {
            return e === (4 !== n.type || t ? n.value : ey);
         }
         function bI(n, e, t) {
            let r = 4;
            const i = n.attrs || [],
               o = (function CI(n) {
                  for (let e = 0; e < n.length; e++) if (Tm(n[e])) return e;
                  return n.length;
               })(i);
            let s = !1;
            for (let a = 0; a < e.length; a++) {
               const l = e[a];
               if ("number" != typeof l) {
                  if (!s)
                     if (4 & r) {
                        if (((r = 2 | (1 & r)), ("" !== l && !vI(n, l, t)) || ("" === l && 1 === e.length))) {
                           if (Jt(r)) return !1;
                           s = !0;
                        }
                     } else {
                        const c = 8 & r ? l : e[++a];
                        if (8 & r && null !== n.attrs) {
                           if (!_I(n.attrs, c, t)) {
                              if (Jt(r)) return !1;
                              s = !0;
                           }
                           continue;
                        }
                        const d = DI(8 & r ? "class" : l, i, ty(n), t);
                        if (-1 === d) {
                           if (Jt(r)) return !1;
                           s = !0;
                           continue;
                        }
                        if ("" !== c) {
                           let f;
                           f = d > o ? "" : i[d + 1].toLowerCase();
                           const h = 8 & r ? f : null;
                           if ((h && -1 !== Jg(h, c, 0)) || (2 & r && c !== f)) {
                              if (Jt(r)) return !1;
                              s = !0;
                           }
                        }
                     }
               } else {
                  if (!s && !Jt(r) && !Jt(l)) return !1;
                  if (s && Jt(l)) continue;
                  (s = !1), (r = l | (1 & r));
               }
            }
            return Jt(r) || s;
         }
         function Jt(n) {
            return 0 == (1 & n);
         }
         function DI(n, e, t, r) {
            if (null === e) return -1;
            let i = 0;
            if (r || !t) {
               let o = !1;
               for (; i < e.length; ) {
                  const s = e[i];
                  if (s === n) return i;
                  if (3 === s || 6 === s) o = !0;
                  else {
                     if (1 === s || 2 === s) {
                        let a = e[++i];
                        for (; "string" == typeof a; ) a = e[++i];
                        continue;
                     }
                     if (4 === s) break;
                     if (0 === s) {
                        i += 4;
                        continue;
                     }
                  }
                  i += o ? 1 : 2;
               }
               return -1;
            }
            return (function EI(n, e) {
               let t = n.indexOf(4);
               if (t > -1)
                  for (t++; t < n.length; ) {
                     const r = n[t];
                     if ("number" == typeof r) return -1;
                     if (r === e) return t;
                     t++;
                  }
               return -1;
            })(e, n);
         }
         function ny(n, e, t = !1) {
            for (let r = 0; r < e.length; r++) if (bI(n, e[r], t)) return !0;
            return !1;
         }
         function ry(n, e) {
            return n ? ":not(" + e.trim() + ")" : e;
         }
         function xI(n) {
            let e = n[0],
               t = 1,
               r = 2,
               i = "",
               o = !1;
            for (; t < n.length; ) {
               let s = n[t];
               if ("string" == typeof s)
                  if (2 & r) {
                     const a = n[++t];
                     i += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
                  } else 8 & r ? (i += "." + s) : 4 & r && (i += " " + s);
               else "" !== i && !Jt(s) && ((e += ry(o, i)), (i = "")), (r = s), (o = o || !Jt(r));
               t++;
            }
            return "" !== i && (e += ry(o, i)), e;
         }
         const q = {};
         function re(n) {
            iy(te(), D(), ut() + n, !1);
         }
         function iy(n, e, t, r) {
            if (!r)
               if (3 == (3 & e[2])) {
                  const o = n.preOrderCheckHooks;
                  null !== o && wa(e, o, t);
               } else {
                  const o = n.preOrderHooks;
                  null !== o && Ca(e, o, 0, t);
               }
            Cr(t);
         }
         function ly(n, e = null, t = null, r) {
            const i = cy(n, e, t, r);
            return i.resolveInjectorInitializers(), i;
         }
         function cy(n, e = null, t = null, r, i = new Set()) {
            const o = [t || se, GS(n)];
            return (r = r || ("object" == typeof n ? void 0 : he(n))), new Kg(o, e || $a(), r || null, i);
         }
         let Bt = (() => {
            class n {
               static create(t, r) {
                  if (Array.isArray(t)) return ly({ name: "" }, r, t, "");
                  {
                     const i = t.name ?? "";
                     return ly({ name: i }, t.parent, t.providers, i);
                  }
               }
            }
            return (
               (n.THROW_IF_NOT_FOUND = go),
               (n.NULL = new $g()),
               (n.ɵprov = N({ token: n, providedIn: "any", factory: () => M(Ug) })),
               (n.__NG_ELEMENT_ID__ = -1),
               n
            );
         })();
         function w(n, e = V.Default) {
            const t = D();
            return null === t ? M(n, e) : Bm(Ze(), t, L(n), e);
         }
         function yy(n, e) {
            const t = n.contentQueries;
            if (null !== t)
               for (let r = 0; r < t.length; r += 2) {
                  const i = t[r],
                     o = t[r + 1];
                  if (-1 !== o) {
                     const s = n.data[o];
                     fu(i), s.contentQueries(2, e[o], o);
                  }
               }
         }
         function Ga(n, e, t, r, i, o, s, a, l, c, u) {
            const d = e.blueprint.slice();
            return (
               (d[0] = i),
               (d[2] = 76 | r),
               (null !== u || (n && 1024 & n[2])) && (d[2] |= 1024),
               gm(d),
               (d[3] = d[15] = n),
               (d[8] = t),
               (d[10] = s || (n && n[10])),
               (d[Q] = a || (n && n[Q])),
               (d[12] = l || (n && n[12]) || null),
               (d[9] = c || (n && n[9]) || null),
               (d[6] = o),
               (d[20] = (function Hx() {
                  return Ux++;
               })()),
               (d[21] = u),
               (d[16] = 2 == e.type ? n[16] : d),
               d
            );
         }
         function xi(n, e, t, r, i) {
            let o = n.data[e];
            if (null === o)
               (o = (function fd(n, e, t, r, i) {
                  const o = vm(),
                     s = lu(),
                     l = (n.data[e] = (function XI(n, e, t, r, i, o) {
                        return {
                           type: t,
                           index: r,
                           insertBeforeIndex: null,
                           injectorIndex: e ? e.injectorIndex : -1,
                           directiveStart: -1,
                           directiveEnd: -1,
                           directiveStylingLast: -1,
                           componentOffset: -1,
                           propertyBindings: null,
                           flags: 0,
                           providerIndexes: 0,
                           value: i,
                           attrs: o,
                           mergedAttrs: null,
                           localNames: null,
                           initialInputs: void 0,
                           inputs: null,
                           outputs: null,
                           tViews: null,
                           next: null,
                           projectionNext: null,
                           child: null,
                           parent: e,
                           projection: null,
                           styles: null,
                           stylesWithoutHost: null,
                           residualStyles: void 0,
                           classes: null,
                           classesWithoutHost: null,
                           residualClasses: void 0,
                           classBindings: 0,
                           styleBindings: 0,
                        };
                     })(0, s ? o : o && o.parent, t, e, r, i));
                  return (
                     null === n.firstChild && (n.firstChild = l),
                     null !== o && (s ? null == o.child && null !== l.parent && (o.child = l) : null === o.next && (o.next = l)),
                     l
                  );
               })(n, e, t, r, i)),
                  (function KM() {
                     return G.lFrame.inI18n;
                  })() && (o.flags |= 32);
            else if (64 & o.type) {
               (o.type = t), (o.value = r), (o.attrs = i);
               const s = (function Eo() {
                  const n = G.lFrame,
                     e = n.currentTNode;
                  return n.isParent ? e : e.parent;
               })();
               o.injectorIndex = null === s ? -1 : s.injectorIndex;
            }
            return un(o, !0), o;
         }
         function Bo(n, e, t, r) {
            if (0 === t) return -1;
            const i = e.length;
            for (let o = 0; o < t; o++) e.push(r), n.blueprint.push(r), n.data.push(null);
            return i;
         }
         function hd(n, e, t) {
            hu(e);
            try {
               const r = n.viewQuery;
               null !== r && Cd(1, r, t);
               const i = n.template;
               null !== i && _y(n, e, i, 1, t),
                  n.firstCreatePass && (n.firstCreatePass = !1),
                  n.staticContentQueries && yy(n, e),
                  n.staticViewQueries && Cd(2, n.viewQuery, t);
               const o = n.components;
               null !== o &&
                  (function ZI(n, e) {
                     for (let t = 0; t < e.length; t++) _1(n, e[t]);
                  })(e, o);
            } catch (r) {
               throw (n.firstCreatePass && ((n.incompleteFirstPass = !0), (n.firstCreatePass = !1)), r);
            } finally {
               (e[2] &= -5), pu();
            }
         }
         function qa(n, e, t, r) {
            const i = e[2];
            if (128 != (128 & i)) {
               hu(e);
               try {
                  gm(e),
                     (function Dm(n) {
                        return (G.lFrame.bindingIndex = n);
                     })(n.bindingStartIndex),
                     null !== t && _y(n, e, t, 2, r);
                  const s = 3 == (3 & i);
                  if (s) {
                     const c = n.preOrderCheckHooks;
                     null !== c && wa(e, c, null);
                  } else {
                     const c = n.preOrderHooks;
                     null !== c && Ca(e, c, 0, null), mu(e, 0);
                  }
                  if (
                     ((function g1(n) {
                        for (let e = Pu(n); null !== e; e = Lu(e)) {
                           if (!e[2]) continue;
                           const t = e[9];
                           for (let r = 0; r < t.length; r++) {
                              const i = t[r],
                                 o = i[3];
                              0 == (512 & i[2]) && au(o, 1), (i[2] |= 512);
                           }
                        }
                     })(e),
                     (function m1(n) {
                        for (let e = Pu(n); null !== e; e = Lu(e))
                           for (let t = 10; t < e.length; t++) {
                              const r = e[t],
                                 i = r[1];
                              ba(r) && qa(i, r, i.template, r[8]);
                           }
                     })(e),
                     null !== n.contentQueries && yy(n, e),
                     s)
                  ) {
                     const c = n.contentCheckHooks;
                     null !== c && wa(e, c);
                  } else {
                     const c = n.contentHooks;
                     null !== c && Ca(e, c, 1), mu(e, 1);
                  }
                  !(function WI(n, e) {
                     const t = n.hostBindingOpCodes;
                     if (null !== t)
                        try {
                           for (let r = 0; r < t.length; r++) {
                              const i = t[r];
                              if (i < 0) Cr(~i);
                              else {
                                 const o = i,
                                    s = t[++r],
                                    a = t[++r];
                                 ZM(s, o), a(2, e[o]);
                              }
                           }
                        } finally {
                           Cr(-1);
                        }
                  })(n, e);
                  const a = n.components;
                  null !== a &&
                     (function KI(n, e) {
                        for (let t = 0; t < e.length; t++) y1(n, e[t]);
                     })(e, a);
                  const l = n.viewQuery;
                  if ((null !== l && Cd(2, l, r), s)) {
                     const c = n.viewCheckHooks;
                     null !== c && wa(e, c);
                  } else {
                     const c = n.viewHooks;
                     null !== c && Ca(e, c, 2), mu(e, 2);
                  }
                  !0 === n.firstUpdatePass && (n.firstUpdatePass = !1), (e[2] &= -41), 512 & e[2] && ((e[2] &= -513), au(e[3], -1));
               } finally {
                  pu();
               }
            }
         }
         function _y(n, e, t, r, i) {
            const o = ut(),
               s = 2 & r;
            try {
               Cr(-1), s && e.length > 22 && iy(n, e, 22, !1), t(r, i);
            } finally {
               Cr(o);
            }
         }
         function pd(n, e, t) {
            if (ou(e)) {
               const i = e.directiveEnd;
               for (let o = e.directiveStart; o < i; o++) {
                  const s = n.data[o];
                  s.contentQueries && s.contentQueries(1, t[o], o);
               }
            }
         }
         function md(n, e, t) {
            !_m() ||
               ((function o1(n, e, t, r) {
                  const i = t.directiveStart,
                     o = t.directiveEnd;
                  Co(t) &&
                     (function f1(n, e, t) {
                        const r = Et(e, n),
                           i = vy(t),
                           o = n[10],
                           s = Wa(n, Ga(n, i, null, t.onPush ? 32 : 16, r, e, o, o.createRenderer(r, t), null, null, null));
                        n[e.index] = s;
                     })(e, t, n.data[i + t.componentOffset]),
                     n.firstCreatePass || Sa(t, e),
                     nt(r, e);
                  const s = t.initialInputs;
                  for (let a = i; a < o; a++) {
                     const l = n.data[a],
                        c = Er(e, n, a, t);
                     nt(c, e), null !== s && h1(0, a - i, c, l, 0, s), Yt(l) && (Mt(t.index, e)[8] = Er(e, n, a, t));
                  }
               })(n, e, t, Et(t, e)),
               64 == (64 & t.flags) && My(n, e, t));
         }
         function gd(n, e, t = Et) {
            const r = e.localNames;
            if (null !== r) {
               let i = e.index + 1;
               for (let o = 0; o < r.length; o += 2) {
                  const s = r[o + 1],
                     a = -1 === s ? t(e, n) : n[s];
                  n[i++] = a;
               }
            }
         }
         function vy(n) {
            const e = n.tView;
            return null === e || e.incompleteFirstPass
               ? (n.tView = yd(1, null, n.template, n.decls, n.vars, n.directiveDefs, n.pipeDefs, n.viewQuery, n.schemas, n.consts))
               : e;
         }
         function yd(n, e, t, r, i, o, s, a, l, c) {
            const u = 22 + r,
               d = u + i,
               f = (function QI(n, e) {
                  const t = [];
                  for (let r = 0; r < e; r++) t.push(r < n ? null : q);
                  return t;
               })(u, d),
               h = "function" == typeof c ? c() : c;
            return (f[1] = {
               type: n,
               blueprint: f,
               template: t,
               queries: null,
               viewQuery: a,
               declTNode: e,
               data: f.slice().fill(null, u),
               bindingStartIndex: u,
               expandoStartIndex: d,
               hostBindingOpCodes: null,
               firstCreatePass: !0,
               firstUpdatePass: !0,
               staticViewQueries: !1,
               staticContentQueries: !1,
               preOrderHooks: null,
               preOrderCheckHooks: null,
               contentHooks: null,
               contentCheckHooks: null,
               viewHooks: null,
               viewCheckHooks: null,
               destroyHooks: null,
               cleanup: null,
               contentQueries: null,
               components: null,
               directiveRegistry: "function" == typeof o ? o() : o,
               pipeRegistry: "function" == typeof s ? s() : s,
               firstChild: null,
               schemas: l,
               consts: h,
               incompleteFirstPass: !1,
            });
         }
         function by(n, e, t, r) {
            const i = Sy(e);
            null === t ? i.push(r) : (i.push(t), n.firstCreatePass && Iy(n).push(r, i.length - 1));
         }
         function Dy(n, e, t, r) {
            for (let i in n)
               if (n.hasOwnProperty(i)) {
                  t = null === t ? {} : t;
                  const o = n[i];
                  null === r ? wy(t, e, i, o) : r.hasOwnProperty(i) && wy(t, e, r[i], o);
               }
            return t;
         }
         function wy(n, e, t, r) {
            n.hasOwnProperty(t) ? n[t].push(e, r) : (n[t] = [e, r]);
         }
         function It(n, e, t, r, i, o, s, a) {
            const l = Et(e, t);
            let u,
               c = e.inputs;
            !a && null != c && (u = c[r])
               ? (Ed(n, t, u, r, i), Co(e) && Cy(t, e.index))
               : 3 & e.type &&
                 ((r = (function e1(n) {
                    return "class" === n
                       ? "className"
                       : "for" === n
                       ? "htmlFor"
                       : "formaction" === n
                       ? "formAction"
                       : "innerHtml" === n
                       ? "innerHTML"
                       : "readonly" === n
                       ? "readOnly"
                       : "tabindex" === n
                       ? "tabIndex"
                       : n;
                 })(r)),
                 (i = null != s ? s(i, e.value || "", r) : i),
                 o.setProperty(l, r, i));
         }
         function Cy(n, e) {
            const t = Mt(e, n);
            16 & t[2] || (t[2] |= 32);
         }
         function _d(n, e, t, r) {
            let i = !1;
            if (_m()) {
               const o = null === r ? null : { "": -1 },
                  s = (function a1(n, e) {
                     const t = n.directiveRegistry;
                     let r = null,
                        i = null;
                     if (t)
                        for (let o = 0; o < t.length; o++) {
                           const s = t[o];
                           if (ny(e, s.selectors, !1))
                              if ((r || (r = []), Yt(s)))
                                 if (null !== s.findHostDirectiveDefs) {
                                    const a = [];
                                    (i = i || new Map()), s.findHostDirectiveDefs(s, a, i), r.unshift(...a, s), vd(n, e, a.length);
                                 } else r.unshift(s), vd(n, e, 0);
                              else (i = i || new Map()), s.findHostDirectiveDefs?.(s, r, i), r.push(s);
                        }
                     return null === r ? null : [r, i];
                  })(n, t);
               let a, l;
               null === s ? (a = l = null) : ([a, l] = s),
                  null !== a && ((i = !0), Ey(n, e, t, a, o, l)),
                  o &&
                     (function l1(n, e, t) {
                        if (e) {
                           const r = (n.localNames = []);
                           for (let i = 0; i < e.length; i += 2) {
                              const o = t[e[i + 1]];
                              if (null == o) throw new _(-301, !1);
                              r.push(e[i], o);
                           }
                        }
                     })(t, r, o);
            }
            return (t.mergedAttrs = xo(t.mergedAttrs, t.attrs)), i;
         }
         function Ey(n, e, t, r, i, o) {
            for (let c = 0; c < r.length; c++) Du(Sa(t, e), n, r[c].type);
            !(function u1(n, e, t) {
               (n.flags |= 1), (n.directiveStart = e), (n.directiveEnd = e + t), (n.providerIndexes = e);
            })(t, n.data.length, r.length);
            for (let c = 0; c < r.length; c++) {
               const u = r[c];
               u.providersResolver && u.providersResolver(u);
            }
            let s = !1,
               a = !1,
               l = Bo(n, e, r.length, null);
            for (let c = 0; c < r.length; c++) {
               const u = r[c];
               (t.mergedAttrs = xo(t.mergedAttrs, u.hostAttrs)),
                  d1(n, t, e, l, u),
                  c1(l, u, i),
                  null !== u.contentQueries && (t.flags |= 4),
                  (null !== u.hostBindings || null !== u.hostAttrs || 0 !== u.hostVars) && (t.flags |= 64);
               const d = u.type.prototype;
               !s && (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) && ((n.preOrderHooks || (n.preOrderHooks = [])).push(t.index), (s = !0)),
                  !a && (d.ngOnChanges || d.ngDoCheck) && ((n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t.index), (a = !0)),
                  l++;
            }
            !(function JI(n, e, t) {
               const i = e.directiveEnd,
                  o = n.data,
                  s = e.attrs,
                  a = [];
               let l = null,
                  c = null;
               for (let u = e.directiveStart; u < i; u++) {
                  const d = o[u],
                     f = t ? t.get(d) : null,
                     p = f ? f.outputs : null;
                  (l = Dy(d.inputs, u, l, f ? f.inputs : null)), (c = Dy(d.outputs, u, c, p));
                  const m = null === l || null === s || ty(e) ? null : p1(l, u, s);
                  a.push(m);
               }
               null !== l && (l.hasOwnProperty("class") && (e.flags |= 8), l.hasOwnProperty("style") && (e.flags |= 16)),
                  (e.initialInputs = a),
                  (e.inputs = l),
                  (e.outputs = c);
            })(n, t, o);
         }
         function My(n, e, t) {
            const r = t.directiveStart,
               i = t.directiveEnd,
               o = t.index,
               s = (function QM() {
                  return G.lFrame.currentDirectiveIndex;
               })();
            try {
               Cr(o);
               for (let a = r; a < i; a++) {
                  const l = n.data[a],
                     c = e[a];
                  uu(a), (null !== l.hostBindings || 0 !== l.hostVars || null !== l.hostAttrs) && s1(l, c);
               }
            } finally {
               Cr(-1), uu(s);
            }
         }
         function s1(n, e) {
            null !== n.hostBindings && n.hostBindings(1, e);
         }
         function vd(n, e, t) {
            (e.componentOffset = t), (n.components || (n.components = [])).push(e.index);
         }
         function c1(n, e, t) {
            if (t) {
               if (e.exportAs) for (let r = 0; r < e.exportAs.length; r++) t[e.exportAs[r]] = n;
               Yt(e) && (t[""] = n);
            }
         }
         function d1(n, e, t, r, i) {
            n.data[r] = i;
            const o = i.factory || (i.factory = wr(i.type)),
               s = new Mo(o, Yt(i), w);
            (n.blueprint[r] = s),
               (t[r] = s),
               (function n1(n, e, t, r, i) {
                  const o = i.hostBindings;
                  if (o) {
                     let s = n.hostBindingOpCodes;
                     null === s && (s = n.hostBindingOpCodes = []);
                     const a = ~e.index;
                     (function r1(n) {
                        let e = n.length;
                        for (; e > 0; ) {
                           const t = n[--e];
                           if ("number" == typeof t && t < 0) return t;
                        }
                        return 0;
                     })(s) != a && s.push(a),
                        s.push(t, r, o);
                  }
               })(n, e, r, Bo(n, t, i.hostVars, q), i);
         }
         function h1(n, e, t, r, i, o) {
            const s = o[e];
            if (null !== s) {
               const a = r.setInput;
               for (let l = 0; l < s.length; ) {
                  const c = s[l++],
                     u = s[l++],
                     d = s[l++];
                  null !== a ? r.setInput(t, d, c, u) : (t[u] = d);
               }
            }
         }
         function p1(n, e, t) {
            let r = null,
               i = 0;
            for (; i < t.length; ) {
               const o = t[i];
               if (0 !== o)
                  if (5 !== o) {
                     if ("number" == typeof o) break;
                     if (n.hasOwnProperty(o)) {
                        null === r && (r = []);
                        const s = n[o];
                        for (let a = 0; a < s.length; a += 2)
                           if (s[a] === e) {
                              r.push(o, s[a + 1], t[i + 1]);
                              break;
                           }
                     }
                     i += 2;
                  } else i += 2;
               else i += 4;
            }
            return r;
         }
         function xy(n, e, t, r) {
            return [n, !0, !1, e, null, 0, r, t, null, null];
         }
         function y1(n, e) {
            const t = Mt(e, n);
            if (ba(t)) {
               const r = t[1];
               48 & t[2] ? qa(r, t, r.template, t[8]) : t[5] > 0 && Dd(t);
            }
         }
         function Dd(n) {
            for (let r = Pu(n); null !== r; r = Lu(r))
               for (let i = 10; i < r.length; i++) {
                  const o = r[i];
                  if (ba(o))
                     if (512 & o[2]) {
                        const s = o[1];
                        qa(s, o, s.template, o[8]);
                     } else o[5] > 0 && Dd(o);
               }
            const t = n[1].components;
            if (null !== t)
               for (let r = 0; r < t.length; r++) {
                  const i = Mt(t[r], n);
                  ba(i) && i[5] > 0 && Dd(i);
               }
         }
         function _1(n, e) {
            const t = Mt(e, n),
               r = t[1];
            (function v1(n, e) {
               for (let t = e.length; t < n.blueprint.length; t++) e.push(n.blueprint[t]);
            })(r, t),
               hd(r, t, t[8]);
         }
         function Wa(n, e) {
            return n[13] ? (n[14][4] = e) : (n[13] = e), (n[14] = e), e;
         }
         function wd(n) {
            for (; n; ) {
               n[2] |= 32;
               const e = No(n);
               if (IM(n) && !e) return n;
               n = e;
            }
            return null;
         }
         function Ka(n, e, t, r = !0) {
            const i = e[10];
            i.begin && i.begin();
            try {
               qa(n, e, n.template, t);
            } catch (s) {
               throw (r && Ty(e, s), s);
            } finally {
               i.end && i.end();
            }
         }
         function Cd(n, e, t) {
            fu(0), e(n, t);
         }
         function Sy(n) {
            return n[7] || (n[7] = []);
         }
         function Iy(n) {
            return n.cleanup || (n.cleanup = []);
         }
         function Ty(n, e) {
            const t = n[9],
               r = t ? t.get(nr, null) : null;
            r && r.handleError(e);
         }
         function Ed(n, e, t, r, i) {
            for (let o = 0; o < t.length; ) {
               const s = t[o++],
                  a = t[o++],
                  l = e[s],
                  c = n.data[s];
               null !== c.setInput ? c.setInput(l, i, r, a) : (l[a] = i);
            }
         }
         function Za(n, e, t) {
            let r = t ? n.styles : null,
               i = t ? n.classes : null,
               o = 0;
            if (null !== e)
               for (let s = 0; s < e.length; s++) {
                  const a = e[s];
                  "number" == typeof a ? (o = a) : 1 == o ? (i = Kc(i, a)) : 2 == o && (r = Kc(r, a + ": " + e[++s] + ";"));
               }
            t ? (n.styles = r) : (n.stylesWithoutHost = r), t ? (n.classes = i) : (n.classesWithoutHost = i);
         }
         function Qa(n, e, t, r, i = !1) {
            for (; null !== t; ) {
               const o = e[t.index];
               if ((null !== o && r.push(Ke(o)), Qt(o)))
                  for (let a = 10; a < o.length; a++) {
                     const l = o[a],
                        c = l[1].firstChild;
                     null !== c && Qa(l[1], l, c, r);
                  }
               const s = t.type;
               if (8 & s) Qa(n, e, t.child, r);
               else if (32 & s) {
                  const a = ku(t, e);
                  let l;
                  for (; (l = a()); ) r.push(l);
               } else if (16 & s) {
                  const a = Eg(e, t);
                  if (Array.isArray(a)) r.push(...a);
                  else {
                     const l = No(e[16]);
                     Qa(l[1], l, a, r, !0);
                  }
               }
               t = i ? t.projectionNext : t.next;
            }
            return r;
         }
         class jo {
            constructor(e, t) {
               (this._lView = e), (this._cdRefInjectingView = t), (this._appRef = null), (this._attachedToViewContainer = !1);
            }
            get rootNodes() {
               const e = this._lView,
                  t = e[1];
               return Qa(t, e, t.firstChild, []);
            }
            get context() {
               return this._lView[8];
            }
            set context(e) {
               this._lView[8] = e;
            }
            get destroyed() {
               return 128 == (128 & this._lView[2]);
            }
            destroy() {
               if (this._appRef) this._appRef.detachView(this);
               else if (this._attachedToViewContainer) {
                  const e = this._lView[3];
                  if (Qt(e)) {
                     const t = e[8],
                        r = t ? t.indexOf(this) : -1;
                     r > -1 && (ju(e, r), Ta(t, r));
                  }
                  this._attachedToViewContainer = !1;
               }
               mg(this._lView[1], this._lView);
            }
            onDestroy(e) {
               by(this._lView[1], this._lView, null, e);
            }
            markForCheck() {
               wd(this._cdRefInjectingView || this._lView);
            }
            detach() {
               this._lView[2] &= -65;
            }
            reattach() {
               this._lView[2] |= 64;
            }
            detectChanges() {
               Ka(this._lView[1], this._lView, this.context);
            }
            checkNoChanges() {}
            attachToViewContainerRef() {
               if (this._appRef) throw new _(902, !1);
               this._attachedToViewContainer = !0;
            }
            detachFromAppRef() {
               (this._appRef = null),
                  (function rS(n, e) {
                     Oo(n, e, e[Q], 2, null, null);
                  })(this._lView[1], this._lView);
            }
            attachToAppRef(e) {
               if (this._attachedToViewContainer) throw new _(902, !1);
               this._appRef = e;
            }
         }
         class b1 extends jo {
            constructor(e) {
               super(e), (this._view = e);
            }
            detectChanges() {
               const e = this._view;
               Ka(e[1], e, e[8], !1);
            }
            checkNoChanges() {}
            get context() {
               return null;
            }
         }
         class Ry extends Lo {
            constructor(e) {
               super(), (this.ngModule = e);
            }
            resolveComponentFactory(e) {
               const t = ue(e);
               return new Uo(t, this.ngModule);
            }
         }
         function Fy(n) {
            const e = [];
            for (let t in n) n.hasOwnProperty(t) && e.push({ propName: n[t], templateName: t });
            return e;
         }
         class w1 {
            constructor(e, t) {
               (this.injector = e), (this.parentInjector = t);
            }
            get(e, t, r) {
               r = fa(r);
               const i = this.injector.get(e, od, r);
               return i !== od || t === od ? i : this.parentInjector.get(e, t, r);
            }
         }
         class Uo extends Qg {
            constructor(e, t) {
               super(),
                  (this.componentDef = e),
                  (this.ngModule = t),
                  (this.componentType = e.type),
                  (this.selector = (function SI(n) {
                     return n.map(xI).join(",");
                  })(e.selectors)),
                  (this.ngContentSelectors = e.ngContentSelectors ? e.ngContentSelectors : []),
                  (this.isBoundToModule = !!t);
            }
            get inputs() {
               return Fy(this.componentDef.inputs);
            }
            get outputs() {
               return Fy(this.componentDef.outputs);
            }
            create(e, t, r, i) {
               let o = (i = i || this.ngModule) instanceof kn ? i : i?.injector;
               o && null !== this.componentDef.getStandaloneInjector && (o = this.componentDef.getStandaloneInjector(o) || o);
               const s = o ? new w1(e, o) : e,
                  a = s.get(Vo, null);
               if (null === a) throw new _(407, !1);
               const l = s.get(sI, null),
                  c = a.createRenderer(null, this.componentDef),
                  u = this.componentDef.selectors[0][0] || "div",
                  d = r
                     ? (function YI(n, e, t) {
                          return n.selectRootElement(e, t === Kt.ShadowDom);
                       })(c, r, this.componentDef.encapsulation)
                     : Bu(
                          c,
                          u,
                          (function D1(n) {
                             const e = n.toLowerCase();
                             return "svg" === e ? "svg" : "math" === e ? "math" : null;
                          })(u)
                       ),
                  f = this.componentDef.onPush ? 288 : 272,
                  h = yd(0, null, null, 1, 0, null, null, null, null, null),
                  p = Ga(null, h, null, f, null, null, a, c, l, s, null);
               let m, g;
               hu(p);
               try {
                  const v = this.componentDef;
                  let E,
                     y = null;
                  v.findHostDirectiveDefs ? ((E = []), (y = new Map()), v.findHostDirectiveDefs(v, E, y), E.push(v)) : (E = [v]);
                  const T = (function E1(n, e) {
                        const t = n[1];
                        return (n[22] = e), xi(t, 22, 2, "#host", null);
                     })(p, d),
                     ne = (function M1(n, e, t, r, i, o, s, a) {
                        const l = i[1];
                        !(function x1(n, e, t, r) {
                           for (const i of n) e.mergedAttrs = xo(e.mergedAttrs, i.hostAttrs);
                           null !== e.mergedAttrs && (Za(e, e.mergedAttrs, !0), null !== t && Sg(r, t, e));
                        })(r, n, e, s);
                        const c = o.createRenderer(e, t),
                           u = Ga(i, vy(t), null, t.onPush ? 32 : 16, i[n.index], n, o, c, a || null, null, null);
                        return l.firstCreatePass && vd(l, n, r.length - 1), Wa(i, u), (i[n.index] = u);
                     })(T, d, v, E, p, a, c);
                  (g = mm(h, 22)),
                     d &&
                        (function I1(n, e, t, r) {
                           if (r) yu(n, t, ["ng-version", aI.full]);
                           else {
                              const { attrs: i, classes: o } = (function II(n) {
                                 const e = [],
                                    t = [];
                                 let r = 1,
                                    i = 2;
                                 for (; r < n.length; ) {
                                    let o = n[r];
                                    if ("string" == typeof o) 2 === i ? "" !== o && e.push(o, n[++r]) : 8 === i && t.push(o);
                                    else {
                                       if (!Jt(i)) break;
                                       i = o;
                                    }
                                    r++;
                                 }
                                 return { attrs: e, classes: t };
                              })(e.selectors[0]);
                              i && yu(n, t, i), o && o.length > 0 && xg(n, t, o.join(" "));
                           }
                        })(c, v, d, r),
                     void 0 !== t &&
                        (function A1(n, e, t) {
                           const r = (n.projection = []);
                           for (let i = 0; i < e.length; i++) {
                              const o = t[i];
                              r.push(null != o ? Array.from(o) : null);
                           }
                        })(g, this.ngContentSelectors, t),
                     (m = (function S1(n, e, t, r, i, o) {
                        const s = Ze(),
                           a = i[1],
                           l = Et(s, i);
                        Ey(a, i, s, t, null, r);
                        for (let u = 0; u < t.length; u++) nt(Er(i, a, s.directiveStart + u, s), i);
                        My(a, i, s), l && nt(l, i);
                        const c = Er(i, a, s.directiveStart + s.componentOffset, s);
                        if (((n[8] = i[8] = c), null !== o)) for (const u of o) u(c, e);
                        return pd(a, s, n), c;
                     })(ne, v, E, y, p, [T1])),
                     hd(h, p, null);
               } finally {
                  pu();
               }
               return new C1(this.componentType, m, Ci(g, p), p, g);
            }
         }
         class C1 extends eI {
            constructor(e, t, r, i, o) {
               super(),
                  (this.location = r),
                  (this._rootLView = i),
                  (this._tNode = o),
                  (this.instance = t),
                  (this.hostView = this.changeDetectorRef = new b1(i)),
                  (this.componentType = e);
            }
            setInput(e, t) {
               const r = this._tNode.inputs;
               let i;
               if (null !== r && (i = r[e])) {
                  const o = this._rootLView;
                  Ed(o[1], o, i, e, t), Cy(o, this._tNode.index);
               }
            }
            get injector() {
               return new fi(this._tNode, this._rootLView);
            }
            destroy() {
               this.hostView.destroy();
            }
            onDestroy(e) {
               this.hostView.onDestroy(e);
            }
         }
         function T1() {
            const n = Ze();
            Da(D()[1], n);
         }
         function de(n) {
            let e = (function Ny(n) {
                  return Object.getPrototypeOf(n.prototype).constructor;
               })(n.type),
               t = !0;
            const r = [n];
            for (; e; ) {
               let i;
               if (Yt(n)) i = e.ɵcmp || e.ɵdir;
               else {
                  if (e.ɵcmp) throw new _(903, !1);
                  i = e.ɵdir;
               }
               if (i) {
                  if (t) {
                     r.push(i);
                     const s = n;
                     (s.inputs = Md(n.inputs)), (s.declaredInputs = Md(n.declaredInputs)), (s.outputs = Md(n.outputs));
                     const a = i.hostBindings;
                     a && O1(n, a);
                     const l = i.viewQuery,
                        c = i.contentQueries;
                     if (
                        (l && F1(n, l),
                        c && N1(n, c),
                        Wc(n.inputs, i.inputs),
                        Wc(n.declaredInputs, i.declaredInputs),
                        Wc(n.outputs, i.outputs),
                        Yt(i) && i.data.animation)
                     ) {
                        const u = n.data;
                        u.animation = (u.animation || []).concat(i.data.animation);
                     }
                  }
                  const o = i.features;
                  if (o)
                     for (let s = 0; s < o.length; s++) {
                        const a = o[s];
                        a && a.ngInherit && a(n), a === de && (t = !1);
                     }
               }
               e = Object.getPrototypeOf(e);
            }
            !(function R1(n) {
               let e = 0,
                  t = null;
               for (let r = n.length - 1; r >= 0; r--) {
                  const i = n[r];
                  (i.hostVars = e += i.hostVars), (i.hostAttrs = xo(i.hostAttrs, (t = xo(t, i.hostAttrs))));
               }
            })(r);
         }
         function Md(n) {
            return n === An ? {} : n === se ? [] : n;
         }
         function F1(n, e) {
            const t = n.viewQuery;
            n.viewQuery = t
               ? (r, i) => {
                    e(r, i), t(r, i);
                 }
               : e;
         }
         function N1(n, e) {
            const t = n.contentQueries;
            n.contentQueries = t
               ? (r, i, o) => {
                    e(r, i, o), t(r, i, o);
                 }
               : e;
         }
         function O1(n, e) {
            const t = n.hostBindings;
            n.hostBindings = t
               ? (r, i) => {
                    e(r, i), t(r, i);
                 }
               : e;
         }
         let Ya = null;
         function Rr() {
            if (!Ya) {
               const n = ge.Symbol;
               if (n && n.iterator) Ya = n.iterator;
               else {
                  const e = Object.getOwnPropertyNames(Map.prototype);
                  for (let t = 0; t < e.length; ++t) {
                     const r = e[t];
                     "entries" !== r && "size" !== r && Map.prototype[r] === Map.prototype.entries && (Ya = r);
                  }
               }
            }
            return Ya;
         }
         function Ho(n) {
            return !!xd(n) && (Array.isArray(n) || (!(n instanceof Map) && Rr() in n));
         }
         function xd(n) {
            return null !== n && ("function" == typeof n || "object" == typeof n);
         }
         function mn(n, e, t) {
            return (n[e] = t);
         }
         function rt(n, e, t) {
            return !Object.is(n[e], t) && ((n[e] = t), !0);
         }
         function Ii(n, e, t, r) {
            return rt(n, ui(), t) ? e + z(t) + r : q;
         }
         function Nr(n, e, t, r, i, o, s, a) {
            const l = D(),
               c = te(),
               u = n + 22,
               d = c.firstCreatePass
                  ? (function z1(n, e, t, r, i, o, s, a, l) {
                       const c = e.consts,
                          u = xi(e, n, 4, s || null, er(c, a));
                       _d(e, t, u, er(c, l)), Da(e, u);
                       const d = (u.tViews = yd(2, u, r, i, o, e.directiveRegistry, e.pipeRegistry, null, e.schemas, c));
                       return null !== e.queries && (e.queries.template(e, u), (d.queries = e.queries.embeddedTView(u))), u;
                    })(u, c, l, e, t, r, i, o, s)
                  : c.data[u];
            un(d, !1);
            const f = l[Q].createComment("");
            ka(c, l, f, d), nt(f, l), Wa(l, (l[u] = xy(f, l, f, d))), _a(d) && md(c, l, d), null != s && gd(l, d, a);
         }
         function Ie(n, e, t) {
            const r = D();
            return rt(r, ui(), e) && It(te(), we(), r, n, e, r[Q], t, !1), Ie;
         }
         function Sd(n, e, t, r, i) {
            const s = i ? "class" : "style";
            Ed(n, t, e.inputs[s], s, r);
         }
         function b(n, e, t, r) {
            const i = D(),
               o = te(),
               s = 22 + n,
               a = i[Q],
               l = (i[s] = Bu(
                  a,
                  e,
                  (function nx() {
                     return G.lFrame.currentNamespace;
                  })()
               )),
               c = o.firstCreatePass
                  ? (function W1(n, e, t, r, i, o, s) {
                       const a = e.consts,
                          c = xi(e, n, 2, i, er(a, o));
                       return (
                          _d(e, t, c, er(a, s)),
                          null !== c.attrs && Za(c, c.attrs, !1),
                          null !== c.mergedAttrs && Za(c, c.mergedAttrs, !0),
                          null !== e.queries && e.queries.elementStart(e, c),
                          c
                       );
                    })(s, o, i, 0, e, t, r)
                  : o.data[s];
            return (
               un(c, !0),
               Sg(a, l, c),
               32 != (32 & c.flags) && ka(o, i, l, c),
               0 ===
                  (function jM() {
                     return G.lFrame.elementDepthCount;
                  })() && nt(l, i),
               (function UM() {
                  G.lFrame.elementDepthCount++;
               })(),
               _a(c) && (md(o, i, c), pd(o, c, i)),
               null !== r && gd(i, c),
               b
            );
         }
         function C() {
            let n = Ze();
            lu()
               ? (function cu() {
                    G.lFrame.isParent = !1;
                 })()
               : ((n = n.parent), un(n, !1));
            const e = n;
            !(function HM() {
               G.lFrame.elementDepthCount--;
            })();
            const t = te();
            return (
               t.firstCreatePass && (Da(t, n), ou(n) && t.queries.elementEnd(n)),
               null != e.classesWithoutHost &&
                  (function sx(n) {
                     return 0 != (8 & n.flags);
                  })(e) &&
                  Sd(t, e, D(), e.classesWithoutHost, !0),
               null != e.stylesWithoutHost &&
                  (function ax(n) {
                     return 0 != (16 & n.flags);
                  })(e) &&
                  Sd(t, e, D(), e.stylesWithoutHost, !1),
               C
            );
         }
         function B(n, e, t, r) {
            return b(n, e, t, r), C(), B;
         }
         function zo(n) {
            return !!n && "function" == typeof n.then;
         }
         const Td = function Wy(n) {
            return !!n && "function" == typeof n.subscribe;
         };
         function Ce(n, e, t, r) {
            const i = D(),
               o = te(),
               s = Ze();
            return (
               (function Zy(n, e, t, r, i, o, s) {
                  const a = _a(r),
                     c = n.firstCreatePass && Iy(n),
                     u = e[8],
                     d = Sy(e);
                  let f = !0;
                  if (3 & r.type || s) {
                     const m = Et(r, e),
                        g = s ? s(m) : m,
                        v = d.length,
                        E = s ? (T) => s(Ke(T[r.index])) : r.index;
                     let y = null;
                     if (
                        (!s &&
                           a &&
                           (y = (function Q1(n, e, t, r) {
                              const i = n.cleanup;
                              if (null != i)
                                 for (let o = 0; o < i.length - 1; o += 2) {
                                    const s = i[o];
                                    if (s === t && i[o + 1] === r) {
                                       const a = e[7],
                                          l = i[o + 2];
                                       return a.length > l ? a[l] : null;
                                    }
                                    "string" == typeof s && (o += 2);
                                 }
                              return null;
                           })(n, e, i, r.index)),
                        null !== y)
                     )
                        ((y.__ngLastListenerFn__ || y).__ngNextListenerFn__ = o), (y.__ngLastListenerFn__ = o), (f = !1);
                     else {
                        o = Yy(r, e, u, o, !1);
                        const T = t.listen(g, i, o);
                        d.push(o, T), c && c.push(i, E, v, v + 1);
                     }
                  } else o = Yy(r, e, u, o, !1);
                  const h = r.outputs;
                  let p;
                  if (f && null !== h && (p = h[i])) {
                     const m = p.length;
                     if (m)
                        for (let g = 0; g < m; g += 2) {
                           const ne = e[p[g]][p[g + 1]].subscribe(o),
                              oe = d.length;
                           d.push(o, ne), c && c.push(i, r.index, oe, -(oe + 1));
                        }
                  }
               })(o, i, i[Q], s, n, e, r),
               Ce
            );
         }
         function Qy(n, e, t, r) {
            try {
               return !1 !== t(r);
            } catch (i) {
               return Ty(n, i), !1;
            }
         }
         function Yy(n, e, t, r, i) {
            return function o(s) {
               if (s === Function) return r;
               wd(n.componentOffset > -1 ? Mt(n.index, e) : e);
               let l = Qy(e, 0, r, s),
                  c = o.__ngNextListenerFn__;
               for (; c; ) (l = Qy(e, 0, c, s) && l), (c = c.__ngNextListenerFn__);
               return i && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l;
            };
         }
         function Ja(n, e, t) {
            return Go(n, "", e, "", t), Ja;
         }
         function Go(n, e, t, r, i) {
            const o = D(),
               s = Ii(o, e, t, r);
            return s !== q && It(te(), we(), o, n, s, o[Q], i, !1), Go;
         }
         function el(n, e) {
            return (n << 17) | (e << 2);
         }
         function rr(n) {
            return (n >> 17) & 32767;
         }
         function Rd(n) {
            return 2 | n;
         }
         function Or(n) {
            return (131068 & n) >> 2;
         }
         function Fd(n, e) {
            return (-131069 & n) | (e << 2);
         }
         function Nd(n) {
            return 1 | n;
         }
         function s_(n, e, t, r, i) {
            const o = n[t + 1],
               s = null === e;
            let a = r ? rr(o) : Or(o),
               l = !1;
            for (; 0 !== a && (!1 === l || s); ) {
               const u = n[a + 1];
               sA(n[a], e) && ((l = !0), (n[a + 1] = r ? Nd(u) : Rd(u))), (a = r ? rr(u) : Or(u));
            }
            l && (n[t + 1] = r ? Rd(o) : Nd(o));
         }
         function sA(n, e) {
            return null === n || null == e || (Array.isArray(n) ? n[1] : n) === e || (!(!Array.isArray(n) || "string" != typeof e) && yi(n, e) >= 0);
         }
         function tl(n, e) {
            return (
               (function en(n, e, t, r) {
                  const i = D(),
                     o = te(),
                     s = (function Nn(n) {
                        const e = G.lFrame,
                           t = e.bindingIndex;
                        return (e.bindingIndex = e.bindingIndex + n), t;
                     })(2);
                  o.firstUpdatePass &&
                     (function m_(n, e, t, r) {
                        const i = n.data;
                        if (null === i[t + 1]) {
                           const o = i[ut()],
                              s = (function p_(n, e) {
                                 return e >= n.expandoStartIndex;
                              })(n, t);
                           (function v_(n, e) {
                              return 0 != (n.flags & (e ? 8 : 16));
                           })(o, r) &&
                              null === e &&
                              !s &&
                              (e = !1),
                              (e = (function mA(n, e, t, r) {
                                 const i = (function du(n) {
                                    const e = G.lFrame.currentDirectiveIndex;
                                    return -1 === e ? null : n[e];
                                 })(n);
                                 let o = r ? e.residualClasses : e.residualStyles;
                                 if (null === i)
                                    0 === (r ? e.classBindings : e.styleBindings) && ((t = qo((t = Od(null, n, e, t, r)), e.attrs, r)), (o = null));
                                 else {
                                    const s = e.directiveStylingLast;
                                    if (-1 === s || n[s] !== i)
                                       if (((t = Od(i, n, e, t, r)), null === o)) {
                                          let l = (function gA(n, e, t) {
                                             const r = t ? e.classBindings : e.styleBindings;
                                             if (0 !== Or(r)) return n[rr(r)];
                                          })(n, e, r);
                                          void 0 !== l &&
                                             Array.isArray(l) &&
                                             ((l = Od(null, n, e, l[1], r)),
                                             (l = qo(l, e.attrs, r)),
                                             (function yA(n, e, t, r) {
                                                n[rr(t ? e.classBindings : e.styleBindings)] = r;
                                             })(n, e, r, l));
                                       } else
                                          o = (function _A(n, e, t) {
                                             let r;
                                             const i = e.directiveEnd;
                                             for (let o = 1 + e.directiveStylingLast; o < i; o++) r = qo(r, n[o].hostAttrs, t);
                                             return qo(r, e.attrs, t);
                                          })(n, e, r);
                                 }
                                 return void 0 !== o && (r ? (e.residualClasses = o) : (e.residualStyles = o)), t;
                              })(i, o, e, r)),
                              (function iA(n, e, t, r, i, o) {
                                 let s = o ? e.classBindings : e.styleBindings,
                                    a = rr(s),
                                    l = Or(s);
                                 n[r] = t;
                                 let u,
                                    c = !1;
                                 if (Array.isArray(t)) {
                                    const d = t;
                                    (u = d[1]), (null === u || yi(d, u) > 0) && (c = !0);
                                 } else u = t;
                                 if (i)
                                    if (0 !== l) {
                                       const f = rr(n[a + 1]);
                                       (n[r + 1] = el(f, a)),
                                          0 !== f && (n[f + 1] = Fd(n[f + 1], r)),
                                          (n[a + 1] = (function nA(n, e) {
                                             return (131071 & n) | (e << 17);
                                          })(n[a + 1], r));
                                    } else (n[r + 1] = el(a, 0)), 0 !== a && (n[a + 1] = Fd(n[a + 1], r)), (a = r);
                                 else (n[r + 1] = el(l, 0)), 0 === a ? (a = r) : (n[l + 1] = Fd(n[l + 1], r)), (l = r);
                                 c && (n[r + 1] = Rd(n[r + 1])),
                                    s_(n, u, r, !0),
                                    s_(n, u, r, !1),
                                    (function oA(n, e, t, r, i) {
                                       const o = i ? n.residualClasses : n.residualStyles;
                                       null != o && "string" == typeof e && yi(o, e) >= 0 && (t[r + 1] = Nd(t[r + 1]));
                                    })(e, u, n, r, o),
                                    (s = el(a, l)),
                                    o ? (e.classBindings = s) : (e.styleBindings = s);
                              })(i, o, e, t, s, r);
                        }
                     })(o, n, s, r),
                     e !== q &&
                        rt(i, s, e) &&
                        (function y_(n, e, t, r, i, o, s, a) {
                           if (!(3 & e.type)) return;
                           const l = n.data,
                              c = l[a + 1],
                              u = (function rA(n) {
                                 return 1 == (1 & n);
                              })(c)
                                 ? __(l, e, t, i, Or(c), s)
                                 : void 0;
                           nl(u) ||
                              (nl(o) ||
                                 ((function tA(n) {
                                    return 2 == (2 & n);
                                 })(c) &&
                                    (o = __(l, null, t, i, a, s))),
                              (function hS(n, e, t, r, i) {
                                 if (e) i ? n.addClass(t, r) : n.removeClass(t, r);
                                 else {
                                    let o = -1 === r.indexOf("-") ? void 0 : mt.DashCase;
                                    null == i
                                       ? n.removeStyle(t, r, o)
                                       : ("string" == typeof i && i.endsWith("!important") && ((i = i.slice(0, -10)), (o |= mt.Important)),
                                         n.setStyle(t, r, i, o));
                                 }
                              })(r, s, va(ut(), t), i, o));
                        })(
                           o,
                           o.data[ut()],
                           i,
                           i[Q],
                           n,
                           (i[s + 1] = (function DA(n, e) {
                              return null == n || ("string" == typeof e ? (n += e) : "object" == typeof n && (n = he(St(n)))), n;
                           })(e, t)),
                           r,
                           s
                        );
               })(n, e, null, !0),
               tl
            );
         }
         function Od(n, e, t, r, i) {
            let o = null;
            const s = t.directiveEnd;
            let a = t.directiveStylingLast;
            for (-1 === a ? (a = t.directiveStart) : a++; a < s && ((o = e[a]), (r = qo(r, o.hostAttrs, i)), o !== n); ) a++;
            return null !== n && (t.directiveStylingLast = a), r;
         }
         function qo(n, e, t) {
            const r = t ? 1 : 2;
            let i = -1;
            if (null !== e)
               for (let o = 0; o < e.length; o++) {
                  const s = e[o];
                  "number" == typeof s ? (i = s) : i === r && (Array.isArray(n) || (n = void 0 === n ? [] : ["", n]), xt(n, s, !!t || e[++o]));
               }
            return void 0 === n ? null : n;
         }
         function __(n, e, t, r, i, o) {
            const s = null === e;
            let a;
            for (; i > 0; ) {
               const l = n[i],
                  c = Array.isArray(l),
                  u = c ? l[1] : l,
                  d = null === u;
               let f = t[i + 1];
               f === q && (f = d ? se : void 0);
               let h = d ? Mu(f, r) : u === r ? f : void 0;
               if ((c && !nl(h) && (h = Mu(l, r)), nl(h) && ((a = h), s))) return a;
               const p = n[i + 1];
               i = s ? rr(p) : Or(p);
            }
            if (null !== e) {
               let l = o ? e.residualClasses : e.residualStyles;
               null != l && (a = Mu(l, r));
            }
            return a;
         }
         function nl(n) {
            return void 0 !== n;
         }
         function R(n, e = "") {
            const t = D(),
               r = te(),
               i = n + 22,
               o = r.firstCreatePass ? xi(r, i, 1, e, null) : r.data[i],
               s = (t[i] = (function Vu(n, e) {
                  return n.createText(e);
               })(t[Q], e));
            ka(r, t, s, o), un(o, !1);
         }
         function Bn(n) {
            return Wo("", n, ""), Bn;
         }
         function Wo(n, e, t) {
            const r = D(),
               i = Ii(r, n, e, t);
            return (
               i !== q &&
                  (function Vn(n, e, t) {
                     const r = va(e, n);
                     !(function hg(n, e, t) {
                        n.setValue(e, t);
                     })(n[Q], r, t);
                  })(r, ut(), i),
               Wo
            );
         }
         const Vi = "en-US";
         let U_ = Vi;
         function Ld(n, e, t, r, i) {
            if (((n = L(n)), Array.isArray(n))) for (let o = 0; o < n.length; o++) Ld(n[o], e, t, r, i);
            else {
               const o = te(),
                  s = D();
               let a = Ar(n) ? n : L(n.provide),
                  l = Zg(n);
               const c = Ze(),
                  u = 1048575 & c.providerIndexes,
                  d = c.directiveStart,
                  f = c.providerIndexes >> 20;
               if (Ar(n) || !n.multi) {
                  const h = new Mo(l, i, w),
                     p = Bd(a, e, i ? u : u + f, d);
                  -1 === p
                     ? (Du(Sa(c, s), o, a),
                       Vd(o, n, e.length),
                       e.push(a),
                       c.directiveStart++,
                       c.directiveEnd++,
                       i && (c.providerIndexes += 1048576),
                       t.push(h),
                       s.push(h))
                     : ((t[p] = h), (s[p] = h));
               } else {
                  const h = Bd(a, e, u + f, d),
                     p = Bd(a, e, u, u + f),
                     m = h >= 0 && t[h],
                     g = p >= 0 && t[p];
                  if ((i && !g) || (!i && !m)) {
                     Du(Sa(c, s), o, a);
                     const v = (function BT(n, e, t, r, i) {
                        const o = new Mo(n, t, w);
                        return (o.multi = []), (o.index = e), (o.componentProviders = 0), fv(o, i, r && !t), o;
                     })(i ? VT : LT, t.length, i, r, l);
                     !i && g && (t[p].providerFactory = v),
                        Vd(o, n, e.length, 0),
                        e.push(a),
                        c.directiveStart++,
                        c.directiveEnd++,
                        i && (c.providerIndexes += 1048576),
                        t.push(v),
                        s.push(v);
                  } else Vd(o, n, h > -1 ? h : p, fv(t[i ? p : h], l, !i && r));
                  !i && r && g && t[p].componentProviders++;
               }
            }
         }
         function Vd(n, e, t, r) {
            const i = Ar(e),
               o = (function WS(n) {
                  return !!n.useClass;
               })(e);
            if (i || o) {
               const l = (o ? L(e.useClass) : e).prototype.ngOnDestroy;
               if (l) {
                  const c = n.destroyHooks || (n.destroyHooks = []);
                  if (!i && e.multi) {
                     const u = c.indexOf(t);
                     -1 === u ? c.push(t, [r, l]) : c[u + 1].push(r, l);
                  } else c.push(t, l);
               }
            }
         }
         function fv(n, e, t) {
            return t && n.componentProviders++, n.multi.push(e) - 1;
         }
         function Bd(n, e, t, r) {
            for (let i = t; i < r; i++) if (e[i] === n) return i;
            return -1;
         }
         function LT(n, e, t, r) {
            return jd(this.multi, []);
         }
         function VT(n, e, t, r) {
            const i = this.multi;
            let o;
            if (this.providerFactory) {
               const s = this.providerFactory.componentProviders,
                  a = Er(t, t[1], this.providerFactory.index, r);
               (o = a.slice(0, s)), jd(i, o);
               for (let l = s; l < a.length; l++) o.push(a[l]);
            } else (o = []), jd(i, o);
            return o;
         }
         function jd(n, e) {
            for (let t = 0; t < n.length; t++) e.push((0, n[t])());
            return e;
         }
         function be(n, e = []) {
            return (t) => {
               t.providersResolver = (r, i) =>
                  (function PT(n, e, t) {
                     const r = te();
                     if (r.firstCreatePass) {
                        const i = Yt(n);
                        Ld(t, r.data, r.blueprint, i, !0), Ld(e, r.data, r.blueprint, i, !1);
                     }
                  })(r, i ? i(n) : n, e);
            };
         }
         class Bi {}
         class hv {}
         class pv extends Bi {
            constructor(e, t) {
               super(), (this._parent = t), (this._bootstrapComponents = []), (this.destroyCbs = []), (this.componentFactoryResolver = new Ry(this));
               const r = wt(e);
               (this._bootstrapComponents = Ln(r.bootstrap)),
                  (this._r3Injector = cy(
                     e,
                     t,
                     [
                        { provide: Bi, useValue: this },
                        { provide: Lo, useValue: this.componentFactoryResolver },
                     ],
                     he(e),
                     new Set(["environment"])
                  )),
                  this._r3Injector.resolveInjectorInitializers(),
                  (this.instance = this._r3Injector.get(e));
            }
            get injector() {
               return this._r3Injector;
            }
            destroy() {
               const e = this._r3Injector;
               !e.destroyed && e.destroy(), this.destroyCbs.forEach((t) => t()), (this.destroyCbs = null);
            }
            onDestroy(e) {
               this.destroyCbs.push(e);
            }
         }
         class Ud extends hv {
            constructor(e) {
               super(), (this.moduleType = e);
            }
            create(e) {
               return new pv(this.moduleType, e);
            }
         }
         class UT extends Bi {
            constructor(e, t, r) {
               super(), (this.componentFactoryResolver = new Ry(this)), (this.instance = null);
               const i = new Kg(
                  [...e, { provide: Bi, useValue: this }, { provide: Lo, useValue: this.componentFactoryResolver }],
                  t || $a(),
                  r,
                  new Set(["environment"])
               );
               (this.injector = i), i.resolveInjectorInitializers();
            }
            destroy() {
               this.injector.destroy();
            }
            onDestroy(e) {
               this.injector.onDestroy(e);
            }
         }
         function al(n, e, t = null) {
            return new UT(n, e, t).injector;
         }
         let HT = (() => {
            class n {
               constructor(t) {
                  (this._injector = t), (this.cachedInjectors = new Map());
               }
               getOrCreateStandaloneInjector(t) {
                  if (!t.standalone) return null;
                  if (!this.cachedInjectors.has(t.id)) {
                     const r = zg(0, t.type),
                        i = r.length > 0 ? al([r], this._injector, `Standalone[${t.type.name}]`) : null;
                     this.cachedInjectors.set(t.id, i);
                  }
                  return this.cachedInjectors.get(t.id);
               }
               ngOnDestroy() {
                  try {
                     for (const t of this.cachedInjectors.values()) null !== t && t.destroy();
                  } finally {
                     this.cachedInjectors.clear();
                  }
               }
            }
            return (n.ɵprov = N({ token: n, providedIn: "environment", factory: () => new n(M(kn)) })), n;
         })();
         function mv(n) {
            n.getStandaloneInjector = (e) => e.get(HT).getOrCreateStandaloneInjector(n);
         }
         function _t(n, e, t, r) {
            return (function Cv(n, e, t, r, i, o) {
               const s = e + t;
               return rt(n, s, i) ? mn(n, s + 1, o ? r.call(o, i) : r(i)) : Jo(n, s + 1);
            })(D(), ct(), n, e, t, r);
         }
         function wv(n, e, t, r, i) {
            return (function Ev(n, e, t, r, i, o, s) {
               const a = e + t;
               return (function Fr(n, e, t, r) {
                  const i = rt(n, e, t);
                  return rt(n, e + 1, r) || i;
               })(n, a, i, o)
                  ? mn(n, a + 2, s ? r.call(s, i, o) : r(i, o))
                  : Jo(n, a + 2);
            })(D(), ct(), n, e, t, r, i);
         }
         function Jo(n, e) {
            const t = n[e];
            return t === q ? void 0 : t;
         }
         function $d(n) {
            return (e) => {
               setTimeout(n, void 0, e);
            };
         }
         const ve = class fR extends ln {
            constructor(e = !1) {
               super(), (this.__isAsync = e);
            }
            emit(e) {
               super.next(e);
            }
            subscribe(e, t, r) {
               let i = e,
                  o = t || (() => null),
                  s = r;
               if (e && "object" == typeof e) {
                  const l = e;
                  (i = l.next?.bind(l)), (o = l.error?.bind(l)), (s = l.complete?.bind(l));
               }
               this.__isAsync && ((o = $d(o)), i && (i = $d(i)), s && (s = $d(s)));
               const a = super.subscribe({ next: i, error: o, complete: s });
               return e instanceof bt && e.add(a), a;
            }
         };
         function hR() {
            return this._results[Rr()]();
         }
         class zd {
            constructor(e = !1) {
               (this._emitDistinctChangesOnly = e),
                  (this.dirty = !0),
                  (this._results = []),
                  (this._changesDetected = !1),
                  (this._changes = null),
                  (this.length = 0),
                  (this.first = void 0),
                  (this.last = void 0);
               const t = Rr(),
                  r = zd.prototype;
               r[t] || (r[t] = hR);
            }
            get changes() {
               return this._changes || (this._changes = new ve());
            }
            get(e) {
               return this._results[e];
            }
            map(e) {
               return this._results.map(e);
            }
            filter(e) {
               return this._results.filter(e);
            }
            find(e) {
               return this._results.find(e);
            }
            reduce(e, t) {
               return this._results.reduce(e, t);
            }
            forEach(e) {
               this._results.forEach(e);
            }
            some(e) {
               return this._results.some(e);
            }
            toArray() {
               return this._results.slice();
            }
            toString() {
               return this._results.toString();
            }
            reset(e, t) {
               const r = this;
               r.dirty = !1;
               const i = (function Vt(n) {
                  return n.flat(Number.POSITIVE_INFINITY);
               })(e);
               (this._changesDetected = !(function yx(n, e, t) {
                  if (n.length !== e.length) return !1;
                  for (let r = 0; r < n.length; r++) {
                     let i = n[r],
                        o = e[r];
                     if ((t && ((i = t(i)), (o = t(o))), o !== i)) return !1;
                  }
                  return !0;
               })(r._results, i, t)) && ((r._results = i), (r.length = i.length), (r.last = i[this.length - 1]), (r.first = i[0]));
            }
            notifyOnChanges() {
               this._changes && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this);
            }
            setDirty() {
               this.dirty = !0;
            }
            destroy() {
               this.changes.complete(), this.changes.unsubscribe();
            }
         }
         let jn = (() => {
            class n {}
            return (n.__NG_ELEMENT_ID__ = gR), n;
         })();
         const pR = jn,
            mR = class extends pR {
               constructor(e, t, r) {
                  super(), (this._declarationLView = e), (this._declarationTContainer = t), (this.elementRef = r);
               }
               createEmbeddedView(e, t) {
                  const r = this._declarationTContainer.tViews,
                     i = Ga(this._declarationLView, r, e, 16, null, r.declTNode, null, null, null, null, t || null);
                  i[17] = this._declarationLView[this._declarationTContainer.index];
                  const s = this._declarationLView[19];
                  return null !== s && (i[19] = s.createEmbeddedView(r)), hd(r, i, e), new jo(i);
               }
            };
         function gR() {
            return ll(Ze(), D());
         }
         function ll(n, e) {
            return 4 & n.type ? new mR(e, n, Ci(n, e)) : null;
         }
         let nn = (() => {
            class n {}
            return (n.__NG_ELEMENT_ID__ = yR), n;
         })();
         function yR() {
            return Tv(Ze(), D());
         }
         const _R = nn,
            Iv = class extends _R {
               constructor(e, t, r) {
                  super(), (this._lContainer = e), (this._hostTNode = t), (this._hostLView = r);
               }
               get element() {
                  return Ci(this._hostTNode, this._hostLView);
               }
               get injector() {
                  return new fi(this._hostTNode, this._hostLView);
               }
               get parentInjector() {
                  const e = bu(this._hostTNode, this._hostLView);
                  if (Nm(e)) {
                     const t = Ma(e, this._hostLView),
                        r = Ea(e);
                     return new fi(t[1].data[r + 8], t);
                  }
                  return new fi(null, this._hostLView);
               }
               clear() {
                  for (; this.length > 0; ) this.remove(this.length - 1);
               }
               get(e) {
                  const t = Av(this._lContainer);
                  return (null !== t && t[e]) || null;
               }
               get length() {
                  return this._lContainer.length - 10;
               }
               createEmbeddedView(e, t, r) {
                  let i, o;
                  "number" == typeof r ? (i = r) : null != r && ((i = r.index), (o = r.injector));
                  const s = e.createEmbeddedView(t || {}, o);
                  return this.insert(s, i), s;
               }
               createComponent(e, t, r, i, o) {
                  const s =
                     e &&
                     !(function Io(n) {
                        return "function" == typeof n;
                     })(e);
                  let a;
                  if (s) a = t;
                  else {
                     const d = t || {};
                     (a = d.index), (r = d.injector), (i = d.projectableNodes), (o = d.environmentInjector || d.ngModuleRef);
                  }
                  const l = s ? e : new Uo(ue(e)),
                     c = r || this.parentInjector;
                  if (!o && null == l.ngModule) {
                     const f = (s ? c : this.parentInjector).get(kn, null);
                     f && (o = f);
                  }
                  const u = l.create(c, i, void 0, o);
                  return this.insert(u.hostView, a), u;
               }
               insert(e, t) {
                  const r = e._lView,
                     i = r[1];
                  if (
                     (function BM(n) {
                        return Qt(n[3]);
                     })(r)
                  ) {
                     const u = this.indexOf(e);
                     if (-1 !== u) this.detach(u);
                     else {
                        const d = r[3],
                           f = new Iv(d, d[6], d[3]);
                        f.detach(f.indexOf(e));
                     }
                  }
                  const o = this._adjustIndex(t),
                     s = this._lContainer;
                  !(function oS(n, e, t, r) {
                     const i = 10 + r,
                        o = t.length;
                     r > 0 && (t[i - 1][4] = e), r < o - 10 ? ((e[4] = t[i]), Gm(t, 10 + r, e)) : (t.push(e), (e[4] = null)), (e[3] = t);
                     const s = e[17];
                     null !== s &&
                        t !== s &&
                        (function sS(n, e) {
                           const t = n[9];
                           e[16] !== e[3][3][16] && (n[2] = !0), null === t ? (n[9] = [e]) : t.push(e);
                        })(s, e);
                     const a = e[19];
                     null !== a && a.insertView(n), (e[2] |= 64);
                  })(i, r, s, o);
                  const a = $u(o, s),
                     l = r[Q],
                     c = Oa(l, s[7]);
                  return (
                     null !== c &&
                        (function nS(n, e, t, r, i, o) {
                           (r[0] = i), (r[6] = e), Oo(n, r, t, 1, i, o);
                        })(i, s[6], l, r, c, a),
                     e.attachToViewContainerRef(),
                     Gm(Gd(s), o, e),
                     e
                  );
               }
               move(e, t) {
                  return this.insert(e, t);
               }
               indexOf(e) {
                  const t = Av(this._lContainer);
                  return null !== t ? t.indexOf(e) : -1;
               }
               remove(e) {
                  const t = this._adjustIndex(e, -1),
                     r = ju(this._lContainer, t);
                  r && (Ta(Gd(this._lContainer), t), mg(r[1], r));
               }
               detach(e) {
                  const t = this._adjustIndex(e, -1),
                     r = ju(this._lContainer, t);
                  return r && null != Ta(Gd(this._lContainer), t) ? new jo(r) : null;
               }
               _adjustIndex(e, t = 0) {
                  return e ?? this.length + t;
               }
            };
         function Av(n) {
            return n[8];
         }
         function Gd(n) {
            return n[8] || (n[8] = []);
         }
         function Tv(n, e) {
            let t;
            const r = e[n.index];
            if (Qt(r)) t = r;
            else {
               let i;
               if (8 & n.type) i = Ke(r);
               else {
                  const o = e[Q];
                  i = o.createComment("");
                  const s = Et(n, e);
                  xr(
                     o,
                     Oa(o, s),
                     i,
                     (function uS(n, e) {
                        return n.nextSibling(e);
                     })(o, s),
                     !1
                  );
               }
               (e[n.index] = t = xy(r, e, i, n)), Wa(e, t);
            }
            return new Iv(t, n, e);
         }
         class qd {
            constructor(e) {
               (this.queryList = e), (this.matches = null);
            }
            clone() {
               return new qd(this.queryList);
            }
            setDirty() {
               this.queryList.setDirty();
            }
         }
         class Wd {
            constructor(e = []) {
               this.queries = e;
            }
            createEmbeddedView(e) {
               const t = e.queries;
               if (null !== t) {
                  const r = null !== e.contentQueries ? e.contentQueries[0] : t.length,
                     i = [];
                  for (let o = 0; o < r; o++) {
                     const s = t.getByIndex(o);
                     i.push(this.queries[s.indexInDeclarationView].clone());
                  }
                  return new Wd(i);
               }
               return null;
            }
            insertView(e) {
               this.dirtyQueriesWithMatches(e);
            }
            detachView(e) {
               this.dirtyQueriesWithMatches(e);
            }
            dirtyQueriesWithMatches(e) {
               for (let t = 0; t < this.queries.length; t++) null !== Pv(e, t).matches && this.queries[t].setDirty();
            }
         }
         class Rv {
            constructor(e, t, r = null) {
               (this.predicate = e), (this.flags = t), (this.read = r);
            }
         }
         class Kd {
            constructor(e = []) {
               this.queries = e;
            }
            elementStart(e, t) {
               for (let r = 0; r < this.queries.length; r++) this.queries[r].elementStart(e, t);
            }
            elementEnd(e) {
               for (let t = 0; t < this.queries.length; t++) this.queries[t].elementEnd(e);
            }
            embeddedTView(e) {
               let t = null;
               for (let r = 0; r < this.length; r++) {
                  const i = null !== t ? t.length : 0,
                     o = this.getByIndex(r).embeddedTView(e, i);
                  o && ((o.indexInDeclarationView = r), null !== t ? t.push(o) : (t = [o]));
               }
               return null !== t ? new Kd(t) : null;
            }
            template(e, t) {
               for (let r = 0; r < this.queries.length; r++) this.queries[r].template(e, t);
            }
            getByIndex(e) {
               return this.queries[e];
            }
            get length() {
               return this.queries.length;
            }
            track(e) {
               this.queries.push(e);
            }
         }
         class Zd {
            constructor(e, t = -1) {
               (this.metadata = e),
                  (this.matches = null),
                  (this.indexInDeclarationView = -1),
                  (this.crossesNgTemplate = !1),
                  (this._appliesToNextNode = !0),
                  (this._declarationNodeIndex = t);
            }
            elementStart(e, t) {
               this.isApplyingToNode(t) && this.matchTNode(e, t);
            }
            elementEnd(e) {
               this._declarationNodeIndex === e.index && (this._appliesToNextNode = !1);
            }
            template(e, t) {
               this.elementStart(e, t);
            }
            embeddedTView(e, t) {
               return this.isApplyingToNode(e) ? ((this.crossesNgTemplate = !0), this.addMatch(-e.index, t), new Zd(this.metadata)) : null;
            }
            isApplyingToNode(e) {
               if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
                  const t = this._declarationNodeIndex;
                  let r = e.parent;
                  for (; null !== r && 8 & r.type && r.index !== t; ) r = r.parent;
                  return t === (null !== r ? r.index : -1);
               }
               return this._appliesToNextNode;
            }
            matchTNode(e, t) {
               const r = this.metadata.predicate;
               if (Array.isArray(r))
                  for (let i = 0; i < r.length; i++) {
                     const o = r[i];
                     this.matchTNodeWithReadOption(e, t, vR(t, o)), this.matchTNodeWithReadOption(e, t, Ia(t, e, o, !1, !1));
                  }
               else r === jn ? 4 & t.type && this.matchTNodeWithReadOption(e, t, -1) : this.matchTNodeWithReadOption(e, t, Ia(t, e, r, !1, !1));
            }
            matchTNodeWithReadOption(e, t, r) {
               if (null !== r) {
                  const i = this.metadata.read;
                  if (null !== i)
                     if (i === yt || i === nn || (i === jn && 4 & t.type)) this.addMatch(t.index, -2);
                     else {
                        const o = Ia(t, e, i, !1, !1);
                        null !== o && this.addMatch(t.index, o);
                     }
                  else this.addMatch(t.index, r);
               }
            }
            addMatch(e, t) {
               null === this.matches ? (this.matches = [e, t]) : this.matches.push(e, t);
            }
         }
         function vR(n, e) {
            const t = n.localNames;
            if (null !== t) for (let r = 0; r < t.length; r += 2) if (t[r] === e) return t[r + 1];
            return null;
         }
         function DR(n, e, t, r) {
            return -1 === t
               ? (function bR(n, e) {
                    return 11 & n.type ? Ci(n, e) : 4 & n.type ? ll(n, e) : null;
                 })(e, n)
               : -2 === t
               ? (function wR(n, e, t) {
                    return t === yt ? Ci(e, n) : t === jn ? ll(e, n) : t === nn ? Tv(e, n) : void 0;
                 })(n, e, r)
               : Er(n, n[1], t, e);
         }
         function Fv(n, e, t, r) {
            const i = e[19].queries[r];
            if (null === i.matches) {
               const o = n.data,
                  s = t.matches,
                  a = [];
               for (let l = 0; l < s.length; l += 2) {
                  const c = s[l];
                  a.push(c < 0 ? null : DR(e, o[c], s[l + 1], t.metadata.read));
               }
               i.matches = a;
            }
            return i.matches;
         }
         function Qd(n, e, t, r) {
            const i = n.queries.getByIndex(t),
               o = i.matches;
            if (null !== o) {
               const s = Fv(n, e, i, t);
               for (let a = 0; a < o.length; a += 2) {
                  const l = o[a];
                  if (l > 0) r.push(s[a / 2]);
                  else {
                     const c = o[a + 1],
                        u = e[-l];
                     for (let d = 10; d < u.length; d++) {
                        const f = u[d];
                        f[17] === f[3] && Qd(f[1], f, c, r);
                     }
                     if (null !== u[9]) {
                        const d = u[9];
                        for (let f = 0; f < d.length; f++) {
                           const h = d[f];
                           Qd(h[1], h, c, r);
                        }
                     }
                  }
               }
            }
            return r;
         }
         function Pr(n) {
            const e = D(),
               t = te(),
               r = Cm();
            fu(r + 1);
            const i = Pv(t, r);
            if (
               n.dirty &&
               (function VM(n) {
                  return 4 == (4 & n[2]);
               })(e) ===
                  (2 == (2 & i.metadata.flags))
            ) {
               if (null === i.matches) n.reset([]);
               else {
                  const o = i.crossesNgTemplate ? Qd(t, e, r, []) : Fv(t, e, i, r);
                  n.reset(o, iI), n.notifyOnChanges();
               }
               return !0;
            }
            return !1;
         }
         function ji(n, e, t) {
            const r = te();
            r.firstCreatePass &&
               ((function kv(n, e, t) {
                  null === n.queries && (n.queries = new Kd()), n.queries.track(new Zd(e, t));
               })(r, new Rv(n, e, t), -1),
               2 == (2 & e) && (r.staticViewQueries = !0)),
               (function Ov(n, e, t) {
                  const r = new zd(4 == (4 & t));
                  by(n, e, r, r.destroy), null === e[19] && (e[19] = new Wd()), e[19].queries.push(new qd(r));
               })(r, D(), e);
         }
         function Lr() {
            return (function CR(n, e) {
               return n[19].queries[e].queryList;
            })(D(), Cm());
         }
         function Pv(n, e) {
            return n.queries.getByIndex(e);
         }
         function ul(...n) {}
         const dl = new x("Application Initializer");
         let fl = (() => {
            class n {
               constructor(t) {
                  (this.appInits = t),
                     (this.resolve = ul),
                     (this.reject = ul),
                     (this.initialized = !1),
                     (this.done = !1),
                     (this.donePromise = new Promise((r, i) => {
                        (this.resolve = r), (this.reject = i);
                     }));
               }
               runInitializers() {
                  if (this.initialized) return;
                  const t = [],
                     r = () => {
                        (this.done = !0), this.resolve();
                     };
                  if (this.appInits)
                     for (let i = 0; i < this.appInits.length; i++) {
                        const o = this.appInits[i]();
                        if (zo(o)) t.push(o);
                        else if (Td(o)) {
                           const s = new Promise((a, l) => {
                              o.subscribe({ complete: a, error: l });
                           });
                           t.push(s);
                        }
                     }
                  Promise.all(t)
                     .then(() => {
                        r();
                     })
                     .catch((i) => {
                        this.reject(i);
                     }),
                     0 === t.length && r(),
                     (this.initialized = !0);
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)(M(dl, 8));
               }),
               (n.ɵprov = N({ token: n, factory: n.ɵfac, providedIn: "root" })),
               n
            );
         })();
         const ns = new x("AppId", {
            providedIn: "root",
            factory: function tb() {
               return `${tf()}${tf()}${tf()}`;
            },
         });
         function tf() {
            return String.fromCharCode(97 + Math.floor(25 * Math.random()));
         }
         const nb = new x("Platform Initializer"),
            nf = new x("Platform ID", { providedIn: "platform", factory: () => "unknown" }),
            rb = new x("appBootstrapListener"),
            ib = new x("AnimationModuleType");
         let GR = (() => {
            class n {
               log(t) {
                  console.log(t);
               }
               warn(t) {
                  console.warn(t);
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)();
               }),
               (n.ɵprov = N({ token: n, factory: n.ɵfac, providedIn: "platform" })),
               n
            );
         })();
         const vn = new x("LocaleId", {
            providedIn: "root",
            factory: () =>
               X(vn, V.Optional | V.SkipSelf) ||
               (function qR() {
                  return (typeof $localize < "u" && $localize.locale) || Vi;
               })(),
         });
         class KR {
            constructor(e, t) {
               (this.ngModuleFactory = e), (this.componentFactories = t);
            }
         }
         let ob = (() => {
            class n {
               compileModuleSync(t) {
                  return new Ud(t);
               }
               compileModuleAsync(t) {
                  return Promise.resolve(this.compileModuleSync(t));
               }
               compileModuleAndAllComponentsSync(t) {
                  const r = this.compileModuleSync(t),
                     o = Ln(wt(t).declarations).reduce((s, a) => {
                        const l = ue(a);
                        return l && s.push(new Uo(l)), s;
                     }, []);
                  return new KR(r, o);
               }
               compileModuleAndAllComponentsAsync(t) {
                  return Promise.resolve(this.compileModuleAndAllComponentsSync(t));
               }
               clearCache() {}
               clearCacheFor(t) {}
               getModuleId(t) {}
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)();
               }),
               (n.ɵprov = N({ token: n, factory: n.ɵfac, providedIn: "root" })),
               n
            );
         })();
         const YR = (() => Promise.resolve(0))();
         function rf(n) {
            typeof Zone > "u"
               ? YR.then(() => {
                    n && n.apply(null, null);
                 })
               : Zone.current.scheduleMicroTask("scheduleMicrotask", n);
         }
         class Ee {
            constructor({ enableLongStackTrace: e = !1, shouldCoalesceEventChangeDetection: t = !1, shouldCoalesceRunChangeDetection: r = !1 }) {
               if (
                  ((this.hasPendingMacrotasks = !1),
                  (this.hasPendingMicrotasks = !1),
                  (this.isStable = !0),
                  (this.onUnstable = new ve(!1)),
                  (this.onMicrotaskEmpty = new ve(!1)),
                  (this.onStable = new ve(!1)),
                  (this.onError = new ve(!1)),
                  typeof Zone > "u")
               )
                  throw new _(908, !1);
               Zone.assertZonePatched();
               const i = this;
               (i._nesting = 0),
                  (i._outer = i._inner = Zone.current),
                  Zone.TaskTrackingZoneSpec && (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
                  e && Zone.longStackTraceZoneSpec && (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
                  (i.shouldCoalesceEventChangeDetection = !r && t),
                  (i.shouldCoalesceRunChangeDetection = r),
                  (i.lastRequestAnimationFrameId = -1),
                  (i.nativeRequestAnimationFrame = (function XR() {
                     let n = ge.requestAnimationFrame,
                        e = ge.cancelAnimationFrame;
                     if (typeof Zone < "u" && n && e) {
                        const t = n[Zone.__symbol__("OriginalDelegate")];
                        t && (n = t);
                        const r = e[Zone.__symbol__("OriginalDelegate")];
                        r && (e = r);
                     }
                     return { nativeRequestAnimationFrame: n, nativeCancelAnimationFrame: e };
                  })().nativeRequestAnimationFrame),
                  (function tF(n) {
                     const e = () => {
                        !(function eF(n) {
                           n.isCheckStableRunning ||
                              -1 !== n.lastRequestAnimationFrameId ||
                              ((n.lastRequestAnimationFrameId = n.nativeRequestAnimationFrame.call(ge, () => {
                                 n.fakeTopEventTask ||
                                    (n.fakeTopEventTask = Zone.root.scheduleEventTask(
                                       "fakeTopEventTask",
                                       () => {
                                          (n.lastRequestAnimationFrameId = -1), af(n), (n.isCheckStableRunning = !0), sf(n), (n.isCheckStableRunning = !1);
                                       },
                                       void 0,
                                       () => {},
                                       () => {}
                                    )),
                                    n.fakeTopEventTask.invoke();
                              })),
                              af(n));
                        })(n);
                     };
                     n._inner = n._inner.fork({
                        name: "angular",
                        properties: { isAngularZone: !0 },
                        onInvokeTask: (t, r, i, o, s, a) => {
                           try {
                              return lb(n), t.invokeTask(i, o, s, a);
                           } finally {
                              ((n.shouldCoalesceEventChangeDetection && "eventTask" === o.type) || n.shouldCoalesceRunChangeDetection) && e(), cb(n);
                           }
                        },
                        onInvoke: (t, r, i, o, s, a, l) => {
                           try {
                              return lb(n), t.invoke(i, o, s, a, l);
                           } finally {
                              n.shouldCoalesceRunChangeDetection && e(), cb(n);
                           }
                        },
                        onHasTask: (t, r, i, o) => {
                           t.hasTask(i, o),
                              r === i &&
                                 ("microTask" == o.change
                                    ? ((n._hasPendingMicrotasks = o.microTask), af(n), sf(n))
                                    : "macroTask" == o.change && (n.hasPendingMacrotasks = o.macroTask));
                        },
                        onHandleError: (t, r, i, o) => (t.handleError(i, o), n.runOutsideAngular(() => n.onError.emit(o)), !1),
                     });
                  })(i);
            }
            static isInAngularZone() {
               return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
            }
            static assertInAngularZone() {
               if (!Ee.isInAngularZone()) throw new _(909, !1);
            }
            static assertNotInAngularZone() {
               if (Ee.isInAngularZone()) throw new _(909, !1);
            }
            run(e, t, r) {
               return this._inner.run(e, t, r);
            }
            runTask(e, t, r, i) {
               const o = this._inner,
                  s = o.scheduleEventTask("NgZoneEvent: " + i, e, JR, ul, ul);
               try {
                  return o.runTask(s, t, r);
               } finally {
                  o.cancelTask(s);
               }
            }
            runGuarded(e, t, r) {
               return this._inner.runGuarded(e, t, r);
            }
            runOutsideAngular(e) {
               return this._outer.run(e);
            }
         }
         const JR = {};
         function sf(n) {
            if (0 == n._nesting && !n.hasPendingMicrotasks && !n.isStable)
               try {
                  n._nesting++, n.onMicrotaskEmpty.emit(null);
               } finally {
                  if ((n._nesting--, !n.hasPendingMicrotasks))
                     try {
                        n.runOutsideAngular(() => n.onStable.emit(null));
                     } finally {
                        n.isStable = !0;
                     }
               }
         }
         function af(n) {
            n.hasPendingMicrotasks = !!(
               n._hasPendingMicrotasks ||
               ((n.shouldCoalesceEventChangeDetection || n.shouldCoalesceRunChangeDetection) && -1 !== n.lastRequestAnimationFrameId)
            );
         }
         function lb(n) {
            n._nesting++, n.isStable && ((n.isStable = !1), n.onUnstable.emit(null));
         }
         function cb(n) {
            n._nesting--, sf(n);
         }
         class nF {
            constructor() {
               (this.hasPendingMicrotasks = !1),
                  (this.hasPendingMacrotasks = !1),
                  (this.isStable = !0),
                  (this.onUnstable = new ve()),
                  (this.onMicrotaskEmpty = new ve()),
                  (this.onStable = new ve()),
                  (this.onError = new ve());
            }
            run(e, t, r) {
               return e.apply(t, r);
            }
            runGuarded(e, t, r) {
               return e.apply(t, r);
            }
            runOutsideAngular(e) {
               return e();
            }
            runTask(e, t, r, i) {
               return e.apply(t, r);
            }
         }
         const ub = new x(""),
            hl = new x("");
         let uf,
            lf = (() => {
               class n {
                  constructor(t, r, i) {
                     (this._ngZone = t),
                        (this.registry = r),
                        (this._pendingCount = 0),
                        (this._isZoneStable = !0),
                        (this._didWork = !1),
                        (this._callbacks = []),
                        (this.taskTrackingZone = null),
                        uf ||
                           ((function rF(n) {
                              uf = n;
                           })(i),
                           i.addToWindow(r)),
                        this._watchAngularEvents(),
                        t.run(() => {
                           this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone");
                        });
                  }
                  _watchAngularEvents() {
                     this._ngZone.onUnstable.subscribe({
                        next: () => {
                           (this._didWork = !0), (this._isZoneStable = !1);
                        },
                     }),
                        this._ngZone.runOutsideAngular(() => {
                           this._ngZone.onStable.subscribe({
                              next: () => {
                                 Ee.assertNotInAngularZone(),
                                    rf(() => {
                                       (this._isZoneStable = !0), this._runCallbacksIfReady();
                                    });
                              },
                           });
                        });
                  }
                  increasePendingRequestCount() {
                     return (this._pendingCount += 1), (this._didWork = !0), this._pendingCount;
                  }
                  decreasePendingRequestCount() {
                     if (((this._pendingCount -= 1), this._pendingCount < 0)) throw new Error("pending async requests below zero");
                     return this._runCallbacksIfReady(), this._pendingCount;
                  }
                  isStable() {
                     return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks;
                  }
                  _runCallbacksIfReady() {
                     if (this.isStable())
                        rf(() => {
                           for (; 0 !== this._callbacks.length; ) {
                              let t = this._callbacks.pop();
                              clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                           }
                           this._didWork = !1;
                        });
                     else {
                        let t = this.getPendingTasks();
                        (this._callbacks = this._callbacks.filter((r) => !r.updateCb || !r.updateCb(t) || (clearTimeout(r.timeoutId), !1))),
                           (this._didWork = !0);
                     }
                  }
                  getPendingTasks() {
                     return this.taskTrackingZone
                        ? this.taskTrackingZone.macroTasks.map((t) => ({ source: t.source, creationLocation: t.creationLocation, data: t.data }))
                        : [];
                  }
                  addCallback(t, r, i) {
                     let o = -1;
                     r &&
                        r > 0 &&
                        (o = setTimeout(() => {
                           (this._callbacks = this._callbacks.filter((s) => s.timeoutId !== o)), t(this._didWork, this.getPendingTasks());
                        }, r)),
                        this._callbacks.push({ doneCb: t, timeoutId: o, updateCb: i });
                  }
                  whenStable(t, r, i) {
                     if (i && !this.taskTrackingZone)
                        throw new Error(
                           'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                        );
                     this.addCallback(t, r, i), this._runCallbacksIfReady();
                  }
                  getPendingRequestCount() {
                     return this._pendingCount;
                  }
                  registerApplication(t) {
                     this.registry.registerApplication(t, this);
                  }
                  unregisterApplication(t) {
                     this.registry.unregisterApplication(t);
                  }
                  findProviders(t, r, i) {
                     return [];
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)(M(Ee), M(cf), M(hl));
                  }),
                  (n.ɵprov = N({ token: n, factory: n.ɵfac })),
                  n
               );
            })(),
            cf = (() => {
               class n {
                  constructor() {
                     this._applications = new Map();
                  }
                  registerApplication(t, r) {
                     this._applications.set(t, r);
                  }
                  unregisterApplication(t) {
                     this._applications.delete(t);
                  }
                  unregisterAllApplications() {
                     this._applications.clear();
                  }
                  getTestability(t) {
                     return this._applications.get(t) || null;
                  }
                  getAllTestabilities() {
                     return Array.from(this._applications.values());
                  }
                  getAllRootElements() {
                     return Array.from(this._applications.keys());
                  }
                  findTestabilityInTree(t, r = !0) {
                     return uf?.findTestabilityInTree(this, t, r) ?? null;
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)();
                  }),
                  (n.ɵprov = N({ token: n, factory: n.ɵfac, providedIn: "platform" })),
                  n
               );
            })(),
            ir = null;
         const db = new x("AllowMultipleToken"),
            df = new x("PlatformDestroyListeners");
         class fb {
            constructor(e, t) {
               (this.name = e), (this.token = t);
            }
         }
         function pb(n, e, t = []) {
            const r = `Platform: ${e}`,
               i = new x(r);
            return (o = []) => {
               let s = ff();
               if (!s || s.injector.get(db, !1)) {
                  const a = [...t, ...o, { provide: i, useValue: !0 }];
                  n
                     ? n(a)
                     : (function sF(n) {
                          if (ir && !ir.get(db, !1)) throw new _(400, !1);
                          ir = n;
                          const e = n.get(gb);
                          (function hb(n) {
                             const e = n.get(nb, null);
                             e && e.forEach((t) => t());
                          })(n);
                       })(
                          (function mb(n = [], e) {
                             return Bt.create({
                                name: e,
                                providers: [{ provide: td, useValue: "platform" }, { provide: df, useValue: new Set([() => (ir = null)]) }, ...n],
                             });
                          })(a, r)
                       );
               }
               return (function lF(n) {
                  const e = ff();
                  if (!e) throw new _(401, !1);
                  return e;
               })();
            };
         }
         function ff() {
            return ir?.get(gb) ?? null;
         }
         let gb = (() => {
            class n {
               constructor(t) {
                  (this._injector = t), (this._modules = []), (this._destroyListeners = []), (this._destroyed = !1);
               }
               bootstrapModuleFactory(t, r) {
                  const i = (function _b(n, e) {
                        let t;
                        return (t = "noop" === n ? new nF() : ("zone.js" === n ? void 0 : n) || new Ee(e)), t;
                     })(
                        r?.ngZone,
                        (function yb(n) {
                           return {
                              enableLongStackTrace: !1,
                              shouldCoalesceEventChangeDetection: !(!n || !n.ngZoneEventCoalescing) || !1,
                              shouldCoalesceRunChangeDetection: !(!n || !n.ngZoneRunCoalescing) || !1,
                           };
                        })(r)
                     ),
                     o = [{ provide: Ee, useValue: i }];
                  return i.run(() => {
                     const s = Bt.create({ providers: o, parent: this.injector, name: t.moduleType.name }),
                        a = t.create(s),
                        l = a.injector.get(nr, null);
                     if (!l) throw new _(402, !1);
                     return (
                        i.runOutsideAngular(() => {
                           const c = i.onError.subscribe({
                              next: (u) => {
                                 l.handleError(u);
                              },
                           });
                           a.onDestroy(() => {
                              pl(this._modules, a), c.unsubscribe();
                           });
                        }),
                        (function vb(n, e, t) {
                           try {
                              const r = t();
                              return zo(r)
                                 ? r.catch((i) => {
                                      throw (e.runOutsideAngular(() => n.handleError(i)), i);
                                   })
                                 : r;
                           } catch (r) {
                              throw (e.runOutsideAngular(() => n.handleError(r)), r);
                           }
                        })(l, i, () => {
                           const c = a.injector.get(fl);
                           return (
                              c.runInitializers(),
                              c.donePromise.then(
                                 () => (
                                    (function H_(n) {
                                       Ot(n, "Expected localeId to be defined"), "string" == typeof n && (U_ = n.toLowerCase().replace(/_/g, "-"));
                                    })(a.injector.get(vn, Vi) || Vi),
                                    this._moduleDoBootstrap(a),
                                    a
                                 )
                              )
                           );
                        })
                     );
                  });
               }
               bootstrapModule(t, r = []) {
                  const i = bb({}, r);
                  return (function iF(n, e, t) {
                     const r = new Ud(t);
                     return Promise.resolve(r);
                  })(0, 0, t).then((o) => this.bootstrapModuleFactory(o, i));
               }
               _moduleDoBootstrap(t) {
                  const r = t.injector.get(rs);
                  if (t._bootstrapComponents.length > 0) t._bootstrapComponents.forEach((i) => r.bootstrap(i));
                  else {
                     if (!t.instance.ngDoBootstrap) throw new _(403, !1);
                     t.instance.ngDoBootstrap(r);
                  }
                  this._modules.push(t);
               }
               onDestroy(t) {
                  this._destroyListeners.push(t);
               }
               get injector() {
                  return this._injector;
               }
               destroy() {
                  if (this._destroyed) throw new _(404, !1);
                  this._modules.slice().forEach((r) => r.destroy()), this._destroyListeners.forEach((r) => r());
                  const t = this._injector.get(df, null);
                  t && (t.forEach((r) => r()), t.clear()), (this._destroyed = !0);
               }
               get destroyed() {
                  return this._destroyed;
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)(M(Bt));
               }),
               (n.ɵprov = N({ token: n, factory: n.ɵfac, providedIn: "platform" })),
               n
            );
         })();
         function bb(n, e) {
            return Array.isArray(e) ? e.reduce(bb, n) : { ...n, ...e };
         }
         let rs = (() => {
            class n {
               constructor(t, r, i) {
                  (this._zone = t),
                     (this._injector = r),
                     (this._exceptionHandler = i),
                     (this._bootstrapListeners = []),
                     (this._views = []),
                     (this._runningTick = !1),
                     (this._stable = !0),
                     (this._destroyed = !1),
                     (this._destroyListeners = []),
                     (this.componentTypes = []),
                     (this.components = []),
                     (this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                        next: () => {
                           this._zone.run(() => {
                              this.tick();
                           });
                        },
                     }));
                  const o = new Te((a) => {
                        (this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks),
                           this._zone.runOutsideAngular(() => {
                              a.next(this._stable), a.complete();
                           });
                     }),
                     s = new Te((a) => {
                        let l;
                        this._zone.runOutsideAngular(() => {
                           l = this._zone.onStable.subscribe(() => {
                              Ee.assertNotInAngularZone(),
                                 rf(() => {
                                    !this._stable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks && ((this._stable = !0), a.next(!0));
                                 });
                           });
                        });
                        const c = this._zone.onUnstable.subscribe(() => {
                           Ee.assertInAngularZone(),
                              this._stable &&
                                 ((this._stable = !1),
                                 this._zone.runOutsideAngular(() => {
                                    a.next(!1);
                                 }));
                        });
                        return () => {
                           l.unsubscribe(), c.unsubscribe();
                        };
                     });
                  this.isStable = (function sM(...n) {
                     const e = mo(n),
                        t = (function JE(n, e) {
                           return "number" == typeof Gc(n) ? n.pop() : e;
                        })(n, 1 / 0),
                        r = n;
                     return r.length ? (1 === r.length ? Nt(r[0]) : ni(t)(ke(r, e))) : In;
                  })(
                     o,
                     s.pipe(
                        (function Kp(n = {}) {
                           const { connector: e = () => new ln(), resetOnError: t = !0, resetOnComplete: r = !0, resetOnRefCountZero: i = !0 } = n;
                           return (o) => {
                              let s,
                                 a,
                                 l,
                                 c = 0,
                                 u = !1,
                                 d = !1;
                              const f = () => {
                                    a?.unsubscribe(), (a = void 0);
                                 },
                                 h = () => {
                                    f(), (s = l = void 0), (u = d = !1);
                                 },
                                 p = () => {
                                    const m = s;
                                    h(), m?.unsubscribe();
                                 };
                              return Oe((m, g) => {
                                 c++, !d && !u && f();
                                 const v = (l = l ?? e());
                                 g.add(() => {
                                    c--, 0 === c && !d && !u && (a = qc(p, i));
                                 }),
                                    v.subscribe(g),
                                    !s &&
                                       c > 0 &&
                                       ((s = new po({
                                          next: (E) => v.next(E),
                                          error: (E) => {
                                             (d = !0), f(), (a = qc(h, t, E)), v.error(E);
                                          },
                                          complete: () => {
                                             (u = !0), f(), (a = qc(h, r)), v.complete();
                                          },
                                       })),
                                       Nt(m).subscribe(s));
                              })(o);
                           };
                        })()
                     )
                  );
               }
               get destroyed() {
                  return this._destroyed;
               }
               get injector() {
                  return this._injector;
               }
               bootstrap(t, r) {
                  const i = t instanceof Qg;
                  if (!this._injector.get(fl).done)
                     throw (
                        (!i &&
                           (function ii(n) {
                              const e = ue(n) || Je(n) || at(n);
                              return null !== e && e.standalone;
                           })(t),
                        new _(405, false))
                     );
                  let s;
                  (s = i ? t : this._injector.get(Lo).resolveComponentFactory(t)), this.componentTypes.push(s.componentType);
                  const a = (function oF(n) {
                        return n.isBoundToModule;
                     })(s)
                        ? void 0
                        : this._injector.get(Bi),
                     c = s.create(Bt.NULL, [], r || s.selector, a),
                     u = c.location.nativeElement,
                     d = c.injector.get(ub, null);
                  return (
                     d?.registerApplication(u),
                     c.onDestroy(() => {
                        this.detachView(c.hostView), pl(this.components, c), d?.unregisterApplication(u);
                     }),
                     this._loadComponent(c),
                     c
                  );
               }
               tick() {
                  if (this._runningTick) throw new _(101, !1);
                  try {
                     this._runningTick = !0;
                     for (let t of this._views) t.detectChanges();
                  } catch (t) {
                     this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(t));
                  } finally {
                     this._runningTick = !1;
                  }
               }
               attachView(t) {
                  const r = t;
                  this._views.push(r), r.attachToAppRef(this);
               }
               detachView(t) {
                  const r = t;
                  pl(this._views, r), r.detachFromAppRef();
               }
               _loadComponent(t) {
                  this.attachView(t.hostView), this.tick(), this.components.push(t);
                  const r = this._injector.get(rb, []);
                  r.push(...this._bootstrapListeners), r.forEach((i) => i(t));
               }
               ngOnDestroy() {
                  if (!this._destroyed)
                     try {
                        this._destroyListeners.forEach((t) => t()),
                           this._views.slice().forEach((t) => t.destroy()),
                           this._onMicrotaskEmptySubscription.unsubscribe();
                     } finally {
                        (this._destroyed = !0), (this._views = []), (this._bootstrapListeners = []), (this._destroyListeners = []);
                     }
               }
               onDestroy(t) {
                  return this._destroyListeners.push(t), () => pl(this._destroyListeners, t);
               }
               destroy() {
                  if (this._destroyed) throw new _(406, !1);
                  const t = this._injector;
                  t.destroy && !t.destroyed && t.destroy();
               }
               get viewCount() {
                  return this._views.length;
               }
               warnIfDestroyed() {}
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)(M(Ee), M(kn), M(nr));
               }),
               (n.ɵprov = N({ token: n, factory: n.ɵfac, providedIn: "root" })),
               n
            );
         })();
         function pl(n, e) {
            const t = n.indexOf(e);
            t > -1 && n.splice(t, 1);
         }
         let ml = (() => {
            class n {}
            return (n.__NG_ELEMENT_ID__ = uF), n;
         })();
         function uF(n) {
            return (function dF(n, e, t) {
               if (Co(n) && !t) {
                  const r = Mt(n.index, e);
                  return new jo(r, r);
               }
               return 47 & n.type ? new jo(e[16], e) : null;
            })(Ze(), D(), 16 == (16 & n));
         }
         class Mb {
            constructor() {}
            supports(e) {
               return Ho(e);
            }
            create(e) {
               return new yF(e);
            }
         }
         const gF = (n, e) => e;
         class yF {
            constructor(e) {
               (this.length = 0),
                  (this._linkedRecords = null),
                  (this._unlinkedRecords = null),
                  (this._previousItHead = null),
                  (this._itHead = null),
                  (this._itTail = null),
                  (this._additionsHead = null),
                  (this._additionsTail = null),
                  (this._movesHead = null),
                  (this._movesTail = null),
                  (this._removalsHead = null),
                  (this._removalsTail = null),
                  (this._identityChangesHead = null),
                  (this._identityChangesTail = null),
                  (this._trackByFn = e || gF);
            }
            forEachItem(e) {
               let t;
               for (t = this._itHead; null !== t; t = t._next) e(t);
            }
            forEachOperation(e) {
               let t = this._itHead,
                  r = this._removalsHead,
                  i = 0,
                  o = null;
               for (; t || r; ) {
                  const s = !r || (t && t.currentIndex < Sb(r, i, o)) ? t : r,
                     a = Sb(s, i, o),
                     l = s.currentIndex;
                  if (s === r) i--, (r = r._nextRemoved);
                  else if (((t = t._next), null == s.previousIndex)) i++;
                  else {
                     o || (o = []);
                     const c = a - i,
                        u = l - i;
                     if (c != u) {
                        for (let f = 0; f < c; f++) {
                           const h = f < o.length ? o[f] : (o[f] = 0),
                              p = h + f;
                           u <= p && p < c && (o[f] = h + 1);
                        }
                        o[s.previousIndex] = u - c;
                     }
                  }
                  a !== l && e(s, a, l);
               }
            }
            forEachPreviousItem(e) {
               let t;
               for (t = this._previousItHead; null !== t; t = t._nextPrevious) e(t);
            }
            forEachAddedItem(e) {
               let t;
               for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
            }
            forEachMovedItem(e) {
               let t;
               for (t = this._movesHead; null !== t; t = t._nextMoved) e(t);
            }
            forEachRemovedItem(e) {
               let t;
               for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
            }
            forEachIdentityChange(e) {
               let t;
               for (t = this._identityChangesHead; null !== t; t = t._nextIdentityChange) e(t);
            }
            diff(e) {
               if ((null == e && (e = []), !Ho(e))) throw new _(900, !1);
               return this.check(e) ? this : null;
            }
            onDestroy() {}
            check(e) {
               this._reset();
               let i,
                  o,
                  s,
                  t = this._itHead,
                  r = !1;
               if (Array.isArray(e)) {
                  this.length = e.length;
                  for (let a = 0; a < this.length; a++)
                     (o = e[a]),
                        (s = this._trackByFn(a, o)),
                        null !== t && Object.is(t.trackById, s)
                           ? (r && (t = this._verifyReinsertion(t, o, s, a)), Object.is(t.item, o) || this._addIdentityChange(t, o))
                           : ((t = this._mismatch(t, o, s, a)), (r = !0)),
                        (t = t._next);
               } else
                  (i = 0),
                     (function U1(n, e) {
                        if (Array.isArray(n)) for (let t = 0; t < n.length; t++) e(n[t]);
                        else {
                           const t = n[Rr()]();
                           let r;
                           for (; !(r = t.next()).done; ) e(r.value);
                        }
                     })(e, (a) => {
                        (s = this._trackByFn(i, a)),
                           null !== t && Object.is(t.trackById, s)
                              ? (r && (t = this._verifyReinsertion(t, a, s, i)), Object.is(t.item, a) || this._addIdentityChange(t, a))
                              : ((t = this._mismatch(t, a, s, i)), (r = !0)),
                           (t = t._next),
                           i++;
                     }),
                     (this.length = i);
               return this._truncate(t), (this.collection = e), this.isDirty;
            }
            get isDirty() {
               return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead;
            }
            _reset() {
               if (this.isDirty) {
                  let e;
                  for (e = this._previousItHead = this._itHead; null !== e; e = e._next) e._nextPrevious = e._next;
                  for (e = this._additionsHead; null !== e; e = e._nextAdded) e.previousIndex = e.currentIndex;
                  for (this._additionsHead = this._additionsTail = null, e = this._movesHead; null !== e; e = e._nextMoved) e.previousIndex = e.currentIndex;
                  (this._movesHead = this._movesTail = null),
                     (this._removalsHead = this._removalsTail = null),
                     (this._identityChangesHead = this._identityChangesTail = null);
               }
            }
            _mismatch(e, t, r, i) {
               let o;
               return (
                  null === e ? (o = this._itTail) : ((o = e._prev), this._remove(e)),
                  null !== (e = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null))
                     ? (Object.is(e.item, t) || this._addIdentityChange(e, t), this._reinsertAfter(e, o, i))
                     : null !== (e = null === this._linkedRecords ? null : this._linkedRecords.get(r, i))
                     ? (Object.is(e.item, t) || this._addIdentityChange(e, t), this._moveAfter(e, o, i))
                     : (e = this._addAfter(new _F(t, r), o, i)),
                  e
               );
            }
            _verifyReinsertion(e, t, r, i) {
               let o = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null);
               return null !== o ? (e = this._reinsertAfter(o, e._prev, i)) : e.currentIndex != i && ((e.currentIndex = i), this._addToMoves(e, i)), e;
            }
            _truncate(e) {
               for (; null !== e; ) {
                  const t = e._next;
                  this._addToRemovals(this._unlink(e)), (e = t);
               }
               null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
                  null !== this._additionsTail && (this._additionsTail._nextAdded = null),
                  null !== this._movesTail && (this._movesTail._nextMoved = null),
                  null !== this._itTail && (this._itTail._next = null),
                  null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
                  null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null);
            }
            _reinsertAfter(e, t, r) {
               null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
               const i = e._prevRemoved,
                  o = e._nextRemoved;
               return (
                  null === i ? (this._removalsHead = o) : (i._nextRemoved = o),
                  null === o ? (this._removalsTail = i) : (o._prevRemoved = i),
                  this._insertAfter(e, t, r),
                  this._addToMoves(e, r),
                  e
               );
            }
            _moveAfter(e, t, r) {
               return this._unlink(e), this._insertAfter(e, t, r), this._addToMoves(e, r), e;
            }
            _addAfter(e, t, r) {
               return (
                  this._insertAfter(e, t, r),
                  (this._additionsTail = null === this._additionsTail ? (this._additionsHead = e) : (this._additionsTail._nextAdded = e)),
                  e
               );
            }
            _insertAfter(e, t, r) {
               const i = null === t ? this._itHead : t._next;
               return (
                  (e._next = i),
                  (e._prev = t),
                  null === i ? (this._itTail = e) : (i._prev = e),
                  null === t ? (this._itHead = e) : (t._next = e),
                  null === this._linkedRecords && (this._linkedRecords = new xb()),
                  this._linkedRecords.put(e),
                  (e.currentIndex = r),
                  e
               );
            }
            _remove(e) {
               return this._addToRemovals(this._unlink(e));
            }
            _unlink(e) {
               null !== this._linkedRecords && this._linkedRecords.remove(e);
               const t = e._prev,
                  r = e._next;
               return null === t ? (this._itHead = r) : (t._next = r), null === r ? (this._itTail = t) : (r._prev = t), e;
            }
            _addToMoves(e, t) {
               return e.previousIndex === t || (this._movesTail = null === this._movesTail ? (this._movesHead = e) : (this._movesTail._nextMoved = e)), e;
            }
            _addToRemovals(e) {
               return (
                  null === this._unlinkedRecords && (this._unlinkedRecords = new xb()),
                  this._unlinkedRecords.put(e),
                  (e.currentIndex = null),
                  (e._nextRemoved = null),
                  null === this._removalsTail
                     ? ((this._removalsTail = this._removalsHead = e), (e._prevRemoved = null))
                     : ((e._prevRemoved = this._removalsTail), (this._removalsTail = this._removalsTail._nextRemoved = e)),
                  e
               );
            }
            _addIdentityChange(e, t) {
               return (
                  (e.item = t),
                  (this._identityChangesTail =
                     null === this._identityChangesTail ? (this._identityChangesHead = e) : (this._identityChangesTail._nextIdentityChange = e)),
                  e
               );
            }
         }
         class _F {
            constructor(e, t) {
               (this.item = e),
                  (this.trackById = t),
                  (this.currentIndex = null),
                  (this.previousIndex = null),
                  (this._nextPrevious = null),
                  (this._prev = null),
                  (this._next = null),
                  (this._prevDup = null),
                  (this._nextDup = null),
                  (this._prevRemoved = null),
                  (this._nextRemoved = null),
                  (this._nextAdded = null),
                  (this._nextMoved = null),
                  (this._nextIdentityChange = null);
            }
         }
         class vF {
            constructor() {
               (this._head = null), (this._tail = null);
            }
            add(e) {
               null === this._head
                  ? ((this._head = this._tail = e), (e._nextDup = null), (e._prevDup = null))
                  : ((this._tail._nextDup = e), (e._prevDup = this._tail), (e._nextDup = null), (this._tail = e));
            }
            get(e, t) {
               let r;
               for (r = this._head; null !== r; r = r._nextDup) if ((null === t || t <= r.currentIndex) && Object.is(r.trackById, e)) return r;
               return null;
            }
            remove(e) {
               const t = e._prevDup,
                  r = e._nextDup;
               return null === t ? (this._head = r) : (t._nextDup = r), null === r ? (this._tail = t) : (r._prevDup = t), null === this._head;
            }
         }
         class xb {
            constructor() {
               this.map = new Map();
            }
            put(e) {
               const t = e.trackById;
               let r = this.map.get(t);
               r || ((r = new vF()), this.map.set(t, r)), r.add(e);
            }
            get(e, t) {
               const i = this.map.get(e);
               return i ? i.get(e, t) : null;
            }
            remove(e) {
               const t = e.trackById;
               return this.map.get(t).remove(e) && this.map.delete(t), e;
            }
            get isEmpty() {
               return 0 === this.map.size;
            }
            clear() {
               this.map.clear();
            }
         }
         function Sb(n, e, t) {
            const r = n.previousIndex;
            if (null === r) return r;
            let i = 0;
            return t && r < t.length && (i = t[r]), r + e + i;
         }
         class Ib {
            constructor() {}
            supports(e) {
               return e instanceof Map || xd(e);
            }
            create() {
               return new bF();
            }
         }
         class bF {
            constructor() {
               (this._records = new Map()),
                  (this._mapHead = null),
                  (this._appendAfter = null),
                  (this._previousMapHead = null),
                  (this._changesHead = null),
                  (this._changesTail = null),
                  (this._additionsHead = null),
                  (this._additionsTail = null),
                  (this._removalsHead = null),
                  (this._removalsTail = null);
            }
            get isDirty() {
               return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead;
            }
            forEachItem(e) {
               let t;
               for (t = this._mapHead; null !== t; t = t._next) e(t);
            }
            forEachPreviousItem(e) {
               let t;
               for (t = this._previousMapHead; null !== t; t = t._nextPrevious) e(t);
            }
            forEachChangedItem(e) {
               let t;
               for (t = this._changesHead; null !== t; t = t._nextChanged) e(t);
            }
            forEachAddedItem(e) {
               let t;
               for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
            }
            forEachRemovedItem(e) {
               let t;
               for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
            }
            diff(e) {
               if (e) {
                  if (!(e instanceof Map || xd(e))) throw new _(900, !1);
               } else e = new Map();
               return this.check(e) ? this : null;
            }
            onDestroy() {}
            check(e) {
               this._reset();
               let t = this._mapHead;
               if (
                  ((this._appendAfter = null),
                  this._forEach(e, (r, i) => {
                     if (t && t.key === i) this._maybeAddToChanges(t, r), (this._appendAfter = t), (t = t._next);
                     else {
                        const o = this._getOrCreateRecordForKey(i, r);
                        t = this._insertBeforeOrAppend(t, o);
                     }
                  }),
                  t)
               ) {
                  t._prev && (t._prev._next = null), (this._removalsHead = t);
                  for (let r = t; null !== r; r = r._nextRemoved)
                     r === this._mapHead && (this._mapHead = null),
                        this._records.delete(r.key),
                        (r._nextRemoved = r._next),
                        (r.previousValue = r.currentValue),
                        (r.currentValue = null),
                        (r._prev = null),
                        (r._next = null);
               }
               return (
                  this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty
               );
            }
            _insertBeforeOrAppend(e, t) {
               if (e) {
                  const r = e._prev;
                  return (
                     (t._next = e), (t._prev = r), (e._prev = t), r && (r._next = t), e === this._mapHead && (this._mapHead = t), (this._appendAfter = e), e
                  );
               }
               return this._appendAfter ? ((this._appendAfter._next = t), (t._prev = this._appendAfter)) : (this._mapHead = t), (this._appendAfter = t), null;
            }
            _getOrCreateRecordForKey(e, t) {
               if (this._records.has(e)) {
                  const i = this._records.get(e);
                  this._maybeAddToChanges(i, t);
                  const o = i._prev,
                     s = i._next;
                  return o && (o._next = s), s && (s._prev = o), (i._next = null), (i._prev = null), i;
               }
               const r = new DF(e);
               return this._records.set(e, r), (r.currentValue = t), this._addToAdditions(r), r;
            }
            _reset() {
               if (this.isDirty) {
                  let e;
                  for (this._previousMapHead = this._mapHead, e = this._previousMapHead; null !== e; e = e._next) e._nextPrevious = e._next;
                  for (e = this._changesHead; null !== e; e = e._nextChanged) e.previousValue = e.currentValue;
                  for (e = this._additionsHead; null != e; e = e._nextAdded) e.previousValue = e.currentValue;
                  (this._changesHead = this._changesTail = null), (this._additionsHead = this._additionsTail = null), (this._removalsHead = null);
               }
            }
            _maybeAddToChanges(e, t) {
               Object.is(t, e.currentValue) || ((e.previousValue = e.currentValue), (e.currentValue = t), this._addToChanges(e));
            }
            _addToAdditions(e) {
               null === this._additionsHead
                  ? (this._additionsHead = this._additionsTail = e)
                  : ((this._additionsTail._nextAdded = e), (this._additionsTail = e));
            }
            _addToChanges(e) {
               null === this._changesHead ? (this._changesHead = this._changesTail = e) : ((this._changesTail._nextChanged = e), (this._changesTail = e));
            }
            _forEach(e, t) {
               e instanceof Map ? e.forEach(t) : Object.keys(e).forEach((r) => t(e[r], r));
            }
         }
         class DF {
            constructor(e) {
               (this.key = e),
                  (this.previousValue = null),
                  (this.currentValue = null),
                  (this._nextPrevious = null),
                  (this._next = null),
                  (this._prev = null),
                  (this._nextAdded = null),
                  (this._nextRemoved = null),
                  (this._nextChanged = null);
            }
         }
         function Ab() {
            return new _l([new Mb()]);
         }
         let _l = (() => {
            class n {
               constructor(t) {
                  this.factories = t;
               }
               static create(t, r) {
                  if (null != r) {
                     const i = r.factories.slice();
                     t = t.concat(i);
                  }
                  return new n(t);
               }
               static extend(t) {
                  return { provide: n, useFactory: (r) => n.create(t, r || Ab()), deps: [[n, new _i(), new tr()]] };
               }
               find(t) {
                  const r = this.factories.find((i) => i.supports(t));
                  if (null != r) return r;
                  throw new _(901, !1);
               }
            }
            return (n.ɵprov = N({ token: n, providedIn: "root", factory: Ab })), n;
         })();
         function Tb() {
            return new is([new Ib()]);
         }
         let is = (() => {
            class n {
               constructor(t) {
                  this.factories = t;
               }
               static create(t, r) {
                  if (r) {
                     const i = r.factories.slice();
                     t = t.concat(i);
                  }
                  return new n(t);
               }
               static extend(t) {
                  return { provide: n, useFactory: (r) => n.create(t, r || Tb()), deps: [[n, new _i(), new tr()]] };
               }
               find(t) {
                  const r = this.factories.find((i) => i.supports(t));
                  if (r) return r;
                  throw new _(901, !1);
               }
            }
            return (n.ɵprov = N({ token: n, providedIn: "root", factory: Tb })), n;
         })();
         const EF = pb(null, "core", []);
         let MF = (() => {
               class n {
                  constructor(t) {}
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)(M(rs));
                  }),
                  (n.ɵmod = We({ type: n })),
                  (n.ɵinj = ze({})),
                  n
               );
            })(),
            yf = null;
         function bn() {
            return yf;
         }
         class IF {}
         const De = new x("DocumentToken");
         let _f = (() => {
            class n {
               historyGo(t) {
                  throw new Error("Not implemented");
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)();
               }),
               (n.ɵprov = N({
                  token: n,
                  factory: function () {
                     return (function AF() {
                        return M(Rb);
                     })();
                  },
                  providedIn: "platform",
               })),
               n
            );
         })();
         const TF = new x("Location Initialized");
         let Rb = (() => {
            class n extends _f {
               constructor(t) {
                  super(), (this._doc = t), this._init();
               }
               _init() {
                  (this.location = window.location), (this._history = window.history);
               }
               getBaseHrefFromDOM() {
                  return bn().getBaseHref(this._doc);
               }
               onPopState(t) {
                  const r = bn().getGlobalEventTarget(this._doc, "window");
                  return r.addEventListener("popstate", t, !1), () => r.removeEventListener("popstate", t);
               }
               onHashChange(t) {
                  const r = bn().getGlobalEventTarget(this._doc, "window");
                  return r.addEventListener("hashchange", t, !1), () => r.removeEventListener("hashchange", t);
               }
               get href() {
                  return this.location.href;
               }
               get protocol() {
                  return this.location.protocol;
               }
               get hostname() {
                  return this.location.hostname;
               }
               get port() {
                  return this.location.port;
               }
               get pathname() {
                  return this.location.pathname;
               }
               get search() {
                  return this.location.search;
               }
               get hash() {
                  return this.location.hash;
               }
               set pathname(t) {
                  this.location.pathname = t;
               }
               pushState(t, r, i) {
                  Fb() ? this._history.pushState(t, r, i) : (this.location.hash = i);
               }
               replaceState(t, r, i) {
                  Fb() ? this._history.replaceState(t, r, i) : (this.location.hash = i);
               }
               forward() {
                  this._history.forward();
               }
               back() {
                  this._history.back();
               }
               historyGo(t = 0) {
                  this._history.go(t);
               }
               getState() {
                  return this._history.state;
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)(M(De));
               }),
               (n.ɵprov = N({
                  token: n,
                  factory: function () {
                     return (function RF() {
                        return new Rb(M(De));
                     })();
                  },
                  providedIn: "platform",
               })),
               n
            );
         })();
         function Fb() {
            return !!window.history.pushState;
         }
         function vf(n, e) {
            if (0 == n.length) return e;
            if (0 == e.length) return n;
            let t = 0;
            return n.endsWith("/") && t++, e.startsWith("/") && t++, 2 == t ? n + e.substring(1) : 1 == t ? n + e : n + "/" + e;
         }
         function Nb(n) {
            const e = n.match(/#|\?|$/),
               t = (e && e.index) || n.length;
            return n.slice(0, t - ("/" === n[t - 1] ? 1 : 0)) + n.slice(t);
         }
         function Hn(n) {
            return n && "?" !== n[0] ? "?" + n : n;
         }
         let Br = (() => {
            class n {
               historyGo(t) {
                  throw new Error("Not implemented");
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)();
               }),
               (n.ɵprov = N({
                  token: n,
                  factory: function () {
                     return X(kb);
                  },
                  providedIn: "root",
               })),
               n
            );
         })();
         const Ob = new x("appBaseHref");
         let kb = (() => {
               class n extends Br {
                  constructor(t, r) {
                     super(),
                        (this._platformLocation = t),
                        (this._removeListenerFns = []),
                        (this._baseHref = r ?? this._platformLocation.getBaseHrefFromDOM() ?? X(De).location?.origin ?? "");
                  }
                  ngOnDestroy() {
                     for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
                  }
                  onPopState(t) {
                     this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t));
                  }
                  getBaseHref() {
                     return this._baseHref;
                  }
                  prepareExternalUrl(t) {
                     return vf(this._baseHref, t);
                  }
                  path(t = !1) {
                     const r = this._platformLocation.pathname + Hn(this._platformLocation.search),
                        i = this._platformLocation.hash;
                     return i && t ? `${r}${i}` : r;
                  }
                  pushState(t, r, i, o) {
                     const s = this.prepareExternalUrl(i + Hn(o));
                     this._platformLocation.pushState(t, r, s);
                  }
                  replaceState(t, r, i, o) {
                     const s = this.prepareExternalUrl(i + Hn(o));
                     this._platformLocation.replaceState(t, r, s);
                  }
                  forward() {
                     this._platformLocation.forward();
                  }
                  back() {
                     this._platformLocation.back();
                  }
                  getState() {
                     return this._platformLocation.getState();
                  }
                  historyGo(t = 0) {
                     this._platformLocation.historyGo?.(t);
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)(M(_f), M(Ob, 8));
                  }),
                  (n.ɵprov = N({ token: n, factory: n.ɵfac, providedIn: "root" })),
                  n
               );
            })(),
            FF = (() => {
               class n extends Br {
                  constructor(t, r) {
                     super(), (this._platformLocation = t), (this._baseHref = ""), (this._removeListenerFns = []), null != r && (this._baseHref = r);
                  }
                  ngOnDestroy() {
                     for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
                  }
                  onPopState(t) {
                     this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t));
                  }
                  getBaseHref() {
                     return this._baseHref;
                  }
                  path(t = !1) {
                     let r = this._platformLocation.hash;
                     return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
                  }
                  prepareExternalUrl(t) {
                     const r = vf(this._baseHref, t);
                     return r.length > 0 ? "#" + r : r;
                  }
                  pushState(t, r, i, o) {
                     let s = this.prepareExternalUrl(i + Hn(o));
                     0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.pushState(t, r, s);
                  }
                  replaceState(t, r, i, o) {
                     let s = this.prepareExternalUrl(i + Hn(o));
                     0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.replaceState(t, r, s);
                  }
                  forward() {
                     this._platformLocation.forward();
                  }
                  back() {
                     this._platformLocation.back();
                  }
                  getState() {
                     return this._platformLocation.getState();
                  }
                  historyGo(t = 0) {
                     this._platformLocation.historyGo?.(t);
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)(M(_f), M(Ob, 8));
                  }),
                  (n.ɵprov = N({ token: n, factory: n.ɵfac })),
                  n
               );
            })(),
            bf = (() => {
               class n {
                  constructor(t) {
                     (this._subject = new ve()), (this._urlChangeListeners = []), (this._urlChangeSubscription = null), (this._locationStrategy = t);
                     const r = this._locationStrategy.getBaseHref();
                     (this._basePath = (function kF(n) {
                        if (new RegExp("^(https?:)?//").test(n)) {
                           const [, t] = n.split(/\/\/[^\/]+/);
                           return t;
                        }
                        return n;
                     })(Nb(Pb(r)))),
                        this._locationStrategy.onPopState((i) => {
                           this._subject.emit({ url: this.path(!0), pop: !0, state: i.state, type: i.type });
                        });
                  }
                  ngOnDestroy() {
                     this._urlChangeSubscription?.unsubscribe(), (this._urlChangeListeners = []);
                  }
                  path(t = !1) {
                     return this.normalize(this._locationStrategy.path(t));
                  }
                  getState() {
                     return this._locationStrategy.getState();
                  }
                  isCurrentPathEqualTo(t, r = "") {
                     return this.path() == this.normalize(t + Hn(r));
                  }
                  normalize(t) {
                     return n.stripTrailingSlash(
                        (function OF(n, e) {
                           return n && e.startsWith(n) ? e.substring(n.length) : e;
                        })(this._basePath, Pb(t))
                     );
                  }
                  prepareExternalUrl(t) {
                     return t && "/" !== t[0] && (t = "/" + t), this._locationStrategy.prepareExternalUrl(t);
                  }
                  go(t, r = "", i = null) {
                     this._locationStrategy.pushState(i, "", t, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + Hn(r)), i);
                  }
                  replaceState(t, r = "", i = null) {
                     this._locationStrategy.replaceState(i, "", t, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + Hn(r)), i);
                  }
                  forward() {
                     this._locationStrategy.forward();
                  }
                  back() {
                     this._locationStrategy.back();
                  }
                  historyGo(t = 0) {
                     this._locationStrategy.historyGo?.(t);
                  }
                  onUrlChange(t) {
                     return (
                        this._urlChangeListeners.push(t),
                        this._urlChangeSubscription ||
                           (this._urlChangeSubscription = this.subscribe((r) => {
                              this._notifyUrlChangeListeners(r.url, r.state);
                           })),
                        () => {
                           const r = this._urlChangeListeners.indexOf(t);
                           this._urlChangeListeners.splice(r, 1),
                              0 === this._urlChangeListeners.length && (this._urlChangeSubscription?.unsubscribe(), (this._urlChangeSubscription = null));
                        }
                     );
                  }
                  _notifyUrlChangeListeners(t = "", r) {
                     this._urlChangeListeners.forEach((i) => i(t, r));
                  }
                  subscribe(t, r, i) {
                     return this._subject.subscribe({ next: t, error: r, complete: i });
                  }
               }
               return (
                  (n.normalizeQueryParams = Hn),
                  (n.joinWithSlash = vf),
                  (n.stripTrailingSlash = Nb),
                  (n.ɵfac = function (t) {
                     return new (t || n)(M(Br));
                  }),
                  (n.ɵprov = N({
                     token: n,
                     factory: function () {
                        return (function NF() {
                           return new bf(M(Br));
                        })();
                     },
                     providedIn: "root",
                  })),
                  n
               );
            })();
         function Pb(n) {
            return n.replace(/\/index.html$/, "");
         }
         let Il = (() => {
            class n {
               constructor(t, r, i, o) {
                  (this._iterableDiffers = t),
                     (this._keyValueDiffers = r),
                     (this._ngEl = i),
                     (this._renderer = o),
                     (this._iterableDiffer = null),
                     (this._keyValueDiffer = null),
                     (this._initialClasses = []),
                     (this._rawClass = null);
               }
               set klass(t) {
                  this._removeClasses(this._initialClasses),
                     (this._initialClasses = "string" == typeof t ? t.split(/\s+/) : []),
                     this._applyClasses(this._initialClasses),
                     this._applyClasses(this._rawClass);
               }
               set ngClass(t) {
                  this._removeClasses(this._rawClass),
                     this._applyClasses(this._initialClasses),
                     (this._iterableDiffer = null),
                     (this._keyValueDiffer = null),
                     (this._rawClass = "string" == typeof t ? t.split(/\s+/) : t),
                     this._rawClass &&
                        (Ho(this._rawClass)
                           ? (this._iterableDiffer = this._iterableDiffers.find(this._rawClass).create())
                           : (this._keyValueDiffer = this._keyValueDiffers.find(this._rawClass).create()));
               }
               ngDoCheck() {
                  if (this._iterableDiffer) {
                     const t = this._iterableDiffer.diff(this._rawClass);
                     t && this._applyIterableChanges(t);
                  } else if (this._keyValueDiffer) {
                     const t = this._keyValueDiffer.diff(this._rawClass);
                     t && this._applyKeyValueChanges(t);
                  }
               }
               _applyKeyValueChanges(t) {
                  t.forEachAddedItem((r) => this._toggleClass(r.key, r.currentValue)),
                     t.forEachChangedItem((r) => this._toggleClass(r.key, r.currentValue)),
                     t.forEachRemovedItem((r) => {
                        r.previousValue && this._toggleClass(r.key, !1);
                     });
               }
               _applyIterableChanges(t) {
                  t.forEachAddedItem((r) => {
                     if ("string" != typeof r.item) throw new Error(`NgClass can only toggle CSS classes expressed as strings, got ${he(r.item)}`);
                     this._toggleClass(r.item, !0);
                  }),
                     t.forEachRemovedItem((r) => this._toggleClass(r.item, !1));
               }
               _applyClasses(t) {
                  t &&
                     (Array.isArray(t) || t instanceof Set
                        ? t.forEach((r) => this._toggleClass(r, !0))
                        : Object.keys(t).forEach((r) => this._toggleClass(r, !!t[r])));
               }
               _removeClasses(t) {
                  t &&
                     (Array.isArray(t) || t instanceof Set
                        ? t.forEach((r) => this._toggleClass(r, !1))
                        : Object.keys(t).forEach((r) => this._toggleClass(r, !1)));
               }
               _toggleClass(t, r) {
                  (t = t.trim()) &&
                     t.split(/\s+/g).forEach((i) => {
                        r ? this._renderer.addClass(this._ngEl.nativeElement, i) : this._renderer.removeClass(this._ngEl.nativeElement, i);
                     });
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)(w(_l), w(is), w(yt), w(Pn));
               }),
               (n.ɵdir = $({ type: n, selectors: [["", "ngClass", ""]], inputs: { klass: ["class", "klass"], ngClass: "ngClass" }, standalone: !0 })),
               n
            );
         })();
         class bN {
            constructor(e, t, r, i) {
               (this.$implicit = e), (this.ngForOf = t), (this.index = r), (this.count = i);
            }
            get first() {
               return 0 === this.index;
            }
            get last() {
               return this.index === this.count - 1;
            }
            get even() {
               return this.index % 2 == 0;
            }
            get odd() {
               return !this.even;
            }
         }
         let Al = (() => {
            class n {
               constructor(t, r, i) {
                  (this._viewContainer = t),
                     (this._template = r),
                     (this._differs = i),
                     (this._ngForOf = null),
                     (this._ngForOfDirty = !0),
                     (this._differ = null);
               }
               set ngForOf(t) {
                  (this._ngForOf = t), (this._ngForOfDirty = !0);
               }
               set ngForTrackBy(t) {
                  this._trackByFn = t;
               }
               get ngForTrackBy() {
                  return this._trackByFn;
               }
               set ngForTemplate(t) {
                  t && (this._template = t);
               }
               ngDoCheck() {
                  if (this._ngForOfDirty) {
                     this._ngForOfDirty = !1;
                     const t = this._ngForOf;
                     !this._differ && t && (this._differ = this._differs.find(t).create(this.ngForTrackBy));
                  }
                  if (this._differ) {
                     const t = this._differ.diff(this._ngForOf);
                     t && this._applyChanges(t);
                  }
               }
               _applyChanges(t) {
                  const r = this._viewContainer;
                  t.forEachOperation((i, o, s) => {
                     if (null == i.previousIndex) r.createEmbeddedView(this._template, new bN(i.item, this._ngForOf, -1, -1), null === s ? void 0 : s);
                     else if (null == s) r.remove(null === o ? void 0 : o);
                     else if (null !== o) {
                        const a = r.get(o);
                        r.move(a, s), Wb(a, i);
                     }
                  });
                  for (let i = 0, o = r.length; i < o; i++) {
                     const a = r.get(i).context;
                     (a.index = i), (a.count = o), (a.ngForOf = this._ngForOf);
                  }
                  t.forEachIdentityChange((i) => {
                     Wb(r.get(i.currentIndex), i);
                  });
               }
               static ngTemplateContextGuard(t, r) {
                  return !0;
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)(w(nn), w(jn), w(_l));
               }),
               (n.ɵdir = $({
                  type: n,
                  selectors: [["", "ngFor", "", "ngForOf", ""]],
                  inputs: { ngForOf: "ngForOf", ngForTrackBy: "ngForTrackBy", ngForTemplate: "ngForTemplate" },
                  standalone: !0,
               })),
               n
            );
         })();
         function Wb(n, e) {
            n.context.$implicit = e.item;
         }
         let Kb = (() => {
            class n {
               constructor(t, r) {
                  (this._viewContainer = t),
                     (this._context = new wN()),
                     (this._thenTemplateRef = null),
                     (this._elseTemplateRef = null),
                     (this._thenViewRef = null),
                     (this._elseViewRef = null),
                     (this._thenTemplateRef = r);
               }
               set ngIf(t) {
                  (this._context.$implicit = this._context.ngIf = t), this._updateView();
               }
               set ngIfThen(t) {
                  Zb("ngIfThen", t), (this._thenTemplateRef = t), (this._thenViewRef = null), this._updateView();
               }
               set ngIfElse(t) {
                  Zb("ngIfElse", t), (this._elseTemplateRef = t), (this._elseViewRef = null), this._updateView();
               }
               _updateView() {
                  this._context.$implicit
                     ? this._thenViewRef ||
                       (this._viewContainer.clear(),
                       (this._elseViewRef = null),
                       this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context)))
                     : this._elseViewRef ||
                       (this._viewContainer.clear(),
                       (this._thenViewRef = null),
                       this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)));
               }
               static ngTemplateContextGuard(t, r) {
                  return !0;
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)(w(nn), w(jn));
               }),
               (n.ɵdir = $({ type: n, selectors: [["", "ngIf", ""]], inputs: { ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse" }, standalone: !0 })),
               n
            );
         })();
         class wN {
            constructor() {
               (this.$implicit = null), (this.ngIf = null);
            }
         }
         function Zb(n, e) {
            if (e && !e.createEmbeddedView) throw new Error(`${n} must be a TemplateRef, but received '${he(e)}'.`);
         }
         let YN = (() => {
            class n {}
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)();
               }),
               (n.ɵmod = We({ type: n })),
               (n.ɵinj = ze({})),
               n
            );
         })();
         const Xb = "browser";
         let nO = (() => {
            class n {}
            return (n.ɵprov = N({ token: n, providedIn: "root", factory: () => new rO(M(De), window) })), n;
         })();
         class rO {
            constructor(e, t) {
               (this.document = e), (this.window = t), (this.offset = () => [0, 0]);
            }
            setOffset(e) {
               this.offset = Array.isArray(e) ? () => e : e;
            }
            getScrollPosition() {
               return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0];
            }
            scrollToPosition(e) {
               this.supportsScrolling() && this.window.scrollTo(e[0], e[1]);
            }
            scrollToAnchor(e) {
               if (!this.supportsScrolling()) return;
               const t = (function iO(n, e) {
                  const t = n.getElementById(e) || n.getElementsByName(e)[0];
                  if (t) return t;
                  if ("function" == typeof n.createTreeWalker && n.body && (n.body.createShadowRoot || n.body.attachShadow)) {
                     const r = n.createTreeWalker(n.body, NodeFilter.SHOW_ELEMENT);
                     let i = r.currentNode;
                     for (; i; ) {
                        const o = i.shadowRoot;
                        if (o) {
                           const s = o.getElementById(e) || o.querySelector(`[name="${e}"]`);
                           if (s) return s;
                        }
                        i = r.nextNode();
                     }
                  }
                  return null;
               })(this.document, e);
               t && (this.scrollToElement(t), t.focus());
            }
            setHistoryScrollRestoration(e) {
               if (this.supportScrollRestoration()) {
                  const t = this.window.history;
                  t && t.scrollRestoration && (t.scrollRestoration = e);
               }
            }
            scrollToElement(e) {
               const t = e.getBoundingClientRect(),
                  r = t.left + this.window.pageXOffset,
                  i = t.top + this.window.pageYOffset,
                  o = this.offset();
               this.window.scrollTo(r - o[0], i - o[1]);
            }
            supportScrollRestoration() {
               try {
                  if (!this.supportsScrolling()) return !1;
                  const e = Jb(this.window.history) || Jb(Object.getPrototypeOf(this.window.history));
                  return !(!e || (!e.writable && !e.set));
               } catch {
                  return !1;
               }
            }
            supportsScrolling() {
               try {
                  return !!this.window && !!this.window.scrollTo && "pageXOffset" in this.window;
               } catch {
                  return !1;
               }
            }
         }
         function Jb(n) {
            return Object.getOwnPropertyDescriptor(n, "scrollRestoration");
         }
         class FO extends IF {
            constructor() {
               super(...arguments), (this.supportsDOMEvents = !0);
            }
         }
         class Pf extends FO {
            static makeCurrent() {
               !(function SF(n) {
                  yf || (yf = n);
               })(new Pf());
            }
            onAndCancel(e, t, r) {
               return (
                  e.addEventListener(t, r, !1),
                  () => {
                     e.removeEventListener(t, r, !1);
                  }
               );
            }
            dispatchEvent(e, t) {
               e.dispatchEvent(t);
            }
            remove(e) {
               e.parentNode && e.parentNode.removeChild(e);
            }
            createElement(e, t) {
               return (t = t || this.getDefaultDocument()).createElement(e);
            }
            createHtmlDocument() {
               return document.implementation.createHTMLDocument("fakeTitle");
            }
            getDefaultDocument() {
               return document;
            }
            isElementNode(e) {
               return e.nodeType === Node.ELEMENT_NODE;
            }
            isShadowRoot(e) {
               return e instanceof DocumentFragment;
            }
            getGlobalEventTarget(e, t) {
               return "window" === t ? window : "document" === t ? e : "body" === t ? e.body : null;
            }
            getBaseHref(e) {
               const t = (function NO() {
                  return (ls = ls || document.querySelector("base")), ls ? ls.getAttribute("href") : null;
               })();
               return null == t
                  ? null
                  : (function OO(n) {
                       (Rl = Rl || document.createElement("a")), Rl.setAttribute("href", n);
                       const e = Rl.pathname;
                       return "/" === e.charAt(0) ? e : `/${e}`;
                    })(t);
            }
            resetBaseElement() {
               ls = null;
            }
            getUserAgent() {
               return window.navigator.userAgent;
            }
            getCookie(e) {
               return (function _N(n, e) {
                  e = encodeURIComponent(e);
                  for (const t of n.split(";")) {
                     const r = t.indexOf("="),
                        [i, o] = -1 == r ? [t, ""] : [t.slice(0, r), t.slice(r + 1)];
                     if (i.trim() === e) return decodeURIComponent(o);
                  }
                  return null;
               })(document.cookie, e);
            }
         }
         let Rl,
            ls = null;
         const s0 = new x("TRANSITION_ID"),
            PO = [
               {
                  provide: dl,
                  useFactory: function kO(n, e, t) {
                     return () => {
                        t.get(fl).donePromise.then(() => {
                           const r = bn(),
                              i = e.querySelectorAll(`style[ng-transition="${n}"]`);
                           for (let o = 0; o < i.length; o++) r.remove(i[o]);
                        });
                     };
                  },
                  deps: [s0, De, Bt],
                  multi: !0,
               },
            ];
         let VO = (() => {
            class n {
               build() {
                  return new XMLHttpRequest();
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)();
               }),
               (n.ɵprov = N({ token: n, factory: n.ɵfac })),
               n
            );
         })();
         const Fl = new x("EventManagerPlugins");
         let Nl = (() => {
            class n {
               constructor(t, r) {
                  (this._zone = r), (this._eventNameToPlugin = new Map()), t.forEach((i) => (i.manager = this)), (this._plugins = t.slice().reverse());
               }
               addEventListener(t, r, i) {
                  return this._findPluginFor(r).addEventListener(t, r, i);
               }
               addGlobalEventListener(t, r, i) {
                  return this._findPluginFor(r).addGlobalEventListener(t, r, i);
               }
               getZone() {
                  return this._zone;
               }
               _findPluginFor(t) {
                  const r = this._eventNameToPlugin.get(t);
                  if (r) return r;
                  const i = this._plugins;
                  for (let o = 0; o < i.length; o++) {
                     const s = i[o];
                     if (s.supports(t)) return this._eventNameToPlugin.set(t, s), s;
                  }
                  throw new Error(`No event manager plugin found for event ${t}`);
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)(M(Fl), M(Ee));
               }),
               (n.ɵprov = N({ token: n, factory: n.ɵfac })),
               n
            );
         })();
         class a0 {
            constructor(e) {
               this._doc = e;
            }
            addGlobalEventListener(e, t, r) {
               const i = bn().getGlobalEventTarget(this._doc, e);
               if (!i) throw new Error(`Unsupported event target ${i} for event ${t}`);
               return this.addEventListener(i, t, r);
            }
         }
         let l0 = (() => {
               class n {
                  constructor() {
                     this._stylesSet = new Set();
                  }
                  addStyles(t) {
                     const r = new Set();
                     t.forEach((i) => {
                        this._stylesSet.has(i) || (this._stylesSet.add(i), r.add(i));
                     }),
                        this.onStylesAdded(r);
                  }
                  onStylesAdded(t) {}
                  getAllStyles() {
                     return Array.from(this._stylesSet);
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)();
                  }),
                  (n.ɵprov = N({ token: n, factory: n.ɵfac })),
                  n
               );
            })(),
            cs = (() => {
               class n extends l0 {
                  constructor(t) {
                     super(), (this._doc = t), (this._hostNodes = new Map()), this._hostNodes.set(t.head, []);
                  }
                  _addStylesToHost(t, r, i) {
                     t.forEach((o) => {
                        const s = this._doc.createElement("style");
                        (s.textContent = o), i.push(r.appendChild(s));
                     });
                  }
                  addHost(t) {
                     const r = [];
                     this._addStylesToHost(this._stylesSet, t, r), this._hostNodes.set(t, r);
                  }
                  removeHost(t) {
                     const r = this._hostNodes.get(t);
                     r && r.forEach(c0), this._hostNodes.delete(t);
                  }
                  onStylesAdded(t) {
                     this._hostNodes.forEach((r, i) => {
                        this._addStylesToHost(t, i, r);
                     });
                  }
                  ngOnDestroy() {
                     this._hostNodes.forEach((t) => t.forEach(c0));
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)(M(De));
                  }),
                  (n.ɵprov = N({ token: n, factory: n.ɵfac })),
                  n
               );
            })();
         function c0(n) {
            bn().remove(n);
         }
         const Lf = {
               svg: "http://www.w3.org/2000/svg",
               xhtml: "http://www.w3.org/1999/xhtml",
               xlink: "http://www.w3.org/1999/xlink",
               xml: "http://www.w3.org/XML/1998/namespace",
               xmlns: "http://www.w3.org/2000/xmlns/",
               math: "http://www.w3.org/1998/MathML/",
            },
            Vf = /%COMP%/g;
         function Bf(n, e) {
            return e.flat(100).map((t) => t.replace(Vf, n));
         }
         function f0(n) {
            return (e) => {
               if ("__ngUnwrap__" === e) return n;
               !1 === n(e) && (e.preventDefault(), (e.returnValue = !1));
            };
         }
         let Ol = (() => {
            class n {
               constructor(t, r, i) {
                  (this.eventManager = t),
                     (this.sharedStylesHost = r),
                     (this.appId = i),
                     (this.rendererByCompId = new Map()),
                     (this.defaultRenderer = new jf(t));
               }
               createRenderer(t, r) {
                  if (!t || !r) return this.defaultRenderer;
                  switch (r.encapsulation) {
                     case Kt.Emulated: {
                        let i = this.rendererByCompId.get(r.id);
                        return (
                           i || ((i = new zO(this.eventManager, this.sharedStylesHost, r, this.appId)), this.rendererByCompId.set(r.id, i)), i.applyToHost(t), i
                        );
                     }
                     case 1:
                     case Kt.ShadowDom:
                        return new GO(this.eventManager, this.sharedStylesHost, t, r);
                     default:
                        if (!this.rendererByCompId.has(r.id)) {
                           const i = Bf(r.id, r.styles);
                           this.sharedStylesHost.addStyles(i), this.rendererByCompId.set(r.id, this.defaultRenderer);
                        }
                        return this.defaultRenderer;
                  }
               }
               begin() {}
               end() {}
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)(M(Nl), M(cs), M(ns));
               }),
               (n.ɵprov = N({ token: n, factory: n.ɵfac })),
               n
            );
         })();
         class jf {
            constructor(e) {
               (this.eventManager = e), (this.data = Object.create(null)), (this.destroyNode = null);
            }
            destroy() {}
            createElement(e, t) {
               return t ? document.createElementNS(Lf[t] || t, e) : document.createElement(e);
            }
            createComment(e) {
               return document.createComment(e);
            }
            createText(e) {
               return document.createTextNode(e);
            }
            appendChild(e, t) {
               (p0(e) ? e.content : e).appendChild(t);
            }
            insertBefore(e, t, r) {
               e && (p0(e) ? e.content : e).insertBefore(t, r);
            }
            removeChild(e, t) {
               e && e.removeChild(t);
            }
            selectRootElement(e, t) {
               let r = "string" == typeof e ? document.querySelector(e) : e;
               if (!r) throw new Error(`The selector "${e}" did not match any elements`);
               return t || (r.textContent = ""), r;
            }
            parentNode(e) {
               return e.parentNode;
            }
            nextSibling(e) {
               return e.nextSibling;
            }
            setAttribute(e, t, r, i) {
               if (i) {
                  t = i + ":" + t;
                  const o = Lf[i];
                  o ? e.setAttributeNS(o, t, r) : e.setAttribute(t, r);
               } else e.setAttribute(t, r);
            }
            removeAttribute(e, t, r) {
               if (r) {
                  const i = Lf[r];
                  i ? e.removeAttributeNS(i, t) : e.removeAttribute(`${r}:${t}`);
               } else e.removeAttribute(t);
            }
            addClass(e, t) {
               e.classList.add(t);
            }
            removeClass(e, t) {
               e.classList.remove(t);
            }
            setStyle(e, t, r, i) {
               i & (mt.DashCase | mt.Important) ? e.style.setProperty(t, r, i & mt.Important ? "important" : "") : (e.style[t] = r);
            }
            removeStyle(e, t, r) {
               r & mt.DashCase ? e.style.removeProperty(t) : (e.style[t] = "");
            }
            setProperty(e, t, r) {
               e[t] = r;
            }
            setValue(e, t) {
               e.nodeValue = t;
            }
            listen(e, t, r) {
               return "string" == typeof e ? this.eventManager.addGlobalEventListener(e, t, f0(r)) : this.eventManager.addEventListener(e, t, f0(r));
            }
         }
         function p0(n) {
            return "TEMPLATE" === n.tagName && void 0 !== n.content;
         }
         class zO extends jf {
            constructor(e, t, r, i) {
               super(e), (this.component = r);
               const o = Bf(i + "-" + r.id, r.styles);
               t.addStyles(o),
                  (this.contentAttr = (function UO(n) {
                     return "_ngcontent-%COMP%".replace(Vf, n);
                  })(i + "-" + r.id)),
                  (this.hostAttr = (function HO(n) {
                     return "_nghost-%COMP%".replace(Vf, n);
                  })(i + "-" + r.id));
            }
            applyToHost(e) {
               super.setAttribute(e, this.hostAttr, "");
            }
            createElement(e, t) {
               const r = super.createElement(e, t);
               return super.setAttribute(r, this.contentAttr, ""), r;
            }
         }
         class GO extends jf {
            constructor(e, t, r, i) {
               super(e),
                  (this.sharedStylesHost = t),
                  (this.hostEl = r),
                  (this.shadowRoot = r.attachShadow({ mode: "open" })),
                  this.sharedStylesHost.addHost(this.shadowRoot);
               const o = Bf(i.id, i.styles);
               for (let s = 0; s < o.length; s++) {
                  const a = document.createElement("style");
                  (a.textContent = o[s]), this.shadowRoot.appendChild(a);
               }
            }
            nodeOrShadowRoot(e) {
               return e === this.hostEl ? this.shadowRoot : e;
            }
            destroy() {
               this.sharedStylesHost.removeHost(this.shadowRoot);
            }
            appendChild(e, t) {
               return super.appendChild(this.nodeOrShadowRoot(e), t);
            }
            insertBefore(e, t, r) {
               return super.insertBefore(this.nodeOrShadowRoot(e), t, r);
            }
            removeChild(e, t) {
               return super.removeChild(this.nodeOrShadowRoot(e), t);
            }
            parentNode(e) {
               return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)));
            }
         }
         let qO = (() => {
            class n extends a0 {
               constructor(t) {
                  super(t);
               }
               supports(t) {
                  return !0;
               }
               addEventListener(t, r, i) {
                  return t.addEventListener(r, i, !1), () => this.removeEventListener(t, r, i);
               }
               removeEventListener(t, r, i) {
                  return t.removeEventListener(r, i);
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)(M(De));
               }),
               (n.ɵprov = N({ token: n, factory: n.ɵfac })),
               n
            );
         })();
         const m0 = ["alt", "control", "meta", "shift"],
            WO = {
               "\b": "Backspace",
               "\t": "Tab",
               "\x7f": "Delete",
               "\x1b": "Escape",
               Del: "Delete",
               Esc: "Escape",
               Left: "ArrowLeft",
               Right: "ArrowRight",
               Up: "ArrowUp",
               Down: "ArrowDown",
               Menu: "ContextMenu",
               Scroll: "ScrollLock",
               Win: "OS",
            },
            KO = { alt: (n) => n.altKey, control: (n) => n.ctrlKey, meta: (n) => n.metaKey, shift: (n) => n.shiftKey };
         let ZO = (() => {
            class n extends a0 {
               constructor(t) {
                  super(t);
               }
               supports(t) {
                  return null != n.parseEventName(t);
               }
               addEventListener(t, r, i) {
                  const o = n.parseEventName(r),
                     s = n.eventCallback(o.fullKey, i, this.manager.getZone());
                  return this.manager.getZone().runOutsideAngular(() => bn().onAndCancel(t, o.domEventName, s));
               }
               static parseEventName(t) {
                  const r = t.toLowerCase().split("."),
                     i = r.shift();
                  if (0 === r.length || ("keydown" !== i && "keyup" !== i)) return null;
                  const o = n._normalizeKey(r.pop());
                  let s = "",
                     a = r.indexOf("code");
                  if (
                     (a > -1 && (r.splice(a, 1), (s = "code.")),
                     m0.forEach((c) => {
                        const u = r.indexOf(c);
                        u > -1 && (r.splice(u, 1), (s += c + "."));
                     }),
                     (s += o),
                     0 != r.length || 0 === o.length)
                  )
                     return null;
                  const l = {};
                  return (l.domEventName = i), (l.fullKey = s), l;
               }
               static matchEventFullKeyCode(t, r) {
                  let i = WO[t.key] || t.key,
                     o = "";
                  return (
                     r.indexOf("code.") > -1 && ((i = t.code), (o = "code.")),
                     !(null == i || !i) &&
                        ((i = i.toLowerCase()),
                        " " === i ? (i = "space") : "." === i && (i = "dot"),
                        m0.forEach((s) => {
                           s !== i && (0, KO[s])(t) && (o += s + ".");
                        }),
                        (o += i),
                        o === r)
                  );
               }
               static eventCallback(t, r, i) {
                  return (o) => {
                     n.matchEventFullKeyCode(o, t) && i.runGuarded(() => r(o));
                  };
               }
               static _normalizeKey(t) {
                  return "esc" === t ? "escape" : t;
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)(M(De));
               }),
               (n.ɵprov = N({ token: n, factory: n.ɵfac })),
               n
            );
         })();
         const JO = pb(EF, "browser", [
               { provide: nf, useValue: Xb },
               {
                  provide: nb,
                  useValue: function QO() {
                     Pf.makeCurrent();
                  },
                  multi: !0,
               },
               {
                  provide: De,
                  useFactory: function XO() {
                     return (
                        (function _S(n) {
                           Wu = n;
                        })(document),
                        document
                     );
                  },
                  deps: [],
               },
            ]),
            _0 = new x(""),
            v0 = [
               {
                  provide: hl,
                  useClass: class LO {
                     addToWindow(e) {
                        (ge.getAngularTestability = (r, i = !0) => {
                           const o = e.findTestabilityInTree(r, i);
                           if (null == o) throw new Error("Could not find testability for element.");
                           return o;
                        }),
                           (ge.getAllAngularTestabilities = () => e.getAllTestabilities()),
                           (ge.getAllAngularRootElements = () => e.getAllRootElements()),
                           ge.frameworkStabilizers || (ge.frameworkStabilizers = []),
                           ge.frameworkStabilizers.push((r) => {
                              const i = ge.getAllAngularTestabilities();
                              let o = i.length,
                                 s = !1;
                              const a = function (l) {
                                 (s = s || l), o--, 0 == o && r(s);
                              };
                              i.forEach(function (l) {
                                 l.whenStable(a);
                              });
                           });
                     }
                     findTestabilityInTree(e, t, r) {
                        return null == t
                           ? null
                           : e.getTestability(t) ??
                                (r
                                   ? bn().isShadowRoot(t)
                                      ? this.findTestabilityInTree(e, t.host, !0)
                                      : this.findTestabilityInTree(e, t.parentElement, !0)
                                   : null);
                     }
                  },
                  deps: [],
               },
               { provide: ub, useClass: lf, deps: [Ee, cf, hl] },
               { provide: lf, useClass: lf, deps: [Ee, cf, hl] },
            ],
            b0 = [
               { provide: td, useValue: "root" },
               {
                  provide: nr,
                  useFactory: function YO() {
                     return new nr();
                  },
                  deps: [],
               },
               { provide: Fl, useClass: qO, multi: !0, deps: [De, Ee, nf] },
               { provide: Fl, useClass: ZO, multi: !0, deps: [De] },
               { provide: Ol, useClass: Ol, deps: [Nl, cs, ns] },
               { provide: Vo, useExisting: Ol },
               { provide: l0, useExisting: cs },
               { provide: cs, useClass: cs, deps: [De] },
               { provide: Nl, useClass: Nl, deps: [Fl, Ee] },
               { provide: class oO {}, useClass: VO, deps: [] },
               [],
            ];
         let zf,
            D0 = (() => {
               class n {
                  constructor(t) {}
                  static withServerTransition(t) {
                     return { ngModule: n, providers: [{ provide: ns, useValue: t.appId }, { provide: s0, useExisting: ns }, PO] };
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)(M(_0, 12));
                  }),
                  (n.ɵmod = We({ type: n })),
                  (n.ɵinj = ze({ providers: [...b0, ...v0], imports: [YN, MF] })),
                  n
               );
            })(),
            w0 = (() => {
               class n {
                  constructor(t) {
                     this._doc = t;
                  }
                  getTitle() {
                     return this._doc.title;
                  }
                  setTitle(t) {
                     this._doc.title = t || "";
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)(M(De));
                  }),
                  (n.ɵprov = N({
                     token: n,
                     factory: function (t) {
                        let r = null;
                        return (
                           (r = t
                              ? new t()
                              : (function tk() {
                                   return new w0(M(De));
                                })()),
                           r
                        );
                     },
                     providedIn: "root",
                  })),
                  n
               );
            })();
         typeof window < "u" && window;
         try {
            zf = typeof Intl < "u" && Intl.v8BreakIterator;
         } catch {
            zf = !1;
         }
         let us,
            x0 = (() => {
               class n {
                  constructor(t) {
                     (this._platformId = t),
                        (this.isBrowser = this._platformId
                           ? (function tO(n) {
                                return n === Xb;
                             })(this._platformId)
                           : "object" == typeof document && !!document),
                        (this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                        (this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent)),
                        (this.BLINK = this.isBrowser && !(!window.chrome && !zf) && typeof CSS < "u" && !this.EDGE && !this.TRIDENT),
                        (this.WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT),
                        (this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window)),
                        (this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent)),
                        (this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT),
                        (this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT);
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)(M(nf));
                  }),
                  (n.ɵprov = N({ token: n, factory: n.ɵfac, providedIn: "root" })),
                  n
               );
            })();
         function kl(n) {
            return (function ck() {
               if (null == us && typeof window < "u")
                  try {
                     window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: () => (us = !0) }));
                  } finally {
                     us = us || !1;
                  }
               return us;
            })()
               ? n
               : !!n.capture;
         }
         function I0(n) {
            return Array.isArray(n) ? n : [n];
         }
         function A0(n) {
            return n instanceof yt ? n.nativeElement : n;
         }
         const { isArray: vk } = Array,
            { getPrototypeOf: bk, prototype: Dk, keys: wk } = Object;
         function T0(n) {
            if (1 === n.length) {
               const e = n[0];
               if (vk(e)) return { args: e, keys: null };
               if (
                  (function Ck(n) {
                     return n && "object" == typeof n && bk(n) === Dk;
                  })(e)
               ) {
                  const t = wk(e);
                  return { args: t.map((r) => e[r]), keys: t };
               }
            }
            return { args: n, keys: null };
         }
         const { isArray: Ek } = Array;
         function R0(n) {
            return H((e) =>
               (function Mk(n, e) {
                  return Ek(e) ? n(...e) : n(e);
               })(n, e)
            );
         }
         function F0(n, e) {
            return n.reduce((t, r, i) => ((t[r] = e[i]), t), {});
         }
         function qf(...n) {
            const e = mo(n),
               t = zp(n),
               { args: r, keys: i } = T0(n);
            if (0 === r.length) return ke([], e);
            const o = new Te(
               (function xk(n, e, t = vr) {
                  return (r) => {
                     N0(
                        e,
                        () => {
                           const { length: i } = n,
                              o = new Array(i);
                           let s = i,
                              a = i;
                           for (let l = 0; l < i; l++)
                              N0(
                                 e,
                                 () => {
                                    const c = ke(n[l], e);
                                    let u = !1;
                                    c.subscribe(
                                       Re(
                                          r,
                                          (d) => {
                                             (o[l] = d), u || ((u = !0), a--), a || r.next(t(o.slice()));
                                          },
                                          () => {
                                             --s || r.complete();
                                          }
                                       )
                                    );
                                 },
                                 r
                              );
                        },
                        r
                     );
                  };
               })(r, e, i ? (s) => F0(i, s) : vr)
            );
            return t ? o.pipe(R0(t)) : o;
         }
         function N0(n, e, t) {
            n ? Sn(t, n, e) : e();
         }
         function Ll(...n) {
            return (function Sk() {
               return ni(1);
            })()(ke(n, mo(n)));
         }
         function Gi(n) {
            return n <= 0
               ? () => In
               : Oe((e, t) => {
                    let r = 0;
                    e.subscribe(
                       Re(t, (i) => {
                          ++r <= n && (t.next(i), n <= r && t.complete());
                       })
                    );
                 });
         }
         function Dn(n, e) {
            return Oe((t, r) => {
               let i = 0;
               t.subscribe(Re(r, (o) => n.call(e, o, i++) && r.next(o)));
            });
         }
         class Ak extends bt {
            constructor(e, t) {
               super();
            }
            schedule(e, t = 0) {
               return this;
            }
         }
         const Vl = {
               setInterval(n, e, ...t) {
                  const { delegate: r } = Vl;
                  return r?.setInterval ? r.setInterval(n, e, ...t) : setInterval(n, e, ...t);
               },
               clearInterval(n) {
                  const { delegate: e } = Vl;
                  return (e?.clearInterval || clearInterval)(n);
               },
               delegate: void 0,
            },
            O0 = { now: () => (O0.delegate || Date).now(), delegate: void 0 };
         class ds {
            constructor(e, t = ds.now) {
               (this.schedulerActionCtor = e), (this.now = t);
            }
            schedule(e, t = 0, r) {
               return new this.schedulerActionCtor(this, e).schedule(r, t);
            }
         }
         ds.now = O0.now;
         const Fk = new (class Rk extends ds {
            constructor(e, t = ds.now) {
               super(e, t), (this.actions = []), (this._active = !1);
            }
            flush(e) {
               const { actions: t } = this;
               if (this._active) return void t.push(e);
               let r;
               this._active = !0;
               do {
                  if ((r = e.execute(e.state, e.delay))) break;
               } while ((e = t.shift()));
               if (((this._active = !1), r)) {
                  for (; (e = t.shift()); ) e.unsubscribe();
                  throw r;
               }
            }
         })(
            class Tk extends Ak {
               constructor(e, t) {
                  super(e, t), (this.scheduler = e), (this.work = t), (this.pending = !1);
               }
               schedule(e, t = 0) {
                  var r;
                  if (this.closed) return this;
                  this.state = e;
                  const i = this.id,
                     o = this.scheduler;
                  return (
                     null != i && (this.id = this.recycleAsyncId(o, i, t)),
                     (this.pending = !0),
                     (this.delay = t),
                     (this.id = null !== (r = this.id) && void 0 !== r ? r : this.requestAsyncId(o, this.id, t)),
                     this
                  );
               }
               requestAsyncId(e, t, r = 0) {
                  return Vl.setInterval(e.flush.bind(e, this), r);
               }
               recycleAsyncId(e, t, r = 0) {
                  if (null != r && this.delay === r && !1 === this.pending) return t;
                  null != t && Vl.clearInterval(t);
               }
               execute(e, t) {
                  if (this.closed) return new Error("executing a cancelled action");
                  this.pending = !1;
                  const r = this._execute(e, t);
                  if (r) return r;
                  !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
               }
               _execute(e, t) {
                  let i,
                     r = !1;
                  try {
                     this.work(e);
                  } catch (o) {
                     (r = !0), (i = o || new Error("Scheduled action threw falsy error"));
                  }
                  if (r) return this.unsubscribe(), i;
               }
               unsubscribe() {
                  if (!this.closed) {
                     const { id: e, scheduler: t } = this,
                        { actions: r } = t;
                     (this.work = this.state = this.scheduler = null),
                        (this.pending = !1),
                        ti(r, this),
                        null != e && (this.id = this.recycleAsyncId(t, e, null)),
                        (this.delay = null),
                        super.unsubscribe();
                  }
               }
            }
         );
         function k0(...n) {
            const e = mo(n);
            return Oe((t, r) => {
               (e ? Ll(n, t, e) : Ll(n, t)).subscribe(r);
            });
         }
         function Ok(n) {
            return Oe((e, t) => {
               Nt(n).subscribe(Re(t, () => t.complete(), Vc)), !t.closed && e.subscribe(t);
            });
         }
         const P0 = new Set();
         let qi,
            kk = (() => {
               class n {
                  constructor(t) {
                     (this._platform = t), (this._matchMedia = this._platform.isBrowser && window.matchMedia ? window.matchMedia.bind(window) : Lk);
                  }
                  matchMedia(t) {
                     return (
                        (this._platform.WEBKIT || this._platform.BLINK) &&
                           (function Pk(n) {
                              if (!P0.has(n))
                                 try {
                                    qi || ((qi = document.createElement("style")), qi.setAttribute("type", "text/css"), document.head.appendChild(qi)),
                                       qi.sheet && (qi.sheet.insertRule(`@media ${n} {body{ }}`, 0), P0.add(n));
                                 } catch (e) {
                                    console.error(e);
                                 }
                           })(t),
                        this._matchMedia(t)
                     );
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)(M(x0));
                  }),
                  (n.ɵprov = N({ token: n, factory: n.ɵfac, providedIn: "root" })),
                  n
               );
            })();
         function Lk(n) {
            return { matches: "all" === n || "" === n, media: n, addListener: () => {}, removeListener: () => {} };
         }
         let Vk = (() => {
            class n {
               constructor(t, r) {
                  (this._mediaMatcher = t), (this._zone = r), (this._queries = new Map()), (this._destroySubject = new ln());
               }
               ngOnDestroy() {
                  this._destroySubject.next(), this._destroySubject.complete();
               }
               isMatched(t) {
                  return L0(I0(t)).some((i) => this._registerQuery(i).mql.matches);
               }
               observe(t) {
                  let o = qf(L0(I0(t)).map((s) => this._registerQuery(s).observable));
                  return (
                     (o = Ll(
                        o.pipe(Gi(1)),
                        o.pipe(
                           (function Ik(n) {
                              return Dn((e, t) => n <= t);
                           })(1),
                           (function Nk(n, e = Fk) {
                              return Oe((t, r) => {
                                 let i = null,
                                    o = null,
                                    s = null;
                                 const a = () => {
                                    if (i) {
                                       i.unsubscribe(), (i = null);
                                       const c = o;
                                       (o = null), r.next(c);
                                    }
                                 };
                                 function l() {
                                    const c = s + n,
                                       u = e.now();
                                    if (u < c) return (i = this.schedule(void 0, c - u)), void r.add(i);
                                    a();
                                 }
                                 t.subscribe(
                                    Re(
                                       r,
                                       (c) => {
                                          (o = c), (s = e.now()), i || ((i = e.schedule(l, n)), r.add(i));
                                       },
                                       () => {
                                          a(), r.complete();
                                       },
                                       void 0,
                                       () => {
                                          o = i = null;
                                       }
                                    )
                                 );
                              });
                           })(0)
                        )
                     )),
                     o.pipe(
                        H((s) => {
                           const a = { matches: !1, breakpoints: {} };
                           return (
                              s.forEach(({ matches: l, query: c }) => {
                                 (a.matches = a.matches || l), (a.breakpoints[c] = l);
                              }),
                              a
                           );
                        })
                     )
                  );
               }
               _registerQuery(t) {
                  if (this._queries.has(t)) return this._queries.get(t);
                  const r = this._mediaMatcher.matchMedia(t),
                     o = {
                        observable: new Te((s) => {
                           const a = (l) => this._zone.run(() => s.next(l));
                           return (
                              r.addListener(a),
                              () => {
                                 r.removeListener(a);
                              }
                           );
                        }).pipe(
                           k0(r),
                           H(({ matches: s }) => ({ query: t, matches: s })),
                           Ok(this._destroySubject)
                        ),
                        mql: r,
                     };
                  return this._queries.set(t, o), o;
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)(M(kk), M(Ee));
               }),
               (n.ɵprov = N({ token: n, factory: n.ɵfac, providedIn: "root" })),
               n
            );
         })();
         function L0(n) {
            return n
               .map((e) => e.split(","))
               .reduce((e, t) => e.concat(t))
               .map((e) => e.trim());
         }
         const U0 = "cdk-high-contrast-black-on-white",
            H0 = "cdk-high-contrast-white-on-black",
            Wf = "cdk-high-contrast-active";
         let Zk = (() => {
               class n {
                  constructor(t, r) {
                     (this._platform = t),
                        (this._document = r),
                        (this._breakpointSubscription = X(Vk)
                           .observe("(forced-colors: active)")
                           .subscribe(() => {
                              this._hasCheckedHighContrastMode && ((this._hasCheckedHighContrastMode = !1), this._applyBodyHighContrastModeCssClasses());
                           }));
                  }
                  getHighContrastMode() {
                     if (!this._platform.isBrowser) return 0;
                     const t = this._document.createElement("div");
                     (t.style.backgroundColor = "rgb(1,2,3)"), (t.style.position = "absolute"), this._document.body.appendChild(t);
                     const r = this._document.defaultView || window,
                        i = r && r.getComputedStyle ? r.getComputedStyle(t) : null,
                        o = ((i && i.backgroundColor) || "").replace(/ /g, "");
                     switch ((t.remove(), o)) {
                        case "rgb(0,0,0)":
                        case "rgb(45,50,54)":
                        case "rgb(32,32,32)":
                           return 2;
                        case "rgb(255,255,255)":
                        case "rgb(255,250,239)":
                           return 1;
                     }
                     return 0;
                  }
                  ngOnDestroy() {
                     this._breakpointSubscription.unsubscribe();
                  }
                  _applyBodyHighContrastModeCssClasses() {
                     if (!this._hasCheckedHighContrastMode && this._platform.isBrowser && this._document.body) {
                        const t = this._document.body.classList;
                        t.remove(Wf, U0, H0), (this._hasCheckedHighContrastMode = !0);
                        const r = this.getHighContrastMode();
                        1 === r ? t.add(Wf, U0) : 2 === r && t.add(Wf, H0);
                     }
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)(M(x0), M(De));
                  }),
                  (n.ɵprov = N({ token: n, factory: n.ɵfac, providedIn: "root" })),
                  n
               );
            })(),
            $0 = (() => {
               class n {}
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)();
                  }),
                  (n.ɵmod = We({ type: n })),
                  (n.ɵinj = ze({})),
                  n
               );
            })();
         const Jk = new x("mat-sanity-checks", {
            providedIn: "root",
            factory: function Xk() {
               return !0;
            },
         });
         let Wi = (() => {
            class n {
               constructor(t, r, i) {
                  (this._sanityChecks = r),
                     (this._document = i),
                     (this._hasDoneGlobalChecks = !1),
                     t._applyBodyHighContrastModeCssClasses(),
                     this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0);
               }
               _checkIsEnabled(t) {
                  return (
                     !(function fk() {
                        return (
                           (typeof __karma__ < "u" && !!__karma__) ||
                           (typeof jasmine < "u" && !!jasmine) ||
                           (typeof jest < "u" && !!jest) ||
                           (typeof Mocha < "u" && !!Mocha)
                        );
                     })() && ("boolean" == typeof this._sanityChecks ? this._sanityChecks : !!this._sanityChecks[t])
                  );
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)(M(Zk), M(Jk, 8), M(De));
               }),
               (n.ɵmod = We({ type: n })),
               (n.ɵinj = ze({ imports: [$0, $0] })),
               n
            );
         })();
         class tP {
            constructor(e, t, r, i = !1) {
               (this._renderer = e), (this.element = t), (this.config = r), (this._animationForciblyDisabledThroughCss = i), (this.state = 3);
            }
            fadeOut() {
               this._renderer.fadeOutRipple(this);
            }
         }
         const q0 = kl({ passive: !0, capture: !0 });
         class nP {
            constructor() {
               (this._events = new Map()),
                  (this._delegateEventHandler = (e) => {
                     const t = (function dk(n) {
                        return n.composedPath ? n.composedPath()[0] : n.target;
                     })(e);
                     t &&
                        this._events.get(e.type)?.forEach((r, i) => {
                           (i === t || i.contains(t)) && r.forEach((o) => o.handleEvent(e));
                        });
                  });
            }
            addHandler(e, t, r, i) {
               const o = this._events.get(t);
               if (o) {
                  const s = o.get(r);
                  s ? s.add(i) : o.set(r, new Set([i]));
               } else
                  this._events.set(t, new Map([[r, new Set([i])]])),
                     e.runOutsideAngular(() => {
                        document.addEventListener(t, this._delegateEventHandler, q0);
                     });
            }
            removeHandler(e, t, r) {
               const i = this._events.get(e);
               if (!i) return;
               const o = i.get(t);
               !o ||
                  (o.delete(r),
                  0 === o.size && i.delete(t),
                  0 === i.size && (this._events.delete(e), document.removeEventListener(e, this._delegateEventHandler, q0)));
            }
         }
         const W0 = { enterDuration: 225, exitDuration: 150 },
            K0 = kl({ passive: !0, capture: !0 }),
            Z0 = ["mousedown", "touchstart"],
            Q0 = ["mouseup", "mouseleave", "touchend", "touchcancel"];
         class Bl {
            constructor(e, t, r, i) {
               (this._target = e),
                  (this._ngZone = t),
                  (this._platform = i),
                  (this._isPointerDown = !1),
                  (this._activeRipples = new Map()),
                  (this._pointerUpEventsRegistered = !1),
                  i.isBrowser && (this._containerElement = A0(r));
            }
            fadeInRipple(e, t, r = {}) {
               const i = (this._containerRect = this._containerRect || this._containerElement.getBoundingClientRect()),
                  o = { ...W0, ...r.animation };
               r.centered && ((e = i.left + i.width / 2), (t = i.top + i.height / 2));
               const s =
                     r.radius ||
                     (function iP(n, e, t) {
                        const r = Math.max(Math.abs(n - t.left), Math.abs(n - t.right)),
                           i = Math.max(Math.abs(e - t.top), Math.abs(e - t.bottom));
                        return Math.sqrt(r * r + i * i);
                     })(e, t, i),
                  a = e - i.left,
                  l = t - i.top,
                  c = o.enterDuration,
                  u = document.createElement("div");
               u.classList.add("mat-ripple-element"),
                  (u.style.left = a - s + "px"),
                  (u.style.top = l - s + "px"),
                  (u.style.height = 2 * s + "px"),
                  (u.style.width = 2 * s + "px"),
                  null != r.color && (u.style.backgroundColor = r.color),
                  (u.style.transitionDuration = `${c}ms`),
                  this._containerElement.appendChild(u);
               const d = window.getComputedStyle(u),
                  h = d.transitionDuration,
                  p = "none" === d.transitionProperty || "0s" === h || "0s, 0s" === h || (0 === i.width && 0 === i.height),
                  m = new tP(this, u, r, p);
               (u.style.transform = "scale3d(1, 1, 1)"), (m.state = 0), r.persistent || (this._mostRecentTransientRipple = m);
               let g = null;
               return (
                  !p &&
                     (c || o.exitDuration) &&
                     this._ngZone.runOutsideAngular(() => {
                        const v = () => this._finishRippleTransition(m),
                           E = () => this._destroyRipple(m);
                        u.addEventListener("transitionend", v), u.addEventListener("transitioncancel", E), (g = { onTransitionEnd: v, onTransitionCancel: E });
                     }),
                  this._activeRipples.set(m, g),
                  (p || !c) && this._finishRippleTransition(m),
                  m
               );
            }
            fadeOutRipple(e) {
               if (2 === e.state || 3 === e.state) return;
               const t = e.element,
                  r = { ...W0, ...e.config.animation };
               (t.style.transitionDuration = `${r.exitDuration}ms`),
                  (t.style.opacity = "0"),
                  (e.state = 2),
                  (e._animationForciblyDisabledThroughCss || !r.exitDuration) && this._finishRippleTransition(e);
            }
            fadeOutAll() {
               this._getActiveRipples().forEach((e) => e.fadeOut());
            }
            fadeOutAllNonPersistent() {
               this._getActiveRipples().forEach((e) => {
                  e.config.persistent || e.fadeOut();
               });
            }
            setupTriggerEvents(e) {
               const t = A0(e);
               !this._platform.isBrowser ||
                  !t ||
                  t === this._triggerElement ||
                  (this._removeTriggerEvents(),
                  (this._triggerElement = t),
                  Z0.forEach((r) => {
                     Bl._eventManager.addHandler(this._ngZone, r, t, this);
                  }));
            }
            handleEvent(e) {
               "mousedown" === e.type ? this._onMousedown(e) : "touchstart" === e.type ? this._onTouchStart(e) : this._onPointerUp(),
                  this._pointerUpEventsRegistered ||
                     (this._ngZone.runOutsideAngular(() => {
                        Q0.forEach((t) => {
                           this._triggerElement.addEventListener(t, this, K0);
                        });
                     }),
                     (this._pointerUpEventsRegistered = !0));
            }
            _finishRippleTransition(e) {
               0 === e.state ? this._startFadeOutTransition(e) : 2 === e.state && this._destroyRipple(e);
            }
            _startFadeOutTransition(e) {
               const t = e === this._mostRecentTransientRipple,
                  { persistent: r } = e.config;
               (e.state = 1), !r && (!t || !this._isPointerDown) && e.fadeOut();
            }
            _destroyRipple(e) {
               const t = this._activeRipples.get(e) ?? null;
               this._activeRipples.delete(e),
                  this._activeRipples.size || (this._containerRect = null),
                  e === this._mostRecentTransientRipple && (this._mostRecentTransientRipple = null),
                  (e.state = 3),
                  null !== t &&
                     (e.element.removeEventListener("transitionend", t.onTransitionEnd),
                     e.element.removeEventListener("transitioncancel", t.onTransitionCancel)),
                  e.element.remove();
            }
            _onMousedown(e) {
               const t = (function qk(n) {
                     return 0 === n.buttons || (0 === n.offsetX && 0 === n.offsetY);
                  })(e),
                  r = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + 800;
               !this._target.rippleDisabled && !t && !r && ((this._isPointerDown = !0), this.fadeInRipple(e.clientX, e.clientY, this._target.rippleConfig));
            }
            _onTouchStart(e) {
               if (
                  !this._target.rippleDisabled &&
                  !(function Wk(n) {
                     const e = (n.touches && n.touches[0]) || (n.changedTouches && n.changedTouches[0]);
                     return !(!e || -1 !== e.identifier || (null != e.radiusX && 1 !== e.radiusX) || (null != e.radiusY && 1 !== e.radiusY));
                  })(e)
               ) {
                  (this._lastTouchStartEvent = Date.now()), (this._isPointerDown = !0);
                  const t = e.changedTouches;
                  for (let r = 0; r < t.length; r++) this.fadeInRipple(t[r].clientX, t[r].clientY, this._target.rippleConfig);
               }
            }
            _onPointerUp() {
               !this._isPointerDown ||
                  ((this._isPointerDown = !1),
                  this._getActiveRipples().forEach((e) => {
                     !e.config.persistent && (1 === e.state || (e.config.terminateOnPointerUp && 0 === e.state)) && e.fadeOut();
                  }));
            }
            _getActiveRipples() {
               return Array.from(this._activeRipples.keys());
            }
            _removeTriggerEvents() {
               const e = this._triggerElement;
               e &&
                  (Z0.forEach((t) => Bl._eventManager.removeHandler(t, e, this)),
                  this._pointerUpEventsRegistered && Q0.forEach((t) => e.removeEventListener(t, this, K0)));
            }
         }
         Bl._eventManager = new nP();
         let oP = (() => {
            class n {}
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)();
               }),
               (n.ɵmod = We({ type: n })),
               (n.ɵinj = ze({ imports: [Wi, Wi] })),
               n
            );
         })();
         function O(...n) {
            return ke(n, mo(n));
         }
         function Ki(n, e) {
            const t = pe(n) ? n : () => n,
               r = (i) => i.error(t());
            return new Te(e ? (i) => e.schedule(r, 0, i) : r);
         }
         function $e(n, e, t) {
            const r = pe(n) || e || t ? { next: n, error: e, complete: t } : n;
            return r
               ? Oe((i, o) => {
                    var s;
                    null === (s = r.subscribe) || void 0 === s || s.call(r);
                    let a = !0;
                    i.subscribe(
                       Re(
                          o,
                          (l) => {
                             var c;
                             null === (c = r.next) || void 0 === c || c.call(r, l), o.next(l);
                          },
                          () => {
                             var l;
                             (a = !1), null === (l = r.complete) || void 0 === l || l.call(r), o.complete();
                          },
                          (l) => {
                             var c;
                             (a = !1), null === (c = r.error) || void 0 === c || c.call(r, l), o.error(l);
                          },
                          () => {
                             var l, c;
                             a && (null === (l = r.unsubscribe) || void 0 === l || l.call(r)), null === (c = r.finalize) || void 0 === c || c.call(r);
                          }
                       )
                    );
                 })
               : vr;
         }
         function zn(n) {
            return Oe((e, t) => {
               let o,
                  r = null,
                  i = !1;
               (r = e.subscribe(
                  Re(t, void 0, void 0, (s) => {
                     (o = Nt(n(s, zn(n)(e)))), r ? (r.unsubscribe(), (r = null), o.subscribe(t)) : (i = !0);
                  })
               )),
                  i && (r.unsubscribe(), (r = null), o.subscribe(t));
            });
         }
         function jl(n) {
            return Oe((e, t) => {
               try {
                  e.subscribe(t);
               } finally {
                  t.add(n);
               }
            });
         }
         function sr(n, e) {
            return pe(e) ? qe(n, e, 1) : qe(n, 1);
         }
         let RP = (() => {
            class n {}
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)();
               }),
               (n.ɵmod = We({ type: n })),
               (n.ɵinj = ze({ imports: [Wi, Wi] })),
               n
            );
         })();
         class an extends ln {
            constructor(e) {
               super(), (this._value = e);
            }
            get value() {
               return this.getValue();
            }
            _subscribe(e) {
               const t = super._subscribe(e);
               return !t.closed && e.next(this._value), t;
            }
            getValue() {
               const { hasError: e, thrownError: t, _value: r } = this;
               if (e) throw t;
               return this._throwIfClosed(), r;
            }
            next(e) {
               super.next((this._value = e));
            }
         }
         const Gl = ho(
            (n) =>
               function () {
                  n(this), (this.name = "EmptyError"), (this.message = "no elements in sequence");
               }
         );
         function pD(n) {
            return new Te((e) => {
               Nt(n()).subscribe(e);
            });
         }
         function eh() {
            return Oe((n, e) => {
               let t = null;
               n._refCount++;
               const r = Re(e, void 0, void 0, void 0, () => {
                  if (!n || n._refCount <= 0 || 0 < --n._refCount) return void (t = null);
                  const i = n._connection,
                     o = t;
                  (t = null), i && (!o || i === o) && i.unsubscribe(), e.unsubscribe();
               });
               n.subscribe(r), r.closed || (t = n.connect());
            });
         }
         class mD extends Te {
            constructor(e, t) {
               super(),
                  (this.source = e),
                  (this.subjectFactory = t),
                  (this._subject = null),
                  (this._refCount = 0),
                  (this._connection = null),
                  Tp(e) && (this.lift = e.lift);
            }
            _subscribe(e) {
               return this.getSubject().subscribe(e);
            }
            getSubject() {
               const e = this._subject;
               return (!e || e.isStopped) && (this._subject = this.subjectFactory()), this._subject;
            }
            _teardown() {
               this._refCount = 0;
               const { _connection: e } = this;
               (this._subject = this._connection = null), e?.unsubscribe();
            }
            connect() {
               let e = this._connection;
               if (!e) {
                  e = this._connection = new bt();
                  const t = this.getSubject();
                  e.add(
                     this.source.subscribe(
                        Re(
                           t,
                           void 0,
                           () => {
                              this._teardown(), t.complete();
                           },
                           (r) => {
                              this._teardown(), t.error(r);
                           },
                           () => this._teardown()
                        )
                     )
                  ),
                     e.closed && ((this._connection = null), (e = bt.EMPTY));
               }
               return e;
            }
            refCount() {
               return eh()(this);
            }
         }
         function wn(n, e) {
            return Oe((t, r) => {
               let i = null,
                  o = 0,
                  s = !1;
               const a = () => s && !i && r.complete();
               t.subscribe(
                  Re(
                     r,
                     (l) => {
                        i?.unsubscribe();
                        let c = 0;
                        const u = o++;
                        Nt(n(l, u)).subscribe(
                           (i = Re(
                              r,
                              (d) => r.next(e ? e(l, d, u, c++) : d),
                              () => {
                                 (i = null), a();
                              }
                           ))
                        );
                     },
                     () => {
                        (s = !0), a();
                     }
                  )
               );
            });
         }
         function ql(n) {
            return Oe((e, t) => {
               let r = !1;
               e.subscribe(
                  Re(
                     t,
                     (i) => {
                        (r = !0), t.next(i);
                     },
                     () => {
                        r || t.next(n), t.complete();
                     }
                  )
               );
            });
         }
         function gD(n = FP) {
            return Oe((e, t) => {
               let r = !1;
               e.subscribe(
                  Re(
                     t,
                     (i) => {
                        (r = !0), t.next(i);
                     },
                     () => (r ? t.complete() : t.error(n()))
                  )
               );
            });
         }
         function FP() {
            return new Gl();
         }
         function cr(n, e) {
            const t = arguments.length >= 2;
            return (r) => r.pipe(n ? Dn((i, o) => n(i, o, r)) : vr, Gi(1), t ? ql(e) : gD(() => new Gl()));
         }
         function NP(n, e, t, r, i) {
            return (o, s) => {
               let a = t,
                  l = e,
                  c = 0;
               o.subscribe(
                  Re(
                     s,
                     (u) => {
                        const d = c++;
                        (l = a ? n(l, u, d) : ((a = !0), u)), r && s.next(l);
                     },
                     i &&
                        (() => {
                           a && s.next(l), s.complete();
                        })
                  )
               );
            };
         }
         function yD(n, e) {
            return Oe(NP(n, e, arguments.length >= 2, !0));
         }
         function th(n) {
            return n <= 0
               ? () => In
               : Oe((e, t) => {
                    let r = [];
                    e.subscribe(
                       Re(
                          t,
                          (i) => {
                             r.push(i), n < r.length && r.shift();
                          },
                          () => {
                             for (const i of r) t.next(i);
                             t.complete();
                          },
                          void 0,
                          () => {
                             r = null;
                          }
                       )
                    );
                 });
         }
         function _D(n, e) {
            const t = arguments.length >= 2;
            return (r) => r.pipe(n ? Dn((i, o) => n(i, o, r)) : vr, th(1), t ? ql(e) : gD(() => new Gl()));
         }
         const Y = "primary",
            ms = Symbol("RouteTitle");
         class PP {
            constructor(e) {
               this.params = e || {};
            }
            has(e) {
               return Object.prototype.hasOwnProperty.call(this.params, e);
            }
            get(e) {
               if (this.has(e)) {
                  const t = this.params[e];
                  return Array.isArray(t) ? t[0] : t;
               }
               return null;
            }
            getAll(e) {
               if (this.has(e)) {
                  const t = this.params[e];
                  return Array.isArray(t) ? t : [t];
               }
               return [];
            }
            get keys() {
               return Object.keys(this.params);
            }
         }
         function Yi(n) {
            return new PP(n);
         }
         function LP(n, e, t) {
            const r = t.path.split("/");
            if (r.length > n.length || ("full" === t.pathMatch && (e.hasChildren() || r.length < n.length))) return null;
            const i = {};
            for (let o = 0; o < r.length; o++) {
               const s = r[o],
                  a = n[o];
               if (s.startsWith(":")) i[s.substring(1)] = a;
               else if (s !== a.path) return null;
            }
            return { consumed: n.slice(0, r.length), posParams: i };
         }
         function Cn(n, e) {
            const t = n ? Object.keys(n) : void 0,
               r = e ? Object.keys(e) : void 0;
            if (!t || !r || t.length != r.length) return !1;
            let i;
            for (let o = 0; o < t.length; o++) if (((i = t[o]), !vD(n[i], e[i]))) return !1;
            return !0;
         }
         function vD(n, e) {
            if (Array.isArray(n) && Array.isArray(e)) {
               if (n.length !== e.length) return !1;
               const t = [...n].sort(),
                  r = [...e].sort();
               return t.every((i, o) => r[o] === i);
            }
            return n === e;
         }
         function bD(n) {
            return Array.prototype.concat.apply([], n);
         }
         function DD(n) {
            return n.length > 0 ? n[n.length - 1] : null;
         }
         function Xe(n, e) {
            for (const t in n) n.hasOwnProperty(t) && e(n[t], t);
         }
         function ur(n) {
            return Td(n) ? n : zo(n) ? ke(Promise.resolve(n)) : O(n);
         }
         const Wl = !1,
            BP = {
               exact: function ED(n, e, t) {
                  if (!$r(n.segments, e.segments) || !Kl(n.segments, e.segments, t) || n.numberOfChildren !== e.numberOfChildren) return !1;
                  for (const r in e.children) if (!n.children[r] || !ED(n.children[r], e.children[r], t)) return !1;
                  return !0;
               },
               subset: MD,
            },
            wD = {
               exact: function jP(n, e) {
                  return Cn(n, e);
               },
               subset: function UP(n, e) {
                  return Object.keys(e).length <= Object.keys(n).length && Object.keys(e).every((t) => vD(n[t], e[t]));
               },
               ignored: () => !0,
            };
         function CD(n, e, t) {
            return (
               BP[t.paths](n.root, e.root, t.matrixParams) &&
               wD[t.queryParams](n.queryParams, e.queryParams) &&
               !("exact" === t.fragment && n.fragment !== e.fragment)
            );
         }
         function MD(n, e, t) {
            return xD(n, e, e.segments, t);
         }
         function xD(n, e, t, r) {
            if (n.segments.length > t.length) {
               const i = n.segments.slice(0, t.length);
               return !(!$r(i, t) || e.hasChildren() || !Kl(i, t, r));
            }
            if (n.segments.length === t.length) {
               if (!$r(n.segments, t) || !Kl(n.segments, t, r)) return !1;
               for (const i in e.children) if (!n.children[i] || !MD(n.children[i], e.children[i], r)) return !1;
               return !0;
            }
            {
               const i = t.slice(0, n.segments.length),
                  o = t.slice(n.segments.length);
               return !!($r(n.segments, i) && Kl(n.segments, i, r) && n.children[Y]) && xD(n.children[Y], e, o, r);
            }
         }
         function Kl(n, e, t) {
            return e.every((r, i) => wD[t](n[i].parameters, r.parameters));
         }
         class Hr {
            constructor(e = new J([], {}), t = {}, r = null) {
               (this.root = e), (this.queryParams = t), (this.fragment = r);
            }
            get queryParamMap() {
               return this._queryParamMap || (this._queryParamMap = Yi(this.queryParams)), this._queryParamMap;
            }
            toString() {
               return zP.serialize(this);
            }
         }
         class J {
            constructor(e, t) {
               (this.segments = e), (this.children = t), (this.parent = null), Xe(t, (r, i) => (r.parent = this));
            }
            hasChildren() {
               return this.numberOfChildren > 0;
            }
            get numberOfChildren() {
               return Object.keys(this.children).length;
            }
            toString() {
               return Zl(this);
            }
         }
         class gs {
            constructor(e, t) {
               (this.path = e), (this.parameters = t);
            }
            get parameterMap() {
               return this._parameterMap || (this._parameterMap = Yi(this.parameters)), this._parameterMap;
            }
            toString() {
               return AD(this);
            }
         }
         function $r(n, e) {
            return n.length === e.length && n.every((t, r) => t.path === e[r].path);
         }
         let ys = (() => {
            class n {}
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)();
               }),
               (n.ɵprov = N({
                  token: n,
                  factory: function () {
                     return new nh();
                  },
                  providedIn: "root",
               })),
               n
            );
         })();
         class nh {
            parse(e) {
               const t = new JP(e);
               return new Hr(t.parseRootSegment(), t.parseQueryParams(), t.parseFragment());
            }
            serialize(e) {
               const t = `/${_s(e.root, !0)}`,
                  r = (function WP(n) {
                     const e = Object.keys(n)
                        .map((t) => {
                           const r = n[t];
                           return Array.isArray(r) ? r.map((i) => `${Ql(t)}=${Ql(i)}`).join("&") : `${Ql(t)}=${Ql(r)}`;
                        })
                        .filter((t) => !!t);
                     return e.length ? `?${e.join("&")}` : "";
                  })(e.queryParams);
               return `${t}${r}${
                  "string" == typeof e.fragment
                     ? `#${(function GP(n) {
                          return encodeURI(n);
                       })(e.fragment)}`
                     : ""
               }`;
            }
         }
         const zP = new nh();
         function Zl(n) {
            return n.segments.map((e) => AD(e)).join("/");
         }
         function _s(n, e) {
            if (!n.hasChildren()) return Zl(n);
            if (e) {
               const t = n.children[Y] ? _s(n.children[Y], !1) : "",
                  r = [];
               return (
                  Xe(n.children, (i, o) => {
                     o !== Y && r.push(`${o}:${_s(i, !1)}`);
                  }),
                  r.length > 0 ? `${t}(${r.join("//")})` : t
               );
            }
            {
               const t = (function $P(n, e) {
                  let t = [];
                  return (
                     Xe(n.children, (r, i) => {
                        i === Y && (t = t.concat(e(r, i)));
                     }),
                     Xe(n.children, (r, i) => {
                        i !== Y && (t = t.concat(e(r, i)));
                     }),
                     t
                  );
               })(n, (r, i) => (i === Y ? [_s(n.children[Y], !1)] : [`${i}:${_s(r, !1)}`]));
               return 1 === Object.keys(n.children).length && null != n.children[Y] ? `${Zl(n)}/${t[0]}` : `${Zl(n)}/(${t.join("//")})`;
            }
         }
         function SD(n) {
            return encodeURIComponent(n).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",");
         }
         function Ql(n) {
            return SD(n).replace(/%3B/gi, ";");
         }
         function rh(n) {
            return SD(n).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&");
         }
         function Yl(n) {
            return decodeURIComponent(n);
         }
         function ID(n) {
            return Yl(n.replace(/\+/g, "%20"));
         }
         function AD(n) {
            return `${rh(n.path)}${(function qP(n) {
               return Object.keys(n)
                  .map((e) => `;${rh(e)}=${rh(n[e])}`)
                  .join("");
            })(n.parameters)}`;
         }
         const KP = /^[^\/()?;=#]+/;
         function Xl(n) {
            const e = n.match(KP);
            return e ? e[0] : "";
         }
         const ZP = /^[^=?&#]+/,
            YP = /^[^&#]+/;
         class JP {
            constructor(e) {
               (this.url = e), (this.remaining = e);
            }
            parseRootSegment() {
               return (
                  this.consumeOptional("/"),
                  "" === this.remaining || this.peekStartsWith("?") || this.peekStartsWith("#") ? new J([], {}) : new J([], this.parseChildren())
               );
            }
            parseQueryParams() {
               const e = {};
               if (this.consumeOptional("?"))
                  do {
                     this.parseQueryParam(e);
                  } while (this.consumeOptional("&"));
               return e;
            }
            parseFragment() {
               return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null;
            }
            parseChildren() {
               if ("" === this.remaining) return {};
               this.consumeOptional("/");
               const e = [];
               for (
                  this.peekStartsWith("(") || e.push(this.parseSegment());
                  this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");

               )
                  this.capture("/"), e.push(this.parseSegment());
               let t = {};
               this.peekStartsWith("/(") && (this.capture("/"), (t = this.parseParens(!0)));
               let r = {};
               return this.peekStartsWith("(") && (r = this.parseParens(!1)), (e.length > 0 || Object.keys(t).length > 0) && (r[Y] = new J(e, t)), r;
            }
            parseSegment() {
               const e = Xl(this.remaining);
               if ("" === e && this.peekStartsWith(";")) throw new _(4009, Wl);
               return this.capture(e), new gs(Yl(e), this.parseMatrixParams());
            }
            parseMatrixParams() {
               const e = {};
               for (; this.consumeOptional(";"); ) this.parseParam(e);
               return e;
            }
            parseParam(e) {
               const t = Xl(this.remaining);
               if (!t) return;
               this.capture(t);
               let r = "";
               if (this.consumeOptional("=")) {
                  const i = Xl(this.remaining);
                  i && ((r = i), this.capture(r));
               }
               e[Yl(t)] = Yl(r);
            }
            parseQueryParam(e) {
               const t = (function QP(n) {
                  const e = n.match(ZP);
                  return e ? e[0] : "";
               })(this.remaining);
               if (!t) return;
               this.capture(t);
               let r = "";
               if (this.consumeOptional("=")) {
                  const s = (function XP(n) {
                     const e = n.match(YP);
                     return e ? e[0] : "";
                  })(this.remaining);
                  s && ((r = s), this.capture(r));
               }
               const i = ID(t),
                  o = ID(r);
               if (e.hasOwnProperty(i)) {
                  let s = e[i];
                  Array.isArray(s) || ((s = [s]), (e[i] = s)), s.push(o);
               } else e[i] = o;
            }
            parseParens(e) {
               const t = {};
               for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0; ) {
                  const r = Xl(this.remaining),
                     i = this.remaining[r.length];
                  if ("/" !== i && ")" !== i && ";" !== i) throw new _(4010, Wl);
                  let o;
                  r.indexOf(":") > -1 ? ((o = r.slice(0, r.indexOf(":"))), this.capture(o), this.capture(":")) : e && (o = Y);
                  const s = this.parseChildren();
                  (t[o] = 1 === Object.keys(s).length ? s[Y] : new J([], s)), this.consumeOptional("//");
               }
               return t;
            }
            peekStartsWith(e) {
               return this.remaining.startsWith(e);
            }
            consumeOptional(e) {
               return !!this.peekStartsWith(e) && ((this.remaining = this.remaining.substring(e.length)), !0);
            }
            capture(e) {
               if (!this.consumeOptional(e)) throw new _(4011, Wl);
            }
         }
         function ih(n) {
            return n.segments.length > 0 ? new J([], { [Y]: n }) : n;
         }
         function Jl(n) {
            const e = {};
            for (const r of Object.keys(n.children)) {
               const o = Jl(n.children[r]);
               (o.segments.length > 0 || o.hasChildren()) && (e[r] = o);
            }
            return (function eL(n) {
               if (1 === n.numberOfChildren && n.children[Y]) {
                  const e = n.children[Y];
                  return new J(n.segments.concat(e.segments), e.children);
               }
               return n;
            })(new J(n.segments, e));
         }
         function zr(n) {
            return n instanceof Hr;
         }
         function rL(n, e, t, r, i) {
            if (0 === t.length) return Xi(e.root, e.root, e.root, r, i);
            const o = (function FD(n) {
               if ("string" == typeof n[0] && 1 === n.length && "/" === n[0]) return new RD(!0, 0, n);
               let e = 0,
                  t = !1;
               const r = n.reduce((i, o, s) => {
                  if ("object" == typeof o && null != o) {
                     if (o.outlets) {
                        const a = {};
                        return (
                           Xe(o.outlets, (l, c) => {
                              a[c] = "string" == typeof l ? l.split("/") : l;
                           }),
                           [...i, { outlets: a }]
                        );
                     }
                     if (o.segmentPath) return [...i, o.segmentPath];
                  }
                  return "string" != typeof o
                     ? [...i, o]
                     : 0 === s
                     ? (o.split("/").forEach((a, l) => {
                          (0 == l && "." === a) || (0 == l && "" === a ? (t = !0) : ".." === a ? e++ : "" != a && i.push(a));
                       }),
                       i)
                     : [...i, o];
               }, []);
               return new RD(t, e, r);
            })(t);
            return o.toRoot()
               ? Xi(e.root, e.root, new J([], {}), r, i)
               : (function s(l) {
                    const c = (function oL(n, e, t, r) {
                          if (n.isAbsolute) return new Ji(e.root, !0, 0);
                          if (-1 === r) return new Ji(t, t === e.root, 0);
                          return (function ND(n, e, t) {
                             let r = n,
                                i = e,
                                o = t;
                             for (; o > i; ) {
                                if (((o -= i), (r = r.parent), !r)) throw new _(4005, !1);
                                i = r.segments.length;
                             }
                             return new Ji(r, !1, i - o);
                          })(t, r + (vs(n.commands[0]) ? 0 : 1), n.numberOfDoubleDots);
                       })(o, e, n.snapshot?._urlSegment, l),
                       u = c.processChildren ? Ds(c.segmentGroup, c.index, o.commands) : sh(c.segmentGroup, c.index, o.commands);
                    return Xi(e.root, c.segmentGroup, u, r, i);
                 })(n.snapshot?._lastPathIndex);
         }
         function vs(n) {
            return "object" == typeof n && null != n && !n.outlets && !n.segmentPath;
         }
         function bs(n) {
            return "object" == typeof n && null != n && n.outlets;
         }
         function Xi(n, e, t, r, i) {
            let s,
               o = {};
            r &&
               Xe(r, (l, c) => {
                  o[c] = Array.isArray(l) ? l.map((u) => `${u}`) : `${l}`;
               }),
               (s = n === e ? t : TD(n, e, t));
            const a = ih(Jl(s));
            return new Hr(a, o, i);
         }
         function TD(n, e, t) {
            const r = {};
            return (
               Xe(n.children, (i, o) => {
                  r[o] = i === e ? t : TD(i, e, t);
               }),
               new J(n.segments, r)
            );
         }
         class RD {
            constructor(e, t, r) {
               if (((this.isAbsolute = e), (this.numberOfDoubleDots = t), (this.commands = r), e && r.length > 0 && vs(r[0]))) throw new _(4003, !1);
               const i = r.find(bs);
               if (i && i !== DD(r)) throw new _(4004, !1);
            }
            toRoot() {
               return this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0];
            }
         }
         class Ji {
            constructor(e, t, r) {
               (this.segmentGroup = e), (this.processChildren = t), (this.index = r);
            }
         }
         function sh(n, e, t) {
            if ((n || (n = new J([], {})), 0 === n.segments.length && n.hasChildren())) return Ds(n, e, t);
            const r = (function aL(n, e, t) {
                  let r = 0,
                     i = e;
                  const o = { match: !1, pathIndex: 0, commandIndex: 0 };
                  for (; i < n.segments.length; ) {
                     if (r >= t.length) return o;
                     const s = n.segments[i],
                        a = t[r];
                     if (bs(a)) break;
                     const l = `${a}`,
                        c = r < t.length - 1 ? t[r + 1] : null;
                     if (i > 0 && void 0 === l) break;
                     if (l && c && "object" == typeof c && void 0 === c.outlets) {
                        if (!kD(l, c, s)) return o;
                        r += 2;
                     } else {
                        if (!kD(l, {}, s)) return o;
                        r++;
                     }
                     i++;
                  }
                  return { match: !0, pathIndex: i, commandIndex: r };
               })(n, e, t),
               i = t.slice(r.commandIndex);
            if (r.match && r.pathIndex < n.segments.length) {
               const o = new J(n.segments.slice(0, r.pathIndex), {});
               return (o.children[Y] = new J(n.segments.slice(r.pathIndex), n.children)), Ds(o, 0, i);
            }
            return r.match && 0 === i.length ? new J(n.segments, {}) : r.match && !n.hasChildren() ? ah(n, e, t) : r.match ? Ds(n, 0, i) : ah(n, e, t);
         }
         function Ds(n, e, t) {
            if (0 === t.length) return new J(n.segments, {});
            {
               const r = (function sL(n) {
                     return bs(n[0]) ? n[0].outlets : { [Y]: n };
                  })(t),
                  i = {};
               return (
                  Xe(r, (o, s) => {
                     "string" == typeof o && (o = [o]), null !== o && (i[s] = sh(n.children[s], e, o));
                  }),
                  Xe(n.children, (o, s) => {
                     void 0 === r[s] && (i[s] = o);
                  }),
                  new J(n.segments, i)
               );
            }
         }
         function ah(n, e, t) {
            const r = n.segments.slice(0, e);
            let i = 0;
            for (; i < t.length; ) {
               const o = t[i];
               if (bs(o)) {
                  const l = lL(o.outlets);
                  return new J(r, l);
               }
               if (0 === i && vs(t[0])) {
                  r.push(new gs(n.segments[e].path, OD(t[0]))), i++;
                  continue;
               }
               const s = bs(o) ? o.outlets[Y] : `${o}`,
                  a = i < t.length - 1 ? t[i + 1] : null;
               s && a && vs(a) ? (r.push(new gs(s, OD(a))), (i += 2)) : (r.push(new gs(s, {})), i++);
            }
            return new J(r, {});
         }
         function lL(n) {
            const e = {};
            return (
               Xe(n, (t, r) => {
                  "string" == typeof t && (t = [t]), null !== t && (e[r] = ah(new J([], {}), 0, t));
               }),
               e
            );
         }
         function OD(n) {
            const e = {};
            return Xe(n, (t, r) => (e[r] = `${t}`)), e;
         }
         function kD(n, e, t) {
            return n == t.path && Cn(e, t.parameters);
         }
         class Gn {
            constructor(e, t) {
               (this.id = e), (this.url = t);
            }
         }
         class lh extends Gn {
            constructor(e, t, r = "imperative", i = null) {
               super(e, t), (this.type = 0), (this.navigationTrigger = r), (this.restoredState = i);
            }
            toString() {
               return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
            }
         }
         class Gr extends Gn {
            constructor(e, t, r) {
               super(e, t), (this.urlAfterRedirects = r), (this.type = 1);
            }
            toString() {
               return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
            }
         }
         class ec extends Gn {
            constructor(e, t, r, i) {
               super(e, t), (this.reason = r), (this.code = i), (this.type = 2);
            }
            toString() {
               return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
            }
         }
         class PD extends Gn {
            constructor(e, t, r, i) {
               super(e, t), (this.error = r), (this.target = i), (this.type = 3);
            }
            toString() {
               return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
            }
         }
         class cL extends Gn {
            constructor(e, t, r, i) {
               super(e, t), (this.urlAfterRedirects = r), (this.state = i), (this.type = 4);
            }
            toString() {
               return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
            }
         }
         class uL extends Gn {
            constructor(e, t, r, i) {
               super(e, t), (this.urlAfterRedirects = r), (this.state = i), (this.type = 7);
            }
            toString() {
               return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
            }
         }
         class dL extends Gn {
            constructor(e, t, r, i, o) {
               super(e, t), (this.urlAfterRedirects = r), (this.state = i), (this.shouldActivate = o), (this.type = 8);
            }
            toString() {
               return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
            }
         }
         class fL extends Gn {
            constructor(e, t, r, i) {
               super(e, t), (this.urlAfterRedirects = r), (this.state = i), (this.type = 5);
            }
            toString() {
               return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
            }
         }
         class hL extends Gn {
            constructor(e, t, r, i) {
               super(e, t), (this.urlAfterRedirects = r), (this.state = i), (this.type = 6);
            }
            toString() {
               return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
            }
         }
         class pL {
            constructor(e) {
               (this.route = e), (this.type = 9);
            }
            toString() {
               return `RouteConfigLoadStart(path: ${this.route.path})`;
            }
         }
         class mL {
            constructor(e) {
               (this.route = e), (this.type = 10);
            }
            toString() {
               return `RouteConfigLoadEnd(path: ${this.route.path})`;
            }
         }
         class gL {
            constructor(e) {
               (this.snapshot = e), (this.type = 11);
            }
            toString() {
               return `ChildActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
            }
         }
         class yL {
            constructor(e) {
               (this.snapshot = e), (this.type = 12);
            }
            toString() {
               return `ChildActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
            }
         }
         class _L {
            constructor(e) {
               (this.snapshot = e), (this.type = 13);
            }
            toString() {
               return `ActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
            }
         }
         class vL {
            constructor(e) {
               (this.snapshot = e), (this.type = 14);
            }
            toString() {
               return `ActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
            }
         }
         class LD {
            constructor(e, t, r) {
               (this.routerEvent = e), (this.position = t), (this.anchor = r), (this.type = 15);
            }
            toString() {
               return `Scroll(anchor: '${this.anchor}', position: '${this.position ? `${this.position[0]}, ${this.position[1]}` : null}')`;
            }
         }
         let DL = (() => {
               class n {
                  createUrlTree(t, r, i, o, s, a) {
                     return rL(t || r.root, i, o, s, a);
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)();
                  }),
                  (n.ɵprov = N({ token: n, factory: n.ɵfac })),
                  n
               );
            })(),
            wL = (() => {
               class n {}
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)();
                  }),
                  (n.ɵprov = N({
                     token: n,
                     factory: function (e) {
                        return DL.ɵfac(e);
                     },
                     providedIn: "root",
                  })),
                  n
               );
            })();
         class VD {
            constructor(e) {
               this._root = e;
            }
            get root() {
               return this._root.value;
            }
            parent(e) {
               const t = this.pathFromRoot(e);
               return t.length > 1 ? t[t.length - 2] : null;
            }
            children(e) {
               const t = ch(e, this._root);
               return t ? t.children.map((r) => r.value) : [];
            }
            firstChild(e) {
               const t = ch(e, this._root);
               return t && t.children.length > 0 ? t.children[0].value : null;
            }
            siblings(e) {
               const t = uh(e, this._root);
               return t.length < 2 ? [] : t[t.length - 2].children.map((i) => i.value).filter((i) => i !== e);
            }
            pathFromRoot(e) {
               return uh(e, this._root).map((t) => t.value);
            }
         }
         function ch(n, e) {
            if (n === e.value) return e;
            for (const t of e.children) {
               const r = ch(n, t);
               if (r) return r;
            }
            return null;
         }
         function uh(n, e) {
            if (n === e.value) return [e];
            for (const t of e.children) {
               const r = uh(n, t);
               if (r.length) return r.unshift(e), r;
            }
            return [];
         }
         class qn {
            constructor(e, t) {
               (this.value = e), (this.children = t);
            }
            toString() {
               return `TreeNode(${this.value})`;
            }
         }
         function eo(n) {
            const e = {};
            return n && n.children.forEach((t) => (e[t.value.outlet] = t)), e;
         }
         class BD extends VD {
            constructor(e, t) {
               super(e), (this.snapshot = t), dh(this, e);
            }
            toString() {
               return this.snapshot.toString();
            }
         }
         function jD(n, e) {
            const t = (function CL(n, e) {
                  const s = new tc([], {}, {}, "", {}, Y, e, null, n.root, -1, {});
                  return new HD("", new qn(s, []));
               })(n, e),
               r = new an([new gs("", {})]),
               i = new an({}),
               o = new an({}),
               s = new an({}),
               a = new an(""),
               l = new to(r, i, s, a, o, Y, e, t.root);
            return (l.snapshot = t.root), new BD(new qn(l, []), t);
         }
         class to {
            constructor(e, t, r, i, o, s, a, l) {
               (this.url = e),
                  (this.params = t),
                  (this.queryParams = r),
                  (this.fragment = i),
                  (this.data = o),
                  (this.outlet = s),
                  (this.component = a),
                  (this.title = this.data?.pipe(H((c) => c[ms])) ?? O(void 0)),
                  (this._futureSnapshot = l);
            }
            get routeConfig() {
               return this._futureSnapshot.routeConfig;
            }
            get root() {
               return this._routerState.root;
            }
            get parent() {
               return this._routerState.parent(this);
            }
            get firstChild() {
               return this._routerState.firstChild(this);
            }
            get children() {
               return this._routerState.children(this);
            }
            get pathFromRoot() {
               return this._routerState.pathFromRoot(this);
            }
            get paramMap() {
               return this._paramMap || (this._paramMap = this.params.pipe(H((e) => Yi(e)))), this._paramMap;
            }
            get queryParamMap() {
               return this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(H((e) => Yi(e)))), this._queryParamMap;
            }
            toString() {
               return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
            }
         }
         function UD(n, e = "emptyOnly") {
            const t = n.pathFromRoot;
            let r = 0;
            if ("always" !== e)
               for (r = t.length - 1; r >= 1; ) {
                  const i = t[r],
                     o = t[r - 1];
                  if (i.routeConfig && "" === i.routeConfig.path) r--;
                  else {
                     if (o.component) break;
                     r--;
                  }
               }
            return (function EL(n) {
               return n.reduce(
                  (e, t) => ({
                     params: { ...e.params, ...t.params },
                     data: { ...e.data, ...t.data },
                     resolve: { ...t.data, ...e.resolve, ...t.routeConfig?.data, ...t._resolvedData },
                  }),
                  { params: {}, data: {}, resolve: {} }
               );
            })(t.slice(r));
         }
         class tc {
            constructor(e, t, r, i, o, s, a, l, c, u, d) {
               (this.url = e),
                  (this.params = t),
                  (this.queryParams = r),
                  (this.fragment = i),
                  (this.data = o),
                  (this.outlet = s),
                  (this.component = a),
                  (this.routeConfig = l),
                  (this._urlSegment = c),
                  (this._lastPathIndex = u),
                  (this._resolve = d);
            }
            get title() {
               return this.data?.[ms];
            }
            get root() {
               return this._routerState.root;
            }
            get parent() {
               return this._routerState.parent(this);
            }
            get firstChild() {
               return this._routerState.firstChild(this);
            }
            get children() {
               return this._routerState.children(this);
            }
            get pathFromRoot() {
               return this._routerState.pathFromRoot(this);
            }
            get paramMap() {
               return this._paramMap || (this._paramMap = Yi(this.params)), this._paramMap;
            }
            get queryParamMap() {
               return this._queryParamMap || (this._queryParamMap = Yi(this.queryParams)), this._queryParamMap;
            }
            toString() {
               return `Route(url:'${this.url.map((r) => r.toString()).join("/")}', path:'${this.routeConfig ? this.routeConfig.path : ""}')`;
            }
         }
         class HD extends VD {
            constructor(e, t) {
               super(t), (this.url = e), dh(this, t);
            }
            toString() {
               return $D(this._root);
            }
         }
         function dh(n, e) {
            (e.value._routerState = n), e.children.forEach((t) => dh(n, t));
         }
         function $D(n) {
            const e = n.children.length > 0 ? ` { ${n.children.map($D).join(", ")} } ` : "";
            return `${n.value}${e}`;
         }
         function fh(n) {
            if (n.snapshot) {
               const e = n.snapshot,
                  t = n._futureSnapshot;
               (n.snapshot = t),
                  Cn(e.queryParams, t.queryParams) || n.queryParams.next(t.queryParams),
                  e.fragment !== t.fragment && n.fragment.next(t.fragment),
                  Cn(e.params, t.params) || n.params.next(t.params),
                  (function VP(n, e) {
                     if (n.length !== e.length) return !1;
                     for (let t = 0; t < n.length; ++t) if (!Cn(n[t], e[t])) return !1;
                     return !0;
                  })(e.url, t.url) || n.url.next(t.url),
                  Cn(e.data, t.data) || n.data.next(t.data);
            } else (n.snapshot = n._futureSnapshot), n.data.next(n._futureSnapshot.data);
         }
         function hh(n, e) {
            const t =
               Cn(n.params, e.params) &&
               (function HP(n, e) {
                  return $r(n, e) && n.every((t, r) => Cn(t.parameters, e[r].parameters));
               })(n.url, e.url);
            return t && !(!n.parent != !e.parent) && (!n.parent || hh(n.parent, e.parent));
         }
         function ws(n, e, t) {
            if (t && n.shouldReuseRoute(e.value, t.value.snapshot)) {
               const r = t.value;
               r._futureSnapshot = e.value;
               const i = (function xL(n, e, t) {
                  return e.children.map((r) => {
                     for (const i of t.children) if (n.shouldReuseRoute(r.value, i.value.snapshot)) return ws(n, r, i);
                     return ws(n, r);
                  });
               })(n, e, t);
               return new qn(r, i);
            }
            {
               if (n.shouldAttach(e.value)) {
                  const o = n.retrieve(e.value);
                  if (null !== o) {
                     const s = o.route;
                     return (s.value._futureSnapshot = e.value), (s.children = e.children.map((a) => ws(n, a))), s;
                  }
               }
               const r = (function SL(n) {
                     return new to(new an(n.url), new an(n.params), new an(n.queryParams), new an(n.fragment), new an(n.data), n.outlet, n.component, n);
                  })(e.value),
                  i = e.children.map((o) => ws(n, o));
               return new qn(r, i);
            }
         }
         const ph = "ngNavigationCancelingError";
         function zD(n, e) {
            const { redirectTo: t, navigationBehaviorOptions: r } = zr(e) ? { redirectTo: e, navigationBehaviorOptions: void 0 } : e,
               i = GD(!1, 0, e);
            return (i.url = t), (i.navigationBehaviorOptions = r), i;
         }
         function GD(n, e, t) {
            const r = new Error("NavigationCancelingError: " + (n || ""));
            return (r[ph] = !0), (r.cancellationCode = e), t && (r.url = t), r;
         }
         function qD(n) {
            return WD(n) && zr(n.url);
         }
         function WD(n) {
            return n && n[ph];
         }
         class IL {
            constructor() {
               (this.outlet = null), (this.route = null), (this.resolver = null), (this.injector = null), (this.children = new Cs()), (this.attachRef = null);
            }
         }
         let Cs = (() => {
            class n {
               constructor() {
                  this.contexts = new Map();
               }
               onChildOutletCreated(t, r) {
                  const i = this.getOrCreateContext(t);
                  (i.outlet = r), this.contexts.set(t, i);
               }
               onChildOutletDestroyed(t) {
                  const r = this.getContext(t);
                  r && ((r.outlet = null), (r.attachRef = null));
               }
               onOutletDeactivated() {
                  const t = this.contexts;
                  return (this.contexts = new Map()), t;
               }
               onOutletReAttached(t) {
                  this.contexts = t;
               }
               getOrCreateContext(t) {
                  let r = this.getContext(t);
                  return r || ((r = new IL()), this.contexts.set(t, r)), r;
               }
               getContext(t) {
                  return this.contexts.get(t) || null;
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)();
               }),
               (n.ɵprov = N({ token: n, factory: n.ɵfac, providedIn: "root" })),
               n
            );
         })();
         const nc = !1;
         let KD = (() => {
            class n {
               constructor() {
                  (this.activated = null),
                     (this._activatedRoute = null),
                     (this.name = Y),
                     (this.activateEvents = new ve()),
                     (this.deactivateEvents = new ve()),
                     (this.attachEvents = new ve()),
                     (this.detachEvents = new ve()),
                     (this.parentContexts = X(Cs)),
                     (this.location = X(nn)),
                     (this.changeDetector = X(ml)),
                     (this.environmentInjector = X(kn));
               }
               ngOnChanges(t) {
                  if (t.name) {
                     const { firstChange: r, previousValue: i } = t.name;
                     if (r) return;
                     this.isTrackedInParentContexts(i) && (this.deactivate(), this.parentContexts.onChildOutletDestroyed(i)), this.initializeOutletWithName();
                  }
               }
               ngOnDestroy() {
                  this.isTrackedInParentContexts(this.name) && this.parentContexts.onChildOutletDestroyed(this.name);
               }
               isTrackedInParentContexts(t) {
                  return this.parentContexts.getContext(t)?.outlet === this;
               }
               ngOnInit() {
                  this.initializeOutletWithName();
               }
               initializeOutletWithName() {
                  if ((this.parentContexts.onChildOutletCreated(this.name, this), this.activated)) return;
                  const t = this.parentContexts.getContext(this.name);
                  t?.route && (t.attachRef ? this.attach(t.attachRef, t.route) : this.activateWith(t.route, t.injector));
               }
               get isActivated() {
                  return !!this.activated;
               }
               get component() {
                  if (!this.activated) throw new _(4012, nc);
                  return this.activated.instance;
               }
               get activatedRoute() {
                  if (!this.activated) throw new _(4012, nc);
                  return this._activatedRoute;
               }
               get activatedRouteData() {
                  return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
               }
               detach() {
                  if (!this.activated) throw new _(4012, nc);
                  this.location.detach();
                  const t = this.activated;
                  return (this.activated = null), (this._activatedRoute = null), this.detachEvents.emit(t.instance), t;
               }
               attach(t, r) {
                  (this.activated = t), (this._activatedRoute = r), this.location.insert(t.hostView), this.attachEvents.emit(t.instance);
               }
               deactivate() {
                  if (this.activated) {
                     const t = this.component;
                     this.activated.destroy(), (this.activated = null), (this._activatedRoute = null), this.deactivateEvents.emit(t);
                  }
               }
               activateWith(t, r) {
                  if (this.isActivated) throw new _(4013, nc);
                  this._activatedRoute = t;
                  const i = this.location,
                     s = t.snapshot.component,
                     a = this.parentContexts.getOrCreateContext(this.name).children,
                     l = new AL(t, a, i.injector);
                  if (
                     r &&
                     (function TL(n) {
                        return !!n.resolveComponentFactory;
                     })(r)
                  ) {
                     const c = r.resolveComponentFactory(s);
                     this.activated = i.createComponent(c, i.length, l);
                  } else this.activated = i.createComponent(s, { index: i.length, injector: l, environmentInjector: r ?? this.environmentInjector });
                  this.changeDetector.markForCheck(), this.activateEvents.emit(this.activated.instance);
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)();
               }),
               (n.ɵdir = $({
                  type: n,
                  selectors: [["router-outlet"]],
                  inputs: { name: "name" },
                  outputs: { activateEvents: "activate", deactivateEvents: "deactivate", attachEvents: "attach", detachEvents: "detach" },
                  exportAs: ["outlet"],
                  standalone: !0,
                  features: [Pt],
               })),
               n
            );
         })();
         class AL {
            constructor(e, t, r) {
               (this.route = e), (this.childContexts = t), (this.parent = r);
            }
            get(e, t) {
               return e === to ? this.route : e === Cs ? this.childContexts : this.parent.get(e, t);
            }
         }
         let mh = (() => {
            class n {}
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)();
               }),
               (n.ɵcmp = Ve({
                  type: n,
                  selectors: [["ng-component"]],
                  standalone: !0,
                  features: [mv],
                  decls: 1,
                  vars: 0,
                  template: function (t, r) {
                     1 & t && B(0, "router-outlet");
                  },
                  dependencies: [KD],
                  encapsulation: 2,
               })),
               n
            );
         })();
         function ZD(n, e) {
            return n.providers && !n._injector && (n._injector = al(n.providers, e, `Route: ${n.path}`)), n._injector ?? e;
         }
         function yh(n) {
            const e = n.children && n.children.map(yh),
               t = e ? { ...n, children: e } : { ...n };
            return !t.component && !t.loadComponent && (e || t.loadChildren) && t.outlet && t.outlet !== Y && (t.component = mh), t;
         }
         function $t(n) {
            return n.outlet || Y;
         }
         function QD(n, e) {
            const t = n.filter((r) => $t(r) === e);
            return t.push(...n.filter((r) => $t(r) !== e)), t;
         }
         function Es(n) {
            if (!n) return null;
            if (n.routeConfig?._injector) return n.routeConfig._injector;
            for (let e = n.parent; e; e = e.parent) {
               const t = e.routeConfig;
               if (t?._loadedInjector) return t._loadedInjector;
               if (t?._injector) return t._injector;
            }
            return null;
         }
         class kL {
            constructor(e, t, r, i) {
               (this.routeReuseStrategy = e), (this.futureState = t), (this.currState = r), (this.forwardEvent = i);
            }
            activate(e) {
               const t = this.futureState._root,
                  r = this.currState ? this.currState._root : null;
               this.deactivateChildRoutes(t, r, e), fh(this.futureState.root), this.activateChildRoutes(t, r, e);
            }
            deactivateChildRoutes(e, t, r) {
               const i = eo(t);
               e.children.forEach((o) => {
                  const s = o.value.outlet;
                  this.deactivateRoutes(o, i[s], r), delete i[s];
               }),
                  Xe(i, (o, s) => {
                     this.deactivateRouteAndItsChildren(o, r);
                  });
            }
            deactivateRoutes(e, t, r) {
               const i = e.value,
                  o = t ? t.value : null;
               if (i === o)
                  if (i.component) {
                     const s = r.getContext(i.outlet);
                     s && this.deactivateChildRoutes(e, t, s.children);
                  } else this.deactivateChildRoutes(e, t, r);
               else o && this.deactivateRouteAndItsChildren(t, r);
            }
            deactivateRouteAndItsChildren(e, t) {
               e.value.component && this.routeReuseStrategy.shouldDetach(e.value.snapshot)
                  ? this.detachAndStoreRouteSubtree(e, t)
                  : this.deactivateRouteAndOutlet(e, t);
            }
            detachAndStoreRouteSubtree(e, t) {
               const r = t.getContext(e.value.outlet),
                  i = r && e.value.component ? r.children : t,
                  o = eo(e);
               for (const s of Object.keys(o)) this.deactivateRouteAndItsChildren(o[s], i);
               if (r && r.outlet) {
                  const s = r.outlet.detach(),
                     a = r.children.onOutletDeactivated();
                  this.routeReuseStrategy.store(e.value.snapshot, { componentRef: s, route: e, contexts: a });
               }
            }
            deactivateRouteAndOutlet(e, t) {
               const r = t.getContext(e.value.outlet),
                  i = r && e.value.component ? r.children : t,
                  o = eo(e);
               for (const s of Object.keys(o)) this.deactivateRouteAndItsChildren(o[s], i);
               r && r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated(), (r.attachRef = null), (r.resolver = null), (r.route = null));
            }
            activateChildRoutes(e, t, r) {
               const i = eo(t);
               e.children.forEach((o) => {
                  this.activateRoutes(o, i[o.value.outlet], r), this.forwardEvent(new vL(o.value.snapshot));
               }),
                  e.children.length && this.forwardEvent(new yL(e.value.snapshot));
            }
            activateRoutes(e, t, r) {
               const i = e.value,
                  o = t ? t.value : null;
               if ((fh(i), i === o))
                  if (i.component) {
                     const s = r.getOrCreateContext(i.outlet);
                     this.activateChildRoutes(e, t, s.children);
                  } else this.activateChildRoutes(e, t, r);
               else if (i.component) {
                  const s = r.getOrCreateContext(i.outlet);
                  if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
                     const a = this.routeReuseStrategy.retrieve(i.snapshot);
                     this.routeReuseStrategy.store(i.snapshot, null),
                        s.children.onOutletReAttached(a.contexts),
                        (s.attachRef = a.componentRef),
                        (s.route = a.route.value),
                        s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                        fh(a.route.value),
                        this.activateChildRoutes(e, null, s.children);
                  } else {
                     const a = Es(i.snapshot),
                        l = a?.get(Lo) ?? null;
                     (s.attachRef = null),
                        (s.route = i),
                        (s.resolver = l),
                        (s.injector = a),
                        s.outlet && s.outlet.activateWith(i, s.injector),
                        this.activateChildRoutes(e, null, s.children);
                  }
               } else this.activateChildRoutes(e, null, r);
            }
         }
         class YD {
            constructor(e) {
               (this.path = e), (this.route = this.path[this.path.length - 1]);
            }
         }
         class rc {
            constructor(e, t) {
               (this.component = e), (this.route = t);
            }
         }
         function PL(n, e, t) {
            const r = n._root;
            return Ms(r, e ? e._root : null, t, [r.value]);
         }
         function no(n, e) {
            const t = Symbol(),
               r = e.get(n, t);
            return r === t
               ? "function" != typeof n ||
                 (function hM(n) {
                    return null !== ca(n);
                 })(n)
                  ? e.get(n)
                  : n
               : r;
         }
         function Ms(n, e, t, r, i = { canDeactivateChecks: [], canActivateChecks: [] }) {
            const o = eo(e);
            return (
               n.children.forEach((s) => {
                  (function VL(n, e, t, r, i = { canDeactivateChecks: [], canActivateChecks: [] }) {
                     const o = n.value,
                        s = e ? e.value : null,
                        a = t ? t.getContext(n.value.outlet) : null;
                     if (s && o.routeConfig === s.routeConfig) {
                        const l = (function BL(n, e, t) {
                           if ("function" == typeof t) return t(n, e);
                           switch (t) {
                              case "pathParamsChange":
                                 return !$r(n.url, e.url);
                              case "pathParamsOrQueryParamsChange":
                                 return !$r(n.url, e.url) || !Cn(n.queryParams, e.queryParams);
                              case "always":
                                 return !0;
                              case "paramsOrQueryParamsChange":
                                 return !hh(n, e) || !Cn(n.queryParams, e.queryParams);
                              default:
                                 return !hh(n, e);
                           }
                        })(s, o, o.routeConfig.runGuardsAndResolvers);
                        l ? i.canActivateChecks.push(new YD(r)) : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
                           Ms(n, e, o.component ? (a ? a.children : null) : t, r, i),
                           l && a && a.outlet && a.outlet.isActivated && i.canDeactivateChecks.push(new rc(a.outlet.component, s));
                     } else s && xs(e, a, i), i.canActivateChecks.push(new YD(r)), Ms(n, null, o.component ? (a ? a.children : null) : t, r, i);
                  })(s, o[s.value.outlet], t, r.concat([s.value]), i),
                     delete o[s.value.outlet];
               }),
               Xe(o, (s, a) => xs(s, t.getContext(a), i)),
               i
            );
         }
         function xs(n, e, t) {
            const r = eo(n),
               i = n.value;
            Xe(r, (o, s) => {
               xs(o, i.component ? (e ? e.children.getContext(s) : null) : e, t);
            }),
               t.canDeactivateChecks.push(new rc(i.component && e && e.outlet && e.outlet.isActivated ? e.outlet.component : null, i));
         }
         function Ss(n) {
            return "function" == typeof n;
         }
         function _h(n) {
            return n instanceof Gl || "EmptyError" === n?.name;
         }
         const ic = Symbol("INITIAL_VALUE");
         function ro() {
            return wn((n) =>
               qf(n.map((e) => e.pipe(Gi(1), k0(ic)))).pipe(
                  H((e) => {
                     for (const t of e)
                        if (!0 !== t) {
                           if (t === ic) return ic;
                           if (!1 === t || t instanceof Hr) return t;
                        }
                     return !0;
                  }),
                  Dn((e) => e !== ic),
                  Gi(1)
               )
            );
         }
         function XD(n) {
            return (function NE(...n) {
               return Sp(n);
            })(
               $e((e) => {
                  if (zr(e)) throw zD(0, e);
               }),
               H((e) => !0 === e)
            );
         }
         const vh = { matched: !1, consumedSegments: [], remainingSegments: [], parameters: {}, positionalParamSegments: {} };
         function JD(n, e, t, r, i) {
            const o = bh(n, e, t);
            return o.matched
               ? (function n2(n, e, t, r) {
                    const i = e.canMatch;
                    return i && 0 !== i.length
                       ? O(
                            i.map((s) => {
                               const a = no(s, n);
                               return ur(
                                  (function GL(n) {
                                     return n && Ss(n.canMatch);
                                  })(a)
                                     ? a.canMatch(e, t)
                                     : n.runInContext(() => a(e, t))
                               );
                            })
                         ).pipe(ro(), XD())
                       : O(!0);
                 })((r = ZD(e, r)), e, t).pipe(H((s) => (!0 === s ? o : { ...vh })))
               : O(o);
         }
         function bh(n, e, t) {
            if ("" === e.path)
               return "full" === e.pathMatch && (n.hasChildren() || t.length > 0)
                  ? { ...vh }
                  : { matched: !0, consumedSegments: [], remainingSegments: t, parameters: {}, positionalParamSegments: {} };
            const i = (e.matcher || LP)(t, n, e);
            if (!i) return { ...vh };
            const o = {};
            Xe(i.posParams, (a, l) => {
               o[l] = a.path;
            });
            const s = i.consumed.length > 0 ? { ...o, ...i.consumed[i.consumed.length - 1].parameters } : o;
            return {
               matched: !0,
               consumedSegments: i.consumed,
               remainingSegments: t.slice(i.consumed.length),
               parameters: s,
               positionalParamSegments: i.posParams ?? {},
            };
         }
         function oc(n, e, t, r) {
            if (
               t.length > 0 &&
               (function s2(n, e, t) {
                  return t.some((r) => sc(n, e, r) && $t(r) !== Y);
               })(n, t, r)
            ) {
               const o = new J(
                  e,
                  (function o2(n, e, t, r) {
                     const i = {};
                     (i[Y] = r), (r._sourceSegment = n), (r._segmentIndexShift = e.length);
                     for (const o of t)
                        if ("" === o.path && $t(o) !== Y) {
                           const s = new J([], {});
                           (s._sourceSegment = n), (s._segmentIndexShift = e.length), (i[$t(o)] = s);
                        }
                     return i;
                  })(n, e, r, new J(t, n.children))
               );
               return (o._sourceSegment = n), (o._segmentIndexShift = e.length), { segmentGroup: o, slicedSegments: [] };
            }
            if (
               0 === t.length &&
               (function a2(n, e, t) {
                  return t.some((r) => sc(n, e, r));
               })(n, t, r)
            ) {
               const o = new J(
                  n.segments,
                  (function r2(n, e, t, r, i) {
                     const o = {};
                     for (const s of r)
                        if (sc(n, t, s) && !i[$t(s)]) {
                           const a = new J([], {});
                           (a._sourceSegment = n), (a._segmentIndexShift = e.length), (o[$t(s)] = a);
                        }
                     return { ...i, ...o };
                  })(n, e, t, r, n.children)
               );
               return (o._sourceSegment = n), (o._segmentIndexShift = e.length), { segmentGroup: o, slicedSegments: t };
            }
            const i = new J(n.segments, n.children);
            return (i._sourceSegment = n), (i._segmentIndexShift = e.length), { segmentGroup: i, slicedSegments: t };
         }
         function sc(n, e, t) {
            return (!(n.hasChildren() || e.length > 0) || "full" !== t.pathMatch) && "" === t.path;
         }
         function ew(n, e, t, r) {
            return !!($t(n) === r || (r !== Y && sc(e, t, n))) && ("**" === n.path || bh(e, n, t).matched);
         }
         function tw(n, e, t) {
            return 0 === e.length && !n.children[t];
         }
         const ac = !1;
         class lc {
            constructor(e) {
               this.segmentGroup = e || null;
            }
         }
         class nw {
            constructor(e) {
               this.urlTree = e;
            }
         }
         function Is(n) {
            return Ki(new lc(n));
         }
         function rw(n) {
            return Ki(new nw(n));
         }
         class d2 {
            constructor(e, t, r, i, o) {
               (this.injector = e), (this.configLoader = t), (this.urlSerializer = r), (this.urlTree = i), (this.config = o), (this.allowRedirects = !0);
            }
            apply() {
               const e = oc(this.urlTree.root, [], [], this.config).segmentGroup,
                  t = new J(e.segments, e.children);
               return this.expandSegmentGroup(this.injector, this.config, t, Y)
                  .pipe(H((o) => this.createUrlTree(Jl(o), this.urlTree.queryParams, this.urlTree.fragment)))
                  .pipe(
                     zn((o) => {
                        if (o instanceof nw) return (this.allowRedirects = !1), this.match(o.urlTree);
                        throw o instanceof lc ? this.noMatchError(o) : o;
                     })
                  );
            }
            match(e) {
               return this.expandSegmentGroup(this.injector, this.config, e.root, Y)
                  .pipe(H((i) => this.createUrlTree(Jl(i), e.queryParams, e.fragment)))
                  .pipe(
                     zn((i) => {
                        throw i instanceof lc ? this.noMatchError(i) : i;
                     })
                  );
            }
            noMatchError(e) {
               return new _(4002, ac);
            }
            createUrlTree(e, t, r) {
               const i = ih(e);
               return new Hr(i, t, r);
            }
            expandSegmentGroup(e, t, r, i) {
               return 0 === r.segments.length && r.hasChildren()
                  ? this.expandChildren(e, t, r).pipe(H((o) => new J([], o)))
                  : this.expandSegment(e, r, t, r.segments, i, !0);
            }
            expandChildren(e, t, r) {
               const i = [];
               for (const o of Object.keys(r.children)) "primary" === o ? i.unshift(o) : i.push(o);
               return ke(i).pipe(
                  sr((o) => {
                     const s = r.children[o],
                        a = QD(t, o);
                     return this.expandSegmentGroup(e, a, s, o).pipe(H((l) => ({ segment: l, outlet: o })));
                  }),
                  yD((o, s) => ((o[s.outlet] = s.segment), o), {}),
                  _D()
               );
            }
            expandSegment(e, t, r, i, o, s) {
               return ke(r).pipe(
                  sr((a) =>
                     this.expandSegmentAgainstRoute(e, t, r, a, i, o, s).pipe(
                        zn((c) => {
                           if (c instanceof lc) return O(null);
                           throw c;
                        })
                     )
                  ),
                  cr((a) => !!a),
                  zn((a, l) => {
                     if (_h(a)) return tw(t, i, o) ? O(new J([], {})) : Is(t);
                     throw a;
                  })
               );
            }
            expandSegmentAgainstRoute(e, t, r, i, o, s, a) {
               return ew(i, t, o, s)
                  ? void 0 === i.redirectTo
                     ? this.matchSegmentAgainstRoute(e, t, i, o, s)
                     : a && this.allowRedirects
                     ? this.expandSegmentAgainstRouteUsingRedirect(e, t, r, i, o, s)
                     : Is(t)
                  : Is(t);
            }
            expandSegmentAgainstRouteUsingRedirect(e, t, r, i, o, s) {
               return "**" === i.path
                  ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(e, r, i, s)
                  : this.expandRegularSegmentAgainstRouteUsingRedirect(e, t, r, i, o, s);
            }
            expandWildCardWithParamsAgainstRouteUsingRedirect(e, t, r, i) {
               const o = this.applyRedirectCommands([], r.redirectTo, {});
               return r.redirectTo.startsWith("/")
                  ? rw(o)
                  : this.lineralizeSegments(r, o).pipe(
                       qe((s) => {
                          const a = new J(s, {});
                          return this.expandSegment(e, a, t, s, i, !1);
                       })
                    );
            }
            expandRegularSegmentAgainstRouteUsingRedirect(e, t, r, i, o, s) {
               const { matched: a, consumedSegments: l, remainingSegments: c, positionalParamSegments: u } = bh(t, i, o);
               if (!a) return Is(t);
               const d = this.applyRedirectCommands(l, i.redirectTo, u);
               return i.redirectTo.startsWith("/") ? rw(d) : this.lineralizeSegments(i, d).pipe(qe((f) => this.expandSegment(e, t, r, f.concat(c), s, !1)));
            }
            matchSegmentAgainstRoute(e, t, r, i, o) {
               return "**" === r.path
                  ? ((e = ZD(r, e)),
                    r.loadChildren
                       ? (r._loadedRoutes ? O({ routes: r._loadedRoutes, injector: r._loadedInjector }) : this.configLoader.loadChildren(e, r)).pipe(
                            H((a) => ((r._loadedRoutes = a.routes), (r._loadedInjector = a.injector), new J(i, {})))
                         )
                       : O(new J(i, {})))
                  : JD(t, r, i, e).pipe(
                       wn(({ matched: s, consumedSegments: a, remainingSegments: l }) =>
                          s
                             ? this.getChildConfig((e = r._injector ?? e), r, i).pipe(
                                  qe((u) => {
                                     const d = u.injector ?? e,
                                        f = u.routes,
                                        { segmentGroup: h, slicedSegments: p } = oc(t, a, l, f),
                                        m = new J(h.segments, h.children);
                                     if (0 === p.length && m.hasChildren()) return this.expandChildren(d, f, m).pipe(H((y) => new J(a, y)));
                                     if (0 === f.length && 0 === p.length) return O(new J(a, {}));
                                     const g = $t(r) === o;
                                     return this.expandSegment(d, m, f, p, g ? Y : o, !0).pipe(H((E) => new J(a.concat(E.segments), E.children)));
                                  })
                               )
                             : Is(t)
                       )
                    );
            }
            getChildConfig(e, t, r) {
               return t.children
                  ? O({ routes: t.children, injector: e })
                  : t.loadChildren
                  ? void 0 !== t._loadedRoutes
                     ? O({ routes: t._loadedRoutes, injector: t._loadedInjector })
                     : (function t2(n, e, t, r) {
                          const i = e.canLoad;
                          return void 0 === i || 0 === i.length
                             ? O(!0)
                             : O(
                                  i.map((s) => {
                                     const a = no(s, n);
                                     return ur(
                                        (function UL(n) {
                                           return n && Ss(n.canLoad);
                                        })(a)
                                           ? a.canLoad(e, t)
                                           : n.runInContext(() => a(e, t))
                                     );
                                  })
                               ).pipe(ro(), XD());
                       })(e, t, r).pipe(
                          qe((i) =>
                             i
                                ? this.configLoader.loadChildren(e, t).pipe(
                                     $e((o) => {
                                        (t._loadedRoutes = o.routes), (t._loadedInjector = o.injector);
                                     })
                                  )
                                : (function c2(n) {
                                     return Ki(GD(ac, 3));
                                  })()
                          )
                       )
                  : O({ routes: [], injector: e });
            }
            lineralizeSegments(e, t) {
               let r = [],
                  i = t.root;
               for (;;) {
                  if (((r = r.concat(i.segments)), 0 === i.numberOfChildren)) return O(r);
                  if (i.numberOfChildren > 1 || !i.children[Y]) return Ki(new _(4e3, ac));
                  i = i.children[Y];
               }
            }
            applyRedirectCommands(e, t, r) {
               return this.applyRedirectCreateUrlTree(t, this.urlSerializer.parse(t), e, r);
            }
            applyRedirectCreateUrlTree(e, t, r, i) {
               const o = this.createSegmentGroup(e, t.root, r, i);
               return new Hr(o, this.createQueryParams(t.queryParams, this.urlTree.queryParams), t.fragment);
            }
            createQueryParams(e, t) {
               const r = {};
               return (
                  Xe(e, (i, o) => {
                     if ("string" == typeof i && i.startsWith(":")) {
                        const a = i.substring(1);
                        r[o] = t[a];
                     } else r[o] = i;
                  }),
                  r
               );
            }
            createSegmentGroup(e, t, r, i) {
               const o = this.createSegments(e, t.segments, r, i);
               let s = {};
               return (
                  Xe(t.children, (a, l) => {
                     s[l] = this.createSegmentGroup(e, a, r, i);
                  }),
                  new J(o, s)
               );
            }
            createSegments(e, t, r, i) {
               return t.map((o) => (o.path.startsWith(":") ? this.findPosParam(e, o, i) : this.findOrReturn(o, r)));
            }
            findPosParam(e, t, r) {
               const i = r[t.path.substring(1)];
               if (!i) throw new _(4001, ac);
               return i;
            }
            findOrReturn(e, t) {
               let r = 0;
               for (const i of t) {
                  if (i.path === e.path) return t.splice(r), i;
                  r++;
               }
               return e;
            }
         }
         class h2 {}
         class g2 {
            constructor(e, t, r, i, o, s, a) {
               (this.injector = e),
                  (this.rootComponentType = t),
                  (this.config = r),
                  (this.urlTree = i),
                  (this.url = o),
                  (this.paramsInheritanceStrategy = s),
                  (this.urlSerializer = a);
            }
            recognize() {
               const e = oc(
                  this.urlTree.root,
                  [],
                  [],
                  this.config.filter((t) => void 0 === t.redirectTo)
               ).segmentGroup;
               return this.processSegmentGroup(this.injector, this.config, e, Y).pipe(
                  H((t) => {
                     if (null === t) return null;
                     const r = new tc(
                           [],
                           Object.freeze({}),
                           Object.freeze({ ...this.urlTree.queryParams }),
                           this.urlTree.fragment,
                           {},
                           Y,
                           this.rootComponentType,
                           null,
                           this.urlTree.root,
                           -1,
                           {}
                        ),
                        i = new qn(r, t),
                        o = new HD(this.url, i);
                     return this.inheritParamsAndData(o._root), o;
                  })
               );
            }
            inheritParamsAndData(e) {
               const t = e.value,
                  r = UD(t, this.paramsInheritanceStrategy);
               (t.params = Object.freeze(r.params)), (t.data = Object.freeze(r.data)), e.children.forEach((i) => this.inheritParamsAndData(i));
            }
            processSegmentGroup(e, t, r, i) {
               return 0 === r.segments.length && r.hasChildren() ? this.processChildren(e, t, r) : this.processSegment(e, t, r, r.segments, i);
            }
            processChildren(e, t, r) {
               return ke(Object.keys(r.children)).pipe(
                  sr((i) => {
                     const o = r.children[i],
                        s = QD(t, i);
                     return this.processSegmentGroup(e, s, o, i);
                  }),
                  yD((i, o) => (i && o ? (i.push(...o), i) : null)),
                  (function OP(n, e = !1) {
                     return Oe((t, r) => {
                        let i = 0;
                        t.subscribe(
                           Re(r, (o) => {
                              const s = n(o, i++);
                              (s || e) && r.next(o), !s && r.complete();
                           })
                        );
                     });
                  })((i) => null !== i),
                  ql(null),
                  _D(),
                  H((i) => {
                     if (null === i) return null;
                     const o = ow(i);
                     return (
                        (function y2(n) {
                           n.sort((e, t) => (e.value.outlet === Y ? -1 : t.value.outlet === Y ? 1 : e.value.outlet.localeCompare(t.value.outlet)));
                        })(o),
                        o
                     );
                  })
               );
            }
            processSegment(e, t, r, i, o) {
               return ke(t).pipe(
                  sr((s) => this.processSegmentAgainstRoute(s._injector ?? e, s, r, i, o)),
                  cr((s) => !!s),
                  zn((s) => {
                     if (_h(s)) return tw(r, i, o) ? O([]) : O(null);
                     throw s;
                  })
               );
            }
            processSegmentAgainstRoute(e, t, r, i, o) {
               if (t.redirectTo || !ew(t, r, i, o)) return O(null);
               let s;
               if ("**" === t.path) {
                  const a = i.length > 0 ? DD(i).parameters : {},
                     l = aw(r) + i.length;
                  s = O({
                     snapshot: new tc(
                        i,
                        a,
                        Object.freeze({ ...this.urlTree.queryParams }),
                        this.urlTree.fragment,
                        lw(t),
                        $t(t),
                        t.component ?? t._loadedComponent ?? null,
                        t,
                        sw(r),
                        l,
                        cw(t)
                     ),
                     consumedSegments: [],
                     remainingSegments: [],
                  });
               } else
                  s = JD(r, t, i, e).pipe(
                     H(({ matched: a, consumedSegments: l, remainingSegments: c, parameters: u }) => {
                        if (!a) return null;
                        const d = aw(r) + l.length;
                        return {
                           snapshot: new tc(
                              l,
                              u,
                              Object.freeze({ ...this.urlTree.queryParams }),
                              this.urlTree.fragment,
                              lw(t),
                              $t(t),
                              t.component ?? t._loadedComponent ?? null,
                              t,
                              sw(r),
                              d,
                              cw(t)
                           ),
                           consumedSegments: l,
                           remainingSegments: c,
                        };
                     })
                  );
               return s.pipe(
                  wn((a) => {
                     if (null === a) return O(null);
                     const { snapshot: l, consumedSegments: c, remainingSegments: u } = a;
                     e = t._injector ?? e;
                     const d = t._loadedInjector ?? e,
                        f = (function _2(n) {
                           return n.children ? n.children : n.loadChildren ? n._loadedRoutes : [];
                        })(t),
                        { segmentGroup: h, slicedSegments: p } = oc(
                           r,
                           c,
                           u,
                           f.filter((g) => void 0 === g.redirectTo)
                        );
                     if (0 === p.length && h.hasChildren()) return this.processChildren(d, f, h).pipe(H((g) => (null === g ? null : [new qn(l, g)])));
                     if (0 === f.length && 0 === p.length) return O([new qn(l, [])]);
                     const m = $t(t) === o;
                     return this.processSegment(d, f, h, p, m ? Y : o).pipe(H((g) => (null === g ? null : [new qn(l, g)])));
                  })
               );
            }
         }
         function v2(n) {
            const e = n.value.routeConfig;
            return e && "" === e.path && void 0 === e.redirectTo;
         }
         function ow(n) {
            const e = [],
               t = new Set();
            for (const r of n) {
               if (!v2(r)) {
                  e.push(r);
                  continue;
               }
               const i = e.find((o) => r.value.routeConfig === o.value.routeConfig);
               void 0 !== i ? (i.children.push(...r.children), t.add(i)) : e.push(r);
            }
            for (const r of t) {
               const i = ow(r.children);
               e.push(new qn(r.value, i));
            }
            return e.filter((r) => !t.has(r));
         }
         function sw(n) {
            let e = n;
            for (; e._sourceSegment; ) e = e._sourceSegment;
            return e;
         }
         function aw(n) {
            let e = n,
               t = e._segmentIndexShift ?? 0;
            for (; e._sourceSegment; ) (e = e._sourceSegment), (t += e._segmentIndexShift ?? 0);
            return t - 1;
         }
         function lw(n) {
            return n.data || {};
         }
         function cw(n) {
            return n.resolve || {};
         }
         function uw(n) {
            return "string" == typeof n.title || null === n.title;
         }
         function Dh(n) {
            return wn((e) => {
               const t = n(e);
               return t ? ke(t).pipe(H(() => e)) : O(e);
            });
         }
         const io = new x("ROUTES");
         let wh = (() => {
            class n {
               constructor(t, r) {
                  (this.injector = t), (this.compiler = r), (this.componentLoaders = new WeakMap()), (this.childrenLoaders = new WeakMap());
               }
               loadComponent(t) {
                  if (this.componentLoaders.get(t)) return this.componentLoaders.get(t);
                  if (t._loadedComponent) return O(t._loadedComponent);
                  this.onLoadStartListener && this.onLoadStartListener(t);
                  const r = ur(t.loadComponent()).pipe(
                        H(fw),
                        $e((o) => {
                           this.onLoadEndListener && this.onLoadEndListener(t), (t._loadedComponent = o);
                        }),
                        jl(() => {
                           this.componentLoaders.delete(t);
                        })
                     ),
                     i = new mD(r, () => new ln()).pipe(eh());
                  return this.componentLoaders.set(t, i), i;
               }
               loadChildren(t, r) {
                  if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
                  if (r._loadedRoutes) return O({ routes: r._loadedRoutes, injector: r._loadedInjector });
                  this.onLoadStartListener && this.onLoadStartListener(r);
                  const o = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                        H((a) => {
                           this.onLoadEndListener && this.onLoadEndListener(r);
                           let l,
                              c,
                              u = !1;
                           Array.isArray(a) ? (c = a) : ((l = a.create(t).injector), (c = bD(l.get(io, [], V.Self | V.Optional))));
                           return { routes: c.map(yh), injector: l };
                        }),
                        jl(() => {
                           this.childrenLoaders.delete(r);
                        })
                     ),
                     s = new mD(o, () => new ln()).pipe(eh());
                  return this.childrenLoaders.set(r, s), s;
               }
               loadModuleFactoryOrRoutes(t) {
                  return ur(t()).pipe(
                     H(fw),
                     qe((i) => (i instanceof hv || Array.isArray(i) ? O(i) : ke(this.compiler.compileModuleAsync(i))))
                  );
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)(M(Bt), M(ob));
               }),
               (n.ɵprov = N({ token: n, factory: n.ɵfac, providedIn: "root" })),
               n
            );
         })();
         function fw(n) {
            return (function I2(n) {
               return n && "object" == typeof n && "default" in n;
            })(n)
               ? n.default
               : n;
         }
         let Ch = (() => {
            class n {
               constructor() {
                  (this.currentNavigation = null),
                     (this.lastSuccessfulNavigation = null),
                     (this.events = new ln()),
                     (this.configLoader = X(wh)),
                     (this.environmentInjector = X(kn)),
                     (this.urlSerializer = X(ys)),
                     (this.rootContexts = X(Cs)),
                     (this.navigationId = 0),
                     (this.configLoader.onLoadEndListener = (i) => this.events.next(new mL(i))),
                     (this.configLoader.onLoadStartListener = (i) => this.events.next(new pL(i)));
               }
               get hasRequestedNavigation() {
                  return 0 !== this.navigationId;
               }
               complete() {
                  this.transitions?.complete();
               }
               handleNavigationRequest(t) {
                  const r = ++this.navigationId;
                  this.transitions?.next({ ...this.transitions.value, ...t, id: r });
               }
               setupNavigations(t) {
                  return (
                     (this.transitions = new an({
                        id: 0,
                        targetPageId: 0,
                        currentUrlTree: t.currentUrlTree,
                        currentRawUrl: t.currentUrlTree,
                        extractedUrl: t.urlHandlingStrategy.extract(t.currentUrlTree),
                        urlAfterRedirects: t.urlHandlingStrategy.extract(t.currentUrlTree),
                        rawUrl: t.currentUrlTree,
                        extras: {},
                        resolve: null,
                        reject: null,
                        promise: Promise.resolve(!0),
                        source: "imperative",
                        restoredState: null,
                        currentSnapshot: t.routerState.snapshot,
                        targetSnapshot: null,
                        currentRouterState: t.routerState,
                        targetRouterState: null,
                        guards: { canActivateChecks: [], canDeactivateChecks: [] },
                        guardsResult: null,
                     })),
                     this.transitions.pipe(
                        Dn((r) => 0 !== r.id),
                        H((r) => ({ ...r, extractedUrl: t.urlHandlingStrategy.extract(r.rawUrl) })),
                        wn((r) => {
                           let i = !1,
                              o = !1;
                           return O(r).pipe(
                              $e((s) => {
                                 this.currentNavigation = {
                                    id: s.id,
                                    initialUrl: s.rawUrl,
                                    extractedUrl: s.extractedUrl,
                                    trigger: s.source,
                                    extras: s.extras,
                                    previousNavigation: this.lastSuccessfulNavigation ? { ...this.lastSuccessfulNavigation, previousNavigation: null } : null,
                                 };
                              }),
                              wn((s) => {
                                 const a = t.browserUrlTree.toString(),
                                    l = !t.navigated || s.extractedUrl.toString() !== a || a !== t.currentUrlTree.toString();
                                 if (("reload" === t.onSameUrlNavigation || l) && t.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                                    return (
                                       pw(s.source) && (t.browserUrlTree = s.extractedUrl),
                                       O(s).pipe(
                                          wn((u) => {
                                             const d = this.transitions?.getValue();
                                             return (
                                                this.events.next(new lh(u.id, this.urlSerializer.serialize(u.extractedUrl), u.source, u.restoredState)),
                                                d !== this.transitions?.getValue() ? In : Promise.resolve(u)
                                             );
                                          }),
                                          (function f2(n, e, t, r) {
                                             return wn((i) =>
                                                (function u2(n, e, t, r, i) {
                                                   return new d2(n, e, t, r, i).apply();
                                                })(n, e, t, i.extractedUrl, r).pipe(H((o) => ({ ...i, urlAfterRedirects: o })))
                                             );
                                          })(this.environmentInjector, this.configLoader, this.urlSerializer, t.config),
                                          $e((u) => {
                                             (this.currentNavigation = { ...this.currentNavigation, finalUrl: u.urlAfterRedirects }),
                                                (r.urlAfterRedirects = u.urlAfterRedirects);
                                          }),
                                          (function D2(n, e, t, r, i) {
                                             return qe((o) =>
                                                (function m2(n, e, t, r, i, o, s = "emptyOnly") {
                                                   return new g2(n, e, t, r, i, s, o).recognize().pipe(
                                                      wn((a) =>
                                                         null === a
                                                            ? (function p2(n) {
                                                                 return new Te((e) => e.error(n));
                                                              })(new h2())
                                                            : O(a)
                                                      )
                                                   );
                                                })(n, e, t, o.urlAfterRedirects, r.serialize(o.urlAfterRedirects), r, i).pipe(
                                                   H((s) => ({ ...o, targetSnapshot: s }))
                                                )
                                             );
                                          })(this.environmentInjector, t.rootComponentType, t.config, this.urlSerializer, t.paramsInheritanceStrategy),
                                          $e((u) => {
                                             if (((r.targetSnapshot = u.targetSnapshot), "eager" === t.urlUpdateStrategy)) {
                                                if (!u.extras.skipLocationChange) {
                                                   const f = t.urlHandlingStrategy.merge(u.urlAfterRedirects, u.rawUrl);
                                                   t.setBrowserUrl(f, u);
                                                }
                                                t.browserUrlTree = u.urlAfterRedirects;
                                             }
                                             const d = new cL(
                                                u.id,
                                                this.urlSerializer.serialize(u.extractedUrl),
                                                this.urlSerializer.serialize(u.urlAfterRedirects),
                                                u.targetSnapshot
                                             );
                                             this.events.next(d);
                                          })
                                       )
                                    );
                                 if (l && t.rawUrlTree && t.urlHandlingStrategy.shouldProcessUrl(t.rawUrlTree)) {
                                    const { id: d, extractedUrl: f, source: h, restoredState: p, extras: m } = s,
                                       g = new lh(d, this.urlSerializer.serialize(f), h, p);
                                    this.events.next(g);
                                    const v = jD(f, t.rootComponentType).snapshot;
                                    return O((r = { ...s, targetSnapshot: v, urlAfterRedirects: f, extras: { ...m, skipLocationChange: !1, replaceUrl: !1 } }));
                                 }
                                 return (t.rawUrlTree = s.rawUrl), s.resolve(null), In;
                              }),
                              $e((s) => {
                                 const a = new uL(
                                    s.id,
                                    this.urlSerializer.serialize(s.extractedUrl),
                                    this.urlSerializer.serialize(s.urlAfterRedirects),
                                    s.targetSnapshot
                                 );
                                 this.events.next(a);
                              }),
                              H((s) => (r = { ...s, guards: PL(s.targetSnapshot, s.currentSnapshot, this.rootContexts) })),
                              (function WL(n, e) {
                                 return qe((t) => {
                                    const {
                                       targetSnapshot: r,
                                       currentSnapshot: i,
                                       guards: { canActivateChecks: o, canDeactivateChecks: s },
                                    } = t;
                                    return 0 === s.length && 0 === o.length
                                       ? O({ ...t, guardsResult: !0 })
                                       : (function KL(n, e, t, r) {
                                            return ke(n).pipe(
                                               qe((i) =>
                                                  (function e2(n, e, t, r, i) {
                                                     const o = e && e.routeConfig ? e.routeConfig.canDeactivate : null;
                                                     return o && 0 !== o.length
                                                        ? O(
                                                             o.map((a) => {
                                                                const l = Es(e) ?? i,
                                                                   c = no(a, l);
                                                                return ur(
                                                                   (function zL(n) {
                                                                      return n && Ss(n.canDeactivate);
                                                                   })(c)
                                                                      ? c.canDeactivate(n, e, t, r)
                                                                      : l.runInContext(() => c(n, e, t, r))
                                                                ).pipe(cr());
                                                             })
                                                          ).pipe(ro())
                                                        : O(!0);
                                                  })(i.component, i.route, t, e, r)
                                               ),
                                               cr((i) => !0 !== i, !0)
                                            );
                                         })(s, r, i, n).pipe(
                                            qe((a) =>
                                               a &&
                                               (function jL(n) {
                                                  return "boolean" == typeof n;
                                               })(a)
                                                  ? (function ZL(n, e, t, r) {
                                                       return ke(e).pipe(
                                                          sr((i) =>
                                                             Ll(
                                                                (function YL(n, e) {
                                                                   return null !== n && e && e(new gL(n)), O(!0);
                                                                })(i.route.parent, r),
                                                                (function QL(n, e) {
                                                                   return null !== n && e && e(new _L(n)), O(!0);
                                                                })(i.route, r),
                                                                (function JL(n, e, t) {
                                                                   const r = e[e.length - 1],
                                                                      o = e
                                                                         .slice(0, e.length - 1)
                                                                         .reverse()
                                                                         .map((s) =>
                                                                            (function LL(n) {
                                                                               const e = n.routeConfig ? n.routeConfig.canActivateChild : null;
                                                                               return e && 0 !== e.length ? { node: n, guards: e } : null;
                                                                            })(s)
                                                                         )
                                                                         .filter((s) => null !== s)
                                                                         .map((s) =>
                                                                            pD(() =>
                                                                               O(
                                                                                  s.guards.map((l) => {
                                                                                     const c = Es(s.node) ?? t,
                                                                                        u = no(l, c);
                                                                                     return ur(
                                                                                        (function $L(n) {
                                                                                           return n && Ss(n.canActivateChild);
                                                                                        })(u)
                                                                                           ? u.canActivateChild(r, n)
                                                                                           : c.runInContext(() => u(r, n))
                                                                                     ).pipe(cr());
                                                                                  })
                                                                               ).pipe(ro())
                                                                            )
                                                                         );
                                                                   return O(o).pipe(ro());
                                                                })(n, i.path, t),
                                                                (function XL(n, e, t) {
                                                                   const r = e.routeConfig ? e.routeConfig.canActivate : null;
                                                                   if (!r || 0 === r.length) return O(!0);
                                                                   const i = r.map((o) =>
                                                                      pD(() => {
                                                                         const s = Es(e) ?? t,
                                                                            a = no(o, s);
                                                                         return ur(
                                                                            (function HL(n) {
                                                                               return n && Ss(n.canActivate);
                                                                            })(a)
                                                                               ? a.canActivate(e, n)
                                                                               : s.runInContext(() => a(e, n))
                                                                         ).pipe(cr());
                                                                      })
                                                                   );
                                                                   return O(i).pipe(ro());
                                                                })(n, i.route, t)
                                                             )
                                                          ),
                                                          cr((i) => !0 !== i, !0)
                                                       );
                                                    })(r, o, n, e)
                                                  : O(a)
                                            ),
                                            H((a) => ({ ...t, guardsResult: a }))
                                         );
                                 });
                              })(this.environmentInjector, (s) => this.events.next(s)),
                              $e((s) => {
                                 if (((r.guardsResult = s.guardsResult), zr(s.guardsResult))) throw zD(0, s.guardsResult);
                                 const a = new dL(
                                    s.id,
                                    this.urlSerializer.serialize(s.extractedUrl),
                                    this.urlSerializer.serialize(s.urlAfterRedirects),
                                    s.targetSnapshot,
                                    !!s.guardsResult
                                 );
                                 this.events.next(a);
                              }),
                              Dn((s) => !!s.guardsResult || (t.restoreHistory(s), this.cancelNavigationTransition(s, "", 3, t), !1)),
                              Dh((s) => {
                                 if (s.guards.canActivateChecks.length)
                                    return O(s).pipe(
                                       $e((a) => {
                                          const l = new fL(
                                             a.id,
                                             this.urlSerializer.serialize(a.extractedUrl),
                                             this.urlSerializer.serialize(a.urlAfterRedirects),
                                             a.targetSnapshot
                                          );
                                          this.events.next(l);
                                       }),
                                       wn((a) => {
                                          let l = !1;
                                          return O(a).pipe(
                                             (function w2(n, e) {
                                                return qe((t) => {
                                                   const {
                                                      targetSnapshot: r,
                                                      guards: { canActivateChecks: i },
                                                   } = t;
                                                   if (!i.length) return O(t);
                                                   let o = 0;
                                                   return ke(i).pipe(
                                                      sr((s) =>
                                                         (function C2(n, e, t, r) {
                                                            const i = n.routeConfig,
                                                               o = n._resolve;
                                                            return (
                                                               void 0 !== i?.title && !uw(i) && (o[ms] = i.title),
                                                               (function E2(n, e, t, r) {
                                                                  const i = (function M2(n) {
                                                                     return [...Object.keys(n), ...Object.getOwnPropertySymbols(n)];
                                                                  })(n);
                                                                  if (0 === i.length) return O({});
                                                                  const o = {};
                                                                  return ke(i).pipe(
                                                                     qe((s) =>
                                                                        (function x2(n, e, t, r) {
                                                                           const i = Es(e) ?? r,
                                                                              o = no(n, i);
                                                                           return ur(o.resolve ? o.resolve(e, t) : i.runInContext(() => o(e, t)));
                                                                        })(n[s], e, t, r).pipe(
                                                                           cr(),
                                                                           $e((a) => {
                                                                              o[s] = a;
                                                                           })
                                                                        )
                                                                     ),
                                                                     th(1),
                                                                     (function kP(n) {
                                                                        return H(() => n);
                                                                     })(o),
                                                                     zn((s) => (_h(s) ? In : Ki(s)))
                                                                  );
                                                               })(o, n, e, r).pipe(
                                                                  H(
                                                                     (s) => (
                                                                        (n._resolvedData = s),
                                                                        (n.data = UD(n, t).resolve),
                                                                        i && uw(i) && (n.data[ms] = i.title),
                                                                        null
                                                                     )
                                                                  )
                                                               )
                                                            );
                                                         })(s.route, r, n, e)
                                                      ),
                                                      $e(() => o++),
                                                      th(1),
                                                      qe((s) => (o === i.length ? O(t) : In))
                                                   );
                                                });
                                             })(t.paramsInheritanceStrategy, this.environmentInjector),
                                             $e({
                                                next: () => (l = !0),
                                                complete: () => {
                                                   l || (t.restoreHistory(a), this.cancelNavigationTransition(a, "", 2, t));
                                                },
                                             })
                                          );
                                       }),
                                       $e((a) => {
                                          const l = new hL(
                                             a.id,
                                             this.urlSerializer.serialize(a.extractedUrl),
                                             this.urlSerializer.serialize(a.urlAfterRedirects),
                                             a.targetSnapshot
                                          );
                                          this.events.next(l);
                                       })
                                    );
                              }),
                              Dh((s) => {
                                 const a = (l) => {
                                    const c = [];
                                    l.routeConfig?.loadComponent &&
                                       !l.routeConfig._loadedComponent &&
                                       c.push(
                                          this.configLoader.loadComponent(l.routeConfig).pipe(
                                             $e((u) => {
                                                l.component = u;
                                             }),
                                             H(() => {})
                                          )
                                       );
                                    for (const u of l.children) c.push(...a(u));
                                    return c;
                                 };
                                 return qf(a(s.targetSnapshot.root)).pipe(ql(), Gi(1));
                              }),
                              Dh(() => t.afterPreactivation()),
                              H((s) => {
                                 const a = (function ML(n, e, t) {
                                    const r = ws(n, e._root, t ? t._root : void 0);
                                    return new BD(r, e);
                                 })(t.routeReuseStrategy, s.targetSnapshot, s.currentRouterState);
                                 return (r = { ...s, targetRouterState: a });
                              }),
                              $e((s) => {
                                 (t.currentUrlTree = s.urlAfterRedirects),
                                    (t.rawUrlTree = t.urlHandlingStrategy.merge(s.urlAfterRedirects, s.rawUrl)),
                                    (t.routerState = s.targetRouterState),
                                    "deferred" === t.urlUpdateStrategy &&
                                       (s.extras.skipLocationChange || t.setBrowserUrl(t.rawUrlTree, s), (t.browserUrlTree = s.urlAfterRedirects));
                              }),
                              ((n, e, t) => H((r) => (new kL(e, r.targetRouterState, r.currentRouterState, t).activate(n), r)))(
                                 this.rootContexts,
                                 t.routeReuseStrategy,
                                 (s) => this.events.next(s)
                              ),
                              $e({
                                 next: (s) => {
                                    (i = !0),
                                       (this.lastSuccessfulNavigation = this.currentNavigation),
                                       (t.navigated = !0),
                                       this.events.next(
                                          new Gr(s.id, this.urlSerializer.serialize(s.extractedUrl), this.urlSerializer.serialize(t.currentUrlTree))
                                       ),
                                       t.titleStrategy?.updateTitle(s.targetRouterState.snapshot),
                                       s.resolve(!0);
                                 },
                                 complete: () => {
                                    i = !0;
                                 },
                              }),
                              jl(() => {
                                 i || o || this.cancelNavigationTransition(r, "", 1, t), this.currentNavigation?.id === r.id && (this.currentNavigation = null);
                              }),
                              zn((s) => {
                                 if (((o = !0), WD(s))) {
                                    qD(s) || ((t.navigated = !0), t.restoreHistory(r, !0));
                                    const a = new ec(r.id, this.urlSerializer.serialize(r.extractedUrl), s.message, s.cancellationCode);
                                    if ((this.events.next(a), qD(s))) {
                                       const l = t.urlHandlingStrategy.merge(s.url, t.rawUrlTree),
                                          c = { skipLocationChange: r.extras.skipLocationChange, replaceUrl: "eager" === t.urlUpdateStrategy || pw(r.source) };
                                       t.scheduleNavigation(l, "imperative", null, c, { resolve: r.resolve, reject: r.reject, promise: r.promise });
                                    } else r.resolve(!1);
                                 } else {
                                    t.restoreHistory(r, !0);
                                    const a = new PD(r.id, this.urlSerializer.serialize(r.extractedUrl), s, r.targetSnapshot ?? void 0);
                                    this.events.next(a);
                                    try {
                                       r.resolve(t.errorHandler(s));
                                    } catch (l) {
                                       r.reject(l);
                                    }
                                 }
                                 return In;
                              })
                           );
                        })
                     )
                  );
               }
               cancelNavigationTransition(t, r, i, o) {
                  const s = new ec(t.id, this.urlSerializer.serialize(t.extractedUrl), r, i);
                  this.events.next(s), t.resolve(!1);
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)();
               }),
               (n.ɵprov = N({ token: n, factory: n.ɵfac, providedIn: "root" })),
               n
            );
         })();
         function pw(n) {
            return "imperative" !== n;
         }
         let mw = (() => {
               class n {
                  buildTitle(t) {
                     let r,
                        i = t.root;
                     for (; void 0 !== i; ) (r = this.getResolvedTitleForRoute(i) ?? r), (i = i.children.find((o) => o.outlet === Y));
                     return r;
                  }
                  getResolvedTitleForRoute(t) {
                     return t.data[ms];
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)();
                  }),
                  (n.ɵprov = N({
                     token: n,
                     factory: function () {
                        return X(A2);
                     },
                     providedIn: "root",
                  })),
                  n
               );
            })(),
            A2 = (() => {
               class n extends mw {
                  constructor(t) {
                     super(), (this.title = t);
                  }
                  updateTitle(t) {
                     const r = this.buildTitle(t);
                     void 0 !== r && this.title.setTitle(r);
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)(M(w0));
                  }),
                  (n.ɵprov = N({ token: n, factory: n.ɵfac, providedIn: "root" })),
                  n
               );
            })(),
            T2 = (() => {
               class n {}
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)();
                  }),
                  (n.ɵprov = N({
                     token: n,
                     factory: function () {
                        return X(F2);
                     },
                     providedIn: "root",
                  })),
                  n
               );
            })();
         class R2 {
            shouldDetach(e) {
               return !1;
            }
            store(e, t) {}
            shouldAttach(e) {
               return !1;
            }
            retrieve(e) {
               return null;
            }
            shouldReuseRoute(e, t) {
               return e.routeConfig === t.routeConfig;
            }
         }
         let F2 = (() => {
            class n extends R2 {}
            return (
               (n.ɵfac = (function () {
                  let e;
                  return function (r) {
                     return (
                        e ||
                        (e = (function Qe(n) {
                           return Jn(() => {
                              const e = n.prototype.constructor,
                                 t = e[Tn] || wu(e),
                                 r = Object.prototype;
                              let i = Object.getPrototypeOf(n.prototype).constructor;
                              for (; i && i !== r; ) {
                                 const o = i[Tn] || wu(i);
                                 if (o && o !== t) return o;
                                 i = Object.getPrototypeOf(i);
                              }
                              return (o) => new o();
                           });
                        })(n))
                     )(r || n);
                  };
               })()),
               (n.ɵprov = N({ token: n, factory: n.ɵfac, providedIn: "root" })),
               n
            );
         })();
         const cc = new x("", { providedIn: "root", factory: () => ({}) });
         let O2 = (() => {
               class n {}
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)();
                  }),
                  (n.ɵprov = N({
                     token: n,
                     factory: function () {
                        return X(k2);
                     },
                     providedIn: "root",
                  })),
                  n
               );
            })(),
            k2 = (() => {
               class n {
                  shouldProcessUrl(t) {
                     return !0;
                  }
                  extract(t) {
                     return t;
                  }
                  merge(t, r) {
                     return t;
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)();
                  }),
                  (n.ɵprov = N({ token: n, factory: n.ɵfac, providedIn: "root" })),
                  n
               );
            })();
         function P2(n) {
            throw n;
         }
         function L2(n, e, t) {
            return e.parse("/");
         }
         const V2 = { paths: "exact", fragment: "ignored", matrixParams: "ignored", queryParams: "exact" },
            B2 = { paths: "subset", fragment: "ignored", matrixParams: "ignored", queryParams: "subset" };
         let At = (() => {
            class n {
               constructor() {
                  (this.disposed = !1),
                     (this.currentPageId = 0),
                     (this.console = X(GR)),
                     (this.isNgZoneEnabled = !1),
                     (this.options = X(cc, { optional: !0 }) || {}),
                     (this.errorHandler = this.options.errorHandler || P2),
                     (this.malformedUriErrorHandler = this.options.malformedUriErrorHandler || L2),
                     (this.navigated = !1),
                     (this.lastSuccessfulId = -1),
                     (this.afterPreactivation = () => O(void 0)),
                     (this.urlHandlingStrategy = X(O2)),
                     (this.routeReuseStrategy = X(T2)),
                     (this.urlCreationStrategy = X(wL)),
                     (this.titleStrategy = X(mw)),
                     (this.onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore"),
                     (this.paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || "emptyOnly"),
                     (this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred"),
                     (this.canceledNavigationResolution = this.options.canceledNavigationResolution || "replace"),
                     (this.config = bD(X(io, { optional: !0 }) ?? [])),
                     (this.navigationTransitions = X(Ch)),
                     (this.urlSerializer = X(ys)),
                     (this.location = X(bf)),
                     (this.rootComponentType = null),
                     (this.isNgZoneEnabled = X(Ee) instanceof Ee && Ee.isInAngularZone()),
                     this.resetConfig(this.config),
                     (this.currentUrlTree = new Hr()),
                     (this.rawUrlTree = this.currentUrlTree),
                     (this.browserUrlTree = this.currentUrlTree),
                     (this.routerState = jD(this.currentUrlTree, this.rootComponentType)),
                     this.navigationTransitions.setupNavigations(this).subscribe(
                        (t) => {
                           (this.lastSuccessfulId = t.id), (this.currentPageId = t.targetPageId);
                        },
                        (t) => {
                           this.console.warn(`Unhandled Navigation Error: ${t}`);
                        }
                     );
               }
               get navigationId() {
                  return this.navigationTransitions.navigationId;
               }
               get browserPageId() {
                  return this.location.getState()?.ɵrouterPageId;
               }
               get events() {
                  return this.navigationTransitions.events;
               }
               resetRootComponentType(t) {
                  (this.rootComponentType = t), (this.routerState.root.component = this.rootComponentType);
               }
               initialNavigation() {
                  this.setUpLocationChangeListener(),
                     this.navigationTransitions.hasRequestedNavigation || this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
               }
               setUpLocationChangeListener() {
                  this.locationSubscription ||
                     (this.locationSubscription = this.location.subscribe((t) => {
                        const r = "popstate" === t.type ? "popstate" : "hashchange";
                        "popstate" === r &&
                           setTimeout(() => {
                              const i = { replaceUrl: !0 },
                                 o = t.state?.navigationId ? t.state : null;
                              if (t.state) {
                                 const a = { ...t.state };
                                 delete a.navigationId, delete a.ɵrouterPageId, 0 !== Object.keys(a).length && (i.state = a);
                              }
                              const s = this.parseUrl(t.url);
                              this.scheduleNavigation(s, r, o, i);
                           }, 0);
                     }));
               }
               get url() {
                  return this.serializeUrl(this.currentUrlTree);
               }
               getCurrentNavigation() {
                  return this.navigationTransitions.currentNavigation;
               }
               resetConfig(t) {
                  (this.config = t.map(yh)), (this.navigated = !1), (this.lastSuccessfulId = -1);
               }
               ngOnDestroy() {
                  this.dispose();
               }
               dispose() {
                  this.navigationTransitions.complete(),
                     this.locationSubscription && (this.locationSubscription.unsubscribe(), (this.locationSubscription = void 0)),
                     (this.disposed = !0);
               }
               createUrlTree(t, r = {}) {
                  const { relativeTo: i, queryParams: o, fragment: s, queryParamsHandling: a, preserveFragment: l } = r,
                     c = l ? this.currentUrlTree.fragment : s;
                  let u = null;
                  switch (a) {
                     case "merge":
                        u = { ...this.currentUrlTree.queryParams, ...o };
                        break;
                     case "preserve":
                        u = this.currentUrlTree.queryParams;
                        break;
                     default:
                        u = o || null;
                  }
                  return (
                     null !== u && (u = this.removeEmptyProps(u)),
                     this.urlCreationStrategy.createUrlTree(i, this.routerState, this.currentUrlTree, t, u, c ?? null)
                  );
               }
               navigateByUrl(t, r = { skipLocationChange: !1 }) {
                  const i = zr(t) ? t : this.parseUrl(t),
                     o = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
                  return this.scheduleNavigation(o, "imperative", null, r);
               }
               navigate(t, r = { skipLocationChange: !1 }) {
                  return (
                     (function j2(n) {
                        for (let e = 0; e < n.length; e++) {
                           if (null == n[e]) throw new _(4008, !1);
                        }
                     })(t),
                     this.navigateByUrl(this.createUrlTree(t, r), r)
                  );
               }
               serializeUrl(t) {
                  return this.urlSerializer.serialize(t);
               }
               parseUrl(t) {
                  let r;
                  try {
                     r = this.urlSerializer.parse(t);
                  } catch (i) {
                     r = this.malformedUriErrorHandler(i, this.urlSerializer, t);
                  }
                  return r;
               }
               isActive(t, r) {
                  let i;
                  if (((i = !0 === r ? { ...V2 } : !1 === r ? { ...B2 } : r), zr(t))) return CD(this.currentUrlTree, t, i);
                  const o = this.parseUrl(t);
                  return CD(this.currentUrlTree, o, i);
               }
               removeEmptyProps(t) {
                  return Object.keys(t).reduce((r, i) => {
                     const o = t[i];
                     return null != o && (r[i] = o), r;
                  }, {});
               }
               scheduleNavigation(t, r, i, o, s) {
                  if (this.disposed) return Promise.resolve(!1);
                  let a, l, c, u;
                  return (
                     s
                        ? ((a = s.resolve), (l = s.reject), (c = s.promise))
                        : (c = new Promise((d, f) => {
                             (a = d), (l = f);
                          })),
                     "computed" === this.canceledNavigationResolution
                        ? (0 === this.currentPageId && (i = this.location.getState()),
                          (u =
                             i && i.ɵrouterPageId
                                ? i.ɵrouterPageId
                                : o.replaceUrl || o.skipLocationChange
                                ? this.browserPageId ?? 0
                                : (this.browserPageId ?? 0) + 1))
                        : (u = 0),
                     this.navigationTransitions.handleNavigationRequest({
                        targetPageId: u,
                        source: r,
                        restoredState: i,
                        currentUrlTree: this.currentUrlTree,
                        currentRawUrl: this.currentUrlTree,
                        rawUrl: t,
                        extras: o,
                        resolve: a,
                        reject: l,
                        promise: c,
                        currentSnapshot: this.routerState.snapshot,
                        currentRouterState: this.routerState,
                     }),
                     c.catch((d) => Promise.reject(d))
                  );
               }
               setBrowserUrl(t, r) {
                  const i = this.urlSerializer.serialize(t),
                     o = { ...r.extras.state, ...this.generateNgRouterState(r.id, r.targetPageId) };
                  this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl ? this.location.replaceState(i, "", o) : this.location.go(i, "", o);
               }
               restoreHistory(t, r = !1) {
                  if ("computed" === this.canceledNavigationResolution) {
                     const i = this.currentPageId - t.targetPageId;
                     ("popstate" !== t.source && "eager" !== this.urlUpdateStrategy && this.currentUrlTree !== this.getCurrentNavigation()?.finalUrl) || 0 === i
                        ? this.currentUrlTree === this.getCurrentNavigation()?.finalUrl &&
                          0 === i &&
                          (this.resetState(t), (this.browserUrlTree = t.currentUrlTree), this.resetUrlToCurrentUrlTree())
                        : this.location.historyGo(i);
                  } else "replace" === this.canceledNavigationResolution && (r && this.resetState(t), this.resetUrlToCurrentUrlTree());
               }
               resetState(t) {
                  (this.routerState = t.currentRouterState),
                     (this.currentUrlTree = t.currentUrlTree),
                     (this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, t.rawUrl));
               }
               resetUrlToCurrentUrlTree() {
                  this.location.replaceState(
                     this.urlSerializer.serialize(this.rawUrlTree),
                     "",
                     this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
                  );
               }
               generateNgRouterState(t, r) {
                  return "computed" === this.canceledNavigationResolution ? { navigationId: t, ɵrouterPageId: r } : { navigationId: t };
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)();
               }),
               (n.ɵprov = N({ token: n, factory: n.ɵfac, providedIn: "root" })),
               n
            );
         })();
         class yw {}
         let $2 = (() => {
            class n {
               constructor(t, r, i, o, s) {
                  (this.router = t), (this.injector = i), (this.preloadingStrategy = o), (this.loader = s);
               }
               setUpPreloading() {
                  this.subscription = this.router.events
                     .pipe(
                        Dn((t) => t instanceof Gr),
                        sr(() => this.preload())
                     )
                     .subscribe(() => {});
               }
               preload() {
                  return this.processRoutes(this.injector, this.router.config);
               }
               ngOnDestroy() {
                  this.subscription && this.subscription.unsubscribe();
               }
               processRoutes(t, r) {
                  const i = [];
                  for (const o of r) {
                     o.providers && !o._injector && (o._injector = al(o.providers, t, `Route: ${o.path}`));
                     const s = o._injector ?? t,
                        a = o._loadedInjector ?? s;
                     (o.loadChildren && !o._loadedRoutes && void 0 === o.canLoad) || (o.loadComponent && !o._loadedComponent)
                        ? i.push(this.preloadConfig(s, o))
                        : (o.children || o._loadedRoutes) && i.push(this.processRoutes(a, o.children ?? o._loadedRoutes));
                  }
                  return ke(i).pipe(ni());
               }
               preloadConfig(t, r) {
                  return this.preloadingStrategy.preload(r, () => {
                     let i;
                     i = r.loadChildren && void 0 === r.canLoad ? this.loader.loadChildren(t, r) : O(null);
                     const o = i.pipe(
                        qe((s) =>
                           null === s
                              ? O(void 0)
                              : ((r._loadedRoutes = s.routes), (r._loadedInjector = s.injector), this.processRoutes(s.injector ?? t, s.routes))
                        )
                     );
                     return r.loadComponent && !r._loadedComponent ? ke([o, this.loader.loadComponent(r)]).pipe(ni()) : o;
                  });
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)(M(At), M(ob), M(kn), M(yw), M(wh));
               }),
               (n.ɵprov = N({ token: n, factory: n.ɵfac, providedIn: "root" })),
               n
            );
         })();
         const Mh = new x("");
         let _w = (() => {
            class n {
               constructor(t, r, i, o, s = {}) {
                  (this.urlSerializer = t),
                     (this.transitions = r),
                     (this.viewportScroller = i),
                     (this.zone = o),
                     (this.options = s),
                     (this.lastId = 0),
                     (this.lastSource = "imperative"),
                     (this.restoredId = 0),
                     (this.store = {}),
                     (s.scrollPositionRestoration = s.scrollPositionRestoration || "disabled"),
                     (s.anchorScrolling = s.anchorScrolling || "disabled");
               }
               init() {
                  "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.setHistoryScrollRestoration("manual"),
                     (this.routerEventsSubscription = this.createScrollEvents()),
                     (this.scrollEventsSubscription = this.consumeScrollEvents());
               }
               createScrollEvents() {
                  return this.transitions.events.subscribe((t) => {
                     t instanceof lh
                        ? ((this.store[this.lastId] = this.viewportScroller.getScrollPosition()),
                          (this.lastSource = t.navigationTrigger),
                          (this.restoredId = t.restoredState ? t.restoredState.navigationId : 0))
                        : t instanceof Gr && ((this.lastId = t.id), this.scheduleScrollEvent(t, this.urlSerializer.parse(t.urlAfterRedirects).fragment));
                  });
               }
               consumeScrollEvents() {
                  return this.transitions.events.subscribe((t) => {
                     t instanceof LD &&
                        (t.position
                           ? "top" === this.options.scrollPositionRestoration
                              ? this.viewportScroller.scrollToPosition([0, 0])
                              : "enabled" === this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition(t.position)
                           : t.anchor && "enabled" === this.options.anchorScrolling
                           ? this.viewportScroller.scrollToAnchor(t.anchor)
                           : "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition([0, 0]));
                  });
               }
               scheduleScrollEvent(t, r) {
                  this.zone.runOutsideAngular(() => {
                     setTimeout(() => {
                        this.zone.run(() => {
                           this.transitions.events.next(new LD(t, "popstate" === this.lastSource ? this.store[this.restoredId] : null, r));
                        });
                     }, 0);
                  });
               }
               ngOnDestroy() {
                  this.routerEventsSubscription?.unsubscribe(), this.scrollEventsSubscription?.unsubscribe();
               }
            }
            return (
               (n.ɵfac = function (t) {
                  !(function gy() {
                     throw new Error("invalid");
                  })();
               }),
               (n.ɵprov = N({ token: n, factory: n.ɵfac })),
               n
            );
         })();
         function so(n, e) {
            return { ɵkind: n, ɵproviders: e };
         }
         function bw() {
            const n = X(Bt);
            return (e) => {
               const t = n.get(rs);
               if (e !== t.components[0]) return;
               const r = n.get(At),
                  i = n.get(Dw);
               1 === n.get(Sh) && r.initialNavigation(),
                  n.get(ww, null, V.Optional)?.setUpPreloading(),
                  n.get(Mh, null, V.Optional)?.init(),
                  r.resetRootComponentType(t.componentTypes[0]),
                  i.closed || (i.next(), i.unsubscribe());
            };
         }
         const Dw = new x("", { factory: () => new ln() }),
            Sh = new x("", { providedIn: "root", factory: () => 1 });
         const ww = new x("");
         function K2(n) {
            return so(0, [
               { provide: ww, useExisting: $2 },
               { provide: yw, useExisting: n },
            ]);
         }
         const Cw = new x("ROUTER_FORROOT_GUARD"),
            Z2 = [
               bf,
               { provide: ys, useClass: nh },
               At,
               Cs,
               {
                  provide: to,
                  useFactory: function vw(n) {
                     return n.routerState.root;
                  },
                  deps: [At],
               },
               wh,
               [],
            ];
         function Q2() {
            return new fb("Router", At);
         }
         let Ew = (() => {
            class n {
               constructor(t) {}
               static forRoot(t, r) {
                  return {
                     ngModule: n,
                     providers: [
                        Z2,
                        [],
                        { provide: io, multi: !0, useValue: t },
                        { provide: Cw, useFactory: eV, deps: [[At, new tr(), new _i()]] },
                        { provide: cc, useValue: r || {} },
                        r?.useHash ? { provide: Br, useClass: FF } : { provide: Br, useClass: kb },
                        {
                           provide: Mh,
                           useFactory: () => {
                              const n = X(nO),
                                 e = X(Ee),
                                 t = X(cc),
                                 r = X(Ch),
                                 i = X(ys);
                              return t.scrollOffset && n.setOffset(t.scrollOffset), new _w(i, r, n, e, t);
                           },
                        },
                        r?.preloadingStrategy ? K2(r.preloadingStrategy).ɵproviders : [],
                        { provide: fb, multi: !0, useFactory: Q2 },
                        r?.initialNavigation ? tV(r) : [],
                        [
                           { provide: Mw, useFactory: bw },
                           { provide: rb, multi: !0, useExisting: Mw },
                        ],
                     ],
                  };
               }
               static forChild(t) {
                  return { ngModule: n, providers: [{ provide: io, multi: !0, useValue: t }] };
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)(M(Cw, 8));
               }),
               (n.ɵmod = We({ type: n })),
               (n.ɵinj = ze({ imports: [mh] })),
               n
            );
         })();
         function eV(n) {
            return "guarded";
         }
         function tV(n) {
            return [
               "disabled" === n.initialNavigation
                  ? so(3, [
                       {
                          provide: dl,
                          multi: !0,
                          useFactory: () => {
                             const e = X(At);
                             return () => {
                                e.setUpLocationChangeListener();
                             };
                          },
                       },
                       { provide: Sh, useValue: 2 },
                    ]).ɵproviders
                  : [],
               "enabledBlocking" === n.initialNavigation
                  ? so(2, [
                       { provide: Sh, useValue: 0 },
                       {
                          provide: dl,
                          multi: !0,
                          deps: [Bt],
                          useFactory: (e) => {
                             const t = e.get(TF, Promise.resolve());
                             return () =>
                                t.then(
                                   () =>
                                      new Promise((i) => {
                                         const o = e.get(At),
                                            s = e.get(Dw);
                                         (function r(i) {
                                            e.get(At)
                                               .events.pipe(
                                                  Dn((s) => s instanceof Gr || s instanceof ec || s instanceof PD),
                                                  H((s) => s instanceof Gr || (s instanceof ec && (0 === s.code || 1 === s.code) && null)),
                                                  Dn((s) => null !== s),
                                                  Gi(1)
                                               )
                                               .subscribe(() => {
                                                  i();
                                               });
                                         })(() => {
                                            i(!0);
                                         }),
                                            (o.afterPreactivation = () => (i(!0), s.closed ? O(void 0) : s)),
                                            o.initialNavigation();
                                      })
                                );
                          },
                       },
                    ]).ɵproviders
                  : [],
            ];
         }
         const Mw = new x("");
         class ao {}
         (ao.ɵfac = function (e) {
            return new (e || ao)();
         }),
            (ao.ɵmod = We({ type: ao })),
            (ao.ɵinj = ze({ imports: [Ew.forRoot([]), Ew] }));
         class qr {
            constructor() {
               this.currentLanguage = "en";
            }
            ngOnInit() {}
            setCurrentLanguage(e) {
               this.currentLanguage = e;
            }
         }
         (qr.ɵfac = function (e) {
            return new (e || qr)();
         }),
            (qr.ɵprov = N({ token: qr, factory: qr.ɵfac, providedIn: "root" }));
         const iV = function (n) {
               return { "px-4": n };
            },
            Ih = function (n) {
               return { hidden: n };
            };
         class Ts {
            constructor() {
               (this.valueEmitter = new ve()), (this.menuOpen = !1);
            }
            openCloseMenu() {
               (this.menuOpen = !this.menuOpen), this.valueEmitter.emit(this.menuOpen);
            }
            goSection(e) {
               (this.menuOpen = !1), this.valueEmitter.emit(this.menuOpen);
            }
         }
         (Ts.ɵfac = function (e) {
            return new (e || Ts)();
         }),
            (Ts.ɵcmp = Ve({
               type: Ts,
               selectors: [["app-navbar"]],
               outputs: { valueEmitter: "valueEmitter" },
               decls: 39,
               vars: 12,
               consts: [
                  [1, "min-w-screen", "h-full", "z-50", "sticky", "top-0", 3, "ngClass"],
                  ["id", "myTopnav", 1, "flex", "justify-between", "items-center", "w-full", "h-16", "px-2", "bg-darkGunmetal", "lg:h-24"],
                  ["href", "#top", 1, "text-xl", "text-white", "font-bold", "hover:text-darkSkyBlue", "md:text-2xl", "lg:text-3xl"],
                  [1, "hidden", "xl:block"],
                  ["href", "#aboutMe", 1, "cursor-pointer", "hover:text-darkSkyBlue", "mx-2"],
                  ["href", "#skills", 1, "cursor-pointer", "hover:text-darkSkyBlue", "mx-2"],
                  ["href", "#portfolio", 1, "cursor-pointer", "hover:text-darkSkyBlue", "mx-2"],
                  ["href", "#contact", 1, "cursor-pointer", "hover:text-darkSkyBlue", "mx-2"],
                  [1, "cursor-pointer", "flex", "justify-between", "items-center", "xl:hidden", 3, "click"],
                  [1, "cursor-pointer", "object-scale-down", "fill-white", "hover:fill-darkSkyBlue", 3, "ngClass"],
                  [
                     "enable-background",
                     "new 0 0 91 91",
                     "height",
                     "1rem",
                     "id",
                     "Layer_1",
                     "version",
                     "1.1",
                     "viewBox",
                     "0 0 91 91",
                     "width",
                     "1.5rem",
                     0,
                     "xml",
                     "space",
                     "preserve",
                     "xmlns",
                     "http://www.w3.org/2000/svg",
                     0,
                     "xmlns",
                     "xlink",
                     "http://www.w3.org/1999/xlink",
                  ],
                  ["height", "6", "width", "75", "x", "25", "y", "10"],
                  ["height", "6", "width", "75", "x", "25", "y", "40"],
                  ["height", "6", "width", "75", "x", "25", "y", "70"],
                  ["cx", "0", "cy", "13", "r", "6"],
                  ["cx", "0", "cy", "43", "r", "6"],
                  ["cx", "0", "cy", "73", "r", "6"],
                  [
                     "enable-background",
                     "new 0 0 24 24",
                     "version",
                     "1.1",
                     "viewBox",
                     "0 0 24 24",
                     0,
                     "xml",
                     "space",
                     "preserve",
                     "width",
                     "1.5rem",
                     "height",
                     "1.5rem",
                     "xmlns",
                     "http://www.w3.org/2000/svg",
                     0,
                     "xmlns",
                     "xlink",
                     "http://www.w3.org/1999/xlink",
                  ],
                  ["id", "grid_system"],
                  ["id", "_icons"],
                  [
                     "d",
                     "M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z",
                  ],
                  [
                     1,
                     "h-[calc(100vh-4rem)]",
                     "text-white",
                     "flex",
                     "justify-center",
                     "items-center",
                     "cursor-pointer",
                     "bg-darkGunmetal/80",
                     "lg:h-[calc(100vh-6rem)]",
                     "min-w-full",
                     3,
                     "ngClass",
                  ],
                  [1, "flex", "flex-col", "justify-center", "items-center", "gap-2", "cursor-pointer", "w-full", "h-full"],
                  ["href", "#aboutMe", 1, "cursor-pointer", "hover:text-darkSkyBlue", 3, "click"],
                  ["href", "#skills", 1, "cursor-pointer", "hover:text-darkSkyBlue", 3, "click"],
                  ["href", "#portfolio", 1, "cursor-pointer", "hover:text-darkSkyBlue", 3, "click"],
                  ["href", "#contact", 1, "cursor-pointer", "hover:text-darkSkyBlue", 3, "click"],
               ],
               template: function (e, t) {
                  1 & e &&
                     (b(0, "div", 0)(1, "div", 1)(2, "div")(3, "a", 2),
                     R(4, "Dennis Georg Ertel"),
                     C()(),
                     b(5, "div", 3)(6, "a", 4),
                     R(7, "About me"),
                     C(),
                     b(8, "a", 5),
                     R(9, "Skills"),
                     C(),
                     b(10, "a", 6),
                     R(11, "Portfolio"),
                     C(),
                     b(12, "a", 7),
                     R(13, "Contact"),
                     C()(),
                     b(14, "div", 8),
                     Ce("click", function () {
                        return t.openCloseMenu();
                     }),
                     b(15, "div", 9),
                     Xt(),
                     b(16, "svg", 10)(17, "g"),
                     B(18, "rect", 11)(19, "rect", 12)(20, "rect", 13)(21, "circle", 14)(22, "circle", 15)(23, "circle", 16),
                     C()()(),
                     dn(),
                     b(24, "div", 9),
                     Xt(),
                     b(25, "svg", 17),
                     B(26, "g", 18),
                     b(27, "g", 19),
                     B(28, "path", 20),
                     C()()()()(),
                     dn(),
                     b(29, "div", 21)(30, "div", 22)(31, "a", 23),
                     Ce("click", function () {
                        return t.openCloseMenu();
                     }),
                     R(32, "About me"),
                     C(),
                     b(33, "a", 24),
                     Ce("click", function () {
                        return t.openCloseMenu();
                     }),
                     R(34, "Skills"),
                     C(),
                     b(35, "a", 25),
                     Ce("click", function () {
                        return t.openCloseMenu();
                     }),
                     R(36, "Portfolio"),
                     C(),
                     b(37, "a", 26),
                     Ce("click", function () {
                        return t.openCloseMenu();
                     }),
                     R(38, "Contact"),
                     C()()()()),
                     2 & e &&
                        (Ie("ngClass", _t(4, iV, !t.menuOpen)),
                        re(15),
                        Ie("ngClass", _t(6, Ih, t.menuOpen)),
                        re(9),
                        Ie("ngClass", _t(8, Ih, !t.menuOpen)),
                        re(5),
                        Ie("ngClass", _t(10, Ih, !t.menuOpen)));
               },
               dependencies: [Il],
            }));
         class Rs {}
         (Rs.ɵfac = function (e) {
            return new (e || Rs)();
         }),
            (Rs.ɵcmp = Ve({
               type: Rs,
               selectors: [["app-image-person"]],
               decls: 2,
               vars: 0,
               consts: [
                  [1, "w-full", "h-full", "flex", "justify-center"],
                  ["src", "assets/img/BildDennisOhneHintergrundRotate.png", "alt", "", 1, "w-full", "h-full", "lg:w-3/5", "xl:w-full", "object-scale-down"],
               ],
               template: function (e, t) {
                  1 & e && (b(0, "div", 0), B(1, "img", 1), C());
               },
            }));
         class Fs {}
         (Fs.ɵfac = function (e) {
            return new (e || Fs)();
         }),
            (Fs.ɵcmp = Ve({
               type: Fs,
               selectors: [["app-greeting"]],
               decls: 23,
               vars: 0,
               consts: [
                  [1, "grid", "grid-cols-12", "text-white", "text-center", "gap-y-6", "mb-8"],
                  [1, "col-start-2", "col-end-12", "flex", "justify-center"],
                  [1, "flex", "flex-col-reverse", "justify-between"],
                  [1, "w-full", "flex", "justify-start", "items-end", "text-2xl", "writingMode-b-rl", "rotate-180", "mb-1"],
                  [1, "w-full", "flex", "justify-start", "items-end", "text-2xl", "writingMode-b-rl", "rotate-180", "mt-1"],
                  [1, "text-2xl", "font-bold", "flex", "justify-between"],
                  [1, ""],
                  [1, "text-xsl", "flex", "justify-between", "text-darkSkyBlue"],
                  [1, "row-start-3", "row-span-2", "col-start-3", "col-end-11", "flex", "justify-center", "items-center"],
                  ["href", "#contact", 1, "bg-khaki", "px-4", "py-1", "cursor-pointer", "rounded-lg", "hover:bg-darkSkyBlue"],
               ],
               template: function (e, t) {
                  1 & e &&
                     (b(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3),
                     R(4, "I"),
                     C(),
                     b(5, "div", 4),
                     R(6, "am"),
                     C()(),
                     b(7, "div")(8, "div", 5)(9, "div", 6),
                     R(10, "Dennis"),
                     C(),
                     b(11, "div", 6),
                     R(12, "Georg"),
                     C(),
                     b(13, "div", 6),
                     R(14, "Ertel"),
                     C()(),
                     b(15, "div", 7)(16, "div"),
                     R(17, "FRONTEND"),
                     C(),
                     b(18, "div"),
                     R(19, "DEVELOPER"),
                     C()()()(),
                     b(20, "div", 8)(21, "a", 9),
                     R(22, "Let\xb4s talk!"),
                     C()()());
               },
               styles: [
                  '.writingMode-b-rl[_ngcontent-%COMP%]{writing-mode:tb-rl}.text-xsl[_ngcontent-%COMP%]{font-size:1.3rem}.fulljustify[_ngcontent-%COMP%]{text-align:justify}.fulljustify[_ngcontent-%COMP%]:after{content:"";display:inline-block;width:100%}',
               ],
            }));
         class Ns {}
         function oV(n, e) {
            1 & n && (b(0, "div", 11), B(1, "img", 12), C());
         }
         function sV(n, e) {
            1 & n && (b(0, "div", 11), B(1, "img", 13), C());
         }
         function aV(n, e) {
            if ((1 & n && (b(0, "div", 8), Nr(1, oV, 2, 0, "div", 9), Nr(2, sV, 2, 0, "div", 9), b(3, "div", 10), R(4), C()()), 2 & n)) {
               const t = e.$implicit,
                  r = e.index;
               re(1), Ie("ngIf", r % 2 == 0), re(1), Ie("ngIf", r % 2 != 0), re(2), Bn(t);
            }
         }
         (Ns.ɵfac = function (e) {
            return new (e || Ns)();
         }),
            (Ns.ɵcmp = Ve({
               type: Ns,
               selectors: [["app-social-links"]],
               decls: 17,
               vars: 0,
               consts: [
                  [1, "grid", "grid-cols-12"],
                  [1, "col-start-1", "col-end-3", "md:col-end-5", "flex", "justify-start", "items-center", "xl:col-end-3", "xl:col-start-2"],
                  [1, "h-1", "w-full", "bg-darkSkyBlue", "rounded-xl"],
                  [
                     1,
                     "col-start-4",
                     "col-end-10",
                     "md:col-start-5",
                     "md:col-end-9",
                     "flex",
                     "justify-between",
                     "items-center",
                     "h-8",
                     "xl:col-start-3",
                     "xl:col-end-6",
                  ],
                  ["href", "https://github.com/ErtelDG", "target", "_blank", 1, "cursor-pointer", "object-scale-down"],
                  [
                     "height",
                     "2.5rem",
                     "id",
                     "Layer_1",
                     "version",
                     "1.1",
                     "viewBox",
                     "0 0 512 512",
                     "width",
                     "2.5rem",
                     0,
                     "xml",
                     "space",
                     "preserve",
                     "xmlns",
                     "http://www.w3.org/2000/svg",
                     0,
                     "xmlns",
                     "xlink",
                     "http://www.w3.org/1999/xlink",
                     1,
                     "fill-white",
                     "hover:fill-darkSkyBlue",
                  ],
                  [
                     "d",
                     "M256,32C132.3,32,32,134.8,32,261.7c0,101.5,64.2,187.5,153.2,217.9c11.2,2.1,15.3-5,15.3-11.1   c0-5.5-0.2-19.9-0.3-39.1c-62.3,13.9-75.5-30.8-75.5-30.8c-10.2-26.5-24.9-33.6-24.9-33.6c-20.3-14.3,1.5-14,1.5-14   c22.5,1.6,34.3,23.7,34.3,23.7c20,35.1,52.4,25,65.2,19.1c2-14.8,7.8-25,14.2-30.7c-49.7-5.8-102-25.5-102-113.5   c0-25.1,8.7-45.6,23-61.6c-2.3-5.8-10-29.2,2.2-60.8c0,0,18.8-6.2,61.6,23.5c17.9-5.1,37-7.6,56.1-7.7c19,0.1,38.2,2.6,56.1,7.7   c42.8-29.7,61.5-23.5,61.5-23.5c12.2,31.6,4.5,55,2.2,60.8c14.3,16.1,23,36.6,23,61.6c0,88.2-52.4,107.6-102.3,113.3   c8,7.1,15.2,21.1,15.2,42.5c0,30.7-0.3,55.5-0.3,63c0,6.1,4,13.3,15.4,11C415.9,449.1,480,363.1,480,261.7   C480,134.8,379.7,32,256,32z",
                  ],
                  ["href", "#contact", 1, "cursor-pointer", "object-scale-down"],
                  [
                     "width",
                     "2.25rem",
                     "height",
                     "2.25rem",
                     "viewBox",
                     "0 0 40 40",
                     "xmlns",
                     "http://www.w3.org/2000/svg",
                     0,
                     "xmlns",
                     "xlink",
                     "http://www.w3.org/1999/xlink",
                  ],
                  [
                     "d",
                     "M20 0C8.93333 0 0 8.93333 0 20C0 31.0667 8.93333 40 20 40C31.0667 40 40 31.0667 40 20C40 8.93333 31.0667 0 20 0ZM32 27.4667C32 28.1333 31.4667 28.6667 30.8 28.6667H9.33333C8.53333 28.6667 8 28 8 27.3333V14.4L20 20.6667L32 14.4V27.4667ZM32 12.9333L20 19.2L8 12.9333V12.6667C8 12 8.53333 11.3333 9.33333 11.3333H30.6667C31.4667 11.3333 32 12 32 12.6667V12.9333Z",
                     1,
                     "fill-white",
                     "hover:fill-darkSkyBlue",
                  ],
                  ["href", "https://de.linkedin.com/", "target", "_blank", 1, "cursor-pointer", "object-scale-down"],
                  ["width", "2.25rem", "height", "2.25rem", "viewBox", "0 0 40 40", "xmlns", "http://www.w3.org/2000/svg", 1, "hover:fill-darkSkyBlue"],
                  ["clip-path", "url(#clip0_4_4337)"],
                  [
                     "d",
                     "M20 0C8.93333 0 0 8.93333 0 20C0 31.0667 8.93333 40 20 40C31.0667 40 40 31.0667 40 20C40 8.93333 31.0667 0 20 0ZM8.93333 7.33333C9.46667 6.93333 10.1333 6.66667 10.6667 6.66667C11.2 6.66667 12 6.93333 12.4 7.33333C12.8 7.86667 13.0667 8.4 13.0667 9.06667C13.0667 9.73333 12.8 10.4 12.2667 10.8C12 11.3333 11.3333 11.6 10.6667 11.6C10 11.6 9.33333 11.3333 8.93333 10.9333C8.53333 10.4 8.26667 9.73333 8.26667 9.06667C8.26667 8.4 8.53333 7.86667 8.93333 7.33333ZM13.2 28.8H8.26667V13.4667H13.2V28.8ZM31.7333 28.8H26.8V20.6667C26.8 15.7333 20.9333 16.1333 20.9333 20.6667V28.8H16.1333V13.4667H21.0667V15.4667C23.0667 11.7333 31.8667 11.4667 31.8667 19.0667V28.8H31.7333Z",
                     1,
                     "fill-white",
                     "hover:fill-darkSkyBlue",
                  ],
                  [
                     "href",
                     "mailto:ertel.developer@t-online.de",
                     1,
                     "hidden",
                     "col-start-8",
                     "col-end-13",
                     "text-lg",
                     "xl:flex",
                     "items-center",
                     "hover:text-darkSkyBlue",
                  ],
               ],
               template: function (e, t) {
                  1 & e &&
                     (b(0, "div", 0)(1, "div", 1),
                     B(2, "div", 2),
                     C(),
                     b(3, "div", 3)(4, "a", 4),
                     Xt(),
                     b(5, "svg", 5)(6, "g"),
                     B(7, "path", 6),
                     C()()(),
                     dn(),
                     b(8, "a", 7),
                     Xt(),
                     b(9, "svg", 8),
                     B(10, "path", 9),
                     C()(),
                     dn(),
                     b(11, "a", 10),
                     Xt(),
                     b(12, "svg", 11)(13, "g", 12),
                     B(14, "path", 13),
                     C()()()(),
                     dn(),
                     b(15, "a", 14),
                     R(16, "ertel.developer@t-online.de"),
                     C()());
               },
            }));
         class Os {
            constructor(e) {
               (this.languageInput = e),
                  (this.language = "en"),
                  (this.aboutMeText = {
                     en: "I am a frontend developer with a focus on developing user-friendly and appealing websites and applications. I specialize in the use of modern technologies such as HTML, CSS, JavaScript and TypeScript and have a solid understanding of responsive design and the implementation of designs. Improving my skills and keeping up to date with the latest technology are a matter of course for me. In a team, I like to work and contribute my ideas and solutions to achieve the best possible result.",
                     de: "Ich bin ein Frontend Developer mit Schwerpunkt auf der Entwicklung benutzerfreundlicher und ansprechender Webseiten und Anwendungen. Spezialisiert habe mich auf die Verwendung von modernen Technologien wie HTML, CSS, JavaScript und TypeScript und verf\xfcge \xfcber ein solides Verst\xe4ndnis von Responsive Design und der Umsetzung von Designs. Meine F\xe4higkeiten zu verbessern und mich auf dem neuesten Stand der Technik zu halten sind f\xfcr mich Selbstverst\xe4ndlich. Im Team arbeite ich gerne und bringe meine Ideen und L\xf6sungsvorschl\xe4ge ein, um das bestm\xf6gliche Ergebnis zu erzielen.",
                  }),
                  (this.aboutMeTraining = {
                     en: "As an experienced manager in retail, I have completed an apprenticeship as a retail clerk and further training as a state-certified commercial specialist. In the course of my professional career, I have distinguished myself in further training with outstanding achievements and have received recognition for further training from the IHK as the best in the exam and the Hamburg Academy.",
                     de: "Als erfahrene F\xfchrungskraft im Einzelhandel verf\xfcge ich \xfcber eine Ausbildung zum Kaufmann im Einzelhandel sowie eine Weiterbildung zum gepr\xfcften Handelsfachwirt. Im Laufe meiner beruflichen Laufbahn habe ich mich in Fortbildungen durch hervorragende Leistungen ausgezeichnet und Anerkennungen f\xfcr Weiterbildung von der IHK als Pr\xfcfungsbester und der Hamburger Akademie erhalten.",
                  }),
                  (this.aboutMeQualification = {
                     en: "With many years of experience as a food department manager, market manager, and sales manager, I have developed a diverse set of skills and knowledge in these roles. I have held the trainer's license for years and have trained and developed many young trainees in my career.",
                     de: "Jahrelange Erfahrungen habe ich als Warenbereichsleiter Lebensmittel, Marktleiter und als Vertriebsleiter.  Den Ausbilderschein besitze ich seit Jahren und habe in meiner Laufbahn viele junge Auszubildende ausgebildet und entwickelt.",
                  }),
                  (this.aboutMeIntroductionDev = {
                     en: "Enthusiastic about programming for years, I am interested in working in software development. When working as a software developer, I would like to have the opportunity to contribute my professional experience with a strong entrepreneurial mindset. I would like to develop creative ideas and concepts that go beyond conventional solutions and have a positive effect on the performance and efficiency of companies.",
                     de: "Von der Programmierung bin ich seit Jahren begeistert und m\xf6chten in der Softwareentwicklung t\xe4tig werden. In der T\xe4tigkeit als Softwareentwickler m\xf6chte ich die M\xf6glichkeit haben, meine berufliche Erfahrungen mit starker unternehmerischer Denkweise einzubringen. Kreative Ideen und Konzepte m\xf6chte ich entwickeln, die \xfcber die herk\xf6mmlichen L\xf6sungen hinausgehen und sich positiv auf die Performance und Effizienz von Unternehmen auswirken.",
                  }),
                  (this.aboutMeImigrationsDev = {
                     en: "As a team player, I enjoy working in a team and helping others to reach their full potential. Looking for new ways to improve the company always I am to improve the company, I am convinced that creative IT solutions will make a valuable contribution.",
                     de: "Ich bin eine teamf\xe4hige Person, die gerne im Team arbeitet und anderen dabei hilft, ihr volles Potential zu entfalten. Stets bin ich auf der Suche nach neuen M\xf6glichkeiten, um das Unternehmen zu verbessern und davon \xfcberzeugt, dass kreativen IT-L\xf6sungen einen wertvollen Beitrag leisten werden.",
                  }),
                  (this.personalThingEn = [
                     "With many years of experience as a food department manager, market manager, and sales manager, I have developed a diverse set of skills and knowledge in these roles. I have held the trainer's license for years and have trained and developed many young trainees in my career.",
                     "Enthusiastic about programming for years, I am interested in working in software development. When working as a software developer, I would like to have the opportunity to contribute my professional experience with a strong entrepreneurial mindset. I would like to develop creative ideas and concepts that go beyond conventional solutions and have a positive effect on the performance and efficiency of companies.",
                     "As a team player, I enjoy working in a team and helping others to reach their full potential. Looking for new ways to improve the company always I am to improve the company, I am convinced that creative IT solutions will make a valuable contribution.",
                  ]),
                  (this.personalThingDe = [
                     "Jahrelange Erfahrungen habe ich als Warenbereichsleiter Lebensmittel, Marktleiter und als Vertriebsleiter.  Den Ausbilderschein besitze ich seit Jahren und habe in meiner Laufbahn viele junge Auszubildende ausgebildet und entwickelt.",
                     "Jahrelange Erfahrungen habe ich als Warenbereichsleiter Lebensmittel, Marktleiter und als Vertriebsleiter.  Den Ausbilderschein besitze ich seit Jahren und habe in meiner Laufbahn viele junge Auszubildende ausgebildet und entwickelt.",
                     "Ich bin eine teamf\xe4hige Person, die gerne im Team arbeitet und anderen dabei hilft, ihr volles Potential zu entfalten. Stets bin ich auf der Suche nach neuen M\xf6glichkeiten, um das Unternehmen zu verbessern und davon \xfcberzeugt, dass kreativen IT-L\xf6sungen einen wertvollen Beitrag leisten werden.",
                  ]);
            }
            ngOnInit() {}
         }
         (Os.ɵfac = function (e) {
            return new (e || Os)(w(qr));
         }),
            (Os.ɵcmp = Ve({
               type: Os,
               selectors: [["app-about-me"]],
               decls: 13,
               vars: 3,
               consts: [
                  [1, "grid", "grid-cols-12", "gap-4", "text-white", "xl:gap-y-8"],
                  [1, "col-start-2", "col-end-12", "h-8", "text-4xl", "font-bold"],
                  [1, "hidden", "col-start-1", "col-end-4", "xl:flex", "items-center", "xl:mb-12", "xl:col-start-2"],
                  [1, "bg-darkSkyBlue", "h-1", "w-full"],
                  [1, "col-start-2", "col-end-12", "text-4xl", "font-bold", "xl:text-6xl", "xl:text-center", "xl:col-start-4", "xl:col-end-10", "xl:mb-12"],
                  [1, "hidden", "col-start-10", "col-end-13", "xl:flex", "items-center", "xl:mb-12", "xl:col-end-12"],
                  [1, "col-start-2", "col-end-12", "text-sm", "xl:text-base", "text-justify"],
                  ["class", "col-start-2 col-end-12 text-sm  grid grid-cols-12 gap-4 xl:text-base ", 4, "ngFor", "ngForOf"],
                  [1, "col-start-2", "col-end-12", "text-sm", "grid", "grid-cols-12", "gap-4", "xl:text-base"],
                  ["class", "row-start-1 row-span-full col-start-1 col-end-3 flex justify-center items-center", 4, "ngIf"],
                  [1, "row-start-1", "row-span-full", "col-start-4", "col-end-13", "flex", "items-center"],
                  [1, "row-start-1", "row-span-full", "col-start-1", "col-end-3", "flex", "justify-center", "items-center"],
                  ["src", "assets/img/lightbulb.png"],
                  ["src", "assets/img/puzzle.png"],
               ],
               template: function (e, t) {
                  1 & e &&
                     (b(0, "div", 0),
                     B(1, "div", 1),
                     b(2, "div", 2),
                     B(3, "div", 3),
                     C(),
                     b(4, "div", 4),
                     R(5, " About me "),
                     C(),
                     b(6, "div", 5),
                     B(7, "div", 3),
                     C(),
                     b(8, "div", 6),
                     R(9),
                     C(),
                     b(10, "div", 6),
                     R(11),
                     C(),
                     Nr(12, aV, 5, 3, "div", 7),
                     C()),
                     2 & e && (re(9), Bn(t.aboutMeText.en), re(2), Bn(t.aboutMeTraining.en), re(1), Ie("ngForOf", t.personalThingEn));
               },
               dependencies: [Al, Kb],
            }));
         class ks {
            constructor() {
               this.textMySkills = "I have grown my frontend development skills that have allowed me to crate different real projects.";
            }
         }
         function lV(n, e) {
            if ((1 & n && (b(0, "div", 3), B(1, "img", 4), b(2, "div", 5), R(3), C()()), 2 & n)) {
               const t = e.$implicit;
               re(1), Go("src", "assets/img/icons/", t, ".png", Di), re(2), Bn(t);
            }
         }
         (ks.ɵfac = function (e) {
            return new (e || ks)();
         }),
            (ks.ɵcmp = Ve({
               type: ks,
               selectors: [["app-my-skills"]],
               decls: 7,
               vars: 1,
               consts: [
                  [1, "col-span-full", "grid", "grid-cols-12", "gap-6"],
                  [1, "col-start-2", "col-end-11", "flex", "justify-end", "items-center", "text-4xl", "font-bold", "md:col-end-10", "xl:text-5xl"],
                  [1, "col-start-11", "col-end-13", "flex", "items-center", "md:col-start-10", "xl:col-end-12"],
                  [1, "h-1", "w-full", "bg-darkSkyBlue", "rounded-xl"],
                  [1, "col-start-2", "col-end-12", "gap-12", "text-end", "xl:text-center"],
               ],
               template: function (e, t) {
                  1 & e && (b(0, "div", 0)(1, "div", 1), R(2, "My skills"), C(), b(3, "div", 2), B(4, "div", 3), C(), b(5, "div", 4), R(6), C()()),
                     2 & e && (re(6), Bn(t.textMySkills));
               },
            }));
         class Ps {
            constructor() {
               this.iconsSkills = [
                  "Angular",
                  "CSS",
                  "Firebase",
                  "GIT",
                  "HTML",
                  "JS",
                  "Materialdesign",
                  "Rest-API",
                  "Scrum",
                  "Tailwind",
                  "TS",
                  "Vue.js",
                  "WordPress",
               ];
            }
            ngOnInit() {}
         }
         (Ps.ɵfac = function (e) {
            return new (e || Ps)();
         }),
            (Ps.ɵcmp = Ve({
               type: Ps,
               selectors: [["app-logos-skills"]],
               decls: 3,
               vars: 1,
               consts: [
                  [1, "grid", "grid-cols-12", "gap-6", "text-white"],
                  [1, "col-start-2", "col-end-12", "grid", "grid-cols-3", "place-content-between", "place-items-center", "gap-4"],
                  ["class", "gap-4 flex flex-col justify-between items-center my-4", 4, "ngFor", "ngForOf"],
                  [1, "gap-4", "flex", "flex-col", "justify-between", "items-center", "my-4"],
                  [1, "hover:animate-bounce", "cursor-pointer", "xl:h-12", 3, "src"],
                  [1, "text-xs", "xl:text-base"],
               ],
               template: function (e, t) {
                  1 & e && (b(0, "div", 0)(1, "div", 1), Nr(2, lV, 4, 2, "div", 2), C()()), 2 & e && (re(2), Ie("ngForOf", t.iconsSkills));
               },
               dependencies: [Al],
            }));
         class Ls {}
         (Ls.ɵfac = function (e) {
            return new (e || Ls)();
         }),
            (Ls.ɵcmp = Ve({
               type: Ls,
               selectors: [["app-btn-go-to-contact"]],
               decls: 4,
               vars: 0,
               consts: [
                  [1, "grid", "grid-cols-12", "gap-4", "text-white"],
                  [1, "col-start-3", "col-end-11", "flex", "justify-center", "items-center"],
                  [
                     "href",
                     "#contact",
                     1,
                     "bg-khaki",
                     "px-4",
                     "py-1",
                     "cursor-pointer",
                     "rounded-lg",
                     "hover:bg-darkSkyBlue",
                     "xl:text-2xl",
                     "xl:px-6",
                     "xl:py-2",
                  ],
               ],
               template: function (e, t) {
                  1 & e && (b(0, "div", 0)(1, "div", 1)(2, "a", 2), R(3, "Let\xb4s talk!"), C()()());
               },
            }));
         class Vs {}
         (Vs.ɵfac = function (e) {
            return new (e || Vs)();
         }),
            (Vs.ɵcmp = Ve({
               type: Vs,
               selectors: [["app-portfolio-section"]],
               decls: 9,
               vars: 0,
               consts: [
                  [1, "col-span-full", "grid", "grid-cols-12", "gap-6"],
                  [1, "col-start-2", "col-end-4", "flex", "items-center", "md:col-end-5", "xl:col-start-2"],
                  [1, "h-1", "w-full", "bg-darkSkyBlue", "rounded-xl"],
                  [
                     1,
                     "col-start-4",
                     "col-end-10",
                     "flex",
                     "justify-center",
                     "items-center",
                     "text-4xl",
                     "font-bold",
                     "text-center",
                     "md:col-start-5",
                     "md:col-end-9",
                     "xl:text-5xl",
                  ],
                  [1, "col-start-10", "col-end-13", "flex", "items-center", "md:col-start-9", "xl:col-end-12"],
                  [1, "col-start-2", "col-end-12", "flex", "items-center", "justify-center", "text-center", "text-sm", "xl:text-base"],
               ],
               template: function (e, t) {
                  1 & e &&
                     (b(0, "div", 0)(1, "div", 1),
                     B(2, "div", 2),
                     C(),
                     b(3, "div", 3),
                     R(4, " Portfolio"),
                     C(),
                     b(5, "div", 4),
                     B(6, "div", 2),
                     C(),
                     b(7, "div", 5),
                     R(8, " This page is a sample of my work - please feel free to try them out. "),
                     C()());
               },
            }));
         class Bs {}
         function xw(n, e, t, r, i, o, s) {
            try {
               var a = n[o](s),
                  l = a.value;
            } catch (c) {
               return void t(c);
            }
            a.done ? e(l) : Promise.resolve(l).then(r, i);
         }
         (Bs.ɵfac = function (e) {
            return new (e || Bs)();
         }),
            (Bs.ɵcmp = Ve({
               type: Bs,
               selectors: [["app-contact-text"]],
               decls: 14,
               vars: 0,
               consts: [
                  [1, "col-span-full", "grid", "grid-cols-12", "gap-y-6", "gap-x-1"],
                  [1, "col-start-1", "col-end-2", "flex", "items-center", "lg:col-end-3", "xl:col-start-2"],
                  [1, "h-1", "w-full", "bg-darkSkyBlue", "rounded-xl"],
                  [1, "col-start-2", "col-end-12", "text-4xl", "font-bold", "lg:col-start-3", "lg:col-end-13", "xl:text-5xl"],
                  [1, "col-start-2", "col-end-12", "text-xl", "font-bold", "xl:text-2xl"],
                  [1, "col-start-2", "col-end-12", "text-xs", "xl:text-base"],
                  [1, "col-start-2", "col-end-12", "items-center", "text-xs", "flex", "justify-evenly", "xl:text-base"],
                  [1, "font-bold", "xl:text-base"],
               ],
               template: function (e, t) {
                  1 & e &&
                     (b(0, "div", 0)(1, "div", 1),
                     B(2, "div", 2),
                     C(),
                     b(3, "div", 3),
                     R(4, "Contact"),
                     C(),
                     b(5, "div", 4),
                     R(6, "Got a problem to solve?"),
                     C(),
                     b(7, "div", 5),
                     R(8, "Contact me through this form, I am interested in hearing you, knowing your ideas and contributing to your projects with my work."),
                     C(),
                     b(9, "div", 6)(10, "div", 7),
                     R(11, " Need a Frontend developer?"),
                     C(),
                     b(12, "div", 7),
                     R(13, "Contact me!"),
                     C()()());
               },
            }));
         const it = new x("NgValidators"),
            fr = new x("NgAsyncValidators");
         function Vw(n) {
            return null != n;
         }
         function Bw(n) {
            return zo(n) ? ke(n) : n;
         }
         function jw(n) {
            let e = {};
            return (
               n.forEach((t) => {
                  e = null != t ? { ...e, ...t } : e;
               }),
               0 === Object.keys(e).length ? null : e
            );
         }
         function Uw(n, e) {
            return e.map((t) => t(n));
         }
         function Hw(n) {
            return n.map((e) =>
               (function gV(n) {
                  return !n.validate;
               })(e)
                  ? e
                  : (t) => e.validate(t)
            );
         }
         function Th(n) {
            return null != n
               ? (function $w(n) {
                    if (!n) return null;
                    const e = n.filter(Vw);
                    return 0 == e.length
                       ? null
                       : function (t) {
                            return jw(Uw(t, e));
                         };
                 })(Hw(n))
               : null;
         }
         function zw(n) {
            if (!n) return null;
            const e = n.filter(Vw);
            return 0 == e.length
               ? null
               : function (t) {
                    return (function Y0(...n) {
                       const e = zp(n),
                          { args: t, keys: r } = T0(n),
                          i = new Te((o) => {
                             const { length: s } = t;
                             if (!s) return void o.complete();
                             const a = new Array(s);
                             let l = s,
                                c = s;
                             for (let u = 0; u < s; u++) {
                                let d = !1;
                                Nt(t[u]).subscribe(
                                   Re(
                                      o,
                                      (f) => {
                                         d || ((d = !0), c--), (a[u] = f);
                                      },
                                      () => l--,
                                      void 0,
                                      () => {
                                         (!l || !d) && (c || o.next(r ? F0(r, a) : a), o.complete());
                                      }
                                   )
                                );
                             }
                          });
                       return e ? i.pipe(R0(e)) : i;
                    })(Uw(t, e).map(Bw)).pipe(H(jw));
                 };
         }
         function Rh(n) {
            return null != n ? zw(Hw(n)) : null;
         }
         function Gw(n, e) {
            return null === n ? [e] : Array.isArray(n) ? [...n, e] : [n, e];
         }
         function Fh(n) {
            return n ? (Array.isArray(n) ? n : [n]) : [];
         }
         function dc(n, e) {
            return Array.isArray(n) ? n.includes(e) : n === e;
         }
         function Kw(n, e) {
            const t = Fh(e);
            return (
               Fh(n).forEach((i) => {
                  dc(t, i) || t.push(i);
               }),
               t
            );
         }
         function Zw(n, e) {
            return Fh(e).filter((t) => !dc(n, t));
         }
         class Qw {
            constructor() {
               (this._rawValidators = []), (this._rawAsyncValidators = []), (this._onDestroyCallbacks = []);
            }
            get value() {
               return this.control ? this.control.value : null;
            }
            get valid() {
               return this.control ? this.control.valid : null;
            }
            get invalid() {
               return this.control ? this.control.invalid : null;
            }
            get pending() {
               return this.control ? this.control.pending : null;
            }
            get disabled() {
               return this.control ? this.control.disabled : null;
            }
            get enabled() {
               return this.control ? this.control.enabled : null;
            }
            get errors() {
               return this.control ? this.control.errors : null;
            }
            get pristine() {
               return this.control ? this.control.pristine : null;
            }
            get dirty() {
               return this.control ? this.control.dirty : null;
            }
            get touched() {
               return this.control ? this.control.touched : null;
            }
            get status() {
               return this.control ? this.control.status : null;
            }
            get untouched() {
               return this.control ? this.control.untouched : null;
            }
            get statusChanges() {
               return this.control ? this.control.statusChanges : null;
            }
            get valueChanges() {
               return this.control ? this.control.valueChanges : null;
            }
            get path() {
               return null;
            }
            _setValidators(e) {
               (this._rawValidators = e || []), (this._composedValidatorFn = Th(this._rawValidators));
            }
            _setAsyncValidators(e) {
               (this._rawAsyncValidators = e || []), (this._composedAsyncValidatorFn = Rh(this._rawAsyncValidators));
            }
            get validator() {
               return this._composedValidatorFn || null;
            }
            get asyncValidator() {
               return this._composedAsyncValidatorFn || null;
            }
            _registerOnDestroy(e) {
               this._onDestroyCallbacks.push(e);
            }
            _invokeOnDestroyCallbacks() {
               this._onDestroyCallbacks.forEach((e) => e()), (this._onDestroyCallbacks = []);
            }
            reset(e) {
               this.control && this.control.reset(e);
            }
            hasError(e, t) {
               return !!this.control && this.control.hasError(e, t);
            }
            getError(e, t) {
               return this.control ? this.control.getError(e, t) : null;
            }
         }
         class ht extends Qw {
            get formDirective() {
               return null;
            }
            get path() {
               return null;
            }
         }
         class Yw {
            constructor(e) {
               this._cd = e;
            }
            get isTouched() {
               return !!this._cd?.control?.touched;
            }
            get isUntouched() {
               return !!this._cd?.control?.untouched;
            }
            get isPristine() {
               return !!this._cd?.control?.pristine;
            }
            get isDirty() {
               return !!this._cd?.control?.dirty;
            }
            get isValid() {
               return !!this._cd?.control?.valid;
            }
            get isInvalid() {
               return !!this._cd?.control?.invalid;
            }
            get isPending() {
               return !!this._cd?.control?.pending;
            }
            get isSubmitted() {
               return !!this._cd?.submitted;
            }
         }
         let Xw = (() => {
            class n extends Yw {
               constructor(t) {
                  super(t);
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)(w(ht, 10));
               }),
               (n.ɵdir = $({
                  type: n,
                  selectors: [
                     ["", "formGroupName", ""],
                     ["", "formArrayName", ""],
                     ["", "ngModelGroup", ""],
                     ["", "formGroup", ""],
                     ["form", 3, "ngNoForm", ""],
                     ["", "ngForm", ""],
                  ],
                  hostVars: 16,
                  hostBindings: function (t, r) {
                     2 & t &&
                        tl("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)("ng-pristine", r.isPristine)("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                           "ng-invalid",
                           r.isInvalid
                        )("ng-pending", r.isPending)("ng-submitted", r.isSubmitted);
                  },
                  features: [de],
               })),
               n
            );
         })();
         const js = "VALID",
            hc = "INVALID",
            lo = "PENDING",
            Us = "DISABLED";
         function pc(n) {
            return null != n && !Array.isArray(n) && "object" == typeof n;
         }
         class nC {
            constructor(e, t) {
               (this._pendingDirty = !1),
                  (this._hasOwnPendingAsyncValidator = !1),
                  (this._pendingTouched = !1),
                  (this._onCollectionChange = () => {}),
                  (this._parent = null),
                  (this.pristine = !0),
                  (this.touched = !1),
                  (this._onDisabledChange = []),
                  this._assignValidators(e),
                  this._assignAsyncValidators(t);
            }
            get validator() {
               return this._composedValidatorFn;
            }
            set validator(e) {
               this._rawValidators = this._composedValidatorFn = e;
            }
            get asyncValidator() {
               return this._composedAsyncValidatorFn;
            }
            set asyncValidator(e) {
               this._rawAsyncValidators = this._composedAsyncValidatorFn = e;
            }
            get parent() {
               return this._parent;
            }
            get valid() {
               return this.status === js;
            }
            get invalid() {
               return this.status === hc;
            }
            get pending() {
               return this.status == lo;
            }
            get disabled() {
               return this.status === Us;
            }
            get enabled() {
               return this.status !== Us;
            }
            get dirty() {
               return !this.pristine;
            }
            get untouched() {
               return !this.touched;
            }
            get updateOn() {
               return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change";
            }
            setValidators(e) {
               this._assignValidators(e);
            }
            setAsyncValidators(e) {
               this._assignAsyncValidators(e);
            }
            addValidators(e) {
               this.setValidators(Kw(e, this._rawValidators));
            }
            addAsyncValidators(e) {
               this.setAsyncValidators(Kw(e, this._rawAsyncValidators));
            }
            removeValidators(e) {
               this.setValidators(Zw(e, this._rawValidators));
            }
            removeAsyncValidators(e) {
               this.setAsyncValidators(Zw(e, this._rawAsyncValidators));
            }
            hasValidator(e) {
               return dc(this._rawValidators, e);
            }
            hasAsyncValidator(e) {
               return dc(this._rawAsyncValidators, e);
            }
            clearValidators() {
               this.validator = null;
            }
            clearAsyncValidators() {
               this.asyncValidator = null;
            }
            markAsTouched(e = {}) {
               (this.touched = !0), this._parent && !e.onlySelf && this._parent.markAsTouched(e);
            }
            markAllAsTouched() {
               this.markAsTouched({ onlySelf: !0 }), this._forEachChild((e) => e.markAllAsTouched());
            }
            markAsUntouched(e = {}) {
               (this.touched = !1),
                  (this._pendingTouched = !1),
                  this._forEachChild((t) => {
                     t.markAsUntouched({ onlySelf: !0 });
                  }),
                  this._parent && !e.onlySelf && this._parent._updateTouched(e);
            }
            markAsDirty(e = {}) {
               (this.pristine = !1), this._parent && !e.onlySelf && this._parent.markAsDirty(e);
            }
            markAsPristine(e = {}) {
               (this.pristine = !0),
                  (this._pendingDirty = !1),
                  this._forEachChild((t) => {
                     t.markAsPristine({ onlySelf: !0 });
                  }),
                  this._parent && !e.onlySelf && this._parent._updatePristine(e);
            }
            markAsPending(e = {}) {
               (this.status = lo), !1 !== e.emitEvent && this.statusChanges.emit(this.status), this._parent && !e.onlySelf && this._parent.markAsPending(e);
            }
            disable(e = {}) {
               const t = this._parentMarkedDirty(e.onlySelf);
               (this.status = Us),
                  (this.errors = null),
                  this._forEachChild((r) => {
                     r.disable({ ...e, onlySelf: !0 });
                  }),
                  this._updateValue(),
                  !1 !== e.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)),
                  this._updateAncestors({ ...e, skipPristineCheck: t }),
                  this._onDisabledChange.forEach((r) => r(!0));
            }
            enable(e = {}) {
               const t = this._parentMarkedDirty(e.onlySelf);
               (this.status = js),
                  this._forEachChild((r) => {
                     r.enable({ ...e, onlySelf: !0 });
                  }),
                  this.updateValueAndValidity({ onlySelf: !0, emitEvent: e.emitEvent }),
                  this._updateAncestors({ ...e, skipPristineCheck: t }),
                  this._onDisabledChange.forEach((r) => r(!1));
            }
            _updateAncestors(e) {
               this._parent &&
                  !e.onlySelf &&
                  (this._parent.updateValueAndValidity(e), e.skipPristineCheck || this._parent._updatePristine(), this._parent._updateTouched());
            }
            setParent(e) {
               this._parent = e;
            }
            getRawValue() {
               return this.value;
            }
            updateValueAndValidity(e = {}) {
               this._setInitialStatus(),
                  this._updateValue(),
                  this.enabled &&
                     (this._cancelExistingSubscription(),
                     (this.errors = this._runValidator()),
                     (this.status = this._calculateStatus()),
                     (this.status === js || this.status === lo) && this._runAsyncValidator(e.emitEvent)),
                  !1 !== e.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)),
                  this._parent && !e.onlySelf && this._parent.updateValueAndValidity(e);
            }
            _updateTreeValidity(e = { emitEvent: !0 }) {
               this._forEachChild((t) => t._updateTreeValidity(e)), this.updateValueAndValidity({ onlySelf: !0, emitEvent: e.emitEvent });
            }
            _setInitialStatus() {
               this.status = this._allControlsDisabled() ? Us : js;
            }
            _runValidator() {
               return this.validator ? this.validator(this) : null;
            }
            _runAsyncValidator(e) {
               if (this.asyncValidator) {
                  (this.status = lo), (this._hasOwnPendingAsyncValidator = !0);
                  const t = Bw(this.asyncValidator(this));
                  this._asyncValidationSubscription = t.subscribe((r) => {
                     (this._hasOwnPendingAsyncValidator = !1), this.setErrors(r, { emitEvent: e });
                  });
               }
            }
            _cancelExistingSubscription() {
               this._asyncValidationSubscription && (this._asyncValidationSubscription.unsubscribe(), (this._hasOwnPendingAsyncValidator = !1));
            }
            setErrors(e, t = {}) {
               (this.errors = e), this._updateControlsErrors(!1 !== t.emitEvent);
            }
            get(e) {
               let t = e;
               return null == t || (Array.isArray(t) || (t = t.split(".")), 0 === t.length) ? null : t.reduce((r, i) => r && r._find(i), this);
            }
            getError(e, t) {
               const r = t ? this.get(t) : this;
               return r && r.errors ? r.errors[e] : null;
            }
            hasError(e, t) {
               return !!this.getError(e, t);
            }
            get root() {
               let e = this;
               for (; e._parent; ) e = e._parent;
               return e;
            }
            _updateControlsErrors(e) {
               (this.status = this._calculateStatus()), e && this.statusChanges.emit(this.status), this._parent && this._parent._updateControlsErrors(e);
            }
            _initObservables() {
               (this.valueChanges = new ve()), (this.statusChanges = new ve());
            }
            _calculateStatus() {
               return this._allControlsDisabled()
                  ? Us
                  : this.errors
                  ? hc
                  : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(lo)
                  ? lo
                  : this._anyControlsHaveStatus(hc)
                  ? hc
                  : js;
            }
            _anyControlsHaveStatus(e) {
               return this._anyControls((t) => t.status === e);
            }
            _anyControlsDirty() {
               return this._anyControls((e) => e.dirty);
            }
            _anyControlsTouched() {
               return this._anyControls((e) => e.touched);
            }
            _updatePristine(e = {}) {
               (this.pristine = !this._anyControlsDirty()), this._parent && !e.onlySelf && this._parent._updatePristine(e);
            }
            _updateTouched(e = {}) {
               (this.touched = this._anyControlsTouched()), this._parent && !e.onlySelf && this._parent._updateTouched(e);
            }
            _registerOnCollectionChange(e) {
               this._onCollectionChange = e;
            }
            _setUpdateStrategy(e) {
               pc(e) && null != e.updateOn && (this._updateOn = e.updateOn);
            }
            _parentMarkedDirty(e) {
               return !e && !(!this._parent || !this._parent.dirty) && !this._parent._anyControlsDirty();
            }
            _find(e) {
               return null;
            }
            _assignValidators(e) {
               (this._rawValidators = Array.isArray(e) ? e.slice() : e),
                  (this._composedValidatorFn = (function EV(n) {
                     return Array.isArray(n) ? Th(n) : n || null;
                  })(this._rawValidators));
            }
            _assignAsyncValidators(e) {
               (this._rawAsyncValidators = Array.isArray(e) ? e.slice() : e),
                  (this._composedAsyncValidatorFn = (function MV(n) {
                     return Array.isArray(n) ? Rh(n) : n || null;
                  })(this._rawAsyncValidators));
            }
         }
         class Vh extends nC {
            constructor(e, t, r) {
               super(
                  (function Ph(n) {
                     return (pc(n) ? n.validators : n) || null;
                  })(t),
                  (function Lh(n, e) {
                     return (pc(e) ? e.asyncValidators : n) || null;
                  })(r, t)
               ),
                  (this.controls = e),
                  this._initObservables(),
                  this._setUpdateStrategy(t),
                  this._setUpControls(),
                  this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!this.asyncValidator });
            }
            registerControl(e, t) {
               return this.controls[e]
                  ? this.controls[e]
                  : ((this.controls[e] = t), t.setParent(this), t._registerOnCollectionChange(this._onCollectionChange), t);
            }
            addControl(e, t, r = {}) {
               this.registerControl(e, t), this.updateValueAndValidity({ emitEvent: r.emitEvent }), this._onCollectionChange();
            }
            removeControl(e, t = {}) {
               this.controls[e] && this.controls[e]._registerOnCollectionChange(() => {}),
                  delete this.controls[e],
                  this.updateValueAndValidity({ emitEvent: t.emitEvent }),
                  this._onCollectionChange();
            }
            setControl(e, t, r = {}) {
               this.controls[e] && this.controls[e]._registerOnCollectionChange(() => {}),
                  delete this.controls[e],
                  t && this.registerControl(e, t),
                  this.updateValueAndValidity({ emitEvent: r.emitEvent }),
                  this._onCollectionChange();
            }
            contains(e) {
               return this.controls.hasOwnProperty(e) && this.controls[e].enabled;
            }
            setValue(e, t = {}) {
               (function tC(n, e, t) {
                  n._forEachChild((r, i) => {
                     if (void 0 === t[i]) throw new _(1002, "");
                  });
               })(this, 0, e),
                  Object.keys(e).forEach((r) => {
                     (function eC(n, e, t) {
                        const r = n.controls;
                        if (!(e ? Object.keys(r) : r).length) throw new _(1e3, "");
                        if (!r[t]) throw new _(1001, "");
                     })(this, !0, r),
                        this.controls[r].setValue(e[r], { onlySelf: !0, emitEvent: t.emitEvent });
                  }),
                  this.updateValueAndValidity(t);
            }
            patchValue(e, t = {}) {
               null != e &&
                  (Object.keys(e).forEach((r) => {
                     const i = this.controls[r];
                     i && i.patchValue(e[r], { onlySelf: !0, emitEvent: t.emitEvent });
                  }),
                  this.updateValueAndValidity(t));
            }
            reset(e = {}, t = {}) {
               this._forEachChild((r, i) => {
                  r.reset(e[i], { onlySelf: !0, emitEvent: t.emitEvent });
               }),
                  this._updatePristine(t),
                  this._updateTouched(t),
                  this.updateValueAndValidity(t);
            }
            getRawValue() {
               return this._reduceChildren({}, (e, t, r) => ((e[r] = t.getRawValue()), e));
            }
            _syncPendingControls() {
               let e = this._reduceChildren(!1, (t, r) => !!r._syncPendingControls() || t);
               return e && this.updateValueAndValidity({ onlySelf: !0 }), e;
            }
            _forEachChild(e) {
               Object.keys(this.controls).forEach((t) => {
                  const r = this.controls[t];
                  r && e(r, t);
               });
            }
            _setUpControls() {
               this._forEachChild((e) => {
                  e.setParent(this), e._registerOnCollectionChange(this._onCollectionChange);
               });
            }
            _updateValue() {
               this.value = this._reduceValue();
            }
            _anyControls(e) {
               for (const [t, r] of Object.entries(this.controls)) if (this.contains(t) && e(r)) return !0;
               return !1;
            }
            _reduceValue() {
               return this._reduceChildren({}, (t, r, i) => ((r.enabled || this.disabled) && (t[i] = r.value), t));
            }
            _reduceChildren(e, t) {
               let r = e;
               return (
                  this._forEachChild((i, o) => {
                     r = t(r, i, o);
                  }),
                  r
               );
            }
            _allControlsDisabled() {
               for (const e of Object.keys(this.controls)) if (this.controls[e].enabled) return !1;
               return Object.keys(this.controls).length > 0 || this.disabled;
            }
            _find(e) {
               return this.controls.hasOwnProperty(e) ? this.controls[e] : null;
            }
         }
         const co = new x("CallSetDisabledState", { providedIn: "root", factory: () => mc }),
            mc = "always";
         function _c(n, e) {
            n.forEach((t) => {
               t.registerOnValidatorChange && t.registerOnValidatorChange(e);
            });
         }
         function Bh(n, e) {
            const t = (function qw(n) {
               return n._rawValidators;
            })(n);
            null !== e.validator ? n.setValidators(Gw(t, e.validator)) : "function" == typeof t && n.setValidators([t]);
            const r = (function Ww(n) {
               return n._rawAsyncValidators;
            })(n);
            null !== e.asyncValidator ? n.setAsyncValidators(Gw(r, e.asyncValidator)) : "function" == typeof r && n.setAsyncValidators([r]);
            const i = () => n.updateValueAndValidity();
            _c(e._rawValidators, i), _c(e._rawAsyncValidators, i);
         }
         function rC(n, e) {
            n._pendingDirty && n.markAsDirty(),
               n.setValue(n._pendingValue, { emitModelToViewChange: !1 }),
               e.viewToModelUpdate(n._pendingValue),
               (n._pendingChange = !1);
         }
         const kV = { provide: ht, useExisting: me(() => bc) },
            $s = (() => Promise.resolve())();
         let bc = (() => {
               class n extends ht {
                  constructor(t, r, i) {
                     super(),
                        (this.callSetDisabledState = i),
                        (this.submitted = !1),
                        (this._directives = new Set()),
                        (this.ngSubmit = new ve()),
                        (this.form = new Vh({}, Th(t), Rh(r)));
                  }
                  ngAfterViewInit() {
                     this._setUpdateStrategy();
                  }
                  get formDirective() {
                     return this;
                  }
                  get control() {
                     return this.form;
                  }
                  get path() {
                     return [];
                  }
                  get controls() {
                     return this.form.controls;
                  }
                  addControl(t) {
                     $s.then(() => {
                        const r = this._findContainer(t.path);
                        (t.control = r.registerControl(t.name, t.control)),
                           (function Hs(n, e, t = mc) {
                              Bh(n, e),
                                 e.valueAccessor.writeValue(n.value),
                                 (n.disabled || "always" === t) && e.valueAccessor.setDisabledState?.(n.disabled),
                                 (function IV(n, e) {
                                    e.valueAccessor.registerOnChange((t) => {
                                       (n._pendingValue = t), (n._pendingChange = !0), (n._pendingDirty = !0), "change" === n.updateOn && rC(n, e);
                                    });
                                 })(n, e),
                                 (function TV(n, e) {
                                    const t = (r, i) => {
                                       e.valueAccessor.writeValue(r), i && e.viewToModelUpdate(r);
                                    };
                                    n.registerOnChange(t),
                                       e._registerOnDestroy(() => {
                                          n._unregisterOnChange(t);
                                       });
                                 })(n, e),
                                 (function AV(n, e) {
                                    e.valueAccessor.registerOnTouched(() => {
                                       (n._pendingTouched = !0),
                                          "blur" === n.updateOn && n._pendingChange && rC(n, e),
                                          "submit" !== n.updateOn && n.markAsTouched();
                                    });
                                 })(n, e),
                                 (function SV(n, e) {
                                    if (e.valueAccessor.setDisabledState) {
                                       const t = (r) => {
                                          e.valueAccessor.setDisabledState(r);
                                       };
                                       n.registerOnDisabledChange(t),
                                          e._registerOnDestroy(() => {
                                             n._unregisterOnDisabledChange(t);
                                          });
                                    }
                                 })(n, e);
                           })(t.control, t, this.callSetDisabledState),
                           t.control.updateValueAndValidity({ emitEvent: !1 }),
                           this._directives.add(t);
                     });
                  }
                  getControl(t) {
                     return this.form.get(t.path);
                  }
                  removeControl(t) {
                     $s.then(() => {
                        const r = this._findContainer(t.path);
                        r && r.removeControl(t.name), this._directives.delete(t);
                     });
                  }
                  addFormGroup(t) {
                     $s.then(() => {
                        const r = this._findContainer(t.path),
                           i = new Vh({});
                        (function iC(n, e) {
                           Bh(n, e);
                        })(i, t),
                           r.registerControl(t.name, i),
                           i.updateValueAndValidity({ emitEvent: !1 });
                     });
                  }
                  removeFormGroup(t) {
                     $s.then(() => {
                        const r = this._findContainer(t.path);
                        r && r.removeControl(t.name);
                     });
                  }
                  getFormGroup(t) {
                     return this.form.get(t.path);
                  }
                  updateModel(t, r) {
                     $s.then(() => {
                        this.form.get(t.path).setValue(r);
                     });
                  }
                  setValue(t) {
                     this.control.setValue(t);
                  }
                  onSubmit(t) {
                     return (
                        (this.submitted = !0),
                        (function oC(n, e) {
                           n._syncPendingControls(),
                              e.forEach((t) => {
                                 const r = t.control;
                                 "submit" === r.updateOn && r._pendingChange && (t.viewToModelUpdate(r._pendingValue), (r._pendingChange = !1));
                              });
                        })(this.form, this._directives),
                        this.ngSubmit.emit(t),
                        "dialog" === t?.target?.method
                     );
                  }
                  onReset() {
                     this.resetForm();
                  }
                  resetForm(t) {
                     this.form.reset(t), (this.submitted = !1);
                  }
                  _setUpdateStrategy() {
                     this.options && null != this.options.updateOn && (this.form._updateOn = this.options.updateOn);
                  }
                  _findContainer(t) {
                     return t.pop(), t.length ? this.form.get(t) : this.form;
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)(w(it, 10), w(fr, 10), w(co, 8));
                  }),
                  (n.ɵdir = $({
                     type: n,
                     selectors: [["form", 3, "ngNoForm", "", 3, "formGroup", ""], ["ng-form"], ["", "ngForm", ""]],
                     hostBindings: function (t, r) {
                        1 & t &&
                           Ce("submit", function (o) {
                              return r.onSubmit(o);
                           })("reset", function () {
                              return r.onReset();
                           });
                     },
                     inputs: { options: ["ngFormOptions", "options"] },
                     outputs: { ngSubmit: "ngSubmit" },
                     exportAs: ["ngForm"],
                     features: [be([kV]), de],
                  })),
                  n
               );
            })(),
            pC = (() => {
               class n {}
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)();
                  }),
                  (n.ɵmod = We({ type: n })),
                  (n.ɵinj = ze({})),
                  n
               );
            })();
         const $h = new x("NgModelWithFormControlWarning");
         let RC = (() => {
               class n {}
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)();
                  }),
                  (n.ɵmod = We({ type: n })),
                  (n.ɵinj = ze({ imports: [pC] })),
                  n
               );
            })(),
            u3 = (() => {
               class n {
                  static withConfig(t) {
                     return { ngModule: n, providers: [{ provide: co, useValue: t.callSetDisabledState ?? mc }] };
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)();
                  }),
                  (n.ɵmod = We({ type: n })),
                  (n.ɵinj = ze({ imports: [RC] })),
                  n
               );
            })(),
            d3 = (() => {
               class n {
                  static withConfig(t) {
                     return {
                        ngModule: n,
                        providers: [
                           { provide: $h, useValue: t.warnOnNgModelWithFormControl ?? "always" },
                           { provide: co, useValue: t.callSetDisabledState ?? mc },
                        ],
                     };
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)();
                  }),
                  (n.ɵmod = We({ type: n })),
                  (n.ɵinj = ze({ imports: [RC] })),
                  n
               );
            })();
         const h3 = ["myForm"],
            p3 = ["name"],
            m3 = ["email"],
            g3 = ["message"],
            y3 = ["button"],
            Zr = function (n) {
               return { hidden: n };
            };
         class zs {
            constructor() {
               (this.spinOn = !1), (this.sendMessage = !1);
            }
            sendMail() {
               var e = this;
               return (function cV(n) {
                  return function () {
                     var e = this,
                        t = arguments;
                     return new Promise(function (r, i) {
                        var o = n.apply(e, t);
                        function s(l) {
                           xw(o, r, i, s, a, "next", l);
                        }
                        function a(l) {
                           xw(o, r, i, s, a, "throw", l);
                        }
                        s(void 0);
                     });
                  };
               })(function* () {
                  let t = e.name.nativeElement,
                     r = e.email.nativeElement,
                     i = e.message.nativeElement,
                     o = e.button.nativeElement;
                  (t.disabled = !0), (r.disabled = !0), (i.disabled = !0), (o.disabled = !0), (e.spinOn = !0);
                  let s = new FormData();
                  s.append("name", t.value),
                     s.append("email", r.value),
                     s.append("message", i.value),
                     yield fetch("https://erteldg.github.io/send_mail/send_mail.php", { method: "post", body: s }),
                     setTimeout(() => {
                        (e.spinOn = !1),
                           (t.disabled = !1),
                           (r.disabled = !1),
                           (i.disabled = !1),
                           (o.disabled = !1),
                           (t.value = ""),
                           (r.value = ""),
                           (i.value = ""),
                           (o.value = ""),
                           (e.sendMessage = !0),
                           setTimeout(() => {
                              e.sendMessage = !1;
                           }, 5e3);
                     }, 1e3);
               })();
            }
         }
         (zs.ɵfac = function (e) {
            return new (e || zs)();
         }),
            (zs.ɵcmp = Ve({
               type: zs,
               selectors: [["app-contact-form"]],
               viewQuery: function (e, t) {
                  if ((1 & e && (ji(h3, 5), ji(p3, 5), ji(m3, 5), ji(g3, 5), ji(y3, 5)), 2 & e)) {
                     let r;
                     Pr((r = Lr())) && (t.myForm = r.first),
                        Pr((r = Lr())) && (t.name = r.first),
                        Pr((r = Lr())) && (t.email = r.first),
                        Pr((r = Lr())) && (t.message = r.first),
                        Pr((r = Lr())) && (t.button = r.first);
                  }
               },
               decls: 26,
               vars: 21,
               consts: [
                  [1, "col-span-full", "grid", "grid-cols-12", "gap-y-6", "gap-x-1", "mt-4"],
                  [1, "col-start-2", "col-end-12"],
                  ["ngNativeValidate", "", 1, "grid", "grid-cols-12", "space-y-8", 3, "submit"],
                  ["myForm", ""],
                  [1, "col-span-full", "row-start-1", "row-end-4"],
                  [
                     1,
                     "h-min",
                     "border-solid",
                     "border-2",
                     "border-darkSkyBlue",
                     "rounded-lg",
                     "bg-darkGunmetal/90",
                     "text-center",
                     "flex",
                     "items-center",
                     "py-12",
                     3,
                     "ngClass",
                  ],
                  [
                     "type",
                     "text",
                     "name",
                     "name",
                     "placeholder",
                     "Your Name",
                     "required",
                     "",
                     1,
                     "bg-darkGunmetal",
                     "border-solid",
                     "border-2",
                     "border-darkSkyBlue",
                     "rounded-lg",
                     "placeholder:text-white",
                     "w-full",
                     "focus:outline-none",
                     "focus:border-khaki",
                     "text-sm",
                     "py-2",
                     "px-4",
                     "focus:placeholder:text-transparent",
                     "row-start-1",
                     "row-end-2",
                     "col-span-full",
                     "h-max",
                     "xl:text-base",
                     3,
                     "ngClass",
                  ],
                  ["name", ""],
                  [
                     "type",
                     "email",
                     "name",
                     "email",
                     "placeholder",
                     "Your email",
                     "required",
                     "",
                     1,
                     "bg-darkGunmetal",
                     "border-solid",
                     "border-2",
                     "border-darkSkyBlue",
                     "rounded-lg",
                     "placeholder:text-white",
                     "w-full",
                     "focus:outline-none",
                     "focus:border-khaki",
                     "text-sm",
                     "py-2",
                     "px-4",
                     "focus:placeholder:text-transparent",
                     "row-start-2",
                     "row-end-3",
                     "col-span-full",
                     "h-max",
                     "xl:text-base",
                     3,
                     "ngClass",
                  ],
                  ["email", ""],
                  [
                     "type",
                     "text",
                     "name",
                     "message",
                     "placeholder",
                     "Your message",
                     "required",
                     "",
                     1,
                     "bg-darkGunmetal",
                     "h-24",
                     "border-solid",
                     "border-2",
                     "border-darkSkyBlue",
                     "rounded-lg",
                     "placeholder:text-white",
                     "w-full",
                     "focus:outline-none",
                     "focus:border-khaki",
                     "text-sm",
                     "py-2",
                     "px-4",
                     "focus:placeholder:text-transparent",
                     "row-start-3",
                     "col-span-full",
                     "row-end-4",
                     "xl:text-base",
                     3,
                     "ngClass",
                  ],
                  ["message", ""],
                  [
                     "type",
                     "submit",
                     1,
                     "row-start-4",
                     "row-end-5",
                     "bg-khaki",
                     "px-4",
                     "py-2",
                     "border-solid",
                     "border-2",
                     "border-khaki",
                     "rounded-lg",
                     "hover:border-darkSkyBlue",
                     "hover:bg-darkSkyBlue",
                     "cursor-pointer",
                     "text-xs",
                     "gap-x-4",
                     "col-start-3",
                     "col-end-11",
                     "lg:col-start-4",
                     "Lg:col-end-8",
                     "flex",
                     "justify-center",
                     "xl:text-base",
                  ],
                  ["button", ""],
                  [1, "flex", "justify-center", "items-center", 3, "ngClass"],
                  ["role", "status", 1, "spinner-border", "animate-spin", "inline-block", "w-4", "h-4", "text-darkGunmetal", "border-4", "rounded-full"],
                  [1, "visually-hidden"],
                  [3, "ngClass"],
               ],
               template: function (e, t) {
                  1 & e &&
                     (b(0, "div", 0)(1, "div", 1)(2, "form", 2, 3),
                     Ce("submit", function () {
                        return t.sendMail();
                     }),
                     b(4, "div", 4)(5, "div", 5),
                     R(6, " Thank you for your message!"),
                     B(7, "br")(8, "br"),
                     R(9, "I will process your request as soon as possible and contact you shortly using the contact details provided. "),
                     C()(),
                     B(10, "input", 6, 7)(12, "input", 8, 9)(14, "textarea", 10, 11),
                     b(16, "button", 12, 13)(18, "div", 14)(19, "div", 15)(20, "span", 16),
                     R(21, "Loading....."),
                     C()()(),
                     b(22, "div", 17),
                     R(23, "Send"),
                     C(),
                     b(24, "div", 17),
                     R(25, "Sending.."),
                     C()()()()()),
                     2 & e &&
                        (re(5),
                        Ie("ngClass", _t(7, Zr, !t.sendMessage)),
                        re(5),
                        Ie("ngClass", _t(9, Zr, t.sendMessage)),
                        re(2),
                        Ie("ngClass", _t(11, Zr, t.sendMessage)),
                        re(2),
                        Ie("ngClass", _t(13, Zr, t.sendMessage)),
                        re(4),
                        Ie("ngClass", _t(15, Zr, !t.spinOn)),
                        re(4),
                        Ie("ngClass", _t(17, Zr, t.spinOn)),
                        re(2),
                        Ie("ngClass", _t(19, Zr, !t.spinOn)));
               },
               dependencies: [Il, Xw, bc],
            }));
         class Gs {}
         (Gs.ɵfac = function (e) {
            return new (e || Gs)();
         }),
            (Gs.ɵcmp = Ve({
               type: Gs,
               selectors: [["app-scroll-up-section"]],
               decls: 10,
               vars: 0,
               consts: [
                  [1, "col-span-full", "grid", "grid-cols-12", "gap-x-1", "mt-4"],
                  [1, "col-start-2", "col-end-12", "grid", "grid-cols-12"],
                  [1, "col-start-11", "col-end-13", "lg:col-start-12"],
                  ["href", "#top"],
                  [
                     "id",
                     "Icons",
                     "version",
                     "1.1",
                     "viewBox",
                     "0 0 32 32",
                     0,
                     "xml",
                     "space",
                     "preserve",
                     "xmlns",
                     "http://www.w3.org/2000/svg",
                     0,
                     "xmlns",
                     "xlink",
                     "http://www.w3.org/1999/xlink",
                     1,
                     "stroke-white",
                     "hover:stroke-darkSkyBlue",
                     "cursor-pointer",
                     2,
                     "enable-background",
                     "new 0 0 32 32",
                  ],
                  ["type", "text/css"],
                  ["cx", "16", "cy", "16", "r", "13", 1, "st0"],
                  ["x1", "16", "x2", "16", "y1", "23", "y2", "10", 1, "st0"],
                  ["points", "12,14 16,10 20,14 ", 1, "st0"],
               ],
               template: function (e, t) {
                  1 & e &&
                     (b(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "a", 3),
                     Xt(),
                     b(4, "svg", 4)(5, "style", 5),
                     R(6, " .st0 { fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; stroke-miterlimit: 10; } "),
                     C(),
                     B(7, "circle", 6)(8, "line", 7)(9, "polyline", 8),
                     C()()()()());
               },
            }));
         class qs {
            constructor() {
               (this.valueEmitter = new ve()), (this.imprintOpen = !1);
            }
            openCloseInprint() {
               (this.imprintOpen = !this.imprintOpen), this.valueEmitter.emit(this.imprintOpen);
            }
         }
         function _3(n, e) {
            if ((1 & n && (b(0, "div", 13), R(1), C()), 2 & n)) {
               const t = e.$implicit;
               re(1), Wo("", t, " ");
            }
         }
         function v3(n, e) {
            if (
               (1 & n &&
                  (b(0, "div", 2)(1, "div", 3),
                  B(2, "img", 4),
                  C(),
                  b(3, "div", 5),
                  R(4),
                  C(),
                  b(5, "div", 6),
                  Nr(6, _3, 2, 1, "div", 7),
                  b(7, "div", 8),
                  R(8),
                  C()(),
                  b(9, "div", 9),
                  R(10),
                  C(),
                  b(11, "div", 10)(12, "a", 11)(13, "div"),
                  R(14, "Live test"),
                  C()(),
                  b(15, "a", 12)(16, "div"),
                  R(17, "Github"),
                  C()()()()),
               2 & n)
            ) {
               const t = e.$implicit;
               re(2),
                  Go("src", "assets/img/imagesProjects/", t.imageName, ".png", Di),
                  re(2),
                  Wo("", t.projectName, " "),
                  re(2),
                  Ie("ngForOf", t.toolsOther),
                  re(2),
                  Bn(t.tools),
                  re(2),
                  Bn(t.description),
                  re(2),
                  Ja("href", t.linkLiveTest, Di),
                  re(3),
                  Ja("href", t.linkGitHub, Di);
            }
         }
         (qs.ɵfac = function (e) {
            return new (e || qs)();
         }),
            (qs.ɵcmp = Ve({
               type: qs,
               selectors: [["app-footer-section"]],
               outputs: { valueEmitter: "valueEmitter" },
               decls: 22,
               vars: 0,
               consts: [
                  [1, "grid", "grid-cols-12", "row-span-full", "grid-rows-4", "text-white", "text-center", "gap-4"],
                  [
                     1,
                     "row-start-1",
                     "row-span-1",
                     "col-start-2",
                     "col-end-12",
                     "text-4xl",
                     "font-bold",
                     "flex",
                     "justify-center",
                     "xl:col-start-1",
                     "xl:col-end-3",
                  ],
                  [1, ""],
                  [
                     1,
                     "row-start-2",
                     "row-span-1",
                     "col-start-2",
                     "col-end-12",
                     "font-bold",
                     "flex",
                     "justify-center",
                     "xl:col-start-5",
                     "xl:col-end-9",
                     "xl:row-start-1",
                     "xl:row-span-1",
                  ],
                  [
                     1,
                     "row-start-3",
                     "row-span-1",
                     "col-start-3",
                     "col-end-11",
                     "lg:col-start-5",
                     "lg:col-end-9",
                     "xl:col-start-10",
                     "xl:col-end-13",
                     "xl:row-start-1",
                     "xl:row-span-1",
                  ],
                  [1, "col-start-4", "col-end-10", "flex", "justify-between", "items-center", "h-8"],
                  ["href", "https://github.com/ErtelDG", "target", "_blank", 1, "cursor-pointer", "object-scale-down"],
                  [
                     "height",
                     "2.5rem",
                     "id",
                     "Layer_1",
                     "version",
                     "1.1",
                     "viewBox",
                     "0 0 512 512",
                     "width",
                     "2.5rem",
                     0,
                     "xml",
                     "space",
                     "preserve",
                     "xmlns",
                     "http://www.w3.org/2000/svg",
                     0,
                     "xmlns",
                     "xlink",
                     "http://www.w3.org/1999/xlink",
                     1,
                     "fill-white",
                     "hover:fill-darkSkyBlue",
                  ],
                  [
                     "d",
                     "M256,32C132.3,32,32,134.8,32,261.7c0,101.5,64.2,187.5,153.2,217.9c11.2,2.1,15.3-5,15.3-11.1   c0-5.5-0.2-19.9-0.3-39.1c-62.3,13.9-75.5-30.8-75.5-30.8c-10.2-26.5-24.9-33.6-24.9-33.6c-20.3-14.3,1.5-14,1.5-14   c22.5,1.6,34.3,23.7,34.3,23.7c20,35.1,52.4,25,65.2,19.1c2-14.8,7.8-25,14.2-30.7c-49.7-5.8-102-25.5-102-113.5   c0-25.1,8.7-45.6,23-61.6c-2.3-5.8-10-29.2,2.2-60.8c0,0,18.8-6.2,61.6,23.5c17.9-5.1,37-7.6,56.1-7.7c19,0.1,38.2,2.6,56.1,7.7   c42.8-29.7,61.5-23.5,61.5-23.5c12.2,31.6,4.5,55,2.2,60.8c14.3,16.1,23,36.6,23,61.6c0,88.2-52.4,107.6-102.3,113.3   c8,7.1,15.2,21.1,15.2,42.5c0,30.7-0.3,55.5-0.3,63c0,6.1,4,13.3,15.4,11C415.9,449.1,480,363.1,480,261.7   C480,134.8,379.7,32,256,32z",
                  ],
                  ["href", "#contact", 1, "cursor-pointer", "object-scale-down"],
                  [
                     "width",
                     "2.25rem",
                     "height",
                     "2.25rem",
                     "viewBox",
                     "0 0 40 40",
                     "xmlns",
                     "http://www.w3.org/2000/svg",
                     0,
                     "xmlns",
                     "xlink",
                     "http://www.w3.org/1999/xlink",
                  ],
                  [
                     "d",
                     "M20 0C8.93333 0 0 8.93333 0 20C0 31.0667 8.93333 40 20 40C31.0667 40 40 31.0667 40 20C40 8.93333 31.0667 0 20 0ZM32 27.4667C32 28.1333 31.4667 28.6667 30.8 28.6667H9.33333C8.53333 28.6667 8 28 8 27.3333V14.4L20 20.6667L32 14.4V27.4667ZM32 12.9333L20 19.2L8 12.9333V12.6667C8 12 8.53333 11.3333 9.33333 11.3333H30.6667C31.4667 11.3333 32 12 32 12.6667V12.9333Z",
                     1,
                     "fill-white",
                     "hover:fill-darkSkyBlue",
                  ],
                  ["href", "https://de.linkedin.com/", "target", "_blank", 1, "cursor-pointer", "object-scale-down"],
                  ["width", "2.25rem", "height", "2.25rem", "viewBox", "0 0 40 40", "xmlns", "http://www.w3.org/2000/svg", 1, "hover:fill-darkSkyBlue"],
                  ["clip-path", "url(#clip0_4_4337)"],
                  [
                     "d",
                     "M20 0C8.93333 0 0 8.93333 0 20C0 31.0667 8.93333 40 20 40C31.0667 40 40 31.0667 40 20C40 8.93333 31.0667 0 20 0ZM8.93333 7.33333C9.46667 6.93333 10.1333 6.66667 10.6667 6.66667C11.2 6.66667 12 6.93333 12.4 7.33333C12.8 7.86667 13.0667 8.4 13.0667 9.06667C13.0667 9.73333 12.8 10.4 12.2667 10.8C12 11.3333 11.3333 11.6 10.6667 11.6C10 11.6 9.33333 11.3333 8.93333 10.9333C8.53333 10.4 8.26667 9.73333 8.26667 9.06667C8.26667 8.4 8.53333 7.86667 8.93333 7.33333ZM13.2 28.8H8.26667V13.4667H13.2V28.8ZM31.7333 28.8H26.8V20.6667C26.8 15.7333 20.9333 16.1333 20.9333 20.6667V28.8H16.1333V13.4667H21.0667V15.4667C23.0667 11.7333 31.8667 11.4667 31.8667 19.0667V28.8H31.7333Z",
                     1,
                     "fill-white",
                     "hover:fill-darkSkyBlue",
                  ],
                  [
                     1,
                     "row-start-4",
                     "row-span-1",
                     "col-start-2",
                     "col-end-12",
                     "cursor-pointer",
                     "hover:text-darkSkyBlue",
                     "xl:row-start-2",
                     "xl:row-span-1",
                     3,
                     "click",
                  ],
               ],
               template: function (e, t) {
                  1 & e &&
                     (b(0, "div", 0)(1, "div", 1)(2, "div", 2),
                     R(3, "Dennis"),
                     C()(),
                     b(4, "div", 3)(5, "div", 2),
                     R(6, "@ Dennis Georg Ertel 2022"),
                     C()(),
                     b(7, "div", 4)(8, "div", 5)(9, "a", 6),
                     Xt(),
                     b(10, "svg", 7)(11, "g"),
                     B(12, "path", 8),
                     C()()(),
                     dn(),
                     b(13, "a", 9),
                     Xt(),
                     b(14, "svg", 10),
                     B(15, "path", 11),
                     C()(),
                     dn(),
                     b(16, "a", 12),
                     Xt(),
                     b(17, "svg", 13)(18, "g", 14),
                     B(19, "path", 15),
                     C()()()()(),
                     dn(),
                     b(20, "div", 16),
                     Ce("click", function () {
                        return t.openCloseInprint();
                     }),
                     R(21, "Imprint "),
                     C()());
               },
            }));
         class Ws {
            constructor() {
               this.projects = [
                  {
                     imageName: "Pokedex",
                     projectName: "Pokedex",
                     tools: "HTML",
                     toolsOther: ["TypeScript", "Tailwind", "Rest-API"],
                     description: "Based on the Pok\xe9API a simple library that provides and catalogues pokemon information.",
                     linkLiveTest: "https://erteldg.github.io/projects/pokedex/index.html",
                     linkGitHub: "https://github.com/ErtelDG/pokedex",
                  },
                  {
                     imageName: "Sharkie",
                     projectName: "Sharkie",
                     tools: ["HTML"],
                     toolsOther: ["TypeScript", "Tailwind"],
                     description:
                        "A simple Jump-and-Run game based on an object-oriented approach. Help sharkie to find coins and poison bottles to fight against the killer whale",
                     linkLiveTest: "https://erteldg.github.io/projects/sharkie/index.html",
                     linkGitHub: "https://github.com/ErtelDG/sharkie",
                  },
                  {
                     imageName: "Join",
                     projectName: "Join",
                     tools: ["CSS"],
                     toolsOther: ["TypeScript", "HTML"],
                     description:
                        "Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories. ",
                     linkLiveTest: "https://erteldg.github.io/projects/join/loginLogout/index.html",
                     linkGitHub: "https://github.com/ErtelDG/Join",
                  },
                  {
                     imageName: "EL_Pollo_Loco",
                     projectName: "EL Pollo Loco",
                     tools: ["HTML"],
                     toolsOther: ["TypeScript", "Tailwind"],
                     description:
                        "And another jump and run game based on an object-oriented approach. Help Pepe find coins and bottles to fight the final boss.",
                     linkLiveTest: "https://erteldg.github.io/projects/el_pollo_loco/index.html",
                     linkGitHub: "https://github.com/ErtelDG/el_pollo-loco",
                  },
                  {
                     imageName: "Ring_of_fire",
                     projectName: "Ring of Fire",
                     tools: ["HTML"],
                     toolsOther: ["Firebase", "TypeScript", "Tailwind"],
                     description: "A small Game-app inspired by the popular drinking card game.",
                     linkLiveTest: "https://erteldg.github.io/projects/ringoffire/index.html",
                     linkGitHub: "https://github.com/ErtelDG/ringoffire",
                  },
               ];
            }
         }
         (Ws.ɵfac = function (e) {
            return new (e || Ws)();
         }),
            (Ws.ɵcmp = Ve({
               type: Ws,
               selectors: [["app-projects"]],
               decls: 2,
               vars: 1,
               consts: [
                  [1, "col-span-full", "grid", "grid-cols-12", "gap-6"],
                  ["class", "col-start-2 col-end-12 grid grid-cols-12 gap-4 mt-12", 4, "ngFor", "ngForOf"],
                  [1, "col-start-2", "col-end-12", "grid", "grid-cols-12", "gap-4", "mt-12"],
                  [1, "col-span-full", "flex", "justify-center"],
                  [3, "src"],
                  [1, "col-span-full", "text-darkSkyBlue", "text-center", "text-3xl", "font-bold", "mt-4", "xl:text-4xl"],
                  [1, "col-span-full", "flex", "flex-wrap", "justify-center"],
                  ["class", "text-khaki px-2 border-khaki border-r-2 xl:text-xl", 4, "ngFor", "ngForOf"],
                  [1, "text-khaki", "px-2", "xl:text-xl"],
                  [1, "col-span-full", "text-center", "text-xs", "xl:text-base"],
                  [1, "col-span-full", "flex", "justify-around", "items-center", "py-4"],
                  [
                     "target",
                     "_blank",
                     1,
                     "text-sm",
                     "text-center",
                     "bg-darkSkyBlue",
                     "border-darkSkyBlue",
                     "hover:bg-khaki",
                     "hover:border-khaki",
                     "border-2",
                     "w-2/5",
                     "px-4",
                     "py-2",
                     "cursor-pointer",
                     "rounded-lg",
                     "xl:text-base",
                     3,
                     "href",
                  ],
                  [
                     "target",
                     "_blank",
                     1,
                     "text-sm",
                     "text-center",
                     "border-khaki",
                     "border-2",
                     "w-2/5",
                     "px-4",
                     "py-2",
                     "cursor-pointer",
                     "rounded-lg",
                     "hover:bg-khaki",
                     "xl:text-base",
                     3,
                     "href",
                  ],
                  [1, "text-khaki", "px-2", "border-khaki", "border-r-2", "xl:text-xl"],
               ],
               template: function (e, t) {
                  1 & e && (b(0, "div", 0), Nr(1, v3, 18, 7, "div", 1), C()), 2 & e && (re(1), Ie("ngForOf", t.projects));
               },
               dependencies: [Al],
            }));
         class Ks {
            constructor() {
               (this.imprintOpen = !0), (this.valueEmitter = new ve());
            }
            openCloseInprint() {
               (this.imprintOpen = !this.imprintOpen), this.valueEmitter.emit(this.imprintOpen);
            }
         }
         (Ks.ɵfac = function (e) {
            return new (e || Ks)();
         }),
            (Ks.ɵcmp = Ve({
               type: Ks,
               selectors: [["app-inprint"]],
               outputs: { valueEmitter: "valueEmitter" },
               decls: 44,
               vars: 0,
               consts: [
                  [1, "min-w-min", "h-full", "bg-darkGunmetal", "text-white", "grid", "grid-cols-12", "grid-rows-none"],
                  [
                     1,
                     "cursor-pointer",
                     "object-scale-down",
                     "fill-white",
                     "hover:fill-darkSkyBlue",
                     "col-start-11",
                     "col-end-13",
                     "row-start-1",
                     "row-end-1",
                     "h-16",
                     "flex",
                     "flex-end",
                     "items-center",
                     3,
                     "click",
                  ],
                  [
                     "enable-background",
                     "new 0 0 24 24",
                     "version",
                     "1.1",
                     "viewBox",
                     "0 0 24 24",
                     0,
                     "xml",
                     "space",
                     "preserve",
                     "width",
                     "1.5rem",
                     "height",
                     "1.5rem",
                     "xmlns",
                     "http://www.w3.org/2000/svg",
                     0,
                     "xmlns",
                     "xlink",
                     "http://www.w3.org/1999/xlink",
                  ],
                  ["id", "grid_system"],
                  ["id", "_icons"],
                  [
                     "d",
                     "M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z",
                  ],
                  [
                     1,
                     "col-start-2",
                     "col-end-12",
                     "row-start-2",
                     "row-end-3",
                     "text-clip",
                     "overflow-hidden",
                     "text-xs",
                     "text-center",
                     "h-[calc(100vh-4rem)]",
                     "xl:flex",
                     "xl:flex-col",
                     "xl:justify-center",
                     "xl:items-center",
                  ],
                  ["href", "https://www.activemind.de/datenschutz/impressums-generator/"],
               ],
               template: function (e, t) {
                  1 & e &&
                     (b(0, "div", 0)(1, "div", 1),
                     Ce("click", function () {
                        return t.openCloseInprint();
                     }),
                     Xt(),
                     b(2, "svg", 2),
                     B(3, "g", 3),
                     b(4, "g", 4),
                     B(5, "path", 5),
                     C()()(),
                     dn(),
                     b(6, "div", 6)(7, "h1"),
                     R(8, "Impressum"),
                     C(),
                     b(9, "h2"),
                     R(10, "Angaben gem\xe4\xdf \xa7 5 TMG:"),
                     C(),
                     b(11, "p"),
                     B(12, "br"),
                     R(13, "Dennis Georg Ertel"),
                     C(),
                     b(14, "h3"),
                     R(15, "Postanschrift:"),
                     C(),
                     b(16, "p"),
                     B(17, "br"),
                     C(),
                     b(18, "h3"),
                     R(19, "Kontakt:"),
                     C(),
                     b(20, "p"),
                     R(21, "Telefon: +49 162 1531349"),
                     B(22, "br"),
                     R(23, "E-Mail: ertel.developer@t-online.de"),
                     C(),
                     B(24, "p"),
                     b(25, "p"),
                     B(26, "br"),
                     C(),
                     B(27, "p"),
                     b(28, "h2"),
                     R(29, "Hinweise zur Website"),
                     C(),
                     B(30, "p"),
                     b(31, "h2"),
                     R(32, "Information gem\xe4\xdf \xa7 36 VSBG"),
                     C(),
                     b(33, "p"),
                     R(
                        34,
                        "Gem\xe4\xdf \xa7 36 VSBG (Verbraucherstreitbeilegungsgesetz \u2013 Gesetz \xfcber die alternative Streitbeilegung in Verbrauchersachen) erkl\xe4rt der Betreiber dieser Website:"
                     ),
                     C(),
                     b(35, "p"),
                     R(36, "Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."),
                     C(),
                     B(37, "p"),
                     b(38, "p")(39, "em"),
                     R(40, "Das Impressum wurde mit dem "),
                     b(41, "a", 7),
                     R(42, "Impressums-Generator der activeMind AG"),
                     C(),
                     R(43, " erstellt."),
                     C()()()());
               },
            }));
         const b3 = function (n, e) {
               return { "bg-darkGunmetal": n, hidden: e };
            },
            FC = function (n) {
               return { hidden: n };
            };
         class Zs {
            constructor(e) {
               (this.languageInput = e), (this.title = "portfolio"), (this.language = "en"), (this.imprintOpenOrClose = !1), (this.menuOpenOrClose = !1);
            }
            ngOnInit() {
               (this.language = this.languageInput.currentLanguage), console.log(this.language);
            }
            onValueMenuOpenOrClose(e) {
               this.menuOpenOrClose = e;
            }
            onValueImprintOpenOrClose(e) {
               this.imprintOpenOrClose = e;
            }
         }
         (Zs.ɵfac = function (e) {
            return new (e || Zs)(w(qr));
         }),
            (Zs.ɵcmp = Ve({
               type: Zs,
               selectors: [["app-root"]],
               decls: 33,
               vars: 10,
               consts: [
                  ["id", "top"],
                  [1, "min-w-full", "gap-4", "text-white", 3, "ngClass"],
                  [1, "row-span-full", "z-10", "h-screen", 3, "valueEmitter"],
                  [1, "grid", "grid-cols-12", "mx-2", "gap-6", "text-white", "overflow-x-hidden", "xl:w-1024", "xl:mx-[calc((100vw-1024px)/2)]", 3, "ngClass"],
                  [1, "col-span-full", "grid", "grid-cols-12", "xl:grid-rows-4", "gap-4", "mt-20"],
                  [1, "col-span-full", "xl:col-start-2", "xl:col-end-7", "xl:row-start-1", "xl:row-end-4"],
                  [1, "col-span-full", "mt-4", "xl:mt-0", "xl:col-start-7", "xl:col-end-12", "xl:row-start-2", "xl:row-end-4", "xl:z-10"],
                  [1, "col-span-full", "xl:col-start-1", "xl:col-end-12", "xl:row-start-4", "xl:row-end-5", "xl:z-10", "xl:mt-16"],
                  [
                     "src",
                     "assets/img/background_cut2.png",
                     "alt",
                     "",
                     1,
                     "hidden",
                     "xl:block",
                     "col-start-1",
                     "col-end-13",
                     "row-start-1",
                     "row-span-full",
                     "w-full",
                     "h-full",
                  ],
                  ["id", "aboutMe"],
                  [1, "col-span-full", "grid", "grid-cols-12", "gap-4", "mt-6", "xl:z-10", "xl:mt0"],
                  [1, "col-span-full"],
                  ["id", "skills", 1, "h-12"],
                  [1, "col-span-full", "grid", "grid-cols-12", "gap-4", "mt-12"],
                  [1, "col-span-full", "my-12", "sm:my-6"],
                  [1, "col-span-full", "my-6", "sm:my-0"],
                  ["id", "portfolio", 1, "h-12"],
                  [1, "col-span-full", "mt-4"],
                  ["id", "contact", 1, "h-12"],
                  [1, "col-span-full", "grid", "grid-cols-12", "gap-4", "mt-6"],
                  [1, "col-span-full", "relative"],
                  [1, "h-1", "w-screen", "absolute", "-left-2", "bg-khaki"],
                  [1, "col-span-full", 3, "valueEmitter"],
                  [3, "valueEmitter"],
               ],
               template: function (e, t) {
                  1 & e &&
                     (B(0, "div", 0),
                     b(1, "div", 1)(2, "app-navbar", 2),
                     Ce("valueEmitter", function (i) {
                        return t.onValueMenuOpenOrClose(i);
                     }),
                     C(),
                     b(3, "div", 3)(4, "div", 4),
                     B(5, "app-image-person", 5)(6, "app-greeting", 6)(7, "app-social-links", 7)(8, "img", 8),
                     C(),
                     B(9, "div", 9),
                     b(10, "div", 10),
                     B(11, "app-about-me", 11),
                     C(),
                     B(12, "div", 12),
                     b(13, "div", 13),
                     B(14, "app-my-skills", 11)(15, "app-logos-skills", 14)(16, "app-btn-go-to-contact", 15),
                     C(),
                     B(17, "div", 16),
                     b(18, "div", 13),
                     B(19, "app-portfolio-section", 11)(20, "app-projects", 17),
                     C(),
                     B(21, "div", 18),
                     b(22, "div", 13),
                     B(23, "app-contact-text", 11)(24, "app-contact-form", 11),
                     C(),
                     b(25, "div", 19),
                     B(26, "app-scroll-up-section", 11),
                     C(),
                     b(27, "div", 20),
                     B(28, "div", 21),
                     C(),
                     b(29, "div", 19)(30, "app-footer-section", 22),
                     Ce("valueEmitter", function (i) {
                        return t.onValueImprintOpenOrClose(i);
                     }),
                     C()()()(),
                     b(31, "div", 1)(32, "app-inprint", 23),
                     Ce("valueEmitter", function (i) {
                        return t.onValueImprintOpenOrClose(i);
                     }),
                     C()()),
                     2 & e &&
                        (re(1),
                        Ie("ngClass", wv(3, b3, !t.menuOpenOrClose, t.imprintOpenOrClose)),
                        re(2),
                        Ie("ngClass", _t(6, FC, t.menuOpenOrClose)),
                        re(28),
                        Ie("ngClass", _t(8, FC, !t.imprintOpenOrClose)));
               },
               dependencies: [Il, Ts, Rs, Fs, Ns, Os, ks, Ps, Ls, Vs, Bs, zs, Gs, qs, Ws, Ks],
            }));
         class NC {}
         class D3 {}
         const Wn = "*";
         function OC(n, e = null) {
            return { type: 2, steps: n, options: e };
         }
         function kC(n) {
            return { type: 6, styles: n, offset: null };
         }
         function PC(n) {
            Promise.resolve().then(n);
         }
         class Qs {
            constructor(e = 0, t = 0) {
               (this._onDoneFns = []),
                  (this._onStartFns = []),
                  (this._onDestroyFns = []),
                  (this._originalOnDoneFns = []),
                  (this._originalOnStartFns = []),
                  (this._started = !1),
                  (this._destroyed = !1),
                  (this._finished = !1),
                  (this._position = 0),
                  (this.parentPlayer = null),
                  (this.totalTime = e + t);
            }
            _onFinish() {
               this._finished || ((this._finished = !0), this._onDoneFns.forEach((e) => e()), (this._onDoneFns = []));
            }
            onStart(e) {
               this._originalOnStartFns.push(e), this._onStartFns.push(e);
            }
            onDone(e) {
               this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
            }
            onDestroy(e) {
               this._onDestroyFns.push(e);
            }
            hasStarted() {
               return this._started;
            }
            init() {}
            play() {
               this.hasStarted() || (this._onStart(), this.triggerMicrotask()), (this._started = !0);
            }
            triggerMicrotask() {
               PC(() => this._onFinish());
            }
            _onStart() {
               this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
            }
            pause() {}
            restart() {}
            finish() {
               this._onFinish();
            }
            destroy() {
               this._destroyed ||
                  ((this._destroyed = !0),
                  this.hasStarted() || this._onStart(),
                  this.finish(),
                  this._onDestroyFns.forEach((e) => e()),
                  (this._onDestroyFns = []));
            }
            reset() {
               (this._started = !1), (this._finished = !1), (this._onStartFns = this._originalOnStartFns), (this._onDoneFns = this._originalOnDoneFns);
            }
            setPosition(e) {
               this._position = this.totalTime ? e * this.totalTime : 1;
            }
            getPosition() {
               return this.totalTime ? this._position / this.totalTime : 1;
            }
            triggerCallback(e) {
               const t = "start" == e ? this._onStartFns : this._onDoneFns;
               t.forEach((r) => r()), (t.length = 0);
            }
         }
         class LC {
            constructor(e) {
               (this._onDoneFns = []),
                  (this._onStartFns = []),
                  (this._finished = !1),
                  (this._started = !1),
                  (this._destroyed = !1),
                  (this._onDestroyFns = []),
                  (this.parentPlayer = null),
                  (this.totalTime = 0),
                  (this.players = e);
               let t = 0,
                  r = 0,
                  i = 0;
               const o = this.players.length;
               0 == o
                  ? PC(() => this._onFinish())
                  : this.players.forEach((s) => {
                       s.onDone(() => {
                          ++t == o && this._onFinish();
                       }),
                          s.onDestroy(() => {
                             ++r == o && this._onDestroy();
                          }),
                          s.onStart(() => {
                             ++i == o && this._onStart();
                          });
                    }),
                  (this.totalTime = this.players.reduce((s, a) => Math.max(s, a.totalTime), 0));
            }
            _onFinish() {
               this._finished || ((this._finished = !0), this._onDoneFns.forEach((e) => e()), (this._onDoneFns = []));
            }
            init() {
               this.players.forEach((e) => e.init());
            }
            onStart(e) {
               this._onStartFns.push(e);
            }
            _onStart() {
               this.hasStarted() || ((this._started = !0), this._onStartFns.forEach((e) => e()), (this._onStartFns = []));
            }
            onDone(e) {
               this._onDoneFns.push(e);
            }
            onDestroy(e) {
               this._onDestroyFns.push(e);
            }
            hasStarted() {
               return this._started;
            }
            play() {
               this.parentPlayer || this.init(), this._onStart(), this.players.forEach((e) => e.play());
            }
            pause() {
               this.players.forEach((e) => e.pause());
            }
            restart() {
               this.players.forEach((e) => e.restart());
            }
            finish() {
               this._onFinish(), this.players.forEach((e) => e.finish());
            }
            destroy() {
               this._onDestroy();
            }
            _onDestroy() {
               this._destroyed ||
                  ((this._destroyed = !0),
                  this._onFinish(),
                  this.players.forEach((e) => e.destroy()),
                  this._onDestroyFns.forEach((e) => e()),
                  (this._onDestroyFns = []));
            }
            reset() {
               this.players.forEach((e) => e.reset()), (this._destroyed = !1), (this._finished = !1), (this._started = !1);
            }
            setPosition(e) {
               const t = e * this.totalTime;
               this.players.forEach((r) => {
                  const i = r.totalTime ? Math.min(1, t / r.totalTime) : 1;
                  r.setPosition(i);
               });
            }
            getPosition() {
               const e = this.players.reduce((t, r) => (null === t || r.totalTime > t.totalTime ? r : t), null);
               return null != e ? e.getPosition() : 0;
            }
            beforeDestroy() {
               this.players.forEach((e) => {
                  e.beforeDestroy && e.beforeDestroy();
               });
            }
            triggerCallback(e) {
               const t = "start" == e ? this._onStartFns : this._onDoneFns;
               t.forEach((r) => r()), (t.length = 0);
            }
         }
         function VC(n) {
            return new _(3e3, !1);
         }
         function nB() {
            return typeof window < "u" && typeof window.document < "u";
         }
         function Yh() {
            return typeof process < "u" && "[object process]" === {}.toString.call(process);
         }
         function pr(n) {
            switch (n.length) {
               case 0:
                  return new Qs();
               case 1:
                  return n[0];
               default:
                  return new LC(n);
            }
         }
         function BC(n, e, t, r, i = new Map(), o = new Map()) {
            const s = [],
               a = [];
            let l = -1,
               c = null;
            if (
               (r.forEach((u) => {
                  const d = u.get("offset"),
                     f = d == l,
                     h = (f && c) || new Map();
                  u.forEach((p, m) => {
                     let g = m,
                        v = p;
                     if ("offset" !== m)
                        switch (((g = e.normalizePropertyName(g, s)), v)) {
                           case "!":
                              v = i.get(m);
                              break;
                           case Wn:
                              v = o.get(m);
                              break;
                           default:
                              v = e.normalizeStyleValue(m, g, v, s);
                        }
                     h.set(g, v);
                  }),
                     f || a.push(h),
                     (c = h),
                     (l = d);
               }),
               s.length)
            )
               throw (function z3(n) {
                  return new _(3502, !1);
               })();
            return a;
         }
         function Xh(n, e, t, r) {
            switch (e) {
               case "start":
                  n.onStart(() => r(t && Jh(t, "start", n)));
                  break;
               case "done":
                  n.onDone(() => r(t && Jh(t, "done", n)));
                  break;
               case "destroy":
                  n.onDestroy(() => r(t && Jh(t, "destroy", n)));
            }
         }
         function Jh(n, e, t) {
            const o = ep(n.element, n.triggerName, n.fromState, n.toState, e || n.phaseName, t.totalTime ?? n.totalTime, !!t.disabled),
               s = n._data;
            return null != s && (o._data = s), o;
         }
         function ep(n, e, t, r, i = "", o = 0, s) {
            return { element: n, triggerName: e, fromState: t, toState: r, phaseName: i, totalTime: o, disabled: !!s };
         }
         function Tt(n, e, t) {
            let r = n.get(e);
            return r || n.set(e, (r = t)), r;
         }
         function jC(n) {
            const e = n.indexOf(":");
            return [n.substring(1, e), n.slice(e + 1)];
         }
         let tp = (n, e) => !1,
            UC = (n, e, t) => [],
            HC = null;
         function np(n) {
            const e = n.parentNode || n.host;
            return e === HC ? null : e;
         }
         (Yh() || typeof Element < "u") &&
            (nB()
               ? ((HC = (() => document.documentElement)()),
                 (tp = (n, e) => {
                    for (; e; ) {
                       if (e === n) return !0;
                       e = np(e);
                    }
                    return !1;
                 }))
               : (tp = (n, e) => n.contains(e)),
            (UC = (n, e, t) => {
               if (t) return Array.from(n.querySelectorAll(e));
               const r = n.querySelector(e);
               return r ? [r] : [];
            }));
         let Qr = null,
            $C = !1;
         const zC = tp,
            GC = UC;
         let qC = (() => {
               class n {
                  validateStyleProperty(t) {
                     return (function iB(n) {
                        Qr ||
                           ((Qr =
                              (function oB() {
                                 return typeof document < "u" ? document.body : null;
                              })() || {}),
                           ($C = !!Qr.style && "WebkitAppearance" in Qr.style));
                        let e = !0;
                        return (
                           Qr.style &&
                              !(function rB(n) {
                                 return "ebkit" == n.substring(1, 6);
                              })(n) &&
                              ((e = n in Qr.style), !e && $C && (e = "Webkit" + n.charAt(0).toUpperCase() + n.slice(1) in Qr.style)),
                           e
                        );
                     })(t);
                  }
                  matchesElement(t, r) {
                     return !1;
                  }
                  containsElement(t, r) {
                     return zC(t, r);
                  }
                  getParentElement(t) {
                     return np(t);
                  }
                  query(t, r, i) {
                     return GC(t, r, i);
                  }
                  computeStyle(t, r, i) {
                     return i || "";
                  }
                  animate(t, r, i, o, s, a = [], l) {
                     return new Qs(i, o);
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)();
                  }),
                  (n.ɵprov = N({ token: n, factory: n.ɵfac })),
                  n
               );
            })(),
            rp = (() => {
               class n {}
               return (n.NOOP = new qC()), n;
            })();
         const ip = "ng-enter",
            Dc = "ng-leave",
            wc = "ng-trigger",
            Cc = ".ng-trigger",
            KC = "ng-animating",
            op = ".ng-animating";
         function Kn(n) {
            if ("number" == typeof n) return n;
            const e = n.match(/^(-?[\.\d]+)(m?s)/);
            return !e || e.length < 2 ? 0 : sp(parseFloat(e[1]), e[2]);
         }
         function sp(n, e) {
            return "s" === e ? 1e3 * n : n;
         }
         function Ec(n, e, t) {
            return n.hasOwnProperty("duration")
               ? n
               : (function lB(n, e, t) {
                    let i,
                       o = 0,
                       s = "";
                    if ("string" == typeof n) {
                       const a = n.match(/^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i);
                       if (null === a) return e.push(VC()), { duration: 0, delay: 0, easing: "" };
                       i = sp(parseFloat(a[1]), a[2]);
                       const l = a[3];
                       null != l && (o = sp(parseFloat(l), a[4]));
                       const c = a[5];
                       c && (s = c);
                    } else i = n;
                    if (!t) {
                       let a = !1,
                          l = e.length;
                       i < 0 &&
                          (e.push(
                             (function w3() {
                                return new _(3100, !1);
                             })()
                          ),
                          (a = !0)),
                          o < 0 &&
                             (e.push(
                                (function C3() {
                                   return new _(3101, !1);
                                })()
                             ),
                             (a = !0)),
                          a && e.splice(l, 0, VC());
                    }
                    return { duration: i, delay: o, easing: s };
                 })(n, e, t);
         }
         function Ys(n, e = {}) {
            return (
               Object.keys(n).forEach((t) => {
                  e[t] = n[t];
               }),
               e
            );
         }
         function ZC(n) {
            const e = new Map();
            return (
               Object.keys(n).forEach((t) => {
                  e.set(t, n[t]);
               }),
               e
            );
         }
         function mr(n, e = new Map(), t) {
            if (t) for (let [r, i] of t) e.set(r, i);
            for (let [r, i] of n) e.set(r, i);
            return e;
         }
         function YC(n, e, t) {
            return t ? e + ":" + t + ";" : "";
         }
         function XC(n) {
            let e = "";
            for (let t = 0; t < n.style.length; t++) {
               const r = n.style.item(t);
               e += YC(0, r, n.style.getPropertyValue(r));
            }
            for (const t in n.style) n.style.hasOwnProperty(t) && !t.startsWith("_") && (e += YC(0, fB(t), n.style[t]));
            n.setAttribute("style", e);
         }
         function Mn(n, e, t) {
            n.style &&
               (e.forEach((r, i) => {
                  const o = lp(i);
                  t && !t.has(i) && t.set(i, n.style[o]), (n.style[o] = r);
               }),
               Yh() && XC(n));
         }
         function Yr(n, e) {
            n.style &&
               (e.forEach((t, r) => {
                  const i = lp(r);
                  n.style[i] = "";
               }),
               Yh() && XC(n));
         }
         function Xs(n) {
            return Array.isArray(n) ? (1 == n.length ? n[0] : OC(n)) : n;
         }
         const ap = new RegExp("{{\\s*(.+?)\\s*}}", "g");
         function JC(n) {
            let e = [];
            if ("string" == typeof n) {
               let t;
               for (; (t = ap.exec(n)); ) e.push(t[1]);
               ap.lastIndex = 0;
            }
            return e;
         }
         function Js(n, e, t) {
            const r = n.toString(),
               i = r.replace(ap, (o, s) => {
                  let a = e[s];
                  return (
                     null == a &&
                        (t.push(
                           (function M3(n) {
                              return new _(3003, !1);
                           })()
                        ),
                        (a = "")),
                     a.toString()
                  );
               });
            return i == r ? n : i;
         }
         function Mc(n) {
            const e = [];
            let t = n.next();
            for (; !t.done; ) e.push(t.value), (t = n.next());
            return e;
         }
         const dB = /-+([a-z0-9])/g;
         function lp(n) {
            return n.replace(dB, (...e) => e[1].toUpperCase());
         }
         function fB(n) {
            return n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
         }
         function Rt(n, e, t) {
            switch (e.type) {
               case 7:
                  return n.visitTrigger(e, t);
               case 0:
                  return n.visitState(e, t);
               case 1:
                  return n.visitTransition(e, t);
               case 2:
                  return n.visitSequence(e, t);
               case 3:
                  return n.visitGroup(e, t);
               case 4:
                  return n.visitAnimate(e, t);
               case 5:
                  return n.visitKeyframes(e, t);
               case 6:
                  return n.visitStyle(e, t);
               case 8:
                  return n.visitReference(e, t);
               case 9:
                  return n.visitAnimateChild(e, t);
               case 10:
                  return n.visitAnimateRef(e, t);
               case 11:
                  return n.visitQuery(e, t);
               case 12:
                  return n.visitStagger(e, t);
               default:
                  throw (function x3(n) {
                     return new _(3004, !1);
                  })();
            }
         }
         function eE(n, e) {
            return window.getComputedStyle(n)[e];
         }
         function _B(n, e) {
            const t = [];
            return (
               "string" == typeof n
                  ? n.split(/\s*,\s*/).forEach((r) =>
                       (function vB(n, e, t) {
                          if (":" == n[0]) {
                             const l = (function bB(n, e) {
                                switch (n) {
                                   case ":enter":
                                      return "void => *";
                                   case ":leave":
                                      return "* => void";
                                   case ":increment":
                                      return (t, r) => parseFloat(r) > parseFloat(t);
                                   case ":decrement":
                                      return (t, r) => parseFloat(r) < parseFloat(t);
                                   default:
                                      return (
                                         e.push(
                                            (function j3(n) {
                                               return new _(3016, !1);
                                            })()
                                         ),
                                         "* => *"
                                      );
                                }
                             })(n, t);
                             if ("function" == typeof l) return void e.push(l);
                             n = l;
                          }
                          const r = n.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                          if (null == r || r.length < 4)
                             return (
                                t.push(
                                   (function B3(n) {
                                      return new _(3015, !1);
                                   })()
                                ),
                                e
                             );
                          const i = r[1],
                             o = r[2],
                             s = r[3];
                          e.push(tE(i, s));
                          "<" == o[0] && !("*" == i && "*" == s) && e.push(tE(s, i));
                       })(r, t, e)
                    )
                  : t.push(n),
               t
            );
         }
         const Ac = new Set(["true", "1"]),
            Tc = new Set(["false", "0"]);
         function tE(n, e) {
            const t = Ac.has(n) || Tc.has(n),
               r = Ac.has(e) || Tc.has(e);
            return (i, o) => {
               let s = "*" == n || n == i,
                  a = "*" == e || e == o;
               return (
                  !s && t && "boolean" == typeof i && (s = i ? Ac.has(n) : Tc.has(n)),
                  !a && r && "boolean" == typeof o && (a = o ? Ac.has(e) : Tc.has(e)),
                  s && a
               );
            };
         }
         const DB = new RegExp("s*:selfs*,?", "g");
         function cp(n, e, t, r) {
            return new wB(n).build(e, t, r);
         }
         class wB {
            constructor(e) {
               this._driver = e;
            }
            build(e, t, r) {
               const i = new MB(t);
               return this._resetContextStyleTimingState(i), Rt(this, Xs(e), i);
            }
            _resetContextStyleTimingState(e) {
               (e.currentQuerySelector = ""), (e.collectedStyles = new Map()), e.collectedStyles.set("", new Map()), (e.currentTime = 0);
            }
            visitTrigger(e, t) {
               let r = (t.queryCount = 0),
                  i = (t.depCount = 0);
               const o = [],
                  s = [];
               return (
                  "@" == e.name.charAt(0) &&
                     t.errors.push(
                        (function I3() {
                           return new _(3006, !1);
                        })()
                     ),
                  e.definitions.forEach((a) => {
                     if ((this._resetContextStyleTimingState(t), 0 == a.type)) {
                        const l = a,
                           c = l.name;
                        c
                           .toString()
                           .split(/\s*,\s*/)
                           .forEach((u) => {
                              (l.name = u), o.push(this.visitState(l, t));
                           }),
                           (l.name = c);
                     } else if (1 == a.type) {
                        const l = this.visitTransition(a, t);
                        (r += l.queryCount), (i += l.depCount), s.push(l);
                     } else
                        t.errors.push(
                           (function A3() {
                              return new _(3007, !1);
                           })()
                        );
                  }),
                  { type: 7, name: e.name, states: o, transitions: s, queryCount: r, depCount: i, options: null }
               );
            }
            visitState(e, t) {
               const r = this.visitStyle(e.styles, t),
                  i = (e.options && e.options.params) || null;
               if (r.containsDynamicStyles) {
                  const o = new Set(),
                     s = i || {};
                  r.styles.forEach((a) => {
                     a instanceof Map &&
                        a.forEach((l) => {
                           JC(l).forEach((c) => {
                              s.hasOwnProperty(c) || o.add(c);
                           });
                        });
                  }),
                     o.size &&
                        (Mc(o.values()),
                        t.errors.push(
                           (function T3(n, e) {
                              return new _(3008, !1);
                           })()
                        ));
               }
               return { type: 0, name: e.name, style: r, options: i ? { params: i } : null };
            }
            visitTransition(e, t) {
               (t.queryCount = 0), (t.depCount = 0);
               const r = Rt(this, Xs(e.animation), t);
               return { type: 1, matchers: _B(e.expr, t.errors), animation: r, queryCount: t.queryCount, depCount: t.depCount, options: Xr(e.options) };
            }
            visitSequence(e, t) {
               return { type: 2, steps: e.steps.map((r) => Rt(this, r, t)), options: Xr(e.options) };
            }
            visitGroup(e, t) {
               const r = t.currentTime;
               let i = 0;
               const o = e.steps.map((s) => {
                  t.currentTime = r;
                  const a = Rt(this, s, t);
                  return (i = Math.max(i, t.currentTime)), a;
               });
               return (t.currentTime = i), { type: 3, steps: o, options: Xr(e.options) };
            }
            visitAnimate(e, t) {
               const r = (function SB(n, e) {
                  if (n.hasOwnProperty("duration")) return n;
                  if ("number" == typeof n) return up(Ec(n, e).duration, 0, "");
                  const t = n;
                  if (t.split(/\s+/).some((o) => "{" == o.charAt(0) && "{" == o.charAt(1))) {
                     const o = up(0, 0, "");
                     return (o.dynamic = !0), (o.strValue = t), o;
                  }
                  const i = Ec(t, e);
                  return up(i.duration, i.delay, i.easing);
               })(e.timings, t.errors);
               t.currentAnimateTimings = r;
               let i,
                  o = e.styles ? e.styles : kC({});
               if (5 == o.type) i = this.visitKeyframes(o, t);
               else {
                  let s = e.styles,
                     a = !1;
                  if (!s) {
                     a = !0;
                     const c = {};
                     r.easing && (c.easing = r.easing), (s = kC(c));
                  }
                  t.currentTime += r.duration + r.delay;
                  const l = this.visitStyle(s, t);
                  (l.isEmptyStep = a), (i = l);
               }
               return (t.currentAnimateTimings = null), { type: 4, timings: r, style: i, options: null };
            }
            visitStyle(e, t) {
               const r = this._makeStyleAst(e, t);
               return this._validateStyleAst(r, t), r;
            }
            _makeStyleAst(e, t) {
               const r = [],
                  i = Array.isArray(e.styles) ? e.styles : [e.styles];
               for (let a of i) "string" == typeof a ? (a === Wn ? r.push(a) : t.errors.push(new _(3002, !1))) : r.push(ZC(a));
               let o = !1,
                  s = null;
               return (
                  r.forEach((a) => {
                     if (a instanceof Map && (a.has("easing") && ((s = a.get("easing")), a.delete("easing")), !o))
                        for (let l of a.values())
                           if (l.toString().indexOf("{{") >= 0) {
                              o = !0;
                              break;
                           }
                  }),
                  { type: 6, styles: r, easing: s, offset: e.offset, containsDynamicStyles: o, options: null }
               );
            }
            _validateStyleAst(e, t) {
               const r = t.currentAnimateTimings;
               let i = t.currentTime,
                  o = t.currentTime;
               r && o > 0 && (o -= r.duration + r.delay),
                  e.styles.forEach((s) => {
                     "string" != typeof s &&
                        s.forEach((a, l) => {
                           const c = t.collectedStyles.get(t.currentQuerySelector),
                              u = c.get(l);
                           let d = !0;
                           u &&
                              (o != i &&
                                 o >= u.startTime &&
                                 i <= u.endTime &&
                                 (t.errors.push(
                                    (function F3(n, e, t, r, i) {
                                       return new _(3010, !1);
                                    })()
                                 ),
                                 (d = !1)),
                              (o = u.startTime)),
                              d && c.set(l, { startTime: o, endTime: i }),
                              t.options &&
                                 (function uB(n, e, t) {
                                    const r = e.params || {},
                                       i = JC(n);
                                    i.length &&
                                       i.forEach((o) => {
                                          r.hasOwnProperty(o) ||
                                             t.push(
                                                (function E3(n) {
                                                   return new _(3001, !1);
                                                })()
                                             );
                                       });
                                 })(a, t.options, t.errors);
                        });
                  });
            }
            visitKeyframes(e, t) {
               const r = { type: 5, styles: [], options: null };
               if (!t.currentAnimateTimings)
                  return (
                     t.errors.push(
                        (function N3() {
                           return new _(3011, !1);
                        })()
                     ),
                     r
                  );
               let o = 0;
               const s = [];
               let a = !1,
                  l = !1,
                  c = 0;
               const u = e.steps.map((v) => {
                  const E = this._makeStyleAst(v, t);
                  let y =
                        null != E.offset
                           ? E.offset
                           : (function xB(n) {
                                if ("string" == typeof n) return null;
                                let e = null;
                                if (Array.isArray(n))
                                   n.forEach((t) => {
                                      if (t instanceof Map && t.has("offset")) {
                                         const r = t;
                                         (e = parseFloat(r.get("offset"))), r.delete("offset");
                                      }
                                   });
                                else if (n instanceof Map && n.has("offset")) {
                                   const t = n;
                                   (e = parseFloat(t.get("offset"))), t.delete("offset");
                                }
                                return e;
                             })(E.styles),
                     T = 0;
                  return null != y && (o++, (T = E.offset = y)), (l = l || T < 0 || T > 1), (a = a || T < c), (c = T), s.push(T), E;
               });
               l &&
                  t.errors.push(
                     (function O3() {
                        return new _(3012, !1);
                     })()
                  ),
                  a &&
                     t.errors.push(
                        (function k3() {
                           return new _(3200, !1);
                        })()
                     );
               const d = e.steps.length;
               let f = 0;
               o > 0 && o < d
                  ? t.errors.push(
                       (function P3() {
                          return new _(3202, !1);
                       })()
                    )
                  : 0 == o && (f = 1 / (d - 1));
               const h = d - 1,
                  p = t.currentTime,
                  m = t.currentAnimateTimings,
                  g = m.duration;
               return (
                  u.forEach((v, E) => {
                     const y = f > 0 ? (E == h ? 1 : f * E) : s[E],
                        T = y * g;
                     (t.currentTime = p + m.delay + T), (m.duration = T), this._validateStyleAst(v, t), (v.offset = y), r.styles.push(v);
                  }),
                  r
               );
            }
            visitReference(e, t) {
               return { type: 8, animation: Rt(this, Xs(e.animation), t), options: Xr(e.options) };
            }
            visitAnimateChild(e, t) {
               return t.depCount++, { type: 9, options: Xr(e.options) };
            }
            visitAnimateRef(e, t) {
               return { type: 10, animation: this.visitReference(e.animation, t), options: Xr(e.options) };
            }
            visitQuery(e, t) {
               const r = t.currentQuerySelector,
                  i = e.options || {};
               t.queryCount++, (t.currentQuery = e);
               const [o, s] = (function CB(n) {
                  const e = !!n.split(/\s*,\s*/).find((t) => ":self" == t);
                  return (
                     e && (n = n.replace(DB, "")),
                     (n = n
                        .replace(/@\*/g, Cc)
                        .replace(/@\w+/g, (t) => Cc + "-" + t.slice(1))
                        .replace(/:animating/g, op)),
                     [n, e]
                  );
               })(e.selector);
               (t.currentQuerySelector = r.length ? r + " " + o : o), Tt(t.collectedStyles, t.currentQuerySelector, new Map());
               const a = Rt(this, Xs(e.animation), t);
               return (
                  (t.currentQuery = null),
                  (t.currentQuerySelector = r),
                  {
                     type: 11,
                     selector: o,
                     limit: i.limit || 0,
                     optional: !!i.optional,
                     includeSelf: s,
                     animation: a,
                     originalSelector: e.selector,
                     options: Xr(e.options),
                  }
               );
            }
            visitStagger(e, t) {
               t.currentQuery ||
                  t.errors.push(
                     (function L3() {
                        return new _(3013, !1);
                     })()
                  );
               const r = "full" === e.timings ? { duration: 0, delay: 0, easing: "full" } : Ec(e.timings, t.errors, !0);
               return { type: 12, animation: Rt(this, Xs(e.animation), t), timings: r, options: null };
            }
         }
         class MB {
            constructor(e) {
               (this.errors = e),
                  (this.queryCount = 0),
                  (this.depCount = 0),
                  (this.currentTransition = null),
                  (this.currentQuery = null),
                  (this.currentQuerySelector = null),
                  (this.currentAnimateTimings = null),
                  (this.currentTime = 0),
                  (this.collectedStyles = new Map()),
                  (this.options = null),
                  (this.unsupportedCSSPropertiesFound = new Set());
            }
         }
         function Xr(n) {
            return (
               n
                  ? (n = Ys(n)).params &&
                    (n.params = (function EB(n) {
                       return n ? Ys(n) : null;
                    })(n.params))
                  : (n = {}),
               n
            );
         }
         function up(n, e, t) {
            return { duration: n, delay: e, easing: t };
         }
         function dp(n, e, t, r, i, o, s = null, a = !1) {
            return {
               type: 1,
               element: n,
               keyframes: e,
               preStyleProps: t,
               postStyleProps: r,
               duration: i,
               delay: o,
               totalTime: i + o,
               easing: s,
               subTimeline: a,
            };
         }
         class Rc {
            constructor() {
               this._map = new Map();
            }
            get(e) {
               return this._map.get(e) || [];
            }
            append(e, t) {
               let r = this._map.get(e);
               r || this._map.set(e, (r = [])), r.push(...t);
            }
            has(e) {
               return this._map.has(e);
            }
            clear() {
               this._map.clear();
            }
         }
         const TB = new RegExp(":enter", "g"),
            FB = new RegExp(":leave", "g");
         function fp(n, e, t, r, i, o = new Map(), s = new Map(), a, l, c = []) {
            return new NB().buildKeyframes(n, e, t, r, i, o, s, a, l, c);
         }
         class NB {
            buildKeyframes(e, t, r, i, o, s, a, l, c, u = []) {
               c = c || new Rc();
               const d = new hp(e, t, c, i, o, u, []);
               d.options = l;
               const f = l.delay ? Kn(l.delay) : 0;
               d.currentTimeline.delayNextStep(f), d.currentTimeline.setStyles([s], null, d.errors, l), Rt(this, r, d);
               const h = d.timelines.filter((p) => p.containsAnimation());
               if (h.length && a.size) {
                  let p;
                  for (let m = h.length - 1; m >= 0; m--) {
                     const g = h[m];
                     if (g.element === t) {
                        p = g;
                        break;
                     }
                  }
                  p && !p.allowOnlyTimelineStyles() && p.setStyles([a], null, d.errors, l);
               }
               return h.length ? h.map((p) => p.buildKeyframes()) : [dp(t, [], [], [], 0, f, "", !1)];
            }
            visitTrigger(e, t) {}
            visitState(e, t) {}
            visitTransition(e, t) {}
            visitAnimateChild(e, t) {
               const r = t.subInstructions.get(t.element);
               if (r) {
                  const i = t.createSubContext(e.options),
                     o = t.currentTimeline.currentTime,
                     s = this._visitSubInstructions(r, i, i.options);
                  o != s && t.transformIntoNewTimeline(s);
               }
               t.previousNode = e;
            }
            visitAnimateRef(e, t) {
               const r = t.createSubContext(e.options);
               r.transformIntoNewTimeline(),
                  this._applyAnimationRefDelays([e.options, e.animation.options], t, r),
                  this.visitReference(e.animation, r),
                  t.transformIntoNewTimeline(r.currentTimeline.currentTime),
                  (t.previousNode = e);
            }
            _applyAnimationRefDelays(e, t, r) {
               for (const i of e) {
                  const o = i?.delay;
                  if (o) {
                     const s = "number" == typeof o ? o : Kn(Js(o, i?.params ?? {}, t.errors));
                     r.delayNextStep(s);
                  }
               }
            }
            _visitSubInstructions(e, t, r) {
               let o = t.currentTimeline.currentTime;
               const s = null != r.duration ? Kn(r.duration) : null,
                  a = null != r.delay ? Kn(r.delay) : null;
               return (
                  0 !== s &&
                     e.forEach((l) => {
                        const c = t.appendInstructionToTimeline(l, s, a);
                        o = Math.max(o, c.duration + c.delay);
                     }),
                  o
               );
            }
            visitReference(e, t) {
               t.updateOptions(e.options, !0), Rt(this, e.animation, t), (t.previousNode = e);
            }
            visitSequence(e, t) {
               const r = t.subContextCount;
               let i = t;
               const o = e.options;
               if (o && (o.params || o.delay) && ((i = t.createSubContext(o)), i.transformIntoNewTimeline(), null != o.delay)) {
                  6 == i.previousNode.type && (i.currentTimeline.snapshotCurrentStyles(), (i.previousNode = Fc));
                  const s = Kn(o.delay);
                  i.delayNextStep(s);
               }
               e.steps.length &&
                  (e.steps.forEach((s) => Rt(this, s, i)), i.currentTimeline.applyStylesToKeyframe(), i.subContextCount > r && i.transformIntoNewTimeline()),
                  (t.previousNode = e);
            }
            visitGroup(e, t) {
               const r = [];
               let i = t.currentTimeline.currentTime;
               const o = e.options && e.options.delay ? Kn(e.options.delay) : 0;
               e.steps.forEach((s) => {
                  const a = t.createSubContext(e.options);
                  o && a.delayNextStep(o), Rt(this, s, a), (i = Math.max(i, a.currentTimeline.currentTime)), r.push(a.currentTimeline);
               }),
                  r.forEach((s) => t.currentTimeline.mergeTimelineCollectedStyles(s)),
                  t.transformIntoNewTimeline(i),
                  (t.previousNode = e);
            }
            _visitTiming(e, t) {
               if (e.dynamic) {
                  const r = e.strValue;
                  return Ec(t.params ? Js(r, t.params, t.errors) : r, t.errors);
               }
               return { duration: e.duration, delay: e.delay, easing: e.easing };
            }
            visitAnimate(e, t) {
               const r = (t.currentAnimateTimings = this._visitTiming(e.timings, t)),
                  i = t.currentTimeline;
               r.delay && (t.incrementTime(r.delay), i.snapshotCurrentStyles());
               const o = e.style;
               5 == o.type ? this.visitKeyframes(o, t) : (t.incrementTime(r.duration), this.visitStyle(o, t), i.applyStylesToKeyframe()),
                  (t.currentAnimateTimings = null),
                  (t.previousNode = e);
            }
            visitStyle(e, t) {
               const r = t.currentTimeline,
                  i = t.currentAnimateTimings;
               !i && r.hasCurrentStyleProperties() && r.forwardFrame();
               const o = (i && i.easing) || e.easing;
               e.isEmptyStep ? r.applyEmptyStep(o) : r.setStyles(e.styles, o, t.errors, t.options), (t.previousNode = e);
            }
            visitKeyframes(e, t) {
               const r = t.currentAnimateTimings,
                  i = t.currentTimeline.duration,
                  o = r.duration,
                  a = t.createSubContext().currentTimeline;
               (a.easing = r.easing),
                  e.styles.forEach((l) => {
                     a.forwardTime((l.offset || 0) * o), a.setStyles(l.styles, l.easing, t.errors, t.options), a.applyStylesToKeyframe();
                  }),
                  t.currentTimeline.mergeTimelineCollectedStyles(a),
                  t.transformIntoNewTimeline(i + o),
                  (t.previousNode = e);
            }
            visitQuery(e, t) {
               const r = t.currentTimeline.currentTime,
                  i = e.options || {},
                  o = i.delay ? Kn(i.delay) : 0;
               o &&
                  (6 === t.previousNode.type || (0 == r && t.currentTimeline.hasCurrentStyleProperties())) &&
                  (t.currentTimeline.snapshotCurrentStyles(), (t.previousNode = Fc));
               let s = r;
               const a = t.invokeQuery(e.selector, e.originalSelector, e.limit, e.includeSelf, !!i.optional, t.errors);
               t.currentQueryTotal = a.length;
               let l = null;
               a.forEach((c, u) => {
                  t.currentQueryIndex = u;
                  const d = t.createSubContext(e.options, c);
                  o && d.delayNextStep(o),
                     c === t.element && (l = d.currentTimeline),
                     Rt(this, e.animation, d),
                     d.currentTimeline.applyStylesToKeyframe(),
                     (s = Math.max(s, d.currentTimeline.currentTime));
               }),
                  (t.currentQueryIndex = 0),
                  (t.currentQueryTotal = 0),
                  t.transformIntoNewTimeline(s),
                  l && (t.currentTimeline.mergeTimelineCollectedStyles(l), t.currentTimeline.snapshotCurrentStyles()),
                  (t.previousNode = e);
            }
            visitStagger(e, t) {
               const r = t.parentContext,
                  i = t.currentTimeline,
                  o = e.timings,
                  s = Math.abs(o.duration),
                  a = s * (t.currentQueryTotal - 1);
               let l = s * t.currentQueryIndex;
               switch (o.duration < 0 ? "reverse" : o.easing) {
                  case "reverse":
                     l = a - l;
                     break;
                  case "full":
                     l = r.currentStaggerTime;
               }
               const u = t.currentTimeline;
               l && u.delayNextStep(l);
               const d = u.currentTime;
               Rt(this, e.animation, t), (t.previousNode = e), (r.currentStaggerTime = i.currentTime - d + (i.startTime - r.currentTimeline.startTime));
            }
         }
         const Fc = {};
         class hp {
            constructor(e, t, r, i, o, s, a, l) {
               (this._driver = e),
                  (this.element = t),
                  (this.subInstructions = r),
                  (this._enterClassName = i),
                  (this._leaveClassName = o),
                  (this.errors = s),
                  (this.timelines = a),
                  (this.parentContext = null),
                  (this.currentAnimateTimings = null),
                  (this.previousNode = Fc),
                  (this.subContextCount = 0),
                  (this.options = {}),
                  (this.currentQueryIndex = 0),
                  (this.currentQueryTotal = 0),
                  (this.currentStaggerTime = 0),
                  (this.currentTimeline = l || new Nc(this._driver, t, 0)),
                  a.push(this.currentTimeline);
            }
            get params() {
               return this.options.params;
            }
            updateOptions(e, t) {
               if (!e) return;
               const r = e;
               let i = this.options;
               null != r.duration && (i.duration = Kn(r.duration)), null != r.delay && (i.delay = Kn(r.delay));
               const o = r.params;
               if (o) {
                  let s = i.params;
                  s || (s = this.options.params = {}),
                     Object.keys(o).forEach((a) => {
                        (!t || !s.hasOwnProperty(a)) && (s[a] = Js(o[a], s, this.errors));
                     });
               }
            }
            _copyOptions() {
               const e = {};
               if (this.options) {
                  const t = this.options.params;
                  if (t) {
                     const r = (e.params = {});
                     Object.keys(t).forEach((i) => {
                        r[i] = t[i];
                     });
                  }
               }
               return e;
            }
            createSubContext(e = null, t, r) {
               const i = t || this.element,
                  o = new hp(
                     this._driver,
                     i,
                     this.subInstructions,
                     this._enterClassName,
                     this._leaveClassName,
                     this.errors,
                     this.timelines,
                     this.currentTimeline.fork(i, r || 0)
                  );
               return (
                  (o.previousNode = this.previousNode),
                  (o.currentAnimateTimings = this.currentAnimateTimings),
                  (o.options = this._copyOptions()),
                  o.updateOptions(e),
                  (o.currentQueryIndex = this.currentQueryIndex),
                  (o.currentQueryTotal = this.currentQueryTotal),
                  (o.parentContext = this),
                  this.subContextCount++,
                  o
               );
            }
            transformIntoNewTimeline(e) {
               return (
                  (this.previousNode = Fc),
                  (this.currentTimeline = this.currentTimeline.fork(this.element, e)),
                  this.timelines.push(this.currentTimeline),
                  this.currentTimeline
               );
            }
            appendInstructionToTimeline(e, t, r) {
               const i = { duration: t ?? e.duration, delay: this.currentTimeline.currentTime + (r ?? 0) + e.delay, easing: "" },
                  o = new OB(this._driver, e.element, e.keyframes, e.preStyleProps, e.postStyleProps, i, e.stretchStartingKeyframe);
               return this.timelines.push(o), i;
            }
            incrementTime(e) {
               this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
            }
            delayNextStep(e) {
               e > 0 && this.currentTimeline.delayNextStep(e);
            }
            invokeQuery(e, t, r, i, o, s) {
               let a = [];
               if ((i && a.push(this.element), e.length > 0)) {
                  e = (e = e.replace(TB, "." + this._enterClassName)).replace(FB, "." + this._leaveClassName);
                  let c = this._driver.query(this.element, e, 1 != r);
                  0 !== r && (c = r < 0 ? c.slice(c.length + r, c.length) : c.slice(0, r)), a.push(...c);
               }
               return (
                  !o &&
                     0 == a.length &&
                     s.push(
                        (function V3(n) {
                           return new _(3014, !1);
                        })()
                     ),
                  a
               );
            }
         }
         class Nc {
            constructor(e, t, r, i) {
               (this._driver = e),
                  (this.element = t),
                  (this.startTime = r),
                  (this._elementTimelineStylesLookup = i),
                  (this.duration = 0),
                  (this._previousKeyframe = new Map()),
                  (this._currentKeyframe = new Map()),
                  (this._keyframes = new Map()),
                  (this._styleSummary = new Map()),
                  (this._localTimelineStyles = new Map()),
                  (this._pendingStyles = new Map()),
                  (this._backFill = new Map()),
                  (this._currentEmptyStepKeyframe = null),
                  this._elementTimelineStylesLookup || (this._elementTimelineStylesLookup = new Map()),
                  (this._globalTimelineStyles = this._elementTimelineStylesLookup.get(t)),
                  this._globalTimelineStyles ||
                     ((this._globalTimelineStyles = this._localTimelineStyles), this._elementTimelineStylesLookup.set(t, this._localTimelineStyles)),
                  this._loadKeyframe();
            }
            containsAnimation() {
               switch (this._keyframes.size) {
                  case 0:
                     return !1;
                  case 1:
                     return this.hasCurrentStyleProperties();
                  default:
                     return !0;
               }
            }
            hasCurrentStyleProperties() {
               return this._currentKeyframe.size > 0;
            }
            get currentTime() {
               return this.startTime + this.duration;
            }
            delayNextStep(e) {
               const t = 1 === this._keyframes.size && this._pendingStyles.size;
               this.duration || t ? (this.forwardTime(this.currentTime + e), t && this.snapshotCurrentStyles()) : (this.startTime += e);
            }
            fork(e, t) {
               return this.applyStylesToKeyframe(), new Nc(this._driver, e, t || this.currentTime, this._elementTimelineStylesLookup);
            }
            _loadKeyframe() {
               this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe),
                  (this._currentKeyframe = this._keyframes.get(this.duration)),
                  this._currentKeyframe || ((this._currentKeyframe = new Map()), this._keyframes.set(this.duration, this._currentKeyframe));
            }
            forwardFrame() {
               (this.duration += 1), this._loadKeyframe();
            }
            forwardTime(e) {
               this.applyStylesToKeyframe(), (this.duration = e), this._loadKeyframe();
            }
            _updateStyle(e, t) {
               this._localTimelineStyles.set(e, t), this._globalTimelineStyles.set(e, t), this._styleSummary.set(e, { time: this.currentTime, value: t });
            }
            allowOnlyTimelineStyles() {
               return this._currentEmptyStepKeyframe !== this._currentKeyframe;
            }
            applyEmptyStep(e) {
               e && this._previousKeyframe.set("easing", e);
               for (let [t, r] of this._globalTimelineStyles) this._backFill.set(t, r || Wn), this._currentKeyframe.set(t, Wn);
               this._currentEmptyStepKeyframe = this._currentKeyframe;
            }
            setStyles(e, t, r, i) {
               t && this._previousKeyframe.set("easing", t);
               const o = (i && i.params) || {},
                  s = (function kB(n, e) {
                     const t = new Map();
                     let r;
                     return (
                        n.forEach((i) => {
                           if ("*" === i) {
                              r = r || e.keys();
                              for (let o of r) t.set(o, Wn);
                           } else mr(i, t);
                        }),
                        t
                     );
                  })(e, this._globalTimelineStyles);
               for (let [a, l] of s) {
                  const c = Js(l, o, r);
                  this._pendingStyles.set(a, c),
                     this._localTimelineStyles.has(a) || this._backFill.set(a, this._globalTimelineStyles.get(a) ?? Wn),
                     this._updateStyle(a, c);
               }
            }
            applyStylesToKeyframe() {
               0 != this._pendingStyles.size &&
                  (this._pendingStyles.forEach((e, t) => {
                     this._currentKeyframe.set(t, e);
                  }),
                  this._pendingStyles.clear(),
                  this._localTimelineStyles.forEach((e, t) => {
                     this._currentKeyframe.has(t) || this._currentKeyframe.set(t, e);
                  }));
            }
            snapshotCurrentStyles() {
               for (let [e, t] of this._localTimelineStyles) this._pendingStyles.set(e, t), this._updateStyle(e, t);
            }
            getFinalKeyframe() {
               return this._keyframes.get(this.duration);
            }
            get properties() {
               const e = [];
               for (let t in this._currentKeyframe) e.push(t);
               return e;
            }
            mergeTimelineCollectedStyles(e) {
               e._styleSummary.forEach((t, r) => {
                  const i = this._styleSummary.get(r);
                  (!i || t.time > i.time) && this._updateStyle(r, t.value);
               });
            }
            buildKeyframes() {
               this.applyStylesToKeyframe();
               const e = new Set(),
                  t = new Set(),
                  r = 1 === this._keyframes.size && 0 === this.duration;
               let i = [];
               this._keyframes.forEach((a, l) => {
                  const c = mr(a, new Map(), this._backFill);
                  c.forEach((u, d) => {
                     "!" === u ? e.add(d) : u === Wn && t.add(d);
                  }),
                     r || c.set("offset", l / this.duration),
                     i.push(c);
               });
               const o = e.size ? Mc(e.values()) : [],
                  s = t.size ? Mc(t.values()) : [];
               if (r) {
                  const a = i[0],
                     l = new Map(a);
                  a.set("offset", 0), l.set("offset", 1), (i = [a, l]);
               }
               return dp(this.element, i, o, s, this.duration, this.startTime, this.easing, !1);
            }
         }
         class OB extends Nc {
            constructor(e, t, r, i, o, s, a = !1) {
               super(e, t, s.delay),
                  (this.keyframes = r),
                  (this.preStyleProps = i),
                  (this.postStyleProps = o),
                  (this._stretchStartingKeyframe = a),
                  (this.timings = { duration: s.duration, delay: s.delay, easing: s.easing });
            }
            containsAnimation() {
               return this.keyframes.length > 1;
            }
            buildKeyframes() {
               let e = this.keyframes,
                  { delay: t, duration: r, easing: i } = this.timings;
               if (this._stretchStartingKeyframe && t) {
                  const o = [],
                     s = r + t,
                     a = t / s,
                     l = mr(e[0]);
                  l.set("offset", 0), o.push(l);
                  const c = mr(e[0]);
                  c.set("offset", iE(a)), o.push(c);
                  const u = e.length - 1;
                  for (let d = 1; d <= u; d++) {
                     let f = mr(e[d]);
                     const h = f.get("offset");
                     f.set("offset", iE((t + h * r) / s)), o.push(f);
                  }
                  (r = s), (t = 0), (i = ""), (e = o);
               }
               return dp(this.element, e, this.preStyleProps, this.postStyleProps, r, t, i, !0);
            }
         }
         function iE(n, e = 3) {
            const t = Math.pow(10, e - 1);
            return Math.round(n * t) / t;
         }
         class pp {}
         const PB = new Set([
            "width",
            "height",
            "minWidth",
            "minHeight",
            "maxWidth",
            "maxHeight",
            "left",
            "top",
            "bottom",
            "right",
            "fontSize",
            "outlineWidth",
            "outlineOffset",
            "paddingTop",
            "paddingLeft",
            "paddingBottom",
            "paddingRight",
            "marginTop",
            "marginLeft",
            "marginBottom",
            "marginRight",
            "borderRadius",
            "borderWidth",
            "borderTopWidth",
            "borderLeftWidth",
            "borderRightWidth",
            "borderBottomWidth",
            "textIndent",
            "perspective",
         ]);
         class LB extends pp {
            normalizePropertyName(e, t) {
               return lp(e);
            }
            normalizeStyleValue(e, t, r, i) {
               let o = "";
               const s = r.toString().trim();
               if (PB.has(t) && 0 !== r && "0" !== r)
                  if ("number" == typeof r) o = "px";
                  else {
                     const a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
                     a &&
                        0 == a[1].length &&
                        i.push(
                           (function S3(n, e) {
                              return new _(3005, !1);
                           })()
                        );
                  }
               return s + o;
            }
         }
         function oE(n, e, t, r, i, o, s, a, l, c, u, d, f) {
            return {
               type: 0,
               element: n,
               triggerName: e,
               isRemovalTransition: i,
               fromState: t,
               fromStyles: o,
               toState: r,
               toStyles: s,
               timelines: a,
               queriedElements: l,
               preStyleProps: c,
               postStyleProps: u,
               totalTime: d,
               errors: f,
            };
         }
         const mp = {};
         class sE {
            constructor(e, t, r) {
               (this._triggerName = e), (this.ast = t), (this._stateStyles = r);
            }
            match(e, t, r, i) {
               return (function VB(n, e, t, r, i) {
                  return n.some((o) => o(e, t, r, i));
               })(this.ast.matchers, e, t, r, i);
            }
            buildStyles(e, t, r) {
               let i = this._stateStyles.get("*");
               return void 0 !== e && (i = this._stateStyles.get(e?.toString()) || i), i ? i.buildStyles(t, r) : new Map();
            }
            build(e, t, r, i, o, s, a, l, c, u) {
               const d = [],
                  f = (this.ast.options && this.ast.options.params) || mp,
                  p = this.buildStyles(r, (a && a.params) || mp, d),
                  m = (l && l.params) || mp,
                  g = this.buildStyles(i, m, d),
                  v = new Set(),
                  E = new Map(),
                  y = new Map(),
                  T = "void" === i,
                  ne = { params: BB(m, f), delay: this.ast.options?.delay },
                  oe = u ? [] : fp(e, t, this.ast.animation, o, s, p, g, ne, c, d);
               let ot = 0;
               if (
                  (oe.forEach((Qn) => {
                     ot = Math.max(Qn.duration + Qn.delay, ot);
                  }),
                  d.length)
               )
                  return oE(t, this._triggerName, r, i, T, p, g, [], [], E, y, ot, d);
               oe.forEach((Qn) => {
                  const Yn = Qn.element,
                     DE = Tt(E, Yn, new Set());
                  Qn.preStyleProps.forEach((Jr) => DE.add(Jr));
                  const ta = Tt(y, Yn, new Set());
                  Qn.postStyleProps.forEach((Jr) => ta.add(Jr)), Yn !== t && v.add(Yn);
               });
               const Zn = Mc(v.values());
               return oE(t, this._triggerName, r, i, T, p, g, oe, Zn, E, y, ot);
            }
         }
         function BB(n, e) {
            const t = Ys(e);
            for (const r in n) n.hasOwnProperty(r) && null != n[r] && (t[r] = n[r]);
            return t;
         }
         class jB {
            constructor(e, t, r) {
               (this.styles = e), (this.defaultParams = t), (this.normalizer = r);
            }
            buildStyles(e, t) {
               const r = new Map(),
                  i = Ys(this.defaultParams);
               return (
                  Object.keys(e).forEach((o) => {
                     const s = e[o];
                     null !== s && (i[o] = s);
                  }),
                  this.styles.styles.forEach((o) => {
                     "string" != typeof o &&
                        o.forEach((s, a) => {
                           s && (s = Js(s, i, t));
                           const l = this.normalizer.normalizePropertyName(a, t);
                           (s = this.normalizer.normalizeStyleValue(a, l, s, t)), r.set(a, s);
                        });
                  }),
                  r
               );
            }
         }
         class HB {
            constructor(e, t, r) {
               (this.name = e),
                  (this.ast = t),
                  (this._normalizer = r),
                  (this.transitionFactories = []),
                  (this.states = new Map()),
                  t.states.forEach((i) => {
                     this.states.set(i.name, new jB(i.style, (i.options && i.options.params) || {}, r));
                  }),
                  aE(this.states, "true", "1"),
                  aE(this.states, "false", "0"),
                  t.transitions.forEach((i) => {
                     this.transitionFactories.push(new sE(e, i, this.states));
                  }),
                  (this.fallbackTransition = (function $B(n, e, t) {
                     return new sE(
                        n,
                        { type: 1, animation: { type: 2, steps: [], options: null }, matchers: [(s, a) => !0], options: null, queryCount: 0, depCount: 0 },
                        e
                     );
                  })(e, this.states));
            }
            get containsQueries() {
               return this.ast.queryCount > 0;
            }
            matchTransition(e, t, r, i) {
               return this.transitionFactories.find((s) => s.match(e, t, r, i)) || null;
            }
            matchStyles(e, t, r) {
               return this.fallbackTransition.buildStyles(e, t, r);
            }
         }
         function aE(n, e, t) {
            n.has(e) ? n.has(t) || n.set(t, n.get(e)) : n.has(t) && n.set(e, n.get(t));
         }
         const zB = new Rc();
         class GB {
            constructor(e, t, r) {
               (this.bodyNode = e),
                  (this._driver = t),
                  (this._normalizer = r),
                  (this._animations = new Map()),
                  (this._playersById = new Map()),
                  (this.players = []);
            }
            register(e, t) {
               const r = [],
                  o = cp(this._driver, t, r, []);
               if (r.length)
                  throw (function G3(n) {
                     return new _(3503, !1);
                  })();
               this._animations.set(e, o);
            }
            _buildPlayer(e, t, r) {
               const i = e.element,
                  o = BC(0, this._normalizer, 0, e.keyframes, t, r);
               return this._driver.animate(i, o, e.duration, e.delay, e.easing, [], !0);
            }
            create(e, t, r = {}) {
               const i = [],
                  o = this._animations.get(e);
               let s;
               const a = new Map();
               if (
                  (o
                     ? ((s = fp(this._driver, t, o, ip, Dc, new Map(), new Map(), r, zB, i)),
                       s.forEach((u) => {
                          const d = Tt(a, u.element, new Map());
                          u.postStyleProps.forEach((f) => d.set(f, null));
                       }))
                     : (i.push(
                          (function q3() {
                             return new _(3300, !1);
                          })()
                       ),
                       (s = [])),
                  i.length)
               )
                  throw (function W3(n) {
                     return new _(3504, !1);
                  })();
               a.forEach((u, d) => {
                  u.forEach((f, h) => {
                     u.set(h, this._driver.computeStyle(d, h, Wn));
                  });
               });
               const c = pr(
                  s.map((u) => {
                     const d = a.get(u.element);
                     return this._buildPlayer(u, new Map(), d);
                  })
               );
               return this._playersById.set(e, c), c.onDestroy(() => this.destroy(e)), this.players.push(c), c;
            }
            destroy(e) {
               const t = this._getPlayer(e);
               t.destroy(), this._playersById.delete(e);
               const r = this.players.indexOf(t);
               r >= 0 && this.players.splice(r, 1);
            }
            _getPlayer(e) {
               const t = this._playersById.get(e);
               if (!t)
                  throw (function K3(n) {
                     return new _(3301, !1);
                  })();
               return t;
            }
            listen(e, t, r, i) {
               const o = ep(t, "", "", "");
               return Xh(this._getPlayer(e), r, o, i), () => {};
            }
            command(e, t, r, i) {
               if ("register" == r) return void this.register(e, i[0]);
               if ("create" == r) return void this.create(e, t, i[0] || {});
               const o = this._getPlayer(e);
               switch (r) {
                  case "play":
                     o.play();
                     break;
                  case "pause":
                     o.pause();
                     break;
                  case "reset":
                     o.reset();
                     break;
                  case "restart":
                     o.restart();
                     break;
                  case "finish":
                     o.finish();
                     break;
                  case "init":
                     o.init();
                     break;
                  case "setPosition":
                     o.setPosition(parseFloat(i[0]));
                     break;
                  case "destroy":
                     this.destroy(e);
               }
            }
         }
         const lE = "ng-animate-queued",
            gp = "ng-animate-disabled",
            QB = [],
            cE = { namespaceId: "", setForRemoval: !1, setForMove: !1, hasAnimation: !1, removedBeforeQueried: !1 },
            YB = { namespaceId: "", setForMove: !1, setForRemoval: !1, hasAnimation: !1, removedBeforeQueried: !0 },
            zt = "__ng_removed";
         class yp {
            constructor(e, t = "") {
               this.namespaceId = t;
               const r = e && e.hasOwnProperty("value");
               if (
                  ((this.value = (function tj(n) {
                     return n ?? null;
                  })(r ? e.value : e)),
                  r)
               ) {
                  const o = Ys(e);
                  delete o.value, (this.options = o);
               } else this.options = {};
               this.options.params || (this.options.params = {});
            }
            get params() {
               return this.options.params;
            }
            absorbOptions(e) {
               const t = e.params;
               if (t) {
                  const r = this.options.params;
                  Object.keys(t).forEach((i) => {
                     null == r[i] && (r[i] = t[i]);
                  });
               }
            }
         }
         const ea = "void",
            _p = new yp(ea);
         class XB {
            constructor(e, t, r) {
               (this.id = e),
                  (this.hostElement = t),
                  (this._engine = r),
                  (this.players = []),
                  (this._triggers = new Map()),
                  (this._queue = []),
                  (this._elementListeners = new Map()),
                  (this._hostClassName = "ng-tns-" + e),
                  Gt(t, this._hostClassName);
            }
            listen(e, t, r, i) {
               if (!this._triggers.has(t))
                  throw (function Z3(n, e) {
                     return new _(3302, !1);
                  })();
               if (null == r || 0 == r.length)
                  throw (function Q3(n) {
                     return new _(3303, !1);
                  })();
               if (
                  !(function nj(n) {
                     return "start" == n || "done" == n;
                  })(r)
               )
                  throw (function Y3(n, e) {
                     return new _(3400, !1);
                  })();
               const o = Tt(this._elementListeners, e, []),
                  s = { name: t, phase: r, callback: i };
               o.push(s);
               const a = Tt(this._engine.statesByElement, e, new Map());
               return (
                  a.has(t) || (Gt(e, wc), Gt(e, wc + "-" + t), a.set(t, _p)),
                  () => {
                     this._engine.afterFlush(() => {
                        const l = o.indexOf(s);
                        l >= 0 && o.splice(l, 1), this._triggers.has(t) || a.delete(t);
                     });
                  }
               );
            }
            register(e, t) {
               return !this._triggers.has(e) && (this._triggers.set(e, t), !0);
            }
            _getTrigger(e) {
               const t = this._triggers.get(e);
               if (!t)
                  throw (function X3(n) {
                     return new _(3401, !1);
                  })();
               return t;
            }
            trigger(e, t, r, i = !0) {
               const o = this._getTrigger(t),
                  s = new vp(this.id, t, e);
               let a = this._engine.statesByElement.get(e);
               a || (Gt(e, wc), Gt(e, wc + "-" + t), this._engine.statesByElement.set(e, (a = new Map())));
               let l = a.get(t);
               const c = new yp(r, this.id);
               if ((!(r && r.hasOwnProperty("value")) && l && c.absorbOptions(l.options), a.set(t, c), l || (l = _p), c.value !== ea && l.value === c.value)) {
                  if (
                     !(function oj(n, e) {
                        const t = Object.keys(n),
                           r = Object.keys(e);
                        if (t.length != r.length) return !1;
                        for (let i = 0; i < t.length; i++) {
                           const o = t[i];
                           if (!e.hasOwnProperty(o) || n[o] !== e[o]) return !1;
                        }
                        return !0;
                     })(l.params, c.params)
                  ) {
                     const m = [],
                        g = o.matchStyles(l.value, l.params, m),
                        v = o.matchStyles(c.value, c.params, m);
                     m.length
                        ? this._engine.reportError(m)
                        : this._engine.afterFlush(() => {
                             Yr(e, g), Mn(e, v);
                          });
                  }
                  return;
               }
               const f = Tt(this._engine.playersByElement, e, []);
               f.forEach((m) => {
                  m.namespaceId == this.id && m.triggerName == t && m.queued && m.destroy();
               });
               let h = o.matchTransition(l.value, c.value, e, c.params),
                  p = !1;
               if (!h) {
                  if (!i) return;
                  (h = o.fallbackTransition), (p = !0);
               }
               return (
                  this._engine.totalQueuedPlayers++,
                  this._queue.push({ element: e, triggerName: t, transition: h, fromState: l, toState: c, player: s, isFallbackTransition: p }),
                  p ||
                     (Gt(e, lE),
                     s.onStart(() => {
                        uo(e, lE);
                     })),
                  s.onDone(() => {
                     let m = this.players.indexOf(s);
                     m >= 0 && this.players.splice(m, 1);
                     const g = this._engine.playersByElement.get(e);
                     if (g) {
                        let v = g.indexOf(s);
                        v >= 0 && g.splice(v, 1);
                     }
                  }),
                  this.players.push(s),
                  f.push(s),
                  s
               );
            }
            deregister(e) {
               this._triggers.delete(e),
                  this._engine.statesByElement.forEach((t) => t.delete(e)),
                  this._elementListeners.forEach((t, r) => {
                     this._elementListeners.set(
                        r,
                        t.filter((i) => i.name != e)
                     );
                  });
            }
            clearElementCache(e) {
               this._engine.statesByElement.delete(e), this._elementListeners.delete(e);
               const t = this._engine.playersByElement.get(e);
               t && (t.forEach((r) => r.destroy()), this._engine.playersByElement.delete(e));
            }
            _signalRemovalForInnerTriggers(e, t) {
               const r = this._engine.driver.query(e, Cc, !0);
               r.forEach((i) => {
                  if (i[zt]) return;
                  const o = this._engine.fetchNamespacesByElement(i);
                  o.size ? o.forEach((s) => s.triggerLeaveAnimation(i, t, !1, !0)) : this.clearElementCache(i);
               }),
                  this._engine.afterFlushAnimationsDone(() => r.forEach((i) => this.clearElementCache(i)));
            }
            triggerLeaveAnimation(e, t, r, i) {
               const o = this._engine.statesByElement.get(e),
                  s = new Map();
               if (o) {
                  const a = [];
                  if (
                     (o.forEach((l, c) => {
                        if ((s.set(c, l.value), this._triggers.has(c))) {
                           const u = this.trigger(e, c, ea, i);
                           u && a.push(u);
                        }
                     }),
                     a.length)
                  )
                     return this._engine.markElementAsRemoved(this.id, e, !0, t, s), r && pr(a).onDone(() => this._engine.processLeaveNode(e)), !0;
               }
               return !1;
            }
            prepareLeaveAnimationListeners(e) {
               const t = this._elementListeners.get(e),
                  r = this._engine.statesByElement.get(e);
               if (t && r) {
                  const i = new Set();
                  t.forEach((o) => {
                     const s = o.name;
                     if (i.has(s)) return;
                     i.add(s);
                     const l = this._triggers.get(s).fallbackTransition,
                        c = r.get(s) || _p,
                        u = new yp(ea),
                        d = new vp(this.id, s, e);
                     this._engine.totalQueuedPlayers++,
                        this._queue.push({ element: e, triggerName: s, transition: l, fromState: c, toState: u, player: d, isFallbackTransition: !0 });
                  });
               }
            }
            removeNode(e, t) {
               const r = this._engine;
               if ((e.childElementCount && this._signalRemovalForInnerTriggers(e, t), this.triggerLeaveAnimation(e, t, !0))) return;
               let i = !1;
               if (r.totalAnimations) {
                  const o = r.players.length ? r.playersByQueriedElement.get(e) : [];
                  if (o && o.length) i = !0;
                  else {
                     let s = e;
                     for (; (s = s.parentNode); )
                        if (r.statesByElement.get(s)) {
                           i = !0;
                           break;
                        }
                  }
               }
               if ((this.prepareLeaveAnimationListeners(e), i)) r.markElementAsRemoved(this.id, e, !1, t);
               else {
                  const o = e[zt];
                  (!o || o === cE) && (r.afterFlush(() => this.clearElementCache(e)), r.destroyInnerAnimations(e), r._onRemovalComplete(e, t));
               }
            }
            insertNode(e, t) {
               Gt(e, this._hostClassName);
            }
            drainQueuedTransitions(e) {
               const t = [];
               return (
                  this._queue.forEach((r) => {
                     const i = r.player;
                     if (i.destroyed) return;
                     const o = r.element,
                        s = this._elementListeners.get(o);
                     s &&
                        s.forEach((a) => {
                           if (a.name == r.triggerName) {
                              const l = ep(o, r.triggerName, r.fromState.value, r.toState.value);
                              (l._data = e), Xh(r.player, a.phase, l, a.callback);
                           }
                        }),
                        i.markedForDestroy
                           ? this._engine.afterFlush(() => {
                                i.destroy();
                             })
                           : t.push(r);
                  }),
                  (this._queue = []),
                  t.sort((r, i) => {
                     const o = r.transition.ast.depCount,
                        s = i.transition.ast.depCount;
                     return 0 == o || 0 == s ? o - s : this._engine.driver.containsElement(r.element, i.element) ? 1 : -1;
                  })
               );
            }
            destroy(e) {
               this.players.forEach((t) => t.destroy()), this._signalRemovalForInnerTriggers(this.hostElement, e);
            }
            elementContainsData(e) {
               let t = !1;
               return this._elementListeners.has(e) && (t = !0), (t = !!this._queue.find((r) => r.element === e) || t), t;
            }
         }
         class JB {
            constructor(e, t, r) {
               (this.bodyNode = e),
                  (this.driver = t),
                  (this._normalizer = r),
                  (this.players = []),
                  (this.newHostElements = new Map()),
                  (this.playersByElement = new Map()),
                  (this.playersByQueriedElement = new Map()),
                  (this.statesByElement = new Map()),
                  (this.disabledNodes = new Set()),
                  (this.totalAnimations = 0),
                  (this.totalQueuedPlayers = 0),
                  (this._namespaceLookup = {}),
                  (this._namespaceList = []),
                  (this._flushFns = []),
                  (this._whenQuietFns = []),
                  (this.namespacesByHostElement = new Map()),
                  (this.collectedEnterElements = []),
                  (this.collectedLeaveElements = []),
                  (this.onRemovalComplete = (i, o) => {});
            }
            _onRemovalComplete(e, t) {
               this.onRemovalComplete(e, t);
            }
            get queuedPlayers() {
               const e = [];
               return (
                  this._namespaceList.forEach((t) => {
                     t.players.forEach((r) => {
                        r.queued && e.push(r);
                     });
                  }),
                  e
               );
            }
            createNamespace(e, t) {
               const r = new XB(e, t, this);
               return (
                  this.bodyNode && this.driver.containsElement(this.bodyNode, t)
                     ? this._balanceNamespaceList(r, t)
                     : (this.newHostElements.set(t, r), this.collectEnterElement(t)),
                  (this._namespaceLookup[e] = r)
               );
            }
            _balanceNamespaceList(e, t) {
               const r = this._namespaceList,
                  i = this.namespacesByHostElement;
               if (r.length - 1 >= 0) {
                  let s = !1,
                     a = this.driver.getParentElement(t);
                  for (; a; ) {
                     const l = i.get(a);
                     if (l) {
                        const c = r.indexOf(l);
                        r.splice(c + 1, 0, e), (s = !0);
                        break;
                     }
                     a = this.driver.getParentElement(a);
                  }
                  s || r.unshift(e);
               } else r.push(e);
               return i.set(t, e), e;
            }
            register(e, t) {
               let r = this._namespaceLookup[e];
               return r || (r = this.createNamespace(e, t)), r;
            }
            registerTrigger(e, t, r) {
               let i = this._namespaceLookup[e];
               i && i.register(t, r) && this.totalAnimations++;
            }
            destroy(e, t) {
               if (!e) return;
               const r = this._fetchNamespace(e);
               this.afterFlush(() => {
                  this.namespacesByHostElement.delete(r.hostElement), delete this._namespaceLookup[e];
                  const i = this._namespaceList.indexOf(r);
                  i >= 0 && this._namespaceList.splice(i, 1);
               }),
                  this.afterFlushAnimationsDone(() => r.destroy(t));
            }
            _fetchNamespace(e) {
               return this._namespaceLookup[e];
            }
            fetchNamespacesByElement(e) {
               const t = new Set(),
                  r = this.statesByElement.get(e);
               if (r)
                  for (let i of r.values())
                     if (i.namespaceId) {
                        const o = this._fetchNamespace(i.namespaceId);
                        o && t.add(o);
                     }
               return t;
            }
            trigger(e, t, r, i) {
               if (Oc(t)) {
                  const o = this._fetchNamespace(e);
                  if (o) return o.trigger(t, r, i), !0;
               }
               return !1;
            }
            insertNode(e, t, r, i) {
               if (!Oc(t)) return;
               const o = t[zt];
               if (o && o.setForRemoval) {
                  (o.setForRemoval = !1), (o.setForMove = !0);
                  const s = this.collectedLeaveElements.indexOf(t);
                  s >= 0 && this.collectedLeaveElements.splice(s, 1);
               }
               if (e) {
                  const s = this._fetchNamespace(e);
                  s && s.insertNode(t, r);
               }
               i && this.collectEnterElement(t);
            }
            collectEnterElement(e) {
               this.collectedEnterElements.push(e);
            }
            markElementAsDisabled(e, t) {
               t ? this.disabledNodes.has(e) || (this.disabledNodes.add(e), Gt(e, gp)) : this.disabledNodes.has(e) && (this.disabledNodes.delete(e), uo(e, gp));
            }
            removeNode(e, t, r, i) {
               if (Oc(t)) {
                  const o = e ? this._fetchNamespace(e) : null;
                  if ((o ? o.removeNode(t, i) : this.markElementAsRemoved(e, t, !1, i), r)) {
                     const s = this.namespacesByHostElement.get(t);
                     s && s.id !== e && s.removeNode(t, i);
                  }
               } else this._onRemovalComplete(t, i);
            }
            markElementAsRemoved(e, t, r, i, o) {
               this.collectedLeaveElements.push(t),
                  (t[zt] = { namespaceId: e, setForRemoval: i, hasAnimation: r, removedBeforeQueried: !1, previousTriggersValues: o });
            }
            listen(e, t, r, i, o) {
               return Oc(t) ? this._fetchNamespace(e).listen(t, r, i, o) : () => {};
            }
            _buildInstruction(e, t, r, i, o) {
               return e.transition.build(this.driver, e.element, e.fromState.value, e.toState.value, r, i, e.fromState.options, e.toState.options, t, o);
            }
            destroyInnerAnimations(e) {
               let t = this.driver.query(e, Cc, !0);
               t.forEach((r) => this.destroyActiveAnimationsForElement(r)),
                  0 != this.playersByQueriedElement.size &&
                     ((t = this.driver.query(e, op, !0)), t.forEach((r) => this.finishActiveQueriedAnimationOnElement(r)));
            }
            destroyActiveAnimationsForElement(e) {
               const t = this.playersByElement.get(e);
               t &&
                  t.forEach((r) => {
                     r.queued ? (r.markedForDestroy = !0) : r.destroy();
                  });
            }
            finishActiveQueriedAnimationOnElement(e) {
               const t = this.playersByQueriedElement.get(e);
               t && t.forEach((r) => r.finish());
            }
            whenRenderingDone() {
               return new Promise((e) => {
                  if (this.players.length) return pr(this.players).onDone(() => e());
                  e();
               });
            }
            processLeaveNode(e) {
               const t = e[zt];
               if (t && t.setForRemoval) {
                  if (((e[zt] = cE), t.namespaceId)) {
                     this.destroyInnerAnimations(e);
                     const r = this._fetchNamespace(t.namespaceId);
                     r && r.clearElementCache(e);
                  }
                  this._onRemovalComplete(e, t.setForRemoval);
               }
               e.classList?.contains(gp) && this.markElementAsDisabled(e, !1),
                  this.driver.query(e, ".ng-animate-disabled", !0).forEach((r) => {
                     this.markElementAsDisabled(r, !1);
                  });
            }
            flush(e = -1) {
               let t = [];
               if (
                  (this.newHostElements.size && (this.newHostElements.forEach((r, i) => this._balanceNamespaceList(r, i)), this.newHostElements.clear()),
                  this.totalAnimations && this.collectedEnterElements.length)
               )
                  for (let r = 0; r < this.collectedEnterElements.length; r++) Gt(this.collectedEnterElements[r], "ng-star-inserted");
               if (this._namespaceList.length && (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
                  const r = [];
                  try {
                     t = this._flushAnimations(r, e);
                  } finally {
                     for (let i = 0; i < r.length; i++) r[i]();
                  }
               } else for (let r = 0; r < this.collectedLeaveElements.length; r++) this.processLeaveNode(this.collectedLeaveElements[r]);
               if (
                  ((this.totalQueuedPlayers = 0),
                  (this.collectedEnterElements.length = 0),
                  (this.collectedLeaveElements.length = 0),
                  this._flushFns.forEach((r) => r()),
                  (this._flushFns = []),
                  this._whenQuietFns.length)
               ) {
                  const r = this._whenQuietFns;
                  (this._whenQuietFns = []),
                     t.length
                        ? pr(t).onDone(() => {
                             r.forEach((i) => i());
                          })
                        : r.forEach((i) => i());
               }
            }
            reportError(e) {
               throw (function J3(n) {
                  return new _(3402, !1);
               })();
            }
            _flushAnimations(e, t) {
               const r = new Rc(),
                  i = [],
                  o = new Map(),
                  s = [],
                  a = new Map(),
                  l = new Map(),
                  c = new Map(),
                  u = new Set();
               this.disabledNodes.forEach((F) => {
                  u.add(F);
                  const k = this.driver.query(F, ".ng-animate-queued", !0);
                  for (let U = 0; U < k.length; U++) u.add(k[U]);
               });
               const d = this.bodyNode,
                  f = Array.from(this.statesByElement.keys()),
                  h = fE(f, this.collectedEnterElements),
                  p = new Map();
               let m = 0;
               h.forEach((F, k) => {
                  const U = ip + m++;
                  p.set(k, U), F.forEach((ie) => Gt(ie, U));
               });
               const g = [],
                  v = new Set(),
                  E = new Set();
               for (let F = 0; F < this.collectedLeaveElements.length; F++) {
                  const k = this.collectedLeaveElements[F],
                     U = k[zt];
                  U &&
                     U.setForRemoval &&
                     (g.push(k), v.add(k), U.hasAnimation ? this.driver.query(k, ".ng-star-inserted", !0).forEach((ie) => v.add(ie)) : E.add(k));
               }
               const y = new Map(),
                  T = fE(f, Array.from(v));
               T.forEach((F, k) => {
                  const U = Dc + m++;
                  y.set(k, U), F.forEach((ie) => Gt(ie, U));
               }),
                  e.push(() => {
                     h.forEach((F, k) => {
                        const U = p.get(k);
                        F.forEach((ie) => uo(ie, U));
                     }),
                        T.forEach((F, k) => {
                           const U = y.get(k);
                           F.forEach((ie) => uo(ie, U));
                        }),
                        g.forEach((F) => {
                           this.processLeaveNode(F);
                        });
                  });
               const ne = [],
                  oe = [];
               for (let F = this._namespaceList.length - 1; F >= 0; F--)
                  this._namespaceList[F].drainQueuedTransitions(t).forEach((U) => {
                     const ie = U.player,
                        Ge = U.element;
                     if ((ne.push(ie), this.collectedEnterElements.length)) {
                        const st = Ge[zt];
                        if (st && st.setForMove) {
                           if (st.previousTriggersValues && st.previousTriggersValues.has(U.triggerName)) {
                              const ei = st.previousTriggersValues.get(U.triggerName),
                                 qt = this.statesByElement.get(U.element);
                              if (qt && qt.has(U.triggerName)) {
                                 const Lc = qt.get(U.triggerName);
                                 (Lc.value = ei), qt.set(U.triggerName, Lc);
                              }
                           }
                           return void ie.destroy();
                        }
                     }
                     const xn = !d || !this.driver.containsElement(d, Ge),
                        Ft = y.get(Ge),
                        gr = p.get(Ge),
                        xe = this._buildInstruction(U, r, gr, Ft, xn);
                     if (xe.errors && xe.errors.length) return void oe.push(xe);
                     if (xn) return ie.onStart(() => Yr(Ge, xe.fromStyles)), ie.onDestroy(() => Mn(Ge, xe.toStyles)), void i.push(ie);
                     if (U.isFallbackTransition) return ie.onStart(() => Yr(Ge, xe.fromStyles)), ie.onDestroy(() => Mn(Ge, xe.toStyles)), void i.push(ie);
                     const EE = [];
                     xe.timelines.forEach((st) => {
                        (st.stretchStartingKeyframe = !0), this.disabledNodes.has(st.element) || EE.push(st);
                     }),
                        (xe.timelines = EE),
                        r.append(Ge, xe.timelines),
                        s.push({ instruction: xe, player: ie, element: Ge }),
                        xe.queriedElements.forEach((st) => Tt(a, st, []).push(ie)),
                        xe.preStyleProps.forEach((st, ei) => {
                           if (st.size) {
                              let qt = l.get(ei);
                              qt || l.set(ei, (qt = new Set())), st.forEach((Lc, wp) => qt.add(wp));
                           }
                        }),
                        xe.postStyleProps.forEach((st, ei) => {
                           let qt = c.get(ei);
                           qt || c.set(ei, (qt = new Set())), st.forEach((Lc, wp) => qt.add(wp));
                        });
                  });
               if (oe.length) {
                  const F = [];
                  oe.forEach((k) => {
                     F.push(
                        (function eB(n, e) {
                           return new _(3505, !1);
                        })()
                     );
                  }),
                     ne.forEach((k) => k.destroy()),
                     this.reportError(F);
               }
               const ot = new Map(),
                  Zn = new Map();
               s.forEach((F) => {
                  const k = F.element;
                  r.has(k) && (Zn.set(k, k), this._beforeAnimationBuild(F.player.namespaceId, F.instruction, ot));
               }),
                  i.forEach((F) => {
                     const k = F.element;
                     this._getPreviousPlayers(k, !1, F.namespaceId, F.triggerName, null).forEach((ie) => {
                        Tt(ot, k, []).push(ie), ie.destroy();
                     });
                  });
               const Qn = g.filter((F) => pE(F, l, c)),
                  Yn = new Map();
               dE(Yn, this.driver, E, c, Wn).forEach((F) => {
                  pE(F, l, c) && Qn.push(F);
               });
               const ta = new Map();
               h.forEach((F, k) => {
                  dE(ta, this.driver, new Set(F), l, "!");
               }),
                  Qn.forEach((F) => {
                     const k = Yn.get(F),
                        U = ta.get(F);
                     Yn.set(F, new Map([...Array.from(k?.entries() ?? []), ...Array.from(U?.entries() ?? [])]));
                  });
               const Jr = [],
                  wE = [],
                  CE = {};
               s.forEach((F) => {
                  const { element: k, player: U, instruction: ie } = F;
                  if (r.has(k)) {
                     if (u.has(k)) return U.onDestroy(() => Mn(k, ie.toStyles)), (U.disabled = !0), U.overrideTotalTime(ie.totalTime), void i.push(U);
                     let Ge = CE;
                     if (Zn.size > 1) {
                        let Ft = k;
                        const gr = [];
                        for (; (Ft = Ft.parentNode); ) {
                           const xe = Zn.get(Ft);
                           if (xe) {
                              Ge = xe;
                              break;
                           }
                           gr.push(Ft);
                        }
                        gr.forEach((xe) => Zn.set(xe, Ge));
                     }
                     const xn = this._buildAnimation(U.namespaceId, ie, ot, o, ta, Yn);
                     if ((U.setRealPlayer(xn), Ge === CE)) Jr.push(U);
                     else {
                        const Ft = this.playersByElement.get(Ge);
                        Ft && Ft.length && (U.parentPlayer = pr(Ft)), i.push(U);
                     }
                  } else Yr(k, ie.fromStyles), U.onDestroy(() => Mn(k, ie.toStyles)), wE.push(U), u.has(k) && i.push(U);
               }),
                  wE.forEach((F) => {
                     const k = o.get(F.element);
                     if (k && k.length) {
                        const U = pr(k);
                        F.setRealPlayer(U);
                     }
                  }),
                  i.forEach((F) => {
                     F.parentPlayer ? F.syncPlayerEvents(F.parentPlayer) : F.destroy();
                  });
               for (let F = 0; F < g.length; F++) {
                  const k = g[F],
                     U = k[zt];
                  if ((uo(k, Dc), U && U.hasAnimation)) continue;
                  let ie = [];
                  if (a.size) {
                     let xn = a.get(k);
                     xn && xn.length && ie.push(...xn);
                     let Ft = this.driver.query(k, op, !0);
                     for (let gr = 0; gr < Ft.length; gr++) {
                        let xe = a.get(Ft[gr]);
                        xe && xe.length && ie.push(...xe);
                     }
                  }
                  const Ge = ie.filter((xn) => !xn.destroyed);
                  Ge.length ? rj(this, k, Ge) : this.processLeaveNode(k);
               }
               return (
                  (g.length = 0),
                  Jr.forEach((F) => {
                     this.players.push(F),
                        F.onDone(() => {
                           F.destroy();
                           const k = this.players.indexOf(F);
                           this.players.splice(k, 1);
                        }),
                        F.play();
                  }),
                  Jr
               );
            }
            elementContainsData(e, t) {
               let r = !1;
               const i = t[zt];
               return (
                  i && i.setForRemoval && (r = !0),
                  this.playersByElement.has(t) && (r = !0),
                  this.playersByQueriedElement.has(t) && (r = !0),
                  this.statesByElement.has(t) && (r = !0),
                  this._fetchNamespace(e).elementContainsData(t) || r
               );
            }
            afterFlush(e) {
               this._flushFns.push(e);
            }
            afterFlushAnimationsDone(e) {
               this._whenQuietFns.push(e);
            }
            _getPreviousPlayers(e, t, r, i, o) {
               let s = [];
               if (t) {
                  const a = this.playersByQueriedElement.get(e);
                  a && (s = a);
               } else {
                  const a = this.playersByElement.get(e);
                  if (a) {
                     const l = !o || o == ea;
                     a.forEach((c) => {
                        c.queued || (!l && c.triggerName != i) || s.push(c);
                     });
                  }
               }
               return (r || i) && (s = s.filter((a) => !((r && r != a.namespaceId) || (i && i != a.triggerName)))), s;
            }
            _beforeAnimationBuild(e, t, r) {
               const o = t.element,
                  s = t.isRemovalTransition ? void 0 : e,
                  a = t.isRemovalTransition ? void 0 : t.triggerName;
               for (const l of t.timelines) {
                  const c = l.element,
                     u = c !== o,
                     d = Tt(r, c, []);
                  this._getPreviousPlayers(c, u, s, a, t.toState).forEach((h) => {
                     const p = h.getRealPlayer();
                     p.beforeDestroy && p.beforeDestroy(), h.destroy(), d.push(h);
                  });
               }
               Yr(o, t.fromStyles);
            }
            _buildAnimation(e, t, r, i, o, s) {
               const a = t.triggerName,
                  l = t.element,
                  c = [],
                  u = new Set(),
                  d = new Set(),
                  f = t.timelines.map((p) => {
                     const m = p.element;
                     u.add(m);
                     const g = m[zt];
                     if (g && g.removedBeforeQueried) return new Qs(p.duration, p.delay);
                     const v = m !== l,
                        E = (function ij(n) {
                           const e = [];
                           return hE(n, e), e;
                        })((r.get(m) || QB).map((ot) => ot.getRealPlayer())).filter((ot) => !!ot.element && ot.element === m),
                        y = o.get(m),
                        T = s.get(m),
                        ne = BC(0, this._normalizer, 0, p.keyframes, y, T),
                        oe = this._buildPlayer(p, ne, E);
                     if ((p.subTimeline && i && d.add(m), v)) {
                        const ot = new vp(e, a, m);
                        ot.setRealPlayer(oe), c.push(ot);
                     }
                     return oe;
                  });
               c.forEach((p) => {
                  Tt(this.playersByQueriedElement, p.element, []).push(p),
                     p.onDone(() =>
                        (function ej(n, e, t) {
                           let r = n.get(e);
                           if (r) {
                              if (r.length) {
                                 const i = r.indexOf(t);
                                 r.splice(i, 1);
                              }
                              0 == r.length && n.delete(e);
                           }
                           return r;
                        })(this.playersByQueriedElement, p.element, p)
                     );
               }),
                  u.forEach((p) => Gt(p, KC));
               const h = pr(f);
               return (
                  h.onDestroy(() => {
                     u.forEach((p) => uo(p, KC)), Mn(l, t.toStyles);
                  }),
                  d.forEach((p) => {
                     Tt(i, p, []).push(h);
                  }),
                  h
               );
            }
            _buildPlayer(e, t, r) {
               return t.length > 0 ? this.driver.animate(e.element, t, e.duration, e.delay, e.easing, r) : new Qs(e.duration, e.delay);
            }
         }
         class vp {
            constructor(e, t, r) {
               (this.namespaceId = e),
                  (this.triggerName = t),
                  (this.element = r),
                  (this._player = new Qs()),
                  (this._containsRealPlayer = !1),
                  (this._queuedCallbacks = new Map()),
                  (this.destroyed = !1),
                  (this.markedForDestroy = !1),
                  (this.disabled = !1),
                  (this.queued = !0),
                  (this.totalTime = 0);
            }
            setRealPlayer(e) {
               this._containsRealPlayer ||
                  ((this._player = e),
                  this._queuedCallbacks.forEach((t, r) => {
                     t.forEach((i) => Xh(e, r, void 0, i));
                  }),
                  this._queuedCallbacks.clear(),
                  (this._containsRealPlayer = !0),
                  this.overrideTotalTime(e.totalTime),
                  (this.queued = !1));
            }
            getRealPlayer() {
               return this._player;
            }
            overrideTotalTime(e) {
               this.totalTime = e;
            }
            syncPlayerEvents(e) {
               const t = this._player;
               t.triggerCallback && e.onStart(() => t.triggerCallback("start")), e.onDone(() => this.finish()), e.onDestroy(() => this.destroy());
            }
            _queueEvent(e, t) {
               Tt(this._queuedCallbacks, e, []).push(t);
            }
            onDone(e) {
               this.queued && this._queueEvent("done", e), this._player.onDone(e);
            }
            onStart(e) {
               this.queued && this._queueEvent("start", e), this._player.onStart(e);
            }
            onDestroy(e) {
               this.queued && this._queueEvent("destroy", e), this._player.onDestroy(e);
            }
            init() {
               this._player.init();
            }
            hasStarted() {
               return !this.queued && this._player.hasStarted();
            }
            play() {
               !this.queued && this._player.play();
            }
            pause() {
               !this.queued && this._player.pause();
            }
            restart() {
               !this.queued && this._player.restart();
            }
            finish() {
               this._player.finish();
            }
            destroy() {
               (this.destroyed = !0), this._player.destroy();
            }
            reset() {
               !this.queued && this._player.reset();
            }
            setPosition(e) {
               this.queued || this._player.setPosition(e);
            }
            getPosition() {
               return this.queued ? 0 : this._player.getPosition();
            }
            triggerCallback(e) {
               const t = this._player;
               t.triggerCallback && t.triggerCallback(e);
            }
         }
         function Oc(n) {
            return n && 1 === n.nodeType;
         }
         function uE(n, e) {
            const t = n.style.display;
            return (n.style.display = e ?? "none"), t;
         }
         function dE(n, e, t, r, i) {
            const o = [];
            t.forEach((l) => o.push(uE(l)));
            const s = [];
            r.forEach((l, c) => {
               const u = new Map();
               l.forEach((d) => {
                  const f = e.computeStyle(c, d, i);
                  u.set(d, f), (!f || 0 == f.length) && ((c[zt] = YB), s.push(c));
               }),
                  n.set(c, u);
            });
            let a = 0;
            return t.forEach((l) => uE(l, o[a++])), s;
         }
         function fE(n, e) {
            const t = new Map();
            if ((n.forEach((a) => t.set(a, [])), 0 == e.length)) return t;
            const i = new Set(e),
               o = new Map();
            function s(a) {
               if (!a) return 1;
               let l = o.get(a);
               if (l) return l;
               const c = a.parentNode;
               return (l = t.has(c) ? c : i.has(c) ? 1 : s(c)), o.set(a, l), l;
            }
            return (
               e.forEach((a) => {
                  const l = s(a);
                  1 !== l && t.get(l).push(a);
               }),
               t
            );
         }
         function Gt(n, e) {
            n.classList?.add(e);
         }
         function uo(n, e) {
            n.classList?.remove(e);
         }
         function rj(n, e, t) {
            pr(t).onDone(() => n.processLeaveNode(e));
         }
         function hE(n, e) {
            for (let t = 0; t < n.length; t++) {
               const r = n[t];
               r instanceof LC ? hE(r.players, e) : e.push(r);
            }
         }
         function pE(n, e, t) {
            const r = t.get(n);
            if (!r) return !1;
            let i = e.get(n);
            return i ? r.forEach((o) => i.add(o)) : e.set(n, r), t.delete(n), !0;
         }
         class kc {
            constructor(e, t, r) {
               (this.bodyNode = e),
                  (this._driver = t),
                  (this._normalizer = r),
                  (this._triggerCache = {}),
                  (this.onRemovalComplete = (i, o) => {}),
                  (this._transitionEngine = new JB(e, t, r)),
                  (this._timelineEngine = new GB(e, t, r)),
                  (this._transitionEngine.onRemovalComplete = (i, o) => this.onRemovalComplete(i, o));
            }
            registerTrigger(e, t, r, i, o) {
               const s = e + "-" + i;
               let a = this._triggerCache[s];
               if (!a) {
                  const l = [],
                     u = cp(this._driver, o, l, []);
                  if (l.length)
                     throw (function $3(n, e) {
                        return new _(3404, !1);
                     })();
                  (a = (function UB(n, e, t) {
                     return new HB(n, e, t);
                  })(i, u, this._normalizer)),
                     (this._triggerCache[s] = a);
               }
               this._transitionEngine.registerTrigger(t, i, a);
            }
            register(e, t) {
               this._transitionEngine.register(e, t);
            }
            destroy(e, t) {
               this._transitionEngine.destroy(e, t);
            }
            onInsert(e, t, r, i) {
               this._transitionEngine.insertNode(e, t, r, i);
            }
            onRemove(e, t, r, i) {
               this._transitionEngine.removeNode(e, t, i || !1, r);
            }
            disableAnimations(e, t) {
               this._transitionEngine.markElementAsDisabled(e, t);
            }
            process(e, t, r, i) {
               if ("@" == r.charAt(0)) {
                  const [o, s] = jC(r);
                  this._timelineEngine.command(o, t, s, i);
               } else this._transitionEngine.trigger(e, t, r, i);
            }
            listen(e, t, r, i, o) {
               if ("@" == r.charAt(0)) {
                  const [s, a] = jC(r);
                  return this._timelineEngine.listen(s, t, a, o);
               }
               return this._transitionEngine.listen(e, t, r, i, o);
            }
            flush(e = -1) {
               this._transitionEngine.flush(e);
            }
            get players() {
               return this._transitionEngine.players.concat(this._timelineEngine.players);
            }
            whenRenderingDone() {
               return this._transitionEngine.whenRenderingDone();
            }
         }
         let aj = (() => {
            class n {
               constructor(t, r, i) {
                  (this._element = t), (this._startStyles = r), (this._endStyles = i), (this._state = 0);
                  let o = n.initialStylesByElement.get(t);
                  o || n.initialStylesByElement.set(t, (o = new Map())), (this._initialStyles = o);
               }
               start() {
                  this._state < 1 && (this._startStyles && Mn(this._element, this._startStyles, this._initialStyles), (this._state = 1));
               }
               finish() {
                  this.start(),
                     this._state < 2 &&
                        (Mn(this._element, this._initialStyles),
                        this._endStyles && (Mn(this._element, this._endStyles), (this._endStyles = null)),
                        (this._state = 1));
               }
               destroy() {
                  this.finish(),
                     this._state < 3 &&
                        (n.initialStylesByElement.delete(this._element),
                        this._startStyles && (Yr(this._element, this._startStyles), (this._endStyles = null)),
                        this._endStyles && (Yr(this._element, this._endStyles), (this._endStyles = null)),
                        Mn(this._element, this._initialStyles),
                        (this._state = 3));
               }
            }
            return (n.initialStylesByElement = new WeakMap()), n;
         })();
         function bp(n) {
            let e = null;
            return (
               n.forEach((t, r) => {
                  (function lj(n) {
                     return "display" === n || "position" === n;
                  })(r) && ((e = e || new Map()), e.set(r, t));
               }),
               e
            );
         }
         class mE {
            constructor(e, t, r, i) {
               (this.element = e),
                  (this.keyframes = t),
                  (this.options = r),
                  (this._specialStyles = i),
                  (this._onDoneFns = []),
                  (this._onStartFns = []),
                  (this._onDestroyFns = []),
                  (this._initialized = !1),
                  (this._finished = !1),
                  (this._started = !1),
                  (this._destroyed = !1),
                  (this._originalOnDoneFns = []),
                  (this._originalOnStartFns = []),
                  (this.time = 0),
                  (this.parentPlayer = null),
                  (this.currentSnapshot = new Map()),
                  (this._duration = r.duration),
                  (this._delay = r.delay || 0),
                  (this.time = this._duration + this._delay);
            }
            _onFinish() {
               this._finished || ((this._finished = !0), this._onDoneFns.forEach((e) => e()), (this._onDoneFns = []));
            }
            init() {
               this._buildPlayer(), this._preparePlayerBeforeStart();
            }
            _buildPlayer() {
               if (this._initialized) return;
               this._initialized = !0;
               const e = this.keyframes;
               (this.domPlayer = this._triggerWebAnimation(this.element, e, this.options)),
                  (this._finalKeyframe = e.length ? e[e.length - 1] : new Map()),
                  this.domPlayer.addEventListener("finish", () => this._onFinish());
            }
            _preparePlayerBeforeStart() {
               this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
            }
            _convertKeyframesToObject(e) {
               const t = [];
               return (
                  e.forEach((r) => {
                     t.push(Object.fromEntries(r));
                  }),
                  t
               );
            }
            _triggerWebAnimation(e, t, r) {
               return e.animate(this._convertKeyframesToObject(t), r);
            }
            onStart(e) {
               this._originalOnStartFns.push(e), this._onStartFns.push(e);
            }
            onDone(e) {
               this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
            }
            onDestroy(e) {
               this._onDestroyFns.push(e);
            }
            play() {
               this._buildPlayer(),
                  this.hasStarted() ||
                     (this._onStartFns.forEach((e) => e()), (this._onStartFns = []), (this._started = !0), this._specialStyles && this._specialStyles.start()),
                  this.domPlayer.play();
            }
            pause() {
               this.init(), this.domPlayer.pause();
            }
            finish() {
               this.init(), this._specialStyles && this._specialStyles.finish(), this._onFinish(), this.domPlayer.finish();
            }
            reset() {
               this._resetDomPlayerState(),
                  (this._destroyed = !1),
                  (this._finished = !1),
                  (this._started = !1),
                  (this._onStartFns = this._originalOnStartFns),
                  (this._onDoneFns = this._originalOnDoneFns);
            }
            _resetDomPlayerState() {
               this.domPlayer && this.domPlayer.cancel();
            }
            restart() {
               this.reset(), this.play();
            }
            hasStarted() {
               return this._started;
            }
            destroy() {
               this._destroyed ||
                  ((this._destroyed = !0),
                  this._resetDomPlayerState(),
                  this._onFinish(),
                  this._specialStyles && this._specialStyles.destroy(),
                  this._onDestroyFns.forEach((e) => e()),
                  (this._onDestroyFns = []));
            }
            setPosition(e) {
               void 0 === this.domPlayer && this.init(), (this.domPlayer.currentTime = e * this.time);
            }
            getPosition() {
               return this.domPlayer.currentTime / this.time;
            }
            get totalTime() {
               return this._delay + this._duration;
            }
            beforeDestroy() {
               const e = new Map();
               this.hasStarted() &&
                  this._finalKeyframe.forEach((r, i) => {
                     "offset" !== i && e.set(i, this._finished ? r : eE(this.element, i));
                  }),
                  (this.currentSnapshot = e);
            }
            triggerCallback(e) {
               const t = "start" === e ? this._onStartFns : this._onDoneFns;
               t.forEach((r) => r()), (t.length = 0);
            }
         }
         class cj {
            validateStyleProperty(e) {
               return !0;
            }
            validateAnimatableStyleProperty(e) {
               return !0;
            }
            matchesElement(e, t) {
               return !1;
            }
            containsElement(e, t) {
               return zC(e, t);
            }
            getParentElement(e) {
               return np(e);
            }
            query(e, t, r) {
               return GC(e, t, r);
            }
            computeStyle(e, t, r) {
               return window.getComputedStyle(e)[t];
            }
            animate(e, t, r, i, o, s = []) {
               const l = { duration: r, delay: i, fill: 0 == i ? "both" : "forwards" };
               o && (l.easing = o);
               const c = new Map(),
                  u = s.filter((h) => h instanceof mE);
               (function hB(n, e) {
                  return 0 === n || 0 === e;
               })(r, i) &&
                  u.forEach((h) => {
                     h.currentSnapshot.forEach((p, m) => c.set(m, p));
                  });
               let d = (function cB(n) {
                  return n.length ? (n[0] instanceof Map ? n : n.map((e) => ZC(e))) : [];
               })(t).map((h) => mr(h));
               d = (function pB(n, e, t) {
                  if (t.size && e.length) {
                     let r = e[0],
                        i = [];
                     if (
                        (t.forEach((o, s) => {
                           r.has(s) || i.push(s), r.set(s, o);
                        }),
                        i.length)
                     )
                        for (let o = 1; o < e.length; o++) {
                           let s = e[o];
                           i.forEach((a) => s.set(a, eE(n, a)));
                        }
                  }
                  return e;
               })(e, d, c);
               const f = (function sj(n, e) {
                  let t = null,
                     r = null;
                  return (
                     Array.isArray(e) && e.length ? ((t = bp(e[0])), e.length > 1 && (r = bp(e[e.length - 1]))) : e instanceof Map && (t = bp(e)),
                     t || r ? new aj(n, t, r) : null
                  );
               })(e, d);
               return new mE(e, d, l, f);
            }
         }
         let uj = (() => {
            class n extends NC {
               constructor(t, r) {
                  super(),
                     (this._nextAnimationId = 0),
                     (this._renderer = t.createRenderer(r.body, { id: "0", encapsulation: Kt.None, styles: [], data: { animation: [] } }));
               }
               build(t) {
                  const r = this._nextAnimationId.toString();
                  this._nextAnimationId++;
                  const i = Array.isArray(t) ? OC(t) : t;
                  return gE(this._renderer, null, r, "register", [i]), new dj(r, this._renderer);
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)(M(Vo), M(De));
               }),
               (n.ɵprov = N({ token: n, factory: n.ɵfac })),
               n
            );
         })();
         class dj extends D3 {
            constructor(e, t) {
               super(), (this._id = e), (this._renderer = t);
            }
            create(e, t) {
               return new fj(this._id, e, t || {}, this._renderer);
            }
         }
         class fj {
            constructor(e, t, r, i) {
               (this.id = e),
                  (this.element = t),
                  (this._renderer = i),
                  (this.parentPlayer = null),
                  (this._started = !1),
                  (this.totalTime = 0),
                  this._command("create", r);
            }
            _listen(e, t) {
               return this._renderer.listen(this.element, `@@${this.id}:${e}`, t);
            }
            _command(e, ...t) {
               return gE(this._renderer, this.element, this.id, e, t);
            }
            onDone(e) {
               this._listen("done", e);
            }
            onStart(e) {
               this._listen("start", e);
            }
            onDestroy(e) {
               this._listen("destroy", e);
            }
            init() {
               this._command("init");
            }
            hasStarted() {
               return this._started;
            }
            play() {
               this._command("play"), (this._started = !0);
            }
            pause() {
               this._command("pause");
            }
            restart() {
               this._command("restart");
            }
            finish() {
               this._command("finish");
            }
            destroy() {
               this._command("destroy");
            }
            reset() {
               this._command("reset"), (this._started = !1);
            }
            setPosition(e) {
               this._command("setPosition", e);
            }
            getPosition() {
               return this._renderer.engine.players[+this.id]?.getPosition() ?? 0;
            }
         }
         function gE(n, e, t, r, i) {
            return n.setProperty(e, `@@${t}:${r}`, i);
         }
         const yE = "@.disabled";
         let hj = (() => {
            class n {
               constructor(t, r, i) {
                  (this.delegate = t),
                     (this.engine = r),
                     (this._zone = i),
                     (this._currentId = 0),
                     (this._microtaskId = 1),
                     (this._animationCallbacksBuffer = []),
                     (this._rendererCache = new Map()),
                     (this._cdRecurDepth = 0),
                     (this.promise = Promise.resolve(0)),
                     (r.onRemovalComplete = (o, s) => {
                        const a = s?.parentNode(o);
                        a && s.removeChild(a, o);
                     });
               }
               createRenderer(t, r) {
                  const o = this.delegate.createRenderer(t, r);
                  if (!(t && r && r.data && r.data.animation)) {
                     let u = this._rendererCache.get(o);
                     return u || ((u = new _E("", o, this.engine, () => this._rendererCache.delete(o))), this._rendererCache.set(o, u)), u;
                  }
                  const s = r.id,
                     a = r.id + "-" + this._currentId;
                  this._currentId++, this.engine.register(a, t);
                  const l = (u) => {
                     Array.isArray(u) ? u.forEach(l) : this.engine.registerTrigger(s, a, t, u.name, u);
                  };
                  return r.data.animation.forEach(l), new pj(this, a, o, this.engine);
               }
               begin() {
                  this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
               }
               _scheduleCountTask() {
                  this.promise.then(() => {
                     this._microtaskId++;
                  });
               }
               scheduleListenerCallback(t, r, i) {
                  t >= 0 && t < this._microtaskId
                     ? this._zone.run(() => r(i))
                     : (0 == this._animationCallbacksBuffer.length &&
                          Promise.resolve(null).then(() => {
                             this._zone.run(() => {
                                this._animationCallbacksBuffer.forEach((o) => {
                                   const [s, a] = o;
                                   s(a);
                                }),
                                   (this._animationCallbacksBuffer = []);
                             });
                          }),
                       this._animationCallbacksBuffer.push([r, i]));
               }
               end() {
                  this._cdRecurDepth--,
                     0 == this._cdRecurDepth &&
                        this._zone.runOutsideAngular(() => {
                           this._scheduleCountTask(), this.engine.flush(this._microtaskId);
                        }),
                     this.delegate.end && this.delegate.end();
               }
               whenRenderingDone() {
                  return this.engine.whenRenderingDone();
               }
            }
            return (
               (n.ɵfac = function (t) {
                  return new (t || n)(M(Vo), M(kc), M(Ee));
               }),
               (n.ɵprov = N({ token: n, factory: n.ɵfac })),
               n
            );
         })();
         class _E {
            constructor(e, t, r, i) {
               (this.namespaceId = e),
                  (this.delegate = t),
                  (this.engine = r),
                  (this._onDestroy = i),
                  (this.destroyNode = this.delegate.destroyNode ? (o) => t.destroyNode(o) : null);
            }
            get data() {
               return this.delegate.data;
            }
            destroy() {
               this.engine.destroy(this.namespaceId, this.delegate), this.delegate.destroy(), this._onDestroy?.();
            }
            createElement(e, t) {
               return this.delegate.createElement(e, t);
            }
            createComment(e) {
               return this.delegate.createComment(e);
            }
            createText(e) {
               return this.delegate.createText(e);
            }
            appendChild(e, t) {
               this.delegate.appendChild(e, t), this.engine.onInsert(this.namespaceId, t, e, !1);
            }
            insertBefore(e, t, r, i = !0) {
               this.delegate.insertBefore(e, t, r), this.engine.onInsert(this.namespaceId, t, e, i);
            }
            removeChild(e, t, r) {
               this.engine.onRemove(this.namespaceId, t, this.delegate, r);
            }
            selectRootElement(e, t) {
               return this.delegate.selectRootElement(e, t);
            }
            parentNode(e) {
               return this.delegate.parentNode(e);
            }
            nextSibling(e) {
               return this.delegate.nextSibling(e);
            }
            setAttribute(e, t, r, i) {
               this.delegate.setAttribute(e, t, r, i);
            }
            removeAttribute(e, t, r) {
               this.delegate.removeAttribute(e, t, r);
            }
            addClass(e, t) {
               this.delegate.addClass(e, t);
            }
            removeClass(e, t) {
               this.delegate.removeClass(e, t);
            }
            setStyle(e, t, r, i) {
               this.delegate.setStyle(e, t, r, i);
            }
            removeStyle(e, t, r) {
               this.delegate.removeStyle(e, t, r);
            }
            setProperty(e, t, r) {
               "@" == t.charAt(0) && t == yE ? this.disableAnimations(e, !!r) : this.delegate.setProperty(e, t, r);
            }
            setValue(e, t) {
               this.delegate.setValue(e, t);
            }
            listen(e, t, r) {
               return this.delegate.listen(e, t, r);
            }
            disableAnimations(e, t) {
               this.engine.disableAnimations(e, t);
            }
         }
         class pj extends _E {
            constructor(e, t, r, i, o) {
               super(t, r, i, o), (this.factory = e), (this.namespaceId = t);
            }
            setProperty(e, t, r) {
               "@" == t.charAt(0)
                  ? "." == t.charAt(1) && t == yE
                     ? this.disableAnimations(e, (r = void 0 === r || !!r))
                     : this.engine.process(this.namespaceId, e, t.slice(1), r)
                  : this.delegate.setProperty(e, t, r);
            }
            listen(e, t, r) {
               if ("@" == t.charAt(0)) {
                  const i = (function mj(n) {
                     switch (n) {
                        case "body":
                           return document.body;
                        case "document":
                           return document;
                        case "window":
                           return window;
                        default:
                           return n;
                     }
                  })(e);
                  let o = t.slice(1),
                     s = "";
                  return (
                     "@" != o.charAt(0) &&
                        ([o, s] = (function gj(n) {
                           const e = n.indexOf(".");
                           return [n.substring(0, e), n.slice(e + 1)];
                        })(o)),
                     this.engine.listen(this.namespaceId, i, o, s, (a) => {
                        this.factory.scheduleListenerCallback(a._data || -1, r, a);
                     })
                  );
               }
               return this.delegate.listen(e, t, r);
            }
         }
         const vE = [
               { provide: NC, useClass: uj },
               {
                  provide: pp,
                  useFactory: function _j() {
                     return new LB();
                  },
               },
               {
                  provide: kc,
                  useClass: (() => {
                     class n extends kc {
                        constructor(t, r, i, o) {
                           super(t.body, r, i);
                        }
                        ngOnDestroy() {
                           this.flush();
                        }
                     }
                     return (
                        (n.ɵfac = function (t) {
                           return new (t || n)(M(De), M(rp), M(pp), M(rs));
                        }),
                        (n.ɵprov = N({ token: n, factory: n.ɵfac })),
                        n
                     );
                  })(),
               },
               {
                  provide: Vo,
                  useFactory: function vj(n, e, t) {
                     return new hj(n, e, t);
                  },
                  deps: [Ol, kc, Ee],
               },
            ],
            Dp = [{ provide: rp, useFactory: () => new cj() }, { provide: ib, useValue: "BrowserAnimations" }, ...vE],
            bE = [{ provide: rp, useClass: qC }, { provide: ib, useValue: "NoopAnimations" }, ...vE];
         let bj = (() => {
               class n {
                  static withConfig(t) {
                     return { ngModule: n, providers: t.disableAnimations ? bE : Dp };
                  }
               }
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)();
                  }),
                  (n.ɵmod = We({ type: n })),
                  (n.ɵinj = ze({ providers: Dp, imports: [D0] })),
                  n
               );
            })(),
            Cj = (() => {
               class n {}
               return (
                  (n.ɵfac = function (t) {
                     return new (t || n)();
                  }),
                  (n.ɵmod = We({ type: n })),
                  (n.ɵinj = ze({ imports: [Wi, oP, Wi] })),
                  n
               );
            })();
         class fo {}
         (fo.ɵfac = function (e) {
            return new (e || fo)();
         }),
            (fo.ɵmod = We({ type: fo, bootstrap: [Zs] })),
            (fo.ɵinj = ze({ imports: [D0, ao, bj, RP, Cj, u3, d3] })),
            JO()
               .bootstrapModule(fo)
               .catch((n) => console.error(n));
      },
   },
   (pe) => {
      pe((pe.s = 883));
   },
]);
