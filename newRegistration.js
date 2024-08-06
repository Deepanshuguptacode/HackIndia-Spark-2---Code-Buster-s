const contractAddress = "0x8e3B5D06b564Fac3BB4C4886c312729ba3b599A4";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "approveAadhaar",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "finalizeAadhaar",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_addr",
				"type": "string"
			}
		],
		"name": "registerAadhaar",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			}
		],
		"name": "shareAadhaar",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "authority",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getAadhaar",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "viewSharedAadhaar",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect form data
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value;

    if (typeof window.ethereum !== 'undefined') {
        // Create an Ethers.js provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const signer = provider.getSigner();

        // Set the registration fee
        const registrationFee = ethers.utils.parseEther('0.001'); // Convert Ether to Wei

        try {
            // Request account access
            await provider.send("eth_requestAccounts", []);
            const account = await signer.getAddress();

            // Interact with the smart contract
            const tx = await contract.connect(signer).registerAadhaar(name, dob, gender, address, { value: registrationFee });

            // Wait for the transaction to be mined
            await tx.wait();

            console.log('Aadhaar registered successfully', tx);
            alert('Aadhaar registered successfully');
        } catch (error) {
            console.error('Error registering Aadhaar', error);
            alert('Error registering Aadhaar. Please try again.');
        }
    } else {
        console.error('MetaMask is not installed!');
        alert('MetaMask is not installed! Please install MetaMask and try again.');
    }
});

document.getElementById('updateForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect form data
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value;

    if (typeof window.ethereum !== 'undefined') {
        // Create an Ethers.js provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const signer = provider.getSigner();

        // Set the registration fee
        const registrationFee = ethers.utils.parseEther('0.001'); // Convert Ether to Wei

        try {
            // Request account access
            await provider.send("eth_requestAccounts", []);
            const account = await signer.getAddress();

            // Interact with the smart contract
            const tx = await contract.connect(signer).registerAadhaar(name, dob, gender, address, { value: registrationFee });

            // Wait for the transaction to be mined
            await tx.wait();

            console.log('Aadhaar registered successfully', tx);
            alert('Aadhaar registered successfully');
        } catch (error) {
            console.error('Error registering Aadhaar', error);
            alert('Error registering Aadhaar. Please try again.');
        }
    } else {
        console.error('MetaMask is not installed!');
        alert('MetaMask is not installed! Please install MetaMask and try again.');
    }
});