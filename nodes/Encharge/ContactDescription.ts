import type { INodeProperties } from 'n8n-workflow';

export const contactOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['people'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new People',
				action: 'Create a People',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a People',
				action: 'Delete a People',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a People',
				action: 'Get a People',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update People properties',
				action: 'Update a People',
			},
		],
		default: 'get',
	},
];

export const contactFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                contact:create                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		displayOptions: {
			show: {
				resource: ['people'],
				operation: ['create'],
			},
		},
		default: '',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['people'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Day Of Cycle',
				name: 'dayOfCycle',
				type: 'string',
				description:
					'The day on which the contact is in the Autoresponder cycle. null indicates the contacts is not in the cycle.',
				default: '',
			},
			{
				displayName: 'IP Address',
				name: 'ipAddress',
				type: 'string',
				description: "The contact's IP address. IPv4 and IPv6 formats are accepted.",
				default: '',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Scoring',
				name: 'scoring',
				type: 'number',
				default: '',
				description: 'Contact scoring, pass null to remove the score from a contact',
				typeOptions: {
					minValue: 0,
				},
			},
			{
				displayName: 'Tag Names or IDs',
				name: 'tags',
				type: 'multiOptions',
				description:
					'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
				typeOptions: {
					loadOptionsMethod: 'getTags',
				},
				default: [],
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                  contact:delete                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['people'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'ID of contact to delete',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['people'],
				operation: ['delete'],
			},
		},
		options: [
			{
				displayName: 'IP Address',
				name: 'ipAddress',
				type: 'string',
				description:
					'This makes it possible to pass the IP from which the contact unsubscribed. Used only if the messageId was send.',
				default: '',
			},
			{
				displayName: 'Message ID',
				name: 'messageId',
				type: 'string',
				description:
					'The ID of a message (such as a newsletter, an autoresponder, or an RSS-newsletter). When passed, this method will simulate the unsubscribe process, as if the contact clicked the unsubscribe link in a given message.',
				default: '',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                  contact:get                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['people'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'Unique identifier for a particular contact',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['people'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				description:
					'List of fields that should be returned. ID is always returned. Fields should be separated by comma',
				default: '',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                contact:update                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['people'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Unique identifier for a particular contact',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['people'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Day Of Cycle',
				name: 'dayOfCycle',
				type: 'string',
				description:
					'The day on which the contact is in the Autoresponder cycle. null indicates the contacts is not in the cycle.',
				default: '',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
			},
			{
				displayName: 'IP Address',
				name: 'ipAddress',
				type: 'string',
				description: "The contact's IP address. IPv4 and IPv6 formats are accepted.",
				default: '',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Scoring',
				name: 'scoring',
				type: 'number',
				default: '',
				description: 'Contact scoring, pass null to remove the score from a contact',
				typeOptions: {
					minValue: 0,
				},
			},
			{
				displayName: 'Tag Names or IDs',
				name: 'tags',
				type: 'multiOptions',
				description:
					'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
				typeOptions: {
					loadOptionsMethod: 'getTags',
				},
				default: [],
			},
		],
	},
];
