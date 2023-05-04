import {
  InfoRouteData,
  InfoUserData,
  TransportData,
  StatusData,
} from '../orders.interface';

export class CreateOrderDto {
  readonly userId: number;
  readonly infoUser: InfoUserData;
  readonly infoRoute: InfoRouteData;
  readonly infoTransports: TransportData[];
  readonly addRequirements: string;
}
