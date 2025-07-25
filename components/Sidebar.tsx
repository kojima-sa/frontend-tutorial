"use client"

import { useState, useEffect } from "react"
import {
    Box, List, ListItem, ListItemButton, ListItemText,
    IconButton, Typography, } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DoneIcon from "@mui/icons-material/Done"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import CustomIconButton from "@/components/CustomIconButton";
import Image from "next/image"
import type { Content } from "@/lib/types"
import { deleteContent, fetchContents, createContent } from "@/lib/api"


type Props = {
    selectedId: number | null;
    setSelectedId: (id: number| null) => void;
    setTitleEditMode: (value: boolean) => void;
    setBodyEditMode: (value: boolean) => void;
};

export default function Sidebar({
    selectedId,
    setSelectedId,
    setTitleEditMode,
    setBodyEditMode,
}: Props) {
    const [editMode, setEditMode] = useState(false)
    const [contents, setContents] = useState<Content[]>([])

    //新規作成
    const handleCreate = async() =>{
        const newContent = await createContent({
            title: "新規メモ",
            content: "",
        })
        setSelectedId(newContent.id)
        console.log("新規作成");

        setContents(prev => [...prev, newContent])
    }

    //削除
    const id = selectedId;
    const handleDelete = async(id: number) => {
        const confirmDelete = window.confirm("本当に削除しますか？");
            if (!confirmDelete) return;
            if (id === null) return;
            await deleteContent(id)
            console.log("削除");

        setContents(prev => prev.filter(item => item.id !== id));
        if (selectedId === id) {
            setSelectedId(null);
        }
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
    }, []
)

    return (
        <Box
            width="300px"
            display="flex"
            flexDirection="column"
            height="100vh"
            sx={{ borderRight: '1px solid #F5F8FA',
                height: "100vh",
                position: "sticky",
                top: 0,
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
                <Image src="/icons/logo.png" alt="Logo" width={30} height={32} />
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
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDelete(item.id)}
                            sx={{
                                    pr:"10px",
                                    overflow: "auto",
                            }}
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
                        alignItems: "center",
                    }}
                >
                    {!editMode ? (
                        <CustomIconButton
                            icon={<EditIcon sx={{ height: 24, width: 24, }} />}
                            label="Edit"
                            sx={{px: 4, m: 1.25,}}
                            onClick={() => setEditMode(true)}
                        />
                    ) : (
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
                    )}
                </Box>
            </Box>
        </Box>
    )
}
