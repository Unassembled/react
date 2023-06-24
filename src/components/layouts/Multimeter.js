import React, { Component } from 'react';
import { gsap, Draggable } from 'gsap/all';
import Chart from "../../images/multimeter/2-4-2.png";
import Mulitmeter from "../../images/multimeter/dmm-dialless-volt.png";
import Dial from "../../images/multimeter/adjustable-dial.png";
import Probe from "../../images/multimeter/red-probe.png"
// import { appendScript } from '../customImports/appendScript';
// import { TweenMax, TweenLite, toArray } from 'gsap/gsap-core';

gsap.registerPlugin(Draggable);

class Multimeter extends Component {0
    componentWillUnmount() {
        console.log('****UNMOUNTED!!!****');
    }

    componentDidMount(){		
		/********************************************************************************************************
		***************************************** INSTRUCTIONAL STEPS: ******************************************
		*** https://www.fs1inc.com/blog/what-to-do-if-the-obd-ii-scanner-doesnt-communicate-with-the-vehicle/ ***
		********************************************************************************************************/
        // let appContainer = document.getElementById('app-container');
        //     appContainer.style.display='none';
        let annotation = document.querySelector('.annotation');
            annotation.style.display='none';
        let title = document.querySelector('h1');
            title.textContent = 'MULTIMETER';
        
        // document.body.style.backgroundImage = 'none';
        
		const style = document.createElement('style');
		const styleText = `#svg {
			position: absolute;
			width: 100%;
			height: 100%;
		}

		foreignObject {
			overflow:scroll !important;
		}

		.handle {
			fill: firebrick;
		}

		.path {
			fill: none;
			stroke: firebrick;
			stroke-width: 6;
		}

		#controls {display:none;}
		#video-container, .hide {display:none !important;}

        .voltage-container {display:flex; justify-content:center; text-align:center;}
        #currentSwitch {display:flex; justify-content:center; align-items:center; width:auto; margin:0;}

		.mid-container {flex:2 0 320px; position:relative;}
		.multimeter-container {flex:2 0 320px; position:relative; padding:0 20px;}

        #dropzones {position:relative; display:inline-block;}
        .drop-container{display:block;}
        .drop {background:red; opacity:1; animation-name:color; animation-duration:3s; animation-iteration-count:infinite; border-radius:100%;}
        @keyframes color{
            0% 	{opacity:1;}
            50% {opacity:.1;}
            100 {opacity:1;}
        }
        #drop1-cont {position:absolute; top:33.5%; left:40.0%;}
        #drop2-cont {position:absolute; top:33.5%; left:51.0%;}
        #drop3-cont {position:absolute; top:33.5%; left:61.5%;}
        #drop4-cont {position:absolute; top:33.5%; left:72.2%;}
        #drop5-cont {position:absolute; top:68.0%; left:08.0%;}
        #drop6-cont {position:absolute; top:68.0%; left:40.0%;}
        #drop7-cont {position:absolute; top:68.0%; left:61.5%;}
        #drop8-cont {position:absolute; top:68.0%; left:83.0%;}

        .drop {position:relative; width:35px; height:35px;}
        #currentChart {width:100% !important;}

        .mc .options a.option {margin:0 !important; padding:0 !important;}
		.col-sm-5.multimeter-container {}

        .dmm-container {position:relative; margin-top:10px;}
        #dmm {}

        #probe-container {position:absolute; bottom:500px; left:270px;}
        #red-probe {position:absolute; top:14px; right:14px; max-width:none; cursor:pointer; z-index:9999999; animation-name:probe}

        #readOut {position:absolute; top:12%; left:55px; display:inline-block; font:bold 20px/20px 'Orbitron', sans-serif; text-align:52%; text-transform:uppercase;}

        .dmm-table.col-sm-12 {margin-top:50px; padding:0; border-top:1px solid #000; border-right:1px solid #000; border-left:1px solid #000;}
        .table-row.col-sm-12 {padding:0;}
        .row-cell {padding:10px; text-align:left; border-bottom:1px solid #000; border-right:1px solid #000;}
        .row-cell.last {border-right:none;}

        #cover, #interact, video{
            display:none !important;
        }
        #content {height:105% !important;}
        #currentSwitch:hover {cursor:pointer;}

		.toggle-dmm-text {margin-top:10px; font-style:italic;}

        @media screen and (max-width:640px){
			.voltage-container {display:block !important;}
			.mid-container {flex:2 0 200px; box-sizing:border-box;}			
            .multimeter-container {flex:2 0 200px; padding-left:10px; box-sizing:border-box;}
            .dmm-table.col-sm-12 {width:100%;}
			.dmm-table.col-sm-12 .row-cell.col-sm-6 {width:50%;}			
        }`;

        style.type = 'text/css';
        style.textContent = styleText;

        let placeHere = document.querySelector('#question-container');
		placeHere.appendChild(style);
		
		/***************************
		*****  BUTTON DISPLAY  *****
		***************************/
		const probe = document.getElementById('red-probe'),
			dropArea = document.getElementsByClassName("drop"),
			btnSwitch = document.querySelectorAll('.switch'),
			readOut = document.getElementById('readOut'),			
			probeContainer = document.getElementById('probe-container');
			
		let startX = 0,
			startY = 0;

		function toggleImg() {
			let electricFlow = document.getElementById('dropzones').classList.contains('ohm'),
				newImg = 'volt.png';

			if(!electricFlow){
				console.log('ohm mode');
				newImg = 'ohm.png';
				document.getElementById('dropzones').classList.add('ohm');
				document.getElementById('adjustable-dial').style.transform = "rotate(121deg)";
			} else {
				console.log('volt mode');
				newImg = 'volt.png';
				document.getElementById('dropzones').classList.remove('ohm');
				document.getElementById('adjustable-dial').style.transform = "rotate(65deg)";
			}
			document.getElementById("dmm-dialless").src = './images/multimeter/dmm-dialless-'+newImg;

			return 0;
		}

		[].forEach.call(btnSwitch, function(bs){
			bs.addEventListener('click', toggleImg, false);
			bs.addEventListener('click', function(){
				/*****  USED TO RESET THE RED PROBE BACK TO IT'S DEFAULT POSITION - UPDATED WITH SCRIPT BELOW THIS COMMENT  *****
				// document.getElementById('probe-container').appendChild(document.getElementById('red-probe'));
				// document.getElementById('readOut').textContent = " ";
				*****/
				let electricFlow = document.getElementById('dropzones').classList.contains('ohm');
				if(electricFlow)
					document.getElementById('readOut').textContent = probe.parentNode.dataset.ohm || '';
				else
					document.getElementById('readOut').textContent = probe.parentNode.dataset.volt || '';
			}, false);
		});

		/***********************************
		*****  DRAG 'N DROP FUNCTIONS  *****
		***********************************/
		function start(e) {
			console.log('--START--', e);
			if (!window.matchMedia("(pointer: coarse)").matches) {
				e.dataTransfer.getData('text', e.target.id);
			} else {
				console.log(e.target.id);
				console.log(probe.id);

				startX = e.changedTouches[0].clientX;
				startY = e.changedTouches[0].clientY;

				console.log(startX, startY);
			}
			console.log('--START END--');
		}

		function drag(e){
			console.log('--DRAG--');
			if (!window.matchMedia("(pointer: coarse)").matches) {
				if (probeContainer.style) {
					probe.classList.add('hide');
					probeContainer.removeAttribute('style');
				}

				if (!document.querySelector('#dropzones').classList.contains('ohm'))
					readOut.textContent = probeContainer.dataset.volt || '';
				else
					readOut.textContent = probeContainer.dataset.ohm || '';

			} else {
                console.log(e.changedTouches[0].target);
				console.log(probe.id);
				console.log(probe.parentNode.id);

				probe.parentNode.style.zIndex = 0;

                if (typeof e.cancelable !== 'boolean' || e.cancelable) {
                    // The event can be canceled, so we do so.
                    e.preventDefault();
                } else {
                    // The event cannot be canceled, so it is not safe
                    // to call preventDefault() on it.
                    console.warn(`The following event couldn't be canceled:`);
                    console.dir(e);
                }

				probe.parentNode.style = '';

				let dropZone = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY) ?
						document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY).className :
						e.target.id,
                    dropMap = document.querySelectorAll('.drop'),
                    touchLocation = e.changedTouches[0],
					body = document.querySelector('body'),
					// imageCont = document.querySelector('#imageContainer'),
					questionCont = document.querySelector('#question-container');


				console.log('---------------------------------');
				console.log(touchLocation.screenX < 0 ? true : false);
				console.log('question-container width: ', questionCont.offsetWidth);
				console.log(probe.get);
				console.log(body.getBoundingClientRect().left, body.getBoundingClientRect().top);
				console.log(e.target.getBoundingClientRect().left, e.target.getBoundingClientRect().top);
				console.log('touches: ', e.touches[0].clientX, e.touches[0].clientY);
				console.log('client X/Y: ', touchLocation.clientX, touchLocation.clientY);
				console.log('page X/Y: ', touchLocation.pageX, touchLocation.pageY);
				console.log('sreen X/Y: ', touchLocation.screenX, touchLocation.screenY);
				// console.log(e.target.getBoundingClientRect().x, e.target.getBoundingClientRect().top);
				// console.log(questX);
				// console.log(testX);
				console.log('---------------------------------');

				probe.style.position = "absolute";
				probe.style.right = 0;
				// probe.style.right = (questionCont.clientWidth - screenX) + probe.clientWidth + 'px';
				// probe.style.top = (pageY - questionCont.clientHeight) + 2*probe.clientHeight + 'px';
				let xPos = e.changedTouches[0].clientX - startX - probe.offsetWidth/2 - 65;
				let yPos = e.changedTouches[0].clientY - startY - probe.offsetHeight/2 + 100;

				probe.style.left =  xPos +'px';
				probe.style.top = yPos + 'px';

				// console.log(e.target);
				// console.log(probe);
				// console.log(dropZone);

                [].forEach.call(dropMap, (el, i)=>{
                    if (el.id === dropZone.id){
                        // console.log(el.id, dropZone.id);
                    } else {
                        
                    }
				});
			}
			console.log('--DRAG END--');
		}

		function ended(e){
			console.log('--ENDED--');

            if (e.dataTransfer) {
                e.dataTransfer.getData("text", e.target.id);
				probe.classList.remove('hide');
				// console.log(e.dataTransfer.getData('text', e.target.id));

			} else if (e.changedTouches) {
                if (typeof e.cancelable !== 'boolean' || e.cancelable) {
                    // The event can be canceled, so we do so.
                    e.preventDefault();
                } else {
                    // The event cannot be canceled, so it is not safe
                    // to call preventDefault() on it.
                    console.warn(`The following event couldn't be canceled:`);
                    console.dir(e);
                }

				let dropZone = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY) ?
                    document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY) : e.target.id,
                    zones = document.querySelectorAll('.drop');

				console.log(dropZone);

                [].forEach.call(zones, dz => {
                    if (dz.dataset.id === dropZone.dataset.id) {
						// console.log('TRUE');
						// console.log(dz.dataset.id, dropZone)

						dropZone.parentNode.appendChild(probe);
						probe.style = '';

						if(!document.querySelector('#dropzones').classList.contains('ohm'))
							readOut.textContent = probe.parentNode.dataset.volt || '';
						else
							readOut.textContent = probe.parentNode.dataset.ohm || '';
						probe.parentNode.style.zIndex = 9;

					} else {
						// console.log('FALSE');
						// console.log(dz.dataset.id, dropZone)

						probe.style = '';						
                    }
                });
			} else {
				console.log('FUNCTION END IS BROKEN...');
			}
			console.log('--ENDED END--');
			probe.parentNode.style.zIndex = 9;
		}

		function enter(e){
			console.log('ENTER FUNCTION: ', e);			
			e.target.style.backgroundColor = '#000';
		}

		function over(e){
			console.log('--OVER--');

			if (typeof e.cancelable !== 'boolean' || e.cancelable) {
				// The event can be canceled, so we do so.
				e.preventDefault();
			} else {
				// The event cannot be canceled, so it is not safe
				// to call preventDefault() on it.
				console.warn(`The following event couldn't be canceled:`);
				console.dir(e);
			}

			console.log(e.target.classList[0]);
			// console.log('THIS IS THE TYPE FROM OVER FUNCTION: ' + e.type);

			if (/drop/i.test(e.target.classList[0])) {
				console.log('TARGETED A DROPZONE');
				console.log(e.target.classList[0]);

				e.target.parentNode.appendChild(probe);
				if(!document.querySelector('#dropzones').classList.contains('ohm'))
					readOut.textContent = e.target.parentNode.dataset.volt || '';
				else
					readOut.textContent = e.target.parentNode.dataset.ohm || '';
				return false;
			} else {
				console.log('NOT TARGETING A DROP ZONE!!!');
				console.log(e.target.classList[0]);

				probeContainer.appendChild(probe);

				if (!document.querySelector('#dropzones').classList.contains('ohm'))
					readOut.textContent = e.target.parentNode.dataset.volt || '';
				else
					readOut.textContent = e.target.parentNode.dataset.ohm || '';
				return false;
			}
		}

		function exit(e){
			console.log('--EXIT--', e);

			if (e.target.style)
				e.target.removeAttribute('style');
			probeContainer.appendChild(probe);
			readOut.textContent = '';

			console.log('--EXIT END--');
		}

		function drop(e){
			console.log('--DROP--');
			console.log(e);
			console.log(e.target);

            if (!window.matchMedia("(pointer: coarse)").matches) {
				e.preventDefault();
				e.stopPropagation();

				e.target.parentNode.appendChild(probe);

				if (!/drop/i.test(e.target.classList[0])) {
					console.log('NOT A DROP TARGET');

					probeContainer.appendChild(probe);
				} else {
					console.log('IT\'S A DROP TARGET');
					console.log(e.target);

					e.target.parentNode.appendChild(probe);
					e.target.parentNode.style.zIndex = "9";
					probe.removeAttribute('style');

					if(!document.querySelector('#dropzones').classList.contains('ohm'))
						readOut.textContent = e.target.parentNode.dataset.volt || '';
					else
						readOut.textContent = e.target.parentNode.dataset.ohm || '';
				}

				if (/drag/i.test(e.target.childNodes.classList)) {
					console.log('TARGET IS A DRAG BOX');
				} else {
					console.log('ENDING OF THE DROP FUNCTION');
					console.log(probe.parentNode);

					e.target.removeAttribute('style');
					e.target.parentNode.appendChild(probe);
					probe.removeAttribute('style');
				}

				probe.classList.remove('hide');
            } else {
				if (typeof e.cancelable !== 'boolean' || e.cancelable) {
					// The event can be canceled, so we do so.
					e.preventDefault();
				} else {
					// The event cannot be canceled, so it is not safe
					// to call preventDefault() on it.
					console.warn(`The following event couldn't be canceled:`);
					console.dir(e);
				}

				let drags = document.querySelectorAll('.drag'),
					dropZone = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY) ?
					document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY).id : e.target.id;

				console.log(dropZone);

				[].forEach.call(drags, (e) => {
					// console.log(e);
					// console.log(e.target);

					// probe.style='';
				});
				probe.style='';
			}
			console.log('--DROP END--');
		}

		/*********************************
		*****  PROBE EVENT TRACKING  *****
		*********************************/
		function dragImg(e) {
			console.log('--DRAGIMG--');
	
			let shiftY = (e.clientY - e.target.getBoundingClientRect().top) *.9,
				shiftX = (e.target.offsetWidth - (e.clientX - e.target.getBoundingClientRect().left)) *.9;

			console.log(e.target);
			console.log(e.target.getBoundingClientRect());
			console.log(e.target.offsetWidth - (e.clientX + e.target.getBoundingClientRect().left));

			e.target.style.position = 'absolute';
			e.target.style.zIndex = '999999';

			if(e.target.parentNode.classList.contains('drop-container')){
				e.target.style.top = shiftY *1.2 + 'px';
				e.target.style.right = shiftX *1.2 + 'px';
			} else {
				e.target.style.top = shiftY + 'px';
				e.target.style.right = shiftX + 'px';
			}

			// if(e.type === 'drag'){
			// 	console.log('---------------------------  START DRAG TRACK  ---------------------------');
			// 	console.log('IMAGE HEIGHT: ' + e.target.height);
			// 	console.log('IMAGE NATURAL HEIGHT: ' + e.target.naturalHeight);
			// 	console.log('IMAGE WIDTH: ' + e.target.width);
			// 	console.log('IMAGE NATURAL WIDTH: ' + e.target.naturalWidth);
			// 	console.log('BOUNDING WIDTH: ' + e.target.getBoundingClientRect().left);
			// 	console.log('BOUNDING HEIGHT: ' + e.target.getBoundingClientRect().top);

			// 	console.log('CLIENT X: ' + e.clientX);
			// 	console.log('CLIENT Y: ' + e.clientY);
			// 	console.log('SCROLL X: ' + e.target.scrollLeft);
			// 	console.log('SCROLL Y: ' + e.target.scrollTop);
			// 	console.log('OFFSETWIDTH: ' + e.target.offsetWidth);
			// 	console.log('OFFSETHEIGHT: ' + e.target.offsetHeight);

			// 	console.log('---------------------------  END DRAG TRACK  ---------------------------');
			// }

			console.log('--DRAGIMG END--');
		}

		function stopImg(e){
			console.log('--STOPIMG--');

			e.target.removeAttribute('style');

			console.log('--STOPIMG END--');
		}

		/*********************************
		*****  ADD EVENT LISTENTERS  *****
		*********************************/
		[].forEach.call(dropArea, function(dz) {
			// if (!window.matchMedia("(pointer: coarse)").matches) {
				dz.addEventListener('drop', drop, false);
				dz.addEventListener('dragover', over, false);
				dz.addEventListener('dragenter', enter, false);
				dz.addEventListener('dragleave', exit, false);
			// } else {
				dz.addEventListener('touchend', drop, {passive: false});
			// }
		});

		// if (!window.matchMedia("(pointer: coarse)").matches) {
			probe.addEventListener('dragstart', start, false);
			probe.addEventListener('drag', drag, false);
			probe.addEventListener('dragend', ended, false);

			probe.addEventListener('drag', dragImg, false);
			probe.addEventListener('dragend', stopImg, false);
			probe.addEventListener('mousedown', dragImg, {passive: false});
			probe.addEventListener('mouseup', stopImg, {passeive: false});
		// } else {
			probe.addEventListener('touchstart', start, {passive: false});
			probe.addEventListener('touchmove', drag, {passive: false});
			probe.addEventListener('touchend', ended, {passive: false});
		// }

		// Amount to offset control points
		// var bezierWeight = 0.675;
		var handles = document.querySelectorAll(".handle");
		// var path = document.querySelector(".path");
		
		console.log(handles);

		// var circle1 = TweenLite.set(handles[0], { x: 400, y: 150 }),
		// 	circle2 = TweenLite.set(handles[1], { x: 150, y: 375 });

		// console.log(circle1);
		// console.log(handles[0]);

		// console.log(TweenLite.set(handles[0], { x: 400, y: 150 }));

		// Draggable.create(handles, {
		// 	onDrag: updatePath
		// });

		// updatePath();

		// [].forEach.call(handles, (cir)=>{
		// 	cir.addEventListener('dragstart', updatePath);
		// });

		// function updatePath() {	
		// 	console.log('updatePath START');
		// 	console.log(circle1);

		// 	var cx1 = circle1.vars.x,
		// 		cy1 = circle1.vars.y,
		// 		cx4 = circle2.vars.x,
		// 		cy4 = circle2.vars.y;

		// 	var x1 = handles[0].transform.animVal[0].matrix.e;
		// 	var y1 = handles[0].transform.animVal[0].matrix.f;
		// 	var x4 = handles[1].transform.animVal[0].matrix.e;
		// 	var y4 = handles[1].transform.animVal[0].matrix.f;

		// 	console.log(x1);
		// 	console.log(y1);
		// 	console.log(x4);

		// 	var dx = Math.abs(x4 - x1) * bezierWeight;
			
		// 	var x2 = x1 - dx;
		// 	var x3 = x4 + dx;
			
		// 	var data = `M${x1} ${y1} C ${x2} ${y1} ${x3} ${y4} ${x4} ${y4}`;
			
		// 	path.setAttribute("d", data);
		// }
	}

	returnFalse = () => { return false; }
    render() {
        return( 
		<>
		{/* <svg id="svg">
			<path className="path" />
			<circle className="handle" cx="0" cy="0" r="8" />
			<circle className="handle" cx="0" cy="0" r="8" />
			<foreignObject className="svg-dom" width="100%" height="100%"> */}
			<div id="question-container">
				<div id="imageContainer" className="mid-container col-sm-7">
					<div id="dropzones">
						<div id="drop1-cont" className="drop-container" data-volt="00.01" data-ohm="00.01">
							<div className="drop" data-id="drop1"></div>
						</div>
						<div id="drop2-cont" className="drop-container" data-volt="00.01" data-ohm="00.01">
							<div className="drop" data-id="drop2"></div>
						</div>
						{/* <!--
						<div id="drop3-cont" className="drop-container" data-volt="09.60" data-ohm="">
							<div className="drop" data-id="drop3"></div>
						</div>
						--> */}
						<div id="drop4-cont" className="drop-container" data-volt="09.60" data-ohm="ERROR">
							<div className="drop" data-id="drop4"></div>
						</div>
						<div id="drop5-cont" className="drop-container" data-volt="05.10" data-ohm="ERROR">
							<div className="drop" data-id="drop5"></div>
						</div>
						<div id="drop6-cont" className="drop-container" data-volt="00.04" data-ohm="3950">
							<div className="drop" data-id="drop6"></div>
						</div>
						<div id="drop7-cont" className="drop-container" data-volt="05.20" data-ohm="ERROR">
							<div className="drop" data-id="drop7"></div>
						</div>
						<div id="drop8-cont" className="drop-container" data-volt="04.50" data-ohm="ERROR">
							<div className="drop" data-id="drop8"></div>
						</div>

						<img id="currentChart" src={Chart} draggable="false" onDragStart={this.returnFalse} alt="electrical termninals" />
					</div>
				</div>
				<div className="col-sm-5 multimeter-container">
					<div id="mc1" className="mc span6 description" style={{display:'block'}}>
						<h2>Voltage Measurement Exercise</h2>
					</div>
					<div className="toggle-dmm-text">
						Click the DMM dial to toggle between measuring 'voltage' or 'ohm' (resistance):
					</div>
					<div className="dmm-container">
						{/* <!-- <img id="ddm" src="./images/multimeter/2-2-4-multimeter-on.png" draggable="false" onDragStart="return false;" alt="DMM reading" /> --> */}
						<img id="dmm-dialless" src={Mulitmeter} draggable="false" onDragStart={this.returnFalse} alt="testing dmm" style={{position:'relative'}} />
						<img id="adjustable-dial" className="switch" src={Dial} draggable="false" onDragStart={this.returnFalse} alt="rotating dial" style={{position:'absolute', top:'182px', left:'46px', transform:'rotate(65deg)', cursor:'pointer'}} />

						<div id="probe-container">
							<img id="red-probe" draggable="true" src={Probe} alt="a red probe" />
						</div>
						<div id="readOut" className="counter">
							
						</div>
					</div>
				</div>
			</div>
			{/* </foreignObject>
		</svg> */}
        </>
        );
    }
}

export default Multimeter;