import { Box, Typography } from "@mui/material"

export default function Footer(){

    return(
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height="64px"
            bottom={0}
            sx={{
                width: "100%",
                pl: 5,
            }}
        >
                <Typography variant="body2">Copyright © 2021 Sample</Typography>
                <Typography variant="body2">運営会社</Typography>
        </Box>
    )
}