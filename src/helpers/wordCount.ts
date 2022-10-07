export function getWordCount(str: string) {
  return str.split(" ").filter((n) => n != "").length;
}
