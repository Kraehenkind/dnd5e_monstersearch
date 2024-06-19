const actionCreator = {

    createActions: function(stat_block) {

        let div = document.createElement("div")
        div.id = "content_results_actions"
        let header = document.createElement("h1")
        header.id = "content_result_actions_header"
        header.className = "subheader"
        header.innerText = "Actions"
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
            let title = element["name"]
            if ("usage" in element) {
                if ("dice" in element["usage"]) {
                    title += ` (Recharge ${element["usage"]["min_value"]}+)`
                } else if ("times" in element["usage"]) {
                    title += ` (${element["usage"]["times"]}/${element["usage"]["type"].replace("per ", "")})`
                } else if ("rest_types" in element["usage"]) {
                    title += ` (recharges after ${element["usage"]["rest_types"][0]} rest)`
                }
            }
            div.appendChild(create_entry(title, element["desc"]))
        });


        return div
    }
}

export default actionCreator