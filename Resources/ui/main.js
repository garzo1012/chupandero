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

		tabGroup.addTab(ch.bares);
		tabGroup.addTab(ch.mapa);

		return tabGroup;
	}

})();