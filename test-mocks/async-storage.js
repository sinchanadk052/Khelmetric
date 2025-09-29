let store = new Map();

module.exports = {
  setItem: async (key, value) => {
    store.set(key, value);
  },
  getItem: async (key) => {
    return store.has(key) ? store.get(key) : null;
  },
  removeItem: async (key) => {
    store.delete(key);
  },
  clear: async () => {
    store.clear();
  },
};
