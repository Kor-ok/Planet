import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 1. Basic Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 1.5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// 2. Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Adds smooth inertia

// 3. Lighting (Crucial so your planet isn't pitch black)
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(-10, -0, -0.5);
scene.add(directionalLight);

// 4. Load the GLTF Planet Model
const loader = new GLTFLoader();
loader.load(
    'models/Burnham.gltf',
    (gltf) => {
        scene.add(gltf.scene);
        console.log('Planet loaded successfully!');
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.error('An error occurred while loading the model:', error);
    }
);

// 5. Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 6. Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Required if damping is enabled
    renderer.render(scene, camera);
}
animate();