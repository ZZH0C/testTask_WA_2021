const tagArea = document.querySelector('.tags-area_container');


export default function addNewTag(tagText, tagId) {
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

  tagArea.appendChild(newTag);


}
