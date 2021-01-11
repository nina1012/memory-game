document.addEventListener('DOMContentLoaded', e => {
  const startButton = document.querySelector('.start-button');
  const timer = document.querySelector('.seconds');
  const cardsBox = document.querySelector('.cards');
  const cardsArray = [
    {
      index: 1,
      src: 'images/chicken-nuggets.png',
      title: 'Chicken nuggets'
    },
    {
      index: 2,
      src: 'images/donut.png',
      title: 'Donut'
    },
    {
      index: 3,
      src: 'images/french-fries.png',
      title: 'French fries'
    },
    {
      index: 4,
      src: 'images/hamburger.png',
      title: 'Hamburger'
    },
    {
      index: 5,
      src: 'images/hot-dog.png',
      title: 'Hot-dog'
    },
    {
      index: 6,
      src: 'images/ice-cream.png',
      title: 'Ice cream'
    },
    {
      index: 7,
      src: 'images/pizza.png',
      title: 'Pizza'
    },
    {
      index: 8,
      src: 'images/popcorn.png',
      title: 'Popcorn'
    },
    {
      index: 1,
      src: 'images/chicken-nuggets.png',
      title: 'Chicken nuggets'
    },
    {
      index: 2,
      src: 'images/donut.png',
      title: 'Donut'
    },
    {
      index: 3,
      src: 'images/french-fries.png',
      title: 'French fries'
    },
    {
      index: 4,
      src: 'images/hamburger.png',
      title: 'Hamburger'
    },
    {
      index: 5,
      src: 'images/hot-dog.png',
      title: 'Hot-dog'
    },
    {
      index: 6,
      src: 'images/ice-cream.png',
      title: 'Ice cream'
    },
    {
      index: 7,
      src: 'images/pizza.png',
      title: 'Pizza'
    },
    {
      index: 8,
      src: 'images/popcorn.png',
      title: 'Popcorn'
    }
  ];
  const cards = shuffle(cardsArray);
  let numberOfCards = cards.length;

  let matchArray = [];
  let flips = document.querySelector('.flips');

  //EVENT LISTENERS
  // insertCards();

  // flipping effect on all cards that are clicked
  cardsBox.addEventListener('click', flipCard);
  startButton.addEventListener('click', e => {
    ///////////game should start
    init();
  });

  // FUNCTIONS

  function init() {
    // timer should start to count
    timer.textContent = 0;
    flips.textContent = 0;
    matchArray = [];
    setTimer();
    // make sure that grid is empty
    hideCardImage();
    insertCards();
  }

  // insert card at random index inside cardsBox
  function insertCards() {
    cardsBox.innerHTML = '';
    cards.forEach(({ index, src, title }) => {
      const card = `<div class="card" data-index=${index}>
          <div class="card__box">
            <div class="card card__front"></div>
            <div class="card card__back">
              <img src=${src} alt=${title} />
            </div>
          </div>
        </div>`;
      cardsBox.insertAdjacentHTML('afterbegin', card);
    });
  }
  function hideCardImage() {
    Array.from(cardsBox.children).forEach(child =>
      child.classList.remove('visible')
    );
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
      // after pushing check again to flip back if 2 cards are visible
      if (matchArray.length == 2) {
        setTimeout(() => {
          checkMatch();
          matchArray = [];
          isEnd();
          setTimeout(hideCardImage, 500);
        }, 400);
      }
    }
    // increment the flips
    flips.textContent++;
  }

  function checkMatch() {
    const [firstCard, secondCard] = matchArray;
    if (firstCard.dataset.index == secondCard.dataset.index) {
      removeMatchedCards();
      // for each match, decrease number by 2
      numberOfCards -= 2;
    }
  }

  function removeMatchedCards() {
    const nodes = [];

    // find only nodes from matched card
    matchArray.forEach(match =>
      match.hasChildNodes() ? nodes.push(match.children) : null
    );
    // add display:none to every node beneath the card-match
    nodes.forEach(node =>
      Array.from(node).forEach((n, i) => {
        n.style.display = 'none';
      })
    );
  }

  function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function isEnd() {
    if (numberOfCards == 0) {
      alert(`You win!
      Number of flips ${flips.innerHTML}, ${timer.innerHTML} seconds`);
    }
  }
});
