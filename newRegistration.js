const contractAddress = "0x9D437a1Da98559542f1F3b457B94560c0446254A";
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
	},
	{
		"inputs": [],
		"name": "registrationFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

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
        const registrationFee = web3.utils.toWei('0.001', 'ether');  // The fee amount in ether

        contract.methods.registerAadhaar(name, dob, gender, address).send({ from: account, value: registrationFee })
            .then((receipt) => {
                console.log('Aadhaar registered successfully', receipt);
                alert('Aadhaar registered successfully');
            })
            .catch((error) => {
                console.error('Error registering Aadhaar', error);
                alert('Error registering Aadhaar. Please try again.');
            });
    } else {
        console.error('MetaMask is not installed!');
        alert('MetaMask is not installed! Please install MetaMask and try again.');
    }
});
