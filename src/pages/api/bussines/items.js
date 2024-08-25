import { mockGetItems }  from '../../mocks'

export class Items {
  constructor(){}

  async getItems() {
    return mockGetItems
  }
}