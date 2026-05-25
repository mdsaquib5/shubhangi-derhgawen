import React from 'react';
import CollabForm from '@/components/public/CollabForm';

export const metadata = {
  title: 'Collaborate - Shubhangi Portfolio',
  description: 'Pitch your campaign or brand collaboration. Fill out the multi-step form to get started.',
};

export default function CollaboratePage() {
  return (
    <section className='articles-page'>
      <div className="container">
        <CollabForm />
      </div>
    </section>
  );
}