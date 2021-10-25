const form = document.getElementById('form')
const user = document.getElementById('username')
const email = document.getElementById('email')
const pword = document.getElementById('password')
const pword2 = document.getElementById('password2')

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement
  formControl.className = 'form-control error'
  const small = formControl.querySelector('small')
  small.innerText = message
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
}

// Validate email
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (re.test(input.value.trim())) {
    showSuccess(input)
  } else {
    showError(input, 'Insert valid email address')
  }
}

// Check required fields
function checkRequired(inputArray) {
  inputArray.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`)
    } else {
      showSuccess(input)
    }
  })
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(
        input
      )} must be at least ${min} charaters`
    )
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(
        input
      )} must be less than ${max} charaters`
    )
  } else {
    showSuccess(input)
  }
}

// Check that passwords match
function checkPasswordsMatch(input, input2) {
  if (input.value !== input2.value) {
    showError(
      input2,
      `${getFieldName(input)}s do not match`
    )
  } else {
    showSuccess(input)
  }
}

// Get field name
function getFieldName(input) {
  return (
    input.id.charAt(0).toUpperCase() + input.id.slice(1)
  )
}

// Validation with Event listener – check required fields
form.addEventListener('submit', e => {
  e.preventDefault()

  checkRequired([user, email, pword, pword2])
  checkLength(user, 3, 15)
  checkLength(pword, 6, 25)
  checkEmail(email)
  checkPasswordsMatch(pword, pword2)
})
