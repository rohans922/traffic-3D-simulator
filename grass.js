/*
 *  Grass out of other library objects
 */
class Grass extends THREE.Object3D {
    constructor () {
        super()

        var grassMat = new THREE.MeshBasicMaterial ({ color: 0x1a5b1c })

        var triangle = new THREE.Geometry();
        var v1 = new THREE.Vector3(0,0,0);
        var v2 = new THREE.Vector3(190,0,0);
        var v3 = new THREE.Vector3(190,190,0);

        triangle.vertices.push(v1);
        triangle.vertices.push(v2);
        triangle.vertices.push(v3);

        triangle.faces.push( new THREE.Face3( 0, 1, 2 ) );
        triangle.computeFaceNormals();

        var grass = new THREE.Mesh(triangle, grassMat);
        grass.position.set (0, 0, 0)
        this.add(grass);

    }
}
