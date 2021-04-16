import { Box } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useState } from "react";

export default function Feedback({ onChange }) {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState<number>(0);

  const handleRating = (event, newValue) => {
    setRating(newValue);
    onChange(newValue);
  }

  const labels: { [index: string]: string } = {
    1: 'Muito Insatisfeito',
    2: 'Insatisfeito',
    3: 'Indiferente',
    4: 'Satisfeito',
    5: 'Muito Satisfeito'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Rating
        name="rating"
        value={rating}
        precision={1}
        size="large"
        onChange={handleRating}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {
        hover > 0
        ? <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>
        : <span style={{ color: 'transparent' }}>Escolha uma nota</span>
      }
    </div>
  );
}