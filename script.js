const body = document.querySelector("body");
const form = document.querySelector(".contact-form");
const formElements = document.querySelectorAll("[data-type=form-element]");
const radioButtons = document.querySelectorAll('input[name="radio-oval"]');
const parentFilter = document.querySelector(".parentDisable");

const showError = (element) => {
  const errorMsg = document.querySelector(`.error-msg--${element.id}`);

  switch (element.id) {
    case "fname":
    case "lname":
    case "textarea":
      errorMsg.textContent = "This field is required";
      element.classList.add("outline-error-clr");
      break;

    case "email":
      errorMsg.textContent = "Please enter a valid email address";
      element.classList.add("outline-error-clr");
      break;

    case "rd1":
    case "rd2":
      const errorMsgRadio = document.querySelector(
        `.error-msg--${element.name}`
      );

      errorMsgRadio.textContent =
        "To submit this form, please consent to being contacted";
      break;

    case "chb-terms":
      if (!element.checked) {
        errorMsg.textContent =
          "To submit this form, please consent to being contacted";
      }
      break;
  }
};

const showSuccessMsg = () => {
  const successBox = document.querySelector(".wrapper--success-box");

  successBox.style.maxHeight = successBox.style.maxHeight
    ? null
    : successBox.scrollHeight + "px";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isFormValid = true;

  formElements.forEach((item) => {
    if (!item.validity.valid) {
      isFormValid = false;
      showError(item);
    }
  });

  if (isFormValid) {
    body.style.overflow = "hidden";
    parentFilter.style.display = "block";
    showSuccessMsg();
    setTimeout(() => form.submit(), 2000);
  }
});

//reset error-msgs
formElements.forEach((item) => {
  item.addEventListener("input", () => {
    const errorMsg = document.querySelector(`.error-msg--${item.id}`);

    errorMsg.textContent = "";
    item.classList.remove("outline-error-clr");
  });
});

//radio-buttons
radioButtons.forEach((item) => {
  item.addEventListener("change", () => {
    const errorMsgRadio = document.querySelector(`.error-msg--${item.name}`);

    errorMsgRadio.textContent = "";

    for (let btn of radioButtons) {
      if (btn.checked) {
        btn.parentElement.classList.add("checked");
      } else {
        btn.parentElement.classList.remove("checked");
      }
    }
  });
});
