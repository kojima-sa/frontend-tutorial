import { Box } from "@mui/material"
import CustomIconButton from "./CustomIconButton"
import EditIcon from "@mui/icons-material/Edit"
import CloseIcon from "@mui/icons-material/Close"
import SaveIcon from "@mui/icons-material/Save"

type EditToggleButtonsProps = {
    isEditMode: boolean
    onEnterEdit: () => void
    onCancelEdit: () => void
}

export default function EditToggleButtons({
    isEditMode,
    onEnterEdit,
    onCancelEdit,
}: EditToggleButtonsProps) {
    return (
        <Box sx={{ pl: "20px",
                    display: "flex",
                    alignItems: "center",
         }}>
            {!isEditMode ? (
                <CustomIconButton
                    icon={<EditIcon sx={{ height: 24, width: 24 }} />}
                    label="Edit"
                    onClick={onEnterEdit}
                    sx={{ px: 4, m: 1.25 }}
                />
            ) : (
            <>
                <CustomIconButton
                    icon={<CloseIcon sx={{ height: 24, width: 24 }} />}
                    sx={{ m: "10px", backgroundColor: "#cccccc" }}
                    label="Cancel"
                    onClick={onCancelEdit}
                />
                <CustomIconButton
                    icon={<SaveIcon sx={{ height: 24, width: 24 }} />}
                    label="Save"
                />
            </>
            )}
        </Box>
    )
}
