let PlayerNameButton = document.querySelector(".control-buttons span");
let PlayerName = document.querySelector(".name span");
let controlButton = document.querySelector(".control-buttons");
let blockContainer = document.querySelector(".memory-game-blocks");
let triesElement = document.querySelector(".tries span");
let match = document.querySelector(".matched span");
let fail = document.getElementById("fail");
let success = document.getElementById("success");

PlayerNameButton.onclick = () => {
  let YourName = prompt("What is your name ?");
  if (YourName === null || YourName === "") {
    PlayerName.innerHTML = "Unknown";
  } else {
    PlayerName.innerHTML = YourName;
  }
  controlButton.remove();
};

let duration = 1500;

let blocks = Array.from(blockContainer.children);
let orderRange = Array.from(Array(blocks.length).keys());

console.log(orderRange);
shuffle(orderRange);
console.log(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }

  let allCheckedBlocks = blocks.filter((chekedBlock) => {
    chekedBlock.classList.contains("has-match");
  });

  if (allCheckedBlocks.length === 1) {
    alert("Congratulation !");
  }
}

function stopClicking() {
  blockContainer.classList.add("no-clicking");

  setTimeout(() => {
    blockContainer.classList.remove("no-clicking");
  }, duration);
}

function checkMatchedBlocks(firstBlock, secondBlock) {
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    match.innerHTML = parseInt(match.innerHTML) + 1;

    success.play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    fail.play();
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}

function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);

    current--;

    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
