import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';
import { auth } from '../firebase/config';

const NewCollectionForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create a new collection in the Realtime Database
    const db = getDatabase();
    const collectionsRef = ref(db, `users/${auth.currentUser.uid}/collections`);
    const newCollectionRef = push(collectionsRef);
    set(newCollectionRef, {
      name,
      description,
      imageURL,
      category,
    });
    // Update the collections list
    // ...
  };

  // Fetch categories from the Realtime Database
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const db = getDatabase();
    const categoriesRef = ref(db, 'categories');
    onValue(categoriesRef, (snapshot) => {
      const categoriesData = snapshot.val();
      const categoriesArray = Object.keys(categoriesData).map((key) => ({
        id: key,
        ...categoriesData[key],
      }));
      setCategories(categoriesArray);
    });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <label>
        Image URL:
        <input type="text" value={imageURL} onChange={(event) => setImageURL(event.target.value)} />
      </label>
      <label>
        Category:
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </select>
      </label>
      <button type="submit">Create Collection</button>
    </form>
  );
};

export default NewCollectionForm;