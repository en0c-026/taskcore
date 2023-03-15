// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Taskcore {
    
    struct Task {
        string uri;
        uint256 reward;
        bool completed;
        address assignee;
        address token;
    }

    using EnumerableSet for EnumerableSet.Bytes32Set;

    mapping(bytes32 => Task) public tasks;
    mapping(bytes32 => address)private taskToOwner;

    mapping(address => EnumerableSet.Bytes32Set) private creatorTasks;
    mapping(address => EnumerableSet.Bytes32Set) private assigneeTasks;

    event TaskCreated(bytes32 indexed _taskId, address indexed creator, string uri, uint256 reward);
    event TaskAssigned(bytes32 indexed _taskId, address indexed assignee);
    event TaskCompleted(bytes32 indexed _taskId);

    constructor () {}

    function taskExists(bytes32 _taskId) internal view returns (bool) {
        return taskToOwner[_taskId] != address(0);
    }

    function createTask(string memory _uri, uint256 _reward, address _tokenContract) public returns (bytes32) {
        require(_reward > 0, "Task reward must be greater than zero");
        bytes32 _taskId = keccak256(abi.encodePacked(msg.sender, block.timestamp)); // generate task id
        require(!taskExists(_taskId), "Task ID already exists");
        //require(checkERC20(_tokenContract), "Not an ERC20 token");
        require(IERC20(_tokenContract).balanceOf(msg.sender) >= _reward, "Insufficient balance to create task");

        tasks[_taskId] = Task(_uri, _reward, false, address(0), _tokenContract);
        creatorTasks[msg.sender].add(_taskId);
        taskToOwner[_taskId] = msg.sender;
    
        // Approve and transfer the reward amount from the token contract to this contract
        IERC20 token = IERC20(_tokenContract);
        token.approve(address(this), _reward);
        require(token.transferFrom(msg.sender, address(this), _reward), "Token transfer failed");
    
        emit TaskCreated(_taskId, msg.sender, _uri, _reward);

        return _taskId;
    }

    function assignTask(bytes32 _taskId, address _assignee) public {
        require(taskOwner(_taskId) == msg.sender, "Only the task owner can assign a task");
        require(msg.sender != _assignee, "Assignee can't be the owner task");
        require(!tasks[_taskId].completed, "Task has already been completed");
        tasks[_taskId].assignee = _assignee;
        assigneeTasks[_assignee].add(_taskId);
        emit TaskAssigned(_taskId, _assignee);
    }

    function payReward(bytes32 _taskId) public {
        require(taskOwner(_taskId) == msg.sender, "Only the task owner can pay reward");
        require(!tasks[_taskId].completed, "Task is already completed");
        require(tasks[_taskId].assignee != address(0), "Assignee must be not zero address");
        tasks[_taskId].completed = true;
    
        // Transfer the reward amount to the assignee
        IERC20 token = IERC20(tasks[_taskId].token);
        require(token.transfer(tasks[_taskId].assignee, tasks[_taskId].reward), "Token transfer failed");
    
        emit TaskCompleted(_taskId);
    }

    function task(bytes32 _taskId) public view returns (Task memory) {
        require(taskExists(_taskId), "Task does not exist");
        return tasks[_taskId];
    }

    function assignedTaskCount(address _assignee) public view returns (uint256) {
        return assigneeTasks[_assignee].length();
    }

    function createdTaskCount(address _creator) public view returns (uint256) {
        return creatorTasks[_creator].length();
    }

    function taskAssignee(bytes32 _taskId) public view returns (address) {
        require(taskExists(_taskId), "Task does not exist");
        return tasks[_taskId].assignee;
    }
    
    function taskStatus(bytes32 _taskId) public view returns (bool) {
        require(taskExists(_taskId), "Task does not exist");
        return tasks[_taskId].completed;
    }

    function taskReward(bytes32 _taskId) public view returns (uint256) {
        require(taskExists(_taskId), "Task does not exist");
        return tasks[_taskId].reward;
    }

    function taskOwner(bytes32 _taskId) public view returns (address) {
        require(taskExists(_taskId), "Task does not exist");
        return taskToOwner[_taskId];
    }

    function tasksByCreator(address _creator) public view returns (bytes32[] memory) {
        EnumerableSet.Bytes32Set storage taskIds = creatorTasks[_creator];
        bytes32[] memory result = new bytes32[](taskIds.length());
        for (uint256 i = 0; i < taskIds.length(); i++) {
            result[i] = taskIds.at(i);
        }
        return result;
    }

    // function checkERC20(address _tokenContract) internal view returns (bool) {
    //     ERC165 erc165 = ERC165(_tokenContract);
    //     return erc165.supportsInterface(type(IERC20).interfaceId);
    // }

}