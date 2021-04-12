/*
 *  Road out of other library objects
 */

class Road extends THREE.Object3D {
    constructor () {
   super()
   
    var road = new THREE.MeshPhongMaterial ({ color: 0x2d2d2d, shininess: 2 })
    var line = new THREE.MeshPhongMaterial ({ color: 0xf7f7f7, shininess: 2 })

    var roadShape = new THREE.PlaneGeometry(4, 170, 1);
    var roadLine = new THREE.PlaneGeometry(0.2, 170, 1);

    var main = new THREE.Mesh(roadShape, road);
    main.position.set (0, 0, 0)
    main.rotation.x -= Math.PI / 2 ;
    var leftLine = new THREE.Mesh(roadLine, line);
    leftLine.position.set (1.6, 0.01, 0)
    leftLine.rotation.x -= Math.PI / 2 ;
    var rightLine = new THREE.Mesh(roadLine, line);
    rightLine.position.set (-1.6, 0.01, 0)
    rightLine.rotation.x -= Math.PI / 2 ;

    this.add(main);
    this.add(leftLine);
    this.add(rightLine);
    }
}
