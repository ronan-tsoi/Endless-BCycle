class CarGD extends Phaser.GameObjects.Sprite {
    constructor(scene, car) {
        super(scene, width * ( Phaser.Math.Between(2, 4) / 5) - 70, -100, 'car')
        //super(scene, width/2, -100, 'car')

        this.parentScene = scene
        this.parentCar = car

        this.parentScene.add.existing(this).setScale(precision)
        this.parentScene.physics.add.existing(this).setScale(precision)
        this.alpha = 0
        this.setTint(0xFF0000)
    }
    update() {
        this.x = this.parentCar.x
        this.y = this.parentCar.y

        this.parentScene.physics.world.overlap(bcycle, this, this.bcycleGraze, null, this)
        //this.alpha = 0

        if (gameOver) {
            this.alpha = 0
        }
    }

    bcycleGraze() {
        this.alpha = 0.25
        console.log('grazing car')
        gdm = 5
    }
}