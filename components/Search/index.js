import { InputGroup, Input, InputGroupText, Label } from "reactstrap";
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ field, setField }) {
   
    const handleSearch = useDebouncedCallback((term) => {
        setField(term);
    }, 300);
  
    return (
        <div className="d-flex flex-row flex-fill gap-2">
            <Label size="sm">
                Buscar:
            </Label>

            <InputGroup size="sm" className="flex-fill">
                <Input
                    id="field"
                    name="field"
                    bsSize="sm"
                    value={field}
                    autoComplete="off"
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                ></Input>
                <InputGroupText>
                    <a
                        style={{ cursor: "pointer" }}
                        onClick={(e)=>{e.preventDefault(); setField("");}}
                        data-toggle="tooltip"
                        title={field!=="" ? "Limpiar" : "Buscar"}
                    >
                        <i className={field!=="" ? "bi bi-x" : "bi bi-search"}></i>
                    </a>
                </InputGroupText>                    
            </InputGroup>
        </div>
    );
}