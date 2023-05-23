import apiConfig from '../ApiManager/config';

var mock = {
	handelGetData(key) {
		if (apiConfig.isTest) {
			// var val = this.dataMap();
			// val = val[key];
			// return val;
			return localStorage.getItem(key);
		}
	},
	handleSetData(key, data) {  
		if (apiConfig.isTest) {
			// var val = this.dataMap();
			// val[key] = data;
			localStorage.setItem(key, JSON.stringify(data));
		}
	},
	clearData(key) {
		if (apiConfig.isTest) {
			// var val = this.dataMap();
			// val[key] = data;
			localStorage.clear(key, data);
		}
	},
	dataMap() {
		return {
			'TOKEN': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyMDYxNzM3NiwianRpIjoiZGQyYTAyNTYtZTMyMi00NjI4LWJiMDAtZDQwYWJkYzYzMjk1IiwibmJmIjoxNjIwNjE3Mzc2LCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMTgyNTQxODg2MTAiLCJjc3JmIjoiZTNjNmQ5NzEtZTE1Ni00NGNhLThiYjQtOGZkYmVkOTFhYThiIiwiZXhwIjoxNjIxNDgxMzc2fQ.jlHrZDrRo6aKo5EEb189kb2jxzhrRWm05MTvs70iVtw',
			'HOME_OPTION': {},
			'USER_INFO': {
				"client_id": "18501bf9e7976dedd1f24313aad1d579",
				"created_at": 1619226025747,
				"id": "60836da9b5616130ad017095",
				"updated_at": 1620610173576,
				"user_birth_date": "2021/04/24",
				"user_gender": "0",
				"user_id": "1f83ad5a-0291-4084-aad5-53228f16f4da",
				"user_name": "施文煜",
				"user_person_id": null,
				"user_phone": "18254188610",
				"user_status": 0
			},
			'USER_CURRENT_FACTORY': {
				"created_at": 1619227815478,
				"factory_address": "望京",
				"factory_city": "抚顺市",
				"factory_creator": "1f83ad5a-0291-4084-aad5-53228f16f4da",
				"factory_descr": "施文煜工厂prod",
				"factory_district": "东洲区",
				"factory_id": "9a8b8b66-110f-489a-b0c0-6fee4f375a2a",
				"factory_name": "施文煜工厂prod",
				"factory_phone": "18254188610",
				"factory_province": "辽宁省",
				"factory_status": 0,
				"id": "608374a74c7f6ca1b5493062",
				"updated_at": 1619662422049
			},
			'': [],
			'FACTORY_MACHINES': [{
				"created_at": 1619228000905,
				"id": "608375603c16cefc769a8897",
				"iot_status": null,
				"machine_creator": "1f83ad5a-0291-4084-aad5-53228f16f4da",
				"machine_descr": "001",
				"machine_id": "0100303d-8109-4c8f-8a4e-4bc650044cae",
				"machine_name": "Mach001",
				"machine_status": 1,
				"machine_type": 0,
				"raspberry_pi_id": "",
				"updated_at": 1619228014485
			}, {
				"created_at": 1619228741136,
				"id": "608378454784aabdee28dfd8",
				"iot_status": null,
				"machine_creator": "1f83ad5a-0291-4084-aad5-53228f16f4da",
				"machine_descr": "011",
				"machine_id": "6bd8c7f9-5826-4929-8400-d8150cc18730",
				"machine_name": "mach011",
				"machine_status": 1,
				"machine_type": 0,
				"raspberry_pi_id": "100000009cbb9ac8",
				"updated_at": 1619237482799
			}, {
				"created_at": 1619237561531,
				"id": "60839ab9f73c882750f9ad4d",
				"iot_status": null,
				"machine_creator": "1f83ad5a-0291-4084-aad5-53228f16f4da",
				"machine_descr": "011",
				"machine_id": "ea840e8f-df55-40db-b981-162f8324376e",
				"machine_name": "mach011",
				"machine_status": 0,
				"machine_type": 0,
				"raspberry_pi_id": "100000009cbb9ac8",
				"updated_at": 1619424474183
			}, {
				"created_at": 1619239157915,
				"id": "6083a0f57136a71d13f4c464",
				"iot_status": null,
				"machine_creator": "e2260548-5974-43f7-866b-dc70edb3814e",
				"machine_descr": "123123123",
				"machine_id": "677ceffc-4697-42f1-a902-c392b6e2cf54",
				"machine_name": "123123123",
				"machine_status": 1,
				"machine_type": 0,
				"raspberry_pi_id": "",
				"updated_at": 1619424415860
			}, {
				"created_at": 1619239297209,
				"id": "6083a1817136a71d13f4c466",
				"iot_status": null,
				"machine_creator": "e2260548-5974-43f7-866b-dc70edb3814e",
				"machine_descr": "Asdfasdf",
				"machine_id": "138e4648-3fee-4edc-b657-e9240d8eb44b",
				"machine_name": "Adfs",
				"machine_status": 1,
				"machine_type": 0,
				"raspberry_pi_id": "10000000b957b864",
				"updated_at": 1619424422372
			}, {
				"created_at": 1620198522468,
				"id": "6092447a3ab74f4dca801ef1",
				"iot_status": null,
				"machine_creator": "8eddb42b-d3fb-428d-8c05-a82c1d40a401",
				"machine_descr": "cm4",
				"machine_id": "ba056a21-4b08-4e53-b2a4-22f4d3d4e1b5",
				"machine_name": "mach027",
				"machine_status": 0,
				"machine_type": 0,
				"raspberry_pi_id": "10000000005182d7",
				"updated_at": 1620198522468
			}],
			'FACTORY_USERS': [{
				"client_id": "18501bf9e7976dedd1f24313aad1d579",
				"created_at": 1619226025747,
				"id": "60836da9b5616130ad017095",
				"updated_at": 1620610173576,
				"user_birth_date": "2021/04/24",
				"user_gender": "0",
				"user_id": "1f83ad5a-0291-4084-aad5-53228f16f4da",
				"user_name": "施文煜",
				"user_person_id": null,
				"user_phone": "18254188610",
				"user_status": 0
			}, {
				"client_id": "0ec0f294f628e093828b297f1d6f6280",
				"created_at": 1619082822310,
				"id": "60813e46572befb5a1f5c1d0",
				"updated_at": 1620180892439,
				"user_birth_date": "2021/04/03",
				"user_gender": "0",
				"user_id": "2cd66216-3b23-4504-b4a0-79f87f124c72",
				"user_name": "🐳",
				"user_person_id": null,
				"user_phone": "19817800960",
				"user_status": 0
			}, {
				"client_id": "0f6b169ee550c7baaf8d380106b4a4f0",
				"created_at": 1619421642745,
				"id": "608669ca05ecb2d26e49c8be",
				"updated_at": 1620433338771,
				"user_birth_date": "1994/02/07",
				"user_gender": "0",
				"user_id": "c083cd70-5882-47de-996b-79b85fbead1c",
				"user_name": "刘智邦",
				"user_person_id": null,
				"user_phone": "18367508728",
				"user_status": 0
			}, {
				"client_id": "d7cff1c91d5113b1857e94974cdb6fa6",
				"created_at": 1619238702688,
				"id": "60839f2ecd1e42aeeb12ad99",
				"updated_at": 1619661048725,
				"user_birth_date": "2021/04/24",
				"user_gender": "0",
				"user_id": "8eddb42b-d3fb-428d-8c05-a82c1d40a401",
				"user_name": "黄宇东",
				"user_person_id": null,
				"user_phone": "13082810997",
				"user_status": 0
			}],
		};
	}
}

export default mock
