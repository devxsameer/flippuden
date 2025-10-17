// Header.jsx
import { motion } from 'framer-motion';

/**
 * App Header Component
 * Displays the title and tagline of the Flippuden game.
 * Uses Framer Motion for a subtle entrance animation.
 */
function Header() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-900 py-6 text-center shadow-lg">
      {/* Animated title */}
      <motion.h1
        className="font-naruto text-4xl tracking-wide"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Flippuden <span className="text-amber-300">.</span>
      </motion.h1>

      {/* Subtitle */}
      <p className="mt-3 bg-neutral-300 text-sm font-bold text-neutral-900 uppercase md:text-base">
        A Shinobi Memory Challenge
      </p>
    </header>
  );
}

export default Header;
