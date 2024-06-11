import headerCreator from "./js/headerCreator.js";
import mainstatCreator from "./js/mainstatCreator.js";
import attributeCreator from "./js/attributeCreator.js";
import proficiencyCreator from "./js/proficiencyCreator.js"


const monsterdata = document.getElementById("monster_stats").getAttribute("data_from_flask");
const showResults = document.getElementById("content_results");

let monster_stats = JSON.parse(monsterdata);

console.log(monster_stats)


let stat_block = monster_stats[0];

if (stat_block instanceof Object){
    let header = headerCreator.createHeader(stat_block);
    let mainstat = mainstatCreator.createMainstat(stat_block)
    let attributes = attributeCreator.createAttributes(stat_block)
    let proficiencies = proficiencyCreator.createProficiencies(stat_block)

    showResults.appendChild(header)
    showResults.appendChild(mainstat)
    showResults.appendChild(attributes)
    showResults.append(proficiencies)

}