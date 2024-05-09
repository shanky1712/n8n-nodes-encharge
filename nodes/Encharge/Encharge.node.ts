import {
	IExecuteFunctions,
	IDataObject,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { enchargeApiRequest } from './GenericFunctions';

import { contactFields, contactOperations } from './ContactDescription';
export class Encharge implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Encharge',
		name: 'enCharge',
		icon: 'file:enCharge.png',
		group: ['input'],
		version: 1,
		description: 'Basic Encharge Node',
		defaults: {
			name: 'Encharge Node',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'enchargeApi',
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
						value: 'people',
					},
				],
				default: 'people',
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
				const data = await enchargeApiRequest.call(this, 'GET', '/tags-management');
				for (const eachData of data.tags) {
					returnData.push({
						name: eachData.tag as string,
						value: eachData.tag as string,
					});
				}
				return returnData;
			},
		},
	};
	// The function below is responsible for actually doing whatever this node
	// is supposed to do. In this case, we're just appending the `myString` property
	// with whatever the user has entered.
	// You can make async calls and use `await`.
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
					if (operation === 'create') {
						const email = this.getNodeParameter('email', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i);
						const body: IDataObject = {
							email,
						};
						Object.assign(body, additionalFields);

						if (additionalFields.customFieldsUi) {
							const customFieldValues = (additionalFields.customFieldsUi as IDataObject)
								.customFieldValues as IDataObject[];
							if (customFieldValues) {
								body.customFieldValues = customFieldValues;
								for (let index = 0; index < customFieldValues.length; index++) {
									if (!Array.isArray(customFieldValues[index].value)) {
										customFieldValues[index].value = [customFieldValues[index].value];
									}
								}
								delete body.customFieldsUi;
							}
						}
						responseData = await enchargeApiRequest.call(this, 'POST', '/people', body);
						responseData = { success: true };
					}
					if (operation === 'update') {
						const email = this.getNodeParameter('email', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i);
						const body: IDataObject = {
							email,
						};
						Object.assign(body, updateFields);

						if (updateFields.customFieldsUi) {
							const customFieldValues = (updateFields.customFieldsUi as IDataObject)
								.customFieldValues as IDataObject[];
							if (customFieldValues) {
								body.customFieldValues = customFieldValues;
								for (let index = 0; index < customFieldValues.length; index++) {
									if (!Array.isArray(customFieldValues[index].value)) {
										customFieldValues[index].value = [customFieldValues[index].value];
									}
								}
								delete body.customFieldsUi;
							}
						}
						responseData = await enchargeApiRequest.call(this, 'POST', '/people', body);
						responseData = { success: true };
					}
					if (operation === 'get') {
						const email = this.getNodeParameter('email', i) as string;
						const options = this.getNodeParameter('options', i);
						Object.assign(qs, options);

						responseData = await enchargeApiRequest.call(
							this,
							'GET',
							`/people?people[0][email]=${email}`,
							{},
							qs,
						);
					}
					if (operation === 'delete') {
						const email = this.getNodeParameter('email', i) as string;
						responseData = await enchargeApiRequest.call(
							this,
							'DELETE',
							`/people?people[0][email]=${email}`,
							{},
							qs,
						);
						responseData = { success: true };
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
