var Drawer = function() {
	
	this.clearGrid =function (){
		var c=document.getElementById("tetGrid");
		var ctx=c.getContext("2d");
		ctx.clearRect(0, 0, GRID_SIZE_X, GRID_SIZE_Y);
		ctx.save();
	}


	this.drawPlayer = function (x,y,colour){
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

		//hair


		//body
		ctx.beginPath();
		ctx.moveTo(x + PLAYER_WIDTH/2, GRID_SIZE_Y- y - PLAYER_WIDTH/5);
		ctx.lineTo(x + PLAYER_WIDTH/2, GRID_SIZE_Y-y - 3*(PLAYER_WIDTH/5));
		ctx.stroke();

		//legs
		ctx.beginPath();
		ctx.moveTo(x + PLAYER_WIDTH/2, GRID_SIZE_Y- y - PLAYER_WIDTH/5);
		ctx.lineTo(x + PLAYER_WIDTH/3, GRID_SIZE_Y - y );
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(x + PLAYER_WIDTH/2, GRID_SIZE_Y- y - PLAYER_WIDTH/5);
		ctx.lineTo(x + 2*PLAYER_WIDTH/3, GRID_SIZE_Y - y );
		ctx.stroke();

		//arms
		ctx.beginPath();
		ctx.moveTo(x + PLAYER_WIDTH/2, GRID_SIZE_Y- y - PLAYER_WIDTH/2);
		ctx.lineTo(x + PLAYER_WIDTH/3, GRID_SIZE_Y - y - 2*PLAYER_WIDTH/5);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(x + PLAYER_WIDTH/2, GRID_SIZE_Y- y - PLAYER_WIDTH/2);
		ctx.lineTo(x + 2*PLAYER_WIDTH/3, GRID_SIZE_Y - y - 2*PLAYER_WIDTH/5);
		ctx.stroke();

		ctx.save();
	}

	this.drawHairs = function (hairArray) {
		const colour = '#662200';
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