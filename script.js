const mintPriceWei = 7700000000000000; // 0.0077 eth
var mintAmount = 1;

// generate merkle tree objects
const WL_ADDRESSES = ["0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db", "0x1C541e05a5A640755B3F1B2434dB4e8096b8322f", "0x1071258E2C706fFc9A32a5369d4094d11D4392Ec", "0x25f7fF7917555132eDD3294626D105eA1C797250", "0xF6574D878f99D94896Da75B6762fc935F34C1300", "0xfDbAb374ee0FC0EA0D7e7A60917ac01365010bFe", "0xfB73f8B1DcD5d61D4dDC3872dA53200B8562F243", "0x95F6E4C94857f605b9A73c9163D5c94AAf849c40", "0xEd2C82417256DF74a995213713A586E07d3e5255", "0xCb14d0D43BB32705fAbbD863f860A1410fa14613", "0x7a865e44988a2ebcad845E977db07C71f8c62d31", "0x340F5bEcB63a33B53959026d0CEb1f83C53A102F", "0x969560dBBf4872049D0d245791eD74dEd0D66578", "0x81B8888dfbdcc3Ad1dfe30A6f58a6d47eaf99aE8", "0x29aB6E246c4aC305974A730B10459417FF65D469", "0x2B790Dd5d9440f098E057E4958e3Ac0214712352", "0xA53E16be846D815dfF774A384858021952b5B22E", "0x04473648f6BeA9b074DFd7693b20AFCF9971a125", "0xc26716b827c0d207AA3D25667028C2da1De787bf", "0x21BAa9441e2DF389Ca27c9dB1cD9B59f2504dfEa", "0x93D5193694a49eB85366ea1BDa69B577f1b878ae", "0x3654322cFecCD60965A8b7866f50e55FE14EEBCC", "0x174BAFfcB004ACfc53cDD3A48957b9D353BB171f", "0x1d9A510DfCa2b1f3C52BD81122816FD86C7C7Ba0", "0x55ae457519BbAf25d825772da81F57bD18E4B6Db", "0x0997680928431EA22C1930c12Dc91f06d10be0c6", "0xF9E8383bd1250aCf18Da971467B70045d4D06fB1", "0x847aB63F94e931F9264407C54C97DbCfFEC9f8FE", "0x5dcE9Fc14eED67D046A130d1d991163114b2820c", "0x53b5585AA42b79B0b8e620896ceB0D0435441071", "0x5E661e550Fcac43DEC925449A7F0bCA0C32D6A44", "0xA46f327d91282aFD4E99d79a8fD7Eac7A123dAF5", "0xD03241a89a18c779B71f1bD348d2BbF1e20b8ea8", "0xed0850a960ABE5715ECEa4b479272092733922f0", "0x4D15f921A25e8677Da2d878B01c80Df861E67F03", "0x98d450BfbBFD64D780B632f6acd0FC59d11E575e", "0xaef0FfA370108915d4198Fe6eF40eBa446f00d79", "0x5Bc46cf525E6E26f8799685E5247a93355354cBf", "0x5B9837c339F7b55564Aeb185e8DEdeEDD10AfcB7", "0xbda8049200F7a42312AFeBDb5b99D514EE0df302", "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"]

const LEAVES = WL_ADDRESSES.map(x => keccak256(x));
const MERKLE_TREE = new MerkleTree(LEAVES, keccak256, { sortPairs: true });
const buf2Hex = x => '0x' + x.toString('hex');
console.log(buf2Hex(MERKLE_TREE.getRoot()));

var account = null;
var claimedFree = null;
var contract = null;
const ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "ApprovalCallerNotOwnerNorApproved",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ApprovalQueryForNonexistentToken",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ApproveToCaller",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "BalanceQueryForZeroAddress",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "MintToZeroAddress",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "MintZeroQuantity",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "OwnerQueryForNonexistentToken",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "TransferCallerNotOwnerNorApproved",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TransferFromIncorrectOwner",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TransferToNonERC721ReceiverImplementer",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TransferToZeroAddress",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "URIQueryForNonexistentToken",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_quantity",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "_data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_merkleRoot",
                "type": "bytes32"
            }
        ],
        "name": "setMerkleRoot",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_placeholderTokenUri",
                "type": "string"
            }
        ],
        "name": "setPlaceHolderUri",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_baseTokenUri",
                "type": "string"
            }
        ],
        "name": "setTokenUri",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "teamMint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "togglePublic",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "toggleReveal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32[]",
                "name": "_merkleProof",
                "type": "bytes32[]"
            },
            {
                "internalType": "uint256",
                "name": "_quantity",
                "type": "uint256"
            }
        ],
        "name": "whitelistMint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdraw",
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
        "name": "addressClaimed",
        "outputs": [
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
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "contractURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
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
        "inputs": [],
        "name": "getMerkleRoot",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
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
        "name": "isPublicLive",
        "outputs": [
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
        "name": "isRevealed",
        "outputs": [
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
        "name": "MAX_MINT_PER_TX",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MAX_SUPPLY",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "numFreeMinted",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
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
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
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
        "inputs": [],
        "name": "placeholderTokenUri",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "PUBLIC_FREE_SUPPLY",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "PUBLIC_SALE_PRICE",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
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
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "teamMinted",
        "outputs": [
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
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
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
const CONTRACT_ADDRESS = "0xe733A5ccbcbBE539d2D7265f20617E51f62eCcA9";
(async () => {
    if (window.ethereum) {
        // connect wallet
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            account = accounts[0]
            console.log(account);
        } catch (error) {
            alert('Could not connect wallet! Please check your metamask settings and refresh the page.');
        }

        window.web3 = new Web3(window.ethereum);

        // generate proof
        contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
        let leaf = keccak256(account);
        const PROOF = MERKLE_TREE.getProof(leaf).map(x => buf2Hex(x.data));
        console.log(PROOF);

        // whitelisted not whitelisted
        isPublicLive = await contract.methods.isPublicLive().call();
        if (isPublicLive) {
            document.getElementById('wallet-address').innerHTML = "wallet connected";
        } else {
            if (WL_ADDRESSES.includes("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4")) {
                document.getElementById('wallet-address').innerHTML = "you are whitelisted!";
            } else {
                document.getElementById('wallet-address').innerHTML = "you are not whitelisted";
            }
        }

        // check if claimed free
        claimedFree = await contract.methods.addressClaimed(account).call();

        // mint!
        document.getElementById('mint').onclick = () => {
            // recheck wl phase and if free left !!! what if tx fails because not enough $
            (async () => {
                let valueToSend;
                isPublicLive = await contract.methods.isPublicLive().call();
                if (isPublicLive) {
                    if (!claimedFree && (await contract.methods.numFreeMinted().call()) <= 1000) {
                        valueToSend = ((mintAmount - 1) * mintPriceWei).toString();
                    } else {
                        valueToSend = (mintAmount * mintPriceWei).toString();
                    }
                    contract.methods.mint(mintAmount).send({ from: account, value: valueToSend });
                }
                else {
                    valueToSend = ((mintAmount - 1) * mintPriceWei).toString();
                    contract.methods.whitelistMint(PROOF, mintAmount).send({ from: account, value: valueToSend });
                }
            })();

        };
    }
})();

// html spaghetti code
document.getElementById('plus').onclick = () => {
    if (mintAmount < 5) {
        mintAmount++;
        document.getElementById('amount').src = `images/${mintAmount}.png`;
    }
};
document.getElementById('minus').onclick = () => {
    if (mintAmount > 1) {
        mintAmount--;
        document.getElementById('amount').src = `images/${mintAmount}.png`;
    }
};
$(document).ready(function () {
    var pause = false;
    var interval = window.setInterval(function () {
        if (!pause) {
            $('.borb').css('background-image', "url('images/background3.jpg')");
            window.setTimeout(function () {
                $('.borb').css('background-image', "url('images/background.jpg')");
            }, 200);
            window.setTimeout(function () {
                $('.borb').css('background-image', "url('images/background3.jpg')");
            }, 500);
            window.setTimeout(function () {
                $('.borb').css('background-image', "url('images/background.jpg')");
            }, 700);
        }
    }, 9000);

    $("#mint").hover(function () {
        pause = true;
        $('.borb').css('background-image', "url('images/background2.jpg')");
    }, function () {
        pause = false;
        $('.borb').css('background-image', "url('images/background.jpg')");
    });
})

document.getElementById('enter').onclick = () => {
    var music = document.getElementById('music');
    music.volume = 0.1;
    music.play();
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'block';
};