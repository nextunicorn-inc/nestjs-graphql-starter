const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const generateRandomString = (
  length: number,
  characters: string = ALPHABET,
): string => {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    // eslint-disable-next-line no-const-assign
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export default generateRandomString;
