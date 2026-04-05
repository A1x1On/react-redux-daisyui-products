// import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { RootState, AppDispatch } from '../../app/store'
// import { increment, decrement, incrementByAmount, reset } from './userSlice'

// export function Counter() {
//   const count = useSelector((state: RootState) => state.counter.value)
//   const dispatch = useDispatch<AppDispatch>()

//   return (
//     <div>
//       <h2>Counter: {count}</h2>
//       <button onClick={() => dispatch(increment())}>Increment</button>
//       <button onClick={() => dispatch(decrement())}>Decrement</button>
//       <button onClick={() => dispatch(incrementByAmount(5))}>Add 5</button>
//       <button onClick={() => dispatch(reset())}>Reset</button>
//     </div>
//   )
// }

// export interface Note {
//   id: string;
//   title: string;
//   content: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export type NoteFormData = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
