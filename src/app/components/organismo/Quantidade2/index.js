import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';


export const Quantidade2 = ({handleTotal, item, itemSelecionado}) => {
  const handleAdd = () => {
    if(itemSelecionado) {
      handleTotal({[item.id]: {
        ...item,
        quant: itemSelecionado.quant + 1
      }})
    } else {
      handleTotal({[item.id]: {
        ...item,
        quant: 1
      }})
    }
  }

  const handleRemove = () => {
    if(itemSelecionado) {
      const result = itemSelecionado.quant - 1
      const r = result <= 0 ? 0 : result
      handleTotal({[item.id]: {
        ...item,
        quant: r
      }})
    }
  }

  return (
    <div className="grid grid-cols-3 ">
      <div className="flex justify-center">
        <button
          className={` flex justify-center px-4 h-10 w-[40px]  py-2 rounded text-white 
            ${!itemSelecionado?.quant ? 'bg-gray-400 cursor-not-allowed' : 'bg-slate-950 shadow-lg'}`}
          onClick={() => handleRemove()}
        >
          <RemoveIcon />
        </button>
      </div>
      <div className="flex justify-center text-4xl">{itemSelecionado?.quant ? itemSelecionado?.quant : 0}</div>
      <div className="flex justify-center">
        <button 
          className={` flex justify-center px-4 h-10 w-[40px] py-2 rounded text-white bg-slate-950 shadow-lg'}`}
          onClick={() => handleAdd()}
          variant="contained"
        >
          <AddIcon />
        </button>
      </div>
    </div>
  );
};
