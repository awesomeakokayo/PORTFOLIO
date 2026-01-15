import { motion } from 'framer-motion'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-neutral-900 border-t border-neutral-800">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 container mx-auto max-w-6xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-neutral-400 mb-2"
        >
          Made with <span className="text-primary">♥</span> by Awesome Akokayo
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm text-neutral-500"
        >
          © 2025 Awesome Akokayo.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm text-neutral-500"
        >
          <a>Contact</a>
        </motion.p>
      </div>
    </footer>
  );
}

export default Footer
