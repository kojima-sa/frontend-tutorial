"use client"

import { useState } from "react"
import { Box, Typography } from "@mui/material"
import Sidebar from "@/components/Sidebar"
import MainContent from "@/components/MainContent"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [selectedId, setSelectedId] = useState<number | null>(null)

    return (
        <Box display="flex" height="100vh">
            <Sidebar selectedId={selectedId} setSelectedId={setSelectedId} />
            <Box component="main" flex={1} p={2} sx={{ overflow: "auto" }}>
                <MainContent selectedId={selectedId} />
                    {children}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    px={5}
                    mt={2}
                >
                    <Typography variant="body2">Copyright © 2021 Sample</Typography>
                    <Typography variant="body2">運営会社</Typography>
                </Box>
            </Box>
        </Box>
    )
}
