class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene')
    }

    init() {
        this.BCYCLE_VELOCITY = 120
        this.CAR_SPEED = 200
    }

    create() {
        df = 0.8
        score = 0

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        cursors = this.input.keyboard.createCursorKeys();

        //road bounds
        this.leftBound = this.physics.add.sprite(width/16, height/2, 'bar').setScale(4.7)
        this.leftBound.body.setImmovable(true)
        this.rightBound = this.physics.add.sprite(width - width/16, height/2, 'bar').setScale(4.7)
        this.rightBound.body.setImmovable(true)
        this.bounds = this.add.group([this.leftBound, this.rightBound])

        //tile sprite
        this.road = this.add.tileSprite(width/2, height/2, 240, 480, 'road').setScale(2)

        //create BCyclist
        //let bcycle
        bcycle = this.physics.add.sprite(width/2, height - (height/4), 'bcycle', 0).setScale(2)
        bcycle.body.setSize(14)
        bcycle.setDragX(2900)
        //cycle.setMaxVelocity(0, 700)
        this.physics.add.collider(bcycle, this.bounds)

        //car group
        this.carGroup = this.add.group({
            runChildUpdate: true
        })
        this.time.delayedCall(5500, () => {
            this.addCar()
        })
        this.physics.add.collider(this.carGroup, this.bounds)

        //pedestrian
        pedestrian = new Pedestrian(this, 950)
        pedestrian.y = -5200
        pedestrian.play('pedestrian-walking')

        //this.add.text(20, 20, 'awesome gameplay here', textConfig)
        //this.add.text(20, 50, 'space for game over (debug)', textConfig)

        //this.displayScore = this.add.text(width/2, 50, '', textConfig).setOrigin(0.5)
        //this.displayMultiplier = this.add.text(width/2, 80, '', textConfig).setOrigin(0.5)
        this.displayMultiplier = this.add.bitmapText(width/2, 90, 'gem', ' ', 32, 1).setOrigin(0.5)
        this.displayMultiplier.displayOriginY = 0
        this.displayMultiplier.setDepth(10)
        
        //this.displayScore = this.add.text(width/2, height-50, 'Press SPACE to skip', textConfig).setOrigin(0.5)
        this.displayScore = this.add.bitmapText(width/2, height-50, 'gem', 'Press SPACE to skip', 28, 1).setOrigin(0.5)
        this.displayScore.setDepth(10)

        //instructions
        //tutorial = this.add.text(width/2, height/4, '', textConfig).setOrigin(0.5)
        tutorial = this.add.bitmapText(width/2, height/4, 'gem', ' ', 32, 1).setOrigin(0.5)
        tutorial.displayOriginY = 0
        tutorial.setDepth(10)

        this.time.delayedCall(500, () => {
            //tutorial.text = '← →\nSwerve left / right'
            tutorial.text = '<- ->\nSwerve left / right'
        })
        this.time.delayedCall(3500, () => {
            tutorial.text = "Don't crash into cars\nor pedestrians"
        })
        this.time.delayedCall(6500, () => {
            tutorial.text += '\n\nBut, try coming\nvery close to them'
        })
        this.time.delayedCall(12500, () => {
            tutorial.text = 'Traffic will speed up\nthe longer you play'
        })
        this.time.delayedCall(15500, () => {
            tutorial.text += '\n\nGood luck!'
        })
        this.time.delayedCall(19000, () => {
            this.scene.start('playScene')
        })

        gameOver = false

    }

    addCar() {
        let speedVariance = Phaser.Math.Between(0, 300)
        let car = new Car(this, this.CAR_SPEED + speedVariance)
        this.carGroup.add(car)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            // skip tutorial
            this.scene.start('playScene')
        }
        //console.log(this.road.tilePositionY)
        pedestrian.update()

        if (!gameOver) {
            //df *= 1.0004
            //score += 1 * df * gdm
            //this.displayScore.text = Phaser.Math.RoundTo(score)

            //console.log(df)
            this.road.tilePositionY -= 6 * df

           if (cursors.left.isDown) {
            bcycle.body.velocity.x -= this.BCYCLE_VELOCITY
            bcycle.play('bike')
           } else if (cursors.right.isDown) {
            bcycle.body.velocity.x += this.BCYCLE_VELOCITY
            bcycle.play('bike')
           }

           this.physics.world.collide(bcycle, this.carGroup, this.bcycleCollision, null, this)
           this.physics.world.collide(bcycle, pedestrian, this.bcycleCollision, null, this)
           this.physics.world.collide(pedestrian, this.carGroup)
           this.physics.world.collide(this.carGroup, this.carGroup)

           if (gdm == 1) {
            this.displayMultiplier.text = ''
            //this.displayMultiplier.style.color = '#FFFFFF'
            this.displayMultiplier.setTint(0XFFFFFF)
           }
           else {
            //this.displayMultiplier.style.color = '#00FF00'
            this.displayMultiplier.setTint(0x00FF00)
            this.displayMultiplier.text = 'MULTIPLIER ' + Phaser.Math.RoundTo((gdm), -2) + 'x \nROAD HAZARD BONUS!'
           }

           gdm = 1
           
           //this.bcycle.setVelocity(this.BCYCLE_VELOCITY * bcycleVector.x, 0)
        } else {
            this.displayMultiplier.text = ''
            this.time.delayedCall(2000, () => {
                this.scene.start('gameOverScene')
            })
        }
    }

    bcycleCollision() {
        this.cameras.main.shake(200, .06 * (df * 1.25))
        gameOver = true
        df = 0
        bcycle.destroy()
    }

}