import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const DROPBOX_API_URL = 'https://api.dropboxapi.com/2/';

interface DropboxState {
  files: any[]; // Replace 'any[]' with the actual type for your files
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DropboxState = {
  files: [],
  status: 'idle',
  error: null,
};


export const fetchFiles = createAsyncThunk(
  'dropbox/fetchFiles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${DROPBOX_API_URL}files/list_folder`,
        {
          path: '',
          recursive: true,
        },
        {
          headers: {
            Authorization: `Bearer uat.AEvHNuELTPx4YyRdobSt7PYKdgdomf6ZY5Ox06C_VMerCGTU9vumO4hPKRa9w2AO4P1oJ-kSoBRYAy9QvXVVC69GiP-9jAhP-ycZfQGUqXkWveuy0PmKO1SJ2qy298yuMZLEmKokadBVpipnEJ0FxX6oVesUB7sa8lcFTB-Hqgh_xjGigQVhGzcQl75FwZ0RiuN2WEEHH3bEWR3rO2qQtdOC1QUMbNcphS_hSv7CDRA-25gvEmzLlWjmkTG77NXfNXcEseROwxzxa9-oaeWt6nVvTbj3Gh9G_kyJX0qGO6phMoaVKtl5U3M17E8F5HG15rbaUcRihOLEe2QI4tOif7hhY6OBFJ9u0H_2CyUKOamZrZNKds2W6CrzOgj0zQtzX59yvMLciKL5mCPCXW_Uc9T2iJXR9C471JIHqMWLMHtr2WzLIjqocxHdKHn3OZGh3ZlTh2aPH-6bSQTwt7mA3sJFkZUO-c0Itxqxsn-Ev0lrXjnSJFTMIuQRABOcEmUq6gpWROrDiXsudcLiqOKWIAEF5LInAEmPtnv1kFS4xjQRc8evznpog9ArissY9WEwO6v6kB_Zstl9wAa8TgQ2rYaxYrEtbyxt96FSYZGTNG1iWaJMXZDG8PXwN_DDo4wxfJX2ftoxOXC-IXYLN1ItgkJUSemx1eyzatukIfnGWO8GhP4pkdMzZUdRm2qh9ci_K-hQCqL8H0fW2A5DDvrovNsYXTmsoovgXiWt2zNW2eAWbjbTJqjo1p4Lws8sRyNxs9IeWv8QOE8yBVB6ISfIGukS-DxN9pOj3XKduU85g80UMQK2HZPX9R8HuTgHg1pF8tAqXwLkYEII1bUD4a4wgtYg9a99Mz80qBKNUNYUkD1HE5pQq4CPpcIPoraySL-nQYSIKRKNtmdPe0zifzeOE_CTOmCHgRo0M2a8IrF1_8BoDTKSkbp9Dwt_RX0cgdbVCHAE8SX8M2D6Xo3w9FX-82I2Kp_fbwoyV4Cl6hWL6MYJ_x5BhSPbNAJI-fE0C1m_GraUPVQdCFcIVlrqpwQJdih-UNHLyZPYslJYxJCehPPAg-dqu7ECDIco3b6BU13odhN3fYvZxnDMlRZdfbx-4Rf8JIwdf_5XZEBY5XKf_TCreJOZ9H57v_mLu3cxU41h-cUdgN7s-nJn5yLBkCkMrNR_Y_JElvdTJ3mkSdcS_Kn2tQK39kFXjkMwXXJAbi20LVTC2FU_QG3PByaOJkyv2geek4vg3gEjwZgpTRr2yHoqLc7VidS7QYWvFsoWTKWxSX2ch2G2txsDkwKRbT0q-tySwN6Bh-kRPfM4xA-0WTHIj704o0liDz-t-qMLllK2UOKGsnDC7gxZJIrEvJfjTcJiIuSd_6jIAcd_JLeJD6-dc2NkNwJ1Rp6sGxO4AZKX8yav-zcJB6khiK7-9nrB53Je`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.entries;
    } catch (error) {
      return 
    }
  }
);

const dropboxSlice = createSlice({
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
      });
  },
});


export default dropboxSlice.reducer;
