const urlDetalhes = window.location.href;
const inicioNum = urlDetalhes.indexOf("=");
const num = urlDetalhes.substring((inicioNum+1));
const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${num}`;
fetch(pokeUrl)
  .then((response) => response.json())
  .then((jsonBody) => {
    const pokemon = novoPokemon(jsonBody);
    novoHtml(pokemon);
  })
  .catch((error) => {
    console.error("Ocorreu um erro na requisição: " + error);
  });
function novoPokemon(listaDeDetalhes){

    const pokemon = new Pokemon()
    pokemon.name = listaDeDetalhes.name;
    pokemon.number = listaDeDetalhes.id;
    pokemon.photo = listaDeDetalhes.sprites.other.dream_world.front_default;
    const status = listaDeDetalhes.stats.map((statSlot) => statSlot.base_stat);
    pokemon.hp = status[0];
    pokemon.attack = status[1];
    pokemon.defense = status[2];
    pokemon.spAttack = status[3];
    pokemon.spDefense = status[4];
    pokemon.speed = status[5];
    const types = listaDeDetalhes.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    return(pokemon);

}

function novoHtml(pokemon){
    document.title=pokemon.name;
    let body = document.body;
    body.innerHTML = `
    <section class="caixa">
    <h1>${pokemon.name}  #${pokemon.number} </h1>

    <div class="pokemon-container">        
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        <p>tipos</p>
        <ol class="tipos">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        <p>Status</p>
        <ul class="stats">
            <li>hp:${pokemon.hp}</li>
            <li>attack: ${pokemon.attack}</li>
            <li>defense: ${pokemon.defense}</li>
            <li>special-attack: n${pokemon.spAttack}</li>
            <li>special-defense: ${pokemon.spDefense}</li>
            <li>speed: ${pokemon.speed}</li>
        </ul></div>
    <a href="pokemon.html?numero=${pokemon.number +1}" >prox</a>

</section>
<script src="/assets/js/pokemon-model.js"></script>
<script src="assets/js/pokemon-detalhe.js"></script>
    `
 }
