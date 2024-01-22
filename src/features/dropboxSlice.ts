import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  DropboxState,
  DropboxFileRaw,
  DropboxFile,
  FileType,
  FetchFilesResponse,
} from '../types';

const DROPBOX_API_URL = 'https://api.dropboxapi.com/2/';

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
  };
}

export const fetchFiles = createAsyncThunk(
  'dropbox/fetchFiles',
  async (_, __): Promise<DropboxFile[]> => {
    try {
      const response = await axios.post<FetchFilesResponse>(
        `${DROPBOX_API_URL}files/list_folder`,
        {
          path: '',
          recursive: true,
          include_deleted: false,
        },
        {
          headers: {
            Authorization: `Bearer uat.AEsMObh0qT-aFcPb-419y3LdQkWjPg4lSQb8TRxYWzpG1EebpRgUDF713keVlKNGn1WwdQ5G0z2JnfSFAgpoFdccVP8n4wcZhOswSzGjN7VKjrDOPtluQR_yl86eiPDG2hiL7TDq_tgtBLo4kUick-AbYKIrgvbya3f-lkAXAySOGotuCf8-r22_UlPbMY6rWpzbMJ4s5meCrgvzxQuhYnEJ8voHrynJme_T8lT2nMAXwOHDSqcx1EoWO9UGO_atCtB67km2UQEV_26Gb2KD2Q0rzpMZWNnkTfd881grHvINS5jKNB7o5XDSqeb-oW_4aBQi9L9ghKjLbcZEPjbC8WQpbrOOfxtBFEVE_NTqXt_VCUqjv0eoZZTMaRBey2Qho09VTQUuoLwNJ2MvakYZ3L_O5fvyKc1YhAbC1tE811EkHJ-sfLraQdpF4Q23QC1e9aI6oKZlmH7AGuJh46qhB1kTXfM_GvLLH6mHzs_GBV3qHV25_uS0KFbxCMoYbqc7QWGJ4t1TmbUnHq91IwEJ7DSpp5ubM6bae8PTXK3JDTCkoDH1K5btj5XDK-O4VLClVwcBGJP1WCOEgUZEMWJskOCuK65AelRYlCx7oJfOFiDmSOm_pWkYEIl4aNvqsNuBVKivuv5sJgrJZGGxkJfvhi8E9qYxxtUSviSgSv-LkZuZEM1f2zzsoxrL6xe-oeYyaClaYf-mfpB1OZbzjYitNX5DgvTTSjAEHuD9UlEN5j2Mz-tuEFN8ws_u7BUoIhxy-f0ivHkGyhDJODrejDvdTlG3ta6ENoO8EinLm4B-DFr7onlPro_2P3HiRDGWiCBsa04MY_-hDxA56hgnICVFCwttxeYkKikIW6wFX26RAaZGgVBOZ9RQhln0tVVZMCvmS83ykBEy3yMJcvKYFLgQyaqxvtLYWeqH_18JpZvu2dPqToG-4mleOxSsKRvN-sRRPe5s2uxqL0vneaw6-hmreoivHdEEeVCnlGTodbcTeoMB8qfFdRONUCmfTSTPA8ZXcRCC8KgblD6oUwGljHAooopqAHxc0ugTt7ifrpOSUwuqgtQWA26e7a2eLwTPqsRNGjHc3f6JmJtREucLjZAmrEv56mDUVx33tdT93DM9JkEDd8JmrYSGi4O9f9ZRiDE4w9N7CQ09RVExeNOJI1jW9Skra4WcmA_2A36I4SDgbp0OyYaGTm7tXV0fy77F1fGEFgbD-sHt76O__fiGEqhcvhYtKCWpIeGRXnrUzW9SgU0BtwaOkjsqrc33HbZKQo-2bzyMxG8_ZOFhzqB3ckI-9avJuKdoJxNjwXFSHI944LYBjN35E3S33kzE2ziBKJHq7qVAeyF-GPj8CIpQkzavHJqkFKe9-5JOtiwc_m8GMTA4Iq81LKS8YrBl_HVF__-lFZMNtwTet29IzU4FLJnWpCAy`,
            'Content-Type': 'application/json',
          },
        }
      );

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
