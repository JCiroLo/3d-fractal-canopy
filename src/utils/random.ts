const RandomUtils = {
  number(scalar: number) {
    return Math.ceil(Math.random() * scalar);
  },
  range(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  boolean(scalar: number, condition: boolean) {
    return condition ? this.number(scalar) : scalar;
  },
  rangeBoolean(scalar: number, condition: boolean) {
    return condition ? this.range(scalar * 0.25, scalar) : scalar;
  },
};

export default RandomUtils;
