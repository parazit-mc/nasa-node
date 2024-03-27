export interface Meteor {
  id: number;
  name: string;
  estimated_diameter: {
    meters: {
      estimated_diameter_max: number;
    };
  };
  is_hazardous: boolean;
  close_approach_data: {
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_second: number;
    };
  }[];
}
