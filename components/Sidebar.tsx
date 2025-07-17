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
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            sx={{
                                    pl:"10px"
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
                        justifyContent: editMode ? "space-between" : "flex-end",
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
                                fontSize:"10px"
                            }}
                        >
                            Edit
                        </Typography>
                    </Button>
                    ) : (
                    <>
                    <Button
                        variant="outlined"
                        sx={{
                            backgroundColor: "white",
                            color:"#4CB3F8",
                            minWidth: "40px",
                            height:"40px",
                            flexDirection: "column",
                            textTransform: "none",
                            p: 3,
                            ml:5
                        }}
                    >
                        <AddIcon
                            sx={{
                                height:"24px",
                                width:"24px",
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize:"10px"
                            }}
                        >
                            New page
                        </Typography>
                    </Button>
                    <Button
                        onClick={() => setEditMode(false)}
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
                        <DoneIcon
                            sx={{
                                height:"24px",
                                width:"24px",
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize:"10px"
                            }}
                        >
                            Done
                        </Typography>
                    </Button>
                    </>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
