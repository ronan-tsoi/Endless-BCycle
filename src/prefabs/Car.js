class Car extends Phaser.GameObjects.Sprite {
    constructor(scene, velocity) {
        super(scene, width * ( Phaser.Math.Between(2, 4) / 5) - 70, -100, 'car')
        //super(scene, width/2, -100, 'car')

        this.parentScene = scene

        this.parentScene.add.existing(this).setScale(2)
        this.parentScene.physics.add.existing(this).setScale(2)
        //this.setVelocityY(velocity)
        this.body.velocity.y = velocity
        //this.setImmovable()
        this.newCar = true
    }
    update() {
        if(this.newCar && this.y > height/2) {
            this.parentScene.addCar(this.parent, this.velocity)
            this.newCar = false
        }
        if(this.y > height + this.height) {
            this.destroy()
        }
    }
}