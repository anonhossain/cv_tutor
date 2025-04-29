// hr_body.js

// Helper function to show the loading spinner
function showLoading() {
    document.getElementById("loading11").style.display = "block";
    document.getElementById("table12").style.display = "none";
}

// Helper function to hide the loading spinner
function hideLoading() {
    document.getElementById("loading11").style.display = "none";
}

// Handle form upload
document.getElementById("upload-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    showLoading();

    const formData = new FormData();
    const resumes = document.getElementById("resume-upload").files;
    const jdText = document.getElementById("job-description").value;

    for (let i = 0; i < resumes.length; i++) {
        formData.append("pdf_file", resumes[i]);
    }

    formData.append("jd_text", jdText);

    try {
        const response = await fetch("http://127.0.0.1:8080/api/upload_files", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        console.log(result);
        alert("Upload successful!");
    } catch (error) {
        console.error("Upload error:", error);
        alert("Upload failed.");
    } finally {
        hideLoading();
    }
});

// Handle 'Show Match' button
document.getElementById("analyze_existing").addEventListener("click", async () => {
    showLoading();

    try {
        const formData = new FormData();
        formData.append("action", "show_match");

        const response = await fetch("http://127.0.0.1:8080/api/process_resume", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        console.log(result);
        displayResults(result);
    } catch (error) {
        console.error("Matching error:", error);
        alert("Failed to analyze resumes.");
    } finally {
        hideLoading();
    }
});

// Action button handler
async function sendAction(action) {
    showLoading();

    try {
        const formData = new FormData();
        formData.append("action", action);

        const response = await fetch("/api/process_resume", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        console.log(result);
        alert(`${action.replace("_", " ")} completed!`);
    } catch (error) {
        console.error("Action error:", error);
        alert("Something went wrong.");
    } finally {
        hideLoading();
    }
}

// Extract button
document.getElementById("extract_trig").addEventListener("click", async () => {
    await sendAction("extract_info");
});

// Display the matching results in the table
function displayResults(data) {
    const tableBody = document.getElementById("cv-matching-table-body");
    tableBody.innerHTML = "";

    if (!data || !Array.isArray(data) || data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3">No results available</td></tr>`;
    } else {
        data.forEach(entry => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${entry.name || "N/A"}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${entry.match || "N/A"}%</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><button onclick="alert('View ${entry.name}')">View</button></td>
            `;

            tableBody.appendChild(row);
        });
    }

    document.getElementById("table12").style.display = "block";
}
