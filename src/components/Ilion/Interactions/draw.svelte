<script>

import 'ol/ol.css';
import Draw from 'ol/interaction/Draw';
import { afterUpdate, onMount } from 'svelte';
import { Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";

export let map;
let selected = "None";
let draw;
let typeSelect;
let addInteraction = () => {}

// After update DOM execute draw
afterUpdate(() => {
  const source = new VectorSource({wrapX: false});
  addInteraction= () => {
    const value = typeSelect.value;
    if (value !== 'None') {
      draw = new Draw({
        source,
        type: typeSelect.value,
      });
      map.addInteraction(draw);
      map.addLayer(
        new VectorLayer({
          source,
        })
      )
    }
  }
})

onMount(() => {
  typeSelect = document.getElementById('type');
})

const changeDrawType = () => {
  map.removeInteraction(draw);
addInteraction();
}



</script>

<form class="form-inline">
  <label for="type">Geometry type: &nbsp;</label>
  <!-- svelte-ignore a11y-no-onchange -->
  <select class="form-control mr-2 mb-2 mt-2" id="type" bind:value={selected} on:change={changeDrawType}>
    <option value="Point">Point</option>
    <option value="LineString">LineString</option>
    <option value="Polygon">Polygon</option>
    <option value="Circle">Circle</option>
    <option value="None">None</option>
  </select>
  <input class="form-control mr-2 mb-2 mt-2" type="button" value="Undo" id="undo" on:click={draw.removeLastPoint()}>
</form>