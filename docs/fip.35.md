The FIP-35 proposal is about extending the built-in storage market actor in the Filecoin Virtual Machine (FVM) to allow clients to propose storage deals without the need for a signed message, which is currently a requirement for externally-owned accounts. This limitation will become more significant as user-programmable actors are enabled. The proposal adds new methods to the storage market actor for a client to propose a deal on-chain, and then a provider to confirm that deal. This will enable more actors to interact with the storage markets, such as multisig, DAOs, decentralised replication/repair services, auction or bounty contracts, and more complex brokering actors. Here are some terms related to this proposal:

Storage market actor: a built-in actor in the FVM that manages the storage market by matching clients with providers and deals.
Deal proposal: an offer made by a client to a provider to store data in exchange for payment.
External-owned account: an account that can create signatures for transactions and messages.
Automation: the process of making a system work automatically, without human intervention.
Trust-minimised systems: systems that require minimal trust between parties, often achieved through the use of smart contracts and cryptographic mechanisms.
DAOs: Decentralized Autonomous Organizations, entities that are governed by smart contracts and are decentralized in nature.
Replication/repair services: actors that provide storage replication and data repair services to clients.
Brokering actors: actors that act as intermediaries between clients and providers, facilitating deals and taking a commission.
Deal: A deal refers to an agreement between a client and a provider in which the client pays the provider for storage services.
Proposal: A proposal is a request from a client to a provider to make a storage deal. It includes details such as the amount of storage, duration, and payment amount.
Actor: An actor is a smart contract on the Filecoin Virtual Machine (FVM) that can send and receive messages and modify state on the blockchain.
Multisig: A multisig is a type of smart contract that requires multiple signatures in order to perform certain actions. It is commonly used for managing funds in a decentralized manner.
DAO: A DAO, or decentralized autonomous organization, is a type of organization that is run by rules encoded as computer programs on a blockchain.
Escrow: An escrow is a type of financial arrangement in which a third party holds funds until a certain condition is met. In the context of the storage market, escrow is used to hold the client's payment and collateral until the deal is complete.
Data cap: A data cap is a limit on the amount of data that a client can store with a provider. It is used to ensure that the provider does not exceed its capacity and to prevent clients from overusing the network.

