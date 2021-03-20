import '../style/index.css';
import addNewTag from './addNewTag';
import readOnlySet from './readOnlyMode';

const inputSelector = document.getElementById('customize-area_input');
const buttonSelector = document.getElementById('customize-area_button');
const checkboxSelector = document.getElementById('read-only_checkbox');

function main() {
  const keys = Object.keys(localStorage).sort((a, b) => a - b);
  keys.forEach((element) => {
    addNewTag(localStorage.getItem(element), element);
  });

  let idForNewElem = parseInt(keys[keys.length - 1], 10) + 1;
  if (Number.isNaN(idForNewElem)) {
    idForNewElem = 0;
  }

  buttonSelector.addEventListener('click', () => {
    addNewTag(inputSelector.value, idForNewElem);
    idForNewElem += 1;
  }, false);

  checkboxSelector.addEventListener('change', () => {
    if (checkboxSelector.checked) {
      readOnlySet(true);
    } else {
      readOnlySet(false);
    }
  });
}

main();
