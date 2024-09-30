import PersonIcon from "@mui/icons-material/Person";
import AppsIcon from "@mui/icons-material/Apps";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import Link from "next/link";
import { useState } from "react";

const ButtonDiv = ({ title, icon, url, active }) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    setIsTouched(false);
  };

  return (
    <div className={`flex justify-center  ${active ? "bg-slate-100 w-[40%]" : "bg-black w-[30%]" }`}>
      {active && <div className="bg-black h-full w-[10px] rounded-tr-md"></div>}
      <div
        className={`flex flex-1 justify-center ${
          active && "bg-slate-100 "
        } pt-2`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Link href={url}
        className="w-full">
          <div
            className={`flex flex-col justify-center items-center ${
              active ? "text-black" : "text-white"
            } `}
          >
            {icon()}
            <div className="text-xs">{title}</div>
          </div>
        </Link>
      </div>
      {active && <div className="bg-black h-full w-[10px] rounded-tl-md"></div>}
    </div>
  );
};

export const MenuInferior = ({page}) => {
  const buttons = [
    {
      title: "Perfil",
      url: "/perfil",
      icon: () => <PersonIcon />,
    },
    {
      title: "Comanda",
      url: "/vendas",
      icon: () => <ViewHeadlineIcon />,
    },
    {
      title: "Seleção",
      url: "/selecao-de-comanda",
      icon: () => <AppsIcon />,
    },
  ];
  return (
    <div className="flex h-full w-full justify-between px-[3px]">
      {buttons.map((button) => (
        <ButtonDiv {...button} active={page == button.title} />
      ))}
    </div>
  );
};
