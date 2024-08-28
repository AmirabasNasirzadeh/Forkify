import previewView from "./previewView";
import View from "./view";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
  _parentEl = document.querySelector(`.results`);

  _generateMarkup() {
    return this._data.map((bookmark) => previewView.render(bookmark, false)).join(``);
  }
}
export default new ResultsView();
