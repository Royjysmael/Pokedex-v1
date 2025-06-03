const pokemonList = [
  {
    name: "Bulbasaur", // Pokemon name
    height: 7, // Pokemon height
    types: ["grass", "poison"], // Pokemon types
  },
  {
    name: "Charmander",
    height: 6,
    types: ["fire"],
  },
  {
    name: "Squirtle",
    height: 5,
    types: ["water"],
  },
];

// Get the <ul> element from the page
const listElement = document.getElementById("pokemon-list");

// Loop through each Pokemon in the array
pokemonList.forEach(function (pokemon) {
  // Log each Pokémon to the console
  console.log(`${pokemon.name} (height: ${pokemon.height})`);

  // Create a new list item element
  const listItem = document.createElement("li");
  listItem.textContent = `${pokemon.name} (height: ${pokemon.height})`;

  // Highlight tall Pokemon
  if (pokemon.height > 6) {
    listItem.style.color = "red";
    listItem.style.fontWeight = "bold";
  }

  // Add the list item to the page
  listElement.appendChild(listItem);
});
