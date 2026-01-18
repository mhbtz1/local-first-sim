import { useEffect, useRef } from 'react';
import SocketWorker from '../worker/socket-handler?worker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
    value: z.number()
})


export const Dispatcher = () => {
    const workerRef = useRef<Worker>(null)
    const wsRef = useRef<WebSocket>(null);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            value: 0
        }
    })

    useEffect( () => {
        workerRef.current = new Worker('worker.js')
        wsRef.current = new WebSocket(import.meta.env.VITE_API_URL)

        workerRef.current.onmessage = (e) => {
            console.log(`Received message from worker: ${e.data}`)
        }
    }, [])

    window.addEventListener('worker-respond', (e: Event) => {
        console.log(`e: ${JSON.stringify(e)}`)
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const event = new CustomEvent("worker", {
            detail: {
                value: data.value
            }
        })
        window.postMessage(event)
    }


    return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Bug Report</CardTitle>
        <CardDescription>
          Help us improve by reporting bugs you encounter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="worker-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="value"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="value">
                    Bug Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="value"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
    )
}