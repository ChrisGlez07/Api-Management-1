var array = JSON.parse(localStorage.getItem("pokemon")) || [];
showLocalStorage();

document.getElementById('fetch-button').addEventListener('click', function () {
    var pokemonNumber = document.getElementById('pokemon-input').value.trim();


    if (!pokemonNumber) {
        alert('Por favor, ingresa un número de Pokémon.');
        return;
    }

    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokemonNumber;
    fetch(apiUrl)
        .then(function (res) {
            if (!res.ok) {
                throw new Error('No se encontró el Pokémon.');
            }
            return res.json();
        })
        .then(function (response) {
            var imageUrl = response.sprites.front_default;
            var pokemonName = response.name;
            var pokemonId = response.id;
            var mainAttack = response.moves[0].move.name;
            var types = [];
            for (var i = 0; i < response.types.length; i++) {
                types.push(response.types[i].type.name);
            }
            var hp;
            for (var j = 0; j < response.stats.length; j++) {
                if (response.stats[j].stat.name === 'hp') {
                    hp = response.stats[j].base_stat;
                    break;
                }
            }
            var tableBody = document.getElementById('pokemon-table-body');
            var newRow = tableBody.insertRow();

            var imageCell = newRow.insertCell(0);
            var nameCell = newRow.insertCell(1);
            var idCell = newRow.insertCell(2);
            var attackCell = newRow.insertCell(3);
            var typeCell = newRow.insertCell(4);
            var hpCell = newRow.insertCell(5);

            var imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            imageElement.width = 100;
            imageCell.appendChild(imageElement);

            nameCell.textContent = pokemonName;
            idCell.textContent = pokemonId;
            attackCell.textContent = mainAttack;
            typeCell.textContent = types.join(', ');
            hpCell.textContent = hp;

            var pokemon = {
                "name": pokemonName,
                "id": pokemonId,
                "img": imageUrl,
                "attack": mainAttack,
                "type": types,
                "hp": hp
            }

            array.push(pokemon);
            localStorage.setItem("pokemon", JSON.stringify(array));

        })
        .catch(function (error) {
            console.error('Error fetching data:', error);
            alert('Hubo un error al buscar el Pokémon. Por favor, intenta de nuevo.');
        });
});

function showLocalStorage(){
    var storedPokemon = JSON.parse(localStorage.getItem("pokemon"));
    if (storedPokemon) {
        storedPokemon.forEach(function(pokemon) {
            var tableBody = document.getElementById('pokemon-table-body');
            var newRow = tableBody.insertRow();

            var imageCell = newRow.insertCell(0);
            var nameCell = newRow.insertCell(1);
            var idCell = newRow.insertCell(2);
            var attackCell = newRow.insertCell(3);
            var typeCell = newRow.insertCell(4);
            var hpCell = newRow.insertCell(5);

            var imageElement = document.createElement('img');
            imageElement.src = pokemon.img;
            imageElement.width = 100;
            imageCell.appendChild(imageElement);

            nameCell.textContent = pokemon.name;
            idCell.textContent = pokemon.id;
            attackCell.textContent = pokemon.attack;
            typeCell.textContent = pokemon.type.join(', ');
            hpCell.textContent = pokemon.hp;
        });
    }
}

