import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import CollectionItem from './CollectionItem';

const HomePage = () => {
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // Fetch collections from Firestore
  const fetchCollections = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "collections"));
      const collectionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCollections(collectionsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching collections:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  // Handle adding a new collection
  const handleAddCollection = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = auth.currentUser;
    if (!user || !user.email) {
        alert('No user logged in or email not available');
        setLoading(false);
        return;
    }
    try {
      await addDoc(collection(db, "collections"), {
        name: newCollectionName,
        description: newCollectionDescription,
        image_url: imageUrl,
        user_id: user.email, // Store the user's email in the user_id field
        category_id: "default-category" // Example for category, you can adjust as needed
      });
      setNewCollectionName('');
      setNewCollectionDescription('');
      setImageUrl('');
      fetchCollections(); // Refresh collections
      setLoading(false);
    } catch (error) {
      console.error("Error adding collection:", error);
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      history.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Logout
      </button>
      <form onSubmit={handleAddCollection} className="mb-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Collection Name</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="Enter collection name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={newCollectionDescription}
            onChange={(e) => setNewCollectionDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add Collection
        </button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-none">
          {collections.map(collection => (
            <CollectionItem key={collection.id} collection={collection} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
