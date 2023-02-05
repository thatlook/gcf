/*
  usage: utils to draw drawer check boxes
*/
export const ResultAreasArea = [
  'Energy generation and access',
  'Transport',
  'Buildings, cities, industries, and appliances',
  'Forest and land use',
  'Livelihoods of people and communities',
  'Health, food, and water security',
  'Infrastructure and built environment',
  'Ecosystems and ecosystem services'
];

export const CountriesRegion = [
  'Africa',
  'Asia-Pacific',
  'Eastern Europe',
  'Latin America and the Caribbean'
];

export const filterKeys = {
  Theme: ['Cross-cutting', 'Adaptation', 'Mitigation'],
  Sector: ['Public', 'Private'],
  Size: ['Small', 'Micro', 'Medium', 'Large'],
  Countries: CountriesRegion,
  ResultAreas: ResultAreasArea
};
