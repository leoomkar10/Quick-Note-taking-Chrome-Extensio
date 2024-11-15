import { Note } from './types/Note';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'saveNote',
    title: 'Save as note',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'saveNote' && tab?.id) {
    const note: Note = {
      id: crypto.randomUUID(),
      text: info.selectionText || '',
      url: tab.url || '',
      title: tab.title || '',
      date: new Date().toISOString(),
    };

    chrome.storage.local.get(['notes'], (result) => {
      const notes: Note[] = result.notes || [];
      notes.push(note);
      chrome.storage.local.set({ notes });
    });
  }
});
