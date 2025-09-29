import { resources } from './i18n';

describe('i18n resources', () => {
  it('includes supported languages and hello key', () => {
    expect(Object.keys(resources).sort()).toEqual(['en', 'hi', 'ta']);
    expect(resources.en.translation.hello).toBeDefined();
    expect(resources.hi.translation.hello).toBeDefined();
    expect(resources.ta.translation.hello).toBeDefined();
  });
});
