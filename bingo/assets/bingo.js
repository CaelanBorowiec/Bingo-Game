$(document).ready(function() {
  const Squares = (5 * 5);
  const FreeSpace = true;
  const Questions = ["Ut",
    "elementum",
    "sit",
    "amet",
    "ante",
    "sit",
    "amet",
    "facilisis.",
    "Nulla",
    "sit",
    "amet",
    "elit",
    "non",
    "erat",
    "commodo",
    "aliquet",
    "et",
    "eu",
    "diam.",
    "Ut",
    "sollicitudin",
    "urna",
    "ex.",
    "Duis."
  ];

  const cellsPerRow = Math.sqrt(Squares);
  const star = Math.ceil((cellsPerRow / 2));
  const shuffledQuestions = shuffleArray(Questions);

  let x = 1;
  let y = 1;
  let q = 0;
  let questionBlocks = [];

  for (var i = 0; i < Squares; i++) {
    if (x > 5) {
      x = 1;
      y++;
    }

    questionBlocks[i] = $('<div>').addClass('square');
    $span = $('<span>').addClass('question');

    if (FreeSpace && x == star && y == star)
      $span.html("&#9733;").addClass('star');
    else {
      $span.text(shuffledQuestions[q]);
      q++
    }

    questionBlocks[i].html($span);

    x++;
  }

  $('.generator').html(questionBlocks);
});

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
