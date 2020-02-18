class Ray{
  constructor(){
    this.Position = undefined;
    this.Direction = undefined;

    this.Intersects = false;
    this.IntersectionPoint = undefined;
  }

  SetParameters(Pos, Angle){
    this.Position = Pos;
    this.Direction = p5.Vector.fromAngle(Angle);
  }

  LookAt(x, y){
    this.Direction.x = x - this.Position.x;
    this.Direction.y = y - this.Position.y;
  }

  Cast(Wall){
    const x1 = Wall.Start.x;
    const y1 = Wall.Start.y;
    const x2 = Wall.End.x;
    const y2 = Wall.End.y;

    const x3 = this.Position.x;
    const y3 = this.Position.y;
    const x4 = this.Position.x + this.Direction.x;
    const y4 = this.Position.y + this.Direction.y;

    const D = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (D == 0) return;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / D;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / D;

    if (t > 0 && t < 1 && u > 0){
      const Point = createVector();
      Point.x = x1 + t * (x2 - x1);
      Point.y = y1 + t * (y2 - y1);
      return Point;
    }
  }

  Render(IntersectionPoint, Camera){
    push();
    stroke(255);
    strokeWeight(1);
    if (IntersectionPoint){
       line(this.Position.x - Camera.PosX, this.Position.y - Camera.PosY, IntersectionPoint.x - Camera.PosX, IntersectionPoint.y - Camera.PosY);
       fill(255);
       circle(IntersectionPoint.x - Camera.PosX, IntersectionPoint.y - Camera.PosY, 12);
    }
    pop();
  }
}
