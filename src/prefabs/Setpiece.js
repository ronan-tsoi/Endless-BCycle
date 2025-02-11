class Setpiece extends Phaser.GameObjects.Sprite {
    constructor(scene, velocity) {
        super(scene, 90 + ( Phaser.Math.Between(0, 1) * (width-180) ), -100, sp[Phaser.Math.Between(0,sp.length)])

        this.parentScene = scene

        this.parentScene.add.existing(this).setScale(3)
        this.parentScene.physics.add.existing(this).setScale(3)

        this.body.velocity.y = velocity * df

        this.newSP = true

        if (this.x == 90) {
            this.setFlipX(true)
        }
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