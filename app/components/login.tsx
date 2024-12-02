"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      login: login,
      senha: senha,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect,
    };

    try {
      const response = await fetch("https://leilao-project-deploy.onrender.com/login", requestOptions);

      if (response.ok) {
        const data = await response.json();
        console.log("Usuário autenticado:", data);

        // Armazena o token no cookie
        Cookies.set("authToken", data.token, { expires: 1 });

        // Redirecionar para a página de produtos
        router.push("/products");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      setError("Ocorreu um erro ao conectar-se ao servidor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 border border-gray-400 rounded-lg shadow-md mt-8 bg-gray-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="login" className="block text-sm font-medium text-gray-900 mb-2">
            Login:
          </label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-400 rounded-lg text-gray-900 placeholder-gray-700 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="senha" className="block text-sm font-medium text-gray-900 mb-2">
            Senha:
          </label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-400 rounded-lg text-gray-900 placeholder-gray-700 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-200"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
