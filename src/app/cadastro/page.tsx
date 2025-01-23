'use client'
import { createUser } from "@/service/userService";
import { ChangeEvent, FormEvent, useState } from "react";
import { User } from "../models/User";

export default function Cadastro() {

    const [formData, setFormData] = useState<User>({
        name: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await createUser(formData);
            setMessage("Usuário cadastrado com sucesso");
            console.log("Resposta da API", response);            
        } catch (error) {
            setMessage("Erro ao cadastrar usuário");
            console.error("Erro ao cadastrar usuário", error);
        }
    }

    return (
        <main>
            <div>
                <h1>Cadastro</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nome"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
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