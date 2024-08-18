import icons from "url:../../img/icons.svg";
import View from "./view";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  _leftButtonGenerate(currPage, icons) {
    return `<button data-gotopage="${currPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage - 1}</span>
              </button>`;
  }

  _rightButtonGenerate(currPage, icons) {
    return `<button data-gotopage="${currPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currPage + 1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </button>`;
  }

  addHandlerPagination(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(`.btn--inline`);

      if (!btn) return;

      const goToPage = +btn.dataset.gotopage;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    // Page 1, there are other pages ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~
    if (currentPage === 1 && numPages > 1) {
      return this._rightButtonGenerate(currentPage, icons);
    }

    // Last page ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~
    if (currentPage === numPages && numPages > 1) {
      return this._leftButtonGenerate(currentPage, icons);
    }

    // Other pages ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~
    if (currentPage < numPages) {
      return `${this._leftButtonGenerate(currentPage, icons)}${this._rightButtonGenerate(currentPage, icons)}`;
    }

    // Only 1 page ~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~●~~
    return ``;
  }
}

export default new PaginationView();
