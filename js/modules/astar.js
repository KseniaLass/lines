'use strict';
class AStar {
  constructor(params) {
    this.pathStart = params.pathStart;
    this.pathEnd = params.pathEnd;
    this.world = params.world;

    // local
    this.abs = Math.abs;
    this.max = Math.max;
    this.pow = Math.pow;
    this.sqrt = Math.sqrt;

    this.maxWalkableTileNum = 0;
    this.worldWidth = this.world[0].length;
    this.worldHeight = this.world.length;
    this.worldSize = this.worldWidth * this.worldHeight;

    this.distanceFunction = this.ManhattanDistance;
    this.findNeighbours = function(){};

    return this.calculatePath();
  }

  ManhattanDistance(Point, Goal) {
    return this.abs(Point.x - Goal.x) + this.abs(Point.y - Goal.y);
  }

  Neighbours(x, y) {
    let N = y - 1,
      S = y + 1,
      E = x + 1,
      W = x - 1,
      myN = N > -1 && this.canWalkHere(x, N),
      myS = S < this.worldHeight && this.canWalkHere(x, S),
      myE = E < this.worldWidth && this.canWalkHere(E, y),
      myW = W > -1 && this.canWalkHere(W, y),
      result = [];
    if(myN)
      result.push({x:x, y:N});
    if(myE)
      result.push({x:E, y:y});
    if(myS)
      result.push({x:x, y:S});
    if(myW)
      result.push({x:W, y:y});
    this.findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
    return result;
  }

  canWalkHere(x, y) {
      return ((this.world[x] !== null) &&
          (this.world[x][y] !== null) &&
          (this.world[x][y] <= this. maxWalkableTileNum));
  }

  Node(Parent, Point) {
      return  {
          Parent:Parent,
          value:Point.x + (Point.y * this.worldWidth),
          x:Point.x,
          y:Point.y,
          f:0,
          g:0
      };
  }

  calculatePath() {
      let mypathStart = Node(null, {x:this.pathStart[0], y:this.pathStart[1]});
      let mypathEnd = Node(null, {x:this.pathEnd[0], y:this.pathEnd[1]});
      let AStar = new Array(this.worldSize);
      let Open = [this.mypathStart];
      let Closed = [];
      let result = [];
      let myNeighbours;
      let myNode;
      let myPath;
      let length, max, min, i, j;
      while(length = Open.length)
      {
          max = this.worldSize;
          min = -1;
          for(i = 0; i < length; i++)
          {
              if(Open[i].f < max)
              {
                  max = Open[i].f;
                  min = i;
              }
          }
          myNode = Open.splice(min, 1)[0];
          if(myNode.value === mypathEnd.value)
          {
              myPath = Closed[Closed.push(myNode) - 1];
              do
              {
                  result.push([myPath.x, myPath.y]);
              }
              while (myPath = myPath.Parent);
              AStar = Closed = Open = [];
              result.reverse();
          }
          else
          {

              myNeighbours = this.Neighbours(myNode.x, myNode.y);

              for(i = 0, j = myNeighbours.length; i < j; i++)
              {
                  myPath = this.Node(myNode, myNeighbours[i]);
                  if (!AStar[myPath.value])
                  {

                      myPath.g = myNode.g + this.distanceFunction(myNeighbours[i], myNode);

                      myPath.f = myPath.g + this.distanceFunction(myNeighbours[i], mypathEnd);

                      Open.push(myPath);

                      AStar[myPath.value] = true;
                  }
              }

              Closed.push(myNode);
          }
      }
      return result;
  }
}

export default AStar