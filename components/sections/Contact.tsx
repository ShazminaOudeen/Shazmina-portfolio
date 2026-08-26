"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, CheckCircle2, XCircle } from "lucide-react";
import { sendContactEmail } from "@/lib/emailjs";
import data from "@/content/data.json";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await sendContactEmail(formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-14 md:py-20 px-4 md:px-8 bg-washi dark:bg-ink transition-colors scroll-mt-20 md:scroll-mt-24"
    >
      {/* Outer container matches every other section's width, so the
          heading/red-square accent lines up with the rest of the page */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-3 h-3 bg-blade shrink-0" />
          <h2 className="font-heading text-3xl md:text-4xl text-ink dark:text-washi">
            Get In Touch
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-body text-ink/75 dark:text-washi/75 mb-10 max-w-lg leading-relaxed"
        >
          Interested in working together, or just want to connect? Send a
          message below and I&apos;ll get back to you soon.
        </motion.p>

        {/* Inner wrapper constrains and centers just the form, while the
            heading/intro text above stays left-aligned with other sections */}
        <div className="max-w-xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-5 border-2 border-ink dark:border-washi bg-surface dark:bg-[#161616] shadow-brutal p-6 md:p-8"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="font-body text-sm font-semibold text-ink dark:text-washi"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="h-12 px-4 border-2 border-ink dark:border-washi bg-washi dark:bg-ink text-ink dark:text-washi font-body focus:outline-none focus:border-blade dark:focus:border-blade-light transition-colors"
                placeholder="Jane Recruiter"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="font-body text-sm font-semibold text-ink dark:text-washi"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="h-12 px-4 border-2 border-ink dark:border-washi bg-washi dark:bg-ink text-ink dark:text-washi font-body focus:outline-none focus:border-blade dark:focus:border-blade-light transition-colors"
                placeholder="jane@company.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="font-body text-sm font-semibold text-ink dark:text-washi"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-ink dark:border-washi bg-washi dark:bg-ink text-ink dark:text-washi font-body resize-none focus:outline-none focus:border-blade dark:focus:border-blade-light transition-colors"
                placeholder="Tell me a bit about the opportunity or what you'd like to discuss."
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ x: 2, y: 2 }}
              className="flex items-center justify-center gap-2 h-12 border-2 border-ink dark:border-washi bg-blade text-washi font-body font-semibold shadow-brutal-sm disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
            >
              {status === "sending" ? (
                "Sending..."
              ) : (
                <>
                  <Send size={16} strokeWidth={2.5} />
                  Send Message
                </>
              )}
            </motion.button>

            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm font-body font-semibold text-green-700 dark:text-green-400"
              >
                <CheckCircle2 size={18} />
                Thank you for reaching out — I&apos;ll get back to you shortly.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm font-body font-semibold text-blade"
              >
                <XCircle size={18} />
                Something went wrong. Please try again, or email me directly below.
              </motion.p>
            )}
          </motion.form>

          {data.personal.email && (
            <motion.a
              href={`mailto:${data.personal.email}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 mt-8 font-body text-sm font-semibold text-ink dark:text-washi hover:text-blade dark:hover:text-blade-light transition-colors"
            >
              <Mail size={16} strokeWidth={2.5} />
              Prefer email? Reach me directly at {data.personal.email}
            </motion.a>
          )}
        </div>
      </div>
    </section>
  );
}