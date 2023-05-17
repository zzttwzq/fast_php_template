const validate = {
	// 判断是否是数字
	isRealNum(val) {
		// isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，    
		if (val === "" || val == null) {
			return false;
		}
		if (!isNaN(val)) {
			//对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,   //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
			return true;
		} else {
			return false;
		}
	},
	// 判断UUID
	validateUUID(val, self) {

		let reg = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		let res = reg.test(val);

		if (!res) {
			// self.$alert.showConfirm('', 'UUID不合法！', null);
			return false;
		}
		return true;
	},
	// 判断URL
	validateURL(val, title, self) {

		let reg = /^[a-zA-Z]\w{5,39}$/;
		let res = reg.test(val);
		console.log(res);

		if (title.length > 5 && title.length < 40) {
			// self.$alert.showConfirm('', title + '位数必须大于5小于40', null);
			return false;
		}

		if (!res) {
			// self.$alert.showConfirm('', title + '必须是字母+数字！', null);
			return false;
		}
		return true;
	},
	// 判断是否只包含字母和数字
	validateNumOrLetter(val, title, self) {

		let reg = /^[0-9a-zA-Z]\w{0,16}$/;
		let res = reg.test(val);
		console.log(res);

		if (val.length != 16) {
			// self.$alert.showConfirm('', title + '必须是16位的字母和数字！', null);
			return false;
		}

		if (!res) {
			// self.$alert.showConfirm('', title + '不合法！', null);
			return false;
		}
		return true;
	},
	// 判断是否是手机号
	validatePhone(val, self) {
		if (this.isRealNum(val) && val.length == 11) {
			return true;
		}
		// self.$alert.showConfirm('', '手机号不正确！', null);
		return false;
	},
	// 判断字符串
	validateString(val, title, self) {
		if (val && val.length > 0) {
			return true;
		}
		// self.$alert.showConfirm('', title + '不能为空', null);
		return false;
	},
	// 验证日期
	validateDate(val, self) {

		if (val && val.length > 0) {
			return true;
		}
		// self.$alert.showConfirm('', '请输入正确的出生日期', null);
		return false;

		// var reg = /^(\d{1,4})(-)(\d{1,2})\2(\d{1,2})$/;
		// var r = val.match(reg);
		// if (r == null) {
		// 	self.$alert.showConfirm('', '请输入正确的日期！', null);
		// } else {
		// 	//除去不正确时间如1234-45-56
		// 	var d = new Date(r[1], r[3] - 1, r[4]);
		// 	var c = (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
		// 	if (!c) {
		// 		self.$alert.showConfirm('', '请输入正确的日期！', null);
		// 	}
		// }
	},
	// 验证数字
	validateNum(val, title, self) {

		if (this.isRealNum(val)) {
			return true;
		}
		// self.$alert.showConfirm('', title + '必须是纯数字！', null);
		return false;
	},
	// 验证多选框
	validatePicker(val, title, self) {
		if (val >= 0) {
			return true;
		} else {
			// self.$alert.showConfirm('', title + '不能为空！', null);
			return false;
		}
	}
}

export default validate
