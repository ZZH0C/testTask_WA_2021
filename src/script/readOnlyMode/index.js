export default function readOnlySet(isItOn) {
  const buttons = document.getElementsByTagName('button');

  if (isItOn) {
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].disabled = true;
    }
  } else {
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].disabled = false;
    }
  }
}
