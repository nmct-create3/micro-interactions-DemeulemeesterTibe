let email = {},
  password = {},
  signInButton;
function handleFloatingLabel() {
  const mail = document.querySelector('.js-email');
  const pass = document.querySelector('.js-pass');
  const labelpass = document.querySelector('.js-label-password');
  const labelmail = document.querySelector('.js-label-mail');

  mail.addEventListener('blur', function () {
    if (mail.value !== '') {
      console.log('ff');
      labelmail.classList.add('is-floating');
    } else {
      labelmail.classList.remove('is-floating');
    }
  });
  pass.addEventListener('blur', function () {
    if (pass.value !== '') {
      labelpass.classList.add('is-floating');
    } else {
      labelpass.classList.remove('is-floating');
    }
  });
}

function handlePasswordSwitcher() {
  const passwordInput = document.querySelector('#password');
  const passwordToggle = document.querySelector('#togglePassword');
  passwordToggle.addEventListener('change', function () {
    console.log('test');
    const type =
      passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
  });
}
function getDOMElements() {
  email.input = document.querySelector('#username');
  email.field = email.input.parentElement;
  email.error = email.field.querySelector('.js-error-message-email');
  password.input = document.querySelector('#password');
  password.field = password.input.parentElement;
  password.error = password.field.querySelector('.js-error-message-password');
  signInButton = document.querySelector('.js-sign-in-button');
  console.log(email, password, signInButton);
}
const isEmpty = function (value) {
  return !value || !value.length;
};
const validatePassword = function (pass) {
  if (password.input.value.length <= 1) {
    return false;
  } else {
    return true;
  }
};
const validateEmail = function (mail) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
};
const AddErrors = function (element, message) {
  element.error.textContent = message;
  element.field.classList.add('has-error');
};
const RemoveErrors = function (element) {
  element.error.textContent = null;
  element.field.classList.remove('has-error');
};
const CheckInputmail = function () {
  if (validateEmail(email.input.value)) {
    email.input.removeEventListener('input', CheckInputmail);
    RemoveErrors(email);
  }
};
const CheckInputPass = function () {
  if (validatePassword(password.input.value)) {
    password.input.removeEventListener('input', CheckInputPass);
    RemoveErrors(password);
  }
};
function enableListeners() {
  email.input.addEventListener('blur', function () {
    if (!validateEmail(email.input.value)) {
      if (isEmpty(email.input.value)) {
        AddErrors(email, 'This field is required');
      } else {
        AddErrors(email, 'Invalid emailaddress');
      }
      email.input.addEventListener('input', CheckInputmail);
    } else {
      RemoveErrors(email);
    }
  });
  password.input.addEventListener('blur', function () {
    if (!validatePassword(password.input.value)) {
      if (isEmpty(password.input.value)) {
        AddErrors(password, 'This field is required');
      } else {
        AddErrors(password, 'Invalid password');
      }
      password.input.addEventListener('input', CheckInputPass);
    } else {
      password.error.textContent = null;
      password.field.classList.remove('has-error');
    }
  });
  signInButton.addEventListener('click', function () {
    event.preventDefault();
    if (
      validateEmail(email.input.value) &&
      validatePassword(password.input.value)
    ) {
      console.log(email.input.value, password.input.value);
    }
  });
}
document.addEventListener('DOMContentLoaded', function () {
  console.log('Script loaded!');
  handleFloatingLabel();
  if (document.querySelector('.c-custom-option')) {
    getDOMElements();
    enableListeners();
  }
  if (document.querySelector('#togglePassword')) {
    handlePasswordSwitcher();
  }
});
