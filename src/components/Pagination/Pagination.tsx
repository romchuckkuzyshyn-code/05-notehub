import css from "./Pagination.module.css";

interface PaginationProps {}

const Pagination = ({}: PaginationProps) => {
  return <div className={css["pagination"]}>Pagination</div>;
};

export default Pagination;
