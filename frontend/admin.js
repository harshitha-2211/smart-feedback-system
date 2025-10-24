// Dynamically determine base URL
const BASE_URL = window.location.origin;

document.addEventListener("DOMContentLoaded", async () => {
  const ctx = document.getElementById("sentimentChart").getContext("2d");
  const tableBody = document.getElementById("feedbacktablebody");

  const positiveBox = document.getElementById("positiveCount");
  const negativeBox = document.getElementById("negativeCount");
  const neutralBox = document.getElementById("neutralCount");

  try {
    // Fetch summary for chart and stats
    const summaryResponse = await fetch(`${BASE_URL}/api/feedback/summary`);
    const summaryData = await summaryResponse.json();

    positiveBox.textContent = summaryData.Positive || 0;
    negativeBox.textContent = summaryData.Negative || 0;
    neutralBox.textContent = summaryData.Neutral || 0;

    const sentimentLabels = Object.keys(summaryData);
    const sentimentValues = Object.values(summaryData);

    new Chart(ctx, {
      type: "pie",
      data: {
        labels: sentimentLabels,
        datasets: [{
          data: sentimentValues,
          backgroundColor: ["#4caf50", "#f44336", "#9e9e9e"],
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
          title: {
            display: true,
            text: "Feedback Sentiment Overview",
            font: { size: 16 },
          },
        },
      },
    });

    // Fetch all feedback for table
    const feedbackResponse = await fetch(`${BASE_URL}/api/feedback/all`);
    const feedbackData = await feedbackResponse.json();

    tableBody.innerHTML = "";

    if (feedbackData.length === 0) {
      const emptyRow = document.createElement("tr");
      emptyRow.innerHTML = `<td colspan="5" class="placeholder">No feedback entries yet</td>`;
      tableBody.appendChild(emptyRow);
    } else {
      feedbackData.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td class="name-column">${item.name}</td>
          <td class="email-column">${item.email}</td>
          <td class="message-column">${item.message}</td>
          <td style="color:${
            item.sentiment === "Positive" ? "green" :
            item.sentiment === "Negative" ? "red" : "gray"
          };">${item.sentiment}</td>
          <td>${new Date(item.createdAt).toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
      });
    }

  } catch (error) {
    console.error("Error fetching admin data:", error);
    tableBody.innerHTML = `<tr><td colspan="5" class="placeholder">Failed to load feedback</td></tr>`;
  }
});
