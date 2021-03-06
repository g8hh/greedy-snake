(function (r, s) {
    "use strict";

    function c(e, t, n, i) {
        ga("send", "event", e, t, n, i)
    }
    r.onerror = function (e, t, n) {
        if (e) {
            c("Error", e, t && n ? "[" + t + ":" + n + "]" : "", true)
        }
        return false
    };
    r.requestAnimationFrame = r.requestAnimationFrame || r.webkitRequestAnimationFrame || r.mozRequestAnimationFrame || r.msRequestAnimationFrame || function (e) {
        return setTimeout(e, 1e3 / 60)
    };
    r.cancelAnimationFrame = r.cancelAnimationFrame || r.webkitCancelAnimationFrame || r.mozCancelAnimationFrame || r.msCancelAnimationFrame || function (e) {
        clearTimeout(e)
    };
    r.AudioContext = r.AudioContext || r.webkitAudioContext;
    var e = false;
    try {
        var t = Object.defineProperty({}, "passive", {
            get: function () {
                e = true
            }
        });
        r.addEventListener("_", null, t);
        r.removeEventListener("_", null, t)
    } catch (e) {}
    var n = function (e) {
        try {
            var t = "_";
            e.setItem(t, t);
            e.removeItem(t);
            return true
        } catch (e) {
            return false
        }
    }(r.localStorage);
//    if (r.location !== r.top.location || r.location.href && !r.location.href.match(/playsnake\.org|192\.168/)) {
//        top.location.href = "https://playsnake.org/"
//    }
    (function (e, t, n, i, s, a, o) {
        e["GoogleAnalyticsObject"] = s;
        e[s] = e[s] || function () {
            (e[s].q = e[s].q || []).push(arguments)
        }, e[s].l = 1 * new Date;
        a = t.createElement(n), o = t.getElementsByTagName(n)[0];
        a.async = 1;
        a.src = i;
        o.parentNode.insertBefore(a, o)
    })(r, s, "script", "", "ga");
    var i = s.getElementById("consent");
    var a = !!i;
    var o = "UA-56095-11";
    r["ga-disable-" + o] = a;
    ga("set", "anonymizeIp", true);
    ga("create", o, "auto");

    function l() {
        (r.adsbygoogle || []).pauseAdRequests = 0;
        r["ga-disable-" + o] = false;
        ga("send", "pageview");
        if (a) {
            s.body.classList.add("cookies-consent")
        }
    }

    function u() {
        if (!a || n && localStorage.getItem("consent")) {
            l()
        } else {
            i.addEventListener("click", function () {
                l();
                if (n) {
                    localStorage.setItem("consent", true)
                }
            })
        }
    }

    function f(e, t) {
        this.x = e;
        this.y = t
    }

    function h() {
        this.direction = p.DOWN;
        this.nextDirection = p.DOWN;
        this.cells = [];
        this.reset()
    }
    h.prototype.reset = function () {
        this.direction = p.DOWN;
        this.nextDirection = p.DOWN;
        this.cells = [new f(10, 2), new f(10, 1), new f(10, 0)]
    };
    h.prototype.containsCell = function (e, t) {
        for (var n = this.cells.length; n--;) {
            var i = this.cells[n];
            if (i.x === e && i.y === t) {
                return true
            }
        }
        return false
    };
    h.prototype.render = function (e) {
        for (var t = w.cells.length; t--;) {
            var n = w.cells[t];
            if (n.x >= 0 && n.x < P.width && n.y >= 0 && n.y < P.height) {
                var i = k[n.x][n.y];
                if (e) {
                    i.classList.add("snake")
                } else {
                    i.classList.remove("snake")
                }
            }
        }
    };
    h.prototype.move = function () {
        for (var e = this.cells.length - 1; e > 0; e--) {
            this.cells[e].x = this.cells[e - 1].x;
            this.cells[e].y = this.cells[e - 1].y
        }
        switch (this.nextDirection) {
            case p.LEFT:
                this.cells[0].x--;
                break;
            case p.RIGHT:
                this.cells[0].x++;
                break;
            case p.UP:
                this.cells[0].y--;
                break;
            case p.DOWN:
                this.cells[0].y++;
                break
        }
        this.direction = this.nextDirection;
        if (this.cells[0].x < 0 || this.cells[0].x >= P.width || this.cells[0].y < 0 || this.cells[0].y >= P.height) {
            X();
            return
        }
        for (var t = 1; t < this.cells.length; t++) {
            if (this.cells[0].x === this.cells[t].x && this.cells[0].y === this.cells[t].y) {
                X();
                return
            }
        }
        if (this.cells[0].x === D.x && this.cells[0].y === D.y) {
            var n = this.cells.length - 1;
            this.cells.push(new f(this.cells[n].x, this.cells[n].y));
            O[b].score += D.score;
            Y();
            v("high");
            D.eat();
            D.generate()
        } else if (D.score > 5) {
            D.score -= 5
        }
    };

    function d() {
        this.x = 0;
        this.y = 0;
        this.score = 0
    }
    d.prototype.eat = function () {
        k[this.x][this.y].classList.remove("food")
    };
    d.prototype.generate = function () {
        if (w.cells.length < P.width * P.height - 1) {
            var e, t;
            do {
                e = Math.floor(Math.random() * P.width);
                t = Math.floor(Math.random() * P.height)
            } while (w.containsCell(e, t));
            k[e][t].classList.add("food");
            this.x = e;
            this.y = t;
            this.score = 100
        }
    };

    function m(e, t) {
        this.name = e;
        this.speed = t;
        this.score = 0
    }
    m.prototype.getBestScore = function () {
        if (n) {
            return parseInt(localStorage.getItem("score" + b), 10) || 0
        }
        return 0
    };

    function g(t) {
        var e = new XMLHttpRequest;
        e.open("GET", "./assets/audio/" + t + ".mp3", true);
        e.responseType = "arraybuffer";
        e.onload = function () {
            A.decodeAudioData(e.response, function (e) {
                N[t] = e
            }, function () {})
        };
        e.send()
    }

    function v(e) {
        if (I || !N[e]) {
            return
        }
        if (A && A.resume) {
            A.resume()
        }
        var t = A.createBufferSource();
        t.buffer = N[e];
        t.connect(A.destination);
        if (t.start) {
            t.start(0)
        } else {
            t.noteOn(0)
        }
    }
    var y = {},
        p = {
            UP: 0,
            DOWN: 1,
            LEFT: 2,
            RIGHT: 3
        },
        x = {
            INTRO: "intro",
            COUNTDOWN: "countdown",
            PLAYING: "playing",
            ENDED: "ended",
            PAUSED: "paused"
        },
        L = x.INTRO,
        w, D, N = [],
        A, I = false,
        E, S, T = 0,
        b = 0,
        O = [new m("Slug", 150), new m("Worm", 100), new m("Python", 50)],
        k = [[]],
        P = {
            width: 21,
            height: 15
        },
        C = {
            x: 0,
            y: 0
        };

    function G() {
        s.addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                case 38:
                case 87:
                    if (L === x.PLAYING && w.direction !== p.DOWN) {
                        w.nextDirection = p.UP
                    }
                    break;
                case 40:
                case 83:
                    if (L === x.PLAYING && w.direction !== p.UP) {
                        w.nextDirection = p.DOWN
                    }
                    break;
                case 37:
                case 65:
                    if (L === x.PLAYING && w.direction !== p.RIGHT) {
                        w.nextDirection = p.LEFT
                    }
                    break;
                case 39:
                case 68:
                    if (L === x.PLAYING && w.direction !== p.LEFT) {
                        w.nextDirection = p.RIGHT
                    }
                    break;
                case 77:
                    H();
                    break;
                case 32:
                case 80:
                    Z();
                    break
            }
        })
    }

    function q() {
        s.addEventListener("touchstart", function (e) {
            if (L === x.PLAYING || L === x.COUNTDOWN) {
                e.preventDefault()
            }
            C.x = e.changedTouches[0].screenX;
            C.y = e.changedTouches[0].screenY
        }, e ? {
            passive: false
        } : false);
        s.addEventListener("touchmove", function (e) {
            var t = e.changedTouches[0].screenX - C.x,
                n = e.changedTouches[0].screenY - C.y;
            if (L !== x.PLAYING || Math.sqrt(t * t + n * n) < 22) {
                return
            }
            C.x = e.changedTouches[0].screenX;
            C.y = e.changedTouches[0].screenY;
            var i = (Math.atan2(n, t) / Math.PI * 180 + 360) % 360;
            if (i >= 45 && i < 135) {
                if (w.direction !== p.UP) {
                    w.nextDirection = p.DOWN
                }
            } else if (i >= 135 && i < 225) {
                if (w.direction !== p.RIGHT) {
                    w.nextDirection = p.LEFT
                }
            } else if (i >= 225 && i < 315) {
                if (w.direction !== p.DOWN) {
                    w.nextDirection = p.UP
                }
            } else if (i >= 315 || i < 45) {
                if (w.direction !== p.LEFT) {
                    w.nextDirection = p.RIGHT
                }
            }
        }, e ? {
            passive: true
        } : false);
        y.board.addEventListener("touchstart", function (e) {
            if (L === x.PLAYING || L === x.COUNTDOWN) {
                e.preventDefault()
            }
        }, e ? {
            passive: false
        } : false)
    }

    function F(e) {
        j(parseInt(e.target.dataset.level, 10))
    }

    function R() {
        var e = this.dataset && this.dataset.url ? this.dataset.url : "",
            t = this.dataset && this.dataset.text ? this.dataset.text : "",
            n = O[b].score;
        t = t.replace("%d", n);
        if (navigator.share && r.Promise) {
            navigator.share({
                title: "Snake",
                text: t,
                url: e
            }).then(function () {
                c("Share", "Navigator", n)
            }).catch(function () {})
        } else {
            var i = 600,
                s = 340,
                a = screenX + (innerWidth - i) / 2,
                o = screenY + (innerHeight - s) / 2;
//            r.open("https://neave.com/share/?url=" + encodeURIComponent(e) + "&text=" + t, "snake-share", "resizable=yes,toolbar=no,scrollbars=yes,status=no,width=" + i + ",height=" + s + ",left=" + a + ",top=" + o);
            c("Share", "Social", n)
        }
    }

    function U() {
        y.board.addEventListener("mousedown", function (e) {
            if (L === x.PLAYING || L === x.PAUSED) {
                Z()
            } else if (L === x.ENDED) {
                y.game.classList.remove("best", "share");
                K(x.INTRO);
                z()
            }
        }, false);
        for (var e = y.introButtons.length; e--;) {
            y.introButtons[e].addEventListener("click", F, false)
        }
        y.share.addEventListener("click", R, false)
    }

    function W() {
        y.level.textContent = O[b].name
    }

    function Y() {
        y.score.textContent = O[b].score.toString()
    }

    function B() {
        y.best.textContent = O[b].getBestScore().toString()
    }

    function M() {
        for (var e = y.mute.length; e--;) {
            y.mute[e].style.display = I ? "none" : ""
        }
    }

    function H() {
        I = !I;
        if (n) {
            try {
                localStorage.setItem("muted", I.toString())
            } catch (e) {}
        }
        M();
        c("Mute", I ? "muted" : "unmuted")
    }

    function X() {
        te();
        K(x.ENDED);
        v("die");
        if (n) {
            if (O[b].score > O[b].getBestScore()) {
                try {
                    localStorage.setItem("score" + b, O[b].score)
                } catch (e) {}
                y.game.classList.add("best")
            }
        }
        B();
        if (O[b].score > 0) {
            y.game.classList.add("share")
        }
        c("Game", "ended", O[b].name.toLowerCase(), O[b].score)
    }

    function z() {
        w.render(false);
        w.reset();
        D.eat()
    }

    function j(e) {
        if (L !== x.INTRO) {
            return
        }
        b = isNaN(e) ? 1 : e;
        O[b].score = 0;
        W();
        Y();
        B();
        K(x.COUNTDOWN);
        T = 4;
        _();
        c("Game", "started", O[b].name.toLowerCase())
    }

    function _() {
        T--;
        if (T > 0) {
            v("low");
            y.countdown.textContent = T.toString();
            setTimeout(_, 500)
        } else {
            v("high");
            y.countdown.textContent = "GO!";
            setTimeout(J, 500)
        }
    }

    function J() {
        K(x.PLAYING);
        D.generate();
        ee()
    }

    function K(e) {
        y.game.classList.remove(L);
        y.game.classList.add(e);
        L = e
    }

    function Q() {
        K(x.PAUSED);
        te()
    }

    function V() {
        K(x.PLAYING);
        ee()
    }

    function Z() {
        if (L === x.PLAYING) {
            Q()
        } else if (L === x.PAUSED) {
            V()
        }
    }

    function $() {
        S = requestAnimationFrame(ee)
    }

    function ee() {
        E = setTimeout($, O[b].speed);
        w.render(false);
        w.move();
        w.render(true)
    }

    function te() {
        clearTimeout(E);
        cancelAnimationFrame(S)
    }

    function ne() {
        for (var e = 0; e < P.width * P.height; e++) {
            var t = e % P.width,
                n = Math.floor(e / P.width) % P.height,
                i = s.createElement("div");
            if (n === 0) {
                k[t] = []
            }
            k[t][n] = i;
            i.className = "cell";
            y.board.appendChild(i)
        }
    }
    s.addEventListener("DOMContentLoaded", function () {
        y = {
            game: s.querySelector(".game"),
            board: s.querySelector(".game .board"),
            score: s.querySelector(".info .score"),
            best: s.querySelector(".info .best"),
            level: s.querySelector(".info .level"),
            share: s.querySelector(".info.share"),
            introButtons: s.querySelectorAll(".game nav .level"),
            countdown: s.querySelector(".game h2.countdown"),
            muteButton: s.querySelector(".mute"),
            mute: s.querySelectorAll(".mute path"),
            privacy: s.querySelector(".privacy")
        };
        ne();
        G();
        q();
        U();
        if (y.game.dataset && y.game.dataset.level0) {
            O[0].name = y.game.dataset.level0;
            O[1].name = y.game.dataset.level1;
            O[2].name = y.game.dataset.level2
        }
        if (r.AudioContext) {
            A = new AudioContext;
            g("low");
            g("high");
            g("die");
            if (n) {
                try {
                    I = localStorage.getItem("muted") === "true"
                } catch (e) {
                    I = false
                }
            }
            M();
            y.muteButton.addEventListener("touchstart", function (e) {
                e.preventDefault();
                H()
            }, e ? {
                passive: false
            } : false);
            y.muteButton.addEventListener("click", function (e) {
                e.preventDefault();
                H()
            }, e ? {
                passive: false
            } : false)
        }
        w = new h;
        D = new d;
        u();
        z()
    })
})(window, document);
