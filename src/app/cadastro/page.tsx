'use client'
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Cadastro() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <main>
            <div>
                <h1>Cadastro</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        value={formData.nome}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email" placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </main>
    );
}