"use client";

import { useEffect } from "react";

/** Progressive enhancements; content and FAQ remain available without JS. */
export default function LandingEnhancements() {
  useEffect(() => {
    // No tracking cookie: carry the partner code and campaign only in the URL.
    // Delegation also covers price links rerendered when changing billing period.
    const carryAttribution = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      const target = new URL(anchor.href, window.location.href);
      if (target.origin !== "https://app.replikr.io") return;
      const source = new URLSearchParams(window.location.search);
      for (const key of ["via", "utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
        const value = source.get(key);
        if (value && value.length <= 200) target.searchParams.set(key, value);
      }
      anchor.href = target.toString();
    };
    document.addEventListener("click", carryAttribution, true);
    document.addEventListener("auxclick", carryAttribution, true);
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
    // Sur téléphone et tablette, l'étape s'allume dès qu'elle arrive au milieu
    // de l'écran : au tiers haut (réglage PC), elle s'allumait trop tard.
    const narrow = window.matchMedia("(max-width: 1000px)");
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
        const height = Math.max(0, Math.min(rect.height, innerHeight * (narrow.matches ? .6 : .34) - rect.top));
        fill.style.height = `${height}px`;
        fill.style.opacity = height > 2 ? "1" : "0";
        rows.forEach(row => {
          const on = height >= row.offsetTop + 10;
          row.querySelector(".oi-track__dot")?.classList.toggle("is-on", on);
          row.querySelector(".oi-track__label")?.classList.toggle("is-on", on);
        });
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
    // Muted demos play automatically in view, without manual playback controls.
    // Pause off screen, in a background tab, or when reduced motion is requested.
    const cleanups: Array<() => void> = [];
    const videos = [...document.querySelectorAll<HTMLVideoElement>(".oi-step-video")];
    const visibleVideos = new Set<HTMLVideoElement>();
    const syncVideos = () => videos.forEach(video => {
      if (visibleVideos.has(video) && !reduce.matches && !document.hidden) video.play().catch(() => {});
      else video.pause();
    });
    const watcher = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        const video = target as HTMLVideoElement;
        if (isIntersecting) visibleVideos.add(video);
        else visibleVideos.delete(video);
      });
      syncVideos();
    }, { threshold: .35 });
    videos.forEach(video => { video.controls = false; video.muted = true; watcher.observe(video); });
    reduce.addEventListener("change", syncVideos);
    document.addEventListener("visibilitychange", syncVideos);
    syncVideos();
    cleanups.push(() => {
      reduce.removeEventListener("change", syncVideos);
      document.removeEventListener("visibilitychange", syncVideos);
      videos.forEach(video => video.pause());
    });

    // This is a local illustration only: no profile is fetched from the landing.
    const profileScan = document.querySelector<HTMLElement>(".profile-scan");
    if (profileScan) {
      let scanVisible = false;
      const syncScan = () => {
        profileScan.classList.toggle("is-paused", !scanVisible || reduce.matches || document.hidden);
      };
      const scanWatcher = new IntersectionObserver(entries => {
        scanVisible = entries.some(entry => entry.isIntersecting);
        syncScan();
      }, { threshold: .25 });
      profileScan.classList.add("is-enhanced");
      reduce.addEventListener("change", syncScan);
      document.addEventListener("visibilitychange", syncScan);
      scanWatcher.observe(profileScan);
      syncScan();
      cleanups.push(() => {
        scanWatcher.disconnect();
        reduce.removeEventListener("change", syncScan);
        document.removeEventListener("visibilitychange", syncScan);
        profileScan.classList.remove("is-enhanced");
      });
    }
    const documentDemo = document.querySelector<HTMLElement>(".document-demo");
    if (documentDemo) {
      let visible = false;
      let played = false;
      let replayFrame = 0;
      const syncDemo = () => {
        documentDemo.classList.toggle("is-paused", !visible || reduce.matches || document.hidden);
        if (reduce.matches) documentDemo.classList.remove("is-animating");
      };
      const replayDemo = () => {
        if (reduce.matches) return;
        played = true;
        cancelAnimationFrame(replayFrame);
        documentDemo.classList.remove("is-animating");
        replayFrame = requestAnimationFrame(() => {
          replayFrame = requestAnimationFrame(() => {
            documentDemo.classList.add("is-animating");
            syncDemo();
          });
        });
      };
      const onDemoEnd = (event: AnimationEvent) => {
        if (event.animationName === "document-post-in") documentDemo.classList.remove("is-animating");
      };
      const demoWatcher = new IntersectionObserver(entries => {
        visible = entries.some(entry => entry.isIntersecting);
        syncDemo();
        if (visible && !played) replayDemo();
      }, { threshold: .2 });
      documentDemo.addEventListener("animationend", onDemoEnd);
      reduce.addEventListener("change", syncDemo);
      document.addEventListener("visibilitychange", syncDemo);
      demoWatcher.observe(documentDemo);
      syncDemo();
      cleanups.push(() => {
        cancelAnimationFrame(replayFrame);
        demoWatcher.disconnect();
        documentDemo.removeEventListener("animationend", onDemoEnd);
        reduce.removeEventListener("change", syncDemo);
        document.removeEventListener("visibilitychange", syncDemo);
        documentDemo.classList.remove("is-animating");
      });
    }
    // Feed carousels advance on their own while visible; a swipe still works (native scroll).
    document.querySelectorAll<HTMLElement>("[data-carousel]").forEach(carousel => {
      const track = carousel.querySelector<HTMLElement>(".feed__track");
      const index = carousel.querySelector<HTMLElement>("[data-carousel-index]");
      if (!track || !index) return;
      const count = track.children.length;
      const current = () => Math.round(track.scrollLeft / track.clientWidth);
      const sync = () => {
        const i = current();
        index.textContent = String(i + 1);
        carousel.style.setProperty("--slide", String(i + 1));
      };
      const advance = () => track.scrollTo({
        left: ((current() + 1) % count) * track.clientWidth,
        behavior: reduce.matches ? "auto" : "smooth",
      });
      let timer = 0;
      let kick = 0;
      let visible = false;
      // Starts as soon as the phone enters the screen: a quick first turn, then every 2.8 s.
      const syncPlay = () => {
        window.clearInterval(timer);
        window.clearTimeout(kick);
        timer = 0;
        if (!visible || reduce.matches || document.hidden) return;
        kick = window.setTimeout(() => {
          advance();
          timer = window.setInterval(advance, 2800);
        }, 1000);
      };
      const playWatcher = new IntersectionObserver(entries => {
        visible = entries.some(entry => entry.isIntersecting);
        syncPlay();
      }, { threshold: .15 });
      track.addEventListener("scroll", sync, { passive: true });
      document.addEventListener("visibilitychange", syncPlay);
      reduce.addEventListener("change", syncPlay);
      playWatcher.observe(carousel);
      sync();
      cleanups.push(() => {
        window.clearInterval(timer);
        window.clearTimeout(kick);
        playWatcher.disconnect();
        track.removeEventListener("scroll", sync);
        document.removeEventListener("visibilitychange", syncPlay);
        reduce.removeEventListener("change", syncPlay);
      });
    });
    resize();
    update();
    return () => {
      document.removeEventListener("click", carryAttribution, true);
      document.removeEventListener("auxclick", carryAttribution, true);
      burger?.removeEventListener("click", toggleMenu);
      menu?.removeEventListener("click", closeMenu);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      reduce.removeEventListener("change", schedule);
      watcher.disconnect();
      cleanups.forEach(cleanup => cleanup());
      cancelAnimationFrame(animation);
    };
  }, []);
  return null;
}
