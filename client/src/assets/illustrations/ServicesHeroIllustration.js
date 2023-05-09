import PropTypes from "prop-types";
import {memo} from "react";
import {m} from "framer-motion";
// @mui
import {useTheme} from "@mui/material/styles";
import {Box} from "@mui/material";
// hooks
import useHoverParallax from "../../hooks/useHoverParallax";
// components
import Image from "../../components/image/Image";
import SvgColor from "../../components/svg-color/SvgColor";
// pattern
import {Icon, Label, Character, Pattern01, Pattern02} from "./pattern";

// ----------------------------------------------------------------------

const stylesIcon = {
  width: 40,
  height: 40,
  color: "common.black",
};

// ----------------------------------------------------------------------

function ServicesHeroIllustration({sx, ...other}) {
  const theme = useTheme();

  const {offsetX, offsetY, onMouseMoveHandler, onMouseLeaveHandler} =
    useHoverParallax();

  const BLUE = theme.palette.info.main;

  const GREEN = theme.palette.success.main;

  return (
    <Box
      component={m.div}
      onMouseMove={onMouseMoveHandler}
      onMouseLeave={onMouseLeaveHandler}
      sx={{
        width: 564,
        height: 564,
        display: "flex",
        alignItems: "center",
        position: "relative",
        justifyContent: "center",
        ...sx,
      }}
      {...other}
    >
      <>
        <Character
          front
          sx={{position: "absolute", bottom: 16, zIndex: 10, width: 300}}
        />
        {/* Alipiri */}
        <Box
          sx={{
            top: 170,
            zIndex: 9,
            position: "absolute",
            transform: "translateX(-125px) rotate(-15deg)",
          }}
        >
          <m.div style={{y: offsetY(-50)}}>
            <Label
              text="Alipire terenuri"
              icon={
                <Image
                  alt="alipire"
                  src="/assets/icons/puzzle-svgrepo-com.svg"
                  sx={{width: 48, height: 48}}
                />
              }
            />
          </m.div>
        </Box>
        <Character
          sx={{position: "absolute", bottom: 16, zIndex: 8, width: 300}}
        />
      </>

      {/* Dezmembrari */}
      <Box
        sx={{
          zIndex: 9,
          position: "absolute",
          transform: "translate(175px, 90px) rotate(15deg)",
        }}
      >
        <m.div style={{x: offsetX(80), y: offsetY(80)}}>
          <Label
            text="Dezmembrare/Lotizare"
            icon={
              <Image
                alt="dezmembrare"
                src="/assets/icons/ic_land-parcels.svg"
                sx={{width: 48, height: 48}}
              />
            }
          />
        </m.div>
      </Box>

      {/* Trasari */}
      <Box
        sx={{
          zIndex: 9,
          position: "absolute",
          transform: "translate(170px, -110px) rotate(15deg)",
        }}
      >
        <m.div style={{y: offsetY(80)}}>
          <Label
            text="Trasare/Înțărușare"
            icon={
              <Image
                alt="trasare"
                src="/assets/icons/location-context.svg"
                sx={{width: 48, height: 48}}
              />
            }
          />
        </m.div>
      </Box>

      {/* Intabulari */}
      <Box
        sx={{
          zIndex: 10,
          bottom: 150,
          position: "absolute",
          transform: "translateX(-130px) rotate(-15deg)",
        }}
      >
        <m.div style={{y: offsetY(-60)}}>
          <Label
            text="Cadastru și intabulare"
            icon={
              <Image
                alt="intabulare"
                src="/assets/icons/sign-document.svg"
                sx={{width: 48, height: 48}}
              />
            }
          />
        </m.div>
      </Box>

      {/* Icon */}
      <Box
        sx={{
          zIndex: 10,
          position: "absolute",
          top: 16,
          transform: "translateX(20px)",
        }}
      >
        <m.div style={{x: offsetX(50), y: offsetY(50)}}>
          <Icon
            color={GREEN}
            content={
              <SvgColor
                src="/assets/icons/ic_creativity.svg"
                sx={{...stylesIcon}}
              />
            }
          />
        </m.div>
      </Box>

      {/* Icon */}
      <Box
        sx={{
          zIndex: 10,
          position: "absolute",
          bottom: 16,
          transform: "translateX(40px)",
        }}
      >
        <m.div style={{x: offsetX(-60), y: offsetY(60)}}>
          <Icon
            color={GREEN}
            content={
              <SvgColor
                src="/assets/icons/ic_marketing_bullhorn.svg"
                sx={{...stylesIcon}}
              />
            }
          />
        </m.div>
      </Box>

      {/* Icon */}
      <Box
        sx={{
          zIndex: 10,
          position: "absolute",
          bottom: 220,
          transform: "translateX(-220px)",
        }}
      >
        <m.div style={{x: offsetX(70), y: offsetY(70)}}>
          <Icon
            color={BLUE}
            content={
              <SvgColor
                src="/assets/icons/ic_customer_service.svg"
                sx={{...stylesIcon}}
              />
            }
          />
        </m.div>
      </Box>

      {/* Icon */}
      <Box
        sx={{
          zIndex: 10,
          position: "absolute",
          bottom: 220,
          transform: "translateX(220px)",
        }}
      >
        <m.div style={{x: offsetX(-70), y: offsetY(-70)}}>
          <Icon
            color={BLUE}
            content={
              <SvgColor
                src="/assets/icons/theodolite-svgrepo-com.svg"
                sx={{...stylesIcon}}
              />
            }
          />
        </m.div>
      </Box>

      <Pattern01 />

      <Pattern02 />
    </Box>
  );
}

ServicesHeroIllustration.propTypes = {
  sx: PropTypes.object,
};

export default memo(ServicesHeroIllustration);
