export const openGeometry = (event) => {
	const featuresAtPixel = event.map
		.getFeaturesAtPixel(event.pixel, {
			hitTolerance: 0,
		})
		.filter((feat) => Object.keys(feat.getProperties()).length > 1);

	const object = featuresAtPixel[0].getProperties();

	// # is required in url
	window.open(
		`#/${object["@type"]}s/${object.gid}`,
		object.uuid,
		`width=750,height=550,menubar=no,location=no,toolbar=no,resizable=no,status=no,scrollbars=no`
	);
};
