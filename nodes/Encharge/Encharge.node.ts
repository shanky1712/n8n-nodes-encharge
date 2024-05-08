import type {
	IExecuteFunctions,
	IDataObject,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

// import moment from 'moment-timezone';
import { enchargeApiRequest } from './GenericFunctions';

import { contactFields, contactOperations } from './ContactDescription';

export default class EnCharge implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'EnCharge',
		name: 'enCharge',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
		icon: 'file:enCharge.png',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume EnCharge API',
		defaults: {
			name: 'EnCharge',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'enChargeApi',
				required: true,
				displayOptions: {
					show: {
						authentication: ['token'],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'API Key',
						value: 'token',
					},
				],
				default: 'token',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Contact',
						value: 'contact',
					},
				],
				default: 'contact',
			},
			...contactOperations,
			...contactFields,
		],
	};

	methods = {
		loadOptions: {
			// Get all the tagd to display them to user so that they can
			// select them easily
			async getTags(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const tags = await enchargeApiRequest.call(this, 'GET', '/tags-management');
				for (const tag of tags) {
					returnData.push({
						name: tag.tags.tag as string,
						value: tag.tags.tag,
					});
				}
				return returnData;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const length = items.length;
		const qs: IDataObject = {};
		let responseData;
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);
		for (let i = 0; i < length; i++) {
			try {
				if (resource === 'people') {
					//https://apireference.getresponse.com/#operation/createContact
					if (operation === 'create') {
						const email = this.getNodeParameter('email', i) as string;

						// const campaignId = this.getNodeParameter('campaignId', i) as string;

						// const additionalFields = this.getNodeParameter('additionalFields', i);

						const body: IDataObject = {
							email,
							// campaign: {
							// 	campaignId,
							// },
						};

						responseData = await enchargeApiRequest.call(this, 'POST', '/people', body);

						responseData = { success: true };
					}
					//https://apireference.getresponse.com/?_ga=2.160836350.2102802044.1604719933-1897033509.1604598019#operation/deleteContact
					if (operation === 'delete') {
						const contactId = this.getNodeParameter('contactId', i) as string;

						const options = this.getNodeParameter('options', i);

						Object.assign(qs, options);

						responseData = await enchargeApiRequest.call(
							this,
							'DELETE',
							`/people/${contactId}`,
							{},
							qs,
						);

						responseData = { success: true };
					}
					//https://apireference.getresponse.com/?_ga=2.160836350.2102802044.1604719933-1897033509.1604598019#operation/getContactById
					if (operation === 'get') {
						const contactId = this.getNodeParameter('contactId', i) as string;

						const options = this.getNodeParameter('options', i);

						Object.assign(qs, options);

						responseData = await enchargeApiRequest.call(
							this,
							'GET',
							`/people/${contactId}`,
							{},
							qs,
						);
					}
					//https://apireference.getresponse.com/?_ga=2.160836350.2102802044.1604719933-1897033509.1604598019#operation/updateContact
					if (operation === 'update') {
						const contactId = this.getNodeParameter('contactId', i) as string;

						const updateFields = this.getNodeParameter('updateFields', i);

						const body: IDataObject = {};

						Object.assign(body, updateFields);

						if (updateFields.customFieldsUi) {
							const customFieldValues = (updateFields.customFieldsUi as IDataObject)
								.customFieldValues as IDataObject[];
							if (customFieldValues) {
								body.customFieldValues = customFieldValues;
								delete body.customFieldsUi;
							}
						}

						responseData = await enchargeApiRequest.call(
							this,
							'POST',
							`/people/${contactId}`,
							body,
						);
					}
				}
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as IDataObject),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}
		return [returnData];
	}
}
