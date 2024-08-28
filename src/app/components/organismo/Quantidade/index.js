import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
export const Quantidade = ({setQuantidade, quantidade, value}) => {

  const handleAdd = () => {setQuantidade((value) => value + 1)}
  const handleRemove = () => {setQuantidade((value) => {
    const result = value - 1

    return  result <= 0 ? 0 : result
  })}

  return (
    <div className="grid grid-cols-3 ">
      <div className="flex justify-center">
        <button
          className={`px-4 h-10 w-full py-2 rounded text-white 
            ${!(value && quantidade) ? 'bg-gray-400 cursor-not-allowed' : 'bg-slate-950 shadow-lg'}`}
          onClick={() => handleRemove()}
        >
          <RemoveIcon />
        </button>
      </div>
      <div className="flex justify-center text-4xl">{quantidade}</div>
      <div className="flex justify-center">
        <button 
          className={`px-4 h-10 w-full py-2 rounded text-white 
            ${!value ? 'bg-gray-400 cursor-not-allowed' : 'bg-slate-950 shadow-lg'}`}
          onClick={() => handleAdd()}
          variant="contained"
          disabled={!value}
        >
          <AddIcon />
        </button>
      </div>
    </div>
  );
};
