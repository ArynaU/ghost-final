// adding global variables
var towerImg, tower;

var doorImg, door, doorsGroup;

var climberImg, climber, climbersGroup;

var ghost, ghostImg;

var invisibleBlockGroup, invisibleBlock;

var score = 0;
var gameState = "play";

function preload(){
  //preloading all the images

  towerImg = loadImage("tower.png");
  ghostImg = loadImage("ghost-standing.png");
  climberImg = loadImage("climber.png");
  doorImg = loadImage("door.png");
}

function setup(){

// creating canvas
  createCanvas(670,600);

  //creating new groups 
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  //creating a tower sprite
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  // creating ghost sprite
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;

  }
}

function draw(){
  //adding a background
  background('red');

  //addding a text for the first letter
    fill('yellow');
    textSize(15);
    text("S" , 610 ,50);
  //addding a text for the second letter
    fill('yellow');
    textSize(15);
    text("C" , 610 ,63);
  //addding a text for the third letter
    fill('yellow');
    textSize(15);
    text("O", 610 ,76);
  //addding a text for the first letter
    fill('yellow');
    textSize(15);
    text("R" , 610 ,89);
  //addding a text for the first letter
    fill('yellow');
    textSize(15);
    text("E" , 610 ,102);
  // adding a text for score
    fill('yellow');
    textSize(15);
    text( score , 610 ,126);
    

  //if the gameState is set to play
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 4;
    }
    
  //if Right Arrow key is pressed  
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 4;
    }
  //if left Arrow key is pressed   
    if(keyDown("space")){
      ghost.velocityY = -9;
    }
  
  //adding gravity to the ghost  
    ghost.velocityY = ghost.velocityY + 0.5;
  
  // to create infinte effect  
    if(tower.y > 400){
      tower.y = 300;
    }

    //calling the spawn door functions
    spawnDoors();

    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;

      score = score + 2;

      

    }

      

    // if the ghost touches the door, the gamestate will change to end
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600 || ghost.x > 580 || ghost.x < 5 || ghost.y < 10){
      ghost.visible  = false;
      gameState = "end"
    }

    
    
    // draw all sprites
    drawSprites();
  }
  
  //if gamestate is set to end
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over, Press R to Restart Game", 70,250);

    if(keyDown('r') || keyDown('R')){
      gameState = "play";
      score = 0;
      ghost.visible  = true;
      ghost.x =200;
      ghost.y = 200;

      doorsGroup.destroyEach();
      climbersGroup.destroyEach();
      invisibleBlockGroup.destroyEach();

    }
  }

  
}

function spawnDoors() {
  //for every 240 frames a new door will be createds
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    // to solve overlapping
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = false;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

