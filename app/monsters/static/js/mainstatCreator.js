const mainstatCreator = {

    createMainstat: function(stat_block) {
        let div = document.createElement("div");
        div.id = "content_results_mainstats";
        let table = document.createElement("table")
        table.id = "content_results_mainstats_table"
        let spacer = document.createElement("div")
        spacer.className = "spacer"
        spacer.id = "content_results_spacer"


        let armorclass = create_row(
            "Armor Class", get_AC(stat_block["armor_class"])
        )
        let hitpoints = create_row(
            "Hit Points", `${stat_block["hit_points"]} (${stat_block["hit_points_roll"]})`
        )
        let speed = create_row(
            "Speed", get_speeds(stat_block["speed"])
        )
        
        function create_row(name, dataset) {
            let row = document.createElement("tr")
            row.id = `content_results_mainstats_table-${name.toLowerCase().replace(" ", "_")}`
            let title = document.createElement("td");
            title.className = "titlefont";
            title.innerText = name+":";
            let data = document.createElement("td")
            data.innerText = dataset
            row.appendChild(title)
            row.appendChild(data)

            return row
        }

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
                    let value = stats[key]
                    speeds += ", "+value+" "+key
                    }
                })
            return speeds
        }

        table.appendChild(armorclass)
        table.appendChild(hitpoints)
        table.appendChild(speed)
        div.appendChild(table)
        div.appendChild(spacer)

        return div
    }
}

export default mainstatCreator