const canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

const height = 500;
const width = 500;
const sizeX = 5;
const sizeY = 5;

const pointSize = 15;

let gridPoint = [];

// 点の位置を計算する
for (let i = 0; i < sizeX + 1; i++) {
  const x = ((i + 0.5) / (sizeX + 1)) * width;
  let row = [];
  for (let j = 0; j < sizeY + 1; j++) {
    const y = ((j + 0.5) / (sizeY + 1)) * height;
    row.push({ x, y });
  }
  gridPoint.push(row);
}

// 点を打つ

function draw() {
  ctx.clearRect(0, 0, width, height);
  for (let x = 0; x < gridPoint.length; x++) {
    for (let y = 0; y < gridPoint[x].length; y++) {
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(gridPoint[x][y].x, gridPoint[x][y].y, pointSize, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}
draw();

let draggingItem = null;

// クリックされたときの処理
canvas.addEventListener("mousedown", click);
function click(event) {
  // 座標取得
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / canvas.clientWidth) * width;
  const y = ((event.clientY - rect.top) / canvas.clientHeight) * height;

  gridPoint.forEach((row, i) =>
    row.forEach((point, j) => {
      if ((point.x - x) ** 2 + (point.y - y) ** 2 < pointSize ** 2) {
        draggingItem = { i: i, j: j };

        document.getElementById("disp").innerHTML = `i: ${i}, j: ${j}`;
      }
    })
  );
}

canvas.addEventListener("mousemove", move);
function move(event) {
  if (!draggingItem) return;

  // 座標取得
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / canvas.clientWidth) * width;
  const y = ((event.clientY - rect.top) / canvas.clientHeight) * height;

  draw();
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  const startPoint = gridPoint[draggingItem.i][draggingItem.j];
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(x, y);
  ctx.stroke();
}

canvas.addEventListener("mouseup", up);
function up(event) {
  draggingItem = null;
  draw();
}
