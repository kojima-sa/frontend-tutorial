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
            <Box
                sx={{
                    position:"sticky",
                    height: "100vh",
                    overflowY: "auto",
                    alignSelf: "flex-start",
                    top:"0",
                }}
            >
                <Sidebar selectedId={selectedId} setSelectedId={setSelectedId} />
            </Box>
            <Box
                component="main"
                display="flex"
                flexDirection="column"
                flex={1}
                sx={{ minHeight: "100vh" }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <MainContent selectedId={selectedId} />
                </Box>
                <Box>
                    <Footer />
                </Box>
            </Box>
        </Box>
    );
}
