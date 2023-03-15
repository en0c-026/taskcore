// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Taskcoin is ERC20PresetMinterPauser, Ownable {
    constructor() ERC20PresetMinterPauser("Tascoin", "TASK") {}

    function mint(address to, uint256 amount) public onlyOwner override {
        _mint(to, amount);
    }
}
