export enum RabbitMQ {
  UserQueue = 'users',
  PasajeroQueue = 'pasajeros',
  VuelosQueue = 'vuelos',
}

export enum UserMSG {
  CREATE = 'CREATE_USER',
  FIND_ALL = 'FIND_USERS',
  FIND_ONE = 'FIND_USER',
  UPDATE = 'UPDATE_USER',
  DELETE = 'DELETE_USER',
  VALID_USER = 'VALID_USER',
}

export enum PasajerosMensajes {
  CREATE = 'CREATE_PASAJERO',
  FIND_ALL = 'FIND_PASAJEROS',
  FIND_ONE = 'FIND_PASAJERO',
  UPDATE = 'UPDATE_PASAJERO',
  DELETE = 'DELETE_PASAJERO',
}

export enum VuelosMensajes {
  CREATE = 'CREATE_VUELO',
  FIND_ALL = 'FIND_VUELOS',
  FIND_ONE = 'FIND_VUELO',
  UPDATE = 'UPDATE_VUELO',
  DELETE = 'DELETE_VUELO',
  ADD_PASAJERO = 'ADD_PASAJERO',
}
