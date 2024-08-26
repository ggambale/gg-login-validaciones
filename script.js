document.addEventListener('DOMContentLoaded', function (){

    const loginForm = document.getElementById('loginForm')
    const emailInput = document.getElementById('email')
    const passwordInput = document.getElementById('password')
    const confirmPasswordInput = document.getElementById('confirmPassword')
    const emailError = document.getElementById('emailError')
    const passwordError = document.getElementById('passwordError')
    const confirmPasswordError = document.getElementById('confirmPasswordError')
    const showHidePassword = document.getElementById('show-hide')

    showHidePassword.addEventListener('click', function(){
        let currentType = passwordInput.type
        if(currentType === 'password'){
            passwordInput.type = 'text'
            confirmPasswordInput.type = 'text'
        } else {
            passwordInput.type = 'password'
            confirmPasswordInput.type = 'password'
        }
    })

    loginForm.addEventListener('submit', function(event){
        event.preventDefault()
        validateForm()
    })

    emailInput.addEventListener('blur', function (){
        validateEmail()
    })

    passwordInput.addEventListener('blur', function (){
        validatePassword()
    })

    confirmPasswordInput.addEventListener('blur', function (){
        validatePasswordMatch()
    })

    emailInput.addEventListener('change', function (){
        clearError(emailError)
    })

    passwordInput.addEventListener('change', function (){
        clearError(passwordError)
    })

    confirmPasswordInput.addEventListener('change', function (){
        clearError(confirmPasswordError)
    })

    function validateForm(){
        const isValidEmail = validateEmail()
        const isValidPassword = validatePassword()
        const isValidConfirm = validatePasswordMatch()

        if(isValidEmail && isValidPassword && isValidConfirm){
            // TODO: Guardar mail en localStorage y generar JSON en consola
            alert('Ha ingresado con exito!')
            saveToLocalStorage()
        }
    }

    function validateEmail(){
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const emailValue = emailInput.value // Elimina espacios vacios al comienzo y al final del string
        if(!regex.test(emailValue)){
            showError(emailError, 'Ingresa un email Válido!')
            return false
        }
        return true
    }

    function validatePassword(){
        const passwordValue = passwordInput.value
        if(passwordValue.length < 6){
            showError(passwordError, 'El password debe ser Mayor o Igual a 6!')
            return false
        }
        return true
    }

    function validatePasswordMatch(){
        const passwordValue = passwordInput.value
        const confirmPasswordValue = confirmPasswordInput.value
        if(passwordValue != confirmPasswordValue){
            showError(confirmPasswordError, 'Las contraseñas deben coincidir!')
            return false
        }
        return true
    }

    function showError(element, message){
        element.innerHTML = message
        element.style.display = 'block'
    }

    function clearError(element){
        element.style.display = 'none'
    }

    function saveToLocalStorage(){
        const emailValue = emailInput.value
        localStorage.setItem('email', emailValue)
        
        const body = bodyBuilderJSON()
        console.log(body)
    }

    function bodyBuilderJSON(){
        return {
            "email": emailInput.value,
            "password": passwordInput.value
        }
    }

})