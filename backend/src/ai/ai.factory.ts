import { IAIProvider } from './ai.interface';
import { GeminiProvider } from './providers/gemini.provider';

export class AIFactory {
  // Singleton instance to prevent creating connection objects repeatedly
  private static instance: IAIProvider;

  static getProvider(): IAIProvider {
    if (!this.instance) {
      // Logic to switch providers based on ENV or Feature Flags could go here
      this.instance = new GeminiProvider();
    }
    return this.instance;
  }
}