import axios from 'axios';
import { getMeteors } from '../services/meteorService';

jest.mock('axios');

jest.mock('node-cache', () => {
  return jest.fn().mockImplementation(() => ({
    set: jest.fn(),
    get: jest.fn(),
    flushAll: jest.fn(),
  }));
});

describe('getMeteors function', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return empty array if no meteors found', async () => {
    const mockMeteors = {
      near_earth_objects: {}
    };

    (axios.get as jest.Mock).mockResolvedValue({ data: mockMeteors });

    const result = await getMeteors('2024-03-18', true, 1);

    expect(result).toHaveLength(0);
  });

  it('should return filtered meteors', async () => {
    const mockMeteors = {
      near_earth_objects: {
        '2024-03-18': [
          {
            id: 1,
            name: 'Meteor 1',
            estimated_diameter: { meters: { estimated_diameter_max: 10 } },
            is_hazardous: true,
            close_approach_data: [
              { close_approach_date: '2024-03-18', relative_velocity: {} }
            ]
          },
          {
            id: 2,
            name: 'Meteor 2',
            estimated_diameter: { meters: { estimated_diameter_max: 20 } },
            is_hazardous: false,
            close_approach_data: [
              { close_approach_date: '2024-03-18', relative_velocity: {} }
            ]
          }
        ]
      }
    };

    (axios.get as jest.Mock).mockResolvedValue({ data: mockMeteors });

    const result = await getMeteors('2024-03-18', true, 1);
    expect(result).toBeDefined();
    if (result) {
      expect(result).toHaveLength(1);
      expect(result[0].id).toEqual(1);
      expect(result[0].name).toEqual('Meteor 1');
      expect(result[0].is_hazardous).toEqual(true);
    }
  });

  it('should return all meteors if no filters applied', async () => {
    const mockMeteors = {
      near_earth_objects: {
        '2024-03-18': [
          {
            id: 1,
            name: 'Meteor 1',
            estimated_diameter: { meters: { estimated_diameter_max: 10 } },
            is_hazardous: true,
            close_approach_data: [
              { close_approach_date: '2024-03-18', relative_velocity: {} }
            ]
          },
          {
            id: 2,
            name: 'Meteor 2',
            estimated_diameter: { meters: { estimated_diameter_max: 20 } },
            is_hazardous: false,
            close_approach_data: [
              { close_approach_date: '2024-03-18', relative_velocity: {} }
            ]
          }
        ]
      }
    };

    (axios.get as jest.Mock).mockResolvedValue({ data: mockMeteors });

    const result = await getMeteors(null, false, null);

    expect(result).toHaveLength(2);
  });

});
