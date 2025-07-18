"use client"

import { useEffect, useState } from "react"
import { fetchContent } from "@/lib/api"
import type { Content } from "@/lib/types"
import { Box, Typography, Paper } from "@mui/material"


type Props = {
    selectedId: number | null
}

export default function MainContent({ selectedId }: Props) {
    const [content, setContent] = useState<Content | null>(null)

    useEffect(() => {
        if (selectedId !== null) {
            fetchContent(selectedId).then(setContent)
        } else {
            setContent(null)
        }
    }, [selectedId])

    if (selectedId === null) {
        return(
            <Box>
                <Typography variant="h6">
                    項目を選択してください
                </Typography>
            </Box>
        )
    }

    if (!content) {
        return <Typography>読み込み中...</Typography>
    }

    return (
        <Box
            sx={{
                overflow: "auto",
                px: 5,
                pt:3.75
            }}
        >
            <Paper
                sx={{
                    p:3.75,
                    backgroundColor: "#F5F8FA",
                }}
            >
                <Box
                    sx={{
                        pl: 3.75,
                        pb: 2.5,
                    }}
                >
                    <Typography
                        variant="h5"
                        gutterBottom>{content.title}
                    </Typography>
                </Box>
                <Box>
                    <Box
                        sx={{
                            backgroundColor:"white",
                            p: 3.75,
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{ whiteSpace: "pre-line" }}
                        >
                            {content.body}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}
