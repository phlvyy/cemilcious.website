// =========================================================
// Cemilcious — site behavior
//
// EDIT HERE: this CONTACT object is the single place to update
// the WhatsApp number and social media links. Every button and
// link on the page reads from these values — replace the
// placeholders below with the real ones and everything updates
// automatically. Leave a value as "..." to hide that social link.
// =========================================================
const CONTACT = {
  whatsapp: "628XXXXXXXXXX",       // format: 62 + nomor tanpa angka 0 di depan
  instagram: "https://www.instagram.com/cemil.cious?stkn=bGx3NjZ6MWcyeTM3",
  tiktok: "https://tiktok.com/@...",
  facebook: "...",
  shopee: "...",
  tokopedia: "...",
};

(function () {
  "use strict";

  /* ---- WhatsApp helpers ---- */
  function waLink(message) {
    return "https://wa.me/" + CONTACT.whatsapp + "?text=" + encodeURIComponent(message);
  }

  function wireOrderButtons() {
    document.querySelectorAll("[data-wa-order]").forEach(function (el) {
      var product = el.getAttribute("data-wa-order");
      var message = product
        ? "Halo Cemilcious, saya ingin memesan " + product + "."
        : "Halo Cemilcious, saya ingin memesan basreng Cemilcious.";
      el.setAttribute("href", waLink(message));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  /* ---- Social links from CONTACT ---- */
  function isPlaceholder(value) {
    return !value || value.trim() === "..." || value.trim() === "";
  }

  function wireSocialLinks() {
    document.querySelectorAll("[data-social]").forEach(function (el) {
      var key = el.getAttribute("data-social");
      var value = CONTACT[key];
      if (isPlaceholder(value)) {
        el.setAttribute("aria-disabled", "true");
        el.style.opacity = "0.45";
        el.addEventListener("click", function (e) { e.preventDefault(); });
        return;
      }
      var href = value;
      if (key === "facebook" || key === "shopee" || key === "tokopedia") {
        href = /^https?:\/\//.test(value) ? value : "https://" + value;
      }
      el.setAttribute("href", href);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  /* ---- Mobile menu ---- */
  function wireMobileMenu() {
    var toggle = document.querySelector(".nav-toggle");
    var closeBtn = document.querySelector(".mobile-menu-close");
    var menu = document.querySelector(".mobile-menu");
    if (!toggle || !menu) return;

    function open() {
      menu.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    function close() {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    toggle.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });
  }

  /* ---- Sticky navbar shadow ---- */
  function wireNavbarScroll() {
    var nav = document.querySelector(".navbar");
    if (!nav) return;
    function update() {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---- Back to top ---- */
  function wireBackToTop() {
    var btn = document.querySelector(".to-top");
    if (!btn) return;
    function update() {
      btn.classList.toggle("is-visible", window.scrollY > 640);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---- Footer year ---- */
  function wireYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireOrderButtons();
    wireSocialLinks();
    wireMobileMenu();
    wireNavbarScroll();
    wireBackToTop();
    wireYear();
  });
})();
