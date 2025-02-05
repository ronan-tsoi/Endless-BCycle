let config = {
    type: Phaser.AUTO,
    width: 720,
    height: 960,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Menu , Play, Credits , GameOver ]
}

let game = new Phaser.Game(config)

let keyLEFT, keyRIGHT, keySPACE
let cursors
let bcycle = null
let { height, width } = game.config
let gameOver