import { motion } from 'motion/react';

function LevelCard({ imgSrc, title, description, onSelectDifficulty }) {
  return (
    <motion.div
      className="max-w-60 cursor-pointer rounded-lg border border-neutral-700 bg-neutral-800 shadow-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onSelectDifficulty}
    >
      <a href="#">
        <img className="h-40 w-full rounded-t-lg" src={imgSrc} alt={title} />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            {title}
          </h5>
        </a>
        <p className="font-normal text-neutral-400">{description}</p>
      </div>
    </motion.div>
  );
}

export default LevelCard;
