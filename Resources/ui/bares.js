(function(){
	// label oculto para datos extras
	ch.ui.label = function(valor){
		
		var label = Titanium.UI.createLabel({
			text:valor
		});

		label.setVisible(false);

		return label;
	}

	// tabla de bares
	ch.ui.barsTable = function(){

		var table = Titanium.UI.createTableView();

		table.addEventListener('click',function(_e){
			activeTab = ch.bares;
			var direccion = _e.row.children[0].text;
			var desc = _e.row.children[1].text;
			var tel = _e.row.children[2].text;
			var promo = _e.row.children[3].text;
			var logo = _e.row.children[4].text;
			var latitude = _e.row.children[5].text;
			var longitude = _e.row.children[6].text;
			var titulo = _e.row.children[7].text;
			
			activeTab.open(ch.ui.detailBar(direccion, desc, tel, promo, logo, titulo,latitude,longitude));

		});

		var url = "http://chupandero.com/bars.json";
		var tableData = [];
		var json, bar, i, row, nameLabel, nickLabel;
		 
		var xhr = Ti.Network.createHTTPClient({
		    onload: function() {
				
			json = JSON.parse(this.responseText);
			for (i = 0; i < json.length; i++) {
			    bar = json[i];
			    row = Ti.UI.createTableViewRow({
			    	hasChild: true,
			        height:'60dp'
			    });

			    nameLabel = Ti.UI.createLabel({
			        text:bar.name,
			        font:{
			            fontSize:'16dp',
				    fontWeight:'bold'
					},
					height:'auto',
					left:'10dp',
					top:'5dp',
					color:'#000',
					touchEnabled:false
			    });

			    nickLabel = Ti.UI.createLabel({
					text:bar.horary,
					font:{
					    fontSize:'12dp'
						},
					height:'auto',
					left:'15dp',
					bottom:'5dp',
					color:'#000',
					touchEnabled:false
			    });
		 
			    row.add(ch.ui.label(bar.address));
			    row.add(ch.ui.label(bar.description));
			    row.add(ch.ui.label(bar.phone));
			    row.add(ch.ui.label(bar.promo));
			    row.add(ch.ui.label(bar.logo));
			    row.add(ch.ui.label(bar.latitude));
			    row.add(ch.ui.label(bar.longitude));
			    row.add(nameLabel);
			    row.add(nickLabel);
			    tableData.push(row);
		        }
				
			table.setData(tableData);
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

		return table;
	}

	//ventana con la lista de bares
	ch.ui.barsWindow = function(){
		var win = Titanium.UI.createWindow({
			title: 'Lista'
		});

		win.add(ch.ui.barsTable());

		return win;
	}

	//detalle bar
	ch.ui.detailBar = function(dir, desc, tel, promo, logo, titulo, lat, long){

		var win = Titanium.UI.createWindow({
			title: titulo,
			layout: 'vertical'
		});

		var imglogo = Titanium.UI.createImageView({
			image: logo,
			height: 100,
			width:100,
			top: 10,
			borderRadius: 6
		});

		var direccion = ch.ui.label(dir);
		direccion.setVisible(true);

		var anotacion = Titanium.Map.createAnnotation({
			latitude: lat,
			longitude: long,
			title: titulo,
			subtitle: promo,
			pincolor: Titanium.Map.ANNOTATION_RED,
			animate: true,
			myid: 1
		});

		var mapview = Titanium.Map.createView({
			mapType: Titanium.Map.STANDARD_TYPE,
			region: {latitude:lat, longitude:long, latitudeDelta:0.01, longitudeDelta:0.01},
			animate: true,
			regionFit: true,
			userLocation: true,
			annotations: [anotacion]
		});

		win.add(imglogo);
		win.add(direccion);
		win.add(mapview);

		return win;
	}

})();