class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }
    preload() {
        this.load.spritesheet('bcycle', './assets/bcycle-Sheet.png', {
            frameWidth: 18,
            frameHeight: 48
        })
        this.load.image('road', './assets/road.png')
        this.load.image('bar', './assets/bar.png')
        this.load.image('car', './assets/car.png')
        this.load.spritesheet('pedestrian', './assets/pedestrian-Sheet.png', {
            frameWidth: 18,
            frameHeight: 32
        })
        this.load.image('pdisplay', './assets/pedestrian.png')
        
        //setpieces
        this.load.image('trees1', './assets/sp-trees1.png')
        this.load.image('trees2', './assets/sp-trees2.png')
        this.load.image('field1', './assets/sp-field1.png')
        this.load.image('field2', './assets/sp-field2.png')
        this.load.image('lamppost', './assets/sp-lamppost.png')
        this.load.image('busstop', './assets/sp-busstop.png')
        this.load.image('squiggle', './assets/sp-squiggle.png')

        this.load.audio('select', './assets/audio/select.wav')
        this.load.audio('playStart', './assets/audio/playStart.wav')

        this.load.audio('8bit-Bossa', './assets/audio/8bit-Bossa.mp3')

        this.load.audio('crash', './assets/audio/crash.wav')
        this.load.audio('grazeCar', './assets/audio/grazeCar.wav')
        this.load.audio('grazePedestrian', './assets/audio/grazePedestrian.wav')

        this.load.image('title', './assets/title.png')

        this.load.bitmapFont('gem', './assets/font/gem.png', './assets/font/gem.xml')
    }
    create() {
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.anims.create( {
            key: 'bike',
            frameRate: 12,
            repeat: 4,
            frames: this.anims.generateFrameNumbers('bcycle', {
                start: 0,
                end: 3
            })
        })
        this.anims.create( {
            key: 'pedestrian-walking',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('pedestrian', {
                start: 0,
                end: 1
            })
        })

        this.title = this.add.sprite(width/2-10, height/4 , 'title', 0).setScale(4.5)

        this.add.bitmapText(width/2, height - height/3, 'gem', 'ARROW KEYS\n\n<-\nPLAY\n\n->\nCREDITS', 42, 1).setOrigin(0.5)

        this.trees1 = this.add.sprite(width-90, height-height/4 , 'trees1', 0).setScale(3)
        this.trees2 = this.add.sprite(90, height-height/4 , 'trees1', 0).setScale(3)
        this.trees2.setFlipX(true)



    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // play
            this.sound.play('playStart')
            this.scene.start('tutorialScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // credits
            this.sound.play('select')
            this.scene.start('creditsScene')
        }
    }
}