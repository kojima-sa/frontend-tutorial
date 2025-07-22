"use client"

import { useEffect, useState } from "react"
import { fetchContent } from "@/lib/api"
import type { Content } from "@/lib/types"
import { Box, Typography, Container } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

import CustomIconButton from "@/components/CustomIconButton";


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
                    <Box sx={{pl:"20px"}}>
                        <CustomIconButton
                            icon={<EditIcon sx={{ height: 24, width: 24, }} />}
                            label="Edit"
                            //onClick={}
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
                    <Box sx={{pl:"20px"}}>
                        <CustomIconButton
                            icon={<EditIcon sx={{ height: 24, width: 24, }} />}
                            label="Edit"
                            //onClick={}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
