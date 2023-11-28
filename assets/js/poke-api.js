
const pokeApi = {};

function convertPokeApiDetailPokenon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.specie = pokeDetail.species.name
    pokemon.ability = pokeDetail.abilities[0].ability.name
    pokemon.hp =  pokeDetail.stats[0].base_stat
    pokemon.attack = pokeDetail.stats[1].base_stat
    pokemon.defense = pokeDetail.stats[2].base_stat
    return pokemon 
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailPokenon)
}

pokeApi.getPokemon = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jasonBody) => jasonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailrequest) => Promise.all(detailrequest))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonModal = (id) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
    return fetch(url)
    .then((response) => response.json())
    .then(convertPokeApiDetailPokenon)
}
