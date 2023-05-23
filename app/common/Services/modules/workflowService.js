import {
	WORK_FLOW_JOB,
	IMAGES,
	YOFFSET
} from '../variables';

import storage from '../../buildIn/storage.js';
import userService from './userService.js';
import validate from '../../buildIn/validate.js';
import ossInfo from '../../buildIn/ossInfo.js';
import workflowApi from '../../ApiManager/modules/workflow.js';

const salaryService = {
	getWorkflowJob() {
		let code = storage.get(WORK_FLOW_JOB);
		return code;
	},
	setWorkflowJob(option) {
		storage.set(WORK_FLOW_JOB, option);
	},
	getImages() {
		let code = storage.get(IMAGES);
		return code;
	},
	setImages(option) {
		storage.set(IMAGES, option);
	},
	getYoffset() {
		let code = storage.get(YOFFSET);
		return code;
	},
	setYoffset(option) {
		storage.set(YOFFSET, option);
	},

	// 
	getWorkflowImages(workflow_name, workflow_job_id) {
		return new Promise(async (resolve, reject) => {
			try {

				ossInfo.getOssInfo(
					async oss_info => {
						
						var params = {
							workflow_name: workflow_name,
							workflow_job_id: workflow_job_id,
							ak_id: oss_info.AccessKeyId,
							ak_secret: oss_info.AccessKeySecret,
							security_token: oss_info.SecurityToken
						}
						const data = await workflowApi.getImages(params);
						
						console.log(data);
					}
				);

				resolve(data)
			} catch (error) {
				reject(error);
			}
		});
	},
	getSignedImages() {
		return new Promise(async (resolve, reject) => {
			try {


				resolve(data)
			} catch (error) {
				reject(error);
			}
		});
	},
}

export default salaryService
