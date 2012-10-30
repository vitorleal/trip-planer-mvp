$(function () {
    if (window.location.hash === '#start') {
        $('#startModal').modal();
    }

    $(".chzn-select").chosen();
});