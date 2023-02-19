import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const LOCALSTORAGE_KEY = 'feedback-form-state';

// функцію, яка буде зберігати стан форми в локальному сховищі
const saveStateToLocalStorage = throttle(() => {
  const state = {
    email: emailInput.value,
    message: messageInput.value
  };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state));
}, 500);

// функцію, яка буде відновлювати стан форми з локального сховища
const restoreStateFromLocalStorage = () => {
  const stateJSON = localStorage.getItem(LOCALSTORAGE_KEY);
  if (stateJSON) {
    const state = JSON.parse(stateJSON);
    emailInput.value = state.email;
    messageInput.value = state.message;
  }
};

restoreStateFromLocalStorage();

emailInput.addEventListener('input', saveStateToLocalStorage);
messageInput.addEventListener('input', saveStateToLocalStorage);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const state = {
    email: '',
    message: ''
  };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state));
  emailInput.value = '';
  messageInput.value = '';
  console.log(state);
});