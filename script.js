document.getElementById("ageForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const day = parseInt(document.getElementById("day").value);
    const month = parseInt(document.getElementById("month").value) - 1; // JavaScript months are zero-indexed
    const year = parseInt(document.getElementById("year").value);

    const today = new Date();
    const birthDate = new Date(year, month, day);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        displayMessage("Please enter a valid date.", "error");
        return;
    }

    if (birthDate > today || day <= 0 || day > 31 || month < 0 || month > 11 || year < 1900) {
        displayMessage("Invalid date of birth.", "error");
        return;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    if (age >= 0) {
        displayMessage(`You are ${age} years old.`, "success");
    } else {
        displayMessage("Invalid birthdate, try again.", "error");
    }
});

function displayMessage(message, type) {
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = message;

    if (type === "error") {
        resultDiv.style.color = "#dc3545";
    } else if (type === "success") {
        resultDiv.style.color = "#28a745";
    }
}
