/* jslint node: true, esnext: true */

'use strict';

const endpoint = require('kronos-endpoint'),
	service = require('kronos-service');

class ServiceRegistry extends service.Service {

	static get name() {
		return 'registry';
	}

	get type() {
		return ServiceRegistry.name;
	}

	get autostart() {
		return true;
	}

	constructor(config, owner) {
		super(config, owner);

		this.addEndpoint(new endpoint.ReceiveEndpoint('nodes', this)).receive = request => {
			return Promise.resolve([{
				id: 'localhost'
			}]);
		};
	}

	registerService(name, options) {
		this.info({
			message: 'registerService',
			name: name,
			options: options
		});
		return Promise.resolve();
	}

	unregisterService(name) {
		return Promise.resolve();
	}

	* serviceURLs(name) {
		return undefined;
	}
}

module.exports.registerWithManager = manager =>
	manager.registerServiceFactory(ServiceRegistry).then(sr =>
		manager.declareService({
			'type': sr.name,
			'name': sr.name
		}));
