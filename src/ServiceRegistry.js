/* jslint node: true, esnext: true */

'use strict';

import {
	ReceiveEndpoint
}
from 'kronos-endpoint';

import {
	Service
}
from 'kronos-service';

class ServiceRegistry extends Service {

	static get name() {
		return 'registry';
	}

	get autostart() {
		return true;
	}

	constructor(config, owner) {
		super(config, owner);

		this.addEndpoint(new ReceiveEndpoint('nodes', this)).receive = request => {
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
		yield undefined;
		return undefined;
	}
}

function registerWithManager(manager) {
	return manager.registerServiceFactory(ServiceRegistry).then(sr =>
		manager.declareService({
			type: sr.name,
			name: sr.name
		}));
}

export {
	ServiceRegistry,
	registerWithManager
};
