document.addEventListener('DOMContentLoaded', function() {    
    const searchForm = document.getElementById("content_searchform")

    fetch("/static/data/menupoints.json")
        .then(response => response.json())
        .then(data => {
            console.log(data)
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
        label.for = id;
        label.innerHTML = name;
        let textfield = document.createElement("input");
        textfield.id = id;
        textfield.name = id;
        textfield.class = "content_searchform-textsearch";
        searchForm.appendChild(label);
        searchForm.appendChild(textfield);
    }
    
    function createDropdown(id, entries) {
        let label = document.createElement("label");
        label.for = id;
        label.innerHTML = entries
        let selection = document.createElement("select")
        selection.name = id
        selection.id = id
        Object.keys(entries).forEach((key) => {
            let value = entries[key]
            let option = document.createElement("option")
            option.value = value
            option.innerHTML = key
            selection.appendChild(option)
        });
        searchForm.appendChild(selection)
    }
})