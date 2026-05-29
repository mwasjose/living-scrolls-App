export function replaceNames(input?: string) {
  if (!input) return input || '';
  return String(input)
    .replace(/Jesus Christ/g, 'Yahshuah Messiah')
    .replace(/Jesus/g, 'Yahshuah')
    .replace(/Christ/g, 'Messiah')
    .replace(/christ/g, 'messiah');
}

export default replaceNames;
