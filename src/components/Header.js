import { Link } from "gatsby"
import { useContext } from "react"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import React from "react"
import { isMobile } from "react-device-detect";
import ThemeContext from '../theme/ThemeContext';
import { BACKGROUND_TRANSITION_TIME, getTheme } from '../theme/ThemeManager';
import GitHubLogo from '../images/github.inline.svg'
import TwitterLogo from '../images/twitter.inline.svg'
import MoonIcon from '../images/moon.inline.svg'
import LightIcon from '../images/light.inline.svg'
import LinkedInLogo from '../images/linkedin.inline.svg'

const Content = styled.div`
  max-width: ${isMobile ? '100%' : '80%'};
  padding: 1rem 1.0875rem;
  font-size: 1.2rem;
`

const NavLink = styled(Link)`
  color: black;
  margin-left: 10px;
  margin-right: 10px;
  text-decoration: none;
  display: inline-block;
  position: relative;
  color: inherit;

  ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`

const Button = styled('button')(props => ({
    marginRight: '0px',
    display: 'inline-block',
    position: 'relative',
	justifyContent: 'center',
	background: 'transparent',
	border: `none`,
	cursor: 'pointer',
    color: 'inherit',
    ":focus": {
        border: 0,
        outline: 0,
    }
}));

const ExternalLink = styled.a`
  color: black;
  margin-left: 10px;
  margin-right: 10px;
  text-decoration: none;
  display: inline-block;
  position: relative;
  color: inherit;

  ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`

const SiteHeader = styled.header`
  background: transparent;
  display: flex;
  align-content: center;
  justify-content: center;
`

const GitHubLogoStyled = styled(GitHubLogo)(props => ({
    height: '24px',
    width: '24px',
    fill: props.theme.name === 'light' ? 'black' : 'white'
}))

const TwitterLogoStyled = styled(TwitterLogo)(props => ({
    height: '24px',
    width: '24px',
    fill: props.theme.name === 'light' ? 'black' : 'white'
}))

const LinkedInLogoStyled = styled(LinkedInLogo)(props => ({
    height: '24px',
    width: '24px',
    fill: props.theme.name === 'light' ? 'black' : 'white'
}))

const MoonIconStyled = styled(MoonIcon)(props => ({
    height: '24px',
    width: '24px',
    fill: 'white'
}))

const LightIconStyled = styled(LightIcon)(props => ({
    height: '24px',
    width: '24px',
    fill: 'black'
}))

const Header = ({ siteTitle }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { background } = getTheme(theme);
    
    return (
        <SiteHeader>
            <Content>
                <p>
                    <NavLink to="/">Home</NavLink>
                    {!isMobile && <>&#5867;</>}
                    <NavLink to="/bio">Bio</NavLink>
                    {!isMobile && <>&#5867;</>}
                    <ExternalLink href="https://github.com/SachiraChin" target="_blank"><GitHubLogoStyled /></ExternalLink>
                    {!isMobile && <>&#5867;</>}
                    <ExternalLink href="https://twitter.com/SachiraChin" target="_blank"><TwitterLogoStyled /></ExternalLink>
                    {!isMobile && <>&#5867;</>}
                    <ExternalLink href="https://www.linkedin.com/in/sachirachinthana/" target="_blank"><LinkedInLogoStyled /></ExternalLink>
                    {!isMobile && <>&#5867;</>}
                    <Button
                        onClick={toggleTheme}
                        className="container"
                        css={{
                            background,
                            transitionDuration: '0s',
                            // delay background-color transition for nicer animation
                            transitionDelay: theme === 'dark' ? '0s' : BACKGROUND_TRANSITION_TIME,
                            transitionProperty: 'background-color, color',
                        }}
                    >
                        {/* {'[' + (theme === 'light' ? 'Light' : 'Dark') + (isMobile ? ']' : ' Mode]')} */}
                        {theme === 'light' ? <LightIconStyled /> : <MoonIconStyled />}
                    </Button>
                </p>
            </Content>
        </SiteHeader>
    )
}

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
}

export default Header
