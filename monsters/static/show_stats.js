import headerCreator from "./js/headerCreator.js";
import mainstatCreator from "./js/mainstatCreator.js";
import attributeCreator from "./js/attributeCreator.js";
import proficiencyCreator from "./js/proficiencyCreator.js"
import abilityCreator from "./js/abilityCreator.js";
import actionCreator from "./js/actionCreator.js";
import reactionCreator from "./js/reactionCreator.js";
import legendariesCreator from "./js/legendariesCreator.js";


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
    let actions = actionCreator.createActions(stat_block["actions"])
    
    
    showResults.appendChild(header)
    showResults.appendChild(mainstat)
    showResults.appendChild(attributes)
    showResults.appendChild(proficiencies)
    if (stat_block["special_abilities"].length > 0){
        let abilities = abilityCreator.createAbility(stat_block["special_abilities"])
        showResults.appendChild(abilities)
    }
    if (stat_block["actions"].length > 0){
        showResults.appendChild(actions)
    }
    if ("reactions" in stat_block){
        let reactions = reactionCreator.createReactions(stat_block["reactions"])
        showResults.appendChild(reactions)
    }
    if (stat_block["legendary_actions"].length > 0){
        let legendaries = legendariesCreator.createLegendaries(stat_block["legendary_actions"])
        showResults.appendChild(legendaries)
    }

}