import BOARD_SIZE from './const';

export default class Game {
  constructor(element) {
    this.element = element;
    this.cells = [];
  }

  initGame() {
    this.renderTitle();
    this.renderArea(BOARD_SIZE);
    this.renderGoblin();
  }

  renderTitle() {
    const gameTitle = document.createElement('h1');
    gameTitle.classList.add('game__title');
    gameTitle.textContent = 'Goblin Game';
    this.element.append(gameTitle);
  }

  renderArea(size) {
    const gameContainer = document.createElement('div');
    gameContainer.classList.add('game__container');
    gameContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gameContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    this.element.append(gameContainer);
    const gameCell = '<div class="game__cell"></div>';
    gameContainer.insertAdjacentHTML('afterbegin', gameCell.repeat(BOARD_SIZE ** 2));
    this.container = gameContainer;
    this.cells = Array.from(this.container.children);
  }

  renderBtn() {
    const btn = document.createElement('button');
    btn.classList.add('game__btn');
    btn.setAttribute('type', 'button');
    btn.textContent = 'Start Game';
    this.element.append(btn);
  }

  renderGoblin() {
    const arr = [...Array(BOARD_SIZE ** 2)].map((_, i = 0) => i + 1);
    let current = 0;
    const timerId = setInterval(() => {
      if (document.querySelector('.game__result')) {
        clearInterval(timerId);
      }
      let random = Math.abs(Math.floor(Math.random() * arr.length) - 1);
      if (current === random) random = Math.abs(random - 1);
      this.cells.forEach((cell) => cell.classList.remove('game__cell-active'));
      this.cells[random].classList.add('game__cell-active');
      current = random;
    }, 700);
  }
}
