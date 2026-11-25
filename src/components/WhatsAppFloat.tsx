"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

export function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  const link = whatsappLink();
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!link) return null;
  return (
    <AnimatePresence>
      {show ? (
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("Contact", { origem: "botao_flutuante" })}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          aria-label="Falar com a DM Empresarial no WhatsApp"
          className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] transition-transform hover:scale-105"
        >
          <MessageCircle className="size-6" aria-hidden />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
