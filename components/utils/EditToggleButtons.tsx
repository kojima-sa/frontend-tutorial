import { Box } from "@mui/material"
import CustomIconButton from "./CustomIconButton"
import EditIcon from "@mui/icons-material/Edit"
import CloseIcon from "@mui/icons-material/Close"
import SaveIcon from "@mui/icons-material/Save"

type EditToggleButtonsProps = {
    isEditMode: boolean
    onEnterEdit: () => void
    onCancelEdit: () => void
    onSaveEdit: () => void
}

export default function EditToggleButtons({
    isEditMode,
    onEnterEdit,
    onCancelEdit,
    onSaveEdit,
}: EditToggleButtonsProps) {
    return (
        <Box sx={{ pl: "20px",}}>
            {isEditMode ? (
                <>
                    <Box sx={{display: "flex"}}>
                        <CustomIconButton
                            icon={<CloseIcon sx={{ height: 24, width: 24 }} />}
                            sx={{ mr: "5px", backgroundColor: "#cccccc" }}
                            label="Cancel"
                            onClick={onCancelEdit}
                        />
                        <CustomIconButton
                            icon={<SaveIcon sx={{ height: 24, width: 24 }} />}
                            sx={{ ml: "5px", }}
                            label="Save"
                            onClick={onSaveEdit}
                        />
                    </Box>
                </>
            ) : (
                <CustomIconButton
                    icon={<EditIcon sx={{ height: 24, width: 24 }} />}
                    label="Edit"
                    onClick={onEnterEdit}
                    sx={{ px: 4 }}
                />
            )}
        </Box>
    )
}
