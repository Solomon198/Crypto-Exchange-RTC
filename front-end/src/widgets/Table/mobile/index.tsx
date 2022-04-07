import { Paper, Button, IconButton } from "@mui/material";

import {
  MobileCard,
  ExchangeIndicator,
  CardHeader,
  CardSubHeader,
  ModalHeader,
  ModalBody,
  ModalContainer,
  Label,
  InfoContainer,
  Value,
} from "./styled.components";
import { H5 } from "../../../components/general.styles/typography";
import { History } from "../../../types/entities";
import Modal from "../../../components/modal/modal";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

interface Props {
  data: History[];
}

export default function HistoryTableMobile(props: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState({} as History);
  return (
    <Paper
      elevation={0}
      sx={{ display: { md: "none", xs: "block", sm: "block", marginTop: 20 } }}
    >
      <Modal open={showModal} handleClose={() => setShowModal(false)}>
        <ModalContainer>
          <ModalHeader>
            <H5>Exchanged</H5>
            <IconButton onClick={() => setShowModal(false)}>
              <CloseIcon />
            </IconButton>
          </ModalHeader>
          <ModalBody>
            <InfoContainer>
              <Label>Date {"&"} Time</Label>
              <Value>{selectedHistory.date}</Value>
            </InfoContainer>
            <InfoContainer>
              <Label>Status</Label>
              <Value className="text-success">Approved</Value>
              <ExchangeIndicator className="bg-success" />
            </InfoContainer>
            <InfoContainer>
              <Label>From</Label>
              <Value>{selectedHistory.currencyFrom}</Value>
            </InfoContainer>
            <InfoContainer>
              <Label>To</Label>
              <Value>{selectedHistory.currencyTo}</Value>
            </InfoContainer>
            <InfoContainer>
              <Label>Amount</Label>
              <Value>{selectedHistory.amountTo}</Value>
              <Value>{selectedHistory.currencyFromShortName}</Value>
              <Value>{selectedHistory.amountFrom}</Value>
            </InfoContainer>
            <InfoContainer>
              <Label>Total Amount</Label>
              <Value>{selectedHistory.amountTo}</Value>
              <Value>{selectedHistory.currencyFromShortName}</Value>
              <Value>{selectedHistory.amountFrom}</Value>
            </InfoContainer>
          </ModalBody>
          <Button
            onClick={() => setShowModal(false)}
            disableElevation
            style={{
              backgroundColor: "#00cc00",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
            fullWidth
            variant="contained"
          >
            close
          </Button>
        </ModalContainer>
      </Modal>
      {props.data.map(
        (
          {
            currencyFrom,
            currencyTo,
            amountFrom,
            currencyFromShortName,
            type,
            _id,
            date,
            amountTo,
          },
          index
        ) => (
          <MobileCard
            onClick={() => {
              setSelectedHistory({
                currencyFrom,
                currencyTo,
                amountFrom,
                currencyFromShortName,
                type,
                _id,
                date,
                amountTo,
              });
              setShowModal(true);
            }}
            key={_id}
          >
            <div className="flex-fill">
              <CardHeader
                style={{ fontWeight: 500, fontSize: 14 }}
              >{`${currencyFrom} --> ${currencyTo}`}</CardHeader>
              <CardSubHeader style={{ fontSize: 12 }}>
                Amount {`${currencyFromShortName} ${amountFrom}`}
              </CardSubHeader>
            </div>
            <ExchangeIndicator
              className={`${
                type === "Exchanged" ? "bg-primary" : "bg-success"
              }`}
            />
          </MobileCard>
        )
      )}
    </Paper>
  );
}
