const canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

const height = 500;
const width = 500;
const sizeX = 5;
const sizeY = 5;

for (let i = 0; i < sizeX + 1; i++) {
  const x = ((i + 0.5) / (sizeX + 1)) * width;
  for (let j = 0; j < sizeY + 1; j++) {
    const y = ((j + 0.5) / (sizeY + 1)) * height;
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
  }
}
