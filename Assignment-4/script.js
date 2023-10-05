window.onload = () => {
  function validateName(name) {
    if (!/^[a-zA-Z0-9\s]+$/.test(name) || nameInput.value.length < 2) {
      return "Name should only contain alphanumeric characters and spaces and it should be greater than 2 alphabets.";
    }
    return "";
  }

  function validateEmail(email) {
    if (!email.endsWith("@northeastern.edu")) {
      return "Invalid email address. Please use @northeastern.edu domain.";
    }
    return "";
  }

  function validatePhoneNumber(phoneNumber) {
    if (!/^\d{3}-?\d{3}-\d{4}$/.test(phoneNumber)) {
      return "Invalid Phone Number. Please enter a valid phone number (e.g., ###-###-####).";
    }
    return "";
  }

  function validateStreetAddress(value) {
    if (value.trim() === "" || streetAddress1Input.value.length > 50) {
      return "Street Address 1 is required and should be less than 50 alphabets.";
    }
    return "";
  }

  function validateCity(value) {
    if (value.trim() === "") {
      return "City is required.";
    }
    return "";
  }

  function validateState(value) {
    if (value.trim() === "") {
      return "State is required.";
    }
    return "";
  }

  function validateZipCode(zipcode) {
    if (!/^\d{5}(?:[-\s]\d{4})?$/.test(zipcode)) {
      return "Zip Code is required. e.g #####";
    }
    return "";
  }

  function validateComments(value) {
    if (value.trim() === "") {
      return "Comment is required.";
    }
    return "";
  }

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneNumberInput = document.getElementById("phoneNumber");

  const streetAddress1Input = document.getElementById("streetAddress1");
  const cityInput = document.getElementById("city");
  const stateInput = document.getElementById("state");
  const zipCodeInput = document.getElementById("zipCode");

  const commentsInput = document.getElementById("comment");

  nameInput.addEventListener("input", function () {
    const errorMessage = validateName(this.value);
    displayErrorMessage("error_name", errorMessage);
  });

  emailInput.addEventListener("input", function () {
    const errorMessage = validateEmail(this.value);
    displayErrorMessage("error_email", errorMessage);
  });

  phoneNumberInput.addEventListener("input", function () {
    const errorMessage = validatePhoneNumber(this.value);
    displayErrorMessage("error_phoneNumber", errorMessage);
  });

  streetAddress1Input.addEventListener("input", function () {
    const errorMessage = validateStreetAddress(this.value);
    displayErrorMessage("error_streetAddress1", errorMessage);
    updateSubmitButtonState();
  });

  cityInput.addEventListener("input", function () {
    const errorMessage = validateCity(this.value);
    displayErrorMessage("error_city", errorMessage);
    updateSubmitButtonState();
  });

  stateInput.addEventListener("input", function () {
    const errorMessage = validateState(this.value);
    displayErrorMessage("error_state", errorMessage);
    updateSubmitButtonState();
  });

  zipCodeInput.addEventListener("input", function () {
    const errorMessage = validateZipCode(this.value);
    displayErrorMessage("error_zipCode", errorMessage);
    updateSubmitButtonState();
  });

  commentsInput.addEventListener("input", function () {
    const errorMessage = validateComments(this.value);
    displayErrorMessage("error_comment", errorMessage);
    updateSubmitButtonState();
  });

  function resetForm() {
    const form = document.getElementById("my-form");
    form.reset();

    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((element) => {
      element.style.display = "none";
    });

    updateSubmitButtonState();
  }

  const resetButton = document.getElementById("resetBtn");
  resetButton.addEventListener("click", resetForm);

  function displayErrorMessage(errorId, errorMessage) {
    const errorElement = document.getElementById(errorId);
    if (errorMessage) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = "block";
    } else {
      errorElement.style.display = "none";
    }
  }
  function isFormValid() {
    const nameValid = validateName(nameInput.value) === "";
    const emailValid = validateEmail(emailInput.value) === "";
    const phoneNumberValid = validatePhoneNumber(phoneNumberInput.value) === "";
    const streetAddress1Valid =
      validateStreetAddress(streetAddress1Input.value) === "";
    const cityValid = validateCity(cityInput.value) === "";
    const stateValid = validateState(stateInput.value) === "";
    const zipCodeValid = validateZipCode(zipCodeInput.value) === "";
    const commentsValid = validateComments(commentsInput.value) === "";

    return (
      nameValid &&
      emailValid &&
      phoneNumberValid &&
      streetAddress1Valid &&
      cityValid &&
      stateValid &&
      zipCodeValid &&
      commentsValid
    );
  }

  function updateSubmitButtonState() {
    const submitButton = document.getElementById("entry");
    submitButton.disabled = !isFormValid();
  }

  updateSubmitButtonState();

  function getSelectedSizeAndDrink() {
    const selectedDrinkElement = document.getElementById("mySelect");
    const selectedDrinkName =
      selectedDrinkElement.options[selectedDrinkElement.selectedIndex].text;

    const checkboxes = document.querySelectorAll('input[name="drinkSize"]');
    const selectedSize = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    const sizeAndDrink = selectedSize.join(", ");
    return selectedDrinkName + (sizeAndDrink ? " (" + sizeAndDrink + ")" : "");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = {
      title: document.querySelector('input[name="title"]:checked').value,
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      streetAddress1: document.getElementById("streetAddress1").value,
      streetAddress2: document.getElementById("streetAddress2").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      zipCode: document.getElementById("zipCode").value,
      comments: document.getElementById("comment").value,
      drinkInfo: getSelectedSizeAndDrink(),
      notes: document.getElementById("textField").value,
    };

    const resultsTable = document
      .getElementById("resultsTable")
      .getElementsByTagName("tbody")[0];
    const newRow = resultsTable.insertRow();

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const cell = newRow.insertCell();
        cell.textContent = formData[key];
      }
    }
    form.reset();
  }

  const form = document.getElementById("my-form");
  form.addEventListener("submit", handleSubmit);
};
