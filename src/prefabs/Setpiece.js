class Setpiece extends Phaser.GameObjects.Sprite {
    constructor(scene, velocity) {
        super(scene, 60 + ( Phaser.Math.Between(0, 1) * (width-120) ), -100, 'sp-trees1')

        this.parentScene = scene

        this.parentScene.add.existing(this).setScale(2)
        this.parentScene.physics.add.existing(this).setScale(2)

        //this.setVelocityY(velocity)
        this.body.velocity.y = velocity * df
        //this.setImmovable()
        this.newSP = true
    }
    update() {
        if (gameOver) {
            this.body.velocity.y = 0
        }
        if(this.newSP && this.y > height/2) {
            this.parentScene.addSP(this.parent, this.velocity)
            this.newSP = false
        }
        if(this.y > height + this.height) {
            this.destroy()
        }
    }
}