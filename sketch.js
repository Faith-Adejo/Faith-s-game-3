var bkImg;
var boyImg;
var gameoverImg;
var rocksImg,logImg;
var PLAY=1
var END=0
var gameState=PLAY
var obstaclesGroup;
var score=0

function preload(){
bkImg=loadImage("bk.jpg");
boyImg=loadAnimation("b1.png","b2.png","b3.png","b4.png","b5.png","b6.png","b7.png","b8.png","b9.png")
rocksImg=loadImage("rocks.png");
log=loadImage("log.png");
groundImg=loadImage("ground2.png");
boyCollided=loadAnimation("b6.png");
gameoverImg=loadImage("gameover.png");
restartbtn=loadImage("restartbtn.png");
jungleSound=loadSound("jungle.mp3");
}

function setup(){
createCanvas(1200,550)
boy = createSprite(150,420,20,20);
boy.addAnimation("running",boyImg);
boy.addAnimation("collided",boyCollided);
boy.scale=0.3

ground=createSprite(600,540,1200,20);
ground.addImage(groundImg);
ground.scale=2.5
ground.velocityX=-10

g1=createSprite(600,250);
g1.addImage(gameoverImg);
g1.scale=0.5

r1=createSprite(1150,50);
r1.addImage(restartbtn);
r1.scale=0.1

boy.setCollider("rectangle",0,0,250,450);
boy.debug=true

obstaclesGroup= new Group()
}

function draw(){
background(bkImg);
textSize(30);
fill("red");
stroke("white");
text("Score: "+ score, 100,50);
 
if (gameState===PLAY){
  jungleSound.play();
  jungleSound.setVolume(0.1)
  g1.visible=false
    if(ground.x<0){
        ground.x=ground.width/2
    }
    if(keyDown("space")){
        boy.velocityY=-10
    }
    boy.velocityY=boy.velocityY+0.5
    spawnObstacles();
    if(obstaclesGroup.isTouching(boy)){
        gameState=END;
    }
    score = score + Math.round(frameCount/10);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
}

else if(gameState===END){
  g1.visible=true
    boy.velocityY=0;
obstaclesGroup.setVelocityXEach(0);
ground.velocityX=0;
boy.changeAnimation("collided",boyCollided)

if(mousePressedOver(r1)){
  reset();
}

}
boy.collide(ground);


drawSprites();

}

function reset(){
  gameState=PLAY
  obstaclesGroup.destroyEach();
  boy.changeAnimation("running",boyImg);
}

function spawnObstacles(){
    if(frameCount%150===0){
    obstacle = createSprite(800,515,20,20);
    obstacle.velocityX=-8
var rand=Math.round(random(1,2));
switch(rand){
    case 1:obstacle.addImage(rocksImg);
    break
    case 2:obstacle.addImage(log);
    break
}

obstacle.scale=0.2;
obstaclesGroup.add(obstacle);
    }
}
