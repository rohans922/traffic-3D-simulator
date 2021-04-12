/*
 *  Background sky out of other library objects
 */
class Background extends THREE.Object3D {
    constructor () {
    super()

    var daySky = new THREE.MeshBasicMaterial ({ color: 0xade6ff })
    daySky.side = THREE.BackSide;

    var box = new THREE.BoxGeometry(170,100,170);
    var sky = new THREE.Mesh(box, daySky);
    sky.position.set (0, 0, 0)
    this.add(sky);

    }
}
