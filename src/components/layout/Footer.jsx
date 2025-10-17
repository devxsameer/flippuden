// Footer.jsx
import { motion } from 'framer-motion';

/**
 * Footer Component
 * Displays author attribution and GitHub link.
 * Auto-updates the year dynamically.
 */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="font-alan border-t border-neutral-800 py-3 text-center text-sm text-neutral-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      Built with ❤️ using React, Vite & Tailwind by{' '}
      <a
        href="https://github.com/devxsameer"
        target="_blank"
        rel="noopener noreferrer"
        className="font-outfit font-semibold text-amber-300 underline hover:text-amber-400"
      >
        @devxsameer
      </a>{' '}
      • © {year}
    </motion.footer>
  );
}

export default Footer;
