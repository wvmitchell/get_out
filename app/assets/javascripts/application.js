// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

var map;
var geocoder;
var markers = [];

$(function initialize(){
	
	var mapOptions = {
		zoom: 10,
		center: new google.maps.LatLng(39.7392, -104.9842),
		mapTypeId: google.maps.MapTypeId.HYBRID,
		panControlOptions: {
			position: google.maps.ControlPosition.TOP_RIGHT
		},
		zoomControlOptions: {
			position: google.maps.ControlPosition.TOP_RIGHT
		}
	}

	// Create map
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	geocoder = new google.maps.Geocoder();
});

function clearOverlays() {
	for(var i=0; i<markers.length; i++){
		markers[i].setMap(null);
	}
	markers = [];
}

function openSlider() {
	$("#info_box").animate({marginRight: "+=580px"});	
}

function closeSlider() {
	$("#info_box").animate({marginRight: "-=580px"});
	if($('#send_email').is(":visible")) {
		$("#send_email").toggle();
	}
}

$(function() {
	$("#pick_this_hike").click(function() {
		$("#send_email").slideToggle("slow");
	});
});

function findHikes(){
	// Find text location
	var locations = document.getElementById("hike_location");
	var address = locations.options[locations.selectedIndex].value;
	
	var d = document.getElementById("hike_duration");
	var duration = d.options[d.selectedIndex].value * 3600;
	
	clearOverlays();
	
	// Set up vars to be sent in ajax request 
	var latitude;
	var longitude;
	
	
	
	// Geocode Location
	geocoder.geocode({'address': address+", Colorado USA"}, function(results, status){
		if (status == google.maps.GeocoderStatus.OK) {
		
			latitude = results[0].geometry.location.lat();
			longitude = results[0].geometry.location.lng();
			
			// AJAX request to use external api
			$.post("groups/hike_array", {lat: latitude, lng: longitude, time: duration},
				function(data){
					// Place markers for each data point
	
					jparsed = JSON.parse(data);
					
					map.setCenter(results[0].geometry.location);
					for(var i=0; i<jparsed.length; i++){
						
						var pos = new google.maps.LatLng(jparsed[i][1], jparsed[i][2]);
						
						var mark = new google.maps.Marker({
							map: map,
							position: pos,
							visible: true,
							clickable: true,
							title: jparsed[i][0]
						});
						
						mark.desc = jparsed[i][3];
						mark.dist = (Math.round(jparsed[i][4]/1609*10))/10;
						mark.tm = (Math.round(mark.dist/2.5*10))/10;
						mark.dif;
						
						if (mark.dist > 8) {
							mark.dif = "Hard";
						} else if (mark.dist > 4) {
							mark.dif = "Moderate";
						} else if (mark.dist > 2) {
							mark.dif = "Warm-up";
						} else {
							mark.dif = "Easy";
						}
						
						google.maps.event.addListener(mark, 'click', function(){
							map.panTo(this.position);
							closeSlider();
							$("#hike_description").children().text(this.desc);
							$("#distance_value").text(this.dist+" miles");
							$("#name_of_hike").children().text(this.title);
							$("#estimated_time_value").text(this.tm+" hours");
							$("#difficulty_value").text(this.dif);
							openSlider();
						})
						
						markers[i] = mark;
					}
				}
			);
		} else {
			alert("Sorry, but I don't know where that location is");
		}
	});
}

function sendEmail() {
	$.post("groups/send_email", {email: $("#email_address").val(), tname: $("#name_of_hike").children().text(), dist: $("#distance_value").text(), dif: $("#difficulty_value").text(), time: $("#estimated_time_value").text()}, 
		function(){
			var htmlElems = "<a href=\"groups\">"+
			"<div id=\"overlay\">"+
				"<div id=\"blue_box\">"+
		                "<div id=\"announce_text\">"+
		                    "<p>Now you're off! And so's an email, into your inbox– barring being "+
		                     "cast in the spam-pit.</p><br />"+

		                    "<p>Hopefully you enjoy the hike. If you'd like to search "+
		                    "for another, just click anywhere. <i>Gracias</i>.</p><br />"+

		                    "<p>-Will, Eric, and Lionel</p>"+
		                "</div>"+
		            "</div>"+
		    "</div>"+
		    "</a>";
			$("#map").siblings().toggle();
			$("#map").html(htmlElems);
		});
}

$(function(){
	$(".form_tab").children().click(function(){
		var width = $("#form_container").outerWidth(true);
		console.log(width);
		if(width <= 0){
			$("#form_container").animate({marginLeft: "+=0px"});
		} else {
			$("#form_container").animate({marginLeft: "-=322px"});
		};	
	});
});


