let Cars = [];
let SavedCars = [];
let Track = [];

let Population = 100;
let LifeSpan = 1000;
let TimeScale = 1;
let BestScoreEver = 0;

let RewardGates = [];

let TrackM;

let GlobalCamera;

function setup() {
  GlobalCamera = new Camera;
  SetUpUI();
  TrackM = new TrackMaker;
  Track = TrackM.MakeTrack();
  RewardGates = TrackM.MakeRewardGates();
  for (let i = 0; i < Population; ++i){
    Cars[i] = new Car;
  }
  createCanvas(windowWidth - 5, windowHeight - 5);
  background(18);
  frameRate(60);
}

function draw() {
  if (Cars.length > 0) GlobalCamera.Follow(Cars[FindFastest()]);
  background(18);
  RewardGates[BestScoreEver % RewardGates.length].Render("Green", GlobalCamera);

  for (let Time = 0; Time < TimeScale; ++Time){
    for (let i = 0; i < Cars.length; ++i){
      if (Cars[i].HasCrashed) SavedCars.push(Cars.splice(i, 1)[0]);
    }

    if (Cars.length == 0) CreateNextGeneration();

    for (let i = 0; i < Cars.length; ++i){
      Cars[i].Update(Track, RewardGates, LifeSpan);
    }
  }

  BestIndex = FindFastest();
  Cars[BestIndex].Best = true;
  for (let i = 0; i < Cars.length; ++i){
    if (i != BestIndex) Cars[i].Best = false;
  }

  for (let i = 0; i < Cars.length; ++i){
    Cars[i].Render(GlobalCamera);
  }

  for (let Wall of Track){
    Wall.Render("White", GlobalCamera);
  }
  ApplyUI(GlobalCamera);

  //TrackM.Render();
}
