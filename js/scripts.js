const pokemonList = [
  {
    name: "Bulbasaur", //Pokémon name
    height: 7, //Pokemon height
    types: ["grass", "poison"], //Pokemon types
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
pokemonList.forEach(function (pokemon) {
  console.log(`${pokemon.name} (height: ${pokemon.height})`);
});
