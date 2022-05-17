const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(3),1000,30,50);
car.draw(ctx);

animate();

function animate(){
  car.update();
  canvas.height = window.innerHeight;
  road.draw(ctx);
  car.draw(ctx);
  requestAnimationFrame(animate);
}
//@dev requestAnimationFrame will call the animate function over and over to simulate movement
