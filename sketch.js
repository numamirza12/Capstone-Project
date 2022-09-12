var PLAY = 1;
var END = 0;
var gameState = PLAY;
var mario, mario_large, mario_jumping, mario_running;
var ground, invisible_ground, groundImage;
var piranha, piranhaImage;
var goomba, goombasGroup, goombaImage;

var score = 0;
var restartImage;
var jumpsound, largesound, goombahitsound;

function preload(){
mario_running = loadAnimation("mario1.png","mario2.png");
mario_jumping = loadAnimation("mario_jumping.png");
groundImage = loadImage("ground.png");
goombaImage = loadImage("goomba.png");
piranhaImage = loadImage("piranhaplant.png");
restartImage = loadImage("restart.png");
}

function setup() {
 createCanvas(windowWidth,windowHeight);
 mario = createSprite(50,160,20,50);
 mario.addAnimation("running", mario_running);
 mario.addAnimation("jumping", mario_jumping);
 mario.scale = 0.6;

 ground = createSprite(200,180,400,20);
 ground.addImage("ground",groundImage);
 ground.x = ground.width/2;

 restart = createSprite(300,100);
 restart.addImage(restartImage);

 restart.scale = 0.5;

 invisible_ground = createSprite(200,190,400,10);
 invisible_ground.visible = false;

 goombasGroup = createGroup();

 mario.setCollider("rectangle",0,0,mario.width,mario.height);
 mario.debug = true;

 score = 0;
 coins = 0;

}

function draw() {
 background(180);

 text("Score"+score,500,50);

 if(gameState === PLAY) {

    restart.visible = false;

    ground.velocityX = -(4+3* score/100);
    score = score + Math.round(getFrameRate()/60);
 
 if(score>0 && score%100 === 0) {
   //play checkpoint sound 
 }
 if(ground.x < 0) {
    ground.x = ground.width/2;
 }

 if(touches.length>0 || keyDown("space") && mario.y>=75) {
    mario.velocityY = -12;
    //play jump sound;
    touches=[];
 }

 mario.velocityY = mario.velocityY +0.6;

 spawnGoombas();


 
 if(goombasGroup.isTouching(mario)) {
    gameState = END;
    //play die sound
 }

}
 else if(gameState === END) {
    restart.visible = true;

    //set mario to collided animation

    ground.velocityX = 0;
    mario.velocityX = 0;

goombasGroup.setLifetimeEach(-1);


goombasGroup.setVelocityXEach(0);

}

goombasGroup.collide(invisible_ground);

if(mousePressedOver(restart)) {
    reset();
}
 drawSprites();
}

function reset(){
    gameState = PLAY;
    restart.visible = false;
    goombasGroup.destroyEach();
   
    mario.changeAnimation("running",mario_running);
    score = 0;
  }
  
  
  function spawnGoombas(){
   if (frameCount % 45 === 0){
     var goomba = createSprite(80,160,20,50);
     goomba.addImage(goombaImage);
     goomba.scale = 0.01;
     goomba.velocityX = -3;

      goomba.lifetime = 134;
      goomba.depth = mario.depth;
      mario.depth = goomba.depth + 1;
      goombasGroup.add(goomba);
      }
   }