"use client"

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"

const theme = createTheme({
    palette: {
        mode: "light", // ダークモードにしたいときは "dark"
    },
})

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
            <div className="h-6 flex items-center justify-between text-caption">
                <p>Copyright © 2021 Sample</p>
                <p>運営会社</p>
            </div>
        </ThemeProvider>
    )
}