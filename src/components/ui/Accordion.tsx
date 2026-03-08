"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AccordionProps = {
  question: string;
  answer: string;
};

export default function Accordion({ question, answer }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      style={{
        borderBottom: "1px solid var(--rc-border)",
        padding: "1.5rem 0",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          fontSize: "1.1rem",
          fontWeight: "500",
          color: "var(--rc-text-main)",
          padding: 0
        }}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span style={{ 
          display: "inline-block", // Required for transform to work on span
          transform: isOpen ? "rotate(45deg)" : "rotate(0)", 
          transition: "transform var(--transition-fast)", 
          fontSize: "1.5rem",
          color: "var(--rc-primary)"
        }}>
          +
        </span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ marginTop: "1rem", color: "var(--rc-text-light)", lineHeight: "1.6", paddingBottom: "0.5rem" }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
