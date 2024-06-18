const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ERC721Module", (m) => {

    const erc721 = m.contract("ERC721");

    return { erc721 };
});