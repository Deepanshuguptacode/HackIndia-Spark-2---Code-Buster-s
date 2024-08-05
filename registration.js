// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.querySelector('.registration-form button');

    registerButton.addEventListener('click', async (event) => {
        event.preventDefault(); // Prevent the form from submitting

        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

                // Log the connected account
                console.log('Connected account:', accounts[0]);

                // You can now proceed to register the user, e.g., sending the form data to your backend
                // Here you would normally handle form data submission

            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            alert('MetaMask is not installed. Please install it to continue.');
        }
    });
});
