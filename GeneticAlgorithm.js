function CreateNextGeneration(){
  GenCounter++;
  CalculateFitness();
  Cars[0] = new Car(SavedCars[FindBest()]);
  Cars[0].Color = color(246, 202, 9);
  for (let i = 1; i < Population; ++i){
    Cars[i] = PickOne();
    Cars[i].Mutate(0.05);
  }
  SavedCars = [];
}

function FindBest(){
  let MaxScore = 0;
  let BestIndex = 0;
  for (let i = 0; i < SavedCars.length; ++i){
    if (SavedCars[i].Score > MaxScore){
      MaxScore = SavedCars[i].Score;
      BestIndex = i;
    }
  }
  BestScoreEver = MaxScore;
  return BestIndex;
}

function PickOne(){
  let AncestorIndex = 0;
  let WheelOfFortune = Math.random();
  while (WheelOfFortune > 0) {
    WheelOfFortune -= SavedCars[AncestorIndex].Fitness;
    AncestorIndex++;
  }
  AncestorIndex--;

  let NiceCar = SavedCars[AncestorIndex];
  let Child = new Car(NiceCar);
  return Child;
}

function CalculateFitness(){
  let Sum = 0;
  for (let i = 0; i < SavedCars.length; ++i){
    Sum += (SavedCars[i].Score * SavedCars[i].Score);
  }
  for (let i = 0; i < SavedCars.length; ++i){
    SavedCars[i].Fitness = (SavedCars[i].Score * SavedCars[i].Score) / Sum;
  }
}
