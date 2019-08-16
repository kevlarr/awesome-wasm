import { Cell, Universe } from 'conwasm';
import { memory } from 'conwasm/conwasm_bg';

const GRID_COLOR = '#333';
const DEAD_COLOR = '#333';
const ALIVE_COLOR = 'rgb(18, 129, 186)';

class GameOfLife {
    constructor(canvas, width, height, cellSize) {
        this.canvas = canvas;
        this.cellSize = cellSize;
        this.universe = Universe.new(width, height);

        this.canvas.height = (this.cellSize + 1) * this.universe.height() + 1;
        this.canvas.width = (this.cellSize + 1) * this.universe.width() + 1;
        this.canvas.addEventListener('click', this.click.bind(this));

        this.ctx = this.canvas.getContext('2d');
    }

    get height() {
        return this.universe.height();
    }

    get width() {
        return this.universe.width();
    }

    click(event) {
        const bounding = this.canvas.getBoundingClientRect();

        const scaleX = this.canvas.width / bounding.width;
        const scaleY = this.canvas.height / bounding.height;

        const canvasLeft = (event.clientX - bounding.left) * scaleX;
        const canvasTop = (event.clientY - bounding.top) * scaleY;

        const row = Math.min(
            Math.floor(canvasTop / (this.cellSize + 1)),
            this.universe.height() - 1
        );
        const col = Math.min(
            Math.floor(canvasLeft / (this.cellSize + 1)),
            this.universe.width() - 1
        );

        this.universe.toggle_cell(row, col);
        this.render();
    }

    getIndex(row, col) {
        return row * this.width + col;
    }

    next() {
        this.universe.tick();
    }

    render() {
        const cellsPtr = this.universe.cells();
        const cells = new Uint8Array(memory.buffer, cellsPtr, this.width * this.height);

        this.ctx.beginPath();

        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                const i = this.getIndex(row, col);

                this.ctx.fillStyle = cells[i] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;
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
