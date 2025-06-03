const pokemonRepository = (function () {
  const pokemonList = [
    { name: "Bulbasaur", height: 7, types: ["grass", "poison"] },
    { name: "Charmander", height: 6, types: ["fire"] },
    { name: "Squirtle", height: 5, types: ["water"] },
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
  };
})();

// Display the Pokémon list using getAll() and forEach()
document.write("<h2>Pokémon List</h2>");

pokemonRepository.getAll().forEach(function (pokemon) {
  let displayText = `${pokemon.name} (height: ${pokemon.height})`;

  if (pokemon.height > 6) {
    displayText += ` <span class="big">- Wow, that’s massive!</span>`;
  }

  document.write(`<div class="pokemon-entry">${displayText}</div>`);
});
