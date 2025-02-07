class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.BCYCLE_VELOCITY = 95
        this.CAR_SPEED = 200
    }

    create() {
        df = 1
        score = 0

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        cursors = this.input.keyboard.createCursorKeys();

        //road bounds
        this.leftBound = this.physics.add.sprite(width/16, height/2, 'bar').setScale(4)
        this.leftBound.body.setImmovable(true)
        this.rightBound = this.physics.add.sprite(width - width/16, height/2, 'bar').setScale(4)
        this.rightBound.body.setImmovable(true)
        this.bounds = this.add.group([this.leftBound, this.rightBound])

        //tile sprite
        this.road = this.add.tileSprite(width/2, height/2, 240, 480, 'road').setScale(2)

        //create BCyclist
        //let bcycle
        bcycle = this.physics.add.sprite(width/2, height - (height/4), 'bcycle', 0).setScale(2)
        bcycle.setDragX(1500)
        //cycle.setMaxVelocity(0, 700)
        this.physics.add.collider(bcycle, this.bounds)

        this.anims.create( {
            key: 'bike',
            frameRate: 8,
            repeat: 4,
            frames: this.anims.generateFrameNumbers('bcycle', {
                start: 0,
                end: 1
            })
        })

        //car group
        this.carGroup = this.add.group({
            runChildUpdate: true
        })
        this.time.delayedCall(2500, () => {
            this.addCar()
        })
        this.physics.add.collider(this.carGroup, this.bounds)

        //pedestrian
        pedestrian = new Pedestrian(this, 900)

        this.add.text(20, 20, 'awesome gameplay here', textConfig)
        this.add.text(20, 50, 'space for game over (debug)', textConfig)

        //this.roadVelocity = 6

        gameOver = false
    }

    addCar() {
        let speedVariance = Phaser.Math.Between(0, 300)
        let car = new Car(this, this.CAR_SPEED + speedVariance)
        this.carGroup.add(car)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            // game over (debug)
            this.scene.start('gameOverScene')
        }
        //console.log(this.road.tilePositionY)
        console.log

        if (!gameOver) {
            df *= 1.0002
            //console.log(df)
            this.road.tilePositionY -= 6 * df

           if (cursors.left.isDown) {
            bcycle.body.velocity.x -= this.BCYCLE_VELOCITY
            bcycle.play('bike')
           } else if (cursors.right.isDown) {
            bcycle.body.velocity.x += this.BCYCLE_VELOCITY
            bcycle.play('bike')
           }

           pedestrian.update()

           this.physics.world.collide(bcycle, this.carGroup, this.bcycleCollision)
           this.physics.world.collide(bcycle, pedestrian, this.bcycleCollision)
           this.physics.world.collide(pedestrian, this.carGroup)
           
           //this.bcycle.setVelocity(this.BCYCLE_VELOCITY * bcycleVector.x, 0)
        } else {
            this.time.delayedCall(2000, () => {
                this.scene.start('gameOverScene')
            })
        }
    }

    bcycleCollision() {
        gameOver = true
        df = 0
        //bcycle.destroy()
    }

}