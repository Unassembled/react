import React, { Component } from 'react';
import $ from 'jquery';

class Gauge extends Component {
    componentWillUnmount() {
        console.log('****UNMOUNTED!!!****');
	}
    componentDidMount(){
        // let appContainer = document.getElementById('app-container');
        //     appContainer.style.display='none';
        let annotation = document.querySelector('.annotation');
            annotation.style.display='none';
        let title = document.querySelector('h1');
            title.textContent = 'VACUUM GAUGE';
        
        // document.body.style.backgroundImage = 'none';

		/****************************************
        *****  START MY HACKY GAUGE SCRIPT  *****
        ****************************************/
		const seaLevel = -216,
			ATEMPTS_ALLOWED = 2;

		let ATTEMPTS_DONE = 1,
			needleVal,
			ansObj = {'gauge' : needleVal};

		let svg = document.querySelector(".typeRange"),
			outline = document.querySelector(".outline"),
			fill = document.querySelector(".fill"),
			needle = document.querySelector(".needle");

		let initialValue = document.querySelector(".initialValue");

		let rad = Math.PI / 180,
			NS = "http://www.w3.org/2000/svg";

		let W = parseInt(window.getComputedStyle(svg, null).getPropertyValue("width")),
			L = parseInt(window.getComputedStyle(svg, null).getPropertyValue("height")),
			offset = 64,
			cx = ~~(W / 2),
			cy = ~~(L / 2);

		let r1 = cx - offset,
			delta = ~~(r1 / 10);

		// let initVal = initialValue.value;
		let initVal = initialValue.value;

		let isDragging = false;

		let x1 = cx + r1,
		    y1 = cy + r1,
			r2 = r1 - delta;

		let x2 = offset,
		    y2 = cy,
			x3 = x1 - delta,
		    y3 = cy;

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

		    drawInput(cx, cy, r1, offset, delta, a);
		    // output.innerHTML = Math.round((a));
		    initialValue.value = Math.round((a));
            ansObj.needleVal = initialValue.value;
            sessionStorage.needleVal = ansObj.needleVal
		}

		function getD1(cx, cy, r1, offset, delta) {
		    let x1 = cx + r1,
				y1 = cy,
				x2 = offset,
				y2 = cy,
				r2 = r1 - delta,
				x3 = x1 - delta,
				y3 = cy;

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

			needle.setAttributeNS(null, "points", points);
		}

		function oMousePos(elmt, evt) {
			console.log(evt);
			console.log(elmt);

		    let ClientRect = elmt.getBoundingClientRect();

			if (evt.clientX){
				return ({
					// x: Math.round(evt.clientX - ClientRect.left),
					// y: Math.min(Math.round(evt.clientY - ClientRect.top), cy) // <----- USED FOR LIMITING NEEDLE MOVEMENT (HALF-CIRCLE CURRENTLY)
					x: Math.round(evt.clientX - ClientRect.left),
					y: Math.round(evt.clientY - ClientRect.top)
				});
			} else if (evt.changedTouches[0]) {
				return ({
					x: Math.round(evt.changedTouches[0].clientX - ClientRect.left),
					y: Math.round(evt.changedTouches[0].clientY - ClientRect.top)
				});
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
            let passed = ansObj.needleVal !== undefined ?
                value_limit(ansObj.needleVal, seaLevel-10, seaLevel+10) : value_limit(1000, seaLevel-10, seaLevel+10);

		    // Passed Test
		    if(passed) {
		       // Show congradulations that all are correct. Press next to move to the next module.
		        let p = document.getElementById("passed").style.display = 'block'; 
		        $("#checkButton, #resetButton").fadeTo(1000, 0, function(){
		            // $("#checkButton").css("visibility", "hidden");   
		            $(".btn-group").css("display", "none");   
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
	                $("#checkButton, #resetButton").fadeTo(1000, 0, function(){
						// $("#checkButton").css("visibility", "hidden");
						$(".btn-group").css("display", "none");
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
			let mousePos = oMousePos(svg, evt);

			console.log(mousePos);

		    updateInput(mousePos, cx, cy, r1, offset, delta);
		}, false);

		svg.addEventListener("touchstart", function(evt) {
			evt.preventDefault();

			console.log(evt.changedTouches);

		    isDragging = true;
			let mousePos = oMousePos(svg, evt),
				touches = evt.changedTouches[0],
				touchCoord = {};
			
			touchCoord.x = touches.clientX;
			touchCoord.y = touches.clientY;

			console.log(mousePos);
			console.log(touchCoord);

		    updateInput(mousePos, cx, cy, r1, offset, delta);
		}, false);

		// ON MOUSEUP EVENT: REMOVE 'FOCUSABLE' CLASS
		// DRAGGING FLAG IS NOW - FALSE
		svg.addEventListener("mouseup", function(evt) {
		    isDragging = false;
		    // this.classList.remove("focusable");
		}, false);

		svg.addEventListener("touchend", function(evt) {
		    isDragging = false;
		    // this.classList.remove("focusable");
		}, false);

		// ON MOUSEOUT EVENT: SET DRAGGING FLAG AND REMOVE 'FOCUSABLE' CLASS
		// DRAGGING FLAG IS NOW - FALSE
		svg.addEventListener("mouseout", function(evt) {
		    isDragging = false;
		    // this.classList.remove("focusable");
		}, false);
		
		svg.addEventListener("touchcancel", function(evt) {
		    isDragging = false;
		    // this.classList.remove("focusable");
		}, false);

		// ON MOUSEMOVE EVENT: CHECK IF DRAGGING FLAG IS TRUE/FALSE (IF TRUE TIGGER oMousePos, updateInput FUNCTION)
		// DRAGGING FLAG IS DEPENDENT ON 'MOUSEDOWN' EVENT
		// DRAGGING FLAG IS DEFAULT FALSE IF NO MOUSEDOWN
		svg.addEventListener("mousemove", function(evt) {
		    if (isDragging) {
				let mousePos = oMousePos(svg, evt);
		        updateInput(mousePos, cx, cy, r1, offset, delta);    		    
		    }
		}, false);

		svg.addEventListener("touchmove", function(evt) {
			evt.preventDefault();

			let mousePos = oMousePos(svg, evt),
				touches = evt.changedTouches[0],
				touchCoord = {};
			
			touchCoord.x = touches.clientX;
			touchCoord.y = touches.clientY;
			updateInput(mousePos, cx, cy, r1, offset, delta);    		    

		}, false);

		const style = document.createElement('style');
        const styleText = `.correct-message,
        .error-message {
            margin-top: 5px; 
            display: none;
        }
        
        #checkButton, #resetButton {float:none !important; justify-content:center; width:48%; min-width:auto; min-height:auto; margin:5px; padding:7px; font:bold 16px/16px 'Orbitron', sans-serf; cursor:pointer;}
		#incorrectResponce, #noResponce { }
                
        .container {
            position: relative;
            /* margin: 100px auto 50px auto; */
            /* height: 330px; */
            width: 100%;
        }
        
        .output {
            line-height: 35px;
            width: 10px;
            height: 10px;
            margin:0 auto;
            background-color: #a69540;
            border: 5px solid #000;
            border-radius: 100%;
            position: absolute;
            top: 155px;
            left: 0;
            right:0;
            text-align: center;
        }

        .initialValue {
            border: none;
            border-bottom: 1px solid #399988;
            color: #399988;
            display: block;
            width: 3em;
            background-color: transparent;
            margin: 1em auto;
            outline: none;
            font-size: 16px;
            text-align: center;
        }
        
        /*SVG*/
        svg {max-width:100%; margin: 0px; padding: 0; cursor: pointer; background:url('/images/gauge/vacuum-gauge.png') center center no-repeat; background-size:contain;/*border: 1px solid #0a1a17;*/}
        svg.focusable {/*border: 1px solid #0f4534;*/}
        
        .outline,
        .fill,
        .center,
        .needle,
        .scale,
        .output {pointer-events: none;}
        
        .outline {fill: #0f4534;}
        .fill {fill: #399988;}
        
        .outline,
        .fill {visibility:hidden;}
        
        .needle {fill: #aa0000;}
        .scale {stroke: #aaa;}
        
        line.scale, text.scale {display:none;}
        text {text-anchor: middle; dominant-baseline: alphabetic; font: 12px verdana, sans-serif; fill: #aaa;}
        
        .initialValue {display:none;}
        .underline {text-decoration:underline;}
        
        @media screen and (min-width:640px){
            #imageContainer {margin:0 auto; padding:0 20px; text-align:center}
            #mc1 {flex:1 0 200px; box-sizing:border-box; margin:5px}    
        }`;

        style.type = 'text/css';
        style.textContent = styleText;

        let placeHere = document.querySelector('#question-container');
        placeHere.appendChild(style);
    }
    
    render() {

        return( 
        <>
        <div id="question-container">
            <div id="imageContainer" className="span6">
                <div className="container A">
                    <svg className="typeRange" height="330" width="330" viewBox="0 0 330 330" xmlns="http://www.w3.org/2000/svg">
                        <g className="scale" stroke="red" cx="330" cy="330" r="125"></g>

                        <path className="outline" d="" />
                        <path className="fill" d="" />

                        <polygon className="needle" points="165,160 281,165 165,170" />
                    </svg>
                    <div className="output"></div>
                    <input type="text" className="initialValue" defaultValue="18" />
                </div>

            </div>
            <div id="mc1" className="mc span6">
				<p className="msg-display">&nbsp;</p>
                <span id="incorrectResponce"    className="error-message">That is not correct. Please try again.</span>
                <span id="maxResponces"         className="error-message">That is not correct. You will need to study more.</span>
                <span id="noResponce"           className="error-message">One or more answer field(s) are blank; please drag a selection over to the answer field.</span>
                <span id="passed"           	className="correct-message">Congratulations! You're smart enough to be a Honda technician...</span>

                <h2>Knowledge Check</h2>
                <p>Move the pressure gauge needle to match to the approximate atmospheric pressure present at <span className='underline'>SEA LEVEL</span>.</p>

                <section className="btn-group btn-group-lg" role="group">
                    <button id="checkButton" className="btn btn-default btn-lg checkAnswer">Check</button>
                </section>
            </div>
        </div>
        </>
        );
    }
}

export default Gauge;