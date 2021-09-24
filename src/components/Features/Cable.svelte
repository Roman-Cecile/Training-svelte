<script>
import axios from 'axios';
import { createEventDispatcher } from "svelte";
import {location} from 'svelte-spa-router'
import cable from "../store/cable";
const dispatch = createEventDispatcher();

// submit car
const submitCable = () => {
    cable.cableUpdate(data);
}
  let featureLength;
  axios.get(`http://api.odyssee.staging.vlq16.iliad.fr/v1${$location}`).then(({data}) => {
    featureLength = data.lgr_reel
  })

</script>

<h1>roman</h1>
<h1>{featureLength}</h1>