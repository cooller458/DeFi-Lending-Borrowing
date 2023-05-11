//SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 < 0.9.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

library LendingHelper{

    function isUserPresentIn(address userAddress,address[] memory users) internal pure returns (bool,uint256){
        if(users.length > 0) {
            for(uint256 i = 0 ; i < users.length ; i++) {
                if(userAddress == users[i]) {
                    return(true, uint256(i));
                }
            }
        }
        return (false, -1);
    }

    function indexOf(address user , address[] memory addressArray) internal pure returns(uint256) {
        for(uint256 i = 0; i < addressArray.length; i++) {
            if(user == addressArray[i]) {
                returns uint256(i);
            }
        }
        return -1;
    }
}