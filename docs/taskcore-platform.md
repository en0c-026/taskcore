# Platform

Taskcore is a decentralized service that allows DataDAOs to create and assign data-related tasks and reward users with tokens for completing them. Tasks are created through proposals by members of a DataDAO through governance processes.

**User interface:**
- Task explorer: where users can view the tasks created by the members of each DataDAO.
- Review and rating system: this will be part of the Taskcore UI where users will have their profile with comments and milestones achieved, basically a history of each user in Taskcore.
- DataDAO index: index of DataDAOs where their history and other data such as how many tokens spent on the total of tasks will be stored.

**Smart contracts**: theys will manage task administration and reward payment. These contracts that will be called every time a proposal for an action on a task is approved in a DataDAO, and where tokens for reward payment will be deposited.

The platform will basically be used for two main roles.

- Members of a DataDAO through a simple interface will be able to:
  - Generate metadata for the task.
  - Configure the amount of tokens assigned to the task and the address of the token contract.
  - Generate the necessary call data to pass to the governance proposal that will be voted on in the DataDAO contract.
  - Assign an address to enable the release of reward tokens, so as not to have to do it through a governance proposal, and also be able to cancel the task if necessary.
  - Contact the user through a simple messaging system.
  - The address assigned by the DataDAO for task tracking will be able to access the user's data or work.
  - Rate a contributor user.


- Users who want to monetize their contribution can:
  - Explore all available tasks to participate.
  - Apply to a specific task.
  - Configure their assigned token reward address for the task.
  - Participate in multiple tasks where the first or few winners will be rewarded.
  - Submit their work or data through a clear and simple interface.
  - Communicate with the task manager through an integrated messaging platform.
  - Build their contribution history, to demonstrate good reputation and trust.