import { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/home/Home';
import GameBoard from './components/gameBoard/GameBoard';

function App() {
  const [difficulty, setDifficulty] = useState(null);

  return (
    <div className="font-outfit flex min-h-screen flex-col bg-neutral-900 text-white">
      <Header />
      {!difficulty && <Home onSelectDifficulty={setDifficulty} />}
      {difficulty && (
        <GameBoard
          difficulty={difficulty}
          onBackToHome={() => setDifficulty(null)}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
