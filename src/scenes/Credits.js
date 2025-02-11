class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
    }

    create() {
        this.add.bitmapText(width/2, height/9, 'gem', 'CREDITS', 42, 1).setOrigin(0.5)

        this.add.bitmapText(width/2, height/5, 'gem', 'RONAN TSOI', 36, 1).setOrigin(0.5)
        this.add.bitmapText(width/2, height/5+40, 'gem', 'Design\nProgramming\n Art & Animations', 32, 1).setOrigin(0.5, 0)

        this.add.bitmapText(width/2, height/5+220, 'gem', 'CODE REFERENCES', 36, 1).setOrigin(0.5)
        this.add.bitmapText(width/2, height/5+260, 'gem', 'Paddle Parkour - Nathan Altice', 32, 1).setOrigin(0.5, 0)

        this.add.bitmapText(width/2, height/5+360, 'gem', 'AUDIO', 36, 1).setOrigin(0.5)
        this.add.bitmapText(width/2, height/5+400, 'gem', '8-Bit Bossa - Joth (OpenGameArt)\nopengameart.org/content/bossa-nova\nSFX made with jsfxr', 32, 1).setOrigin(0.5, 0)

        this.add.bitmapText(width/2, height/5+590, 'gem', 'Informally playtested by pals', 28, 1).setOrigin(0.5)
        this.add.bitmapText(width/2, height/5+630, 'gem', 'Carmen, Mike, Amelia', 28, 1).setOrigin(0.5)

        this.add.bitmapText(width/2, height-50, 'gem', 'LEFT to escape', 28, 1).setOrigin(0.5)

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)

        this.busstop = this.add.sprite(width-160, height/6 , 'busstop', 0).setScale(3)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('select')
            this.scene.start('menuScene')
        }
    }
}