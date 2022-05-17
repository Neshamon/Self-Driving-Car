class Road{
  constructor(x, width, laneCount = 3){
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width / 2;
    this.right = x + width / 2;

    const infinity = 10000000
    this.top = -infinity;
    this.bottom = infinity;

    const topLeft = {x: this.left, y: this.top}
    const topRight = {x: this.right, y: this.top}
    const bottomLeft = {x: this.left, y: this.bottom}
    const bottomRight = {x: this.right, y: this.bottom}
    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight]
    ]
  }

  getLaneCenter(laneIndex){
    const laneWidth = this.width / this.laneCount;
    return this.left + laneWidth / 2 + Math.min(laneIndex, this.laneCount - 1) * laneWidth; //@dev Math.min adjustment allows the car to stay on the road if there are too few lanes
  } //@dev This function allows us to find the offset of a given lane index from the middle of the first lane

  draw(ctx){
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    for(let i = 0; i <= this.laneCount; i++){
      const x = lerp(
        this.left,
        this.right,
        i / this.laneCount
      )
      if(i > 0 && i < this.laneCount){
        ctx.setLineDash([20, 20]); //@dev This sets the line to have a line for 20px and then nothing for 20px to create dashes
      } else {
        ctx.setLineDash([]); //@dev This function prevents the shoulder of the road's lines from having dashes
      }
      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }
  }
}
