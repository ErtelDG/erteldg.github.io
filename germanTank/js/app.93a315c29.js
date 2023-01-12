(function () {
   "use strict";
   var e = {
         532: function (e, n, a) {
            a(312);
            var r = a(963),
               t = a(252);
            function l(e, n, a, r, l, i) {
               const d = (0, t.up)("NavbarAppVue"),
                  s = (0, t.up)("router-view");
               return (0, t.wg)(), (0, t.iD)(t.HY, null, [(0, t.Wm)(d), (0, t.Wm)(s)], 64);
            }
            var i = a(577),
               d = a.p + "img/Military_Symbol_Armoured_Reconnaissance.903c0d38.svg",
               s = a.p + "img/Military_Symbol_Armour_Heavy_NATO.0a114bca.svg",
               o = a.p + "img/Military_Symbol_Nato_Tank_Destroyers.e7506af1.svg";
            const c = { class: "TankCardCategory" },
               u = { class: "row" },
               g = { class: "navbar d-flex justify-content-around d-print border border-secondary" },
               m = (0, t._)("img", { src: d, width: "200", height: "120", class: "d-inline-block align-top", alt: "" }, null, -1),
               h = (0, t._)("div", null, "Aufklärungspanzer", -1),
               _ = (0, t._)("img", { src: s, width: "200", height: "120", class: "d-inline-block align-top", alt: "" }, null, -1),
               w = (0, t._)("div", null, "Schwere Kampfpanzer", -1),
               p = (0, t._)("img", { src: o, width: "200", height: "120", class: "d-inline-block align-top", alt: "" }, null, -1),
               z = (0, t._)("div", null, "Jagdpanzer", -1);
            function b(e, n, a, r, l, d) {
               const s = (0, t.up)("router-link");
               return (
                  (0, t.wg)(),
                  (0, t.iD)("div", c, [
                     (0, t._)("div", u, [(0, t._)("h1", null, (0, i.zw)(l.head), 1)]),
                     (0, t._)("nav", g, [
                        (0, t.Wm)(
                           s,
                           { to: "/germanTank/componentGermanTankRecon/mainTankCategory/MainGermanReconTank" },
                           { default: (0, t.w5)(() => [m, h]), _: 1 }
                        ),
                        (0, t.Wm)(
                           s,
                           { to: "/germanTank/componentMainBattleTank/mainTankCategory/MainGermanBattleTankCategory" },
                           { default: (0, t.w5)(() => [_, w]), _: 1 }
                        ),
                        (0, t.Wm)(
                           s,
                           { to: "/germanTank/componentGermanTankDestroyer/mainTankCategory/MainGermanDestroyerTank" },
                           { default: (0, t.w5)(() => [p, z]), _: 1 }
                        ),
                     ]),
                  ])
               );
            }
            var k = {
                  name: "NavbarAppVue",
                  components: {},
                  data() {
                     return { head: "Bundesrepublik Deutschland Panzermodelle nach 1945" };
                  },
               },
               f = a(744);
            const v = (0, f.Z)(k, [["render", b]]);
            var y = v,
               T = { name: "app", components: { NavbarAppVue: y } };
            const I = (0, f.Z)(T, [["render", l]]);
            var S = I,
               B = a(201);
            const D = { class: "cardTank" },
               K = { class: "container-fluid", style: { height: "100%" } },
               L = { class: "row border border-secondary" },
               P = { class: "row" },
               A = { class: "col border border-secondary" },
               H = ["src"],
               G = { class: "col-7 border border-secondary row align-items-center" },
               J = { class: "row" },
               R = { class: "col-4 border border-secondary" },
               M = { class: "table table-striped" },
               F = { class: "col-4 border border-secondary" },
               x = { class: "table table-striped" },
               E = { class: "col-4 border border-secondary" },
               C = { class: "table table-striped" },
               W = { class: "row border border-secondary" };
            function V(e, n, a, r, l, d) {
               return (
                  (0, t.wg)(),
                  (0, t.iD)("div", D, [
                     (0, t._)("div", K, [
                        (0, t._)("div", L, [(0, t._)("h1", null, (0, i.zw)(l.Fennek.name), 1)]),
                        (0, t._)("div", P, [
                           (0, t._)("div", A, [(0, t._)("img", { class: "img-fluid", src: l.Fennek.img }, null, 8, H)]),
                           (0, t._)("div", G, [(0, t._)("h4", null, (0, i.zw)(l.Fennek.description), 1)]),
                        ]),
                        (0, t._)("div", J, [
                           (0, t._)("div", R, [
                              (0, t._)("h2", null, (0, i.zw)(l.Fennek.technical_I), 1),
                              (0, t._)("table", M, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Fennek.AllgemeineEigenschaften,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", F, [
                              (0, t._)("h2", null, (0, i.zw)(l.Fennek.technical_II), 1),
                              (0, t._)("table", x, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Fennek.PanzerungundBewaffnung,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", E, [
                              (0, t._)("h2", null, (0, i.zw)(l.Fennek.technical_III), 1),
                              (0, t._)("table", C, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Fennek.Beweglichkeit,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                        ]),
                        (0, t._)("div", W, [(0, t._)("p", null, (0, i.zw)(l.Fennek.quelleImg) + ", " + (0, i.zw)(l.Fennek.quelleText), 1)]),
                     ]),
                  ])
               );
            }
            var j = {
               data() {
                  return {
                     Fennek: {
                        name: "Spähwagen Fennek",
                        img: a(97),
                        description:
                           "Der Fennek (benannt nach dem gleichnamigen Wüstenfuchs) ist ein leichter 4-Rad-Panzerspähwagen, der seit 2003 bei der Bundeswehr (220 Fahrzeuge)[1] und der niederländischen Armee (368 Fahrzeuge) eingesetzt wird. Der Nachfolger des Spähpanzers Luchs ist das Hauptwaffensystem der Heeresaufklärungstruppe. ",
                        technical_I: "AllgemeineEigenschaften",
                        AllgemeineEigenschaften: {
                           Besatzung: "3 (Kommandant, Fahrer, Systembediener) ",
                           Laenge: "5,58 m",
                           Breite: "2,55 m",
                           Hoehe: "1,79 m Dachoberkante",
                           Masse: "10,3 t (Gesamtgewicht)",
                        },
                        technical_II: "Panzerung und Bewaffnung",
                        PanzerungundBewaffnung: {
                           Panzerung: " \tSTANAG 4569 Level-3-Verbundpanzerung ",
                           Hauptbewaffnung: " \tGranatmaschinenwaffe 40 × 53 mm oder 7,62 × 51 mm MG3 oder 12,7 × 99 mm MG50-1",
                           Sekundärbewaffnung: "keine",
                        },
                        technical_III: "Beweglichkeit",
                        Beweglichkeit: {
                           Antrieb: "Deutz BF6M 2013C 177 kW (240 PS) ",
                           Federung: "Drehstabfederung",
                           Geschwindigkeit: "120 km/h vorwärts, 23 km/h rückwärts",
                           LeistungGewicht: "16,5 kW/t ",
                           Reichweite: "1000 km Straße 460 km Gelände ",
                        },
                        quelleImg:
                           "Quelle Image: Alf van Beem (https://commons.wikimedia.org/wiki/File:Fennek_Verkenningsvoertuig,_Nationaal_Militair_Museum,_Soesterberg.JPG), „Fennek Verkenningsvoertuig, Nationaal Militair Museum, Soesterberg“, https://creativecommons.org/publicdomain/zero/1.0/legalcode ",
                        quelleText: "Quelle Text: https://de.wikipedia.org/wiki/Sp%C3%A4hwagen_Fennek",
                     },
                  };
               },
            };
            const q = (0, f.Z)(j, [
               ["render", V],
               ["__scopeId", "data-v-103b855e"],
            ]);
            var Y = q;
            const Z = { class: "cardTank" },
               N = { class: "container-fluid", style: { height: "100%" } },
               O = { class: "row border border-secondary" },
               Q = { class: "row" },
               U = { class: "col border border-secondary" },
               X = ["src"],
               $ = { class: "col-7 border border-secondary row align-items-center" },
               ee = { class: "row" },
               ne = { class: "col-4 border border-secondary" },
               ae = { class: "table table-striped" },
               re = { class: "col-4 border border-secondary" },
               te = { class: "table table-striped" },
               le = { class: "col-4 border border-secondary" },
               ie = { class: "table table-striped" },
               de = { class: "row border border-secondary" };
            function se(e, n, a, r, l, d) {
               return (
                  (0, t.wg)(),
                  (0, t.iD)("div", Z, [
                     (0, t._)("div", N, [
                        (0, t._)("div", O, [(0, t._)("h1", null, (0, i.zw)(l.Luchs.name), 1)]),
                        (0, t._)("div", Q, [
                           (0, t._)("div", U, [(0, t._)("img", { class: "img-fluid", src: l.Luchs.img }, null, 8, X)]),
                           (0, t._)("div", $, [(0, t._)("h4", null, (0, i.zw)(l.Luchs.description), 1)]),
                        ]),
                        (0, t._)("div", ee, [
                           (0, t._)("div", ne, [
                              (0, t._)("h2", null, (0, i.zw)(l.Luchs.technical_I), 1),
                              (0, t._)("table", ae, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Luchs.AllgemeineEigenschaften,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", re, [
                              (0, t._)("h2", null, (0, i.zw)(l.Luchs.technical_II), 1),
                              (0, t._)("table", te, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Luchs.PanzerungundBewaffnung,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", le, [
                              (0, t._)("h2", null, (0, i.zw)(l.Luchs.technical_III), 1),
                              (0, t._)("table", ie, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Luchs.Beweglichkeit,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                        ]),
                        (0, t._)("div", de, [(0, t._)("p", null, (0, i.zw)(l.Luchs.quelleImg) + ", " + (0, i.zw)(l.Luchs.quelleText), 1)]),
                     ]),
                  ])
               );
            }
            var oe = {
               data() {
                  return {
                     Luchs: {
                        name: "Luchs (Spähpanzer)",
                        img: a(371),
                        description:
                           "Der Spähpanzer Luchs der Bundeswehr ist ein Radpanzer, der vorwiegend in den Panzeraufklärungsbataillonen der Divisionen eingesetzt wurde. Er basiert auf dem Konzept der Panzerspähwagen Sd.Kfz. 234 und dessen Vorgänger, dem Panzerspähwagen Sd.Kfz. 231, von dem er die 8-Rad-Lenkung und als zusätzliches Besatzungsmitglied den Rückwärtsfahrer beibehalten hat. Zusätzlich ist der Luchs schwimmfähig (er wird bei Wasserfahrt durch zwei im Heck befindliche Ruderpropeller angetrieben), kaum hörbar und mit beschussfesten Reifen ausgestattet. Auch das Besatzungsmodell ist identisch: Fahrer, Kommandant, Richtschütze und Rückwärtsfahrer (Funker). Mit dem in der deutschen Wehrmacht eingeführten Panzerkampfwagen II Ausf. L (Sd.Kfz. 123) „Luchs“ hat der heutige „Luchs“-Panzer lediglich den Namen gemein. ",
                        technical_I: "AllgemeineEigenschaften",
                        AllgemeineEigenschaften: { Besatzung: "4 Mann", Laenge: "7,34 m", Breite: "2,98 m", Hoehe: "2,50 m", Masse: "19,6 t" },
                        technical_II: "Panzerung und Bewaffnung",
                        PanzerungundBewaffnung: { Panzerung: "SmK-sicher ", Hauptbewaffnung: "1 × 20-mm-MK", Sekundärbewaffnung: "1 × 7,62-mm-MG3" },
                        technical_III: "Beweglichkeit",
                        Beweglichkeit: {
                           Antrieb: "10-Zylinder-Vielstoffmotor Daimler-Benz mit 390 PS)",
                           Federung: " \tSchraubenfedern mit Stoßdämpfer ",
                           Geschwindigkeit: "90 km/h (Straße) ",
                           LeistungGewicht: " \t20 PS/t ",
                           Reichweite: "800 km (Straße) ",
                        },
                        quelleImg: "Quelle Image: https://commons.wikimedia.org/wiki/File:Spähpanzer_2_Luchs_A2.JPG",
                        quelleText: "Quelle Text:https://de.wikipedia.org/wiki/Luchs_(Sp%C3%A4hpanzer)",
                     },
                  };
               },
            };
            const ce = (0, f.Z)(oe, [
               ["render", se],
               ["__scopeId", "data-v-671bf214"],
            ]);
            var ue = ce;
            const ge = { class: "cardTank" },
               me = { class: "container-fluid", style: { height: "100%" } },
               he = { class: "row border border-secondary" },
               _e = { class: "row" },
               we = { class: "col border border-secondary" },
               pe = ["src"],
               ze = { class: "col-7 border border-secondary row align-items-center" },
               be = { class: "row" },
               ke = { class: "col-4 border border-secondary" },
               fe = { class: "table table-striped" },
               ve = { class: "col-4 border border-secondary" },
               ye = { class: "table table-striped" },
               Te = { class: "col-4 border border-secondary" },
               Ie = { class: "table table-striped" },
               Se = { class: "row border border-secondary" };
            function Be(e, n, a, r, l, d) {
               return (
                  (0, t.wg)(),
                  (0, t.iD)("div", ge, [
                     (0, t._)("div", me, [
                        (0, t._)("div", he, [(0, t._)("h1", null, (0, i.zw)(l.SchützenpanzerKurz.name), 1)]),
                        (0, t._)("div", _e, [
                           (0, t._)("div", we, [(0, t._)("img", { class: "img-fluid", src: l.SchützenpanzerKurz.img }, null, 8, pe)]),
                           (0, t._)("div", ze, [(0, t._)("h4", null, (0, i.zw)(l.SchützenpanzerKurz.description), 1)]),
                        ]),
                        (0, t._)("div", be, [
                           (0, t._)("div", ke, [
                              (0, t._)("h2", null, (0, i.zw)(l.SchützenpanzerKurz.technical_I), 1),
                              (0, t._)("table", fe, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.SchützenpanzerKurz.AllgemeineEigenschaften,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", ve, [
                              (0, t._)("h2", null, (0, i.zw)(l.SchützenpanzerKurz.technical_II), 1),
                              (0, t._)("table", ye, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.SchützenpanzerKurz.PanzerungundBewaffnung,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", Te, [
                              (0, t._)("h2", null, (0, i.zw)(l.SchützenpanzerKurz.technical_III), 1),
                              (0, t._)("table", Ie, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.SchützenpanzerKurz.Beweglichkeit,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                        ]),
                        (0, t._)("div", Se, [
                           (0, t._)("p", null, (0, i.zw)(l.SchützenpanzerKurz.quelleImg) + ", " + (0, i.zw)(l.SchützenpanzerKurz.quelleText), 1),
                        ]),
                     ]),
                  ])
               );
            }
            var De = {
               data() {
                  return {
                     SchützenpanzerKurz: {
                        name: "Schützenpanzer kurz, Hotchkiss",
                        img: a(84),
                        description:
                           "Der Schützenpanzer kurz (SPz kurz, Hotchkiss) gehörte zur Erstausstattung der Bundeswehr mit Panzerfahrzeugen. Das Fahrzeug basierte auf dem Schützenpanzer TT 6 der französischen Firma Hotchkiss-Brandt, dessen Kettenlaufwerk um eine zusätzliche Laufrolle (insgesamt fünf) erweitert wurde. Daneben gab es im deutschen Heer den „Schützenpanzer (lang) HS 30“. Das Werk von Klöckner-Humboldt-Deutz in Mainz fertigte als Lizenzbau von 1959 bis 1967 über 1600 Fahrzeuge. Die bekannteste Version war der Spähpanzer, der zur leichten Aufklärung im Trupp mit zwei Fahrzeugen eingesetzt wurde.",
                        technical_I: "AllgemeineEigenschaften",
                        AllgemeineEigenschaften: {
                           Besatzung: "4–5 (Kommandant, Fahrer, Funker, Richtschütze)",
                           Laenge: "4,51 m",
                           Breite: "2,28 m",
                           Hoehe: "1,97 m",
                           Masse: "8,2 t",
                        },
                        technical_II: "Panzerung und Bewaffnung",
                        PanzerungundBewaffnung: {
                           Panzerung: "8–30 mm",
                           Hauptbewaffnung: "20-mm-Maschinenkanone HS 820 L/85",
                           Sekundärbewaffnung: "Nebelmittelwurfanlage mit 2 × 3 Wurfbechern ",
                        },
                        technical_III: "Beweglichkeit",
                        Beweglichkeit: {
                           Antrieb: "Sechszylinder-V-Motor, Ottomotor Typ Hotchkiss 121 kW (164 PS)",
                           Federung: "Drehstabfederung mit mech. Stoßdämpfern",
                           Geschwindigkeit: "58 km/h",
                           LeistungGewicht: "20,5 PS/t",
                           Reichweite: "ca. 400 km",
                        },
                        quelleImg: "Quelle Image: https://commons.wikimedia.org/wiki/File:Schützenpanzer_Halbgruppe_(Hotchkiss).jpg",
                        quelleText: "Quelle Text: https://de.wikipedia.org/wiki/Sch%C3%BCtzenpanzer_kurz",
                     },
                  };
               },
            };
            const Ke = (0, f.Z)(De, [
               ["render", Be],
               ["__scopeId", "data-v-6746ee9d"],
            ]);
            var Le = Ke;
            const Pe = { class: "container-fluid", style: { "background-color": "#ededee" } };
            function Ae(e, n, a, r, l, i) {
               const d = (0, t.up)("NavbarGermanTankRecon"),
                  s = (0, t.up)("router-view");
               return (0, t.wg)(), (0, t.iD)("div", Pe, [(0, t.Wm)(d), (0, t.Wm)(s)]);
            }
            var He = a(97),
               Ge = a(371),
               Je = a(84);
            const Re = { class: "TankCardCategory" },
               Me = { class: "row" },
               Fe = { class: "navbar d-flex justify-content-around d-print border border-secondary" },
               xe = (0, t._)("img", { src: He, width: "200", height: "120", class: "d-inline-block align-top", alt: "" }, null, -1),
               Ee = (0, t._)("div", null, "Fennek", -1),
               Ce = (0, t._)("img", { src: Ge, width: "200", height: "120", class: "d-inline-block align-top", alt: "" }, null, -1),
               We = (0, t._)("div", null, "Spähpanzer Luchs A2", -1),
               Ve = (0, t._)("img", { src: Je, width: "200", height: "120", class: "d-inline-block align-top", alt: "" }, null, -1),
               je = (0, t._)("div", null, "Schützenpanzer Halbgruppe", -1);
            function qe(e, n, a, r, l, d) {
               const s = (0, t.up)("router-link");
               return (
                  (0, t.wg)(),
                  (0, t.iD)("div", Re, [
                     (0, t._)("div", Me, [(0, t._)("h1", null, (0, i.zw)(l.head), 1)]),
                     (0, t._)("nav", Fe, [
                        (0, t.Wm)(
                           s,
                           { to: "/germanTankRecon/componentGermanTankRecon/tankCard/GermanTankReconFennek" },
                           { default: (0, t.w5)(() => [xe, Ee]), _: 1 }
                        ),
                        (0, t.Wm)(
                           s,
                           { to: "/germanTankRecon/componentGermanTankRecon/tankCard/GermanTankReconLuchs" },
                           { default: (0, t.w5)(() => [Ce, We]), _: 1 }
                        ),
                        (0, t.Wm)(
                           s,
                           { to: "/germanTankRecon/componentGermanTankRecon/tankCard/GermanTankReconSchuetzenpanzerKurz" },
                           { default: (0, t.w5)(() => [Ve, je]), _: 1 }
                        ),
                     ]),
                  ])
               );
            }
            var Ye = {
               name: "NavbarGermanTankRecon",
               components: {},
               data() {
                  return { head: "Aufklärungspanzer" };
               },
            };
            const Ze = (0, f.Z)(Ye, [["render", qe]]);
            var Ne = Ze,
               Oe = { name: "MainTankCategory", components: { NavbarGermanTankRecon: Ne } };
            const Qe = (0, f.Z)(Oe, [["render", Ae]]);
            var Ue = Qe;
            const Xe = { class: "cardTank" },
               $e = { class: "container-fluid", style: { height: "100%" } },
               en = { class: "row border border-secondary" },
               nn = { class: "row" },
               an = { class: "col border border-secondary" },
               rn = ["src"],
               tn = { class: "col-7 border border-secondary row align-items-center" },
               ln = { class: "row" },
               dn = { class: "col-4 border border-secondary" },
               sn = { class: "table table-striped" },
               on = { class: "col-4 border border-secondary" },
               cn = { class: "table table-striped" },
               un = { class: "col-4 border border-secondary" },
               gn = { class: "table table-striped" },
               mn = { class: "row border border-secondary" };
            function hn(e, n, a, r, l, d) {
               return (
                  (0, t.wg)(),
                  (0, t.iD)("div", Xe, [
                     (0, t._)("div", $e, [
                        (0, t._)("div", en, [(0, t._)("h1", null, (0, i.zw)(l.Leopard1.name), 1)]),
                        (0, t._)("div", nn, [
                           (0, t._)("div", an, [(0, t._)("img", { class: "img-fluid", src: l.Leopard1.img }, null, 8, rn)]),
                           (0, t._)("div", tn, [(0, t._)("h4", null, (0, i.zw)(l.Leopard1.description), 1)]),
                        ]),
                        (0, t._)("div", ln, [
                           (0, t._)("div", dn, [
                              (0, t._)("h2", null, (0, i.zw)(l.Leopard1.technical_I), 1),
                              (0, t._)("table", sn, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Leopard1.AllgemeineEigenschaften,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", on, [
                              (0, t._)("h2", null, (0, i.zw)(l.Leopard1.technical_II), 1),
                              (0, t._)("table", cn, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Leopard1.PanzerungundBewaffnung,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", un, [
                              (0, t._)("h2", null, (0, i.zw)(l.Leopard1.technical_III), 1),
                              (0, t._)("table", gn, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Leopard1.Beweglichkeit,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                        ]),
                        (0, t._)("div", mn, [(0, t._)("p", null, (0, i.zw)(l.Leopard1.quelleImg) + ", " + (0, i.zw)(l.Leopard1.quelleText), 1)]),
                     ]),
                  ])
               );
            }
            var _n = {
               data() {
                  return {
                     Leopard1: {
                        name: "Leopard 1",
                        img: a(535),
                        description:
                           "Der Leopard 1 ist ein deutscher Kampfpanzer. Er war der erste nach dem Zweiten Weltkrieg in Deutschland entwickelte Panzer. Insgesamt wurde er in 13 Staaten auf fünf verschiedenen Kontinenten eingesetzt. Durch beständige Kampfwertsteigerungen ist er im 21. Jahrhundert noch immer in Armeen vieler Staaten zu finden. Von 1964 bis 1984 wurden 4.700 Leopard-1-Kampfpanzer (alle Varianten) gebaut. Krauss-Maffei Wegmann bietet den Nutzerstaaten des Leopard 1 eine Vielzahl von Nachrüst-Kits an, um Produktkonfigurationen den jeweils spezifischen Schwerpunkten hinsichtlich Feuerkraft, Schutz, Mobilität und Logistik anzupassen.",
                        technical_I: "AllgemeineEigenschaften",
                        AllgemeineEigenschaften: {
                           Besatzung: " 4 (Kommandant, Richtschütze, Ladeschütze, Fahrer)",
                           Laenge: "9,55 m bei Rohr auf 12 Uhr; 8,17 m bei Rohr auf 6 Uhr ",
                           Breite: "3,37 m",
                           Hoehe: "2,62 m",
                           Masse: "42,5 t",
                        },
                        technical_II: "Panzerung und Bewaffnung",
                        PanzerungundBewaffnung: {
                           Panzerung: "Panzerstahl Schottpanzerung bei Türmen (A3, A4, AS1. C1)",
                           Hauptbewaffnung: "1 × 105-mm-L7A3 mit 28 Zügen",
                           Sekundärbewaffnung: "2 × 7,62-mm-MG3 (koaxial und Fla-MG auf Turm), Nebelmittelwurfanlage",
                        },
                        technical_III: "Beweglichkeit",
                        Beweglichkeit: {
                           Antrieb: "10-Zylinder-Dieselmotor MTU MB 838 CaM-500 830 PS (610 kW)",
                           Federung: "Torsionsstab",
                           Geschwindigkeit: "65 km/h",
                           LeistungGewicht: "A4: 14,4 kW/t (19,6 PS/t); A5: 14,3 kW/t (19,4 PS/t)",
                           Reichweite: "562 km in Kolonnenfahrt mit Wandlerüberbrückung; leichtes Gelände 386 km, schweres Gelände 246 km Tankinhalt: 985 l",
                        },
                        quelleImg:
                           "Quelle Image:  Rainer Lippert (https://commons.wikimedia.org/wiki/File:Leopard_1A5.jpg), „Leopard 1A5“, https://creativecommons.org/licenses/by-sa/4.0/legalcode ",
                        quelleText: "Quelle Text: https://de.wikipedia.org/wiki/Leopard_1",
                     },
                  };
               },
            };
            const wn = (0, f.Z)(_n, [
               ["render", hn],
               ["__scopeId", "data-v-8ec4593a"],
            ]);
            var pn = wn;
            const zn = { class: "cardTank" },
               bn = { class: "container-fluid", style: { height: "100%" } },
               kn = { class: "row border border-secondary" },
               fn = { class: "row" },
               vn = { class: "col border border-secondary" },
               yn = ["src"],
               Tn = { class: "col-7 border border-secondary row align-items-center" },
               In = { class: "row" },
               Sn = { class: "col-4 border border-secondary" },
               Bn = { class: "table table-striped" },
               Dn = { class: "col-4 border border-secondary" },
               Kn = { class: "table table-striped" },
               Ln = { class: "col-4 border border-secondary" },
               Pn = { class: "table table-striped" },
               An = { class: "row border border-secondary" };
            function Hn(e, n, a, r, l, d) {
               return (
                  (0, t.wg)(),
                  (0, t.iD)("div", zn, [
                     (0, t._)("div", bn, [
                        (0, t._)("div", kn, [(0, t._)("h1", null, (0, i.zw)(l.KampfpanzerSeventy.name), 1)]),
                        (0, t._)("div", fn, [
                           (0, t._)("div", vn, [(0, t._)("img", { class: "img-fluid", src: l.KampfpanzerSeventy.img }, null, 8, yn)]),
                           (0, t._)("div", Tn, [(0, t._)("h4", null, (0, i.zw)(l.KampfpanzerSeventy.description), 1)]),
                        ]),
                        (0, t._)("div", In, [
                           (0, t._)("div", Sn, [
                              (0, t._)("h2", null, (0, i.zw)(l.KampfpanzerSeventy.technical_I), 1),
                              (0, t._)("table", Bn, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.KampfpanzerSeventy.AllgemeineEigenschaften,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", Dn, [
                              (0, t._)("h2", null, (0, i.zw)(l.KampfpanzerSeventy.technical_II), 1),
                              (0, t._)("table", Kn, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.KampfpanzerSeventy.PanzerungundBewaffnung,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", Ln, [
                              (0, t._)("h2", null, (0, i.zw)(l.KampfpanzerSeventy.technical_III), 1),
                              (0, t._)("table", Pn, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.KampfpanzerSeventy.Beweglichkeit,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                        ]),
                        (0, t._)("div", An, [
                           (0, t._)("p", null, (0, i.zw)(l.KampfpanzerSeventy.quelleImg) + ", " + (0, i.zw)(l.KampfpanzerSeventy.quelleText), 1),
                        ]),
                     ]),
                  ])
               );
            }
            var Gn = {
               data() {
                  return {
                     KampfpanzerSeventy: {
                        name: "KampfpanzerSeventy",
                        img: a(922),
                        description:
                           "Der Kampfpanzer 70 (KPz 70; englisch Main Battle Tank 70, MBT-70) war Mitte der 1960er-Jahre ein Gemeinschaftsprojekt zwischen den USA und Deutschland. Die Entwicklung endete 1971 mit der Einstellung des Vorhabens. Auf den Ergebnissen der Entwicklungsarbeit bauen die Kampfpanzer Leopard 2 und M1 Abrams auf.",
                        technical_I: "AllgemeineEigenschaften",
                        AllgemeineEigenschaften: {
                           Besatzung: "3 (Fahrer, Kommandant, Schütze)",
                           Laenge: "9,26 m (Turm 12 Uhr) 7,96 (Turm 6 Uhr)",
                           Breite: "3,56 m (mit Kettenschürzen)",
                           Hoehe: "1,99 m (Oberkante Turm und abgesenkt); 2,29 m (Normalstellung); 2,53 m (angehoben) ",
                           Masse: "50,4 t (Generation 1); 46 t (Generation 2) ",
                        },
                        technical_II: "Panzerung und Bewaffnung",
                        PanzerungundBewaffnung: {
                           Panzerung: "Schottpanzerung mit Strahlenschutz aus Polyethylen",
                           Hauptbewaffnung: "1 × 152-mm-Kanone XM 150E5 Kombinationswaffe (DE und US); 1 × 120-mm-Kanone (DE, Tests) ",
                           Sekundärbewaffnung: "1 × 20-mm-Luftabwehrmaschinenkanone; 1 × 7,62-mm-Maschinengewehr",
                        },
                        technical_III: "Beweglichkeit",
                        Beweglichkeit: {
                           Antrieb: "DE: Daimler-Benz/MTU MB 873 Ka-500; US: Continental AVCR-1100 V12; DE: 1100 kW (1500 PS); US: 1080 kW (1470 PS) ",
                           Federung: "hydropneumatisch (Federweg 60 cm)",
                           Geschwindigkeit: "72 km/h (68 bei 2600/min)",
                           LeistungGewicht: " \tDE: 21,8 kW/t (29,7 PS/t); US: 21,4 kW/t (29,2 PS/t) ",
                           Reichweite: "580 bis 650 km",
                        },
                        quelleImg:
                           "Quelle Image: US Army (https://commons.wikimedia.org/wiki/File:MBT-70_american_prototype_front_view.JPG), „MBT-70 american prototype front view“, als gemeinfrei gekennzeichnet, Details auf Wikimedia Commons: https://commons.wikimedia.org/wiki/Template:PD-US",
                        quelleText: "Quelle Text: https://de.wikipedia.org/wiki/Kampfpanzer_70",
                     },
                  };
               },
            };
            const Jn = (0, f.Z)(Gn, [
               ["render", Hn],
               ["__scopeId", "data-v-3083c8ac"],
            ]);
            var Rn = Jn;
            const Mn = { class: "cardTank" },
               Fn = { class: "container-fluid", style: { height: "100%" } },
               xn = { class: "row border border-secondary" },
               En = { class: "row" },
               Cn = { class: "col border border-secondary" },
               Wn = ["src"],
               Vn = { class: "col-7 border border-secondary row align-items-center" },
               jn = { class: "row" },
               qn = { class: "col-4 border border-secondary" },
               Yn = { class: "table table-striped" },
               Zn = { class: "col-4 border border-secondary" },
               Nn = { class: "table table-striped" },
               On = { class: "col-4 border border-secondary" },
               Qn = { class: "table table-striped" },
               Un = { class: "row border border-secondary" };
            function Xn(e, n, a, r, l, d) {
               return (
                  (0, t.wg)(),
                  (0, t.iD)("div", Mn, [
                     (0, t._)("div", Fn, [
                        (0, t._)("div", xn, [(0, t._)("h1", null, (0, i.zw)(l.Leopard2.name), 1)]),
                        (0, t._)("div", En, [
                           (0, t._)("div", Cn, [(0, t._)("img", { class: "img-fluid", src: l.Leopard2.img }, null, 8, Wn)]),
                           (0, t._)("div", Vn, [(0, t._)("h4", null, (0, i.zw)(l.Leopard2.description), 1)]),
                        ]),
                        (0, t._)("div", jn, [
                           (0, t._)("div", qn, [
                              (0, t._)("h2", null, (0, i.zw)(l.Leopard2.technical_I), 1),
                              (0, t._)("table", Yn, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Leopard2.AllgemeineEigenschaften,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", Zn, [
                              (0, t._)("h2", null, (0, i.zw)(l.Leopard2.technical_II), 1),
                              (0, t._)("table", Nn, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Leopard2.PanzerungundBewaffnung,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", On, [
                              (0, t._)("h2", null, (0, i.zw)(l.Leopard2.technical_III), 1),
                              (0, t._)("table", Qn, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Leopard2.Beweglichkeit,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                        ]),
                        (0, t._)("div", Un, [(0, t._)("p", null, (0, i.zw)(l.Leopard2.quelleImg) + ", " + (0, i.zw)(l.Leopard2.quelleText), 1)]),
                     ]),
                  ])
               );
            }
            var $n = {
               data() {
                  return {
                     Leopard2: {
                        name: "Leopard 2",
                        img: a(933),
                        description:
                           "Der Leopard 2 ist ein Kampfpanzer aus deutscher Produktion. Er wird seit 1978 in Serie gebaut und ist der Nachfolger des Leopard 1. In der langen Produktionszeit entstanden diverse optionale Nachrüstmöglichkeiten und Spezifikationen für ausländische Abnehmer. Deshalb gibt es eine Vielzahl von Varianten des Leopard 2. Er wird ganz oder teilweise im Ausland in Lizenz gefertigt. Für den Hersteller Krauss-Maffei Wegmann – 1979 Krauss-Maffei – ist er mit rund 3600 gebauten Exemplaren ein kommerzieller Erfolg. Bis zum Jahr 2008 hat die Bundeswehr ihren Bestand an aktiven Leopard 2 von ehemals 2125 Stück im Jahr 1990 auf 350 Stück reduziert. Im Rahmen der Neuausrichtung der Bundeswehr sollte diese Zahl weiter auf 225 abgesenkt werden, wurde jedoch im April 2015 aufgrund der veränderten sicherheitspolitischen Lage wieder auf 328 Stück erhöht. Die Version A6 mit längerer Kanone steht seit 2001 im Dienst. Der Leopard-2-Panzer war ursprünglich als Rückgrat gepanzerter Streitkräfte und zur Abwehr gegnerischer Panzerverbände vorgesehen. In der Folge des Kosovokrieges kam er erstmals bei KFOR zum Einsatz. Die NATO-Länder Dänemark und Kanada setzten den Leopard 2 im ISAF-Einsatz in Afghanistan ein sowie die Türkei von 2016 bis 2019 in Nordsyrien.",
                        technical_I: "AllgemeineEigenschaften",
                        AllgemeineEigenschaften: {
                           Besatzung: "4 (Kommandant, Richtschütze, Ladeschütze, Fahrer)",
                           Laenge: "Turm 12 Uhr; 9,67 m (A4, A5); 10,97 m (ab A6)",
                           Breite: "3,70 m (A4); 3,76 m (ab A5)",
                           Hoehe: "3,03 m (Oberkante PERI)",
                           Masse: "62 t (A6)",
                        },
                        technical_II: "Panzerung und Bewaffnung",
                        PanzerungundBewaffnung: {
                           Hauptbewaffnung: "3. Generation Kompositpanzerung, Zusatzpanzerung in Schottbauweise",
                           Sekundärbewaffnung: "A6M: STANAG 4569 Level IV, 10-kg-Panzerabwehrmine und EFP-Mine",
                           Panzerung: "120-mm-Glattrohrkanone; 42 Schuss",
                           Minenschutzstärke: " \t2 × 7,62-mm-MG 3; 4750 Schuss ",
                        },
                        technical_III: "Beweglichkeit",
                        Beweglichkeit: {
                           Antrieb: "12-Zylinder-FM Dieselmotor MTU MB 873; 1.500 PS (1.103 kW)",
                           Federung: "Federung \tDrehstabfederung",
                           Geschwindigkeit: "68–72 km/h",
                           LeistungGewicht: "ca. 17,8 kW/t (24,2 PS/t) (je nach Variante)",
                           Reichweite: "ca. 500 km; Gelände: ca. 161 km",
                        },
                        quelleImg:
                           "Quelle Image: Bundeswehr-Fotos (https://commons.wikimedia.org/wiki/File:Leopard_2_A5_der_Bundeswehr.jpg), „Leopard 2 A5 der Bundeswehr“, https://creativecommons.org/licenses/by/2.0/legalcode",
                        quelleText: "Quelle Text: https://de.wikipedia.org/wiki/Leopard_2",
                     },
                  };
               },
            };
            const ea = (0, f.Z)($n, [
               ["render", Xn],
               ["__scopeId", "data-v-3fd33f9d"],
            ]);
            var na = ea;
            const aa = { class: "container-fluid", style: { "background-color": "#ededee" } };
            function ra(e, n, a, r, l, i) {
               const d = (0, t.up)("NavbarGermanMainBattleTank"),
                  s = (0, t.up)("router-view");
               return (0, t.wg)(), (0, t.iD)("div", aa, [(0, t.Wm)(d), (0, t.Wm)(s)]);
            }
            var ta = a(535),
               la = a(922),
               ia = a(933);
            const da = { class: "TankCardCategory" },
               sa = { class: "row" },
               oa = { class: "navbar d-flex justify-content-around d-print border border-secondary" },
               ca = (0, t._)("img", { src: ta, width: "200", height: "120", class: "d-inline-block align-top", alt: "" }, null, -1),
               ua = (0, t._)("div", null, "Leopard 1", -1),
               ga = (0, t._)("img", { src: la, width: "200", height: "120", class: "d-inline-block align-top", alt: "" }, null, -1),
               ma = (0, t._)("div", null, "Kampfpanzer 70", -1),
               ha = (0, t._)("img", { src: ia, width: "200", height: "120", class: "d-inline-block align-top", alt: "" }, null, -1),
               _a = (0, t._)("div", null, "Leopard 2", -1);
            function wa(e, n, a, r, l, d) {
               const s = (0, t.up)("router-link");
               return (
                  (0, t.wg)(),
                  (0, t.iD)("div", da, [
                     (0, t._)("div", sa, [(0, t._)("h1", null, (0, i.zw)(l.head), 1)]),
                     (0, t._)("nav", oa, [
                        (0, t.Wm)(s, { to: "/germanTank/componentMainBattleTank/tankCard/LeopardOne" }, { default: (0, t.w5)(() => [ca, ua]), _: 1 }),
                        (0, t.Wm)(s, { to: "/germanTank/componentMainBattleTank/tankCard/KampfpanzerSeventy" }, { default: (0, t.w5)(() => [ga, ma]), _: 1 }),
                        (0, t.Wm)(s, { to: "/germanTank/componentMainBattleTank/tankCard/LeopardTwo" }, { default: (0, t.w5)(() => [ha, _a]), _: 1 }),
                     ]),
                  ])
               );
            }
            var pa = {
               name: "NavbarGermanTankRecon",
               components: {},
               data() {
                  return { head: "Aufklärungspanzer" };
               },
            };
            const za = (0, f.Z)(pa, [["render", wa]]);
            var ba = za,
               ka = { name: "MainGermanBattleTankCategory", components: { NavbarGermanMainBattleTank: ba } };
            const fa = (0, f.Z)(ka, [["render", ra]]);
            var va = fa;
            const ya = { class: "cardTank" },
               Ta = { class: "container-fluid", style: { height: "100%" } },
               Ia = { class: "row border border-secondary" },
               Sa = { class: "row" },
               Ba = { class: "col border border-secondary" },
               Da = ["src"],
               Ka = { class: "col-7 border border-secondary row align-items-center" },
               La = { class: "row" },
               Pa = { class: "col-4 border border-secondary" },
               Aa = { class: "table table-striped" },
               Ha = { class: "col-4 border border-secondary" },
               Ga = { class: "table table-striped" },
               Ja = { class: "col-4 border border-secondary" },
               Ra = { class: "table table-striped" },
               Ma = { class: "row border border-secondary" };
            function Fa(e, n, a, r, l, d) {
               return (
                  (0, t.wg)(),
                  (0, t.iD)("div", ya, [
                     (0, t._)("div", Ta, [
                        (0, t._)("div", Ia, [(0, t._)("h1", null, (0, i.zw)(l.Jaguar_1.name), 1)]),
                        (0, t._)("div", Sa, [
                           (0, t._)("div", Ba, [(0, t._)("img", { class: "img-fluid", src: l.Jaguar_1.img }, null, 8, Da)]),
                           (0, t._)("div", Ka, [(0, t._)("h4", null, (0, i.zw)(l.Jaguar_1.description), 1)]),
                        ]),
                        (0, t._)("div", La, [
                           (0, t._)("div", Pa, [
                              (0, t._)("h2", null, (0, i.zw)(l.Jaguar_1.technical_I), 1),
                              (0, t._)("table", Aa, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Jaguar_1.AllgemeineEigenschaften,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", Ha, [
                              (0, t._)("h2", null, (0, i.zw)(l.Jaguar_1.technical_II), 1),
                              (0, t._)("table", Ga, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Jaguar_1.PanzerungundBewaffnung,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", Ja, [
                              (0, t._)("h2", null, (0, i.zw)(l.Jaguar_1.technical_III), 1),
                              (0, t._)("table", Ra, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Jaguar_1.Beweglichkeit,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                        ]),
                        (0, t._)("div", Ma, [(0, t._)("p", null, (0, i.zw)(l.Jaguar_1.quelleImg) + ", " + (0, i.zw)(l.Jaguar_1.quelleText), 1)]),
                     ]),
                  ])
               );
            }
            var xa = {
               data() {
                  return {
                     Jaguar_1: {
                        name: "Jaguar 1",
                        img: a(556),
                        description:
                           "Der Jaguar 1 ist ein Jagdpanzer, der von den Firmen Henschel (heute Rheinmetall Landsysteme) und Hanomag entwickelt und produziert und bei der deutschen Bundeswehr von 1978 bis 2005 genutzt wurde. Beim österreichischen Bundesheer war er von 1996 bis 2006 eingesetzt.[1] Insgesamt wurden 316 Fahrzeuge vom Raketenjagdpanzer 2 zum Jaguar 1 umgerüstet.",
                        technical_I: "AllgemeineEigenschaften",
                        AllgemeineEigenschaften: {
                           Besatzung: "4 (Kommandant, Richtschütze, Ladeschütze, Fahrer)",
                           Länge: "6,61 m",
                           Breite: "3,12 m",
                           Höhe: "2,55 m (Oberkante PERI)",
                           Masse: "22,5 t (A6)",
                        },
                        technical_II: "Panzerung und Bewaffnung",
                        PanzerungundBewaffnung: {
                           Panzerung: "Geschweißter Panzerstahl, Schottpanzerung",
                           Hauptbewaffnung: "HOT (Lenkflugkörper) 20 LFK",
                           Sekundärbewaffnung: "2 × 7,62-mm-MG3",
                        },
                        technical_III: "Beweglichkeit",
                        Beweglichkeit: {
                           Antrieb: "MTU-Dieselmotor MB 837 Aa500 368 kW (500 PS)",
                           Federung: "Torsionsstab",
                           Geschwindigkeit: "70 km/h",
                           LeistungGewicht: "ca. 19,6 PS/t",
                           Reichweite: "ca. 335 km",
                        },
                        quelleImg:
                           "Quelle Image: Huhu (https://commons.wikimedia.org/wiki/File:Jagdpanzer_Jaguar_1_A3.JPG), „Jagdpanzer Jaguar 1 A3“, als gemeinfrei gekennzeichnet, Details auf Wikimedia Commons: https://commons.wikimedia.org/wiki/Template:PD-user",
                        quelleText: "Quelle Text: https://de.wikipedia.org/wiki/Jaguar_(Jagdpanzer)",
                     },
                  };
               },
            };
            const Ea = (0, f.Z)(xa, [
               ["render", Fa],
               ["__scopeId", "data-v-132f4500"],
            ]);
            var Ca = Ea;
            const Wa = { class: "cardTank" },
               Va = { class: "container-fluid", style: { height: "100%" } },
               ja = { class: "row border border-secondary" },
               qa = { class: "row" },
               Ya = { class: "col border border-secondary" },
               Za = ["src"],
               Na = { class: "col-7 border border-secondary row align-items-center" },
               Oa = { class: "row" },
               Qa = { class: "col-4 border border-secondary" },
               Ua = { class: "table table-striped" },
               Xa = { class: "col-4 border border-secondary" },
               $a = { class: "table table-striped" },
               er = { class: "col-4 border border-secondary" },
               nr = { class: "table table-striped" },
               ar = { class: "row border border-secondary" };
            function rr(e, n, a, r, l, d) {
               return (
                  (0, t.wg)(),
                  (0, t.iD)("div", Wa, [
                     (0, t._)("div", Va, [
                        (0, t._)("div", ja, [(0, t._)("h1", null, (0, i.zw)(l.Jaguar_2.name), 1)]),
                        (0, t._)("div", qa, [
                           (0, t._)("div", Ya, [(0, t._)("img", { class: "img-fluid", src: l.Jaguar_2.img }, null, 8, Za)]),
                           (0, t._)("div", Na, [(0, t._)("h4", null, (0, i.zw)(l.Jaguar_2.description), 1)]),
                        ]),
                        (0, t._)("div", Oa, [
                           (0, t._)("div", Qa, [
                              (0, t._)("h2", null, (0, i.zw)(l.Jaguar_2.technical_I), 1),
                              (0, t._)("table", Ua, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Jaguar_2.AllgemeineEigenschaften,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", Xa, [
                              (0, t._)("h2", null, (0, i.zw)(l.Jaguar_2.technical_II), 1),
                              (0, t._)("table", $a, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Jaguar_2.PanzerungundBewaffnung,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", er, [
                              (0, t._)("h2", null, (0, i.zw)(l.Jaguar_2.technical_III), 1),
                              (0, t._)("table", nr, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Jaguar_2.Beweglichkeit,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                        ]),
                        (0, t._)("div", ar, [(0, t._)("p", null, (0, i.zw)(l.Jaguar_2.quelleImg) + ", " + (0, i.zw)(l.Jaguar_2.quelleText), 1)]),
                     ]),
                  ])
               );
            }
            var tr = {
               data() {
                  return {
                     Jaguar_2: {
                        name: "Jaguar 2",
                        img: a(642),
                        description:
                           "Der Jaguar 1 ist ein Jagdpanzer, der von den Firmen Henschel (heute Rheinmetall Landsysteme) und Hanomag entwickelt und produziert und bei der deutschen Bundeswehr von 1978 bis 2005 genutzt wurde. Beim österreichischen Bundesheer war er von 1996 bis 2006 eingesetzt.[1] Insgesamt wurden 316 Fahrzeuge vom Raketenjagdpanzer 2 zum Jaguar 1 umgerüstet.",
                        technical_I: "AllgemeineEigenschaften",
                        AllgemeineEigenschaften: {
                           Besatzung: "4 (Kommandant, Richtschütze, Ladeschütze, Fahrer)",
                           Länge: "6,61 m",
                           Breite: "3,12 m",
                           Höhe: "2,55 m (Oberkante PERI)",
                           Masse: "22,5 t (A6)",
                        },
                        technical_II: "Panzerung und Bewaffnung",
                        PanzerungundBewaffnung: {
                           Panzerung: "Geschweißter Panzerstahl, Schottpanzerung",
                           Hauptbewaffnung: "HOT (Lenkflugkörper) 20 LFK",
                           Sekundärbewaffnung: "2 × 7,62-mm-MG3",
                        },
                        technical_III: "Beweglichkeit",
                        Beweglichkeit: {
                           Antrieb: "MTU-Dieselmotor MB 837 Aa500 368 kW (500 PS)",
                           Federung: "Torsionsstab",
                           Geschwindigkeit: "70 km/h",
                           LeistungGewicht: "ca. 19,6 PS/t",
                           Reichweite: "ca. 335 km",
                        },
                        quelleImg:
                           "Quelle Image: Banznerfahrer (https://commons.wikimedia.org/wiki/File:Panzermuseum_Munster_2010_0934.JPG), „Panzermuseum Munster 2010 0934“, https://creativecommons.org/licenses/by-sa/3.0/legalcode ",
                        quelleText: "Quelle Text: https://de.wikipedia.org/wiki/Jaguar_(Jagdpanzer)",
                     },
                  };
               },
            };
            const lr = (0, f.Z)(tr, [
               ["render", rr],
               ["__scopeId", "data-v-b091d618"],
            ]);
            var ir = lr;
            const dr = { class: "cardTank" },
               sr = { class: "container-fluid", style: { height: "100%" } },
               or = { class: "row border border-secondary" },
               cr = { class: "row" },
               ur = { class: "col border border-secondary" },
               gr = ["src"],
               mr = { class: "col-7 border border-secondary row align-items-center" },
               hr = { class: "row" },
               _r = { class: "col-4 border border-secondary" },
               wr = { class: "table table-striped" },
               pr = { class: "col-4 border border-secondary" },
               zr = { class: "table table-striped" },
               br = { class: "col-4 border border-secondary" },
               kr = { class: "table table-striped" },
               fr = { class: "row border border-secondary" };
            function vr(e, n, a, r, l, d) {
               return (
                  (0, t.wg)(),
                  (0, t.iD)("div", dr, [
                     (0, t._)("div", sr, [
                        (0, t._)("div", or, [(0, t._)("h1", null, (0, i.zw)(l.VT1.name), 1)]),
                        (0, t._)("div", cr, [
                           (0, t._)("div", ur, [(0, t._)("img", { class: "img-fluid", src: l.VT1.img }, null, 8, gr)]),
                           (0, t._)("div", mr, [(0, t._)("h4", null, (0, i.zw)(l.VT1.description), 1)]),
                        ]),
                        (0, t._)("div", hr, [
                           (0, t._)("div", _r, [
                              (0, t._)("h2", null, (0, i.zw)(l.VT1.technical_I), 1),
                              (0, t._)("table", wr, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.VT1.AllgemeineEigenschaften,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", pr, [
                              (0, t._)("h2", null, (0, i.zw)(l.VT1.technical_II), 1),
                              (0, t._)("table", zr, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.VT1.PanzerungundBewaffnung,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", br, [
                              (0, t._)("h2", null, (0, i.zw)(l.VT1.technical_III), 1),
                              (0, t._)("table", kr, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.VT1.Beweglichkeit,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                        ]),
                        (0, t._)("div", fr, [(0, t._)("p", null, (0, i.zw)(l.VT1.quelleImg) + ", " + (0, i.zw)(l.VT1.quelleText), 1)]),
                     ]),
                  ])
               );
            }
            var yr = {
               data() {
                  return {
                     VT1: {
                        name: "VT 1",
                        img: a(776),
                        description:
                           "Der Jaguar 1 ist ein Jagdpanzer, der von den Firmen Henschel (heute Rheinmetall Landsysteme) und Hanomag entwickelt und produziert und bei der deutschen Bundeswehr von 1978 bis 2005 genutzt wurde. Beim österreichischen Bundesheer war er von 1996 bis 2006 eingesetzt.[1] Insgesamt wurden 316 Fahrzeuge vom Raketenjagdpanzer 2 zum Jaguar 1 umgerüstet.",
                        technical_I: "AllgemeineEigenschaften",
                        AllgemeineEigenschaften: {
                           Hersteller: "MaK",
                           Baujahr: "1974 VT1-1 / 1975 VT1-2",
                           Besatzung: "3",
                           Länge: "9,060 m",
                           Breite: "3,540 m",
                           Höhe: "2,040 m",
                        },
                        technical_II: "Panzerung und Bewaffnung",
                        PanzerungundBewaffnung: {
                           Periskop: "Rundblickperiskop PERI-R 12 (je Kdt + Rischtz)",
                           Bewaffnung_VT1_1: "zwei 105-mm-Zugrohrkanonen L7A3 mit manueller Zuführung",
                           Bewaffnung_VT1_2: "zwei 120-mm-Glattrohrkanonen mit Ladeautomatik",
                        },
                        technical_III: "Beweglichkeit",
                        Beweglichkeit: {
                           Motor: "MTU MB 803 Ra-500 (vier Abgasturbolader)",
                           Leistung: "1500 PS Dauerbetrieb (2175 PS kurzzeitig)",
                           Zylinder: "12 V 90°",
                           Hubraum: "52.000 cm³",
                           Drehzahl: "max. 3000/min",
                           Leistungsgewicht: "34,5–50 PS/t max.",
                           Getriebe: "Renk HSWL (4/2)",
                           Höchstgeschwindigkeit: "70 km/h",
                           Federung: "hydropneumatisch",
                           Kette: "gummigepolsterte Verbinderkette",
                           Antrieb: "Heckantrieb",
                        },
                        quelleImg:
                           "Quelle Image: Anubis85 KH (https://commons.wikimedia.org/wiki/File:VT1-2-1.jpg), „VT1-2-1“, https://creativecommons.org/licenses/by-sa/3.0/legalcode",
                        quelleText: "Quelle Text: https://de.wikipedia.org/wiki/VT1_(Panzer)",
                     },
                  };
               },
            };
            const Tr = (0, f.Z)(yr, [
               ["render", vr],
               ["__scopeId", "data-v-736f74e7"],
            ]);
            var Ir = Tr;
            const Sr = { class: "cardTank" },
               Br = { class: "container-fluid", style: { height: "100%" } },
               Dr = { class: "row border border-secondary" },
               Kr = { class: "row" },
               Lr = { class: "col border border-secondary" },
               Pr = ["src"],
               Ar = { class: "col-7 border border-secondary row align-items-center" },
               Hr = { class: "row" },
               Gr = { class: "col-4 border border-secondary" },
               Jr = { class: "table table-striped" },
               Rr = { class: "col-4 border border-secondary" },
               Mr = { class: "table table-striped" },
               Fr = { class: "col-4 border border-secondary" },
               xr = { class: "table table-striped" },
               Er = { class: "row border border-secondary" };
            function Cr(e, n, a, r, l, d) {
               return (
                  (0, t.wg)(),
                  (0, t.iD)("div", Sr, [
                     (0, t._)("div", Br, [
                        (0, t._)("div", Dr, [(0, t._)("h1", null, (0, i.zw)(l.HS_30.name), 1)]),
                        (0, t._)("div", Kr, [
                           (0, t._)("div", Lr, [(0, t._)("img", { class: "img-fluid", src: l.HS_30.img }, null, 8, Pr)]),
                           (0, t._)("div", Ar, [(0, t._)("h4", null, (0, i.zw)(l.HS_30.description), 1)]),
                        ]),
                        (0, t._)("div", Hr, [
                           (0, t._)("div", Gr, [
                              (0, t._)("h2", null, (0, i.zw)(l.HS_30.technical_I), 1),
                              (0, t._)("table", Jr, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.HS_30.AllgemeineEigenschaften,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", Rr, [
                              (0, t._)("h2", null, (0, i.zw)(l.HS_30.technical_II), 1),
                              (0, t._)("table", Mr, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.HS_30.PanzerungundBewaffnung,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", Fr, [
                              (0, t._)("h2", null, (0, i.zw)(l.HS_30.technical_III), 1),
                              (0, t._)("table", xr, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.HS_30.Beweglichkeit,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                        ]),
                        (0, t._)("div", Er, [(0, t._)("p", null, (0, i.zw)(l.HS_30.quelleImg) + ", " + (0, i.zw)(l.HS_30.quelleText), 1)]),
                     ]),
                  ])
               );
            }
            var Wr = {
               data() {
                  return {
                     HS_30: {
                        name: "HS 30",
                        img: a(54),
                        description:
                           "Der Schützenpanzer (lang) HS 30 war ein gepanzertes Kettenfahrzeug mit 20-mm-Maschinenkanone, von dem die Bundeswehr 2.176 Stück erhielt. Daneben gab es im deutschen Heer den Schützenpanzer kurz (Hotchkiss) mit der gleichen Bewaffnung. Die Umstände der Beschaffung des Schützenpanzers (lang) führten in den 1960er-Jahren zum HS-30-Skandal. ",
                        technical_I: "AllgemeineEigenschaften",
                        AllgemeineEigenschaften: {
                           Besatzung: "3 (Kommandant, Fahrer, Richtschütze) + weiteres Personal je nach Version",
                           Länge: "5,56 m",
                           Breite: "2,54 m",
                           Höhe: "1,85 m",
                           Masse: "14,37 t",
                        },
                        technical_II: "Panzerung und Bewaffnung",
                        PanzerungundBewaffnung: { Hauptbewaffnung: "20-mm-Maschinenkanone HS 820 L/85", Sekundärbewaffnung: "keine" },
                        technical_III: "Beweglichkeit",
                        Beweglichkeit: {
                           Antrieb: "Achtzylinder-V-Motor, Ottomotor Typ Rolls-Royce B81 Mk. 80 F 164 kW (198 PS)",
                           Federung: "Schraubenfedern mit Gummifederteller",
                           Geschwindigkeit: "58 km/h",
                           LeistungGewicht: "15,3 PS/t ",
                           Reichweite: "ca. 270 km",
                        },
                        quelleImg:
                           "Quelle Image: Sandstein (https://commons.wikimedia.org/wiki/File:Schützenpanzer_Lang_HS_30.jpg), „Schützenpanzer Lang HS 30“, https://creativecommons.org/licenses/by/3.0/legalcode",
                        quelleText: "Quelle Text: https://de.wikipedia.org/wiki/HS_30",
                     },
                  };
               },
            };
            const Vr = (0, f.Z)(Wr, [
               ["render", Cr],
               ["__scopeId", "data-v-3f804ea8"],
            ]);
            var jr = Vr;
            const qr = { class: "cardTank" },
               Yr = { class: "container-fluid", style: { height: "100%" } },
               Zr = { class: "row border border-secondary" },
               Nr = { class: "row" },
               Or = { class: "col border border-secondary" },
               Qr = ["src"],
               Ur = { class: "col-7 border border-secondary row align-items-center" },
               Xr = { class: "row" },
               $r = { class: "col-4 border border-secondary" },
               et = { class: "table table-striped" },
               nt = { class: "col-4 border border-secondary" },
               at = { class: "table table-striped" },
               rt = { class: "col-4 border border-secondary" },
               tt = { class: "table table-striped" },
               lt = { class: "row border border-secondary" };
            function it(e, n, a, r, l, d) {
               return (
                  (0, t.wg)(),
                  (0, t.iD)("div", qr, [
                     (0, t._)("div", Yr, [
                        (0, t._)("div", Zr, [(0, t._)("h1", null, (0, i.zw)(l.Kanonen_Jagdpanzer_1.name), 1)]),
                        (0, t._)("div", Nr, [
                           (0, t._)("div", Or, [(0, t._)("img", { class: "img-fluid", src: l.Kanonen_Jagdpanzer_1.img }, null, 8, Qr)]),
                           (0, t._)("div", Ur, [(0, t._)("h4", null, (0, i.zw)(l.Kanonen_Jagdpanzer_1.description), 1)]),
                        ]),
                        (0, t._)("div", Xr, [
                           (0, t._)("div", $r, [
                              (0, t._)("h2", null, (0, i.zw)(l.Kanonen_Jagdpanzer_1.technical_I), 1),
                              (0, t._)("table", et, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Kanonen_Jagdpanzer_1.AllgemeineEigenschaften,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", nt, [
                              (0, t._)("h2", null, (0, i.zw)(l.Kanonen_Jagdpanzer_1.technical_II), 1),
                              (0, t._)("table", at, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Kanonen_Jagdpanzer_1.PanzerungundBewaffnung,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", rt, [
                              (0, t._)("h2", null, (0, i.zw)(l.Kanonen_Jagdpanzer_1.technical_III), 1),
                              (0, t._)("table", tt, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Kanonen_Jagdpanzer_1.Beweglichkeit,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                        ]),
                        (0, t._)("div", lt, [
                           (0, t._)("p", null, (0, i.zw)(l.Kanonen_Jagdpanzer_1.quelleImg) + ", " + (0, i.zw)(l.Kanonen_Jagdpanzer_1.quelleText), 1),
                        ]),
                     ]),
                  ])
               );
            }
            var dt = {
               data() {
                  return {
                     Kanonen_Jagdpanzer_1: {
                        name: "Kanonenjagdpanzer",
                        img: a(610),
                        description:
                           "Der Kanonen_Jagdpanzer_1, auch Jagdpanzer, Kanone 90 mm oder Kanonen_Jagdpanzer_1 4–5, genannt, abgekürzt KanJPz, war der zweite Jagdpanzer der deutschen Bundeswehr, aber der einzige mit Rohrbewaffnung.",
                        technical_I: "AllgemeineEigenschaften",
                        AllgemeineEigenschaften: {
                           Besatzung: "4 (Kommandant, Fahrer, Richtschütze, Ladeschütze)",
                           Länge: "8,75 m (mit Kanone), 6,24 m (nur Wanne)",
                           Breite: "2,98 m",
                           Höhe: "2,00 m",
                           Masse: "25,7 t",
                        },
                        technical_II: "Panzerung und Bewaffnung",
                        PanzerungundBewaffnung: {
                           Panzerung: "8–50 mm Panzerstahl",
                           Hauptbewaffnung: "1 × 90-mm-Rheinmetall-Kanone L/40,4 (51 Schuss)",
                           Sekundärbewaffnung: "1 × MG3 als Blenden-MG; 1 × MG3 als Fla-MG",
                        },
                        technical_III: "Beweglichkeit",
                        Beweglichkeit: {
                           Antrieb: "Achtzylinder-Vielstoffmotor Daimler-Benz MB 837 Aa-500; Hubraum: 29,9 l; 500 PS (368 kW)",
                           Federung: "Drehstab",
                           Geschwindigkeit: "70 km/h (Straße)",
                           LeistungGewicht: "19,5 PS/t",
                           Reichweite: "ca. 390 km",
                        },
                        quelleImg:
                           "Quelle Image: Bundesarchiv, B 145 Bild-F027425-0001 / Berretty / CC-BY-SA 3.0 (https://commons.wikimedia.org/wiki/File:Bundesarchiv_B_145_Bild-F027425-0001,_Kanonen_Jagdpanzer_1_(KanJPz)_-_Jagdpanzer_Kanone_90_mm.jpg), „Bundesarchiv B 145 Bild-F027425-0001, Kanonen_Jagdpanzer_1 (KanJPz) - Jagdpanzer Kanone 90 mm“, https://creativecommons.org/licenses/by-sa/3.0/de/legalcode",
                        quelleText: "Quelle Text: https://de.wikipedia.org/wiki/Sch%C3%BCtzenpanzer_kurz",
                     },
                  };
               },
            };
            const st = (0, f.Z)(dt, [
               ["render", it],
               ["__scopeId", "data-v-3efe141e"],
            ]);
            var ot = st;
            const ct = { class: "cardTank" },
               ut = { class: "container-fluid", style: { height: "100%" } },
               gt = { class: "row border border-secondary" },
               mt = { class: "row" },
               ht = { class: "col border border-secondary" },
               _t = ["src"],
               wt = { class: "col-7 border border-secondary row align-items-center" },
               pt = { class: "row" },
               zt = { class: "col-4 border border-secondary" },
               bt = { class: "table table-striped" },
               kt = { class: "col-4 border border-secondary" },
               ft = { class: "table table-striped" },
               vt = { class: "col-4 border border-secondary" },
               yt = { class: "table table-striped" },
               Tt = { class: "row border border-secondary" };
            function It(e, n, a, r, l, d) {
               return (
                  (0, t.wg)(),
                  (0, t.iD)("div", ct, [
                     (0, t._)("div", ut, [
                        (0, t._)("div", gt, [(0, t._)("h1", null, (0, i.zw)(l.Raketen_Jagdpanzer_2.name), 1)]),
                        (0, t._)("div", mt, [
                           (0, t._)("div", ht, [(0, t._)("img", { class: "img-fluid", src: l.Raketen_Jagdpanzer_2.img }, null, 8, _t)]),
                           (0, t._)("div", wt, [(0, t._)("h4", null, (0, i.zw)(l.Raketen_Jagdpanzer_2.description), 1)]),
                        ]),
                        (0, t._)("div", pt, [
                           (0, t._)("div", zt, [
                              (0, t._)("h2", null, (0, i.zw)(l.Raketen_Jagdpanzer_2.technical_I), 1),
                              (0, t._)("table", bt, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Raketen_Jagdpanzer_2.AllgemeineEigenschaften,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", kt, [
                              (0, t._)("h2", null, (0, i.zw)(l.Raketen_Jagdpanzer_2.technical_II), 1),
                              (0, t._)("table", ft, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Raketen_Jagdpanzer_2.PanzerungundBewaffnung,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                           (0, t._)("div", vt, [
                              (0, t._)("h2", null, (0, i.zw)(l.Raketen_Jagdpanzer_2.technical_III), 1),
                              (0, t._)("table", yt, [
                                 (0, t._)("tbody", null, [
                                    ((0, t.wg)(!0),
                                    (0, t.iD)(
                                       t.HY,
                                       null,
                                       (0, t.Ko)(
                                          l.Raketen_Jagdpanzer_2.Beweglichkeit,
                                          (e, n) => (
                                             (0, t.wg)(),
                                             (0, t.iD)("tr", { key: n.id }, [
                                                (0, t._)("td", null, (0, i.zw)(n) + ":", 1),
                                                (0, t._)("td", null, (0, i.zw)(e), 1),
                                             ])
                                          )
                                       ),
                                       128
                                    )),
                                 ]),
                              ]),
                           ]),
                        ]),
                        (0, t._)("div", Tt, [
                           (0, t._)("p", null, (0, i.zw)(l.Raketen_Jagdpanzer_2.quelleImg) + ", " + (0, i.zw)(l.Raketen_Jagdpanzer_2.quelleText), 1),
                        ]),
                     ]),
                  ])
               );
            }
            var St = {
               data() {
                  return {
                     Raketen_Jagdpanzer_2: {
                        name: "Raketenjagdpanzer 2",
                        img: a(421),
                        description:
                           "Der Raketenjagdpanzer 2 (RakJPz 2) war ein von der Bundeswehr zwischen 1967 und 1982 eingesetzter Jagdpanzer bzw. Raketenjagdpanzer. Die Prototypentwicklung dauerte von 1963 bis 1965, die Serienfertigung erfolgte von 1966 bis 1967.",
                        technical_I: "AllgemeineEigenschaften",
                        AllgemeineEigenschaften: {
                           Besatzung: "4 (Fahrer, Lenkschütze, Raketenschütze, Kommandant)",
                           Länge: "6,24 m (Wanne)",
                           Breite: "2,98 m",
                           Höhe: "1,98 m (Oberkante Wanne); 2,60 m (mit Startern für SS 11)",
                           Masse: "23 t",
                        },
                        technical_II: "Panzerung und Bewaffnung",
                        PanzerungundBewaffnung: {
                           Panzerung: "Panzerstahl (12–50 mm)",
                           Hauptbewaffnung: "2 × Startanlagen für SS-11-PzAbwLRak",
                           Sekundärbewaffnung: "2 × 7,62-mm-MG3",
                        },
                        technical_III: "Beweglichkeit",
                        Beweglichkeit: {
                           Antrieb: "Vielstoffmotor MB 837 Aa 386 kW (500 PS) ",
                           Federung: " \tTorsionsstab ",
                           Geschwindigkeit: "70 km/h (Straße)",
                           LeistungGewicht: " \t16,8 kW/t ",
                           Reichweite: "ca. 385 km",
                        },
                        quelleImg:
                           "Quelle Image: Banznerfahrer (https://commons.wikimedia.org/wiki/File:Panzermuseum_Munster_2010_0915.JPG), „Panzermuseum Munster 2010 0915“, https://creativecommons.org/licenses/by-sa/3.0/legalcode",
                        quelleText: "Quelle Text: https://de.wikipedia.org/wiki/Raketenjagdpanzer_2",
                     },
                  };
               },
            };
            const Bt = (0, f.Z)(St, [
               ["render", It],
               ["__scopeId", "data-v-7bba65a4"],
            ]);
            var Dt = Bt;
            const Kt = { class: "container-fluid", style: { "background-color": "#ededee" } };
            function Lt(e, n, a, r, l, i) {
               const d = (0, t.up)("NavbarGermanTankDestroyer"),
                  s = (0, t.up)("router-view");
               return (0, t.wg)(), (0, t.iD)("div", Kt, [(0, t.Wm)(d), (0, t.Wm)(s)]);
            }
            var Pt = a(54),
               At = a(610),
               Ht = a(421),
               Gt = a(556),
               Jt = a(642),
               Rt = a(776);
            const Mt = { class: "TankCardCategory" },
               Ft = { class: "row" },
               xt = { class: "navbar d-flex justify-content-around d-print border border-secondary" },
               Et = (0, t._)("img", { src: Pt, width: "200", height: "120", class: "d-inline-block align-top", alt: "" }, null, -1),
               Ct = (0, t._)("div", null, "HS 30", -1),
               Wt = (0, t._)("img", { src: At, width: "200", height: "120", class: "d-inline-block align-top", alt: "" }, null, -1),
               Vt = (0, t._)("div", null, "Kanonenjagdpanzer", -1),
               jt = (0, t._)("img", { src: Ht, width: "200", height: "120", class: "d-inline-block align-top", alt: "" }, null, -1),
               qt = (0, t._)("div", null, "Raketenjagdpanzer", -1),
               Yt = (0, t._)("img", { src: Gt, width: "200", height: "120", class: "d-inline-block align-top", alt: "" }, null, -1),
               Zt = (0, t._)("div", null, "Jaguar 1", -1),
               Nt = (0, t._)("img", { src: Jt, width: "200", height: "120", class: "d-inline-block align-top", alt: "" }, null, -1),
               Ot = (0, t._)("div", null, "Jaguar 2", -1),
               Qt = (0, t._)("img", { src: Rt, width: "200", height: "120", class: "d-inline-block align-top", alt: "" }, null, -1),
               Ut = (0, t._)("div", null, " VT1 (Experimentalfahrzeug 2 Prototypen, Panzerung aus Baustahl) ", -1);
            function Xt(e, n, a, r, l, d) {
               const s = (0, t.up)("router-link");
               return (
                  (0, t.wg)(),
                  (0, t.iD)("div", Mt, [
                     (0, t._)("div", Ft, [(0, t._)("h1", null, (0, i.zw)(l.head), 1)]),
                     (0, t._)("nav", xt, [
                        (0, t.Wm)(s, { to: "/germanTank/componentGermanTankDestroyer/tankCard/HS_30" }, { default: (0, t.w5)(() => [Et, Ct]), _: 1 }),
                        (0, t.Wm)(
                           s,
                           { to: "/germanTank/componentGermanTankDestroyer/tankCard/Kanonen_Jagdpanzer_1" },
                           { default: (0, t.w5)(() => [Wt, Vt]), _: 1 }
                        ),
                        (0, t.Wm)(
                           s,
                           { to: "/germanTank/componentGermanTankDestroyer/tankCard/Raketen_Jagdpanzer_2" },
                           { default: (0, t.w5)(() => [jt, qt]), _: 1 }
                        ),
                        (0, t.Wm)(s, { to: "/germanTank/componentGermanTankDestroyer/tankCard/Jaguar_1" }, { default: (0, t.w5)(() => [Yt, Zt]), _: 1 }),
                        (0, t.Wm)(s, { to: "/germanTank/componentGermanTankDestroyer/tankCard/Jaguar_2" }, { default: (0, t.w5)(() => [Nt, Ot]), _: 1 }),
                        (0, t.Wm)(s, { to: "/germanTank/componentGermanTankDestroyer/tankCard/VT1" }, { default: (0, t.w5)(() => [Qt, Ut]), _: 1 }),
                     ]),
                  ])
               );
            }
            var $t = {
               name: "NavbarGermanTankDestroyer",
               components: {},
               data() {
                  return { head: "Jagdpanzer" };
               },
            };
            const el = (0, f.Z)($t, [["render", Xt]]);
            var nl = el,
               al = { name: "MainTankCategory", components: { NavbarGermanTankDestroyer: nl } };
            const rl = (0, f.Z)(al, [["render", Lt]]);
            var tl = rl;
            const ll = [
                  {
                     path: "/germanTank/componentGermanTankRecon/mainTankCategory/MainGermanReconTank",
                     name: "MainGermanReconTank",
                     component: Ue,
                     children: [
                        {
                           path: "/germanTankRecon/componentGermanTankRecon/tankCard/GermanTankReconFennek",
                           name: "GermanTankReconFennek",
                           component: Y,
                           alias: "/",
                        },
                        { path: "/germanTankRecon/componentGermanTankRecon/tankCard/GermanTankReconLuchs", name: "GermanTankReconLuchs", component: ue },
                        {
                           path: "/germanTankRecon/componentGermanTankRecon/tankCard/GermanTankReconSchuetzenpanzerKurz",
                           name: "GermanTankReconSchuetzenpanzerKurz",
                           component: Le,
                        },
                     ],
                  },
                  {
                     path: "/germanTank/componentMainBattleTank/mainTankCategory/MainGermanBattleTankCategory",
                     name: "MainGermanBattleTankCategory",
                     component: va,
                     children: [
                        { path: "/germanTank/componentMainBattleTank/tankCard/LeopardOne", name: "LeopardOne", component: pn, alias: "/" },
                        { path: "/germanTank/componentMainBattleTank/tankCard/KampfpanzerSeventy", name: "KampfpanzerSeventy", component: Rn },
                        { path: "/germanTank/componentMainBattleTank/tankCard/LeopardTwo", name: "LeopardTwo", component: na },
                     ],
                  },
                  {
                     path: "/germanTank/componentGermanTankDestroyer/mainTankCategory/MainGermanDestroyerTank",
                     name: "MainGermanDestroyerTank",
                     component: tl,
                     children: [
                        { path: "/germanTank/componentGermanTankDestroyer/tankCard/Jaguar_1", name: "Jaguar_1", component: Ca },
                        { path: "/germanTank/componentGermanTankDestroyer/tankCard/Jaguar_2", name: "Jaguar_2", component: ir },
                        { path: "/germanTank/componentGermanTankDestroyer/tankCard/VT1", name: "VT1", component: Ir },
                        { path: "/germanTank/componentGermanTankDestroyer/tankCard/HS_30", component: jr },
                        { path: "/germanTank/componentGermanTankDestroyer/tankCard/Kanonen_Jagdpanzer_1", component: ot },
                        { path: "/germanTank/componentGermanTankDestroyer/tankCard/Raketen_Jagdpanzer_2", component: Dt },
                     ],
                  },
               ],
               il = (0, B.p7)({ history: (0, B.PO)("/germanTank/"), routes: ll });
            var dl = il;
            const sl = (0, r.ri)(S);
            sl.use(dl).mount("#app");
         },
         556: function (e, n, a) {
            e.exports = a.p + "img/Jaguar_1.7ee5271e.jpg";
         },
         642: function (e, n, a) {
            e.exports = a.p + "img/Jaguar_2.30e4deb9.jpg";
         },
         610: function (e, n, a) {
            e.exports = a.p + "img/Kanonenjagdpanzer.f5fec5da.jpg";
         },
         421: function (e, n, a) {
            e.exports = a.p + "img/Raketenjagdpanzer_2.63346f71.jpg";
         },
         54: function (e, n, a) {
            e.exports = a.p + "img/Raketenjagdpanzer_HS_30.ed32dbd1.jpg";
         },
         776: function (e, n, a) {
            e.exports = a.p + "img/VT1_2_1.52aa451a.jpg";
         },
         97: function (e, n, a) {
            e.exports = a.p + "img/Fennek.e3bd2e2e.jpg";
         },
         84: function (e, n, a) {
            e.exports = a.p + "img/Schuetzenpanzer_Halbgruppe.24a2f22e.jpg";
         },
         371: function (e, n, a) {
            e.exports = a.p + "img/Spaehpanzer_2_Luchs_A2.a6cc4ae6.jpg";
         },
         535: function (e, n, a) {
            e.exports = a.p + "img/Leopard_1A5.bbcd79fd.jpg";
         },
         933: function (e, n, a) {
            e.exports = a.p + "img/Leopard_2_A5.245720d7.jpg";
         },
         922: function (e, n, a) {
            e.exports = a.p + "img/MBT_70.8e0f332f.jpg";
         },
      },
      n = {};
   function a(r) {
      var t = n[r];
      if (void 0 !== t) return t.exports;
      var l = (n[r] = { exports: {} });
      return e[r].call(l.exports, l, l.exports, a), l.exports;
   }
   (a.m = e),
      (function () {
         var e = [];
         a.O = function (n, r, t, l) {
            if (!r) {
               var i = 1 / 0;
               for (c = 0; c < e.length; c++) {
                  (r = e[c][0]), (t = e[c][1]), (l = e[c][2]);
                  for (var d = !0, s = 0; s < r.length; s++)
                     (!1 & l || i >= l) &&
                     Object.keys(a.O).every(function (e) {
                        return a.O[e](r[s]);
                     })
                        ? r.splice(s--, 1)
                        : ((d = !1), l < i && (i = l));
                  if (d) {
                     e.splice(c--, 1);
                     var o = t();
                     void 0 !== o && (n = o);
                  }
               }
               return n;
            }
            l = l || 0;
            for (var c = e.length; c > 0 && e[c - 1][2] > l; c--) e[c] = e[c - 1];
            e[c] = [r, t, l];
         };
      })(),
      (function () {
         a.d = function (e, n) {
            for (var r in n) a.o(n, r) && !a.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: n[r] });
         };
      })(),
      (function () {
         a.g = (function () {
            if ("object" === typeof globalThis) return globalThis;
            try {
               return this || new Function("return this")();
            } catch (e) {
               if ("object" === typeof window) return window;
            }
         })();
      })(),
      (function () {
         a.o = function (e, n) {
            return Object.prototype.hasOwnProperty.call(e, n);
         };
      })(),
      (function () {
         a.r = function (e) {
            "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
               Object.defineProperty(e, "__esModule", { value: !0 });
         };
      })(),
      (function () {
         a.p = "/germanTank/";
      })(),
      (function () {
         var e = { 143: 0 };
         a.O.j = function (n) {
            return 0 === e[n];
         };
         var n = function (n, r) {
               var t,
                  l,
                  i = r[0],
                  d = r[1],
                  s = r[2],
                  o = 0;
               if (
                  i.some(function (n) {
                     return 0 !== e[n];
                  })
               ) {
                  for (t in d) a.o(d, t) && (a.m[t] = d[t]);
                  if (s) var c = s(a);
               }
               for (n && n(r); o < i.length; o++) (l = i[o]), a.o(e, l) && e[l] && e[l][0](), (e[l] = 0);
               return a.O(c);
            },
            r = (self["webpackChunktank"] = self["webpackChunktank"] || []);
         r.forEach(n.bind(null, 0)), (r.push = n.bind(null, r.push.bind(r)));
      })();
   var r = a.O(void 0, [998], function () {
      return a(532);
   });
   r = a.O(r);
})();
//# sourceMappingURL=app.9a315c29.js.map
