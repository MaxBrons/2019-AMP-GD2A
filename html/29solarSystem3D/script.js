let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let testGeometry = new THREE.BoxGeometry(2, 2, 2);
let testMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
let testMesh = new THREE.Mesh(testGeometry, testMaterial);
scene.add(testMesh);

let directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position = testGeometry.position;
directionalLight.position.x -= 10
scene.add(directionalLight);

let loader = new THREE.TextureLoader();
let earthMaterial = new THREE.MeshLambertMaterial({
  map: loader.load('media/2k_earth_daymap.jpg'),
});

let sphereGeometry = new THREE.SphereGeometry(1, 16, 16);
let earth = new THREE.Mesh(sphereGeometry, earthMaterial);
scene.add(earth);
let earthSpherical = new THREE.Spherical(2, Math.PI / 2, 0);
//earth.position.x = 3;

let testGeometrySpherical = new THREE.Spherical(2, 30, 0);

camera.position.z = 4;
camera.position.y = 3;
camera.lookAt(new THREE.Vector3(0, 0, 0))

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  testMesh.rotation.x += 0.01;
  testMesh.rotation.y += 0.01;

  earthSpherical.theta += 0.01
  earth.position.setFromSpherical(earthSpherical)

  testGeometrySpherical.theta += 0.01;
  directionalLight.position.setFromSpherical(testGeometrySpherical);

  earth.rotation.y += 0.01;
}
  animate();