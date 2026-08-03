'use client';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import css from './NoteDetails.module.css';

type ErrorProps = {
	error: Error;
};

function Error({ error }: ErrorProps) {
	return (
		<div>
			<p className={css.errorMessage}>Could not fetch note details. {error.message}</p>
			<ErrorMessage />
		</div>
	);
}

export default Error;