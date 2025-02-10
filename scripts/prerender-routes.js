const TOTAL_POKEMONS = 10;
const TOTAL_PAGES = 5;

(async () => {
  const fs = require("fs");

  const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);

  let fileContent = pokemonIds.map((id) => `/pokemon/${id}`).join("\n");

  const pokemonPages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

  fileContent +=
    "\n" + pokemonIds.map((page) => `/pokemons/page/${page}`).join("\n");

  const pokemonNameList = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`
  ).then((res) => res.json());

  fileContent +=
    "\n" +
    pokemonNameList.results
      .map((pokemon) => `/pokemon/${pokemon.name}`)
      .join("\n");

  fs.writeFileSync("routes.txt", fileContent);
})();
