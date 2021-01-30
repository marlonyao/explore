import _ from 'lodash'

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  // 参考：https://www.lodashjs.com/docs/lodash.join
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
