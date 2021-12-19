/**
 * This is for mine limit.
 */
var mineLimit;

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
    for (var idx = 0; idx < mineLimit; idx++) {
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
    for (var idx = 0; idx < mineLimit; idx++) {
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
    mineLimit = prompt("Please Enter a Limit of Booms:");
    var xArray = [];
    var yArray = [];
    var uniqArray = [];
    do {
        var tmpMineX = Math.floor(Math.random() * 5) + 0;
        var tmpMineY = Math.floor(Math.random() * 5) + 0;
        var tmpMine = ("" + tmpMineX + tmpMineY);
        var index = uniqArray.indexOf(tmpMine);
        if (index == -1) {
            xArray.push(tmpMineX);
            yArray.push(tmpMineY);
            uniqArray.push(tmpMine);
        }
    } while (xArray.length != mineLimit && yArray.length != mineLimit);

    var hitMine = false;
    var userInputCellCount = 0;
    inputLimit = 25 - mineLimit;
    while (userInputCellCount != inputLimit) {
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
            for (var mine = 0; mine < mineLimit; mine++) {
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