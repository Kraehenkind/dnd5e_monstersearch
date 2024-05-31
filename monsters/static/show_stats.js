const monsterdata = document.getElementById("monster_stats").getAttribute("data_from_flask");

let monster_stats = JSON.parse(monsterdata);

console.log(monster_stats)

const showResults = document.getElementById("content_results");

let stat_block = monster_stats[0];
if (stat_block instanceof Object){
    Object.keys(stat_block).forEach((key) => {
        let value = stat_block[key]
        let row = document.createElement('p');
        row.textContent = `${key}:${value}`;
        row.className = `content_results-rowp`
        row.id = value
        showResults.appendChild(row);
    });
}