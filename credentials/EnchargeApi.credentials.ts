import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class EnchargeApi implements ICredentialType {
	name = 'enchargeApi';
	displayName = 'Encharge API';
	documentationUrl = '<your-docs-url>';
	properties: INodeProperties[] = [
		{
			displayName: 'Encharge API Url',
			name: 'domain',
			type: 'string',
			default: 'https://api.encharge.io/v1',
		},
		{
			displayName: 'Encharge API Key',
			name: 'token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	// An example is the Http Request node that can make generic calls
	// reusing this credential
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				"X-Encharge-Token": '={{$credentials.token}}',
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.domain}}',
			url: '/accounts/info',
		},
	};
}
