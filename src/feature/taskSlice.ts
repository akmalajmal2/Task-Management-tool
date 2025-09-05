import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export const fetchTask = createAsyncThunk(
  "task/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "task"));
      let tasks: any[] = [];
      querySnapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() });
      });
      return tasks;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "task/addTask",
  async (data: any, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, "task"), {
        ...data,
        createdAt: new Date(),
      });
      return { id: docRef.id, ...data };
    } catch (error: any) {
      console.error("Firestore add error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, updateData }: { id: string; updateData: any }) => {
    try {
      console.log(321, id, updateData);
      const taskRef = doc(db, "task", id);

      await updateDoc(taskRef, updateData);
      return { id, updatedData: updateData };
    } catch (error: any) {
      console.error("Firestore add error:", error);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id: string) => {
    try {
      await deleteDoc(doc(db, "task", id));
      console.log("Task deleted:", id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
);

interface Task {
  title: string;
  description?: string;
  category: string;
  status: "to-do" | "in-progress" | "completed";
  dueDate: string;
  createdAt: string;
}

interface TaskStateProps {
  taskItems: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskStateProps = {
  taskItems: [],
  loading: true,
  error: null,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action: any) => {
        state.loading = false;
        state.taskItems.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? action.error.message ?? null;
      });
    builder
      .addCase(fetchTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.loading = false;
        state.taskItems = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? action.error.message ?? null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.taskItems.findIndex(
          (task: any) => task.id === action.payload?.id
        );
        if (index !== -1) {
          state.taskItems[index] = {
            ...state.taskItems[index],
            ...action.payload?.updatedData,
          };
        }
      });
  },
});

export default taskSlice.reducer;
