"use strict";
/**
 * clear container with small pokemon cards
 *
 */
function clearContainerWithSmallPokemonCards() {
    if (containerRenderAllPokemonSmall != null) {
        containerRenderAllPokemonSmall.innerHTML = " ";
    }
}
/**
 * update the absolte base data of the pokemon
 *
 */
async function updateBaseDataJson() {
    for (let i = 1; i <= 10; i++) {
        await getPokemonValueByApi(i, url1);
        await getPokemonValueByApi(i, url2);
        let type1ValueForColor = setColorCodeCurrentPokemon(url1responseCurrentPokemonAsJson, 0);
        localPokemonsData[i] = new PokemonCardBaseData(url1responseCurrentPokemonAsJson["id"], url1responseCurrentPokemonAsJson["name"], url1responseCurrentPokemonAsJson["sprites"]["other"]["official-artwork"]["front_default"], type1ValueForColor, url2responseCurrentPokemonAsJson["generation"]["name"]);
        console.log("Pokemon created wit ID: ", i);
    }
}
/**
 * load pokemon base data from JSON
 *
 */
async function loadPokemonBaseJSON() {
    let response = await fetch("pokemonBaseData.json");
    localPokemonsData = await response.json();
}
/**
 * to fetch poke api values
 *
 * @param currentPokemon => chose current pokemon
 * @param urlApi  => request url to pokemon datas
 */
async function getPokemonValueByApi(currentPokemon, urlApi) {
    try {
        let response;
        response = await fetch(urlApi + currentPokemon.toString());
        if (urlApi == "https://pokeapi.co/api/v2/pokemon/") {
            url1responseCurrentPokemonAsJson = await response.json();
        }
        else {
            url2responseCurrentPokemonAsJson = await response.json();
        }
    }
    catch {
        errorFunction(currentPokemon);
    }
}
/**
 * function and response, when request to api was incorrect or erroneous
 *
 * @param currentPokemon => chose current pokemon
 */
async function errorFunction(currentPokemon) {
    counterRequestFailToApi++;
    url1responseCurrentPokemonAsJson = {
        id: currentPokemon,
        status: "fail",
    };
    if (counterRequestFailToApi >= 4) {
        found = false;
        maxPokemons = currentPokemon;
        console.warn(`Request to API was stop by number ${currentPokemon}, you had min.${counterRequestFailToApi} fail request. Try again later.`);
    }
    else {
        console.warn(`Request not OK with number ${currentPokemon}, you have at the moment min.${counterRequestFailToApi} fail request.`);
    }
}
/**
 * pokemon save local
 *
 * @param i => id of the pokemon to save
 */
function savePokemonLocal(i) {
    if (url1responseCurrentPokemonAsJson != null &&
        url1responseCurrentPokemonAsJson["status"] != "fail" &&
        found == true) {
        createPokemonLocal(i, url1responseCurrentPokemonAsJson, url2responseCurrentPokemonAsJson);
    }
    else {
        found = false;
    }
}
/**
 * creat pokemon card at values api
 *
 * @param i => id of the pokemon for the request
 * @param url1responseCurrentPokemonAsJson  => url1 of the pokemon for the request of stats/values
 * @param url2responseCurrentPokemonAsJson => url2 of the pokemon for the request of stats/values
 */
function createPokemonLocal(i, url1responseCurrentPokemonAsJson, url2responseCurrentPokemonAsJson) {
    let type2Value = checkType2Exists(url1responseCurrentPokemonAsJson);
    let abilitie2Value = checkAbilitie2Exists(url1responseCurrentPokemonAsJson);
    let type1ValueForColor = setColorCodeCurrentPokemon(url1responseCurrentPokemonAsJson, 0);
    localPokemonsData[i] = new PokemonCard(url1responseCurrentPokemonAsJson["id"], url1responseCurrentPokemonAsJson["name"], url1responseCurrentPokemonAsJson["sprites"]["other"]["official-artwork"]["front_default"], url1responseCurrentPokemonAsJson["types"][0]["type"]["name"], type1ValueForColor, url2responseCurrentPokemonAsJson["generation"]["name"], parseInt(url1responseCurrentPokemonAsJson["weight"]) / 10, parseInt(url1responseCurrentPokemonAsJson["height"]) / 10, url1responseCurrentPokemonAsJson["abilities"][0]["ability"]["name"], url2responseCurrentPokemonAsJson["flavor_text_entries"][0]["flavor_text"], url1responseCurrentPokemonAsJson["stats"][0]["base_stat"], url1responseCurrentPokemonAsJson["stats"][1]["base_stat"], url1responseCurrentPokemonAsJson["stats"][2]["base_stat"], url1responseCurrentPokemonAsJson["stats"][3]["base_stat"], url1responseCurrentPokemonAsJson["stats"][4]["base_stat"], url1responseCurrentPokemonAsJson["stats"][5]["base_stat"], type2Value, abilitie2Value);
}
/**
 * function checks if type2 exists for the pokemon
 *
 * @param url1responseCurrentPokemonAsJson => url of the pokemon for the request of the value
 * @returns => return undefined or the value when exists
 */
function checkType2Exists(url1responseCurrentPokemonAsJson) {
    let type2Value = "undefined";
    if (url1responseCurrentPokemonAsJson["types"].length > 1) {
        type2Value = url1responseCurrentPokemonAsJson["types"][1]["type"]["name"];
    }
    return type2Value;
}
/**
 * function checks if abilitie2 exists for the pokemon
 *
 * @param url1responseCurrentPokemonAsJson => url of the pokemon for the request of the value
 * @returns => return undefined or the value when exists
 */
function checkAbilitie2Exists(url1responseCurrentPokemonAsJson) {
    let abilitie2Value = "undefined";
    if (url1responseCurrentPokemonAsJson["abilities"].length > 1) {
        abilitie2Value =
            url1responseCurrentPokemonAsJson["abilities"][1]["ability"]["name"];
    }
    return abilitie2Value;
}
/**
 * function checks the second color for the second type, when this exists for the pokemon
 *
 * @param url1responseCurrentPokemonAsJson => url of the pokemon for the request of the value
 * @param typePosition  => index of the second type position
 * @returns => return undefined or set the correct color
 */
function setColorCodeCurrentPokemon(url1responseCurrentPokemonAsJson, typePosition) {
    let type1ValueForColor = "undefined";
    for (let d = 0; d < colorCodes.length; d++) {
        const element = colorCodes[d];
        if (element[0] ==
            url1responseCurrentPokemonAsJson["types"][typePosition]["type"]["name"]) {
            type1ValueForColor = element[1];
            break;
        }
    }
    return type1ValueForColor;
}
/**
 * sort all pokemons to the generation
 *
 */
async function sortPokemonToGeneration() {
    for (let k = currentPokemon; k <= Object.keys(localPokemonsData).length; k++) {
        const generation = await localPokemonsData[k]["pokemonGeneration"];
        switch (generation) {
            case "generation-i":
                generation1[k] = await localPokemonsData[k];
                break;
            case "generation-ii":
                generation2[k] = await localPokemonsData[k];
                break;
            case "generation-iii":
                generation3[k] = await localPokemonsData[k];
                break;
            case "generation-iv":
                generation4[k] = await localPokemonsData[k];
                break;
            case "generation-v":
                generation5[k] = await localPokemonsData[k];
                break;
            case "generation-vi":
                generation6[k] = await localPokemonsData[k];
                break;
            case "generation-vii":
                generation7[k] = await localPokemonsData[k];
                break;
            case "generation-viii":
                generation8[k] = await localPokemonsData[k];
                break;
            case "generation-ix":
                generation9[k] = await localPokemonsData[k];
                break;
            default:
                break;
        }
    }
}
/**
 * redner small pokemon cards
 *
 * @param i => the id of the pokemon who to be render
 *  */
async function renderSmallPokemonCard(i) {
    let generationSelected;
    switch (i) {
        case 1:
            generationSelected = await generation1;
            break;
        case 2:
            generationSelected = await generation2;
            break;
        case 3:
            generationSelected = await generation3;
            break;
        case 4:
            generationSelected = await generation4;
            break;
        case 5:
            generationSelected = await generation5;
            break;
        case 6:
            generationSelected = await generation6;
            break;
        case 7:
            generationSelected = await generation7;
            break;
        case 8:
            generationSelected = await generation8;
            break;
        case 9:
            generationSelected = await generation9;
            break;
        default:
            break;
    }
    for (let counterBtn = 1; counterBtn < 10; counterBtn++) {
        if (counterBtn == i) {
            let addClass = document.getElementById("renderGenerationBtn" + i);
            if (addClass != null) {
                addClass.classList.add("bg-gray-200");
            }
        }
        else {
            let removeClass = document.getElementById("renderGenerationBtn" + counterBtn);
            if (removeClass != null) {
                removeClass.classList.remove("bg-gray-200");
            }
        }
    }
    createRenderSmallPokemonCard(generationSelected);
    async function createRenderSmallPokemonCard(generationSelected) {
        if (containerRenderAllPokemonSmall != null) {
            containerRenderAllPokemonSmall.innerHTML = " ";
            for (let j = 0; j <= Object.keys(generationSelected).length; j++) {
                let generationKeyPosition = parseInt(Object.keys(generationSelected)[j]);
                if ((await generationSelected[generationKeyPosition]) != null) {
                    let renderImage = await generationSelected[generationKeyPosition]["pokemonImage"];
                    let renderColor = await generationSelected[generationKeyPosition]["color"];
                    let renderGeneration = await generationSelected[generationKeyPosition]["pokemonGeneration"];
                    let renderId = await generationSelected[generationKeyPosition]["pokemonId"];
                    let renderName = await generationSelected[generationKeyPosition]["pokemonName"];
                    if (j == Object.keys(generationSelected).length - 1) {
                        let idForStyle = "auto";
                        containerRenderAllPokemonSmall.innerHTML += pokemonSmallCard(renderId, renderName, renderImage, renderColor, renderGeneration, idForStyle);
                    }
                    else {
                        let idForStyle = "0.5rem";
                        containerRenderAllPokemonSmall.innerHTML += pokemonSmallCard(renderId, renderName, renderImage, renderColor, renderGeneration, idForStyle);
                    }
                }
            }
            containerRenderAllPokemonSmall.innerHTML += `<div class="flex1" flex flex-col  w-26 h-28 my-2 mx-2 bg-white border border-solid border-r-05rem shadow-s cursor-pointer></div>`;
        }
    }
    await rendersortBtnAz(i);
    await sortBtnById(i);
    azBtnNoneIdBtnGray();
}
/**
 * renderSortBtns(generationSelected);
 *
 */
async function rendersortBtnAz(i) {
    let sortBtn = document.getElementById("sortBtnAZ");
    if (sortBtn != null) {
        sortBtn.innerHTML = createSortBtn(i);
    }
}
/**
 * render sort btn id
 *
 */
async function sortBtnById(i) {
    let sortId = document.getElementById("sortId");
    if (sortId != null) {
        sortId.innerHTML = createSortIdBtn(i);
    }
}
function azBtnGrayIdBtnNone() {
    let azBtnInline = document.getElementById("sortBtnAzInline");
    let idBtnInline = document.getElementById("sortIdInline");
    if (azBtnInline != null && idBtnInline != null) {
        azBtnInline.classList.add("bg-gray-200");
        idBtnInline.classList.remove("bg-gray-200");
    }
}
function azBtnNoneIdBtnGray() {
    let azBtnInline = document.getElementById("sortBtnAzInline");
    let idBtnInline = document.getElementById("sortIdInline");
    if (azBtnInline != null && idBtnInline != null) {
        azBtnInline.classList.remove("bg-gray-200");
        idBtnInline.classList.add("bg-gray-200");
    }
}
/**
 * function sort the current generation
 *
 * @param generation => is the current generation to be sorted
 */
async function sortPokemonAZ(generation) {
    let sortArray = [];
    if (containerRenderAllPokemonSmall != null) {
        containerRenderAllPokemonSmall.innerHTML = "";
        let startFirstObject = generation[Object.keys(generation)[0]];
        for (let i = startFirstObject["pokemonId"]; i < startFirstObject["pokemonId"] + Object.keys(generation).length; i++) {
            sortArray.push([
                await generation[i]["pokemonName"],
                await generation[i]["pokemonId"],
            ]);
        }
        sortArray.sort();
        for (let j = 0; j < sortArray.length; j++) {
            const element = sortArray[j][1];
            renderSortPokemonCard(generation, generation[element]["pokemonId"]);
        }
    }
    azBtnGrayIdBtnNone();
}
/**
 * function create all small pokemon card for the current generation
 *
 * @param generation => is the current generation to be create
 * @param indexPokemon  => is the id for the pokemons to be render
 */
async function renderSortPokemonCard(generation, indexPokemon) {
    if (containerRenderAllPokemonSmall != null) {
        containerRenderAllPokemonSmall.innerHTML = "";
        let renderImage = await generation[indexPokemon]["pokemonImage"];
        let renderColor = await generation[indexPokemon]["color"];
        let renderGeneration = await generation[indexPokemon]["pokemonGeneration"];
        let renderId = await generation[indexPokemon]["pokemonId"];
        let renderName = await generation[indexPokemon]["pokemonName"];
        containerRenderAllPokemonSmall.innerHTML += pokemonSmallCard(renderId, renderName, renderImage, renderColor, renderGeneration);
    }
}
/**
 * load all pokemons in a array
 *
 */
function loadPokemonNamesInArray() {
    for (let i = 1; i <= Object.keys(localPokemonsData).length; i++) {
        const element = localPokemonsData[i]["pokemonName"][0].toUpperCase() +
            localPokemonsData[i]["pokemonName"].slice(1);
        searchAllPokemonsArray.push(element);
    }
    searchAllPokemonsArray.sort();
}
/**
 *render next when coming to the bottom at the side
 *
 */
function renderMorePokemonCardsSmall() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        alert("Unten angekommen!"); // you're at the bottom of the page
    }
}
/**
 * check and write type two if exists
 *
 * @returns => text or undefined
 */
async function checkType2() {
    let checkType2 = "undefined";
    if (url1responseCurrentPokemonAsJson["types"].length > 1) {
        checkType2 =
            url1responseCurrentPokemonAsJson["types"][1]["type"]["name"][0].toUpperCase(0) +
                url1responseCurrentPokemonAsJson["types"][1]["type"]["name"].slice(1);
    }
    return checkType2;
}
/**
 * check and write abilitie two if exists
 *
 * @returns => value or undefined
 */
async function checkAbilities2() {
    let checkAbilities2 = "undefined";
    if (url1responseCurrentPokemonAsJson["abilities"].length > 1) {
        checkAbilities2 =
            url1responseCurrentPokemonAsJson["abilities"][1]["ability"]["name"];
    }
    return checkAbilities2;
}
/**
 * creat the second color, when type2 exists
 *
 * @param type2 => value type2 exists or not
 * @returns  => the correct color
 */
async function checkColorForType2(type2) {
    let checkColor2 = "undefined";
    if (type2 != "undefined") {
        let farbcode = setColorCodeCurrentPokemon(url1responseCurrentPokemonAsJson, 1);
        checkColor2 = farbcode;
    }
    return checkColor2;
}
/**
 * fix the format bug in the api and give correct language
 *
 * @returns => correct language
 */
async function fixFormatBugByApiInFlavor() {
    let indexInArrayFlavour = 0;
    for (let y = 0; y <
        (await url2responseCurrentPokemonAsJson["flavor_text_entries"].length); y++) {
        const element = await url2responseCurrentPokemonAsJson["flavor_text_entries"][y];
        if ((await element["language"]["name"]) == "en") {
            indexInArrayFlavour = y;
            break;
        }
    }
    /**
     * fix format bug:
     *
     */
    let flavorOld = await url2responseCurrentPokemonAsJson["flavor_text_entries"][indexInArrayFlavour]["flavor_text"];
    let newValue = flavorOld.replace("\f", " ");
    return newValue;
}
/**
 * if a value does not exist for the current pokemon, it should not be displayed
 *
 * @param renderBigPokemonCard => value of the current popkemon object
 */
function setAllUndefinedStatsDisplayNone(renderBigPokemonCard) {
    if (renderBigPokemonCard.pokemonType2 == "undefined") {
        let type2Html = document.getElementById("pokemonType2");
        if (type2Html != null) {
            type2Html.style.display = "none";
        }
    }
}
/**
 *
 * function create a pokemon object
 *
 * @param url1responseCurrentPokemonAsJson => url of the pokemon for the request of the value
 * @param url2responseCurrentPokemonAsJson => url of the pokemon for the request of the value
 * @param color => correct color for the current pokemon
 * @param flavorNewFixed => give it in correct language
 * @param type2 => exists or not/undefined
 * @param abilities2 => exists or not/undefined
 * @param color2 => exists or not/undefined
 * @returns => give a new pokemon object
 */
async function createAPokemonObject(url1responseCurrentPokemonAsJson, url2responseCurrentPokemonAsJson, color, flavorNewFixed, type2, abilities2, color2) {
    let createObject = new PokemonCard(await url2responseCurrentPokemonAsJson["id"], (await url2responseCurrentPokemonAsJson["name"][0].toUpperCase()) +
        (await url2responseCurrentPokemonAsJson["name"].slice(1)), await url1responseCurrentPokemonAsJson["sprites"]["other"]["official-artwork"]["front_default"], (await url1responseCurrentPokemonAsJson["types"][0]["type"]["name"][0].toUpperCase()) +
        url1responseCurrentPokemonAsJson["types"][0]["type"]["name"].slice(1), color, await url2responseCurrentPokemonAsJson["generation"]["name"], (await url1responseCurrentPokemonAsJson["weight"]) / 10, (await url1responseCurrentPokemonAsJson["height"]) / 10, (await url1responseCurrentPokemonAsJson["abilities"][0]["ability"]["name"][0].toUpperCase()) +
        url1responseCurrentPokemonAsJson["abilities"][0]["ability"]["name"].slice(1), flavorNewFixed, await url1responseCurrentPokemonAsJson["stats"][0]["base_stat"], await url1responseCurrentPokemonAsJson["stats"][1]["base_stat"], await url1responseCurrentPokemonAsJson["stats"][2]["base_stat"], await url1responseCurrentPokemonAsJson["stats"][3]["base_stat"], await url1responseCurrentPokemonAsJson["stats"][4]["base_stat"], await url1responseCurrentPokemonAsJson["stats"][5]["base_stat"], type2, abilities2, color2);
    return createObject;
}
/**
 * create a big pokemon card
 *
 * @param renderBigPokemonCard => give the card back
 */
function renderBigCard(renderBigPokemonCard) {
    let renderContainBigCard = document.getElementById("renderBigPokemon");
    if (renderContainBigCard != null) {
        renderContainBigCard.innerHTML = " ";
        renderContainBigCard.innerHTML +=
            renderBigPokemonCardWithStats(renderBigPokemonCard);
    }
}
/**
 * function add overflow hidden when it need
 *
 */
function setOverflowHiddenBody() {
    let bodyElement = document.getElementById("bodyElement");
    if (bodyElement != null) {
        bodyElement.classList.add("overflow-hidden");
    }
}
/**
 * hid the simulation box from start
 *
 */
function hiddenSimulationBox() {
    let hiddenSimulationBox = document.getElementById("simulationBox");
    if (hiddenSimulationBox != null) {
        setTimeout(() => {
            hiddenSimulationBox.style.display = "none";
        }, 11000);
    }
}
