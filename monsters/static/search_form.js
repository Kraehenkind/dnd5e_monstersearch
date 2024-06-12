document.addEventListener('DOMContentLoaded', function() {    
    const searchForm = document.getElementById("content_searchform")
    const searchdata = document.getElementById("search_data").getAttribute("data_from_flask")

    searchvalue = JSON.parse(searchdata)

    fetch("/static/data/menupoints.json")
        .then(response => response.json())
        .then(data => {
            Object.keys(data).forEach((key) => {
                let value = data[key]
                if (typeof value === "string") {
                    createTextfield(key, value)
                }
                else {
                    createDropdown(key, value)
                }});
            let button = document.createElement("input")                
            button.type = "submit"
            button.value = "Search"
            searchForm.appendChild(button)
        })

    function createTextfield(id, name) {
        let label = document.createElement("label");
        label.htmlFor = `content_searchform-search_${id}`;
        label.innerHTML = name;
        let textfield = document.createElement("input");
        textfield.id = `content_searchform-search_${id}`;
        textfield.name = id;
        textfield.className = "content_searchform-textsearch";
        if (id in searchvalue[0]){
            textfield.value = searchvalue[0][id]
        }
        searchForm.appendChild(label);
        searchForm.appendChild(textfield);
    }
    
    function createDropdown(id, entries) {
        let label = document.createElement("label");
        label.htmlFor = `content_searchform-search_${id}`;
        label.innerHTML = entries
        let selection = document.createElement("select")
        selection.name = id
        selection.id = `content_searchform-search_${id}`
        selection.className = "content_searchform-selection";
        entries.forEach(inner_entries => {
            Object.keys(inner_entries).forEach((key) => {
                let value = inner_entries[key]
                let option = document.createElement("option")
                option.value = value
                option.innerHTML = key
                selection.appendChild(option)
            });
            if (id in searchvalue[0]){
                selection.value = searchvalue[0][id]
            }
            searchForm.appendChild(selection)
        });
    }
})