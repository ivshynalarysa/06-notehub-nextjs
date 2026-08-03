'use client';

import { fetchNotes } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import css from './NoteDetails.module.css';

function NoteDetailsClient() {
	const id = Number(useParams<{ id: string }>().id);

	const {
		data: note,
		isLoading,
		error,
		isSuccess,
		isError,
	} = useQuery({
		queryKey: ['note', id],
		queryFn: () => fetchNoteById(id),
		refetchOnMount: false,
	});

	if (isError) throw error;

	return (
		<div>
			{isLoading && <p className={css.loadMessage}>Loading, please wait...</p>}
			{!error && !note && !isLoading && <p className={css.errorMessage}>Not found</p>}
			{note && isSuccess && (
				<div className={css.container}>
					<div className={css.item}>
						<div className={css.header}>
							<h2>{note.title}</h2>
							<button className={css.editBtn}>Edit note</button>
						</div>
						<p className={css.content}>{note.content}</p>
						<p className={css.date}>
							{note.updatedAt ? `Updated at: ${note.updatedAt}` : `Created at: ${note.createdAt}`}
						</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default NoteDetailsClient;