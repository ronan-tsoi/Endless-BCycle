class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.BCYCLE_VELOCITY = 120
        this.CAR_SPEED = 200
    }

    create() {
        df = 1
        score = 0

        //keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        cursors = this.input.keyboard.createCursorKeys();

        //road bounds
        this.leftBound = this.physics.add.sprite(width/16, height/2, 'bar').setScale(4.7)
        this.leftBound.body.setImmovable(true)
        this.rightBound = this.physics.add.sprite(width - width/16, height/2, 'bar').setScale(4.7)
        this.rightBound.body.setImmovable(true)
        this.bounds = this.add.group([this.leftBound, this.rightBound])

        //tile sprite
        this.road = this.add.tileSprite(width/2, height/2, 240, 480, 'road').setScale(2)

        //BCyclist
        bcycle = this.physics.add.sprite(width/2, height - (height/4), 'bcycle', 0).setScale(2)
        bcycle.body.setSize(14)
        bcycle.setDragX(2900)
        //cycle.setMaxVelocity(0, 700)
        this.physics.add.collider(bcycle, this.bounds)

        //car group
        this.carGroup = this.add.group({
            runChildUpdate: true
        })
        this.time.delayedCall(1500, () => {
            this.addCar()
        })
        this.physics.add.collider(this.carGroup, this.bounds)

        //pedestrian
        pedestrian = new Pedestrian(this, 950)
        pedestrian.play('pedestrian-walking')

        //setpiece group
        this.spGroup = this.add.group({
            runChildUpdate: true
        })
        this.time.delayedCall(1000, () => {
            this.addSP()
        })

        this.bgm = this.sound.add('8bit-Bossa', { 
            mute: false,
            volume: 0.75,
            rate: 1,
            loop: true 
        })
        this.bgm.play()

        this.displayScore = this.add.bitmapText(width/2, 50, 'gem', ' ', 48, 1).setOrigin(0.5)
        this.displayScore.setDepth(10)

        this.displayMultiplier = this.add.bitmapText(width/2, 90, 'gem', ' ', 32, 1).setOrigin(0.5)
        this.displayMultiplier.displayOriginY = 0
        this.displayMultiplier.setDepth(10)

        gameOver = false
    }

    addCar() {
        let speedVariance = Phaser.Math.Between(0, 300)
        let car = new Car(this, this.CAR_SPEED + speedVariance)
        this.carGroup.add(car)
    }

    addSP() {
        let setpiece = new Setpiece(this, 1000)
        this.spGroup.add(setpiece)
    }

    update() {
        /*if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            // game over (debug)
            this.scene.start('gameOverScene')
        }*/
        //console.log(this.road.tilePositionY)
        pedestrian.update()

        if (!gameOver) {
            df *= 1.0002
            score += 1 * df * gdm
            this.displayScore.text = Phaser.Math.RoundTo(score)

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
            this.displayMultiplier.setTint(0xFFFFFF)
            this.displayMultiplier.text = 'MULTIPLIER ' + Phaser.Math.RoundTo(df, -2) + 'x'
           }
           else {
            this.displayMultiplier.setTint(0x00FF00)
            this.displayMultiplier.text = 'MULTIPLIER ' + Phaser.Math.RoundTo((df * gdm), -2) + 'x \nROAD HAZARD BONUS!'
           }

           gdm = 1
           
        } else {
            this.displayMultiplier.text = ''
            this.time.delayedCall(2000, () => {
                this.scene.start('gameOverScene')
            })
        }
    }

    bcycleCollision() {
        this.crash = this.sound.add('crash', {volume: 1.75})
        this.crash.play()
        this.bgm.volume = 0
        this.cameras.main.shake(200, .06 * (df))
        gameOver = true
        df = 0
        bcycle.destroy()
    }

}