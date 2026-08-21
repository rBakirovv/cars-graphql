import { useRef, useState } from 'react';
import type { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

type ConfirmActionModalProps = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Оформление кнопки-триггера. */
  triggerVariant?: React.ComponentProps<typeof Button>['variant'];
  /** Содержимое кнопки-триггера: иконка и текст для скринридера. */
  children: React.ReactNode;
  onConfirm: () => void | Promise<unknown>;
  /** Оформление кнопки-триггера. */
  className?: string;
};

export default function ConfirmActionModal({
  title,
  description,
  confirmLabel = 'Подтвердить',
  cancelLabel = 'Отмена',
  triggerVariant = 'outline',
  children,
  onConfirm,
  className = '',
}: ConfirmActionModalProps) {
  const actionsRef = useRef<DialogPrimitive.Root.Actions>(null);
  const [pending, setPending] = useState(false);

  const handleConfirm = async () => {
    setPending(true);
    try {
      await onConfirm();
      actionsRef.current?.close();
    } catch {
      // Диалог остаётся открытым. Показать ошибку — забота вызывающего
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog actionsRef={actionsRef}>
      <DialogTrigger
        render={
          <Button className={className} variant={triggerVariant} size="icon" />
        }
      >
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" disabled={pending}>
                {cancelLabel}
              </Button>
            }
          />
          <Button onClick={handleConfirm} disabled={pending}>
            {pending && <Spinner data-icon="inline-start" />}
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
