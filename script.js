const GRID_SIZE_X = 500;
const GRID_SIZE_Y = 500;

document.getElementById("tetGrid").width = GRID_SIZE_X;
document.getElementById("tetGrid").height = GRID_SIZE_Y;

var currentBlocks ;
var fallingBlocks ;
var timeDelay = 50;//100;//milliseconds
var pauseBool = false;
var gameOver = false;

var player = {};
player.x = 0;
player.y = 0;
player.stepSize = 10;

const projectiles = [];

const hairs = new Array(10);

const PLAYER_WIDTH = 20;

function drawPlayer (x,y,colour){
	var c=document.getElementById("tetGrid");
	var ctx=c.getContext("2d");
	const squareMode = true;

	if(squareMode){
		ctx.beginPath();

		ctx.strokeStyle = 'red';
		ctx.rect(x, (GRID_SIZE_Y-y - PLAYER_WIDTH), 20,20);

		// console.log("y = " + ((22-y)*20) );
		// console.log("x = " + ((x)*20) );		
		
		ctx.stroke();
	}
	
	ctx.beginPath();

	//head
	if (null != colour){
		ctx.fillStyle = colour;
		ctx.strokeStyle = colour;
	}
	else {
		ctx.fillStyle = '#ffd9b3';
		ctx.strokeStyle = '#ffd9b3';
	}
	ctx.arc(
		x + PLAYER_WIDTH/2,
		GRID_SIZE_Y-y - 4*(PLAYER_WIDTH/5),
		PLAYER_WIDTH/5,
		0,
		Math.PI * 2,
		true
	);
	ctx.stroke();	
	ctx.fill();

	//body
	ctx.beginPath();
	ctx.moveTo(x + PLAYER_WIDTH/2, GRID_SIZE_Y-y);
	ctx.lineTo(x + PLAYER_WIDTH/2, GRID_SIZE_Y-y - 3*(PLAYER_WIDTH/5));
	ctx.stroke();

	ctx.save();
}

function drawProjectiles(){
	for (var i = projectiles.length - 1; i >= 0; i--) {
		var proj = projectiles[i];

		var c=document.getElementById("tetGrid");
		var ctx=c.getContext("2d");

		ctx.beginPath();
		ctx.rect(proj.x, GRID_SIZE_Y- proj.y - 5, 5, 5);
		ctx.fillStyle = 'pink';
		//ctx.lineWidth="2";
		
		ctx.fill();
		ctx.stroke(); 
		ctx.save();

	}
}

function drawHairs(){
	const colour = '#662200';
	const TIP_LENGTH = 19;

	for (var i = hairs.length - 1; i >= 0; i--) {
		var hair = hairs[i];
		if(!hair) continue;

		var c=document.getElementById("tetGrid");
		var ctx=c.getContext("2d");

		ctx.beginPath();
		ctx.rect((GRID_SIZE_X/10) * i, 0, 5, hair.length - TIP_LENGTH);
		ctx.fillStyle = colour;
		ctx.strokeStyle = colour;
		//ctx.lineWidth="2";
		
		ctx.fill();
		ctx.stroke();

		ctx.beginPath();
	    ctx.moveTo((GRID_SIZE_X/10) * i, hair.length- TIP_LENGTH);
	    ctx.lineTo((GRID_SIZE_X/10) * i + 5, hair.length - TIP_LENGTH);
	    ctx.lineTo( (GRID_SIZE_X/10) * i + 2.5, hair.length);
	    ctx.fill();

		ctx.save();

	}
}

function clearGrid (){
	var c=document.getElementById("tetGrid");
	var ctx=c.getContext("2d");
	ctx.clearRect(0, 0, GRID_SIZE_X, GRID_SIZE_Y);
	ctx.save();
}

function growHair(){
	if(Math.random() > 0.95){
		var position = Math.floor(10*Math.random());
		console.debug("New hair at position " + position);
		if(!hairs[position]){
			hairs[position] = new Hair();
		}
	}
	for (var i = hairs.length - 1; i >= 0; i--) {
		if(hairs[i])hairs[i].grow();
	}
}

function redrawGrid(){
	clearGrid();
	drawPlayer(player.x, player.y);
	drawProjectiles();
	drawHairs();
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
	// var blocked = false;
	// var blocksToMove = [];

	// for(var x=0;x<10;x++){
	// 	for (var y = 0; y < 22; y++) {
	// 		if (fallingBlocks[x][y] != undefined){
	// 			if (x==0){
	// 				blocked = true;
	// 				break;
	// 			}
	// 			else if (currentBlocks[x-1][y] != undefined){
	// 				blocked = true;
	// 				break;
	// 			}
	// 			else {
	// 				blocksToMove.push([x,y]);
	// 			}
	// 		}
	// 	};
	// 	if (blocked){
	// 		break;
	// 	}
	// }
	// if (blocked){
	// 	console.log('couldn\'t move left from ' + x + ', ' + y);
	// 	return false;
	// }

	// else {
	// 	//move blocks
	// 	for (var i = 0; i < blocksToMove.length; i++) {
	// 		var xMove = blocksToMove[i][0];
	// 		var yMove = blocksToMove[i][1];

	// 		fallingBlocks[xMove-1][yMove] = fallingBlocks[xMove][yMove];
	// 		fallingBlocks[xMove][yMove] = undefined;
	// 	};
	// 	player.x--;
	// };
	//console.log("blocksToMove = " + blocksToMove);

	if(player.x < 1){
		return;
	}
	player.x -= player.stepSize;
	redrawGrid();
}

function movePlayerRight(){
	var blocked = false;
	var blocksToMove = [];

	// for(var x=9;x>=0;x--){
	// 	for (var y = 0; y < 22; y++) {
	// 		if (fallingBlocks[x][y] != undefined){
	// 			if (x==9){
	// 				blocked = true;
	// 				break;
	// 			}
	// 			else if (currentBlocks[x+1][y] != undefined){
	// 				blocked = true;
	// 				break;
	// 			}
	// 			else {
	// 				//console.log("adding to blocksToMove :" + x + "," + y);
	// 				blocksToMove.push([x,y]);
	// 			}
	// 		}
	// 	};
	// 	if (blocked){
	// 		break;
	// 	}
	// }
	// if (blocked){
	// 	console.log('couldn\'t move left from ' + x + ', ' + y);
	// 	return false;
	// }

	// else {
	// 	//move blocks
	// 	for (var i = 0; i < blocksToMove.length; i++) {
	// 		var xMove = blocksToMove[i][0];
	// 		var yMove = blocksToMove[i][1];

	// 		fallingBlocks[xMove+1][yMove] = fallingBlocks[xMove][yMove];
	// 		fallingBlocks[xMove][yMove] = undefined;
	// 	};
	// 	player.x++;
	// };
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