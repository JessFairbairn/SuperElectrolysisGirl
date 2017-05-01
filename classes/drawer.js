var Drawer = function() {

	const hairColour = '#662200';
	const skinColour = '#ffd9b3';
	
	this.clearGrid =function (){
		var c=document.getElementById("tetGrid");
		var ctx=c.getContext("2d");
		ctx.clearRect(0, 0, GRID_SIZE_X, GRID_SIZE_Y);
		ctx.save();
	}


	this.drawPlayer = function (x,y){
		var c=document.getElementById("tetGrid");
		var ctx=c.getContext("2d");
		const squareMode = true;

		if(squareMode){
			ctx.beginPath();

			ctx.strokeStyle = 'red';
			ctx.rect(x, (GRID_SIZE_Y-y - PLAYER_WIDTH), PLAYER_WIDTH,PLAYER_WIDTH);

			// console.log("y = " + ((22-y)*20) );
			// console.log("x = " + ((x)*20) );		
			
			ctx.stroke();
		}
		
		ctx.beginPath();

		//head
		ctx.fillStyle = skinColour;
		ctx.strokeStyle = skinColour;
		
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
		ctx.lineWidth = 5;
		ctx.moveTo(x + PLAYER_WIDTH/2, GRID_SIZE_Y- y - PLAYER_WIDTH/4);
		ctx.lineTo(x + PLAYER_WIDTH/2, GRID_SIZE_Y-y - 3*(PLAYER_WIDTH/5));
		ctx.stroke();

		//legs
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.moveTo(x + PLAYER_WIDTH/2, GRID_SIZE_Y- y - PLAYER_WIDTH/4);
		ctx.lineTo(x + 2*PLAYER_WIDTH/5, GRID_SIZE_Y - y );
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(x + PLAYER_WIDTH/2, GRID_SIZE_Y- y - PLAYER_WIDTH/4);
		ctx.lineTo(x + 3*PLAYER_WIDTH/5, GRID_SIZE_Y - y );
		ctx.stroke();

		//arms
		ctx.beginPath();
		ctx.moveTo(x + PLAYER_WIDTH/2, GRID_SIZE_Y- y - PLAYER_WIDTH/2);
		ctx.lineTo(x + PLAYER_WIDTH/3, GRID_SIZE_Y - y - PLAYER_WIDTH/5);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(x + PLAYER_WIDTH/2, GRID_SIZE_Y- y - PLAYER_WIDTH/2);
		ctx.lineTo(x + 2*PLAYER_WIDTH/3, GRID_SIZE_Y - y - PLAYER_WIDTH/5);
		ctx.stroke();


		//hair
		if(false){
			ctx.fillStyle = hairColour;
			ctx.strokeStyle = hairColour;

			ctx.beginPath();
			ctx.arc(
				x + PLAYER_WIDTH/2,
				GRID_SIZE_Y-y - 4*(PLAYER_WIDTH/5),
				PLAYER_WIDTH/10,
				Math.PI,
				2*Math.PI,
				false
			);

			//ctx.lineTo(x + 7*PLAYER_WIDTH/10, GRID_SIZE_Y-y - 4*(PLAYER_WIDTH/5));

			ctx.arc(
				x + PLAYER_WIDTH/2,
				GRID_SIZE_Y-y - 4*(PLAYER_WIDTH/5),
				3*PLAYER_WIDTH/10,
				-0.2,
				Math.PI +0.2,
				true
			);

			ctx.stroke();
			ctx.fill();

			ctx.beginPath();
			ctx.moveTo(x + 3*PLAYER_WIDTH/5,
				GRID_SIZE_Y-y - 4*(PLAYER_WIDTH/5),
				);
			ctx.lineTo(x + 2*PLAYER_WIDTH/3, GRID_SIZE_Y - y - 3*PLAYER_WIDTH/5);
			ctx.lineTo(x + 4*PLAYER_WIDTH/5, GRID_SIZE_Y - y - 3*PLAYER_WIDTH/5);
			ctx.lineTo(x + 8*PLAYER_WIDTH/10, GRID_SIZE_Y - y - 9*PLAYER_WIDTH/10);
			ctx.stroke();
			ctx.fill();
		}

		ctx.beginPath();

		ctx.fillStyle = hairColour;
		ctx.strokeStyle = hairColour;

		ctx.moveTo(x + PLAYER_WIDTH/2,	GRID_SIZE_Y-y - 5*(PLAYER_WIDTH/5));
		ctx.quadraticCurveTo(
			x + 4*PLAYER_WIDTH/5, //control point
			GRID_SIZE_Y-y - 4*(PLAYER_WIDTH/5),

			x + 2*PLAYER_WIDTH/3, //endpoint
			GRID_SIZE_Y-y - 2*(PLAYER_WIDTH/5)
		);

		ctx.lineTo(x + 4*PLAYER_WIDTH/5, GRID_SIZE_Y-y - 1*(PLAYER_WIDTH/2));
		ctx.quadraticCurveTo(
			x + 4*PLAYER_WIDTH/5, //control point
			GRID_SIZE_Y-y - 5*(PLAYER_WIDTH/5),

			x + PLAYER_WIDTH/2,	GRID_SIZE_Y-y - 5*(PLAYER_WIDTH/5)
		);

		ctx.stroke();
		ctx.fill();

		ctx.moveTo(x + PLAYER_WIDTH/2,	GRID_SIZE_Y-y - 5*(PLAYER_WIDTH/5));
		ctx.quadraticCurveTo(
			x + PLAYER_WIDTH/5, //control point
			GRID_SIZE_Y-y - 4*(PLAYER_WIDTH/5),

			x + PLAYER_WIDTH/3, //endpoint
			GRID_SIZE_Y-y - 2*(PLAYER_WIDTH/5)
		);

		ctx.lineTo(x + PLAYER_WIDTH/5, GRID_SIZE_Y-y - 1*(PLAYER_WIDTH/2));
		ctx.quadraticCurveTo(
			x + PLAYER_WIDTH/5, //control point
			GRID_SIZE_Y-y - 5*(PLAYER_WIDTH/5),

			x + PLAYER_WIDTH/2,	GRID_SIZE_Y-y - 5*(PLAYER_WIDTH/5)
		);

		ctx.stroke();
		ctx.fill();
		ctx.save();
	};

	this.drawHairs = function (hairArray) {
		const TIP_LENGTH = 19;

		if( !Array.isArray(hairArray)){
			throw "drawHairs requires array input";
		}

		for (var i = hairArray.length - 1; i >= 0; i--) {
			var hair = hairArray[i];
			if(!hair) continue;

			var c=document.getElementById("tetGrid");
			var ctx=c.getContext("2d");

			ctx.beginPath();
			ctx.rect((GRID_SIZE_X/10) * i + (GRID_SIZE_X/20), 0, 5, hair.length - TIP_LENGTH);
			ctx.fillStyle = hairColour;
			ctx.strokeStyle = hairColour;
			//ctx.lineWidth="2";
			
			ctx.fill();
			ctx.stroke();

			ctx.beginPath();
		    ctx.moveTo((GRID_SIZE_X/10) * i+ (GRID_SIZE_X/20), hair.length- TIP_LENGTH);
		    ctx.lineTo((GRID_SIZE_X/10) * i + 5 + (GRID_SIZE_X/20), hair.length - TIP_LENGTH);
		    ctx.lineTo( (GRID_SIZE_X/10) * i + 2.5 + (GRID_SIZE_X/20), hair.length);
		    ctx.fill();

			ctx.save();
		}
	}

	this.drawProjectiles = function(projectiles){

		if( !Array.isArray(projectiles)){
			throw "drawProjectiles requires array input";
		}
		
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

}