
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
        // =~= Theme Properties =~=
        "--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
        "--theme-font-family-heading": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
        "--theme-font-color-base": "0 0 0",
        "--theme-font-color-dark": "255 255 255",
        "--theme-rounded-base": "4px",
        "--theme-rounded-container": "6px",
        "--theme-border-base": "0px",
        // =~= Theme On-X Colors =~=
        "--on-primary": "255 255 255",
        "--on-secondary": "var(--color-primary-50)",
        "--on-tertiary": "255 255 255",
        "--on-success": "255 255 255",
        "--on-warning": "255 255 255",
        "--on-error": "255 255 255",
        "--on-surface": "255 255 255",
        // =~= Theme Colors  =~=
        // primary | #0071eb 
        "--color-primary-50": "217 234 252", // #d9eafc
        "--color-primary-100": "204 227 251", // #cce3fb
        "--color-primary-200": "191 220 250", // #bfdcfa
        "--color-primary-300": "153 198 247", // #99c6f7
        "--color-primary-400": "77 156 241", // #4d9cf1
        "--color-primary-500": "0 113 235", // #0071eb
        "--color-primary-600": "0 102 212", // #0066d4
        "--color-primary-700": "0 85 176", // #0055b0
        "--color-primary-800": "0 68 141", // #00448d
        "--color-primary-900": "0 55 115", // #003773
        // secondary | #404f96 
        "--color-secondary-50": "226 229 239", // #e2e5ef
        "--color-secondary-100": "217 220 234", // #d9dcea
        "--color-secondary-200": "207 211 229", // #cfd3e5
        "--color-secondary-300": "179 185 213", // #b3b9d5
        "--color-secondary-400": "121 132 182", // #7984b6
        "--color-secondary-500": "64 79 150", // #404f96
        "--color-secondary-600": "58 71 135", // #3a4787
        "--color-secondary-700": "48 59 113", // #303b71
        "--color-secondary-800": "38 47 90", // #262f5a
        "--color-secondary-900": "31 39 74", // #1f274a
        // tertiary | #474667 
        "--color-tertiary-50": "227 227 232", // #e3e3e8
        "--color-tertiary-100": "218 218 225", // #dadae1
        "--color-tertiary-200": "209 209 217", // #d1d1d9
        "--color-tertiary-300": "181 181 194", // #b5b5c2
        "--color-tertiary-400": "126 126 149", // #7e7e95
        "--color-tertiary-500": "71 70 103", // #474667
        "--color-tertiary-600": "64 63 93", // #403f5d
        "--color-tertiary-700": "53 53 77", // #35354d
        "--color-tertiary-800": "43 42 62", // #2b2a3e
        "--color-tertiary-900": "35 34 50", // #232232
        // success | #289562 
        "--color-success-50": "223 239 231", // #dfefe7
        "--color-success-100": "212 234 224", // #d4eae0
        "--color-success-200": "201 229 216", // #c9e5d8
        "--color-success-300": "169 213 192", // #a9d5c0
        "--color-success-400": "105 181 145", // #69b591
        "--color-success-500": "40 149 98", // #289562
        "--color-success-600": "36 134 88", // #248658
        "--color-success-700": "30 112 74", // #1e704a
        "--color-success-800": "24 89 59", // #18593b
        "--color-success-900": "20 73 48", // #144930
        // warning | #a18f1b 
        "--color-warning-50": "241 238 221", // #f1eedd
        "--color-warning-100": "236 233 209", // #ece9d1
        "--color-warning-200": "232 227 198", // #e8e3c6
        "--color-warning-300": "217 210 164", // #d9d2a4
        "--color-warning-400": "189 177 95", // #bdb15f
        "--color-warning-500": "161 143 27", // #a18f1b
        "--color-warning-600": "145 129 24", // #918118
        "--color-warning-700": "121 107 20", // #796b14
        "--color-warning-800": "97 86 16", // #615610
        "--color-warning-900": "79 70 13", // #4f460d
        // error | #e53434 
        "--color-error-50": "251 225 225", // #fbe1e1
        "--color-error-100": "250 214 214", // #fad6d6
        "--color-error-200": "249 204 204", // #f9cccc
        "--color-error-300": "245 174 174", // #f5aeae
        "--color-error-400": "237 113 113", // #ed7171
        "--color-error-500": "229 52 52", // #e53434
        "--color-error-600": "206 47 47", // #ce2f2f
        "--color-error-700": "172 39 39", // #ac2727
        "--color-error-800": "137 31 31", // #891f1f
        "--color-error-900": "112 25 25", // #701919
        // surface | #565469 
        "--color-surface-50": "230 229 233", // #e6e5e9
        "--color-surface-100": "221 221 225", // #dddde1
        "--color-surface-200": "213 212 218", // #d5d4da
        "--color-surface-300": "187 187 195", // #bbbbc3
        "--color-surface-400": "137 135 150", // #898796
        "--color-surface-500": "86 84 105", // #565469
        "--color-surface-600": "77 76 95", // #4d4c5f
        "--color-surface-700": "65 63 79", // #413f4f
        "--color-surface-800": "52 50 63", // #34323f
        "--color-surface-900": "42 41 51", // #2a2933

    }
}