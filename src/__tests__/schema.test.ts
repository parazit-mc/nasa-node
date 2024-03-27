import { imageSchema, meteorSchema } from '../schemas/schema';

describe('imageSchema validator', () => {
  const userName = 'Mr. Nobody';
  const userId = 1;
  const apiKey = 'api-key';

  it('should pass validation if body is valid', () => {
    const validImageData = {
      userId: userId,
      userName: userName,
      apiKey: apiKey
    };

    const { error } = imageSchema.validate(validImageData);
    expect(error).toBeUndefined();
  });

  it('should fail validation when userId is missing', () => {
    const invalidImageData = {
      userName: userName,
      apiKey: apiKey
    };

    const { error } = imageSchema.validate(invalidImageData);
    expect(error).toBeDefined();
  });

  it('should fail validation if userName is missing', () => {
    const invalidImageData = {
      userId: userId,
      apiKey: apiKey
    };

    const { error } = imageSchema.validate(invalidImageData);
    expect(error).toBeDefined();
  });

  it('should fail validation if apiKey is missing', () => {
    const invalidImageData = {
      userId: userId,
      userName: userName
    };

    const { error } = imageSchema.validate(invalidImageData);
    expect(error).toBeDefined();
  });
});

describe('meteorSchema validation', () => {
  const queryDate = '2024-03-10';
  const isHazardous = false;

  it('should pass validation when meteor query params correct', () => {
    const validMeteorData = {
      date: queryDate,
      isHazardous: isHazardous,
      count: 5
    };

    const { error } = meteorSchema.validate(validMeteorData);
    expect(error).toBeUndefined();
  });

  it('should fail validation if date query param is invalid', () => {
    const invalidMeteorData = {
      date: 'invalid_date',
      isHazardous: isHazardous,
      count: 5
    };

    const { error } = meteorSchema.validate(invalidMeteorData);
    expect(error).toBeDefined();
  });

  it('should fail validation if count query param is invalid', () => {
    const invalidMeteorData = {
      date: queryDate,
      isHazardous: isHazardous,
      count: 'aaa'
    };

    const { error } = meteorSchema.validate(invalidMeteorData);
    expect(error).toBeDefined();
  });

  it('should fail validation if count query param is less than 1', () => {
    const invalidMeteorData = {
      date: queryDate,
      isHazardous: isHazardous,
      count: -2
    };

    const { error } = meteorSchema.validate(invalidMeteorData);
    expect(error).toBeDefined();
  });
});
