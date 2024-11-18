import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/ExplosionEffect.css";

const ExplosionEffect = ({ trigger }) => {
  const explosionRef = useRef(null);

  useEffect(() => {
    if (trigger && explosionRef.current) {
      const numParticles = 250;
      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement("div");
        particle.classList.add("popcorn-particle");
        explosionRef.current.appendChild(particle);

        const angle = gsap.utils.random(0, 360);
        const distance = gsap.utils.random(100, 300);
        const scale = gsap.utils.random(0.5, 1.5);
        const rotation = gsap.utils.random(0, 360);

        gsap.fromTo(
          particle,
          {
            x: 0,
            y: 0,
            scale: 0,
            opacity: 1,
            rotation: rotation,
          },
          {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            scale: scale,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => particle.remove(),
          }
        );
      }
    }
  }, [trigger]);

  return <div ref={explosionRef} className="explosion-container"></div>;
};

export default ExplosionEffect;
