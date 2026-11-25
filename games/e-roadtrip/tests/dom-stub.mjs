export class DomStub {
  nodes = new Map();
  listeners = new Map();
  dataset = {};
  classList = { add() {}, remove() {}, toggle() {} };
  attrs = {};
  innerHTML = '';
  textContent = '';

  addEventListener(name, callback, options) {
    this.listeners.set(name, { callback, once: options?.once });
  }

  querySelector(selector) {
    if (!this.nodes.has(selector)) this.nodes.set(selector, new DomStub());
    return this.nodes.get(selector);
  }

  querySelectorAll(selector) {
    if (selector !== '.break-btn') return [];
    return ['eat', 'toilet', 'dog', 'children', 'shopping'].map(kind => {
      const node = this.querySelector(kind);
      node.dataset.break = kind;
      return node;
    });
  }

  getContext() { return null; }
  setAttribute(key, value) { this.attrs[key] = value; }

  dispatch(name) {
    const listener = this.listeners.get(name);
    if (!listener) return;
    if (listener.once) this.listeners.delete(name);
    listener.callback();
  }

  click() { this.dispatch('click'); }
}
