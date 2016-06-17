/**
 *
 * Application or Website name
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

window.onerror = function(errorMsg, url, lineNumber, column, errorObj){
    console.log('%c-- ERROR ---------------------------------------------------------', 'color:#c5211d;font-weight:bold;');
    console.log('%cMessage: ' + errorMsg, 'color: #c5211d');
    console.log('Script: ' + url + ':' + lineNumber);
    console.debug('Line: ' + lineNumber + ' | Column: ' + column);
    // console.log('StackTrace: ' +  errorObj);
    console.log('%c-- ERROR ---------------------------------------------------------', 'color:#c5211d;font-weight:bold;');
}