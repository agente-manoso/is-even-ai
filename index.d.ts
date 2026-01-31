declare module 'is-even-ai' {
  export interface IsEvenOptions {
    apiKey?: string;
    model?: string;
    philosophical?: boolean;
  }

  export interface PhilosophicalResult {
    isEven: boolean;
    philosophical_musings: string;
    time_wasted_ms: number;
    money_burned: string;
    regret_level: 'none' | 'moderate' | 'severe' | 'existential';
  }

  export interface Stats {
    api_calls: number;
    estimated_cost: string;
    cache_size: number;
    could_have_used_modulo: true;
    should_have_used_modulo: true;
    will_use_modulo_next_time: false;
  }

  export class IsEvenAI {
    constructor(options?: IsEvenOptions);
    isEven(number: number): Promise<boolean | PhilosophicalResult>;
    isOdd(number: number): Promise<boolean | PhilosophicalResult>;
    getStats(): Stats;
    batchIsEven(numbers: number[]): Promise<(boolean | PhilosophicalResult)[]>;
    clearCache(): string;
  }

  export function isEven(number: number, options?: IsEvenOptions): Promise<boolean>;
  export function isOdd(number: number, options?: IsEvenOptions): Promise<boolean>;

  /** @deprecated Use isEven instead. Or don't. See if I care. */
  export function isEvenClassic(number: number): boolean;

  export const SYSTEM_PROMPT: string;
  export const PHILOSOPHICAL_PROMPT: string;
}
