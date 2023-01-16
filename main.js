import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { MathUtils } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


console.log("ASDASDSA");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);



renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

const material = new THREE.MeshStandardMaterial( {color: 0xFF6374} );

const torus = new THREE.Mesh(geometry, material);

//scene.add(torus);


var pointslights = [];
const pointLight = new THREE.PointLight(0xF8FFBF);
pointLight.position.set(5, 5, 5);
pointLight.intensity = 0.5;
pointslights.push(pointLight);
scene.add(pointLight);
const pointLight2 = new THREE.PointLight(0xF8FFBF);
pointLight2.position.set(12, 1, 5);
pointLight2.intensity = 0.5;
scene.add(pointLight2);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 0.5;

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper, ambientLight, lightHelper);


const controls = new OrbitControls(camera, renderer.domElement);


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('/azhan3/azhan3/assets/space.png');
scene.background = spaceTexture;


const loader = new GLTFLoader();

var volleyball;

loader.load( '/azhan3/assets/voleyball.glb', function ( gltf ) {
  volleyball = gltf.scene;
	//scene.add( volleyball);

}, undefined, function ( error ) {

	console.error( error );

} );


var world;
loader.load( '/azhan3/assets/world.glb', function ( gltf ) {
  world = gltf.scene;
  world.position.set(10, 25, 5);
  world.scale.set(2, 2, 2)
  
  scene.add( world );

}, undefined, function ( error ) {

	console.error( error );

} );
const pointLightV = new THREE.PointLight(0xF8FFBF);
pointLightV.position.set(10, 30, 5);
pointLightV.intensity = 2;
//scene.add(pointLightV);

var windmill;





var duck;
loader.load( '/azhan3/assets/Duck.glb', function ( gltf ) {
  duck = gltf.scene;
  duck.position.set(100, 0, -100);
  duck.scale.set(15, 15, 15);
  duck.rotation.y = -90;
  scene.add( duck );

}, undefined, function ( error ) {

	console.error( error );

} );


//camera.lookAt(85, 10, -100)



function animate() {
  requestAnimationFrame(animate);
  //torus.rotation.x += 0.01;
  //torus.rotation.y += 0.005;
  //torus.rotation.z += 0.01;
  if (volleyball) {
    volleyball.rotation.x += 0.01;
    volleyball.rotation.y += 0.005;
    volleyball.rotation.z += 0.01;
  }


  //world.rotation.y += 0.01;


  renderer.render(scene, camera);
}
animate();

function removeEntity(object) {
  var selectedObject = scene.getObjectByName(object.name);
  console.log(selectedObject);
  scene.remove( selectedObject );
  animate();
}

var prevT = 0;
var About_me_boundary = false;
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  console.log(prevT - t);
  if (t < -625 && (prevT - t) > 0 && !About_me_boundary) {
    About_me_boundary = true;
    console.log("YESSS");
    loader.load( '/azhan3/assets/windmill.glb', function ( gltf ) {
      windmill = gltf.scene;
      windmill.name = "windmill";
      windmill.position.set(28, 49, 100);
      windmill.scale.set(8, 8, 8);
      scene.add( windmill );
    
    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );
  } else if (t > -625 && (prevT - t) && About_me_boundary) {
    console.log("NOOOO");
    removeEntity(windmill);
    About_me_boundary = false;
  }
  if (t > -975) {
    camera.position.z = t * -0.1 + 25;
    camera.position.x = t * -0.02 + 10;
    camera.position.y = t * -0.002 + 50;
    camera.rotation.y = t * -0.000300;
  }
  
  if ((prevT - t) > 0) {
    world.rotation.y += 0.05;
  } else world.rotation.y -= 0.05;

  prevT = t;
  

}

document.body.onscroll = moveCamera
moveCamera();

