import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._galleryFigcaption = this._rootElement.querySelector(".popup__card_title");
		this._image = this._rootElement.querySelector(".popup__card_image");
	}

	open({src, alt}) {
		this._image.setAttribute("src", src);
		this._image.setAttribute("alt", alt);
		this._galleryFigcaption.textContent = alt;
		return super.open();
	}
}

// export default class PopupWithImage extends Popup {
//   constructor(popupSelector) {
//     super(popupSelector);
//     this._popupPhotoImage = this._popup.querySelector('.popup__card_image');
//     this._popupPhotoFigcaption = this._popup.querySelector(
//       '.popup__card_title'
//     );
//   }

//   open(data) {
//     super.open();
//     this._popupPhotoImage.src = `${data.link}`;
//     this._popupPhotoImage.alt = `${data.name}`;
//     this._popupPhotoFigcaption.textContent = `${data.name}`;
//   }
// }
