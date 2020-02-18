let Device = "Laptop";
let Os = "Win";
let TimeScaleSlider;
let LifeSpanSlider;
let PopulationSlider;
let GenCounter = 1;
function SetUpUI(){
  DetectDevice();
  if (Device == "Laptop"){
    TimeScaleSlider = createSlider(1, 5, 1, 1);
    TimeScaleSlider.position(20, 20);
    TimeScaleSlider.style("width", "150px");

    LifeSpanSlider = createSlider(300, 3000, 300, 1);
    LifeSpanSlider.position(20, 70);
    LifeSpanSlider.style("width", "150px");

    PopulationSlider = createSlider(1, 150, 100, 1);
    PopulationSlider.position(20, 120);
    PopulationSlider.style("width", "150px");
  }
}

function windowResized(){
  if (Device == "Laptop") resizeCanvas(windowWidth - 5, windowHeight - 5);
  else resizeCanvas(windowWidth, windowHeight);
}

function ApplyUI(Camera){
  if (Device == "Laptop"){
    TimeScale = TimeScaleSlider.value();
    LifeSpan = LifeSpanSlider.value();
    Population = PopulationSlider.value();
    push();
    textSize(30);
    fill(255);
    text("Gen: " + GenCounter, windowWidth - 170, 50);
    textSize(22);
    text("TimeScale: " + TimeScaleSlider.value(), 200, 40);
    text("LifeSpan: " + LifeSpanSlider.value(), 200, 90);
    text("Population: " + PopulationSlider.value(), 200, 140);
  }
  else{
    TimeScale = 1;
    LifeSpan = 1700;
    Population = 60;
  }
  fill(246, 202, 9);
  circle(213 - Camera.PosX, 205 - Camera.PosY, 50);
  circle(269 - Camera.PosX, 366 - Camera.PosY, 30);
  circle(790 - Camera.PosX, 608 - Camera.PosY, 60);
  circle(255 - Camera.PosX, 890 - Camera.PosY, 50);
  circle(1211 - Camera.PosX, 893 - Camera.PosY, 40);
  circle(1133 - Camera.PosX, 938 - Camera.PosY, 30);
  circle(1447 - Camera.PosX, 400 - Camera.PosY, 30);
  circle(1642 - Camera.PosX, 424 - Camera.PosY, 30);
  circle(1841 - Camera.PosX, 889 - Camera.PosY, 30);
  circle(2059 - Camera.PosX, 878 - Camera.PosY, 30);
  circle(1988 - Camera.PosX, 240 - Camera.PosY, 30);
  circle(1823 - Camera.PosX, 178 - Camera.PosY, 30);
  circle(1093 - Camera.PosX, 172 - Camera.PosY, 30);
  fill(255);
  noStroke();
  circle(213 - Camera.PosX, 205 - Camera.PosY, 20);
  circle(269 - Camera.PosX, 366 - Camera.PosY, 20);
  circle(790 - Camera.PosX, 608 - Camera.PosY, 20);
  circle(255 - Camera.PosX, 890 - Camera.PosY, 20);
  circle(1211 - Camera.PosX, 893 - Camera.PosY, 20);
  circle(1133 - Camera.PosX, 938 - Camera.PosY, 20);
  circle(1447 - Camera.PosX, 400 - Camera.PosY, 20);
  circle(1642 - Camera.PosX, 424 - Camera.PosY, 20);
  circle(1841 - Camera.PosX, 889 - Camera.PosY, 20);
  circle(2059 - Camera.PosX, 878 - Camera.PosY, 20);
  circle(1988 - Camera.PosX, 240 - Camera.PosY, 20);
  circle(1823 - Camera.PosX, 178 - Camera.PosY, 20);
  circle(1093 - Camera.PosX, 172 - Camera.PosY, 20);
  pop();
}

function DetectDevice(){
  if (displayWidth / 4.29 >= 150) Device = "Laptop";
  else Device = "Phone";
  if (navigator.userAgent.indexOf("like Mac") != -1){
    Os = "IOS";
    Device = "Phone";
  }
}

function mousePressed(){
  if (Os != "IOS") fullscreen(true);
}
