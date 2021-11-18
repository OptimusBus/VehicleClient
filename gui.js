$(document).ready(function(){
    $('.b-home').on("click", function(){
        clearGui();
    });
    $('.b-standings').on("click", function(){
        showAllStandings();
    });
    $('.b-pickup').on("click", function(){
        showAllPickups();
    });
    $('.b-location').on("click", function(){
        showCurrentPosition();
    });
    $('.b-route').on("click", function(){
        sendRouteRequest();
    });
    $('.b-failure').on("click", function(){
        createFailureMessage();
    });
    $('.b-code').on("click", function(){
        createCodeMessage();
    });
    $('.b-support').on("click", function(){
        sendSupportRequest();
    });
    $('.login-box-button').on("click", function(){
        logMe();
    });
    $('.vehicle-data').on("click", function(){
        collapseMenu();
    });
    $('.standingpoint-box').on("click", function(){
        showThisStanding();
    });
});