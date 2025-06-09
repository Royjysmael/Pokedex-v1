// === Pokémon Repository IIFE ===
const pokemonRepository = (function () {
  const pokemonList = [];

  // === Add Pokémon ===
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // === Get All Pokémon ===
  function getAll() {
    return pokemonList;
  }

  // === Add List Item to List Group ===
  function addListItem(pokemon) {
    const listGroup = document.querySelector(".pokemon-list");

    const col = document.createElement("div");
    col.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3");

    const listItem = document.createElement("div");
    listItem.classList.add(
      "list-group-item",
      "list-group-item-action",
      "text-center"
    );
    listItem.innerText = capitalize(pokemon.name);

    listItem.addEventListener("click", function () {
      showDetails(pokemon);
    });

    col.appendChild(listItem);
    listGroup.appendChild(col);
  }

  // === Capitalize Helper ===
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // === Show Details ===
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);

      // Show the Bootstrap modal
      const modalElement = document.getElementById("pokemonModal");
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    });
  }

  // === Load Pokémon List ===
  function loadList() {
    showLoadingMessage();
    return fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
      .then((response) => response.json())
      .then((json) => {
        hideLoadingMessage();
        json.results.forEach((item) => {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch((e) => {
        hideLoadingMessage();
        console.error("Error loading Pokémon list:", e);
      });
  }

  // === Load Details ===
  function loadDetails(pokemon) {
    showLoadingMessage();
    return fetch(pokemon.detailsUrl)
      .then((response) => response.json())
      .then((details) => {
        hideLoadingMessage();
        pokemon.imageUrl = details.sprites.front_default || "img/fallback.png";
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = (details.types || []).map((type) => type.type.name);
      })
      .catch((e) => {
        hideLoadingMessage();
        console.error("Error loading Pokémon details:", e);
      });
  }

  // === Show Loading Message ===
  function showLoadingMessage() {
    const loadingMessage = document.createElement("p");
    loadingMessage.innerText = "Loading Pokémon...";
    loadingMessage.classList.add("loading-message");
    document.body.appendChild(loadingMessage);
  }

  // === Hide Loading Message ===
  function hideLoadingMessage() {
    const loadingMessage = document.querySelector(".loading-message");
    if (loadingMessage) {
      loadingMessage.remove();
    }
  }

  // === Show Modal ===
  function showModal(pokemon) {
    const modalTitle = document.querySelector("#pokemonModalLabel");
    const modalHeight = document.querySelector(".modal-height");
    const modalWeight = document.querySelector(".modal-weight");
    const modalTypes = document.querySelector(".modal-types");
    const modalImage = document.querySelector(".modal-image");

    modalTitle.innerText = capitalize(pokemon.name);
    modalHeight.innerText = `Height: ${pokemon.height}`;
    modalWeight.innerText = `Weight: ${pokemon.weight}`;
    modalTypes.innerText = `Type: ${pokemon.types.join(", ")}`;
    modalImage.src = pokemon.imageUrl;
    modalImage.alt = pokemon.name;
  }

  // === Return Public Methods ===
  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
  };
})();

// === Render Pokémon List ===
function renderPokemonList(list = pokemonRepository.getAll()) {
  const listGroup = document.querySelector(".pokemon-list");
  listGroup.innerHTML = "";
  list.forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
}

// === Load and Initialize ===
pokemonRepository.loadList().then(function () {
  renderPokemonList();
});
