import request from '../../buildIn/request.js';
import userService from '../../Services/modules/userService.js';

const workflow = {
	
	getImages(params, callback) {
		return new Promise((resolve, reject) => {
			request.post(
				'/v2/workflow_jobs/' + params.workflow_name + '/jobs/' + params.workflow_job_id +
				'/images', 
				{
					ak_id: params.AccessKeyId,
					ak_secret: params.AccessKeySecret,
					security_token: params.SecurityToken
				},
				success_data => {
					resolve(success_data);
				},
				error => {
					reject(error);
				}
			);
		});
	},
	getSignedImages(params) {
		return new Promise((resolve, reject) => {
			request.post(
				'/v2/user/sign_objects',
				{
					ak_id: params.AccessKeyId,
					ak_secret: params.AccessKeySecret,
					security_token: params.SecurityToken,
					oss_bucket: params.oss_bucket,
					object_list: params.object_list
				},
				success_data => {
					resolve(success_data);
				},
				error => {
					reject(error);
				}
			);
		});
	}
}

export default workflow
