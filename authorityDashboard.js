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
]

document.getElementById('approveForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const userAddress = document.getElementById('userAddress').value;

    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        contract.methods.approveAadhaar(userAddress).send({ from: account })
            .then((receipt) => {
                console.log('Aadhaar approved successfully', receipt);
                alert('Aadhaar approved successfully');
            })
            .catch((error) => {
                console.error('Error approving Aadhaar', error);
                alert('Error approving Aadhaar');
            });
    } else {
        console.error('MetaMask is not installed!');
        alert('MetaMask is not installed! Please install MetaMask and try again.');
    }
});

document.getElementById('makeImmutableBtn').addEventListener('click', async () => {
    const userAddress = document.getElementById('userAddress').value;

    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        contract.methods.makeImmutable(userAddress).send({ from: account })
            .then((receipt) => {
                console.log('Aadhaar made immutable successfully', receipt);
                alert('Aadhaar made immutable successfully');
            })
            .catch((error) => {
                console.error('Error making Aadhaar immutable', error);
                alert('Error making Aadhaar immutable');
            });
    } else {
        console.error('MetaMask is not installed!');
        alert('MetaMask is not installed! Please install MetaMask and try again.');
    }
});
