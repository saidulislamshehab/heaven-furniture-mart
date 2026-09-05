import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ConsultationDialog, type ConsultationPrefill } from '@/components/common/ConsultationDialog'
import { lockScroll } from '@/lib/scroll'

interface ConsultationContextValue {
  open: (prefill?: ConsultationPrefill) => void
}

const ConsultationContext = createContext<ConsultationContextValue | null>(null)

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [prefill, setPrefill] = useState<ConsultationPrefill | undefined>()

  const open = useCallback((p?: ConsultationPrefill) => {
    setPrefill(p)
    setIsOpen(true)
  }, [])

  const value = useMemo(() => ({ open }), [open])

  useEffect(() => {
    lockScroll(isOpen)
  }, [isOpen])

  return (
    <ConsultationContext.Provider value={value}>
      {children}
      <ConsultationDialog open={isOpen} onOpenChange={setIsOpen} prefill={prefill} />
    </ConsultationContext.Provider>
  )
}

export function useConsultation() {
  const ctx = useContext(ConsultationContext)
  if (!ctx) throw new Error('useConsultation must be used within ConsultationProvider')
  return ctx
}
