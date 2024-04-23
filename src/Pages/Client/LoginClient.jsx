import React from "react";
import InputMask from "react-input-mask";

export default function LoginCliente() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-white">
      <div className="max-w-xl mx-auto">
        <form className="w-full mt-5">
          <div className="mb-10 space-y-3">
            <div className="space-y-2">
              <label
                htmlFor="cpf"
                className="block text-sm font-medium leading-none"
              >
                Digite seu CPF
              </label>
              <InputMask
                mask="999.999.999-99"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-10 w-full rounded-md border px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                id="cpf"
                placeholder="000.000.000-00"
                name="cpf"
              />
            </div>
          </div>
          <button
            className="w-full h-10 flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md transition-colors hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:pointer-events-none disabled:opacity-50"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
