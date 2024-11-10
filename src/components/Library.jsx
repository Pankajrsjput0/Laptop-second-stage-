import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import NovelCard from './NovelCard';

function Library() {
  const [savedNovels, setSavedNovels] = useState([]);
  const [readingProgress, setReadingProgress] = useState({});

  useEffect(() => {
    const fetchLibrary = async () => {
      if (auth.currentUser) {
        const libraryQuery = query(
          collection(db, 'users', auth.currentUser.uid, 'library')
        );
        const progressQuery = query(
          collection(db, 'users', auth.currentUser.uid, 'readingProgress')
        );

        const [librarySnapshot, progressSnapshot] = await Promise.all([
          getDocs(libraryQuery),
          getDocs(progressQuery)
        ]);

        const novels = [];
        const progress = {};

        for (const doc of librarySnapshot.docs) {
          const novel = await getDoc(doc(db, 'Novels', doc.data().novelId));
          if (novel.exists()) {
            novels.push({ id: novel.id, ...novel.data() });
          }
        }

        progressSnapshot.forEach(doc => {
          progress[doc.data().novelId] = {
            lastReadChapter: doc.data().lastReadChapter,
            lastReadAt: doc.data().lastReadAt
          };
        });

        setSavedNovels(novels);
        setReadingProgress(progress);
      }
    };

    fetchLibrary();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Library</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {savedNovels.map(novel => (
          <div key={novel.id} className="relative">
            <NovelCard 
              novel={novel} 
              progress={readingProgress[novel.id]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Library;