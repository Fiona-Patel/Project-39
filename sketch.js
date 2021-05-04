var backImage,backgr;
var monkey, monkey_running;
var ground,ground_img;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var invisibleGround;
var ObstacleGroup;
var FoodGroup;

function preload(){
  backImage=loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  gameOverImage = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  ObstacleGroup = new Group();

  gameOver = createSprite(380,290,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.7;
  gameOver.visible = false;

  invisibleGround = createSprite(400,380,800,20);
  invisibleGround.visible = false;

}

function spawnFood(){ 
  if(frameCount %80 === 0){
    var banana = createSprite(600,250,40,10)
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX= -4;

    banana.lifetime = 300;
    //monkey.depth = banana.depth +1;
    FoodGroup.add(banana);
  }
}
function spawnObstacles (){
  if(frameCount %300 === 0){
    var obstacle = createSprite(800,350,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX= -6;

    obstacle.lifetime = 300;

    ObstacleGroup.add(obstacle);
  }
}
  
  



function draw() { 
  background(0);

  if (gameState === PLAY){
    monkey.velocityY = monkey.velocityY+0.8;
    monkey.velocityX = 3;

    if (monkey.x > 240){
      monkey.velocityX = 0;
      backgr.velocityX = -6;
    }
    spawnFood();
  
    spawnObstacles();

  if(backgr.x<0){
    backgr.x=backgr.width/2;
  }
  

  if(keyDown("space") ) {
    monkey.velocityY = -12;
  }
  switch(score){
    case 10:
      monkey.scale = 0.12;
      break;
      
      case 20:
      monkey.scale = 0.14;
      break;

      case 30:
      monkey.scale = 0.16;
      break;

      case 40:
      monkey.scale = 0.18;
      break;

      default:break
  }
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score+2;
  }
  if(ObstacleGroup.isTouching(monkey)){
    gameState = END;
  }
 }
 else if(gameState === END){
   score = 0;
   FoodGroup.setVelocityEach(0);
   ObstacleGroup.setVelocityEach(0);
   backgr.velocityX = 0;
   gameOver.visible = true;
   monkey.visible = false;
 }
 monkey.collide(invisibleGround);
 
  drawSprites();

  textSize(30);
  fill(255);
  text("Score = "+score, 500,100);
}
  