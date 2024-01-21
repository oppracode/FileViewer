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
            Authorization: `Bearer uat.AEvKij69pxKtuUnzPGtS9dX91XqtN0R-nasCFMv6X3wOtdFlEbObwXgwlDC69CUcs75RHdKU0MbP_w0p7NhNVm-XtSo9V87FL9XzIupHZSiYLf9USumFnA4TsFBIFVR7clCthgStY8rB8Z0ZXMBPpbXm0Jk9mGlNeO8-eU6EbWDRPwfqaskDcapwvJiIJoXfbQw_G2hX5t11X9kAUYOkRpFHD48OQyehj8AwP5axBjFtUkhlwSKr1bZIMp_-ygJbQ6SySotrw5iDswwCemSD1PCH9V92go8Ma8axcjbpe0Khd6DO26zEBUCkbVxjb31ZGq7MaLYpqngusheijZNr1WOE9lrEhEY5CGIWhvXTGRALdJn9UmFjPgIPTg1Fi2M-GVl3-jcHXGc_E3B-QIR0IAfc-tE5rmH6xfWMqnFP5Oj5oOLU1T8OUCuzI1kcqguCdCZaAywZwx8BRKHuVEoRx7QSSZ0fQqSC5iE04F0tYrfzx2TmsEmrN8Laqc1gzPzHShTMGcHnW0ash47fpbAJHLKabpGeh6ULZ5dyMqIkDz6YK9njJlzj1dPkX0M0xeL2um846ponkoLLyiOdbdvKPbhiPmiEGa97RxjwtN2PCJPmMWYmR9AdejotLDIJSXHZSnFX4sjp2sdMuGAAQ2WCS0pGlgk31yStcV6ObhapjjagIQVSAvdVdoA1904E_SEfUgJDt584zyIrCkLohqlrueY-7n14Qq9ZENEPV9yTv8PyWoCMmFDGnGGRaejocmrgcS23aaAVi0GhH2hu3RG0yM83GxjiEsObUjhPWHd9F72FQ-dxKuBnGkDYiG77zpUQilw9d4tspuYlIYaIBiaAQLySX_qKlrtnITzRtDGjnIcgoIrJP1i2TgJyNMiyWnJPt7q6uWOpaWcCf7Fa_Tqj-pQpQslyP9SWdogmgKSia_9ToBbPfPkoyVk5H0FO9sp4qM7ajpsTpawPi0WPZaNJtsCUp54a9c5vj2Pxr5R_dvn2GtFlslU-YXk_maTiasxghWm7IaOrO1IOKWw0IAdlycmwmEvo5ra04EginhlnHZkiG8rvSqtFrIrizgIXOn4SkqFitYUqndKeYWJD7V2H-l08ZQ2d0ozK77fcOsHne8JJ4XI7sjHY0bk0RU9K-5Zpf5kyM5zDZ6PecoVO0DGZfs2BuZ21ydPcTpS1YdYPkMJ6hj_yIDARd0RZVuw02wkEDP0F8CAjq3eaS5fX0O4yp9hSRY-nPSvXk_Ix6QkXdRQJ8s9ail7pSWzNUiOaD_CeFrAOSwyDKx77O15gjurhVym_JGNfnzkWR_kgpa4e10MGXlj2_V70_msdx2i548JqyGyo-iqJOy3kPkr5WyzWO7ZlhpjuA9L03JQqJBDfFH8GzZ_mLy1eEXBBIgHDm4ZJqjHfACO0qNYKzLkdSSu3ofpV`,
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
