"use client";
import {
  FormControl,
  FormLabel,
  InputAdornment,
  TextField as TF,
  TextFieldProps,
  styled,
} from "@mui/material";
import React, { ReactNode } from "react";

import theme from "@/theme/theme";

const TextField = styled(TF)(({ theme }) => ({
  marginTop: 0,
  marginBottom: 0,
  "& .MuiInputLabel-animated:not(.MuiInputLabel-shrink)": {
    transform: "translate(14px, 10px) scale(1)",
  },
  "& .MuiInputBase-root": {
    borderRadius: 8,
    "&.MuiFilledInput-root": {
      height: 44,
      border: "1px solid rgba(0, 0, 0, 0.23)",
      "& .MuiInputBase-input": {
        fontSize: 14,
        lineHeight: "1.5",
        padding: "10.5px 20px",
        fontWeight: 500,
      },
      "&:before, &:after": {
        content: "normal",
      },
    },
    "&:has(.MuiInputAdornment-positionStart)": {
      padding: 0,
      "& .MuiInputAdornment-root": {
        margin: "0 8px 0 12px",
        height: 20,
        minWidth: 20,
        justifyContent: "center",
      },
      "& .MuiInputBase-input": {
        padding: "10.5px 20px 10.5px 0 !important",
      },
    },
    "& textarea.MuiInputBase-inputMultiline": {
      padding: "0 !important",
    },
    "&.MuiOutlinedInput-root .MuiInputBase-input": {
      fontSize: 14,
      lineHeight: "1.5",
      padding: "10.5px 20px",
      fontWeight: 500,
      "&::placeholder": {
        textTransform: "capitalize",
      },
    },
    "&.Mui-focused": {
      outline: "0",
      "& .MuiOutlinedInput-notchedOutline": {
        // borderColor: theme.palette.pink.light100,
      },
    },
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        // borderColor: theme.palette.pink.light200,
      },
    },
  },
  "& .MuiFormHelperText-root": {
    margin: "4px 0 0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "left",
    "& svg": {
      width: 15,
      height: 15,
      verticalAlign: "middle",
    },
  },
  "&.drawerInput": {
    "& .MuiInputBase-root": {
      boxShadow: "0px 1px 3px #12121233",
      "&::after": {
        content: "''",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        boxShadow: "0px 0px 0px 1px #1212121A",
        borderRadius: 8,
        zIndex: -1,
      },
      "&.Mui-focused": {
        outline: "0",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.primary.main,
        },
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
    },
  },
}));

interface MUITextFieldProps extends Omit<TextFieldProps, "error"> {
  formLabel?: string;
  startIcon?: ReactNode;
  formControlSx?: object;
  errorMessage?: string;
}

const MUITextField: React.FC<MUITextFieldProps> = ({
  formLabel,
  startIcon,
  formControlSx = {},
  errorMessage,
  ...props
}) => {
  return (
    <FormControl
      fullWidth
      sx={{
        mb: 2,
        "& .MuiFormLabel-root": {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "1.5",
          color: theme.palette.primary.light,
          marginBottom: 0.5,
          width: "fit-content",
        },
        ...formControlSx,
      }}
    >
      {formLabel && <FormLabel>{formLabel}</FormLabel>}
      <TextField
        InputProps={
          startIcon
            ? {
                startAdornment: (
                  <InputAdornment position="start">{startIcon}</InputAdornment>
                ),
              }
            : undefined
        }
        fullWidth
        error={Boolean(errorMessage)} // Ensure boolean type
        helperText={errorMessage} // Show error message
        {...props}
      />
    </FormControl>
  );
};

export default MUITextField;
