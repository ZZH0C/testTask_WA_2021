import '../style/index.css';
import TagList from './tagList';

function main() {
  const root = document.querySelector('.root');
  const tagList = new TagList(root);
  tagList.init();
  console.log(tagList.getTagList());
}

main();
