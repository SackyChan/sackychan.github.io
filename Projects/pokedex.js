const pokeCount = 1025;
var pokedex = {}; // {1 : {"name": "Bulbasaur", "img" : url, "type" : ["grass", "poison"], "abilities" : ["overgrow", "chlorophyll"], "desc" : "..."}}

window.onload = async function(){
    for (let i = 1; i <= pokeCount; i++){
        await getPokemon(i);

        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + `: ${pokedex[i]["name"].toUpperCase()}`;
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener("click", updateMon);
        document.getElementById("poke-list").append(pokemon);
    }
    document.getElementById("description").innerText = pokedex[1]["desc"];
}

async function getPokemon(num) {
    let url = `https://pokeapi.co/api/v2/pokemon/${num}`;

    let result = await fetch(url);
    let mon = await result.json();

    let pokeName = mon["name"];
    let pokeType = mon["types"];
    let pokePower = mon["abilities"];
    let pokeSprite = mon["sprites"]["front_default"];

    result = await fetch(mon["species"]["url"]);
    let pokeDesc = await result.json();
    pokeDesc = pokeDesc["flavor_text_entries"][0]["flavor_text"];

    pokedex[num] = {"name": pokeName, "img" : pokeSprite, "type" : pokeType, "ability": pokePower, "desc" : pokeDesc}


}

function updateMon(){
    document.getElementById("sprite").src = pokedex[this.id]["img"];
    currentId = this.id;
    //clear previous types 
    let typeDiv = document.getElementById("poke-types");
    while (typeDiv.firstChild){
        typeDiv.firstChild.remove();
    }
    // update types
    let types = pokedex[this.id]["type"];
    for (let i = 0; i < types.length; i++){
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]);
        typeDiv.append(type);
        if (types.length == 2 && i == 0)
            typeDiv.append("/");
    }
    //same as types for abilities
    let abilityDiv = document.getElementById("poke-powers");
    while (abilityDiv.firstChild){
        abilityDiv.firstChild.remove();
    }
    let abilities = pokedex[this.id]["ability"];
    for (let a = 0; a < abilities.length; a++){
        let ability = document.createElement("span");
        ability.innerText = abilities[a]["ability"]["name"].toUpperCase();
        ability.classList.add("ability-box");
        ability.classList.add(abilities[a]["ability"]["name"]);
        abilityDiv.append(ability);
        if ((abilities.length >= 2 && a == 0) || (abilities.length > 2 && a == 1)){
            abilityDiv.append("/ \n");
        }
    }
    // overwrites name based on selection
    let monName = document.getElementById("poke-name");
    monName.innerText = pokedex[this.id]["name"].toUpperCase();

    //update description
    document.getElementById("description").innerText = pokedex[this.id]["desc"];
}


