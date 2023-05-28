let baseURL = "http://numbersapi.com";

async function numberFacts(n) {
  try {
    let url = `${baseURL}/${n}/year`;
    let response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

numberFacts(7);

(function () {
  let baseURL = "https://deckofcardsapi.com/api/deck";

  // 1.
  async function part1() {
    let response = await fetch(`${baseURL}/new/draw/`);
    let data = await response.json();
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  }

  // 2.
  async function part2() {
    let response1 = await fetch(`${baseURL}/new/draw/`);
    let firstCardData = await response1.json();
    let deckId = firstCardData.deck_id;
    let response2 = await fetch(`${baseURL}/${deckId}/draw/`);
    let secondCardData = await response2.json();
    [firstCardData, secondCardData].forEach((card) => {
      let { suit, value } = card.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
  }

  // 3.
  async function setup() {
    let button = document.querySelector("button");
    let cardArea = document.getElementById("card-area");

    let response = await fetch(`${baseURL}/new/shuffle/`);
    let deckData = await response.json();

    button.style.display = "block";
    button.addEventListener("click", async function () {
      let response = await fetch(`${baseURL}/${deckData.deck_id}/draw/`);
      let cardData = await response.json();
      let cardSrc = cardData.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      let img = document.createElement("img");
      img.src = cardSrc;
      img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
      cardArea.appendChild(img);
      if (cardData.remaining === 0) button.remove();
    });
  }
  setup();
})();
