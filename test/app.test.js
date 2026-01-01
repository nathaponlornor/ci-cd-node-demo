// test/app.test.js
console.log("Running CI tests...");

// TEST 1: Basic logic test
if (2 + 2 !== 4) {
  console.error("Math test failed ❌");
  process.exit(1);
}

// TEST 2: Environment sanity
if (!process.version) {
  console.error("Node environment missing ❌");
  process.exit(1);
}

console.log("All CI tests passed ✅");
process.exit(0);

