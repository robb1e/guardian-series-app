var gu = gu || {};
gu.series = {
    rows: 1,
    row: -1,
   init: function(){
       $('section').attr('style="display:none;"');
       document.title = data.tag.webTitle;
       $('.brand').html("The Guardian - " + data.tag.webTitle);
       $('.hero-unit h1').html(data.tag.webTitle);
       gu.series.rows = Math.ceil(data.total / 3);
       var i = 0;
       for(i = 0; i <= gu.series.rows; i++){
           $('#nav').append('<div class="row" data-row="' + i +'">');
       }
       $.each(data.results, gu.series.render);
       gu.series.eventHandlers();
   },
   render: function(index, value) {
      if (index % 3 == 0) gu.series.row = gu.series.row + 1;
      var h = $('div[data-row=' + gu.series.row + ']');
      var span = 5;
      if (index % 3 == 0) span = 6;
      h.append('<div class="span' + span + '"><h2>' + value.webTitle + '</h2><p>'+ value.fields.standfirst + '</p><p><a class="btn primary" href="#" data-path="' + value.id + '">Read &raquo;</a></p></div>');
      $('#content').append('<section data-path='+ value.id + ' style="display:none;"><h1>' + value.webTitle + '</h1><div>' + value.fields.body + '</div></section>');
   },
   eventHandlers: function(){
      $('.btn').bind('click', function(ev){
        var path = $(ev.currentTarget).attr('data-path');
        $('#nav').fadeToggle('slow', function(){
           $('section[data-path="' + path + '"]').fadeToggle('slow');
        });
      }); 
      $('a.brand').click(function(){
          $('section').fadeOut('slow', function(){
              $('#nav').fadeIn('slow');              
          });
      });
   }
};

$(document).ready(function(){
   gu.series.init(); 
});