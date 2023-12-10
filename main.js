import {altKeyOnly, click, pointerMove} from 'ol/events/condition.js';
import Graticule from 'ol/layer/Graticule.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {Fill, Stroke, Style} from 'ol/style.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import Select from 'ol/interaction/Select.js';
import {toLonLat} from 'ol/proj.js';
import {toStringHDMS} from 'ol/coordinate.js';
import Overlay from 'ol/Overlay.js';


/**
 * Elements that make up the popup.
 */
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');
let select = null; // ref to currently selected interaction

/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};



const selectGrid = document.getElementById('grid');

const graticule = new Graticule({
  strokeStyle: new Stroke({
    color: 'rgba(255,120,0,0.9)',
    width: 2,
    lineDash: [0.5, 4],
  }),
  showLabels: true,
  wrapX: false,
  visible: true,
});


const  changeGrid = function () {
  if ( selectGrid.value == "ATIVADO"){
    map.addLayer(graticule);
  }
  if ( selectGrid.value == "DESATIVADO"){
    map.removeLayer(graticule)
  }
}

/*const style = new Style({
  fill: new Fill({
    color: '#eeeeee',
  }),
});*/

const style = new Style({
  stroke: new Stroke({
    color: 'black',
    width: 1,
  }),
  fill: new Fill({
    color: 'rgb(48, 148, 0)',
  }),
});

const vector_2 = new VectorLayer({
  source: new VectorSource({
    url:'./Charts/JSON/result.geojson',
    format: new GeoJSON(),
  }),
  stroke: new Stroke({
    color: 'black',
    width: 1,
  }),
  fill: new Fill({
    color: 'rgb(98, 105, 249)',
  }),
});

const vector = new VectorLayer({
  source: new VectorSource({
    //url: 'https://openlayers.org/data/vector/ecoregions.json',
    //url:'./Charts/JSON/Unidades_Federativas.geojson',
    //url:'./Charts/JSON/countries.geojson',
    url:'./Charts/JSON/Terras_Ind.geojson',
    //url:'./Charts/JSON/result.geojson',
    format: new GeoJSON(),
  }),
  //background: 'white',
  /*style: function (feature) {
    const color = feature.get('COLOR') || '#eeeeee';
    style.getFill().setColor(color);
    return style;
  },*/
  style: style
});



const map = new Map({
  layers: [ new TileLayer({
    source: new OSM(),
  }), vector],
  overlays: [overlay],
  target: 'map',
  view: new View({
    projection: 'EPSG:4326',
    center: [-50, -13],
    zoom: 5,
  }),
});


const selected = new Style({
  fill: new Fill({
    color: '#eeeeee',
  }),
  stroke: new Stroke({
    color: 'rgba(255, 255, 255, 0.7)',
    width: 2,
  }),
});

function selectStyle(feature) {
  const color = feature.get('COLOR') || '#eeeeee';
  selected.getFill().setColor(color);
  return selected;
}

// select interaction working on "singleclick"
const selectSingleClick = new Select({style: selectStyle});

// select interaction working on "click"
const selectClick = new Select({
  condition: click,
  style: selectStyle,
});

// select interaction working on "pointermove"
const selectPointerMove = new Select({
  condition: pointerMove,
  style: selectStyle,
});

const selectAltClick = new Select({
  style: selectStyle,
  condition: function (mapBrowserEvent) {
    return click(mapBrowserEvent) && altKeyOnly(mapBrowserEvent);
  },
});

const selectElement = document.getElementById('type');

const view = new View({
  center: [0, 0],
  zoom: 1,
});


const changeInteraction = function () {
  if (select !== null) {
    map.removeInteraction(select);
  }
  const value = selectElement.value;
  if (value == 'singleclick') {
    select = selectSingleClick;
  } else if (value == 'click') {
    select = selectClick;
  } else if (value == 'pointermove') {
    select = selectPointerMove;
  } else if (value == 'altclick') {
    select = selectAltClick;
  } else {
    select = null;
  }
  if (select !== null) {
    map.addInteraction(select);    
    /*select.on('select', function (e) {
      var value = e.target.getFeatures().array_[0].values_;
      //console.log(Object.entries(value))
      document.getElementById('status').innerHTML = '&nbsp;' + value.ADMIN;
    });*/
    map.on('singleclick', function (evt) {
      select.on('select', function (e) {
        var value = e.target.getFeatures().array_[0].values_;
        //console.log(Object.entries(value))
        //document.getElementById('status').innerHTML = '&nbsp;' + value.ADMIN;
        const coordinate = evt.coordinate;
        const hdms = toStringHDMS(toLonLat(coordinate));
        var data = "";
        Object.entries(value).forEach(function(key) {
         if (key[0] != 'geometry' && key[0] != 'gid' && key[0] != '__gid'){
          data = data + "<div><div class='row'><div class='col-xs-6' style='font-weight: bold; word-wrap: break-word; left: 25px'>" + '&nbsp;' + key[0] + ":</div><div class='col-xs-6' style='word-wrap: break-word;'>" + '&nbsp;' + '<code>' +  key[1]  + '</code>' + "</div></div></div>"
         }
        });
        content.innerHTML = "<div style='font-weight: bold;'>"+'<center>DADOS</center>'+'</div>' + data  + '&nbsp'  + "<div>"+ "<center>"+hdms+"</center>" + "</di>"
        overlay.setPosition(coordinate); });
      
    }); 
  }
};

/**
 * onchange callback on the select element.
*/
selectGrid.onchange = changeGrid;
selectElement.onchange = changeInteraction;
changeInteraction();