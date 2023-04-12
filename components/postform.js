import { TextField,  Button } from "@mui/material";
import { useState } from "react";

export default function PostForm (props) {
    const [title, setTitle] = useState("");
    const [txt, setTxt] = useState("");
    return (
        <form
        className="flex justify-between flex-col" 
        onSubmit={(e)=>{
            e.preventDefault();
            props.handleSubmit({title, txt});
        }
        
        }>
          <TextField
            id="titulo"
            fullWidth
            label="Titulo"
            variant="filled"
            margin="dense"
            value={title}
            className="p-2"
            // error={error.name.error}
            // helperText={error.name.error? error.name.message: ""}
            onChange={(e) => {
                setTitle(e.target.value);
            }
            }
          />
            <TextField
            id="txt"
            fullWidth
            label="Escribe aquí tu receta, tip, mensaje motivacional o lo que quieras compartir al mundo....."
            variant="filled"
            margin="dense"
            value={txt}
            className="p-2"
            multiline
            style={{backgroundColor: "#fff"}}
            // error={error.name.error}
            // helperText={error.name.error? error.name.message: ""}
            onChange={(e) => {
                setTxt(e.target.value);
            }
            }
          />
      
         
          <Button variant="contained" color="success" style={{backgroundColor: "#5D9F6B"}}  type="submit">Publicar</Button>
        </form>
    )
}