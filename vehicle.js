/*
 *  Vehicle out of other library objects
 */

class Vehicle extends THREE.Object3D {

    constructor (starting) {

    super()
    this.name = "vehicle";

    // creates a vehicle using many elements
    this.car = new THREE.MeshPhongMaterial ({ color: 0x830505, shininess: 50 })
    var glass = new THREE.MeshPhongMaterial ({ color: 0xbbe2e3, shininess: 100 })
    var hlight = new THREE.MeshPhongMaterial ({ color: 0xfffbf2, shininess: 130 })
    var tire = new THREE.MeshPhongMaterial ({ color: 0x282828 })
    var sel = new THREE.MeshBasicMaterial ({ color: 0x7a300b })
    this.intersecting = false
    this.start = starting;
    this.speed = 1;
    this.stop = false;

    var wheels = []
    for (var i = 0; i < 4; i++) {
        wheels[i] = new THREE.Mesh (
           new THREE.CylinderGeometry( 0.5, 0.5, 0.5/2, 32 ), tire)
        wheels[i].rotation.z = Math.PI / 2;
        this.add (wheels[i])
    }
    wheels[0].position.set (-1, 0, 0)
    wheels[1].position.set (1, 0, 0)
    wheels[2].position.set (-1, 0, -2)
    wheels[3].position.set (1, 0, -2)

    var middle = new THREE.Mesh (
        new THREE.BoxGeometry (2.2, 0.5, 4), this.car)
    middle.position.set (0, -0.3 + 3/4.0, -1)
    this.add (middle)

    var shape = new THREE.Shape();
    shape.moveTo(0.5,-2 );
    shape.lineTo( -0.5, -1.5 );
    shape.lineTo( -0.5, 0 );
    shape.lineTo( 0.6, 0.6 );

    var extrudeSettings = {
    	steps: 1,
    	depth: 0.1,
    	bevelEnabled: true,
    	   bevelThickness: 1,
    	bevelSize: 0.3,
    	bevelSegments: 5
    };

    var body = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    var bodyMain = new THREE.Mesh(body, this.car)
    bodyMain.position.set (0.05, 1, -0.6);
    bodyMain.rotation.y = -Math.PI / 2;
    bodyMain.rotation.z = -Math.PI / 2;

    var front = new THREE.Mesh(body, glass)
    front.rotation.y = -Math.PI / 2;
    front.rotation.z = -Math.PI / 2;
    front.position.set (0.05, 1, -0.49)
    front.scale.set(0.9,0.9,0.9);

    var back = new THREE.Mesh(body, glass)
    back.rotation.y = -Math.PI / 2;
    back.rotation.z = -Math.PI / 2;
    back.position.set (0.05, 1, -0.87)
    back.scale.set(0.9,0.9,0.9);

    this.add(bodyMain);
    this.add(front);
    this.add(back);

    var wind = new THREE.PlaneGeometry( 1, 0.8, 1);
    var hlightShape = new THREE.PlaneGeometry( 0.5, 0.23, 0.4);
    var leftWind = new THREE.Mesh(wind, glass );
    leftWind.position.set (-1.06, 1, -1.35)
    leftWind.rotation.y = -Math.PI / 2;

    var rightWind = new THREE.Mesh(wind, glass );
    rightWind.position.set (1.06, 1, -1.35)
    rightWind.rotation.y = Math.PI / 2;

    var leftLight = new THREE.Mesh(hlightShape, hlight );
    leftLight.position.set (-0.75, 0.45, 1.02)

    var rightLight = new THREE.Mesh(hlightShape, hlight );
    rightLight.position.set (0.75, 0.45, 1.02)

    var triangleShape = new THREE.Shape();
    triangleShape.moveTo(-0.5, -0.5);
    triangleShape.lineTo(0, 0.5);
    triangleShape.lineTo(0.5, -0.5);
    triangleShape.lineTo(-0.5, -0.5);

    // Create a new geometry by extruding the triangleShape
    // The option: 'amount' is how far to extrude, 'bevelEnabled: false' prevents beveling
    var triangle = new THREE.ExtrudeGeometry(triangleShape, {depth: 0.1, bevelEnabled: false});


    this.select = new THREE.Mesh(triangle, sel);
    this.select.position.set (0, 3, -1.2)
    this.select.rotation.z += Math.PI;
    this.add(this.select);
    this.select.visible = false;


    this.add(leftWind);
    this.add(rightWind);
    this.add(leftLight);
    this.add(rightLight);

    // this.vbox = new THREE.Box3().setFromObject(this);
    //
    // this.helper = new THREE.Box3Helper(this.vbox, 0xffff00 );

    }

    // checks if a vehicle is in the intersection point of the two roads
    inIntersection() {
        if (this.start == -90 && this.position.x > -1.5 && this.position.x < 3.3)
            return true;
        if (this.start == 90 && this.position.z > -1.5 && this.position.z < 3.3)
            return true;
        return false;
    }

    // starts the vehicle at a new random point
    restart () {
        var rand = Math.random() * (20-5) + 5;
        this.position.set (this.start * 1.5 * (rand/10), -5, -90 * 1.5 * (rand/10));
        this.speed = 1;
        this.stop = false;
        this.select.visible = false
        this.randomizeColor();
    }

    // randmizes the color of the vehicle
    randomizeColor () {
        this.car.color = new THREE.Color('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    }
}
