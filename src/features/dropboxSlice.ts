import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
            Authorization: `Bearer uat.AEuYaFhm513xT0AKoq410wZV2JTUUR0kADtC_GITMav7iN-iATY0EabOWDlBC4Rjvclq8yVhcCSbjZQ0rQ-69a-NEoAXmu4U3I1kzF98vz70zd2II2kEd82xaE_jUwqIsBwwQE57S0C6yTTpMU46OTF12LVHp0KdZl2cFwiKREWcntgwsnGP8Nv-sahf7nBX2o9_2b0GIODuVoQG2GiG6ngBeZVCDmKUcd-t3niiNKYqsMNhMEJooHpHbXW_QSZ4otg7JWGTX1Pq_61WbYcyGzaaSzw3byUuL4UWROQ3DXUTvKzNofsMOgO9zh099BqG947K0l3IDG9-mmNl82RpmceZz7AsI7MPKtB9hcqnvR61Gif2rl_O13oGh59bz60vl-UVOu4HGyILcZWZONB49cow-JP9qUX3nanCEahdLMtlBvTDFWdee0l2WKFOlJx8qmDSa3EYYlyrknbloX_HqJEJFzv1PzvLMDyt7DOGGWkk0jzJo3MdfgpJal8EHGyK6Ngu_0YksArNG3cAbSChbUzPNbJ3H-fchkvHyBRPXOHouegTJnarpu_Cme9JdwXpgWYnP9xp5jFxd2dfpkCcTbbFtjNHv2sF97WsyzvkR-P6j41RjVfyHqjxCAQUZUmFMMl7kvex9PDtSczBGRW2baEgn2Kt7WW6ES8y8E9H7CuA4d0lPT6RupRYYzzb2-aGLn5YvNI8Dv5xnHf_b865nLlgJXOLadBxwKuFt7W9rAMGoy_cmwJPcjRpnYzO8hnsJFIToR9Y-l-LiflLr4Bpdj9ltYYM7C_EkNCd7y-UCJqAxR8ywx6sdqJGzgewG0fm-gahqm8w0a-a4xr6ZYjdDXwRdWeU3IHzqsR2YgOH9EK1m9m8ZYRGzcf6AmGDx9cCDs6uXsnWvS8X_mS2QsHVZh6_zViLpC8Lk5HduwGifDXylfl8E4Mn6p0IDsTZ3a6A6FzOvd8aG8wl7EBFS06PsBMdJ2X0Zn8bCLK27913sAQHbESJVDY3DDkgnFfpj87Z2y0Wb1okBSmVaB17EPT7C66GndoI1QuyY573OAjBhetF6AFVipyXOwc7Wsce6-b7SqcIIikH0ZFRqrNue0ZMtQPmHWBFfKTOrDIbXNqKrey0w8H2aEiRY2q2SdsMnMSj3Vur0jIeQlg6MHfqIkb3roVf7moFnDDvrW2lgZZnjvaUvvnSAjcMEVhXQ13hy4urZb0vH-SYvsIDVhhTCk0LdZfv_d2cXv9dp12WZaIReGZSP6NpS37vExf1qPSdJ2w4RrZTGfjz3dUTli1mCGqHB1InqsN-ZQWjoBNGBumtdfx2bfxCnHcErAlRCy2rSGBJHLPfQLfCHTKDEIgEOpF2qhSHjUJ9R2nzRCZUQZg-eEMIGw-64Zs70fzPR83-cljqoeSVi7J-5txTNCkSl-WkDQQ6`,
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