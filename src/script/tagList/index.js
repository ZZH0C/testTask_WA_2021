export default class TagList {
  constructor(root) {
    this.root = root;

    this.idForNewElem = null;
    this.keys = null;

    this.inputSelector = null;
    this.addButtonSelector = null;
    this.setButtonSelector = null;
    this.delButtonSelector = null;
    this.checkboxSelector = null;
    this.tagAreaSelector = null;
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
      this.deleteTag(tagId);
    }, false);

    this.tagAreaSelector.appendChild(newTag);
  }

  deleteTag(id) {
    const tag = this.tagAreaSelector.querySelector(`[data-id="${id}"]`);
    if (tag) {
      tag.remove();
      localStorage.removeItem(id);
    }
  }

  setReadOnly() {
    const buttons = this.root.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].disabled = this.checkboxSelector.checked;
    }
  }

  getLocalStorageItems() {
    this.keys = Object.keys(localStorage).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    this.addLocalStorageItems();
  }

  addLocalStorageItems() {
    this.keys.forEach((element) => {
      this.addNewTag(localStorage.getItem(element), element);
    });
  }

  clearTagList() {
    while (this.tagAreaSelector.childNodes.length > 0) {
      localStorage.removeItem(this.tagAreaSelector.childNodes[0].dataset.id);
      this.tagAreaSelector.childNodes[0].remove();
    }
    this.idForNewElem = 0;
  }

  getTagList() {
    const tagList = [];
    this.tagAreaSelector.childNodes.forEach((elem) => {
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

    customizeAreaContainer.append(
      customizeAreaInput,
      customizeAreaCheckbox,
      customizeAreaAddButton,
      customizeAreaSetButton,
      customizeAreaDelButton,
    );

    customizeArea.appendChild(customizeAreaContainer);

    this.inputSelector = customizeAreaInput;
    this.addButtonSelector = customizeAreaAddButton;
    this.setButtonSelector = customizeAreaSetButton;
    this.delButtonSelector = customizeAreaDelButton;
    this.checkboxSelector = customizeAreaCheckbox;
    this.tagAreaSelector = tagsArea;

    this.getLocalStorageItems();

    this.idForNewElem = parseInt(this.keys[this.keys.length - 1], 10) + 1;
    if (Number.isNaN(this.idForNewElem)) {
      this.idForNewElem = 0;
    }

    this.addButtonSelector.addEventListener('click', () => {
      this.addNewTag(this.inputSelector.value, this.idForNewElem);
      this.idForNewElem += 1;
    }, false);

    // добавлена для демонстрации метода setTagList
    // в данном случае добавляет пресет
    this.setButtonSelector.addEventListener('click', () => {
      this.setTagList([
        { text: 1 },
        { text: 2 },
        { text: 3 },
      ]);
    }, false);

    // добавлена для демонстрации метода deleteTag
    // в данном случае удаляет элемен с id = input
    this.delButtonSelector.addEventListener('click', () => {
      this.deleteTag(this.inputSelector.value);
    }, false);

    this.checkboxSelector.addEventListener('change', () => {
      this.setReadOnly();
    });
  }
}
