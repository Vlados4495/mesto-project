import Popup from "./Popup.js";
export default class PopupConfirmation extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._submitBtn = this._rootElement.querySelector('.form');
	}

	setHandleFormSubmit(handleFormSubmit) {
		this._handleFormSubmit = handleFormSubmit;
	}

	setCardId(id) {
		this._cardId = id;
	}

	setEventListeners() {
		this._submitBtn.addEventListener("submit", (event) => {
			this._handleFormSubmit(this._cardId);
			event.preventDefault();
		});
		return super.setEventListeners();
	}
}