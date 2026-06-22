import React, { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import themesConfig from '@/app/_data/Themes';
import GradientBg from '@/app/_data/GradientBg';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles, Palette, Settings, Brush, Check } from 'lucide-react';

const Themes = themesConfig.daisyui.themes.map(theme => ({
    theme,
    primary: getPrimaryColor(theme),
}));

function getPrimaryColor(theme) {
    switch (theme) {
        case "light": return "#ffffff";
        case "dark": return "#1e293b";
        case "cupcake": return "#f8c1e6";
        case "bumblebee": return "#f2d024";
        case "emerald": return "#10b981";
        case "corporate": return "#3b82f6";
        case "synthwave": return "#e11d48";
        case "retro": return "#f43f5e";
        case "cyberpunk": return "#fbbf24";
        case "valentine": return "#ec4899";
        case "halloween": return "#f97316";
        case "garden": return "#84cc16";
        case "forest": return "#22c55e";
        case "aqua": return "#06b6d4";
        case "lofi": return "#64748b";
        case "pastel": return "#f472b6";
        case "fantasy": return "#38bdf8";
        case "wireframe": return "#94a3b8";
        case "black": return "#000000";
        case "luxury": return "#d97706";
        case "dracula": return "#8b5cf6";
        case "cmyk": return "#a855f7";
        case "autumn": return "#b45309";
        case "business": return "#475569";
        case "acid": return "#84cc16";
        case "lemonade": return "#eab308";
        case "night": return "#0f172a";
        case "coffee": return "#78350f";
        case "winter": return "#0ea5e9";
        case "dim": return "#4b5563";
        case "nord": return "#4c566a";
        case "sunset": return "#f43f5e";
        default: return "#94a3b8";
    }
}

function Controller({ selectedTheme, selectedBackground, setSignInEnable, theme = 'light', background = '', signInEnable = false }) {
    const [selectedColor, setSelectedColor] = useState('#10b981');
    const [selectedRadius, setSelectedRadius] = useState('Large');
    const [selectedInputStyle, setSelectedInputStyle] = useState('Outline');

    // Select the best 9 gradients to show
    const bestGradients = GradientBg.slice(0, 9);

    return (
        <div className="space-y-6">
            {/* CARD 1: FORM DESIGN */}
            <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-5 shadow-sm space-y-5">
                <div className="flex items-center gap-2 border-b border-slate-805 pb-3">
                    <Palette className="h-4.5 w-4.5 text-emerald-400" />
                    <h3 className="text-sm font-bold text-slate-200">Form Design</h3>
                </div>

                {/* Theme selection */}
                <div>
                    <label className='text-slate-400 text-xs font-semibold mb-2 block'>Select Theme</label>
                    <Select onValueChange={(value) => selectedTheme(value)} defaultValue={theme}>
                        <SelectTrigger className="w-full text-slate-200 bg-[#0B1020] border-slate-800 rounded-xl focus:ring-1 focus:ring-emerald-500/20">
                            <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#111827] border-slate-800 text-slate-200 rounded-xl">
                            {Themes.map((t, index) => (
                                <SelectItem value={t.theme} key={index} className="hover:bg-slate-800/50">
                                    <div className='flex items-center gap-2.5'>
                                        <div className='h-3.5 w-3.5 rounded-full border border-slate-800 shadow-inner' style={{ backgroundColor: t.primary }}></div>
                                        <span>{t.theme}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Background selector */}
                <div>
                    <label className='text-slate-400 text-xs font-semibold mb-2.5 block'>Select Background</label>
                    <div className='grid grid-cols-3 gap-2.5 cursor-pointer'>
                        {bestGradients.map((bg, index) => {
                            const isSelected = background === bg.gradient || (index === 0 && !background);
                            return (
                                <div 
                                    key={index} 
                                    onClick={() => selectedBackground(bg.gradient)}
                                    className={`w-full h-11 rounded-xl flex items-center justify-center text-[10px] font-semibold tracking-wide transition-all duration-200 hover:scale-105 border ${
                                        isSelected 
                                            ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md shadow-emerald-500/5 text-white' 
                                            : 'border-slate-800/80 hover:border-slate-700 text-slate-400'
                                    }`}
                                    style={{ background: bg.gradient || '#0B1020' }}
                                >
                                    {index === 0 ? 'None' : bg.name}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Typography Selector */}
                <div>
                    <label className="text-slate-400 text-xs font-semibold mb-2 block">Typography</label>
                    <Select defaultValue="sans">
                        <SelectTrigger className="w-full bg-[#0B1020] border-slate-800 text-slate-200 rounded-xl focus:ring-1 focus:ring-emerald-500/20">
                            <SelectValue placeholder="Select typography" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#111827] border-slate-800 text-slate-200 rounded-xl">
                            <SelectItem value="sans" className="font-sans">Sans-Serif (Inter)</SelectItem>
                            <SelectItem value="serif" className="font-serif">Serif (Playfair)</SelectItem>
                            <SelectItem value="mono" className="font-mono text-xs">Monospace (Fira Code)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* CARD 2: FORM SETTINGS */}
            <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-5 shadow-sm space-y-5">
                <div className="flex items-center gap-2 border-b border-slate-805 pb-3">
                    <Settings className="h-4.5 w-4.5 text-indigo-400" />
                    <h3 className="text-sm font-bold text-slate-200">Form Settings</h3>
                </div>

                {/* Clerk authentication required toggle */}
                <div className="flex items-start gap-3 p-1">
                    <Checkbox 
                        id="auth-req" 
                        checked={signInEnable}
                        onCheckedChange={(e) => setSignInEnable(e)}
                        className="mt-1.5 border-slate-700 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    />
                    <div className="grid gap-1 leading-none">
                        <label htmlFor="auth-req" className="text-sm font-bold text-slate-200 cursor-pointer select-none leading-relaxed">
                            Require Authentication
                        </label>
                        <p className="text-[11px] text-slate-500 leading-normal">
                            Require users to sign in via Clerk before form submissions.
                        </p>
                    </div>
                </div>

                {/* Form visibility */}
                <div>
                    <label className="text-slate-400 text-xs font-semibold mb-2 block">Form Visibility</label>
                    <Select defaultValue="public">
                        <SelectTrigger className="w-full bg-[#0B1020] border-slate-800 text-slate-200 rounded-xl focus:ring-1 focus:ring-emerald-500/20">
                            <SelectValue placeholder="Form Visibility" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#111827] border-slate-800 text-slate-200 rounded-xl">
                            <SelectItem value="public">Public (Anyone can view)</SelectItem>
                            <SelectItem value="private">Private (Restricted link)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Submission thank you message */}
                <div>
                    <label className="text-slate-400 text-xs font-semibold mb-2 block">Confirmation Message</label>
                    <input 
                        type="text" 
                        defaultValue="Record Submitted!!!!" 
                        placeholder="e.g. Thanks for submitting!"
                        className="w-full bg-[#0B1020] border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-650 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all duration-200" 
                    />
                </div>
            </div>

            {/* CARD 3: FORM STYLING */}
            <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-5 shadow-sm space-y-5">
                <div className="flex items-center gap-2 border-b border-slate-805 pb-3">
                    <Brush className="h-4.5 w-4.5 text-purple-400" />
                    <h3 className="text-sm font-bold text-slate-200">Form Styling</h3>
                </div>

                {/* Primary theme color dot pickers */}
                <div>
                    <label className="text-slate-400 text-xs font-semibold mb-2.5 block">Primary Color</label>
                    <div className="flex gap-2">
                        {['#10b981', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'].map((c, i) => {
                            const isSelected = selectedColor === c;
                            return (
                                <div 
                                    key={i} 
                                    onClick={() => setSelectedColor(c)}
                                    className={`h-6.5 w-6.5 rounded-full cursor-pointer transition-all border flex items-center justify-center ${
                                        isSelected 
                                            ? 'ring-2 ring-emerald-500/20 border-emerald-500 scale-110 text-white' 
                                            : 'border-slate-800/80 hover:scale-105 text-transparent'
                                    }`}
                                    style={{ backgroundColor: c }}
                                >
                                    {isSelected && <Check className="h-3 w-3" />}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Border radius selector */}
                <div>
                    <label className="text-slate-400 text-xs font-semibold mb-2 block">Border Radius</label>
                    <div className="grid grid-cols-4 gap-2">
                        {['None', 'Small', 'Medium', 'Large'].map((r) => {
                            const isSelected = selectedRadius === r;
                            return (
                                <div 
                                    key={r} 
                                    onClick={() => setSelectedRadius(r)}
                                    className={`text-center py-1.5 text-xs font-semibold rounded-lg border cursor-pointer transition-all ${
                                        isSelected 
                                            ? 'bg-slate-800 border-slate-700 text-white font-bold' 
                                            : 'bg-[#0B1020] border-slate-800/80 text-slate-400 hover:text-white'
                                    }`}
                                >
                                    {r}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Input Style selector */}
                <div>
                    <label className="text-slate-400 text-xs font-semibold mb-2 block">Input Border Style</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['Outline', 'Filled', 'Underline'].map((s) => {
                            const isSelected = selectedInputStyle === s;
                            return (
                                <div 
                                    key={s} 
                                    onClick={() => setSelectedInputStyle(s)}
                                    className={`text-center py-1.5 text-xs font-semibold rounded-lg border cursor-pointer transition-all ${
                                        isSelected 
                                            ? 'bg-slate-800 border-slate-700 text-white font-bold' 
                                            : 'bg-[#0B1020] border-slate-800/80 text-slate-400 hover:text-white'
                                    }`}
                                >
                                    {s}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Controller;

