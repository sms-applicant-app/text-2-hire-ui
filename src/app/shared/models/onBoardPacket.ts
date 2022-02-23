export class OnBoardPacket {
  positionId?: string;
  name: string;
  w4: string;
  i9: string;
  stateW4: string;
  storeId: string;
  customForms?: string;
}
export class CustomForms {
  formUrl: string;
  name: string;

  constructor(name: string, url: string) {
    this.formUrl = url;
    this.name = name;
  }
}
