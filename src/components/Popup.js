export default class Popup {
	constructor(popupSelector) {
		this._rootElement = document.querySelector(popupSelector);
		this._closeButtonElement = this._rootElement.querySelector('.popup__closed');
		this._handleEscClose = this._handleEscClose.bind(this);
	}

	open() {
		this._rootElement.classList.add('popup_opened');
		document.addEventListener("keydown", this._handleEscClose);
	}

	close() {
		this._rootElement.classList.remove('popup_opened');
		document.removeEventListener("keydown", this._handleEscClose);
	}

	_handleEscClose(event) {
		if (event.key === "Escape") {
    	this.close();
		}
	}

	_handleOverlayClick(event) {
		if (event.target.classList.contains('popup_opened')) {
			this.close();
		}
	}

	setEventListeners() {
		this._rootElement.addEventListener("mousedown", (event) => this._handleOverlayClick(event));
		this._closeButtonElement.addEventListener("click", () => this.close());
	}
}


// export default class Popup {
//     constructor(popupSelector) {
//       this._popupSelector = popupSelector;
//       this._popup = document.querySelector(popupSelector);
//       this._handleClickClose = this._handleClickClose.bind(this);
//       this._handleEscClose = this._handleEscClose.bind(this);
//     }
  
//     open() {
//       const popupContainer = this._popup.querySelector('.popup__container');
//       popupContainer.classList.add('.popup_opened'); ///
//       this._setEventListeners();
//     }
  
//     close() {
//       const popupContainer = this._popup.querySelector('.popup__container');
//       popupContainer.classList.remove('.popup_opened');
//       this._removeEventListeners();
//     }
  
//     _handleClickClose(evt) {
//       if (
//         evt.target.classList.contains('.popup') ||
//         evt.target.classList.contains('.popup__closed')
//       ) {
//         this.close();
//       }
//     }
  
//     _handleEscClose(evt) {
//       if (evt.key === 'Escape') {
//         this.close();
//       }
//     }
  
//     _setEventListeners() {
//       this._popup.addEventListener('click', this._handleClickClose);
//       document.addEventListener('keydown', this._handleEscClose);
//     }
  
//     _removeEventListeners() {
//       this._popup.removeEventListener('click', this._handleClickClose);
//       document.removeEventListener('keydown', this._handleEscClose);
//     }
  
//   }
  