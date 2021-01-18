$(document).ready(function() {

  const DrawBingoSheet = function(Questions = false) {
    const Squares = (5 * 5);
    const FreeSpace = true;
    if (!Questions || Questions == '')
      Questions = [
        "Ut",
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
        "erata",
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
    $('.square').on('click', function() {
      $(this).toggleClass('ticked');
    });
  }

  $('.collapse').on('click', function() {
    $('.inputBox').toggleClass('collapsed');
    if ($('.inputBox').hasClass('collapsed'))
      $(this).html('&laquo;')
    else
      $(this).html('&raquo;')
  });

  $('#generate').on('click', function() {
    const input = $('.inputBox textarea').val().split(/\r?\n/);
    DrawBingoSheet(input); // TODO: add input from textarea
    debugger
  });

  DrawBingoSheet();
});

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
