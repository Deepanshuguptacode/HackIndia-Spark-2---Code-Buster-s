// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Aadhaar {
    struct AadhaarDetails {
        string name;
        string dob;
        string gender;
        string addr;
        bool approved;
        bool finalized;
        address sharedWith;
    }

    address public authority;
    mapping(address => AadhaarDetails) private aadhaar;
    mapping(address => bool) private hasAadhaar;

    constructor() {
        authority = 0x486dC2b24f2dE19524511c46680cdda14646A569; // Authority address
    }

    modifier onlyAuthority() {
        require(msg.sender == authority, "Only authority can perform this action");
        _;
    }

    modifier onlyOwner(address _owner) {
        require(msg.sender == _owner, "Only owner can perform this action");
        _;
    }

    function registerAadhaar(
        string memory _name,
        string memory _dob,
        string memory _gender,
        string memory _addr
    ) public payable {
        require(!hasAadhaar[msg.sender], "Aadhaar already registered");
        

        aadhaar[msg.sender] = AadhaarDetails({
            name: _name,
            dob: _dob,
            gender: _gender,
            addr: _addr,
            approved: false,
            finalized: false,
            sharedWith: address(0)
        });

        hasAadhaar[msg.sender] = true;
    }

    function approveAadhaar(address _owner) public onlyAuthority {
        require(hasAadhaar[_owner], "Aadhaar not registered");
        AadhaarDetails storage details = aadhaar[_owner];
        details.approved = true;
    }

    function finalizeAadhaar(address _owner) public onlyAuthority {
        require(hasAadhaar[_owner], "Aadhaar not registered");
        AadhaarDetails storage details = aadhaar[_owner];
        require(details.approved, "Aadhaar not approved");
        details.finalized = true;
    }

    function getAadhaar(address _owner) public view returns (string memory, string memory, string memory, string memory, bool, bool) {
        AadhaarDetails storage details = aadhaar[_owner];
        return (details.name, details.dob, details.gender, details.addr, details.approved, details.finalized);
    }

    
    function shareAadhaar(address _recipient) public {
        require(hasAadhaar[msg.sender], "Aadhaar not registered");
        AadhaarDetails storage details = aadhaar[msg.sender];
        details.sharedWith = _recipient;
    }

    function viewSharedAadhaar(address _owner) public view returns (string memory, string memory, string memory, string memory, bool, bool) {
        require(hasAadhaar[_owner], "Aadhaar not registered");
        AadhaarDetails storage details = aadhaar[_owner];
        require(details.sharedWith == msg.sender, "You are not authorized to view this Aadhaar");
        return (details.name, details.dob, details.gender, details.addr, details.approved, details.finalized);
    }
}