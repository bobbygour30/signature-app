const canvas = document.getElementById("signatureCanvas");
const ctx = canvas.getContext("2d");
const penColorInput = document.getElementById("penColor");
const penThicknessInput = document.getElementById("penThickness");
const bgColorInput = document.getElementById("bgColor");
const clearButton = document.getElementById("clearCanvas");
const downloadButton = document.getElementById("download");

canvas.width = 600;
canvas.height = 300;

let drawing = false;
let penColor = penColorInput.value;
let penThickness = penThicknessInput.value;
let bgColor = bgColorInput.value;

function startDrawing(e) {
  drawing = true;
  draw(e);
}

function stopDrawing() {
  drawing = false;
  ctx.beginPath();
}

function draw(e) {
  if (!drawing) return;

  ctx.lineWidth = penThickness;
  ctx.lineCap = "round";
  ctx.strokeStyle = penColor;

  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function setPenColor() {
  penColor = penColorInput.value;
}

function setPenThickness() {
  penThickness = penThicknessInput.value;
}

function setBackgroundColor() {
  bgColor = bgColorInput.value;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setBackgroundColor();
}

function downloadSignature() {
  const link = document.createElement("a");
  link.download = "signature.png";
  link.href = canvas.toDataURL();
  link.click();
}

penColorInput.addEventListener("input", setPenColor);
penThicknessInput.addEventListener("input", setPenThickness);
bgColorInput.addEventListener("input", setBackgroundColor);
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);
clearButton.addEventListener("click", clearCanvas);
downloadButton.addEventListener("click", downloadSignature);

// Initialize canvas background
setBackgroundColor();
