const date = {
	friendlyDate(timestamp) {
		var formats = {
			'year': '%n% 年前',
			'month': '%n% 月前',
			'day': '%n% 天前',
			'hour': '%n% 小时前',
			'minute': '%n% 分钟前',
			'second': '%n% 秒前',
		};

		var now = Date.now();
		var seconds = Math.floor((now - timestamp) / 1000);
		var minutes = Math.floor(seconds / 60);
		var hours = Math.floor(minutes / 60);
		var days = Math.floor(hours / 24);
		var months = Math.floor(days / 30);
		var years = Math.floor(months / 12);

		var diffType = '';
		var diffValue = 0;
		if (years > 0) {
			diffType = 'year';
			diffValue = years;
		} else {
			if (months > 0) {
				diffType = 'month';
				diffValue = months;
			} else {
				if (days > 0) {
					diffType = 'day';
					diffValue = days;
				} else {
					if (hours > 0) {
						diffType = 'hour';
						diffValue = hours;
					} else {
						if (minutes > 0) {
							diffType = 'minute';
							diffValue = minutes;
						} else {
							diffType = 'second';
							diffValue = seconds === 0 ? (seconds = 1) : seconds;
						}
					}
				}
			}
		}
		if (!diffValue) {
			return '';
		}
		return formats[diffType].replace('%n%', diffValue);
	},
	getSeconds(time) {
		var date = this.handleTime(time);
		return Date.parse(date);
	},
	getMillSeconds(time) {
		var date = this.handleTime(time);
		return date.valueOf();
	},
	getDateTime(time) {

		var date = this.handleTime(time);
		var time1 = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
		var time2 = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

		return time1 + ' ' + time2;
	},
	formatDateTime(time) {

		var date = this.handleTime(time);

		var time1 = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() +
			'日';
		var time2 = this.getTimeString(date);

		return time1 + ' ' + time2;
	},
	formatDate(time) {

		var date = this.handleTime(time);
		var time1 = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date
			.getDate() +
			'日'

		return time1;
	},
	formatTime(time) {
		var date = this.handleTime(time);
		return this.getTimeString(date)
	},
	handleTime(time) {
		var date = null;
		if (time) {

			if (typeof(time) != 'number') {
				time = time.replace(/-/g, '/');
			}
			date = new Date(time);
		} else {
			date = new Date();
		}

		return date;
	},
	getTimeString(date) {

		var hour = date.getHours() + '';
		if (hour.length <= 1) {
			hour = '0' + hour;
		}

		var min = date.getMinutes() + '';
		if (min.length <= 1) {
			min = '0' + min;
		}

		var sec = date.getSeconds() + '';
		if (sec.length <= 1) {
			sec = '0' + sec;
		}

		return hour + ':' + min + ':' + sec
	}
}

export default date
