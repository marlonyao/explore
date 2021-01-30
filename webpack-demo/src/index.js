import _ from 'lodash'
import './style.css'
// webpack 会将 icon.png 输出到output directory，并将Icon替换为文件路径
import Icon from './icon.png'

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  // 参考：https://www.lodashjs.com/docs/lodash.join
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello')

  // add the image to our existing div
  const myIcon = new Image()
  myIcon.src = Icon

  element.appendChild(myIcon)

  return element;
}

document.body.appendChild(component());
