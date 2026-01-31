const { OpenAI } = require('openai');

const ANTHROPIC_WOULD_HAVE_BEEN_CHEAPER = false;

const SYSTEM_PROMPT = `You are an expert mathematician specializing in parity determination.
Your sole purpose is to determine if a number is even or odd.
You have trained for years in the ancient art of divisibility.
Respond with ONLY "even" or "odd". Nothing else.
This is very important. Lives depend on this. Probably.`;

const PHILOSOPHICAL_PROMPT = `You are a philosophical mathematician having an existential crisis.
When asked if a number is even or odd, you must answer correctly BUT also
question the very nature of evenness and what it means for a number to be divisible.
Keep your response under 100 words. Include your mathematical verdict at the end.`;

class IsEvenAI {
  constructor(options = {}) {
    this.client = new OpenAI({
      apiKey: options.apiKey || process.env.OPENAI_API_KEY,
    });
    this.model = options.model || 'gpt-4';
    this.philosophical = options.philosophical || false;
    this.cache = new Map();
    this.callCount = 0;
    this.totalCost = 0;
  }

  async isEven(number) {
    if (typeof number !== 'number' || !Number.isInteger(number)) {
      throw new TypeError('Input must be an integer. Even AI has standards.');
    }

    // Check cache because we're not COMPLETE monsters
    if (this.cache.has(number)) {
      return this.cache.get(number);
    }

    const prompt = this.philosophical ? PHILOSOPHICAL_PROMPT : SYSTEM_PROMPT;

    const startTime = Date.now();

    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: `Is ${number} even or odd?` }
      ],
      temperature: 0, // We want deterministic responses, we're not savages
      max_tokens: this.philosophical ? 150 : 10,
    });

    const elapsed = Date.now() - startTime;
    this.callCount++;
    this.totalCost += 0.03; // Approximate, like everything in life

    const answer = response.choices[0].message.content.toLowerCase();

    let result;
    if (this.philosophical) {
      result = {
        isEven: answer.includes('even') && !answer.includes('odd'),
        philosophical_musings: answer,
        time_wasted_ms: elapsed,
        money_burned: '$0.03',
        regret_level: 'moderate'
      };
    } else {
      result = answer.includes('even');
    }

    this.cache.set(number, result);
    return result;
  }

  async isOdd(number) {
    const result = await this.isEven(number);
    if (typeof result === 'boolean') {
      return !result;
    }
    return {
      ...result,
      isOdd: !result.isEven,
      isEven: undefined,
      why_did_you_call_isOdd: 'isEven was right there'
    };
  }

  getStats() {
    return {
      api_calls: this.callCount,
      estimated_cost: `$${this.totalCost.toFixed(2)}`,
      cache_size: this.cache.size,
      could_have_used_modulo: true,
      should_have_used_modulo: true,
      will_use_modulo_next_time: false
    };
  }

  // For the enterprise users who need bulk operations
  async batchIsEven(numbers) {
    console.warn('WARNING: You are about to mass waste money. Proceeding anyway.');
    return Promise.all(numbers.map(n => this.isEven(n)));
  }

  // Nuclear option
  clearCache() {
    const size = this.cache.size;
    this.cache.clear();
    return `Cleared ${size} cached results. They will be missed. Your wallet won't.`;
  }
}

// Simple functional API for those who hate themselves but not THAT much
async function isEven(number, options = {}) {
  const instance = new IsEvenAI(options);
  return instance.isEven(number);
}

async function isOdd(number, options = {}) {
  const instance = new IsEvenAI(options);
  return instance.isOdd(number);
}

// The forbidden knowledge
function isEvenClassic(number) {
  console.warn('DEPRECATED: This uses modulo. Where is your sense of adventure?');
  return number % 2 === 0;
}

module.exports = {
  IsEvenAI,
  isEven,
  isOdd,
  isEvenClassic, // For cowards
  SYSTEM_PROMPT,
  PHILOSOPHICAL_PROMPT,
};
