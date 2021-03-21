export default class TagList {
  constructor() {
    this.idForNewElem = null;
    this.keys = null;

    this.root = document.querySelector('.root');

    this.inputSelector = null;
    this.buttonSelector = null;
    this.checkboxSelector = null;
    this.tagArea = null;
  }

  addNewTag(tagText, tagId) {
    const newTag = document.createDocumentFragment();

    const newTagContainer = document.createElement('div');
    newTagContainer.dataset.id = tagId;
    const newTagTextArea = document.createElement('span');
    newTagTextArea.innerHTML = tagText;
    const newTagButton = document.createElement('button');
    newTagButton.innerHTML = 'X';

    newTagContainer.appendChild(newTagTextArea);
    newTagContainer.appendChild(newTagButton);
    newTag.appendChild(newTagContainer);

    localStorage.setItem(tagId, tagText);

    newTagButton.addEventListener('click', () => {
      newTagContainer.remove();
      localStorage.removeItem(tagId);
    }, false);

    this.tagArea.appendChild(newTag);
  }

  readOnlySet() {
    const buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].disabled = this.checkboxSelector.checked;
    }
  }

  getLocalStorageItems() {
    this.keys = Object.keys(localStorage).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  }

  addLocalStorageItems() {
    this.keys.forEach((element) => {
      this.addNewTag(localStorage.getItem(element), element);
    });
  }

  init() {
    const container = document.createDocumentFragment();
    const customizeAreaContainer = document.createDocumentFragment();
    const customizeArea = document.createElement('div');
    customizeArea.classList.add('customize-area_container');
    const tagsArea = document.createElement('div');
    tagsArea.classList.add('tags-area_container');

    const customizeAreaInput = document.createElement('input');
    document.createElement('input');
    customizeAreaInput.id = 'customize-area_input';
    customizeAreaInput.type = 'text';
    const customizeAreaCheckbox = document.createElement('input');
    customizeAreaCheckbox.id = 'read-only_checkbox';
    customizeAreaCheckbox.type = 'checkbox';
    const customizeAreaButton = document.createElement('button');
    customizeAreaButton.id = 'customize-area_button';
    customizeAreaButton.innerHTML = 'Add';

    container.appendChild(customizeArea);
    container.appendChild(tagsArea);
    this.root.appendChild(container);

    customizeAreaContainer.appendChild(customizeAreaInput);
    customizeAreaContainer.appendChild(customizeAreaCheckbox);
    customizeAreaContainer.appendChild(customizeAreaButton);
    const customizeAreaSelector = document.querySelector('.customize-area_container');
    customizeAreaSelector.appendChild(customizeAreaContainer);

    this.inputSelector = document.getElementById('customize-area_input');
    this.buttonSelector = document.getElementById('customize-area_button');
    this.checkboxSelector = document.getElementById('read-only_checkbox');
    this.tagArea = document.querySelector('.tags-area_container');

    this.getLocalStorageItems();
    this.addLocalStorageItems();

    this.idForNewElem = parseInt(this.keys[this.keys.length - 1], 10) + 1;
    if (Number.isNaN(this.idForNewElem)) {
      this.idForNewElem = 0;
    }

    this.buttonSelector.addEventListener('click', () => {
      this.addNewTag(this.inputSelector.value, this.idForNewElem);
      this.idForNewElem += 1;
    }, false);

    this.checkboxSelector.addEventListener('change', () => {
      this.readOnlySet();
    });
  }
}
