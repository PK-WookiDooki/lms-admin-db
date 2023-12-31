import {Input, Select} from "antd";
import { RxCross1 } from "react-icons/rx";

const SearchInputForm = ({ search, onChange, setSearch, placeholder, searchedOptions, onSearchedOptChange  }) => {
    const clearSearch = () => {
        setSearch("");
    };

    return (
        <div className="relative w-[400px] flex searchedInput ">
            <Select options={searchedOptions} defaultValue={searchedOptions[0]?.value} onChange={onSearchedOptChange} className={` !border-none `} />
            <Input
                value={search}
                onChange={onChange}
                className=" outline-none w-full font-sans text-[16px] !border-disabledGray outline-offset-0 focus:shadow-none"
                placeholder={placeholder}
            />
            <button
                className={` text-black/60 ${
                    search.trim() ? "block" : " hidden"
                } absolute right-2 top-1/2 transform -translate-y-1/2`}
                onClick={clearSearch}
            >
                {" "}
                <RxCross1 />{" "}
            </button>
        </div>
    );
};

export default SearchInputForm;
