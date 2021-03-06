$(document).ready(function() {
  Player.init({
    container: App.soundcloudContainerId,
    footnoteTarget: App.footnoteTarget,
    soundcloudUrl: App.soundcloudUrl,
    srtUrl: App.srtApiEndpoint + App.srtUrl
  });
  Canvas.init()
  App.initListeners();
});


var App = {

  // Update these 2 urls to change what podcast gets loaded on the page
  soundcloudUrl: 'http://soundcloud.com/outloud-radio-1/a-trans-cendent-perspective',
  srtUrl: 'http://new.outloudradio.org/sites/default/files/transcripts/A_Trans-cendent_Perspective.en_.srt',

  soundcloudContainerId: '#soundcloud',
  footnoteTarget: 'footnote',
  srtApiEndpoint: 'http://srt2json.herokuapp.com/?url=',

  initListeners: function() {

    $("#share_button").click(function(e) {
      e.preventDefault();

      quote = $(".quote:visible")
      quote = (quote.length > 0) ? quote.html() : 'Play the podcast. :)'

      Canvas.wrapText(quote);
      Player.pop.pause()
    });

    $("#bgColor").change(function() {
      Canvas.lineHeight = 42;
      Canvas.default_font = 38;
      Canvas.ctx.fillStyle = $("#bgColor").val();
      Canvas.ctx.fillRect(0,0,500,400);
      Canvas.ctx.fillStyle = $("#fgColor").val();
      Canvas.wrapText($(".quote:visible").html());
      Canvas.renderWatermark();
    });

    $("#fgColor").change(function() {
      Canvas.lineHeight = 42;
      Canvas.default_font = 38;
      Canvas.ctx.fillStyle = $("#fgColor").val();
      Canvas.wrapText($(".quote:visible").html());
    });

    $("#soundcloud").on('DOMSubtreeModified', function() {
      $('.spinner').fadeOut()

    });

    $('button#share').on('click', function() {
      Canvas2Image.saveAsPNG($("#can")[0]);
    })

    $('#share_modal').on('hidden.bs.modal', function () {
      Canvas.clear()
      Canvas.init()
      Player.pop.play()
    })
  }
};
