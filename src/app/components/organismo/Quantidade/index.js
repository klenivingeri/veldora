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
        <Button
          sx={{ width: "100%"}}
          onClick={() => handleRemove()}
          variant="contained"
          disabled={!(value && quantidade) }
        >
          <RemoveIcon />
        </Button>
      </div>
      <div className="flex justify-center text-6xl">{quantidade}</div>
      <div className="flex justify-center">
        <Button 
          sx={{ 
            width: "100%" }}
          onClick={() => handleAdd()}
          variant="contained"
          disabled={!value}
        >
          <AddIcon />
        </Button>
      </div>
    </div>
  );
};
