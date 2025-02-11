class Pedestrian extends Phaser.GameObjects.Sprite {
    constructor(scene, velocity) {
        super(scene, width * (Math.random() * (0.7 - 0.3) + 0.3), -4000, 'pedestrian')

        this.parentScene = scene

        this.parentScene.add.existing(this).setScale(2)
        this.parentScene.physics.add.existing(this).setScale(2)
        this.body.velocity.y = velocity * df

        this.dir = 1

        this.GD = new PedestrianGD(scene, this)
    }
    update() {
        this.GD.update()
        if (gameOver) {
            this.body.velocity.y = 0
        }

        if (this.dir < 0.5) {
            this.x += 1.7
        } else {
            this.x -= 1.7
        }

        if(this.y > 2000) {
            this.y = -18
            this.GD.alpha = 0
            this.GD.sfxPlayed = false
            this.setTint(0xFFFFFF)

            this.dir = Math.random()
            if (this.dir < 0.5) {
                this.setFlipX(true)
            } else {
                this.setFlipX(false)
            }

           this.x = width * (Math.random() * (0.7 - 0.3) + 0.3)

        }
    }
}