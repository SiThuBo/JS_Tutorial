/**
 * This is mind limit constant and user input limit.
 */
const MINE_LIMIT = 3;
const INPUT_LIMIT = 22;
/**
 * Array for Board
 */
var twoDArr = [
    [
        " ", " ", " ", " ", " "
    ], [
        " ", " ", " ", " ", " "
    ], [
        " ", " ", " ", " ", " "
    ], [
        " ", " ", " ", " ", " "
    ], [
        " ", " ", " ", " ", " "
    ]
];
/**
 * This is to get user input.
 * @returns {object} x, y
 */
function getXandY() {
    var x = prompt("Please Enter a Number X(1-5):");
    var y = prompt("Please Enter a Number Y(1-5):");
    return { "x": x, "y": y };
}

/**
 * This is to hit mine.
 * @param {array} xArray x array
 * @param {array} yArray y array
 * @param {string} x x
 * @param {string} y y
 * @returns {boolean} hitMine
 */
function doesHitMine(xArray, yArray, x, y) {
    var hitMine = false;
    for (var idx = 0; idx < MINE_LIMIT; idx++) {
        if ((xArray[idx] == x - 1 && yArray[idx] == y - 1)) {
            hitMine = true;
            break;
        }
    }
    return hitMine;
}
/**
 * This is calculate mine.
 * @param {array} xArray x array
 * @param {array} yArray y array
 * @param {string} x x
 * @param {string} y y
 * @returns {integer} mineCount
 */
function calculateMineCount(xArray, yArray, x, y) {
    var mineCount = 0;
    for (var idx = 0; idx < MINE_LIMIT; idx++) {
        if (xArray[idx] - 1 == x - 1 && yArray[idx] - 1 == y - 1) {
            mineCount++;
        }
        if (xArray[idx] == x - 1 && yArray[idx] - 1 == y - 1) {
            mineCount++;
        }
        if (xArray[idx] + 1 == x - 1 && yArray[idx] - 1 == y - 1) {
            mineCount++;
        }
        if (xArray[idx] - 1 == x - 1 && yArray[idx] + 1 == y - 1) {
            mineCount++;
        }
        if (xArray[idx] == x - 1 && yArray[idx] + 1 == y - 1) {
            mineCount++;
        }
        if (xArray[idx] + 1 == x - 1 && yArray[idx] + 1 == y - 1) {
            mineCount++;
        }
        if (xArray[idx] - 1 == x - 1 && yArray[idx] == y - 1) {
            mineCount++;
        }
        if (xArray[idx] + 1 == x - 1 && yArray[idx] == y - 1) {
            mineCount++;
        }
    }
    return mineCount;
}
/**
 * This is to start the game
 * @returns void
 */
function startGame() {
    console.log("Welcome");
    var xArray = [];
    var yArray = [];
    for (var mineIndex = 0; mineIndex < MINE_LIMIT; mineIndex++) {
        xArray.push(Math.floor(Math.random() * 4) + 0);
        yArray.push(Math.floor(Math.random() * 4) + 0);
    }
    var hitMine = false;
    var userInputCellCount = 0;
    while (userInputCellCount != INPUT_LIMIT) {
        drawBoard();

        var userInput = getXandY();
        var x = userInput.x;
        var y = userInput.y;

        if (twoDArr[y - 1][x - 1] != " ") {
            continue;
        }

        hitMine = doesHitMine(xArray, yArray, x, y);

        if (hitMine) {
            console.log("Game Over");
            for (var mine = 0; mine < MINE_LIMIT; mine++) {
                twoDArr[yArray[mine]][xArray[mine]] = "M";
            }
            drawBoard();
            break;
        }
        else {
            twoDArr[y - 1][x - 1] = calculateMineCount(xArray, yArray, x, y);
        }
        userInputCellCount++;
    }
    if (!hitMine) {
        drawBoard();
        console.log("Winning");
    }
}
/**
 * This is to show board for game.
 * @returns void
 */
function drawBoard() {
    console.log("+-----+-----+-----+-----+-----+");
    for (var row = 0; row < 5; row++) {
        var strRow = "| ";
        for (var col = 0; col < 5; col++) {
            strRow = `${strRow} ${twoDArr[row][col]}  | `;
        }
        console.log(strRow);
        console.log("+-----+-----+-----+-----+-----+");
    }
}
