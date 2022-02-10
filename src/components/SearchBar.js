import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Styles from "./SearchBar.module.css";
import { BsSearch } from "react-icons/bs";
import { locationAutoComplete } from "../api/accuWeather";
import { useDispatch } from "react-redux";
import { ErrorActions } from "../store/ErrorSlice";

export default function SearchBar({ text, onChanged }) {
  const [searchInput, setSearchInput] = useState("");
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  const [autoCompleted, setAutoCompleted] = useState(false);

  const dispatch = useDispatch();

  const searchInputChangeHandler = (e) => {
    setAutoCompleted(false);
    setSearchInput(e.target.value);
  };

  const autoCompleteValueSelectedHandler = (e) => {
    setSearchInput(e.target.value);
  };
  const onSelected = (e) => {
    setAutoCompleted(true);
  };

  useEffect(() => {
    //TODO add modal for error (api calls)
    if (autoCompleted) return;
    const timer = setTimeout(() => {
      try{
        locationAutoComplete(searchInput).then((res) => {          
          setAutoCompleteOptions(res);
        });
      }
      catch (e){
        dispatch(ErrorActions.setError(e));
      }
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchInput, autoCompleted]);

  useEffect(() => {
      const option = autoCompleteOptions.find(c => c.label === searchInput);
      if(option === undefined)
        return;
      onChanged(option);
      setSearchInput("");
      setAutoCompleteOptions([]);
      setAutoCompleted(false);
  }, [autoCompleteOptions, searchInput, onChanged]);

  return (
    <div className={Styles.search}>
      <BsSearch size={40} className={Styles.searchIcon} />
      <Autocomplete
        sx={{ width: 500 }}
        autoSelect
        onInputChange={searchInputChangeHandler}
        disablePortal
        id="combo-box-demo"
        options={autoCompleteOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            label={text}
            id="outlined-basic"
            variant="outlined"
          />
        )}
        onSelect={autoCompleteValueSelectedHandler}
        onChange={onSelected}
        className={Styles.searchText}
      />
    </div>
  );
}
