(function () {
  const r = document.createElement("link").relList;
  if (r && r.supports && r.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) a(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === "childList")
        for (const n of t.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && a(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (t.credentials = "include")
        : e.crossOrigin === "anonymous"
        ? (t.credentials = "omit")
        : (t.credentials = "same-origin"),
      t
    );
  }
  function a(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = o(e);
    fetch(e.href, t);
  }
})();
const d = document.querySelector("#form"),
  m = document.getElementById("send-form"),
  u = document.getElementById("reset-form"),
  c = document.querySelector("#developer-list");
function f(l) {
  if ((l.preventDefault(), l.target === m)) {
    const r = document.getElementById("firstName"),
      o = document.getElementById("lastName"),
      a = document.getElementById("programmingLanguage");
    if (r.value === "" || o.value === "") {
      c.innerHTML = "";
      const e = document.createElement("tr"),
        t = document.createElement("td");
      (t.textContent = "Please fill out all fields!"),
        (t.style.color = "red"),
        e.appendChild(t),
        c.appendChild(e);
    } else {
      let e = { firstName: r.value, lastName: o.value, language: a.value };
      if (localStorage.getItem("developers") === null) {
        let n = [];
        n.push(e), localStorage.setItem("developers", JSON.stringify(n));
      } else {
        let n = localStorage.getItem("developers");
        if (n) {
          let s = JSON.parse(n);
          s.push(e), localStorage.setItem("developers", JSON.stringify(s));
        }
      }
      i(), d.reset();
    }
  }
}
function g() {
  localStorage.clear(), i();
}
function i() {
  let l = localStorage.getItem("developers");
  if (((c.innerHTML = ""), l !== null)) {
    let r = JSON.parse(l);
    p(),
      r.forEach((o) => {
        const a = document.createElement("tr"),
          e = document.createElement("td"),
          t = document.createElement("td"),
          n = document.createElement("td");
        (e.textContent = o.firstName),
          (t.textContent = o.lastName),
          (n.textContent = o.language),
          a.append(e, t, n),
          c.appendChild(a);
      });
  }
}
function p() {
  const l = document.createElement("tr"),
    r = document.createElement("th"),
    o = document.createElement("th"),
    a = document.createElement("th");
  (r.textContent = "First Name"),
    (o.textContent = "Last Name"),
    (a.textContent = "Programming language"),
    console.log(l),
    l.append(r, o, a),
    c.appendChild(l);
}
d.addEventListener("click", f);
u.addEventListener("click", g);
