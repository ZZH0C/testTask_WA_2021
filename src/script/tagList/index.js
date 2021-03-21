export default class TagList {
  constructor(root) {
    this.idForNewElem = null;
    this.keys = null;

    this.root = root;

    this.inputSelector = null;
    this.addButtonSelector = null;
    this.setButtonSelector = null;
    this.delButtonSelector = null;
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

  deleteTag(id) {
    this.tagArea.childNodes.forEach((elem) => {
      if (elem.dataset.id === id) elem.remove();
    });
  }

  setReadOnly() {
    const buttons = this.root.getElementsByTagName('button');
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

  clearTagList() {
    while (this.tagArea.childNodes.length > 0) {
      localStorage.removeItem(this.tagArea.childNodes[0].dataset.id);
      this.tagArea.childNodes[0].remove();
    }
    this.idForNewElem = 0;
  }

  getTagList() {
    const tagList = [];
    this.tagArea.childNodes.forEach((elem) => {
      tagList.push({
        text: elem.childNodes[0].innerHTML,
      });
    });
    return tagList;
  }

  setTagList(newTags) {
    this.clearTagList();
    newTags.forEach((elem) => {
      this.addNewTag(elem.text, this.idForNewElem);
      this.idForNewElem += 1;
    });
  }

  init() {
    const container = document.createDocumentFragment();
    const customizeAreaContainer = document.createDocumentFragment();
    const appContainer = document.createElement('div');
    appContainer.classList.add('app_container');
    this.root.appendChild(appContainer);
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
    const customizeAreaAddButton = document.createElement('button');
    customizeAreaAddButton.id = 'customize-area_add-button';
    customizeAreaAddButton.innerHTML = 'Add';
    const customizeAreaSetButton = document.createElement('button');
    customizeAreaSetButton.id = 'customize-area_set-button';
    customizeAreaSetButton.innerHTML = 'Set';
    const customizeAreaDelButton = document.createElement('button');
    customizeAreaDelButton.id = 'customize-area_del-button';
    customizeAreaDelButton.innerHTML = 'Del';

    container.appendChild(customizeArea);
    container.appendChild(tagsArea);
    appContainer.appendChild(container);

    customizeAreaContainer.appendChild(customizeAreaInput);
    customizeAreaContainer.appendChild(customizeAreaCheckbox);
    customizeAreaContainer.appendChild(customizeAreaAddButton);
    customizeAreaContainer.appendChild(customizeAreaSetButton);
    customizeAreaContainer.appendChild(customizeAreaDelButton);

    const customizeAreaSelector = document.querySelector('.customize-area_container');
    customizeAreaSelector.appendChild(customizeAreaContainer);

    this.inputSelector = document.getElementById('customize-area_input');
    this.addButtonSelector = document.getElementById('customize-area_add-button');
    this.setButtonSelector = document.getElementById('customize-area_set-button');
    this.delButtonSelector = document.getElementById('customize-area_del-button');
    this.checkboxSelector = document.getElementById('read-only_checkbox');

    this.tagArea = document.querySelector('.tags-area_container');

    this.getLocalStorageItems();
    this.addLocalStorageItems();

    this.idForNewElem = parseInt(this.keys[this.keys.length - 1], 10) + 1;
    if (Number.isNaN(this.idForNewElem)) {
      this.idForNewElem = 0;
    }

    this.addButtonSelector.addEventListener('click', () => {
      this.addNewTag(this.inputSelector.value, this.idForNewElem);
      this.idForNewElem += 1;
    }, false);

    this.setButtonSelector.addEventListener('click', () => {
      this.setTagList([
        { text: 1 },
        { text: 2 },
        { text: 3 },
      ]);
    }, false);

    this.delButtonSelector.addEventListener('click', () => {
      this.deleteTag(this.inputSelector.value);
    }, false);

    this.checkboxSelector.addEventListener('change', () => {
      this.setReadOnly();
    });
  }
}
