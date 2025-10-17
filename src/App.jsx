// App.jsx
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/home/Home';
import GameBoard from './components/gameBoard/GameBoard';

/**
 * Root App Component
 * Controls routing between Home and GameBoard based on difficulty selection.
 */
function App() {
  const [difficulty, setDifficulty] = useState(null);

  return (
    <div className="font-outfit flex min-h-screen flex-col bg-neutral-900 text-white">
      <Header />

      {/* Main Content Area */}
      <main className="flex grow flex-col px-4">
        <AnimatePresence mode="wait">
          {!difficulty ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mx-auto flex max-w-7xl grow items-center justify-center p-4 pb-12"
            >
              <Home onSelectDifficulty={setDifficulty} />
            </motion.div>
          ) : (
            <motion.div
              key="gameboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mx-auto flex max-w-7xl grow items-center justify-center p-4 pb-12"
            >
              <GameBoard
                difficulty={difficulty}
                onBackToHome={() => setDifficulty(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
