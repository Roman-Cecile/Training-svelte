// Get and tranform extent to 4326 (deg)

import { API } from "../../../utils/API";
import { lat2tile, lon2tile } from "../../../utils/GenericFunctions";
import { transformExtent } from "ol/proj";
import axios from "axios";
import { dispatchFeature } from "./dispatchFeature";

export const moveStart = (event) => {
	console.log("moveStart");
	const currentZoom = event.map.getView().getZoom();
	if (currentZoom < 13) {
		return;
	}
	let cacheKeys = [];
	let featuresUuid = [];
	let extent = event.map.getView().calculateExtent(event.map.getSize());
	extent = transformExtent(
		extent,
		"EPSG:3857", // EPSG:3857
		"EPSG:4326" // EPSG:4326
	);

	// Calculates tiles by zoom
	const leftTile = lon2tile(extent[0], 15);
	const bottomTile = lat2tile(extent[1], 15);
	const rightTile = lon2tile(extent[2], 15);
	const topTile = lat2tile(extent[3], 15);

	// ! COPIER COLLER

	const numberTiles = (rightTile - leftTile + 1) * (bottomTile - topTile + 1);

	// Loop tile counter
	let countTile = 0;
	for (let x = leftTile; x <= rightTile; x++) {
		for (let y = topTile; y <= bottomTile; y++) {
			["cables", "supports", "pt_techs", "sites"].forEach((layerName) => {
				axios
					.get(`http://api.odyssee.staging.vlq16.iliad.fr/v1/${layerName}/?x=${x}&y=${y}&z=15`, {
						cache: cacheKeys[`${layerName}-${x}-${y}`], // custom cache key
					})
					.then((response) => {
						const x = response.data.x;
						const y = response.data.y;
						const type = response.data["@type"];

						const key = `${type}-${x}-${y}`;

						cacheKeys[key] = response.data.cache;
						// console.log({ key });
						// console.log({ x });
						// console.log({ y });
						// console.log(response.data);

						let finalFeatures = [];

						response.data.features.map((feature) => {
							const featureUuid = feature.properties.uuid;

							// If current feature isn't already added to current layer source
							// > meaning: if current feat uuid isn't already associated in featuresUuid (local prop)
							if (!featuresUuid[featureUuid]) {
								featuresUuid[featureUuid] = true;
								finalFeatures.push(feature);
							}
						});
						// console.log({ response });
						// console.log({ finalFeatures });
						response.features = finalFeatures;

						// mainLayer.getSource().addFeatures(readedFeatures);
						// this.dispatchFeatures(response, layerName);
						// dispatch feature in layer
						dispatchFeature(event.map, response.data, type);
					})
					.catch((error) => console.log(error));
			});
		}
	}
};
