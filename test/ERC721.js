const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("ERC721", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const ERC721 = await ethers.getContractFactory("ERC721");
    const erc721 = await ERC721.deploy();

    return { erc721, owner, otherAccount };
  }

  describe("Mints", function () {
    it("Should mint a token to the owner", async function () {
      const { erc721, owner } = await loadFixture(deployFixture);

      await erc721.safeMint(owner.address, "ipfs://url");

      expect(await erc721.ownerOf(1)).to.equal(owner.address);
    });

    it("Should mint a token to another account", async function () {
      const { otherAccount } = await loadFixture(deployFixture);
      const ERC721 = await ethers.getContractFactory("ERC721");
      const erc721 = await ERC721.deploy();

      await erc721.mint(otherAccount.address, "ipfs://url");

      expect(await erc721.ownerOf(1)).to.equal(otherAccount.address);
    });
  });

  describe("SafeTransfers", function () {
    it("Should transfer a token to another account", async function () {
      const { erc721, owner, otherAccount } = await loadFixture(deployFixture);

      await erc721.safeMint(owner.address, "ipfs://url");

      await erc721.safeTransferFrom(owner.address, otherAccount.address, 1);

      expect(await erc721.balanceOf(owner.address)).to.equal(0);
      expect(await erc721.balanceOf(otherAccount.address)).to.equal(1);
    });
  });

  describe("Total tokens", function () {
    it("Should return the total tokens", async function () {
      const { erc721, owner } = await loadFixture(deployFixture);
      // uses the currentTokenId() function to get the total tokens
      await erc721.safeMint(owner.address, "ipfs://url");
      await erc721.safeMint(owner.address, "ipfs://url");
      await erc721.safeMint(owner.address, "ipfs://url");
      await erc721.safeMint(owner.address, "ipfs://url");
      await erc721.safeMint(owner.address, "ipfs://url");
      expect(await erc721.currentTokenId()).to.equal(5);
    });
  });
});
