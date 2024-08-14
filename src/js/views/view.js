import icons from "url:../../img/icons.svg";

export default class View {
  _data;
  _errorMessage = "Couldn't find any recipe! Please try again.";
  _message;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const html = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML("beforeend", html);
  }

  spinner() {
    const html = `<div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
         </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", html);
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  renderError(message = this._errorMessage) {
    const html = `<div class="error">
                    <div>
                      <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                      </svg>
                    </div>
                    <p>${message}</p>
                  </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", html);
  }

  renderMessage(message) {
    const html = `<div class="message">
                    <div>
                      <svg>
                        <use href="${icons}#icon-smile"></use>
                      </svg>
                    </div>
                    <p>${message}</p>
                  </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", html);
  }
}
