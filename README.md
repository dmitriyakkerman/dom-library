[![Build Status](https://travis-ci.org/dmitriyakkerman/dom-util.svg?branch=master)](https://travis-ci.org/dmitriyakkerman/dom-util)

Usage:      
 
    $d('div')                               => all DIV elements on the page
    $('#header')                            => element with id "header"
    $('.link')                              => all elements with className "link"          
    $d('.box').html('<div>New one</div>');  => changing innerHTML of elements with className "box"  
    $d('.box').text('Some text');           => changing textContent of elements with className "box"     
    $d('.box').addClass('someClass');       => adding additional className to the elements with className "box"        
    $d('.box').removeClass('someClass');    => removing className "someClass" from the elements with className "box"              
    $d('.box').toggleClass('someClass');    => toggling className "someClass" from/to the elements with className "box"
    $d('.box').hasClass('someClass');       => checking if element/elements with className "box" has/have additional className "someClass"
    
        
    Chaining
        
    $d(".box").html('<div>Today is a good day</div>').text('Could be better').addClass('my-class').removeClass('my-class');    
    