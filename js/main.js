import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let object;
let controls;
let renderedObject = 'donut'; // Default model

const loader = new GLTFLoader();

function loadModel(modelName) {
  loader.load(
    `models/${modelName}/scene.gltf`,
    function (gltf) {
      scene.remove(object);
      object = gltf.scene;
      scene.add(object);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
      console.error(error);
    }
  );

  camera.position.z = modelName === 'donut' ? 0.2 : 40;

  if (modelName === 'donut') {
    controls = new OrbitControls(camera, renderer.domElement);
  }
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000); 
document.getElementById("container3D").appendChild(renderer.domElement);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, renderedObject === 'donut' ? 5 : 1);
scene.add(ambientLight);

if (renderedObject === 'donut') {
  loadModel(renderedObject);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);


function switchModel(modelName) {
  console.log(`Switching to ${modelName} model`);
  renderedObject = modelName; // Update the renderedObject variable
  loadModel(modelName);
}

// Listen for custom 'modelChange' events dispatched from index.html
window.addEventListener('modelChange', (event) => {
  const modelName = event.detail;
  console.log(`Received model change event: ${modelName}`);
  switchModel(modelName);
});

animate();