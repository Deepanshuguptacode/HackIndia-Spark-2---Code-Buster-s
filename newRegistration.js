const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = YOUR_CONTRACT_ABI;

document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value;

    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        contract.methods.registerAadhaar(name, dob, gender, address).send({ from: account })
            .then((receipt) => {
                console.log('Aadhaar registered successfully', receipt);
                alert('Aadhaar registered successfully');
            })
            .catch((error) => {
                console.error('Error registering Aadhaar', error);
                alert('Error registering Aadhaar');
            });
    } else {
        console.error('MetaMask is not installed!');
        alert('MetaMask is not installed!');
    }
});
