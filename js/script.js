$(function () {
    $('#photo-viewer').customPhotoViewer().show().on('click', '.photo-box', function (e) {
        var $content = $(this).clone().find('img').css({
            marginLeft: 0,
            marginTop: 0,
            width: '100%',
            height: 'auto'
        });
        //modal code goes here
    });
});

/* CONG NHA LE - My code starts here */
function changeH1TagWithMyName () {
    $('h1').text('CONG NHA LE');
}

$(document).ready(function () {
    changeH1TagWithMyName();
})