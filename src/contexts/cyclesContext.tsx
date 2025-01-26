import { createContext, ReactNode, useReducer, useState } from "react";


import { Cycle, cyclesReducer } from "../reducers/cycles/reducer"
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";

interface CreateCycleData {
   task: string
   minutesAmount: number
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
   const [cyclesState, dispatch] = useReducer(cyclesReducer, {
      cycles: [],
      activeCycleId: null
   })

   const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
   
   const { cycles, activeCycleId } = cyclesState

   const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

   function setSecondsPassed(seconds: number) {
      setAmountSecondsPassed(seconds)
   }

   function markCurrentCycleAsFinished() {
      dispatch(markCurrentCycleAsFinishedAction())
   }

   function createNewCycle(data: CreateCycleData) {
      const newCycle: Cycle = {
         id: String(new Date().getTime()),
         task: data.task,
         minutesAmount: data.minutesAmount,
         startDate: new Date()
      }

      dispatch(addNewCycleAction(newCycle))

      setAmountSecondsPassed(0)
   }

   function interruptCurrentCycle() {
      dispatch(interruptCurrentCycleAction())
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