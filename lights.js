/*
 * An object to hold the lights,
 */


class Lights {
    constructor () {

	this.mainLight = new THREE.DirectionalLight ("white", 0.4)
	this.mainLight.position.set (0, 1, 0)
	scene.add (this.mainLight)

	// Fill light
	this.fillLight = new THREE.DirectionalLight ("white", 0.8)
	this.fillLight.position.set (-1, 0, 1 )
	scene.add (this.fillLight)

	// Ambient light
	this.ambientLight = new THREE.AmbientLight (0x404040, 1)
	scene.add (this.ambientLight);
    }

    // Callback from checkboxes
    pressed (state, light) {
	light.visible = state
	render ()
    }
}
