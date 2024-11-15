import React, { useEffect, useState } from 'react';
import { Note } from './types/Note';
import { NoteItem } from './components/NoteItem';

export const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    chrome.storage.local.get(['notes'], (result) => {
      setNotes(result.notes || []);
    });
  };

  const handleDelete = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    chrome.storage.local.set({ notes: updatedNotes }, () => {
      setNotes(updatedNotes);
    });
  };

  return (
    <div className="w-[400px] max-h-[600px] overflow-y-auto">
      <div className="sticky top-0 bg-white p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold">Quick Notes</h1>
      </div>
      <div>
        {notes.length === 0 ? (
          <p className="text-gray-500 p-4 text-center">No notes yet</p>
        ) : (
          notes
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map(note => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={handleDelete}
              />
            ))
        )}
      </div>
    </div>
  );
};
