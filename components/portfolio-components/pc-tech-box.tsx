import { FormLabel } from "@/components/ui/form";
import { Dispatch, SetStateAction } from "react";
import Select, { MultiValue } from 'react-select';
import { customClassNames } from "@/const/react-select-cstm-class.const";
import { TechsType, TechType } from "@/type";

type PCTechBoxProps = {
    techs: TechsType;
    setTechs: Dispatch<SetStateAction<TechsType>>;
    name: string;
    options: TechsType;
};

export default function PCTechBox({ techs, setTechs, name, options }: PCTechBoxProps) {
    const handleStoreTech = (item: MultiValue<TechType>) => {
        console.log(item);  
        setTechs(item)
    }
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <FormLabel className="capitalized">{name}</FormLabel>
            </div>
            <Select
                value={techs}
                onChange={(selected) => handleStoreTech(selected)}
                isMulti
                name="colors"
                options={options}
                classNames={customClassNames}
                classNamePrefix="select"
            />

        </div>
    );
}