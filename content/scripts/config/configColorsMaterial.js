'use strict';
kandidatoApp.config(function($mdThemingProvider) {
    $mdThemingProvider.definePalette('redTheme', {
        '50': 'f15f4c',
        '100': 'f15f4c',
        '200': 'f15f4c',
        '300': 'f15f4c',
        '400': 'f15f4c',
        '500': 'f15f4c',
        '600': 'f15f4c',
        '700': 'f15f4c',
        '800': 'f15f4c',
        '900': 'f15f4c',
        'A100': 'f15f4c',
        'A200': 'f15f4c',
        'A400': 'f15f4c',
        'A700': 'f15f4c'
    });
    $mdThemingProvider.definePalette('grayTheme', {
        '50': '4b494f',
        '100': '4b494f',
        '200': '4b494f',
        '300': '4b494f',
        '400': '4b494f',
        '500': '4b494f',
        '600': '4b494f',
        '700': '4b494f',
        '800': '4b494f',
        '900': '4b494f',
        'A100': '4b494f',
        'A200': '4b494f',
        'A400': '4b494f',
        'A700': '4b494f'
    });
    $mdThemingProvider.theme('default')
        .primaryPalette('redTheme')
    $mdThemingProvider.theme('default')
        .accentPalette('grayTheme')
});


// #f15f4c
// #4b494f
