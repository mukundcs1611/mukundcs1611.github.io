/* Renders the learning log from window.LEARNING_LOG (learning-data.js). No dependencies. */
(function () {
  var TRACKS = { dsa: "DSA", lld: "LLD", hld: "HLD", genai: "GenAI" };
  var ORDER = ["dsa", "lld", "hld", "genai"];
  var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  function parse(d) { var p = d.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function key(dt) {
    return dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
  }
  function fmt(d) { var dt = parse(d); return DAYS[dt.getDay()] + ", " + dt.getDate() + " " + MONTHS[dt.getMonth()]; }
  function fmtShort(d) { var dt = parse(d); return dt.getDate() + " " + MONTHS[dt.getMonth()]; }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  var entries = (window.LEARNING_LOG || []).slice().sort(function (a, b) {
    return (b.to || b.date).localeCompare(a.to || a.date) || ORDER.indexOf(a.track) - ORDER.indexOf(b.track);
  });

  function daysOf(e) {
    var out = [], d = parse(e.date), end = parse(e.to || e.date);
    while (d <= end) { out.push(key(d)); d.setDate(d.getDate() + 1); }
    return out;
  }

  function stats() {
    var s = { dsa: 0, lld: 0, hld: 0, genai: 0, days: {} };
    entries.forEach(function (e) {
      s[e.track] += e.track === "dsa" ? (e.lc ? e.lc.length : 0) : 1;
      daysOf(e).forEach(function (k) { s.days[k] = (s.days[k] || 0) + 1; });
    });
    s.activeDays = Object.keys(s.days).length;
    return s;
  }

  function renderStats(root) {
    var s = stats();
    var items = [
      [(window.LEARNING_TOTALS && window.LEARNING_TOTALS.leetcode) || s.dsa, "LeetCode solved · " + s.dsa + " during the break"],
      [s.lld, "LLD builds & labs"],
      [s.hld + s.genai, "HLD & GenAI builds"],
      [s.activeDays, "days logged"]
    ];
    items.forEach(function (it) {
      var c = el("div", "card stat");
      c.appendChild(el("div", "stat__n", String(it[0])));
      c.appendChild(el("div", "stat__l", it[1]));
      root.appendChild(c);
    });
  }

  function renderHeatmap(root) {
    var s = stats();
    if (!entries.length) return;
    var first = parse(entries.reduce(function (m, e) { return e.date < m ? e.date : m; }, entries[0].date));
    first.setDate(1); // start of the first month with activity
    var start = new Date(first); start.setDate(start.getDate() - ((start.getDay() + 6) % 7)); // back to Monday
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var grid = el("div", "heat__grid");
    grid.setAttribute("role", "img");
    grid.setAttribute("aria-label", s.activeDays + " active days since " + MONTHS[first.getMonth()] + " " + first.getFullYear());
    for (var d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
      var c = el("span", "heat__cell");
      if (d < first) { c.classList.add("heat__cell--pad"); grid.appendChild(c); continue; }
      var n = s.days[key(d)] || 0;
      c.dataset.n = String(Math.min(n, 3));
      c.title = fmt(key(d)) + " — " + (n ? n + " item" + (n > 1 ? "s" : "") : "no entry");
      grid.appendChild(c);
    }
    var wrap = el("div", "heat"); wrap.appendChild(grid); root.appendChild(wrap);
    var lg = el("div", "heat__legend"); lg.appendChild(el("span", null, "Less"));
    [0, 1, 2, 3].forEach(function (n) { var c = el("span", "heat__cell"); c.dataset.n = String(n); lg.appendChild(c); });
    lg.appendChild(el("span", null, "More"));
    root.appendChild(lg);
  }

  function renderEntry(e) {
    var a = el("article", "entry");
    a.appendChild(el("span", "tag tag--" + e.track, TRACKS[e.track]));
    a.appendChild(el("h3", null, e.title));
    if (e.to && e.to !== e.date) a.appendChild(el("p", null, fmtShort(e.date) + " – " + fmtShort(e.to)));
    if (e.note) a.appendChild(el("p", null, e.note));
    if (e.lc && e.lc.length) {
      var ul = el("ul", "lc");
      e.lc.forEach(function (p) {
        var li = el("li"), link = el("a");
        link.href = "https://leetcode.com/problems/" + p[1] + "/";
        link.target = "_blank"; link.rel = "noopener";
        link.appendChild(el("b", null, String(p[0])));
        link.appendChild(document.createTextNode(p[2]));
        li.appendChild(link); ul.appendChild(li);
      });
      a.appendChild(ul);
    }
    if (e.link) {
      var l = el("a", "entry__link", e.link.label + " →");
      l.href = e.link.href; l.target = "_blank"; l.rel = "noopener";
      a.appendChild(l);
    }
    return a;
  }

  function renderLog(root, opts) {
    opts = opts || {};
    root.textContent = "";
    var list = entries.filter(function (e) { return !opts.track || e.track === opts.track; });
    if (opts.limit) list = list.slice(0, opts.limit);
    var byDay = [], idx = {};
    list.forEach(function (e) {
      var k = e.to || e.date;
      if (!(k in idx)) { idx[k] = byDay.length; byDay.push({ day: k, items: [] }); }
      byDay[idx[k]].items.push(e);
    });
    byDay.forEach(function (g) {
      var li = el("li", "log__day");
      var t = el("time", "log__date", fmt(g.day)); t.dateTime = g.day;
      li.appendChild(t);
      g.items.forEach(function (e) { li.appendChild(renderEntry(e)); });
      root.appendChild(li);
    });
  }

  function renderFilters(root, logRoot) {
    var opts = [["", "All"]].concat(ORDER.map(function (t) { return [t, TRACKS[t]]; }));
    var initial = (location.hash.match(/track=(\w+)/) || [])[1] || "";
    if (!TRACKS[initial]) initial = "";
    opts.forEach(function (o) {
      var b = el("button", null, o[1]);
      b.type = "button";
      b.setAttribute("aria-pressed", String(o[0] === initial));
      b.addEventListener("click", function () {
        root.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        renderLog(logRoot, { track: o[0] });
        try { history.replaceState(null, "", o[0] ? "#track=" + o[0] : location.pathname); } catch (_) {}
      });
      root.appendChild(b);
    });
    renderLog(logRoot, { track: initial });
  }

  function renderNext(root) {
    (window.LEARNING_NEXT || []).forEach(function (n) {
      var li = el("li");
      li.appendChild(el("span", "tag tag--" + n.track, TRACKS[n.track]));
      li.appendChild(el("span", null, n.title));
      root.appendChild(li);
    });
  }

  function mount(id, fn) { var n = document.getElementById(id); if (n) fn(n); }
  mount("learning-stats", renderStats);
  mount("learning-heat", renderHeatmap);
  mount("learning-next", renderNext);
  mount("learning-latest", function (n) { renderLog(n, { limit: 4 }); });
  var f = document.getElementById("learning-filters"), lr = document.getElementById("learning-log");
  if (f && lr) renderFilters(f, lr);
})();
