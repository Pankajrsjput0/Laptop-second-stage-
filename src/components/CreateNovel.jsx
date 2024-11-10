import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function CreateNovel() {
  const [title, setTitle] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [coverUrl, setCoverUrl] = useState('');
  const [story, setStory] = useState('');
  const [authorName, setAuthorName] = useState('');
  const navigate = useNavigate();

  const genres = [
    'Fantasy', 'Horror', 'Mystery', 'Adventure', 'Romance', 'Sci-Fi',
    'Urban', 'Action', 'War', 'Realistic', 'History', 'ACG',
    'Games', 'LGBT+', 'Teen', 'Devotional', 'Poetry', 'General',
    'Chereads'
  ];

  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else if (selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const novelData = {
        title,
        genres: selectedGenres,
        coverUrl,
        Story: story,
        authorName: authorName || auth.currentUser.displayName || 'Anonymous',
        Uploadby: auth.currentUser.uid,
        Views: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'Novels'), novelData);
      navigate(`/novel/${docRef.id}`);
    } catch (error) {
      console.error('Error creating novel:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Create New Novel</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author Name:
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Leave blank to use display name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Genres (select up to 3):
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {genres.map((genre) => (
                <label key={genre} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                    disabled={!selectedGenres.includes(genre) && selectedGenres.length >= 3}
                    className="rounded"
                  />
                  <span>{genre}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image URL (optional):
            </label>
            <input
              type="url"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Story Description:
            </label>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              required
              rows="5"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Novel
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNovel;