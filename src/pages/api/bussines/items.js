const mockGetItems = [
  {
    id: "001",
    name: "Pastel de carne",
    price: 20,
  },
  {
    id: "002",
    name: "Pastel de queijo",
    price: 1.5,
  },
  {
    id: "003",
    name: "Pastel de pizza",
    price: 11,
  },
  {
    id: "004",
    name: "Pastel de carne com queijo",
    price: 4.6,
  },
  {
    id: "005",
    name: "Pastel de Palmito",
    price: 9.7,
  },
  {
    id: "006",
    name: "Esfirra assada",
    price: 95,
  },
  {
    id: "007",
    name: "Pão pizza assado",
    price: 199,
  },
  {
    id: "008",
    name: "Hamburgues de cheddar",
    price: 1,
  },
  {
    id: "009",
    name: "Hamburger de catupity",
    price: 18,
  },
  {
    id: "010",
    name: "Hamburgues especial",
    price: 6.8,
  },
  {
    id: "011",
    name: "Coxinha",
    price: 98,
  },
  {
    id: "012",
    name: "Coxinha Cremosa",
    price: 14,
  },
  {
    id: "013",
    name: "Espeto de frango",
    price: 12,
  },
  {
    id: "014",
    name: "Kibe de carne",
    price: 11,
  },
  {
    id: "015",
    name: "Kibe de queijo",
    price: 19.6,
  },
  {
    id: "016",
    name: "Kibe de catupiry",
    price: 199,
  },
  {
    id: "017",
    name: "Torta",
    price: 20.11,
  },
  {
    id: "018",
    name: "Torta de Frango",
    price: 19.36,
  },
  {
    id: "019",
    name: "Coca cola 1lt",
    price: 19.36,
  },
  {
    id: "020",
    name: "Coca cola 2lt",
    price: 19.36,
  },
  {
    id: "021",
    name: "Fanta 1.5lt",
    price: 1.36,
  },
  {
    id: "022",
    name: "Suco de laranja 300ml",
    price: 19.3,
  },
  {
    id: "023",
    name: "Suco laranja jarra 1lt",
    price: 19.6,
  },
  {
    id: "024",
    name: "Vitamina de morango",
    price: 1.36,
  },
  {
    id: "025",
    name: "Vitamina de abacaxi",
    price: 1.3,
  },
  {
    id: "026",
    name: "Vitamina Goiaba",
    price: 9.6,
  },
  {
    id: "027",
    name: "Vitamina Mamão",
    price: 8.6,
  },
];
const itemsmock  = [
      {
        id: "001",
        name: "Pastel de carne",
        price: 20,
        type: "fritos",
        typeLabel: "Fritos"
      },
      {
        id: "002",
        name: "Pastel de queijo",
        price: 1.5,
        type: "fritos",
        typeLabel: "Fritos"
      },
      {
        id: "003",
        name: "Pastel de pizza",
        price: 11,
        type: "fritos",
        typeLabel: "Fritos"
      },
      {
        id: "004",
        name: "Pastel de carne com queijo de carne com queijo",
        price: 4.6,
        type: "fritos",
        typeLabel: "Fritos"
      },
      {
        id: "005",
        name: "Pastel de Palmito",
        price: 9.7,
        type: "fritos",
        typeLabel: "Fritos"
      },
      {
        id: "011",
        name: "Coxinha",
        price: 98,
        type: "crus",
        typeLabel: "Crus"
      },
      {
        id: "012",
        name: "Coxinha Cremosa",
        price: 14,
        type: "crus",
        typeLabel: "Crus"
      },
      {
        id: "013",
        name: "Espeto de frango",
        price: 12,
        type: "crus",
        typeLabel: "Crus"
      },
      {
        id: "014",
        name: "Kibe de carne",
        price: 11,
        type: "crus",
        typeLabel: "Crus"
      },
      {
        id: "015",
        name: "Kibe de queijo",
        price: 19.6,
        type: "crus",
        typeLabel: "Crus"
      },
      {
        id: "016",
        name: "Kibe de catupiry",
        price: 199,
        type: "crus",
        typeLabel: "Crus"
      },
      {
        id: "006",
        name: "Esfirra assada",
        price: 95,
        type: "assados",
        typeLabel: "Assados"
      },
      {
        id: "007",
        name: "Pão pizza assado",
        price: 199,
        type: "assados",
        typeLabel: "Assados"
      },
      {
        id: "008",
        name: "Hamburgues de cheddar",
        price: 1,
        type: "assados",
        typeLabel: "Assados"
      },
      {
        id: "009",
        name: "Hamburger de catupity",
        price: 18,
        type: "assados",
        typeLabel: "Assados"
      },
      {
        id: "010",
        name: "Hamburgues especial",
        price: 6.8,
        type: "assados",
        typeLabel: "Assados"
      },
      {
        id: "017",
        name: "Torta",
        price: 20.11,
        type: "assados",
        typeLabel: "Assados"
      },
      {
        id: "018",
        name: "Torta de Frango",
        price: 19.36,
        type: "assados",
        typeLabel: "Assados"
      },
      {
        id: "019",
        name: "Coca cola 1lt",
        price: 19.36,
        type: "refrigerantes",
        typeLabel: "Refrigerantes"
      },
      {
        id: "020",
        name: "Coca cola 2lt",
        price: 19.36,
        type: "refrigerantes",
        typeLabel: "Refrigerantes"
      },
      {
        id: "021",
        name: "Fanta 1.5lt",
        price: 1.36,
        type: "refrigerantes",
        typeLabel: "Refrigerantes"
      },
      {
        id: "0254",
        name: "Coca cola 350ml",
        price: 19.36,
        type: "refrigerantes",
        typeLabel: "Refrigerantes"
      },
      {
        id: "0215",
        name: "Fanta 350ml",
        price: 1.36,
        type: "refrigerantes",
        typeLabel: "Refrigerantes"
      },
      {
        id: "022",
        name: "Suco de laranja 300ml",
        price: 19.3,
        type: "sucos",
        typeLabel: "Sucos"
      },
      {
        id: "023",
        name: "Suco laranja jarra 1lt",
        price: 19.6,
        type: "sucos",
        typeLabel: "Sucos"
      },
      {
        id: "0242",
        name: "Suco de maracuja 300ml",
        price: 19.3,
        type: "sucos",
        typeLabel: "Sucos"
      },
      {
        id: "0263",
        name: "Suco maracuja jarra 1lt",
        price: 19.6,
        type: "sucos",
        typeLabel: "Sucos"
      },
      {
        id: "0282",
        name: "Suco de limão 300ml",
        price: 19.3,
        type: "sucos",
        typeLabel: "Sucos"
      },
      {
        id: "0239",
        name: "Suco limão jarra 1lt",
        price: 19.6,
        type: "sucos",
        typeLabel: "Sucos"
      },
      {
        id: "0202",
        name: "Suco de melancia 300ml",
        price: 19.3,
        type: "sucos",
        typeLabel: "Sucos"
      },
      {
        id: "0923",
        name: "Suco melancia jarra 1lt",
        price: 19.6,
        type: "sucos",
        typeLabel: "Sucos"
      },
      {
        id: "024",
        name: "Vitamina de Morango",
        price: 1.36,
        type: "vitaminas",
        typeLabel: "Vitaminas",
      },
      {
        id: "025",
        name: "Vitamina de abacaxi",
        price: 1.3,
        type: "vitaminas",
        typeLabel: "Vitaminas",
      },
      {
        id: "026",
        name: "Vitamina Goiaba",
        price: 9.6,
        type: "vitaminas",
        typeLabel: "Vitaminas",
      },
      {
        id: "027",
        name: "Vitamina Mamão",
        price: 8.6,
        type: "vitaminas",
        typeLabel: "Vitaminas",
      },
      {
        id: "124",
        name: "Vitamina de Limão",
        price: 1.36,
        type: "vitaminas",
        typeLabel: "Vitaminas",
      },
      {
        id: "125",
        name: "Vitamina de Uva",
        price: 1.3,
        type: "vitaminas",
        typeLabel: "Vitaminas",
      },
      {
        id: "126",
        name: "Vitamina Maracuja",
        price: 9.6,
        type: "vitaminas",
        typeLabel: "Vitaminas",
      },
      {
        id: "127",
        name: "Vitamina Cenora",
        price: 8.6,
        type: "vitaminas",
        typeLabel: "Vitaminas",
      },
    ]


export default class Items {
  constructor() {}

  async getItems() {
    const groupedItems = itemsmock.reduce((acc, item) => {
      // Verifica se o tipo já foi adicionado ao acumulador
      
      let category = acc.find(group => group.id === item.type);
      
      if (!category) {
        // Se não houver uma categoria, cria uma nova
        category = { id: item.type, label: item.typeLabel, items: [] };
        acc.push(category);
      }
    
      // Adiciona o item à categoria correspondente
      category.items.push({
        id: item.id,
        name: item.name,
        price: item.price,
        type: item.type,
        typeLabel: item.typeLabel,
        label: `${item.id} - ${item.name}`,
        quant: 0,
      });
    
      return acc;
    }, []);
    
    return groupedItems
  }
}
