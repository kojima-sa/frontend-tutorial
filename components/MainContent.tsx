"use client"

import { useEffect, useState } from "react"
import { fetchContent, titleUpdateContent, bodyUpdateContent } from "@/lib/api"
import type { Content } from "@/lib/types"
import { Box, Typography, Container, TextField } from "@mui/material"
import EditToggleButtons from "./pageEdit/EditToggleButtons"

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
    const [titleInput, setTitleInput] = useState("")
    const [bodyInput, setBodyInput] = useState("")
    const id = selectedId;
    const handleTitleEdit = async(id: number) => {}
    const handleBodyEdit = async(id: number) => {}

        useEffect(() => {
        if (content) {
            setTitleInput(content.title)
            setBodyInput(content.body)
        }
    }, [content])

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
                        pb: 2.5,
                        display:"flex",
                        justifyContent:"space-between",
                    }}
                >
                        { !titleEditMode ? (
                            <Typography
                                sx={{pl:"30px", py:"10px"}}
                                variant="h5"
                                fontWeight="bold"
                                gutterBottom>{content.title}
                            </Typography>
                        ) : (
                            <>
                                <TextField
                                    variant="outlined"
                                    sx={{ backgroundColor:"#FFFFFF" }}
                                    fullWidth
                                    color="primary"
                                    value={ titleInput }
                                    onChange={(e) => setTitleInput(e.target.value)}
                                    required
                                    InputProps={{
                                        sx:{ fontWeight:"bold", fontSize:"23px",pl:"20px" }
                                    }}
                                />
                            </>
                        )}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <EditToggleButtons
                        isEditMode={titleEditMode}
                        onEnterEdit={() => setTitleEditMode(true)}
                        onCancelEdit={() => setTitleEditMode(false)}
                        //onSaveEdit={() => }
                        />
                    </Box>
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
                        //onSaveEdit={() => }
                        />
                </Box>
            </Container>
        </Box>
    )
}
