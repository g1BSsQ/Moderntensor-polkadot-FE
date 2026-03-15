/**
 * Deploy all 6 ModernTensor contracts to Polkadot Hub TestNet.
 *
 * Usage: npx hardhat run scripts/deploy-westend.js --network polkadotTestnet
 */
const hre = require("hardhat");
const { ethers } = require("ethers");
const fs = require("fs");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const balance = await hre.ethers.provider.getBalance(deployer.address);

    const tokenName = hre.network.name === 'westend' ? 'WND' : 'PAS';
    console.log("=".repeat(60));
    console.log("ModernTensor — Polkadot Hub TestNet Deployment");
    console.log("=".repeat(60));
    console.log("Deployer:", deployer.address);
    console.log("Balance:", hre.ethers.formatEther(balance), tokenName);
    console.log("Network:", hre.network.name);
    console.log("=".repeat(60));

    const deployed = {};
    let totalGas = 0n;

    // Get gas price for pallet-revive compatibility
    const feeData = await hre.ethers.provider.getFeeData();
    const gasPrice = feeData.gasPrice || 1000000000000n;
    console.log("Gas Price:", gasPrice.toString());

    // Helper: deploy using raw ethers ContractFactory to avoid Hardhat wrapper quirks
    async function deploy(name, constructorArgs = []) {
        console.log(`\n📦 Deploying ${name}...`);
        const artifact = await hre.artifacts.readArtifact(name);
        const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, deployer);
        const contract = await factory.deploy(...constructorArgs, {
            gasPrice,
            gasLimit: 30000000n,
        });
        await contract.waitForDeployment();
        const addr = await contract.getAddress();
        const tx = contract.deploymentTransaction();
        const receipt = await tx.wait();
        const gas = receipt.gasUsed;
        totalGas += gas;
        deployed[name] = addr;
        console.log(`  ✅ ${name}: ${addr}`);
        console.log(`  ⛽ Gas: ${gas.toString()}`);
        console.log(`  🔗 TX: ${tx.hash}`);
        return contract;
    }

    // ============================================
    // Phase 1: Core Token
    // ============================================
    console.log("\n--- Phase 1: Core Token ---");
    await deploy("MDTToken");

    // ============================================
    // Phase 2: Token Infrastructure
    // ============================================
    console.log("\n--- Phase 2: Token Infrastructure ---");
    await deploy("MDTVesting", [deployed["MDTToken"]]);
    await deploy("MDTStaking", [deployed["MDTToken"]]);

    // ============================================
    // Phase 3: AI Infrastructure
    // ============================================
    console.log("\n--- Phase 3: AI Infrastructure ---");
    await deploy("ZkMLVerifier");
    await deploy("AIOracle");

    // ============================================
    // Phase 4: Subnet Registry
    // ============================================
    console.log("\n--- Phase 4: Subnet Registry ---");
    await deploy("SubnetRegistry", [deployed["MDTToken"], deployed["MDTStaking"]]);

    // ============================================
    // Summary
    // ============================================
    const endBalance = await hre.ethers.provider.getBalance(deployer.address);

    console.log("\n" + "=".repeat(60));
    console.log("🎉 ALL CONTRACTS DEPLOYED SUCCESSFULLY!");
    console.log("=".repeat(60));
    console.log("\nDeployed Contracts:");
    for (const [name, addr] of Object.entries(deployed)) {
        console.log(`  ${name}: ${addr}`);
    }
    console.log("\n⛽ Total Gas Used:", totalGas.toString());
    console.log("💰 " + tokenName + " Spent:", hre.ethers.formatEther(balance - endBalance));
    console.log("💰 Remaining:", hre.ethers.formatEther(endBalance), tokenName);

    // Save deployment info
    const info = {
        network: hre.network.name,
        chainId: (await hre.ethers.provider.getNetwork()).chainId.toString(),
        deployer: deployer.address,
        timestamp: new Date().toISOString(),
        contracts: deployed,
        totalGas: totalGas.toString(),
    };
    fs.writeFileSync("deployments-polkadot.json", JSON.stringify(info, null, 2));
    console.log("\n📁 Saved to deployments-polkadot.json");
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error("\n❌ Failed:", err.message?.substring(0, 800) || err);
        process.exit(1);
    });
