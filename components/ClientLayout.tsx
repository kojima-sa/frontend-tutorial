"use client"

import { useState } from "react"
import { Box } from "@mui/material"
import Sidebar from "@/components/Sidebar"
import MainContent from "@/components/MainContent"
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [selectedId, setSelectedId] = useState<number | null>(null)

    return (
        <Box
            display="flex"
            height="100vh"
            sx={{ px: 5,}}
        >
            <Sidebar selectedId={selectedId} setSelectedId={setSelectedId} />
            <Box
                component="main"
                display="grid"
                flexDirection="column"
                flex={1}
            >
                <MainContent selectedId={selectedId} />
                <Footer />
            </Box>
        </Box>
    )
}
