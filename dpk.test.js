const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it('Returns a key for string event', () => {
    const partitionKey = deterministicPartitionKey("A String");
    const result = "85b418832d8d374b56db9d5520c46f54a3355e5871b0c2e24f0af943e124fe087b7ede5eea3053f69830a5969e63f80e4bca95828dfb0cb9f132059103193b16"
    expect(partitionKey).toEqual(result);
  })

  
  it('Returns a key for an object event', () => {
    const partitionKey = deterministicPartitionKey({"hello": "world"});
    const result = "a8034f17272123164ee10dabf4a4e2da80b1b19f585b52b9f88cce2ab87c67b067a7746c44632b27a8ad5ed9a71768551b2b9251f019ac715d5168dc06e88fa4"
    expect(partitionKey).toEqual(result);
  })

  it('Returns a string for a string partitionKey <= 256', () => {
    const key = "hello world"
    const partitionKey = deterministicPartitionKey({"partitionKey": key});
    expect(partitionKey).toEqual(key);
  })

  it('Returns a string for a object partitionKey <= 256 in serialised length', () => {
    const key ={"hello": "world"}
    const partitionKey = deterministicPartitionKey({"partitionKey": key});
    expect(partitionKey).toEqual(JSON.stringify(key))
  })

  it('Returns a hash for a partitionKey > 256 in serialised length', () => {
    const key = "a8034f17272123164ee10dabf4a4e2da80b1b19f585b52b9f88cce2ab87c67b067a7746c44632b27a8ad5ed9a71768551b2b9251f019ac715d5168dc06e88fa4AddedLength a8034f17272123164ee10dabf4a4e2da80b1b19f585b52b9f88cce2ab87c67b067a7746c44632b27a8ad5ed9a71768551b2b9251f019ac715d5168dc06e88fa4AddedLength a8034f17272123164ee10dabf4a4e2da80b1b19f585b52b9f88cce2ab87c67b067a7746c44632b27a8ad5ed9a71768551b2b9251f019ac715d5168dc06e88fa4AddedLength"
    const partitionKey = deterministicPartitionKey({"partitionKey": key});
    const expectedResult = '0fba41befb0b83915a2a182f77dbc08c1b0b54f64ef8b6b3760aa94a187a35f366713396c6258d422ecdf6c8d246c5dca9a83671f912303baa61dc4fc9b10428'
    expect(partitionKey).toEqual(expectedResult)
  })
});
