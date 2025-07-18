"use client"

import { Button, Typography } from "@mui/material"
import { SxProps, Theme } from "@mui/system"
import React from "react"

type Props = {
    icon: React.ReactNode
    label: string
    onClick?: () => void
    variant?: "contained" | "outlined" | "text"
    sx?: SxProps<Theme>
}

export default function CustomIconButton({
    icon,
    label,
    onClick,
    variant = "contained",
    sx = {},
}: Props) {
    return (
        <Button
            onClick={onClick}
            variant={variant}
            sx={{
                backgroundColor: variant === "contained" ? "#4CB3F8" : "white",
                color: variant === "contained" ? "white" : "#4CB3F8",
                minWidth: 40,
                flexDirection: "column",
                textTransform: "none",
                px: 4,
                m: 1.25,
                ...sx,
            }}
        >
            {icon}
            <Typography sx={{ fontSize: "10px" }}>{label}</Typography>
        </Button>
    )
}
