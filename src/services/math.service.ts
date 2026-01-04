export class MathService {
  addOne(number: number): number {
    return number + 1;
  }

  calculateLcm(numbers: string): number {
    if (!numbers) return 0;
    
    const numberArr = numbers.split(',').map(num => {
      const parsed = parseInt(num.trim(), 10);
      if (isNaN(parsed)) throw new Error(`'${num}' no es un número válido`);
      return parsed;
    });

    if (numberArr.length === 0) return 0;
    return numberArr.reduce((a, b) => this.lcm(a, b));
  }

  private lcm(a: number, b: number): number {
    if (a === 0 || b === 0) return 0;
    return Math.abs((a * b) / this.gcd(a, b));
  }

  private gcd(a: number, b: number): number {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
}