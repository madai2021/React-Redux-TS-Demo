import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "./apiService";

export function createApiThunk<T>(
  typePrefix: string,
  url: string,
  options?: RequestInit
) {
  // createAsyncThunkは内部で .pending/.fulfilled/.rejected を dispatch してくれる
  // async付けるのは内部でtry -catchを使えるようにするため(公式の使い方でもasync付けるの推奨)
  return createAsyncThunk<T>(typePrefix, async () => {
    return apiRequest<T>(url, options);
  });
}
