export class GetListOfPropertiesResponseDto {

  meta;
  properties;

  constructor(data) {
    Object.assign(this, data);

    this.properties = (this.properties || []).map(x => new PropertyDto(x));
  }

}

export class PropertyDto {

  traditionalFee;
  potentialSavings;

  constructor(data) {
    Object.assign(this, data);

    this.traditionalFee = `$ ${(data.price * 0.06).toFixed(2)}`;
    this.potentialSavings = `$ ${(data.price * 0.06 - 3500).toFixed(2)}`;
  }
}