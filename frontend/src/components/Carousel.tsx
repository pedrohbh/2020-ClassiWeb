import { useState } from 'react';

import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import { grey } from "@material-ui/core/colors";

import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import ReactCarousel from 'react-material-ui-carousel'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    carousel: {
      height: '100%',
      width: '100%',
      paddingBottom: 40,

      '& div.CarouselItem': {
        height: '100%',
      },

      '& div.CarouselItem > div': {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
      },
    },

    carouselWrapper: {
      '& div[class*="AutoRotatingCarousel-slide-"]': {
        background: grey[300],
        overflow: 'hidden',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    },

    dots: {
      '& div[class*="Dots-dot-"]': {
        background: "#494949",
      }
    }
  }),
);

export default function Carousel({ images }) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  return (
    <Grid container justify="center" style={{ height: '50vh' }}>
      <ReactCarousel
        className={classes.carousel}
        autoPlay={!openModal && images.length > 1}
        interval={3000}
      >
        {images.map((image, i) => (
          <img
            key={i}
            src={image}
            alt={''}
            onClick={() => setOpenModal(true)}
            style={{ maxWidth: '100%', maxHeight: '50vh', cursor: 'pointer', borderRadius: 10 }}
          />
        ))}
      </ReactCarousel>

      <AutoRotatingCarousel
        classes={{
          carouselWrapper: classes.carouselWrapper,
          dots: classes.dots,
          dotsMobile: classes.dots,
          dotsMobileLandscape: classes.dots,
        }}
        open={openModal}
        autoplay={images.length > 1}
        onClose={() => setOpenModal(false)}
        onStart={() => setOpenModal(false)}
        style={{ position: 'absolute' }}
      >
        {images.map((image, i) => (
          <img key={i} src={image} alt={''} style={{ maxWidth: '100%', maxHeight: '100%' }} />
        ))}
      </AutoRotatingCarousel>
    </Grid>
  );
}