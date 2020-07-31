var canvas, camx;
var player, enemy, clouds;
var isJumping, score, speed;
var gameState = 0;
var running;
var timer = 830;
var countdown = 5;
var sprite = 0;

var car1, car2, car3, car4, cars;
function preload(){
  trex = loadImage("trex.gif");
  cactus1 = loadImage("cactus.gif");
  cactus2 = loadImage("cact2.gif");
  cloud = loadImage("cloud.gif");
  dead = loadAnimation("tded.gif");
  bg = loadImage("desert.png");
  trex_running = loadAnimation("t1.png","t1.png","t2.png","t2.png", "t3.png","t3.png");
}
function setup(){
  camx = camera.position.x;
  ground = createSprite(camx,400,1200,20);
  canvas = createCanvas(1200,400);
  player = createSprite(camx -550,350,1,1);
  player.addAnimation("running", trex_running);
  enemy = createSprite(camx + 1250,350,1,25);
  enemy.addImage("d", cactus1);
  
  enemy.scale = 0.5;
  score = 0;
  speed = 2
}


function draw(){
  background(bg);
  camx = camera.position.x;
  ground.x = camx; 
  textSize(15); 
  fill("white");
  text("Score: " + score, camx + 500,20);
  
  player.collide(ground);
  if(gameState === 0){
    if(score % 1000 === 0 && score !== 0){ 
      speed += 0.5;
    }
    if(sprite == 1){
      player.addAnimation("running", trex_running);
      player.y = 343;
      sprite = 0;
    }
    
    player.scale = 1;
    score += 1;
    camera.position.x += speed;
    player.x = camx- 550;
    if(camx % 400 == 0){
      clouds = createSprite(camx + 650,random(20,150),1,1);
      clouds.addImage("cc",cloud)
      clouds.scale = random(0.5,1.5);
    }
    if(camx - 620 > enemy.x){
      rand = random(1,2);
      enemy.x = camx-600 + 1300;
      if(rand == 1){
        enemy.addImage("d", cactus1);
      }
      else{
        enemy.addImage("d", cactus2);
        enemy.scale = 1;
        enemy.setCollider("rectangle",0,0,85,100);
      }
    }
    if(keyDown("SPACE") && player.y > 342){
      player.velocityY = -6.5;
    }
    if(player.y < 340){
      isJumping = true;
    }
    else{
      isJumping = false;
    }
    if(player.velocityY != 0){
      player.velocityY += 0.1;
    }
    enemy.debug = true;
    player.setCollider("rectangle",0,0,80,90);
    if(player.isTouching(enemy)){
      gameState = 1;
      console.log("yeet");
      timer = 830;
      countdown = 5;
    }
  }
  else if (gameState = 1){ 
    timer -= 1;
    if(timer % 166 == 0 && countdown >= 1){
      countdown -= 1;
    }
    
    player.addAnimation("running",dead);
    player.scale = 1.25;
    textSize(30);
    fill("red");
    text("GAME OVER",camx - 100,200); 
    fill("white");
    textSize(20);
    text("Press Space to Restart in " + countdown,camx - 130,250);
    player.velocityY = 0;
    if(keyDown("SPACE") && countdown == 0){
      
      camx = 0;
      speed = 2;
      score = 0;
      enemy.x = camx;
      sprite = 1; 
      gameState = 0; 
    }
  }
  console.log(camx);
  drawSprites();
}
