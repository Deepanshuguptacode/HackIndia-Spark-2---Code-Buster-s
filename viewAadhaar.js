
const contractAddress = "0x8e3B5D06b564Fac3BB4C4886c312729ba3b599A4";
const contractABI =[
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
document.getElementById('viewAadhaarBtn').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        // Create an Ethers.js provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // Create a new instance of the contract
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
		console.log(contract);

        try {
            // Request account access if needed
            await provider.send("eth_requestAccounts", []);

            // Get the current user's address
            const signer = provider.getSigner();
            const account = await signer.getAddress();
			console.log(account);

            // Fetch Aadhaar details
            const aadhaarDetails = await contract.getAadhaar(account);
			console.log(aadhaarDetails);

            // Display the details
            document.getElementById('aadhaarName').textContent = aadhaarDetails[0];
            document.getElementById('aadhaarDOB').textContent = aadhaarDetails[1];
            document.getElementById('aadhaarGender').textContent = aadhaarDetails[2];
            document.getElementById('aadhaarAddress').textContent = aadhaarDetails[3];
            document.getElementById('aadhaarApproved').textContent = aadhaarDetails[4] ? "Yes" : "No";
            document.getElementById('aadhaarFinalized').textContent = aadhaarDetails[5] ? "Yes" : "No";

            document.getElementById('aadhaarDetails').style.display = 'block';
        } catch (error) {
            console.error('Error fetching Aadhaar details:', error);
            alert('Error fetching Aadhaar details. Check console for more information.');
        }
    } else {
        console.error('MetaMask is not installed!');
        alert('MetaMask is not installed! Please install MetaMask and try again.');
    }
});