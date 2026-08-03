import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

// Registrar o plugin uma vez
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ========== Animações de entrada ==========

/**
 * Faz elementos com o seletor dado entrarem com fade + slide up.
 * Pode ser usado como hook ou função pura.
 */
export const animateOnScroll = (
  selector: string,
  options?: {
    duration?: number;
    stagger?: number;
    y?: number;
    start?: string;
    toggleActions?: string;
  }
) => {
  const {
    duration = 1,
    stagger = 0.08,
    y = 50,
    start = 'top 85%',
    toggleActions = 'play none none reverse',
  } = options || {};

  gsap.from(selector, {
    opacity: 0,
    y,
    duration,
    stagger,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: selector,
      start,
      toggleActions,
    },
  });
};

/**
 * Hook para animar a entrada de elementos ao montar (sem ScrollTrigger).
 */
export const useFadeInOnMount = (selector: string, delay: number = 0) => {
  useEffect(() => {
    gsap.from(selector, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay,
      ease: 'power2.out',
    });
  }, [selector, delay]);
};

// ========== Parallax ==========

/**
 * Aplica parallax suave a um elemento de fundo.
 */
export const parallaxHero = (selector: string, yPercent: number = 20) => {
  gsap.to(selector, {
    y: yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: selector,
      start: 'top bottom',
      scrub: 1,
    },
  });
};

// ========== Header ==========

/**
 * Anima o header: fundo transparente → escuro ao rolar.
 */
export const animateHeader = (
  headerSelector: string,
  bgColor: string = '#0a0a0a'
) => {
  const header = document.querySelector(headerSelector);
  if (!header) return;

  gsap.to(header, {
    backgroundColor: bgColor,
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    duration: 0.3,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: document.body,
      start: 'top -50px',
      toggleActions: 'play none none reverse',
    },
  });
};

// ========== Contagem animada ==========

/**
 * Anima a contagem de números em cards (Dashboard).
 */
export const animateCounters = (selector: string, target: number) => {
  gsap.fromTo(
    selector,
    { innerText: 0 },
    {
      innerText: target,
      duration: 1.5,
      ease: 'power2.out',
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: selector,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

// ========== Typewriter (opcional) ==========

/**
 * Efeito de digitação para títulos.
 */
export const typewriter = (
  selector: string,
  text: string,
  speed: number = 50
) => {
  const el = document.querySelector(selector);
  if (!el) return;

  let index = 0;
  el.textContent = '';
  const interval = setInterval(() => {
    if (index < text.length) {
      el.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, speed);
};

// ========== Limpeza (opcional) ==========

/**
 * Mata todos os ScrollTriggers ao desmontar (use em useEffect cleanup).
 */
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((st) => st.kill());
};