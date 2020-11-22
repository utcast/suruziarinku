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
for (let x = 0; x < gridPoint.length; x++) {
  for (let y = 0; y < gridPoint[x].length; y++) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(gridPoint[x][y].x, gridPoint[x][y].y, pointSize, 0, 2 * Math.PI);
    ctx.fill();
  }
}

// クリックされたときの処理
canvas.addEventListener("click", click);
function click(event) {
  // 座標取得
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / canvas.clientWidth) * width;
  const y = ((event.clientY - rect.top) / canvas.clientHeight) * height;

  gridPoint.forEach((row, i) =>
    row.forEach((point, j) => {
      if ((point.x - x) ** 2 + (point.y - y) ** 2 < pointSize ** 2) {
        document.getElementById("disp").innerHTML = `i: ${i}, j: ${j}`;
      }
    })
  );
}
