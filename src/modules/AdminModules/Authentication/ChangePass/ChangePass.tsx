import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/auth/AuthConfig';
import { ChangePasswordData } from '../../../../store/auth/interfaces/authType';
import { useValidation } from '../../../../hooks/useValidation';
import { useTranslation } from 'react-i18next';
import TextInput from '../../../../shared/Form/TextInput';
import { changePassword } from '../../../../store/auth/AuthThunks';
import { changePassProp } from '../../../../Interfaces/props.interface';
import { useTheme } from '@mui/material/styles';

const ChangePass = ({ open, setOpen }: changePassProp) => {
  const { t } = useTranslation();
  const { PASSWORD_VALIDATION, CONFIRM_PASS_VALIDATION } = useValidation();
  const theme = useTheme(); // Access the theme

  const buttonRef = useRef<HTMLButtonElement | null>(null); // For restoring focus

  const handleClose = () => {
    setOpen(false);
    buttonRef.current?.focus(); // Restore focus when modal closes
  };

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ChangePasswordData>({ mode: 'onChange' });

  const onSubmit = async (data: ChangePasswordData) => {
    try {
      const response = await dispatch(changePassword(data)).unwrap();
      enqueueSnackbar(response?.message || t('password.successMessage'), { variant: 'success' });
      reset();
      handleClose();
    } catch (err) {
      enqueueSnackbar(err as string, { variant: 'error' });
    }
  };

  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  useEffect(() => {
    if (confirmPassword) {
      trigger('confirmPassword');
    }
  }, [newPassword, confirmPassword, trigger]);

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Box
          sx={{
            ...{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            },
          }}
        >
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2, color: theme.palette.text.primary }}
          >
            {t('password.modalTitle')}
          </Typography>
          <Typography
            id="transition-modal-description"
            sx={{ mb: 3, color: theme.palette.text.secondary }}
          >
            {t('password.modalDescription')}
          </Typography>

          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextInput<ChangePasswordData>
              name="oldPassword"
              id="oldPassword"
              label={t('form.oldPassword')}
              register={register}
              validation={PASSWORD_VALIDATION}
              type="password"
              errors={errors}
              placeholder={t('form.oldPassword')}
            />
            <TextInput<ChangePasswordData>
              name="newPassword"
              id="newPassword"
              label={t('form.newPassword')}
              register={register}
              validation={PASSWORD_VALIDATION}
              type="password"
              errors={errors}
              placeholder={t('form.newPassword')}
            />
            <TextInput<ChangePasswordData>
              name="confirmPassword"
              id="confirmPassword"
              label={t('form.confirmPassword')}
              register={register}
              validation={CONFIRM_PASS_VALIDATION(newPassword)}
              type="password"
              errors={errors}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{
                  color: theme.palette.primary.dark,
                  borderColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    color: theme.custom.liteMain,

                  },
                }}
              >
                {t('common.cancel')}
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} sx={{ color: 'white' }} />
                ) : (
                  t('password.changeButton')
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ChangePass;
