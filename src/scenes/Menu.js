class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }
    preload() {
        this.load.image('bcycle', './assets/bcycle.png')
        //replace with spritesheet later
        this.load.image('road', './assets/road.png')
        this.load.image('bar', './assets/bar.png')
        this.load.image('car', './assets/car.png')
    }
    create() {
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFFFFF',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
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