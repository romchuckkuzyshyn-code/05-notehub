import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/notes";
import css from "./NoteList.module.css";
import { deleteNote } from "../../services/noteService";

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchNotes"] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => {
        return (
          <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button className={css.button} onClick={() => mutate(note.id)}>
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default NoteList;
