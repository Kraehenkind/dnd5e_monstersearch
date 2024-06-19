const abilityCreator = {

    createAbility: function(stat_block){

        let div = document.createElement("div")
        div.id = "content_results_abilities"

        function create_entry(title, data) {
            let entry = document.createElement("p")
            entry.id = div.id+"_entry"
            let titlefield = document.createElement("span")
            titlefield.className = "namefont"
            titlefield.innerText = title+". "
            let desc = document.createTextNode(data)
            entry.appendChild(titlefield)
            entry.appendChild(desc)
            return entry
        }

        stat_block.forEach(element => {
            div.appendChild(create_entry(element["name"], element["desc"]))
        });

        return div
    }
}

export default abilityCreator