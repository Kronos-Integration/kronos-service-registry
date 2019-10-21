import { ReceiveEndpoint } from '@kronos-integration/endpoint';
import { Service } from '@kronos-integration/service';

/**
 * Service registry
 */
export class ServiceRegistry extends Service {
  /**
   * @return {string} 'registry'
   */
  static get name() {
    return 'registry';
  }

  /**
   * Always start
   * @return {boolean} true
   */
  get autostart() {
    return true;
  }

  constructor(config, owner) {
    super(config, owner);

    this.addEndpoint(
      new ReceiveEndpoint('nodes', this)
    ).receive = async request => {
      return [
        {
          id: 'localhost'
        }
      ];
    };
  }

  async registerService(name, options) {
    this.info({
      message: 'registerService',
      name: name,
      options: options
    });
  }

  async unregisterService(name) {}

  *serviceURLs(name) {
    yield undefined;
    return undefined;
  }
}

export async function registerWithManager(manager) {
  const sr = await manager.registerServiceFactory(ServiceRegistry);
  return manager.declareService({
    type: sr.name,
    name: sr.name
  });
}
