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
  let x = 1;
  let y = 1;
  let questionBlocks = [];
  for (var i = 0; i <= Squares - (FreeSpace ? 1 : 0); i++) {
    if (x > 5) {
      x = 1;
      y++;
    }

    questionBlocks[i] = $('<div>').addClass('square');

    if (x == star && y == star)
      questionBlocks[i].text("&#9733;");
    else
      questionBlocks[i].text(Questions[i]);

    x++;
  }

  $('.generator').html(questionBlocks);
});
