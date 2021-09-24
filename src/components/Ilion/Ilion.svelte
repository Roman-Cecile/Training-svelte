<script>
  // OPENLAYER
  import { Map, View } from "ol";
  import { Tile } from "ol/layer";
  import { XYZ } from "ol/source";
  import { get as getProjection } from "ol/proj";
  import "ol/ol.css";

  // Interactions
  import {dragAndDrop} from "./Interactions/dragAndDrop"
  import {openGeometry} from "./Interactions/openGeometry"

  // SVELTE
import { onMount } from "svelte";

// ACTIONS
import {moveStart} from "./MoveMap/moveStart"
import {mainLayerBuild} from "./MainLayer/mainLayerBuild"



let map;

onMount(() => {

  //..............MAP INIT..............
  map = new Map({
    layers: [
        // Tile layers
        new Tile({
          preload: Infinity,
          source: new XYZ({
            // Google Satellite (change lyrs=s to "y" for Hybrid)
            url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
            crossOrigin: "Anonymous",
          }),
          
          visible:true,
          name: "satellite",
        }),
        // Free OSM
        new Tile({
          preload: Infinity,
          source: new XYZ({
            // OSM Free
            url: "https://osm.proxad.net/osm/{z}/{x}/{y}.png",
            crossOrigin: "Anonymous",
          }),
          visible:false,
          name: "osm",
        }),
      ],
    target: 'map',
    view: new View({
      center: [430859.8627255495, 5405358.999465257],
      zoom: 18,
      constrainResolution: true,
      projection: getProjection("3857"),
      extent: [
        -4486061.8142350465, 3809906.867586845, 3898774.4405356483,
        8403466.519412797,
      ],
    }),
  });

  //..............DRAG AND DROP GEOJSON FILE..............
  dragAndDrop(map)

  //..............BUILD MAIN LAYERS..............
  mainLayerBuild(map)


  //..............EVENT MAP..............
  map.on("movestart", moveStart)
  map.on("click", openGeometry)
})

</script>

<div id="map" class="map">
</div>

<style>
    .map {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      position: absolute;
    }
  </style>