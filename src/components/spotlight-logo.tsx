"use client";

import { useEffect, useId, useRef } from "react";
import type { Transition } from "motion/react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

import { useSound } from "@/hooks/soundcn/use-sound";
import { metalClickSound } from "@/lib/metal-click";

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 18,
  stiffness: 200,
};

export function SpotlightLogo() {
  const id = useId();
  const ids = {
    facePattern: `spotlight-logo-face-pattern-${id}`,
    radialGradient: `spotlight-logo-radial-gradient-${id}`,
    markMask: `spotlight-logo-mark-mask-${id}`,
  };

  const ref = useRef<SVGSVGElement>(null);
  const [play] = useSound(metalClickSound);

  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { margin: "80px" });

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const cx = useSpring(useTransform(mouseX, [0, 1], [0, 556]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  });

  const cy = useSpring(useTransform(mouseY, [0, 1], [0, 354]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  });

  useEffect(() => {
    if (shouldReduceMotion || !isInView) {
      return;
    }

    if (window.matchMedia("(hover: none)").matches) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX / window.innerWidth);
      mouseY.set(event.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [shouldReduceMotion, isInView, mouseX, mouseY]);

  const markMotion = {
    normal: {
      transform: "translate(0px, 0px)",
    },
    pressed: {
      transform: "translate(0px, 16px)",
    },
  };
  const markTransform =
    "translate(278 177) rotate(-28) skewX(-10) translate(-278 -177)";
  const markPath =
    "M126 251L174 92H231L280 251H226L218 219H184L176 251H126ZM194 178H209L202 139L194 178ZM307 92H435V137H356V154H428V251H300V206H380V189H307V92Z";

  return (
    <motion.svg
      ref={ref}
      className="h-auto w-full touch-manipulation [--pattern:color-mix(in_oklab,var(--foreground)_12%,var(--background))] [--stroke:color-mix(in_oklab,var(--foreground)_16%,var(--background))]"
      viewBox="0 0 556 354"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      initial="normal"
      whileTap="pressed"
      onTap={() => play()}
    >
      <defs>
        <pattern
          id={ids.facePattern}
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
            stroke="var(--pattern)"
            strokeWidth="1"
          />
        </pattern>

        <mask id={ids.markMask}>
          <rect width="556" height="354" fill="black" />
          <g transform={markTransform}>
            <path
              d={markPath}
              fill="white"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </g>
        </mask>

        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="dark:[stop-color:#fff]"
            stopColor="var(--color-zinc-700)"
          />
          <stop
            className="dark:[stop-color:var(--color-zinc-600)]"
            offset="1"
            stopColor="var(--color-zinc-400)"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>

      <motion.g variants={markMotion} transition={transition}>
        <rect
          x="0"
          y="0"
          width="556"
          height="354"
          fill="var(--background)"
          mask={`url(#${ids.markMask})`}
        />
        <rect
          x="0"
          y="0"
          width="556"
          height="354"
          fill={`url(#${ids.facePattern})`}
          mask={`url(#${ids.markMask})`}
        />
        <g transform={markTransform}>
          <path
            d={markPath}
            fill="transparent"
            stroke="var(--stroke)"
            strokeWidth="1.4"
            fillRule="evenodd"
            clipRule="evenodd"
          />
          <path
            d={markPath}
            fill="transparent"
            stroke={`url(#${ids.radialGradient})`}
            strokeWidth="2"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </g>
      </motion.g>
    </motion.svg>
  );
}
