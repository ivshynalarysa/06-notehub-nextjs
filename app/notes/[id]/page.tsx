import { fetchNoteById } from '@/lib/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';

type NoteDetailsProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NoteDetails({
  params,
}: NoteDetailsProps) {
  const queryClient = new QueryClient();

  const { id } = await params;
  const noteId = Number(id);

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}