"use client"

import { useState } from "react"
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import Sidebar from "@/components/Sidebar"
import MainContent from "@/components/MainContent"
import Footer from "@/components/Footer";

const theme = createTheme({
    palette: {
        mode: "light", // ダークモードにしたいときは "dark"
    },
})

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const [titleEditMode, setTitleEditMode] = useState(false);
    const [bodyEditMode, setBodyEditMode] = useState(false);
    const [refreshSidebar, setRefreshSidebar] = useState(false);

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
            display="flex"
            //height="100vh"　これがあるとstickyが効かない
            pr="40px"
        >
            <Box
                sx={{
                    position:"sticky",
                    height: "100vh",
                    alignSelf: "flex-start",
                    top:"0",
                }}
            >
                <Sidebar
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    setTitleEditMode={setTitleEditMode}
                    setBodyEditMode={setBodyEditMode}
                    refreshSidebar={refreshSidebar}
                    setRefreshSidebar={setRefreshSidebar}
                    />
            </Box>
            <Box
                component="main"
                display="flex"
                flexDirection="column"
                flex={1}
                sx={{ minHeight: "100vh", position: "relative" }}
            >
                <Box sx={{ flexGrow: 1, pb: "60px" }}>
                    <MainContent
                        selectedId={selectedId}
                        titleEditMode={titleEditMode}
                        setTitleEditMode={setTitleEditMode}
                        bodyEditMode={bodyEditMode}
                        setBodyEditMode={setBodyEditMode}
                        setRefreshSidebar={setRefreshSidebar}
                    />
                </Box>
                <Box
                    sx={{position: "absolute",
                        bottom: 0,
                        width:" 100%",
                        bgcolor: "background.paper",
                    }}
                >
                    <Footer />
                </Box>
            </Box>
        </Box>
        </ThemeProvider>
    );
}
