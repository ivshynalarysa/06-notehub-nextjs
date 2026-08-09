'use client';

import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import css from './NoteDetails.module.css';

export default function NoteDetailsClient() {
  
    const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isError) {
    throw error;
  }

  if (isLoading) {
    return (
      <p className={css.loadMessage}>
        Loading, please wait...
      </p>
    );
  }

  if (!note) {
    return (
      <p className={css.errorMessage}>
        Note not found.
      </p>
    );
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>

          <button className={css.editBtn}>
            Edit note
          </button>
        </div>

        <p className={css.content}>{note.content}</p>

        <p className={css.date}>
          {note.updatedAt
            ? `Updated at: ${note.updatedAt}`
            : `Created at: ${note.createdAt}`}
        </p>
      </div>
    </div>
  );
}