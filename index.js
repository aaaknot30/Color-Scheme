import { data } from "/data.js"


// ---------   Step 1: Fecth data -----------
document.getElementById("color--pick").value = "#FF7700"
let colorScheme = "monochrome"
function fetchColors() {
    let color = document.getElementById("color--pick").value.slice(1)
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${colorScheme}&count=5`)
        .then(res => res.json())
        .then(data => {
            parse(data)
        })
}
fetchColors()

// ------------- Step 2: Parse data -----------
let colorsArray = []
function parse(data) {
    data.colors.forEach((item) => {
        colorsArray.push(item.name.closest_named_hex)
    })
    render()
}

// --------- Step 3. Render dropdown menu ---------
let selectedColor = "Monochrome"
let checkMark = `<img class="svg" src="checkmark_trans.png">`
function renderDropDown() {
    let htmlData = ""
    data.forEach((item) => {
        htmlData +=
            `<li id="option" data-key="${item.key}" data-value="${item.value}" class="select__item">
            <span id="option" data-key="${item.key}" data-value="${item.value}">${item.key}</span>
            ${selectedColor == item.key ? checkMark : ""} 
        </li>`
    })
    document.getElementById("color--scheme").innerHTML =
        `<div id="select" class="select">
            <div id="select__input" class="select__input">
                <span id="select__input">${selectedColor}</span>   
                <img id="select__input" class="svg" src="down_arrow_trans.png">
            </div> 
            <ul id="select__options" class="select__options">
            ${htmlData}
            </ul>
        </div>`
}
renderDropDown()

// Step 4. ---------- Render color palette ------------------
function render() {
    document.getElementById("color1").style.background = colorsArray[0]
    document.getElementById("color1--name").innerHTML = colorsArray[0]
    document.getElementById("color2").style.background = colorsArray[1]
    document.getElementById("color2--name").innerHTML = colorsArray[1]
    document.getElementById("color3").style.background = colorsArray[2]
    document.getElementById("color3--name").innerHTML = colorsArray[2]
    document.getElementById("color4").style.background = colorsArray[3]
    document.getElementById("color4--name").innerHTML = colorsArray[3]
    document.getElementById("color5").style.background = colorsArray[4]
    document.getElementById("color5--name").innerHTML = colorsArray[4]
    colorsArray = []
}

// Step 5. ---------- Define dropdown toggle ------------------
function toggleDropDown(drop) {
    //console.log(drop)
    if (drop) {
        document.getElementById("select__options").style.visibility = "visible"
        document.getElementById("select__options").style.opacity = "1"
    } else {
        document.getElementById("select__options").style.visibility = "hidden"
        document.getElementById("select__options").style.opacity = "0"
    }
}

// Step 6. ---------- Define event listeners ------------------
document.addEventListener("click", (e) => {
    if (e.target.id == "select__input") {
        toggleDropDown(true)
    } else if (e.target.id == "option") {
        toggleDropDown(false)
        selectedColor = e.target.dataset.key
        colorScheme = e.target.dataset.value
        renderDropDown()
        fetchColors()
    } else if (e.target.id.indexOf("color") >= 0 && e.target.id.indexOf("--") < 0) {
        let id = e.target.id + "--name"
        let copiedColor = document.getElementById(id).innerHTML
        navigator.clipboard.writeText(copiedColor)
        copied(e.target.id, copiedColor)
    }

})

function copied(id, copiedColor) {
    let copyColor = id + "--copy"
    document.getElementById("copied--message").innerHTML = "<strong>" + copiedColor + "</strong> copied to clipboard"
    document.getElementById("copied--message").style.visibility = "visible"

    setTimeout( () => {
        document.getElementById("copied--message").style.visibility = "hidden"
    }, 1700)
}

document.getElementById("btn").addEventListener("click", function (e) {
    e.preventDefault();
    fetchColors()
})



