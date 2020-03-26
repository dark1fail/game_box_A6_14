const numDivs = 36;
const maxHits = 10;

let hits = 0;
let miss = 0;
let good = 0;
let accuracy = 0;

$(".game-field").hide();
$("#button-reload").hide();

$( "#hide-show" ).click(function() 
{
  starttime = new Date;
  $( ".btn-block" ).hide( "fast", function() 
  {
    $( this ).prev().hide( "fast", arguments.callee );
  });
});
$( "#hide-show" ).click(function() 
{
  $( ".game-field" ).show( 300 );
  $("#button-reload").show(300);
});

function round() 
{
  divSelector = randomDivId();

  $(divSelector).addClass("target").removeClass("miss").html(hits + 1);


  if (hits === maxHits) 
  {
    endtime = new Date;

    $( ".game-field" ).hide( "fast", function() 
    {
      $( this ).prev().hide( "fast", arguments.callee );
    });

    time = (endtime - starttime) / 1000;
    min = Math.floor(time / 60);
    sec = time - min * 60;

    accuracy = good / hits * 100;

    if (time >= 60)
    {
      alert("Ваше время составляет: " + (min) + " min " + (sec) + " sec" + "\n" 
        + "Ваша точность составляет: " + (accuracy) + "%" + "\n" 
        + "Количество попаданий: " + good + ", количество промахов: " + miss);
    }

    else
    {
      alert("Ваше время составляет: " + (time) + " sec" + "\n" 
        + "Ваша точность составляет: " + (accuracy) + "%" + "\n" 
        + "Количество попаданий: " + good + ", количество промахов: " + miss);
    }
  }
}

function handleClick(event) 
{ 
  if ($(".game-field").hasClass("miss"))
  {
    $(".miss").removeClass("miss").removeClass("target").html("");
  }

  if ($(event.target).hasClass("target")) 
  {
    $(event.target).removeClass("target").removeClass("miss").html("");

    hits += 1;
    good += 1;

    round();
  }
  else
  {
    $(event.target).addClass("miss").removeClass("target");
    $(divSelector).removeClass("target").html("");
    
    hits += 1;
    miss += 1;

    round();
  }
}

function init() 
{
  round();

  $(".game-field").click(handleClick);

  $("#button-reload").click(function() 
  {
    location.reload();
  });
}

$(document).ready(init);
