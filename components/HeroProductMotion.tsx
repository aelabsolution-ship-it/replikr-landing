"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

/** Staged notebook demo using Replikr's actual infographic renderer. No live AI or publishing call. */
export default function HeroProductMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".hero-motion");
    const viewport = root?.querySelector<HTMLElement>(".hero-motion__viewport");
    if (!root || !viewport) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 760px)");
    let visible = false;
    let timeline: gsap.core.Timeline;
    let ctx: gsap.Context;
    const sync = () => {
      if (!timeline) return;
      if (reduce.matches) timeline.pause(31);
      else if (!visible || document.hidden) timeline.pause();
      else if (timeline.progress() === 1) timeline.restart();
      else timeline.play();
    };
    const compose = () => {
      ctx?.revert();
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(root);
        const compact = mobile.matches;
        // Measure anchors once, before the timeline. All movement stays inside
        // the fixed app frame; only the real composer grows during typing.
        const app = root.querySelector<HTMLElement>(".hm-app")!;
        const appBox = app.getBoundingClientRect();
        const ratio = appBox.width / app.offsetWidth;
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
        const publishConfirm = point(".hm-publish-confirm");
        const deliverySource = point(".hm-delivery__source");
        const networks = ["linkedin", "instagram", "facebook"].map(name => ({
          name, destination: point(`.hm-network--${name} > img`),
        }));
        const composer = bounds(".hm-composer");
        const origin = { x: composer.x + composer.width / 2, y: composer.y + composer.height };
        const focus = compact ? { scale: 1.45, x: -111, y: 180 } : { scale: 2, x: 125, y: -180 };
        const focused = (p: { x: number; y: number }) => ({
          x: origin.x + (p.x - origin.x) * focus.scale + focus.x,
          y: origin.y + (p.y - origin.y) * focus.scale + focus.y,
        });
        const bigSend = focused(send);
        const typed = root.querySelector<HTMLElement>(".hm-typed")!;
        const message = typed.dataset.message || "";
        const typing = { count: 0 };
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
        tl.set(q(".hm-source-count,.hm-source-row,.hm-source-ready,.hm-contents,.hm-generating,.hm-preview,.hm-paper,.hm-cursor,.hm-click-ring,.hm-chat__generated,.hm-chat__request,.hm-chat__thinking,.hm-chat__answer,.hm-copy-after,.hm-typed,.hm-saved,.hm-delivery,.hm-parcel,.hm-network__done,.hm-publish-confirm__sending,.hm-publish-confirm__done,.hm-delivery__success"), { opacity: 0 }, 0);
        tl.set(q(".hm-create,.hm-welcome,.hm-copy-before,.hm-placeholder,.hm-workspace,.hm-preview__pair,.hm-publish,.hm-network__pending,.hm-publish-confirm__ready"), { opacity: 1 }, 0);
        tl.set(q(".hm-preview__pair,.hm-delivery"), { x: 0 }, 0);
        tl.set(q(".hm-network"), { borderColor: "#62649c", backgroundColor: "#282a2c", scale: 1 }, 0);
        tl.set(q(".hm-publish-confirm"), { backgroundColor: "#e8e8e8", borderColor: "#e8e8e8", color: "#131314" }, 0);
        tl.set(q(".hm-delivery__routes"), { opacity: .45 }, 0);
        tl.set(q(".hm-composer"), { x: 0, y: 0, scale: 1, transformOrigin: "50% 100%" }, 0);
        tl.set(q(".hm-progress > span"), { scaleX: 0 }, 0);
        tl.set(q(".hm-formats,.hm-week"), { opacity: .42 }, 0);
        // A paper document becomes a persistent source in the notebook.
        tl.fromTo(q(".hm-paper"), { x: compact ? 288 : 356, y: compact ? 382 : 143, opacity: 0, scale: 1 },
          { opacity: 1, duration: .35 }, .35);
        tl.fromTo(q(".hm-cursor"), { x: compact ? 430 : 498, y: compact ? 520 : 281, opacity: 0 },
          { opacity: 1, duration: .3 }, .45);
        tl.to(q(".hm-paper"), { x: drop.x - 100, y: drop.y - 141, duration: 1.15 }, 1.15);
        cursor({ x: drop.x + 42, y: drop.y }, 1.15, 1.15);
        tl.to(q(".hm-dropzone"), { borderColor: "#a9abe8", backgroundColor: "#303139", duration: .3 }, 2);
        tl.to(q(".hm-paper"), { scale: .22, opacity: 0, y: drop.y - 141, duration: .45 }, 2.5);
        tl.fromTo(q(".hm-source-row,.hm-source-ready,.hm-source-count"), { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: .35, stagger: .08 }, 2.85);
        tl.to(q(".hm-formats,.hm-week"), { opacity: 1, duration: .4 }, 3.05);
        tl.to(q(".hm-dropzone"), { borderColor: "#5a5b62", backgroundColor: "#1e1f20", duration: .35 }, 3.1);
        cursor(produce, 3.65, 1.15);
        click(produce, 4.95, ".hm-produce");
        tl.to(q(".hm-cursor"), { opacity: 0, duration: .3 }, 5.2);
        tl.to(q(".hm-create"), { opacity: 0, duration: .3 }, 5.3);
        tl.to(q(".hm-generating"), { opacity: 1, duration: .3 }, 5.35);
        tl.to(q(".hm-progress > span"), { scaleX: 1, duration: 1.55 }, 5.6);
        tl.to(q(".hm-generating > svg"), { rotation: 90, duration: 1.6 }, 5.5);
        // The saved infographic and its accompanying post appear in the same panel.
        tl.to(q(".hm-generating,.hm-welcome"), { opacity: 0, duration: .35 }, 7.25);
        tl.to(q(".hm-preview"), { opacity: 1, duration: .4 }, 7.35);
        tl.fromTo(q(".hm-copy-before > p"), { opacity: 0 }, { opacity: 1, duration: .4, stagger: .3 }, 7.6);
        tl.fromTo(q(".hm-artwork"), { opacity: 0 }, { opacity: 1, duration: .6 }, 8.25);
        tl.fromTo(q(".hm-chat__generated,.hm-contents"), { opacity: 0, y: 5 },
          { opacity: 1, y: 0, duration: .4 }, 8.45);
        tl.to(q(".hm-saved"), { opacity: 1, duration: .3 }, 8.65);
        cursor(input, 10.35);
        tl.to(q(".hm-cursor"), { opacity: 0, duration: .2 }, 11.05);
        // Lift the SAME composer out of its panel, keeping the application visible.
        tl.to(q(".hm-composer"), { ...focus, borderColor: "#a9abe8", borderRadius: 14,
          boxShadow: "0 18px 60px #0009", duration: .65, ease: "power3.inOut" }, 11.1);
        tl.to(q(".hm-output,.hm-sources,.hm-format-rail,.hm-thread"), { opacity: .35, duration: .5 }, 11.1);
        tl.to(q(".hm-placeholder"), { opacity: 0, duration: .2 }, 11.7);
        tl.to(typed, { opacity: 1, duration: .1 }, 11.85);
        tl.fromTo(typing, { count: 0 }, { count: message.length, duration: 3.1, ease: "none", onUpdate: () => {
          typed.textContent = message.slice(0, Math.floor(typing.count));
        } }, 11.85);
        cursor(bigSend, 15.7, .7);
        click(bigSend, 16.65, ".hm-send");
        tl.to(q(".hm-cursor"), { opacity: 0, duration: .2 }, 16.9);
        // Send, settle back into the assistant, then modify the visible post.
        tl.to(q(".hm-composer"), { scale: 1, x: 0, y: 0, borderColor: "#34363a",
          borderRadius: "0 0 12px 12px", boxShadow: "0 0 0 #0000", duration: .7, ease: "power3.inOut" }, 17.1);
        tl.to(q(".hm-output,.hm-sources,.hm-format-rail,.hm-thread"), { opacity: 1, duration: .5 }, 17.1);
        tl.to(q(".hm-typed"), { opacity: 0, duration: .15 }, 17.65);
        tl.to(q(".hm-placeholder"), { opacity: 1, duration: .2 }, 17.7);
        if (compact) tl.to(q(".hm-chat__generated"), { opacity: 0, duration: .2 }, 17.6);
        tl.fromTo(q(".hm-chat__request"), { opacity: 0, y: 7 }, { opacity: 1, y: 0, duration: .35 }, 17.85);
        tl.to(q(".hm-chat__thinking"), { opacity: 1, duration: .2 }, 18.25);
        tl.to(q(".hm-chat__thinking > i"), { rotation: 360, duration: 1.1, ease: "none" }, 18.25);
        tl.to(q(".hm-saved"), { opacity: 0, duration: .2 }, 18.8);
        tl.to(q(".hm-copy-before,.hm-chat__thinking"), { opacity: 0, duration: .2 }, 19.4);
        tl.to(q(".hm-copy-after"), { opacity: 1, duration: .35 }, 19.6);
        tl.to(q(".hm-post-text"), { borderColor: "#85cfa7", backgroundColor: "#202c26", duration: .3 }, 19.6);
        tl.fromTo(q(".hm-chat__answer,.hm-saved"), { opacity: 0, y: 4 },
          { opacity: 1, y: 0, duration: .4 }, 19.9);
        tl.to(q(".hm-post-text"), { borderColor: "#44464a", backgroundColor: "#191a1b", duration: 1 }, 21.1);
        // Continue in the same output panel: choose networks, publish, then receive confirmations.
        cursor(publish, 22.2, .85);
        click(publish, 23.2, ".hm-publish__primary");
        tl.to(q(".hm-cursor"), { opacity: 0, duration: .2 }, 23.45);
        tl.to(q(".hm-preview__pair"), { opacity: 0, x: -18, duration: .4 }, 23.5);
        tl.to(q(".hm-publish"), { opacity: 0, duration: .25 }, 23.5);
        tl.fromTo(q(".hm-delivery"), { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: .5 }, 23.65);
        cursor(publishConfirm, 25.55, .85);
        click(publishConfirm, 26.6, ".hm-publish-confirm");
        tl.to(q(".hm-cursor"), { opacity: 0, duration: .2 }, 26.85);
        tl.to(q(".hm-publish-confirm__ready"), { opacity: 0, duration: .15 }, 26.85);
        tl.to(q(".hm-publish-confirm__sending,.hm-delivery__routes"), { opacity: 1, duration: .2 }, 26.9);
        networks.forEach(({ name, destination }, index) => {
          const at = 27.1 + index * .25;
          tl.fromTo(q(`.hm-parcel--${name}`),
            { x: deliverySource.x - 21, y: deliverySource.y - 26, opacity: 0, scale: 1 },
            { opacity: 1, duration: .15 }, at);
          tl.to(q(`.hm-parcel--${name}`), { x: destination.x - 21, y: destination.y - 26, duration: .85, ease: "power2.inOut" }, at);
          tl.to(q(`.hm-parcel--${name}`), { opacity: 0, scale: .55, duration: .22 }, at + .75);
          tl.to(q(`.hm-network--${name}`), { borderColor: "#85cfa7", backgroundColor: "#223229", duration: .3 }, at + .8);
          tl.fromTo(q(`.hm-network--${name} > img`), { scale: 1 }, { scale: 1.12, duration: .18, yoyo: true, repeat: 1 }, at + .8);
          tl.to(q(`.hm-network--${name} .hm-network__pending`), { opacity: 0, duration: .15 }, at + .8);
          tl.to(q(`.hm-network--${name} .hm-network__done`), { opacity: 1, duration: .2 }, at + .9);
        });
        tl.to(q(".hm-publish-confirm__sending"), { opacity: 0, duration: .2 }, 28.75);
        tl.to(q(".hm-publish-confirm__done"), { opacity: 1, duration: .2 }, 28.9);
        tl.to(q(".hm-publish-confirm"), { backgroundColor: "#223229", borderColor: "#85cfa7", color: "#9ee0b9", duration: .3 }, 28.8);
        tl.fromTo(q(".hm-delivery__success"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .4 }, 29);
        tl.to(q(".hm-workspace"), { opacity: .12, duration: .45 }, 34.5);
        tl.pause(0);
      }, root);
      sync();
    };
    const resize = () => root.style.setProperty("--hero-motion-scale", String(viewport.clientWidth / (mobile.matches ? 720 : 1280)));
    const responsive = () => { resize(); compose(); };
    compose();
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
    mobile.addEventListener("change", responsive);
    return () => {
      observer.disconnect(); sizeWatcher.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
      mobile.removeEventListener("change", responsive);
      ctx.revert(); root.style.removeProperty("--hero-motion-scale");
    };
  }, []);
  return null;
}
