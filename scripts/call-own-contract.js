const hre = require("hardhat");

const PAS_UNITS = 10_000_000_000n;

const ACCOUNT_BYTES = "0xacbf9f8faa01b5393e504ff45b22bdec9526807502ec994ad5e24a48f39b6b53";

async function main() {
  const contractAddress = "0x6269bB8bC8d0Ac843783a305F86ec7613cD2A2D9";

  const contract = await hre.ethers.getContractAt("UsingXcm", contractAddress);
  const tx = await contract.teleport(1000, ACCOUNT_BYTES, 100n * PAS_UNITS);
  const receipt = await tx.wait();
  console.dir({ receipt });
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
