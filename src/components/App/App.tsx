import { useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const perPage = 12;

  const notesQuery = useQuery({
    queryKey: ["fetchNotes", { page, perPage, search }],
    queryFn: () => fetchNotes(page, perPage, search),
  });

  const notesResponse = notesQuery.data?.notes ?? [];

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
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
