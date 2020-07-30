const polynomial = require("../script/polynomial.js");

//testing parsePower
test('parse nopower (power 1) to get 1', () => {
    expect(polynomial.parsePower("")).toBe(1);
  });

  test('parse power 1 (^1) to get 1', () => {
    expect(polynomial.parsePower("^1")).toBe(1);
  });
  test('parse power 2 (^2) to get 2', () => {
    expect(polynomial.parsePower("^2")).toBe(2);
  });

  test('parse power 1 to get 1', () => {
    expect(polynomial.parsePower("^5")).toBe(5);
  });

  //testing parseGroup
  test('parse group 9 to get array [0, 0]', () => {
    expect(polynomial.parseGroup("0")).toEqual(expect.arrayContaining([0, 0]));
  });
  test('parse group 1 to get array [1, 0]', () => {
    expect(polynomial.parseGroup("1")).toEqual(expect.arrayContaining([1, 0]));
  });

  test('parse group x to get array [1, 1]', () => {
    expect(polynomial.parseGroup("x")).toEqual(expect.arrayContaining([1, 1]));
  })
  test('parse group 2x^2 to get array [2, 2]', () => {
    expect(polynomial.parseGroup("2x^2")).toEqual(expect.arrayContaining([2, 2]));
  })

  //testing toMap
  test('toMap 1 to get map 0, 1', () => {
    expect(polynomial.toMap('1')).toEqual(new Map ([[0, 1]]));
  })

  test('toMap 0  to get map 0,0', () => {
    expect(polynomial.toMap('0')).toEqual(new Map ([[0, 0]]));
  })
  test('toMap 1x to get map 1,1', () => {
    expect(polynomial.toMap('1x')).toEqual(new Map ([[1, 1]]));
  })

  test('toMap 2x^2 to get map 2,2', () => {
    expect(polynomial.toMap('2x^2 ')).toEqual(new Map ([[2, 2]]));
  })

  test('toMap 2x^2 + 3x + 5 to get map 2,2 , 1,3 , 0,5', () => {
    expect(polynomial.toMap('2x^2 + 3x + 5')).toEqual(new Map ([[2, 2], [1,3], [0,5]]));
  })
  //testing addPolys

  test('add polys 2x + 1 , 1 + 2x to get sum map [0, 2], [1, 4]' , () => {
    expect(polynomial.addPolys('2x + 1', '1 + 2x')).toEqual(new Map ([[0, 2], [1, 4]]));
  })

  test('add polys 2x^2 + 1x + 3 , 3x^3 + 1 to get sum map [0, 4], [1, 1], [2, 2], [3, 3]' , () => {
    expect(polynomial.addPolys('2x^2 + 1x + 3', '3x^3 + 1')).toEqual(new Map ([[0, 4], [1, 1], [2, 2], [3, 3]]));
  })

  //testing toString

  test('toString map 1,1 to be 1x', () => {
    expect(polynomial.toString(new Map ([[1, 1]]))).toEqual('1x');
  })

  test('toString map 2,2 to be 2x^2', () => {
    expect(polynomial.toString(new Map ([[2, 2]]))).toEqual('2x^2');
  })

  test('toString map  to be 2x^2', () => {
    expect(polynomial.toString(new Map ([[1, 3], [3,2], [4, 5]]))).toEqual('5x^4 + 2x^3 + 3x');
  })