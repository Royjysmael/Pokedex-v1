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
      showModal(pokemon);
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
        pokemon.weight = details.weight;
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
  function showModal(pokemon) {
    const modalContainer = document.querySelector("#modal-container");

    // Clear existing modal content
    modalContainer.innerHTML = "";

    // Create modal content wrapper
    const modal = document.createElement("div");
    modal.classList.add("modal");

    // Create content elements
    const closeButton = document.createElement("button");
    closeButton.classList.add("modal-close");
    closeButton.innerText = "×";
    closeButton.addEventListener("click", hideModal);

    const nameElement = document.createElement("h1");
    nameElement.innerText = pokemon.name;

    const heightElement = document.createElement("p");
    heightElement.innerText = `Height: ${pokemon.height}`;

    const weightElement = document.createElement("p");
    weightElement.innerText = `Weight: ${pokemon.weight}`;

    const typesElement = document.createElement("p");
    typesElement.innerText = `Type: ${pokemon.types.join(", ")}`;

    const imageElement = document.createElement("img");
    imageElement.src = pokemon.imageUrl;
    imageElement.alt = pokemon.name;
    imageElement.classList.add("modal-image");

    // Append elements
    modal.appendChild(closeButton);
    modal.appendChild(nameElement);
    modal.appendChild(heightElement);
    modal.appendChild(weightElement);
    modal.appendChild(typesElement);
    modal.appendChild(imageElement);

    modalContainer.appendChild(modal);
    modalContainer.classList.remove("hidden");
  }

  function hideModal() {
    const modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.add("hidden");
  }

  // Allow closing modal with Esc key or click outside
  window.addEventListener("keydown", function (e) {
    const modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && !modalContainer.classList.contains("hidden")) {
      hideModal();
    }
  });

  window.addEventListener("click", function (e) {
    const modalContainer = document.querySelector("#modal-container");
    if (e.target === modalContainer) {
      hideModal();
    }
  });

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
