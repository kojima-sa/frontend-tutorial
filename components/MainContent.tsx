"use client"

import { useEffect, useState } from "react"
import { fetchContent } from "@/lib/api"
import type { Content } from "@/lib/types"
import { Box, Typography, Container, TextField } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

import CustomIconButton from "@/components/CustomIconButton";
import EditToggleButtons from "./EditToggleButtons"

type Props = {
    selectedId: number | null
    setTitleEditMode: (value: boolean) => void;
    titleEditMode:boolean
    setBodyEditMode: (value: boolean) => void;
    bodyEditMode: boolean
}

export default function MainContent({
    selectedId,
    titleEditMode,
    setTitleEditMode,
    bodyEditMode,
    setBodyEditMode
}: Props) {
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
                px: 5,
                pt:3.75
            }}
        >
            <Container
                sx={{
                    p:3.75,
                    backgroundColor: "#F5F8FA",
                }}
            >
                <Box
                    sx={{
                        pl: 3.75,
                        pb: 2.5,
                        display:"flex",
                        justifyContent:"space-between",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            gutterBottom>{content.title}
                        </Typography>
                    </Box>
                    <EditToggleButtons
                        isEditMode={titleEditMode}
                        onEnterEdit={() => setTitleEditMode(true)}
                        onCancelEdit={() => setTitleEditMode(false)}
                    />
                </Box>
                <Box
                    sx={{
                        display:"flex",
                        justifyContent:"space-between",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor:"#FFFFFF",
                            p: 3.75,
                            overflow: "auto",
                            width: "100%",
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{ whiteSpace: "pre-line" }}
                        >
                            {content.body || "本文を入力してください"}
                        </Typography>
                    </Box>
                    <EditToggleButtons
                        isEditMode={bodyEditMode}
                        onEnterEdit={() => setBodyEditMode(true)}
                        onCancelEdit={() => setBodyEditMode(false)}
                    />
                </Box>
            </Container>
        </Box>
    )
}
