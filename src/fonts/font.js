import localFont from "next/font/local";

export const barlow = localFont({
    src: [
        {
            path: "./barlow/barlow-condensed-v13-latin-300.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "./barlow/barlow-condensed-v13-latin-regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "./barlow/barlow-condensed-v13-latin-500.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "./barlow/barlow-condensed-v13-latin-600.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "./barlow/barlow-condensed-v13-latin-700.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "./barlow/barlow-condensed-v13-latin-800.woff2",
            weight: "800",
            style: "normal",
        },
        {
            path: "./barlow/barlow-condensed-v13-latin-900.woff2",
            weight: "900",
            style: "normal",
        },
    ],
    variable: "--font-barlow",
    display: "swap",
});

export const outfit = localFont({
    src: [
        {
            path: "./outfit/outfit-v15-latin-300.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "./outfit/outfit-v15-latin-regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "./outfit/outfit-v15-latin-500.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "./outfit/outfit-v15-latin-600.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "./outfit/outfit-v15-latin-700.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "./outfit/outfit-v15-latin-800.woff2",
            weight: "800",
            style: "normal",
        },
        {
            path: "./outfit/outfit-v15-latin-900.woff2",
            weight: "900",
            style: "normal",
        },
    ],
    variable: "--font-outfit",
    display: "swap",
});

export const sacramento = localFont({
    src: [
        {
            path: "./sacramento/sacramento-v17-latin-regular.woff2",
            weight: "400",
            style: "normal",
        },
    ],
    variable: "--font-sacramento",
    display: "swap",
});