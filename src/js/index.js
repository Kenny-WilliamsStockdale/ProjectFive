// Dom selector
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addQuestionBtn = document.getElementById('add-question');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep track of the current card
let currentActiveCard = 0; // Which card to show

// Store DOM cards
const cardsEl = []; // Store DOM cards which will be in an array of elements

// Store card data

const cardsdata = getCardsData();

// Create all cards
function createCards() {
    cardsData.forEach((data, index) => createCard (data, index)); // loop through data and creating am arry of cards
}

// Create a single card in the DOM
function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    if(index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
        <p>
            ${data.question}
        </p>
        </div>
        <div class="inner-card-back">
        <p>
        ${data.answer}
        </p>
        </div>
    </div>
    </div>
    `;
    card.addEventListener('click', () => card.classList.toggle('show-answer'));

    // Add to DOM cards
    cardsEL.push(card);

    cardsContainer.appendChild(card);

    updateCurrentText();
}

//Show number of cards
function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`; //Add 1 to it because it's a 0 index
}

// Get cards from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

// Add card to local storage
function setCardsData(cards) {
localStorage.setItem('cards', JSON.stringify(cards)); // We meant to turn it to a string
window.location.reload(); // To relect the cards data on the DOM
}

createCards();

// Event listeners

// Next button
nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard + 1; // If we are at index 1 it will move to the next position and so on

    // We need to set the index on the last card 
    if(currentActiveCard > cardsEl.length -1) {
        currentActiveCard = cardsEL.length -1;
    } // our array is a 0 index

    cardsEl[currentActiveCard].className = 'card active'; // Set the next card to active by overwriting with class provided

    updateCurrentText(); // Target and update the card numbers
});

// Previous button
prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card-right';

    currentActiveCard = currentActiveCard -1;

    if(currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();
});

// Show add container
showBtn.addEventListener('click', addContainer.classList.add('show'));
// Hide add container
hideBtn.addEventListener('click', addContainer.classList.remove('show'));

// Add new card
addQuestionBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;
    console.log(question, answer)

    if(question.trim() && answer.trim()) {
        const newCard = {question, anser};

        createCard(newCard);
        questionEl.value = '';
        answerEl.value = '';

        addContainer.classList.remove('show');

        cardsData.push(newCard);
        setCardsData(cardsData);
    }
});

// Clear cards button
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.reload();
});