function executeProgram() { // repository wrapped in IIFE
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

    function getAll() {
      return repository;
    }

    function add(pokemon) {
      repository.push(pokemon);
    }

    return {
      add: add,
      getAll: getAll
    };
  })();

  /*
  print out the list of Pokemon names and weights, noting any with weight
  greater than 'bigWeight'
  */

  pokemonRepository.getAll().forEach(function(pokemon) {
    var pokemonComment = pokemon.name + ' (weight: ' + pokemon.weight + ' kg)';

    if (pokemon.weight > 85) {
      pokemonComment += ' - Wow, that\'s big!';
    }

    document.write('<p>' + pokemonComment + '</p>');
  });
}
executeProgram();
