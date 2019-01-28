// Enemies our player must avoid
class Enemy {
    constructor(speed) {
        this.x = -150;
        this.width = 75;
        this.height = 30;
        this.y = this.laneSwitch();
        this.sprite = 'images/enemy-bug.png';
        this.speed = speed;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x += this.speed * dt;

        if (this.x >= 501) {
            this.x = -150;
            this.y = this.laneSwitch()
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Switches lanes and after out of bounds
    laneSwitch() {
        this._lanes = [ 50, 130, 210 ];
        this._lane = this._lanes[Math.floor(Math.random() * this._lanes.length)];
        return this._lane;
    }
};

class Player {
    constructor() {
        this.x = 200;
        this.y = 370;
        this.width = 75;
        this.height = 30;
        this.sprite = 'images/char-boy.png';
        this.isColliding = false;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /// Changes player on handleInput key
    update() {
        this.moveDown = function () {
            this.y += 80;
        };

        this.moveUp = function () {
            this.y -= 80;
        };

        this.moveLeft = function () {
            this.x -= 100;
        };

        this.moveRight = function () {
            this.x += 100;
        };
    }

    handleInput(key) {
        switch (key) {
            case 'left':
                this.moveLeft();
                if (this.x <= -1) {
                    this.x = 0;
                };
                break;
            case 'right':
                this.moveRight();
                if (this.x >= 401) {
                    this.x = 400;
                };
                break;
            case 'up':
                this.moveUp();
                break;
            case 'down':
                this.moveDown();
                if (this.y >= 371) {
                    this.y = 370;
                };
                break;
        }
    }
};

/// manages enemy speed and level number
class Changelvl {
    constructor() {
        this._easy = [ 100, 200, 400 ];
        this._medium = [ 200, 400, 800 ];
        this._hard = [ 400, 600, 1000 ];
        this._level = 1;
        this._diff = 'Easy';
    }

    _resetPlayer() {
        player.x = 200;
        player.y = 370;
    }

    _levelNum() {
        document.querySelector('.level').innerHTML = "";
        document.querySelector('.level').innerHTML += `Level ${this._level}: ${this._diff}`;
    }

    _easyChange() {
        this._diff = 'Easy';

        for (let x = 0; x <= allEnemies.length - 1; x++) {
            allEnemies[x].speed = this._easy[x];
        }
    }

    _mediumChange() {
        this._diff = 'Medium';

        for (let x = 0; x <= allEnemies.length - 1; x++) {
            allEnemies[x].speed = this._medium[x];
        }
    }

    _hardChange() {
        this._diff = 'Hard';

        for (let x = 0; x <= allEnemies.length - 1; x++) {
            allEnemies[x].speed = this._hard[x];
        }
    }

    increment() {
        if (this._level == 3) {
            this._resetPlayer();
            this._mediumChange();
            this._level++;
            this._levelNum();
        } else if (this._level == 7) {
            this._resetPlayer();
            this._hardChange();
            this._level++;
            this._levelNum();
        } else {
            this._resetPlayer();
            this._level++;
            this._levelNum();
        }
    }

    decrement() {
        if (this._level < 5) {
            this._resetPlayer();
            this._easyChange();

            if (this._level == 1) {
                this._level = 1;
            } else {
                this._level--;
            }

            this._levelNum();
        } else if (this._level >= 5 && this._level <= 8) {
            this._resetPlayer();
            this._mediumChange();
            this._level--;
            this._levelNum();
        } else if (this._level >= 9) {
            this._resetPlayer();
            this._hardChange();
            this._level--;
            this._levelNum();
        } else {
            this._resetPlayer();

            if (this._level == 1) {
                this._level = 1;
            } else {
                this._level--;
            };

            this._levelNum();
        }
    }
}

// Now instantiate your objects.``
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

(function() {
    player = new Player();
    enemy1 = new Enemy(100);
    enemy2 = new Enemy(200);
    enemy3 = new Enemy(500);
    changeLvl = new Changelvl();
})();

const allEnemies = [ enemy1, enemy2, enemy3 ];

/// Checks collisions on enemies and water for the player. This is uncommented in resources.js and therefore called
function checkCollisions() {
    for (x = 0; x < allEnemies.length; x++) {
        if (player.x < allEnemies[x].x + allEnemies[x].width  && player.x + player.width  > allEnemies[x].x &&
    		player.y < allEnemies[x].y + allEnemies[x].height && player.y + player.height > allEnemies[x].y) {
                changeLvl.decrement();
            }
    };

    if (player.y < 49) {
        changeLvl.increment();
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
