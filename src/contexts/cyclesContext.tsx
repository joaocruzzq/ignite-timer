import { createContext, ReactNode, useReducer, useState } from "react";

interface CreateCycleData {
   task: string
   minutesAmount: number
}

interface Cycle {
   id: string
   task: string
   minutesAmount: number

   startDate: Date
   finishedDate?: Date
   interruptedDate?: Date
}

interface CyclesContextType {
   cycles: Cycle[]
   amountSecondsPassed: number
   activeCycleId: string | null
   activeCycle: Cycle | undefined

   markCurrentCycleAsFinished: () => void
   setSecondsPassed: (seconds: number) => void

   interruptCurrentCycle: () => void
   createNewCycle: (data: CreateCycleData) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
   children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
   const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
      if(action.type === 'ADD_NEW_CYCLE') {
         return [...state, action.payload.newCycle]
      }

      return state
   }, [])

   const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
   
   const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

   const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

   function setSecondsPassed(seconds: number) {
      setAmountSecondsPassed(seconds)
   }

   function markCurrentCycleAsFinished() {
      // setCycles(state => state.map(cycle => {
      //    if (cycle.id === activeCycleId) {
      //       return {...cycle, finishedDate: new Date()}
      //    }

      //    else {
      //       return cycle
      //    }
      // }))

      dispatch({
         type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
         payload: {
            activeCycleId
         }
      })
   }

   function createNewCycle(data: CreateCycleData) {
      const newCycle: Cycle = {
         id: String(new Date().getTime()),
         task: data.task,
         minutesAmount: data.minutesAmount,
         startDate: new Date()
      }

      dispatch({
         type: 'ADD_NEW_CYCLE',
         payload: {
            newCycle
         }
      })

      // setCycles((state) =>[...state, newCycle])
      setActiveCycleId(newCycle.id)
      setAmountSecondsPassed(0)
   }

   function interruptCurrentCycle() {
      // setCycles(state => state.map(cycle => {
      //    if (cycle.id === activeCycleId) {
      //       return {...cycle, interruptedDate: new Date()}
      //    }

      //    else {
      //       return cycle
      //    }
      // }))

      dispatch({
         type: 'INTERRUPT_CURRENT_CYCLE',
         payload: {
            activeCycleId
         }
      })

      setActiveCycleId(null)
   }

   return (
      <CyclesContext.Provider
         value={{
            cycles,
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            createNewCycle,
            setSecondsPassed,
            interruptCurrentCycle,
            markCurrentCycleAsFinished,
         }}
      >
         {children}
      </CyclesContext.Provider>
   )
}