import React from 'react';
import { format } from 'date-fns';
import { Note } from '../types/Note';

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete }) => {
  return (
    <div className="border-b border-gray-200 p-4 hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div className="flex-grow">
          <p className="text-gray-800 mb-2">{note.text}</p>
          <div className="text-sm text-gray-500">
            <p>From: {note.title}</p>
            <p>Saved: {format(new Date(note.date), 'PPp')}</p>
          </div>
        </div>
        <button
          onClick={() => onDelete(note.id)}
          className="text-red-500 hover:text-red-700 px-2"
        >
          ×
        </button>
      </div>
    </div>
  );
};