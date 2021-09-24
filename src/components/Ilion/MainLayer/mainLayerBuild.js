import { Vector as VectorSource } from "ol/source";
import { VectorImage as VectorImageLayer } from "ol/layer";
import { Fill, Stroke, Style, RegularShape } from "ol/style";
import CircleStyle from "ol/style/Circle";

export const mainLayerBuild = (map) => {
	console.log("moveStart");
	["site", "cable", "pt_tech"].map((topParentName) => {
		const mainLayer = topParentName;
		let style;

		if (topParentName === "site") {
			style = new Style({
				image: new RegularShape({
					fill: new Fill({ color: "rgba(84, 254, 14, 1)" }),
					stroke: new Stroke({
						color: "rgba(255, 255, 255, 1)",
						width: 3,
					}),
					points: 4,
					radius: 8,
					angle: Math.PI / 4,
				}),
			});
		} else if (topParentName === "support" || topParentName === "cable") {
			style = new Style({
				stroke: new Stroke({
					color: "rgba(254, 14, 15, 1)",
					width: 3,
				}),
			});
		} else {
			style = new Style({
				image: new CircleStyle({
					radius: 7,
					fill: new Fill({ color: "rgba(216, 16, 2, 1)" }),
					stroke: new Stroke({
						color: "rgba(0, 0, 1, 1)",
						width: 0.7,
					}),
				}),
			});
		}

		let newLayer = new VectorImageLayer({
			source: new VectorSource(),
			style: style,
			name: topParentName,
			zIndex: 20,
		});
		map.addLayer(newLayer);
	});
};
