/*
 *  Sun out of other library objects
 */
class Sun extends THREE.Object3D {
    constructor () {
   super()
    var sunTexture = new THREE.MeshPhongMaterial ({ color: 0xffef77, shininess: 2 })

    var circle = new THREE.CircleGeometry( 5, 32 );
    var sun = new THREE.Mesh(circle, sunTexture);
    this.add( sun);
    this.flip = true;

    }

    tick () {
        if (this.rotation.y > 0.2)
            this.flip = false;
        if (this.rotation.y < 0)
            this.flip = true;
        if (this.flip)
            this.rotation.y += 0.01;
        else
            this.rotation.y -= 0.01;

        this.rotation.z += 0.01;

    }
}
