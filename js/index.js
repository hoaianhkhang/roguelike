import { monsterGenerator } from './monster.js';
import { generateNewMaze } from './maze.js';
import { player, updatePlayerGoldAndXp } from './player.js';
import { shopGenerator } from './shop.js';
import { eventGenerator } from './events.js';

const gridSize = 5;

let maze = generateNewMaze(gridSize); // generate initial maze

let shop = shopGenerator(); // how to generate a shop


// possible game states (exploration, battle, shop)

let gameNotBeaten = true, roomNumber, gameState = 'exploration', goldInChest = 0;

//GameStates: exploration, battle, chest, shop, win, lose;


document.onkeydown = (e) => {
  e.preventDefault();
  switch(gameState) {
    case 'exploration':
      explorationControls(e);
      break;
    case 'battle':
      battleControls(e);
      break;
    case 'treasure':
      treasureControls(e);
      break;
    case 'shop':
        console.log('shop controls');
        gameState = 'exploration';
      break;
  }
}

const treasureControls = (e) => {
  if(e.keyCode === 13) {
      document.querySelector('#monster-statbox').classList.toggle('chest');
      document.querySelector('#monster-statbox').innerHTML = '';
      gameState = 'exploration';
  }
}

const battleControls = (e) => {
  if(e.keyCode === 13) {
      endBattle();
  }
  // make this function handle selecting the battle action.
  // battleActionHandler(battleActionSelected)
}

const battleActionHandler = (battleAction) => {
  // Do battle action
  // Update visuals with new hp and stuff etc
  // Check to see if anyone's HP is 0
    // if battle over, run function endBattle()
    // else, wait for the next battleControl to be input 
}


const explorationControls = (e) => {
  switch (e.keyCode) {
    case 37:
      if(player.currentRoomNumber[1] === 0) {
        console.log('can\'t move left');
      } else {
        console.log('move left');
        player.currentRoomNumber[1]--;
      }
      break;
    case 38:
      if(player.currentRoomNumber[0] === 0) {
        console.log('can\'t move up');
      } else {
        console.log('move up');
        player.currentRoomNumber[0]--;
      }
      break;
    case 39:
      if(player.currentRoomNumber[1] === 4) {
        console.log('can\'t move right');
      } else {
        console.log('move right');
        player.currentRoomNumber[1]++;
      }
      break;
    case 40:
      if(player.currentRoomNumber[0] === 4) {
        console.log('can\'t move down');
      } else {
        console.log('move down');
        player.currentRoomNumber[0]++;
      }
      break;
  }
  roomNumber = maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].roomNumber;
  // check to see if the room has been visited or not
  // if it has not -> change room's style to "visited" style
  // else, leave it as is, continue
  document.querySelector(".active-cell").classList.add("been-here");
  document.querySelector(".active-cell").classList.remove("active-cell");
  document.getElementById('cell-' + roomNumber).classList.add("active-cell");
  console.log(roomNumber);
  if(!maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].hasBeenTraveled){
    maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].hasBeenTraveled = true;
    maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].event = eventGenerator();
    console.log(maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].event)
    playEvent(maze[player.currentRoomNumber[0]][player.currentRoomNumber[1]].event);

  } else {
    console.log('been here');
  }
}

const playEvent = (event) => {
  switch(event) {
    case 'battle':
      initializeBattle();
      break;
    case 'treasureRoom':
      initializeTreasureRoom();
      break;
    case 'shopRoom':
      initializeShop();
      // initialize shop room here
      break;
    case 'eventlessRoom':
          console.log('Nothing here! How boring.');
      break;
  }
}

const initializeTreasureRoom = () => {
    gameState = 'treasure';
    goldInChest = Math.floor(Math.random()*101) + 100 // between 100 and 200;
    player.gold = player.gold + goldInChest;
    document.querySelector('#monster-statbox').classList.toggle('chest');
    document.querySelector('#monster-statbox').innerHTML = '<p style = "color: black">You received ' + goldInChest + ' gold!</p>';
    document.getElementById("player-gold").textContent = player.gold;
    console.log(goldInChest + " gold");
     // TODO: Remove all treasure styling and add back all map styling
}

const initializeBattle = () => {
    gameState = 'battle';
    let monster = monsterGenerator();
    document.querySelector('.right-container-fight').classList.toggle('hidden');
    document.querySelector('.right-container-map').classList.toggle('hidden');
    console.log('battle start');
    document.getElementById("monster-name").textContent = monster.name;

    //Battle takes place here
    //endBattle(monster); // passes monster variable into endBattle without sending to global to allow xp addition
}


const endBattle = (monster) => {
    /* player.xp = player.xp + monster.xpGiven;
    document.getElementById("experience").textContent = player.xp; */
    document.querySelector('.right-container-fight').classList.toggle('hidden');
    document.querySelector('.right-container-map').classList.toggle('hidden');
    console.log('end battle');
    gameState = "exploration";
}



const initializeShop = () => {
    gameState = 'shop';
    console.log('shopping spree');
}

// TODO also just to explain, the reason i made events its own thing for the purpose of this project
// is because it's incredibly messy to have all these functions in here that clutter up the otherwise
// main functionality. functions related to the rooms and maze should be in maze, functions related to monsters
// should be in monster. Only things that are directly controlled (ie document.xxx functions) should be out here
// as well as what is needed to initialize just the maze before any interaction from the user

//TODO Can you add them into those events as you see fit? I'm not sure the proper way to put these functions into objects. If you do it ill understand a lot better.

/*
 * Order should be move -> update character location -> check if room has been visited -> execute event if room has not been visited -> update player and maze after event
 * Additionally, if on the exit room, must generate a new maze object to replace the old maze object
 */