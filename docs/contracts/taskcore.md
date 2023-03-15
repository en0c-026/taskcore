# Taskcore Smart Contract
**Taskcore** is a Solidity smart contract that provides a simple interface for creating, assigning, and completing tasks. The contract allows creators to create tasks with a specified reward and assign them to an assignee. Once the assignee completes the task, the creator can pay the reward to the assignee. The contract is designed to work with ERC20 tokens.

## Functions
```s
createTask(string memory _uri, uint256 _reward, address _tokenContract) public returns (bytes32)
```
Creates a new task with the given URI and reward, and assigns it to the creator. The URI is a string that can be used to identify the task, and the reward is the amount of the ERC20 token that will be paid to the assignee upon completion of the task. The _tokenContract parameter specifies the address of the ERC20 token contract.

```s
assignTask(bytes32 _taskId, address _assignee) public
```

Assigns the task with the specified ID to the given assignee. Only the task creator can assign a task, and the assignee cannot be the creator. Once a task has been assigned, it cannot be reassigned.
```s
payReward(bytes32 _taskId) public
```
Pays the reward for the specified task to the assignee. Only the task creator can pay the reward, and the task must have been assigned and not already completed.
```s
task(bytes32 _taskId) public view returns (Task memory)
```
Returns the details of the task with the specified ID, including the URI, reward, completion status, assignee, and token contract.
```s
assignedTaskCount(address _assignee) public view returns (uint256)
```
Returns the number of tasks assigned to the specified assignee.
```s
createdTaskCount(address _creator) public view returns (uint256)
```
Returns the number of tasks created by the specified creator.
```s
taskAssignee(bytes32 _taskId) public view returns (address)
```
Returns the assignee of the task with the specified ID.
```s
taskStatus(bytes32 _taskId) public view returns (bool)
```
Returns the completion status of the task with the specified ID.
```s
taskReward(bytes32 _taskId) public view returns (uint256)
```
Returns the reward for the task with the specified ID.
```s
taskOwner(bytes32 _taskId) public view returns (address)
```
Returns the creator of the task with the specified ID.
```s
tasksByCreator(address _creator) public view returns (bytes32[] memory)
```
Returns an array of task IDs for tasks created by the specified creator.
