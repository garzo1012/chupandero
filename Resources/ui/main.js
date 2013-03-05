(function(){

	ch.ui = {};

	//tabgroup principal
	ch.ui.tabGroup = function(){
		var tabGroup = Titanium.UI.createTabGroup();

		var bares = ch.ui.barsWindow();

		ch.bares = Titanium.UI.createTab({
			title:'Bares',
			window: bares
		});

		var win2 = ch.ui.mapaView();

		ch.mapa = Titanium.UI.createTab({
			title: 'Mapa',
			window: win2
		});

		var win3 = Titanium.UI.createWindow({
			title: 'Check in'
		});

		ch.check = Titanium.UI.createTab({
			title:'Check',
			window: win3
		});

		tabGroup.addTab(ch.bares);
		tabGroup.addTab(ch.mapa);
		tabGroup.addTab(ch.check);

		return tabGroup;
	}

})();