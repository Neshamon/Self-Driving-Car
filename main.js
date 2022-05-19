const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI");
const traffic = [
  new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 3)
]

animate();

function animate(){
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  } //@dev Tells all the traffic to be aware of road borders

  car.update(road.borders, traffic);

  canvas.height = window.innerHeight;

  ctx.save();
  ctx.translate(0, - car.y + canvas.height * 0.7); //@dev Locks the view above the car

  road.draw(ctx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx, "red");
  } //@dev Draws the other cars
  car.draw(ctx, "teal");

  ctx.restore();
  requestAnimationFrame(animate);
}
//@dev requestAnimationFrame will call the animate function over and over to simulate movement
