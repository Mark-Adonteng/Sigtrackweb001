import { collection, getDocs, doc, getDoc, DocumentReference, QueryDocumentSnapshot } from 'firebase/firestore';
import db from '../services/Firestore'; // Adjust the import path as needed

interface OrganizationData {
  userId: string;
  organizationName: string; // Update the type based on your actual data structure
}

const getOrganizations = async (): Promise<OrganizationData[]> => {
  try {
    const usersCollection = collection(db, 'users');
    const querySnapshot = await getDocs(usersCollection);

    const organizationsData: OrganizationData[] = [];

    for (const userDoc of querySnapshot.docs) {
      const organizationRef = userDoc.data().organization as DocumentReference;
      const organizationDoc = await getDoc(organizationRef);

      if (organizationDoc.exists()) {
        const organizationName = organizationDoc.data().name;
        organizationsData.push({ userId: userDoc.id, organizationName });
      } else {
        organizationsData.push({ userId: userDoc.id, organizationName: 'Organization not found' });
      }
    }

    return organizationsData;
  } catch (error) {
    console.error('Error fetching organizations:', error);
    throw error;
  }
};

export { getOrganizations };
