const $d = require('../src/js/dom-util');

describe('$d should return element', () => {

  document.body.innerHTML = `
    <div id="box" class="box"></div>
  `;

  test('$d should return element', () => {

    expect($d('.box').selector.tagName).toBe("DIV");
    expect($d('.box').selector.className).toBe("box");
    expect($d('#box').selector.id).toBe("box");

    $d('.box').addClass('box2');
    expect($d('.box').hasClass('box2')).toBeTruthy();
  });

})