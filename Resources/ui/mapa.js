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
	
	
		/*if(Titanium.Geolocation.locationServicesEnabled === false){

			Titanium.UI.createAlertDialog({
				title:'GPS desactivado',
				message:'El servicio de gps esta desactivado'
			}).show();

			win.add(Titanium.UI.createLabel({
				text:'error al cargar el mapa gps desactivado'
			}));

		}else{

			Titanium.Geolocation.preferredProvider = 'gps';
			Titanium.Geolocation.purpose = 'GPS demo';
			Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
			Titanium.Geolocation.distanceFilter = 10;

			win.addEventListener('open',function(){

				Titanium.Geolocation.getCurrentPosition(function(e){

					if(!e.success || e.error){
						win.add(Titanium.UI.createLabel({
							text:'error en geolocalizacion'
						}));
						return;
					}

					
					var mapview = Titanium.Map.createView({
						mapType: Titanium.Map.STANDARD_TYPE,
						region: {latitude:e.coords.latitude, longitude:e.coords.longitude, latitudeDelta:0.1, longitudeDelta:0.1},
						animate: true,
						regionFit: true,
						userLocation: true
					});
		
					win.add(mapview);

				});

			});

		}*/

		win.add(mapview);

		return win;
	}

})();