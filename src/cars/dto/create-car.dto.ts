export class CreateCarDto {
  readonly kind: string;
  readonly mark: string;
  readonly model: string;
  readonly vin: string;
  readonly numberOfPassengers: number;
}
