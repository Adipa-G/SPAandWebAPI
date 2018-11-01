var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

global.jQuery = global.$ = require('../lib/jquery-2.2.4.js');
global.moment = require('../lib/moment.js');

global.hljs = hljs = require('../lib/highlight.js');
hljs.initHighlightingOnLoad();

require('../lib/vkbeautify.js');
global.vkbeautify = vkbeautify = window.vkbeautify;