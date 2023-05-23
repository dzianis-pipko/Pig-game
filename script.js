'use strict';

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const diceImg = document.querySelector('.dice');

const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');

const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

let totalScors, currentScore, activePlayer, isPlaying;

const startGame = () => {
	
	totalScors = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	isPlaying = true;
	
	score0Element.textContent = 0;
	score1Element.textContent = 0;
	
	current0Element.textContent = 0;
	current1Element.textContent = 0;
	
	player0Element.classList.remove('player--winner');
	player1Element.classList.remove('player--winner');
	player0Element.classList.remove('player--active');
	player1Element.classList.remove('player--active');
	player0Element.classList.add('player--active');
	diceImg.classList.add('hidden');
}

startGame()

const switchActivePlauer = () => {
	currentScore = 0;
	document.getElementById(`current--${activePlayer}`).textContent = currentScore;
	activePlayer = activePlayer === 0 ? 1 : 0;		player0Element.classList.toggle('player--active');
	player1Element.classList.toggle('player--active')
}

const handleBtnRoll = () => {
	if(isPlaying) {
		let randomNumber = Math.trunc(Math.random() * 6) + 1;

		diceImg.classList.remove('hidden');
		diceImg.src = `dice${randomNumber}.png`

		if(randomNumber !== 1){
			currentScore += randomNumber;
			document.getElementById(`current--${activePlayer}`).textContent = currentScore;
		}else{
			switchActivePlauer();
		}
	}
}

const handleBtnHold = () => {
	if(isPlaying) {
		totalScors[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent = totalScors[activePlayer];
		if(totalScors[activePlayer] >= 100){
			isPlaying = false;
			document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
			document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
			diceImg.classList.add('hidden');
		}else {
			switchActivePlauer();
		}
	}
}

btnRoll.addEventListener('click', handleBtnRoll);
btnHold.addEventListener('click', handleBtnHold);
btnNew.addEventListener('click', startGame);