function executeProgram() {
  var data = {};

  var pokemonRepository = (function() {

    var repository = []; // to hold list of Pokemon characters
    var bigWeight = 85;

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
  for (var i = 0; i < repository.length; i++) {
    var pokemonComment = repository[i].name + '(weight: ' + repository[i].weight + ' kg)';

    if (repository[i].weight > bigWeight) {
      pokemonComment += ' - Wow, that\'s big!';
    }

    document.write('<p>' + pokemonComment + '</p>');
  }
}
executeProgram();
