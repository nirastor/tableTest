// *** TABLE ELEMENTS ***
const elTable = document.querySelector('.section__main-table');
const rowTemplate = document.getElementById('main-table__row-template').content.querySelector('.main-table__row');
const elAboutPerson = document.querySelector('.about-person');

// *** table control elements ***
const elTableControls = document.querySelector('.main-table__controls');
const elButtonOpenModalAdd = document.querySelector('.main-table__button-add');

// *** paginator elements ***
const elButtonLeft = document.getElementById('paginator-button-left');
const elButtonRight = document.getElementById('paginator-button-right');
const elPageCurrent = document.querySelector('.paginator__page--current');
const elPageTotal = document.querySelector('.paginator__page--total');

// *** filter elements ***
const elFilterInput = document.querySelector('.filter__input--text');
const elFilterColumn = document.querySelector('.filter__input--column');
const elFilterButtonSearch = document.querySelector('.filter__button--search');
const elFilterButtonReset = document.querySelector('.filter__button--reset');
const elFilterErrorMessage = document.querySelector('.filter__error-message');

// *** sort elements ***
const elHeadersBlock = document.querySelector('.main-table__row--header');
const elHeaders = Array.from( elHeadersBlock.querySelectorAll('.main-table__element') );


// *** TABLE INTERFACE ***
elFilterButtonSearch.addEventListener('click', (e) => {
    e.preventDefault();
    filterTable();
});

elFilterButtonReset.addEventListener('click', (e) => {
    e.preventDefault();
    data = dataOriginal.slice();
    resetFilter();
    renderTable();
});

elButtonOpenModalAdd.addEventListener('click',(e) => {
    e.preventDefault();
    elModalAdd.classList.add('modal-open');
});

elHeaders.forEach(header => {    
    header.addEventListener('click', (e) => {
        e.preventDefault();
        sortTable(header);
    });
});

elButtonLeft.addEventListener('click', (e) => {
    e.preventDefault();
    currentPage--;
    renderTable();
});

elButtonRight.addEventListener('click', (e) => {
    e.preventDefault();
    currentPage++;
    renderTable();
});

// *** TABLE FUNCTIONS ***
function clearTable() {
    Array.from(elTable.querySelectorAll('.main-table__row')).forEach(row => row.remove());
}

function resetFilter() {
    elFilterInput.value = '';
    elFilterColumn.value = 'id';
    elFilterButtonReset.classList.add('reset-hidden');
    elFilterErrorMessage.classList.add('error-hidden');
    currentPage = 1;
    restoreHeadersText();
}

function clearAll() {
    clearTable();
    resetFilter();
    restoreHeadersText();
    elAboutPerson.classList.remove('about-person-show');
    elTableControls.classList.remove('table-controls-show');
}

function renderTable() {
    clearTable();

    const start = (currentPage - 1) * ITEMS_ON_PAGE;
    const end = Math.min(currentPage * ITEMS_ON_PAGE, data.length);

    for (let i = start; i < end; i++) {
        const newRow = rowTemplate.cloneNode(true);
        
        newRow.querySelector('div[data-datatype="id"]').textContent = data[i].id;
        newRow.querySelector('div[data-datatype="firstName"]').textContent = data[i].firstName;
        newRow.querySelector('div[data-datatype="lastName"]').textContent = data[i].lastName;
        newRow.querySelector('div[data-datatype="email"]').textContent = data[i].email;
        newRow.querySelector('div[data-datatype="phone"]').textContent = data[i].phone;

        newRow.addEventListener('click', () => {
            elAboutPerson.classList.add('about-person-show');
            elAboutPerson.querySelector('.about-person__full-name').textContent = data[i].firstName + " " + data[i].lastName;
            elAboutPerson.querySelector('span[data-addres="streetAddress"]').textContent = data[i].address.streetAddress;
            elAboutPerson.querySelector('span[data-addres="city"]').textContent = data[i].address.city;
            elAboutPerson.querySelector('span[data-addres="state"]').textContent = data[i].address.state;
            elAboutPerson.querySelector('span[data-addres="zip"]').textContent = data[i].address.zip;
            elAboutPerson.querySelector('.about-person__description').value = data[i].description;
        });
        
        elTable.appendChild(newRow);
    }

    showTableControls();
}

function showTableControls() {
    elTableControls.classList.add('table-controls-show');
    const maxPage = Math.ceil(data.length / ITEMS_ON_PAGE)
    elPageTotal.textContent = maxPage;
    elPageCurrent.textContent = currentPage;
    elButtonLeft.disabled = currentPage === 1 ? true : false ;
    elButtonRight.disabled = currentPage === maxPage ? true : false ;
}

function filterTable() {
    const search = elFilterInput.value;
    if (!search) {
        return false;
    }

    const searchColumn = elFilterColumn.value.split('-');
    elFilterErrorMessage.classList.add('error-hidden');

    const filtered = data.filter(item => {
        if (searchColumn.length === 1) {
            if (item[searchColumn[0]].toString().includes(search) ) {
                return true;
            }
        } else if (searchColumn.length === 2) {
            if ( item[searchColumn[0]][searchColumn[1]].toString().includes(search) ) {
                return true;
            }
        } else {
            return false;
        }
    })

    dataOriginal = data.slice();
    data = filtered.slice();

    if (filtered.length) {
        currentPage = 1;
        renderTable();
    } else {
        elFilterErrorMessage.textContent = `Нет данных с ${search} в ${elFilterColumn.value}`
        elFilterErrorMessage.classList.remove('error-hidden');
    }

    elFilterButtonReset.classList.remove('reset-hidden');
}

function restoreHeadersText() {
    elHeaders.forEach(header => {
        header.textContent = header.dataset.datatype;
    });
}

function sortTable(header) {
    if (data.length === 0) {
        return;
    }
    
    restoreHeadersText();
    const headerType = header.dataset.datatype;

    if (sort.type !== headerType || sort.type === headerType && sort.direction === 'DESC') {
        data.sort((a,b) => {
            if (a[headerType] < b[headerType]) return -1;
            if (a[headerType] > b[headerType]) return 1;
            else return 0; 
        });
        sort.direction = 'ASC';
        header.textContent = headerType + ' ▲';

    } else if (sort) {
        data.sort((a,b) => {
            if (a[headerType] > b[headerType]) return -1;
            if (a[headerType] < b[headerType]) return 1;
            else return 0; 
        });
        sort.direction = 'DESC';
        header.textContent = headerType + ' ▼';
    } 

    sort.type = headerType;
    currentPage = 1;
    renderTable();
}
