const checkImage = (url) =>
  new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });

async function fetchValidCharacters() {
  const res = await fetch('https://api.example.com/characters');
  const data = await res.json();

  const validCharacters = [];
  for (let char of data) {
    if (char.image && (await checkImage(char.image))) {
      validCharacters.push(char);
    }
  }

  setCharacters(validCharacters);
}

export { fetchValidCharacters, checkImage };
