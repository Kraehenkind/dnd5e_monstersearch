const legendariesCreator = {

    createLegendaries: function(stat_block){

        let div = document.createElement("div")
        div.id = "content_results_legendary"
        let header = document.createElement("h1")
        header.id = "content_result_legendary_header"
        header.className = "subheader"
        header.innerText = "Legendary Actions"
        let spacer = document.createElement("div")
        spacer.className = "sub-spacer"
        spacer.id = "content_results_sub-spacer"

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

        div.appendChild(header)
        div.appendChild(spacer)
        stat_block.forEach(element => {
            div.appendChild(create_entry(element["name"], element["desc"]))
        });


        return div

    }

}

export default legendariesCreator