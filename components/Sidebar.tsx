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

export default function Sidebar() {
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
            width="250px"
            display="flex"
            flexDirection="column"
            height="100vh"
            sx={{ borderRight: '1px solid #F5F8FA', pl: 5, pr: 1.25, }}
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
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    )}
                    >
                        <ListItemButton>
                            <ListItemText
                                primary={item.title}
                                primaryTypographyProps={{
                                    sx: {
                                        fontSize: "16px",
                                        height:"44px",
                                        display: "flex",
                                        alignItems: "center",
                                    }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>


            <Box mt="auto" >
                <Box
                    sx={{
                        backgroundColor: "#F5F8FA",
                        width:"calc(100% + 40px + 10px)",
                        ml:"-40px",
                        mr:"-10px",
                        display:"flex" ,
                        justifyContent: editMode ? "space-around" : "flex-end",
                        alignItems: "center",
                    }}
                >
                    {!editMode ? (
                    <Button
                        onClick={() => setEditMode(true)}
                        variant="contained"
                        sx={{
                            backgroundColor: "#4CB3F8",
                            color:"white",
                            minWidth: 40,
                            flexDirection: "column",
                            textTransform: "none",
                            px: 4,
                            m:1.25
                        }}
                    >
                        <EditIcon
                            sx={{
                                height:"24px",
                                width:"24px"
                            }}
                        />
                        <Typography
                            sx={{
                                height:"16px",
                            }}
                        >
                            Edit
                        </Typography>
                    </Button>
                    ) : (
                    <>
                    <Button>
                        <AddIcon />
                    </Button>
                    <Button onClick={() => setEditMode(false)}>
                        <DoneIcon />
                    </Button>
                    </>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
