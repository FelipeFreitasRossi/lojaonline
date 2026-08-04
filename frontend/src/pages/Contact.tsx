import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <main className="pt-24 pb-12 container mx-auto px-4 sm:px-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-[#c9a94e] transition-colors mb-8"
      >
        <ArrowLeft size={20} /> Voltar
      </Link>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-8">
        Contato
      </h1>
      <div className="gold-rule mx-auto mb-8" />
      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
            <Mail size={24} className="text-[#c9a94e]" />
            <div>
              <h3 className="font-semibold">E-mail</h3>
              <p className="text-gray-600">contato@santopresentesc.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
            <Phone size={24} className="text-[#c9a94e]" />
            <div>
              <h3 className="font-semibold">Telefone</h3>
              <p className="text-gray-600">(11) 99999-9999</p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
            <MapPin size={24} className="text-[#c9a94e]" />
            <div>
              <h3 className="font-semibold">Endereço</h3>
              <p className="text-gray-600">Rua das Flores, 123 - Centro</p>
            </div>
          </div>
        </div>
        <form className="bg-white p-8 rounded-xl shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input type="text" className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input type="email" className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
            <textarea rows={4} className="input resize-none" />
          </div>
          <button
            type="submit"
            className="btn-gold text-black font-bold px-8 py-3 rounded-full shadow-2xl hover:shadow-2xl transition-all duration-300 text-base tracking-wider hover:scale-105 w-full"
          >
            Enviar
          </button>
        </form>
      </div>
    </main>
  );
};

export default Contact;