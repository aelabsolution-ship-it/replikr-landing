"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

/** Staged notebook demo using Hybana's actual infographic renderer. No live AI or publishing call. */
export default function HeroProductMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".hero-motion");
    const viewport = root?.querySelector<HTMLElement>(".hero-motion__viewport");
    if (!root || !viewport) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let timeline: gsap.core.Timeline;
    let ctx: gsap.Context;
    const sync = () => {
      if (!timeline) return;
      if (reduce.matches) timeline.pause(25);
      else if (!visible || document.hidden) timeline.pause();
      else if (timeline.progress() === 1) timeline.restart();
      else timeline.play();
    };
    const compose = () => {
      ctx?.revert();
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(root);
        // Measure anchors once. Everything lives in the 1280×800 app artboard.
        const app = root.querySelector<HTMLElement>(".hm-app")!;
        const appBox = app.getBoundingClientRect();
        const ratio = appBox.width / 1280;
        const bounds = (selector: string) => {
          const box = root.querySelector<HTMLElement>(selector)!.getBoundingClientRect();
          return { x: (box.x - appBox.x) / ratio, y: (box.y - appBox.y) / ratio,
            width: box.width / ratio, height: box.height / ratio };
        };
        const point = (selector: string) => {
          const b = bounds(selector);
          return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
        };
        const produce = point(".hm-produce");
        const input = point(".hm-input");
        const send = point(".hm-send");
        const drop = point(".hm-dropzone");
        const publish = point(".hm-publish__primary");
        const composer = bounds(".hm-composer");
        const origin = { x: composer.x + composer.width / 2, y: composer.y + composer.height };
        const focus = { scale: 1.7, x: 190, y: -195 };
        const focused = (p: { x: number; y: number }) => ({
          x: origin.x + (p.x - origin.x) * focus.scale + focus.x,
          y: origin.y + (p.y - origin.y) * focus.scale + focus.y,
        });
        const bigSend = focused(send);
        const typed = root.querySelector<HTMLElement>(".hm-typed")!;
        const message = typed.dataset.message || "";
        const typing = { count: 0 };
        const copyAfter = root.querySelector<HTMLElement>(".hm-copy-after")!;
        timeline = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" }, onComplete: () => {
          if (visible && !document.hidden && !reduce.matches) timeline.restart();
        } });
        const tl = timeline;
        const cursor = (p: { x: number; y: number }, at: number, duration = .8) => {
          tl.to(q(".hm-cursor"), { ...p, opacity: 1, duration }, at);
        };
        const click = (p: { x: number; y: number }, at: number, selector: string) => {
          tl.to(q(selector), { scale: .96, duration: .12 }, at);
          tl.to(q(selector), { scale: 1, duration: .22 }, at + .12);
          tl.fromTo(q(".hm-click-ring"), { x: p.x - 34, y: p.y - 34, scale: .25, opacity: .8 },
            { scale: 1, opacity: 0, duration: .5 }, at);
        };
        // Initial state (also the reset for each loop, while the window is hidden).
        tl.set(app, { opacity: 0, scale: 1 }, 0);
        tl.set(q(".hm-source-count,.hm-source-row,.hm-source-ready,.hm-contents,.hm-generating,.hm-preview,.hm-paper,.hm-cursor,.hm-click-ring,.hm-chat__generated,.hm-chat__request,.hm-chat__thinking,.hm-chat__answer,.hm-copy-after,.hm-typed,.hm-saved,.hm-source-rail,.hm-text-badge,.hm-published,.hm-published__title,.hm-post,.hm-post__status"), { opacity: 0 }, 0);
        tl.set(q(".hm-create,.hm-welcome,.hm-copy-before,.hm-placeholder,.hm-workspace,.hm-sources__content,.hm-output,.hm-thread,.hm-format-rail"), { opacity: 1 }, 0);
        // Next to the open resources the assistant is narrower; it never slides under the output panel.
        tl.set(q(".hm-assistant"), { left: 226, width: 296, zIndex: 2 }, 0);
        tl.set(q(".hm-sources"), { scaleX: 1, opacity: 1 }, 0);
        tl.set(q(".hm-composer"), { x: 0, y: 0, scale: 1, transformOrigin: "50% 100%", borderColor: "#34363a", borderRadius: "0 0 12px 12px", boxShadow: "0 0 0 #0000" }, 0);
        tl.set(q(".hm-post-text"), { borderColor: "#44464a", backgroundColor: "#191a1b" }, 0);
        tl.set(q(".hm-mark"), { backgroundSize: "0% 100%" }, 0);
        tl.set(copyAfter, { scrollTop: 0 }, 0);
        tl.set(q(".hm-progress > span"), { scaleX: 0 }, 0);
        tl.set(q(".hm-formats,.hm-week"), { opacity: .42 }, 0);
        tl.to(app, { opacity: 1, duration: .45 }, .05);
        // A paper document becomes a persistent source in the notebook.
        tl.fromTo(q(".hm-paper"), { x: 356, y: 143, opacity: 0, scale: 1 },
          { opacity: 1, duration: .35 }, .35);
        tl.fromTo(q(".hm-cursor"), { x: 498, y: 281, opacity: 0 },
          { opacity: 1, duration: .3 }, .45);
        tl.to(q(".hm-paper"), { x: drop.x - 100, y: drop.y - 141, duration: 1.15 }, 1.15);
        cursor({ x: drop.x + 42, y: drop.y }, 1.15, 1.15);
        tl.to(q(".hm-dropzone"), { borderColor: "#a9abe8", backgroundColor: "#303139", duration: .3 }, 2);
        tl.to(q(".hm-paper"), { scale: .22, opacity: 0, y: drop.y - 141, duration: .45 }, 2.5);
        tl.fromTo(q(".hm-source-row,.hm-source-ready,.hm-source-count"), { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: .35, stagger: .08 }, 2.85);
        tl.to(q(".hm-formats,.hm-week"), { opacity: 1, duration: .4 }, 3.05);
        tl.to(q(".hm-dropzone"), { borderColor: "#5a5b62", backgroundColor: "#1e1f20", duration: .35 }, 3.1);
        // The source folds into a narrow rail and the assistant takes its place.
        tl.to(q(".hm-sources__content"), { opacity: 0, duration: .2 }, 3.45);
        tl.to(q(".hm-sources"), { scaleX: 58 / 214, duration: .65, ease: "power3.inOut" }, 3.6);
        tl.to(q(".hm-assistant"), { left: 72, width: 450, duration: .65, ease: "power3.inOut" }, 3.6);
        tl.to(q(".hm-source-rail"), { opacity: 1, duration: .2 }, 4.1);
        tl.set(q(".hm-sources"), { opacity: 0 }, 4.3);
        cursor(produce, 3.65, 1.15);
        click(produce, 4.95, ".hm-produce");
        tl.to(q(".hm-cursor"), { opacity: 0, duration: .3 }, 5.2);
        tl.to(q(".hm-create"), { opacity: 0, duration: .3 }, 5.3);
        tl.to(q(".hm-generating"), { opacity: 1, duration: .3 }, 5.35);
        tl.to(q(".hm-progress > span"), { scaleX: 1, duration: 1.55 }, 5.6);
        tl.to(q(".hm-generating > svg"), { rotation: 90, duration: 1.6 }, 5.5);
        // The infographic and its post appear in the same panel.
        tl.to(q(".hm-generating,.hm-welcome"), { opacity: 0, duration: .35 }, 7.25);
        tl.to(q(".hm-preview"), { opacity: 1, duration: .4 }, 7.35);
        tl.fromTo(q(".hm-copy-before > p"), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: .4, stagger: .1 }, 7.6);
        tl.fromTo(q(".hm-artwork"), { opacity: 0, scale: .97 }, { opacity: 1, scale: 1, duration: .6 }, 8.1);
        tl.fromTo(q(".hm-chat__generated,.hm-contents"), { opacity: 0, y: 5 },
          { opacity: 1, y: 0, duration: .4 }, 8.45);
        tl.to(q(".hm-saved"), { opacity: 1, duration: .3 }, 8.65);
        cursor(input, 10.35);
        tl.to(q(".hm-cursor"), { opacity: 0, duration: .2 }, 11.05);
        // Lift the SAME composer out of its panel, keeping the application visible.
        tl.set(q(".hm-assistant"), { zIndex: 5 }, 11.1);
        tl.to(q(".hm-composer"), { ...focus, borderColor: "#a9abe8", borderRadius: 14,
          boxShadow: "0 18px 60px #0009", duration: .65, ease: "power3.inOut" }, 11.1);
        tl.to(q(".hm-output,.hm-source-rail,.hm-format-rail,.hm-thread"), { opacity: .35, duration: .5 }, 11.1);
        tl.to(q(".hm-placeholder"), { opacity: 0, duration: .2 }, 11.7);
        tl.to(typed, { opacity: 1, duration: .1 }, 11.85);
        tl.fromTo(typing, { count: 0 }, { count: message.length, duration: 3.1, ease: "none", onUpdate: () => {
          typed.textContent = message.slice(0, Math.floor(typing.count));
        } }, 11.85);
        cursor(bigSend, 15.7, .7);
        click(bigSend, 16.65, ".hm-send");
        tl.to(q(".hm-cursor"), { opacity: 0, duration: .2 }, 16.9);
        // Send, settle back into the assistant, then rewrite the visible post.
        tl.to(q(".hm-composer"), { scale: 1, x: 0, y: 0, borderColor: "#34363a",
          borderRadius: "0 0 12px 12px", boxShadow: "0 0 0 #0000", duration: .7, ease: "power3.inOut" }, 17.1);
        tl.to(q(".hm-output,.hm-source-rail,.hm-format-rail,.hm-thread"), { opacity: 1, duration: .5 }, 17.1);
        tl.to(q(".hm-typed"), { opacity: 0, duration: .15 }, 17.65);
        tl.to(q(".hm-placeholder"), { opacity: 1, duration: .2 }, 17.7);
        tl.set(q(".hm-assistant"), { zIndex: 2 }, 17.8);
        tl.fromTo(q(".hm-chat__request"), { opacity: 0, y: 7 }, { opacity: 1, y: 0, duration: .35 }, 17.85);
        tl.to(q(".hm-chat__thinking"), { opacity: 1, duration: .2 }, 18.25);
        tl.to(q(".hm-chat__thinking > i"), { rotation: 360, duration: 1.1, ease: "none" }, 18.25);
        tl.to(q(".hm-saved"), { opacity: 0, duration: .2 }, 18.8);
        tl.to(q(".hm-copy-before,.hm-chat__thinking"), { opacity: 0, duration: .2 }, 19.4);
        tl.to(q(".hm-copy-after"), { opacity: 1, duration: .35 }, 19.6);
        tl.to(q(".hm-post-text"), { borderColor: "#85cfa7", backgroundColor: "#1d2622", duration: .3 }, 19.6);
        tl.fromTo(q(".hm-chat__answer,.hm-saved,.hm-text-badge"), { opacity: 0, y: 4 },
          { opacity: 1, y: 0, duration: .4 }, 19.9);
        // Show what changed: the new hook, then the closing question at the end of the post.
        tl.to(q(".hm-mark--hook"), { backgroundSize: "100% 100%", duration: .7, ease: "power2.out" }, 20.3);
        tl.to(copyAfter, { scrollTop: () => copyAfter.scrollHeight - copyAfter.clientHeight, duration: 1.7, ease: "power2.inOut" }, 21.4);
        tl.to(q(".hm-mark--question"), { backgroundSize: "100% 100%", duration: .7, ease: "power2.out" }, 23.15);
        tl.to(q(".hm-post-text"), { borderColor: "#44464a", backgroundColor: "#191a1b", duration: .8 }, 24.6);
        // One publish click: the same post, as it appears on each network.
        cursor(publish, 24.7, .85);
        click(publish, 25.7, ".hm-publish__primary");
        tl.to(q(".hm-cursor"), { opacity: 0, duration: .2 }, 25.95);
        tl.to(app, { opacity: 0, scale: .96, duration: .5 }, 25.95);
        tl.set(q(".hm-published"), { opacity: 1 }, 26);
        tl.fromTo(q(".hm-published__title"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .5 }, 26.15);
        tl.fromTo(q(".hm-post--linkedin"), { opacity: 0, y: 70, scale: .92 }, { opacity: 1, y: 0, scale: 1, duration: .7, ease: "power3.out" }, 26.3);
        tl.fromTo(q(".hm-post--instagram"), { opacity: 0, x: 120, y: 40, rotation: 0 }, { opacity: 1, x: 0, y: 0, rotation: -6, duration: .75, ease: "power3.out" }, 26.55);
        tl.fromTo(q(".hm-post--facebook"), { opacity: 0, x: -120, y: 40, rotation: 0 }, { opacity: 1, x: 0, y: 0, rotation: 6, duration: .75, ease: "power3.out" }, 26.65);
        tl.fromTo(q(".hm-post--linkedin .hm-post__status, .hm-post--instagram .hm-post__status, .hm-post--facebook .hm-post__status"),
          { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: .4, stagger: .18, ease: "back.out(2)" }, 27.35);
        // Hold the result, then clear the stage; the loop resets while nothing is shown.
        tl.to(q(".hm-published"), { opacity: 0, duration: .55 }, 31);
        tl.pause(0);
      }, root);
      sync();
    };
    const resize = () => root.style.setProperty("--hero-motion-scale", String(viewport.clientWidth / 1280));
    resize(); compose();
    const sizeWatcher = new ResizeObserver(resize);
    sizeWatcher.observe(viewport);
    resize();
    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      sync();
    }, { threshold: .35 });
    observer.observe(viewport);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);
    return () => {
      observer.disconnect(); sizeWatcher.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
      ctx.revert(); root.style.removeProperty("--hero-motion-scale");
    };
  }, []);
  return null;
}
