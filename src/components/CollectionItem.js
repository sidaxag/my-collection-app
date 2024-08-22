import React, { useState } from 'react';
import { db } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

const CollectionItem = ({ collection }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCollection, setUpdatedCollection] = useState({
    name: collection.name,
    description: collection.description,
    image_url: collection.image_url,
    user_id: collection.user_id  // User's email stored in user_id
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCollection((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const docRef = doc(db, 'collections', collection.id);
    try {
      await updateDoc(docRef, updatedCollection);
      setIsEditing(false); // Close the edit form after successful update
    } catch (error) {
      console.error('Error updating collection:', error.message);
    }
  };

  return (
    <div className="border rounded p-4 my-2 shadow">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={updatedCollection.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <textarea
            name="description"
            value={updatedCollection.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <input
            type="text"
            name="image_url"
            value={updatedCollection.image_url}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold">{collection.name}</h2>
          <p>{collection.description}</p>
          {collection.image_url && (
            <img
              src={collection.image_url}
              alt={collection.name}
              className="w-full h-auto mt-2"
            />
          )}
          <p>Added by: {collection.user_id}</p>  {/* Display the user's email stored in user_id */}
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default CollectionItem;
