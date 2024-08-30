import View from "./view";
import icons from "url:../../img/icons.svg";

class UploadRecipeView extends View {
  _message = `Recipe was successfully uploaded :)`;
  _parentEl = document.querySelector(`.upload`);
  _windowEl = document.querySelector(`.add-recipe-window`);
  _overlayEl = document.querySelector(`.overlay`);
  _btnOpen = document.querySelector(`.nav__btn--add-recipe`);
  _btnClose = document.querySelector(`.btn--close-modal`);

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  toggleWindow() {
    this._windowEl.classList.toggle(`hidden`);
    this._overlayEl.classList.toggle(`hidden`);
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener(`click`, this.toggleWindow.bind(this));
  }

  _addHandlerCloseWindow() {
    this._btnClose.addEventListener(`click`, this.toggleWindow.bind(this));
    this._overlayEl.addEventListener(`click`, this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener(`submit`, function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}
export default new UploadRecipeView();
