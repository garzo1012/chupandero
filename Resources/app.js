Titanium.UI.setBackgroundColor('white');

var ch = {};

Titanium.include(
	'ui/main.js',
	'ui/bares.js',
	'ui/mapa.js'
);

var tabs = ch.ui.tabGroup();

tabs.open();