import $ from 'jquery';

const seaLevel = -216,
ATEMPTS_ALLOWED = 2;

let ATTEMPTS_DONE = 1,
needleVal,
ansObj = {'gauge' : needleVal};

let containersRy = document.querySelector(".container"),
svg = document.querySelector(".typeRange"),
output = document.querySelector(".output"),
outline = document.querySelector(".outline"),
fill = document.querySelector(".fill"),
center = document.querySelector(".center"),
needle = document.querySelector(".needle");

let initialValue = document.querySelector(".initialValue");

let rad = Math.PI / 180,
NS = "http:\/\/www.w3.org/2000/svg";

let W = parseInt(window.getComputedStyle(svg, null).getPropertyValue("width")),
L = parseInt(window.getComputedStyle(svg, null).getPropertyValue("height")),
offset = 64,
cx = ~~(W / 2),
cy = ~~(L / 2);

let r1 = cx - offset,
delta = ~~(r1 / 10);

let initVal = initialValue.value;

let isDragging = false;

let x1 = cx + r1,
y1 = cy + r1,
r2 = r1 - delta;

let x2 = offset,
y2 = cy,
x3 = x1 - delta,
y3 = cy;

// console.log('**************************************');
// console.log(delta);
// console.log(r1);
// console.log(r2);
// console.log(W);
// console.log(cx);
// console.log('**************************************');

function drawScale() {
let sr1 = r1 + 5,
    sr2 = r2 - 5,
    srT = r1 + 50;
let scale = document.querySelector(".scale");

clearRect(scale);

let n = 0;
for (let sa = -360; sa <= 0; sa += 80) {
    let sx1 = cx + sr1 * Math.cos(sa * rad),
        sy1 = cy + sr1 * Math.sin(sa * rad),
        sx2 = cx + sr2 * Math.cos(sa * rad),
        sy2 = cy + sr2 * Math.sin(sa * rad),
        sxT = cx + srT * Math.cos(sa * rad),
        syT = cy + srT * Math.sin(sa * rad);

    let scaleLine = document.createElementNS(NS, "line");
    let scaleLineObj = {
        class: "scale",
        x1: sx1,
        y1: sy1,
        x2: sx2,
        y2: sy2
    };
    setSVGAttributes(scaleLine, scaleLineObj);

    scale.appendChild(scaleLine);

    let scaleText = document.createElementNS(NS, "text");
    let scaleTextObj = {
        class: "scale",
        x: sxT,
        y: syT
    };
    setSVGAttributes(scaleText, scaleTextObj);
    scaleText.textContent = n * 10;
    scale.appendChild(scaleText);

    n++
}
}

function drawInput(cx, cy, r1, offset, delta, a) {
let d1 = getD1(cx, cy, r1, offset, delta),
    d2 = getD2(cx, cy, r1, offset, delta, a);

drawScale();

outline.setAttributeNS(null, "d", d1);
fill.setAttributeNS(null, "d", d2);

drawNeedle(cx, cy, r1, a);
}

function updateInput(p, cx, cy, r1, offset, delta) {
let x = p.x,
    y = p.y,
    lx = cx - x,
    ly = cy - y;

let a = Math.atan2(ly, lx) / rad - 180;

// console.log('updateInput FUNCTION BEGINS');
// console.log('***************************');
// console.log('let rad: ' + rad);
// console.log('let x: ' + x);
// console.log('let y: ' + y);
// console.log('let lx: ' + lx);
// console.log('let ly: ' + ly);
// console.log('let a: ' + a);
// console.log('***************************');

drawInput(cx, cy, r1, offset, delta, a);
// output.innerHTML = Math.round((a));
initialValue.value = Math.round((a));
ansObj.needleVal = initialValue.value;
}

function getD1(cx, cy, r1, offset, delta) {
let x1 = cx + r1,
    y1 = cy,
    x2 = offset,
    y2 = cy,
    r2 = r1 - delta,
    x3 = x1 - delta,
    y3 = cy;

// console.log('getD1 FUNCTION BEGIN');
// console.log('*************************************');
// console.log('let D1 cx: ' + cx);
// console.log('let D1 cy: ' + cy);
// console.log('-------------------------------------');
// console.log('let D1 r1: ' + r1);
// console.log('let D1 r2: ' + r2);
// console.log('-------------------------------------');
// console.log('let D1 x1: ' + x1);
// console.log('let D1 y1: ' + y1);
// console.log('-------------------------------------');
// console.log('let D1 x2: ' + x2);
// console.log('let D1 y2: ' + y2);
// console.log('-------------------------------------');
// console.log('let D1 x3: ' + x3);
// console.log('let D1 y3: ' + y3);
// console.log('*************************************');

let d1 = "M " + x1 + ", " + y1 + " A" + r1 + "," + r1 + " 0 0 0 " + x2 + "," + y2 + " H" + (offset + delta) + " A" + r2 + "," + r2 + " 0 0 1 " + x3 + "," + y3 + " z";
return d1;
}

function getD2(cx, cy, r1, offset, delta, a) {	
a *= rad; //PI
let r2 = r1 - delta,
    x4 = cx + r1 * Math.cos(a),
    y4 = cy + r1 * Math.sin(a),
    x5 = cx + r2 * Math.cos(a),
    y5 = cy + r2 * Math.sin(a);

// 	console.log('getD2 FUNCTION BEGIN');
// 	console.log('*************************************');
// 	console.log('let a: ' + a);
// 	console.log('let cx: ' + cx);
// 	console.log('let cy: ' + cy);
// 	console.log('let r1: ' + r1);
// 	console.log('let r2: ' + r2);
// 	console.log('let x4: ' + x4);
// 	console.log('let y4: ' + y4);
// 	console.log('let x5: ' + x5);
// 	console.log('let y5: ' + y5);
// 	console.log('*************************************');

let d2 = "M " + x4 + ", " + y4 + " A" + r1 + "," + r1 + " 0 0 0 " + x2 + "," + y2 + " H" + (offset + delta) + " A" + r2 + "," + r2 + " 0 0 1 " + x5 + "," + y5 + " z";
return d2;
}

function drawNeedle(cx, cy, r1, a) {
let nx1 = cx + 5 * Math.cos((a - 90) * rad),
    ny1 = cy + 5 * Math.sin((a - 90) * rad);

let nx2 = cx + (r1 + 15) * Math.cos(a * rad),
    ny2 = cy + (r1 + 15) * Math.sin(a * rad);

let nx3 = cx + 5 * Math.cos((a + 90) * rad),
    ny3 = cy + 5 * Math.sin((a + 90) * rad);

let points = nx1 + "," + ny1 + " " + nx2 + "," + ny2 + " " + nx3 + "," + ny3;

    // console.log('drawNeedle FUNCTION BEGIN');
    // console.log('*************************************');
    // console.log('let r1: ' + r1);
    // console.log('let cx: ' + cx);
    // console.log('let cy: ' + cy);
    // console.log('let a: ' + a);
    // console.log('let rad: ' + rad);
    // console.log('cx + (r1 + 15): ' + cx + (r1 + 15));
    // console.log('Math.cos(a * (rad)): ' + Math.cos(a * rad));

    // console.log('-------------------------------------');

    // console.log('let nx1: ' + nx1);
    // console.log('let ny1: ' + ny1);
    // console.log('let nx2: ' + nx2);
    // console.log('let ny2: ' + ny2);
    // console.log('let nx3: ' + nx3);
    // console.log('let ny3: ' + ny3);
    // console.log('let points: ' + points);
    // console.log('*************************************');

needle.setAttributeNS(null, "points", points);
}

function oMousePos(elmt, evt) {
let ClientRect = elmt.getBoundingClientRect();

// console.log('oMousePos FUNCTION BEGINS: ')
// console.log('***************************');
// console.log('ClientRect: ');
// console.log(ClientRect);
// console.log('evt.clientX: ' + evt.clientX);
// console.log('evt.clientY: ' + evt.clientY);
// console.log('x: ' + Math.round(evt.clientX - ClientRect.left));
// console.log('y: ' + Math.min(Math.round(evt.clientY - ClientRect.top), cy));
// console.log('***************************');

return {
    // x: Math.round(evt.clientX - ClientRect.left),
    // y: Math.min(Math.round(evt.clientY - ClientRect.top), cy) // <----- USED FOR LIMITING NEEDLE MOVEMENT (HALF-CIRCLE CURRENTLY)
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
}
}

function clearRect(node) {
while (node.firstChild) {
    node.removeChild(node.firstChild);
}
}

function setSVGAttributes(elmt, oAtt) {
for (let prop in oAtt) {
    elmt.setAttributeNS(null, prop, oAtt[prop]);
}
}

/********************************************
*****  CHECK ANSWER (RANGE IN MAX-MIN)  *****
********************************************/
function value_limit(val, min, max) {
return val < min ? false : (val > max ? false : true);
}

// -----------------------------------------
// check(ev)
// -----------------------------------------
function check(ev) {
$("#noResponce").hide();  // Set display to none in case it's showing.
checkAnswer();
}

// -----------------------------------------
//  checkAnswer
// -----------------------------------------
function checkAnswer(){
let passed = value_limit(ansObj.needleVal, seaLevel-10, seaLevel+10);

// Passed Test
if(passed) {
   // Show congradulations that all are correct. Press next to move to the next module.
    let p = document.getElementById("passed").style.display = 'block'; 
    $("#checkButton, #resetButton").fadeTo(800, 0, function(){
        $("#checkButton").css("visibility", "hidden");   
    });

    return passed;
} else {

    console.log('IT FAILED');
    if( ATTEMPTS_DONE < ATEMPTS_ALLOWED){
        ATTEMPTS_DONE++;
        $("#incorrectResponce").show().delay(2000).fadeOut(1000);
    } else {
        // Show message max attempts have been done and to study and more try next time.
        document.getElementById("incorrectResponce").style.display='none'; // hide
        document.getElementById("maxResponces").style.display='block'; // hide
        document.getElementById("noResponce").style.display='none';              // hide in case it's showing
        // enghost buttons
        $("#checkButton, #resetButton").fadeTo(800, 0, function(){
            $("#checkButton").css("visibility", "hidden");   
        });
    }

    return passed;
}
}

/*******************
*****  EVENTS  *****
*******************/
// CHECK BUTTON EVENT LISTENER
let checkButton = document.getElementById("checkButton");
checkButton.addEventListener('click', check, false);

// DRAW SVG NEEDLE AND VALUE ON LOAD
window.addEventListener("load", function() {
let pa = (initVal * 0);
let p = {}
p.x = cx + r1 * Math.cos(pa * rad);
p.y = cy + r1 * Math.sin(pa * rad);
updateInput(p, cx, cy, r1, offset, delta)
}, false);

// GET NEEDLE VALUE (DEGREE ANGLE) AND DISPLAY ON 'INPUT'
initialValue.addEventListener("input", function() {
let val = this.value;
let newVal = (!isNaN(val) && val >= 0 && val <= 30) ? val : 0;
let pa = (newVal * 1.8) - 180;
let p = {}
p.x = cx + r1 * Math.cos(pa * rad);
p.y = cy + r1 * Math.sin(pa * rad);
updateInput(p, cx, cy, r1, offset, delta)
}, false);

/**********************************
***** EVENTS LISTENING ON SVG *****
**********************************/
// ON MOUSEDOWN EVENT: ADD 'FOCUSABLE' CLASS & TRIGGER oMousePos AND updateInput FUNCTION
// DRAGGING FLAG IS NOW - TRUE
svg.addEventListener("mousedown", function(evt) {
isDragging = true;
this.classList.add("focusable");
let mousePos = oMousePos(svg, evt);
updateInput(mousePos, cx, cy, r1, offset, delta);
}, false);

// ON MOUSEUP EVENT: REMOVE 'FOCUSABLE' CLASS
// DRAGGING FLAG IS NOW - FALSE
svg.addEventListener("mouseup", function(evt) {
isDragging = false;
this.classList.remove("focusable");
}, false);

// ON MOUSEOUT EVENT: SET DRAGGING FLAG AND REMOVE 'FOCUSABLE' CLASS
// DRAGGING FLAG IS NOW - FALSE
svg.addEventListener("mouseout", function(evt) {
isDragging = false;
this.classList.remove("focusable");
}, false);

// ON MOUSEMOVE EVENT: CHECK IF DRAGGING FLAG IS TRUE/FALSE (IF TRUE TIGGER oMousePos, updateInput FUNCTION)
// DRAGGING FLAG IS DEPENDENT ON 'MOUSEDOWN' EVENT
// DRAGGING FLAG IS DEFAULT FALSE IF NO MOUSEDOWN
svg.addEventListener("mousemove", function(evt) {
if (isDragging) {
    let mousePos = oMousePos(svg, evt);
    updateInput(mousePos, cx, cy, r1, offset, delta);
    
    console.log('MOUSEMOVE EVENT TO CHECK ON NEEDLE VALUE');
    console.log(ansObj.needleVal);
    console.log(value_limit(ansObj.needleVal, seaLevel-10, seaLevel+10));
}
}, false);