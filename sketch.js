var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, robotImg;
var laser, laserImg, laserGroup;
var ground;
var backGround, backGroundImg;
var enemyImg, enemyGroup;
var obstacle1, obstacle2, obstacle3, obstacle4;

function preload(){
  robotImg = loadImage("Images/sprite.png");
  laserImg = loadImage("Images/laser.png");
  enemyImg = loadAnimation("Images/enemy1.png","Images/enemy2.png");
  backGroundImg = loadImage("Images/background.png");

  obstacle1 = loadImage("Images/obstacle1.png");
  obstacle2 = loadImage("Images/obstacle2.png");
  obstacle3 = loadImage("Images/obstacle3.png");
  obstacle4 = loadImage("Images/obstacle4.png");
}

function setup(){
  createCanvas(400,400);
  
  backGround = createSprite(200, 240);
  backGround.addImage(backGroundImg);
  backGround.scale = 3;
  backGround.x = backGround.width /2;
  backGround.velocityX = -5;
  
  player = createSprite(40,345);
  player.addImage("moving", robotImg);
  player.scale = 0.13;
  
  ground  = createSprite(200,350,400,10);
  ground.visible = false;
  
  laserGroup = new Group();
  enemyGroup = new Group();  
  stoneGroup = new Group(); 
}

function draw(){
  background("Black");
  
  player.collide(ground);
  
  if (gameState === PLAY) {
    if (backGround.x < 0){
      backGround.x = backGround.width/2;
    } 
      
    player.velocityY = player.velocityY + 0.8;  
    
    if (keyDown("up_arrow") && player.y>170){
      player.velocityY = -10;
    }
      
    enemy();
    stone();
      
    if (keyDown("space")) {
      laser();
    }
      
    if (laserGroup.isTouching(enemyGroup)) {
      enemyGroup.destroyEach();
      laserGroup.destroyEach();
    }

    if (laserGroup.isTouching(stoneGroup)) {
      laserGroup.destroyEach();
    }

    if (stoneGroup.isTouching(player)) {
      gameState = END;
    }
  } else if(gameState === END) {
    backGround.velocityX = 0
  }
  console.log(gameState);
  drawSprites(); 
}

function laser () {
  var laser = createSprite(40,100,5,10);
  laser.velocityX = 10;
  laser.addImage(laserImg);
  laser.y = player.y;
  laser.scale = 0.1;
  laser.lifetime = 38;
  laserGroup.add(laser);
  return laser; 
}

function enemy() {
  if (frameCount % 80 === 0) {
    var enemy = createSprite(400,30,10,10);
    enemy.addAnimation("moving",enemyImg);
    enemy.scale = 0.7;
    enemy.velocityX = -6;
    enemy.y = Math.round(random(180,340));
    enemy.setLifetime = 5;
    enemyGroup.add(enemy);    
  }  
}

function stone() {
  if (frameCount % 100 === 0) {
    var stone = createSprite(400,320,10,10);
    stone.scale = 0.7;
    stone.velocityX = -6;
    stone.setCollider("rectangle", 0, 0, 100, 100);

    var rand = Math.round(random(1, 4));
    switch(rand) {
      case 1: stone.addImage(obstacle1);
      break;
      case 2: stone.addImage(obstacle2);
      break;
      case 3: stone.addImage(obstacle3);
      break;
      case 4: stone.addImage(obstacle4);
      break;
      default: break;
    }
    stone.setLifetime = 2;
    stoneGroup.add(stone);    
  }  
}