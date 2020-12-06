import React, { FormEvent, SyntheticEvent, useState } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";
import ImageResults from "./ImageResults";
import { Img } from "./ImageResults";

const apiUrl: string = "https://pixabay.com/api";
const apiKey: string = "15576116-1b1f1fbde0a941a84c55b154d";

interface SearchState {
  images: Img[];
  amount: number;
  searchText: string;
}

const Search: React.FC = () => {
  const [state, setState] = useState({
    searchText: "",
    amount: 15,
    images: [],
  });

  const onTextChange = (e: any) => {
    const val = e.target.value;
    setState({ ...state, [e.target.name]: val });
    if (val === "") {
      setState({ ...state, images: [] });
    } else {
      axios
        .get(
          `${apiUrl}/?key=${apiKey}&q=${state.searchText}&image_type=photo&per_page=${state.amount}&safesearch=true`
        )
        .then((res) => setState({ ...state, images: res.data.hits }))
        .catch((err) => console.log(err));
    }
  };

  const onAmountChange = (e: SyntheticEvent, index: number, value: number) =>
    setState({ ...state, amount: value });

  return (
    <div style={{ margin: "0 20px" }}>
      <TextField
        name="searchText"
        value={state.searchText}
        onChange={onTextChange}
        floatingLabelText="Search For Images"
        fullWidth={true}
      />
      <br />
      <SelectField
        name="amount"
        floatingLabelText="Amount"
        value={state.amount}
        onChange={onAmountChange}
      >
        <MenuItem value={5} primaryText="5" />
        <MenuItem value={10} primaryText="10" />
        <MenuItem value={15} primaryText="15" />
        <MenuItem value={30} primaryText="30" />
        <MenuItem value={50} primaryText="50" />
      </SelectField>
      <br />
      {state.images.length > 0 ? <ImageResults images={state.images} /> : null}
    </div>
  );
};

export default Search;
