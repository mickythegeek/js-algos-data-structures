let xp = 0;
let health = 100;
let gold = 250;
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

const weapons = [
  {
    name: "stick",
    power: 5,
  },
  {
    name: "dagger",
    power: 30,
  },
  {
    name: "claw hammer",
    power: 50,
  },
  {
    name: "sword",
    power: 100,
  },
];
const locations = [
  //add town square location object
  {
    name: "town square",
    "button text": ["Got to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store".',
  },
  // add store location object
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTownSquare],
    text: "You enter the store.",
  },
  // add cave location object
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTownSquare],
    text: "You enter the cave. You see some monsters",
  },
];

function update(location) {
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
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function fightDragon() {
  console.log("FIghting dragon.");
}

// create functions for buttons
function buyHealth() {
  if (gold >= 10) {
    // reduce player gold by 10
    gold -= 10;
    // increase player health by 10
    health += 10;
    // update text for gold and health
    goldText.innerText = gold;
    healthText.innerText = health;

    // update text to show player does not have enough gold
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}
function buyWeapon() {
  if (currentWeaponIndex < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      // add weapon to inventory
      currentWeaponIndex++;

      goldText.innerText = gold;

      // update text to show player bought a new weapon
      let newWeapon = weapons[currentWeaponIndex].name;
      text.innerText = "You now have a " + newWeapon + ".";
      // add weapon to inventory
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory.join(", ");

      // update text to show player does not have enough gold
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
    // update text to show player has the best weapon
  } else {
    text.innerText = "You already have the best weapon.";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}
// create function to sell weapon
function sellWeapon(){ 
  if(inventory.length > 1){
    gold += 15;
    goldText.innerText = gold;
    // remove weapon from inventory
    let currentWeapon = inventory.shift();
  }
}
function fightSlime() {}
function fightBeast() {}
