export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._cardContainer = document.querySelector(".cards__items");
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._cardContainer.append(element);
  }

  addItemNew(element) {
    this._cardContainer.prepend(element);
  }

  setItems(items) {
    this._items = items;
  }
}
