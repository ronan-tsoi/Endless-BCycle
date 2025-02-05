class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.BCYCLE_VELOCITY = 85
        this.CAR_SPEED = 200
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

        //keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        //keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
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
        bcycle = this.physics.add.sprite(width/2, height - (height/4), 'bcycle').setScale(2)
        bcycle.setDragX(1000)
        //cycle.setMaxVelocity(0, 700)
        this.physics.add.collider(bcycle, this.bounds)

        //car group
        this.carGroup = this.add.group({
            runChildUpdate: true
        })
        this.time.delayedCall(2500, () => {
            this.addCar()
        })

        this.add.text(20, 20, 'awesome gameplay here', textConfig)
        this.add.text(20, 50, 'space for game over (debug)', textConfig)

        this.roadVelocity = 6

        gameOver = false
    }

    addCar() {
        let speedVariance = Phaser.Math.Between(0, 300);
        let car = new Car(this, this.CAR_SPEED + speedVariance);
        this.carGroup.add(car);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            // game over (debug)
            this.scene.start('gameOverScene')
        }

        this.road.tilePositionY -= this.roadVelocity

        if (!gameOver) {
            //player movement
            /*let bcycleVector = new Phaser.Math.Vector2(0, 0)
            let bcycleDirection
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                bcycleVector.x = -1
                bcycleDirection = 'left'
            } else if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
                bcycleVector.x = 1
                bcycleDirection = 'right' 
            }*/
           if (cursors.left.isDown) {
            bcycle.body.velocity.x -= this.BCYCLE_VELOCITY;
           } else if (cursors.right.isDown) {
            bcycle.body.velocity.x += this.BCYCLE_VELOCITY;
           }

           this.physics.world.collide(bcycle, this.carGroup, this.bcycleCollision)
           
           //this.bcycle.setVelocity(this.BCYCLE_VELOCITY * bcycleVector.x, 0)
        } else {
            this.time.delayedCall(2000, () => {
                this.scene.start('gameOverScene')
            })
        }
    }

    bcycleCollision() {
        gameOver = true
        bcycle.destroy()
    }

}