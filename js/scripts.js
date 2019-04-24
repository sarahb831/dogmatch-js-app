(function () { // repository wrapped in IIFE
  var data = {};

  var pokemonRepository = (function() {

    var repository = []; // to hold list of Pokemon characters
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    var pikachu = {
      name: 'Pikachu',
      height: 0.4,
      weight: 6.0,
      types: ['electric']
    };

    var bulbasaur = {
      name: 'Bulbasaur',
      height: 0.7,
      weight: 6.9,
      types: ['grass', 'poison']
    };

    var mew = {
      name: 'Mew',
      height: 0.4,
      weight: 4.0,
      types: ['psychic']
    };

    var blastoise = {
      name: 'Blastoise',
      height: 1.6,
      weight: 85.5,
      types: ['water']
    };

    var spearow = {
      name: 'Spearow',
      height: 0.3,
      weight: 2,
      types: ['flying', 'normal']
    };

    var nidoqueen = {
      name: 'Nidoqueen',
      height: 1.3,
      weight: 60,
      types: ['ground', 'poison']
    };

    var repository = [pikachu, mew, bulbasaur, blastoise, spearow, nidoqueen];

    /* check for empty repository
        return true if empty, false if not
    */
    function isRepositoryEmpty(repository) {
      if (repository.length > 0) {
        return false;
      }
      return true;
    }

    /* checks each key for two objects, returning true if all match, false
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

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // now add details to the list__item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function(e) {
      console.error(e);
    });
  }

    function search(item) {
      // return details for specified item
    }

    function getAll() {
      return repository;
    }

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

/* show details of item
*/
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      console.log(item); });
  }


  function addListItem(pokemonName) {
    // add new DOM li element
    var $element = document.querySelector('.item-list');
    var newLi = document.createElement('li');
    newLi.setAttribute('id', pokemonName);
    newLi.classList.add('item-list__item');

    var button = document.createElement('button');
    button.innerText = pokemonName;
    newLi.appendChild(button);
    $element.appendChild(newLi);

// can't get both button and li added to DOM for some reason

    newLi.addEventListener('click', function(event){
      showDetails(event.target.innerText);
    });
  }



  pokemonRepository.getAll().forEach(function(pokemon) {
    addListItem(pokemon.name);
  });

  var tornadus = {
    name: 'Tornadus',
    height: 1.5,
    weight: 63,
    types: ['flying']
  };
/* to test add() function
  pokemonRepository.add(tornadus);
  pokemonRepository.getAll().forEach(function(pokemon) {
//   document.write('<br> Name: ' + pokemon.name);
  });
*/
})();
