const $d = require('../src/js/dom');

describe('$d testing', () => {

  document.body.innerHTML = `
    <div id="someId"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="element" title="some"></div>
    <div class="parent"><span class="child"></span></div>
    <div class="one"></div>
    <div class="two"></div>
    <div class="linkParent">
        <a href="" class="link1"></a>
        <a href="" class="link2"></a>
    </div>
  `;

  test('$d should be defined', () => {
    expect($d).toBeDefined();
  });

  test('$d should accept DOM element', () => {
    expect($d('.box')).toBeTruthy();
  });

  test('$d should be able to accept DOM element from variable', () => {
    let elements = $d('.box');
    expect($d(elements).length).not.toBeFalsy();
  });

  test('Length of element with id should equal 1', () => {
    expect($d('#someId').length).toBe(1);
  });

  test('Length of elements with className "box" should be equal 2', () => {
    expect($d('.box').length).toBe(2);
  });

  test('Element with id "someId" should not have class "someClass"', () => {
    expect($d('#someId').hasClass('someClass')).toBeFalsy();
  });

  test('Elements with class "box" should have class "someClass"', () => {
    let boxes = $d('.box').addClass('someClass');
    expect((boxes).hasClass('someClass')).toBeTruthy();
  });

  test('Elements with class "box" should have empty classes after implementing "removeClass" method', () => {
    let boxes = $d('.box').removeClass('box');
    expect((boxes).hasClass('box')).toBeFalsy();
  });

  test('Element with id "someId" should have additional class "someClass" after implementing "toggleClass" method', () => {
    let element = $d('#someId').toggleClass('someClass');
    expect(element.hasClass('someClass')).toBeTruthy();
  });

  test('Element with class "element" should return value of attribute "title"', () => {
    expect($d('.element').attr('title')).toBe('some');
  });

  test('Element with class "element" should set new value of attribute "title"', () => {
    $d('.element').attr('title', 'newValue');
    expect($d('.element').attr('title')).toBe('newValue');
  });

  test('Length of elements with class "element" should equal 0 after removing', () => {
    $d('.element').remove();
    expect($d('.element').length).toBe(0);
  });

  test('Element with class "child" should have parent element with class "parent"', () => {
    expect($d('.child').closest('.parent')).toBeTruthy();
  });

  test('Element with class "parent" should have child element with class "child"', () => {
    expect($d('.parent').find('.child')).toBeTruthy();
  });

  test('New element should be defined after prepending to element with id "someId"', () => {
    let newElement = $d('#someId').prepend('<div><button>Отправить</button></div>');
    expect(newElement.find('button')).not.toBeNull();
  });

  test('New element should be defined after appending to element with id "someId"', () => {
    let newElement = $d('#someId').append('<a href="">Link</a>');
    expect(newElement.find('a')).not.toBeNull();
  });

  test('Element with class "two" should have previous element sibling with class "one"', () => {
    let previousElement = $d('.two').prev();
    expect(previousElement.hasClass('one')).toBeTruthy();
  });

  test('Element with class "one" should have next element sibling with class "two"', () => {
    let nextElement = $d('.one').next();
    expect(nextElement.hasClass('two')).toBeTruthy();
  });

  test('Element with class "link" should have parent element with class "linkParent"', () => {
    let linkParent = $d('.link1').parent();
    expect(linkParent.hasClass('linkParent')).toBeTruthy();
  });

  test('Element with class "linkParent" should have first child element with class "link1"', () => {
    let firstChild = $d('.linkParent').first();
    expect(firstChild.hasClass('link1')).toBeTruthy();
  });

  test('Element with class "linkParent" should have last child element with class "link2"', () => {
    let lastChild = $d('.linkParent').last();
    expect(lastChild.hasClass('link2')).toBeTruthy();
  });

});