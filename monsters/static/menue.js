const menue = document.getElementById("section_menueDiv")

let reset = document.createElement("button")
reset.id = "section_menueDiv_reset_button"
reset.className = "reset_button"
if (menue.className.includes("index")) {
    reset.innerText = "Reset search"
} else (
    reset.innerText = "New Search"
)

console.log(menue.className)

function reset_search() {
    window.location.href = "/";
}

reset.addEventListener("click", reset_search)

menue.appendChild(reset)