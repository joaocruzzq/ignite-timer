import { FormContainer, MinutesAmountInput, TaskInput } from "./styles"

import { useContext } from "react"
import { CyclesContext } from "../.."
import { useFormContext } from "react-hook-form"

export function NewCycleForm() {
   const { activeCycle } = useContext(CyclesContext)
   const { register } = useFormContext()

   return (
      <FormContainer>
         <label htmlFor="task">Vou trabalhar em</label>
         <TaskInput
            id="task"
            type="text"
            list="task-suggestions"
            disabled={!!activeCycle}
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
         />

         <datalist id="task-suggestions">
            <option value="Projeto Ignite Timer" />
         </datalist>

         <label htmlFor="minutesAmount">durante</label>
         <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            disabled={!!activeCycle}
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', {valueAsNumber: true})}
         />

         <span>minutos.</span>
      </FormContainer>
   )
}