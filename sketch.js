let mic, fft;
var start = 0
function setup() {
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES) //sets angle mode to degrees, ensuring smooth circle
  noiseDetail(2,1) //sets detail and complexcity of perlin noise
  mic = new p5.AudioIn(); //allows mic
  mic.start(); //starts mic
  fft = new p5.FFT(); //reads fft
  fft.setInput(mic);
  
}
function mousePressed(){
  userStartAudio(); //starts audio once mouse is pressed
}

function draw() {
  background(30); //background colour
  noStroke();
  let vol = mic.getLevel(); // vol is a variable for the microphone level
  let spectrum = fft.analyze(); //returns an array representing the amplitude values for different frequency bins.
  let bass = fft.getEnergy("bass"); //contains a value representing the energy level of the bass frequencies in the audio signal.
  
  translate (width/2, height/2) //centres canvas
  
  var space = 0.8 //creates a variable called space
  for (var i = 0; i < 360; i += space){ // for loop that between 0 to 360 there will be increments of 'space' = 0.8
    var xoff = map(cos(i), -1, 1, 0 , 3) // creates variable 'xoff' based of the cosine of 'i' and remaps the cosine values from -1,1 to 0,3
    var yoff = map(sin(vol), -1 , 1 ,0,3) //  creates variable 'yoff' based on the sine of 'vol' and remaps from -1,1 to 0,3

    var n = noise (xoff  + start *2  , yoff*2 + start ) //calculates the perlin noise for generating smooth, continuous patterns.
    
    var h = map(n , 0,1, -150, 100) // used to control height of movements incorporating noise value
    
    var r = map(sin(i), -1, 150, bass, 255) //colour control using bass values
    var g = map(h, -1, 150, 50, 150) //colour controls using 'h' value
    var b = map(n, -1 , bass*2 , 150, 255 ) // colour controll using bass and noise values
    console.log (vol); //logs volume
   
    
    rotate(space*2) //rotates drawing
    
    fill(r,g,b) //fills colour
    rect (200, 0, h, 1) //draws each line in the circle
  }
  start += 0.01
}