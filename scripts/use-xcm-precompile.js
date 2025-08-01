const hre = require("hardhat");

async function main() {
  const precompileAddress = "0x00000000000000000000000000000000000A0000";

  const xcm = await hre.ethers.getContractAt("IXcm", precompileAddress);

  const message = "0x050c00040100000700e40b54023001000002286bee31010100a10f0100000401000002286bee000400010204040d01020400010100acbf9f8faa01b5393e504ff45b22bdec9526807502ec994ad5e24a48f39b6b53";
  const weight = await xcm.weighMessage(message);
  console.dir({ weight });

  const tx = await xcm.execute(message, [weight[0], weight[1]]);
  const receipt = await tx.wait();
  console.dir({ receipt });
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
