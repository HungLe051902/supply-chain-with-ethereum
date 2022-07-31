import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'store'

// Define a type for the slice state
interface ContractState {
    provider: any
}