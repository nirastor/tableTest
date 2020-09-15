// *** app constant ***
const URL_FOR_SMALL = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32})';
const URL_FOR_BIG = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
const ITEMS_ON_PAGE = 10;

// *** global variables ***
let currentPage = 1;
let data = [];
let dataOriginal = [];

const sort = {
    type: '',
    direction: ''
}