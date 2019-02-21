/**
 * Code for mini-game Go Man Go!
 */

 // TODO: Entire game scaling; Normalize to 960 container width

var stage, w, h, loader;
var sky, man, ground, hill, hill2, ready, set, go, correct, incorrect, soclose, almost, choice, variety, varAr, character, difference;
var velAr = [100, 150, 200, 250, 300]; // runner difficulty
var velVert = [350, 400, 450, 500, 550]; // diglet difficulty
var rand = 0;
var variedTicks = 0;
var incrTicks = 0;
var totalTicks = 0;
var manCounter = 0;
var playerCount = 0;
var round = 1;
var rate1 = 0;
var rate2 = 0;
var mode = 0;
var counter = 0;
var score = 0;
var highscore = 0;
var countAll = false;
var initCalled = false;
var normWidth = 960;
var normHeight = 960 / 2.4;
var scalingX, scalingY;

window.addEventListener('resize', resize, false);

function init() {
	// grab canvas width and height for later calculations:
	w = stage.canvas.width;
	h = stage.canvas.height;
	manifest = [
		{src: "spritesheet_grant.png", id: "grant"},
		{src: "spritesheet_dave.png", id: "dave"},
		{src: "spritesheet_john.png", id: "john"},
		{src: "spritesheet_larry.png", id: "larry"},
		{src: "spritesheet_tim.png", id: "tim"},
		{src: "allchar.png", id: "allchar"},
		{src: "davechar.png", id: "davechar"},
		{src: "grantchar.png", id: "grantchar"},
		{src: "johnchar.png", id: "johnchar"},
		{src: "larrychar.png", id: "larrychar"},
		{src: "timchar.png", id: "timchar"},
		{src: "sky.png", id: "sky"},
		{src: "ground.png", id: "ground"},
		{src: "hill1.png", id: "hill"},
		{src: "hill2.png", id: "hill2"},
		{src: "ready.png", id: "ready"},
		{src: "set.png", id: "set"},
		{src: "go.png", id: "go"},
		{src: "correct.png", id: "correct"},
		{src: "incorrect.png", id: "incorrect"},
		{src: "so-close.png", id: "so-close"},
		{src: "almost.png", id: "almost"}
	];
	loader = new createjs.LoadQueue(false);
	loader.addEventListener("complete", handleComplete);
	loader.loadManifest(manifest, true, "../../assets/easelart/");
}

function handleComplete() {
	examples.hideDistractor();
	scalingX = w / normWidth;
	scalingY = h / normHeight;
	sky = new createjs.Shape();
	sky.graphics.beginBitmapFill(loader.getResult("sky")).drawRect(0, 0, normWidth, normHeight);
	sky.scaleX = scalingX;
	sky.scaleY = scalingY;
	var groundImg = loader.getResult("ground");
	ground = new createjs.Shape();
	ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, normWidth + groundImg.width, groundImg.height);
	ground.tileW = groundImg.width * scalingX;
	ground.y = h - groundImg.height * scalingY;
	ground.scaleX = scalingX;
	ground.scaleY = scalingY;
	hill = new createjs.Bitmap(loader.getResult("hill"));
	hill.setTransform(Math.random() * w, h - hill.image.height * 4 * scalingY - groundImg.height * scalingY, 4 * scalingX, 4 * scalingY);
	hill.alpha = 0.5;
	hill2 = new createjs.Bitmap(loader.getResult("hill2"));
	hill2.setTransform(Math.random() * w, h - hill2.image.height * 3 * scalingY - groundImg.height * scalingY, 3 * scalingX, 3 * scalingY);
	stage.addChild(sky, hill, hill2, ground);
	// stage.addEventListener("stagemousedown", handleJumpStart);
	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", tick);
}

// function handleJumpStart() {
// 	man.gotoAndPlay("jump");
// }

document.onclick = incrementCount;
function incrementCount() {
	if (mode == 4) { // play mode
		playerCount = playerCount + 1;
	}
}

// document.onkeydown = checkKey;
// function checkKey(e) {
//     e = e || window.event;
//     if (mode == 4) { // play mode
//     	if (e.keyCode == '32') {
//     		// spacebar
//     		playerCount = playerCount + 1;
//     	}
// 	    // if (e.keyCode == '38') {
// 	    //     // up arrow
// 	    //     //playerCount = playerCount + 1;
// 	    // }
// 	    // else if (e.keyCode == '40') {
// 	    //     // down arrow
// 	    //     change = 1000;
// 	    // }
// 	    // else if (e.keyCode == '37') {
// 	    // 	// left arrow
// 	    // 	change = change * 2;
// 	    // }
// 	    // else if (e.keyCode == '39') {
// 	    //    // right arrow
// 	    //    change = change / 2;
// 	    // }
// 	}
// }

function tick(event) {
	var spriteSheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("grant")],
			"frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 25, "run", 1.5],
				"jump": [26, 63, "run"]
			}
		});
	var spriteSheet2 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("dave")],
			"frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 25, "run", 1.5],
				"jump": [26, 63, "run"]
			}
		});
	var spriteSheet3 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("john")],
			"frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 25, "run", 1.5],
				"jump": [26, 63, "run"]
			}
		});
	var spriteSheet4 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("larry")],
			"frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 25, "run", 1.5],
				"jump": [26, 63, "run"]
			}
		});
	var spriteSheet5 = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("tim")],
			"frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 25, "run", 1.5],
				"jump": [26, 63, "run"]
			}
		});
	switch (mode) {
		case 0: // pick a character to count and set prereqs
			if (counter == 0) {
				rand = Math.floor((Math.random() * 20) + 15);
				// rand = Math.floor((Math.random() * 5) + 1);
				rate1 = Math.floor((Math.random() * 35) + 10);
				rate2 = 12;
				variety = Math.floor(Math.random() * 5);
				varAr = [0, 1, 2, 3, 4];
				for (var j = 0; j < variety; j++) {
					var ri = Math.floor(Math.random() * varAr.length);
					var rs = varAr.splice(ri, 1);
				}
				choice = varAr[Math.floor(Math.random() * varAr.length)];
				if (Math.floor(Math.random() * 3) == 0) {
					countAll = true;
					choice = -1;
				} else {
					rand = Math.floor(rand / varAr.length);
				}
				switch (choice) {
					case -1:
						character = new createjs.Bitmap(loader.getResult("allchar"));
						break;
					case 0:
						character = new createjs.Bitmap(loader.getResult("grantchar"));
						break;
					case 1:
						character = new createjs.Bitmap(loader.getResult("davechar"));
						break;
					case 2:
						character = new createjs.Bitmap(loader.getResult("johnchar"));
						break;
					case 3:
						character = new createjs.Bitmap(loader.getResult("larrychar"));
						break;
					case 4:
						character = new createjs.Bitmap(loader.getResult("timchar"));
						break;
				}
				character.x = Math.floor(w/2 - 150 * scalingX);
				character.scaleX = scalingX;
				character.scaleY = scalingY;
				stage.addChild(character);
				counter = counter + 1;
			} else if (counter >= 120) {
				mode = 1;
				counter = 0;
				stage.removeChild(character);
			} else {
				counter = counter + 1;
			}
			break;
		case 1: // ready
			if (counter == 0) {
				ready = new createjs.Bitmap(loader.getResult("ready"));
				ready.x = Math.floor(w/2 - 325 * scalingX);
				ready.scaleX = scalingX;
				ready.scaleY = scalingY;
				stage.addChild(ready);
				counter = counter + 1;
			} else if (counter >= 50) {
				mode = 2;
				counter = 0;
				stage.removeChild(ready);
			} else {
				counter = counter + 1;
			}
			break;
		case 2: // set
			if (counter == 0) {
				set = new createjs.Bitmap(loader.getResult("set"));
				set.x = Math.floor(w/2 - 225 * scalingX);
				set.scaleX = scalingX;
				set.scaleY = scalingY;
				stage.addChild(set);
				counter = counter + 1;
			} else if (counter >= 50) {
				mode = 3;
				counter = 0;
				stage.removeChild(set);
			} else {
				counter = counter + 1;
			}
			break;
		case 3: // go
			if (counter == 0) {
				go = new createjs.Bitmap(loader.getResult("go"));
				go.x = Math.floor(w/2 - 260 * scalingX);
				go.scaleX = scalingX;
				go.scaleY = scalingY;
				stage.addChild(go);
				counter = counter + 1;
			} else if (counter >= 30) {
				mode = 4;
				counter = 0;
				stage.removeChild(go);
			} else {
				counter = counter + 1;
			}
			break;
		case 4: // play
			if ((manCounter < rand) && (incrTicks == variedTicks)) {
				var pickman = varAr[Math.floor(Math.random() * varAr.length)];
				if (Math.floor(Math.random() * 3) == 0) { // make a diglet man
					switch (pickman) {
						case 0:
							man = new createjs.Sprite(spriteSheet, "run");
							if (choice == 0 || countAll) {
								manCounter = manCounter + 1;
							}
							break;
						case 1:
							man = new createjs.Sprite(spriteSheet2, "run");
							if (choice == 1 || countAll) {
								manCounter = manCounter + 1;
							}
							break;
						case 2:
							man = new createjs.Sprite(spriteSheet3, "run");
							if (choice == 2 || countAll) {
								manCounter = manCounter + 1;
							}
							break;
						case 3:
							man = new createjs.Sprite(spriteSheet4, "run");
							if (choice == 3 || countAll) {
								manCounter = manCounter + 1;
							}
							break;
						case 4:
							man = new createjs.Sprite(spriteSheet5, "run");
							if (choice == 4 || countAll) {
								manCounter = manCounter + 1;
							}
							break;
					}
					// man = new createjs.Sprite(spriteSheet, "run");
					man.framerate = 10;
					man.scaleX = scalingX;
					man.scaleY = scalingY;
					man.x = Math.floor(Math.random() * w * (2/3) + (w/4));
					man.y = h - 70 * scalingY;
					man.velX = velVert[Math.floor(Math.random() * velAr.length)];
					man.up = true;
				} else {
					if (Math.floor(Math.random() * 2) == 0) {
						switch (pickman) {
							case 0:
								man = new createjs.Sprite(spriteSheet, "run");
								if (choice == 0 || countAll) {
									manCounter = manCounter + 1;
								}
								break;
							case 1:
								man = new createjs.Sprite(spriteSheet2, "run");
								if (choice == 1 || countAll) {
									manCounter = manCounter + 1;
								}
								break;
							case 2:
								man = new createjs.Sprite(spriteSheet3, "run");
								if (choice == 2 || countAll) {
									manCounter = manCounter + 1;
								}
								break;
							case 3:
								man = new createjs.Sprite(spriteSheet4, "run");
								if (choice == 3 || countAll) {
									manCounter = manCounter + 1;
								}
								break;
							case 4:
								man = new createjs.Sprite(spriteSheet5, "run");
								if (choice == 4 || countAll) {
									manCounter = manCounter + 1;
								}
								break;
						}
					} else {
						switch (pickman) {
							case 0:
								man = new createjs.Sprite(spriteSheet, "jump");
								if (choice == 0 || countAll) {
									manCounter = manCounter + 1;
								}
								break;
							case 1:
								man = new createjs.Sprite(spriteSheet2, "jump");
								if (choice == 1 || countAll) {
									manCounter = manCounter + 1;
								}
								break;
							case 2:
								man = new createjs.Sprite(spriteSheet3, "jump");
								if (choice == 2 || countAll) {
									manCounter = manCounter + 1;
								}
								break;
							case 3:
								man = new createjs.Sprite(spriteSheet4, "jump");
								if (choice == 3 || countAll) {
									manCounter = manCounter + 1;
								}
								break;
							case 4:
								man = new createjs.Sprite(spriteSheet5, "jump");
								if (choice == 4 || countAll) {
									manCounter = manCounter + 1;
								}
								break;
						}
					}
					man.y = h - 365 * scalingY;
					man.scaleX = scalingX;
					man.scaleY = scalingY;
					man.up = false;
					man.velX = velAr[Math.floor(Math.random() * velAr.length)];
				}
				stage.addChild(man);
				//manCounter = manCounter + 1;	
				variedTicks = Math.floor((Math.random() * rate1) + rate2);
				incrTicks = 0;
			}
			var l = stage.getNumChildren();
			// for (var i = 4; i < l; i++) {
			// 	man = stage.getChildAt(i);
			// 	var deltaG = event.delta / man.velX;
			// 	var position = man.x + 150 * deltaG;
			// 	var manW = man.getBounds().width * man.scaleX;
			// 	man.x = (position >= w + manW) ? -manW : position;
			// }
			for (var i = l-1; i > 3; i--) {
				man = stage.getChildAt(i);
				var deltaG = event.delta / man.velX;
				var position;
				if (man.velX > velVert[0] - 1) {
					if (man.y > (h - 230 * scalingY) && man.up) {
						position = man.y - 150 * deltaG * scalingY;
					} else {
						position = man.y + 150 * deltaG * scalingY;
						man.up = false;
					}
				} else {
					position = man.x + 150 * deltaG * scalingX;
				}
				var manW = man.getBounds().width * man.scaleX;
				if (man.velX > velVert[0] - 1) {
					if (position > (h - 50 * scalingY)) {
						stage.removeChildAt(i);
					} else {
						man.y = position;
					}
				} else {
					if (position >= w + manW) {
						stage.removeChildAt(i);
					} else {
						man.x = position;
					}
				}
			}
			var deltaS = event.delta / 1000;
			ground.x = (ground.x - deltaS * 150 * scalingX) % ground.tileW;
			hill.x = (hill.x - deltaS * 30 * scalingX);
			if (hill.x + hill.image.width * hill.scaleX <= 0) {
				hill.x = w;
			}
			hill2.x = (hill2.x - deltaS * 45 * scalingX);
			if (hill2.x + hill2.image.width * hill2.scaleX <= 0) {
				hill2.x = w;
			}
			incrTicks = incrTicks + 1;
			totalTicks = totalTicks + 1;
			if (stage.getNumChildren() == 4 && manCounter == rand) {
				difference = Math.abs(playerCount - rand);
				if (difference < 3) {
					// window.alert("correct");
					mode = 5;
				} else {
					// window.alert("incorrect");
					mode = 6;
				}
				variedTicks = 0;
				incrTicks = 0;
				manCounter = 0;
				playerCount = 0;
				countAll = false;
				round = round + 1;
			}
			break;
		case 5: // correct
			if (counter == 0) {
				if (difference == 0) {
					correct = new createjs.Bitmap(loader.getResult("correct"));
					correct.x = Math.floor(w/2 - 300 * scalingX);
					correct.scaleX = scalingX;
					correct.scaleY = scalingY;
					stage.addChild(correct);
					score = score + 20;
				} else if (difference == 1) {
					soclose = new createjs.Bitmap(loader.getResult("so-close"));
					soclose.x = Math.floor(w/2 - 315 * scalingX);
					soclose.scaleX = scalingX;
					soclose.scaleY = scalingY;
					stage.addChild(soclose);
					score = score + 10;
				} else {
					almost = new createjs.Bitmap(loader.getResult("almost"));
					almost.x = Math.floor(w/2 - 250 * scalingX);
					almost.scaleX = scalingX;
					almost.scaleY = scalingY;
					stage.addChild(almost);
					score = score + 5;
				}
				counter = counter + 1;
				document.getElementById('score').innerHTML = "Score: " + score;
				if (score > highscore) {
					highscore = score;
					document.getElementById('highscore').innerHTML = "High Score: " + highscore;
				}
			} else if (counter >= 80) {
				mode = 0;
				counter = 0;
				if (difference == 0) {
					stage.removeChild(correct);
				} else if (difference == 1) {
					stage.removeChild(soclose);	
				} else {
					stage.removeChild(almost);	
				}
				
			} else {
				counter = counter + 1;
			}
			break;
		case 6: // incorrect
			if (counter == 0) {
				incorrect = new createjs.Bitmap(loader.getResult("incorrect"));
				incorrect.x = Math.floor(w/2 - 310 * scalingX);
				incorrect.scaleX = scalingX;
				incorrect.scaleY = scalingY;
				stage.addChild(incorrect);
				counter = counter + 1;
				document.getElementById('score').innerHTML = a + "/" + b;
			} else if (counter >= 80) {
				mode = 0;
				counter = 0;
				stage.removeChild(incorrect);
				score = 0;
				document.getElementById('score').innerHTML = "Score: " + score;
			} else {
				counter = counter + 1;
			}
			break;
	}
	// if (roundover) {
	// 	roundover = false;
	// 	rand = Math.floor((Math.random() * 12) + 10);
	// 	rate1 = Math.floor((Math.random() * 60) + 10);
	// 	rate2 = 10;
	// 	// switch (round) {
	// 	// 	case 1:
	// 	// 		rand = Math.floor((Math.random() * 12) + 10);
	// 	// 		rate1 = 50;
	// 	// 		rate2 = 10;
	// 	// 		break;
	// 	// 	case 2:
	// 	// 		rand = Math.floor((Math.random() * 12) + 10);
	// 	// 		rate1 = 50;
	// 	// 		rate2 = 10;
	// 	// 		break;
	// 	// 	case 3:
	// 	// 		break;
	// 	// 	case 4:
	// 	// 		break;
	// 	// 	case 5:
	// 	// 		break;
	// 	// }
	// }
	
	stage.update(event);
}

function begin() {
	examples.showDistractor();
	stage = new createjs.Stage("testCanvas");
	setsize();
}

function setsize() {
	var tempw = document.getElementById("gomango").offsetWidth * 0.976;
    stage.canvas.width = tempw;
    stage.canvas.height = tempw / 2.4; 
    init();
}

function resize() { 
	// var tempw = document.getElementById("gomango").offsetWidth * 0.976;
 //    stage.canvas.width = tempw;
 //    stage.canvas.height = tempw / 2.4; 
 //    init();   
}
