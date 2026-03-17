import { useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const perPage = 12;

  const [value] = useDebounce(search, 500);

  const notesQuery = useQuery({
    queryKey: ["fetchNotes", { page, perPage, value }],
    queryFn: () => fetchNotes(page, perPage, value),
  });

  const notesResponse = notesQuery.data?.notes ?? [];
  const totalPages = notesQuery.data?.totalPages ?? 0;
  const isLoading = notesQuery.isLoading;
  const isError = notesQuery.isError;

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} onSearch={setSearch} />
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} setPage={setPage} page={page} />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <Error />}
      <NoteList notes={notesResponse} />
      {isOpenModal && (
        <Modal closeModal={closeModal}>
          <NoteForm closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
