export function Footer() {
    return (
        <footer className="border-t py-6">
            <div className="container mx-auto text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} TasaReal. Aplicación de uso gratuito.</p>
                <p className="mt-2">
                    Las tasas de cambio se actualizan periódicamente. La información es solo para fines de referencia.
                </p>
            </div>
        </footer>
    );
}
