//creating variables
var alienImg,alien;
var asteroid,asteroidImg;
var obstacle,obstaclesGroup;
var starImg,star,starsGroup;

var bgImg,bg;
var spaceshipImg,spaceship;

var gameOverImg,gameOver;
var restartImg,restart;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){

   alienImg = loadImage("./assets/alien.png");
   asteroidImg = loadImage("./assets/asteroid.png");
   starImg = loadImage("./assets/star.png");
   bgImg = loadImage("./assets/bg.png");
   spaceshipImg = loadImage("./assets/spaceship.png");
   //gameOverImg = loadImage("/assets/gameOver.png");
   //restartImg = loadImage("./assets/reset.png");

}

function setup(){

   createCanvas(600,600);
  
   spaceship = createSprite(300,530,50,50);
   spaceship.addImage("spaceship",spaceshipImg);
   spaceship.scale = 0.1;

   bg = createSprite(300,530);
   bg.addImage("bg",bgImg);
   bg.velocityY = 3;
   

   gameOver = createSprite(200,300);
   gameOver.addImage("gameOver",gameOverImg);

   restart = createSprite(300,350);
   restart.addImage("restart",restartImg);

   gameOver.scale = 0.5;
   restart.scale = 0.5;

   obstaclesGroup = createGroup();
   starsGroup = createGroup();
   
   score=0;
}

function draw() {

  background(bgImg);
  if(bg.y > 400){
   bg.y = 300
 }
  
  //displaying text
  fill ("green") 
  text("Score: "+ score, 500,50);

  if (gameState === PLAY) {

   gameOver.visible=false;
   restart.visible=false;

  //moving the spaceship
  if(keyDown("left_arrow")){
   spaceship.x = spaceship.x - 10;
}

if(keyDown("right_arrow")){
   spaceship.x = spaceship.x + 10; 
}

if(keyDown("up_arrow")){
   spaceship.y = spaceship.y - 10;
}

if(keyDown("down_arrow")){
   spaceship.y = spaceship.y + 10;
}

spawnObstacles();
spawnStars();

if(obstaclesGroup.isTouching(spaceship)){
   spaceship.destroy();
   gameState = END;
 }
   
}
else if (gameState === END){
   gameOver.visible=true;
   restart.visible=true;

   obstaclesGroup.setLifetimeEach(-1);
    starsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityYEach(0);
     starsGroup.setVelocityYEach(0);  
 }

 if(mousePressedOver(restart)) {
   reset();
 }

 drawSprites();
}

function reset(){

   gameState=PLAY
   gameOver.visible = false;
   restart.visible = false;
   obstaclesGroup.destroyEach();
   starsGroup.destroyEach();
   score = 0;
 }
  
   //creating a function to spawn obstacles
   function spawnObstacles(){
      if (frameCount % 60 === 0){
         var obstacle = createSprite(200,5,10,40);
         obstacle.velocityY = +(10);
         
          //generate random obstacles
          var rand = Math.round(random(1,2));
          switch(rand) {
            case 1: obstacle.addImage(alienImg);
                    break;
            case 2: obstacle.addImage(asteroidImg);
                    break; 
                    default: break;
    }
   
    //assign scale and lifetime to the obstacle          
    obstacle.scale = 0.09;
    obstacle.lifetime = 100000;
   
   //add obstacle to the group
    obstaclesGroup.add(obstacle);
                  
   }}

   //creating a function to spawn stars; i.e: stars are score
   function spawnStars(){
      if (frameCount % 60 === 0){
         var star = createSprite(300,5,10,40);
         star.velocityY = +(7);

         //generate random stars
         var rand = Math.round(random(1));
         switch(rand) {
            case 1: star.addImage(starImg);
                    break;
                    default: break;
         }

         //assign scale and lifetime to the star
         star.scale = 0.05;
         star.lifetime = 1000000;

         //add star to the group
         starsGroup.add(star);
      }}

function score(){
   if (starsGroup.isTouching(spaceship)){
      score = score+1;   
   }
}

