/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

async function diagnoseNetlifyDeployment() {
  console.log("🔍 Starting Netlify deployment diagnosis...\n");

  const checks = [
    checkNextConfig,
    checkNetlifyConfig,
    checkDependencies,
    checkBuildOutput,
    checkNodeVersion,
  ];

  for (const check of checks) {
    try {
      await check();
      console.log("-------------------\n");
    } catch (error) {
      console.error(`❌ Error during ${check.name}:`, error);
    }
  }
}

function checkNextConfig() {
  console.log("📁 Checking Next.js configuration...");

  const nextConfigPath = path.join(process.cwd(), "next.config.js");
  if (!fs.existsSync(nextConfigPath)) {
    console.log("⚠️  next.config.js not found!");
    return;
  }

  const config = require(nextConfigPath);
  console.log("✅ next.config.js found");
  console.log("Configuration:", JSON.stringify(config, null, 2));
}

function checkNetlifyConfig() {
  console.log("📁 Checking Netlify configuration...");

  const netlifyConfigPath = path.join(process.cwd(), "netlify.toml");
  if (!fs.existsSync(netlifyConfigPath)) {
    console.log("⚠️  netlify.toml not found!");
    return;
  }

  const config = fs.readFileSync(netlifyConfigPath, "utf8");
  console.log("✅ netlify.toml found");
  console.log("Configuration:\n", config);
}

function checkDependencies() {
  console.log("📦 Checking dependencies...");

  const packagePath = path.join(process.cwd(), "package.json");
  const packageLockPath = path.join(process.cwd(), "yarn.lock");

  if (!fs.existsSync(packagePath)) {
    console.log("⚠️  package.json not found!");
    return;
  }

  const package = require(packagePath);
  console.log("Dependencies:", JSON.stringify(package.dependencies, null, 2));
  console.log(
    "DevDependencies:",
    JSON.stringify(package.devDependencies, null, 2)
  );

  // Check for common missing dependencies
  const criticalDeps = ["next", "react", "react-dom", "pino-pretty"];
  criticalDeps.forEach((dep) => {
    if (!package.dependencies[dep] && !package.devDependencies[dep]) {
      console.log(`⚠️  Missing critical dependency: ${dep}`);
    }
  });
}

function checkBuildOutput() {
  console.log("🏗️  Checking build output...");

  const nextBuildPath = path.join(process.cwd(), ".next");
  if (!fs.existsSync(nextBuildPath)) {
    console.log("⚠️  .next directory not found! Try running build first.");
    return;
  }

  console.log("✅ .next directory found");
  console.log("Build files:", fs.readdirSync(nextBuildPath));
}

function checkNodeVersion() {
  console.log("🔧 Checking Node.js version...");

  const nvmrcPath = path.join(process.cwd(), ".nvmrc");
  const currentVersion = process.version;

  console.log("Current Node version:", currentVersion);

  if (fs.existsSync(nvmrcPath)) {
    const nvmrcVersion = fs.readFileSync(nvmrcPath, "utf8").trim();
    console.log(".nvmrc version:", nvmrcVersion);
  } else {
    console.log("⚠️  No .nvmrc file found");
  }
}

diagnoseNetlifyDeployment();
