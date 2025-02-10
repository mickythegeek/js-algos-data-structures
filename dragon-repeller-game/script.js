let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");


const locations = [
    //add town square location object
    {
        name:"town square",
        "button text": ["Got to store", "Go to cave", "Fight dragon"],
        "button functions" : [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTownSquare],
        text: "You enter the store."
    }
];



function update(location){
    // change text
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];

  // change button actions
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];

  // update text
  text.innerText = location.text;


}

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// Add town square location object and update function"
function goTownSquare() {
    update(locations[0])
}

function goStore() {
    update(locations[1])
}

function goCave() {
  console.log("Going to cave.");
}

function fightDragon() {
  console.log("FIghting dragon.");
}


// create functions for buttons
function buyHealth() {}
function buyWeapon() {}
