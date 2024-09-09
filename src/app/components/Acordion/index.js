import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Quantidade2 } from "../organismo/Quantidade2";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


export const Acordion = ({
  i,
  handleChange,
  expanded,
  handleItemsSelecionados,
  itemsSelecionados = {}
}) => {

  const handleTotal = (item) => {
    const result = {...itemsSelecionados[i.id], ...item}
    handleItemsSelecionados({[i.id]: result})
  }

  return (
    <Accordion expanded={expanded === i.id} onChange={handleChange(i.id)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <div className="flex w-full justify-between">
          <Typography>{i.label}</Typography>
          <div>{itemsSelecionados[i.id] ? Object.values(itemsSelecionados[i.id]).reduce((total, item) => total + item.quant, 0) : 0}</div>
        </div>
        </AccordionSummary>
        <AccordionDetails sx={{padding:'2px'}}>
          <div className="flex flex-col gap-1">
          {i.items.map(item => (
            <div key={item.id} className="flex content-center  items-center justify-between p-2 border-2 backdrop-blur-sm border-white border-l-black border-l-4 rounded-md shadow-lg">
              <div className="">{item.name}</div>
              <div className="">
                <Quantidade2 
                  item={item}
                  handleTotal={handleTotal}
                  itemSelecionado={itemsSelecionados[i.id]?.[item.id]}
                />
              </div>
            </div>
          ))}
          </div>
        </AccordionDetails>
      </Accordion>
  )
}