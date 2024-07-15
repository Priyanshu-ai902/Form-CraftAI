import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import themesConfig from '@/app/_data/themes';


const Themes = themesConfig.daisyui.themes.map(theme => ({
    theme,
    primary: getPrimaryColor(theme),
}));


function getPrimaryColor(theme) {
    switch (theme) {
        case "light": return "#ffffff";
        case "dark": return "#000000";
        case "cupcake": return "#f8c1e6";
        case "bumblebee": return "#f2d024";
        case "emerald": return "#50c878";
        case "corporate": return "#4b5563";
        case "synthwave": return "#ff8c00";
        case "retro": return "#ef476f";
        case "cyberpunk": return "#ff6f61";
        case "valentine": return "#e91e63";
        case "halloween": return "#ff7518";
        case "garden": return "#6b8e23";
        case "forest": return "#228b22";
        case "aqua": return "#00ffff";
        case "lofi": return "#808080";
        case "pastel": return "#ffcbf2";
        case "fantasy": return "#ffa6c9";
        case "wireframe": return "#d3d3d3";
        case "black": return "#000000";
        case "luxury": return "#a0d9d9";
        case "dracula": return "#ff5555";
        case "cmyk": return "#00ffff";
        case "autumn": return "#d2691e";
        case "business": return "#5f6368";
        case "acid": return "#b0ff00";
        case "lemonade": return "#ffef00";
        case "night": return "#0f172a";
        case "coffee": return "#6f4e37";
        case "winter": return "#00bfff";
        case "dim": return "#696969";
        case "nord": return "#a3be8c";
        case "sunset": return "#fd5e53";
        default: return "#cccccc";
    }
}

function Controller({selectedTheme}) {

    return (
        <div>
            <h2 className='my-1'>Select Theme</h2>
            <Select onValueChange={(value)=>selectedTheme(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    {Themes.map((theme, index) => (
                        <SelectItem value={theme.theme} key={index}>
                            <div className='flex items-center'>
                                <div className='h-5 w-5 mr-2' style={{ backgroundColor: theme.primary }}></div>
                                <span>{theme.theme}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export default Controller;
