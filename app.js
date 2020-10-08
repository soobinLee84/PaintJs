const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIOAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIOAL_COLOR;
ctx.fillStyle = INITIOAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

/**
 * 마우스 포인터 좌표
 * 1. x, y
 *  - 문서의 좌측 상단을 기준점으로함
 *  - 비표준
 * 2. clientX, clientY
 * - 문서 좌측 상단을 기준점으로 함 (absolute)
 * - 표준
 * - 많이 사용
 * 3.screenX, screenY
 * - 모니터 화면의 좌측 상단을 기준점으로 함
 * - 잘 안씀
 * 4.offsetX, offsetY
 * - 이벤트 발생한 객체(태그)의 좌측상단을 기준점 (relative)
 * - 많이 사용
 */

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

/**
 * event 객체
 * - 이벤트에 의해서 호출되는 함수에서 사용하는 예약어
 * - 발생한 사건의 여러가지 정보를 제공 객체 
 */
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}


function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling == true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";

    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    //우클릭 방지
    event.preventDefault();

}
function handleSaveClick() {
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨✨]";
    link.click();

}

/**
 * 마우스 사용할 때 발생하는 이벤트
 * 1.onmouseover : 해당 객체의 영역 위에 커서가 진입하는 순간 발생
 * 2.onmouseout : 해당 영역에서 커서가 빠져나가는 순간 발생
 * 3.onmousedown : 해당 객체의 영역에서 마우스 버튼이 눌러지는 순간 발생
 * 4.onmouseup : 해당 객체의 영역에서 마우스 버튼이 떼는 순간 발생
 * 5.onmousemove : 해당 객체의 영역에서 커서가 움직이는 순간 발생
 */

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);


}

//array.from 메소드는 object 로부터 array를 만든다
// console.log(Array.from(colors));
// let colornumber = Array.from(colors);
// console.log(colornumber[2]);

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}