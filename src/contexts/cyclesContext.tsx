import { createContext, ReactNode, useEffect, useReducer, useState } from "react";

import { differenceInSeconds } from "date-fns";

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
   const [cyclesState, dispatch] = useReducer(
      cyclesReducer, {
         cycles: [],
         activeCycleId: null
      },
      
      (initialState) => {
         const storageStateAsJSON = localStorage.getItem(
            '@ignite-timer:cycles-state-1.0.0'
         )

         if(storageStateAsJSON) {
            return JSON.parse(storageStateAsJSON)
         }

         return initialState
      }
   )

   const { cycles, activeCycleId } = cyclesState

   const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

   const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
      if(activeCycle) {
         return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
      }

      return 0
   })

   useEffect(() => {
      const stateJSON = JSON.stringify(cyclesState)
      
      localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
   }, [cyclesState])
   
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