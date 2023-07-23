// war game app week 6
// these are the variables that holde the suits array and the values array of the cards

const Suits = ["♠", "♥", "♣", "♦"];
const Values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
// this is the deck of cards class that takes in the fresh deck function and uses a getter
// method that has  a numberOfCards var that holds the cards length which is used in the
// shuffle deck function that uses a for loop to shuffle the cards.
class Deck {
    constructor(cards = freshDeck()){
        this.cards = cards;
    }

    get numberOfCards() {
        return this.cards.length;
    }

    shuffleDeck(){
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[i]];
        }
    }
}
// card class created that holds the suit and the value
class Card {
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
    }
}

function freshDeck() {
    return Suits.flatMap(suit => {
        return Values.map(value => {
            return new Card(suit, value);
        });
    });
}
// variables used for the players and there hands
let player1Deck, player2Deck;
let player1Hand = [];
let player2Hand = [];
// this function compares the values and returns the results
function compareCards(card1, card2){
    const value1 = Values.indexOf(card1.value);
    const value2 = Values.indexOf(card2.value);

    if (value1 > value2){
        return 1;
    } else if (value1 < value2){
        return 2;
    } else {
        return 0;
    }
}
// this function allows for a war to be initiated in the case of a tie
function initiateWar() {
    console.log("War!");
    let roundResult = 0;

    while (roundResult === 0) {
        if (player1Deck.numberOfCards < 4) {
            console.log("Player 2 wins the game!");
            return;
        } else if (player2Deck.numberOfCards < 4) {
            console.log("Player 1 wins the game!");
            return;
        }

        const player1FaceDown = player1Deck.cards.splice(0, 3);
        const player2FaceDown = player2Deck.cards.splice(0, 3);

        player1Hand.push(...player1FaceDown);
        player2Hand.push(...player2FaceDown);

        console.log("Player 1's face-down cards:", player1FaceDown);
        console.log("Player 2's face-down cards:", player2FaceDown);

        const player1NextCard = player1Deck.cards.shift();
        const player2NextCard = player2Deck.cards.shift();

        player1Hand.push(player1NextCard);
        player2Hand.push(player2NextCard);

        console.log(`Player 1 plays: ${player1NextCard.suit}${player1NextCard.value}`);
        console.log(`Player 2 plays: ${player2NextCard.suit}${player2NextCard.value}`);

        roundResult = compareCards(player1NextCard, player2NextCard);
    }

    if (roundResult === 1) {
        console.log("Player 1 wins the round!");
        player1Deck.cards.push(...player1Hand, ...player2Hand);
    } else if (roundResult === 2) {
        console.log("Player 2 wins the round!");
        player2Deck.cards.push(...player1Hand, ...player2Hand);
    }

    player1Hand = [];
    player2Hand = [];
}

// this function defines how the round is played, and where the cards go if a player wins
function playRound() {
    const player1Card = player1Deck.cards.shift();
    const player2Card = player2Deck.cards.shift();

    player1Hand.push(player1Card);
    player2Hand.push(player2Card);

    console.log(`Player 1 plays: ${player1Card.suit}${player1Card.value}`);
    console.log(`Player 2 plays: ${player2Card.suit}${player2Card.value}`);

    const roundResult = compareCards(player1Card, player2Card);

    if (roundResult === 1) {
        console.log("Player 1 wins round!");
        player1Deck.cards.push(...player1Hand, ...player2Hand);
    } else if (roundResult === 2) {
        console.log("Player 2 wins round!");
        player2Deck.cards.push(...player1Hand, ...player2Hand);
    } else {
        console.log("It's a tie!");
        initiateWar();
    }

    player1Hand = [];
    player2Hand = [];
}
// this function structures the gamplay, I stopped it at 1000 rounds due to endless loops
function WarGame() {
    let roundNumber = 1;
    const maxRounds = 1000;

    while (player1Deck.numberOfCards > 0 && player2Deck.numberOfCards > 0 && roundNumber <= maxRounds) {
        console.log(` Round ${roundNumber} `);
        playRound();
        roundNumber++;
    }

    if (roundNumber > maxRounds) {
        const player1CardCount = player1Deck.numberOfCards + player1Hand.length;
        const player2CardCount = player2Deck.numberOfCards + player2Hand.length;

        if (player1CardCount > player2CardCount) {
            console.log("Player 1 wins the War");
        } else if (player2CardCount > player1CardCount) {
            console.log("Player 2 wins the War");
        } else {
            console.log("It's a tie!");
        }
    } else {
        if (player1Deck.numberOfCards === 0) {
            console.log("Player 2 wins the War");
        } else if (player2Deck.numberOfCards === 0) {
            console.log("Player 1 wins the War");
        }
    }
}
// this function actually starts the game when it is called, gets the game ready for play
function startGame() {
    const deck = new Deck();
    deck.shuffleDeck();

    const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
    player1Deck = new Deck(deck.cards.slice(0, deckMidpoint));
    player2Deck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));

    console.log("Player 1's deck:");
    console.log(player1Deck);
    console.log("Player 2's deck:");
    console.log(player2Deck);
//calling the game to play
    WarGame();
}
// actually starts the game
startGame();


