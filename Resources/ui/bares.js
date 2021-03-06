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
			Titanium.App.fireEvent('hideTabGroup');

		});

		var url = "http://chupandero.com/bars.json";
		var tableData = [];
		var json, bar, i, row, nameLabel, nickLabel, imageBar, tags,j,tagtext="";
		 
		var xhr = Ti.Network.createHTTPClient({
		    onload: function() {
				
			json = JSON.parse(this.responseText);
			for (i = 0; i < json.bar.length; i++) {
			    bar = json.bar[i];
			    tags = json.tags[i];
			    for (j = 0; j < tags.tag.length; j++) {
					tagtext = tagtext + tags.tag[j] + ",";
				}

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
					left:'80dp',
					top:'5dp',
					color:'#000',
					touchEnabled:false
			    });
			    nickLabel = Ti.UI.createLabel({
					text:tagtext,
					font:{
					    fontSize:'12dp'
						},
					height:'auto',
					left:'80dp',
					bottom:'5dp',
					color:'#000',
					touchEnabled:false
			    });
		 
				imageBar = Ti.UI.createImageView({
					image: bar.logo,
					width: 50,
					height: 50,
					left: 10,
					top: 5
				}); 
				
			    row.add(ch.ui.label(bar.address));
			    row.add(ch.ui.label(bar.description));
			    row.add(ch.ui.label(bar.phone));
			    row.add(ch.ui.label(bar.promo));
			    row.add(ch.ui.label(bar.logo));
			    row.add(ch.ui.label(bar.latitude));
			    row.add(ch.ui.label(bar.longitude));
			    row.add(nameLabel);
			    row.add(imageBar);
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

	//mapa del bar

	ch.ui.mapaBar = function(lat,long,titulo,promo){
		var win = Titanium.UI.createWindow({
			title: 'Mapa'
		});

		var b = Titanium.UI.createButton({
			title:'Cerrar',
			style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
		});

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
			region: {latitude:lat, longitude:long, latitudeDelta:0.0015, longitudeDelta:0.0015},
			animate: true,
			regionFit: true,
			userLocation: true,
			annotations: [anotacion]
		});

		mapview.selectAnnotation(anotacion);

		win.setLeftNavButton(b);
		win.add(mapview);

		b.addEventListener('click',function(){
			win.close();
		});

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

		var mapa = Titanium.UI.createButton({
			title:'Mapa'
		});

		mapa.addEventListener('click', function(){
			var win = ch.ui.mapaBar(lat,long,titulo,promo);
			win.open({modal:true});
		})

		win.add(imglogo);
		win.add(direccion);
		win.rightNavButton = mapa;
		//win.add(mapview);

		return win;
	}
		
})();