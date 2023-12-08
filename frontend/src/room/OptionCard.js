import React from "react";

import classnames from "classnames";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";

import { ReactComponent as FrontSvg } from "assets/front.svg";

const OptionCard = ({ value, selected, onVote }) => {
  const className = classnames("option", { selected });
  return (
    <div className={className}>
      <Card>
        <CardActionArea onClick={() => onVote(value)}>
          <div className="option-vote">
            <FrontSvg />
            <div className="option-vote-value">
              <Typography variant="button">{value}</Typography>
            </div>
          </div>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default OptionCard;
