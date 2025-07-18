"use client"

import { useState, useEffect } from "react"
import {
    Box, List, ListItem, ListItemButton, ListItemText,
    IconButton, Button, Typography
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DoneIcon from "@mui/icons-material/Done"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import Image from "next/image"
import type { Content } from "@/lib/types"
import { fetchContents } from "@/lib/api"
import CustomIconButton from "@/components/CustomIconButton";

type Props = {
    selectedId: number | null;
    setSelectedId: (id: number) => void;
};

export default function Sidebar({ selectedId, setSelectedId }: Props) {
    const [editMode, setEditMode] = useState(false)
    const [contents, setContents] = useState<Content[]>([])

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
    }, [])

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
                            sx={{
                                    pr:"10px",
                                    overflow: "auto",
                            }}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    )}
                    >
                        <ListItemButton
                            selected={selectedId === item.id}
                            onClick={() => setSelectedId(item.id)}
                        >
                            <ListItemText
                                primary={item.title}
                                primaryTypographyProps={{
                                    sx: {
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
                        display:"flex" ,
                        justifyContent: editMode ? "space-between" : "flex-end",
                        alignItems: "center",
                    }}
                >
                    {!editMode ? (
                        <CustomIconButton
                            icon={<EditIcon sx={{ height: 24, width: 24, }} />}
                            label="Edit"
                            onClick={() => setEditMode(true)}
                        />
                    ) : (
                    <>
                    <CustomIconButton
                        icon={<AddIcon sx={{ height: 24, width: 24 }} />}
                        label="New page"
                        variant="outlined"
                        
                    />
                    <CustomIconButton
                        icon={<DoneIcon sx={{ height: 24, width: 24 }} />}
                        label="Done"
                        onClick={() => setEditMode(false)}
                    />
                    </>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
