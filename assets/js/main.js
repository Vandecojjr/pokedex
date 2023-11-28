
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10;
let offset = 0;

const Modal = document.getElementsByClassName('modal')[0];
function fecharModal() { Modal.style.display = 'none' }
function AbrirModal(id) {
    Modal.style.display = 'block'
    pokeApi.getPokemonModal(id)
        .then((pokemon) => {

            const newHtml = `
    <div class="contentModal ${pokemon.type}">
            <div class="headerModal">
                <span class="namemodal">${pokemon.name}</span>
                <span class="idmodal">#${pokemon.number}</span>
                <ol class="typesModal">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <div class="divImg">
                <img src="${pokemon.photo}" alt="" class="imgModal">
            </div>
            
            <div class="detailsModal">
                <span>Sobre</span>
                <div class="geral">
                    <ol class="title">
                        <li>Especie</li>
                        <li>Habilidade</li>
                        <li>Vida</li>
                    </ol>
                    <ol >
                        <li>${pokemon.specie}</li>
                        <li>${pokemon.ability}</li>
                        <li>${pokemon.hp}</li>
                    </ol>
                </div>
                <span>Breeding</span>
                <div class="reproducao">
                    <ol class="title">
                        <li>Ataque</li>
                        <li>Defesa</li>
                    </ol>
                    <ol >
                        <li>${pokemon.attack}</li>
                        <li>${pokemon.defense}</li>
                    </ol>
                </div>
                <span class="back ${pokemon.type}" onclick="fecharModal()">voltar</span>
            </div>
        </div>
    `
            Modal.innerHTML = newHtml
        })
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}" onclick="AbrirModal(${pokemon.number})">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
    `).join('')
        pokemonList.innerHTML += newHtml
    })

}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})