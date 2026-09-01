import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle2, Phone, MapPin } from 'lucide-react'

interface ConsultationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ConsultationDialog({
  open,
  onOpenChange,
}: ConsultationDialogProps) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    spaceType: 'Living Room',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      // Auto close after 3 seconds on submit
      // onOpenChange(false)
    }, 3000)
  }

  const handleReset = () => {
    setSubmitted(false)
    setFormData({
      name: '',
      phone: '',
      email: '',
      spaceType: 'Living Room',
      notes: '',
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val)
        if (!val) setSubmitted(false)
      }}
    >
      <DialogContent className="max-w-xl border-[#B08A45]/30 bg-[#172322] text-[#F5F1E8] p-8 shadow-2xl">
        {submitted ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#B08A45] bg-[#1F2E2D]">
              <CheckCircle2 className="h-8 w-8 text-[#B08A45]" />
            </div>
            <h3 className="font-serif text-3xl text-stone-100">
              Consultation Requested
            </h3>
            <p className="mt-2 max-w-md font-sans text-sm text-stone-300">
              Thank you for connecting with Heaven Furniture Mart. Our senior
              interior styling director will reach out within 24 hours to begin
              shaping your bespoke space.
            </p>
            <div className="mt-6 flex flex-col gap-2 rounded-sm border border-white/10 bg-black/20 p-4 text-xs text-stone-400">
              <span className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#B08A45]" /> +880 1960-481983
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#B08A45]" /> Agrabad Access Road, Chattogram
              </span>
            </div>
            <Button
              variant="outline"
              onClick={handleReset}
              className="mt-6 border-[#B08A45]/50 text-[#F5F1E8] hover:bg-[#B08A45]/20"
            >
              Submit Another Inquiry
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="Heaven Furniture Mart"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <DialogTitle className="font-serif text-3xl text-stone-100 sm:text-4xl">
                Start Your Design Journey
              </DialogTitle>
              <DialogDescription className="font-sans text-sm text-stone-300">
                Share your space requirements and vision. We will prepare an
                exclusive design consultation tailored to your taste and dimensions.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-left">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-medium tracking-wider text-stone-300 uppercase">
                    Your Full Name *
                  </label>
                  <Input
                    required
                    placeholder="e.g. Tariq Rahman"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="border-white/15 bg-black/30 text-stone-100 placeholder:text-stone-500 focus:border-[#B08A45]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-medium tracking-wider text-stone-300 uppercase">
                    Phone Number *
                  </label>
                  <Input
                    required
                    type="tel"
                    placeholder="+880 1..."
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="border-white/15 bg-black/30 text-stone-100 placeholder:text-stone-500 focus:border-[#B08A45]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-medium tracking-wider text-stone-300 uppercase">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="border-white/15 bg-black/30 text-stone-100 placeholder:text-stone-500 focus:border-[#B08A45]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-medium tracking-wider text-stone-300 uppercase">
                    Space / Environment
                  </label>
                  <select
                    value={formData.spaceType}
                    onChange={(e) =>
                      setFormData({ ...formData, spaceType: e.target.value })
                    }
                    className="w-full h-9 rounded-md border border-white/15 bg-black/30 px-3 py-1 text-sm text-stone-100 focus:border-[#B08A45] focus:outline-none"
                  >
                    <option value="Living Room" className="bg-[#172322]">Living Room & Lounge</option>
                    <option value="Master Bedroom" className="bg-[#172322]">Master Bedroom Suite</option>
                    <option value="Dining Room" className="bg-[#172322]">Dining & Hosting Space</option>
                    <option value="Executive Office" className="bg-[#172322]">Executive Office & Study</option>
                    <option value="Full Residence Bespoke" className="bg-[#172322]">Full Residence Bespoke Interior</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-xs font-medium tracking-wider text-stone-300 uppercase">
                  Tell us about your space or vision
                </label>
                <textarea
                  rows={3}
                  placeholder="Dimensions, preferred wood tones, or specific requirements..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full rounded-md border border-white/15 bg-black/30 p-3 text-sm text-stone-100 placeholder:text-stone-500 focus:border-[#B08A45] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-stone-400">
                  Showroom: Agrabad Access Road, Chattogram
                </span>
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-[#B08A45] hover:bg-[#977334] text-[#141F1E] font-medium tracking-wider uppercase px-6"
                >
                  Request Consultation
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
