const canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

const height = 500;
const width = 500;
const sizeX = 5;
const sizeY = 5;

const pointSize = 15;
const pointClickSize = 50;

const probolem = [
  [null, null, 3, null, null],
  [3, 2, null, 2, 3],
  [null, null, 2, null, null],
  [3, 1, null, 3, null],
  [null, 2, 2, null, null],
];

let gridPoint = [];
let draggingItem = null;
let edge = [...Array(sizeX + 1)].map((_) =>
  [...Array(sizeY + 1)].map((_) => ({ right: false, down: false }))
);
let draggingEdge = null;

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

  // 点をかく
  for (let x = 0; x < gridPoint.length; x++) {
    for (let y = 0; y < gridPoint[x].length; y++) {
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(gridPoint[x][y].x, gridPoint[x][y].y, pointSize, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  // 線をかく
  edge.forEach((row, i) => {
    row.forEach((pt, j) => {
      if (pt.down) {
        const startPoint = gridPoint[i][j];
        const endPoint = gridPoint[i][j + 1];
        line(startPoint, endPoint);
      }
      if (pt.right) {
        const startPoint = gridPoint[i][j];
        const endPoint = gridPoint[i + 1][j];
        line(startPoint, endPoint);
      }
    });
  });

  if (draggingEdge) {
    line(draggingEdge[0], draggingEdge[1]);
  }

  // 文字を書く
  for (let i = 0; i < sizeX; i++) {
    const x = ((i + 1) / (sizeX + 1)) * width;
    let row = [];
    for (let j = 0; j < sizeY; j++) {
      const y = ((j + 1) / (sizeY + 1)) * height;
      if (probolem[i][j] !== null) {
        ctx.font = "30px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(probolem[i][j], x, y);
      }
    }
  }
}
draw();

// マウスを押したときの処理
canvas.addEventListener("mousedown", click);
function click(event) {
  // 座標取得
  const { x, y } = getXY(event, canvas);
  const ij = xy2ij({ x, y }, pointClickSize);
  if (ij) {
    draggingItem = { ...ij };
  }
}

// マウスを動かしたときの処理
canvas.addEventListener("mousemove", move);
function move(event) {
  if (!draggingItem) return;

  // もし点の上にいたら
  const { x, y } = getXY(event, canvas);
  ij = xy2ij({ x, y }, pointClickSize / 3);
  if (ij) {
    const { i, j } = ij;
    if (draggingItem.i !== i || draggingItem.j !== j) {
      if (addEdge(draggingItem, ij)) {
        draggingItem = ij;
      }
    }
  }

  const startPoint = gridPoint[draggingItem.i][draggingItem.j];
  draggingEdge = [startPoint, { x, y }];
  draw();
}

// マウスを離したときの処理
canvas.addEventListener("mouseup", up);
function up(event) {
  if (!draggingItem) return;
  draggingEdge = null;
  // 座標取得
  const { x, y } = getXY(event, canvas);

  const ij = xy2ij({ x, y }, pointClickSize);
  if (ij) {
    addEdge(draggingItem, ij);
  }

  draw();
  draggingItem = null;
}

function addEdge(from, to) {
  if (from.i === to.i) {
    // iが等しいとき
    if (from.j - to.j === 1 || from.j - to.j === -1) {
      edge[from.i][Math.min(from.j, to.j)].down = true;
      return true;
    }
  } else if (from.j === to.j) {
    // jが等しいとき
    if (from.i - to.i === 1 || from.i - to.i === -1) {
      edge[Math.min(from.i, to.i)][from.j].right = true;
      return true;
    }
  }
  return false;
}

function line(from, to) {
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}

function getXY(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / canvas.clientWidth) * width;
  const y = ((event.clientY - rect.top) / canvas.clientHeight) * height;
  return { x, y };
}

function xy2ij(point, size) {
  let ij = null;
  gridPoint.forEach((row, i) =>
    row.forEach(({ x, y }, j) => {
      if ((point.x - x) ** 2 + (point.y - y) ** 2 < size ** 2) {
        ij = { i, j };
      }
    })
  );
  return ij;
}

document.getElementById("judgeButton").addEventListener("click", judge);
function judge() {
  window.alert("正解！");
}
