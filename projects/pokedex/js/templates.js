"use strict";
function pokemonSmallCard(renderId, renderName, renderImage, renderColor, renderGeneration, idForStyle) {
    return `
         <div name="${renderGeneration}-show-pokemon-card" id="${renderId}" onclick="showBigPokemonCard(${renderId})"
                  class="flex flex-col  w-26 h-28 my-2 mx-2 bg-white border border-solid border-r-05rem shadow-s cursor-pointer" style="border-color: ${renderColor};">
                  <div name="pokemon-number" class="w-full h-4 flex justify-end">
                     <div name="number-text"
                        class="font-normal text-xxs flex justify-center text-right px-1" style="color:${renderColor}" >#${renderId}
                     </div>
                  </div>
                  <div name="pokemon-image" class="flex justify-center w-full h-18"><img class="w-18 h-18"
                        name="poke-img" src=${renderImage}></div>
                  <div name="pokemon-name"
                     class="w-full h-full flex text-white justify-center items-center text-center border-r-bottom-05rem" style=background-color:${renderColor}>
                     <div name="name-text" class="font-normal text-xxs flex items-center text-center">${renderName[0].toUpperCase() + renderName.slice(1)}</div>
                  </div>
               </div>
         `;
}
function createSortBtn(i) {
    return `
   
                     <div name="sort-a-z" id="sortBtnAzInline"
                        class="flex items-center px-2 py-2 w-8 h-8 border rounded-md cursor-pointer hover:bg-gray-200"
                        onclick="sortPokemonAZ(generation${i})">
                        <div
                           class="font-semibold text-xxs text-line-xxs text-center text-color-type-dark-gray w-2 h-full flex justify-center items-center">
                           A Z</div>
                        <div class="h-8 w-8 flex justify-center items-center">
                           <svg width="1rem" height="1rem" viewBox="0 0 9 16" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                 d="M9.01733 11.1082L8.76483 10.8557C8.59747 10.6883 8.32611 10.6883 8.15872 10.8557L5.17857 13.8531V0.428572C5.17857 0.191893 4.98668 0 4.75 0H4.39285C4.15617 0 3.96428 0.191893 3.96428 0.428572V13.8531L0.984128 10.8557C0.81677 10.6883 0.545412 10.6883 0.378019 10.8557L0.125518 11.1082C-0.0418394 11.2756 -0.0418394 11.5469 0.125518 11.7143L4.26839 15.8745C4.43575 16.0418 4.7071 16.0418 4.8745 15.8745L9.01737 11.7143C9.18472 11.5469 9.18472 11.2756 9.01733 11.1082V11.1082Z"
                                 fill="#212121" />
                           </svg>
                        </div>
                     </div>`;
}
function createSortIdBtn(i) {
    return `
   
                     <div name="sort-id" id="sortIdInline"
                        class="flex items-center border px-2 py-2 w-8 h-8 rounded-md cursor-pointer hover:bg-gray-200 "
                        onclick="renderSmallPokemonCard(${i})">
                        <div
                           class="font-semibold text-xxs text-line-xxs text-center text-color-type-dark-gray w-2 h-full flex justify-center items-center">
                           I D</div>
                        <div class="h-8 w-8 flex justify-center items-center">
                           <svg width="1rem" height="1rem" viewBox="0 0 9 16" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                 d="M9.01733 11.1082L8.76483 10.8557C8.59747 10.6883 8.32611 10.6883 8.15872 10.8557L5.17857 13.8531V0.428572C5.17857 0.191893 4.98668 0 4.75 0H4.39285C4.15617 0 3.96428 0.191893 3.96428 0.428572V13.8531L0.984128 10.8557C0.81677 10.6883 0.545412 10.6883 0.378019 10.8557L0.125518 11.1082C-0.0418394 11.2756 -0.0418394 11.5469 0.125518 11.7143L4.26839 15.8745C4.43575 16.0418 4.7071 16.0418 4.8745 15.8745L9.01737 11.7143C9.18472 11.5469 9.18472 11.2756 9.01733 11.1082V11.1082Z"
                                 fill="#212121" />
                           </svg>
                        </div>
                     </div>`;
}
function renderBigPokemonCardWithStats(renderBigPokemonCard) {
    return `
   

          <div id="renderBigCardPokemon" class="w-screen h-screen flex justify-center items-center z-10 bg-gray-300 bg-opacity-80">

      <!-- pokemon card -->
      <!-- backgroung-color depending on current pokemon -->
      <div name="background-current-pokemon-by-mobile" class="bg-current-pokemon-full  md:rounded-lg md:pl-3 md:pr-3 md:pb-1" style="background-color:${renderBigPokemonCard.color}">
         <div id="pokecard" name="card-pokemon" class="w-90 h-640 relative border-r-075rem" style="background-color:${renderBigPokemonCard.color}">

            <!-- pokemon card name header -->
            <div name="pokemon-card-name-header"
               class="absolute top-6 left-5 right-5 w-80 h-8  flex items-start p-0 gap-4">
               <div name="arrow-left-pokemon-card-name-header" class="w-6 h-8 flex justify-center items-center cursor-pointer" onclick="closeBigCard()">
                  <!-- pokemon-card-name-header -->
                  <img src="img/arrowLeft.png">
               </div>
               <div name="pokemon-name" class="w-56 h-8 font-bold text-2xl flex items-center justify-center text-white">${renderBigPokemonCard.pokemonName}</div>
               <div name="pokemon-number" class="w-8 h-8 font-bold text-xs flex items-center text-white"># ${renderBigPokemonCard.pokemonId}</div>
            </div>

            <!-- current pokemon stats card -->
            <div name="current-pokemon-stats-card"
               class="w-88 h-103 gap-y-3.5 absolute left-position-50-from-22rem bottom-4 md:bottom-2 bg-white rounded-lg flex flex-col items-center pt-14 px-5">
               <!-- pokemon types -->
               <div name="pokemon-type" class="flex justify-center p-0 gap-4 w-78 h-5">
                  <div name="type1" id="pokemonType1" class="w-14 h-5 py-05 px-2 flex flex-col bg-color-type-psychic rounded-lg" style="background-color:${renderBigPokemonCard.color}">
                     <div class="w-10 h-4 text-xs text-white flex items-center justify-center">${renderBigPokemonCard.pokemonType1}</div>
                  </div>
                  <div name="type2" id="pokemonType2" class="w-14 h-5 py-05 px-2 flex flex-col bg-color-type-medium-gray rounded-lg" style="background-color:${renderBigPokemonCard.pokemonColor2}">
                     <div class=" w-10 h-4 text-xs text-white flex items-center justify-center">${renderBigPokemonCard.pokemonType2}
                     </div>
                  </div>
               </div>
               <!--title about pokemon -->
               <div name="title-about" class="flex justify-center p-0 w-78 h-4">
                  <div name="title-about-text"
                     class="text-sm font-bold flex items-center justify-center text-center w-78 h-4 text-color-type-psychic" style="color:${renderBigPokemonCard.color}">
                     About</div>
               </div>
               <!-- about current pokemon stats -->
               <div name="about-current-pokemon-stats" class="flex p-0 justify-between w-64 h-12">
                  <div name="weight" class="flex flex-col p-0 w-13 h-12">
                     <div name="value-weight" class="flex py-2 gap-2 w-13 h-9">
                        <div class="w-4 h-4"><svg width="17" height="16" viewBox="0 0 17 16" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                 d="M14.5 2H12.4747C11.5609 0.793125 10.1272 0 8.5 0C6.87281 0 5.43906 0.793125 4.52531 2H2.5C1.39719 2 0.5 2.89719 0.5 4V14C0.5 15.1028 1.39719 16 2.5 16H14.5C15.6028 16 16.5 15.1028 16.5 14V4C16.5 2.89719 15.6028 2 14.5 2ZM8.5 1C10.7091 1 12.5 2.79094 12.5 5C12.5 7.20906 10.7091 9 8.5 9C6.29094 9 4.5 7.20906 4.5 5C4.5 2.79094 6.29094 1 8.5 1ZM15.5 14C15.5 14.5522 15.0522 15 14.5 15H2.5C1.94781 15 1.5 14.5522 1.5 14V4C1.5 3.44781 1.94781 3 2.5 3H3.92375C3.65437 3.61344 3.5 4.28813 3.5 5C3.5 7.75688 5.74312 10 8.5 10C11.2569 10 13.5 7.75688 13.5 5C13.5 4.28813 13.3456 3.61344 13.0763 3H14.5C15.0522 3 15.5 3.44781 15.5 4V14ZM8.5 8C9.32719 8 10 7.32719 10 6.5C10 6.065 9.81094 5.67625 9.51437 5.40219L10.4594 3.19688C10.5681 2.94344 10.4506 2.64938 10.1966 2.54063C9.94406 2.43187 9.64906 2.54906 9.54031 2.80344L8.59469 5.00969C7.48656 4.9375 7 5.89531 7 6.5C7 7.32719 7.67281 8 8.5 8ZM8.5 6C8.77625 6 9 6.22375 9 6.5C9 6.77625 8.77625 7 8.5 7C8.22375 7 8 6.77625 8 6.5C8 6.22375 8.22375 6 8.5 6Z"
                                 fill="#212121" />
                           </svg>
                        </div>
                        <div class="text-xxs font-normal w-8 h-4 text-color-type-dark-gray">${renderBigPokemonCard.pokemonWeight}kg</div>
                     </div>
                     <div class="flex justify-center">
                        <div class="text-xxs font-normal w-8 h-4 text-color-type-dark-gray text-center">Weight</div>
                     </div>
                  </div>
                  <div class="bg-color-type-light-gray w-0-25 h-12"></div>

                  <div name="height" class="flex flex-col p-0 w-13 h-12">
                     <div name="value-height" class="flex py-2 gap-2 w-13 h-9">
                        <div class="w-4 h-4"><svg width="9" height="16" viewBox="0 0 9 16" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                 d="M7.5 0H1.5C0.947812 0 0.5 0.447812 0.5 1V15C0.5 15.5522 0.947812 16 1.5 16H7.5C8.05219 16 8.5 15.5522 8.5 15V1C8.5 0.447812 8.05219 0 7.5 0ZM1.5 15V1H7.5V3H5.75C5.61188 3 5.5 3.11188 5.5 3.25V3.75C5.5 3.88812 5.61188 4 5.75 4H7.5V6H5.75C5.61188 6 5.5 6.11188 5.5 6.25V6.75C5.5 6.88812 5.61188 7 5.75 7H7.5V9H5.75C5.61188 9 5.5 9.11187 5.5 9.25V9.75C5.5 9.88813 5.61188 10 5.75 10H7.5V12H5.75C5.61188 12 5.5 12.1119 5.5 12.25V12.75C5.5 12.8881 5.61188 13 5.75 13H7.5V15H1.5Z"
                                 fill="#212121" />
                           </svg>
                        </div>
                        <div class="text-xxs font-normal w-8 h-4 text-color-type-dark-gray">${renderBigPokemonCard.pokemonHeight} m</div>
                     </div>
                     <div class="flex justify-center">
                        <div class="text-xxs font-normal w-8 h-4 text-color-type-dark-gray text-center">Height</div>
                     </div>
                  </div>
                  <div class="bg-color-type-light-gray w-0-25 h-12"></div>
                  <div name="abilities" class="flex flex-col p-0 w-13 h-12">
                     <div name="value-abilities" class="flex py-2 gap-2 w-13 h-9 justify-center">
                        <div class="text-xxs font-normal text-color-type-dark-gray text-center">Ability</div>
                     </div>
                     <div class="flex justify-center">
                        <div class="text-xxs font-normal w-8 h-4 text-color-type-dark-gray text-center">${renderBigPokemonCard.pokemonAbilitie1}</div>
                     </div>
                  </div>
               </div>
               <!-- text over pokemon -->
               <div name="text-over-pokemon"
                  class="flex items-center w-78 h-8 text-center font-normal text-xxs text-color-type-dark-gray">${renderBigPokemonCard.flavorPokemon}</div>
               <div name="title-stats"
                  class="font-bold text-sm w-78 h-4 flex items-center justify-center text-color-type-psychic" style="color:${renderBigPokemonCard.color}">Base Stats
               </div>
               <!-- base stats -->
               <div name="base-stats-current-pokemon" class="flex p-0 gap-2 w-78 h-25">
                  <div name="base-stats-name" class="flex flex-col p-0 w-7 h-25">
                     <div name="HP" class="font-bold text-xxs flex items-center justify-end text-color-type-psychic" style="color:${renderBigPokemonCard.color}">HP
                     </div>
                     <div name="ATK" class="font-bold text-xxs flex items-center justify-end text-color-type-psychic" style="color:${renderBigPokemonCard.color}">
                        ATK
                     </div>
                     <div name="DEF" class="font-bold text-xxs flex items-center justify-end text-color-type-psychic" style="color:${renderBigPokemonCard.color}">
                        DEF
                     </div>
                     <div name="SATK" class="font-bold text-xxs flex items-center justify-end text-color-type-psychic" style="color:${renderBigPokemonCard.color}">
                        SATK
                     </div>
                     <div name="SDEF" class="font-bold text-xxs flex items-center justify-end text-color-type-psychic" style="color:${renderBigPokemonCard.color}">
                        SDEF
                     </div>
                     <div name="SPD" class="font-bold text-xxs flex items-center justify-end text-color-type-psychic" style="color:${renderBigPokemonCard.color}">
                        SPD
                     </div>
                  </div>
                  <div name="line-vertical" class="flex flex-col py-0 px-1 w-2 h-25">
                     <div name="line-vertical-image" class="h-25 w-0.5 bg-color-type-light-gray"></div>
                  </div>
                  <div name="base-stats-level" class="flex flex-col w-5 h-25">
                     <div name="base-stats-level"
                        class="w-5 h-4 font-normal text-xxs flex items-center text-color-type-dark-gray">${renderBigPokemonCard.pokemonHP}</div>
                     <div name="base-stats-level"
                        class="w-5 h-4 font-normal text-xxs flex items-center text-color-type-dark-gray">${renderBigPokemonCard.pokemonAtk}</div>
                     <div name="base-stats-level"
                        class="w-5 h-4 font-normal text-xxs flex items-center text-color-type-dark-gray">${renderBigPokemonCard.pokemonDef}</div>
                     <div name="base-stats-level"
                        class="w-5 h-4 font-normal text-xxs flex items-center text-color-type-dark-gray">${renderBigPokemonCard.pokemonSatk}</div>
                     <div name="base-stats-level"
                        class="w-5 h-4 font-normal text-xxs flex items-center text-color-type-dark-gray">${renderBigPokemonCard.pokemonSdef}</div>
                     <div name="base-stats-level"
                        class="w-5 h-4 font-normal text-xxs flex items-center text-color-type-dark-gray">${renderBigPokemonCard.pokemonSpd}</div>
                  </div>
                  <div class="w-full h-25 flex flex-col">
                     <div name="loader" class="loader relative h-2 w-full m-1">
                        <div name="loading_1" class="loading_1 relative w-full h-full bg-color-type-light-gray"></div>
                        <div name="loading_2" class="loading_HP absolute h-full bg-color-type-psychic top-0" style="background-color: ${renderBigPokemonCard.color}">
                           <style type="text/css">
                              .loading_HP {
                                 position: absolute;
                                 width: calc(100/255*${renderBigPokemonCard.pokemonHP}%);
                                 top: 0px;
                                 animation: bounceHP 2s linear;
                              }

                              @keyframes bounceHP {
                                 0% {
                                    width: 0%;
                                 }

                                 100% {
                                    width: calc(100/255*${renderBigPokemonCard.pokemonHP}%);
                                 }
                              }
                           </style>
                        </div>
                     </div>
                     <div name="loader" class="loader relative h-2 w-full m-1">
                        <div name="loading_1" class="loading_1 relative w-full h-full bg-color-type-light-gray"></div>
                        <div name="loading_2" class="loading_ATK absolute h-full bg-color-type-psychic top-0" style="background-color: ${renderBigPokemonCard.color}">
                           <style type="text/css">
                              .loading_ATK {
                                 position: absolute;
                                 width: calc(100/190*${renderBigPokemonCard.pokemonAtk}%);
                                 top: 0px;
                                 animation: bounceATK 2s linear;
                              }

                              @keyframes bounceATK {
                                 0% {
                                    width: 0%;
                                 }

                                 100% {
                                    width: calc(100/190*${renderBigPokemonCard.pokemonAtk}%);
                                 }
                              }
                           </style>
                        </div>
                     </div>
                     <div name="loader" class="loader relative h-2 w-full m-1">
                        <div name="loading_1" class="loading_1 relative w-full h-full bg-color-type-light-gray"></div>
                        <div name="loading_2" class="loading_DEF absolute h-full bg-color-type-psychic top-0" style="background-color: ${renderBigPokemonCard.color}">
                           <style type="text/css">
                              .loading_DEF {
                                 position: absolute;
                                 width: calc(100/230*${renderBigPokemonCard.pokemonDef}%);
                                 top: 0px;
                                 animation: bounceDEF 2s linear;
                              }

                              @keyframes bounceDEF {
                                 0% {
                                    width: 0%;
                                 }

                                 100% {
                                    width: calc(100/230*${renderBigPokemonCard.pokemonDef}%);
                                 }
                              }
                           </style>
                        </div>
                     </div>
                     <div name="loader" class="loader relative h-2 w-full m-1">
                        <div name="loading_1" class="loading_1 relative w-full h-full bg-color-type-light-gray"></div>
                        <div name="loading_2" class="loading_SATK absolute h-full bg-color-type-psychic top-0" style="background-color: ${renderBigPokemonCard.color}">
                           <style type="text/css">
                              .loading_SATK {
                                 position: absolute;
                                 width: calc(100/194*${renderBigPokemonCard.pokemonSatk}%);
                                 top: 0px; 
                                 animation: bounceSATK 2s linear;
                              }

                              @keyframes bounceSATK {
                                 0% {
                                    width: 0%;
                                 }

                                 100% {
                                    width: calc(100/194*${renderBigPokemonCard.pokemonSatk}%);
                                 }
                              }
                           </style>
                        </div>
                     </div>
                     <div name="loader" class="loader relative h-2 w-full m-1">
                        <div name="loading_1" class="loading_1 relative w-full h-full bg-color-type-light-gray"></div>
                        <div name="loading_2" class="loading_SDEF absolute h-full bg-color-type-psychic top-0" style="background-color: ${renderBigPokemonCard.color}">
                           <style type="text/css">
                              .loading_SDEF {
                                 position: absolute;
                                 width: calc(100/230*${renderBigPokemonCard.pokemonSdef}%);
                                 top: 0px;
                                 animation: bounceSDEF 2s linear;
                              }

                              @keyframes bounceSDEF {
                                 0% {
                                    width: 0%;
                                 }

                                 100% {
                                    width: calc(100/230*${renderBigPokemonCard.pokemonSdef}%);
                                 }
                              }
                           </style>
                        </div>
                     </div>
                     <div name="loader" class="loader relative h-2 w-full m-1">
                        <div name="loading_1" class="loading_1 relative w-full h-full bg-color-type-light-gray"></div>
                        <div name="loading_2" class="loading_SPD absolute h-full bg-color-type-psychic top-0" style="background-color: ${renderBigPokemonCard.color}">
                           <style type="text/css">
                              .loading_SPD {
                                 position: absolute;
                                 width: calc(100/180*${renderBigPokemonCard.pokemonSpd}%);
                                 top: 0px;
                                 animation: bounceSPD 2s linear;
                              }

                              @keyframes bounceSPD {
                                 0% {
                                    width: 0%;
                                 }

                                 100% {
                                    width: calc(100/180*${renderBigPokemonCard.pokemonSpd}%);
                                 }
                              }
                           </style>
                        </div>
                     </div>
                  </div>

               </div>
<div class="w-full flex justify-center items-center mb-4">
   <div name="closeBtn" class="px-4 border border-solid rounded-md hover:bg-gray-200 cursor-pointer" onclick="closeBigCard()">Close</div>
</div>


            </div>





            <!-- element which have position absolute -->
            <div class="absolute top-48 left-7 cursor-pointer" id="arrow-small-left" onclick="showBigPokemonCard(${renderBigPokemonCard.pokemonId - 1})">
            <svg width="0.5rem" height="0.875rem" viewBox="0 0 8 14" fill="none"
               xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M7.228 13.8093L7.84671 13.1907C7.99315 13.0442 7.99315 12.8068 7.84671 12.6603L2.19987 6.99999L7.84671 1.33968C7.99315 1.19324 7.99315 0.955807 7.84671 0.809338L7.228 0.190619C7.08156 0.0441818 6.84412 0.0441818 6.69765 0.190619L0.153465 6.73481C0.00702763 6.88124 0.00702763 7.11868 0.153465 7.26515L6.69765 13.8093C6.84412 13.9558 7.08156 13.9558 7.228 13.8093Z"
                  fill="white" />
            </svg>
            </div>
            <div class="absolute top-48 right-7 cursor-pointer z-10" id="arrow-small-right" onclick="showBigPokemonCard(${renderBigPokemonCard.pokemonId + 1})">
            <svg width="0.5rem" height="0.875rem" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M0.772065 0.190708L0.153346 0.809395C0.0069087 0.955833 0.0069087 1.19327 0.153346 1.33974L5.80019 7.00005L0.153346 12.6604C0.0069087 12.8068 0.0069087 13.0442 0.153346 13.1907L0.772065 13.8094C0.918502 13.9559 1.15594 13.9559 1.30241 13.8094L7.8466 7.26524C7.99303 7.1188 7.99303 6.88136 7.8466 6.7349L1.30241 0.190708C1.15594 0.0442391 0.918502 0.0442391 0.772065 0.190708Z"
                  fill="white" />
            </svg>
            </div>


            <!-- pokemon-image position absolute -->
            <div name="pokemon-image"
               class="w-50 h-50 absolute top-20 left-position-50-from-12-5rem flex items-center justify-center"><img
                  class="object-contain" src="${renderBigPokemonCard.pokemonImage}" alt="a picture from the current pokemon"></div>

            <!-- pokeball-image position absolute -->
            <div name="pokeball-image" class="w-52 h-52 absolute top-2 right-2 flex items-center justify-center"><img
                  class="object-contain" src="img/Pokeball.png" alt="a picture from the current pokemon"></div>

         </div>
      </div>
   </div>`;
}
