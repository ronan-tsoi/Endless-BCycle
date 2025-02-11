/*
Name: Ronan Tsoi
Game Title: Endless BCycle -- UC Santa Cruz Simulator
Development Time: ~24 hrs? Really not sure at all
Creative Tilt:
- Something technically interesting I decided to program was the 'grazing' mechanic taking
inspiration from the bullet hell video game genre. Alongside being logic that I came up with
myself, (basically every obstacle instance has its own associated 'GD' object created with 
its own collider), it adds extra gameplay nuance to the endless runner genre since it
incentivizes the player to actually come as close as they can to obstacles in a risk/reward
fashion.
- For visual style, something fun that I was able to implement were the randomly generated
scenic elements that appear on the sides of the road. These are various textures I created
inspired by common UCSC sightings, adding to the humor of the game's presentation and
creating a more atmospheric environment (I particularly enjoy how the trees overlay on top of
the road to add extra depth to the visuals).
*/

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
let precision = 3.9 //for grazing
let { height, width } = game.config
let tutorial

//setpiece textures
let sp = ['trees1', 'trees2', 'field1','field2',
    'trees1', 'trees2', 'field1', 'field2',
    'trees1', 'trees2', 'field1', 'field2',
    'lamppost', 'busstop',
    'lamppost', 'busstop',
    'squiggle']

/*let textConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    align: 'center',
    padding: {
        top: 5,
        bottom: 5,
    },
}*/