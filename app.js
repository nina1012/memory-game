document.addEventListener('DOMContentLoaded', e => {
  const startButton = document.querySelector('.start-button');
  const restartButton = document.querySelector('.restart-button');
  const timer = document.querySelector('.seconds');
  let matchArray = [];

  //EVENT LISTENERS

  // flipping effect on all cards that are clicked
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', e => flipCard(e));
  });

  startButton.addEventListener('click', e => {
    ///////////game should start
    e.target.style.display = 'none';
    init();
  });

  restartButton.addEventListener('click', init);

  // FUNCTIONS

  function init() {
    // timer should start to count
    timer.textContent = 0;
    matchArray = [];
    setTimer();
    // make sure that grid is empty
    // grid.innerHTML = '';
  }

  function setTimer() {
    timer.textContent++;
    setTimeout(setTimer, 1000);
  }

  function flipCard(e) {
    // stops bubbling,just catches the first target
    e.stopImmediatePropagation();
    const card = e.target.parentNode.parentNode;
    card.classList.toggle('visible');
    // if matchArray length is less than 2,push card to that array
    if (matchArray.length < 2) {
      matchArray.push(card);
    } else if (matchArray.length == 2) {
      checkMatch();
      matchArray = [];
      flipCard(e);
    }
  }

  function checkMatch() {
    const [firstCard, secondCard] = matchArray;
    if (firstCard.dataset.index == secondCard.dataset.index) {
      matchArray.forEach(match => match.remove());
    }
  }
});
