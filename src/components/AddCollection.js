// src/components/AddCollection.js
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AddCollection = () => {
  const [collectionName, setCollectionName] = useState('');

  const addCollection = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId || !collectionName) return;

    try {
      await addDoc(collection(db, "Collections"), {
        name: collectionName,
        userId,
      });
      setCollectionName(''); // Clear the input field after successful addition
    } catch (error) {
      console.error("Error adding collection:", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCollection();
  };

  return (
    <div className="my-4">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          placeholder="Enter collection name"
          className="border border-gray-300 p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Collection
        </button>
      </form>
    </div>
  );
};

export default AddCollection;
