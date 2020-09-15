// ***MODAL ELEMENTS ***
const elModalAdd = document.querySelector('.modal__add');
const elModalAddBtnClose = elModalAdd.querySelector('.modal-add__button-close');
const elModalAddButton = elModalAdd.querySelector('.modal-add__button-add');
const elModalAddInputs = Array.from( elModalAdd.querySelectorAll('input') );


// *** MODAL INTERFACE ***
elModalAddBtnClose.addEventListener('click', (e) => {
    e.preventDefault();
    elModalAdd.classList.remove('modal-open');
});

elModalAddInputs.forEach(input => {
    input.addEventListener('input', () => {
        let existEmpty = false;
        elModalAddInputs.forEach(input => {
            if (input.value === '') {
                existEmpty = true;
            }
        });
        elModalAddButton.disabled = existEmpty;
    });
});

elModalAddButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    const addedObject = {
        id: elModalAdd.querySelector('input[data-datatype="id"]').value,
        firstName: elModalAdd.querySelector('input[data-datatype="firstName"]').value,
        lastName: elModalAdd.querySelector('input[data-datatype="lastName"]').value,
        email: elModalAdd.querySelector('input[data-datatype="email"]').value,
        phone: elModalAdd.querySelector('input[data-datatype="phone"]').value,
        address: {
            streetAddress: "No str",
            city: "No city",
            state:"No state",
            zip:"000000"
        },
        description: 'Empty description'
    }
    data.splice( (currentPage - 1) * ITEMS_ON_PAGE, 0, addedObject);
    dataOriginal.unshift(addedObject);
    
    renderTable();
    
    restoreHeadersText();
    sort.type = '';
    sort.direction = '';
    
    elModalAddInputs.forEach(input => {
        input.value = '';
    });
    elModalAdd.classList.remove('modal-open');
});
