// your code
const EMOJIS = ["🥔", "🍒", "🥑", "🌽", "🥕", "🍇", "🍉", "🍌", "🥭", "🍍"];

function shuffleAndSortedCards(cards) {
  // функция для выбора 16 карточек
  if (cards && Array.isArray(cards)) {
    // сортировка исходного массива в случайном порядке
    const sortedArr = cards.sort(() => Math.random(cards) - 0.5);
    // достаём из 10 элементов первые 8
    const dublicateArr = [...sortedArr].slice(0, 8);
    // дублируем первые 8 элементов
    const doubleArr = [...dublicateArr, ...dublicateArr];
    // сортировка массива из 16 элементов в случайном порядке
    const sortedDoubleArr = doubleArr.sort(() => Math.random(doubleArr) - 0.5);
    return sortedDoubleArr;
  } else {
    console.error("Передайте параметр в виде массива");
  }
}

let flippedCard = []; // массив для хранения открытых карточек
const flipCard = (card) => {
  // функция переворота карточек
  card.classList.toggle("flipped"); // тоглим открытые карточки
  flippedCard.push(card); // пушим переданные в функция карточки в массив
  const flippedCardState = STATE.flippedCards++ + 1; // константа для хранения значения открытых карточек + 1 так как индексация начинается с 0
  console.log(flippedCardState);
  if (flippedCardState === 2) {
    checkCards(flippedCard); // вызываем функцию проверки открытых карточек и передаём туда массив
  }
};

const closeCard = (item) => {
  // функция закрытия карточки
  item.classList.toggle("flipped");
};

const checkCards = (items) => {
  // функция проверки открытых карточек. Получает массив flippedCard
  console.log(items);
  // const flippedCardState = STATE.flippedCards++ + 1; // константа для хранения значения открытых карточек + 1 так как индексация начинается с 0
  if (items[0].innerText !== items[1].innerText) {
    // если карточки не равны
    items.forEach((card) => {
      // итерируемся по карточкам из мыссива
      setTimeout(() => {
        closeCard(card); // через секунду переварачиваем карточки
      }, 1000);
    });
  }
  STATE.flippedCards = 0; // очищаем State
  flippedCard = []; // очищаем массив
};

const STATE = {
  isGameStarted: false, // игра началась или нет
  totalTime: 0, // общее время в игре
  flippedCards: 0, // количество перевёрнутых карточек
  totalFlips: 0, // общее количество перевёрнутых карточек
};

const SELECTORS = {
  boardContainer: document.querySelector(".board-container"), // контейнер игрового поля
  board: document.querySelector(".board"), // основное содержимое поля
  moves: document.querySelector(".moves"), // контрол для учёта шагов
  timer: document.querySelector(".timer"), // контрол для учёта времени
  start: document.querySelector("button"), // кнопка для старта игры
};

// генерация игрового поля
const generateGame = () => {
  // получение дата атрибута
  const dimensions = SELECTORS.board.dataset.dimension;
  if (dimensions % 2 !== 0) {
    throw new Error("Размер игрового поля должен быть чётным");
  }

  // вызываем функция перемешивания и получаения случайно карточки для эмодзи
  const shuffleEmoji = shuffleAndSortedCards(EMOJIS);
  console.log([...EMOJIS].length);
  // итерация по карточкам
  const cardsHTML = shuffleEmoji
    .map((emoji) => {
      return `<div class="card">
      <div class="card-front"></div>
      <div class="card-back">${emoji}</div>
      </div>`;
    })
    .join("");

  // вставка карточек в игровое поле
  SELECTORS.board.insertAdjacentHTML("beforeend", cardsHTML);
  // console.log(cardsHTML);
};

generateGame();

const attachListeners = () => {
  // получение HTMLCollection front карточек
  const cards = SELECTORS.board.children[0];

  // получение HTMLCollection родителя карточек
  const cardsParent = SELECTORS.board.children;
  if (cardsParent) {
    // HTMLCollection в массив
    [...cardsParent].forEach((card) => {
      card.addEventListener("click", (event) => {
        if (event.target.classList.contains("card")) {
        }
        flipCard(event.target.parentElement); // вызываем функция переварачивания карточки
        // console.log(event.target.parentElement);
      });
    });
  }
};

// вызов необходимых функций при загрузке страницы
document.addEventListener("DOMContentLoaded", attachListeners);
