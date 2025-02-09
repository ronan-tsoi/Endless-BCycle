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
            debug: false
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
// score + score multipliers
let df
let gdm = 1
let score

let precision = 3.9

let textConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    //backgroundColor: '#000000',
    color: '#FFFFFF',
    align: 'center',
    padding: {
        top: 5,
        bottom: 5,
    },
}