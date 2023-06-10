/***************************
*****  BUTTON DISPLAY  *****
***************************/
const probe = document.getElementById('red-probe'),
	dropArea = document.getElementsByClassName("drop"),
	btnSwitch = document.querySelectorAll('.switch'),
	readOut = document.getElementById('readOut'),
	probeContainer = document.getElementById('probe-container');

function handleMCResize(a22) {
	var viewWidth;
	var paneOuterHeight;
	var pageWidthScale;
	var pageHeightScale;
	var aspectRatio;
	var w;
	var h;
	var currentDD;

	var contentWidth,
		contentHeight;

	currentDD = document.querySelector('#dd1');

	contentWidth = parseInt(document.getElementById("currentChart").getAttribute("width"), 10);
	contentHeight = parseInt(document.getElementById("currentChart").getAttribute("height"), 10);

	if (currentDD) {
		document.getElementById("imageContainer");

		viewWidth = window.innerWidth - 20;
		paneOuterHeight = window.innerHeight - 106;
		pageWidthScale = viewWidth / contentWidth;
		pageHeightScale = paneOuterHeight / contentHeight;
		aspectRatio = Math.min(pageWidthScale, pageHeightScale);
		w = Math.round(contentWidth * aspectRatio);
		h = Math.round(contentHeight * aspectRatio);

		if (w > contentWidth && h > contentHeight) {
			currentDD.setAttribute("width", contentWidth + "px");
			currentDD.setAttribute("height", contentHeight + "px");
			// contentScale = 1;
		} else {
			currentDD.setAttribute("width", w + "px");
			currentDD.setAttribute("height", h + "px");
			// contentScale = aspectRatio;
		}
	}
}

function toggleImg() {
	'use strict';

	let electricFlow = document.getElementById('dropzones').classList.contains('ohm'),
		srcTest = electricFlow,
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

	console.log(/ohm/i.test(newImg));

	document.getElementById("currentSwitch").src = './images/measure-'+newImg;
	document.getElementById("dmm-dialless").src = './images/dmm-dialless-'+newImg;

	// const electricFlow = document.getElementById('dropzones').classList.contains('ohm');
	// if (electricFlow){
	// 	document.getElementById('drop3-cont').dataset.volt = '12.00';
	// 	document.getElementById('drop4-cont').dataset.volt = '12.00';
	// } else {
	// 	document.getElementById('drop3-cont').dataset.volt = '00.00';
	// 	document.getElementById('drop4-cont').dataset.volt = '00.00';
	// }
	return 0;
}

// window.setTimeout(function(){
	[].forEach.call(btnSwitch, function(bs){
		'use strict';
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
// });

window.addEventListener("load", function(e){
	'use strict';
	if (document.getElementById("imageContainer")){
		handleMCResize(e);
		window.addEventListener("resize", handleMCResize);
	}
});

/***********************************
*****  DRAG 'N DROP FUNCTIONS  *****
***********************************/
function start(e){
	console.log('--START--');

	e.dataTransfer.setData('text', e.target.id);

	/***** COMMENTING OUT .setDragImage BECAUSE OF STUPID IE -- NOT RECOGNIZED IN ANY OF IE BROWSER (EDGE OR IE11)
	const img = document.getElementById('red-probe');
	e.dataTransfer.setDragImage(img, 40, 0);
	******/

	console.log('--START END--');
}

function drag(e){
	console.log('--DRAG--');

	/***** COMMENTING OUT e.dataTransfer.setData('text', e.target.id) to prevent MOZILLA FIREFOX from creating duplicate probe...
	e.dataTransfer.setData('text', e.target.id); 
	*****/

	// window.setTimeout(function(){
	if(e.target.parentNode.style){
		e.target.classList.add('hide');
		e.target.parentNode.removeAttribute('style');
	}
	// });

		if(!document.querySelector('#dropzones').classList.contains('ohm'))
			readOut.textContent = e.target.parentNode.dataset.volt || '';
		else
			readOut.textContent = e.target.parentNode.dataset.ohm || '';

	console.log('--DRAG END--');
}

function ended(e){
	console.log('--ENDED--');

	e.preventDefault();
	e.stopPropagation();

	e.dataTransfer.getData('text');

	// window.setTimeout(function(){
		e.target.classList.remove('hide');
	// });

	console.log('--ENDED END--');
}

function enter(e){
	console.log('ENTER FUNCTION');
	e.target.style.backgroundColor = '#000';
}

function over(e){
	console.log('--OVER--');

	e.preventDefault();

	console.log(e.target.classList[0]);
	console.log('THIS IS THE TYPE FROM OVER FUNCTION: ' + e.type);

	if(/drop/i.test(e.target.classList[0])){
		console.log('TARGETED A DROPZONE');
		console.log(e.target.classList[0]);

		if(!document.querySelector('#dropzones').classList.contains('ohm'))
			readOut.textContent = e.target.parentNode.dataset.volt || '';
		else
			readOut.textContent = e.target.parentNode.dataset.ohm || '';

		return false;
	} else {
		console.log('NOT TARGETING A DROP ZONE!!!');
		console.log(e.target.classList[0]);

		probeContainer.appendChild(probe);

		if(!document.querySelector('#dropzones').classList.contains('ohm'))
			readOut.textContent = e.target.parentNode.dataset.volt || '';
		else
			readOut.textContent = e.target.parentNode.dataset.ohm || '';

		return false;
	}
	console.log('--OVER END--');
}

function exit(e){
	console.log('--EXIT--');

	if(e.target.style)
		e.target.removeAttribute('style');

	// window.setTimeout(function(){
		probeContainer.appendChild(probe);
		readOut.textContent = '';
	// });

	console.log('--EXIT END--');
}

function drop(e){
	console.log('--DROP--');

	e.preventDefault();
	e.stopPropagation();

	const data = e.dataTransfer.getData('text'),
		htmlnode = document.getElementById(data);

	e.target.parentNode.appendChild(htmlnode);
	console.log(probeContainer);

	if(!/drop/i.test(e.target.classList[0])){
		console.log('NOT A DROP TARGET');
		
		e.target.parentNode.appendChild(htmlnode);
	} else {
		console.log('IT\'S A DROP TARGET');

		probeContainer.appendChild(htmlnode);
		probe.removeAttribute('style');

		if(!document.querySelector('#dropzones').classList.contains('ohm'))
			readOut.textContent = e.target.parentNode.dataset.volt || '';
		else
			readOut.textContent = e.target.parentNode.dataset.ohm || '';
	}

	if(/drag/i.test(e.target.childNodes.classList)){
		console.log('TARGET IS A DRAG BOX');
	} else {
		console.log('ENDINGS OF THE DROP FUNCTION');
		console.log(e.target.parentNode.classList);

		e.target.removeAttribute('style');
		e.target.parentNode.appendChild(htmlnode);
		probe.removeAttribute('style');
	}

	// window.setTimeout(function(){
		htmlnode.classList.remove('hide');
		e.target.parentNode.style.zIndex = "99999999";
	// });

	console.log('--DROP END--');
	// return false;
}

/*********************************
*****  PROBE EVENT TRACKING  *****
*********************************/
function dragImg(e){
		console.log('--DRAGIMG--');

		// console.log('CLIENT X: ' + e.clientX);
		// console.log('CLIENT Y: ' + e.clientY);
		// console.log('SCREEN X: ' + e.screenX);
		// console.log('SCREEN Y: ' + e.screenY);
		// console.log('OFFSETWIDTH: ' + e.target.offsetWidth);
		// console.log('OFFSETHEIGHT: ' + e.target.offsetHeight);
		// console.log('GETBOUNDINGCLIENTRECT Y: ' + e.target.getBoundingClientRect().top);
		// console.log('GETBOUNDINGCLIENTRECT X: ' + e.target.getBoundingClientRect().left);
		// console.log('PROBE PAGEY: ' + e.pageY);
		// console.log('PROBE PAGEX: ' + e.pageX);
		// console.log('TARGET OFFSETHEIGHT: ' + e.target.offsetHeight);

		// console.log(e.target);

		// window.setTimeout(function(){
			let shiftY = (e.clientY - e.target.getBoundingClientRect().top) *.9,
				shiftX = (e.target.offsetWidth - (e.clientX - e.target.getBoundingClientRect().left)) *.9;

			e.target.style.position = 'absolute';
			e.target.style.zIndex = '999999';

			if(e.target.parentNode.classList.contains('drop-container')){
				e.target.style.top = shiftY *1.2 + 'px';
				e.target.style.right = shiftX *1.2 + 'px';
			} else {
				e.target.style.top = shiftY + 'px';
				e.target.style.right = shiftX + 'px';
			}
		// });
		
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

		// 	e.target.style.top = shiftY + 10 + 'px';
		// 	e.target.style.right = shiftX + 10 + 'px';
		// 	console.log('---------------------------  END DRAG TRACK  ---------------------------');
		// }

		console.log('--DRAGIMG END--');
		// return false;
}

function stopImg(e){
	console.log('--STOPIMG--');

	// window.setTimeout(function(){
		e.target.removeAttribute('style');
	// });

	console.log('--STOPIMG END--');
}

/*********************************
*****  ADD EVENT LISTENTERS  *****
*********************************/
[].forEach.call(dropArea, function (dz) {
	dz.addEventListener('drop', drop, false);
	dz.addEventListener('dragover', over, false);
	dz.addEventListener('dragenter', enter, false);
	dz.addEventListener('dragleave', exit, false);
});

probe.addEventListener('dragstart', start, false);
probe.addEventListener('drag', drag, false);
probe.addEventListener('dragend', ended, false);

probe.addEventListener('drag', dragImg);
probe.addEventListener('dragend', stopImg);
probe.addEventListener('mousedown', dragImg);
probe.addEventListener('mouseup', stopImg);
