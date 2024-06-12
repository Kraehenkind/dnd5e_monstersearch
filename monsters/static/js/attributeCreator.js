const attributeCreator = {

    createAttributes: function(stat_block) {
        let attributes = { "STR": "strength",
                        "DEX": "dexterity",
                        "CON": "constitution",
                        "INT": "intelligence",
                        "WIS": "wisdom",
                        "CHA": "charisma"};
        let div = document.createElement("div")
        div.id = "content_results_attributes"
        let table = document.createElement("table")
        table.id = "content_results_attributes_table"
        let thead = document.createElement("thead")
        thead.id = "content_results_attributes_thead"
        let spacer = document.createElement("div")
        spacer.className = "spacer"
        spacer.id = "content_results_spacer"
        
        Object.keys(attributes).forEach(key =>{
            let head = document.createElement("th")
            head.className = "titlefont"
            head.id = "content_results_attributes_thead-"+key
            head.innerText = key
            thead.appendChild(head)
        })
        
        let tbody = document.createElement("tbody")
        tbody.id = "content_results_attributes_tbody"
        
        Object.values(attributes).forEach(stat =>{
            let value = stat_block[stat]
            let td = document.createElement("td")
            let bonus = Math.floor(value/2)-5
            if (bonus >= 0){
                bonus = `+${bonus}`
            }
            td.innerText = `${value}(${bonus})`
            tbody.appendChild(td)
        })

        table.appendChild(thead)
        table.appendChild(tbody)
        div.appendChild(table)
        div.appendChild(spacer)

        return div

    }
}

export default attributeCreator