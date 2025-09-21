export default class Board {
    constructor() {
      this.size = 4;
      this.cells = [];
    }
  
    render() {
      const gameBoard = document.getElementById('gameBoard');
      gameBoard.innerHTML = '';
      gameBoard.style.gridTemplateColumns = `repeat(${this.size}, 100px)`;
      gameBoard.style.gridTemplateRows = `repeat(${this.size}, 100px)`;
  
      for (let i = 0; i < this.size * this.size; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        gameBoard.appendChild(cell);
        this.cells.push(cell);
      }
    }
  
    getCell(index) {
      return this.cells[index];
    }
  
    activateCell(index) {
      this.cells.forEach(cell => cell.classList.remove('active'));
      if (index !== null && this.cells[index]) {
        this.cells[index].classList.add('active');
      }
    }
  
    deactivateAllCells() {
      this.cells.forEach(cell => cell.classList.remove('active'));
    }
  }
