import type { Config } from "tailwindcss";
const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	extend: {
    		backgroundColor: {
    			'custom-gradient': 'radial-gradient(circle, #000000, #080911, #0a0c13, #090b11, #000000)'
    		},
    		fontFamily: {
    			geist: 'var(--font-geist-sans)',
    			nova: [
    				'Nova Round'
    			],
    			lucky: [
    				'Luckiest Guy',
    				'cursive'
    			],
    			orbitron: [
    				'Orbitron',
    				'sans-serif'
    			]
    		},
    		colors: {
    			background: '#070707',
    			foreground: '#ffffff',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: '#0066FF',
					foreground: '#ffffff'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
				grey: {
					950: '#000000',
					900: '#0D0D0D',
					850: '#151414',
					800: '#171717',
					700: '#3F3D3D',
					600: '#4A4949',
					500: '#777777',
					400: '#848484',
					200: '#EDEDED',
					100: '#FFFFFF',
				},
				blue: {
					900: '#08101C',
					850: '#01070F',
					800: '#2E353D',
					700: '#08162C',
					600: '#0D1A2E',
					500: '#162F49',
					400: '#0066FF',
					300: '#0A4DB0',
				},
				green: {
					900: '#1A5D40',
					700: '#22C55E',
					500: '#35F998',
					300: '#47FFA4',
				},
				red: {
					900: '#FF0E0E',
					700: '#DF2C2C',
					500: '#FF3737',
					300: '#BC2250',
				},
				others: {
					purple: '#654FC4',
					sky: '#38B6FF',
				},
				boxBackground: '#101010',
				fadedText: '#303030',
				stroke: '#272727'

    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		animation: {
    			fadeIn: 'fadeIn 0.3s ease-out',
    			fadeOut: 'fadeOut 0.3s ease-in',
    			FadeIn: 'fadein 1s ease-in-out forwards',
    			spotlight: 'spotlight 2s ease .75s 1 forwards',
    			shimmer: 'shimmer 4s linear infinite',
    			aurora: 'aurora 60s linear infinite',
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		},
    		keyframes: {
    			shimmer: {
    				from: {
    					'backgroundPosition': '0 0'
    				},
    				to: {
    					'backgroundPosition': '-200% 0'
    				}
    			},
    			aurora: {
    				from: {
    					backgroundPosition: '50% 50%, 50% 50%'
    				},
    				to: {
    					backgroundPosition: '350% 50%, 350% 50%'
    				}
    			},
    			spotlight: {
    				'0%': {
    					opacity: '0',
    					transform: 'translate(-72%, -62%) scale(0.5)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translate(-50%,-40%) scale(1)'
    				}
    			},
    			fadeIn: {
    				'0%': {
    					opacity: '0',
    					transform: 'translateY(-10px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			fadeOut: {
    				'0%': {
    					opacity: '1',
    					transform: 'translateY(0)'
    				},
    				'100%': {
    					opacity: '0',
    					transform: 'translateY(-10px)'
    				}
    			},
    			fadein: {
    				'0%': {
    					opacity: '0.6',
    					transform: ' translateY(30px) translateX(20px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateY(0) translateX(0px)'
    				}
    			},
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
			boxShadow: {
				'button-inner-hover': 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
			},
    	}
    },
	plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}