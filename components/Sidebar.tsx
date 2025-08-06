"use client"

import { useState, useEffect } from "react"
import {
    Box, List, ListItem, ListItemButton, ListItemText,
    IconButton, Typography, } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DoneIcon from "@mui/icons-material/Done"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import CustomIconButton from "@/components/utils/CustomIconButton";
import {handleCreateContent, handleDeleteContent } from "./utils/handlers"
import Image from "next/image"
import type { Content } from "@/lib/types"
import { fetchContents } from "@/lib/api"


type Props = {
    selectedId: number | null;
    setSelectedId: (id: number| null) => void;
    setTitleEditMode: (value: boolean) => void;
    setBodyEditMode: (value: boolean) => void;
    refreshSidebar: boolean;
    setRefreshSidebar: (value: boolean) => void;
};

export default function Sidebar({
    selectedId,
    setSelectedId,
    setTitleEditMode,
    setBodyEditMode,
    refreshSidebar,

}: Props) {
    const [editMode, setEditMode] = useState(false)
    const [contents, setContents] = useState<Content[]>([])

    //新規作成
    const handleCreate = () => {
        handleCreateContent(setSelectedId, setContents)
    }

    //削除
    const handleDelete = (id: number) => {
        handleDeleteContent(id, selectedId, setContents, setSelectedId)
    }

    //タイトル一覧取得
    useEffect(() => {
        const loadContents = async () => {
            try {
                    const data = await fetchContents()
                    setContents(data)
                } catch (error) {
                    console.error("データの取得に失敗しました", error)
                }
            }

        loadContents()
    }, [refreshSidebar]
)

    return (
        <Box
            width="300px"
            display="flex"
            flexDirection="column"
            height="100vh"
            sx={{ borderRight: '1px solid #F5F8FA',
                height: "100vh",
                pl:"40px"
            }}
        >
        {/* ロゴ＋会社名 */}
            <Box
                display="flex"
                alignItems="center"
                mb={2}
                sx={{ pt: 3.75, pb:2.5, }}
            >
                <Image src="recruit-frontend/Design/img/icon/logo.svg" alt="Logo" width={32} height={32} />
                <Typography
                    variant="h6"
                    ml={1}
                    fontWeight="bold"
                >
                    Service Name
                </Typography>
            </Box>

      {/* タイトル一覧 */}
            <List dense>
                {contents.map(item => (
                    <ListItem key={item.id}
                        secondaryAction={editMode && (
                            <IconButton
                                data-testid="delete-button"
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleDelete(item.id)}
                                sx={{ pr:"10px", }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    >
                        <ListItemButton
                            selected={selectedId === item.id}
                            onClick={() => {
                                setSelectedId(item.id);
                                setTitleEditMode(false);
                                setBodyEditMode(false);
                            }}
                            sx={{
                                backgroundColor: selectedId === item.id ? "#F5F8FA" : "transparent",
                                color: selectedId === item.id ? "#32A8F8" : "black",
                            }}
                        >
                            <ListItemText
                                data-testid={`title-${item.id}`}
                                primary={item.title}
                                primaryTypographyProps={{
                                    sx: {
                                        fontWeight: selectedId === item.id ? "bold" : "normal",
                                        fontSize: "16px",
                                        pr:"10px",
                                        display: "flex",
                                        alignItems: "center",
                                    }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>


            <Box mt="auto" sx={{ width: "100%" }} >
                <Box
                    sx={{
                        backgroundColor: "#F5F8FA",
                        width: "calc(100% + 40px)",
                        ml:"-40px",
                        pl:"40px",
                        display:"flex" ,
                        justifyContent: editMode ? "space-between" : "flex-end",
                    }}
                >
                    {editMode ? (
                        <>
                            <CustomIconButton
                                icon={<AddIcon sx={{ height: 24, width: 24 }} />}
                                label="New page"
                                variant="outlined"
                                sx={{px: 4, m: 1.25,}}
                                onClick={() => {
                                    handleCreate()
                                    setTitleEditMode(true);
                                    setBodyEditMode(true);
                                }}
                            />
                            <CustomIconButton
                                icon={<DoneIcon sx={{ height: 24, width: 24 }} />}
                                label="Done"
                                sx={{px: 4, m: 1.25,}}
                                onClick={() => setEditMode(false)}
                            />
                        </>
                    ) : (
                        <CustomIconButton
                            icon={<EditIcon sx={{ height: 24, width: 24, }} />}
                            label="Edit"
                            sx={{px: 4, m: 1.25,}}
                            onClick={() => setEditMode(true)}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    )
}
