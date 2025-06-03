const pokemonRepository = (function () {
  const pokemonList = [];

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
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log("Name:", pokemon.name);
      console.log("Height:", pokemon.height);
      console.log("Types:", pokemon.types.join(", "));
      console.log("Image URL:", pokemon.imageUrl);
    });
  }

  // Load the Pokémon list from the API
  function loadList() {
    showLoadingMessage();
    return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        hideLoadingMessage();
        json.results.forEach(function (item) {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error("Error loading Pokémon list:", e);
      });
  }
  function loadDetails(pokemon) {
    showLoadingMessage();
    return fetch(pokemon.detailsUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        hideLoadingMessage();
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types.map((type) => type.type.name);
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error("Error loading Pokémon details:", e);
      });
  }
  function showLoadingMessage() {
    const loadingMessage = document.createElement("p");
    loadingMessage.innerText = "Loading Pokémon...";
    loadingMessage.classList.add("loading-message");
    document.body.appendChild(loadingMessage);
  }

  function hideLoadingMessage() {
    const loadingMessage = document.querySelector(".loading-message");
    if (loadingMessage) {
      loadingMessage.remove();
    }
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

// After loading data from the API, display Pokémon as buttons
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
