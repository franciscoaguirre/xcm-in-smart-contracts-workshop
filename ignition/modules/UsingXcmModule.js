const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

module.exports = buildModule('UsingXcmModule', (m) => {
  const storage = m.contract('UsingXcm');

  return { storage };
});
