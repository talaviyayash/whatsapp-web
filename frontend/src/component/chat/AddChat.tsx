import useApiHook from "@/hooks/useApiHook";
import MUITextField from "@/shared/MUITextField";
import { getModal, modalToggle } from "@/utils/customFunc";
import { Box, Button, Modal } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

interface submitProps {
  email: string;
}

const AddChat = () => {
  const addChatModal = useSelector(getModal("addChat"));
  const { api } = useApiHook();
  const dispatch = useDispatch();
  const toggleAddChatModal = () => {
    modalToggle({ dispatch, name: "addChat" });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<submitProps>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onAdd = async (data: submitProps) => {
    const response = await api({
      endPoint: "chat/create-chat",
      method: "POST",
      data,
      showToastMessage: true,
    });
    if (response?.success) {
      toggleAddChatModal();
    }
  };

  return (
    <Modal open={!!addChatModal} onClose={toggleAddChatModal}>
      <Box p={3} bgcolor="background.paper" mx="auto" my={5} borderRadius={2}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email format",
            },
          }}
          render={({ field }) => (
            <MUITextField
              {...field}
              type="email"
              formLabel="Email"
              errorMessage={errors.email?.message as string}
              fullWidth
              margin="normal"
              placeholder="Email"
            />
          )}
        />
        <Button onClick={handleSubmit(onAdd)} sx={{ mt: 2 }} variant="outlined">
          Add Chat
        </Button>
      </Box>
    </Modal>
  );
};

export default AddChat;
