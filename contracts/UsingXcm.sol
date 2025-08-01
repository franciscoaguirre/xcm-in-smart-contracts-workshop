// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./IXcm.sol";

contract UsingXcm {
    function teleportToMyAccount() external {
        bytes memory message = hex"050c00040100000700e40b54023001000002286bee31010100a10f0100000401000002286bee000400010204040d01020400010100acbf9f8faa01b5393e504ff45b22bdec9526807502ec994ad5e24a48f39b6b53";
        IXcm xcm = IXcm(XCM_PRECOMPILE_ADDRESS);
        IXcm.Weight memory weight = xcm.weighMessage(message);
        xcm.execute(message, weight);
    }

    event FundsReceived(address indexed sender, uint256 amount);

    receive() external payable {
        emit FundsReceived(msg.sender, msg.value);
    }
}
