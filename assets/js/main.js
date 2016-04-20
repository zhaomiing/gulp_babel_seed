import utils from './libs/utils';
import $ from 'jquery';

let sum = utils.add(1, 2, 3, 4, 5);

$('.j-app').text(sum)