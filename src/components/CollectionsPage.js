import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [loading, error] = useAuthState(auth);
  const db = getFirestore();
  const hasError = error !== null;

  useEffect(() => {
    const fetchCollections = async () => {
      if (!hasError) {
        try {
          const querySnapshot = await getDocs(collection(db, 'collections'));
          setCollections(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchCollections();
  }, [hasError, db]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (hasError) {
    console.error(error);
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Collections</h1>
      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>{collection.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CollectionsPage;