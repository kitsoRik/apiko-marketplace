export const calculateDistanceBeetwebTwoLocations = (
	_lat1,
	_lon1,
	_lat2,
	_lon2
) => {
	const EARTH_RADIUS = 6372795;
	const lat1 = (_lat1 * Math.PI) / 180;
	const long1 = (_lon1 * Math.PI) / 180;
	const lat2 = (_lat2 * Math.PI) / 180;
	const long2 = (_lon2 * Math.PI) / 180;
	const cl1 = Math.cos(lat1);
	const cl2 = Math.cos(lat2);
	const sl1 = Math.sin(lat1);
	const sl2 = Math.sin(lat2);
	const delta = long2 - long1;
	const cdelta = Math.cos(delta);
	const sdelta = Math.sinh(delta);
	const y = Math.sqrt(
		Math.pow(cl2 * sdelta, 2) +
			Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2)
	);
	const x = sl1 * sl2 + cl1 * cl2 * cdelta;
	const ad = Math.atan2(y, x);
	const dist = ad * EARTH_RADIUS;
	return dist.toFixed(1);
};
