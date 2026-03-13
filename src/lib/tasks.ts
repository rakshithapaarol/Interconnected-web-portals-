import { db } from "./firebase";
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  onSnapshot, 
  query, 
  where,
  orderBy,
  serverTimestamp 
} from "firebase/firestore";

export interface Task {
  id?: string;
  title: string;
  description: string;
  assignedTo: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  createdAt: any;
  updatedAt: any;
}

const TASKS_COLLECTION = "tasks";

export const createTask = async (title: string, description: string, assignedTo: string) => {
  try {
    const docRef = await addDoc(collection(db, TASKS_COLLECTION), {
      title,
      description,
      assignedTo,
      status: "Pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding task: ", error);
    throw error;
  }
};

export const subscribeToAllTasks = (callback: (tasks: Task[]) => void) => {
  const q = query(collection(db, TASKS_COLLECTION), orderBy("createdAt", "desc"));
  
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Task[];
    callback(tasks);
  });
};

export const subscribeToUserTasks = (userId: string, callback: (tasks: Task[]) => void) => {
  // Removing orderBy here allows the query to run without a composite index
  const q = query(
    collection(db, TASKS_COLLECTION), 
    where("assignedTo", "==", userId)
  );
  
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Task[];
    callback(tasks);
  });
};

export const updateTaskStatus = async (taskId: string, status: Task['status']) => {
  const taskRef = doc(db, TASKS_COLLECTION, taskId);
  try {
    await updateDoc(taskRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating status: ", error);
    throw error;
  }
};
