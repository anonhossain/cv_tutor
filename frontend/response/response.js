// Function to go back to the previous page
function goBack() {
    window.location.href = '/hr_body.html';
}

// Get the percentage element
const percentageElement = document.getElementById('percentage');
let percentage = parseInt(percentageElement.innerText);

// Change the color of the percentage text
if (percentage > 80) {
    percentageElement.classList.add('green');
} else {
    percentageElement.classList.add('red');
}

// Create the donut chart dynamically
const ctx = document.getElementById('donutChart').getContext('2d');
const donutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Matched', 'Remaining'],
        datasets: [{
            data: [percentage, 100 - percentage],  // Dynamic data
            backgroundColor: [percentage > 80 ? '#4CAF50' : '#FF5733', '#f1f1f1'], // Green for match, red for below 80%
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        cutoutPercentage: 80,  // Makes it a donut chart
        plugins: {
            tooltip: {
                enabled: false  // Disable tooltips to keep the chart clean
            },
            legend: {
                display: false // Hide the legend
            }
        }
    }
});
