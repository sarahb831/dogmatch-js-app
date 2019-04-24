(function () { // repository wrapped in IIFE
  var data = {};

  var pokemonRepository = (function() {

    var repository = []; // to hold list of Pokemon characters

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
      getAll: getAll
    };
  })();

/* show details of item
*/
  function showDetails(pokemon) {
    console.log(pokemon);
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
