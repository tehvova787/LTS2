// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title LandParcel
 * @dev Contract for managing land parcels as NFTs in the Voxel World
 */
contract LandParcel is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Struct to store land parcel details
    struct Parcel {
        uint256 x;
        uint256 y;
        uint256 z;
        uint256 sizeX;
        uint256 sizeY;
        uint256 sizeZ;
        string name;
    }
    
    // Mapping from token ID to Parcel data
    mapping(uint256 => Parcel) private _parcels;
    
    // Mapping to check if a coordinate is already part of a parcel
    mapping(bytes32 => bool) private _coordsTaken;
    
    // Events
    event ParcelMinted(uint256 indexed tokenId, address owner, string name);
    event ParcelRenamed(uint256 indexed tokenId, string newName);
    
    constructor() ERC721("Voxel World Land Parcel", "VWLP") {}
    
    /**
     * @dev Creates a new land parcel and mints it to the specified address
     */
    function mintParcel(
        address to,
        uint256 x,
        uint256 y,
        uint256 z,
        uint256 sizeX,
        uint256 sizeY,
        uint256 sizeZ,
        string memory name,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        // Check that parcel has valid dimensions
        require(sizeX > 0 && sizeY > 0 && sizeZ > 0, "Parcel must have positive dimensions");
        
        // Check that parcel coordinates are not already taken
        for (uint256 i = 0; i < sizeX; i++) {
            for (uint256 j = 0; j < sizeY; j++) {
                for (uint256 k = 0; k < sizeZ; k++) {
                    bytes32 coordsHash = keccak256(abi.encodePacked(x + i, y + j, z + k));
                    require(!_coordsTaken[coordsHash], "Coordinates already taken");
                    _coordsTaken[coordsHash] = true;
                }
            }
        }
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        // Store parcel data
        _parcels[newTokenId] = Parcel({
            x: x,
            y: y,
            z: z,
            sizeX: sizeX,
            sizeY: sizeY,
            sizeZ: sizeZ,
            name: name
        });
        
        // Mint the token
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        emit ParcelMinted(newTokenId, to, name);
        
        return newTokenId;
    }
    
    /**
     * @dev Returns the details of a parcel
     */
    function getParcel(uint256 tokenId) public view returns (Parcel memory) {
        require(_exists(tokenId), "Parcel does not exist");
        return _parcels[tokenId];
    }
    
    /**
     * @dev Allows the owner of a parcel to rename it
     */
    function renameParcel(uint256 tokenId, string memory newName) public {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "Caller is not owner nor approved");
        _parcels[tokenId].name = newName;
        emit ParcelRenamed(tokenId, newName);
    }
    
    /**
     * @dev Checks if the caller is authorized to build on a parcel
     */
    function canBuildAt(address user, uint256 x, uint256 y, uint256 z) public view returns (bool) {
        for (uint256 i = 1; i <= _tokenIds.current(); i++) {
            Parcel memory parcel = _parcels[i];
            
            // Check if the coordinates are within this parcel
            if (x >= parcel.x && x < parcel.x + parcel.sizeX &&
                y >= parcel.y && y < parcel.y + parcel.sizeY &&
                z >= parcel.z && z < parcel.z + parcel.sizeZ) {
                
                // Check if the user is the owner or approved
                return _isApprovedOrOwner(user, i);
            }
        }
        
        // If not within any parcel, return false
        return false;
    }
    
    /**
     * @dev Returns all parcels owned by an address
     */
    function getParcelsByOwner(address owner) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        
        for (uint256 i = 0; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(owner, i);
        }
        
        return tokenIds;
    }
} 