import { Button, withStyles } from "@material-ui/core";

const MyButton = withStyles({
  root: {
    width: '150px',
    maxWidth: '70%',
    background: '#E65252',
    '&:hover': {
      background: '#fc7474',
    },
    marginTop: "2%",
    color: 'white',
  },
})((props: any) => <Button size="large" {...props} />);

export default function StyledButton({ children, ...props }) {
  return (
    <MyButton {...props}>
      { children }
    </MyButton>
  );
}