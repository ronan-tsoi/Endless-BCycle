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
        //this.load.image('pedestrian', './assets/pedestrian.png')
        this.load.spritesheet('pedestrian', './assets/pedestrian-Sheet.png', {
            frameWidth: 18,
            frameHeight: 32
        })
        //setpieces
        this.load.image('trees1', './assets/sp-trees1.png')
        this.load.image('trees2', './assets/sp-trees2.png')
        this.load.image('field1', './assets/sp-field1.png')
        this.load.image('field2', './assets/sp-field2.png')
        this.load.image('lamppost', './assets/sp-lamppost.png')
        this.load.image('busstop', './assets/sp-busstop.png')
        this.load.image('squiggle', './assets/sp-squiggle.png')

        this.load.image('title', './assets/title.png')

        this.load.bitmapFont('gem', './assets/font/gem.png', './assets/font/gem.xml')
    }
    create() {
        //this.add.text(20, 20, 'menu', textConfig)

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

        this.title = this.add.sprite(width/2, height/3 , 'title', 0).setScale(4.5)

        //this.add.bitmapText(width/2, height/3, 'gem', 'ENDLESS BCYCLE', 72, 1).setOrigin(0.5)
        //this.add.bitmapText(width/2, height/2, 'gem', '', 42, 1).setOrigin(0.5)

        this.add.bitmapText(width/2, height - height/3, 'gem', '<-\nPLAY\n\n->\nCREDITS', 42, 1).setOrigin(0.5)



    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // play
            this.scene.start('tutorialScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // credits
            this.scene.start('creditsScene')
        }
    }
}