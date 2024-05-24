const monsterdata = document.getElementById("monster_stats").getAttribute("data_from_flask")

let monster_stats = JSON.parse(monsterdata);

const showResults = document.getElementById("content_results")

console.log(monster_stats)

if (monster_stats.length > 1)
    monster_stats.forEach(element => {
        let nameTag = document.createElement('p')
        nameTag.textContent = element["name"]
        showResults.appendChild(nameTag)
    });
