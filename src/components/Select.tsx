import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

export interface SelectListItem {
    value: string | number;
    name: string;
}

interface SelectProps<T> {
    handleChange: (value: T) => void;
    value: string | number;
    list: SelectListItem[];
    lable: string;
    defaultValue?: string | number;
}

export default function <T>({ handleChange, value, list, lable, defaultValue }: SelectProps<T>) {
    const onChange = (event: SelectChangeEvent<string | number>) => handleChange(event.target.value as T);

    return (
        <FormControl fullWidth>
            <InputLabel sx={{ color: "rgba(228, 219, 233, 0.25)", "&.Mui-focused": { color: "#fff" } }}>{lable}</InputLabel>
            <Select
                value={value}
                label={lable}
                onChange={onChange}
                defaultValue={defaultValue}
                sx={{
                    color: "white",
                    ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(228, 219, 233, 0.25)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(228, 219, 233, 0.25)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(228, 219, 233, 0.25)",
                    },
                    ".MuiSvgIcon-root": {
                        fill: "white !important",
                    },
                    ".MuiSelect-select": {
                        padding: "10px 14px",
                    },
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            maxHeight: 300,
                            backgroundColor: "#2b2b3c",
                        },
                    },
                }}
            >
                {defaultValue !== undefined && (
                    <MenuItem
                        sx={{
                            color: "#fff",
                        }}
                        value={defaultValue}
                    >
                        <em>All</em>
                    </MenuItem>
                )}
                {list.map(({ value, name }) => (
                    <MenuItem
                        sx={{
                            color: "#fff",
                        }}
                        key={name}
                        value={value}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
