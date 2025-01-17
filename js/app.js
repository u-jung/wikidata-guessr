

$(document).ready(function() {
    //
    // Setup
    //

    var round = 1;
    var points = 0;
    var roundScore = 0;
    var totalScore = 0;
    ranOut = false;
    var distance;
    
    
    
    
    //
    //
    //
    $("#content").append(
            '<div id="roundEnd"></div>\
            <div id="endGame"></div>\
            <div id="scoreBoard">\
				<span class="topic"></span>\
                <span class="round">Current Round: <b>1/5</b></span><br/>\
                <span class="roundScore">Last Round Score: <b>0</b></span><br/>\
                <span class="totalScore">Total Score: <b>0</b></span><br />\
                <span><a href="https://github.com/blinry/wikidata-guessr">View project on GitHub</a></span>\
                <span>\
                    <select id="mode">\
                        <option value="">'+__("Start new game...")+'</option>\
                        <option value="">'+__("Any item")+'</option>'+initRestrictions()+'\
                    </select>\
                </span>\
            </div>\
            <div id="miniMap"></div>\
            <div id="guessButton" class="btn btn-large btn-danger">'+__("Make Your Guess")+'</div>\
            <img id="image" src="" />'   
    
    );

    //
    //  Init maps
    //

    svinitialize();
    mminitialize();
    $('#image').draggable();
    $('#scoreBoard').draggable();
    $('#image').dblclick(function(){
			if($('#image').css("max-width")=="100%"){
				$('#image').css("max-width","200%");
				$('#image').css("max-height","200%");
				}
			else{
				$('#image').css("max-width","100%");
				$('#image').css("max-height","100%");
				$('#image').css("left","10px");
				$('#image').css("top","10px");
				};
		})

    //
    // Scoreboard & Guess button event
    //

    // Init Timer
    resetTimer();

    var mode = document.getElementById("mode");
    mode.onchange = function() {
        var value = mode.options[mode.selectedIndex].value;
        console.log(value);
        document.location.search = value;
    }

    // Timer
    function timer() {
        count = count-1;
        if (count <= 0) {
            if (round < 5){
                endRound();
            } else if (round >= 5){
                endGame();
            };
            clearInterval(counter);
        }
        $("#timer").html(count);
    };

    // Guess Button
    $('#guessButton').click(function (){
        doGuess();
        rminitialize();
    });

    // End of round continue button click
    $('#roundEnd').on('click', '.closeBtn', function () {
        $('#roundEnd').fadeOut(500);

        if (round < 5){

            round++
            if(ranOut==true){
                roundScore = 0;
            } else {
                roundScore = points;
                totalScore = totalScore + points;
            }
            // What is the current topic?
            var options=$('#mode option');
            var values = $.map(options ,function(option) {
				return option.value +'|'  + option.text;
			});
			for (var i=2;i<values.length;i++){
				if(values[i].split("|").slice(0,2).join("|").slice(1,100)==window.location.search.substr(1)){
					$('.topic').html('Topic: '+ values[i].split("|")[2]+'<br/>');
					break;
				}
			}
			
            $('.round').html('Current Round: <b>'+round+'/5</b>');
            $('.roundScore').html('Last Round Score: <b>'+roundScore+'</b>');
            $('.totalScore').html('Total Score: <b>'+totalScore+'</b>');

            var img = document.getElementById('image');
            img.src = "";

            // Reload maps to refresh coords
            svinitialize();
            guess2.setLatLng({lat: -999, lng: -999});
            mymap.setView([30, 10], 1);

            // Reset Timer
            resetTimer();
        } else if (round >= 5){
            endGame();
        };
    });

    // End of game 'play again' button click
    $('#endGame').on('click', '.playAgain', function () {
        window.location.reload();
    });

    //
    // Functions
    //

    // Reset Timer
    function resetTimer(){
        count = 999999;
        counter = setInterval(timer, 1000);
    }

    // Calculate distance between points function
    function calcDistance(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2-lat1);
        var dLon = toRad(lon2-lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) {
        return Value * Math.PI / 180;
    }

    function doGuess(){
        if (ranOut == false){

            // Stop Counter
            clearInterval(counter);

            // Reset marker function
            function resetMarker() {
                //Reset marker
                if (guessMarker != null) {
                    guessMarker.setMap(null);
                }
            };

            // Calculate distance between points, and convert to kilometers
            distance = Math.ceil(calcDistance(window.actualLatLng.lat, window.actualLatLng.lon, window.guessLatLng.lat, window.guessLatLng.lng));

            // Calculate points awarded via guess proximity
            function inRange(x, min, max) {
                return (min <= x && x <= max);
            };

            var earthCircumference = 40075.16;
            var x = 2.00151 - (distance/(earthCircumference/4));
            points = Math.round(2100 * ((1 / (1 + Math.exp(-4 * x + 5.2))) + (1 / (Math.exp(-8 * x + 17.5))) + (1 / (Math.exp(-30 * x + 61.2))) + (500 / (Math.exp(-250 * x + 506.7)))));

            roundScore = points;

            endRound();

        } else {

            // They ran out

        }

        timer();

    };

    function endRound(){

        // If distance is undefined, that means they ran out of time and didn't click the guess button
        if(typeof distance === 'undefined' || ranOut == true){
            $('#roundEnd').html('<p>Dang nabbit! You took too long!.<br/> You didn\'t score any points this round!<br/><br/><button class="btn btn-primary closeBtn" type="button">Continue</button></p></p>');
            $('#roundEnd').fadeIn();

            // Stop Counter
            clearInterval(counter);

            // Reset marker function
            function resetMarker() {
                //Reset marker
                if (guessMarker != null) {
                    guessMarker.setMap(null);
                }
            };

            //window.guessLatLng = '';
            ranOut = false;

            points = 0;

        } else {
            $('#roundEnd').html('<p>Your guess was<br/><strong><h1>'+distance+'</strong>km</h1> away from the actual location,<br/><h2><a href="'+window.locID+'">'+window.locName+'</a>' + (window.locDescription ? ', '+window.locDescription : '' ) + '.</h2><div id="roundMap"></div><br/> You have scored<br/><h1>'+roundScore+' points</h1> this round!<br/><br/><button class="btn btn-primary closeBtn" type="button">Continue</button></p></p>');
            $('#roundEnd').fadeIn();
        };

        // Reset Params
        ranOut = false;

    };

    function endGame(){

        roundScore = points;
        totalScore = totalScore + points;

        $('#miniMap, #pano, #guessButton, #scoreBoard').hide();
        $('#endGame').html('<h1>'+__("Congrats!")+'</h1><h2>'+__("Your final score was:")+'</h2><h1>'+totalScore+'!</h1><br/><button class="btn btn-large btn-success playAgain" type="button">'+__('Play Again?')+'</button>');
        $('#endGame').fadeIn(500);

        //rminitialize();

        // We're done with the game
        window.finished = true;
    }
    
    function initRestrictions(){
		var tmp="";
		for (var i=0;i<restrictions.length;i++){
			tmp+='<option value="?'+restrictions[i]["p"]+'|'+restrictions[i]["q"]+'">'+__(restrictions[i]["qTerm"])+'</option>\n'
		}
		return tmp
	}

    function svinitialize() {
        var params = window.location.search.substr(1);
        if (params && params.match(/^P\d+\|Q\d+$/)) {
            var restriction = "?item wdt:"+params.split("|")[0]+" wd:"+params.split("|")[1]+".";
        } else {
            var restriction = "";
        }
		lang=$('#lang').text();
        const query = `
        SELECT ?item ?itemLabel ?itemDescription ?lat ?lon ?photo WHERE { 
            { 
                SELECT ?item ?photo ?lat ?lon 
                WHERE { 
                    ?item wdt:P18 ?photo .  
                        ?item p:P625 ?statement . 
                        ?statement psv:P625 ?coords . 
                        ?coords wikibase:geoLatitude ?lat . 
                        ?coords wikibase:geoLongitude ?lon . 
                        ${restriction} 
                } LIMIT 1000
            } 
            SERVICE wikibase:label { bd:serviceParam wikibase:language "${lang},en,de". } 
        } 
        `;
        const url = `https://query.wikidata.org/bigdata/namespace/wdq/sparql?format=json&query=${query}`;
            window.fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.warn(`Looks like there was a problem. Status Code: ${response.status}`);
                        return;
                    }
                    response.json().then(function (data) {
                        var i = Math.floor(Math.random()*data.results.bindings.length)
                        var place = data.results.bindings[i];

                        var img = document.getElementById('image');
                        img.src = place.photo.value;
                        window.actualLatLng = {lat: place.lat.value, lon: place.lon.value};
                        window.locID = place.item.value;
                        window.locName = place.itemLabel.value;
                        if (place.itemDescription) {
                            window.locDescription = place.itemDescription.value;
                        } else {
                            window.locDescription = undefined;
                        }
                    });
                }
            )
            .catch(function (err) {
                console.warn('Fetch Error :-S', err);
            });
    };
});
