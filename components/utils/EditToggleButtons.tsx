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
    editButton: () => string
    saveButton: () => string
    closeButton: () => string
    testIdPrefix?: string
}


export default function EditToggleButtons({
    isEditMode,
    onEnterEdit,
    onCancelEdit,
    onSaveEdit,
    editButton,
    saveButton,
    closeButton,
    testIdPrefix
}: EditToggleButtonsProps) {
    const prefix = testIdPrefix ? `${testIdPrefix}-` : ''

    return (
        <Box sx={{ pl: "20px",}}>
            {isEditMode ? (
                <>
                    <Box sx={{display: "flex"}}>
                        <CustomIconButton
                            icon={<CloseIcon sx={{ height: 24, width: 24 }} />}
                            sx={{ mr: "5px", backgroundColor: "#cccccc" }}
                            label="Cancel"
                            data-testid={`${prefix}CloseButton`}
                            onClick={onCancelEdit}
                        />
                        <CustomIconButton
                            icon={<SaveIcon sx={{ height: 24, width: 24 }} />}
                            sx={{ ml: "5px", }}
                            label="Save"
                            data-testid={`${prefix}SaveButton`}
                            onClick={onSaveEdit}
                        />
                    </Box>
                </>
            ) : (
                <CustomIconButton
                    icon={<EditIcon sx={{ height: 24, width: 24 }} />}
                    label="Edit"
                    data-testid={`${prefix}EditButton`}
                    onClick={onEnterEdit}
                    sx={{ px: 4 }}
                />
            )}
        </Box>
    )
}
