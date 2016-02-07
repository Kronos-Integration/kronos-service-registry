/* jslint node: true, esnext: true */

"use strict";

const service = require('kronos-service');

class ServiceRegistry extends service.Service {

	static get name() {
		return "registry";
	}

	get type() {
		return ServiceRegistry.name;
	}

	get autostart() {
		return true;
	}

	registerService(name, options) {
		this.info({
			message: 'registerService',
			name: name,
			options: options
		});
	}

	endpointsMatching(query) {
		return [];
	}
}

module.exports.registerWithManager = manager =>
	manager.registerServiceFactory(ServiceRegistry).then(sr =>
		manager.declareService({
			'type': sr.name,
			'name': sr.name
		}));
