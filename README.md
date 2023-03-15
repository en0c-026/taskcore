# **Taskcore** DataDAO Service

**Table of contents**
- [**Taskcore** DataDAO Service](#taskcore-datadao-service)
  - [Introduction:](#introduction)
  - [How it works:](#how-it-works)
  - [Use case](#use-case)
  - [Available tasks:](#available-tasks)
  - [Task creation:](#task-creation)
  - [Task validation:](#task-validation)
  - [Rewards:](#rewards)
  - [Conclusion:](#conclusion)

## Introduction:

**Taskcore** is a decentralized service that operates on the **FVM** network and enables DataDAOs to create, assign, and reward users for performing tasks such as data collection, annotation, validation, and curation. Members of a DataDAO can propose tasks and, once approved, they appear on the **Taskcore** user interface, where users can apply to complete them and receive rewards in tokens. The project aims to facilitate task management in the DataDAO field using **Filecoin** blockchain technology to create and monetize valuable datasets.

## How it works:

**Taskcore** uses a main smart contract that manages tasks and reward payments. Members of a DataDAO propose tasks through their governance contract and, once approved, a payable function is called in **Taskcore**'s main smart contract, where the tokens necessary for the reward are stored and a new task is created. The task is automatically displayed on the **Taskcore** user interface so that users can apply to complete it and provide their wallet address to receive the reward in tokens.

## Use case
1. **Alice**, a member of the DataDAO, proposes a contribution task as a governance proposal in the DataDAO's contract.

2. **Bob**, a user of Taskcore, sees the new task on the Taskcore user interface and decides to complete it.

3. The DataDAO members discuss the proposal and suggest changes if necessary.

4. The DataDAO members vote on the proposal using their governance contract to approve or reject the proposal.

5. If the proposal is approved, a payable function in Taskcore's main contract is called, along with the necessary data including the task details and reward tokens.

6. A new task is created and the reward tokens are stored in Taskcore's task creation contract.

7. The task automatically appears in the **Taskcore** user interface for users to view and apply for.

8. **Bob** applies to complete the task and provides his wallet address to receive the token reward.

9. If the task requires approval, the responsible DataDAO member selects one or more users to complete the task.

10. If the task is complex, milestones can be set and DataDAO governance votes can be conducted to approve each milestone before moving forward with the task.

11. If DataDAO approval is required for the milestones or the complete task, governance votes are conducted to approve them.

12. Once the task is completed, **Bob** receives the token reward directly from **Taskcore**'s task creation contract in the **FVM**.

## Available tasks:

The tasks available on **Taskcore** are proposed by DataDAO members and may include activities such as data collection, annotation, validation, and curation. Each task has a token reward amount, a detailed task description, the necessary requirements to complete it, and the task type (single, multiple, approval), and whether the reward is for a single user or for the top positions in the competition.

There are various tasks of contribution and collaboration that can be carried out around data. Some of them are:

- **Data collection**: This task involves searching and collecting relevant data from different sources and formats, and then organizing and cleaning it.

- **Data annotation**: Consists of adding labels, metadata, and/or notes to existing data to improve its quality and usefulness for future analysis.

- **Data validation**: Involves verifying the accuracy and consistency of the collected and annotated data.

- **Data curation**: Involves selecting and preparing specific data for use in a particular project, for example, selecting data from a larger database that is relevant to a specific research question.

- **Data modeling**: Involves creating and maintaining data models, such as entity-relationship diagrams and database schemas.

- **Data analysis**: Involves applying statistical and data mining techniques to extract knowledge from collected data.

- **Data visualization**: Involves creating graphical visualizations of data to facilitate its understanding and analysis.

- **Data interpretation**: Involves identifying patterns, trends, and relationships in the data and generating conclusions and recommendations based on these findings.

- **Data sharing**: Involves publishing and distributing data so that others can use it for their own projects.

- **Tools and software development**: Involves creating and maintaining tools and software to facilitate data collection, analysis, and visualization.

These are just some of the many tasks that can be involved in data contribution and collaboration. The type of task required will depend on the project and the specific objective of the data collaboration.

## Task creation:

To create a task on **Taskcore**, members of a DataDAO must propose it through their governance contract. The task proposal will include information such as the DataDAO creating the task, the token reward amount, a detailed task description, the necessary requirements to complete the task, the task type, and whether the reward is for a single user or for the top positions in the competition. DataDAO members discuss the proposal and vote to approve or reject it.

Features that a task in Taskcore should have:

- **DataDAO**: identifier of the DataDAO that creates the task.
- **Title**: title of the task.
- **Description**: detailed description of the task to be performed.
- **Reward amount**:  of tokens to be rewarded for completing the task.
- **Reward type** : single or multiple (for multiple winners) for the top places.
- **Task type** : can be an individual or multiple task, specifying whether there is one or several tasks to be performed.
- **Requirements**: technical and skill requirements necessary to complete the task.
- **Deadline**: deadline for completing the task.
- **Start date**: start date on which it is allowed to start working on the task.
- **Approval** required: specifies whether the task needs approval from the DataDAO before it is completed and the reward is paid.
- **Task status**: indicates whether the task is open to receive proposals, in the process of selection, or completed.
Proposals: list of proposals submitted for the task.
- **Winners**: list of winners and their reward.
- **History**: record of task activity, such as status, proposals, winner selection, and important dates.
Other optional features:

- **Data** storage provider: the data storage provider to be used to store the necessary data to complete the task.
- **Task** language: the language in which the task must be performed, in case specific language skills are required.
- **Data** output format: the format in which the resulting task data should be delivered.
- **Necessary tools** : the necessary tools to complete the task, such as specific software tools or access to specialized hardware.
- **Participant limit**: the maximum or minimum number of participants allowed for the task.
- **Experience** requirements: the experience or skill requirements necessary to complete the task.
- **Collaboration type**: the type of collaboration required to complete the task, such as individual or team collaboration.
- **Privacy level**: the privacy level required for the task and related data, including whether public or private data is allowed.
- **Task purpose** : the purpose of the task, which can be investigative, educational, commercial, among others.
These features would allow DataDAO members to effectively create and manage tasks, as well as allow users to participate in them and receive a token reward for their work. There could also be other specific features for tasks in specific areas, such as image processing or data analysis, depending on the needs of each DataDAO.

## Task validation:
After a user completes a task, the task must be validated to ensure it has been satisfactorily completed. The validation process varies depending on the type of task and the requirements set by the DataDAO.

In the case of data annotation tasks, for example, validation may include manual review by other users to ensure the annotation has been done accurately and completely.

In other cases, the task may need to be put to a DataDAO governance vote before it is approved and the reward is paid.

In any case, the goal is to ensure that tasks are satisfactorily completed and that users receive fair rewards for their work.

## Rewards:
Once a task has been approved and validated, the user who completed the task will receive the reward offered in tokens. Rewards are stored in the **Taskcore** task creation contract and automatically transferred to the user's wallet address once the task is completed.

Users can view their completed task history and received rewards on their user profile in the **Taskcore** user interface.

## Conclusion:
**Taskcore** is a decentralized service that allows DataDAOs to create and assign tasks related to data management and reward users for completing them. The platform uses **Filecoin** blockchain technology to ensure transparency and security in the task management process.

Users can explore available tasks on the **Taskcore** user interface and apply to complete them. After completing a task, the task is validated and the user receives the reward in tokens automatically.

If you are a member of a DataDAO, you can create task proposals for the community to complete and encourage collaboration and community growth.

Join **Taskcore** today and contribute to the decentralized data management of the DataDAO community!# taskcore
