export default async function fetchPokemon() {
    return fetch('https://pokeapi.co/api/v2/pokemon').then(response => response.json()).then(json => json.results);
}