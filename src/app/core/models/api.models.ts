import { VehicleStatusEnum, FuelTypeEnum } from './enums';

export interface Vehicle {
  id: string;
  licensePlate: string;
  chassis: string;
  model: string;
  brand: string;
  year: number;
  status: VehicleStatusEnum;
  fuelType: FuelTypeEnum;
  capacity: number;
  currentMileage: number;
  tenantId?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface VehicleRequest {
  licensePlate: string;
  chassis: string;
  model: string;
  brand: string;
  year: number;
  status: VehicleStatusEnum;
  fuelType: FuelTypeEnum;
  capacity: number;
}

export interface Driver {
  id: string;
  name: string;
  cpf: string;
  cnhNumber: string;
  cnhCategory: string;
  cnhExpiry: string;
  cnhStatus: string;
  phone: string;
  email: string;
  tenantId?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface DriverRequest {
  name: string;
  cpf: string;
  cnhNumber: string;
  cnhCategory: string;
  cnhExpiry: string;
  phone: string;
  email: string;
}

export interface Trip {
  id: string;
  vehicleId: string;
  driverId: string;
  vehiclePlate?: string;
  driverName?: string;
  status: string;
  origin: string;
  destination: string;
  startMileage?: number;
  endMileage?: number;
  startTime?: string;
  endTime?: string;
  tenantId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TripRequest {
  vehicleId: string;
  driverId: string;
  origin: string;
  destination: string;
}

export interface MaintenanceOrder {
  id: string;
  vehicleId: string;
  vehiclePlate?: string;
  type: string;
  status: string;
  description: string;
  cost?: number;
  mileage: number;
  nextMileage?: number;
  scheduledDate?: string;
  completedDate?: string;
  tenantId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MaintenanceOrderRequest {
  vehicleId: string;
  type: string;
  description: string;
  mileage: number;
  nextMileage?: number;
  scheduledDate?: string;
  cost?: number;
}

export interface VehicleAssignment {
  id: string;
  vehicleId: string;
  driverId: string;
  vehiclePlate?: string;
  driverName?: string;
  startDate: string;
  endDate?: string;
  status: string;
  tenantId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VehicleAssignmentRequest {
  vehicleId: string;
  driverId: string;
  startDate: string;
}

export interface Fine {
  id: string;
  vehicleId: string;
  vehiclePlate?: string;
  driverCpf: string;
  amount: number;
  description: string;
  infractionDate: string;
  status: string;
  tenantId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FineRequest {
  vehicleId: string;
  driverCpf: string;
  amount: number;
  description: string;
  infractionDate: string;
}

export interface ServiceOrder {
  id: string;
  vehicleId: string;
  vehiclePlate?: string;
  description: string;
  status: string;
  cost?: number;
  requestedBy?: string;
  approvedBy?: string;
  tenantId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceOrderRequest {
  vehicleId: string;
  description: string;
  cost?: number;
}

export interface AuditLog {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  performedBy: string;
  timestamp: string;
  tenantId?: string;
  details?: string;
}

export interface DashboardKpis {
  totalVehicles: number;
  activeVehicles: number;
  totalDrivers: number;
  validCnhDrivers: number;
  activeTrips: number;
  pendingMaintenances: number;
}

export interface GeoLocationEvent {
  vehicleId: string;
  latitude: number;
  longitude: number;
  speed: number;
  ignitionStatus: boolean;
  timestamp: string;
}
