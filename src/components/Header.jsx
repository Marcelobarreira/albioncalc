import React from "react";
import albionLogo from "../assets/albion.png";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 shadow-md border-b-4 border-amber-600">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={albionLogo}
            alt="Albion Craft"
            className="w-12 h-12 rounded shadow-md ring-2 ring-amber-500"
          />
          <h1 className="text-3xl font-bold text-amber-300 font-serif tracking-wide">
            Albionzada DaniloBixa
          </h1>
        </div>

        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-amber-200 hover:text-white transition font-medium">
            Craft
          </a>
          {/* 
          <a href="#" className="text-amber-200 hover:text-white transition font-medium">
            Receitas
          </a>
          <a href="#" className="text-amber-200 hover:text-white transition font-medium">
            Sobre
          </a> 
          */}
        </nav>
      </div>
    </header>
  );
}
