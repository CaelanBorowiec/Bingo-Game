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
    $span = $('<span>').addClass('question');

    if (x == star && y == star)
      $span.text("&#9733;");
    else
      $span.text(Questions[i]);

    questionBlocks[i].html($span);

    x++;
  }

  $('.generator').html(questionBlocks);
});
