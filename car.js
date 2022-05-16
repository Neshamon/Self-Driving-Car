class Car{
  constructor(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx){
    ctx.beginPath();
    ctx.rect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    ) //@dev param1 defines the x center of the car by placing it within the middle of the width
      //@dev param2 defines the y center of the car by placing it within the middle of the height
      //@dev param3 & 4 defines the overall width and height of the car repsectively
    ctx.fill();
  }
}
