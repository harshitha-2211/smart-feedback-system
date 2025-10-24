// Dynamically determine base URL
const BASE_URL = window.location.origin;

document.getElementById("feedbackForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (message.length < 10) {
        alert("Message has to be minimum 10 characters long");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/api/feedback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });
        const data = await response.json();

        const resultDiv = document.getElementById("result");
        if (response.ok) {
            resultDiv.innerHTML = `Sentiment: <strong>${data.sentiment}</strong>`;
            resultDiv.style.color =
                data.sentiment === "Positive" ? "green" :
                data.sentiment === "Negative" ? "red" : "gray";
            resultDiv.style.opacity = 1;

            setTimeout(() => { resultDiv.style.opacity = 0; }, 5000);
            document.getElementById("feedbackForm").reset();
        } else {
            resultDiv.innerHTML = `Error: ${data.error || "Something went wrong!"}`;
            resultDiv.style.color = "red";
        }

    } catch (error) {
        console.error(error);
        alert("Error! Couldn't Connect to Server.");
    }
});
