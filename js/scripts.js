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

  // === Add List Item to Card Layout ===
  function addListItem(pokemon) {
    const listGroup = document.querySelector(".pokemon-list");

    const col = document.createElement("div");
    col.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3");

    const card = document.createElement("div");
    card.classList.add("card", "h-100", "shadow-sm");

    const img = document.createElement("img");
    img.src = pokemon.imageUrl;
    img.alt = `${pokemon.name} image`;
    img.classList.add("card-img-top", "p-3");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center");

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.innerText = capitalize(pokemon.name);

    const typeContainer = document.createElement("div");
    typeContainer.classList.add("mb-2");

    // Add type badges
    if (pokemon.types && pokemon.types.length > 0) {
      pokemon.types.forEach((type) => {
        const badge = document.createElement("span");
        badge.innerText = capitalize(type);
        badge.classList.add("type-badge", `type-${type.toLowerCase()}`);
        typeContainer.appendChild(badge);
      });
    }

    cardBody.appendChild(title);
    cardBody.appendChild(typeContainer);
    card.appendChild(img);
    card.appendChild(cardBody);

    // Add click event for modal
    card.addEventListener("click", function () {
      showDetails(pokemon);
    });

    col.appendChild(card);
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
    modalImage.src = pokemon.imageUrl;
    modalImage.alt = pokemon.name;

    // Clear previous types
    modalTypes.innerHTML = "";

    pokemon.types.forEach((type) => {
      const badge = document.createElement("span");
      badge.innerText = capitalize(type);
      badge.classList.add("type-badge", `type-${type.toLowerCase()}`);
      modalTypes.appendChild(badge);
    });
  }

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
  };
})();

function renderPokemonList(list = pokemonRepository.getAll()) {
  const listGroup = document.querySelector(".pokemon-list");
  listGroup.innerHTML = "";
  list.forEach((pokemon) => {
    pokemonRepository.loadDetails(pokemon).then(() => {
      pokemonRepository.addListItem(pokemon);
    });
  });
}

pokemonRepository.loadList().then(function () {
  renderPokemonList();
});
