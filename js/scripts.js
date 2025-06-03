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
  function addListItem(pokemon) {
    const list = document.querySelector(".pokemon-list");
    const listItem = document.createElement("li");
    const button = document.createElement("button");

    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");

    button.addEventListener("click", function () {
      showDetails(pokemon);
    });

    listItem.appendChild(button);
    list.appendChild(listItem);
  }
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();

// Loop through all Pokémon and add them to the page as buttons
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

// Display the Pokémon list using getAll() and forEach()
document.write("<h2>Pokémon List</h2>");

pokemonRepository.getAll().forEach(function (pokemon) {
  let displayText = `${pokemon.name} (height: ${pokemon.height})`;

  if (pokemon.height > 6) {
    displayText += ` <span class="big">- Wow, that’s massive!</span>`;
  }

  document.write(`<div class="pokemon-entry">${displayText}</div>`);
});
