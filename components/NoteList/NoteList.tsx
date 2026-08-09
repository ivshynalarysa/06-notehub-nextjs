import css from './NoteList.module.css';
import { deleteNote } from '../../lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note';
import Link from 'next/link';


interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  if (!notes.length) {
    return <p>No notes found.</p>;
  }
  

  return (
    <ul className={css.list}>
      {notes.map((note) => (
          <li key={note.id} className={css.listItem}>
              
              <Link href={`/notes/${note.id}`}>
               <h2 className={css.title}>{note.title}</h2>
               <p className={css.content}>{note.content}</p>
                  <span className={css.tag}>{note.tag}</span>
              </Link>
         
          <div className={css.footer}>
            
            <button
              className={css.button}
                      onClick={() => deleteNoteMutation.mutate(note.id)}
                      disabled={deleteNoteMutation.isPending}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
     
  );
}