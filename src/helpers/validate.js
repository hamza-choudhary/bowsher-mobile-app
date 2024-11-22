export function validateConverterPaste(text) {
  const numericText = text.replace(/[^0-9.-]/g, '');

  const isNegative = numericText.startsWith('-');
  const absNumericText = numericText.replace(/-/g, '');

  const parts = absNumericText.split('.');
  const sanitizedText =
    parts.length > 2
      ? `${parts[0]}.${parts.slice(1).join('')}`
      : absNumericText;

  if (sanitizedText === '' || isNaN(Number(sanitizedText))) {
    return '0';
  }

  const finalValue = isNegative ? `-${sanitizedText}` : sanitizedText;
  return finalValue;
}
