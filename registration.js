document.addEventListener('DOMContentLoaded', function() {
    const userDashboardButton = document.getElementById('user-dashboard-btn');

    userDashboardButton.addEventListener('click', async function(event) {
        event.preventDefault(); // Prevent the default action of the anchor tag
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

                // Connected successfully, redirect to user dashboard
                if (accounts.length > 0) {
                    window.location.href = 'user_dashboard.html';
                } else {
                    alert('Please connect to MetaMask.');
                }
            } catch (error) {
                console.error('User denied account access or error occurred:', error);
            }
        } else {
            alert('MetaMask is not installed. Please install MetaMask and try again.');
            // Redirect to userDashboard.html if MetaMask is not installed
        }
        window.location.href = 'user_dashboard.html';
    });
});
