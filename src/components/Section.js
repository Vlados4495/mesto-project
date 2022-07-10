class Section {
    constructor({items, renderer}, cardsContainer) {
      this._initialArray = items;
      this._renderer = renderer;
      this._container = document.querySelector(cardsContainer);
    }
  
    renderItems() {
      this._initialArray.forEach(item => this._renderer(item))
    }
  
    addItem(element) {
      this._container.prepend(element);
    }
  }
  
  export default Section;