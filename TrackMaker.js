class TrackMaker{
  constructor(){
    this.Skeleton = new Array();
    this.OutsideEdge = new Array();
    this.InsideEdge = new Array();
    this.OutsideWall = new Array();
    this.InsideWall = new Array();

    this.Track = new Array();
    this.RewardGates = new Array();
  }

  InitializeSkeleton(){
    this.Skeleton = [];
    for (let i = 0; i < 86; ++i){
      let Point;
      if (i == 0) Point = createVector(230, 146);
      if (i == 1) Point = createVector(459, 142);
      if (i == 2) Point = createVector(659, 137);
      if (i == 3) Point = createVector(856, 132);
      if (i == 4) Point = createVector(1097, 128);
      if (i == 5) Point = createVector(1352, 130);
      if (i == 6) Point = createVector(1580, 136);
      if (i == 7) Point = createVector(1817, 131);
      if (i == 8) Point = createVector(1947, 156);
      if (i == 9) Point = createVector(2037, 224);
      if (i == 10) Point = createVector(2086, 316);
      if (i == 11) Point = createVector(2151, 452);
      if (i == 12) Point = createVector(2185, 599);
      if (i == 13) Point = createVector(2193, 734);
      if (i == 14) Point = createVector(2157, 879);
      if (i == 15) Point = createVector(2107, 969);
      if (i == 16) Point = createVector(2001, 1031);
      if (i == 17) Point = createVector(1863, 1029);
      if (i == 18) Point = createVector(1769, 975);
      if (i == 19) Point = createVector(1735, 883);
      if (i == 20) Point = createVector(1720, 791);
      if (i == 21) Point = createVector(1736, 720);
      if (i == 22) Point = createVector(1744, 621);
      if (i == 23) Point = createVector(1738, 516);
      if (i == 24) Point = createVector(1702, 413);
      if (i == 25) Point = createVector(1628, 348);
      if (i == 26) Point = createVector(1549, 317);
      if (i == 27) Point = createVector(1472, 316);
      if (i == 28) Point = createVector(1376, 374);
      if (i == 29) Point = createVector(1322, 467);
      if (i == 30) Point = createVector(1304, 534);
      if (i == 31) Point = createVector(1287, 631);
      if (i == 32) Point = createVector(1280, 738);
      if (i == 33) Point = createVector(1285, 846);
      if (i == 34) Point = createVector(1292, 918);
      if (i == 35) Point = createVector(1270, 987);
      if (i == 36) Point = createVector(1228, 1016);
      if (i == 37) Point = createVector(1179, 1045);
      if (i == 38) Point = createVector(1142, 1057);
      if (i == 39) Point = createVector(1097, 1055);
      if (i == 40) Point = createVector(1053, 1029);
      if (i == 41) Point = createVector(1004, 1001);
      if (i == 42) Point = createVector(947, 993);
      if (i == 43) Point = createVector(890, 995);
      if (i == 44) Point = createVector(831, 1009);
      if (i == 45) Point = createVector(782, 1031);
      if (i == 46) Point = createVector(736, 1047);
      if (i == 47) Point = createVector(681, 1057);
      if (i == 48) Point = createVector(617, 1059);
      if (i == 49) Point = createVector(529, 1052);
      if (i == 50) Point = createVector(413, 1050);
      if (i == 51) Point = createVector(303, 1041);
      if (i == 52) Point = createVector(216, 1025);
      if (i == 53) Point = createVector(161, 967);
      if (i == 54) Point = createVector(142, 901);
      if (i == 55) Point = createVector(188, 845);
      if (i == 56) Point = createVector(256, 823);
      if (i == 57) Point = createVector(299, 804);
      if (i == 58) Point = createVector(343, 794);
      if (i == 59) Point = createVector(386, 792);
      if (i == 60) Point = createVector(443, 789);
      if (i == 61) Point = createVector(514, 788);
      if (i == 62) Point = createVector(591, 788);
      if (i == 63) Point = createVector(688, 770);
      if (i == 64) Point = createVector(782, 765);
      if (i == 65) Point = createVector(851, 729);
      if (i == 66) Point = createVector(881, 679);
      if (i == 67) Point = createVector(877, 611);
      if (i == 68) Point = createVector(849, 567);
      if (i == 69) Point = createVector(818, 524);
      if (i == 70) Point = createVector(771, 508);
      if (i == 71) Point = createVector(713, 494);
      if (i == 72) Point = createVector(653, 490);
      if (i == 73) Point = createVector(573, 491);
      if (i == 74) Point = createVector(491, 490);
      if (i == 75) Point = createVector(430, 491);
      if (i == 76) Point = createVector(355, 490);
      if (i == 77) Point = createVector(301, 492);
      if (i == 78) Point = createVector(241, 500);
      if (i == 79) Point = createVector(190, 473);
      if (i == 80) Point = createVector(151, 436);
      if (i == 81) Point = createVector(124, 390);
      if (i == 82) Point = createVector(105, 331);
      if (i == 83) Point = createVector(101, 272);
      if (i == 84) Point = createVector(106, 197);
      if (i == 85) Point = createVector(139, 144);
      Point.x += 12;
      Point.y -= 32;
      this.Skeleton.push(Point);
    }
    this.DoubleGates();
    this.DoubleGates();
  }

  DoubleGates(){
    let Tmp = this.Skeleton;
    this.Skeleton = [];
    for (let i = 0; i < Tmp.length; ++i){
      let NextPoint;
      if (i == Tmp.length - 1) NextPoint = Tmp[0];
      else NextPoint = Tmp[i + 1];
      let BetweenPoint;
      let BetweenX = (Tmp[i].x + NextPoint.x) / 2;
      let BetweenY = (Tmp[i].y + NextPoint.y) / 2;
      BetweenPoint = createVector(BetweenX, BetweenY);
      this.Skeleton.push(Tmp[i]);
      this.Skeleton.push(BetweenPoint);
    }
  }

  InitializeEdges(){
    this.OutsideEdge = [];
    this.InsideEdge = [];
      for (let i = 0; i < this.Skeleton.length; ++i){
        let PreviousIndex = i - 1;
        let NextIndex = i + 1;
        if (i == 0) PreviousIndex = this.Skeleton.length - 1;
        if (i == this.Skeleton.length - 1) NextIndex = 0;

        const x1 = this.Skeleton[PreviousIndex].x;
        const y1 = -this.Skeleton[PreviousIndex].y;
        const x2 = this.Skeleton[NextIndex].x;
        const y2 = -this.Skeleton[NextIndex].y;

        const b1 = (x2 * y1 - x1 * y2) / (x2 - x1);
        const k1 = (y2 - b1) / x2;

        const k2 = -1 / k1;

        const ResX = 10;
        const ResY = k2 * 10;

        const R = dist(0, 0, ResX, ResY);

        angleMode(DEGREES);
        let Alpha = acos(10 / R);

        let TrackWidth;
        TrackWidth = map(i, 0, this.Skeleton.length, 75, 100);
        let XMove = TrackWidth * cos(Alpha);
        let YMove = TrackWidth * sin(Alpha);

        if (k2 < 0) XMove = -XMove;

        let OutPoint = createVector(this.Skeleton[i].x + XMove, this.Skeleton[i].y - YMove);
        let InPoint = createVector(this.Skeleton[i].x - XMove, this.Skeleton[i].y + YMove);

        if (i >= 52 && i <= 79 || i >= 89 && i <= 128 || i >= 136 && i <= 215 || i >= 265 && i <= 331){
          let tmp = OutPoint;
          OutPoint = InPoint;
          InPoint = tmp;
        }

        this.OutsideEdge.push(OutPoint);
        this.InsideEdge.push(InPoint);
      }
  }

  InitializeWalls(){
    this.OutsideWall = [];
    this.InsideWall = [];
    for (let i = 0; i < this.OutsideEdge.length; ++i){
      let NextIndex = i + 1;
      if (i == this.OutsideEdge.length - 1) NextIndex = 0;

      let wall = new Wall;
      wall.SetParameters(this.OutsideEdge[i].x, this.OutsideEdge[i].y, this.OutsideEdge[NextIndex].x, this.OutsideEdge[NextIndex].y);
      this.OutsideWall.push(wall);
    }

    for (let i = 0; i < this.InsideEdge.length; ++i){
      let NextIndex = i + 1;
      if (i == this.InsideEdge.length - 1) NextIndex = 0;

      let wall = new Wall;
      wall.SetParameters(this.InsideEdge[i].x, this.InsideEdge[i].y, this.InsideEdge[NextIndex].x, this.InsideEdge[NextIndex].y);
      this.InsideWall.push(wall);
    }
  }

  InitializeTrack(){
    this.Track = []
    for (let i = 0; i < this.OutsideWall.length; ++i) this.Track.push(this.OutsideWall[i]);
    for (let i = 0; i < this.InsideWall.length; ++i) this.Track.push(this.InsideWall[i]);
  }

  MakeTrack(){
    this.InitializeSkeleton();
    this.InitializeEdges();
    this.InitializeWalls();
    this.InitializeTrack();
    return this.Track;
  }

  InitializeGates(){
    this.RewardGates = [];
    for (let i = 0; i < this.Skeleton.length; ++i){
      let Gate = new Wall;
      Gate.SetParameters(this.OutsideEdge[i].x, this.OutsideEdge[i].y, this.InsideEdge[i].x, this.InsideEdge[i].y);
      this.RewardGates.push(Gate);
    }
  }

  MakeRewardGates(){
    this.InitializeSkeleton();
    this.InitializeEdges();
    this.InitializeGates();
    return this.RewardGates;
  }

  Render(){
    for (let i = 0; i < this.Skeleton.length; ++i){
      push();
      fill(100);
      circle(this.OutsideEdge[i].x, this.OutsideEdge[i].y, 10);
      circle(this.InsideEdge[i].x, this.InsideEdge[i].y, 10);
      fill(255);
      circle(this.Skeleton[i].x, this.Skeleton[i].y, 10);
      textSize(15);
      text(i, this.Skeleton[i].x + 5, this.Skeleton[i].y);
      stroke(255);
      line(this.Skeleton[i].x, this.Skeleton[i].y, this.OutsideEdge[i].x,  this.OutsideEdge[i].y);
      line(this.Skeleton[i].x, this.Skeleton[i].y, this.InsideEdge[i].x,  this.InsideEdge[i].y);
      pop();
    }
  }
}
