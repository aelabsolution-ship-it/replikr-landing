"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ----------------------------------------------------------------
 * StaggerTestimonials
 *
 * Cartes d'avis posées en quinconce ; la carte centrale est mise en
 * avant. Cliquer une carte (ou les flèches) la fait venir au centre.
 * Mécanique d'origine conservée, habillage à la charte Replikr :
 * cartes sombres arrondies, carte centrale en dégradé violet avec un
 * liseré lavande, portraits ronds.
 * ---------------------------------------------------------------- */

export interface StaggerTestimonial {
  /** Le texte de l'avis */
  testimonial: string;
  /** Prénom de l'autrice ou de l'auteur */
  name: string;
  /** Métier, affiché sous le prénom */
  role: string;
  /** Portrait (facultatif : sinon l'initiale sur un rond lavande) */
  imgSrc?: string;
}

type Item = StaggerTestimonial & { tempId: number };

interface TestimonialCardProps {
  position: number;
  testimonial: Item;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      aria-hidden={!isCenter}
      className={cn(
        "absolute left-1/2 top-1/2 flex cursor-pointer flex-col overflow-hidden rounded-3xl border p-5 sm:p-7 transition-all duration-500 ease-in-out motion-reduce:transition-none",
        isCenter
          ? "z-10 border-primary/70 bg-gradient-to-br from-[#50318c] to-[#252943] text-foreground"
          : "z-0 border-border bg-card text-card-foreground hover:border-primary/40"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -40 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
          scale(${isCenter ? 1 : 0.94})
        `,
        boxShadow: isCenter
          ? "0 24px 70px -20px rgba(139, 142, 240, .55), 0 0 0 1px rgba(169, 171, 232, .25)"
          : "0 16px 40px -24px rgba(0, 0, 0, .8)",
        // Les cartes lointaines s'assombrissent sans devenir transparentes : aucun texte ne se superpose.
        filter: isCenter ? 'none' : `brightness(${Math.abs(position) > 1 ? 0.45 : 0.7})`,
      }}
    >
      <div className="mb-4 flex items-center gap-3 sm:mb-5">
        {testimonial.imgSrc ? (
          <img
            src={testimonial.imgSrc}
            alt={testimonial.name}
            className={cn(
              "h-12 w-12 shrink-0 rounded-full object-cover object-top",
              isCenter ? "ring-2 ring-primary" : "ring-1 ring-border"
            )}
          />
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 48 48"
            className={cn(
              "h-12 w-12 shrink-0 rounded-full",
              isCenter ? "ring-2 ring-primary" : "ring-1 ring-border"
            )}
          >
            {/* Avatar par défaut : silhouette grise, comme sur les réseaux */}
            <circle cx="24" cy="24" r="24" fill="#cfcfcf" />
            <circle cx="24" cy="18.5" r="7.5" fill="#9a9a9a" />
            <path d="M9.5 40.5C11.8 33.6 17.4 29.5 24 29.5s12.2 4.1 14.5 11A24 24 0 0 1 9.5 40.5z" fill="#9a9a9a" />
          </svg>
        )}
        <p className="flex flex-col text-sm leading-snug">
          <span className="font-semibold text-foreground">{testimonial.name}</span>
          <span className={isCenter ? "text-foreground/75" : "text-muted-foreground"}>{testimonial.role}</span>
        </p>
      </div>
      <p className={cn(
        "text-[15px] font-medium leading-snug sm:text-lg sm:leading-relaxed",
        isCenter ? "text-foreground" : "text-foreground/70"
      )}>
        « {testimonial.testimonial} »
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC<{ testimonials: StaggerTestimonial[] }> = ({ testimonials }) => {
  const [cardSize, setCardSize] = useState(365);
  // Au moins 8 cartes pour que la file déborde des deux côtés : on répète la liste si besoin.
  const [testimonialsList, setTestimonialsList] = useState<Item[]>(() => {
    const base = testimonials.length ? testimonials : [];
    const repeats = base.length ? Math.ceil(8 / base.length) : 0;
    return Array.from({ length: repeats }, () => base).flat().map((t, i) => ({ ...t, tempId: i }));
  });

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  // Téléphone et tablette : on balaie du doigt vers la gauche ou la droite pour changer d'avis.
  const touchStart = React.useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) handleMove(dx < 0 ? 1 : -1);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 340 : 300);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      role="region"
      aria-roledescription="carrousel"
      aria-label="Avis d’utilisateurs de Replikr"
      className="relative h-[430px] w-full touch-pan-y overflow-hidden lg:h-[560px]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 gap-3 lg:flex">
        <button
          type="button"
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full text-foreground transition-colors",
            "border border-border bg-card hover:border-primary hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
          aria-label="Avis précédent"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full text-foreground transition-colors",
            "border border-border bg-card hover:border-primary hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
          aria-label="Avis suivant"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
