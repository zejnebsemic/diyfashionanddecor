document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeatPassword").value;

    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const dobError = document.getElementById("dobError");
    const genderError = document.getElementById("genderError");
    const passwordError = document.getElementById("passwordError");
    const repeatPasswordError = document.getElementById("repeatPasswordError");
    const result = document.getElementById("result");

    let hasErrors = false;

    emailError.textContent = "";
    phoneError.textContent = "";
    dobError.textContent = "";
    genderError.textContent = "";
    passwordError.textContent = "";
    repeatPasswordError.textContent = "";
    result.textContent = "";

    if (!validateEmail(email)) {
        emailError.textContent = "Please enter a valid email address.";
        hasErrors = true;
    }

    if (!validatePhone(phone)) {
        phoneError.textContent = "Phone number must contain exactly 10 digits.";
        hasErrors = true;
    }

    if (!dob || new Date(dob) >= new Date()) {
        dobError.textContent = "Please enter a valid date of birth.";
        hasErrors = true;
    }

    if (!gender) {
        genderError.textContent = "Please select a gender.";
        hasErrors = true;
    }

    if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters.";
        hasErrors = true;
    }

    if (password !== repeatPassword) {
        repeatPasswordError.textContent = "Passwords do not match.";
        hasErrors = true;
    }

    if (!hasErrors) {
        const formData = {
            email,
            phone,
            dob,
            gender,
            password,
        };

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then(() => {
                result.textContent = "Form Submitted Successfully!";
                result.classList.add("success-message");
            })
            .catch(() => {
                result.textContent = "An error occurred while submitting the form. Please try again.";
                result.classList.add("error-message");
            });
    }
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhone(phone) {
    const regex = /^\d{10}$/;
    return regex.test(phone);
}
document.addEventListener('DOMContentLoaded', function () {
    const themeSelector = document.getElementById('theme-selector');
    const savedTheme = localStorage.getItem('theme') || 'default';

    document.body.className = `${savedTheme}-theme`;
    themeSelector.value = savedTheme;

    themeSelector.addEventListener('change', function () {
        const selectedTheme = themeSelector.value;

        document.body.className = '';
        document.body.classList.add(`${selectedTheme}-theme`);

        localStorage.setItem('theme', selectedTheme);
    });
});

const inputs = document.querySelectorAll("#contactForm input, #contactForm select");

          inputs.forEach((input) => {
            input.addEventListener("input", () => {
                const result = document.getElementById("result");
                result.textContent = ""; 
                result.classList.remove("success-message");
          });
    });
