// *** LOAD BUTTONS ELEMENTS ***
const elButtonGetSmall = document.getElementById('load-button-small');
const elButtonGetBig = document.getElementById('load-button-big');
const elButtonGetTest = document.getElementById('load-button-test');
const elLoader = document.querySelector('.main-table__loader');
const elLoaderText = document.querySelector('.loader__percent');


// *** LOAD BUTTONS INTERFACE ***
elButtonGetSmall.addEventListener('click', (e) => {
    e.preventDefault();
    clearAll();
    loadData(URL_FOR_SMALL);
    
});

elButtonGetBig.addEventListener('click', (e) => {
    e.preventDefault();
    clearAll();
    loadData(URL_FOR_BIG);
});

elButtonGetTest.addEventListener('click', (e) => {
    e.preventDefault();
    clearAll();
    data = testData.slice();
    renderTable();
});


// *** LOAD BUTTONS FUNCTION ***
function loadData(url) {
    elLoader.classList.add('loader-active');
    
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            data = JSON.parse(xhr.response);
            elLoader.classList.remove('loader-active');
            renderTable();
        }
    });
    xhr.send();
}