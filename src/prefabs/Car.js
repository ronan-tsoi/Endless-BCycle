class Car extends Phaser.GameObjects.Sprite {
    constructor(scene, velocity) {
        super(scene, width * ( Phaser.Math.Between(2, 4) / 5) - 70, -100, 'car')

        this.parentScene = scene

        this.parentScene.add.existing(this).setScale(2)
        this.parentScene.physics.add.existing(this).setScale(2)

        this.body.velocity.y = velocity * df
        this.body.setDragX(1500)
    
        this.newCar = true

        this.GD = new CarGD(scene, this)
    }
    update() {
        this.GD.update()
        if (gameOver) {
            this.body.velocity.y = -2000
        }
        if(this.newCar && this.y > height/2) {
            this.parentScene.addCar(this.parent, this.velocity)
            this.newCar = false
        }
        if(this.y > height + this.height) {
            this.destroy()
            this.GD.destroy()
        }
    }
}