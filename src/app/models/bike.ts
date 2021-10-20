export interface Bike {
  id: string;
  model: string;
  type: string;
  deliveryDate: string;
  deadline: string;
  color: string;
  clientFirstName: string;
  clientSurname: string;
  cost: number;
  isFullyDamaged: boolean;
  year: number;
  parts: Object[];
  imageUrl: string;
}
