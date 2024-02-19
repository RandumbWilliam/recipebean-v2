export function randomEnum<T extends object>(anEnum: T): T[keyof T] {
  const enumKeys = Object.keys(anEnum) as Array<keyof T>;
  const randomIndex = Math.floor(Math.random() * enumKeys.length);
  const randomEnumValue = anEnum[enumKeys[randomIndex]];
  return randomEnumValue;
}
