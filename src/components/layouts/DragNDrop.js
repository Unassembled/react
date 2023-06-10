import React, { Component } from 'react';
import $ from 'jquery';

class DragNDrop extends Component {
    /******************************************************************************************************************************
    ******************************  LOOK INTO THIS: https://deepakkadarivel.github.io/DnDWithTouch/  ******************************
    *****  ORIGINAL DISCUSSTION HERE: https://medium.com/@deepakkadarivel/drag-and-drop-dnd-for-mobile-browsers-fc9bcd1ad3c5  *****
    ******************************************************************************************************************************/

    // BE AWARE OF PASSIVE EVENT LISTENER VS PREVENTDEFAULT (SOLUTION ABOVE) ^ -- SEE: https://www.chromestatus.com/feature/5745543795965952 
    // AND https://rbyers.github.io/scroll-latency.html 
    
    componentWillUnmount() {
        console.log('****UNMOUNTED!!!****');
    }
    componentDidMount(){       
        // let appContainer = document.getElementById('app-container');
        //     appContainer.style.display='none';
        let annotation = document.querySelector('.annotation');
            annotation.style.display='none';
        let title = document.querySelector('h1');
            title.textContent = 'DRAG AND DROP';

        // document.body.style.backgroundImage = 'none';

        /*********************************
        ******  BEGIN DRAG AND DROP  *****
        *********************************/
        const matchMap = [
            { "drop1": "drag1" },
            { "drop2": "drag2" },
            { "drop3": "drag3" },
            { "drop4": "drag4" }
        ];
        var ATTEMPTS_DONE = 1,
            ATEMPTS_ALLOWED = 2;
        
        // -----------------------------------------
        // set .target_box element listeners
        // -----------------------------------------
        const target_elements = document.getElementsByClassName("target_box");
        [].forEach.call(target_elements, function (te) {
            te.addEventListener('drop', drop, false);
            te.addEventListener('dragover', allowDrop, false);
            te.addEventListener('dragleave', handleDragLeave, false);
            te.addEventListener('dragenter', handleDragEnter, false);
            
            te.addEventListener('touchend', drop, {passive: false});
        });
        
        // -----------------------------------------
        // set draggable .draggable_box element listeners
        // -----------------------------------------
        const draggablebox = document.getElementsByClassName("draggable_box");
        [].forEach.call(draggablebox, function (dgb) {
            dgb.setAttribute('draggable', true);
            dgb.addEventListener('dragstart', drag, false);
            dgb.addEventListener('dragend', ended, false);
        
            dgb.addEventListener('touchmove', drag, {passive: false});
            dgb.addEventListener('touchend', ended, {passive: false});
        });

        // -----------------------------------------
        // set draggable .draggable_container element listeners
        // -----------------------------------------
        const draggablecontainer = document.getElementsByClassName("draggable_container");
        [].forEach.call(draggablecontainer, function (dc) {
            dc.addEventListener('dragover', allowDropReturn, true);
            dc.addEventListener('drop', dropReturn, false);

            dc.addEventListener('touchcancel', allowDropReturn, false);
            dc.addEventListener('touchend', dropReturn, false);
        });
        
        // -----------------------------------------
        //  Set button listeners
        // -----------------------------------------
        const resetButton = document.getElementById("resetButton");
        resetButton.addEventListener('click', reset, false);
        
        const checkButton = document.getElementById("checkButton");
        checkButton.addEventListener('click', check, false);
        
        // -----------------------------------------
        // FUNCTION drag()
        // -----------------------------------------
        function drag(ev) { 
            console.log('FUNCTION drag(): ', ev);
            
            if (ev.dataTransfer) {
                ev.dataTransfer.setData("text", ev.target.id);
                
                // console.log(ev.dataTransfer.setData("text", ev.target.id));
                console.log(ev.target.id);
                console.log(ev.dataTransfer);

            } else if (ev.changedTouches) {
                if (typeof ev.cancelable !== 'boolean' || ev.cancelable) {
                    // The event can be canceled, so we do so.
                    ev.preventDefault();
                } else {
                    // The event cannot be canceled, so it is not safe
                    // to call preventDefault() on it.
                    console.warn(`The following event couldn't be canceled:`);
                    console.dir(ev);
                }
    
                // ev.changedTouches[0].target.id
                console.log(ev.changedTouches[0].target);
                console.log(ev.changedTouches[0].target.id);
                console.log(ev.target.id);

                let dropZone = document.elementFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY).id ?
                    document.elementFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY).id : ev.target.id,
                    dropMap = document.querySelectorAll('.drop'),
                    touchLocation = ev.changedTouches[0],
                    hoverDrop = document.querySelector('#'+dropZone),
                    pageX = (touchLocation.pageX-300) + "px",
                    pageY = (touchLocation.pageY-130) + "px";

                ev.target.style.position = "absolute";
                ev.target.style.left = pageX;
                ev.target.style.top = pageY;

                console.log(ev);

                [].forEach.call(dropMap, (el, i)=>{
                    if (el.id === hoverDrop.id){
                        console.log(el.id, hoverDrop.id);

                        // hoverDrop.style = `transition: all .2s ease-in; background:black'`;
                    } else {
                        
                    }
                });

            } else {
                console.log('OH SHIT - THIS IS BROKEN!');
            }
        }
        
        // -----------------------------------------
        // FUNCTION ended()
        // -----------------------------------------			
        function ended(ev) {
            console.log('FUNCTION ended(): ', ev);

            if (ev.dataTransfer) {
                ev.dataTransfer.getData("text", ev.target.id);
                console.log(ev.dataTransfer.getData("text", ev.target.id));
                console.log(ev.target.id);

            } else if (ev.changedTouches) {
                console.log(ev.changedTouches[0].target);
                console.log(ev.changedTouches[0].target.id);
                console.log(ev.target.id);
                console.log(document.querySelector('.'+ev.target.id));

                let dropZone = document.elementFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY).id ?
                    document.elementFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY).id : ev.target.id,
                    pageX = ev.changedTouches[0].clientX,
                    pageY = ev.changedTouches[0].clientY,
                    zones = document.querySelectorAll('.drop'),
                    dragItem = ev.changedTouches[0].target,
                    targetZone = document.elementFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY).id;

                console.log(dropZone);
                console.log(pageX, pageY);
                console.log(document.elementFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY));
                console.log(targetZone);

                [].forEach.call(zones, dz => {
                    // console.log(dz, document.elementFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY).id);
                    // console.log(detectTouchEnd(dz.offsetLeft, dz.offsetTop, pageX, pageY, dz.offsetWidth, dz.offsetHeight));

                    console.log(dz.id === targetZone);
                    if (dz.id === targetZone) {
                        dragItem.style = 'left:0; top:-5px;';
                        dz.appendChild(dragItem);
                    } else {
                        dragItem.style = '';
                    }
                });

            } else {
                console.log('OH SHIT - THIS IS BROKEN!');
            }
        }

        // -----------------------------------------
        // FUNCTION detectTouchEnd()
        // -----------------------------------------
        function detectTouchEnd(x1, y1, x2, y2, w, h) {
            //Very simple detection here
            if (x2 - x1 > w) {
                return false;
            }
            if (y2 - y1 > h) {
                return false;
            }
            return true;
        }        
        
        // -----------------------------------------
        // FUNCTION allowDrop()
        // -----------------------------------------
        function allowDrop(ev) { 
            console.log('FUNCTION allowDrop(): ', ev);

            if (typeof ev.cancelable !== 'boolean' || ev.cancelable) {
                // The event can be canceled, so we do so.
                ev.preventDefault();
            } else {
                // The event cannot be canceled, so it is not safe
                // to call preventDefault() on it.
                console.warn(`The following event couldn't be canceled:`);
                console.dir(ev);
            }
         }
        
        // -----------------------------------------
        // FUNCTION handleDragEnder()
        // -----------------------------------------
        function handleDragEnter(e) {
            console.log('handleDragEnter: ', e);                
            console.log(e.target);
        
            const targetnode = document.getElementById(e.target.id);
            try {
                if(targetnode.firstChild === null ) {
                    // Do nothing
                    // console.log("handleDragEnter, TryCatchBlock : handleDragEnter, targetnode.firstChild : ", targetnode.firstChild);
                }
            }
            catch(error) {
                // do nothing
            }
        
            try {
                if(targetnode.firstChild.nodeType === 3 ) {
                    // e.target.classList.add("targetDragOver");
                } else {
                    // class not adde
                }
            }
            catch(error){
                // do nothing
            }
        }
        
        // -----------------------------------------
        // FUNCTION handleDragLeave()
        // -----------------------------------------
        function handleDragLeave(e) {
            console.log('FUNCTION handleDragLeave(): ', e);
            // e.target.classList.remove("targetDragOver");
        }
        
        // -----------------------------------------
        // FUNCTION drop()
        // -----------------------------------------
        function drop(ev) {
            console.log('FUNCTION drop(): ', ev);

            if (typeof ev.cancelable !== 'boolean' || ev.cancelable) {
                // The event can be canceled, so we do so.
                ev.preventDefault();
            } else {
                // The event cannot be canceled, so it is not safe
                // to call preventDefault() on it.
                console.warn(`The following event couldn't be canceled:`);
                console.dir(ev);
            }
            // ev.preventDefault();
            // ev.target.classList.remove("targetDragOver");
        
            const regex = /\d/;
            let data = ev.dataTransfer ? ev.dataTransfer.getData("text", ev.target.id) : ev.changedTouches[0].target.id,
                htmlnode = document.getElementById(data);

            console.log(data);
            console.log(htmlnode);
            console.log(ev.target);
                        
            if (/drop/i.test(ev.target.classList)) {
                // --------------------------------------------------
                // Check if a child node is aready present in a target container
                // --------------------------------------------------
                const targetnode = document.getElementById(ev.target.id);

                console.log(targetnode);

                if (!window.matchMedia("(pointer: coarse)").matches) {
                    if ( targetnode.childNodes.length < 1 ) {
                        ev.target.appendChild(htmlnode);
                        console.log(htmlnode);
                    } else {
                        let dragNo = regex.exec(targetnode.childNodes[0].dataset.id),
                            contNo = 'draggable_container' + dragNo,
                            dataID = '[data-id=' + targetnode.childNodes[0].dataset.id + ']';

                        console.log(dragNo);
                        console.log(contNo);
                        console.log(dataID);
            
                        document.getElementById(contNo).appendChild(document.querySelector(dataID));
                        ev.target.appendChild(htmlnode);
                    }
                } else {
                    let drags = document.querySelectorAll('.drag');
                    [].forEach.call(drags, (e)=>{
                        e.style='';
                    });
                }
            }
        
            if (/draggable_box/i.test(ev.target.classList) || /draggable_box/i.test(ev.target.parentNode.classList)) {            
                console.log("drop(ev): rejected, already contains a draggable_box node");
                console.log(ev.target.classList);
                console.log(ev.target.parentNode.classList);
                console.log(ev.target.dataset.id);

                let dragNo = regex.exec(ev.target.dataset.id),
                    contNo = 'draggable_container' + dragNo,
                    dataID = '[data-id=' + ev.target.dataset.id + ']';

                    console.log(dragNo);
                    console.log(contNo);
                    console.log(dataID);

                if (/drop/ig.test(ev.target.parentNode.classList)) {
                    ev.target.parentNode.appendChild(htmlnode);
                    document.getElementById(contNo).appendChild(document.querySelector(dataID));
                    // console.log(ev.target.parentNode);
                } else {
                    if (/drag/ig.test(ev.target.classList)){
                        ev.target.parentNode.parentNode.appendChild(htmlnode);
                        document.getElementById(contNo).appendChild(document.querySelector(dataID));
                        // console.log(ev.target.parentNode.parentNode);
                    } else {
                        dragNo = regex.exec(ev.target.parentNode.dataset.id);
                        contNo = 'draggable_container' + dragNo;
                        dataID = '[data-id=' + ev.target.parentNode.dataset.id + ']';
                        ev.target.parentNode.parentNode.appendChild(htmlnode);
                        document.getElementById(contNo).appendChild(document.querySelector(dataID));
                    }
                }
                return false;
            }
        }
        
        // -----------------------------------------
        // FUNCTION dropReturn()
        // -----------------------------------------
        function dropReturn(ev) {
            console.log('FUNCTION dropReturn(): ', ev);

            if (typeof ev.cancelable !== 'boolean' || ev.cancelable) {
                // The event can be canceled, so we do so.
                ev.preventDefault();
            } else {
                // The event cannot be canceled, so it is not safe
                // to call preventDefault() on it.
                console.warn(`The following event couldn't be canceled:`);
                console.dir(ev);
            }

            if (ev.target.classList[0] === "draggable_box")
                return false;

            let data = ev.dataTransfer ? ev.dataTransfer.getData("text", ev.target.id) : ev.changedTouches[0].target.id,
                htmlnode = document.getElementById(data);

                console.log(data);
                console.log(htmlnode);

            if (ev.target.childNodes.length < 2)
                return false;

            // if (ev.target.contains("targetDragOver"))
            //     ev.target.classList.remove("targetDragOver");        
            ev.target.appendChild(htmlnode);
        }
        
        // -----------------------------------------
        // FUNCTION allowDropReturn()
        // -----------------------------------------
        function allowDropReturn(ev) {
            console.log('FUNCTION allowDropReturn(): ', ev);

            if (typeof ev.cancelable !== 'boolean' || ev.cancelable) {
                // The event can be canceled, so we do so.
                ev.preventDefault();
            } else {
                // The event cannot be canceled, so it is not safe
                // to call preventDefault() on it.
                console.warn(`The following event couldn't be canceled:`);
                console.dir(ev);
            }
            // ev.preventDefault();
        }
        
        // -----------------------------------------
        // FUNCTION reset()
        // -----------------------------------------
        function reset(ev) {
            console.log('FUNCTION reset(): ', ev);

            if (!window.matchMedia("(pointer: coarse)").matches) {
                matchMap.map(( curr, index ) => {
                    // let draggable   = Object.values(curr)[0]; 	//  Doesn't work with IE11, script error
                    // console.log( Object.keys(curr)[0] );         // Object key
            
                    let objkey  = Object.keys(curr)[0];             // Works with IE11
                    // console.log( curr[objkey] )                  // Object value
                    let draggable = curr[objkey];
            
                    let child_node 	= document.getElementById( draggable ),
                        parent_node = child_node.parentNode,
                        dcname      = "draggable_container" + (index + 1),
                        dc 			= document.getElementById( dcname );
            
                    return dc.appendChild(parent_node.removeChild(child_node));                
                });
            } else {
                let drags = document.querySelectorAll('.drag');
                // draggable_container
                [].forEach.call(drags, (el,i)=>{
                    console.log(el.id);
                    console.log(/\d/gim.exec(el.id));

                    let dragNo      = /\d/gim.exec(el.id)[0],
                        dragItem    = document.querySelector('#drag'+dragNo),
                        dragCon = document.querySelector('#draggable_container'+dragNo);
            
                    console.log(dragNo);
                    console.log(dragCon);
                    console.log(dragCon.children.length);

                    if (dragCon.children.length < 1)
                        return (dragCon.appendChild(dragItem), dragCon.style='');
                });
            }
        }

        // -----------------------------------------
        // FUNCTION check()
        // -----------------------------------------
        function check(ev) {
            console.log('FUNCTION check(): ', ev);

            let emtpy=null;
            $("#noResponce").hide();  // Set display to none in case it's showing.
        
            matchMap.map( function( curr, index ) {
                let target          = Object.keys(curr)[0],
                    target_node 	= document.getElementById( target );
        
                console.log(target);
                console.log(target_node);
        
                if( target_node.children.length < 1  ) {
                    return emtpy = true;
                }
            });
            if ( emtpy ) {
                let a = document.getElementById('noResponce').style.display='block';
                $("#noResponce").delay(5000).fadeOut(2000);
                return false;
            } else {
                checkAnswer();
            }
        }
        
        // -----------------------------------------
        // FUNCTION checkAnswer
        // -----------------------------------------
        function checkAnswer() {
            console.log('FUNCTION checkAnswer(): '); 

            let passed = false,
                drops = document.getElementsByClassName("drop");
        
            for (let i = 0; i < drops.length; i += 1) {
                let drop = drops[i].dataset.correct,
                     drag = drops[i].childNodes[0].dataset.id;
        
                 console.log(i + 'DATASET' + drop[i] + ':' + drag[i]);
         
                 if ( drop === drag ) {
                    if ( i === (drops.length - 1) ) { 
                        passed = true; 
                    }
                    continue;
                 } else {
                    if ( ATTEMPTS_DONE < ATEMPTS_ALLOWED ) {
                        ATTEMPTS_DONE++;
                        $("#incorrectResponce").show().delay(2000).fadeOut(2000);
                        break;
                    } else {
                        // Show message max attempts have been done and to study and more try next time.
                        document.getElementById("incorrectResponce").style.display='none'; // hide
                        document.getElementById("maxResponces").style.display='block'; // hide
                        document.getElementById("noResponce").style.display='none';              // hide in case it's showing

                        $("#checkButton, #resetButton").fadeTo(2000, 0, function(){
                            // $("#checkButton").css("visibility", "hidden");
                            $(".btn-group").css("display", "none");
                        });
                        break;
                    }
                 }
            }   // End for loop
            // Passed Test
            if (passed) {
               // Show congradulations that all are correct. Press next to move to the next module.
                let p = document.getElementById("passed").style.display = 'block'; 
                $("#checkButton, #resetButton").fadeTo(2000, 0, function(){
                    // $("#checkButton").css("visibility", "hidden");
                    $(".btn-group").css("display", "none");
                });

                return passed;
            } else {
                reset();
            }
        }
        
		const style = document.createElement('style');
        const styleText = `.correct-message,
        .error-message {
            margin-top: 5px;
            display: none;
        }
        
        #incorrectResponce, #noResponce {}
        
        * {}
        
        .dropzones {position:absolute;}
        .drop_container {position:absolute; display:block; width:34.1%; height:5.9%; margin:0; padding:0;}
        .drop {position:relative; display:block; width:100%; height:100%; font:normal 18px Arial, Helvetica, sans-serif;}
        .dropzones.col-sm-6 {margin-right:10px;}
        
        .container1 {top:64.1%; left:64.8%;}
        .container2 {top:73.8%; left:64.8%;}
        .container3 {top:83.5%; left:64.8%;}
        .container4 {top:93.3%; left:64.8%;}
        
        .draggable_container {display:block; width:100%; margin:10px 0; text-align:center;}
        .draggable_box {border:1px solid #000; }
        .drag {display:block; width:100%; height:auto; padding:7px; font:bold 12px/16px 'Orbitron', Arial, Helvetica, sans-serif; text-align:center; cursor:pointer; box-sizing: border-box;}
        
        .drop .drag {position:absolute; top:-4px; right:0; bottom:0; left:-1px; width:103%; height:130%; padding:0 !important; border:5px solid;}
        .drop .drag:before {content:''; display:inline-block; height:100%; vertical-align:middle;}
        .drop .drag span {display:inline-block; vertical-align:middle; font-size:16px; line-height:16px;}
        
        .col-sm-12,
        .col-sm-6 {margin:0; padding:0;}
        
        #imageContainer {width:auto !important; height:auto !important; padding:0;}
        #imageContainer img {width:100%;}
        #dd1 {position:relative; z-index:99998;}
        #myimage {z-index:0;}
        
        .img-magnifier-container {position:relative;}
        .image-label {position:absolute; display:inline-block; font-weight:900; color:red;}
        
        .btn-group {display:flex !important; width:100%; text-align:center;}
        #checkButton, #resetButton {float:none !important; justify-content:center; width:48%; min-width:auto; min-height:auto; margin:5px; padding:7px; font:bold 16px/16px 'Orbitron', sans-serf; cursor:pointer;}

        .mc {width:100% !important;}

        html, body{
            margin: 0;
            padding: 0;
        }

        @media screen and (min-width:640px){
            .target_column {flex:2 0 200px; box-sizing:border-box; margin:0px}
            .col-sm-4.center {flex:2 0 200px; box-sizing:border-box; padding:0 5px;}
        }`;

        style.type = 'text/css';
        style.textContent = styleText;

        let placeHere = document.querySelector('#question-container');
        placeHere.appendChild(style);
    }

	returnFalse = () => { return false;}
    render() {

        return( 
        <>
            <div id="question-container">
			<div className="col-sm-5 target_column">
				<div id="imageContainer" className="drop-image center">
					<div id="dd1">
						<div id="drop-container1" className="drop_container container1">
							<div id="drop1" className="target_box drop" data-id="drop1" data-correct="drag3"></div>
						</div>
						<div id="drop-container2" className="drop_container container2">
								<div id="drop2" className="target_box drop" data-id="drop2" data-correct="drag4"></div>
						</div>
						<div id="drop-container3" className="drop_container container3">
							<div id="drop3" className="target_box drop" data-id="drop3" data-correct="drag1"></div>
						</div>
						<div id="drop-container4" className="drop_container container4">
							<div id="drop4" className="target_box drop" data-id="drop4" data-correct="drag2"></div>
						</div>
						<img id="myimage" src={window.location.origin + "/images/drag-n-drop/3-1-1.png"} onDragStart={this.returnFalse} alt="something" />
					</div>
				</div>
			</div>
			<div className="col-sm-4 center">
                <p className="msg-display">&nbsp;</p>
                <span id="incorrectResponce" className="error-message">That is not correct. Please try again. You can press <strong>Reset</strong> to start over.</span>
                <span id="maxResponces" className="error-message">That is not correct. You will need to study more.</span>
                <span id="noResponce" className="error-message">One or more answer field(s) are blank; please drag a selection over to the answer field.</span>
                <span id="passed" className="correct-message">Congratulations! You are AWESOME... (no sarcasm there).</span>

				<div className="mc" style={{display:'block'}}>
					<h2>Knowledge Check</h2>
					<p>Match each description to the correct OBD2 terminal. Use model year 2003 for the pin assignments.</p>
				</div>
				<div className="drag_container col-sm-12">
					<div id="draggable_container1" className="draggable_container" draggable="true">
						<div id="drag1" className="draggable_box drag" data-id="drag1">
							Write Enable
						</div>
					</div>
					<div id="draggable_container2" className="draggable_container" draggable="true">
						<div id="drag2" className="draggable_box drag" data-id="drag2">
							SCS Line
						</div>
					</div>
					<div id="draggable_container3" className="draggable_container" draggable="true">
						<div id="drag3" className="draggable_box drag" data-id="drag3">
							K-Line
						</div>
					</div>
					<div id="draggable_container4" className="draggable_container" draggable="true">
						<div id="drag4" className="draggable_box drag" data-id="drag4">
							DLC Input/Output
						</div>
					</div>

					<section className="btn-group btn-group-lg" role="group">
						<button id="checkButton" className="btn btn-default btn-lg checkAnswer">Check</button>
						<button id="resetButton" className="btn btn-default btn-lg">Reset</button>
					</section>
				</div> 
			</div>
		</div>
        </>
        );
    }
}

export default DragNDrop;