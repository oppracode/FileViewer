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
            Authorization: `Bearer uat.AEtkW2gl31fRAbAYVSDwpDE2Ct0hYmKVlen9pd98Gy_4uc-tus8iBIikR7gMVn09ru0bQA3oWgzjUMF7Z_9gmIxLkJqW9Tk7Z0Zck6tvCg6jkSp4n-bOl_y0Kpv_PtPAp7kd6oVMfQYqGZ2WSOealXuFH3EM4FEknk_Rl6Bijzyacv4wuPYo4c-U9rx_57fz-R6uPp52ndj-kF-lwI-UmHWHQSUVN8pfzZatURDdkX-40AhG0FiP8vc8GvjG1-BLjSkTFdE_lIYArR_Vd0-pgmtTgFwbaKq_9lwKMVpt9KtGMWA9Wic7TilYpJNJLV5Uel8N5GtZZfcpXHZ9jz1UhxyfCNHMeLAR7EiVfYTNGjGKpp0RW-FWWDR2GwN4IzAxEfSJ5QEPXvlxvuGz-YGDpRw6uC9YJbKZRmucNxTeRfjSR_WVXXeHRCwFdibtWq-3hQeYw_23xCEbMmwkFlP1iDo9gYR04BFiTBS4bV_E4EtJUODVVZrdNyS4N8ZfB-9B-FrYPdNFYzQX0hnHFJZY3frEb1npJVOyzQSkTY7eRPYYp4a5l-80Ho1Lu0DdUcSieKF7kjCTUH8gIYmsy70voQY7WW4MJMroU9maNATUp7MV9aVOw1wBIYu7TqaComo4YL67QacB7qDMt_IEIYKZe9_Ots1Zs6F1Sle_MDw0250UYSC9SCHSJbqf7ZtyiLg-iY51oZ1N8gw0v9nITDkIbPDt59JnJetO3I4LFfM3SvCX5gduFT_e7baUQ6E-ZmwTCSqb0ai6-3OJsmM51T07sYE7s9CrOXylT52a8dEhOPvz4FfRPrmvIpR2rJ3alLitcLVRTo2KZ2H3KtjJ9zgrckqpuTp88mu7zumSx0dqA86xRFxilTnydKddAnCJ2NL2UhBVeasRprCosL1I4QRbC_UkySg4I-44edFInxdzSp-qvka2uVfUBCbFNwjAeaiV3ICm1mneqzV-w2BHDr9pwjBf4USDS606W2TaJuV50gf9B-nCkKQ4_GwyuIfH_p9CjcpJyqqUPW052qONorq8w2AZvB1NdVCpft-_pufz3xXt6Add-O92o3i2uP069p8VkMFaYUM_9W2pY2rJEOaAT5qwLVPhwm0QjYdeCSZoQIYp2NkURDctqsU83irq5w6jREANR7gq9eZbEUAi5eU6xbK9NdMIb_zqG88VcIJLoyzBdYXXEYI1PhTkUoyQKpScvIk0BM7ob3NimfIPGA5l0wUaFAoHz7SshFHnGqZSW6Gk3-gaMPZKj5h0BQE-UFJXVcUanej0fLrebF5zzpKz4aFZeoZLLrgcTuyMkcat5cYgoNVf3SFcMfhxs4BG7mxyemkLgUbE6dUUKCd-lJOs5vu_UdqpdOBtitBRTq1n2f_y-EHYThQT8d9c3aOdwOO9NTX6u_AIeAxfMP6AL6j1SgAC`,
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
//2e7LVywYMEYAAAAAAAAAF2dLfjcfSxcnmTUGyZg5hVY
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
