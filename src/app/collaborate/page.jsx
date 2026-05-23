import React from 'react';
import CollabForm from '@/components/public/CollabForm';
import '@/app/cms-styles.css';

export const metadata = {
  title: 'Collaborate - Shubhangi Portfolio',
  description: 'Pitch your campaign or brand collaboration. Fill out the multi-step form to get started.',
};

export default function CollaboratePage() {
  return (
    <main className="cms-container">
      <CollabForm />
    </main>
  );
}
