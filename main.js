const carCanvas = document.getElementById("carCanvas");
const networkCanvas = document.getElementById("networkCanvas");
carCanvas.width = 200;
networkCanvas.width = 300;


const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

const N = 100
const cars = generateCars(N);
let bestCar = cars[0];

if(localStorage.getItem("bestBrain")){
  bestCar.brain = JSON.parse(
    localStorage.getItem("bestBrain")
  );
}

const traffic = [
  new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 3),
  new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 3)
  new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 3)
];

animate();

function save() {
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard() {
  localStorage.removeItem("bestBrain");
}

function generateCars(N){
  const cars = [];
  for (let i = 1; i <= N; i++) {
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"))
    }
  return cars;
} //@dev This function generates N amount of AI cars

function animate(time){
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  } //@dev Tells all the traffic to be aware of road borders

  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }
  const bestCar = cars.find(
    c => c.y == Math.min(
      ...cars.map(c => c.y)
    )
  ); //@dev bestCar will find the car with the minimum y value, AKA the car furthest up ahead

  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carCtx.save();
  carCtx.translate(0, - bestCar.y + carCanvas.height * 0.7); //@dev Locks the view above the car

  road.draw(carCtx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, "red");
  } //@dev Draws the other cars

  carCtx.globalAlpha = 0.2;
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx, "teal");
  }

  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, "teal", true);

  carCtx.restore();

  networkCtx.lineDashOffset = -time / 50;
  Visualizer.drawNetwork(networkCtx, bestCar.brain);
  requestAnimationFrame(animate);
}
//@dev requestAnimationFrame will call the animate function over and over to simulate movement
