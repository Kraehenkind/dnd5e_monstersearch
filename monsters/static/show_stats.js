const monsterdata = document.getElementById("monster_stats").getAttribute("data_from_flask");
const showResults = document.getElementById("content_results");
const resultHeader = document.getElementById("content_results_header")
const resultArmor = document.getElementById("content_results_mainstats_table-armorclass")
const resultHp = document.getElementById("content_results_mainstats_table-hitpoints")
const resultSpeed = document.getElementById("content_results_mainstats_table-speed")
const resultAttributes = document.getElementById("content_results_attributes_tbody-row")
const resultProficiencis = document.getElementById("content_results_proficiencies_table")

let monster_stats = JSON.parse(monsterdata);

console.log(monster_stats)


let stat_block = monster_stats[0];
if (stat_block instanceof Object){
    add_header()
    add_mainstats()
    add_attributes()
    add_proficiencies()

    Object.keys(stat_block).forEach((key) => {
        let value = stat_block[key]
        let row = document.createElement('p');
        row.textContent = `${key}:${value}`;
        row.className = `content_results-rowp`
        row.id = value
        showResults.appendChild(row);
    });
}

function add_header() {
    let nameTag = document.createElement("h1");
    let typeTag = document.createElement("p");
    nameTag.innerText = stat_block["name"];
    if (stat_block["subtype"]){
        typeTag.innerText = `${stat_block["size"]} ${stat_block["type"]} (${stat_block["subtype"]}), ${stat_block["alignment"]}`;
    } else {
        typeTag.innerText = `${stat_block["size"]} ${stat_block["type"]}, ${stat_block["alignment"]}`;
    }
    resultHeader.appendChild(nameTag);
    resultHeader.appendChild(typeTag);
}

function add_mainstats() {
    let armorTag = document.createElement("td")
    let hitpointsTag = document.createElement("td")
    let speedtag = document.createElement("td")
    armorTag.innerText = get_AC(stat_block["armor_class"])
    hitpointsTag.innerText = `${stat_block["hit_points"]} (${stat_block["hit_points_roll"]})`
    speedtag.innerText = get_speeds(stat_block["speed"])
    resultArmor.appendChild(armorTag)
    resultHp.appendChild(hitpointsTag)
    resultSpeed.appendChild(speedtag)

    function get_AC(stats) {
        if (stats.length == 1){
            if ("armor" in stats[0]) {
                return `${stats[0]["value"]} (${stats[0]["armor"][0]["name"]})`
                }
            else {
                return `${stats[0]["value"]} (${stats[0]["type"]})`
            }
        } else {
            if ("spell" in stats[1]) {
                let moreArmor = stats[1]["spell"]["name"]
                return `${stats[0]["value"]} (${stats[1]["value"]} with ${moreArmor})`
            } else if ("armor" in stats[1]) {
                let moreArmor = stats[1]["armor"][0]["name"]
                return `${stats[0]["value"]} (${stats[1]["value"]} with ${moreArmor})`
            }
            
        };
    }

    function get_speeds(stats) {
        let speeds = stats["walk"]
        Object.keys(stats).forEach(key =>{
            if (key !== "walk") {
                value = stats[key]
                speeds += ", "+value+" "+key
                }
            })
        return speeds
        }
}

function add_attributes() {
    let attributes = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"]
    attributes.forEach(key=>{
        let valuedata = document.createElement("td")
        let value = stat_block[key]
        let bonus = Math.floor(value/2)-5
        if (bonus >= 0){
            bonus = `+${bonus}`
        }
        valuedata.innerText= `${value}(${bonus})`
        resultAttributes.appendChild(valuedata)
    })
}

function add_proficiencies() {
    if (stat_block["damage_immunities"].length > 0) {
        let row = document.createElement("tr")
        let immunities = document.createElement("td")
        immunities.className = "titlefont"
        immunities.innerHTML = "Damage Immunities: "
        row.appendChild(immunities)
        let dmg_immunities = document.createElement("td")
        let immunities_list = ""
        stat_block["damage_immunities"].forEach(element =>{
            immunities_list += `${element} `
        })
        dmg_immunities.innerText = `${immunities_list}`
        
        row.appendChild(dmg_immunities)
        resultProficiencis.appendChild(row)
    }

    if (stat_block["damage_resistances"].length > 0) {
        let row = document.createElement("tr")
        let resistances = document.createElement("td")
        resistances.className = "titlefont"
        resistances.innerHTML = "Damage Resistances: "
        row.appendChild(resistances)
        let dmg_resistances = document.createElement("td")
        let resistances_list=""
        stat_block["damage_resistances"].forEach(element =>{
            resistances_list += element+" "
        })
        dmg_resistances.innerText = `${resistances_list}`
        row.appendChild(dmg_resistances)
        resultProficiencis.appendChild(row)
    }

    if (stat_block["condition_immunities"].length > 0) {
        let row = document.createElement("tr")
        let immunities = document.createElement("td")
        immunities.className = "titlefont"
        immunities.innerHTML = "Condition Immunities: "
        row.appendChild(immunities)
        let con_immunities = document.createElement("td")
        let immunities_list = ""
        stat_block["condition_immunities"].forEach(element =>{
            immunities_list += `${element["name"] }`
        })
        con_immunities.innerText = `${immunities_list}`
        row.appendChild(con_immunities)
        resultProficiencis.appendChild(row)
    }
    
}