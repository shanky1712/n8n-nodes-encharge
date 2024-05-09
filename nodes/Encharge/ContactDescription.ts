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
		required: true,
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
				displayName: 'userId',
				name: 'userId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'firstName',
				name: 'firstName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'lastName',
				name: 'lastName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'utm_source',
				name: 'utm_source',
				type: 'string',
				default: 'ABCD',
			},
			{
				displayName: 'first_utm_source',
				name: 'first_utm_source',
				type: 'string',
				default: 'n8n',
			},
			{
				displayName: 'Tag Names or IDs',
				name: 'tags',
				// type: 'multiOptions',
				type: 'options',
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
		displayName: 'Email',
		name: 'email',
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

	/* -------------------------------------------------------------------------- */
	/*                                  contact:get                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'People EMail',
		name: 'email',
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
		placeholder: 'Add Field',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		displayOptions: {
			show: {
				resource: ['people'],
				operation: ['get'],
			},
		},
		options: [
			{
				name: 'fieldsValues',
				displayName: 'Custom Field',
				values: [
					{
						displayName: 'Field Key',
						name: 'key',
						type: 'string',
						default: '',
						placeholder: 'last_name',
						description: "The field's key",
					},
					{
						displayName: 'Field Value',
						name: 'value',
						type: 'string',
						default: '',
						placeholder: 'Doe',
						description: 'Value of the field',
					},
				],
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                contact:update                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Email',
		name: 'email',
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
		placeholder: 'Update Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['people'],
				operation: ['update'],
			},
		},
		options: [
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
				displayName: 'userId',
				name: 'userId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'firstName',
				name: 'firstName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'lastName',
				name: 'lastName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'utm_source',
				name: 'utm_source',
				type: 'string',
				default: 'ABCD',
			},
			{
				displayName: 'first_utm_source',
				name: 'first_utm_source',
				type: 'string',
				default: 'n8n',
			},
			{
				displayName: 'Tag Names or IDs',
				name: 'tags',
				// type: 'multiOptions',
				type: 'options',
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
