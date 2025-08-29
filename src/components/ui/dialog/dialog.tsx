import { Button } from "@src/components/ui/button"
import {
  Dialog as DialogComponent,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@src/components/ui/dialog/base/dialog"
import { Input } from "@src/components/ui/input"

export type DialogProps = {
  show: boolean
  onClose?(): void
}

export function Dialog(props: DialogProps) {
  function handleClose(show: boolean) {
    if (!show) props.onClose?.()
  }

  return (
    <DialogComponent open={props.show} onOpenChange={handleClose}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <label htmlFor="name-1">Name</label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <label htmlFor="username-1">Username</label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="transparent">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </DialogComponent>
  )
}
