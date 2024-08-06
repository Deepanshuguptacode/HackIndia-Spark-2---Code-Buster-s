document.getElementById('userDashboardBtn').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access if needed
            await ethereum.request({ method: 'eth_requestAccounts' });
            // Accounts now exposed
            window.location.href = "userDashboard.html";
        } catch (error) {
            console.error("User denied account access");
            alert("User denied account access");
        }
    } else {
        console.error('MetaMask is not installed!');
        alert('MetaMask is not installed!');
    }
});
document.getElementById('adminDashboardBtn').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access if needed
            await ethereum.request({ method: 'eth_requestAccounts' });
            // Accounts now exposed
            window.location.href = "authorityDashboard.html";
        } catch (error) {
            console.error("User denied account access");
            alert("User denied account access");
        }
    } else {
        console.error('MetaMask is not installed!');
        alert('MetaMask is not installed!');
    }
});

