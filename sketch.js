var score = 0
var PLAY = 1
var END = 0
var gameState = PLAY

var bgm
var bgImg
var bgImg2

var balloon
var balloonI

var bottomg
var topg

var obsTop, top1, top2
var bottom1, bottom2, bottom3
var obsBottom

var topG
var bottomG
var barG

var gameOver
var gameOverImg
var restartImg
var restart

var jump
var die




 

function preload() {
    bgImg2 = loadImage("assets/bgImg2.jpg");
    bgImg = loadImage("assets/bg.png");
    balloonI = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png");
    top1 = loadImage("assets/obsTop1.png");
    top2 = loadImage("assets/obsTop2.png");
    bottom1 = loadImage("assets/obsBottom1.png");
    bottom2 = loadImage("assets/obsBottom2.png");
    bottom3 = loadImage("assets/obsBottom3.png");
    gameOverImg = loadImage("assets/gameOver.png")
    restart = loadImage("assets/restart.png")
    die = loadSound("assets/die.mp3")
    jump = loadSound("assets/jump.mp3")
}


function setup() {

    bgm = createSprite(165, 485, 1, 1)
   // bgm.addImage("bm",bgImg)
   // bgm.scale = 1.3
   getBckgroundImg()

    balloon = createSprite(100, 200, 20, 50)
    balloon.addAnimation("balloon", balloonI)
    balloon.scale = 0.2

    bottomg = createSprite(200, 390, 800, 20)
    bottomg.visible = false

    topg = createSprite(200, 10, 800, 20)
    topg.visible = false

    gameOver = createSprite(220 , 200)
    gameOver.addImage("gmae",gameOverImg)
    gameOver.sacle = 0.5
    gameOver.visible = false

    restart = createSprite(220 , 240)
    restart.addImage("retart",restartImg)
    restart.scale = 0.5
    restart.visible = false

   topG = new Group()
   bottomG = new Group()
   BarG  = new Group()

}





function draw() {

    if(gameState === PLAY){
        if (keyDown("space")) {

            balloon.velocityY = -6
            jump.play()
        }
        balloon.velocityY = balloon.velocityY + 2
        Bar()
    spawnObstaclesTop()
    spawnObstaclesBottom()

    if(topG.isTouching(balloon) || bottomG.isTouching(balloon) || balloon.isTouching(topg ) ||
    balloon.isTouching(bottomg)){
        gameState = END
        die.play()
    }
    }

    if(gameState === END){

    gameOver.visible = true
    gameOver.depth = gameOver.depth + 1
    restart.visible = true
    restart.depth = restart.depth + 1
    balloon.velocityY = 0
    balloon.velocityX = 0

    topG.setVelocityXEach(0)
    bottomG.setVelocityXEach(0)
    BarG.setVelocityXEach(0)

    topG.setLifetimeEach(-1)
    bottomG.setLifetimeEach(-1)
    BarG.setLifetimeEach(-1)
    balloon.y = 100

    if(mousePressedOver(restart)){
   reset()  
    }
    }

    drawSprites()
    Score()

}

function reset(){

gameState = PLAY
gameOver.visible = false
restart.visible = false
topG.destroyEach()
bottomG.destroyEach()
BarG.destroyEach()
score = 0

}

function Score(){

if(balloon.isTouching(BarG)){

    score = score + 1

}

fill("yellow")
textSize(30)
text("Score : " + score ,250,50)

}










function spawnObstaclesTop() {
    if (frameCount % 60 === 0) {

        obsTop = createSprite(400, 50, 40, 50);
        obsTop.scale = 0.1
        obsTop.velocityX = -4
        obsTop.y = Math.round(random(10, 100));
        var rand = Math.round(random(1, 2));
       switch(rand){
        case 1: obsTop.addImage(top1)
        break;
        case 2: obsTop.addImage(top2)
        break;
        default:break
    }
    obsTop.lifetime = 100
   balloon.depth = balloon.depth + 1
   topG.add(obsTop)
    }
}


function Bar (){
   
if(frameCount % 60 === 0){

    var bar = createSprite(400,200,10,800)
    bar.velocityX = -6
    bar.depth = balloon.depth
    bar.lifetime = 70
    bar.visible = false

}
}


function spawnObstaclesBottom(){

if(frameCount % 60 === 0){

   obsBottom = createSprite(400,300,350,40,50)
   // obsBottom.addImage(bottom1)
   obsBottom.scale = 0.07
   obsBottom.velocityX = -4
   var rand = Math.round(random(1,3));
   switch(rand){
    case 1: obsBottom.addImage(bottom1)
    break;
    case 2: obsBottom.addImage(bottom2)
    break;
    case 3: obsBottom.addImage(bottom3)
    break;
    default:break
   }
 obsBottom.lifetime = 100
 balloon.depth = balloon.depth+1
bottomG.add(obsBottom)

}

}


async function getBckgroundImg(){

    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
    var responseJSON = await response.json()
    var datetime = responseJSON.datetime
    var hour = datetime.slice(11,13)
    if(hour >= 06 && hour<=19){

     bgm.addImage(bgImg)
     bgm.scale = 1.3

    }else{

        bgm.addImage(bgImg2)
        bgm.scale = 1.5
        bgm.x = 200
        bgm.y = 200
    }

}

