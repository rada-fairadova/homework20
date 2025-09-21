import Board from './Board.js';
import Score from './Score.js';
import Goblin from './Goblin.js';

export default class Game {
  constructor() {
    this.board = new Board();
    this.score = new Score();
    this.goblin = new Goblin();
    this.misses = 0;
    this.maxMisses = 5;
    this.interval = null;
    this.isGameActive = false;
    
    this.init();
  }

  init() {
    this.board.render();
    this.score.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    
    startButton.addEventListener('click', () => this.startGame());
    restartButton.addEventListener('click', () => this.restartGame());

    document.addEventListener('click', (e) => {
      if (!this.isGameActive) return;
      
      const cell = e.target.closest('.cell');
      if (cell && cell.classList.contains('active')) {
        this.handleGoblinClick();
      }
    });
  }

  startGame() {
    if (this.isGameActive) return;
    
    this.isGameActive = true;
    this.score.reset();
    this.misses = 0;
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('gameOver').style.display = 'none';
    
    this.interval = setInterval(() => {
      this.moveGoblin();
    }, 1000);
  }

  moveGoblin() {
    const currentPosition = this.goblin.getCurrentPosition();
    let newPosition;

    do {
      newPosition = Math.floor(Math.random() * 16);
    } while (newPosition === currentPosition);
    
    this.goblin.moveTo(newPosition);

    setTimeout(() => {
      if (this.isGameActive && this.goblin.getCurrentPosition() === newPosition) {
        this.handleMiss();
      }
    }, 1000);
  }

  handleGoblinClick() {
    this.score.increment();
    this.goblin.hide();
    this.score.update();
  }

  handleMiss() {
    this.misses++;
    this.goblin.hide();
    
    if (this.misses >= this.maxMisses) {
      this.endGame();
    }
  }

  endGame() {
    this.isGameActive = false;
    clearInterval(this.interval);
    this.goblin.hide();
    
    document.getElementById('gameOver').style.display = 'block';
    document.getElementById('finalScore').textContent = this.score.getCurrentScore();
    document.getElementById('restartButton').style.display = 'block';
  }

  restartGame() {
    this.startGame();
  }
}