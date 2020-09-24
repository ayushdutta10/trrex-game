var tower,towerimage;
var door,doorimage,doorGroup;
var climber,climberimage,climberGroup;
var ghost,ghostimage;
var invisible,invisibleGroup;
var gamestate = "play";


function preload () {
towerimage = loadImage("tower.png"); 
  doorimage = loadImage("door.png");
  climberimage = loadImage("climber.png");
  ghostimage = loadImage("ghost-standing.png");
}

function setup () {
 createCanvas(600,600);
  tower = createSprite(300,300,50,50);
  tower.addImage("tower",towerimage);
  tower.velocityY = 1;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostimage)
  ghost.scale = 0.3;
}

function draw () {
background(0);
  
  
  
  
  
  
  if(gamestate === "play") {
  if(tower.y>400) {
    tower.y = 300;
  }  
    spawndoors();
    if(keyDown("left_arrow")) {
    ghost.x = ghost.x-3;
  }
  
  if(keyDown("right_arrow")) {
    ghost.x = ghost.x+3;
  }
  
  if(keyDown("space")) {
   ghost.velocityY = -5;
  }
  
  ghost.velocityY = ghost.velocityY+0.5;
  
   if(climberGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
    if(invisibleGroup.isTouching(ghost) || ghost.y> 600) {
    ghost.destroy();
    gamestate = "end";
  }
    drawSprites();
  }
  if(gamestate === "end") {
   stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
    
    
  }
}
function spawndoors() {
 if(frameCount%240 === 0) {
   var door = createSprite(200,-50)
   door.addImage("door",doorimage);
   door.velocityY = 1;
   door.x = Math.round(random(120,400));
   door.lifetime = 800;
   doorGroup.add(door);
   
   climber = createSprite(200,10);
   climber.addImage("climber",climberimage);
   climber.velocityY = 1;
   climber.x = door.x;
   climber.lifetime = 800;
   climberGroup.add(climber);
   ghost.depth = door.depth;
   ghost.depth = ghost.depth+1;
   
   invisible = createSprite(200,15);
   invisible.x = door.x;
   invisible.velocityY = 1;
   invisible.lifetime = 800;
   invisible.debug = true;
   invisible.width = climber.width;
   invisible.height = 2
   invisibleGroup.add(invisible);
   
   
}
}