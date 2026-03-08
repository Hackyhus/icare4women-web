"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  // Create an array of random positions & sizes for the floating "bubbles"
  const bubbles = Array.from({ length: 15 }).map(() => ({
    width: Math.random() * 80 + 20, // 20px to 100px
    left: (Math.random() * 100) + "%",
    duration: Math.random() * 20 + 10, // 10s to 30s
    delay: Math.random() * 5,
  }));

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.4, 0] }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "linear",
            delay: b.delay,
          }}
          style={{
            position: "absolute",
            left: b.left,
            width: b.width,
            height: b.width,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--rc-primary-light), var(--rc-primary))",
            filter: "blur(4px)",
          }}
        />
      ))}
    </div>
  );
}
