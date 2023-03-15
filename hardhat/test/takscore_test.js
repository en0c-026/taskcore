const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { parseEther, defaultAbiCoder, formatBytes32String } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

const getFunctionReturnValue = async (tx, eventName) => {
  const receipt = await tx.wait();
  const _taskId = receipt.events.filter(result => result.event === eventName)[0].args[0];
  return _taskId
}

describe("Taskcore", function () {
  let taskcore;
  let owner;
  let token; 
  
  const REWARD_AMOUNT = parseEther("10");
  const CREATOR_BALANCE = parseEther("200");
  const TASK_URI_EXAMPLE = "ipfs://bafyreihwy3rdlsl3f54syf7wdlyhvanfdu6wxilc5thgpmrohv55jeqwxq/metadata.json"

  beforeEach(async function () {
    const Taskcore = await ethers.getContractFactory("Taskcore");
    const Taskcoin = await ethers.getContractFactory("Taskcoin");
    taskcore = await Taskcore.deploy();
    token = await Taskcoin.deploy();
    //promiseAccounts = (await ethers.getSigners()).map((signer) => signer.getAddress());
    signers = await ethers.getSigners()
    owner = signers[0];
    assignee = signers[1];
    await taskcore.deployed();
    await token.deployed();
    await token.mint(owner.address, CREATOR_BALANCE)
    await token.approve(taskcore.address, ethers.constants.MaxUint256)

  });

  describe("createTask", function () {

    it("should create a task with the correct values", async function () {
      const tx = await taskcore.createTask(TASK_URI_EXAMPLE, REWARD_AMOUNT, token.address);
      // Obtener el valor devuelto por el método
      const _taskId = await getFunctionReturnValue(tx,'TaskCreated')
      const task = await taskcore.task(_taskId);
      const ownerTask = await taskcore.taskOwner(_taskId);
      expect(task.reward).to.be.equal(REWARD_AMOUNT)
      expect(task.token).to.be.equal(token.address);
      expect(ownerTask).to.be.equal(owner.address);
    });

    it("should revert if the reward is not greater than zero", async function () {
      await expect(taskcore.createTask(TASK_URI_EXAMPLE, BigNumber.from("0"), token.address)).to.be.revertedWith("Task reward must be greater than zero");
    });

    // it("should revert if the owner has an insufficient balance to create the task", async function () {
    //   const balance = await ethers.provider.getBalance(owner);
    //   const estimateGas = await token.estimateGas.transfer(accounts[1], balance, { from: owner });
    //   await token.transfer(accounts[1], balance.sub(estimateGas), { from: owner })
    //   await expect(taskcore.createTask(TASK_URI_EXAMPLE, CREATOR_BALANCE.add(parseEther("1")), token.address)).to.be.revertedWith("Insufficient balance to create task");
    // });
  });

  describe("assignTask", function () {
    let _taskId;

    beforeEach(async function () {
      // Deploy task contract and create task
      const tx = await taskcore.createTask(TASK_URI_EXAMPLE, REWARD_AMOUNT, token.address);
      _taskId = await getFunctionReturnValue(tx, "TaskCreated")
    });

    it("should revert if the caller is not the task owner", async function () {
      // Try to assign task from assignee account (not owner)
      await expect(taskcore.connect(assignee).assignTask(_taskId, assignee.address)).to.be.revertedWith("Only the task owner can assign a task");
    });

    it("should assign a task to an assignee", async function () {
      // Assign task to assignee
      await taskcore.connect(owner).assignTask(_taskId, assignee.address);

      // Check that task was assigned correctly
      const task = await taskcore.task(_taskId);
      expect(task.assignee).to.be.equal(assignee.address, "Task was not assigned to the correct address");
      expect(task.completed).to.be.equal(false, "Task was completed when it should not be");
    });

    it("should revert if the task is already completed", async function () {
      // Mark task as completed
      await taskcore.assignTask(_taskId, assignee.address);
      await taskcore.payReward(_taskId);
      // Try to assign completed task
      await expect(taskcore.assignTask(_taskId, assignee.address)).to.be.revertedWith("Task has already been completed");
    });
  });

  describe("payReward", function () {
    let _taskId;

    beforeEach(async function () {
      // Deploy task contract and create task
      const tx = await taskcore.createTask(TASK_URI_EXAMPLE, REWARD_AMOUNT, token.address);
      _taskId = await getFunctionReturnValue(tx, "TaskCreated")
    });

    it("should revert if the caller is not the task owner", async function () {

      // Try to pay the reward as the assignee
      await expect(taskcore.connect(assignee).payReward(_taskId)).to.be.revertedWith("Only the task owner can pay reward")
    });

    it("should pay the reward to the assignee and mark the task as completed", async function () {
      const payerBalanceBefore = await token.balanceOf(taskcore.address);
      const assigneeBalanceBefore = await token.balanceOf(assignee.address);

      // Assign the task to an assignee
      await taskcore.connect(owner).assignTask(_taskId, assignee.address);
      
      // Pay the reward to the assignee
      await taskcore.payReward(_taskId);

      // Check that the task is marked as completed
      const task = await taskcore.tasks(_taskId);
      expect(task.completed).to.be.equal(true, "Task should be marked as completed");

      // Check that the reward was transferred to the assignee
      const payerBalanceAfter = await token.balanceOf(taskcore.address);
      const assigneeBalanceAfter = await token.balanceOf(assignee.address);
      expect(assigneeBalanceBefore.add(REWARD_AMOUNT)).to.be.equal(assigneeBalanceAfter, "Assignee balance should increase by the reward");
      expect(payerBalanceBefore.sub(REWARD_AMOUNT).lte(payerBalanceAfter), "Creator balance should decrease by the reward");
    });

    it("should revert if the task is already completed", async function () {
      await taskcore.assignTask(_taskId, assignee.address);
      await taskcore.payReward(_taskId); 
      // Try to pay the reward again
      await expect(taskcore.payReward(_taskId)).to.be.revertedWith("Task is already completed");
    });
  });

  describe("taskCount", function () {
    it("should return the correct task count", async function () {
      // Your test code goes here
    });
  });

  describe("assignedTaskCount", function () {
    it("should return the correct assigned task count for an assignee", async function () {
      const tx_1 = await taskcore.createTask(TASK_URI_EXAMPLE, REWARD_AMOUNT, token.address);
      const taskId_1 = await getFunctionReturnValue(tx_1, "TaskCreated")

      const tx_2 = await taskcore.createTask(TASK_URI_EXAMPLE, REWARD_AMOUNT, token.address);
      const taskId_2 = await getFunctionReturnValue(tx_2, "TaskCreated")

      await taskcore.assignTask(taskId_1, assignee.address);
      await taskcore.assignTask(taskId_2, assignee.address);
      const assignedCount = await taskcore.assignedTaskCount(assignee.address);
      expect(assignedCount).to.be.equal(2, "Incorrect assigned task count for assignee");
    });
  });

  describe("createdTaskCount", function () {
    it("should return the correct created task count for a owner", async function () {
      await taskcore.createTask(TASK_URI_EXAMPLE, REWARD_AMOUNT, token.address);
      await taskcore.createTask(TASK_URI_EXAMPLE, REWARD_AMOUNT, token.address);
      const createdCount = await taskcore.createdTaskCount(owner.address);
      expect(createdCount).to.be.equal(2, "Incorrect created task count for owner");
    });
  });

  describe("taskAssignee", function () {
    it("should return the correct assignee for a task", async function () {
      const tx = await taskcore.createTask(TASK_URI_EXAMPLE, REWARD_AMOUNT, token.address);
      const _taskId = await getFunctionReturnValue(tx, "TaskCreated")

      await taskcore.assignTask(_taskId, assignee.address);
      const taskAssignee = await taskcore.taskAssignee(_taskId);
      expect(taskAssignee).to.be.equal(assignee.address, "Incorrect assignee for task");
    });
  });

  describe("taskStatus", function () {
    it("should return the correct status for a task", async function () {
      // Create a task
      const reward = ethers.utils.parseEther("1");
      const tx = await taskcore.createTask(TASK_URI_EXAMPLE, reward, token.address);
      const _taskId = await getFunctionReturnValue(tx, "TaskCreated")

      // Assign task to an assignee
      await taskcore.assignTask(_taskId, assignee.address);

      // Pay reward to the assignee
      await taskcore.payReward(_taskId);

      // Get the task status
      const completed = await taskcore.taskStatus(_taskId);

      // Check if the status is "Completed"
      expect(completed).to.be.equal(true);
    });

  });

  describe("taskReward", function () {
    it("should return the correct reward for a task", async function () {
      const tx = await taskcore.createTask(TASK_URI_EXAMPLE, REWARD_AMOUNT, token.address)
      const _taskId = await getFunctionReturnValue(tx, "TaskCreated")
      const taskReward = await taskcore.taskReward(_taskId);
      expect(taskReward).to.be.equal(REWARD_AMOUNT, "Reward not equal to expected value");
    });

    it("should revert if the task does not exist", async function () {
      const wrongId = defaultAbiCoder.encode(['bytes32'], [formatBytes32String("worng id")]);

      await expect(taskcore.taskReward(wrongId)).to.be.revertedWith("Task does not exist");
    });
  });

})