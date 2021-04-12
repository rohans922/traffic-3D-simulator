/*
 *  Scene class
 */
class Scene extends THREE.Object3D {
    constructor () {
        super()

        // vehicles in a list so timer can access
        this.vehicles = []
        this.score = 0
        // sky
        this.background = new Background ()
        this.background.position.set (0, 0, -100)
        this.background.rotation.y -= Math.PI / 4 ;
        this.add(this.background)
        // grass
        this.grass = new Grass ()
        this.grass.position.set (-134, -5.1, -110)
        this.grass.rotation.x -= Math.PI / 2;
        this.grass.rotation.z -= Math.PI / 4;
        this.add(this.grass)
        // sun - has independent animations
        this.sun = new Sun ()
        this.sun.rotation.z += Math.PI / 4;
        this.sun.position.set (-20, 10, -30)
        this.add(this.sun)

        // road
        this.roadLeft = new Road ()
        this.roadLeft.position.set (45, -5, -45)
        this.roadLeft.rotation.y -= Math.PI / 4 ;
        this.add(this.roadLeft)
        this.roadRight = new Road ()
        this.roadRight.position.set (-45, -5, -45)
        this.roadRight.rotation.y += Math.PI / 4 ;
        this.add(this.roadRight)

        // loop that creates all vehicles and assigns properties
        for (var i = 0; i < 2; i++) {
            var rand = Math.random() * (10-4) + 4;
            this.vehicles[i] = new Vehicle (-90)
            this.vehicles[i].randomizeColor();
            this.vehicles[i].position.set (-90 * ((i+1) * (rand/10)), -5, -90 * ((i+1) * (rand/10)))
            this.vehicles[i].rotation.y += Math.PI / 4;
            this.add (this.vehicles[i])
            rand = Math.random() * (10-4) + 4;
            this.vehicles[i+2] = new Vehicle (90)
            this.vehicles[i+2].randomizeColor();
            this.vehicles[i+2].position.set (90 * ((i+1) * (rand/10)), -5, -90 * ((i+1) * (rand/10)))
            this.vehicles[i+2].rotation.y -= Math.PI / 4;
            this.add (this.vehicles[i+2])
        }
    }

    // randomizes the colors of every vehicle by looping
    randomizeColors () {
        for (var i = 0 ; i < 4; i++) {
            this.vehicles[i].randomizeColor();
        }
    }

    // timer tick
    tick () {
        // animates the sun
        this.sun.tick();
        // moves the vehicles
        for (var i = 0; i < 2; i++) {
            this.vehicles[i].position.x += (0.35*this.vehicles[i].speed);
            this.vehicles[i].position.z += (0.35*this.vehicles[i].speed);

            this.vehicles[i+2].position.x -= (0.35*this.vehicles[i+2].speed);
            this.vehicles[i+2].position.z += (0.35*this.vehicles[i+2].speed);
        }
        // checks for crash and off screen
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (i != j && j-i == 2) {
                    if (this.vehicles[i].inIntersection() && this.vehicles[j].inIntersection()) {
                        toggleGame(true);
                    }
                }
            }
            if (this.vehicles[i].position.z > 10 && this.vehicles[i].start == -90) {
                this.vehicles[i].restart()
                // this.vbox[i].setFromObject(this.vehicles[i])
                break;
            }
            if (this.vehicles[i].position.x < -7 && this.vehicles[i].start == 90) {
                this.vehicles[i].restart()
                // this.vbox[i].setFromObject(this.vehicles[i])
                break;
            }

            if (this.vehicles[i].stop && this.vehicles[i].start == -90 && this.vehicles[i].position.z > -3.9) {
                this.vehicles[i].speed = 0;
            }

            if (this.vehicles[i].stop && this.vehicles[i].start == 90 && this.vehicles[i].position.x < 3.9) {
                this.vehicles[i].speed = 0;
            }

            // these all allow for the car to stop behind the one ahead of it if stopped, and speed up if started again
            if (this.vehicles[2].stop && this.vehicles[3].position.x < 7.2)
                this.vehicles[3].speed = 0;
            if (this.vehicles[2].speed == 1.1)
                this.vehicles[3].speed = 1;
            if (this.vehicles[3].stop && this.vehicles[2].position.x < 7.2)
                this.vehicles[2].speed = 0;
            if (this.vehicles[3].speed == 1.1)
                this.vehicles[2].speed = 1;
            if (this.vehicles[0].stop && this.vehicles[1].position.z > -7.2)
                this.vehicles[1].speed = 0;
            if (this.vehicles[0].speed == 1.1)
                this.vehicles[1].speed = 1;
            if (this.vehicles[1].stop && this.vehicles[0].position.z > -7.2)
                this.vehicles[0].speed = 0;
            if (this.vehicles[1].speed == 1.1)
                this.vehicles[0].speed = 1;
            if (this.vehicles[i].inIntersection())
                this.score += 2;

        }
    render();
    }
}
