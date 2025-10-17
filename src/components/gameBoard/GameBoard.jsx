import { useEffect, useState } from 'react';
import { shuffleArray, checkImage } from '../../utils/utils';
import Card from './Card';
import { AnimatePresence, motion } from 'motion/react';

function GameBoard({ difficulty, onBackToHome }) {
  const [characters, setCharacters] = useState([]);
  const [shuffled, setShuffled] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Load high score for this difficulty
  useEffect(() => {
    const savedHighScore = localStorage.getItem(`flippuden_hs_${difficulty}`);
    if (savedHighScore) setHighScore(Number(savedHighScore));
  }, [difficulty]);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const res = await fetch(
          'https://dattebayo-api.onrender.com/characters?limit=50'
        );
        const data = await res.json();

        // Filter characters with working image URLs
        const checked = await Promise.all(
          data.characters.map(async (char) => {
            const isValid =
              char.images[0] && (await checkImage(char.images[0]));
            return isValid ? char : null;
          })
        );

        const validChars = checked.filter(Boolean);
        const randomSelection = shuffleArray(validChars).slice(0, difficulty);

        setCharacters(randomSelection);
        setShuffled(shuffleArray(randomSelection));
      } catch (err) {
        console.error('Error fetching characters:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [difficulty]);

  const handleClick = (id) => {
    if (clickedIds.includes(id)) {
      // 💀 Game Over
      setGameOver(true);
      updateHighScore();
    } else {
      const newScore = score + 1;
      setClickedIds([...clickedIds, id]);
      setScore(newScore);
      setShuffled(shuffleArray(shuffled));

      // 🎉 Win condition
      if (newScore === characters.length) {
        setGameWon(true);
        updateHighScore(newScore);
      }
    }
  };

  // Save high score to localStorage if needed
  const updateHighScore = (current = score) => {
    if (current > highScore) {
      setHighScore(current);
      localStorage.setItem(`flippuden_hs_${difficulty}`, current);
    }
  };

  const resetGame = () => {
    setScore(0);
    setClickedIds([]);
    setShuffled(shuffleArray(characters));
    setGameOver(false);
    setGameWon(false);
  };

  if (loading)
    return (
      <div className="flex w-full max-w-7xl grow items-center justify-center p-4">
        <div className="flex flex-row gap-2">
          <div className="h-4 w-4 animate-bounce rounded-full bg-amber-400 [animation-delay:.7s]"></div>
          <div className="h-4 w-4 animate-bounce rounded-full bg-amber-400 [animation-delay:.3s]"></div>
          <div className="h-4 w-4 animate-bounce rounded-full bg-amber-400 [animation-delay:.7s]"></div>
        </div>
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl grow p-4">
      <div className="mb-8 flex items-center justify-center gap-4">
        <h2 className="text-center text-lg text-gray-600">
          Score: <span className="font-semibold text-amber-400">{score}</span>
        </h2>
        <h3 className="text-center text-lg text-gray-600">
          High Score:{' '}
          <span className="font-semibold text-amber-400">{highScore}</span>
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {shuffled.map((char) => (
          <Card
            key={char.id}
            name={char.name}
            onClick={() => handleClick(char.id)}
            imgSrc={char.images[char.images.length - 1]}
          />
        ))}
      </div>
      {/* 🧩 Dialogs */}
      <AnimatePresence initial={false}>
        {(gameOver || gameWon) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              key="box"
              className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-neutral-900 p-4 text-center shadow-2xl"
            >
              <h2 className="mb-4 text-3xl font-bold text-amber-400">
                {gameWon ? '🎉 Victory!' : '💀 Game Over!'}
              </h2>
              <div className="flex items-center justify-center gap-4 text-neutral-400">
                <p>
                  Score: <span className="text-white">{score}</span>
                </p>
                <p>
                  High Score: <span className="text-white">{highScore}</span>
                </p>
              </div>

              <div className="mt-4 flex justify-center gap-3 text-sm">
                <button
                  onClick={resetGame}
                  className="rounded-lg bg-amber-400 px-4 py-1 font-medium text-neutral-900 transition hover:bg-amber-500"
                >
                  Play Again
                </button>
                <button
                  onClick={onBackToHome}
                  className="rounded-lg border border-gray-300 px-4 py-1 font-medium transition hover:bg-gray-100 hover:text-neutral-900"
                >
                  Back to Home
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GameBoard;
