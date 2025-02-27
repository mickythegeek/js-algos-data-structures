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

// add monster objects
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
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
  // add fight location object
  {
    name : "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTownSquare],
    text: "You are fighting a monster."
  },
  {
    //
    name: "win",
    "button text" : ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTownSquare, goTownSquare, goTownSquare],
    text: 'The monster screams "Arg!" as it dies. YOu gain experience and find gold.'
  },
  {
    // add lose location object
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  }
];

function update(location) {
  // change text
  monsterStats.style.display = 'none'; // hide monster stats
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
    // update text to show player sold weapon
    text.innerText = "You sold your " + currentWeapon + ".";

    text.innerText += " In your inventory you have: " + inventory;
  } else{
    text.innerText = "You cannot sell your last weapon.";
  }
}

// create functions for fighting
function fightSlime() {
  fighting = 0;
  goFight();
}
function fightBeast() {
  fighting = 1;
  goFight();
}
function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight(){
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = 'block';
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth
;}

function attack(){
  text.innerText = "The " + monsters[fighting].name + " attacks";
  text.innerText += " You attack it with your " + weapons[currentWeaponIndex];
  health -= monsters[fighting].level; // monster level is the damage it does to the player's health
  monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if(health <= 0){
    lose();
  } else if(monsterHealth <= 0){
    win(); 
  }
}

function dodge(){
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;

}

function lose(){
  update[locations[5]];

}

function win(){
  gold += Math.floor(monsters[fighting].level * 6.7); // increase player gold by monster level * 6.7
  xp += monsters[fighting].level; // increase player xp by monster level
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);

}
// create function to restart game
function restart(){
  xp = 0;
  health = 100;
  gold = 250;
  currentWeaponIndex = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTownSquare();
}