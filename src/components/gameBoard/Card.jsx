import { motion } from 'motion/react';

function Card({ name, imgSrc, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="h-full cursor-pointer rounded-md border border-neutral-700 bg-neutral-800 p-2 shadow-sm"
      onClick={onClick}
    >
      <img
        src={imgSrc}
        alt={name}
        className="aspect-video w-full rounded-md border border-neutral-600 object-fill"
      />
      <div className="mt-2 text-center">
        <h2 className="font-outfit text-sm font-bold break-words sm:text-base md:text-lg">
          {name}
        </h2>
      </div>
    </motion.div>
  );
}

export default Card;
