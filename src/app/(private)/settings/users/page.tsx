import { auth } from '@/auth/auth'

import { ChevronRight } from 'lucide-react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CreateUserSheet } from '@/components/create-user-sheet'
import { UsersManager } from '@/components/users-manager'

import { ability } from '@/auth/casl'

export const metadata: Metadata = {
  title: 'Users',
}

export default async function UsersPage() {
  const session = await auth()

  const permissions = await ability()

  const canCreateUsers = permissions?.can('create', 'User')

  if (!session?.user) {
    notFound()
  }

  return (
    <>
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0 max-w-2xl">
          <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
            <div className="truncate">Configurações</div>
            <ChevronRight className="h-3.5 w-3.5" />
            <div className="text-foreground">Usuários</div>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
              Usuários
            </h1>
            {canCreateUsers && <CreateUserSheet />}
          </div>
          <div className="pb-12 pt-8">
            <UsersManager />
          </div>
        </div>
      </main>
    </>
  )
}
