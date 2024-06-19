const headerCreator = {

    createHeader: function(stat_block) {
            let resultHeader = document.createElement("div")
            resultHeader.id = "content_results_header"
            let headerSpacer = document.createElement("div")
            headerSpacer.className = "spacer"
            headerSpacer.id = "content_results_spacer"
            let nameTag = document.createElement("h1");
            let typeTag = document.createElement("p");
            nameTag.className = "titlefont"
            nameTag.innerText = stat_block["name"];
            if (stat_block["subtype"]){
                typeTag.innerText = `${stat_block["size"]}` 
                                    +` ${stat_block["type"]}`
                                    +` (${stat_block["subtype"]})`
                                    +`, ${stat_block["alignment"]}`;
            } else {
                typeTag.innerText = `${stat_block["size"]} ${stat_block["type"]}, ${stat_block["alignment"]}`;
            }
            resultHeader.appendChild(nameTag);
            resultHeader.appendChild(typeTag);
            resultHeader.appendChild(headerSpacer)

            return resultHeader
        }
};

export default headerCreator;