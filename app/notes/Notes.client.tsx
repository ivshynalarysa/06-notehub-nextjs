'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react';

import css from './page.module.css';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteForm from '@/components/NoteForm/NoteForm';

import { fetchNotes } from '@/lib/api';
import type { Note } from '@/types/note';

type NotesClientProps = {
  query: string;
  page: number;
  
};

function NotesClient({
  query,
  page,
 
}: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(page);
  const [isModalOpen, setIsOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(query);

  const [debouncedText] = useDebounce(searchQuery, 300);

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ['notes', debouncedText, currentPage],
    queryFn: () => fetchNotes(debouncedText, currentPage),
    placeholderData: keepPreviousData,
   
    refetchOnMount: false,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedText]);

  if (isError) {
    throw error;
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          searchQuery={searchQuery}
          onChange={handleSearchChange}
        />

        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
          />
        )}

        <button
          className={css.button}
          onClick={() => setIsOpenModal(true)}
        >
          Create note +
        </button>
      </header>

      {isSuccess && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient;