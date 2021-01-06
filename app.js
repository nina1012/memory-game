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
    startButton.display = 'inline-block';
    setTimer();
    // make sure that grid is empty
    hideCardImage();
  }
  function hideCardImage() {
    cards.forEach(card => card.classList.remove('visible'));
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
      setTimeout(hideCardImage, 500);
      checkMatch();
      matchArray = [];
      //   flipCard(e);
    }
  }

  function checkMatch() {
    const [firstCard, secondCard] = matchArray;
    if (firstCard.dataset.index == secondCard.dataset.index) {
      removeMatchedCards();
    }
  }

  function removeMatchedCards() {
    const nodes = [];

    matchArray.forEach(match =>
      match.hasChildNodes() ? nodes.push(match.children) : null
    );
    nodes.forEach(node =>
      Array.from(node).forEach(n => (n.style.display = 'none'))
    );
  }
});
