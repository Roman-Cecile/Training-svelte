import DragAndDrop from "ol/interaction/DragAndDrop";
import { GeoJSON } from "ol/format";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";

let dragAndDropInteraction;
export const dragAndDrop = (map) => {
	if (dragAndDropInteraction) {
		map.removeInteraction(dragAndDropInteraction);
	}
	dragAndDropInteraction = new DragAndDrop({
		formatConstructors: [GeoJSON],
	});
	dragAndDropInteraction.on("addfeatures", function (event) {
		var vectorSource = new VectorSource({
			features: event.features,
		});
		map.addLayer(
			new VectorLayer({
				source: vectorSource,
			})
		);
		map.getView().fit(vectorSource.getExtent());
	});
	map.addInteraction(dragAndDropInteraction);
};
