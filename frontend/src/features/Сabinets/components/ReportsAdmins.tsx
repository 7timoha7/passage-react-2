import React, { useEffect } from 'react';
import { User } from '../../../types';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAdminMyOrders } from '../../Order/orderSlice';
import { getForAdminHisOrders } from '../../Order/orderThunks';
import OrderItems from '../../Order/components/OrderItems';
import { selectGetUsersByRoleLoading } from '../../users/usersSlice';
import Spinner from '../../../components/UI/Spinner/Spinner';

interface Props {
  admins: User[];
}

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&::before': {
      display: 'none',
    },
  }),
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const ReportsAdmins: React.FC<Props> = ({ admins }) => {
  const [expanded, setExpanded] = React.useState<string | false>('');
  const adminOrders = useAppSelector(selectAdminMyOrders);
  const loading = useAppSelector(selectGetUsersByRoleLoading);
  const dispatch = useAppDispatch();
  const handleChange = (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    if (expanded) {
      dispatch(getForAdminHisOrders(expanded));
    }
  }, [dispatch, expanded]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        admins.map((admin) => {
          return (
            <Accordion key={admin._id} expanded={expanded === admin._id} onChange={handleChange(admin._id)}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>
                  {admin.firstName} {admin.lastName}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <OrderItems ordersItems={adminOrders} />
              </AccordionDetails>
            </Accordion>
          );
        })
      )}
    </>
  );
};

export default ReportsAdmins;
