(function(){

	ch.ui.mapaView = function(){

		var mapview = Titanium.Map.createView({
			mapType: Titanium.Map.STANDARD_TYPE,
			region: {latitude:19.0170307, longitude:-98.2011056, latitudeDelta:0.005, longitudeDelta:0.005},
			animate: true,
			regionFit: true,
			userLocation: true
		});

		var url = "http://chupandero.com/bars.json";
		var json, bar, i;
		 
		var xhr = Ti.Network.createHTTPClient({
		    onload: function() {
				
				json = JSON.parse(this.responseText);
				for (i = 0; i < json.bar.length; i++) {
					bar = json.bar[i];
					var anotacion = Titanium.Map.createAnnotation({
						latitude: bar.latitude,
						longitude: bar.longitude,
						title: bar.name,
						subtitle: bar.promo,
						pincolor: Titanium.Map.ANNOTATION_RED,
						animate: true,
						myid: bar.id
					});
					
					mapview.addAnnotation(anotacion);
			    }
				
		    },
		    onerror: function(e) {
			Ti.API.debug("STATUS: " + this.status);
			Ti.API.debug("TEXT:   " + this.responseText);
			Ti.API.debug("ERROR:  " + e.error);
			alert('There was an error retrieving the remote data. Try again.');
		    },
		    timeout:5000
		});
		 
		xhr.open("GET", url);
		xhr.send();



		var win = Titanium.UI.createWindow({
				title: 'Mapa',
				layout: 'vertical',
				backgroundColor:'#fff'
			});

		win.add(mapview);

		return win;
	}

})();