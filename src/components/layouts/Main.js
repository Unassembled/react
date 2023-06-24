import React, { Component } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';
// import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state={
            isMounted: true
        }
    }

    componentDidMount(){
        let annotation = document.querySelector('.annotation');
            annotation.style.display='block';
        let title = document.querySelector('h1');
            title.textContent = 'REACT & 3JS';
            
        this.sceneSetup();
        this.addCustomSceneObjects();
        this.startAnimationLoop();
    
        window.addEventListener('resize', this.handleWindowResize, {passive: false});
        console.log(document.querySelector('canvas').clientWidth, document.querySelector('canvas').clientHeight);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);

        this.controls.dispose();
    }

    componentDidUpdate() {   
        window.addEventListener('resize', this.handleWindowResize, false);        
    }

    // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
    // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
    sceneSetup = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            70, // fov = field of view
            width / height, // aspect ratio
            0.1, // near plane
            1000 // far plane
        );
        this.camera.position.x = 0;
        this.camera.position.y = 2;
        this.camera.position.z = 4; // is used here to set some distance from a cube that is located at z = 0

        // OrbitControls allow a camera to orbit around the object
        // https://threejs.org/docs/#examples/controls/OrbitControls
        this.controls = new OrbitControls( this.camera, this.mount );
        this.renderer = new THREE.WebGLRenderer({
            alpha:true,
            antialiasing:true
        });
        this.renderer.setSize( width, height );
        this.mount.appendChild( this.renderer.domElement ); // mount using React ref

        console.log(this.mount.clientWidth, this.mount.clientHeight);
    };

    // Here should come custom code.
    // Code below is taken from Three.js BoxGeometry example
    // https://threejs.org/docs/#api/en/geometries/BoxGeometry
    addCustomSceneObjects = () => {
        // const geometry = new THREE.BoxGeometry(1, 1, 1);

        /************************
        *****  GLTF LOADER  *****
        ************************/
        const loader = new GLTFLoader();
        // const downloader = new URL('../car/FuturCar-processed.glb',import.meta.url);
        loader.load('/car/FutureCar-processed.glb', gltf => {
        // loader.load('/sphere-bot/Sphere%20Bot%20Basic%206.gltf', gltf => {
        // loader.load('/cgtrader/dragon.glb', gltf => {
        // loader.load('/macross/model.gltf', gltf => {
        // loader.load('/star-wars-scene/model.gltf', gltf => {
        // loader.load('/concept-car/concept2.gltf', gltf => {
        // loader.load('/gladius/Gladius.gltf', gltf => {
        // loader.load('/police-drone/scene.gltf', gltf => {
        // loader.load('/macross-max-vs-miriya/model.gltf', gltf => {
        // loader.load('/x-wing/model.gltf', gltf => {
        // loader.load('/helmet/DamagedHelmet.gltf', gltf => {
        // loader.load('/city/VC.gltf', gltf => {
        // loader.load('/lambo2/Lamborghini_Aventador.gltf', gltf => {
        // loader.load('/porsche/model.gltf', gltf => {

            let obj = gltf.scene;
            obj.traverse(node => {
                if (!node.isMesh) return;
                node.material.wireframe = true;
                // node.geometry.center();
            });

            /*******************************
             *****  ADDING GRID HELPER  *****
            ********************************/
            let size = 0,
                divisions = 0;

            this.gridHelper = new THREE.GridHelper(size, divisions);

            this.scene.add(this.gridHelper);
            this.scene.add(obj);
        });

        /***********************
        *****  OBJ LOADER  *****
        ***********************/
        // const loader = new OBJLoader();
        // const geometry = loader.load( 'bugatti/Lotus%20Elise.obj', object => {
        //   let obj = object.scene;

        //   this.scene.add(obj);
        // });

        /***************************
        *****  COLLADA LOADER  *****
        ***************************/
        // const loader = new ColladaLoader();
        // const geometry = loader.load( 'santa-barbara-mission/model.dae', collada => {
        //   let obj = collada.scene;

        //   this.scene.add(obj);
        // });

        /****************************************
        *****  ADDING MULTIPLE POINTLIGHTS  *****
        ****************************************/
        const lights = [];

        /***************************
        *****  AMBIENT LIGHTS  ***** 
        ***************************/
        lights[ 0 ] = new THREE.AmbientLight( 0xffffff, 1.75 );
        lights[ 1 ] = new THREE.AmbientLight( 0xffffff, 1 );
        lights[ 2 ] = new THREE.AmbientLight( 0xffffff, 1 );

        /*************************
        *****  POINT LIGHTS  ***** 
        *************************/
        // lights[ 0 ] = new THREE.PointLight( 0xffffff, 1 );
        // lights[ 1 ] = new THREE.PointLight( 0xffffff, 1 );
        // lights[ 2 ] = new THREE.PointLight( 0xffffff, 1 );

        /*******************************
        *****  DIRECTIONAL LIGHTS  ***** 
        *******************************/
        // lights[ 0 ] = new THREE.DirectionalLight( 0xffffff, 1 );
        // lights[ 1 ] = new THREE.DirectionalLight( 0xffffff, 1 );
        // lights[ 2 ] = new THREE.DirectionalLight( 0xffffff, 1 );

        /****************************
        *****  LIGHT POSITIONS  ***** 
        ****************************/
        // lights[ 0 ].position.set( 0, 3, 0 );
        // lights[ 1 ].position.set( 0, -1, 0 );
        // lights[ 2 ].position.set( 1, 0, -1 );

        this.scene.add( lights[ 0 ] );
        // this.scene.add( lights[ 1 ] );
        // this.scene.add( lights[ 2 ] );

        // const targetObject = new THREE.Object3D();
        // const sphereSize = 12;

        // const pointLightHelper1 = new THREE.PointLightHelper( lights[0], sphereSize ),
        //     pointLightHelper2 = new THREE.PointLightHelper( lights[1], sphereSize ),
        //     pointLightHelper3 = new THREE.PointLightHelper( lights[2], sphereSize );

        // this.scene.add( pointLightHelper1 );
        // this.scene.add( pointLightHelper2 );
        // this.scene.add( pointLightHelper3 );
    };

    handleWindowResize = () => {
        // const width = this.mount.clientWidth;
        // const height = this.mount.clientHeight;

        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;

        // Note that after making changes to most of camera properties you have to call
        // .updateProjectionMatrix for the changes to take effect.
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( width, height );
    };

    startAnimationLoop = () => {
        // this.scene.rotation.x += 0.01;
        this.scene.rotation.y += 0.001;

        // this.renderer.setClearColor(0x00bfff, .3);
        this.renderer.render( this.scene, this.camera );

        // The window.requestAnimationFrame() method tells the browser that you wish to perform
        // an animation and requests that the browser call a specified function
        // to update an animation before the next repaint
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    };

    render() {
        return ( <div id={`main-container`} ref={ref => (this.mount = ref)} /> );
    }
}

export default Main;