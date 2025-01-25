import { createContext, ReactNode, useState } from "react";

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
   const [cycles, setCycles] = useState<Cycle[]>([])
   const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
   
   const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

   const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

   function setSecondsPassed(seconds: number) {
      setAmountSecondsPassed(seconds)
   }

   function markCurrentCycleAsFinished() {
      setCycles(state => state.map(cycle => {
         if (cycle.id === activeCycleId) {
            return {...cycle, finishedDate: new Date()}
         }

         else {
            return cycle
         }
      }))
   }

   function createNewCycle(data: CreateCycleData) {
      const newCycle: Cycle = {
         id: String(new Date().getTime()),
         task: data.task,
         minutesAmount: data.minutesAmount,
         startDate: new Date()
      }

      setCycles((state) =>[...state, newCycle])
      setActiveCycleId(newCycle.id)
      setAmountSecondsPassed(0)
      
      // reset()
   }

   function interruptCurrentCycle() {
      setCycles(state => state.map(cycle => {
         if (cycle.id === activeCycleId) {
            return {...cycle, interruptedDate: new Date()}
         }

         else {
            return cycle
         }
      }))

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