class PedestrianGD extends Phaser.GameObjects.Sprite {
    constructor(scene, pedestrian) {
        super(scene, width * (Math.random() * (0.7 - 0.3) + 0.3), -40, 'pedestrian')

        this.parentScene = scene
        this.parentPedestrian = pedestrian

        this.parentScene.add.existing(this).setScale(precision*1.5)
        this.parentScene.physics.add.existing(this).setScale(precision*1.5)

        this.alpha = 0
        this.setTint(0x00FF00)

        this.sfxPlayed = false

    }
    update() {
        this.x = this.parentPedestrian.x
        this.y = this.parentPedestrian.y
        
        this.parentScene.physics.world.overlap(bcycle, this, this.bcycleGraze, null, this)

        if (gameOver) {
            this.alpha = 0
        }
    }

    bcycleGraze() {
        this.graze = this.parentScene.sound.add('grazePedestrian', {volume: 0.25})
        
        if (!this.sfxPlayed) {
            this.graze.play()
            this.sfxPlayed = true
        }

        //this.alpha = 0.25
        this.parentPedestrian.setTint(0x00FF00)
        //console.log('grazing pedestrian')
        gdm = 15
    }
}