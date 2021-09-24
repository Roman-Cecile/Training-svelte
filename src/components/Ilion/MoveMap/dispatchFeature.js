import GeoJSON from "ol/format/GeoJSON";

export const dispatchFeature = (map, response, layerName) => {
	const filterLayers = map
		.getLayers()
		.getArray()
		.filter((layer) => layer.getProperties().name === layerName);

	let filteredFeatures = [...response.features];
	let dispatchedUuids = [];
	filterLayers.map((layer) => {
		const readedFeatures = new GeoJSON().readFeatures(response);
		layer.getSource().addFeatures(readedFeatures);
	});
};
