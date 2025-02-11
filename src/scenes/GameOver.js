class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    create() {
        this.add.bitmapText(width/2, height/3, 'gem', Phaser.Math.RoundTo(score), 128, 1).setOrigin(0.5)
        this.add.bitmapText(width/2, height/2, 'gem', 'GAME OVER', 42, 1).setOrigin(0.5)

        this.add.bitmapText(width/2, height - height/4, 'gem', '<-\nRETRY\n\n->\nMAIN MENU', 42, 1).setOrigin(0.5)

        this.trees1 = this.add.sprite(width-90, height/3 , 'trees1', 0).setScale(3)
        this.trees2 = this.add.sprite(90, height/3 , 'trees1', 0).setScale(3)
        this.trees2.setFlipX(true)

        this.pedestrian = this.add.sprite(width/2-5, height/6 , 'pdisplay', 0).setScale(3)

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('playStart')
            // play
            if (score == 0) {
                this.scene.start('tutorialScene')
            } else {
                this.scene.start('playScene')
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // menu
            this.sound.play('select')
            this.scene.start('menuScene')
        }
    }
}