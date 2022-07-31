import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store";

// Define a type for the slice state
interface WalletState {
  provider: any;
  accountAddress: string;
  balance: number;
}

const initialState: WalletState = {
  provider: null,
  accountAddress: "",
  balance: 0,
};

export const walletSlice = createSlice({
  name: "wallet",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveWalletInfo: (state, action: PayloadAction<any>) => {
        console.log("vào updateContract nhé");
        
      state.provider = action.payload.provider;
      state.accountAddress = action.payload.accountAddress;
      state.balance = action.payload.balance;
    },
  },
});

export const { saveWalletInfo } = walletSlice.actions;

export const selectProvider = (state: RootState) => state.wallet.provider;
export const selectWalletAddress = (state: RootState) => state.wallet.accountAddress;
export const selectWalletBalance = (state: RootState) => state.wallet.balance;

export default walletSlice.reducer;
