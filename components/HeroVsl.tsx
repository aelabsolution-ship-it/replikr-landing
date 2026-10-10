"use client";

import { useEffect } from "react";

/** Enhance the native player with a central play button; native controls work without JS. */
export default function HeroVsl() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".hybana-hero-video");
    const video = root?.querySelector<HTMLVideoElement>("video");
    const button = root?.querySelector<HTMLButtonElement>(".hybana-vsl__play");
    if (!video || !button) return;

    const sync = () => {
      button.hidden = !video.paused && !video.ended;
      if (!video.paused) video.controls = true;
      button.setAttribute("aria-label", video.ended ? "Revoir la vidéo de présentation de Hybana" : "Lire la vidéo de présentation de Hybana");
    };
    const play = () => {
      if (video.ended) video.currentTime = 0;
      video.controls = true;
      video.play().then(() => video.focus()).catch(() => {
        video.controls = true;
        sync();
      });
    };

    if (video.paused && video.currentTime === 0) video.controls = false;
    sync();
    button.addEventListener("click", play);
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    video.addEventListener("ended", sync);
    return () => {
      button.removeEventListener("click", play);
      video.removeEventListener("play", sync);
      video.removeEventListener("pause", sync);
      video.removeEventListener("ended", sync);
      button.hidden = true;
      video.controls = true;
    };
  }, []);
  return null;
}
