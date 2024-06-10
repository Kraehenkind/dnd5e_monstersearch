const monsterdata = document.getElementById("monster_stats").getAttribute("data_from_flask");

let monster_stats = JSON.parse(monsterdata);

console.log(monster_stats)

const showResults = document.getElementById("content_results");


monster_stats.forEach(element => {
    let nameTag = document.createElement('p');
    let link = document.createElement('a')
    nameTag.className = "content_results_linkparagraph"
    nameTag.id = `linkparagraph-${element["index"]}`
    link.className = "content_results_linkparagraph-link"
    link.id = `link-${element["index"]}`
    link.textContent = element["name"];
    link.href= `/statblock/${element["index"]}`
    nameTag.appendChild(link)
    showResults.appendChild(nameTag);
})