$(function () {
    //Active dropdown menus
    $('.dropdown-toggle').dropdown();

    //Activate tooltips
    $('[rel="tooltip"]').tooltip();

    //Remove alerts
    if ($(".alert")) {
        setTimeout(function() {
            $(".alert").alert('close');
        }, 3500);
    }
});