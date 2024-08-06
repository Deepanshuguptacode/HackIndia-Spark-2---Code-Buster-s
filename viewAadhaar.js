const contractAddress = "0xf54871a02639f0954De08181A91160E1232324e2";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
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
				"name": "user",
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
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userAddress",
				"type": "string"
			}
		],
		"name": "registerAadhaar",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newAuthority",
				"type": "address"
			}
		],
		"name": "updateAuthority",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "aadharDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userAddress",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "finalized",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
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
				"name": "user",
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
            // const account = await signer.getAddress();
			const account="0xd67004B25E547154751d6941b06f9b382349c656"
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