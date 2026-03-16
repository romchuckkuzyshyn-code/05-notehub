import css from "./SearchBox.module.css";

interface SearchBoxProps {}

const SearchBox = ({}: SearchBoxProps) => {
  return <input className={css.input} type="text" placeholder="Search notes" />;
};

export default SearchBox;
