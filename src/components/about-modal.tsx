"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";

export function AboutModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Info className="h-4 w-4" />
          <span className="sr-only">Acerca de</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Acerca de TasaReal</DialogTitle>
          <DialogDescription>
            Información sobre la aplicación y el desarrollador.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 text-sm text-muted-foreground">
            <p>
                TasaReal es una aplicación web que proporciona tasas de cambio en tiempo real para el Dólar (USD) y el Euro (EUR) frente al Bolívar (VES). Incluye también un práctico convertidor de divisas.
            </p>
            <p>
                El objetivo es ofrecer una herramienta sencilla y confiable para consultar el valor de las divisas.
            </p>
        </div>
        <DialogFooter className="sm:justify-center">
            <p className="text-xs text-muted-foreground">
                Desarrollado con ❤️ por ProgramaGerman
            </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
