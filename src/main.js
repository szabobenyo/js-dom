// Start here

// ISSUE #1
const burgerMenu = document.getElementsByClassName('menu-toggle');

burgerMenu[0].addEventListener('click', function _() {
  const nav = document.getElementsByClassName('nav')[0];
  nav.classList.toggle('is-active');
});

// ISSUE #2

function disableButton(button) {
  button.classList.add('disabled');
}

function validateForm(inputFields, button, checkbox) {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < inputFields.length; i++) {
    if (inputFields[i].value === '') {
      return;
    }
  }
  if (checkbox.checked) {
    button.classList.remove('disabled');
  } else {
    disableButton(button);
  }
  // button.setAttribute('opacity', 1);
}

const submitButton = document.getElementsByClassName('btn btn-submit text-uppercase');
disableButton(submitButton[0]); // submitButton[0].setAttribute('disabled', true);

const formInputFields = document.querySelectorAll('.form-control');
const formCheckBox = document.getElementsByClassName('form-checkbox-control');
// eslint-disable-next-line no-plusplus
for (let i = 0; i < formInputFields.length; i++) {
  formInputFields[i].addEventListener('input', () => validateForm(formInputFields, submitButton[0], formCheckBox[0]));
}
formCheckBox[0].addEventListener('change', () => validateForm(formInputFields, submitButton[0], formCheckBox[0]));

// ISSUE #3
const modalOverlay = document.querySelector('.overlay');
function toggleModalOverlay() {
  modalOverlay.classList.toggle('is-show');
}

function clearOutList(list) {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

const myForm = document.getElementsByClassName('form');
const modalList = document.querySelector('.modal-list');

myForm[0].addEventListener('submit', function _(event) {
  event.preventDefault();
  const isChecked = document.querySelector('.form-checkbox-control').checked;
  if (isChecked) {
    formInputFields.forEach((element) => {
      const li = document.createElement('li');
      li.appendChild(
        document.createTextNode(`${element.name.charAt(0).toUpperCase() + element.name.slice(1)}: ${element.value}`),
      );
      modalList.appendChild(li);
    });

    toggleModalOverlay();
  }
});
const confirmButton = document.getElementsByClassName('btn btn-confirm');
const closeButton = document.getElementsByClassName('btn-close');

closeButton[0].addEventListener('click', function _() {
  toggleModalOverlay();
  clearOutList(modalList);
});

confirmButton[0].addEventListener('click', function _() {
  myForm[0].reset();
  disableButton(submitButton[0]);
  toggleModalOverlay();
  clearOutList(modalList);
  // ISSUE #4 INSIDE ISSUE #3
  const myToast = document.getElementById('js-toast');
  myToast.classList.add('is-show');
  setTimeout(() => {
    myToast.classList.remove('is-show');
  }, 3000);
  const toastCloseButton = document.querySelector('.btn-close-sm');
  toastCloseButton.addEventListener('click', () => myToast.classList.remove('is-show'));
});
