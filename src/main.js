let config = {
    type: Phaser.AUTO,
    width: 720,
    height: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Menu , Play, Credits , GameOver , Tutorial]
}

let game = new Phaser.Game(config)

let keyLEFT, keyRIGHT, keySPACE
let cursors

let bcycle = null
let pedestrian = null

let gameOver
// score + score multipliers
let df
let gdm = 1
let score

//misc
let precision = 3.9
let { height, width } = game.config
let tutorial

//setpiece textures
let sp = ['trees1', 'trees2', 'field1','field2',
    'trees1', 'trees2', 'field1', 'field2',
    'trees1', 'trees2', 'field1', 'field2',
    'lamppost', 'busstop',
    'lamppost', 'busstop',
    'squiggle']

let textConfig = {
    //fontFamily: 'Courier',
    fontSize: '28px',
    //backgroundColor: '#000000',
    color: '#FFFFFF',
    align: 'center',
    padding: {
        top: 5,
        bottom: 5,
    },
}