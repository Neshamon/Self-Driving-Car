class Car{
  constructor(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 4;
    this.friction = 0.05;
    this.angle= 0;

    this.sensor = new Sensor(this);
    this.controls = new Controls();
  }
  //@dev param1 & 2 define where we want the car to be
  //@dev param3 & 4 define how big we want the car to be

  update(roadBorders){
    this.#move();
    this.sensor.update(roadBorders);
  }

  #move(){
    if(this.controls.forward){
      this.speed += this.acceleration;
    }

    if(this.controls.backward){
      this.speed -= this.acceleration;
    }

    if(this.speed > this.maxSpeed){
      this.speed = this.maxSpeed;
    }

    if(this.speed < -this.maxSpeed / 2){
      this.speed = -this.maxSpeed / 2;
    }

    if(this.speed > 0){
      this.speed -= this.friction;
    }

    if(this.speed < 0){
      this.speed += this.friction;
    }

    if(Math.abs(this.speed) < this.friction){
      this.speed = 0;
    }

    if(this.speed != 0){
      const flip = this.speed > 0? 1 : -1;

      if(this.controls.left){
        this.angle += 0.03 * flip;
      }

      if(this.controls.right){
        this.angle -= 0.03 * flip;
      }
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx){
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    ctx.beginPath();
    ctx.rect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    ); //@dev param1 defines the x center of the car by placing it within the middle of the width
      //@dev param2 defines the y center of the car by placing it within the middle of the height
      //@dev param3 & 4 defines the overall width and height of the car repsectively
    ctx.fill();

    ctx.restore();

    this.sensor.draw(ctx);
  }
}
