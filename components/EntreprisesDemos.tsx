"use client";

import { useEffect } from "react";

/**
 * Démos de la page /entreprises : chaque [data-seq] avance d'étape en étape
 * (durées en ms dans data-steps), puis recommence. Un élément [data-from="n"]
 * apparaît à l'étape n ; un [data-type] s'écrit lettre à lettre pendant son étape ;
 * un [data-flip="n"] bascule (À valider → Validé) à l'étape n.
 * Hors écran, onglet caché ou mouvement réduit : pas de boucle, état final affiché.
 * Sans JavaScript, tout reste visible (rien n'est masqué avant .is-enhanced).
 */
export default function EntreprisesDemos() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cleanups: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>("[data-seq]").forEach(root => {
      const steps = (root.dataset.steps || "").split(",").map(Number).filter(n => n > 0);
      if (!steps.length) return;
      const items = [...root.querySelectorAll<HTMLElement>("[data-from], [data-flip]")];
      const typers = [...root.querySelectorAll<HTMLElement>("[data-type]")].map(el => ({ el, text: el.textContent || "", from: Number(el.dataset.from) }));
      let stage = -1;
      let timer = 0;
      let typing = 0;
      let visible = false;

      const apply = (next: number, animate: boolean) => {
        stage = next;
        items.forEach(el => {
          const at = Number(el.dataset.from ?? el.dataset.flip);
          el.classList.toggle("is-on", stage >= at);
        });
        clearInterval(typing);
        typers.forEach(({ el, text, from }) => {
          if (stage > from || (stage === from && !animate)) el.textContent = text;
          else if (stage < from) el.textContent = "";
          else {
            const total = steps[stage] * .85;
            const start = performance.now();
            el.textContent = "";
            typing = window.setInterval(() => {
              const shown = Math.min(text.length, Math.ceil(text.length * (performance.now() - start) / total));
              el.textContent = text.slice(0, shown);
              if (shown >= text.length) clearInterval(typing);
            }, 30);
          }
        });
      };
      const tick = () => {
        const next = stage + 1 >= steps.length ? 0 : stage + 1;
        apply(next, true);
        timer = window.setTimeout(tick, steps[next]);
      };
      const stop = () => { clearTimeout(timer); clearInterval(typing); };
      const sync = () => {
        stop();
        if (reduce.matches) { apply(steps.length - 1, false); return; }
        if (visible && !document.hidden) { stage = -1; tick(); }
      };

      root.classList.add("is-enhanced");
      apply(reduce.matches ? steps.length - 1 : 0, false);
      const watcher = new IntersectionObserver(entries => {
        const now = entries.some(entry => entry.isIntersecting);
        if (now !== visible) { visible = now; sync(); }
      }, { threshold: .3 });
      watcher.observe(root);
      reduce.addEventListener("change", sync);
      document.addEventListener("visibilitychange", sync);
      cleanups.push(() => {
        stop();
        watcher.disconnect();
        reduce.removeEventListener("change", sync);
        document.removeEventListener("visibilitychange", sync);
        typers.forEach(({ el, text }) => { el.textContent = text; });
        root.classList.remove("is-enhanced");
      });
    });
    return () => cleanups.forEach(cleanup => cleanup());
  }, []);
  return null;
}
