class Wall{
  constructor(){
    this.Start = createVector();
    this.End = createVector();
  }

  SetParameters(x1, y1, x2, y2){
    this.Start.x = x1;
    this.Start.y = y1;
    this.End.x = x2;
    this.End.y = y2;
  }

  Cast(Wall){
    const x1 = Wall.Start.x;
    const y1 = Wall.Start.y;
    const x2 = Wall.End.x;
    const y2 = Wall.End.y;

    const x3 = this.Start.x;
    const y3 = this.Start.y;
    const x4 = this.End.x;
    const y4 = this.End.y;

    const D = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (D == 0) return false;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / D;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / D;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) return true;
    else return false;
  }

  Render(Color, Camera){
    push();
    if (Color == "Green"){
      stroke(0, 255, 0);
      strokeWeight(5);
    }
    else{
      stroke(255);
      strokeWeight(2);
    }
    line(this.Start.x - Camera.PosX, this.Start.y - Camera.PosY, this.End.x - Camera.PosX, this.End.y - Camera.PosY);
    pop();
  }
}
