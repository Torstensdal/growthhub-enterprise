export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK',
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return \\%\;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('da-DK').format(date);
}
