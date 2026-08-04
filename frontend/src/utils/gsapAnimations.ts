import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateOnScroll = (selector: string, options: any = {}) => {
  const { stagger = 0.08, start = 'top 85%', distance = 50 } = options;
  gsap.from(selector, {
    opacity: 0,
    y: distance,
    duration: 0.9,
    ease: 'power2.out',
    stagger,
    scrollTrigger: {
      trigger: selector,
      start,
      toggleActions: 'play none none reverse',
    },
  });
};

export const parallaxHero = (elemento: HTMLElement | string) => {
  const el = typeof elemento === 'string' ? document.querySelector(elemento) : elemento;
  if (!el) return;
  gsap.to(el, {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      scrub: 1,
    },
  });
};

export const typewriter = (el: HTMLElement, text: string, speed = 50) => {
  let i = 0;
  el.textContent = '';
  const interval = setInterval(() => {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, speed);
};