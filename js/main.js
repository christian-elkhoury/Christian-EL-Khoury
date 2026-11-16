/* =========================================================
   CV — Christian EL KHOURY
   Amélioration progressive : le site reste utilisable sans JS.
   ========================================================= */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ----- Menu mobile ----- */
  var toggle = document.querySelector(".nav__toggle");
  var navList = document.getElementById("nav-list");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    navList.classList.toggle("is-open", open);
  }

  if (toggle && navList) {
    toggle.hidden = false;

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Fermer le menu après un clic sur un lien
    navList.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    // Fermer avec la touche Échap et rendre le focus au bouton
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* ----- Section active dans la navigation ----- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav__list a"));
  var sections = links
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  function markActive(id) {
    links.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) markActive(entry.target.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ----- Bouton "Télécharger le CV (PDF)" ----- */
  document.querySelectorAll(".js-print").forEach(function (button) {
    button.hidden = false;
    button.addEventListener("click", function () { window.print(); });
  });
})();
