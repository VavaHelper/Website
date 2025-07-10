import Link from "next/link";
import Image from 'next/image';

// Escrever temporariamente em pt-br
export default function Login() {
    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            {/* Screen 1: Left side with background image and logo */}
            {/* <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative" style={{ backgroundImage: "url('/imgs/login.png')" }}>
                <div className="absolute top-8 left-8 flex items-center space-x-2">
                    <Link href="/home">
                        <Image
                            src="/imgs/favicon.png"
                            alt="avaHelper"
                            width={33}
                            height={21}
                            className="brightness-0 invert"
                        />
                    </Link>
                    <Link href="/home">
                        <h1 className="text-white text-2xl font-bold">avaHelper</h1>
                    </Link>
                </div>
            </div> */}
            <div className="hidden lg:flex w-1/2 bg-red-500 relative">
                {/* Logo no canto superior esquerdo */}
                <div className="absolute top-8 left-8 flex items-center space-x-2">
                    <Link href="/home">
                    <Image
                        src="/imgs/favicon.png"
                        alt="avaHelper"
                        width={33}
                        height={21}
                        className="brightness-0 invert"
                    />
                    </Link>
                    <Link href="/home">
                        <h1 className="text-white text-2xl font-bold">avaHelper</h1>
                    </Link>
                </div>

                {/* Imagem no canto inferior direito */}
                <Image
                    src="/imgs/login_no_background.png"
                    alt="login"
                    width={550}
                    height={400}
                    className="absolute bottom-0 right-0 drop-shadow-lg"
                />
            </div>


            {/* Screen 2: Right side with login form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-black">
                {/* Header Logo for mobile */}
                <div className="flex items-center space-x-2 mb-6 lg:hidden">
                    <Link href="/home">
                        <Image
                            src="/imgs/favicon.png"
                            alt="avaHelper"
                            width={33}
                            height={21}
                            className="brightness-0 invert"
                        />
                    </Link>
                    <Link href="/home">
                        <h1 className="text-white-900 text-2xl font-bold">avaHelper</h1>
                    </Link>
                </div>

                <h2 className="text-3xl font-semibold text-white-900 mb-8">LOGIN</h2>

                {/* Form */}
                <div className="w-full max-w-md space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Digite seu e-mail"
                            required
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Digite sua senha"
                            required
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                            <input
                                type="checkbox"
                                id="remember"
                                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            Lembrar de mim
                        </label>
                        <a href="/forgot-password" className="text-sm text-red-500 hover:underline">Esqueceu a senha?</a>
                    </div>

                    <button
                        type="button"
                        className="w-full text-white py-2 rounded-md bg-red-500 hover:bg-red-600 transition-colors"
                    >
                        Entrar
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <h1 className="text-sm text-white-600">
                        Não tem uma conta?{' '}
                        <a href="/register" className="text-red-500 hover:underline">Inscreva-se</a>
                    </h1>
                </div>
            </div>
        </div>
    );
}