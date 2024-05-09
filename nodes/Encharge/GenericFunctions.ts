import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IHttpRequestOptions,
	IWebhookFunctions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export async function enchargeApiRequest(
	this: IWebhookFunctions | IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,

	body: any = {}, // eslint-disable-line @typescript-eslint/no-explicit-any
	qs: IDataObject = {},
	uri?: string,
	option: IDataObject = {},
): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
	const authentication = this.getNodeParameter('authentication', 0, 'token') as string;

	let options: IHttpRequestOptions = {
		headers: {
			'Content-Type': 'application/json',
		},
		method,
		body,
		qs,
		url: uri || `https://api.encharge.io/v1${resource}`,
		json: true,
	};
	try {
		options = Object.assign({}, options, option);
		if (Object.keys(body as IDataObject).length === 0) {
			delete options.body;
		}

		if (authentication === 'token') {
			return await this.helpers.requestWithAuthentication.call(this, 'enchargeApi', options);
		} else {
			return await this.helpers.requestOAuth2.call(this, 'enchargeOAuth2Api', options);
		}
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}
