/**
 * GameBoard Component
 * --------------------
 * Main gameplay logic for Flippuden.
 * Handles:
 *  - Fetching Naruto characters
 *  - Managing game state (score, high score, win/loss)
 *  - Rendering character cards and dialogs
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { shuffleArray, checkImage } from '../../utils/utils';
import Card from './Card';

// 🧩 Component Definition
function GameBoard({ difficulty, onBackToHome }) {
  // 🎮 Game State
  const [characters, setCharacters] = useState([]);
  const [shuffled, setShuffled] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // 🧠 Load High Score for Current Difficulty
  useEffect(() => {
    const saved = localStorage.getItem(`flippuden_hs_${difficulty}`);
    if (saved) setHighScore(Number(saved));
  }, [difficulty]);

  // 🔄 Fetch Characters from API
  useEffect(() => {
    async function fetchCharacters() {
      try {
        const res = await fetch(
          `https://dattebayo-api.onrender.com/characters?limit=${difficulty + 40}`
        );
        const data = await res.json();

        // ✅ Validate image URLs before rendering
        const checked = await Promise.all(
          data.characters.map(async (char) => {
            const valid = char.images[0] && (await checkImage(char.images[0]));
            return valid ? char : null;
          })
        );

        const validChars = checked.filter(Boolean);
        setCharacters(validChars);

        const randomSelection = shuffleArray(validChars).slice(0, difficulty);
        setShuffled(shuffleArray(randomSelection));
      } catch (err) {
        console.error('Error fetching characters:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [difficulty]);

  // 🖱️ Handle Card Clicks
  const handleClick = (id) => {
    if (clickedIds.includes(id)) {
      setGameOver(true);
      updateHighScore();
    } else {
      const newScore = score + 1;
      setClickedIds([...clickedIds, id]);
      setScore(newScore);
      setShuffled(shuffleArray(shuffled));

      // 🎉 Victory Condition
      if (newScore === shuffled.length) {
        setGameWon(true);
        updateHighScore(newScore);
      }
    }
  };

  // 💾 Save High Score in localStorage
  const updateHighScore = (current = score) => {
    if (current > highScore) {
      setHighScore(current);
      localStorage.setItem(`flippuden_hs_${difficulty}`, current);
    }
  };

  // 🔁 Reset Game with New Randomized Cards
  const resetGame = async () => {
    await new Promise((res) => setTimeout(res, 400)); // small pause for smoothness
    const newSelection = shuffleArray(characters).slice(0, difficulty);
    setShuffled(shuffleArray(newSelection));
    setScore(0);
    setClickedIds([]);
    setGameOver(false);
    setGameWon(false);
  };

  // 🌀 Loader State
  if (loading)
    return (
      <div className="mx-auto flex h-full items-center justify-center">
        <div className="flex gap-2">
          <div className="h-4 w-4 animate-bounce rounded-full bg-amber-400 [animation-delay:.7s]" />
          <div className="h-4 w-4 animate-bounce rounded-full bg-amber-400 [animation-delay:.3s]" />
          <div className="h-4 w-4 animate-bounce rounded-full bg-amber-400 [animation-delay:.7s]" />
        </div>
      </div>
    );

  // 🧩 Main Render
  return (
    <div className="mx-auto max-w-7xl grow p-4">
      {/* Score Display */}
      <div className="mb-8 flex items-center justify-center gap-4">
        <h2 className="text-lg text-gray-600">
          Score: <span className="font-semibold text-amber-400">{score}</span>
        </h2>
        <h2 className="text-lg text-gray-600">
          High Score:{' '}
          <span className="font-semibold text-amber-400">{highScore}</span>
        </h2>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
        <AnimatePresence mode="popLayout">
          {shuffled.map((char) => (
            <motion.div
              key={char.id}
              layout
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ duration: 0.4 }}
            >
              <Card
                name={char.name}
                onClick={() => handleClick(char.id)}
                imgSrc={char.images[char.images.length - 1]}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 🎮 End Game Dialog */}
      <AnimatePresence>
        {(gameOver || gameWon) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-neutral-900 p-4 text-center shadow-2xl"
            >
              <h2 className="mb-4 text-3xl font-bold text-amber-400">
                {gameWon ? '🎉 Victory!' : '💀 Game Over!'}
              </h2>
              <div className="flex justify-center gap-4 text-neutral-400">
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
