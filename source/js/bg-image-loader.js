$(function () {
    var threshold = 0.2; // wiggle room before switching to contain

    // check the aspect ratio of each image to see whether to use contain or cover for background-size
    $('[bg-url]').each(function() {
        var $bgElement = $(this);
        var size = 'cover';
        var url = $(this).attr('bg-url');
        var img = new Image();

        // wait for image to be fully loaded
        $(img).on('load', function(){
            var ar = img.width / img.height;
            if (ar > 1 + threshold) {
                size = '90%';
            }
            $bgElement.css( 'background-image',  'url(' + url + ')' );
            $bgElement.css( 'background-size', size );
        });

        // set image src after handler is set up, otherwise never gets called
        img.src = url;
    });

});