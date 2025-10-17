import LevelCard from './LevelCard';
import geninImg from '../../assets/images/genin.jpeg';
import chuninImg from '../../assets/images/chunin.jpeg';
import joninImg from '../../assets/images/jonin.jpeg';

function Home({ onSelectDifficulty }) {
  const difficulties = [
    {
      label: 'Genin (Easy)',
      desc: 'Fewer cards, slower shuffle, beginner-friendly',
      value: 10,
      imgSrc: geninImg,
    },
    {
      label: 'Chunin (Medium)',
      desc: 'Moderate number of cards, balanced challenge',
      value: 15,
      imgSrc: chuninImg,
    },
    {
      label: 'Jonin (Hard)',
      desc: 'Many cards, fast shuffle, for true memory masters',
      value: 20,
      imgSrc: joninImg,
    },
  ];
  return (
    <div>
      <p className="text-md mx-auto mb-4 max-w-[60ch] text-center font-medium">
        Select unique Naruto characters each turn to increase your score. But
        beware — pick the same one twice, and it's game over!
      </p>
      <span className="font-bold uppercase">Select Difficulty :</span>
      <div className="mt-3 flex flex-wrap justify-center gap-4">
        {difficulties.map((diff) => (
          <LevelCard
            key={diff.label}
            imgSrc={diff.imgSrc}
            title={diff.label}
            description={diff.desc}
            onSelectDifficulty={() => onSelectDifficulty(diff.value)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
