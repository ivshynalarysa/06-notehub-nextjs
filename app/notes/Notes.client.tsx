'use client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './page.module.css';
import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';
import { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import NoteModal from '@/components/NoteModal/NoteModal';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebounce } from 'use-debounce';
import { Note } from '@/types/note';

type NotesClientProps = {
	query: string;
	page: number;
	initialData: {
		notes: Note[];
		totalPages: number;
	};
};

function NotesClient({ query, page, initialData }: NotesClientProps) {
	const [currentPage, setCurrentPage] = useState(page);
	const [isModalOpen, setIsOpenModal] = useState(false);
	const [searchQuery, setSearchQuery] = useState(query);
	const [debouncedText] = useDebounce(searchQuery, 300);

	const { data, isSuccess, isError, error } = useQuery({
		queryKey: ['notes', debouncedText, currentPage],
		queryFn: () => fetchNotes(debouncedText, currentPage),
		placeholderData: keepPreviousData,
		initialData: debouncedText === query && currentPage === page ? initialData : undefined,
		refetchOnMount: false,
	});

	if (isError) throw error;

	useEffect(() => {
		setCurrentPage(1);
	}, [debouncedText]);

	function handleSearchChange(value: string) {
		setSearchQuery(value);
	}

	function handlePageChange(page: number) {
		setCurrentPage(page);
	}

	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				<SearchBox searchQuery={searchQuery} onChange={handleSearchChange} />

				{isSuccess && data.totalPages > 1 && (
					<Pagination
						totalPages={data.totalPages}
						onPageChange={handlePageChange}
						currentPage={currentPage}
						pageRangeDisplayed={5}
						marginPagesDisplayed={1}
					/>
				)}

				<button className={css.button} onClick={() => setIsOpenModal(true)}>
					Create note +
				</button>
			</header>
			{isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
			{isModalOpen && <NoteModal onClose={() => setIsOpenModal(false)} />}
		</div>
	);
}

export default NotesClient;