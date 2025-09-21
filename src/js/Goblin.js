export default class Goblin {
    constructor() {
      this.currentPosition = null;
      this.element = this.createGoblinElement();
    }
  
    createGoblinElement() {
      const goblin = document.createElement('div');
      goblin.className = 'goblin';
      return goblin;
    }
  
    moveTo(position) {
      this.hide();
      
      const cells = document.querySelectorAll('.cell');
      if (cells[position]) {
        this.currentPosition = position;
        cells[position].appendChild(this.element);
        cells[position].classList.add('active');
      }
    }
  
    hide() {
      if (this.currentPosition !== null) {
        const cells = document.querySelectorAll('.cell');
        if (cells[this.currentPosition] && cells[this.currentPosition].contains(this.element)) {
          cells[this.currentPosition].removeChild(this.element);
          cells[this.currentPosition].classList.remove('active');
        }
        this.currentPosition = null;
      }
    }
  
    getCurrentPosition() {
      return this.currentPosition;
    }
  }
