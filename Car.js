class Car{
  constructor(Parent){
    //Phisics
    this.Speed = 0;
    this.TurnSpeed = 0.4;
    this.Angle = 0;
    this.DriftAngle = 0;
    this.PosX = 300;
    this.PosY = 135;
    this.SpeedX = 0;
    this.SpeedY = 0;
    //Visual
    this.Color = color(106, 13, 173);
    this.CarWidth = 80;
    this.CarHeight = 50;
    //UI
    this.Best = false;
    this.NearestPoints = [];
    //AI
    this.Rays = [];
    this.Edges = [];
    this.HasCrashed = false;
    this.Score = 0;
    this.Timer = 0;
    this.Fitness = 0;
    this.LastGate = -1;
    this.Inputs = [];
    this.Brain = null;
    if (Parent) this.Brain = Parent.Brain.Copy();
    else{
      let BrainSpecs = new Specification;
      BrainSpecs.SetOptions(11, 2, 2, [15, 10]);
      this.Brain = new NeuralNetwork(BrainSpecs);
    }
  }

  Mutate(MutationRate){
    this.Brain.Mutate(MutationRate);
  }

  Think(){
    let Output = this.Brain.Predict(this.Inputs);
    this.Move(Output[0]);
    if (Output[1] > 0.5001) this.Turn(1);
    if (Output[1] < 0.4999) this.Turn(-1);
  }

  Move(SpeedRate){
    if (!this.HasCrashed){
      if (SpeedRate >= 0){
        if (this.Speed < SpeedRate) this.Speed += SpeedRate * 0.1 * deltaTime / 16.67;
      }
      else{
        if (this.Speed > SpeedRate) this.Speed += SpeedRate * 0.1 * deltaTime / 16.67;
      }
    }
    else
      this.Speed = 0;
  }

  Turn(Direction){
    angleMode(DEGREES);
    if (this.Speed >= 0.1){
      this.Angle += (1.5 - abs(this.Speed)) * Direction * deltaTime * 0.2;
      this.DriftAngle += 10 * Direction * this.Speed;
    }

    if (this.Angle > 360) this.Angle -= 360;
    if (this.Angle < 0) this.Angle = 360 - this.Angle;
  }

  Update(Track, RewardGates, LifeSpan){
    this.Logic(Track, RewardGates);
    this.Think();
    this.CalculatePhysics();
    this.Timer++;
    if (this.Timer > LifeSpan)
      this.HasCrashed = true;
  }

  CalculatePhysics(){
    if(this.Speed > 0) this.Speed -= 0.001 * deltaTime;
    else if (this.Speed < 0) this.Speed += 0.001 * deltaTime;
    if (this.Speed < 0.005 && this.Speed > -0.005) this.Speed = 0;
    this.DriftAngle *= 0.9;
    if (this.DriftAngle < 0.1 && this.DriftAngle > -0.1) this.DriftAngle = 0;

    angleMode(DEGREES);
    this.SpeedX = this.Speed * cos(this.Angle);
    this.SpeedY = this.Speed * sin(this.Angle);

    this.PosX += this.SpeedX * deltaTime;
    this.PosY += this.SpeedY * deltaTime;
  }

  Logic(Track, RewardGates){
    if (this.Rays.length == 0){
      for (let i = 0; i < 11; ++i){
        let RayI = new Ray;
        let CarPos = createVector(this.PosX, this.PosY);
        RayI.SetParameters(CarPos, radians(this.Angle));
        this.Rays.push(RayI);
      }
    }
    else{
      for (let i = 0; i < this.Rays.length; ++i){
        let CarPos = createVector(this.PosX, this.PosY);
        if (i == 0) this.Rays[i].SetParameters(CarPos, radians(this.Angle + this.DriftAngle));
        if (i == 1) this.Rays[i].SetParameters(CarPos, radians(this.Angle + this.DriftAngle + 22.5));
        if (i == 2) this.Rays[i].SetParameters(CarPos, radians(this.Angle + this.DriftAngle - 22.5));
        if (i == 3) this.Rays[i].SetParameters(CarPos, radians(this.Angle + this.DriftAngle + 45));
        if (i == 4) this.Rays[i].SetParameters(CarPos, radians(this.Angle + this.DriftAngle - 45));
        if (i == 5) this.Rays[i].SetParameters(CarPos, radians(this.Angle + this.DriftAngle + 67.5));
        if (i == 6) this.Rays[i].SetParameters(CarPos, radians(this.Angle + this.DriftAngle - 67.5));
        if (i == 7) this.Rays[i].SetParameters(CarPos, radians(this.Angle + this.DriftAngle + 90));
        if (i == 8) this.Rays[i].SetParameters(CarPos, radians(this.Angle + this.DriftAngle - 90));
        if (i == 9) this.Rays[i].SetParameters(CarPos, radians(this.Angle + this.DriftAngle + 135));
        if (i == 10) this.Rays[i].SetParameters(CarPos, radians(this.Angle + this.DriftAngle - 135));
      }
    }

    let UpperRight = createVector();
    let UpperLeft = createVector();
    let DownRight = createVector();
    let DownLeft = createVector();
    const CarAngle = -(360 - this.Angle - this.DriftAngle);
    UpperRight.x = this.PosX + this.CarWidth / 2 * cos(CarAngle) - this.CarHeight / 2 * cos(90 + CarAngle);
    UpperRight.y = this.PosY + (this.CarWidth / 2 * sin(CarAngle) - this.CarHeight / 2 * sin(90 + CarAngle));

    UpperLeft.x = this.PosX - this.CarWidth / 2 * cos(CarAngle) - this.CarHeight / 2 * cos(90 + CarAngle);
    UpperLeft.y = this.PosY - (this.CarWidth / 2 * sin(CarAngle) + this.CarHeight / 2 * sin(90 + CarAngle));

    DownRight.x = this.PosX + this.CarWidth / 2 * cos(CarAngle) + this.CarHeight / 2 * cos(90 + CarAngle);
    DownRight.y = this.PosY + (this.CarWidth / 2 * sin(CarAngle) + this.CarHeight / 2 * sin(90 + CarAngle));

    DownLeft.x = this.PosX - this.CarWidth / 2 * cos(CarAngle) + this.CarHeight / 2 * cos(90 + CarAngle);
    DownLeft.y = this.PosY - (this.CarWidth / 2 * sin(CarAngle) - this.CarHeight / 2 * sin(90 + CarAngle));
    if (this.Edges.length == 0){
      for (let i = 0; i < 4; ++i){
        let Edge = new Wall();
        this.Edges.push(Edge);
      }
    }
    else{
      this.Edges[0].SetParameters(UpperRight.x, UpperRight.y, UpperLeft.x, UpperLeft.y);
      this.Edges[1].SetParameters(UpperRight.x, UpperRight.y, DownRight.x, DownRight.y);
      this.Edges[2].SetParameters(DownLeft.x, DownLeft.y, DownRight.x, DownRight.y);
      this.Edges[3].SetParameters(DownLeft.x, DownLeft.y, UpperLeft.x, UpperLeft.y);
    }

    for (let i = 0; i < this.Edges.length; ++i){
      for (let j = 0; j < Track.length; ++j){
        if (this.Edges[i].Cast(Track[j])) this.HasCrashed = true;
      }
    }

    for (let i = 0; i < this.Edges.length; ++i){
      for (let j = 0; j < RewardGates.length; ++j){
        if (this.Edges[i].Cast(RewardGates[j])){
          if (this.LastGate != -1){
            if (this.LastGate != RewardGates.length - 1 && j == this.LastGate + 1 || this.LastGate == RewardGates.length - 1 && j == 0){
              this.LastGate = j;
              this.Score++;
            }
          }
          else this.LastGate = j;
        }
      }
    }

    this.Inputs = [];
    this.NearestPoints = [];
    for (let i = 0; i < this.Rays.length; ++i){
      let NearestPoint = null;
      let NearestDist = 1000;
      for (let j = 0; j < Track.length; ++j){
        let Point = this.Rays[i].Cast(Track[j]);
        if (Point){
          if (dist(Point.x, Point.y, this.PosX, this.PosY) < NearestDist){
            NearestDist = dist(Point.x, Point.y, this.PosX, this.PosY);
            NearestPoint = Point;
          }
        }
      }
      this.NearestPoints.push(NearestPoint);

      this.Inputs.push(NearestDist / 1000);
    }
  }

  Render(Camera){
    if (this.LastGate != -1 && this.Best) RewardGates[this.LastGate].Render("Green", Camera);
    for (let i = 0; i < this.Rays.length; ++i){
      if (this.Best) this.Rays[i].Render(this.NearestPoints[i], Camera);
    }
    push();
    if (this.HasCrashed) fill(color(255, 0, 0));
    else fill(this.Color);
    rectMode(CENTER);
    angleMode(DEGREES);
    translate(this.PosX - Camera.PosX, this.PosY - Camera.PosY);
    rotate(this.Angle + this.DriftAngle);
    rect(0, 0, this.CarWidth, this.CarHeight, 15);
    pop();
  }
}
