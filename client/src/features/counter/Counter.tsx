import { Button } from '@mui/material'

import { useAppSelector, useAppDispatch } from 'store/hooks'

import { decrement, increment, incrementByAmount } from './counterSlice'

export function Counter() {
    // The `state` arg is correctly typed as `RootState` already
    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()

    // omit rendering logic
    return (
        <div>
            <div>
                <Button variant="contained" aria-label="Increment value by 10"
                    onClick={() => dispatch(incrementByAmount(10))}>Increment by 10</Button>
                <div className='mt-2'>
                    <Button className='block' variant="contained" aria-label="Increment value by 10"
                        onClick={() => dispatch(increment())}>Increment</Button>
                </div>
                <span className='block'>{count}</span>
                <Button variant="contained" aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}>Decrement</Button>
            </div>
        </div >
    )
}
