"use client";

import { useEffect } from "react";

/** Progressive enhancements; content, video controls and FAQ work without JS. */
export default function LandingEnhancements() {
  useEffect(() => {
    const header = document.getElementById("header");
    const burger = document.getElementById("burger");
    const menu = document.getElementById("mobile-menu");
    const frame = document.querySelector<HTMLElement>(".oi-hero__frame");
    const rail = document.querySelector<HTMLElement>(".oi-track__rail");
    const fill = document.querySelector<HTMLElement>(".oi-track__fill");
    const rows = [...document.querySelectorAll<HTMLElement>(".oi-track__row")];
    const views = [...document.querySelectorAll<HTMLElement>(".oi-frame__view")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 620px)");
    let animation = 0;

    const setMenu = (open: boolean) => {
      if (!menu || !burger) return;
      menu.hidden = !open;
      menu.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    };
    const toggleMenu = () => setMenu(menu?.hidden ?? false);
    const closeMenu = (event: MouseEvent) => {
      if ((event.target as Element).closest("a")) setMenu(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu && !menu.hidden) {
        setMenu(false);
        burger?.focus();
      }
    };
    const update = () => {
      animation = 0;
      header?.classList.toggle("scrolled", window.scrollY > 60);
      if (frame) {
        const progress = Math.max(0, Math.min(1, (innerHeight * .5 - frame.getBoundingClientRect().top) / (innerHeight * .8)));
        const eased = 1 - Math.pow(1 - progress, 1.5);
        frame.style.transform = reduce.matches || mobile.matches ? "none" : `rotateX(${20 * (1 - eased)}deg) scale(${1.05 - .05 * eased})`;
      }
      if (rail && fill) {
        const rect = rail.getBoundingClientRect();
        const height = Math.max(0, Math.min(rect.height, innerHeight * .34 - rect.top));
        fill.style.height = `${height}px`;
        fill.style.opacity = height > 2 ? "1" : "0";
        rows.forEach(row => row.querySelector(".oi-track__dot")?.classList.toggle("is-on", height >= row.offsetTop + 10));
      }
    };
    const schedule = () => { if (!animation) animation = requestAnimationFrame(update); };
    const resize = () => {
      if (innerWidth > 1024) setMenu(false);
      views.forEach(view => view.closest(".oi-frame")?.classList.toggle("is-scrollable", view.scrollWidth > view.clientWidth + 4));
      schedule();
    };

    burger?.addEventListener("click", toggleMenu);
    menu?.addEventListener("click", closeMenu);
    document.addEventListener("keydown", escape);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    reduce.addEventListener("change", schedule);
    views.forEach(view => { view.tabIndex = 0; view.setAttribute("aria-label", "Démonstration Replikr, défilement horizontal"); });
    resize();
    update();
    return () => {
      burger?.removeEventListener("click", toggleMenu);
      menu?.removeEventListener("click", closeMenu);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      reduce.removeEventListener("change", schedule);
      cancelAnimationFrame(animation);
    };
  }, []);
  return null;
}
