"use client"

import { useState } from "react"; 
import { Loading } from "./components/Loading";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import PinIcon from "@mui/icons-material/Pin";
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from "next/link";
export default function Login() {
  const [seePassword, setSeePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSeePassword = () => {
    setSeePassword(!seePassword);
  }
  return (
    <div class="flex flex-col h-screen">
      <div class="flex-grow bg-gray-300 py-[100px]">
      {isLoading ? (
        <div className="flex-grow  h-full flex justify-center items-center ">
        <Loading color="black" />
        </div>
      ) : (
        <div className="flex-grow  h-full flex justify-center items-center ">

          <div className="border-gray-200 rounded-sm p-2 bg-white">
          <div className={`flex flex-col gap-2 p-1 pt-2 mb-1`}>      
          <TextField
              onChange={(e) => {}}
              className="w-full"

              size="small"
              placeholder="Usuário"
              sx={ {
                backgroundColor: 'white',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                  sx={{ marginLeft: '-7px' }}
                   position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                sx: {
                  backgroundColor: "white",
                  borderRadius: "4px",
                  border: "none",
                },
                inputMode:"text",
                type: "search",
                autoComplete: "off",
                autoCorrect: "off",
                autoCapitalize: "off",
                spellCheck: "false",
              }}

            />
          <TextField
              onChange={(e) => {}}
              className="w-full"
              type="password"
              size="small"
              placeholder="Senha"
              sx={ {
                backgroundColor: 'white',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                  sx={{ marginLeft: '-7px' }}
                   position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    onClick={() => handleSeePassword()}
                    sx={{ marginRight: '-5px' }}
                    position="end"
                  >
                    {seePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </InputAdornment>
                ),
              }}
              inputProps={{
                sx: {
                  backgroundColor: "white",
                  borderRadius: "4px",
                  border: "none",
                },
                inputMode:"text",
                type: seePassword ? "search" : "password",
                autoComplete: "off",
                autoCorrect: "off",
                autoCapitalize: "off",
                spellCheck: "false",
              }}

            />
            </div>
            <div className=" flex justify-between items-center p-1 ">
              <div
              className="text-sm">
                <Link href="!">Esqueceu a senha?</Link>
                </div>
              
              <Link
               href="/vendas"

                className="px-4 py-2 bg-slate-950 border-inherit shadow-lg text-white rounded"
              >
                Confirmar
              </Link>
              </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
