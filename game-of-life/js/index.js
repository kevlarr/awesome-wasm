//import { Cell, Universe } from 'conwasm';
//import { memory } from 'conwasm/conwasm_bg';

const GRID_COLOR = '#333';
const DEAD_COLOR = '#000';
const ALIVE_COLOR = 'rgb(18, 129, 186)';

const ALIVE = 1;
const DEAD = 0;

function toggleCell(c) {
    return c ? DEAD : ALIVE;
}

class Universe {
  constructor(width, height) {
    this._length = width * height;

    this.width = width;
    this.height = height;
    this.cells = this.newArray();

    // Set random first state
    for (let i = 0; i < this._length; i++) {
      if (Math.random() < 0.5) {
        this.cells[i] = ALIVE;
      }
    }
  }

  newArray() {
    return new Int8Array(this._length);
  }

  copyCells() {
    const newCells = this.newArray();

    for (let i = 0; i < this._length; i++) {
      newCells[i] = this.cells[i];
    }

    return newCells;
  }

  tick() {
    const nextCells = this.copyCells();

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const i = this.indexFor(row, col);
        const cell = this.cells[i];
        const liveNeighbors = this.countLiveNeighbors(row, col);

        nextCells[i] = this.nextCell(cell, liveNeighbors);
      }
    }

    this.cells = nextCells;
  }

  nextCell(cell, neighbors) {
    if (
      (cell === DEAD  && neighbors === 3) ||
      (cell === ALIVE && neighbors === 2) ||
      (cell === ALIVE && neighbors === 3)
    ) {
      return ALIVE;
    }

    return DEAD;
  }

  countLiveNeighbors(row, col) {
      let count = 0;

      // Use deltas and modulus to prevent "special-casing" the edges
      // and enabling left edge to "neighbor" right edge, etc.
      [this.height - 1, 0, 1].forEach(drow => {
          [this.width - 1, 0, 1].forEach(dcol => {
              // Don't count "self"
              if (drow === 0 && dcol === 0) { return; }

              let neighborRow = (row + drow) % this.height;
              let neighborCol = (col + dcol) % this.width;
              let i = this.indexFor(neighborRow, neighborCol);

              count += this.cells[i];
          });
      });

      return count;
  }

  indexFor(row, col) {
    return row * this.width + col;
  }

  toggleCell(row, col) {
    let i = this.indexFor(row, col);
    this.cells[i] = toggleCell(this.cells[i]);
  }
}

class GameOfLife {
    constructor(canvas, width, height, cellSize) {
        this.canvas = canvas;
        this.cellSize = cellSize;
        this.universe = new Universe(width, height);

        this.canvas.height = (this.cellSize + 1) * this.universe.height + 1;
        this.canvas.width = (this.cellSize + 1) * this.universe.width + 1;
        this.canvas.addEventListener('click', this.click.bind(this));

        this.ctx = this.canvas.getContext('2d');
    }

    click(event) {
        const bounding = this.canvas.getBoundingClientRect();

        const scaleX = this.canvas.width / bounding.width;
        const scaleY = this.canvas.height / bounding.height;

        const canvasLeft = (event.clientX - bounding.left) * scaleX;
        const canvasTop = (event.clientY - bounding.top) * scaleY;

        const row = Math.min(
            Math.floor(canvasTop / (this.cellSize + 1)),
            this.universe.height - 1
        );
        const col = Math.min(
            Math.floor(canvasLeft / (this.cellSize + 1)),
            this.universe.width - 1
        );

        this.universe.toggleCell(row, col);
        this.render();
    }

    getIndex(row, col) {
        return row * this.universe.width + col;
    }

    next() {
        this.universe.tick();
    }

    render() {
        //this.drawGrid();
        this.drawCells();
    }

    drawCells() {
        this.ctx.beginPath();

        for (let row = 0; row < this.universe.height; row++) {
            for (let col = 0; col < this.universe.width; col++) {
                const i = this.getIndex(row, col);

                this.ctx.fillStyle = this.universe.cells[i] === DEAD ? DEAD_COLOR : ALIVE_COLOR;
                this.ctx.fillRect(
                    col * (this.cellSize + 1) + 1,
                    row * (this.cellSize + 1) + 1,
                    this.cellSize,
                    this.cellSize
                );
            }
        }

        this.ctx.stroke();
    }

    /*
    drawGrid() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = GRID_COLOR;

        for (let i = 0; i <= this.width; i++) {
            const x = i * (this.cellSize + 1) + 1;

            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, (this.cellSize + 1) * this.height + 1);
        }

        for (let j = 0; j <= this.height; j++) {
            const y = j * (this.cellSize + 1) + 1;

            this.ctx.moveTo(0, y);
            this.ctx.lineTo((this.cellSize + 1) * this.width + 1, y);
        }

        this.ctx.stroke();
    }
    */
}

(function main() {
    const byId = document.getElementById.bind(document);

    const els = {
        canvas: byId('gameCanvas'),
        widthInput: byId('gameWidth'),
        heightInput: byId('gameHeight'),
        cellSizeInput: byId('cellSize'),
        togglePlaying: byId('togglePlaying'),
    };

    const newGame = () => {
        const game = new GameOfLife(
            els.canvas,
            Number(els.widthInput.value),
            Number(els.heightInput.value),
            Number(els.cellSizeInput.value)
        );

        game.next();
        game.render();

        return game;
    };

    let gameOfLife = newGame();
    let animationId = null;

    const loop = () => {
        gameOfLife.next();
        gameOfLife.render();

        animationId = requestAnimationFrame(loop);
    };

    const play = () => {
        els.togglePlaying.textContent = 'Pause';

        loop();
    };

    const pause = () => {
        els.togglePlaying.textContent = 'Play';

        cancelAnimationFrame(animationId);
        animationId = null;
    };

    const reset = () => {
        if (animationId) { pause(); }

        gameOfLife = newGame();
    };

    els.togglePlaying.addEventListener('click', (_event) => {
        animationId ? pause() : play();
    });

    [els.widthInput, els.heightInput, els.cellSizeInput].forEach(input => {
        input.addEventListener('change', reset);
    });
})();
