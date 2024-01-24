// src/services/firestore.ts

import { getFirestore } from 'firebase/firestore';
import { app } from '../../firebase'; // Adjust the path based on your project structure

const db = getFirestore(app);

export default db;
