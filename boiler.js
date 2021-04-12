/*
 * Boilerplate
 */

// Global variables
var scene, renderer, camera, controls;

window.onload = function () {
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( new THREE.Color ("lightgrey"))
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.getElementById('theContainer').appendChild(renderer.domElement);

	// Create the scene
	scene = new THREE.Scene();

	// Put a camera into the scene
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(0, 3, 15);
    camera.lookAt(new THREE.Vector3(0,-2,0));
	scene.add(camera);

	makeSceneGraph()

	render()
	animate()
}

// Animation loop
function animate() {
	requestAnimationFrame( animate );
	controls.update()
}

// Render the scene
function render() {
	renderer.render( scene, camera );
}

// In case window is resized
window.onresize = function () {
	renderer.setSize( window.innerWidth, window.innerHeight );

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	render();
}
