const GRID_SIZE_X = 500;
const GRID_SIZE_Y = 500;

//services
const DRAWER = new Drawer();

document.getElementById("tetGrid").width = GRID_SIZE_X;
document.getElementById("tetGrid").height = GRID_SIZE_Y;

var currentBlocks ;
var fallingBlocks ;
var timeDelay = 50;
var pauseBool = false;
var gameOver = false;

var score = 0;

var player = {};
player.x = 0;
player.y = 0;
player.stepSize = 10;

const projectiles = [];

const hairs = new Array(10);

const PLAYER_WIDTH = 40;

function growHair(){
	if(Math.random() > 0.95){
		var position = Math.floor(10*Math.random());
		
		if(!hairs[position]){
			hairs[position] = new Hair();
		}
	}

	for (var i = hairs.length - 1; i >= 0; i--) {
		if(hairs[i]) hairs[i].grow();
	}
}

function redrawGrid(){
	DRAWER.clearGrid();
	DRAWER.drawPlayer(player.x, player.y);
	DRAWER.drawProjectiles(projectiles);
	DRAWER.drawHairs(hairs);
	document.getElementById("scoreSpan").innerText= score;
}

//falling function
function timeStep(){
	if(gameOver) {
		clearTimeout(window.timeStepTimeout);
		return;
	}

	growHair();
	
	//move projectiles
	var projectilesToRemove = [];
	for (var i = projectiles.length - 1; i >= 0; i--) {
		var proj = projectiles[i];
		proj.y += proj.speed;
		if(proj.y >= GRID_SIZE_Y){
			//TODO kill it
		}
		//check for collisions
		var hairIndex = Math.floor((proj.x/GRID_SIZE_X)*10);
		if(hairs[hairIndex] //check there's a hair there
			&& GRID_SIZE_Y- hairs[hairIndex].length <= proj.y){
			hairs[hairIndex] = null;
			projectilesToRemove.push(i);
			score += 5;
			console.log("score is now " + score)
		}
	}
	for (var i = projectilesToRemove.length - 1; i >= 0; i--) {
		projectiles.splice(projectilesToRemove[i],1);
	}
	
	redrawGrid();

	//check if lost
	var lengthArray = hairs.filter(hair => hair)
			.map(hair=>hair.length);
	if(lengthArray.length){
		var maxLength = lengthArray
				.reduce((len1,len2)=>Math.max(len1,len2));
		if(maxLength >= GRID_SIZE_Y){
			lose();
		}
	}
	
	window.timeStepTimeout = setTimeout(timeStep, timeDelay);
	
};

function init(){
	redrawGrid();
	window.timeStepTimeout = setTimeout(timeStep, timeDelay);
}

//--Functions for key stroke handling--
window.addEventListener( "keydown", doKeyDown, true);

function doKeyDown(e){
	switch(e.keyCode){
		case 37: 
		case 65:
			movePlayerLeft();
			break;
		case 39: 
		case 68:
			movePlayerRight();
			break;

		case 32:
		case 87:
			//space
			fireWeapon();
			break;

		case 38:
		case 69:
			//"e" or up arrow
			break;
		case 81:
			//"q"
			break;

		case 27:
		case 80:
			//"p" or escape- toggle pause

			if(!pauseBool){
				clearTimeout(timeStepTimeout);

				document.getElementById("pauseMessage").style.display = "block";
			}
			else{
				timeStep();
				document.getElementById("pauseMessage").style.display = "none";
			}
			pauseBool = !pauseBool;
			break;
		default: 
			console.log("unrecognised keycode = " + e.keyCode)
			break;
		}
}

function movePlayerLeft(){

	if(player.x < 1){
		return;
	}
	
	player.x -= player.stepSize;
	redrawGrid();
}

function movePlayerRight(){

	if(player.x >= (GRID_SIZE_X) - PLAYER_WIDTH){
		return;
	}

	player.x += player.stepSize
	redrawGrid();
}

function fireWeapon(){
	projectiles.push(new Projectile(player.x + PLAYER_WIDTH/2, 0, "pink"));
	redrawGrid();
}

function lose(){
	clearTimeout(window.timeStepTimeout);
	gameOver = true;
	window.removeEventListener("keydown", doKeyDown);	
	alert("Oh no! You accidently grew a beard worthy of Gandalf, and now you aren't going out tonight. Better watch Netflix and eat instant noodles!\n\nGAME OVER");
}


document.addEventListener('DOMContentLoaded', init());