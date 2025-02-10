class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
    }

    create() {
        this.add.bitmapText(width/2, height/7, 'gem', 'CREDITS', 42, 1).setOrigin(0.5)

        this.add.bitmapText(width/2, height/4, 'gem', 'RONAN TSOI', 42, 1).setOrigin(0.5)
        this.add.bitmapText(width/2, height/4+40, 'gem', 'Design\nProgramming\nSpriting\nAnimations', 42, 1).setOrigin(0.5, 0)

        this.add.bitmapText(width/2, height/2+40, 'gem', 'CODE REFERENCES', 42, 1).setOrigin(0.5)
        this.add.bitmapText(width/2, height/2+80, 'gem', 'Nathan Altice - Paddle Parkour', 42, 1).setOrigin(0.5, 0)

        //this.add.bitmapText(width/2, height/2, 'gem', '', 42, 1).setOrigin(0.5)

        this.add.bitmapText(width/2, height-50, 'gem', 'LEFT to escape', 28, 1).setOrigin(0.5)
        //width/2, height-50

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        //this.add.bitmapText(width/2, height/2, 'gem', 'GAME OVER', 42, 1).setOrigin(0.5)

        this.busstop = this.add.sprite(width-160, height/6 , 'busstop', 0).setScale(3)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene')
        }
    }
}