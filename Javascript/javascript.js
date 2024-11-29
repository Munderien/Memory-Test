// dit zijn de variabelen die worden gebruikt 
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {


  if (lockBoard) return;
  if (this === firstCard) return;

  // hier wordt de flip functie toegevoegd
  this.classList.add('flip');

  // als je de kaart nog niet geflipped is en wordt geflipped 
  // dan laat hij de kaart zien 
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  
  // hier wordt de tweede kaart mee aangeroepen
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
    // als de eerste en tweede kaart een match is dan werkt de kaart niet meer
    // anders gaat hij terug naar hoe hij eerst was
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();

  // als het een match is, dan feliciteerd hij je 
  // als het geen match is, zegt hij dat je het opnieuw moet proberen
  if (isMatch) {
    setTimeout(() => {
        alert("Goed Gedaan!")
      }, 1300);
  }
  else {
    setTimeout(() => {
        alert("Probeer Opnieuw!")
      }, 1300);
  }
  
}

function disableCards() {

    // dit verwijderd de click en flipcard functie van de kaarten
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  // de flip functie wordt voor 1,5 sec verwijderd aan de firstCard en secondCard
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
    // dit doet de HasflippedCard functie en lockBoard functie naar false
    // en de firstCard en secondCard naar Null (null is letterlijk niks)
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    // hier gaat hij voor elke kaart een positie kiezen op basis van de kaart zijn nummer
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    
    // dit zorgt ervoor dat de kaarten wordt gesorteerd op basis van hun nummer (van 1 t/m 16)
    card.style.order = randomPos;
  });
})();

// hier gaat hij elke kaart de click en flipcard functie geven
cards.forEach(card => card.addEventListener('click', flipCard));