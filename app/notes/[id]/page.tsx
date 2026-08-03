import { fetchNotes } from '@/lib/api';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';

type NoteDetailsProps = {
	params: Promise<{ id: string }>;
};

async function NoteDetails({ params }: NoteDetailsProps) {
	const queryClient = new QueryClient();

	const { id } = await params;
	const parsedId = Number(id);

	await queryClient.prefetchQuery({
		queryKey: ['note', parsedId],
		queryFn: () => fetchNoteById(parsedId),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<NoteDetailsClient />
		</HydrationBoundary>
	);
}

export default NoteDetails;