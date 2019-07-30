import { schema, normalize } from 'normalizr';

// Define our normalize objects : http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html

const car2GoVehicle = new schema.Entity('vehicles', {}, { idAttribute: 'vin' });
const car2goVehicleListSchema = [car2GoVehicle];
export const car2goVehicleNormalizer = result => normalize(result, car2goVehicleListSchema);

const evoVehicle = new schema.Entity('vehicles', {}, { idAttribute: 'Id' });
const evoVehicleListSchema = [evoVehicle];
export const evoVehicleNormalizer = result => normalize(result, evoVehicleListSchema);

const bus = new schema.Entity('bus', {}, { idAttribute: 'VehicleNo' });
const busListSchema = [bus];
export const busNormalizer = result => normalize(result, busListSchema);

const mobi = new schema.Entity('mobi', {}, { idAttribute: 'properties.nid' });
const mobiListSchema = [mobi];
export const mobiNormalizer = result => normalize(result, mobiListSchema);

const modoVehicle = new schema.Entity('vehicles', {}, { idAttribute: 'CarID' });
const modoVehicleListSchema = [modoVehicle];
export const modoVehicleNormalizer = result => normalize(result, modoVehicleListSchema);
