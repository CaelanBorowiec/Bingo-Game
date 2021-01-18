$(document).ready(function() {
  const Autosave = (Cookies.get('autosave') ? true : false);

  const DrawBingoSheet = function(Questions = false) {
    const Squares = (5 * 5);
    const FreeSpace = true;
    if (!Questions || Questions == '')
      // OCR from https://www.reddit.com/r/ProgrammerHumor/comments/c4jlyt/programming_bingo/
      Questions = [
        "Changing something causes an error in an entirely different part of the program",
        "Bug that vanishes when attempting to debug it",
        "Code has been updated, comments haven't",
        "TODO tasks grow faster than done tasks",
        "Swearing in comments",
        "Question closed on stack overflow",
        "OutOfMemory Exception [or equivalent]",
        "Project with at least 3 different conflicting naming schemes",
        "Spend all night trying to trace a bug",
        "Take more than twice the original time estimate to complete a task",
        "Procrastinate on Reddit",
        "Find major bug in prod that has somehow stayed undetected for years",
        "Bad documentation",
        "https://xkcd.com/979/",
        "Stack trace too long to fit on your screen",
        "Push untested code to prod",
        "NULL Pointer Exception [or equivalent]",
        "Spend several hours fixing a small visual bug",
        "IDE Crashes",
        "Third party library refuses to build",
        "Copy paste code you don't understand",
        "Windows vs macOS debate",
        "Close 10+ tabs after fixing an issue",
        "Project depends on multiple versions of the same library",
        "Endless debate about what language/library to use"
      ];

    const cellsPerRow = Math.sqrt(Squares);
    const star = Math.ceil((cellsPerRow / 2));
    let shuffledQuestions;
    if (Autosave && Cookies.get('questions') ? true : false)
      shuffledQuestions = JSON.parse(Cookies.get('questions'));
    else
      shuffledQuestions = shuffleArray(Questions);

    let completed = [];
    if (Autosave)
      completed = JSON.parse(Cookies.get('completed'));

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
        $span.text(shuffledQuestions[q].trim());
        q++
      }
      if (typeof completed[i] !== 'undefined' && completed[i] === true)
        questionBlocks[i].addClass('ticked');

      questionBlocks[i].html($span);

      x++;
    }

    $('.generator').html(questionBlocks);
    $('.square').on('click', function() {
      $(this).toggleClass('ticked');
    });
  }

  const SaveBingoSheet = function() {
    let completed = $('.square').map(function() {
      return $(this).hasClass('ticked');
    }).get();

    let shuffledQuestions = $('.square').map(function() {
      return $(this).text();
    }).get();
    const star = shuffledQuestions.indexOf("★");
    if (star > -1) {
      shuffledQuestions.splice(star, 1); // Remove star
    }

    Cookies.set('autosave', true);
    Cookies.set('questions', JSON.stringify(shuffledQuestions));
    Cookies.set('completed', JSON.stringify(completed));
  }

  // Save hook
  $('#save').on('click', function() {
    SaveBingoSheet();
    $(this).addClass('autosaving').text("Autosave Enabled");

    let autoSave = setInterval(function() {
      if ((Cookies.get('autosave') ? true : false)) {
        SaveBingoSheet();
      } else {
        clearInterval(autoSave);
      }
    }, 5000);
  });

  // Reset hook
  $('#reset').on('click', function() {
    Cookies.remove('autosave');
    Cookies.remove('questions');
    Cookies.remove('completed');
  });

  $('.collapse-right, .collapse-top').on('click', function() {
    $(this).parent().toggleClass('collapsed');
    if ($(this).parent().hasClass('collapsed'))
      $(this).html('&laquo;')
    else
      $(this).html('&raquo;')
  });


  $('#generate').on('click', function() {
    const input = $('.inputBox textarea').val().split(/\r?\n/);
    DrawBingoSheet(input);
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
