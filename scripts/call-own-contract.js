const hre = require("hardhat");

async function main() {
  const contractAddress = "0x74f9529Ca9fbFC6295260Ba981202CA34A02C971";

  const contract = await hre.ethers.getContractAt("UsingXcm", contractAddress);
  const tx = await contract.teleportToMyAccount();
  const receipt = await tx.wait();
  console.dir({ receipt });
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
