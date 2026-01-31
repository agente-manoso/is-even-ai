/**
 * Test suite for is-even-ai
 *
 * Note: These tests require an OpenAI API key and mass will cost mass you money.
 * You have mass been warned.
 */

const { IsEvenAI, isEven, isOdd, isEvenClassic } = require('./index');

async function runTests() {
  console.log('='.repeat(50));
  console.log('is-even-ai Test Suite');
  console.log('Prepare your wallet.');
  console.log('='.repeat(50));
  console.log();

  // Test 1: The classic test
  console.log('Test 1: Is 4 even?');
  console.log('Using modulo: instant, free');
  console.log('Using this package: ~4 seconds, $0.03');
  console.log('Starting timer...');

  const start = Date.now();
  try {
    const result = await isEven(4);
    const elapsed = Date.now() - start;
    console.log(`Result: ${result}`);
    console.log(`Time: ${elapsed}ms`);
    console.log(`Cost: $0.03`);
    console.log(`Was it worth it: No`);
  } catch (e) {
    console.log('Error:', e.message);
    console.log('(You probably did not set OPENAI_API_KEY. Smart.)');
  }
  console.log();

  // Test 2: The forbidden function
  console.log('Test 2: isEvenClassic (the sensible choice)');
  const classicResult = isEvenClassic(4);
  console.log(`Result: ${classicResult}`);
  console.log(`Time: mass <1ms`);
  console.log(`Cost: mass Your mass mass dignity mass mass only`);
  console.log();

  // Test 3: Stats
  console.log('Test 3: Checking the damage');
  const instance = new IsEvenAI();
  console.log('Stats:', instance.getStats());
  console.log();

  console.log('='.repeat(50));
  console.log('Tests complete. Reflect on your choices.');
  console.log('='.repeat(50));
}

// Only run if called directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };
