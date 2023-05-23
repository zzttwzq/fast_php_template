const common = {
	timePeriodToLocalTime(timePeriod) {
		let timeSplit = timePeriod.split('-');
		if(timeSplit.length === 4) {
			let hours = timeSplit[3];
			timeSplit.pop();
			let timeString = timeSplit.join('/') + ` ${hours}:00:00 UTC`;
			return new Date(timeString);
		}else {
			return new Date();
		}
	}
}

export default common;