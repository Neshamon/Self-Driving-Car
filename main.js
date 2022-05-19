const carCanvas = document.getElementById("carCanvas");
const networkCanvas = document.getElementById("networkCanvas");
carCanvas.width = 200;
networkCanvas.width = 300;


const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
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

  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carCtx.save();
  carCtx.translate(0, - car.y + carCanvas.height * 0.7); //@dev Locks the view above the car

  road.draw(carCtx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, "red");
  } //@dev Draws the other cars
  car.draw(carCtx, "teal");

  carCtx.restore();

  Visualizer.drawNetwork(networkCtx, this.brain);
  requestAnimationFrame(animate);
}
//@dev requestAnimationFrame will call the animate function over and over to simulate movement
