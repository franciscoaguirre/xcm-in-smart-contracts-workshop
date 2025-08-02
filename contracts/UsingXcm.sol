// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./IXcm.sol";

interface ILibrary {
    function teleport(uint32 paraId, bytes32 beneficiary, uint128 amount) external returns (bytes memory);
}

address constant INK_LIBRARY_ADDRESS = 0x057933793F86a32d646ef8183438a38f514DD99F;

contract UsingXcm {
    function teleport(uint32 paraId, bytes32 beneficiary, uint128 amount) external {
        bytes memory message = ILibrary(INK_LIBRARY_ADDRESS).teleport(paraId, beneficiary, amount);
        IXcm xcm = IXcm(XCM_PRECOMPILE_ADDRESS);
        IXcm.Weight memory weight = xcm.weighMessage(message);
        xcm.execute(message, weight);
    }

    event FundsReceived(address indexed sender, uint256 amount);

    receive() external payable {
        emit FundsReceived(msg.sender, msg.value);
    }
}
