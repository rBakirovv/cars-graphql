import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRef } from 'react';
import type { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import AddCarForm from './AddCarForm';

export default function AddCarModal() {
  // Диалог остаётся неуправляемым, наружу отдаётся только ручка закрытия.
  const actionsRef = useRef<DialogPrimitive.Root.Actions>(null);

  return (
    <Dialog actionsRef={actionsRef}>
      <DialogTrigger render={<Button variant="outline" size="icon" />}>
        <Plus strokeWidth={2.5} />
        <span className="sr-only">Добавить автомобиль</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить автомобиль</DialogTitle>
        </DialogHeader>

        {/* Форма "Добавить автомобиль" */}
        <AddCarForm onSuccess={() => actionsRef.current?.close()} />
      </DialogContent>
    </Dialog>
  );
}
