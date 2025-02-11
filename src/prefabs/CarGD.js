class CarGD extends Phaser.GameObjects.Sprite {
    constructor(scene, car) {
        super(scene, width * ( Phaser.Math.Between(2, 4) / 5) - 70, -100, 'car')

        this.parentScene = scene
        this.parentCar = car

        this.parentScene.add.existing(this).setScale(precision)
        this.parentScene.physics.add.existing(this).setScale(precision)
        this.alpha = 0
        this.setTint(0x00FF00)

        this.sfxPlayed = false
    }
    update() {
        this.x = this.parentCar.x
        this.y = this.parentCar.y

        this.parentScene.physics.world.overlap(bcycle, this, this.bcycleGraze, null, this)

        if (gameOver) {
            this.alpha = 0
        }
    }

    bcycleGraze() {
        this.graze = this.parentScene.sound.add('grazeCar', {volume: 0.5})
        
        if (!this.sfxPlayed) {
            this.graze.play()
            this.sfxPlayed = true
        }

        //this.alpha = 0.25
        this.parentCar.setTint(0x00FF00)
        //console.log('grazing car')
        gdm = 5
    }
}