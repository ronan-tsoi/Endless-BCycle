class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    create() {

        //this.displayMultiplier = this.add.bitmapText(width/2, 90, 'gem', ' ', 32, 1).setOrigin(0.5)
        this.add.bitmapText(width/2, height/3, 'gem', Phaser.Math.RoundTo(score), 128, 1).setOrigin(0.5)
        this.add.bitmapText(width/2, height/2, 'gem', 'GAME OVER', 42, 1).setOrigin(0.5)

        this.add.bitmapText(width/2, height - height/4, 'gem', '<-\nRETRY\n\n->\nMAIN MENU', 42, 1).setOrigin(0.5)

        this.trees1 = this.add.sprite(width-90, height/3 , 'trees1', 0).setScale(3)
        this.trees2 = this.add.sprite(90, height/3 , 'trees1', 0).setScale(3)
        this.trees2.setFlipX(true)

        //this.add.text(20, 50, 'left to retry, right to menu', textConfig)

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // play
            if (score == 0) {
                this.scene.start('tutorialScene')
            } else {
                this.scene.start('playScene')
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // menu
            this.scene.start('menuScene')
        }
    }
}