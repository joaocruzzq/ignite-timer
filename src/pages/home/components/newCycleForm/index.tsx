import { FormContainer, MinutesAmountInput, TaskInput } from "./styles"

import { useForm } from "react-hook-form"

import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const newCycleFormValidationSchema = zod.object({
   task: zod.string().min(1, 'Insforme a tarefa.'),
   minutesAmount: zod.number()
   .min(5, 'O ciclo precisa ser de no mínimo 05 minutos.')
   .max(60, 'O intervalo precisa ser de no máximo 60 minutos.')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
   const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
         task: '',
         minutesAmount: 0
      }
   })
   
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