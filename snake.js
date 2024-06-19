// Get the score and coin fields from the HTML
let scoreField = document.getElementById('score-field');
let coinField = document.getElementById('coin-field');

// Initialize score and coin variables
let score = 0;
let coin = 0;

// Define the SnakeBody class
class SnakeBody {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

// Define board variables
let blockSize = 20;
let cols = 21;
let rows = 21;
let blockCount = (cols + rows) / 2;
let board;
let context;

// Initialize snake head position and velocity
let snakeX = 10 * blockSize;
let snakeY = 10 * blockSize;
let velocityX = 0;
let velocityY = 0;

// Initialize snake body and food position
let snakeBody = [];
let foodX;
let foodY;

// Initialize game over flag
let gameOver = false;

// Run the game when the window loads
window.onload = function () {
	// Get the board element from the HTML
	board = document.getElementById('board');
	board.height = rows * blockSize;
	board.width = cols * blockSize;
	context = board.getContext('2d'); // For drawing on the board

	// Place the initial food
	placeFood();

	// Listen for keydown events to change the snake's direction
	document.addEventListener('keydown', changeDirection);

	// Update the game state every 1/10th of a second
	setInterval(update, 1000 / 10);
};

// Update the game state
function update() {
	if (gameOver) {
		return;
	}

	// Clear the board
	context.fillStyle = '#ffffff';
	context.fillRect(0, 0, board.width, board.height);

	// Draw the food
	context.fillStyle = 'red';
	context.fillRect(foodX, foodY, blockSize, blockSize);

    

	// Check if the snake has eaten the food
	if (snakeX == foodX && snakeY == foodY) {
		// Add a new body segment to the snake
		snakeBody.push([foodX, foodY]);
		// Place a new food
		placeFood();
		// Increase the coin count
		coin += 100;
		// Update the coin field in the HTML
		coinField.innerText = coin;
	}

	// Move the snake's body segments
	for (let i = snakeBody.length - 1; i > 0; i--) {
		snakeBody[i] = snakeBody[i - 1];
	}

	// Update the snake's head position
	if (snakeBody.length) {
		snakeBody[0] = [snakeX, snakeY];
	}

	// Draw the snake's head
	context.fillStyle = 'green';
	snakeX += velocityX * blockSize;
	snakeY += velocityY * blockSize;
	context.fillRect(snakeX, snakeY, blockSize, blockSize);

	// Draw the snake's body
	context.fillStyle = 'green';
	for (let i = 0; i < snakeBody.length; i++) {
		let part = snakeBody[i];
		context.fillRect(
			part.x * blockCount,
			part.y * blockCount,
			blockSize,
			blockSize
		);
	}

	for (let i = 0; i < snakeBody.length; i++) {
		context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
	}

    // Check if the snake has collided with the walls and make it appear on the other side
	if (snakeX < 0) {
        snakeX = cols * blockSize;
    } else if (snakeX > cols * blockSize) {
        snakeX = 0;
    } else if (snakeY < 0) {
        snakeY = rows * blockSize;
    } else if (snakeY > rows * blockSize) {
        snakeY = 0;
    }

	// Check if the snake has collided with itself
	for (let i = 0; i < snakeBody.length; i++) {
		if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
			// Set game over flag
			gameOver = true;
			// Show game over message
			alert('Game Over!');
			// Reload the page to restart the game
			location.reload();
		}
	}
}

// Change the snake's direction based on the key pressed
let changeDirection = function (e) {
	if (e.code == 'ArrowUp' && velocityY != 1) {
		velocityX = 0;
		velocityY = -1;
	} else if (e.code == 'ArrowDown' && velocityY != -1) {
		velocityX = 0;
		velocityY = 1;
	} else if (e.code == 'ArrowLeft' && velocityX != 1) {
		velocityX = -1;
		velocityY = 0;
	} else if (e.code == 'ArrowRight' && velocityX != -1) {
		velocityX = 1;
		velocityY = 0;
	}

	// Increase the score every 1/10th of a second
	setInterval(() => {
		score++;
		// Update the score field in the HTML
		scoreField.innerText = score;
	}, 1000 / 10);
};



// Place the food at a random position on the board
function placeFood() {
	foodX = Math.floor(Math.random() * cols) * blockSize;
	foodY = Math.floor(Math.random() * rows) * blockSize;
}
