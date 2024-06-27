document.addEventListener("DOMContentLoaded", () => {
  const game = document.getElementById("game");
  const restartButton = document.getElementById("restartButton");
  const cardsArray = [
    "A",
    "A",
    "B",
    "B",
    "C",
    "C",
    "D",
    "D",
    "E",
    "E",
    "F",
    "F",
    "G",
    "G",
    "H",
    "H",
  ];

  let firstCard, secondCard;
  let hasFlippedCard = false;
  let lockBoard = false;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function createBoard() {
    game.innerHTML = "";
    shuffle(cardsArray);
    cardsArray.forEach((cardValue) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.value = cardValue;
      card.addEventListener("click", flipCard);
      game.appendChild(card);
    });
  }
    function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;

      this.classList.add("flipped");
      this.textContent = this.dataset.value;

      if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
      }

      secondCard = this;
      checkForMatch();
    }
   


  function checkForMatch() {
    let isMatch = firstCard.dataset.value === secondCard.dataset.value;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.textContent = "";
      secondCard.textContent = "";

      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  restartButton.addEventListener("click", createBoard);
  createBoard();
});
