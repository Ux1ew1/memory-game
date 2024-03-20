// your code
const EMOJIS = ["🥔", "🍒", "🥑", "🌽", "🥕", "🍇", "🍉", "🍌", "🥭", "🍍"];

function shuffleAndSortedCards(cards) {
  // сортировка исходного массива в случайном порядке
  const sortedArr = cards.sort(() => Math.random(cards) - 0.5);
  // достаём из 10 элементов первые 8
  const dublicateArr = [...sortedArr].slice(0, 8);
  // дублируем первые 8 элементов
  const doubleArr = [...dublicateArr, ...dublicateArr];
  // сортировка массива из 16 элементов в случайном порядке 
  const sortedDoubleArr = doubleArr.sort(() => Math.random(doubleArr) - 0.5);
  return sortedDoubleArr;
}

shuffleAndSortedCards(EMOJIS);

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
  console.log([...EMOJIS].length);
  // итерация по карточкам
  const cardsHTML = EMOJIS.map((emoji) => {
    return `<div class="card">
      <div class="card-front"></div>
      <div class="card-back">${emoji}</div>
    </div>`;
  }).join("");

  // вставка карточек в игровое поле
  SELECTORS.board.insertAdjacentHTML("beforeend", cardsHTML);
  console.log(cardsHTML);
};

generateGame();
// обработчик события клика по карточке
const CARDS = SELECTORS.board.children;

if (CARDS) {
  // HTMLCollection в массив
  [...CARDS].forEach((card) => {
    card.addEventListener("click", (event) => {
      console.log(event.target);
    });
  });
}
