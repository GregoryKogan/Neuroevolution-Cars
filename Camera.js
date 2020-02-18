class Camera{
  constructor(){
    this.PosX = 300;
    this.PosY = 135;
  }

  Follow(Car){
    this.GoTo(Car.PosX - windowWidth / 2, Car.PosY - windowHeight / 2);
  }

  GoTo(X, Y){
    this.PosX += (X - this.PosX) / 10;
    this.PosY += (Y - this.PosY) / 10;
  }
}

function FindFastest(){
  let MaxScore = -1;
  let BestCarIndex = 0;
  for (let i = 0; i < Cars.length; ++i){
    if (Cars[i].Score > MaxScore){
      MaxScore = Cars[i].Score;
      BestCarIndex = i;
    }
  }
  return BestCarIndex;
}
