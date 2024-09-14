import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Quantidade2 } from "../organismo/Quantidade2";
import { forEach, isEmpty } from "lodash";
import { useState } from "react";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Items = ({ item, handleTotal, itemSelecionado }) => (
  <div
    key={item.id}
    className="flex m-1 content-center bg-white items-center justify-between p-1 border-2 backdrop-blur-sm border-white border-l-black border-l-4 rounded-md shadow-lg"
  >
    <div className="pl-2 truncate">
      <strong>{item.label}</strong>
    </div>
    <div className="">
      <Quantidade2
        item={item}
        handleTotal={handleTotal}
        itemSelecionado={itemSelecionado}
      />
    </div>
  </div>
);
export const Acordion = ({
  i,
  handleChange,
  expanded,
  handleItemsSelecionados,
  itemsSelecionados = {},
  search,
  showItemsSelecionados,
}) => {
  const [count, setCount] = useState(0)
  const handleTotal = (item) => {
    const result = { ...itemsSelecionados[i.id], ...item };
    handleItemsSelecionados({ [i.id]: result });
  };

  if (showItemsSelecionados) {
    return i.items
      .filter((item) => itemsSelecionados[i.id]?.[item.id]?.quant > 0)
      .map((item) => {
        return <Items
          item={item}
          handleTotal={handleTotal}
          itemSelecionado={itemsSelecionados[i.id]?.[item.id]}
        />
      }
    );
  }

  if (isEmpty(search)) {
    return (
      <Accordion expanded={expanded === i.id} onChange={handleChange(i.id)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <div className="flex w-full justify-between">
            <Typography>
              <strong>{i.label}</strong>
            </Typography>
            <div className="relative">
              
              {itemsSelecionados[i.id]
                ? <div className="absolute flex justify-center rounded-full border-2 bg-black text-white w-[31px] h-[31px] right-[0px] pt-[1px]"><strong>
                  {Object.values(itemsSelecionados[i.id]).reduce(
                    (total, item) => total + item.quant,
                    0
                  )}</strong></div>
                : ""}
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "0px" }}>
          {i.items.map((item) => (
            <Items
              item={item}
              handleTotal={handleTotal}
              itemSelecionado={itemsSelecionados[i.id]?.[item.id]}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    );
  }

  return i.items
    .filter((item) => item.label.toLowerCase().includes(search.toLowerCase()))
    .map((item) => (
      <Items
        item={item}
        handleTotal={handleTotal}
        itemSelecionado={itemsSelecionados[i.id]?.[item.id]}
      />
    )
  );
};
