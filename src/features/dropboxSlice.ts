import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  DropboxState,
  DropboxFileRaw,
  DropboxFile,
  FileType,
  FetchFilesResponse,
} from '../types';
import { setLoading } from './loadingSlice';


const DROPBOX_API_URL = 'https://api.dropboxapi.com/2/';
const DELETE_FILE_ENDPOINT = 'https://api.dropboxapi.com/2/files/delete';
const accessToken = process.env.EXPO_PUBLIC_API_ACCESS_TOKEN


const initialState: DropboxState = {
  files: [],
  status: 'idle',
  error: null,
};

function toDropboxFile(file: DropboxFileRaw): DropboxFile {
  return {
    id: file.id,
    type: file['.tag'] === 'folder' ? FileType.FOLDER : FileType.FILE,
    name: file.name,
    isDownloadable: file.is_downloadable || false,
    size: file.size || null,
    serverModified: file.server_modified || null,
    clientModified: file.client_modified || null,
    path: file.path_lower,
  };
}

export const fetchFiles = createAsyncThunk(
  'dropbox/fetchFiles',
  async (_, thunkAPI): Promise<DropboxFile[]> => {
    
    try {
      thunkAPI.dispatch(setLoading(true)); 

      await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await axios.post<FetchFilesResponse>(
        `${DROPBOX_API_URL}files/list_folder`,
        {
          path: '',
          recursive: true,
          include_deleted: false,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      thunkAPI.dispatch(setLoading(false)); 
      return response.data.entries.map(toDropboxFile);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);

export const dropboxSlice = createSlice({
  name: 'dropbox',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.files = action.payload;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addDefaultCase((_) => {});
  },
});

export const deleteFile = createAsyncThunk(
  'dropbox/deleteFile',
  async (filePath: string) => {

    try {
      await axios.post(
        DELETE_FILE_ENDPOINT,
        {
          path: filePath,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
);
