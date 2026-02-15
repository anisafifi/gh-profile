'use client'

import { CheckCheckIcon, TruckIcon } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { validateGitHubUsername } from '../../validateGitHub'

// ---------------------------------------------------------------

const FormSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .regex(/^[a-zA-Z0-9-]+$/, { message: 'Please enter a valid Github username.' })
})

export function SearchForm() {
  const router = useRouter()
  const [isValidating, setIsValidating] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { username: '' }
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { username } = data

    setIsValidating(true)

    toast(
      <div className='flex items-center gap-2'>
        <TruckIcon className='size-5.5 shrink-0' />
        Searching for <strong> <i>{username}</i></strong>...
      </div>
    )

    // Validate username exists on GitHub before navigating
    const isValid = await validateGitHubUsername(username)

    setIsValidating(false)

    if (!isValid) {
      toast.error(
        <div className='flex items-center gap-2'>
          <span>Username <strong>{username}</strong> not found on GitHub</span>
        </div>
      )
      form.setError('username', {
        type: 'manual',
        message: 'This GitHub username does not exist'
      })
      return
    }

    // Success - username exists, navigate to user page
    toast.success(
      <div className='flex items-center gap-2'>
        <CheckCheckIcon className='size-5.5 shrink-0' />
        Found <strong>{username}</strong>!
      </div>
    )

    router.push(`/${username}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-xs space-y-6'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Github Username:</FormLabel>
              <FormControl>
                <Input placeholder='Github username' {...field} />
              </FormControl>
              <FormDescription>Enter your Github username to search.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant='default' type='submit' disabled={isValidating}>
          {isValidating ? 'Validating...' : 'Search'}
        </Button>
      </form>
    </Form>
  )
}