export default class Score {
    constructor() {
      this.currentScore = 0;
    }
  
    render() {
      const scoreElement = document.getElementById('score');
      scoreElement.textContent = this.currentScore;
    }
  
    increment() {
      this.currentScore++;
    }
  
    update() {
      this.render();
    }
  
    reset() {
      this.currentScore = 0;
      this.update();
    }
  
    getCurrentScore() {
      return this.currentScore;
    }
  }
