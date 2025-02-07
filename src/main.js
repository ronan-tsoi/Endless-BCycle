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
let pedestrian = null
let { height, width } = game.config
let gameOver
let df
let score

let textConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    color: '#FFFFFF',
    padding: {
        top: 5,
        bottom: 5,
    },
}