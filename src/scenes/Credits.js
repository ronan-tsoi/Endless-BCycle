class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
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
        this.add.text(20, 20, 'credits', textConfig)
        this.add.text(20, 50, 'left to escape', textConfig)

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene')
        }
    }
}