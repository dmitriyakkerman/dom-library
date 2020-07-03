const $d = require('../src/js/dom');

describe('$d testing', () => {

  document.body.innerHTML = `
    <div id="someId"></div>

    <div class="box"></div>
    <div class="box"></div>
  `;

  test('$d should be defined', () => {
    expect($d).toBeDefined();
  });

  test('Length of element with id should be equal 1', () => {
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
  })

  test('Element with id "someId" should have additional class "someClass" after implementing "toggleClass" method', () => {
    let element = $d('#someId').toggleClass('someClass');
    expect(element.hasClass('someClass')).toBeTruthy();
  })
})