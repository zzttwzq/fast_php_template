import request from './request.js';
import storage from './storage.js';

const OSS_INFO = 'OSS_INFO';

const ossInfo = {
		setOssInfo(data) {
			storage.set(OSS_INFO, data);
		},
		getOssInfo(callback) {

			// {
			// 	"AccessKeyId": "STS.NUAUS4sqegiPwhQvk24kWp1bh",
			// 	"AccessKeySecret": "8hzZuw1Quyr8HXf9djCYZWdkEYyuVZfe8ZcD5wTtidR1",
			// 	"Expiration": "2021-03-17T07:12:35Z",
			// 	"SecurityToken": "CAIS+AF1q6Ft5B2yfSjIr5b0HumAnq5E0Ku7dU7gkmtnOOR7n/TJijz2IH5FeXZsBu0ZsfQynWBX5/0TlqV6T55UWErzccxz45IPVohU82GG6aKP9rUhpMCPOwr6UmzWvqL7Z+H+U6muGJOEYEzFkSle2KbzcS7YMXWuLZyOj+wMDL1VJH7aCwBLH9BLPABvhdYHPH/KT5aXPwXtn3DbATgD2GM+qxsmsPXjnJ3BtUqO0gWilLVPnemrfMj4NfsLFYxkTtK40NZxcqf8yyNK43BIjvwo3fEbpWia4Y7NXgABvETdYvCx9cZ0IhJ9YqExEKNft+g6DyWgJVU0/RqAAVRVbEXGlA6ymdYlCDsWt6jyx5POjXALyWtnHQ4IhkeWxKmlpFM5jhfPflDZ42l/YYSMR5wY/x9cwqlj5ki5R/c5TK7VZiCYJf9JGt1j1rDrpdvPdgyoYKX9bP1nZXa+KRC+o07iChXputn73AaC0f2/c3KbGf4NhnB3JO33G8u2"
			// }
   
			var ossinfo = storage.get(OSS_INFO);
			if (ossinfo) {
				var ext = ossinfo.Expiration;
				var dat1 = new Date(ext);
				dat1 = dat1.valueOf();

				var dat2 = new Date();
				dat2 = dat2.valueOf();

				if (dat2 > dat1) {
					this.getOssInfoFromNetwork(e => {
						callback(e);
					});
				} else {
					callback(ossinfo);
				}
			} else {

				this.getOssInfoFromNetwork(e => {
					callback(e);
				});
			}
		},
		getOssInfoFromNetwork(callback) {

			request.post(
				'/v2/user/oss', {},
				oss_info => {
					
					this.setOssInfo(oss_info);
					callback(oss_info);
				});
		}
	};

export default ossInfo;
