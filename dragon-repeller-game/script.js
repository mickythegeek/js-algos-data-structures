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
    }
];



function update(location){

}

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// create functions for buttons
function goTownSquare() {
  // change text
  button1.innerText = "Go to store";
  button2.innerText = "Go to cave";
  button3.innerText = "Fight dragon";

  // change button actions
  button1.onclick = goStore;
  button2.onclick = goCave;
  button3.onclick = fightDragon;

  // update text
  text.innerText = "You are in the town square. You see a sign that says \"Store\".";
}

function goStore() {
  // change text
  button1.innerText = "Buy 10 health (10 gold)";
  button2.innerText = "Buy weapon (30 gold)";
  button3.innerText = "Go to town square";

  // change button actions
  button1.onclick = buyHealth;
  button2.onclick = buyWeapon;
  button3.onclick = goTownSquare;

  // update text
  text.innerText = "You enter the score";
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
