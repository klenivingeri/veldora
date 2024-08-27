import { mockGetItems }  from '../../mocks'

export class Items {
  constructor(){}

  async getItems() {

    const response = mockGetItems.map(item => {
      const label = `${item.id} - ${item.name}`
      return {
        ...item,
        label
      }
    })
    return response
  }
}