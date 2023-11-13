import map from "../utils/map";

const INPUT = [2, 3, 4, 5];

describe("map.js", () => {
  const square = (n) => n * n;
  it("should returns empty array when given empty array", () => {
    expect(map([], square)).toStrictEqual([]);
  });
  it("should apply mapping function over the array", () => {
    expect(map(INPUT, square)).toStrictEqual([4, 9, 16, 25]);
  });
});
