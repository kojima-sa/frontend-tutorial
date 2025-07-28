"use client"

import { useEffect, useState } from "react"
import { fetchContent, titleUpdate, bodyUpdate} from "@/lib/api"
import type { Content } from "@/lib/types"
import { Box, Typography, Container, TextField, } from "@mui/material"
import EditToggleButtons from "./pageEdit/EditToggleButtons"

type Props = {
    selectedId: number | null
    setTitleEditMode: (value: boolean) => void;
    titleEditMode:boolean
    setBodyEditMode: (value: boolean) => void;
    bodyEditMode: boolean
    setRefreshSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MainContent({
    selectedId,
    titleEditMode,
    setTitleEditMode,
    bodyEditMode,
    setBodyEditMode,
    setRefreshSidebar
}: Props) {
    const [content, setContent] = useState<Content | null>(null)
    const [titleInput, setTitleInput] = useState("")
    const [bodyInput, setBodyInput] = useState("")
    const [titleError, setTitleError] = useState("")
    const [bodyError, setBodyError] = useState("")

    const handleTitleEdit = async() => {
        if (selectedId === null) return;
        try {
            await titleUpdate(selectedId, { title: titleInput });
            setTitleEditMode(false);
            setContent((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    title: titleInput,
                    body: bodyInput
                };
            });
            console.log("タイトル更新");
            setRefreshSidebar(prev => !prev);
            console.log("一覧更新");
        }catch (error) {
            console.error("タイトルの更新に失敗しました", error);
        }
    };

    const handleBodyEdit = async() => {
        if (selectedId === null) return;
        try {
            await bodyUpdate(selectedId, { body: bodyInput });
            setBodyEditMode(false);
            setContent((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    title: titleInput,
                    body: bodyInput
                };
            });
            console.log("本文更新");
        }catch (error) {
            console.error("本文の更新に失敗しました", error);
        }
    };

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
                        onSaveEdit={() => handleTitleEdit()}
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
                            overflow: "auto",
                            width: "100%",
                        }}
                    >
                        { !bodyEditMode ? (
                            <Typography
                                variant="body1"
                                sx={{ whiteSpace: "pre-line", p: 3.75, }}
                            >
                                {content.body}
                            </Typography>
                        ) : (
                            <>
                                <TextField
                                    variant="outlined"
                                    placeholder = "本文を入力してください"
                                    sx={{ backgroundColor:"#FFFFFF"}}
                                    fullWidth
                                    multiline
                                    color="primary"
                                    value={ bodyInput }
                                    onChange={(e) => setBodyInput(e.target.value)}
                                    InputProps={{
                                        sx:{ p:"30px" }
                                    }}
                                    required
                                />
                            </>
                        )}
                    </Box>
                        <EditToggleButtons
                        isEditMode={bodyEditMode}
                        onEnterEdit={() => setBodyEditMode(true)}
                        onCancelEdit={() => setBodyEditMode(false)}
                        onSaveEdit={() => handleBodyEdit()}
                        />
                </Box>
            </Container>
        </Box>
    )
}
