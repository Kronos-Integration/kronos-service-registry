import { Service, ServiceProviderMixin } from '@kronos-integration/service';
import { registerWithManager } from '../src/service-registry.mjs';

import test from 'ava';

class ServiceProvider extends ServiceProviderMixin(Service) {}

const sp = new ServiceProvider();

test('registry service state', async t => {
  await registerWithManager(sp);

  const registry = sp.services.registry;
  await registry.start();

  t.is(registry.state, 'running');
});
