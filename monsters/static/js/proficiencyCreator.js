const proficiencyCreator = {

    createProficiencies: function(stat_block) {
        let div = document.createElement("div")
        div.id = "content_results_proficiencies"
        let table = document.createElement("table")
        table.id = "content_results_proficiencies_table"
        let spacer = document.createElement("div")
        spacer.className = "spacer"
        spacer.id = "content_results_spacer"
    
        function create_row(title, data) {
            let row = document.createElement("tr")
            let titlefield = document.createElement("td")
            titlefield.className = "titlefont"
            titlefield.innerText = title
            let datafield = document.createElement("td")
            datafield.innerText = data
            row.appendChild(titlefield)
            row.appendChild(datafield)
            return row
        }
    
        let skills = {};
        let saves = {};
        stat_block["proficiencies"].forEach(element =>{
            if (element["proficiency"]["name"].includes("Skill")) {
                skills[`${element["proficiency"]["name"].slice(7)}`] = element["value"]
            } else if (element["proficiency"]["name"].includes("Saving Throw")) {
                saves[`${element["proficiency"]["name"].slice(14)}`] = element["value"]
            }
        });
    
        if (Object.keys(saves).length > 0){
            let saveText = ""
            Object.keys(saves).forEach(key =>{
                if (saveText != "") {
                    saveText += ", "
                }
                if (saves[key] >= 0) {
                    let value = `+${saves[key]}`
                    saveText += `${key} ${value}`
                } else {
                    let value = `${saves[key]}`
                    saveText += `${key} ${value}`
                };
            })
            table.appendChild(create_row("Saving Throws:", saveText))
        };
    
        if (Object.keys(skills).length > 0){
            let skillText = ""
            Object.keys(skills).forEach(key =>{
                if (skillText != "") {
                    skillText += ", "
                }
                if (skills[key] >= 0) {
                    let value = `+${skills[key]}`
                    skillText += `${key} ${value}`
                } else {
                    let value = `${skills[key]}`
                    skillText += `${key} ${value}`
                };
            })
            table.appendChild(create_row("Skills:", skillText))
        };
    
        if (stat_block["damage_immunities"].length > 0) {
            let immunities_list = ""
            stat_block["damage_immunities"].forEach(element =>{
                if (immunities_list != ""){
                    immunities_list += ", "
                }
                immunities_list += `${element}`
            })
            table.appendChild(create_row("Damage Immunities:", `${immunities_list}`))
            
        };
    
        if (stat_block["damage_resistances"].length > 0) {
            let resistances_list=""
            stat_block["damage_resistances"].forEach(element =>{
                if (resistances_list != "") {
                    resistances_list += ", "
                }
                resistances_list += element
            })
            table.appendChild(create_row("Damage Resistances:", `${resistances_list}`))
            
        };
    
        if (stat_block["condition_immunities"].length > 0) {
            let immunities_list = ""
            stat_block["condition_immunities"].forEach(element =>{
                if (immunities_list != "") {
                    immunities_list += ", "
                }
                immunities_list += `${element["name"]}`
            })
            table.appendChild(create_row("Condition Immunities:", `${immunities_list}`))
        };
    
        if (stat_block["senses"] != []){
            let senses_list = ""
            Object.keys(stat_block["senses"]).forEach(key => {
                let value = stat_block["senses"][key]
                if (senses_list != "") {
                    senses_list += ", "
                }
                key = key.replace("_", " ")
                senses_list += `${key} ${value}`
            });
            table.appendChild(create_row("Senses:", senses_list))
        }
    
        if (stat_block["languages"] != []){
            let languages = stat_block["languages"]
            table.appendChild(create_row("Languages:", languages))
        }
    
        let cr = ""
        if (stat_block["challenge_rating"] < 1 && stat_block["challenge_rating"] != 0) {
            let challenges = { "0.5": "1/2", "0.25" : "1/4", "0.125": "1/8"}
            cr = challenges[`${stat_block["challenge_rating"]}`]
        } else {
            cr = stat_block["challenge_rating"]
        }
        table.appendChild(create_row("Challenge", `${cr} (${stat_block["xp"]} XP)`))

        div.appendChild(table)
        div.appendChild(spacer)

        return div
    }
}

export default proficiencyCreator