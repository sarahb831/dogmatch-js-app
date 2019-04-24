(function () { // repository wrapped in IIFE
  var data = {};

  var pokemonRepository = (function() {

    var repository = []; // to hold list of Pokemon characters
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/';


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
      return true;  //if made it here, all keys match
    }
  }

  /*
  get the list of items from the api
  */
  function loadList(){
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function(item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  /*
  load the details for the specified items
  */
  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // now add details to the list__item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = Object.keys(details.types);
    }).catch(function(e) {
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
    add item to isRepositoryEmpty
    */
    function add(pokemon) {
      if ((typeof pokemon === 'object') && ((isRepositoryEmpty(repository) ||
        (isKeyMatch(repository[0], pokemon))))){
          repository.push(pokemon);
        }
      else console.warn("Not valid pokemon data, item not added!");
    }

    return {
      add: add,
      getAll: getAll,
      search: search,
      loadList: loadList,
      loadDetails: loadDetails
    };
  })();

  pokemonRepository.loadList().then(function() {
    // now data is loaded
    pokemonRepository.getAll().forEach(function(pokemon){
      addListItem(pokemon);
    });
  });

  /*
  show details of item
  */
  function showDetails(itemName) {
    var item = pokemonRepository.search(itemName); // get object for this name
    pokemonRepository.loadDetails(item).then(function() {
      console.log('Details for '+item.name+':');
      console.log('=======================');
      console.log('Height: '+item.height);
      console.log('Weight: '+item.weight);
    });
  }

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
    newLi.addEventListener('click', function(event){
      showDetails(event.target.innerText);
    });
  }


})();
