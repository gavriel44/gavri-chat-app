import React, { ReactElement } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAppSelector } from "../../hooks/redux";
import { selectChatContext } from "../../features/chatContextSlice";
import { IconButton } from "@mui/material";
import moment from "moment";

interface Props {}

export default function MessageBlockHeader({}: Props): ReactElement {
  const { room } = useAppSelector(selectChatContext);
  return (
    <div>
      <div className="header-date">
        {moment().format("MMMM Do YYYY, h:mm:ss a")}
      </div>
      <div className="message-block-header">
        <div>{room}</div>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  );
}
