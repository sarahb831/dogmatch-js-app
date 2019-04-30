(function() {
  // IIFE wrapper
  var data = {};

  var $modalContainer = document.querySelector('#modal-container');
  var $message = document.querySelector('#message');

  var pokemonRepository = (function() {
    var repository = []; // to hold list of Pokemon characters
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    /* check for empty repository
        return true if empty, false if not
    */
    function isRepositoryEmpty(repository) {
      if (repository.length > 0) {
        return false;
      }
      return true;
    }

    /* compares keys for two objects, returning true if all match, false
        otherwise
    */
    function isKeyMatch(object1, object2) {
      var object1Keys = Object.keys(object1);
      var object2Keys = Object.keys(object2);

      for (var i = 0; i < object1Keys.length; i++) {
        if (object1Keys[i] !== object2Keys[i]) {
          return false; // not the same key here
        }
        return true; //if made it here, all keys match
      }
    }

    /*
  get the list of items from the api
  */
    function loadList() {
      showLoadingMessage('Loading Pokemon list, please wait...');
      return fetch(apiUrl)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          hideLoadingMessage();
          json.results.forEach(function(item) {
            var pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        })
        .catch(function(e) {
          console.error(e);
        });
    }

    /*
  load the details for the specified item
  */
    function loadDetails(item) {
      var url = item.detailsUrl;
      showLoadingMessage('Loading Pokemon details, please wait...');
      return fetch(url)
        .then(function(response) {
          hideLoadingMessage();
          return response.json();
        })
        .then(function(details) {
          // now add details to the list__item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.weight = details.weight;
          item.types = Object.keys(details.types);
        })
        .catch(function(e) {
          console.error(e);
        });
    }

    /*
    returns the object from the repository for the given name value
    */
    function search(name) {
      for (var i = 0; i < repository.length; i++) {
        if (repository[i].name === name) {
          return repository[i];
        }
      }
      return null; // if no match found
    }

    function getAll() {
      return repository;
    }

    /*
    add item to repository
    */
    function add(pokemon) {
      if (
        typeof pokemon === 'object' &&
        (isRepositoryEmpty(repository) || isKeyMatch(repository[0], pokemon))
      ) {
        repository.push(pokemon);
      } else console.warn('Not valid pokemon data, item not added!');
    }

    return {
      add: add,
      getAll: getAll,
      search: search,
      loadList: loadList,
      loadDetails: loadDetails
    };
  })(); // pokemonRepository end

  pokemonRepository.loadList().then(function() {
    // now data is loaded
    pokemonRepository.getAll().forEach(function(pokemon) {
      addListItem(pokemon);
    });
  });

  function showModal(item) {
    $modalContainer.innerText = '';
    var modal = document.createElement('div');
    modal.classList.add('modal');

    // add new modal content
    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    var titleElement = document.createElement('h1');
    titleElement.innerText = item.name;

    var heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + item.height + ' m';

    var weightElement = document.createElement('p');
    weightElement.innerText = 'Weight: ' + item.weight + ' kg';

    // add details for image
    var imageElement = document.createElement('img');
    imageElement.setAttribute('src', item.imageUrl);
    imageElement.classList.add('pokemon-image');

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(heightElement);
    modal.appendChild(weightElement);

    $modalContainer.appendChild(modal);
    $modalContainer.classList.add('is-visible');
  } // end showModal()

  function hideModal() {
    $modalContainer.classList.remove('is-visible');
  }

  function showLoadingMessage(message) {
    $message.innerText = message;
    $message.classList.add('is-visible');
  } // end showLoadingMessage()

  function hideLoadingMessage() {
    $message.classList.remove('is-visible');
  }
  /*
  show details of item
  */
  function showDetails(itemName) {
    var item = pokemonRepository.search(itemName); // get object for this name
    pokemonRepository.loadDetails(item).then(function() {
      showModal(item);
    });
  } // end showDetails()

  /*
  adds item to display as a button
  */
  function addListItem(pokemon) {
    // add new DOM li element
    var $element = document.querySelector('.item-list');
    var newLi = document.createElement('li');
    newLi.setAttribute('id', pokemon.name);
    newLi.classList.add('item-list__item');

    var button = document.createElement('button');
    button.innerText = pokemon.name;
    newLi.appendChild(button);
    $element.appendChild(newLi);
    newLi.addEventListener('click', function(event) {
      showDetails(event.target.innerText);
    });
  } // end addListItem()

  // exit modal gracefully on Escape key press
  window.addEventListener('keydown', e => {
    if (
      e.key === 'Escape' &&
      $modalContainer.classList.contains('is-visible')
    ) {
      hideModal();
    }
  });

  $modalContainer.addEventListener('click', e => {
    // only close if user clicks on overlay
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });
})();
