let ground;
let lander;
var lander_img;
var bg_img;
var thrust,crash,land;
var rcs_left;
var rcs_right;
var obs;

var vx = 0;
var vy = 0;
var g = 0.05;
var fuel = 100;
var timer;
var obstacle_img;
var lz_img;
var rickImg, rick, fondo2;


function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg2.png");
  thrust = loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png");
  crash= loadAnimation("crash1.png","crash2.png","crash3.png");
  land = loadAnimation("landing1.png" ,"landing2.png","landing_3.png");
  rcs_left = loadAnimation("left_thruster_1.png","left_thruster_2.png");
  normal = loadAnimation("normal.png");
  rcs_right = loadAnimation("right_thruster_1.png","right_thruster_2.png");
  obstacle_img = loadImage("obstacle.png");
  lz_img = loadImage("lz.png");
  fondo2.loadImage("rickroll.gif");
  thrust.playing= true;
  thrust.looping= false;
  land.looping = false;
  crash.looping = false; 
  rcs_left.looping = false;
  rcs_right.looping = false;
  //rickImg = loadAnimation("rick/rick1.png","rick/rick2.png","rick/rick3.png");

}

function setup() {
  createCanvas(1000,700);
  frameRate(80);
  timer = 1500;

  thrust.frameDelay = 5;
  land.frameDelay = 5;
  crash.frameDelay = 10;
  rcs_left.frameDelay = 5;

  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
  lander.setCollider("rectangle",0,0,200,200)

  //lander.addAnimation('thrust',"b_thrust_1.png","b_thrust_2.png","b_thrust_3.png" );
  lander.addAnimation('thrusting',thrust);
  lander.addAnimation('crashing',crash);
  lander.addAnimation('landing',land);
  lander.addAnimation('left',rcs_left);
  lander.addAnimation('normal',normal);
  lander.addAnimation('right',rcs_right);

  obs = createSprite(320,530,50,100);
  obs.addImage(obstacle_img);
  obs.scale = 0.5;
  obs.setCollider("rectangle",0,100,300,300);
  //obs.debug = true;

  ground = createSprite(500,690,1000,20);
  ground.debug = true;
  lz = createSprite(880,610,50,30);
  lz.addImage(lz_img);
  lz.scale = 0.3;

  lz.setCollider("rectangle",0,0,400,100)
  //lz.debug = true;
  rectMode(CENTER);
  textSize(15);

 
  /*button = createButton('play');
  button.mousePressed(toggleVid); // adjuntar un listener al botón
  video.hide();*/


 /*rick = createSprite(width/2,height/2, 50, 50);
 rick.addAnimation("rick", rickImg);
 rick.visible=false;*/
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Velocidad horizontal: " +round(vx,2),800,50);
  text("Combustible: "+fuel,800,25);
  text("Velocidad vertical: "+round(vy),800,75);
  pop();
 
  // Caída
  vy +=g;
  lander.position.y+=vy;
  lander.position.x +=vx;

  // Detección de obstáculo
  if(lander.collide(obs)==true)
  {
    lander.changeAnimation('crashing');
    stop();
  }

  // Detección de zona de aterrizaje
  var d = dist(lander.position.x,lander.position.y,lz.position.x,lz.position.y);
  console.log(d);

  if(d<=35 && (vy<2 && vy>-2 ) && (vx<2 && vx >-2) )
  {
    console.log("landed");
    vx = 0;
    vy = 0;
    g=0;
    lander.changeAnimation('landing');
  }

  if(lander.collide(ground)==true)
  {
    console.log("collided");
    lander.changeAnimation('crashing');
    vx = 0;
    vy = 0;
    g = 0;
    
    //noCanva();
    //lz.detroy();
    //lander.destroy();
    //image(video, 0, 0, width, height); // Dibuja el video en el lienzo
    //image(fondo2, 0, 0, 500, 500);
    //rick.changeAnimation("rick")
    //rick.visible = true;
    gameOver();
  }

  drawSprites();
    lz.depth = lander.depth
  lander.depth = lander.depth + 1;
}

function keyPressed()
{
  if(keyCode==UP_ARROW && fuel>0)
  {
    upward_thrust();
    lander.changeAnimation('thrusting');
    thrust.nextFrame();
    
  }
  if(keyCode==RIGHT_ARROW && fuel>0)
  {
    lander.changeAnimation('left');
    right_thrust();
  }

  if(keyCode==LEFT_ARROW && fuel>0)
  {
    lander.changeAnimation('right');
    left_thrust();
  }
}

function upward_thrust()
{
  vy = -1;
  fuel-=1;
}

function right_thrust()
{ 
  vx += 0.2;
  fuel -=1;
}

function left_thrust()
{
  vx -= 0.2;
  fuel-=1;
}

function stop()
{
  vx = 0;
  vy = 0;
  fuel = 0;
  g = 0;
}



/*function mostrarVideo() {
  // Crea un elemento de video
  const video = document.createElement('video');
  video.src = 'https://youtu.be/HxlysqrFjHo?list=RDFP6EiJ3PUXs'; // Ruta al archivo de video
  video.controls = true; // Mostrar controles de reproducción
  video.width = 640; // Ancho del video
  video.height = 480; // Alto del video

  // Crea un cuadro de diálogo personalizado de SweetAlert
  swal({
    title: 'Video Personalizado',
    html: `
      <video width="640" height="360" controls>
        <source src="Boxing.mp4" type="video/mp4">
        Tu navegador no admite la reproducción de video.
      </video>
    `,
    width: 800,
    showCloseButton: true,
    showConfirmButton: false,
    customClass: {
      content: 'video-swal-content' // Puedes definir estilos personalizados si lo deseas
    }
  });
}*/

function gameOver(){
  swal(
    {
      title:'Fin del juego',
      text: "Gracias por jugar",
      imageUrl: "rickroll.gif",
      imageSize: "150x150",
      confirmButtonText: "Jugar de nuevo"
    },
    function(isConfirm){
      if(isConfirm){
        location.reload();
      }
    }
  )
}
