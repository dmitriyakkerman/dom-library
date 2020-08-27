[![Build Status](https://travis-ci.org/dmitriyakkerman/dom-library.svg?branch=master)](https://travis-ci.org/dmitriyakkerman/dom-library)

Usage:      
 
    $d('div')                                   => all DIV elements on the page
    $d('#header')                               => element with id "header"
    $d('.link')                                 => all elements with className "link"          
    $d('.box').html('<div>New one</div>');      => changing innerHTML of elements with className "box"  
    $d('.box').text('Some text');               => changing textContent of elements with className "box"     
    $d('.box').css('color', 'red')              => adding style property and value to the elements with className "box"
    $d('.box').css({
        color: 'red', 
        border: 'solid #000 1px'
    });                                         => adding multiple style properties and values to the elements with className "box"
    $d('.box').addClass('someClass');           => adding additional className to the elements with className "box"        
    $d('.box').removeClass('someClass');        => removing className "someClass" from the elements with className "box"              
    $d('.box').toggleClass('someClass');        => toggling className "someClass" from/to the elements with className "box"
    $d('.box').hasClass('someClass');           => checking if element/elements with className "box" has/have additional className "someClass"
    $d('#element').attr('title')                => checking the value of "title" attribute
    $d('#element').attr('title', 'first')       => settting the value to "title" attribute  
    $d('.parent').find('.child')                => finding element with className "child" inside element with className "parent"
    $d('.child').closest('.parent')             => checking if element with className "child" has parent with className "parent"
    $d('.two').prev()                           => finding previous element sibling of element with className "two"
    $d('.one').next()                           => finding next element sibling of element with className "one"
    $d('#box').prepend('<div>Hi</div>')         => prepending DIV element inside element with id "box"
    $d('#box').append('<div>Hi</div>')          => appending DIV element inside element with id "box"  
    $d('.box').remove();                        => removing element/elements with className "box"
    $d('box').on('click', function(){})         => adding eventListener to element/elements with className "box"
    $d('body').on('click', 'a', function(){})   => adding eventListener to 'a' tags inside body  
        
    Chaining
        
    $d(".box").html('<div>Today is a good day</div>').text('Could be better').addClass('my-class').removeClass('my-class').toggleClass('new-class').remove();    
    
