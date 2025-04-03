import useApiHook from "@/hooks/useApiHook";
import MUITextField from "@/shared/MUITextField";
import { Box, Button, Modal } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";

type AddChatProps = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};
interface submitProps {
  email: string;
}

const AddChat = ({ openModal, setOpenModal }: AddChatProps) => {
  const { api } = useApiHook();

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
      setOpenModal(false);
    }
  };

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
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
