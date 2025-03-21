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
    "button functions": [goTownSquare, goTownSquare, easterEgg],
    text: 'The monster screams "Arg!" as it dies. YOu gain experience and find gold.'
  },
  {
    // add lose location object
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  {
    name : "winGame",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeated the dragon! YOU WIN THE GAME! &#x1F389;"
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTownSquare],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
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
  text.innerHTML = location.text; // use innerHTML to render the unicode character for skull
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
  health -= getMonsterAttackValue(monsters[fighting].level);
  if(isMonsterHit()){ // check if player hits monster
    monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;
  }else{
    text.innerText = " You miss."
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if(health <= 0){
    lose();
  } else if(monsterHealth <= 0){
    // check if player has defeated the dragon
    if(fighting === 2){
      winGame();
    } else{
      win();
    }
  }
  //Player current weapon breaks while hitting monster
  if(Math.random() <= .1 && inventory.length !== 1){
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeaponIndex--;
  }
}

// create function to get monster attack value
function getMonsterAttackValue(level){
  const hit = (level * 5) - (Math.floor(Math.random()* xp)); // calculate monster attack value
  return hit > 0 ? hit : 0; // return attack value if it is greater than 0, otherwise return 0
}

// create function to check if monster is hit
function isMonsterHit(){
  return Math.random() > .2 || health < 20;
}

function dodge(){
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;

}

function lose(){
  update[locations[5]];
}

function winGame(){
  update(locations[6]);
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

// create function to show easter egg
function easterEgg(){
  update(locations[7]);
}

function pick(guess){
  const numbers = []; // create empty array to store random numbers
  while(numbers.length < 10){
    numbers.push(Math.floor(Math.random()* 11)) // add random number between 0 and 10 to numbers array
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i=0; i<10;i++){
    text.innerText += numbers[i] + "\n"; // add each random number to text
  }
  // check if player guess is in random numbers
  if(numbers.includes(guess)){
    text.innerText += "WOW! You win 20 gold";
    gold += 20;
    goldText.innerText = gold;
  }else{
    // update text to show player did not win
    text.innerText += "Sorry! You lose 10 health.";
    health -= 10;
    healthText.innerText = health;
    if(health<= 0){
      lose();
    }
  }

}

function pickTwo(){
  pick(2);
}

function pickEight(){
  pick(8);
}