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
            Authorization: `Bearer uat.AEvwWXSHF9PeNJFu-TS9Jte_Lo4VtWgZfIAJyCSMSBYfsSz1Dh81cNc77RAYrXUhe45mWwAAvSACiIeeTWz6YrZgl7aYCjSQ6Y-WhnhF-5-K-d5WiuKwF265AydGo9s1jDtfYy2CLb4kqzBbbSKoilv2YFNjMhOx_9tg2JAmGpPMEPp5TwYxPLQwhjscdoiWDZzmt2D31BVHKAWKYnq6YJ_uNKRyn3jKfYsMu7rbJc00hD7H1i2O0XJK-hylcmGiyqOFL8RLzSEFxb8Ne53-tXckI8U9LcQ6JD2iVf88YSKfZ32bubVoOmiviLwD1iZY7FbOMTff6b51MHwtF3UgCSDof4fBptg6H88mkquiT5mT7JFKXpJvSGSEr_G3LnGVt8y__CT84hpJ89xqsa04og9hPMoIoV8LUocNHO4vhsjEeyMeLRSxcI7d6ktT-AWNpkH3nT7L5Ixprs5XQ7eML8Uyv9lCTggMwiyOj6RHzkXJ24KxexdtG3tzw-VGsKRoX1WCtrF2y2IsCOtN_e0DYdNd7TtAmn7aXokSHBUjHgadySZQq_fx5gRBG1HUz-WHki0yz6rq7-CkNF0R0alEYDthHsp64Z8eZ-uUhaa6Yhp_7Bw4eZFvqY0-Uf1MzXc4h_F4CM5rzvGBg3SZwMqLpk_9-aVv7tTR7jtdYVypp0MyntkrIDwW4Vq_AHjBZn0SAWf-6B_wSwCz6xRvnwBTAHS0UwnpjBhV1IvHWD03OUgjmwx2x7fT24VssSE1qohDvPoipjolvjMdV5JJFxjBD061oLaSmRKHP99lVudua03ZUlC22RHxdPI62YFWbPuBJPg0h7Sb8r3dYLQtIL-ldr3EVWhM8z51StRRNhTHjYFeacfRUsy1Ra2I44QGcOYoS9Wc7TRrsK2UMui9E5TW2Ix7xvBkfCs3snhMYlj0G3RXoB116hrPxkcz3vk7g82thuwz9zbnoWOnuKDV5zgbLR5-TnWmdfJqzQfYKq89z_sCy8X5TQeXhi3M6Usg1vdrhhuXCR5J-iUq2PhjIu38ghBe4_fkWtBaBBrAbzj-0HuimZGIK49ao01Gck0wo6J-7IushicoINZi1l9FfPkTqcPaSTP063vLlMlF-XCb9EDsvtZpQ4yIGGeSVTuHAUat70EUbgeWB-QFfUgd-TG6PPDwhdEDMyoEFyatseB1QumCjc5K8Sfc0ZI8ngSyTpjrrWlo6RLyfhxpRmkQOLitF8AyjDSkYhaXaxaIDnoGJfh7d7mnRUd7Uqe32T9ITfnu2E-nIpYURaCyHvz99pGxZb3RViDgz43y6hidbXmRkvmIaXuSHa5m8D__gXS5J_3coTywMa1TQjbu57fT-StFPhonuRblreXG9UHTz2tJLLgwkNBvNH46LcQ1oN5XMtRCcx55f86l9d2_Lwwx0gVQWDN_`,
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
