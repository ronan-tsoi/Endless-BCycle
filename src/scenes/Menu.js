class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }
    preload() {
        //this.load.image('bcycle', './assets/bcycle.png')
        //replace with spritesheet later
        this.load.spritesheet('bcycle', './assets/bcycle-Sheet.png', {
            frameWidth: 18,
            frameHeight: 48
        })
        this.load.image('road', './assets/road.png')
        this.load.image('bar', './assets/bar.png')
        this.load.image('car', './assets/car.png')
        this.load.image('pedestrian', './assets/pedestrian.png')
    }
    create() {
        this.add.text(20, 20, 'menu', textConfig)

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // play
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // credits
            this.scene.start('creditsScene')
        }
    }
}